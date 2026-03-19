(The file `/Users/william.jiang/my-business/friendshipdaycare/.github/copilot-instructions.md` exists, but is empty)
## Copilot Instructions: Friendship Corner Daycare Website

### Project Overview
This project is a modern, multi-theme, multi-language daycare website built with Next.js 16, React 19, TypeScript, and TailwindCSS v4. It features advanced UI/UX, lively animations, strong SEO, and accessibility. All main pages and components are designed for visual polish, animation, SEO metadata, and accessibility.

### Key Technologies
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS v4, CSS variables for theming
- **UI Components**: shadcn/ui, custom components in `/src/components/ui/` and `/src/components/sections/`
- **Animations**: Framer Motion, GSAP ScrollTrigger, CSS transitions
- **i18n**: next-intl, 5 languages (en, zh, fr, es, ko)
- **SEO**: Open Graph, structured data, social previews

### UI/UX & Animation Conventions
- Use theme variables and Tailwind utility classes for all styling
- Place primitive UI in `/src/components/ui/`, feature/section components in `/src/components/sections/`
- Use Framer Motion for mount/unmount, hover, and feedback animations
- Use GSAP (with ScrollTrigger) for scroll-based and complex timeline animations
- Prefer CSS transitions for simple hover/focus/active states
- All interactive elements must have accessible labels and keyboard navigation
- Support prefers-reduced-motion for accessibility

### Image & Asset Optimization
- Use Next.js `<Image>` for all images, with `fill` and `sizes` for responsiveness
- Store images in `public/images/` or via Cloudflare R2 (see README)
- No `<img>` tags—always use the optimized Image component

### Internationalization
- All visible text must be translatable
- Use translation keys from `src/messages/` for all UI copy
- Support all 5 languages in every new/updated component

### SEO & Metadata
- Every page must set title, description, and Open Graph metadata
- Use helpers from `src/lib/seo.ts` for structured data and previews
- Run Lighthouse and manual SEO audits for all new features

### Accessibility
- All components must meet WCAG AA standards
- Use semantic HTML, ARIA labels, and ensure color contrast
- Test with keyboard navigation and screen readers

### Testing & Review
- Use Playwright and Jest for automated tests
- Manual and visual regression testing required for all UI/animation changes
- Run `npm run lint` and `npm run build` before submitting PRs

### Contribution Workflow
1. Follow the task breakdown in `specs/006-ui-seo-animations/tasks.md`
2. Reference the feature spec and plan for requirements
3. Use the daycare-ui and web-animations skills for all UI/animation work
4. Ensure all checklists in `specs/006-ui-seo-animations/checklists/` are complete before marking tasks done
5. Update documentation and translation files as needed

---
**For Copilot and contributors:**
- Always use the latest conventions and patterns from the codebase and skills
- Prioritize accessibility, SEO, and performance in every change
- Ask for clarification if requirements are ambiguous
