import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | Luma Softs",
  description: "Terms and Conditions for Luma Softs digital services and software products.",
};

export default function TermsPage() {
  return (
    <section style={{ padding: "6rem 0 8rem" }}>
      <div className="section-container" style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ color: "var(--gray)", fontSize: "0.875rem" }}>
            ← Back to Home
          </Link>
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}>Terms and Conditions</h1>
        <p style={{ color: "var(--gray)", marginBottom: "3rem" }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", color: "var(--fg)", lineHeight: 1.8 }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>1. Acceptance of Terms</h2>
            <p style={{ color: "var(--gray)" }}>
              By accessing our website and utilizing our services at Luma Softs, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>2. Services Provided</h2>
            <p style={{ color: "var(--gray)" }}>
              Luma Softs provides web development, software engineering, mobile app development, UI/UX design, AI solutions, and digital marketing services. The specific deliverables, timelines, and costs will be outlined in a separate Statement of Work (SOW) or contract for each project.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>3. Intellectual Property</h2>
            <p style={{ color: "var(--gray)" }}>
              Upon full payment, the client retains ownership of the final deliverables (source code, designs, and content) unless otherwise specified in the contract. Luma Softs retains the right to display the completed work in our portfolio and marketing materials.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>4. Payment Terms</h2>
            <p style={{ color: "var(--gray)" }}>
              Payment schedules are agreed upon before project commencement. Typically, a deposit is required before work begins, with milestones tied to deliverables. Failure to meet payment deadlines may result in project suspension.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--primary)", marginBottom: "1rem" }}>5. Limitation of Liability</h2>
            <p style={{ color: "var(--gray)" }}>
              Luma Softs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, arising out of or related to your use of our services or products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
