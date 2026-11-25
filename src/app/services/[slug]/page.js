import React from "react";
import Link from "next/link";
import Script from "next/script";
import { query } from "../../../lib/db";
import { ALL_SERVICES } from "../../../data/services";
import ServiceDetailClient from "./ServiceDetailClient";

export const revalidate = 0;

const SLUG_ICON_FALLBACK = {
  "web-development": "Monitor",
  "ecommerce-development": "ShoppingCart",
  "wordpress-development": "FileText",
  "software-development": "Settings",
  "mobile-app-development": "Smartphone",
  "ui-ux-design": "Target",
  "graphic-design": "Brush",
  "digital-marketing": "LineChart",
  "ai-automation": "Bot",
  "copywriting": "FileText",
  "custom-apis": "Plug",
  "video-editing": "Video",
  "cloud-devops": "Cloud",
  "cybersecurity": "Shield",
  "qa-testing": "Search",
};

async function getServiceBySlug(slug) {
  try {
    const res = await query("SELECT * FROM services WHERE slug = ? LIMIT 1", [slug]);
    if (res && res.length > 0) {
      const s = { ...res[0] };
      try {
        if (typeof s.features === "string") s.features = JSON.parse(s.features);
        if (typeof s.benefits === "string") s.benefits = JSON.parse(s.benefits);
        if (typeof s.faq === "string") s.faq = JSON.parse(s.faq);
      } catch (e) {}
      return s;
    }
  } catch (err) {}

  const fallback = ALL_SERVICES.find((item) => item.slug === slug);
  if (fallback) {
    return {
      slug: fallback.slug,
      title: fallback.title,
      icon: SLUG_ICON_FALLBACK[fallback.slug] || "Globe",
      image: fallback.image,
      short_desc: fallback.shortDesc,
      long_desc: fallback.longDesc,
      features: fallback.features || [],
      benefits: fallback.benefits || [],
      faq: fallback.faq || [],
    };
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Luma Softs",
      robots: { index: false },
    };
  }

  const title = `${service.title} Services in Karachi & Global | Luma Softs`;
  const description = service.short_desc || service.long_desc || "Professional digital engineering services by Luma Softs.";

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://lumasofts.com/services/${service.slug}`,
      type: "website",
      images: service.image ? [{ url: service.image, alt: service.title }] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Service Not Found</h1>
        <Link href="/services" className="btn-outline" style={{ color: "var(--primary)" }}>← Back to Services</Link>
      </div>
    );
  }

  const schemaGraph = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.long_desc || service.short_desc,
      url: `https://lumasofts.com/services/${service.slug}`,
      provider: {
        "@type": "Organization",
        name: "Luma Softs",
        url: "https://lumasofts.com",
      },
      areaServed: ["Karachi", "Pakistan", "United Kingdom", "United Arab Emirates", "Austria", "United States"],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://lumasofts.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://lumasofts.com/services" },
        { "@type": "ListItem", position: 3, name: service.title, item: `https://lumasofts.com/services/${service.slug}` },
      ],
    },
  ];

  if (Array.isArray(service.faq) && service.faq.length > 0) {
    schemaGraph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    });
  }

  return (
    <>
      <Script id={`service-schema-${service.slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schemaGraph)}
      </Script>
      <ServiceDetailClient service={service} />
    </>
  );
}
