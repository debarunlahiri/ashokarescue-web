"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Ambulance, BedSingle, Hospital, Plane, PlaneLanding, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type Ref } from "react";
import { SectionHeading } from "@/components/common";
import { home } from "@/data";
import { cn } from "@/lib/utils";

/* ----- scene geometry (SVG user units; drawn on 0–1000, viewBox padded to -50…1050 so edge labels never clip) ----- */
const GROUND = 300;
const DOOR_L = 60; // origin hospital door (centre x)
const DOOR_R = 950; // receiving hospital door
const ROAD_1 = "M150 300 L222 300";
// Short take-off roll, gentle climb, long level cruise, gentle descent, landing roll.
const FLIGHT = "M300 300 L332 300 C387 300 397 150 462 150 L568 150 C633 150 643 300 698 300 L725 300";
const ROAD_2 = "M800 300 L862 300";
/** Desktop shows the whole route; phones get a zoomed "camera" that pans to follow the patient. */
const FULL_VIEW = "-50 0 1100 360";
const MOBILE_VIEW = { w: 470, y: 70, h: 290, min: -50, max: 1050 };

/* ----- timeline (ms) — one loop of the story; the flight is the longest leg ----- */
const T = {
  load: [600, 2400], // ward → ambulance
  road1: [2400, 4600],
  board: [4600, 6600], // ambulance → aircraft
  flight: [6600, 15600],
  deplane: [15600, 17600], // aircraft → ambulance
  road2: [17600, 19600],
  unload: [19600, 21600], // ambulance → receiving hospital
  end: [21600, 23200],
} as const;
const LOOP = T.end[1];
const STAGE_START = [0, T.road1[0], T.flight[0], T.deplane[0], T.unload[0]];
const STAGE_ICONS: LucideIcon[] = [BedSingle, Ambulance, Plane, PlaneLanding, Hospital];

/** Stretcher transfers: [timing, from x, to x]. */
const TRANSFERS = [
  [T.load, DOOR_L, 122],
  [T.board, 200, 286],
  [T.deplane, 714, 776],
  [T.unload, 840, DOOR_R],
] as const;

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const easeInOut = (v: number) => (v < 0.5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2);
const within = (t: number, [a, b]: readonly [number, number]) => t >= a && t < b;
const legProgress = (t: number, [a, b]: readonly [number, number]) => easeInOut(clamp((t - a) / (b - a)));

function stageAt(t: number) {
  if (t < T.road1[0]) return 0;
  if (t < T.flight[0]) return 1;
  if (t < T.deplane[0]) return 2;
  if (t < T.unload[0]) return 3;
  return 4;
}

/** Where the stretcher is (if a transfer is happening): fades in, rolls, fades out. */
function stretcherAt(t: number) {
  for (const [range, from, to] of TRANSFERS) {
    if (!within(t, range)) continue;
    const u = (t - range[0]) / (range[1] - range[0]);
    return {
      x: from + (to - from) * easeInOut(clamp((u - 0.15) / 0.7)),
      opacity: u < 0.15 ? u / 0.15 : u > 0.85 ? (1 - u) / 0.15 : 1,
    };
  }
  return null;
}

type Leg = "road1" | "flight" | "road2";

/** Auto-looping bedside-to-bedside story: ambulance → aircraft → ambulance, with the patient badge riding along. */
export default function JourneyAnimation() {
  const { eyebrow, title, description, stages } = home.journey;
  const sceneRef = useRef<HTMLDivElement>(null);
  const geo = useRef<Record<Leg, SVGPathElement | null>>({ road1: null, flight: null, road2: null });
  const drawn = useRef<Record<Leg, SVGPathElement | null>>({ road1: null, flight: null, road2: null });
  const amb1 = useRef<SVGGElement>(null);
  const amb2 = useRef<SVGGElement>(null);
  const plane = useRef<SVGGElement>(null);
  const badge = useRef<SVGGElement>(null);
  const stretcher = useRef<SVGGElement>(null);
  const amb1Door = useRef<SVGRectElement>(null);
  const amb2Door = useRef<SVGRectElement>(null);
  const planeDoor = useRef<SVGGElement>(null);
  const elapsed = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobile = useRef(false);
  const camX = useRef<number | null>(null);

  const [stage, setStage] = useState(0);
  // Alternate loops between a day and a night transfer (24/7).
  const [isNight, setIsNight] = useState(false);
  const reduceMotion = useReducedMotion();
  const isLive = useInView(sceneRef, { margin: "100px" });

  /** Paint the scene for time t (ms) by writing SVG attributes — no React render per frame. */
  const render = useCallback((t: number, snap = false) => {
    const at = (path: SVGPathElement | null, p: number) => {
      if (!path) return { x: 0, y: 0, angle: 0 };
      const len = path.getTotalLength();
      const pt = path.getPointAtLength(p * len);
      const a = path.getPointAtLength(Math.max(0, p * len - 1));
      const b = path.getPointAtLength(Math.min(len, p * len + 1));
      return { x: pt.x, y: pt.y, angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI };
    };

    const r1 = legProgress(t, T.road1);
    const f = legProgress(t, T.flight);
    const r2 = legProgress(t, T.road2);

    const p1 = at(geo.current.road1, r1);
    const pf = at(geo.current.flight, f);
    const p2 = at(geo.current.road2, r2);
    const tilt = Math.max(-14, Math.min(14, pf.angle));

    amb1.current?.setAttribute("transform", `translate(${p1.x} ${p1.y})`);
    amb1.current?.setAttribute("opacity", t < T.flight[0] ? "1" : "0.35");
    plane.current?.setAttribute("transform", `translate(${pf.x} ${pf.y}) rotate(${tilt})`);
    amb2.current?.setAttribute("transform", `translate(${p2.x} ${p2.y})`);
    amb2.current?.setAttribute("opacity", t < T.deplane[0] ? "0.45" : "1");

    drawn.current.road1?.setAttribute("stroke-dashoffset", String(1 - r1));
    drawn.current.flight?.setAttribute("stroke-dashoffset", String(1 - f));
    drawn.current.road2?.setAttribute("stroke-dashoffset", String(1 - r2));

    // Stretcher transfers + open doors.
    const st = stretcherAt(t);
    if (st) stretcher.current?.setAttribute("transform", `translate(${st.x} ${GROUND + 4})`);
    stretcher.current?.setAttribute("opacity", st ? String(st.opacity) : "0");
    amb1Door.current?.setAttribute("opacity", within(t, T.load) || within(t, T.board) ? "1" : "0");
    amb2Door.current?.setAttribute("opacity", within(t, T.deplane) || within(t, T.unload) ? "1" : "0");
    planeDoor.current?.setAttribute("opacity", within(t, T.board) || within(t, T.deplane) ? "1" : "0");

    // The patient badge follows the patient: ward, stretcher or whichever vehicle is carrying them.
    const carrier =
      st && st.opacity > 0.3
        ? { x: st.x, y: GROUND + 12 }
        : t < T.load[0] + 500
          ? { x: DOOR_L, y: GROUND + 12 }
          : t < T.board[0] + 500
            ? p1
            : t < T.deplane[0] + 500
              ? pf
              : t < T.unload[0] + 500
                ? p2
                : { x: DOOR_R, y: GROUND + 12 };
    badge.current?.setAttribute("transform", `translate(${carrier.x} ${carrier.y - 50})`);

    // Phone camera: ease towards the patient, clamped to the scene.
    if (isMobile.current) {
      const target = Math.min(Math.max(carrier.x - MOBILE_VIEW.w / 2, MOBILE_VIEW.min), MOBILE_VIEW.max - MOBILE_VIEW.w);
      camX.current = snap || camX.current === null ? target : camX.current + (target - camX.current) * 0.08;
      svgRef.current?.setAttribute("viewBox", `${camX.current} ${MOBILE_VIEW.y} ${MOBILE_VIEW.w} ${MOBILE_VIEW.h}`);
    }

    setStage(stageAt(t));
  }, []);

  // Switch between full view and the following camera at the md breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      isMobile.current = mq.matches;
      if (!mq.matches) svgRef.current?.setAttribute("viewBox", FULL_VIEW);
      render(elapsed.current, true);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [render]);

  // Loop while on screen (and the tab is visible); pause otherwise.
  useEffect(() => {
    if (reduceMotion) {
      elapsed.current = (T.flight[0] + T.flight[1]) / 2;
      render(elapsed.current, true);
      return;
    }
    render(elapsed.current);
    if (!isLive) return;

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (!document.hidden) {
        const next = elapsed.current + Math.min(now - last, 100);
        if (next >= LOOP) setIsNight((n) => !n);
        elapsed.current = next % LOOP;
        render(elapsed.current);
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isLive, reduceMotion, render]);

  const jumpTo = (i: number) => {
    elapsed.current = STAGE_START[i];
    render(elapsed.current, true);
  };

  const current = stages[stage];

  return (
    <section className="overflow-hidden bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div
          ref={sceneRef}
          className={cn(
            "journey-scene transport-scene relative mt-12 flex flex-col overflow-hidden rounded-[1.5rem] border border-ink/5 bg-gradient-to-b from-mist via-white to-white shadow-[0_30px_80px_-40px_rgba(12,33,96,0.35)] md:mt-16 md:rounded-[2rem]",
            isLive && "is-live",
            isNight && "is-night",
          )}
        >
          {/* sky: night layer fades over the day gradient */}
          <div aria-hidden className="night-only absolute inset-0 bg-gradient-to-b from-[#071330] via-[#0c2160] to-[#1a2f6e]" />
          <div aria-hidden className="night-only absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(rgb(255_255_255/0.35)_1px,transparent_1.5px)] [background-size:70px_54px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div aria-hidden className="sun-disc absolute right-[12%] top-[18%] size-10 rounded-full bg-sun/30 shadow-[0_0_80px_30px_rgb(244_162_76/0.15)] md:size-14" />
          <div aria-hidden className="moon-disc absolute right-[14%] top-[18%] size-8 rounded-full bg-flare/90 shadow-[0_0_50px_14px_rgb(255_210_154/0.25),inset_-6px_-3px_0_0_rgb(244_162_76/0.35)] md:size-11" />

          <div aria-hidden className="transport-move absolute left-0 top-[16%]" style={{ animationDuration: "60s", animationDelay: "-20s" }}>
            <Cloud className="journey-cloud w-24 text-sky/25 md:w-36" />
          </div>
          <div aria-hidden className="transport-move absolute left-0 top-[36%]" style={{ animationDuration: "80s", animationDelay: "-50s" }}>
            <Cloud className="journey-cloud w-16 text-sky/20 md:w-24" />
          </div>

          {/* live caption */}
          <div className="relative z-10 order-last min-h-[6.5rem] border-t border-ink/5 bg-white px-4 py-3 md:absolute md:left-6 md:top-6 md:min-h-0 md:max-w-xs md:border-0 md:bg-transparent md:p-0" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="md:rounded-2xl md:bg-white/90 md:p-4 md:shadow-[0_16px_40px_-24px_rgba(12,33,96,0.5)] md:ring-1 md:ring-ink/5"
              >
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-royal">
                  Step {stage + 1} of {stages.length}
                </p>
                <p className="mt-1 text-base font-bold leading-snug text-ink md:text-lg">{current.title}</p>
                <p className="mt-0.5 text-sm text-slate">{current.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <svg ref={svgRef} viewBox={FULL_VIEW} className="relative block w-full" aria-hidden>
            {/* ground */}
            <rect x="-50" y={GROUND} width="1100" height="60" fill="var(--s-ground)" />
            <line x1="-50" x2="1050" y1={GROUND} y2={GROUND} stroke="var(--s-line)" strokeWidth="1.5" />

            <HospitalBuilding x={10} label="Patient's hospital" />
            <Airport tower={258} runwayFrom={272} label="Departure airport" />
            <Airport tower={764} runwayFrom={615} label="Arrival airport" />
            <HospitalBuilding x={900} label="Receiving hospital" />

            {/* measuring paths (invisible) + dashed guides + drawn progress */}
            {(
              [
                ["road1", ROAD_1],
                ["flight", FLIGHT],
                ["road2", ROAD_2],
              ] as const
            ).map(([key, d]) => (
              <g key={key}>
                <path ref={(el) => { geo.current[key] = el; }} d={d} fill="none" stroke="none" />
                <path d={d} fill="none" stroke="var(--s-guide)" strokeWidth="1.5" strokeDasharray="4 7" strokeLinecap="round" />
                <path
                  ref={(el) => { drawn.current[key] = el; }}
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke={key === "flight" ? "var(--color-royal)" : "var(--color-signal)"}
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeDasharray="1 1"
                  strokeDashoffset="1"
                />
              </g>
            ))}

            {/* vehicles + patient badge (positioned in render()) */}
            <g ref={amb2} transform="translate(800 300)" opacity="0.45">
              <g transform="translate(-26 -32)"><AmbulanceIcon doorRef={amb2Door} /></g>
            </g>
            <g ref={plane} transform="translate(300 300)">
              <g transform="translate(-36 -20)"><PlaneIcon doorRef={planeDoor} /></g>
            </g>
            <g ref={amb1} transform="translate(150 300)">
              <g transform="translate(-26 -32)"><AmbulanceIcon doorRef={amb1Door} /></g>
            </g>
            <g ref={stretcher} opacity="0">
              <Stretcher />
            </g>
            <g ref={badge} transform={`translate(${DOOR_L} 262)`}>
              <circle r="14" fill="var(--color-signal)" opacity="0.15" className="transport-siren" />
              <circle r="10" fill="white" stroke="var(--color-signal)" strokeWidth="1.5" />
              <path d="M0 5-4.8.3a3 3 0 0 1 4.2-4.2L0-3.4l.6-.5a3 3 0 0 1 4.2 4.2z" fill="var(--color-signal)" />
              <text y="-15" textAnchor="middle" fontSize="9.5" fontWeight="700" letterSpacing="1" fill="var(--color-signal)">PATIENT</text>
            </g>
          </svg>
        </div>

        {/* steps — click to jump */}
        <ol className="mt-6 grid grid-cols-5 gap-2 md:mt-8 md:gap-4">
          {stages.map((item, i) => {
            const Icon = STAGE_ICONS[i];
            const isActive = i === stage;
            const isDone = i < stage;
            return (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={item.title}
                  className={cn(
                    "h-full w-full rounded-2xl border p-2 text-center transition-all duration-500 sm:p-2.5 md:p-5 md:text-left",
                    isActive ? "border-royal/20 bg-white shadow-[0_20px_50px_-30px_rgba(12,33,96,0.45)]" : "border-transparent hover:bg-white/60",
                  )}
                >
                  <span
                    className={cn(
                      "mx-auto grid size-9 place-items-center rounded-xl transition-colors duration-500 md:mx-0 md:size-11",
                      isActive ? "bg-royal text-white" : isDone ? "bg-royal/10 text-royal" : "bg-ink/5 text-ink/40",
                    )}
                  >
                    <Icon className="size-4 md:size-5" />
                  </span>
                  <span className={cn("mt-2 hidden text-[0.7rem] font-bold leading-tight sm:block transition-colors md:mt-4 md:text-base", isActive || isDone ? "text-ink" : "text-ink/45")}>
                    {item.title}
                  </span>
                  <span className="mt-1 hidden text-sm leading-relaxed text-slate md:block">{item.text}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function HospitalBuilding({ x, label }: { x: number; label: string }) {
  return (
    <g aria-hidden>
      <rect x={x} y={200} width={100} height={100} rx={4} fill="var(--s-building)" />
      <rect x={x + 38} y={186} width={24} height={14} fill="var(--s-building)" />
      <path d={`M${x + 45} 216h10v9h9v10h-9v9h-10v-9h-9v-10h9z`} fill="var(--color-signal)" opacity="0.75" />
      {[0, 2].map((col) => (
        <rect key={col} x={x + 14 + col * 26} y={258} width={16} height={13} rx={2} fill="var(--s-window)" />
      ))}
      {/* entrance */}
      <rect x={x + 38} y={270} width={24} height={30} rx={2} fill="var(--s-entrance)" />
      <rect x={x + 32} y={266} width={36} height={4} rx={1} fill="var(--color-signal)" opacity="0.6" />
      <text x={x + 50} y={340} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--s-label)">
        {label}
      </text>
    </g>
  );
}

function Airport({ tower, runwayFrom, label }: { tower: number; runwayFrom: number; label: string }) {
  return (
    <g aria-hidden>
      <rect x={runwayFrom} y={GROUND + 6} width={120} height={12} rx={3} fill="var(--s-runway)" />
      <line x1={runwayFrom + 10} x2={runwayFrom + 110} y1={GROUND + 12} y2={GROUND + 12} stroke="white" strokeWidth="1.5" strokeDasharray="10 8" />
      <rect x={tower - 4} y={214} width={8} height={86} fill="var(--s-tower)" />
      <path d={`M${tower - 15} 214h30l-5-15h-20z`} fill="var(--s-tower-top)" />
      <rect x={tower - 1.5} y={186} width={3} height={13} fill="var(--s-tower-top)" />
      <circle cx={tower} cy={184} r={2.5} fill="var(--color-signal)" className="transport-siren" />
      <text x={runwayFrom + 60} y={340} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--s-label)">
        {label}
      </text>
    </g>
  );
}

function AmbulanceIcon({ doorRef }: { doorRef?: Ref<SVGRectElement> }) {
  return (
    <g>
      {/* rear door, swung open while loading */}
      <rect ref={doorRef} x="-5" y="7" width="5" height="18" rx="1" fill="white" stroke="rgb(12 33 96 / 0.4)" strokeWidth="1" opacity="0" />
      <rect x="1" y="6" width="34" height="20" rx="2.5" fill="white" stroke="rgb(12 33 96 / 0.4)" strokeWidth="1.2" />
      <path d="M35 11h9l7 7v8H35z" fill="white" stroke="rgb(12 33 96 / 0.4)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M38 14h6l4 4H38z" fill="var(--color-navy)" opacity="0.65" />
      <rect x="1" y="19" width="50" height="2" fill="var(--color-signal)" />
      <path d="M15 9h5v3.5h3.5v5H20V21h-5v-3.5h-3.5v-5H15z" fill="var(--color-signal)" />
      <rect x="13" y="1.5" width="9" height="4.5" rx="1.5" fill="var(--color-signal)" className="transport-siren" />
      <circle cx="11" cy="27" r="4.5" fill="var(--color-ink)" />
      <circle cx="42" cy="27" r="4.5" fill="var(--color-ink)" />
      {/* headlight beam (night only) */}
      <path className="night-only" d="M51 21 92 12v20z" fill="rgb(255 210 154 / 0.28)" />
      <circle className="night-only" cx="50.5" cy="21.5" r="1.6" fill="#fff6e0" />
    </g>
  );
}

function PlaneIcon({ doorRef }: { doorRef?: Ref<SVGGElement> }) {
  return (
    <g>
      <path d="M8 11h7L10 0H5z" fill="var(--color-royal)" />
      <path d="M4 15c0-3 4-4 9-4h44c6 0 11 2 13 4-2 2-7 4-13 4H13c-5 0-9-1-9-4z" fill="white" stroke="var(--color-royal)" strokeWidth="1.2" />
      <path d="M28 15h14l-9 11h-6z" fill="var(--color-royal)" />
      <path d="M57 12c4 0 8 1.5 11 3h-11z" fill="var(--color-navy)" opacity="0.65" />
      <rect x="10" y="15.5" width="48" height="1.4" fill="var(--color-signal)" />
      <g fill="var(--color-royal)" opacity="0.55">
        {[18, 24, 30, 36, 42, 48].map((x) => (
          <circle key={x} cx={x} cy={13.8} r={1} />
        ))}
      </g>
      <g className="night-only">
        <circle cx="9" cy="1" r="1.6" fill="#ffffff" className="transport-siren" />
        <g fill="var(--color-flare)">
          {[18, 24, 30, 36, 42, 48].map((x) => (
            <circle key={x} cx={x} cy={13.8} r={1} />
          ))}
        </g>
      </g>
      <g fill="var(--color-ink)">
        <circle cx="22" cy="21" r="1.8" />
        <circle cx="50" cy="21" r="1.8" />
      </g>
      {/* cabin door + ramp, open while boarding */}
      <g ref={doorRef} opacity="0">
        <rect x="17" y="11.5" width="6" height="7" rx="1" fill="var(--color-navy)" />
        <path d="M17 18.5 10 22" stroke="var(--color-royal)" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Patient on a wheeled stretcher, pushed by a medic (moves left → right). Origin = ground under the stretcher centre. */
function Stretcher() {
  return (
    <g>
      {/* medic */}
      <g fill="var(--color-royal)">
        <circle cx="-25" cy="-33" r="3.6" fill="#d9a77f" />
        <rect x="-29" y="-29" width="8" height="15" rx="3" />
        <path d="M-27-14v14M-23-14l2 14" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" />
        <path d="M-22-25l6 9" stroke="var(--color-royal)" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* stretcher frame */}
      <rect x="-17" y="-14" width="34" height="3" rx="1.5" fill="var(--s-stretcher)" />
      <path d="M-12-11-9-3M12-11 9-3M-9-3H9" stroke="var(--s-stretcher)" strokeWidth="1.3" fill="none" />
      <circle cx="-10" cy="-1.6" r="1.8" fill="var(--color-ink)" />
      <circle cx="10" cy="-1.6" r="1.8" fill="var(--color-ink)" />
      {/* patient under a blanket */}
      <path d="M-15-14c0-4 4-5 9-5h14c3 0 5 1 5 5z" fill="white" stroke="var(--color-royal)" strokeWidth="1" />
      <circle cx="12.5" cy="-17.5" r="3.2" fill="#d9a77f" />
    </g>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 44" fill="currentColor" className={className}>
      <path d="M18 44a16 16 0 0 1 2-32 22 22 0 0 1 40-6 18 18 0 0 1 30 8 15 15 0 0 1 12 30z" />
    </svg>
  );
}
