"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Calculator, Zap, ShoppingCart, Globe, Smartphone, Bot, TrendingUp, Check, MessageCircle, Search, ArrowRight, Sparkles, Code2 } from "lucide-react";

const CURRENCIES = {
  PKR: { symbol: "Rs.", rate: 1, label: "PKR (Rs.)" },
  USD: { symbol: "$", rate: 0.0036, label: "USD ($)" },
  GBP: { symbol: "£", rate: 0.0028, label: "GBP (£)" },
  EUR: { symbol: "€", rate: 0.0033, label: "EUR (€)" },
};

const PROJECT_TYPES = [
  {
    id: "wordpress-site",
    title: "WordPress Business Site (5–6 Pages)",
    desc: "Clean, fast 5–6 page corporate/service website with contact, WhatsApp & basic SEO.",
    icon: Globe,
    minPkr: 15000,
    maxPkr: 30000,
    daysMin: 4,
    daysMax: 7,
  },
  {
    id: "ecommerce",
    title: "Shopify / WooCommerce Store",
    desc: "Complete eCommerce store with product catalog, cart, COD/Card checkout & inventory.",
    icon: ShoppingCart,
    minPkr: 25000,
    maxPkr: 50000,
    daysMin: 4,
    daysMax: 10,
  },
  {
    id: "custom-website",
    title: "Custom Coded Website (Next.js / React)",
    desc: "Ultra-fast custom coded website or custom eCommerce with 99+ speed & animations.",
    icon: Code2,
    minPkr: 40000,
    maxPkr: 75000,
    daysMin: 7,
    daysMax: 14,
  },
  {
    id: "nextjs-saas",
    title: "SaaS Platform / Custom Web App",
    desc: "Full-stack SaaS platform, admin dashboard, custom CRM/ERP or client portal.",
    icon: Sparkles,
    minPkr: 50000,
    maxPkr: 120000,
    daysMin: 14,
    daysMax: 30,
  },
  {
    id: "mobile-app",
    title: "Mobile App (iOS & Android)",
    desc: "Cross-platform Flutter / React Native app with backend API & store publishing.",
    icon: Smartphone,
    minPkr: 60000,
    maxPkr: 150000,
    daysMin: 20,
    daysMax: 40,
  },
  {
    id: "ai-automation",
    title: "AI Chatbot & Workflow Automation",
    desc: "24/7 custom trained AI support agent, WhatsApp bot & lead automation.",
    icon: Bot,
    minPkr: 20000,
    maxPkr: 45000,
    daysMin: 4,
    daysMax: 10,
  },
  {
    id: "seo-geo",
    title: "Technical SEO, Backlinks & AI SEO (GEO)",
    desc: "Rank on Google Page 1 + ChatGPT, Perplexity & Gemini AI citations.",
    icon: TrendingUp,
    minPkr: 15000,
    maxPkr: 35000,
    daysMin: 30,
    daysMax: 90,
    isMonthly: true,
  },
];

const ADDONS = [
  { id: "rapid-4day", label: "⚡ 4-Day Express Priority Delivery", minPkr: 5000, maxPkr: 10000 },
  { id: "whatsapp-order", label: "💬 1-Click WhatsApp Ordering & Lead Sync", minPkr: 3000, maxPkr: 6000 },
  { id: "multi-currency", label: "🌍 Multi-Currency & Payment Gateways (Stripe/PayPal/COD)", minPkr: 5000, maxPkr: 10000 },
  { id: "ai-seo-pack", label: "🚀 On-Page SEO + High-DA Backlinks + llms.txt GEO", minPkr: 8000, maxPkr: 15000 },
  { id: "custom-uiux", label: "🎨 Custom Figma UI/UX Design & Brand Kit", minPkr: 7000, maxPkr: 15000 },
  { id: "ai-assistant", label: "🤖 Custom AI Chatbot Trained on Your Website", minPkr: 10000, maxPkr: 20000 },
];

function formatMoney(pkrAmount, currencyKey) {
  const { symbol, rate } = CURRENCIES[currencyKey];
  if (currencyKey === "PKR") {
    return `${symbol} ${Math.round(pkrAmount / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const converted = Math.max(10, Math.round((pkrAmount * rate) / 5) * 5);
  return `${symbol}${converted.toLocaleString()}`;
}

export default function EstimatorClient() {
  const [selectedType, setSelectedType] = useState("wordpress-site");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [currency, setCurrency] = useState("PKR");
  const [auditUrl, setAuditUrl] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const activeProject = useMemo(
    () => PROJECT_TYPES.find((p) => p.id === selectedType) || PROJECT_TYPES[0],
    [selectedType]
  );

  const totals = useMemo(() => {
    let min = activeProject.minPkr;
    let max = activeProject.maxPkr;
    selectedAddons.forEach((id) => {
      const a = ADDONS.find((x) => x.id === id);
      if (a) {
        min += a.minPkr;
        max += a.maxPkr;
      }
    });
    const isExpress = selectedAddons.includes("rapid-4day");
    const timeline = activeProject.isMonthly
      ? "Results in 60–90 Days (Monthly Retainer)"
      : isExpress
        ? "4–7 Working Days (Express Sprint)"
        : `${activeProject.daysMin}–${activeProject.daysMax} Working Days`;

    return { min, max, timeline };
  }, [activeProject, selectedAddons]);

  const whatsappEstimateUrl = useMemo(() => {
    const addonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.label)
      .filter(Boolean)
      .join(", ");
    const msg = `Hi Luma Softs! I used your Project Cost Estimator:\n• Service: ${activeProject.title}\n• Add-ons: ${addonNames || "Standard"}\n• Estimated Range: ${formatMoney(totals.min, currency)} - ${formatMoney(totals.max, currency)}${activeProject.isMonthly ? "/mo" : ""}\n• Target Timeline: ${totals.timeline}\n\nLet's discuss my project!`;
    return `https://wa.me/923136661921?text=${encodeURIComponent(msg)}`;
  }, [activeProject, selectedAddons, totals, currency]);

  const handleAuditSubmit = (e) => {
    e.preventDefault();
    if (!auditUrl.trim()) return;
    const msg = `Hi Luma Softs! Please run a Free Technical SEO, Backlink & AI Search (GEO) Audit for my website: ${auditUrl.trim()}`;
    window.open(`https://wa.me/923136661921?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const copyShareTool = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("https://lumasofts.com/estimator");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 780, margin: "0 auto 3.5rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            <Calculator size={14} style={{ marginRight: 6 }} /> Interactive Pricing Tool
          </div>
          <h1 className="section-title">
            Website, App &amp; SEO <span style={{ color: "var(--primary)" }}>Cost Estimator</span>
          </h1>
          <p className="section-subtitle" style={{ margin: "1rem auto 1.5rem" }}>
            Calculate real-time 2026 software, Shopify/WordPress eCommerce, mobile app, and AI SEO investment ranges in seconds—transparent pricing for Pakistan, UK, Europe, UAE &amp; US brands.
          </p>

          {/* Currency Switcher */}
          <div style={{ display: "inline-flex", gap: "0.5rem", padding: "0.35rem", borderRadius: 9999, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", flexWrap: "wrap", justifyContent: "center" }}>
            {Object.keys(CURRENCIES).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setCurrency(key)}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: 9999,
                  border: "none",
                  background: currency === key ? "var(--primary)" : "transparent",
                  color: currency === key ? "#000" : "var(--gray)",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {CURRENCIES[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Calculator Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "2rem", alignItems: "start", marginBottom: "5rem" }}>
          {/* Left Choices */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem" }}>
                1. Choose What You Want to Build
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1rem" }}>
                {PROJECT_TYPES.map((pt) => {
                  const Icon = pt.icon;
                  const active = selectedType === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setSelectedType(pt.id)}
                      className="glass"
                      style={{
                        padding: "1.25rem",
                        textAlign: "left",
                        cursor: "pointer",
                        border: active ? "1px solid var(--primary)" : "1px solid var(--border)",
                        background: active ? "rgba(194,255,5,0.07)" : undefined,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
                        <Icon size={22} color={active ? "var(--primary)" : "var(--gray)"} />
                        {active && <Check size={18} color="var(--primary)" />}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "0.35rem" }}>
                        {pt.title}
                      </div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--gray)", lineHeight: 1.5 }}>
                        {pt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem" }}>
                2. Select Power-Up Features &amp; Speed
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {ADDONS.map((addon) => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className="glass"
                      style={{
                        padding: "1rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        cursor: "pointer",
                        border: checked ? "1px solid var(--primary)" : "1px solid var(--border)",
                        background: checked ? "rgba(194,255,5,0.06)" : undefined,
                        textAlign: "left",
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#fff" }}>{addon.label}</span>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: checked ? "var(--primary)" : "var(--gray)", whiteSpace: "nowrap" }}>
                        +{formatMoney(addon.minPkr, currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Summary Card */}
          <div className="glass" style={{ padding: "2.25rem", border: "1px solid rgba(194,255,5,0.3)", position: "sticky", top: "6.5rem" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
              Instant Investment Summary
            </div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "1.25rem" }}>
              {activeProject.title}
            </h2>

            <div style={{ padding: "1.5rem", borderRadius: 14, background: "rgba(194,255,5,0.06)", border: "1px solid rgba(194,255,5,0.2)", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.35rem" }}>
                Estimated Investment Range
              </div>
              <div style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--primary)", lineHeight: 1.2 }}>
                {formatMoney(totals.min, currency)} – {formatMoney(totals.max, currency)}
                {activeProject.isMonthly && <span style={{ fontSize: "1rem", fontWeight: 600 }}>/mo</span>}
              </div>
              <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#e4e4e7", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <Zap size={15} color="var(--primary)" />
                <span><strong>Delivery:</strong> {totals.timeline}</span>
              </div>
            </div>

            <div style={{ fontSize: "0.85rem", color: "var(--gray)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Includes mobile-first responsive engineering, Core Web Vitals speed optimization, SSL security, and milestone-based payment protection (50% / 25% / 25%).
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href={whatsappEstimateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <MessageCircle size={18} />
                <span>Lock This Estimate on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="btn-outline"
                style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span>Request Detailed PDF Proposal</span>
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={copyShareTool}
                style={{ background: "none", border: "none", color: "var(--gray)", fontSize: "0.8125rem", cursor: "pointer", marginTop: "0.25rem", textDecoration: "underline" }}
              >
                {copiedLink ? "✓ Tool Link Copied! Share or Bookmark" : "Share / Cite This Free Calculator"}
              </button>
            </div>
          </div>
        </div>

        {/* Free SEO + AI Search (GEO) Website Audit Tool */}
        <div className="glass" style={{ padding: "3rem 2rem", borderRadius: 20, border: "1px solid rgba(194,255,5,0.22)", textAlign: "center", maxWidth: 880, margin: "0 auto" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            <Search size={14} style={{ marginRight: 6 }} /> Free SEO &amp; AI Visibility Check
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Is Your Website Visible on <span style={{ color: "var(--primary)" }}>Google &amp; ChatGPT</span>?
          </h2>
          <p style={{ color: "var(--gray)", maxWidth: 620, margin: "0 auto 2rem", lineHeight: 1.6 }}>
            Enter your website URL below and our SEO &amp; GEO engineers will send you a free Technical SEO, PageSpeed, Backlink Gap, and AI Citation Readiness report.
          </p>
          <form onSubmit={handleAuditSubmit} style={{ display: "flex", gap: "0.75rem", maxWidth: 600, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="url"
              required
              placeholder="https://yourwebsite.com"
              value={auditUrl}
              onChange={(e) => setAuditUrl(e.target.value)}
              className="form-input"
              style={{ flex: "1 1 280px" }}
            />
            <button type="submit" className="btn-primary" style={{ padding: "0.875rem 1.75rem" }}>
              Get Free SEO + AI Audit →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
