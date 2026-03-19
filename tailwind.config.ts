import type { Config } from "tailwindcss";

/**
 * Tailwind v4 uses CSS-first configuration (@theme in globals.css).
 * This file exists for shadcn CLI compatibility and tooling.
 * Theme and plugins are configured in src/app/globals.css.
 */

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/lib/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/contexts/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/messages/**/*.{json}",
    "./public/**/*.html"
  ],
  // Theme and plugin configuration is handled in src/app/globals.css for Tailwind v4
};

export default config;
