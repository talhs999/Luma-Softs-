"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Globe, ShoppingCart, Cpu, Smartphone, Target, PenTool, BarChart3, Bot, FileText, Settings, Brush, LineChart, Plug, Video, Cloud, Shield, Search, Monitor } from "lucide-react";

// Map string icon names to Lucide components
const ICON_MAP = {
  "Monitor": Monitor,
  "Globe": Globe,
  "ShoppingCart": ShoppingCart,
  "Cpu": Cpu,
  "Smartphone": Smartphone,
  "Target": Target,
  "PenTool": PenTool,
  "BarChart3": BarChart3,
  "Bot": Bot,
  "FileText": FileText,
  "Settings": Settings,
  "Brush": Brush,
  "LineChart": LineChart,
  "Plug": Plug,
  "Video": Video,
  "Cloud": Cloud,
  "Shield": Shield,
  "Search": Search
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (Array.isArray(data)) {
          setServices(data);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Our Services</div>
          <h1 className="section-title">What We <span style={{ color: "var(--primary)" }}>Offer</span></h1>
          <p className="section-subtitle" style={{ margin: "1rem auto 0" }}>
            From concept to deployment, we provide everything you need to build, launch, and grow your digital presence.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--gray)" }}>Loading services...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "1.5rem" }}>
            {services.map((service) => {
              const Icon = ICON_MAP[service.icon] || Globe;
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="glass link-card" style={{ padding: "0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  {service.image ? (
                    <div style={{ height: 180, borderBottom: "1px solid var(--border)" }}>
                      <img src={service.image} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: ['web-development', 'ecommerce-development', 'wordpress-development'].includes(service.slug) ? "center" : "center 20%" }} />
                    </div>
                  ) : (
                    <div style={{ height: 180, background: "rgba(194,255,5,0.03)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
                      <Icon size={48} color="var(--primary)" strokeWidth={1} />
                    </div>
                  )}
                  <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h3 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.5rem" }}>{service.title}</h3>
                    <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{service.short_desc}</p>
                    <span style={{ color: "var(--primary)", fontSize: "0.875rem", fontWeight: 600, marginTop: "auto" }}>Learn More →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
