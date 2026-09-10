import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Layers, Briefcase, Phone, MessageSquare } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Luma Softs",
  description: "The page you are looking for does not exist or has been moved. Explore Luma Softs web development, custom software, and digital solutions in Karachi.",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 4rem",
        background: "#050505",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(194, 255, 5, 0.08), transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="section-container"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "720px",
          textAlign: "center",
          background: "rgba(10, 10, 10, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "28px",
          padding: "3.5rem 2rem",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Large stylized 404 badge */}
        <div
          style={{
            fontSize: "clamp(5rem, 15vw, 8.5rem)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, #ffffff 30%, var(--primary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
            textShadow: "0 0 40px rgba(194, 255, 5, 0.2)",
          }}
        >
          404
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 1rem",
            borderRadius: "9999px",
            background: "rgba(194, 255, 5, 0.08)",
            border: "1px solid rgba(194, 255, 5, 0.25)",
            color: "var(--primary)",
            fontSize: "0.8125rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}
        >
          PAGE NOT FOUND
        </div>

        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "1rem",
            lineHeight: 1.25,
          }}
        >
          Oops! That Page Has Moved Or Doesn&apos;t Exist
        </h1>

        <p
          style={{
            fontSize: "1.0625rem",
            color: "var(--gray)",
            lineHeight: 1.7,
            maxWidth: "540px",
            margin: "0 auto 2.5rem",
          }}
        >
          The link you followed may be broken or the page may have been relocated. Let&apos;s get you back on track to exploring our digital solutions.
        </p>

        {/* Action Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
            textAlign: "left",
          }}
        >
          <Link
            href="/"
            className="glass"
            style={{
              padding: "1.25rem",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              textDecoration: "none",
              color: "#ffffff",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: "rgba(194, 255, 5, 0.12)",
                border: "1px solid rgba(194, 255, 5, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              <Home size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9375rem" }}>Home Page</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--gray)" }}>Return to our main hub</div>
            </div>
          </Link>

          <Link
            href="/services"
            className="glass"
            style={{
              padding: "1.25rem",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              textDecoration: "none",
              color: "#ffffff",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: "rgba(194, 255, 5, 0.12)",
                border: "1px solid rgba(194, 255, 5, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              <Layers size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9375rem" }}>Services</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--gray)" }}>Web, App &amp; AI solutions</div>
            </div>
          </Link>

          <Link
            href="/portfolio"
            className="glass"
            style={{
              padding: "1.25rem",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              textDecoration: "none",
              color: "#ffffff",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: "rgba(194, 255, 5, 0.12)",
                border: "1px solid rgba(194, 255, 5, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              <Briefcase size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9375rem" }}>Portfolio</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--gray)" }}>View our client projects</div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="glass"
            style={{
              padding: "1.25rem",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              textDecoration: "none",
              color: "#ffffff",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: "rgba(194, 255, 5, 0.12)",
                border: "1px solid rgba(194, 255, 5, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              <Phone size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9375rem" }}>Contact Us</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--gray)" }}>Get in touch directly</div>
            </div>
          </Link>
        </div>

        {/* Primary CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" style={{ padding: "0.875rem 2rem" }}>
            Return Home
          </Link>
          <a
            href="https://wa.me/923136661921"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ padding: "0.875rem 2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <MessageSquare size={18} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
