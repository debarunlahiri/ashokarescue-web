"use client";

import { useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Travel along the X axis; `rest` is where it sits when motion is reduced. */
const lane = (duration: number, delay: number, rest: string, reverse = false): CSSProperties =>
  ({
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    animationDirection: reverse ? "reverse" : "normal",
    "--rest-x": rest,
  }) as CSSProperties;

/** Night-time air, rail and road scene closing the footer. Animations only run while it's on screen. */
export default function FooterTransport() {
  const ref = useRef<HTMLDivElement>(null);
  const isLive = useInView(ref, { margin: "100px" });

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "transport-scene pointer-events-none relative h-60 select-none overflow-hidden md:h-80",
        "[mask-image:linear-gradient(to_bottom,transparent,black_18%)]",
        isLive && "is-live",
      )}
    >
      {/* stars + moon */}
      <div className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(rgb(255_255_255/0.5)_1px,transparent_1.5px)] opacity-25 [background-size:84px_64px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="transport-twinkle absolute inset-x-0 top-4 h-1/2 bg-[radial-gradient(rgb(255_210_154/0.7)_1px,transparent_1.5px)] opacity-30 [background-position:40px_20px] [background-size:150px_110px]" />
      <div className="absolute right-[10%] top-[16%] size-9 rounded-full bg-flare/25 shadow-[0_0_60px_12px_rgb(255_210_154/0.12)] md:size-12" />

      {/* clouds */}
      <div className="transport-move absolute left-0 top-[14%]" style={lane(110, -40, "8vw")}>
        <CloudShape className="w-32 text-white/[0.05] md:w-44" />
      </div>
      <div className="transport-move absolute left-0 top-[34%]" style={lane(150, -95, "62vw")}>
        <CloudShape className="w-24 text-white/[0.04] md:w-32" />
      </div>

      {/* plane with fading contrail */}
      <div className="transport-move absolute left-0 top-[10%] flex items-center" style={lane(26, -8, "22vw")}>
        <span className="h-0.5 w-32 rounded-full bg-gradient-to-r from-transparent to-white/20 md:w-56" />
        <div className="transport-bob -ml-1">
          <PlaneShape className="w-32 text-white/25 md:w-44" />
        </div>
      </div>

      {/* skyline */}
      <svg className="absolute inset-x-0 bottom-[4.25rem] h-24 w-full text-white/[0.05] md:bottom-20 md:h-32" preserveAspectRatio="none">
        <defs>
          <pattern id="footer-skyline" width="520" height="128" patternUnits="userSpaceOnUse" y="100%">
            <Skyline />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-skyline)" />
      </svg>

      {/* rail (sits on the skyline's base) */}
      <div className="absolute inset-x-0 bottom-[4.25rem] md:bottom-20">
        <div className="transport-move absolute bottom-1.5 left-0" style={lane(32, -18, "48vw", true)}>
          <TrainShape className="w-64 text-white/20 md:w-96" />
        </div>
        <div className="h-px bg-white/15" />
        <div className="mt-0.5 h-1.5 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.08)_0_4px,transparent_4px_14px)]" />
      </div>

      {/* road */}
      <div className="absolute inset-x-0 bottom-0 h-14 border-t border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] md:h-16">
        <div className="absolute inset-x-0 top-[62%] h-0.5 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.16)_0_26px,transparent_26px_56px)]" />
        <div className="transport-move absolute bottom-[42%] left-0" style={lane(18, -5, "70vw")}>
          <div className="relative">
            <span className="absolute bottom-[18%] left-[92%] h-7 w-28 bg-gradient-to-r from-flare/30 to-transparent [clip-path:polygon(0_45%,100%_0,100%_100%,0_70%)] md:w-40" />
            <span className="transport-siren absolute -top-2 left-[24%] size-6 rounded-full bg-[radial-gradient(rgb(217_58_53/0.6),transparent_70%)]" />
            <AmbulanceShape className="relative w-28 text-white/25 md:w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Skyline() {
  return (
    <g fill="currentColor" transform="translate(0 128) scale(1 -1)">
      <rect x="0" y="0" width="40" height="46" />
      <rect x="44" y="0" width="28" height="74" />
      <rect x="76" y="0" width="48" height="38" />
      {/* hospital with cross */}
      <rect x="130" y="0" width="74" height="64" />
      <rect x="160" y="64" width="14" height="10" />
      <path d="M161 40h12v-8h8v-12h-8v-8h-12v8h-8v12h8z" fill="var(--color-ink)" />
      <rect x="210" y="0" width="30" height="92" />
      <rect x="244" y="0" width="46" height="50" />
      {/* airport control tower */}
      <rect x="312" y="0" width="12" height="78" />
      <path d="M300 78h36l-6 18h-24z" />
      <rect x="316" y="96" width="4" height="10" />
      <rect x="342" y="0" width="62" height="34" />
      <rect x="408" y="0" width="26" height="82" />
      <rect x="438" y="0" width="44" height="56" />
      <rect x="486" y="0" width="34" height="30" />
    </g>
  );
}

function CloudShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 44" fill="currentColor" className={className}>
      <path d="M18 44a16 16 0 0 1 2-32 22 22 0 0 1 40-6 18 18 0 0 1 30 8 15 15 0 0 1 12 30z" />
    </svg>
  );
}

function PlaneShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="currentColor" className={className}>
      <path d="M12 16h10L14 2H8z" />
      <path d="M56 16h12L60 6h-6z" />
      <path d="M8 22c0-4 6-6 14-6h74c10 0 20 3 22 6-2 3-12 5-22 5H22c-8 0-14-2-14-5z" />
      <path d="M50 22h20L56 38H46z" />
      <path d="M104 18c4 0 8 2 10 4h-10z" fill="var(--color-ink)" opacity="0.6" />
      <g fill="var(--color-flare)" opacity="0.75">
        {[30, 38, 46, 54, 62, 70, 78, 86].map((x) => (
          <circle key={x} cx={x} cy={20} r={1.4} />
        ))}
      </g>
      <circle cx="10" cy="5" r="1.6" fill="var(--color-signal)" className="transport-siren" />
    </svg>
  );
}

function TrainShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 252 46" fill="currentColor" className={className}>
      {/* engine (nose to the left — it travels right-to-left) */}
      <path d="M4 38c0-15 10-26 30-26h46v26z" />
      <path d="M14 22c3-4 8-6 14-6h6v8H14z" fill="var(--color-flare)" opacity="0.6" />
      <rect x="84" y="12" width="80" height="26" rx="3" />
      <rect x="168" y="12" width="80" height="26" rx="3" />
      <rect x="4" y="30" width="244" height="2" fill="var(--color-sun)" opacity="0.5" />
      <g fill="var(--color-flare)" opacity="0.55">
        {[92, 110, 128, 146, 176, 194, 212, 230].map((x) => (
          <rect key={x} x={x} y={17} width={10} height={8} rx={1} />
        ))}
      </g>
      <g fill="var(--color-ink)">
        {[22, 64, 100, 148, 184, 232].map((x) => (
          <circle key={x} cx={x} cy={40} r={4} />
        ))}
      </g>
    </svg>
  );
}

function AmbulanceShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 112 52" fill="currentColor" className={className}>
      <rect x="2" y="12" width="70" height="30" rx="3" />
      <path d="M72 20h20l16 14v8H72z" />
      <path d="M78 24h12l9 8H78z" fill="var(--color-ink)" opacity="0.8" />
      <rect x="2" y="30" width="106" height="3" fill="var(--color-signal)" opacity="0.6" />
      <path d="M33 17h8v6h6v8h-6v6h-8v-6h-6v-8h6z" fill="var(--color-signal)" opacity="0.8" />
      <rect x="28" y="6" width="16" height="6" rx="2" fill="var(--color-signal)" className="transport-siren" />
      <rect x="104" y="34" width="4" height="4" rx="1" fill="var(--color-flare)" />
      <g fill="var(--color-ink)" stroke="currentColor" strokeWidth="2.5">
        <circle cx="22" cy="43" r="7" />
        <circle cx="90" cy="43" r="7" />
      </g>
    </svg>
  );
}
