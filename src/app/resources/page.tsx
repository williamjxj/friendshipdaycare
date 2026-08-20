import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Download, FileText, House, NotebookPen, Sparkles } from 'lucide-react';
import { BrandResourcesHeroStrip } from '@/components/ui/brand-visual-assets';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Parent Resources & Handbook',
  description: 'Parent resources at Friendship Corner Daycare in Coquitlam: handbook, policies, subsidy guides & Montessori reading. Helpful for Tri-Cities families.',
  path: '/resources',
});

interface Resource {
  title: string;
  description: string;
  type: 'PDF' | 'Guide' | 'Checklist' | 'Article';
  icon: string;
  downloadUrl?: string;
}

interface ResourceCategory {
  category: string;
  icon: string;
  resources: Resource[];
}

export default function ResourcesPage() {
  const resourceData: ResourceCategory[] = [
    {
      category: 'Essential Documents',
      icon: '📋',
      resources: [
        { title: 'Parent Handbook', description: 'Complete guide to policies, procedures, and what to expect at Friendship Corner', type: 'PDF', icon: '📖' },
        { title: 'Enrollment Application', description: 'Fillable PDF application form for new families', type: 'PDF', icon: '✍️', downloadUrl: '/assets/Registration form 2026.pdf' },
        { title: 'Medical Information Form', description: 'Required health and emergency contact information', type: 'PDF', icon: '🏥' },
        { title: 'Field Trip Permission Form', description: 'Annual consent form for off-site activities', type: 'PDF', icon: '🚌' },
      ],
    },
    {
      category: 'Getting Started',
      icon: '🌟',
      resources: [
        { title: 'First Day Checklist', description: 'Everything your child needs for a successful first day', type: 'Checklist', icon: '✅' },
        { title: 'Separation Anxiety Guide', description: 'Tips for helping your child adjust to daycare', type: 'Guide', icon: '🤗' },
        { title: 'What to Pack Daily', description: 'Daily essentials your child should bring', type: 'Checklist', icon: '🎒' },
        { title: 'Potty Training Partnership', description: 'How we support families through potty training', type: 'Guide', icon: '🚽' },
      ],
    },
    {
      category: 'Montessori at Home',
      icon: '🏠',
      resources: [
        { title: 'Montessori Activities for Toddlers', description: 'Simple activities you can do at home (Ages 2-3)', type: 'Guide', icon: '👶' },
        { title: 'Practical Life Skills Activities', description: 'Help your child develop independence at home', type: 'Guide', icon: '🧹' },
        { title: 'Creating a Prepared Environment', description: "Set up your home to support your child's development", type: 'Article', icon: '🛋️' },
        { title: 'Montessori-Inspired Toys & Materials', description: 'Recommended toys that support learning', type: 'Guide', icon: '🧸' },
      ],
    },
    {
      category: 'Health & Wellness',
      icon: '💚',
      resources: [
        { title: 'Healthy Lunchbox Ideas', description: 'Nutritious, kid-friendly lunch suggestions', type: 'Guide', icon: '🥗' },
        { title: 'Illness Policy Quick Reference', description: 'When to keep your child home and when they can return', type: 'Checklist', icon: '🤒' },
        { title: 'Allergy Management Plan', description: 'How we handle food allergies and keep children safe', type: 'Guide', icon: '⚠️' },
        { title: 'Sleep Tips for Young Children', description: 'Establishing healthy sleep routines', type: 'Article', icon: '😴' },
      ],
    },
    {
      category: 'School Readiness',
      icon: '🎓',
      resources: [
        { title: 'Kindergarten Readiness Skills', description: 'What children should know before starting kindergarten', type: 'Checklist', icon: '📝' },
        { title: 'Pre-Reading Activities', description: 'Fun ways to build literacy skills at home', type: 'Guide', icon: '📚' },
        { title: 'Math Readiness Through Play', description: 'Everyday activities that teach math concepts', type: 'Guide', icon: '🔢' },
        { title: 'Social-Emotional Development', description: "Supporting your child's emotional intelligence", type: 'Article', icon: '❤️' },
      ],
    },
    {
      category: 'Seasonal & Special',
      icon: '🎉',
      resources: [
        { title: 'Summer Activity Ideas', description: 'Keep learning going during summer break', type: 'Guide', icon: '☀️' },
        { title: 'Holiday Traditions Around the World', description: 'Celebrate diversity with your family', type: 'Article', icon: '🌍' },
        { title: 'Birthday Celebration Guidelines', description: 'How to celebrate birthdays at our center', type: 'Guide', icon: '🎂' },
        { title: 'Outdoor Play in All Weather', description: 'Why outdoor play matters and how to dress for it', type: 'Article', icon: '🌦️' },
      ],
    },
  ];

  const handbookSections = [
    { title: 'Welcome & Philosophy', items: ["Director's Welcome", 'Our Mission & Vision', 'Montessori Approach', 'Biblical Values Integration'] },
    { title: 'Daily Operations', items: ['Hours of Operation', 'Daily Schedule', 'Drop-off & Pick-up', 'Attendance Policy'] },
    { title: 'Health & Safety', items: ['Illness Policy', 'Medication Administration', 'Allergy Management', 'Emergency Procedures'] },
    { title: 'Curriculum & Learning', items: ['Program Overview', 'Learning Areas', 'Assessment & Progress', 'Transitions'] },
    { title: 'Policies & Procedures', items: ['Tuition & Payment', 'Withdrawal Policy', 'Behavior Guidance', 'Parent Involvement'] },
    { title: 'Communication', items: ['Parent-Teacher Communication', 'Conferences', 'Updates & Newsletters', 'Concerns & Feedback'] },
  ];

  return (
    <div className="fdc-section-shell overflow-x-hidden pb-20 pt-20">
      <main className="flex-grow">
        <section className="fdc-page-hero px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="fdc-hero-grid">
              <div className="relative z-10 space-y-6">
                <span className="fdc-kicker">Parent Resources</span>
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-4xl font-display font-bold leading-[0.98] text-slate-900 sm:text-5xl lg:max-w-5xl lg:text-6xl">
                    Documents, checklists, and practical guidance families can actually use.
                  </h1>
                  <p className="max-w-4xl text-base leading-8 text-slate-700 sm:text-lg">
                    This library is organized for real parent questions: what to read first, what to download, what helps at home, and what supports a smoother start at daycare.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="fdc-stat-chip">
                    <FileText className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Handbook + forms</span>
                  </span>
                  <span className="fdc-stat-chip">
                    <House className="h-4.5 w-4.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Montessori-at-home ideas</span>
                  </span>
                </div>
              </div>
              <div className="relative z-10">
                <BrandResourcesHeroStrip className="mt-0 max-w-none" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
            <div className="fdc-panel p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Featured Handbook</p>
                  <h2 className="mt-2 text-3xl font-display font-bold text-foreground">Complete parent handbook</h2>
                  <p className="mt-3 fdc-prose">
                    Our handbook collects the policies, routines, and everyday expectations that matter most once your child starts. It is the fastest way to understand how the center runs.
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {handbookSections.map((section) => (
                  <div key={section.title} className="rounded-[1.35rem] border border-border/70 bg-white/75 p-5">
                    <h3 className="text-lg font-display font-bold text-foreground">{section.title}</h3>
                    <ul className="fdc-dot-list mt-4">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <aside className="fdc-panel p-6 sm:p-7">
              <span className="fdc-kicker">Quick Actions</span>
              <div className="mt-5 space-y-3">
                <Link href="/#contact-form" className="fdc-link-card">
                  <div>
                    <p className="text-base font-bold text-foreground">Request the handbook</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">We’ll email you a copy of the full policies and daily expectations.</p>
                  </div>
                  <ArrowRight className="h-4.5 w-4.5 shrink-0 text-primary" />
                </Link>
                <a href="/assets/Registration form 2026.pdf" download="Friendship-Corner-Daycare-Registration-2026.pdf" className="fdc-link-card">
                  <div>
                    <p className="text-base font-bold text-foreground">Get the enrollment application</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Use the latest application form for new families.</p>
                  </div>
                  <Download className="h-4.5 w-4.5 shrink-0 text-primary" />
                </a>
                <Link href="/#contact-form" className="fdc-link-card">
                  <div>
                    <p className="text-base font-bold text-foreground">Need help finding the right resource?</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">Contact us and we’ll point you to the right document or next step.</p>
                  </div>
                  <ArrowRight className="h-4.5 w-4.5 shrink-0 text-primary" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-6">
            {resourceData.map((category) => (
              <section key={category.category} className="fdc-panel p-6 sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className="text-2xl font-display font-bold text-foreground">{category.category}</h2>
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                    {category.resources.length} resources
                  </span>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {category.resources.map((resource) => (
                    <article key={resource.title} className="rounded-[1.35rem] border border-border/70 bg-white/75 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,23,42,0.08)]">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{resource.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <h3 className="text-lg font-bold text-foreground">{resource.title}</h3>
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-primary">
                              {resource.type}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">{resource.description}</p>
                          {resource.downloadUrl ? (
                            <a href={resource.downloadUrl} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                              <Download className="h-4 w-4" />
                              Download
                            </a>
                          ) : (
                            <Link href="/#contact-form" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                              <NotebookPen className="h-4 w-4" />
                              Request a copy
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="fdc-panel bg-primary p-8 text-center text-primary-foreground sm:p-10">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-3xl font-display font-bold">Need a resource that isn&apos;t listed yet?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-white/90">
                Ask us for the form, guide, or answer you need. We can direct you to enrollment materials, policy details, or the right next step for your family.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/#contact-form" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-primary">
                  Contact Us
                </Link>
                <Link href="/#enrollment" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-bold text-white">
                  Explore Enrollment
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
