"use client";

import { Toaster as Sonner } from "sonner";

/**
 * Global toast portal for notifications.
 */
export function Toaster() {
  return <Sonner richColors closeButton />;
}
