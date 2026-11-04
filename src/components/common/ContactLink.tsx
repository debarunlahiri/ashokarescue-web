import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn, externalLinkProps } from "@/lib/utils";

type ContactLinkProps = {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  variant?: "dark" | "light";
  external?: boolean;
};

export default function ContactLink({ href, icon, label, value, variant = "light", external }: ContactLinkProps) {
  const isDark = variant === "dark";
  return (
    <a href={href} {...externalLinkProps(external)} className={cn("group flex items-center gap-4 rounded px-5 py-4 transition hover:-translate-y-0.5", isDark ? "bg-navy text-white" : "bg-white text-navy shadow-sm ring-1 ring-line")}>
      <span className={cn("grid size-11 place-items-center rounded-full", isDark ? "bg-brand text-navy" : "bg-[#25D366]/10 text-[#1da851]")}>{icon}</span>
      <span className="flex-1">
        <span className={cn("block text-xs", isDark ? "text-white/65" : "text-slate")}>{label}</span>
        <span className={cn("font-display text-lg font-semibold", isDark ? "text-white" : "text-navy")}>{value}</span>
      </span>
      <ArrowUpRight className="size-5 opacity-50 transition group-hover:opacity-100" />
    </a>
  );
}
