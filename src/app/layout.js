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
  title: {
    default: "Top Web Development, AI & SEO Agency in Karachi | Luma Softs",
    template: "%s",
  },
  description: "Luma Softs is a top-rated web development, Shopify/WordPress eCommerce, mobile app, AI automation, and AI SEO (GEO & Backlinks) agency in Karachi serving clients worldwide.",
  keywords: [
    "Web Development Karachi",
    "SEO Agency Karachi",
    "AI SEO GEO Agency Pakistan",
    "Backlinks Strategy Karachi",
    "WordPress Developers Karachi",
    "Shopify Experts Pakistan",
    "Fastest Website Development Malir Karachi",
    "Custom Software Company Pakistan",
    "Mobile App Development Karachi",
    "Luma Softs",
  ],
  openGraph: {
    title: "Top Web Development, AI & SEO Agency in Karachi | Luma Softs",
    description: "High-speed Next.js websites, 4-day WordPress & Shopify stores, Mobile Apps, AI Automation & AI SEO (GEO).",
    url: "https://lumasofts.com",
    siteName: "Luma Softs",
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Web Development, AI & SEO Agency in Karachi | Luma Softs",
    description: "High-speed Next.js websites, WordPress & Shopify stores, AI Automation & AI SEO (GEO).",
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

        {/* Rich Entity Knowledge Graph (Organization + ProfessionalService + WebSite) */}
        <Script id="json-ld-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
                "@id": "https://lumasofts.com/#organization",
                "name": "Luma Softs",
                "url": "https://lumasofts.com",
                "logo": "https://lumasofts.com/logo.png",
                "image": "https://lumasofts.com/opengraph-image",
                "description": "Top-rated web development, Shopify & WordPress eCommerce, UI/UX design, custom software, AI automation, and AI SEO (GEO & Backlinks) agency in Karachi, Pakistan serving global brands.",
                "telephone": "+92-313-666-1921",
                "email": "info@lumasofts.com",
                "priceRange": "$$",
                "sameAs": [
                  "https://www.facebook.com/61580289124242/",
                  "https://www.instagram.com/luma_softs/",
                  "https://www.linkedin.com/in/luma-softs-6a912b384/",
                  "https://maps.app.goo.gl/V7njffBB5mDPKtnV8"
                ],
                "founder": [
                  { "@type": "Person", "name": "Talha Khan", "jobTitle": "Co-Founder" },
                  { "@type": "Person", "name": "Mustufa Ali", "jobTitle": "Co-Founder" },
                  { "@type": "Person", "name": "Arhum Noman", "jobTitle": "Partner" }
                ],
                "knowsAbout": [
                  "Next.js Web Development",
                  "WordPress & WooCommerce Development",
                  "Shopify Store Engineering",
                  "Technical SEO & High-Authority Backlinks",
                  "Generative Engine Optimization (GEO / AI SEO)",
                  "Mobile App Development (React Native & Flutter)",
                  "AI Chatbots & Workflow Automation",
                  "UI/UX Design & Brand Identity"
                ],
                "areaServed": [
                  { "@type": "City", "name": "Karachi" },
                  { "@type": "Country", "name": "Pakistan" },
                  { "@type": "Country", "name": "United Kingdom" },
                  { "@type": "Country", "name": "Austria" },
                  { "@type": "Country", "name": "United Arab Emirates" },
                  { "@type": "Country", "name": "United States" }
                ],
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
                  "reviewCount": "42",
                  "bestRating": "5"
                }
              },
              {
                "@type": "WebSite",
                "@id": "https://lumasofts.com/#website",
                "url": "https://lumasofts.com",
                "name": "Luma Softs",
                "publisher": { "@id": "https://lumasofts.com/#organization" },
                "inLanguage": "en"
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
