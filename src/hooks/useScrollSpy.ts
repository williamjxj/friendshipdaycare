'use client';

import { useEffect, useState } from 'react';

/**
 * ScrollSpy hook using Intersection Observer API.
 * Tracks which section is currently in view and returns its id.
 *
 * @param sectionIds - Ordered list of section DOM ids (e.g., ['hero', 'about', 'programs', 'contact'])
 * @param offset - Top offset in px for sticky header (rootMargin); default 80
 * @returns activeId - The id of the section currently in view
 */
export function useScrollSpy(sectionIds: string[], offset = 80): string {
  const [activeId, setActiveId] = useState<string>('');
  const sectionIdsKey = sectionIds.join(',');

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIdsKey.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const ids = sectionIdsKey.split(',').filter((id) => id.length > 0);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        {
          rootMargin: `-${offset}px 0px -60% 0px`,
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [sectionIdsKey, offset]);

  return activeId;
}
