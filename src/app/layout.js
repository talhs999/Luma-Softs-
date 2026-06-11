import { Figtree, Marcellus } from "next/font/google";
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
  title: "Luma Softs | Powering Ideas Into Innovation",
  description:
    "Luma Softs builds high-performance websites, enterprise software, AI solutions, eCommerce platforms, and digital marketing experiences. Top software agency for business growth.",
  keywords: "Luma Softs, Software Agency, Web Development, AI Solutions, Digital Marketing, eCommerce, Mobile Apps, UI/UX Design",
  openGraph: {
    title: "Luma Softs | Powering Ideas Into Innovation",
    description:
      "Premium Web Development, AI Automation, Graphic Design, and Digital Marketing Services by Luma Softs.",
    url: "https://lumasofts.com",
    siteName: "Luma Softs",
    type: "website",
  },
};

import Chatbot from "../components/Chatbot";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${figtree.variable} ${marcellus.variable}`}>
      <body suppressHydrationWarning style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Preloader />
        <Navbar />
        <main style={{ flex: 1, paddingTop: 72 }}>
          {children}
        </main>
        <BookingWidget />
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
