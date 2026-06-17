"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Globe, ShoppingCart, Cpu, Smartphone, Target, PenTool, BarChart3, Bot, Check, FileText, Settings, Brush, LineChart, Plug, Video, Cloud, Shield, Search, Monitor } from "lucide-react";

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

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setService(data);
        }
      } catch (err) {
        console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchService();
  }, [slug]);

  if (loading) {
    return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray)" }}>Loading service details...</div>;
  }

  if (!service) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Service Not Found</h1>
        <Link href="/services" className="btn-outline">← Back to Services</Link>
      </div>
    );
  }

  return (
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-container" style={{ maxWidth: 900 }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/services" style={{ color: "var(--gray)", fontSize: "0.875rem" }}>
            ← Back to Services
          </Link>
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(194,255,5,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {(() => { const Icon = ICON_MAP[service.icon] || Globe; return <Icon size={26} color="var(--primary)" />; })()}
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {service.title}
          </h1>
        </div>

        <p style={{ color: "var(--gray)", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 700 }}>
          {service.long_desc}
        </p>

        {service.image && (
          <div style={{ marginBottom: "3rem", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", width: "100%" }}>
            <Image 
              src={service.image} 
              alt={service.title} 
              width={1200} 
              height={600} 
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} 
              priority
            />
          </div>
        )}

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1.25rem" }}>
              <span style={{ color: "var(--primary)" }}>●</span> What&apos;s Included
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "0.75rem" }}>
              {service.features.map((f, i) => (
                <div key={i} className="glass" style={{ padding: "1rem 1.25rem", fontSize: "0.9375rem" }}>
                  {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1.25rem" }}>
              <span style={{ color: "var(--primary)" }}>●</span> Benefits
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "0.75rem" }}>
              {service.benefits.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9375rem", color: "var(--gray)" }}>
                  <Check size={16} color="var(--primary)" /> {b}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {service.faq && service.faq.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1.25rem" }}>
              <span style={{ color: "var(--primary)" }}>●</span> Frequently Asked Questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {service.faq.map((item, i) => (
                <div key={i} className="glass" style={{ overflow: "hidden" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      color: "var(--fg)",
                      padding: "1rem 1.25rem",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {item.q}
                    <span style={{ color: "var(--primary)", transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 1.25rem 1rem", color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="glass" style={{ padding: "2.5rem", textAlign: "center" }}>
          <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            Interested in {service.title}?
          </h3>
          <p style={{ color: "var(--gray)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
            Let&apos;s discuss how we can help your business grow.
          </p>
          <Link href="/contact" className="btn-primary">Get a Free Quote</Link>
        </div>
      </div>
    </section>
  );
}
