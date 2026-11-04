import { Check } from "lucide-react";
import { Reveal } from "@/components/animations";
import type { ContentBlock, Feature } from "@/types";
import { padNumber } from "@/lib/utils";

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="my-8 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3.5 border-l-4 border-brand bg-mist px-4 py-3.5 text-[0.97rem] font-medium text-navy">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-navy"><Check className="size-3.5" strokeWidth={3} /></span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <div className="my-8 grid gap-5 md:grid-cols-2">
      {items.map((feature, i) => (
        <Reveal key={feature.title} delay={i * 0.05} className="card group border-b-4 border-navy p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand">
          <span className="font-display text-sm font-bold text-brand-600">{padNumber(i + 1)}</span>
          <h4 className="mt-2 font-display text-lg font-semibold text-navy">{feature.title}</h4>
          {feature.text && <p className="mt-2 !text-[0.95rem]">{feature.text}</p>}
          {feature.items && (
            <ul className="mt-3 grid gap-2">
              {feature.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.93rem] text-slate">
                  <Check className="mt-1 size-3.5 shrink-0 text-brand-600" /> {item}
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
      return <Reveal key={key} className="mb-6 mt-14 first:mt-0"><h2 className="border-l-4 border-brand pl-4 font-display text-3xl font-bold md:text-[2.3rem]">{block.text}</h2></Reveal>;
    case "subheading":
      return <Reveal key={key}><h3 className="mb-4 mt-10 font-display text-xl font-semibold text-navy md:text-2xl">{block.text}</h3></Reveal>;
    case "lead":
      return <Reveal key={key}><p className="mb-6 max-w-3xl border-l-4 border-brand pl-5 text-xl font-medium leading-relaxed !text-navy">{block.text}</p></Reveal>;
    case "paragraph":
      return <Reveal key={key} offset={16}><p className="mb-5 max-w-3xl">{block.text}</p></Reveal>;
    case "list":
      return <Reveal key={key} offset={16}><CheckList items={block.items} /></Reveal>;
    case "features":
      return <FeatureGrid key={key} items={block.items} />;
  }
}

/** Renders a service's structured content blocks. */
export default function ServiceContent({ content }: { content: ContentBlock[] }) {
  return <div className="prose-ar">{content.map(renderBlock)}</div>;
}
