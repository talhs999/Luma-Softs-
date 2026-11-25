import React from "react";
import Script from "next/script";
import EstimatorClient from "./EstimatorClient";

export const metadata = {
  title: "Website, App & SEO Cost Calculator 2026 (PKR / USD / GBP) | Luma Softs",
  description: "Free interactive website, Shopify/WordPress eCommerce, mobile app, and SEO cost calculator for Pakistan, UK, UAE & US businesses. Instant timeline & quote.",
  alternates: {
    canonical: "/estimator",
  },
  openGraph: {
    title: "Interactive Website, App & SEO Cost Calculator 2026 | Luma Softs",
    description: "Calculate instant pricing & delivery timelines for Next.js, WordPress, Shopify, Mobile Apps & AI SEO.",
    url: "https://lumasofts.com/estimator",
  },
};

export default function EstimatorPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Luma Softs Website, App & SEO Cost Calculator",
      url: "https://lumasofts.com/estimator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      provider: {
        "@type": "Organization",
        name: "Luma Softs",
        url: "https://lumasofts.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://lumasofts.com" },
        { "@type": "ListItem", position: 2, name: "Project Cost Estimator", item: "https://lumasofts.com/estimator" },
      ],
    },
  ];

  return (
    <>
      <Script id="estimator-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schema)}
      </Script>
      <EstimatorClient />
    </>
  );
}
