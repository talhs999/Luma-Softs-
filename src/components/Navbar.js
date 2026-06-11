"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: scrolled ? "1rem" : "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 2rem)",
          maxWidth: "1200px",
          zIndex: 100,
          background: "rgba(10, 10, 10, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "9999px", // Completely rounded sides
          boxShadow: scrolled ? "0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(194,255,5,0.1) inset" : "0 10px 30px rgba(0,0,0,0.3)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <nav
          style={{
            padding: "0.5rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <img 
              src="/logo.png" 
              alt="Luma Softs Logo" 
              style={{ 
                height: "56px", 
                width: "auto", 
                objectFit: "contain",
                marginLeft: "-24px"
              }} 
            />
          </Link>

          {/* Desktop Nav */}
          <div
            className="desktop-only"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              alignItems: "center",
              gap: "2.5rem",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: pathname === link.href ? "var(--primary)" : "var(--gray)",
                  transition: "color 0.2s",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = pathname === link.href ? "var(--primary)" : "var(--gray)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Get Started Button */}
          <div className="desktop-only" style={{ alignItems: "center" }}>
            <Link 
              href="/contact" 
              style={{ 
                background: "var(--fg)", 
                color: "var(--bg)", 
                padding: "0.75rem 1.5rem", 
                borderRadius: "9999px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                transition: "all 0.2s",
                boxShadow: "0 4px 14px rgba(255,255,255,0.25)"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(194,255,5,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--fg)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(255,255,255,0.25)"; }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "50%",
              color: "var(--fg)",
              cursor: "pointer",
              width: "48px",
              height: "48px",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            aria-label="Toggle navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(10px)",
          zIndex: 90,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        className="mobile-only"
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", transform: mobileOpen ? "translateY(0)" : "translateY(20px)", transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: pathname === link.href ? "var(--primary)" : "var(--fg)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="btn-primary"
            style={{ marginTop: "1rem" }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
