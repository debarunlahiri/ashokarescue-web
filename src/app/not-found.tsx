import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/data";

export const metadata: Metadata = { title: "Page not found | Ashoka Rescue", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[90vh] items-center overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute left-1/2 top-1/3 size-[600px] -translate-x-1/2 rounded-full bg-royal/40 blur-[160px]" />
      <div className="container-x relative text-center">
        <p className="eyebrow eyebrow-light justify-center">Page not found</p>
        <h1 className="display mt-6 text-[7rem] leading-none md:text-[12rem]">4<span className="text-flare">0</span>4</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">This page took a different route. Let’s get you back on course.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back to home <ArrowRight className="size-4" /></Link>
          <a href={site.phones.emergency.href} className="btn btn-ghost"><Phone className="size-4" /> {site.phones.emergency.label}</a>
        </div>
      </div>
    </section>
  );
}
