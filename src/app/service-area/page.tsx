import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Car, Clock, MapPin, Phone } from "lucide-react";
import { FAQSchema } from "@/components/seo/StructuredData";
import { businessProfile } from "@/lib/business-profile";
import { buildPageMetadata } from "@/lib/seo";
import {
  serviceAreaFaqs,
  serviceAreaIntro,
  serviceAreaSections,
} from "@/data/service-areas";

export const metadata: Metadata = buildPageMetadata({
  title: "Daycare for Tri-Cities Families | Port Coquitlam & Port Moody",
  description:
    "Montessori daycare for Coquitlam, Port Coquitlam, and Port Moody families. Bilingual English & Mandarin care, ages 30 months to 5 years. Book a tour.",
  path: "/service-area",
});

/**
 * Bilingual (EN + ZH) service-area page.
 * Copy is server-rendered so crawlers index both English and Chinese
 * Tri-Cities keywords: Coquitlam / 高贵林, Port Coquitlam / 高貴林港,
 * Port Moody / 满地宝.
 */
export default function ServiceAreaPage() {
  return (
    <>
      <FAQSchema
        questions={serviceAreaFaqs.map(({ question, answer }) => ({
          question,
          answer,
        }))}
      />
      <main
        id="main-content"
        className="fdc-section-shell min-h-screen overflow-x-hidden pb-20 pt-20"
      >
        <section className="fdc-page-hero px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="fdc-hero-grid">
              <div className="relative z-10 space-y-6">
                <span className="fdc-kicker">
                  {serviceAreaIntro.kicker} · {serviceAreaIntro.kickerZh}
                </span>
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-4xl font-display font-bold leading-[0.98] text-slate-900 sm:text-5xl lg:max-w-5xl lg:text-6xl">
                    {serviceAreaIntro.title}
                  </h1>
                  <p className="max-w-3xl text-lg font-bold text-slate-800">
                    {serviceAreaIntro.titleZh}
                  </p>
                  <p className="max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
                    {serviceAreaIntro.lead}
                  </p>
                  <p className="max-w-4xl text-base leading-8 text-slate-700">
                    {serviceAreaIntro.leadZh}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {serviceAreaIntro.chips.map((chip) => (
                    <span key={chip} className="fdc-stat-chip">
                      <MapPin className="h-4.5 w-4.5 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{chip}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative z-10">
                <aside className="fdc-panel p-6 sm:p-7">
                  <span className="fdc-kicker">Visit or Call Us · 联系与参观</span>
                  <h2 className="mt-3 text-2xl font-display font-bold text-foreground">
                    Easy to reach from the Tri-Cities
                  </h2>
                  <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                      <span>
                        {businessProfile.address.streetAddress}
                        <br />
                        {businessProfile.address.addressLocality},{" "}
                        {businessProfile.address.addressRegion}{" "}
                        {businessProfile.address.postalCode}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="h-4.5 w-4.5 shrink-0 text-primary" />
                      <a
                        href={`tel:${businessProfile.telephone.replace(/\D/g, "")}`}
                        className="font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        {businessProfile.telephone}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                      <span>Mon–Fri, 7:00 AM – 6:00 PM</span>
                    </li>
                  </ul>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href="/welcome"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
                    >
                      <CalendarDays className="h-5 w-5" aria-hidden />
                      Book a Tour · 预约参观
                    </Link>
                    <Link
                      href="/#contact-form"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-6 py-3 font-bold text-primary transition-colors hover:bg-primary/5"
                    >
                      Ask a Question · 在线咨询
                    </Link>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <header className="mb-8 max-w-3xl">
              <span className="fdc-kicker">Neighbourhood Guide · 社区指南</span>
              <h2 className="mt-3 text-3xl font-display font-bold text-slate-900 sm:text-4xl">
                Closer than you think
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                Here is what parents from Port Coquitlam and Port Moody usually
                want to know — in English and 中文.
              </p>
            </header>
            <div className="grid gap-5 lg:grid-cols-2">
              {serviceAreaSections.map((section) => (
                <article key={section.city} className="fdc-panel p-6 sm:p-8">
                  <span className="fdc-kicker">
                    {section.city} · {section.cityZh}
                  </span>
                  <h3 className="mt-3 text-2xl font-display font-bold text-foreground">
                    {section.headline}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-700">{section.body}</p>
                  <ul className="mt-5 space-y-2">
                    {section.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-6 text-foreground"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="my-6 border-t border-border/70" aria-hidden />
                  <h4 className="text-lg font-bold text-slate-900">{section.headlineZh}</h4>
                  <p className="mt-2 text-base leading-7 text-slate-700">{section.bodyZh}</p>
                  <ul className="mt-4 space-y-2">
                    {section.pointsZh.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-6 text-foreground"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                          aria-hidden
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 flex items-start gap-3 rounded-2xl bg-muted/50 p-4 text-sm leading-6 text-muted-foreground">
                    <Car className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                    <span>
                      {section.commute}
                      <br />
                      {section.commuteZh}
                    </span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="service-area-faq-heading">
          <div className="mx-auto max-w-5xl">
            <header className="text-center">
              <span className="fdc-kicker">Common Questions · 常见问题</span>
              <h2
                id="service-area-faq-heading"
                className="mt-3 text-3xl font-display font-bold text-slate-900 sm:text-4xl"
              >
                What Tri-Cities parents ask us
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                中英双语问答，方便您和家人一起了解。
              </p>
            </header>
            <div className="mt-8 space-y-3">
              {serviceAreaFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-border bg-white/80 p-5"
                >
                  <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-primary">/ {faq.questionZh}</span>
                      <span
                        aria-hidden
                        className="text-primary transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <div className="mt-3 space-y-3 leading-7 text-slate-700">
                    <p className="text-sm">{faq.answer}</p>
                    <p className="border-l-2 border-primary/30 pl-3 text-sm">{faq.answerZh}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="fdc-panel bg-primary p-8 text-center text-primary-foreground sm:p-10">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/80">
                Next Step · 下一步
              </span>
              <h2 className="mt-3 text-3xl font-display font-bold sm:text-4xl">
                Come see the classroom in person
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-primary-foreground/90">
                Meet our educators, watch the Montessori work cycle in action, and see
                whether Friendship Corner feels like home for your family.
                <br />
                欢迎预约参观：亲自看看教室，认识老师，感受蒙特梭利工作氛围。
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/welcome"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-primary"
                >
                  <CalendarDays className="h-4.5 w-4.5" aria-hidden />
                  Book a Tour · 预约参观
                </Link>
                <a
                  href={`tel:${businessProfile.telephone.replace(/\D/g, "")}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 px-6 text-sm font-bold text-white"
                >
                  <Phone className="h-4.5 w-4.5" aria-hidden />
                  Call {businessProfile.telephone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
