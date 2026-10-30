"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SocialIcon } from "@/components/icons";
import { Logo } from "@/components/ui";
import { navigation, site } from "@/data";
import { EASE_OUT_EXPO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(y > 40);
    setIsHidden(y > 400 && y > previous && !isMenuOpen);
  });

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  const isSolid = isScrolled || isMenuOpen;

  return (
    <>
      <motion.header
        animate={{ y: isHidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className={cn("hidden overflow-hidden transition-all duration-500 md:block", isSolid ? "h-0 opacity-0" : "h-9 opacity-100")}>
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

        <div className="container-x pt-2 md:pt-0">
          <div
            className={cn(
              "flex items-center justify-between rounded-3xl px-2 transition-all duration-500",
              isSolid ? "mt-2 bg-ink/85 py-2 shadow-[0_20px_60px_-20px_rgba(7,19,48,0.6)] ring-1 ring-white/10 backdrop-blur-xl" : "py-3",
            )}
          >
            <Logo />

            <nav className="relative hidden items-center gap-1 lg:flex" onMouseLeave={() => setIsMegaOpen(false)}>
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
                  <Link key={item.href} href={item.href} className={className} onMouseEnter={() => setIsMegaOpen(isServices)}>
                    {content}
                  </Link>
                );
              })}
              <AnimatePresence>{isMegaOpen && <MegaMenu />}</AnimatePresence>
            </nav>

            <div className="flex items-stretch gap-2 self-stretch">
              <a href={site.phones.emergency.href} className="btn btn-primary hidden !rounded-2xl !py-0 !text-base sm:inline-flex">
                <Phone className="size-4" /> Call 24/7
              </a>
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="grid size-12 place-items-center self-center rounded-2xl bg-white/10 text-white lg:hidden"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{isMenuOpen && <MobileMenu />}</AnimatePresence>
    </>
  );
}
