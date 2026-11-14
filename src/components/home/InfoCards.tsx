import { ArrowUpRight, MapPin, Phone, Siren } from "lucide-react";
import { Reveal } from "@/components/animations";
import { WhatsAppIcon } from "@/components/icons";
import { home, site } from "@/data";

export default function InfoCards() {
  const { urgent, planned } = home.transferContacts;

  return (
    <section aria-label="Patient transfer assistance" className="relative z-20 -mt-20 md:-mt-24">
      <Reveal offset={30} className="container-x">
        <div className="grid shadow-[0_30px_70px_-30px_rgba(7,15,69,0.55)] lg:grid-cols-3">
          <div className="flex flex-col bg-brand p-7 text-white sm:p-8">
            <h2 className="flex items-start gap-3 font-display text-[1.45rem] font-semibold leading-snug text-white">
              <Siren aria-hidden className="-mt-0.5 size-8 shrink-0" strokeWidth={1.5} />
              {urgent.title}
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">{urgent.text}</p>
            <div className="mt-auto pt-6">
              <a
                href={site.phones.emergency.href}
                className="btn btn-light !normal-case !tracking-normal focus-visible:outline-white"
              >
                <Phone aria-hidden className="size-4 shrink-0" />
                Call {site.phones.emergency.label}
              </a>
            </div>
          </div>

          <div className="flex flex-col bg-brand-500 p-7 text-white sm:p-8">
            <h2 className="flex items-start gap-3 font-display text-[1.45rem] font-semibold leading-snug text-white">
              <WhatsAppIcon className="-mt-0.5 size-8 shrink-0" />
              {planned.title}
            </h2>
            <p className="mt-4 leading-relaxed text-white/80">{planned.text}</p>
            <p className="mt-3 text-sm text-white/80">
              Prefer to call?{" "}
              <a
                href={site.phones.office.href}
                className="font-medium text-white underline underline-offset-4 focus-visible:outline-white"
              >
                {site.phones.office.label}
              </a>
            </p>
            <div className="mt-auto pt-6">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light text-center !normal-case !tracking-normal focus-visible:outline-white"
              >
                Message on WhatsApp
                <ArrowUpRight aria-hidden className="size-4 shrink-0" />
              </a>
            </div>
          </div>

          <div className="flex flex-col bg-navy-800 p-7 text-white sm:p-8">
            <h2 className="flex items-start gap-3 font-display text-[1.45rem] font-semibold leading-snug text-white">
              <MapPin aria-hidden className="-mt-0.5 size-8 shrink-0" strokeWidth={1.5} />
              Gurugram office
            </h2>
            <address className="mt-4 leading-relaxed text-white/80 not-italic">
              {site.address.lines.join(" ")}
            </address>
            <div className="mt-auto pt-6">
              <a
                href={site.address.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-light text-center !normal-case !tracking-normal focus-visible:outline-white"
              >
                Open in Google Maps
                <ArrowUpRight aria-hidden className="size-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
