import { cn } from "@/lib/utils";

/** Heartbeat line used as the section-heading divider (the template's DNA mark, reworked for a rescue brand). */
export default function EcgLine({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 80 20" className={cn("h-5 w-16 text-brand", className)} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path
        d="M0 10h22l4-7 5 14 5-12 3 5h41"
        strokeDasharray={animated ? "120" : undefined}
        strokeDashoffset={animated ? "120" : undefined}
        style={animated ? { animation: "ecg 2.2s ease-in-out infinite alternate" } : undefined}
      />
    </svg>
  );
}
