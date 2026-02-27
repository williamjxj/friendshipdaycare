'use client';

import type { ProgramContent } from '@/data/programs';

interface Props {
  program: ProgramContent;
  slug: string;
}

/**
 * Client wrapper for program subpage. Uses program content from data.
 */
export function ProgramPageClient({ program, slug }: Props) {
  // Fallback to program data; can add locale lookup when content is populated
  const title = program.title || slug.charAt(0).toUpperCase() + slug.slice(1);
  const content = program.content || (
    <p className="text-muted-foreground">
      Program content for {slug} will be added here. Each program page should have 400+ words
      describing the Montessori methods, age range, and daily activities.
    </p>
  );

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8">{program.description || program.ageRange}</p>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            content
          )}
        </div>
      </div>
    </main>
  );
}
