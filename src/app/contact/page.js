"use client";
import React, { useState } from "react";
import { Mail, Phone, Clock, MessageCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Contact Us</div>
          <h1 className="section-title">
            Let&apos;s Start a <span style={{ color: "var(--primary)" }}>Conversation</span>
          </h1>
          <p className="section-subtitle" style={{ margin: "1rem auto 0" }}>
            Have a project in mind? We&apos;d love to hear from you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "3rem" }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "2rem" }}>Get in Touch</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Mail size={20} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Email</div>
                  <a href="mailto:admin@lumasofts.com" style={{ color: "var(--gray)", fontSize: "0.9375rem", display: "block" }}>admin@lumasofts.com</a>
                  <a href="mailto:info@lumasofts.com" style={{ color: "var(--gray)", fontSize: "0.9375rem", display: "block" }}>info@lumasofts.com</a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Phone size={20} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Phone</div>
                  <a href="tel:+923136661921" style={{ color: "var(--gray)", fontSize: "0.9375rem" }}>+92 313 666 1921</a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clock size={20} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Office Hours</div>
                  <p style={{ color: "var(--gray)", fontSize: "0.9375rem" }}>Mon – Fri: 9:00 AM – 6:00 PM (PKT)</p>
                  <p style={{ color: "var(--gray)", fontSize: "0.9375rem" }}>Sat: 10:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/923136661921"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ marginTop: "2rem", display: "inline-flex" }}
            >
              <MessageCircle size={18} style={{ marginRight: 4 }} /> Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="glass" style={{ padding: "2rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "1.5rem" }}>Send a Message</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "1rem" }}>
                <input type="text" required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input" />
                <input type="email" required placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="form-input" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "1rem" }}>
                <input type="tel" placeholder="Phone (Optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="form-input" />
                <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="form-input" />
              </div>
              <textarea required rows={5} placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="form-input" style={{ resize: "none" }} />
              <button type="submit" disabled={status === "sending"} className="btn-primary" style={{ width: "100%", opacity: status === "sending" ? 0.6 : 1 }}>
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <p style={{ color: "var(--primary)", textAlign: "center", fontSize: "0.875rem" }}>
                  <CheckCircle size={16} style={{ display: "inline", marginRight: 4 }} /> Message sent successfully. We&apos;ll get back to you soon!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Google Map Section */}
        <div style={{ marginTop: "4rem", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)", height: "400px" }}>
          <iframe 
            src="https://maps.google.com/maps?q=Luma+Softs,+Karachi,+Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
