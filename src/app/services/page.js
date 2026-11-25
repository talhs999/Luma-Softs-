import React from "react";
import Link from "next/link";
import Script from "next/script";
import { query } from "../../lib/db";
import { ALL_SERVICES } from "../../data/services";
import { Globe, ShoppingCart, Cpu, Smartphone, Target, PenTool, BarChart3, Bot, FileText, Settings, Brush, LineChart, Plug, Video, Cloud, Shield, Search, Monitor } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Web, Mobile, AI & SEO Services in Karachi | Luma Softs",
  description: "Explore 15+ full-stack digital services by Luma Softs: Next.js Web Development, WordPress & Shopify Stores, Mobile Apps, AI Automation, Cybersecurity, and Technical & AI SEO (GEO).",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Web, Mobile, AI & SEO Services | Luma Softs",
    description: "Custom Websites, Shopify & WooCommerce, Mobile Apps, AI Chatbots, and High-Authority SEO & GEO.",
    url: "https://lumasofts.com/services",
  },
};

const ICON_MAP = {
  Monitor,
  Globe,
  ShoppingCart,
  Cpu,
  Smartphone,
  Target,
  PenTool,
  BarChart3,
  Bot,
  FileText,
  Settings,
  Brush,
  LineChart,
  Plug,
  Video,
  Cloud,
  Shield,
  Search,
};

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

export default async function ServicesPage() {
  let services = [];
  try {
    const res = await query("SELECT * FROM services ORDER BY id ASC");
    if (Array.isArray(res) && res.length > 0) {
      services = res;
    }
  } catch (err) {
    console.warn("Services DB offline, using static ALL_SERVICES fallback:", err.message);
  }

  if (services.length === 0) {
    services = ALL_SERVICES.map((s) => ({
      slug: s.slug,
      title: s.title,
      image: s.image,
      icon: SLUG_ICON_FALLBACK[s.slug] || "Globe",
      short_desc: s.shortDesc,
    }));
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Luma Softs Digital & Software Engineering Services",
    itemListElement: services.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: s.title,
      url: `https://lumasofts.com/services/${s.slug}`,
    })),
  };

  return (
    <section style={{ padding: "4rem 0 6rem" }}>
      <Script id="services-itemlist-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListSchema)}
      </Script>
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Our Services</div>
          <h1 className="section-title">What We <span style={{ color: "var(--primary)" }}>Offer</span></h1>
          <p className="section-subtitle" style={{ margin: "1rem auto 0" }}>
            From rapid 4-day eCommerce launches to enterprise Next.js platforms, AI automation, and AI SEO (GEO), we build systems engineered to rank and convert.
          </p>
          <div style={{ marginTop: "1.75rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/estimator" className="btn-primary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem" }}>
              Instant Project Cost Estimator →
            </Link>
            <Link href="/contact" className="btn-outline" style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem" }}>
              Book Free Consultation
            </Link>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "1.5rem" }}>
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] || ICON_MAP[SLUG_ICON_FALLBACK[service.slug]] || Globe;
            return (
              <Link key={service.slug} href={`/services/${service.slug}`} className="glass link-card" style={{ padding: "0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {service.image ? (
                  <div style={{ height: 180, borderBottom: "1px solid var(--border)" }}>
                    <img
                      src={service.image}
                      alt={`${service.title} service by Luma Softs`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: ["web-development", "ecommerce-development", "wordpress-development"].includes(service.slug) ? "center" : "center 20%",
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ height: 180, background: "rgba(194,255,5,0.03)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
                    <Icon size={48} color="var(--primary)" strokeWidth={1} />
                  </div>
                )}
                <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h2 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.5rem" }}>{service.title}</h2>
                  <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{service.short_desc}</p>
                  <span style={{ color: "var(--primary)", fontSize: "0.875rem", fontWeight: 600, marginTop: "auto" }}>Explore {service.title} →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
