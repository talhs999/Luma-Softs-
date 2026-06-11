import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Luma Softs",
  description: "Privacy Policy for Luma Softs. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <section style={{ padding: "6rem 0 8rem" }}>
      <div className="section-container" style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ color: "var(--gray)", fontSize: "0.875rem" }}>
            ← Back to Home
          </Link>
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}>Privacy Policy</h1>
        <p style={{ color: "var(--gray)", marginBottom: "3rem" }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "var(--fg)", lineHeight: 1.8 }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>1. Information We Collect</h2>
            <p style={{ color: "var(--gray)" }}>
              Luma Softs ("we," "our," or "us") is committed to protecting your privacy. We collect information you provide directly to us, such as when you request a quote, fill out a contact form, or communicate with us. This may include your name, email address, phone number, and business details.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>2. How We Use Your Information</h2>
            <p style={{ color: "var(--gray)" }}>
              We use the information we collect to provide, maintain, and improve our services. Specifically, we use it to communicate with you about your projects, send technical notices and support messages, and provide digital marketing or software development services as requested.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>3. Data Security</h2>
            <p style={{ color: "var(--gray)" }}>
              We implement industry-standard security measures to protect your personal information from unauthorized access, use, or disclosure. However, no internet or email transmission is ever fully secure or error-free.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>4. Sharing of Information</h2>
            <p style={{ color: "var(--gray)" }}>
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>5. Contact Us</h2>
            <p style={{ color: "var(--gray)" }}>
              If you have any questions about this Privacy Policy, please contact us at: <br/>
              <strong>Email:</strong> admin@lumasofts.com <br/>
              <strong>Phone:</strong> +92 313 6661921
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
