import { Nunito, Fredoka } from "next/font/google";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NextIntlProviderSync } from "@/components/providers/NextIntlProviderSync";
import { LanguageAwareHtml } from "@/components/providers/LanguageAwareHtml";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipNavigation } from "@/components/ui/SkipNavigation";
import { MobileCtaBar } from "@/components/ui/MobileCtaBar";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { LocalBusinessSchema, OrganizationSchema, WebSiteSchema, FAQSchema } from "@/components/seo/StructuredData";
import { businessProfile } from "@/lib/business-profile";
import { getAggregateRating } from "@/data/testimonials";
import { defaultSiteMetadata } from "@/lib/seo";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = defaultSiteMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  themeColor: "#2C5F4D", // Primary color from theme
  userScalable: true, // Allow user scaling for accessibility
};

const LOCALES = ['en', 'zh', 'ko', 'es', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

function isValidLocale(value: string | undefined): value is Locale {
  return value !== undefined && LOCALES.includes(value as Locale);
}

/**
 * Global root layout for the application.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('language')?.value;
  const initialLocale: Locale = isValidLocale(localeCookie) ? localeCookie : 'en';
  const aggregateRating = getAggregateRating();

  return (
    <html lang={initialLocale}>
      <head>
        {/* Favicon Links */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon_io/favicon.ico" />

        {/* Structured Data for SEO */}
        <WebSiteSchema
          name={businessProfile.name}
          url={businessProfile.url}
          description="Licensed Montessori daycare in Coquitlam, BC serving children 30 months to 5 years across Coquitlam, Port Coquitlam, and Port Moody."
        />
        <LocalBusinessSchema
          name={businessProfile.name}
          description="Licensed Montessori daycare in Coquitlam, BC offering early childhood education for children aged 30 months to 5 years near 2950 Dewdney Trunk Road. Serving Tri-Cities families since 2008."
          address={businessProfile.address}
          telephone={businessProfile.telephone}
          email={businessProfile.email}
          url={businessProfile.url}
          image={`${businessProfile.url}/images/slidetop-bg.jpg`}
          priceRange="$$"
          openingHours={businessProfile.openingHours}
          serviceArea={businessProfile.serviceArea}
          sameAs={[
            ...(businessProfile.sameAs ?? []),
            ...(businessProfile.googleBusinessProfileUrl ? [businessProfile.googleBusinessProfileUrl] : []),
          ]}
          geo={businessProfile.geo}
          foundingDate={businessProfile.foundingDate}
          aggregateRating={aggregateRating ?? undefined}
        />
        <OrganizationSchema
          name={businessProfile.name}
          url={businessProfile.url}
          logo="/logo.png"
          description="Licensed Montessori daycare providing quality early childhood education since 2008."
          foundingDate="2008-01-01"
          telephone={businessProfile.telephone}
          email={businessProfile.email}
          sameAs={businessProfile.sameAs}
          address={businessProfile.address}
        />
        <FAQSchema
          questions={[
            {
              question: "What ages does Friendship Corner Daycare accept?",
              answer: "We accept children from 30 months to 5 years old in our licensed Montessori daycare in Coquitlam, BC."
            },
            {
              question: "Where is Friendship Corner Daycare located?",
              answer: "We are located at 2950 Dewdney Trunk Road, Coquitlam, BC V3C 6E7, near Coquitlam Centre."
            },
            {
              question: "Is the daycare licensed in BC?",
              answer: "Yes, Friendship Corner Daycare is a fully licensed childcare facility in BC, operating since 2008."
            },
            {
              question: "What are your hours?",
              answer: "We are open Monday to Friday, 7:00 AM to 6:00 PM."
            },
            {
              question: "Do you offer Montessori education?",
              answer: "Yes, we offer an authentic Montessori program for children aged 30 months to 5 years, with certified ECE teachers."
            }
          ]}
        />
      </head>
      <body className={`${nunito.variable} ${fredoka.variable} antialiased font-sans`} suppressHydrationWarning>
        <LanguageProvider initialLocale={initialLocale}>
          <LanguageAwareHtml>
            <NextIntlProviderSync>
              <ThemeProvider>
                <div className="min-h-screen flex flex-col overflow-x-hidden pb-24 md:pb-0">
                  <SkipNavigation />
                  <Header />
                  <main className="pt-16 flex-1" role="main">
                    <Suspense fallback={<PageLoader message="Loading magical content..." />}>
                      {children}
                    </Suspense>
                  </main>
                  <Footer />
                  <MobileCtaBar />
                  <ScrollToTopButton />
                </div>
                <Toaster />
              </ThemeProvider>
            </NextIntlProviderSync>
          </LanguageAwareHtml>
        </LanguageProvider>
      </body>
    </html>
  );
}
