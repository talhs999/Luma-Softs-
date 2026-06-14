"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Globe, ShoppingCart, Bot, Smartphone, PenTool, BarChart3, Cpu, Layers, Code } from "lucide-react";
import {
  SiNextdotjs, SiTailwindcss, SiSupabase, SiReact, SiVuedotjs, SiAngular, SiNodedotjs, SiPython, SiDjango, SiLaravel, SiPhp, SiFirebase, SiMongodb, SiPostgresql, SiMysql, SiDocker, SiFigma, SiWordpress, SiShopify
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
  const name = techName.toLowerCase().replace(/[^a-z0-9]/g, '');
  switch (name) {
    case 'nextjs': return <SiNextdotjs />;
    case 'tailwind':
    case 'tailwindcss': return <SiTailwindcss />;
    case 'supabase': return <SiSupabase />;
    case 'react':
    case 'reactjs': return <SiReact />;
    case 'vue':
    case 'vuejs': return <SiVuedotjs />;
    case 'angular': return <SiAngular />;
    case 'node':
    case 'nodejs': return <SiNodedotjs />;
    case 'python': return <SiPython />;
    case 'django': return <SiDjango />;
    case 'laravel': return <SiLaravel />;
    case 'php': return <SiPhp />;
    case 'firebase': return <SiFirebase />;
    case 'mongodb':
    case 'mongo': return <SiMongodb />;
    case 'postgresql':
    case 'postgres': return <SiPostgresql />;
    case 'mysql': return <SiMysql />;
    case 'docker': return <SiDocker />;
    case 'aws': return <FaAws />;
    case 'figma': return <SiFigma />;
    case 'wordpress': return <SiWordpress />;
    case 'shopify': return <SiShopify />;
    default: return <Code size={14} />;
  }
};

export default function PortfolioDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchData();
  }, [slug]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/portfolio/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data.project);
        setRelated(data.related || []);
      }
    } catch (err) {
      console.error("Error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Project Not Found</h1>
        <Link href="/portfolio" className="btn-outline">← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-container" style={{ maxWidth: 960 }}>
        {/* Breadcrumb */}
        <Link href="/portfolio" style={{ color: "var(--gray)", fontSize: "0.875rem", display: "inline-block", marginBottom: "2rem" }}>
          ← Back to Portfolio
        </Link>

        {/* Hero Banner */}
        {project.featured_image ? (
          <div style={{ height: 400, borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", marginBottom: "3rem" }}>
            <img src={project.featured_image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
            <div style={{ fontSize: "0.75rem", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>Duration</div>
            <div style={{ fontWeight: 600 }}>{project.duration || "N/A"}</div>
          </div>
          <div className="glass" style={{ padding: "1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>Category</div>
            <div style={{ fontWeight: 600 }}>{project.category}</div>
          </div>
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1rem" }}>
              <span style={{ color: "var(--primary)" }}>●</span> Technologies Used
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
              <h3 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.75rem", color: "var(--primary)" }}>The Challenge</h3>
              <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{project.challenge}</p>
            </div>
          )}
          {project.solution && (
            <div className="glass" style={{ padding: "2rem" }}>
              <h3 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.75rem", color: "var(--primary)" }}>Our Solution</h3>
              <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{project.solution}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {project.results && (
          <div className="glass" style={{ padding: "2rem", marginBottom: "3rem" }}>
            <h3 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.75rem" }}>
              <span style={{ color: "var(--primary)" }}>●</span> Results Achieved
            </h3>
            <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{project.results}</p>
          </div>
        )}

        {/* Client Testimonial */}
        {project.testimonial && (
          <div style={{ borderLeft: "3px solid var(--primary)", padding: "1.5rem 2rem", marginBottom: "3rem", background: "rgba(194,255,5,0.02)", borderRadius: "0 12px 12px 0" }}>
            <p style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: "0.75rem" }}>
              &ldquo;{project.testimonial}&rdquo;
            </p>
            <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{project.client}</div>
          </div>
        )}

        {/* Live URL */}
        {project.live_url && (
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "inline-block", padding: "1rem 2rem" }}>
              View Live Project
            </a>
          </div>
        )}

        {/* Related Projects */}
        {related.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
            <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1.25rem" }}>Related Projects</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1rem" }}>
              {related.map((rp) => (
                <Link key={rp.slug} href={`/portfolio/${rp.slug}`} className="glass link-card" style={{ padding: "1.5rem" }}>
                  <h4 style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{rp.title}</h4>
                  <span style={{ color: "var(--gray)", fontSize: "0.8125rem" }}>{rp.category}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="glass" style={{ padding: "2.5rem", textAlign: "center" }}>
          <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            Have a Similar Project in Mind?
          </h3>
          <p style={{ color: "var(--gray)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
            Let&apos;s turn your idea into reality.
          </p>
          <Link href="/contact" className="btn-primary">Start a Conversation</Link>
        </div>
      </div>
    </section>
  );
}
