import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/seo';
import { getAllProgramSlugs, getProgram } from '@/data/programs';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { businessProfile } from '@/lib/business-profile';
import { ProgramPageClient } from './page-client';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProgramSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug, 'en');
  if (!program) return {};
  return buildPageMetadata({
    title: `${program.title} | Montessori Programs`,
    description: program.description,
    path: `/programs/${slug}`
  });
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgram(slug, 'en');
  if (!program) notFound();

  const breadcrumbs = [
    { name: 'Home', url: businessProfile.url },
    { name: 'Programs', url: `${businessProfile.url}/programs` },
    { name: program.title, url: `${businessProfile.url}/programs/${slug}` }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ProgramPageClient program={program} slug={slug} />
    </>
  );
}
