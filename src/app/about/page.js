import Link from "next/link";
import { Target, Handshake, Star, Globe2 } from "lucide-react";
import TeamSection from "../../components/TeamSection";

export const metadata = {
  title: "About Us | Luma Softs",
  description: "Learn about Luma Softs — our mission, vision, values, and the team behind our digital solutions.",
};

const VALUES = [
  { icon: Target, title: "Innovation", desc: "We continuously push the boundaries of what's possible with technology." },
  { icon: Handshake, title: "Integrity", desc: "Honest communication and transparent processes in every engagement." },
  { icon: Star, title: "Excellence", desc: "We never settle for good enough — every detail matters." },
  { icon: Globe2, title: "Impact", desc: "Building solutions that create real, measurable value for our clients." },
];

export default function AboutPage() {
  return (
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "800px", margin: "0 auto 4rem auto" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>The Vision Behind Luma Softs</div>
          <h1 className="section-title">Powering Ideas Into <span style={{ color: "var(--primary)" }}>Innovation</span></h1>
          <p className="section-subtitle" style={{ margin: "1.5rem auto 1.5rem", color: "var(--gray)", lineHeight: 1.8, fontSize: "1rem" }}>
            Luma Softs stands as a beacon of creativity and innovation in the ever-evolving digital landscape. We are more than just a technology agency — we are a team of dreamers, builders, and problem-solvers who turn ambitious ideas into impactful digital realities. Specializing in web design, development, software solutions, WordPress, mobile apps, graphic design, and digital marketing, Luma Softs empowers businesses to thrive in a competitive online world.
          </p>
          <p className="section-subtitle" style={{ margin: "0 auto", color: "var(--gray)", lineHeight: 1.8, fontSize: "1rem" }}>
            Founded by the visionary duo Talha Khan and Mustufa Ali, Luma Softs was built on a foundation of passion, integrity, and an unwavering commitment to excellence. As the journey grew, Arhum Noman joined the mission, bringing fresh perspectives and energy that pushed the company to greater heights. Together, this powerhouse team continues to redefine digital possibilities and craft success stories for brands worldwide.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem", marginBottom: "5rem" }}>
          <div className="glass" style={{ padding: "2.5rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1rem", color: "var(--primary)" }}>Our Vision</h2>
            <p style={{ color: "var(--gray)", lineHeight: 1.7 }}>
              To become a global leader in digital innovation, delivering solutions that inspire creativity, drive business growth, and leave a lasting impact on industries across the world.
            </p>
          </div>
          <div className="glass" style={{ padding: "2.5rem" }}>
            <h2 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1rem", color: "var(--primary)" }}>Our Mission</h2>
            <p style={{ color: "var(--gray)", lineHeight: 1.7 }}>
              At Luma Softs, our mission is to design, develop, and deliver cutting-edge digital solutions that empower businesses, strengthen brands, and connect people through technology. We aim to combine creativity with strategy, ensuring every project we deliver is a perfect blend of functionality, design, and innovation.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>What Drives Us</div>
            <h2 className="section-title">Core Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "1.5rem" }}>
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <Icon size={24} color="var(--primary)" />
                  </div>
                  <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{v.title}</h3>
                  <p style={{ color: "var(--gray)", fontSize: "0.875rem", lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <TeamSection />

        <div className="glass" style={{ padding: "3rem", textAlign: "center" }}>
          <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "0.5rem" }}>Want to Work With Us?</h3>
          <p style={{ color: "var(--gray)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>
            We&apos;re always looking for exciting projects and talented people.
          </p>
          <Link href="/contact" className="btn-primary">Get in Touch</Link>
        </div>
      </div>
    </section>
  );
}
