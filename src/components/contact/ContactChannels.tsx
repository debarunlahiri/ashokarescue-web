import { ArrowUpRight, Mail, Phone, type LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import { Reveal } from "@/components/animations";
import { SectionHeading } from "@/components/common";
import { WhatsAppIcon } from "@/components/icons";
import { contactPage, site } from "@/data";
import { cn, externalLinkProps } from "@/lib/utils";

type ChannelDetails = {
  href: string;
  value: string;
  Icon: LucideIcon | ComponentType<{ className?: string }>;
  external: boolean;
  tone: string;
};

const channelDetails: Record<string, ChannelDetails> = {
  phone: { href: site.phones.office.href, value: site.phones.office.label, Icon: Phone, external: false, tone: "bg-sun text-ink" },
  whatsapp: { href: site.whatsapp, value: "Open WhatsApp", Icon: WhatsAppIcon, external: true, tone: "bg-[#25D366] text-white" },
  email: { href: `mailto:${site.email}`, value: site.email, Icon: Mail, external: false, tone: "bg-royal text-white" },
};

export default function ContactChannels() {
  const { eyebrow, title, text, channels } = contactPage.reach;

  return (
    <>
      <SectionHeading eyebrow={eyebrow} title={title} description={text} />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {channels.map((channel, i) => {
          const { href, value, Icon, external, tone } = channelDetails[channel.kind];
          return (
            <Reveal key={channel.kind} delay={i * 0.08}>
              <a
                href={href}
                {...externalLinkProps(external)}
                className="card group flex h-full flex-col p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-40px_rgba(12,33,96,0.45)]"
              >
                <div className="flex items-start justify-between">
                  <span className={cn("grid size-14 place-items-center rounded-2xl", tone)}><Icon className="size-6" /></span>
                  <ArrowUpRight className="size-5 text-ink/30 transition group-hover:rotate-45 group-hover:text-royal" />
                </div>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-royal">{channel.label}</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight">{channel.title}</h3>
                <p className="mt-2 text-slate">{channel.text}</p>
                <p className="mt-auto pt-6 text-lg font-bold text-ink">{value}</p>
              </a>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
