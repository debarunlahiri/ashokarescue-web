import { Reveal } from "@/components/animations";
import { EcgLine } from "@/components/icons";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string | string[];
  description?: string;
  /** Use on dark backgrounds. */
  light?: boolean;
  centered?: boolean;
  className?: string;
};

/** Template-style heading: heartbeat divider, spaced small-caps eyebrow, bold display title. */
export default function SectionHeading({ eyebrow, title, description, light = false, centered = false, className }: SectionHeadingProps) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <Reveal offset={16}>
        <EcgLine className={cn(centered && "mx-auto")} />
        <p className={cn("mt-3 text-base font-normal uppercase tracking-[0.14em] md:text-lg", light ? "text-white/70" : "text-slate")}>{eyebrow}</p>
      </Reveal>
      <Reveal offset={16} delay={0.08}>
        <h2 className={cn("mt-2 font-display text-[2rem] font-bold leading-[1.12] md:text-[2.7rem]", light && "text-white")}>
          {lines.map((line, i) => (
            <span key={i} className={cn("block", i === lines.length - 1 && lines.length > 1 && (light ? "text-brand" : "text-brand-600"))}>
              {line}
            </span>
          ))}
        </h2>
      </Reveal>
      {description && (
        <Reveal offset={16} delay={0.15}>
          <p className={cn("mt-5 max-w-2xl text-base leading-relaxed md:text-lg", light ? "text-white/75" : "text-slate", centered && "mx-auto")}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
