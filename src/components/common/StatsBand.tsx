import { Counter, Reveal } from "@/components/animations";
import { stats } from "@/data";
import { cn } from "@/lib/utils";

export default function StatsBand({ dark = false }: { dark?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Reveal key={stat.label.join(" ")} delay={i * 0.06} className={cn("rounded border-b-4 border-brand p-6 md:p-8", dark ? "bg-white/5 text-white" : "card")}>
          <Counter to={stat.value} suffix={stat.suffix} className={cn("block font-display text-4xl font-bold md:text-5xl", dark ? "text-white" : "text-navy")} />
          <p className={cn("mt-2 text-sm leading-snug", dark ? "text-white/70" : "text-slate")}>
            {stat.label[0]} {stat.label[1]}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
