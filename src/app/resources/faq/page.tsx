import { redirect } from 'next/navigation';

/**
 * FAQ consolidated into /contact#faq.
 * Redirect for backward compatibility.
 */
export default function FAQRedirectPage() {
  redirect('/contact#faq');
}
