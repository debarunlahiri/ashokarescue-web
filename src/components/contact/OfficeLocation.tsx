import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/animations";
import { contactPage, site } from "@/data";

export default function OfficeLocation() {
  const { lat, lng } = site.address.geo;

  return (
    <Reveal delay={0.1} className="mt-6">
      <div className="grid overflow-hidden bg-navy text-white shadow-[0_30px_70px_-35px_rgba(7,15,69,0.7)] md:grid-cols-5">
        <div className="p-8 md:col-span-2 md:p-10">
          <span className="grid size-14 place-items-center rounded-full bg-brand text-navy"><MapPin className="size-6" /></span>
          <h3 className="mt-6 font-display text-3xl font-bold text-white">{contactPage.reach.office}</h3>
          <p className="mt-4 leading-relaxed text-white/75">
            {site.address.lines[0]}
            <br />
            {site.address.lines[1]}
          </p>
          <a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="btn btn-brand mt-8">Find us on the map <ArrowUpRight className="size-4" /></a>
        </div>
        <div className="relative min-h-[320px] md:col-span-3">
          <iframe title="Ashoka Rescue office location" src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`} className="absolute inset-0 h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </Reveal>
  );
}
