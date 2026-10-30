import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { about, contactPage, faqPage, pageKeywords, privacyPolicy, seoRules, servicesPage, services, site, termsAndConditions } from "@/data";
import { absoluteUrl, serviceKeywords } from "@/lib/seo";

export const metadata: Metadata = { title: "SEO report", robots: { index: false, follow: false } };

type Row = { path: string; title: string; description: string; keywords: string[] };

function buildRows(): Row[] {
  const statics: [string, { title: string; description: string }][] = [
    ["/", site.meta],
    ["/about", about.meta],
    ["/services", servicesPage.meta],
    ["/contact", contactPage.meta],
    ["/faqs", faqPage.meta],
    ["/privacy", privacyPolicy.meta],
    ["/terms", termsAndConditions.meta],
  ];
  return [
    ...statics.map(([path, meta]) => ({ path, ...meta, keywords: pageKeywords[path] ?? [] })),
    ...services.map((s) => ({ path: `/services/${s.slug}`, ...s.meta, keywords: serviceKeywords(s.name) })),
  ];
}

function check(length: number, { min, max }: { min: number; max: number }) {
  if (length === 0) return { label: "Missing", tone: "bg-red-100 text-red-700" };
  if (length < min) return { label: "Short", tone: "bg-amber-100 text-amber-800" };
  if (length > max) return { label: "Long", tone: "bg-amber-100 text-amber-800" };
  return { label: "Good", tone: "bg-emerald-100 text-emerald-700" };
}

export default function SeoReportPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const rows = buildRows();
  const titles = rows.map((r) => r.title);
  const descriptions = rows.map((r) => r.description);
  const issues = rows.filter(
    (r) =>
      check(r.title.length, seoRules.title).label !== "Good" ||
      check(r.description.length, seoRules.description).label !== "Good" ||
      titles.filter((t) => t === r.title).length > 1 ||
      descriptions.filter((d) => d === r.description).length > 1,
  ).length;

  return (
    <main className="container-x py-32">
      <h1 className="display text-4xl">SEO report</h1>
      <p className="mt-3 max-w-2xl text-slate">
        Development only. Titles should be {seoRules.title.min}–{seoRules.title.max} characters and descriptions {seoRules.description.min}–{seoRules.description.max}.
        Edit titles and descriptions in <code>src/data/*.ts</code> and keywords in <code>src/data/seo.ts</code>.
      </p>
      <p className="mt-4 font-semibold">{rows.length} pages · {issues === 0 ? "no issues found" : `${issues} to review`}</p>

      <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-ink/10">
        <table className="w-full min-w-[900px] bg-white text-left text-sm">
          <thead className="bg-mist text-xs uppercase tracking-wider text-navy">
            <tr>
              <th className="p-3">Page</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Keywords</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10 align-top">
            {rows.map((row) => {
              const t = check(row.title.length, seoRules.title);
              const d = check(row.description.length, seoRules.description);
              const duplicateTitle = titles.filter((x) => x === row.title).length > 1;
              const duplicateDescription = descriptions.filter((x) => x === row.description).length > 1;
              return (
                <tr key={row.path}>
                  <td className="p-3 font-semibold"><a href={row.path} className="text-royal hover:underline">{row.path}</a><div className="mt-1 text-xs font-normal text-slate">{absoluteUrl(row.path)}</div></td>
                  <td className="p-3"><p>{row.title}</p><p className="mt-2 flex gap-2 text-xs"><span className={`rounded-full px-2 py-0.5 font-semibold ${t.tone}`}>{t.label}</span><span className="text-slate">{row.title.length} chars</span>{duplicateTitle && <span className="font-semibold text-red-600">Duplicate</span>}</p></td>
                  <td className="p-3"><p>{row.description}</p><p className="mt-2 flex gap-2 text-xs"><span className={`rounded-full px-2 py-0.5 font-semibold ${d.tone}`}>{d.label}</span><span className="text-slate">{row.description.length} chars</span>{duplicateDescription && <span className="font-semibold text-red-600">Duplicate</span>}</p></td>
                  <td className="p-3 text-slate">{row.keywords.join(", ") || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="mt-8 grid gap-1 text-sm text-slate">
        <li>Sitemap: <a className="text-royal hover:underline" href="/sitemap.xml">/sitemap.xml</a></li>
        <li>Robots: <a className="text-royal hover:underline" href="/robots.txt">/robots.txt</a></li>
        <li>Web manifest: <a className="text-royal hover:underline" href="/manifest.webmanifest">/manifest.webmanifest</a></li>
      </ul>
    </main>
  );
}
