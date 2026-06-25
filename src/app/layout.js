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
  title: "Web Development Company in Karachi | Luma Softs",
  description: "Professional Web Development, SEO, UI/UX & Software Solutions in Karachi, Pakistan.",
  keywords: "Luma Softs, Software Agency, Web Development, AI Solutions, Digital Marketing, eCommerce, Mobile Apps, UI/UX Design, Karachi, Pakistan",
  openGraph: {
    title: "Web Development Company in Karachi | Luma Softs",
    description: "Professional Web Development, SEO, UI/UX & Software Solutions in Karachi, Pakistan.",
    url: "https://www.lumasofts.com",
    siteName: "Luma Softs",
    type: "website",
    locale: "en_PK",
    images: [{
      url: "https://www.lumasofts.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Luma Softs — Web Dev Agency Karachi"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Company in Karachi | Luma Softs",
    description: "Professional Web Development, SEO, UI/UX & Software Solutions.",
    images: ["https://www.lumasofts.com/og-image.jpg"]
  },
  verification: {
    google: "gW3ieRAMY6HWdimuZADxTWs2lgqF48ySA5cxfFcogmU",
  },
};

import Chatbot from "../components/Chatbot";
import PromoPopup from "../components/PromoPopup";

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

        {/* JSON-LD Schema Markup */}
        <Script id="json-ld-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Luma Softs",
            "address": { "addressLocality": "Karachi", "addressCountry": "PK" },
            "serviceType": ["Web Development", "AI Automation", "SEO"],
            "telephone": "+92-313-666-1921"
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
        {ENABLE_PROMO_SYSTEM && <PromoPopup />}
      </body>
    </html>
  );
}
