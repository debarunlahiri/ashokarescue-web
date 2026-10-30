import { Check } from "lucide-react";
import { Reveal } from "@/components/animations";
import type { ContentBlock, Feature } from "@/types";
import { padNumber } from "@/lib/utils";

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="my-8 grid gap-1 rounded-[1.75rem] bg-mist/70 p-2 ring-1 ring-royal/10 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="group flex items-center gap-3.5 rounded-[1.25rem] px-4 py-3.5 text-[0.97rem] font-semibold text-ink transition-colors duration-300 hover:bg-white hover:shadow-sm"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-royal shadow-sm ring-1 ring-royal/15 transition-colors duration-300 group-hover:bg-royal group-hover:text-white">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      {items.map((feature, i) => (
        <Reveal key={feature.title} delay={i * 0.06} className="card group relative overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-sun to-royal transition-transform duration-700 group-hover:scale-x-100" />
          <span className="text-sm font-bold text-royal/50">{padNumber(i + 1)}</span>
          <h4 className="mt-2 text-lg font-bold tracking-tight text-ink">{feature.title}</h4>
          {feature.text && <p className="mt-2 !text-[0.95rem]">{feature.text}</p>}
          {feature.items && (
            <ul className="mt-3 grid gap-2">
              {feature.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.93rem] text-slate">
                  <Check className="mt-1 size-3.5 shrink-0 text-royal" /> {item}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </div>
  );
}

function renderBlock(block: ContentBlock, key: number) {
  switch (block.type) {
    case "heading":
      return <Reveal key={key} className="mb-7 mt-16 first:mt-0"><div><span className="mb-4 block h-1 w-12 rounded-full bg-sun" /><h2 className="display text-3xl md:text-[2.5rem]">{block.text}</h2></div></Reveal>;
    case "subheading":
      return (
        <Reveal key={key}>
          <h3 className="mb-4 mt-12 flex items-center gap-3 text-xl font-bold tracking-tight text-ink md:text-2xl">
            <span className="h-6 w-1 rounded-full bg-sun" />
            {block.text}
          </h3>
        </Reveal>
      );
    case "lead":
      return <Reveal key={key}><p className="mb-6 max-w-3xl border-l-4 border-sun pl-5 text-xl font-semibold leading-relaxed !text-navy">{block.text}</p></Reveal>;
    case "paragraph":
      return <Reveal key={key} offset={20}><p className="mb-5 max-w-3xl">{block.text}</p></Reveal>;
    case "list":
      return <Reveal key={key} offset={20}><CheckList items={block.items} /></Reveal>;
    case "features":
      return <FeatureGrid key={key} items={block.items} />;
  }
}

/** Renders a service's structured content blocks. */
export default function ServiceContent({ content }: { content: ContentBlock[] }) {
  return <div className="prose-ar">{content.map(renderBlock)}</div>;
}
