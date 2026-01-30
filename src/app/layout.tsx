import { Nunito, Fredoka, Baloo_2, Comic_Neue } from "next/font/google";
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
import { Toaster } from "@/components/ui/toaster";
import { LocalBusinessSchema, OrganizationSchema, WebSiteSchema } from "@/components/seo/StructuredData";
import { businessProfile } from "@/lib/business-profile";
import { defaultSiteMetadata } from "@/lib/seo";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const comic = Comic_Neue({
  variable: "--font-comic",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
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
          description="Licensed Montessori daycare in Coquitlam, BC serving Tri-Cities families."
        />
        <LocalBusinessSchema
          name={businessProfile.name}
          description="Licensed Montessori daycare in Coquitlam offering quality early childhood education for children aged 30 months to school age. Established in 2008."
          address={businessProfile.address}
          telephone={businessProfile.telephone}
          email={businessProfile.email}
          url={businessProfile.url}
          image={`${businessProfile.url}/logo.png`}
          priceRange="$$"
          openingHours={businessProfile.openingHours}
          serviceArea={businessProfile.serviceArea}
        />
        <OrganizationSchema
          name={businessProfile.name}
          url={businessProfile.url}
          logo="/logo.png"
          description="Licensed Montessori daycare providing quality early childhood education since 2008."
          foundingDate="2008-01-01"
          telephone={businessProfile.telephone}
          email={businessProfile.email}
          address={businessProfile.address}
        />
      </head>
      <body className={`${nunito.variable} ${fredoka.variable} ${baloo.variable} ${comic.variable} antialiased font-sans`} suppressHydrationWarning>
        <LanguageProvider initialLocale={initialLocale}>
          <LanguageAwareHtml>
            <NextIntlProviderSync>
              <ThemeProvider>
                <div className="min-h-screen flex flex-col overflow-x-hidden">
                  <SkipNavigation />
                  <Header />
                  <Suspense fallback={<PageLoader message="Loading magical content..." />}>
                    {children}
                  </Suspense>
                  <Footer />
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
