"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { FAQS } from "./faq/page";
import { Globe, Cpu, Smartphone, Palette, PenTool, Bot, Trophy, Rocket, Handshake, DollarSign, Zap, Quote, Star, ArrowRight, Scale, ShoppingCart, HardHat, Plane, Heart, Utensils, Users, Home as HomeIcon, Anchor, BookOpen, Sparkles, FileText, Plus, Minus } from "lucide-react";
import { FaReact, FaNodeJs, FaFigma, FaAws } from "react-icons/fa";
import { SiNextdotjs, SiUnity, SiAutodeskmaya, SiFlutter } from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";

const INDUSTRIES = [
  { name: "Law/Legal", icon: Scale },
  { name: "Ecommerce", icon: ShoppingCart },
  { name: "Construction", icon: HardHat },
  { name: "Travel", icon: Plane },
  { name: "Health/Beauty", icon: Heart },
  { name: "Restaurant", icon: Utensils },
  { name: "NGO", icon: Users },
  { name: "Real Estate", icon: HomeIcon },
  { name: "Import/Export", icon: Anchor },
  { name: "Education", icon: BookOpen },
  { name: "Cleaning", icon: Sparkles },
  { name: "Visa Consultation", icon: FileText },
];

const AVATARS = [
  { top: "-5%", left: "10%", size: 80, img: "https://randomuser.me/api/portraits/men/32.jpg", hideOnMobile: false },
  { top: "15%", left: "10%", size: 50, img: "https://randomuser.me/api/portraits/men/44.jpg", hideOnMobile: true },
  { top: "2%", left: "75%", size: 70, img: "https://randomuser.me/api/portraits/men/22.jpg", hideOnMobile: false },
  { top: "55%", left: "90%", size: 60, img: "https://randomuser.me/api/portraits/men/64.jpg", hideOnMobile: true },
  { top: "80%", left: "15%", size: 90, img: "https://randomuser.me/api/portraits/men/75.jpg", hideOnMobile: true },
  { top: "85%", left: "75%", size: 80, img: "https://randomuser.me/api/portraits/men/86.jpg", hideOnMobile: true },
  { top: "85%", left: "60%", size: 50, img: "https://randomuser.me/api/portraits/men/91.jpg", hideOnMobile: true },
  { top: "25%", left: "55%", size: 45, img: "https://randomuser.me/api/portraits/men/12.jpg", hideOnMobile: true },
];

const SERVICES_PILLS = [
  "WEB DEVELOPMENT", "SOFTWARE DEVELOPMENT", "BRANDING",
  "UI/UX DESIGN", "MOBILE APPS", "DIGITAL MARKETING",
  "AI & AUTOMATION", "GRAPHIC DESIGN", "VIDEO EDITING",
  "CLOUD & DEVOPS", "CYBERSECURITY", "QA & TESTING",
  "3D MODELING"
];

const STATS = [
  { value: "150+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
  { value: "5+", label: "Team Members" },
  { value: "10+", label: "Countries Served" },
];

const WHY_US = [
  { icon: Trophy, title: "Experience", desc: "Years of delivering high-quality digital products across industries." },
  { icon: Rocket, title: "Modern Technology", desc: "We use cutting-edge tools like Next.js, AI, and cloud platforms." },
  { icon: Handshake, title: "Dedicated Support", desc: "24/7 communication and ongoing maintenance for every project." },
  { icon: DollarSign, title: "Affordable Solutions", desc: "Premium quality without the premium price tag." },
  { icon: Zap, title: "Fast Delivery", desc: "Agile workflow ensures your project ships on time, every time." },
];

const RECENT_BLOGS = [
  { title: "The Future of AI in Software Engineering", category: "Technology", date: "June 2, 2026", desc: "How agentic AI and LLMs are revolutionizing the way we write code and build digital products." },
  { title: "10 UI/UX Trends to Watch in 2026", category: "Design", date: "May 28, 2026", desc: "Explore the latest design trends including glassmorphism, 3D elements, and hyper-minimalism." },
  { title: "Why Next.js is the Ultimate Framework", category: "Development", date: "May 15, 2026", desc: "A deep dive into server components, edge rendering, and why we build all our clients' sites with Next.js." },
];

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const waveItem = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
};

export default function Home() {
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: true });
    if (data) setReviews(data);
  };

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  // Show only first 4 FAQs from the General category on Home Page
  const homeFaqs = FAQS[0].questions.slice(0, 4);

  // Triple the array to create an infinite scrolling effect
  const visibleTestimonials = [...reviews, ...reviews, ...reviews];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", marginTop: "-72px", paddingTop: "72px", overflow: "hidden" }}>

        <div style={{ position: "absolute", inset: 0, zIndex: -2 }}>
          <img src="/hero-bg.png" alt="Luma Softs Team" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.1 }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, #050505)", zIndex: -1 }} />

        <div style={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(194,255,5,0.06), transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: -1 }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(157,255,0,0.04), transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: -1 }} />

        <motion.div 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="section-container" 
          style={{ width: "100%", paddingTop: "4rem", paddingBottom: "4rem" }}
        >
          <div style={{ maxWidth: 780 }}>
            <motion.div variants={fadeUp} className="section-label">Powering Ideas Into Innovation</motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
              Building Powerful Digital <span style={{ color: "var(--primary)" }}>Solutions</span> For Modern Businesses
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: "1.125rem", color: "var(--gray)", lineHeight: 1.7, maxWidth: 600, marginBottom: "2.5rem" }}>
              From websites and mobile apps to AI automation and digital marketing, Luma Softs helps businesses scale faster with technology that works.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">Get Started</Link>
              <Link href="/portfolio" className="btn-outline">View Portfolio</Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ ABOUT US SECTION ═══ */}
      <section style={{ padding: "6rem 0", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="section-container"
          style={{ maxWidth: 800, textAlign: "center" }}
        >
          <motion.div variants={fadeUp} className="section-label" style={{ justifyContent: "center", marginBottom: "1rem" }}>
            Who We Are
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-title" style={{ marginBottom: "2rem" }}>
            About Us
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "1.125rem", color: "var(--gray)", lineHeight: 1.8 }}>
            At Luma Softs, our role is to empower businesses with innovative digital solutions that drive growth and impact. From web development and app design to branding, graphics, and marketing strategies, we blend creativity with technology to deliver results that truly matter. With a passionate team of experts, we don’t just build projects—we build lasting partnerships by understanding your vision and transforming it into reality.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══ BRANDS SLIDER ═══ */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ borderTop: "1px solid var(--border)", background: "var(--bg)", padding: "3rem 0", overflow: "hidden" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Brands We Serve</span>
        </div>
        <div style={{ display: "flex", whiteSpace: "nowrap", width: "100%", position: "relative" }}>
          <div style={{ display: "inline-flex", gap: "4rem", paddingLeft: "4rem", animation: "scroll 20s linear infinite" }}>
            {["Mazclato Designs", "Porcini Pizza", "Attire by Waqar", "Japan Artpress", "Automarine.co.uk", "Ocda", "Earnest Advocacy", "HakamTechSol", "6starpools", "Fitrah.pk", "Mazclato Designs", "Porcini Pizza", "Attire by Waqar", "Japan Artpress", "Automarine.co.uk", "Ocda", "Earnest Advocacy", "HakamTechSol", "6starpools", "Fitrah.pk"].map((brand, i) => (
              <div key={i} style={{ fontSize: "1.25rem", fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {brand}
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </motion.section>

      {/* ═══ STATS ═══ */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="section-container" 
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}
        >
          {STATS.map((stat, i) => (
            <motion.div variants={fadeUp} key={i} style={{ textAlign: "center", padding: "2.5rem 1rem", borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--primary)", marginBottom: "0.25rem" }}>{stat.value}</div>
              <div style={{ fontSize: "0.9375rem", color: "var(--gray)" }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ SERVICES PREVIEW ═══ */}
      <section style={{ padding: "8rem 0" }}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="section-container"
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />
            <span style={{ fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>WHAT WE OFFER</span>
          </motion.div>

          <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "4rem", maxWidth: 900 }}>
            WE OFFER COMPREHENSIVE SERVICES THAT HELP BUSINESSES ESTABLISH A <span style={{ color: "var(--gray)" }}>STRONG ONLINE PRESENCE.</span>
          </motion.h2>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.25rem", maxWidth: 1000, margin: "0 auto" }}>
            {SERVICES_PILLS.map((service, i) => (
              <motion.div key={i} variants={waveItem}>
                <Link href="/services" style={{
                  display: "block",
                  padding: "1rem 2rem",
                  borderRadius: 9999,
                  border: "1px solid var(--primary)",
                  color: "var(--primary)",
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  backgroundColor: "transparent",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--primary)";
                    e.currentTarget.style.color = "#000";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}>
                  {service}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="section-container"
        >
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Why Luma Softs</div>
            <h2 className="section-title">Why Choose Us</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: "1.5rem" }}>
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div variants={fadeUp} key={i} style={{ textAlign: "center", padding: "2rem 1rem" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <Icon size={24} color="var(--primary)" />
                  </div>
                  <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p style={{ color: "var(--gray)", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══ INDUSTRIES WE SERVE ═══ */}
      <section style={{ padding: "6rem 0", borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="section-container"
        >
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>WHERE WE DO</div>
            <h2 className="section-title">Solving IT challenges in every industry, every day.</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "1.5rem" }}>
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div variants={waveItem} key={i} className="glass" style={{
                  display: "flex", alignItems: "center", borderRadius: "9999px", padding: "0.5rem", gap: "1rem", transition: "all 0.3s ease", cursor: "default"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "var(--primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(194,255,5,0.1)"; }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", flexShrink: 0 }}>
                    <Icon size={24} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: "1rem" }}>{ind.name}</span>
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", marginTop: "3.5rem" }}>
            <Link href="/services" className="btn-primary" style={{ padding: "0.875rem 2.5rem" }}>
              View All Services
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Technologies We Use Section */}
      <section style={{ padding: "4rem 0", background: "rgba(255,255,255,0.02)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "3rem" }}>Technologies We <span style={{ color: "var(--primary)" }}>Use</span></h2>
          
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center", 
            gap: "1.5rem", 
            maxWidth: "900px", 
            margin: "0 auto" 
          }}>
            {[
              { name: "React", color: "#61DAFB", icon: FaReact },
              { name: "Next.js", color: "#ffffff", icon: SiNextdotjs },
              { name: "Node.js", color: "#339933", icon: FaNodeJs },
              { name: "Figma", color: "#F24E1E", icon: FaFigma },
              { name: "Photoshop", color: "#31A8FF", icon: DiPhotoshop },
              { name: "Illustrator", color: "#FF9A00", icon: DiIllustrator },
              { name: "Unity 3D", color: "#ffffff", icon: SiUnity },
              { name: "Maya", color: "#0ECECD", icon: SiAutodeskmaya },
              { name: "Flutter", color: "#02569B", icon: SiFlutter },
              { name: "AWS Cloud", color: "#FF9900", icon: FaAws }
            ].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div key={i} className="glass" style={{ 
                  padding: "1rem 1.5rem", 
                  borderRadius: "12px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "10px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  cursor: "default"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = tech.color;
                  e.currentTarget.style.color = tech.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--fg)";
                }}>
                  <Icon size={24} color={tech.color} />
                  {tech.name}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "3rem", display: "inline-block", padding: "10px 20px", background: "rgba(194,255,5,0.1)", color: "var(--primary)", borderRadius: "99px", fontWeight: 700, fontSize: "0.875rem", border: "1px solid rgba(194,255,5,0.2)" }}>
            + And Many More...
          </div>
        </div>
      </section>

      {/* ═══ WHAT MAKES US LUMA SOFTS ═══ */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ padding: "6rem 0", background: "#050505", overflow: "hidden" }}
      >
        <div className="section-container" style={{ position: "relative", minHeight: "500px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          {AVATARS.map((av, i) => (
            <img key={i} src={av.img} alt="Team Member" className={av.hideOnMobile ? "avatar-mobile-hide" : ""} style={{
              position: "absolute", top: av.top, left: av.left, width: av.size, height: av.size, borderRadius: "50%", objectFit: "cover",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 0 2px rgba(194,255,5,0.2)",
              animation: `float ${3 + i % 3}s ease-in-out infinite alternate`, zIndex: 0
            }} />
          ))}

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "600px", padding: "2rem", background: "rgba(5,5,5,0.7)", backdropFilter: "blur(12px)", borderRadius: "24px", border: "1px solid var(--border)" }}
          >
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.1 }}>
              Why Choose Luma Softs Services?
            </h2>
            <p style={{ color: "var(--gray)", fontSize: "1.125rem", marginBottom: "2.5rem" }}>
              Join the growing list of amazing clients who trust us to deliver digital excellence!
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/portfolio" className="btn-primary" style={{ padding: "0.875rem 2rem" }}>View Our Work →</Link>
              <Link href="/contact" className="btn-outline" style={{ padding: "0.875rem 2rem", background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.2)" }}>Start Your Project →</Link>
            </div>
          </motion.div>
        </div>
        <style>{`@keyframes float { 0% { transform: translateY(0px); } 100% { transform: translateY(-15px); } }`}</style>
      </motion.section>

      {/* ═══ TESTIMONIALS (DYNAMIC) ═══ */}
      <section style={{ padding: "6rem 0", borderTop: "1px solid var(--border)", background: "#050505", overflow: "hidden" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem", position: "relative" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Reviews</div>
            <h2 className="section-title">Google Reviews</h2>
            {reviews.length > 0 && (
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
                <button onClick={prevSlide} style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary-dim)", border: "1px solid var(--primary)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.background = "var(--primary-dim)"}>←</button>
                <button onClick={nextSlide} style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary-dim)", border: "1px solid var(--primary)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.background = "var(--primary-dim)"}>→</button>
              </div>
            )}
          </div>
        </motion.div>

        {reviews.length > 0 ? (
          <div style={{ paddingBottom: "2rem", width: "100%", overflow: "hidden" }}>
            <div style={{ display: "flex", gap: "1.5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", transform: `translateX(calc(-${currentIndex * (25 + 1.5)}%))`, transition: "transform 0.5s ease-in-out" }}>
              {visibleTestimonials.map((t, i) => (
                <div key={i} onClick={() => setSelectedReview(t)} style={{ flex: "0 0 calc(25% - 1.125rem)", minWidth: "280px", background: "#ffffff", color: "#202124", borderRadius: 12, padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", display: "flex", flexDirection: "column", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#4285F4", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.25rem" }}>{t.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: "0.9375rem" }}>{t.name}</div>
                      <div style={{ color: "#70757a", fontSize: "0.8125rem" }}>{t.time}</div>
                    </div>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "0.5rem" }}>{[...Array(5)].map((_, i) => <Star key={i} size={14} color={i < t.rating ? "#fbbc04" : "#dadce0"} fill={i < t.rating ? "#fbbc04" : "none"} />)}</div>
                  <p style={{ color: "#3c4043", lineHeight: 1.5, fontSize: "0.875rem", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "var(--gray)", padding: "2rem" }}>Loading reviews...</div>
        )}
      </section>

      {/* Review Modal */}
      {selectedReview && (
        <div onClick={() => setSelectedReview(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()} style={{ background: "#ffffff", color: "#202124", borderRadius: 16, padding: "2.5rem", maxWidth: 500, width: "100%", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)", position: "relative" }}>
            <button onClick={() => setSelectedReview(null)} style={{ position: "absolute", top: "1rem", right: "1.5rem", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#70757a" }}>×</button>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#4285F4", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.75rem" }}>{selectedReview.name.charAt(0)}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.125rem" }}>{selectedReview.name}</div>
                <div style={{ color: "#70757a", fontSize: "0.875rem" }}>{selectedReview.time}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>{[...Array(5)].map((_, i) => <Star key={i} size={20} color={i < selectedReview.rating ? "#fbbc04" : "#dadce0"} fill={i < selectedReview.rating ? "#fbbc04" : "none"} />)}</div>
            <p style={{ color: "#3c4043", lineHeight: 1.7, fontSize: "1rem" }}>"{selectedReview.text}"</p>
          </motion.div>
        </div>
      )}

      {/* ═══ LATEST BLOGS ═══ */}
      <section style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="section-container">
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="section-label">Insights</div>
              <h2 className="section-title">Latest Articles</h2>
            </div>
            <Link href="/blogs" className="btn-outline">View All Blogs <ArrowRight size={16} /></Link>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.5rem" }}>
            {RECENT_BLOGS.map((blog, i) => (
              <motion.div variants={waveItem} key={i} className="glass link-card" style={{ padding: "2rem", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{blog.category}</span>
                  <span style={{ color: "var(--gray)", fontSize: "0.8125rem" }}>{blog.date}</span>
                </div>
                <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1rem", lineHeight: 1.4 }}>{blog.title}</h3>
                <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{blog.desc}</p>
                <Link href="/blogs" style={{ color: "var(--fg)", fontSize: "0.875rem", fontWeight: 600, marginTop: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  Read Article <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
      <section style={{ padding: "6rem 0", borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="section-container" style={{ maxWidth: 800 }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>FAQ</div>
            <h2 className="section-title">Common Questions</h2>
          </motion.div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {homeFaqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <motion.div variants={fadeUp} key={i} className="glass" style={{ padding: "0 1.5rem", borderRadius: 12, overflow: "hidden", border: isOpen ? "1px solid var(--primary)" : "1px solid var(--border)", transition: "all 0.3s ease" }}>
                  <button 
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
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
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/faq" style={{ color: "var(--primary)", fontWeight: 600, fontSize: "0.9375rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
              onMouseLeave={(e) => e.target.style.textDecoration = "none"}>
              View all FAQs <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
        </section>

      {/* ═══ CONTACT CTA ═══ */}
      <section style={{ padding: "6rem 0", borderTop: "1px solid var(--border)" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100 }} viewport={{ once: true }} className="section-container" style={{ textAlign: "center" }}>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            Ready to Build Something <span style={{ color: "var(--primary)" }}>Great</span>?
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto 2rem" }}>
            Let&apos;s discuss your project and find the perfect solution for your business.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">Start a Project</Link>
            <a href="https://wa.me/923136661921" target="_blank" rel="noopener noreferrer" className="btn-outline">WhatsApp Us</a>
          </div>
        </motion.div>
      </section>

    </>
  );
}
