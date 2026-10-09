import { Figtree, Marcellus } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingWidget from "../components/BookingWidget";
import Preloader from "../components/Preloader";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  metadataBase: new URL("https://lumasofts.com"),
  alternates: {
    canonical: "/",
  },
  title: "Top Web Development Company in Karachi | Luma Softs",
  description: "Top-rated web development company in Karachi. Luma Softs builds custom websites, WordPress stores, UI/UX & software to scale your business.",
  keywords: "Web Development Karachi, Software Company Karachi, Website Design Pakistan, WordPress Developers Karachi, UI/UX Design Studio, Luma Softs",
  openGraph: {
    title: "Top Web Development Company in Karachi | Luma Softs",
    description: "Professional Web Development, SEO, UI/UX & Software Solutions in Karachi, Pakistan.",
    url: "https://lumasofts.com",
    siteName: "Luma Softs",
    type: "website",
    locale: "en_PK",
    images: [{
      url: "https://lumasofts.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Luma Softs — Web Dev Agency Karachi"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Web Development Company in Karachi | Luma Softs",
    description: "Professional Web Development, SEO, UI/UX & Software Solutions.",
    images: ["https://lumasofts.com/og-image.jpg"]
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "gW3ieRAMY6HWdimuZADxTWs2lgqF48ySA5cxfFcogmU",
  },
};

import Chatbot from "../components/Chatbot";
import PromoPopup from "../components/PromoPopup";
import CookieConsent from "../components/CookieConsent";

// Toggle this to false if you want to temporarily disable the promotional email system popup
const ENABLE_PROMO_SYSTEM = true;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${figtree.variable} ${marcellus.variable}`}>
      <body suppressHydrationWarning style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SBQ82T59CJ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SBQ82T59CJ');
          `}
        </Script>

        {/* Rich LocalBusiness & Service Schema Markup */}
        <Script id="json-ld-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "LocalBusiness",
                "@id": "https://lumasofts.com/#organization",
                "name": "Luma Softs",
                "url": "https://lumasofts.com",
                "logo": "https://lumasofts.com/logo.png",
                "image": "https://lumasofts.com/og-image.jpg",
                "description": "Top-rated web development, UI/UX design, custom software and AI automation agency in Karachi, Pakistan.",
                "telephone": "+92-313-666-1921",
                "email": "admin@lumasofts.com",
                "priceRange": "$$",
                "address": { 
                  "@type": "PostalAddress",
                  "addressLocality": "Karachi", 
                  "addressRegion": "Sindh",
                  "addressCountry": "PK" 
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 24.8607,
                  "longitude": 67.0011
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "21:00"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "28"
                }
              }
            ]
          })}
        </Script>

        <Preloader />
        <Navbar />
        <main style={{ flex: 1, paddingTop: 72 }}>
          {children}
        </main>
        <BookingWidget />
        <Footer />
        <Chatbot />
        <CookieConsent />
        {ENABLE_PROMO_SYSTEM && <PromoPopup />}
      </body>
    </html>
  );
}
