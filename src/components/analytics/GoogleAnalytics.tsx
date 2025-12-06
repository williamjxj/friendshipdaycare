/**
 * Google Analytics Component
 * 
 * Usage:
 * 1. Sign up for Google Analytics at https://analytics.google.com
 * 2. Create a GA4 property
 * 3. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 4. Replace 'G-XXXXXXXXXX' below with your actual Measurement ID
 * 5. Add this component to your root layout.tsx
 * 
 * Environment Variable (Recommended):
 * - Create a .env.local file in your project root
 * - Add: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * - Use process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID instead of hardcoded value
 */

'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
  // Replace with your actual Google Analytics Measurement ID
  // Or use environment variable: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

  // Don't load in development mode
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  // Don't load if no measurement ID is set
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('Google Analytics: No measurement ID configured');
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

/**
 * Track custom events
 * 
 * Usage:
 * import { trackEvent } from '@/components/analytics/GoogleAnalytics';
 * 
 * trackEvent({
 *   action: 'button_click',
 *   category: 'engagement',
 *   label: 'Schedule Tour',
 *   value: 1
 * });
 */
export function trackEvent({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track page views (useful for SPA navigation)
 * 
 * Usage:
 * import { trackPageView } from '@/components/analytics/GoogleAnalytics';
 * 
 * trackPageView('/pricing');
 */
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

/**
 * Setup Instructions:
 * 
 * 1. Create .env.local file:
 *    NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 
 * 2. Add to src/app/layout.tsx (before </body>):
 *    import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
 *    
 *    export default function RootLayout({ children }) {
 *      return (
 *        <html>
 *          <body>
 *            {children}
 *            <GoogleAnalytics />
 *          </body>
 *        </html>
 *      );
 *    }
 * 
 * 3. Track custom events in your components:
 *    import { trackEvent } from '@/components/analytics/GoogleAnalytics';
 *    
 *    <button onClick={() => {
 *      trackEvent({
 *        action: 'click',
 *        category: 'Tour Booking',
 *        label: 'Schedule Tour Button'
 *      });
 *    }}>
 *      Schedule Tour
 *    </button>
 * 
 * 4. Verify installation:
 *    - Install Google Analytics Debugger Chrome extension
 *    - Visit your site
 *    - Check browser console for GA debug messages
 *    - Check Google Analytics Real-Time view
 * 
 * Privacy Considerations:
 * - Add Google Analytics disclosure to your Privacy Policy
 * - Consider implementing cookie consent banner
 * - Respect Do Not Track browser settings
 * - Comply with GDPR/PIPEDA if applicable
 */

export default GoogleAnalytics;
