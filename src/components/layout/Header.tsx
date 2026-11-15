"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, MapPin, Menu, Phone, X, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { Logo } from "@/components/ui";
import { navigation, site } from "@/data";
import { setScrollLocked } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

type InfoItemProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  showLabel?: boolean;
  external?: boolean;
};

function InfoItem({ icon: Icon, label, value, href, showLabel, external }: InfoItemProps) {
  return (
    <a
      href={href}
      aria-label={`${label}: ${value}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-1.5 whitespace-nowrap py-2 text-xs leading-tight text-brand hover:underline focus-visible:outline-brand"
    >
      <Icon aria-hidden className="size-3.5 shrink-0" />
      {showLabel && <span>{label}</span>}
      <span>{value}</span>
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMegaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMegaOpen]);

  useEffect(() => {
    setScrollLocked(isMenuOpen);
    return () => setScrollLocked(false);
  }, [isMenuOpen]);

  return (
    <>
      <div className="hidden bg-[#90e0ef] lg:block">
        <div className="container-x flex items-center justify-end gap-6">
          <InfoItem
            icon={Phone}
            label="24/7 emergency line"
            value={site.phones.emergency.label}
            href={site.phones.emergency.href}
            showLabel
          />
          <InfoItem
            icon={Mail}
            label="Email"
            value={site.email}
            href={`mailto:${site.email}`}
          />
          <InfoItem
            icon={MapPin}
            label="Office location"
            value="Gurugram, Haryana"
            href={site.address.mapUrl}
            external
          />
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-brand shadow-[0_8px_30px_-14px_rgba(16,32,121,0.35)]">
        <div className="container-x">
          <div className="relative flex h-[var(--nav-h)] items-center justify-between gap-4 lg:px-5 xl:px-8">
            <Logo
              className="shrink-0 focus-visible:outline-white"
              imageClassName="size-14 lg:size-[4.5rem]"
              tone="light"
              showWordmark
            />

            <nav
              aria-label="Main"
              className="hidden h-full lg:flex lg:items-center"
              onMouseLeave={() => setIsMegaOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsMegaOpen(false);
              }}
            >
              <ul className="flex items-center gap-4 xl:gap-7">
                {navigation.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  const isServices = item.href === "/services";
                  const className = cn(
                    "flex items-center gap-1 py-5 font-display text-[0.95rem] font-semibold transition-colors focus-visible:outline-white xl:text-base",
                    isActive ? "text-white" : "text-white/80 hover:text-white",
                  );

                  return (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={className}
                          onMouseEnter={() => setIsMegaOpen(false)}
                        >
                          {item.label}
                          <ArrowUpRight aria-hidden className="size-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className={className}
                          onMouseEnter={() => setIsMegaOpen(isServices)}
                          onFocus={() => setIsMegaOpen(isServices)}
                          aria-current={pathname === item.href ? "page" : undefined}
                          aria-haspopup={isServices || undefined}
                          aria-expanded={isServices ? isMegaOpen : undefined}
                        >
                          {item.label}
                          {isServices && (
                            <ChevronDown
                              aria-hidden
                              className={cn("size-4 transition-transform", isMegaOpen && "rotate-180")}
                            />
                          )}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <AnimatePresence>{isMegaOpen && <MegaMenu />}</AnimatePresence>
            </nav>

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setIsMegaOpen(false)}
              className="hidden h-10 shrink-0 items-center gap-2 rounded bg-white px-4 font-display text-sm font-semibold text-brand transition-colors hover:bg-brand-50 focus-visible:outline-white lg:inline-flex xl:px-5"
            >
              <WhatsAppIcon className="size-5" />
              Request assistance
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid size-11 place-items-center rounded border border-white/30 text-white hover:bg-white/10 focus-visible:outline-white lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{isMenuOpen && <MobileMenu />}</AnimatePresence>
    </>
  );
}
