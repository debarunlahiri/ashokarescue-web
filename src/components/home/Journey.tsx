import { Ambulance, BedSingle, Hospital, Plane, PlaneLanding, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { home } from "@/data";
import { cn, padNumber } from "@/lib/utils";

const stageIcons: LucideIcon[] = [BedSingle, Ambulance, Plane, PlaneLanding, Hospital];

/** The bedside-to-bedside story as a winding route: stops sit on an S-curve and stagger up and down. */
export default function Journey() {
  const { eyebrow, title, description, stages } = home.journey;

  return (
    <section className="section relative overflow-hidden">
      {/* wavy edges that blend into the neighbouring tinted sections */}
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-8 w-full fill-mist md:h-12">
        <path d="M0 0H1440V24C1200 64 960 0 720 24S240 64 0 24Z" />
      </svg>
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-8 w-full rotate-180 fill-mist md:h-12">
        <path d="M0 0H1440V24C1200 64 960 0 720 24S240 64 0 24Z" />
      </svg>

      <div className="container-x relative pt-6 md:pt-8">
        <SectionHeading centered eyebrow={eyebrow} title={title} description={description} />

        <div className="relative mt-16 md:mt-20">
          {/* desktop: dashed S-curve running through the five stops */}
          <svg aria-hidden viewBox="0 0 1000 150" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-[150px] w-full lg:block">
            <path
              d="M0 36 L100 36 C200 36 200 106 300 106 C400 106 400 36 500 36 C600 36 600 106 700 106 C800 106 800 36 900 36 L1000 36"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="3"
              strokeDasharray="10 18"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="dash-flow"
            />
          </svg>

          <ol className="relative grid gap-12 lg:grid-cols-5 lg:gap-0">
            {stages.map((stage, i) => {
              const Icon = stageIcons[i % stageIcons.length];
              const low = i % 2 === 1;
              return (
                <Reveal key={stage.title} delay={i * 0.08}>
                  <li className={cn("relative flex gap-5 lg:flex-col lg:items-center lg:px-4 lg:text-center", low && "lg:pt-[70px]", low && "max-lg:ml-8")}>
                    <span className="relative z-10 grid size-[4.5rem] shrink-0 place-items-center rounded-full bg-brand text-navy shadow-[0_14px_30px_-10px_rgba(76,195,240,0.9)] ring-8 ring-white">
                      <Icon className="size-8" strokeWidth={1.6} />
                      <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-navy text-[0.7rem] font-semibold text-white">{padNumber(i + 1)}</span>
                    </span>
                    <div className="lg:mt-5">
                      <h3 className="font-display text-lg font-semibold">{stage.title}</h3>
                      <p className="mt-2 text-[0.93rem] leading-relaxed text-slate">{stage.text}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
