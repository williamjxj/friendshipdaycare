import { Resend } from 'resend';

export function getResendClient(): { resend: Resend; fromEmail: string } | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@friendshipdaycare.com';
  return { resend: new Resend(apiKey), fromEmail };
}

export function businessFromAddress(fromEmail: string): string {
  return `Friendship Corner Daycare <${fromEmail}>`;
}
