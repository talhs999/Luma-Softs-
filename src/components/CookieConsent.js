"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("lumasofts_cookie_consent");
    if (!consent) {
      // Show banner after a slight delay for smooth UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("lumasofts_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("lumasofts_cookie_consent", "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "1.5rem",
            maxWidth: "430px",
            width: "calc(100% - 3rem)",
            zIndex: 9990,
            background: "rgba(10, 10, 10, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(194, 255, 5, 0.25)",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(194, 255, 5, 0.08)",
            color: "var(--fg)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", marginBottom: "0.875rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(194, 255, 5, 0.12)",
                border: "1px solid rgba(194, 255, 5, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#ffffff", marginBottom: "0.25rem" }}>
                We Value Your Privacy
              </div>
              <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--gray)", lineHeight: 1.6 }}>
                We use cookies and analytics to enhance your experience, serve personalized content, and analyze our traffic. Read our{" "}
                <Link
                  href="/privacy"
                  style={{ color: "var(--primary)", textDecoration: "underline", fontWeight: 500 }}
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <button
              onClick={handleDecline}
              aria-label="Close"
              style={{
                background: "none",
                border: "none",
                color: "var(--gray)",
                cursor: "pointer",
                padding: "0.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={handleAccept}
              className="btn-primary"
              style={{
                flex: "1 1 auto",
                padding: "0.625rem 1.25rem",
                fontSize: "0.8125rem",
                fontWeight: 700,
                textAlign: "center",
                borderRadius: "9999px",
                cursor: "pointer",
              }}
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="btn-outline"
              style={{
                flex: "1 1 auto",
                padding: "0.625rem 1.25rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                textAlign: "center",
                borderRadius: "9999px",
                background: "transparent",
                borderColor: "rgba(255, 255, 255, 0.15)",
                color: "var(--gray)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--gray)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              }}
            >
              Essential Only
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
