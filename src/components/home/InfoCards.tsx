import Link from "next/link";
import { ArrowUpRight, Headset, MapPin, Phone, Siren } from "lucide-react";
import { Reveal } from "@/components/animations";
import { contactPage, home, site, stats } from "@/data";

/** Three cards overlapping the bottom of the hero: urgent call, speak to the team, medical coordination hours. */
export default function InfoCards() {
  const [speak, message] = contactPage.reach.channels;
  const coordination = stats[stats.length - 1];

  return (
    <section aria-label="Contact us" className="relative z-20 -mt-20 md:-mt-24">
      <Reveal offset={30} className="container-x">
        <div className="grid shadow-[0_30px_70px_-30px_rgba(7,15,69,0.55)] md:grid-cols-3">
          <div className="flex flex-col bg-brand p-7 text-navy md:p-8">
            <h2 className="flex items-start gap-3 font-display text-[1.45rem] font-semibold leading-snug text-navy"><Siren className="size-8 shrink-0 -mt-0.5" strokeWidth={1.5} /> {home.quickCta.title}</h2>
            <p className="mt-4 max-w-xs leading-relaxed text-navy/80">{home.quickCta.text.join(" ")}</p>
            <a href={site.phones.emergency.href} className="mt-auto flex items-center gap-3 pt-8 font-display text-2xl font-semibold text-navy hover:underline">
              <span className="grid size-9 place-items-center rounded-full bg-navy text-brand"><Phone className="size-4" /></span>
              {site.phones.emergency.label}
            </a>
          </div>

          <div className="flex flex-col bg-navy p-7 text-white md:p-8">
            <h2 className="flex items-start gap-3 font-display text-[1.45rem] font-semibold leading-snug text-white"><Headset className="size-8 shrink-0 -mt-0.5 text-brand" strokeWidth={1.5} /> {speak.label}</h2>
            <p className="mt-4 max-w-xs leading-relaxed text-white/80">{speak.text}</p>
            <a href={site.phones.office.href} className="mt-5 font-display text-lg font-medium text-white hover:text-brand">{site.phones.office.label}</a>
            <div className="mt-auto pt-8">
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-light !normal-case !tracking-normal">
                {message.label} <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col bg-navy-800 p-7 text-white md:p-8">
            <h2 className="flex items-start gap-3 font-display text-[1.45rem] font-semibold leading-snug text-white"><MapPin className="size-8 shrink-0 -mt-0.5 text-brand" strokeWidth={1.5} /> {coordination.label.join(" ")}</h2>
            <p className="mt-4 leading-relaxed text-white/80">{site.hours}</p>
            <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/70">
              {site.address.lines[0]}
              <br />
              {site.address.lines[1]}
            </p>
            <div className="mt-auto pt-8">
              <Link href="/contact" className="btn btn-light !normal-case !tracking-normal">Find us on the map <ArrowUpRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
