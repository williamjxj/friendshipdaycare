import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
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
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${fredoka.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
