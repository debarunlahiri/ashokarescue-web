import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { EcgLine } from "@/components/icons";
import { site } from "@/data";

export const metadata: Metadata = { title: "Page not found | Ashoka Rescue", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="under-nav relative flex min-h-[70svh] items-center overflow-hidden bg-mist py-24 lg:pt-32">
      <div aria-hidden className="absolute -right-24 -top-24 size-[420px] rounded-full bg-brand/10" />
      <div className="container-x relative text-center">
        <EcgLine className="mx-auto" animated />
        <p className="mt-3 text-base uppercase tracking-[0.14em] text-slate">Page not found</p>
        <h1 className="mt-2 font-display text-[7rem] font-extrabold leading-none text-navy md:text-[11rem]">4<span className="text-brand">0</span>4</h1>
        <p className="mx-auto mt-4 max-w-md text-slate">This page took a different route. Let’s get you back on course.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-dark">Back to home <ArrowRight className="size-4" /></Link>
          <a href={site.phones.emergency.href} className="btn btn-brand"><Phone className="size-4" /> {site.phones.emergency.label}</a>
        </div>
      </div>
    </section>
  );
}
