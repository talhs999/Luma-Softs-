"use client";
import React, { useState, useEffect } from "react";
import { X, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if user has already seen or subscribed to the promo
    const hasSeenPromo = localStorage.getItem("luma_promo_seen");
    
    if (!hasSeenPromo) {
      // Show popup after 10 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    // Mark as seen so it doesn't bother them for the next 7 days
    const nextWeek = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("luma_promo_seen", nextWeek.toString());
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        setMessage("Awesome! Check your inbox for a special offer.");
        // Permanently hide for subscribed users
        localStorage.setItem("luma_promo_seen", "subscribed");
        setTimeout(() => closePopup(), 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          padding: "1rem"
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              background: "#111",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              padding: "2.5rem 2rem",
              width: "100%",
              maxWidth: "450px",
              position: "relative",
              textAlign: "center",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Close Button */}
            <button 
              onClick={closePopup}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "transparent",
                border: "none",
                color: "var(--gray)",
                cursor: "pointer",
                padding: "0.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--gray)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <X size={20} />
            </button>

            {status === "success" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(194,255,5,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>You're In!</h3>
                <p style={{ color: "var(--gray)", lineHeight: 1.5 }}>{message}</p>
              </motion.div>
            ) : (
              <>
                <div style={{ width: 50, height: 50, borderRadius: "14px", background: "rgba(194,255,5,0.1)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  <Mail size={24} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "#fff", lineHeight: 1.2 }}>
                  Transform Your Business with <span style={{ color: "var(--primary)" }}>AI</span>
                </h3>
                <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                  Get a free technical consultation and a 10% discount on your first custom software project.
                </p>

                <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "1rem 1.25rem",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontSize: "1rem",
                      outline: "none",
                      transition: "all 0.3s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                  
                  {status === "error" && (
                    <p style={{ color: "#ff4444", fontSize: "0.875rem", margin: 0, textAlign: "left" }}>{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "1rem",
                      opacity: status === "loading" ? 0.7 : 1,
                      cursor: status === "loading" ? "not-allowed" : "pointer"
                    }}
                  >
                    {status === "loading" ? "Subscribing..." : "Claim Offer"}
                    {!status && <ArrowRight size={18} />}
                  </button>
                </form>

                <p style={{ color: "var(--gray)", fontSize: "0.75rem", marginTop: "1.5rem" }}>
                  We respect your privacy. No spam, unsubscribe anytime.
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
