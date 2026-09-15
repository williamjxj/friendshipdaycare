'use client';

import { useEffect } from 'react';

/**
 * Registers the PWA service worker in production.
 *
 * The worker is generated at build time by @serwist/next (src/app/sw.ts → public/sw.js).
 * Registration is intentionally skipped in development so dev reloads never hit a stale cache.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    };

    // Wait for load so registration never competes with initial page resources.
    window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
