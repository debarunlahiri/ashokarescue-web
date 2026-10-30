import { Reveal, SplitText } from "@/components/animations";
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

export default function SectionHeading({ eyebrow, title, description, light = false, centered = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <Reveal>
        <p className={cn("eyebrow", light && "eyebrow-light", centered && "justify-center")}>{eyebrow}</p>
      </Reveal>
      <SplitText
        lines={title}
        accentClassName={light ? "text-sky" : "text-royal"}
        className={cn("display mt-5 text-4xl md:text-[3.5rem]", light && "text-white")}
      />
      {description && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", light ? "text-white/70" : "text-slate", centered && "mx-auto")}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
