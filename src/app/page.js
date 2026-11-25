import React from "react";
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Top Web Development, AI & SEO Agency in Karachi | Luma Softs",
  description: "We Are Luma Softs — engineering blazing-fast Next.js websites, 4-day WordPress & Shopify eCommerce stores, mobile apps, AI automation, and AI SEO (GEO & Backlinks) for Karachi & global brands.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "We Are Luma Softs — Web, Mobile, AI & Global SEO Agency",
    description: "150+ websites, eCommerce stores, AI chatbots & SEO systems delivered across Pakistan, UK, Europe, UAE & US.",
    url: "https://lumasofts.com",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
