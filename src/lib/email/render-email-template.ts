import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://www.friendshipdaycare.com';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let cachedTemplate: string | undefined;

function loadTemplate(): string {
  if (!cachedTemplate) {
    cachedTemplate = readFileSync(join(process.cwd(), 'src/lib/email/templates/customer-confirmation.html'), 'utf8');
  }
  return cachedTemplate;
}

export type CustomerEmailVars = {
  name: string;
  preheader: string;
  heading: string;
  subheading: string;
  intro: string;
  highlightTitle: string;
  highlightItems: string[];
  note: string;
  ctaUrl?: string;
  ctaLabel?: string;
};

function highlightListHtml(items: string[]): string {
  const rows = items
    .map((item) => {
      const safe = escapeHtml(item);
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
  <tr>
    <td width="18" valign="top" style="width:18px; padding-top:2px; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#F97316;">•</td>
    <td valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:#1E3A8A;">${safe}</td>
  </tr>
</table>`;
    })
    .join('');
  return rows;
}

export function renderCustomerEmail(vars: CustomerEmailVars): string {
  const replacements: Record<string, string> = {
    PREHEADER: escapeHtml(vars.preheader),
    HEADING: escapeHtml(vars.heading),
    SUBHEADING: escapeHtml(vars.subheading),
    NAME: escapeHtml(vars.name),
    INTRO: escapeHtml(vars.intro),
    HIGHLIGHT_TITLE: escapeHtml(vars.highlightTitle),
    HIGHLIGHT_HTML: highlightListHtml(vars.highlightItems),
    NOTE: escapeHtml(vars.note).replace(/\n/g, '<br />'),
    CTA_URL: escapeHtml(vars.ctaUrl ?? `${SITE_URL}/welcome`),
    CTA_LABEL: escapeHtml(vars.ctaLabel ?? 'Book a tour'),
    YEAR: String(new Date().getFullYear()),
  };

  let html = loadTemplate();
  for (const [key, value] of Object.entries(replacements)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
}

export function contactConfirmationEmail(name: string): string {
  return renderCustomerEmail({
    name,
    preheader: 'We received your message and will reply within 24 hours.',
    heading: `Thank you, ${name}!`,
    subheading: "We've received your message",
    intro:
      "Thank you for your interest in Friendship Corner Daycare. We've received your message and our team will get back to you within 24 hours.",
    highlightTitle: "What's next?",
    highlightItems: [
      "We'll review your inquiry and respond personally",
      "If you'd like to visit, we'll schedule a tour",
      "We'll answer any questions about our programs, fees, and subsidies",
    ],
    note: 'Need us sooner? Call 604.945.8504 — we are here Monday to Friday, 7:00 am to 6:00 pm.',
    ctaUrl: `${SITE_URL}/welcome`,
    ctaLabel: 'Book a classroom tour',
  });
}

export function welcomeConfirmationEmail(
  name: string,
  options: { isFlyer: boolean; tourDate: string; timeLabel: string },
): string {
  const intro = options.isFlyer
    ? 'Thank you for scanning our flyer and requesting a tour. We received your details and will confirm your visit by phone or email.'
    : 'Thank you for your tour request. We received your details and will confirm your visit by phone or email within 24 hours.';

  return renderCustomerEmail({
    name,
    preheader: `Tour preference saved for ${options.tourDate}. We'll confirm within 24 hours.`,
    heading: `Thank you, ${name}!`,
    subheading: 'Your tour request is on its way',
    intro,
    highlightTitle: 'Your tour preference',
    highlightItems: [`Preferred date: ${options.tourDate}`, `Preferred time: ${options.timeLabel}`],
    note: 'If you need to reach us sooner, call 604.945.8504.',
    ctaUrl: `${SITE_URL}/welcome`,
    ctaLabel: 'Review tour details',
  });
}
