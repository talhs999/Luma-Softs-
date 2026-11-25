"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Globe, ShoppingCart, Bot, Smartphone, PenTool, BarChart3, Cpu, Layers, Code, ExternalLink, Calculator } from "lucide-react";
import {
  SiNextdotjs, SiTailwindcss, SiSupabase, SiReact, SiVuedotjs, SiAngular, SiNodedotjs, SiPython, SiDjango, SiLaravel, SiPhp, SiFirebase, SiMongodb, SiPostgresql, SiMysql, SiDocker, SiFigma, SiWordpress, SiShopify, SiWoocommerce
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

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

const getTechIcon = (techName) => {
  const name = String(techName || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  switch (name) {
    case "nextjs": return <SiNextdotjs />;
    case "tailwind":
    case "tailwindcss": return <SiTailwindcss />;
    case "supabase": return <SiSupabase />;
    case "react":
    case "reactjs": return <SiReact />;
    case "vue":
    case "vuejs": return <SiVuedotjs />;
    case "angular": return <SiAngular />;
    case "node":
    case "nodejs": return <SiNodedotjs />;
    case "python": return <SiPython />;
    case "django": return <SiDjango />;
    case "laravel": return <SiLaravel />;
    case "php": return <SiPhp />;
    case "firebase": return <SiFirebase />;
    case "mongodb":
    case "mongo": return <SiMongodb />;
    case "postgresql":
    case "postgres": return <SiPostgresql />;
    case "mysql": return <SiMysql />;
    case "docker": return <SiDocker />;
    case "aws": return <FaAws />;
    case "figma": return <SiFigma />;
    case "wordpress": return <SiWordpress />;
    case "woocommerce": return <SiWoocommerce />;
    case "shopify": return <SiShopify />;
    default: return <Code size={14} />;
  }
};

export default function PortfolioDetailClient({ project, related = [] }) {
  const galleryImages = Array.isArray(project.images) && project.images.length > 0
    ? project.images
    : project.featured_image
      ? [project.featured_image]
      : [];

  const [activeImage, setActiveImage] = useState(galleryImages[0] || null);

  return (
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-container" style={{ maxWidth: 960 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--gray)" }}>
          <Link href="/" style={{ color: "var(--gray)" }}>Home</Link>
          <span>/</span>
          <Link href="/portfolio" style={{ color: "var(--gray)" }}>Portfolio</Link>
          <span>/</span>
          <span style={{ color: "var(--primary)", fontWeight: 500 }}>{project.title}</span>
        </nav>

        {/* Interactive Hero & Multi-Screenshot Gallery */}
        {activeImage ? (
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ height: "clamp(240px, 48vw, 460px)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", background: "#0a0a0a" }}>
              <img
                src={activeImage}
                alt={`${project.title} — Case Study Screenshot`}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", transition: "all 0.3s ease" }}
              />
            </div>
            {galleryImages.length > 1 && (
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
                {galleryImages.map((imgUrl, idx) => {
                  const selected = activeImage === imgUrl;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(imgUrl)}
                      style={{
                        width: 120,
                        height: 72,
                        borderRadius: 10,
                        overflow: "hidden",
                        border: selected ? "2px solid var(--primary)" : "1px solid var(--border)",
                        padding: 0,
                        background: "#0a0a0a",
                        cursor: "pointer",
                        opacity: selected ? 1 : 0.65,
                        transition: "all 0.2s ease",
                        flexShrink: 0,
                      }}
                      aria-label={`View screenshot ${idx + 1}`}
                    >
                      <img src={imgUrl} alt={`${project.title} preview ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="glass" style={{ height: 350, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "3rem" }}>
            {(() => { const Icon = ICON_MAP[project.category] || Globe; return <Icon size={80} color="var(--primary)" strokeWidth={1} />; })()}
          </div>
        )}

        {/* Title & Meta */}
        <div style={{ marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {project.category}
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0.5rem 0 1rem" }}>
            {project.title}
          </h1>
          <p style={{ color: "var(--gray)", fontSize: "1.125rem", lineHeight: 1.7 }}>
            {project.description}
          </p>
        </div>

        {/* Project Details Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          <div className="glass" style={{ padding: "1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>Client</div>
            <div style={{ fontWeight: 600 }}>{project.client || "Confidential"}</div>
          </div>
          <div className="glass" style={{ padding: "1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>Delivery Timeline</div>
            <div style={{ fontWeight: 600, color: "var(--primary)" }}>{project.duration || "N/A"}</div>
          </div>
          <div className="glass" style={{ padding: "1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>Category</div>
            <div style={{ fontWeight: 600 }}>{project.category}</div>
          </div>
        </div>

        {/* Technologies */}
        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1rem" }}>
              <span style={{ color: "var(--primary)" }}>●</span> Technologies &amp; Stack
            </h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {project.technologies.map((tech) => (
                <span key={tech} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8125rem", padding: "0.375rem 0.875rem", borderRadius: 9999, background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", color: "var(--fg)" }}>
                  {getTechIcon(tech)}
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Challenge & Solution */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {project.challenge && (
            <div className="glass" style={{ padding: "2rem" }}>
              <h2 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.75rem", color: "var(--primary)" }}>The Challenge</h2>
              <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{project.challenge}</p>
            </div>
          )}
          {project.solution && (
            <div className="glass" style={{ padding: "2rem" }}>
              <h2 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.75rem", color: "var(--primary)" }}>Our Solution</h2>
              <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{project.solution}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {project.results && (
          <div className="glass" style={{ padding: "2rem", marginBottom: "3rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.75rem" }}>
              <span style={{ color: "var(--primary)" }}>●</span> Measurable Impact &amp; Results
            </h2>
            <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{project.results}</p>
          </div>
        )}

        {/* Client Testimonial */}
        {project.testimonial && (
          <div style={{ borderLeft: "3px solid var(--primary)", padding: "1.5rem 2rem", marginBottom: "3rem", background: "rgba(194,255,5,0.02)", borderRadius: "0 12px 12px 0" }}>
            <p style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: "0.75rem" }}>
              &ldquo;{project.testimonial}&rdquo;
            </p>
            <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>— {project.client}</div>
          </div>
        )}

        {/* Live URL */}
        {project.live_url && project.live_url !== "#" && (
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            <a href={project.live_url.trim()} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem" }}>
              <span>Visit Live Website</span>
              <ExternalLink size={16} />
            </a>
            <Link href="/estimator" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem" }}>
              <Calculator size={16} />
              <span>Estimate Similar Project</span>
            </Link>
          </div>
        )}

        {/* Related Projects */}
        {related.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1.25rem" }}>Related Case Studies</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "1rem" }}>
              {related.map((rp) => (
                <Link key={rp.slug} href={`/portfolio/${encodeURIComponent(rp.slug)}`} className="glass link-card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontWeight: 600, fontSize: "1.05rem", marginBottom: "0.35rem" }}>{rp.title}</h3>
                  <span style={{ color: "var(--primary)", fontSize: "0.8125rem", fontWeight: 500 }}>{rp.category} →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="glass" style={{ padding: "2.5rem", textAlign: "center" }}>
          <h2 style={{ fontWeight: 600, fontSize: "1.35rem", marginBottom: "0.5rem" }}>
            Want Results Like {project.client || "This Project"}?
          </h2>
          <p style={{ color: "var(--gray)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
            Get a free timeline &amp; investment breakdown tailored to your goals.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">Start a Conversation</Link>
            <Link href="/estimator" className="btn-outline">Calculate Project Cost</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
