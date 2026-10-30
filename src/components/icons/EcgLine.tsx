import { cn } from "@/lib/utils";

/** Animated heartbeat line used as a decorative accent. */
export default function EcgLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 20" className={cn("w-16 text-sun", className)} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path
        d="M0 10h22l4-7 5 14 5-12 3 5h41"
        strokeDasharray="120"
        strokeDashoffset="120"
        style={{ animation: "ecg 2.2s ease-in-out infinite alternate" }}
      />
    </svg>
  );
}
