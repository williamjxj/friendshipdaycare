/// <reference lib="webworker" />

import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  // Precache all production build assets (hashed JS/CSS/fonts) from the build manifest.
  precacheEntries: self.__SW_MANIFEST,
  // Activate the new service worker as soon as it is installed.
  skipWaiting: true,
  // Take control of open pages immediately after activation.
  clientsClaim: true,
  // Warm up navigation responses by starting a fetch while the page requests one.
  navigationPreload: true,
  // Default Serwist runtime caching:
  // - pages: NetworkFirst (fresh content, offline fallback to last cached page)
  // - _next/static, images, fonts, CSS: CacheFirst with hashed URLs
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
