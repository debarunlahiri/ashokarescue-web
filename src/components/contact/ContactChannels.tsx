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
  phone: { href: site.phones.office.href, value: site.phones.office.label, Icon: Phone, external: false, tone: "bg-brand text-navy" },
  whatsapp: { href: site.whatsapp, value: "Open WhatsApp", Icon: WhatsAppIcon, external: true, tone: "bg-[#25D366] text-white" },
  email: { href: `mailto:${site.email}`, value: site.email, Icon: Mail, external: false, tone: "bg-navy text-white" },
};

export default function ContactChannels() {
  const { eyebrow, title, text, channels } = contactPage.reach;

  return (
    <>
      <SectionHeading centered eyebrow={eyebrow} title={title} description={text} />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {channels.map((channel, i) => {
          const { href, value, Icon, external, tone } = channelDetails[channel.kind];
          return (
            <Reveal key={channel.kind} delay={i * 0.07}>
              <a href={href} {...externalLinkProps(external)} className="card group flex h-full flex-col border-b-4 border-navy p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand">
                <div className="flex items-start justify-between">
                  <span className={cn("grid size-14 place-items-center rounded-full", tone)}><Icon className="size-6" /></span>
                  <ArrowUpRight className="size-5 text-navy/30 transition group-hover:text-brand" />
                </div>
                <p className="mt-7 text-xs font-medium uppercase tracking-[0.2em] text-brand-600">{channel.label}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{channel.title}</h3>
                <p className="mt-2 text-slate">{channel.text}</p>
                <p className="mt-auto pt-6 font-display text-lg font-semibold text-navy">{value}</p>
              </a>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
