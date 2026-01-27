import { Nunito, Fredoka } from "next/font/google";
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
import { LocalBusinessSchema, OrganizationSchema } from "@/components/seo/StructuredData";
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

export const metadata = defaultSiteMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  themeColor: "#2C5F4D", // Primary color from theme
  userScalable: true, // Allow user scaling for accessibility
};

/**
 * Global root layout for the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Links */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
        
        {/* Structured Data for SEO */}
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
      <body className={`${nunito.variable} ${fredoka.variable} antialiased font-sans`} suppressHydrationWarning>
        <LanguageProvider>
          <LanguageAwareHtml>
            <NextIntlProviderSync>
              <ThemeProvider>
                <div className="min-h-screen flex flex-col">
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
