"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { routeMap } from "@/data";
import type { MapCity } from "@/types";
import { EASE_OUT_EXPO } from "@/lib/constants";

const VIEWBOX = { width: 148, height: 70 };

function arcPath(from: MapCity, to: MapCity) {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const midX = (from.x + to.x) / 2;
  const midY = Math.max(2, Math.min(from.y, to.y) - distance * 0.28);
  return `M${from.x} ${from.y} Q${midX} ${midY} ${to.x} ${to.y}`;
}

const labelOffset: Record<NonNullable<MapCity["labelPosition"]>, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  top: { dx: 0, dy: -2.4, anchor: "middle" },
  bottom: { dx: 0, dy: 3.6, anchor: "middle" },
  left: { dx: -2.2, dy: 0.8, anchor: "end" },
  right: { dx: 2.2, dy: 0.8, anchor: "start" },
};

/** Dotted world map with animated routes from the Delhi hub. */
export default function WorldRouteMap() {
  const { hub, destinations } = routeMap;
  const ref = useRef<HTMLDivElement>(null);
  // Looping route/hub animations only run while the map is on screen.
  const isVisible = useInView(ref, { margin: "100px" });

  return (
    <div ref={ref} className="relative mx-auto aspect-[148/70] w-full max-w-6xl">
      <Image src="/images/maps/world-dots.svg" alt="" aria-hidden fill unoptimized className="select-none object-contain opacity-35" />

      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        role="img"
        aria-label={`Medical transport routes from ${hub.name} to ${destinations.map((d) => d.name).join(", ")}`}
      >
        <defs>
          <linearGradient id="route-gradient" x1="0" x2="1">
            <stop offset="0" stopColor="#f4a24c" />
            <stop offset="1" stopColor="#8cc0f7" />
          </linearGradient>
          <radialGradient id="hub-glow">
            <stop offset="0" stopColor="#f4a24c" stopOpacity="0.8" />
            <stop offset="1" stopColor="#f4a24c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {destinations.map((city, i) => {
          const d = arcPath(hub, city);
          const label = labelOffset[city.labelPosition ?? "bottom"];
          return (
            <g key={city.name}>
              <motion.path
                d={d}
                fill="none"
                stroke="url(#route-gradient)"
                strokeWidth={0.32}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.3 + i * 0.15, ease: EASE_OUT_EXPO }}
              />
              <circle r={0.55} fill="#ffd29a" className={isVisible ? "route-pulse" : "opacity-0"} style={{ offsetPath: `path("${d}")`, animationDelay: `${i * 0.55}s` }} />
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + i * 0.15 }}
                style={{ transformOrigin: `${city.x}px ${city.y}px`, transformBox: "view-box" }}
              >
                <circle cx={city.x} cy={city.y} r={1.6} fill="none" stroke="#8cc0f7" strokeOpacity={0.45} strokeWidth={0.2} />
                <circle cx={city.x} cy={city.y} r={0.75} fill="#8cc0f7" />
                <text x={city.x + label.dx} y={city.y + label.dy} textAnchor={label.anchor} fontSize={2} fontWeight={600} fill="rgba(255,255,255,0.8)">
                  {city.name}
                </text>
              </motion.g>
            </g>
          );
        })}

        <circle cx={hub.x} cy={hub.y} r={6} fill="url(#hub-glow)" className={isVisible ? "animate-pulse" : undefined} />
        <circle cx={hub.x} cy={hub.y} r={1.1} fill="#f4a24c" stroke="#071330" strokeWidth={0.35} />
        <text x={hub.x + 2} y={hub.y - 1.8} fontSize={2.3} fontWeight={700} fill="#ffffff">{hub.name}</text>
      </svg>
    </div>
  );
}
