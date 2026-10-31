"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SocialIcon } from "@/components/icons";
import { Logo } from "@/components/ui";
import { navigation, site } from "@/data";
import { setScrollLocked } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setIsScrolled(y > 20));

  useEffect(() => {
    setIsScrolled(window.scrollY > 20);
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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          isScrolled && !isMenuOpen
            ? "border-white/10 bg-ink/80 shadow-[0_12px_40px_-16px_rgba(7,19,48,0.55)] backdrop-blur-lg backdrop-saturate-150 supports-[not(backdrop-filter:blur(1px))]:bg-ink"
            : "border-transparent bg-ink",
        )}
      >
        <div
          aria-hidden={isScrolled}
          className={cn(
            "hidden overflow-hidden border-b transition-[height,opacity,border-color] duration-500 md:block",
            isScrolled ? "pointer-events-none h-0 border-transparent opacity-0" : "h-9 border-white/10 opacity-100",
          )}
        >
          <div className="container-x flex h-9 items-center justify-between text-[0.78rem] text-white/80">
            <div className="flex items-center divide-x divide-white/15">
              <a href={site.phones.emergency.href} className="flex items-center gap-2 pr-4 transition-colors hover:text-white">
                <Phone className="size-3.5 text-sun" /> {site.phones.emergency.label}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 px-4 transition-colors hover:text-white">
                <Mail className="size-3.5 text-sun" /> {site.email}
              </a>
              <a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 pl-4 transition-colors hover:text-white">
                <MapPin className="size-3.5 text-sun" /> Gurugram, Haryana
              </a>
            </div>
            <div className="flex items-center gap-4">
              {(Object.keys(site.social) as (keyof typeof site.social)[]).map((name) => (
                <a key={name} href={site.social[name]} target="_blank" rel="noreferrer" aria-label={name} className="transition-colors hover:text-white">
                  <SocialIcon name={name} className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="container-x">
          <div className="relative flex h-20 items-center justify-between md:h-24">
            <Logo className="[&_img]:size-14 md:[&_img]:size-[4.5rem]" />

            <nav className="hidden items-center gap-1 self-stretch lg:flex" onMouseLeave={() => setIsMegaOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsMegaOpen(false);
              }}
            >
              {navigation.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const isServices = item.href === "/services";
                const className = cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-[0.88rem] font-semibold transition-colors",
                  isActive ? "text-white" : "text-white/70 hover:text-white",
                );
                const content = (
                  <>
                    {isActive && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    {item.label}
                    {isServices && <ChevronDown className={cn("size-3.5 transition-transform", isMegaOpen && "rotate-180")} />}
                    {item.external && <ArrowUpRight className="size-3.5" />}
                  </>
                );

                return item.external ? (
                  <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className={className} onMouseEnter={() => setIsMegaOpen(false)}>
                    {content}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={className}
                    onMouseEnter={() => setIsMegaOpen(isServices)}
                    onFocus={() => setIsMegaOpen(isServices)}
                    aria-haspopup={isServices || undefined}
                    aria-expanded={isServices ? isMegaOpen : undefined}
                  >
                    {content}
                  </Link>
                );
              })}
              <AnimatePresence>{isMegaOpen && <MegaMenu />}</AnimatePresence>
            </nav>

            <div className="flex items-center gap-2">
              <a href={site.phones.emergency.href} className="btn btn-primary hidden h-11 shrink-0 self-center !py-0 sm:inline-flex">
                <Phone className="size-4" /> Call 24/7
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="grid size-12 place-items-center rounded-2xl bg-white/10 text-white lg:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>{isMenuOpen && <MobileMenu />}</AnimatePresence>
    </>
  );
}
