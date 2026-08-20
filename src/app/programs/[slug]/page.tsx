import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { CourseSchema, FAQSchema } from "@/components/seo/StructuredData";
import { businessProfile } from "@/lib/business-profile";
import { getAllProgramSlugs, getProgram } from "@/data/programs";
import { buildPageMetadata } from "@/lib/seo";

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

/** Only the three real program pages exist; anything else is a hard 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProgramSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};

  return buildPageMetadata({
    title: program.metaTitle,
    description: program.metaDescription,
    path: `/programs/${slug}`,
  });
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const pageUrl = `${businessProfile.url}/programs/${slug}`;
  const facts = [
    { icon: Users, label: "Age Range", value: program.ageRange },
    { icon: Clock, label: "Hours", value: "Mon–Fri, 7:00 AM – 6:00 PM" },
    { icon: BadgeCheck, label: "Staff-to-Child", value: "1:8" },
    { icon: GraduationCap, label: "License", value: "BC Licensed Group Daycare" },
    { icon: MapPin, label: "Location", value: "2950 Dewdney Trunk Road, Coquitlam" },
  ];

  return (
    <>
      <CourseSchema
        name={`${program.title} at Friendship Corner Daycare`}
        description={program.metaDescription}
        provider={businessProfile.name}
        url={pageUrl}
        image={`${businessProfile.url}/og/home.png`}
        ageRange={program.ageRange}
        educationalLevel="Preschool"
      />
      <FAQSchema questions={program.faqs} />

      <article className="fdc-section-shell min-h-screen overflow-x-hidden pb-20 pt-10">
        <div className="mx-auto w-full min-w-[280px] max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="space-y-5">
            <p className="fdc-kicker">Montessori Program in Coquitlam</p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-display font-bold text-slate-900 sm:text-5xl">
                {program.title}
              </h1>
              <span className="rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-bold text-primary">
                {program.ageRange}
              </span>
            </div>
            <p className="max-w-4xl text-base leading-7 text-slate-700 sm:text-lg">
              {program.summary}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/welcome"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
              >
                <CalendarDays className="h-5 w-5" aria-hidden />
                Schedule a Tour
              </Link>
              <Link
                href="/#enrollment"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white px-6 py-3 font-bold text-primary transition-colors hover:bg-primary/5"
              >
                Start Enrollment
              </Link>
            </div>
          </header>

          <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Program facts">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-start gap-3 rounded-2xl border border-border bg-white/80 p-4">
                <fact.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{fact.label}</p>
                  <p className="font-semibold text-slate-900">{fact.value}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-white/80 p-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Contact</p>
                <p className="font-semibold text-slate-900">
                  <a href={`tel:${businessProfile.telephone.replace(/\D/g, "")}`} className="hover:text-primary">
                    {businessProfile.telephone}
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12" aria-labelledby="highlights-heading">
            <h2 id="highlights-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Why families choose this program
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {program.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5 rounded-xl bg-primary/5 p-3.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-slate-800">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 space-y-8" aria-labelledby="curriculum-heading">
            <h2 id="curriculum-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What your child will learn
            </h2>
            {program.curriculum.map((item) => (
              <div key={item.heading} className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">{item.heading}</h3>
                <p className="leading-7 text-slate-700">{item.body}</p>
              </div>
            ))}
          </section>

          <section className="mt-12" aria-labelledby="schedule-heading">
            <h2 id="schedule-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              A day in the {program.title.toLowerCase()}
            </h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary/10">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold text-slate-900">Time</th>
                    <th scope="col" className="px-4 py-3 font-bold text-slate-900">Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {program.schedule.map((row) => (
                    <tr key={`${row.time}-${row.activity}`} className="bg-white/80">
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">{row.time}</td>
                      <td className="px-4 py-3 text-slate-700">{row.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Hours may vary by group and season; contact us for the current schedule for your child&apos;s group.
            </p>
          </section>

          <section className="mt-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {program.title} FAQs
            </h2>
            <div className="mt-6 space-y-3">
              {program.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-border bg-white/80 p-5">
                  <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span aria-hidden className="text-primary transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to see the classroom in person?</h2>
            <p className="mt-3 max-w-3xl leading-7 text-primary-foreground/90">
              Book a tour at our licensed Coquitlam daycare, meet our educators, and see the {program.title.toLowerCase()}{" "}
              in action. We serve families from Coquitlam, Port Coquitlam, Port Moody and across the Tri-Cities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/welcome"
                className="rounded-xl bg-white px-6 py-3 font-bold text-primary transition-colors hover:bg-primary-foreground"
              >
                Schedule a Tour
              </Link>
              <Link
                href="/funding"
                className="rounded-xl border border-primary-foreground/40 px-6 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                See Funding Options
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
