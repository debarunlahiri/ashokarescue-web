import { Counter, Reveal } from "@/components/animations";
import { stats } from "@/data";
import { cn } from "@/lib/utils";

export default function StatsBand({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] lg:grid-cols-4", dark ? "bg-white/10" : "bg-ink/10")}>
      {stats.map((stat, i) => (
        <Reveal key={stat.label.join(" ")} delay={i * 0.08} className={cn("p-7 md:p-10", dark ? "bg-ink" : "bg-white")}>
          <Counter to={stat.value} suffix={stat.suffix} className={cn("display block text-5xl md:text-6xl", dark ? "text-white" : "text-ink")} />
          <p className={cn("mt-3 text-sm leading-snug", dark ? "text-white/60" : "text-slate")}>
            {stat.label[0]}
            <br />
            {stat.label[1]}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
