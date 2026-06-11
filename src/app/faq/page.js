"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, HelpCircle } from "lucide-react";

export const FAQS = [
  {
    category: "General",
    questions: [
      { q: "What services does Luma Softs provide?", a: "We provide a comprehensive range of digital services including Web Development, Mobile App Development, UI/UX Design, Custom Software (CRM/ERP), Graphic Design, Video Editing, AI & Automation, and Digital Marketing." },
      { q: "Where are you located?", a: "We are a global digital agency, operating remotely to serve clients from all over the world, including the US, UK, Middle East, and beyond." },
      { q: "How do we get started?", a: "Simply reach out via our Contact form or WhatsApp. We will schedule a free initial consultation to discuss your project, requirements, and provide a tailored proposal." }
    ]
  },
  {
    category: "Pricing & Timelines",
    questions: [
      { q: "How much does a project cost?", a: "Pricing varies depending on the scope, features, and complexity of the project. A simple corporate website costs significantly less than a custom SaaS application. We provide transparent, itemized quotes after our initial discussion." },
      { q: "What is your typical payment structure?", a: "Generally, we work on a milestone basis: 50% upfront to commence work, 25% after design approval, and the final 25% upon project completion and deployment." },
      { q: "How long does it take to build a website?", a: "A standard corporate website takes 2-4 weeks. More complex eCommerce stores or custom web applications can take 6-12 weeks depending on the features." }
    ]
  },
  {
    category: "Technical",
    questions: [
      { q: "Do you offer ongoing support and maintenance?", a: "Yes, we offer flexible maintenance packages to ensure your website or application stays updated, secure, and performs optimally post-launch." },
      { q: "What technologies do you use?", a: "We use modern, industry-standard technologies including Next.js, React, Node.js, Python, React Native, Supabase, AWS, and modern CSS frameworks to ensure scalable and robust products." },
      { q: "Will my website be mobile-friendly and SEO optimized?", a: "Absolutely. Every website we build is fully responsive across all devices and developed with technical SEO best practices in mind to help you rank higher on search engines." }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState("0-0");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: "4rem 0 6rem", minHeight: "80vh" }}>
      <div className="section-container" style={{ maxWidth: 800 }}>
        
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
              <HelpCircle size={32} />
            </div>
          </div>
          <h1 className="section-title">Frequently Asked <span style={{ color: "var(--primary)" }}>Questions</span></h1>
          <p className="section-subtitle" style={{ margin: "1rem auto 0" }}>
            Find answers to common questions about our services, process, and technical capabilities.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {FAQS.map((category, catIdx) => (
            <div key={catIdx}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--primary)" }}>
                {category.category}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {category.questions.map((faq, i) => {
                  const id = `${catIdx}-${i}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={i} className="glass" style={{ padding: "0 1.5rem", borderRadius: 12, overflow: "hidden", border: isOpen ? "1px solid var(--primary)" : "1px solid var(--border)", transition: "all 0.3s ease" }}>
                      <button 
                        onClick={() => toggleAccordion(id)}
                        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", background: "none", border: "none", color: "var(--fg)", fontSize: "1.0625rem", fontWeight: 600, cursor: "pointer", textAlign: "left" }}
                      >
                        <span style={{ paddingRight: "2rem" }}>{faq.q}</span>
                        <div style={{ color: isOpen ? "var(--primary)" : "var(--gray)", transition: "all 0.2s", flexShrink: 0 }}>
                          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                        </div>
                      </button>
                      <div style={{ maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0, transition: "all 0.3s ease-in-out", paddingBottom: isOpen ? "1.5rem" : 0 }}>
                        <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="glass" style={{ marginTop: "5rem", padding: "3rem 2rem", textAlign: "center", borderRadius: 16 }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>Still have questions?</h3>
          <p style={{ color: "var(--gray)", fontSize: "1rem", marginBottom: "2rem" }}>Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Link href="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </div>

      </div>
    </section>
  );
}
