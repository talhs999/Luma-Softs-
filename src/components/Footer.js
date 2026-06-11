"use client";
import React from "react";
import Link from "next/link";

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blogs", label: "Blogs" },
  { href: "/faq", label: "FAQ" },
];

const SERVICES = [
  "Web Development",
  "Software Development",
  "Mobile App Development",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
  "AI & Automation",
  "eCommerce Development",
];

const Footer = () => {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div className="section-container" style={{ padding: "4rem 1.5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", marginBottom: "1rem" }}>
              <img src="/logo.png" alt="Luma Softs Logo" style={{ height: "64px", width: "auto", objectFit: "contain", marginLeft: "-40px" }} />
            </Link>
            <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: 280, marginBottom: "1.5rem" }}>
              Powering Ideas Into Innovation. We build websites, software, AI solutions, and digital experiences.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://www.facebook.com/61580289124242/?locale=ar_AR" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gray)", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" /></svg>
              </a>
              <a href="https://www.instagram.com/luma_softs/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gray)", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/luma-softs-6a912b384/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gray)", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "0.9375rem" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ color: "var(--gray)", fontSize: "0.9375rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "0.9375rem" }}>Services</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {SERVICES.slice(0, 5).map((s) => (
                <span key={s} style={{ color: "var(--gray)", fontSize: "0.9375rem" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "1rem", fontSize: "0.9375rem" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", color: "var(--gray)", fontSize: "0.9375rem" }}>
              <a href="mailto:admin@lumasofts.com" style={{ transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}>
                admin@lumasofts.com
              </a>
              <a href="mailto:info@lumasofts.com" style={{ transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--gray)")}>
                info@lumasofts.com
              </a>
              <a href="tel:+923136661921" style={{ transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}>
                +92 313 666 1921
              </a>
              <a href="https://maps.app.goo.gl/V7njffBB5mDPKtnV8" target="_blank" rel="noopener noreferrer" style={{ transition: "color 0.2s", display: "flex", gap: "0.5rem", alignItems: "flex-start", marginTop: "0.5rem" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <p style={{ color: "var(--gray)", fontSize: "0.8125rem" }}>
              © {new Date().getFullYear()} Luma Softs. All rights reserved.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link href="/privacy" style={{ color: "var(--gray)", fontSize: "0.8125rem", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "var(--gray)", fontSize: "0.8125rem", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gray)")}>Terms & Conditions</Link>
            <Link
              href="/login"
              style={{ color: "var(--gray)", fontSize: "0.8125rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gray)"; }}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
