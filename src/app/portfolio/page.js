"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { Globe, ShoppingCart, Bot, Smartphone, PenTool, BarChart3, Cpu, Layers } from "lucide-react";

const ICON_MAP = {
  "Web Development": Globe,
  "eCommerce": ShoppingCart,
  "AI Solutions": Bot,
  "Mobile Apps": Smartphone,
  "Graphic Design": PenTool,
  "Digital Marketing": BarChart3,
  "Software Development": Cpu,
  "UI/UX Design": Layers,
};

const PORTFOLIO_CATEGORIES = [
  "All",
  "Web Development",
  "Mobile Apps",
  "Graphic Design",
  "UI/UX Design",
  "Digital Marketing",
  "AI Solutions",
  "Software Development",
  "eCommerce",
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setPortfolio(data);
    }
    setLoading(false);
  };

  const filtered = activeCategory === "All" ? portfolio : portfolio.filter((p) => p.category === activeCategory);

  return (
    <section style={{ padding: "4rem 0 6rem", minHeight: "80vh" }}>
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Our Work</div>
          <h1 className="section-title">Featured <span style={{ color: "var(--primary)" }}>Portfolio</span></h1>
          <p className="section-subtitle" style={{ margin: "1rem auto 0" }}>A curated selection of projects that showcase our expertise across industries.</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.625rem", marginBottom: "3rem" }}>
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.25rem", borderRadius: 9999, border: "1px solid",
                borderColor: activeCategory === cat ? "var(--primary)" : "var(--border)",
                background: activeCategory === cat ? "var(--primary)" : "transparent",
                color: activeCategory === cat ? "#000" : "var(--gray)",
                fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer", transition: "all 0.2s ease",
              }}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--gray)" }}>Loading projects...</div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: "1.5rem" }}>
              {filtered.map((project) => {
                const Icon = ICON_MAP[project.category] || Globe;
                return (
                  <Link key={project.id} href={`/portfolio/${project.slug}`} className="glass link-card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    {project.featured_image ? (
                      <div style={{ height: 220, borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
                        <img src={project.featured_image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{ height: 220, background: "rgba(194,255,5,0.03)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--border)" }}>
                        <Icon size={56} color="var(--primary)" strokeWidth={1} />
                      </div>
                    )}
                    <div style={{ padding: "1.5rem 2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{project.category}</span>
                      <h3 style={{ fontWeight: 600, fontSize: "1.125rem", marginTop: "0.5rem", marginBottom: "0.5rem" }}>{project.title}</h3>
                      <p style={{ color: "var(--gray)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                        {project.description ? project.description.substring(0, 120) + "..." : "No description available."}
                      </p>
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "auto", paddingTop: "1rem" }}>
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} style={{ fontSize: "0.6875rem", padding: "0.25rem 0.625rem", borderRadius: 9999, background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", color: "var(--gray)" }}>{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--gray)" }}>No projects found in this category yet.</div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
