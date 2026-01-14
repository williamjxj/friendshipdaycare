import type { Metadata } from "next";
import { Nunito, Fredoka, Open_Sans, Rubik, Varela_Round, Nunito_Sans } from "next/font/google";
import { Suspense } from "react";
import { PageLoader } from "@/components/ui/LoadingSpinner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NextIntlProviderSync } from "@/components/providers/NextIntlProviderSync";
import { LanguageAwareHtml } from "@/components/providers/LanguageAwareHtml";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipNavigation } from "@/components/ui/SkipNavigation";
import { LocalBusinessSchema, OrganizationSchema, defaultOrganizationData } from "@/components/seo/StructuredData";
import { getImageUrl } from "@/lib/image-utils";
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

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: ["400"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Friendship Corner Daycare - Montessori Excellence in Coquitlam, BC",
  description: "Licensed Montessori daycare in Coquitlam, BC. Safe, nurturing environment for children 30 months to school age. Near Coquitlam Station. Call 604.945.8504",
  keywords: "daycare, Montessori, Coquitlam, childcare, preschool, early learning, licensed daycare, BC",
  authors: [{ name: "Friendship Corner Daycare" }],
  creator: "Friendship Corner Daycare",
  publisher: "Friendship Corner Daycare",
  robots: "index, follow",
  openGraph: {
    title: "Friendship Corner Daycare - Montessori Excellence",
    description: "Licensed Montessori daycare in Coquitlam, BC. Safe, nurturing environment for children 30 months to school age.",
    url: "https://friendshipcorner.ca",
    siteName: "Friendship Corner Daycare",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Friendship Corner Daycare - Montessori Excellence",
    description: "Licensed Montessori daycare in Coquitlam, BC. Safe, nurturing environment for children 30 months to school age.",
  },

};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  themeColor: "#2C5F4D", // Primary color from theme
  userScalable: true, // Allow user scaling for accessibility
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for SEO */}
        <LocalBusinessSchema
          name={defaultOrganizationData.name}
          description="Licensed Montessori daycare in Coquitlam offering quality early childhood education for children aged 30 months to school age. Established in 2008."
          address={defaultOrganizationData.address}
          telephone={defaultOrganizationData.telephone}
          email={defaultOrganizationData.email}
          url={defaultOrganizationData.url}
          priceRange="$$"
          openingHours={["Mo-Fr 07:30-17:30"]}
        />
        <OrganizationSchema
          name={defaultOrganizationData.name}
          url={defaultOrganizationData.url}
          logo={'/logo.png'}
          description="Licensed Montessori daycare providing quality early childhood education since 2008"
          foundingDate="2008-01-01"
          telephone={defaultOrganizationData.telephone}
          email={defaultOrganizationData.email}
          address={defaultOrganizationData.address}
        />
      </head>
      <body className={`${openSans.variable} ${nunito.variable} ${fredoka.variable} ${rubik.variable} ${varelaRound.variable} ${nunitoSans.variable} antialiased font-sans`} suppressHydrationWarning>
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
              </ThemeProvider>
            </NextIntlProviderSync>
          </LanguageAwareHtml>
        </LanguageProvider>
      </body>
    </html>
  );
}
