import type { ReactNode } from "react";

interface StaticContentPageProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function StaticContentPage({ title, description, children }: StaticContentPageProps) {
  return (
    <div id="main-content" className="fdc-section-shell min-h-screen overflow-x-hidden pb-20 pt-20">
      <article className="mx-auto w-full min-w-[280px] max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="space-y-4">
          <h1 className="text-3xl font-display font-bold text-slate-900 sm:text-4xl">{title}</h1>
          {description ? (
            <p className="max-w-4xl text-base leading-7 text-slate-700 sm:text-lg">{description}</p>
          ) : null}
        </header>
        <div className="mt-8 space-y-6 text-base leading-7 text-slate-700">{children}</div>
      </article>
    </div>
  );
}
