"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, MapPin, Menu, Phone, X, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui";
import { navigation, site } from "@/data";
import { setScrollLocked } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

function InfoItem({ icon: Icon, label, value, href, external }: { icon: LucideIcon; label: string; value: string; href: string; external?: boolean }) {
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="group flex items-start gap-2.5">
      <Icon className="mt-1 size-4 shrink-0 text-navy transition-colors group-hover:text-brand" />
      <span>
        <span className="block text-sm text-slate">{label}</span>
        <span className="block font-display text-[1.05rem] font-semibold leading-snug text-navy transition-colors group-hover:text-brand-600">{value}</span>
      </span>
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* Logo + contact details. Sticks on mobile (where it carries the menu button); scrolls away on desktop. */}
      <div className="z-50 border-b border-line bg-white max-lg:sticky max-lg:top-0 lg:border-0">
        <div className="container-x flex h-16 items-center justify-between lg:h-[8.25rem]">
          <Logo />

          <div className="hidden items-start gap-10 lg:flex xl:gap-16">
            <InfoItem icon={Phone} label="Emergency 24/7" value={site.phones.emergency.label} href={site.phones.emergency.href} />
            <InfoItem icon={Mail} label="Email Address" value={site.email} href={`mailto:${site.email}`} />
            <InfoItem icon={MapPin} label="Location" value="Gurugram, Haryana" href={site.address.mapUrl} external />
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded bg-brand text-navy lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Floating nav card; becomes a full-width white bar once scrolled. */}
      <div
        className={cn(
          "sticky top-0 z-50 hidden transition-[background,box-shadow] duration-300 lg:block",
          isScrolled ? "bg-white shadow-[0_8px_30px_-14px_rgba(16,32,122,0.35)]" : "bg-[linear-gradient(to_bottom,#fff_50%,transparent_50%)]",
        )}
      >
        <div className="container-x">
          <nav
            aria-label="Main"
            className={cn("relative flex h-[var(--nav-h)] items-center justify-between bg-white px-8 transition-shadow duration-300", !isScrolled && "shadow-[0_14px_40px_-16px_rgba(16,32,122,0.3)]")}
            onMouseLeave={() => setIsMegaOpen(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsMegaOpen(false);
            }}
          >
            <ul className="flex items-center gap-8 xl:gap-10">
              {navigation.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const isServices = item.href === "/services";
                const className = cn(
                  "flex items-center gap-1 py-6 font-display text-[1.02rem] font-semibold transition-colors",
                  isActive ? "text-brand-600" : "text-navy hover:text-brand-600",
                );
                return (
                  <li key={item.href}>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className={className} onMouseEnter={() => setIsMegaOpen(false)}>
                        {item.label} <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={className}
                        onMouseEnter={() => setIsMegaOpen(isServices)}
                        onFocus={() => setIsMegaOpen(isServices)}
                        aria-haspopup={isServices || undefined}
                        aria-expanded={isServices ? isMegaOpen : undefined}
                      >
                        {item.label}
                        {isServices && <ChevronDown className={cn("size-4 transition-transform", isMegaOpen && "rotate-180")} />}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <Link href="/contact#assistance" className="inline-flex h-11 items-center gap-2 rounded bg-brand px-6 font-display text-[0.95rem] font-semibold text-navy transition-colors hover:bg-[#7ad3f5]">
              Request assistance
            </Link>

            <AnimatePresence>{isMegaOpen && <MegaMenu />}</AnimatePresence>
          </nav>
        </div>
      </div>

      <AnimatePresence>{isMenuOpen && <MobileMenu />}</AnimatePresence>
    </>
  );
}
