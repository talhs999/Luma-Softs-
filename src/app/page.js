"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { FAQS } from "./faq/page";
import { Globe, Cpu, Smartphone, Palette, PenTool, Bot, Trophy, Rocket, Handshake, DollarSign, Zap, Quote, Star, ArrowRight, Scale, ShoppingCart, HardHat, Plane, Heart, Utensils, Users, Home as HomeIcon, Anchor, BookOpen, Sparkles, FileText, Plus, Minus, ExternalLink } from "lucide-react";
import { ALL_PORTFOLIO } from "../data/portfolio";
import { FaReact, FaNodeJs, FaFigma, FaAws } from "react-icons/fa";
import { 
  SiNextdotjs, SiUnity, SiAutodeskmaya, SiFlutter, SiTypescript, 
  SiPython, SiPhp, SiLaravel, SiPostgresql, SiMongodb, SiWordpress, 
  SiTailwindcss, SiSwift, SiKotlin, SiCanva, SiUnrealengine, SiBlender, 
  SiGooglecloud, SiDocker, SiOpenai, SiVercel, SiGoogleanalytics, 
  SiSemrush, SiMeta, SiGoogleads, SiMailchimp 
} from "react-icons/si";
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
  "UI/UX DESIGN", "MOBILE APPS", "ECOMMERCE",
  "DIGITAL MARKETING", "CUSTOM SOFTWARE", "VIDEO EDITING",
  "CLOUD ARCHITECTURE", "DATABASE SYSTEMS", "SEO OPTIMIZATION",
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
  { title: "Modern Web Architecture for Growing Businesses", category: "Technology", date: "June 2, 2026", desc: "How scalable frontend frameworks and modern cloud services empower digital products to grow effortlessly." },
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

const DEFAULT_REVIEWS = [
  { 
    id: 1, 
    name: "Ali Raza", 
    role: "CEO",
    company: "TechNova Pakistan", 
    rating: 5,
    text: "Luma Softs transformed our business with an exceptional custom web platform. The speed, design, and UI responsiveness exceeded our expectations. Highly recommended in Karachi!",
    time: "2 weeks ago"
  },
  { 
    id: 2, 
    name: "Sara Ahmed", 
    role: "Founder",
    company: "Sara Boutique", 
    rating: 5,
    text: "The modern 3D visuals and intuitive design on our e-commerce store directly boosted our conversion rates. Amazing work by the Luma Softs team!",
    time: "3 weeks ago"
  },
  { 
    id: 3, 
    name: "Usman Khan", 
    role: "Director",
    company: "BuildIt Group", 
    rating: 5,
    text: "Professional, punctual, and innovative. They understood our enterprise software requirements and delivered clean, scalable architecture.",
    time: "1 month ago"
  },
  { 
    id: 4, 
    name: "Hina Javed", 
    role: "Operations Manager",
    company: "Foodies Hub", 
    rating: 5,
    text: "The web app and automated chatbot integrated by Luma Softs helped us streamline customer support significantly. Truly top notch service!",
    time: "1 month ago"
  },
  { 
    id: 5, 
    name: "Bilal Tariq", 
    role: "CTO",
    company: "Apex Logistics", 
    rating: 5,
    text: "Outstanding work on our web platform and branding. Clean code, great communication, and fast turnaround.",
    time: "2 months ago"
  }
];

const HERO_ROTATING_WORDS = [
  "Web Development Agency",
  "UI/UX Design Studio",
  "Mobile App Development Team",
  "Custom Software Agency",
  "eCommerce Solutions Studio",
  "WordPress Development Team",
  "Digital Marketing Agency",
  "Graphic & Branding Studio",
  "Cloud & AI Systems Team",
  "Worldwide Tech Partner"
];

const TECH_CATEGORIES = [
  "All",
  "Development",
  "Mobile Apps",
  "UI/UX Design",
  "3D & Gaming",
  "Cloud & AI",
  "Marketing & SEO"
];

const ALL_TECHNOLOGIES = [
  // Web & Software Development
  { name: "React", category: "Development", color: "#61DAFB", icon: FaReact },
  { name: "Next.js", category: "Development", color: "#ffffff", icon: SiNextdotjs },
  { name: "TypeScript", category: "Development", color: "#3178C6", icon: SiTypescript },
  { name: "Node.js", category: "Development", color: "#339933", icon: FaNodeJs },
  { name: "Python", category: "Development", color: "#3776AB", icon: SiPython },
  { name: "PHP", category: "Development", color: "#777BB4", icon: SiPhp },
  { name: "Laravel", category: "Development", color: "#FF2D20", icon: SiLaravel },
  { name: "WordPress", category: "Development", color: "#21759B", icon: SiWordpress },
  { name: "PostgreSQL", category: "Development", color: "#4169E1", icon: SiPostgresql },
  { name: "MongoDB", category: "Development", color: "#47A248", icon: SiMongodb },
  { name: "Tailwind CSS", category: "Development", color: "#06B6D4", icon: SiTailwindcss },

  // Mobile Apps
  { name: "Flutter", category: "Mobile Apps", color: "#02569B", icon: SiFlutter },
  { name: "React Native", category: "Mobile Apps", color: "#61DAFB", icon: FaReact },
  { name: "Swift (iOS)", category: "Mobile Apps", color: "#F05138", icon: SiSwift },
  { name: "Kotlin (Android)", category: "Mobile Apps", color: "#7F52FF", icon: SiKotlin },

  // UI/UX Design
  { name: "Figma", category: "UI/UX Design", color: "#F24E1E", icon: FaFigma },
  { name: "Photoshop", category: "UI/UX Design", color: "#31A8FF", icon: DiPhotoshop },
  { name: "Illustrator", category: "UI/UX Design", color: "#FF9A00", icon: DiIllustrator },
  { name: "Canva", category: "UI/UX Design", color: "#00C4CC", icon: SiCanva },

  // 3D & Gaming
  { name: "Unity 3D", category: "3D & Gaming", color: "#ffffff", icon: SiUnity },
  { name: "Unreal Engine", category: "3D & Gaming", color: "#ffffff", icon: SiUnrealengine },
  { name: "Blender", category: "3D & Gaming", color: "#E87D0D", icon: SiBlender },
  { name: "Autodesk Maya", category: "3D & Gaming", color: "#0ECECD", icon: SiAutodeskmaya },

  // Cloud & AI
  { name: "AWS Cloud", category: "Cloud & AI", color: "#FF9900", icon: FaAws },
  { name: "Google Cloud", category: "Cloud & AI", color: "#4285F4", icon: SiGooglecloud },
  { name: "Docker", category: "Cloud & AI", color: "#2496ED", icon: SiDocker },
  { name: "OpenAI / LLMs", category: "Cloud & AI", color: "#10A37F", icon: SiOpenai },
  { name: "Vercel", category: "Cloud & AI", color: "#ffffff", icon: SiVercel },

  // Marketing & SEO
  { name: "Google Analytics", category: "Marketing & SEO", color: "#E37400", icon: SiGoogleanalytics },
  { name: "SEMrush", category: "Marketing & SEO", color: "#FF642D", icon: SiSemrush },
  { name: "Meta Ads", category: "Marketing & SEO", color: "#0081FB", icon: SiMeta },
  { name: "Google Ads", category: "Marketing & SEO", color: "#F4B400", icon: SiGoogleads },
  { name: "Mailchimp", category: "Marketing & SEO", color: "#FFE01B", icon: SiMailchimp },
];

export default function Home() {
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [selectedTechCategory, setSelectedTechCategory] = useState("All");

  const [activeHeroVideo, setActiveHeroVideo] = useState(0);
  const [homeProjects, setHomeProjects] = useState([]);
  const [hoveredPortfolioSlug, setHoveredPortfolioSlug] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchHomeProjects();
  }, []);

  const fetchHomeProjects = async () => {
    try {
      const res = await fetch("/api/portfolio?home=true");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setHomeProjects(data);
          return;
        }
      }
    } catch (err) {
      console.error("Error fetching home portfolio:", err);
    }
    const defaultFeatured = ALL_PORTFOLIO.filter(p => p.show_on_home);
    setHomeProjects(defaultFeatured.length > 0 ? defaultFeatured : ALL_PORTFOLIO.slice(0, 3));
  };

  useEffect(() => {
    const videoTimer = setInterval(() => {
      setActiveHeroVideo((prev) => (prev === 0 ? 1 : 0));
    }, 8000);
    return () => clearInterval(videoTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HERO_ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (Array.isArray(data)) {
        setReviews(data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      const slider = document.getElementById("reviews-slider");
      if (slider) {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews]);

  const nextSlide = () => {
    const slider = document.getElementById("reviews-slider");
    if (slider) slider.scrollBy({ left: 320, behavior: 'smooth' });
  };
  const prevSlide = () => {
    const slider = document.getElementById("reviews-slider");
    if (slider) slider.scrollBy({ left: -320, behavior: 'smooth' });
  };

  // Show only first 4 FAQs from the General category on Home Page
  const homeFaqs = FAQS[0].questions.slice(0, 4);

  // Use a longer list for smooth scrolling
  const visibleTestimonials = [...reviews, ...reviews, ...reviews];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", marginTop: "-72px", paddingTop: "72px", overflow: "hidden", background: "#050505" }}>

        {/* Full-width dual synced video background with seamless 2.5s crossfade, frosted blur and gradient blend */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <video
            src="/hero-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ 
              position: "absolute",
              inset: 0,
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              opacity: activeHeroVideo === 0 ? 0.45 : 0,
              transition: "opacity 2.5s ease-in-out"
            }}
          />
          <video
            src="/hero-bg-2.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ 
              position: "absolute",
              inset: 0,
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              opacity: activeHeroVideo === 1 ? 0.45 : 0,
              transition: "opacity 2.5s ease-in-out"
            }}
          />
          {/* Smooth dark gradient fading from left (behind text) to right */}
          <div 
            style={{ 
              position: "absolute", 
              inset: 0, 
              background: "linear-gradient(to right, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.82) 35%, rgba(5,5,5,0.45) 65%, rgba(5,5,5,0.15) 100%)", 
              pointerEvents: "none" 
            }} 
          />
          {/* Top & bottom atmospheric fades */}
          <div 
            style={{ 
              position: "absolute", 
              inset: 0, 
              background: "linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, transparent 20%, transparent 75%, #050505 100%)", 
              pointerEvents: "none" 
            }} 
          />
        </div>

        {/* Soft frosted blur layer on the left side that smoothly dissolves towards right */}
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "60%",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0) 100%)",
            pointerEvents: "none",
            zIndex: 1
          }}
        />

        {/* Left ambient glow */}
        <div style={{ position: "absolute", top: "15%", left: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(194,255,5,0.08), transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(157,255,0,0.05), transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 1 }} />

        <motion.div 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="section-container" 
          style={{ width: "100%", paddingTop: "4rem", paddingBottom: "4rem", position: "relative", zIndex: 2 }}
        >
          <div style={{ maxWidth: 780 }}>
            <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 1.125rem", border: "1px solid rgba(194,255,5,0.3)", borderRadius: "100px", background: "rgba(194,255,5,0.06)", backdropFilter: "blur(10px)", fontSize: "0.8125rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.75rem", color: "var(--primary)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", display: "inline-block", boxShadow: "0 0 10px var(--primary)" }} />
              Top-Rated Software &amp; Web Agency in Karachi
            </motion.div>
            <motion.h1 
              variants={fadeUp} 
              style={{ 
                fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", 
                fontWeight: 800, 
                lineHeight: 1.1, 
                letterSpacing: "-0.03em", 
                marginBottom: "1.25rem" 
              }}
            >
              We Are <span style={{ color: "var(--primary)" }}>Luma Softs</span>
            </motion.h1>
            <motion.div 
              variants={fadeUp} 
              style={{ 
                fontSize: "clamp(1.25rem, 3.4vw, 2.45rem)", 
                fontWeight: 700, 
                color: "var(--fg)", 
                marginBottom: "0.75rem", 
                lineHeight: 1.2,
                letterSpacing: "-0.02em", 
                display: "flex", 
                alignItems: "center", 
                gap: "0.65rem", 
                flexWrap: "nowrap" 
              }}
            >
              <span style={{ whiteSpace: "nowrap" }}>A Full-Service</span>
              <span style={{ position: "relative", display: "inline-block", overflow: "hidden", whiteSpace: "nowrap" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ display: "inline-block", color: "var(--primary)", whiteSpace: "nowrap" }}
                  >
                    {HERO_ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>
            <motion.p variants={fadeUp} style={{ fontSize: "1.125rem", color: "var(--gray)", lineHeight: 1.75, maxWidth: 660, marginBottom: "2.75rem", fontWeight: 400 }}>
              Top-Rated Web Development &amp; Software Company in Karachi, Pakistan.
              <span className="mobile-hidden-text"> We are a worldwide digital agency crafting high-performance websites, custom applications, and scalable digital solutions for modern businesses.</span>
              <style>{`
                @media (max-width: 768px) {
                  .mobile-hidden-text { display: ${isExpanded ? "inline" : "none"}; }
                  .mobile-read-more { display: inline-block; }
                }
                @media (min-width: 769px) {
                  .mobile-hidden-text { display: inline; }
                  .mobile-read-more { display: none; }
                }
              `}</style>
              <button 
                className="mobile-read-more"
                onClick={() => setIsExpanded(!isExpanded)} 
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: "var(--primary)", 
                  cursor: "pointer", 
                  padding: "0 0 0 5px", 
                  fontSize: "1rem", 
                  fontWeight: 600,
                  textDecoration: "underline"
                }}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/contact" className="btn-primary">Start a Project</Link>
              <Link href="/portfolio" className="btn-outline">Our Work</Link>
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
            At Luma Softs, our role is to empower businesses with innovative digital solutions that drive growth and impact. From web development and app design to branding, graphics, and marketing strategies, we blend creativity with technology to deliver results that truly matter. With a passionate team of experts, we don’t just build projects: we build lasting partnerships by understanding your vision and transforming it into reality.
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

      {/* ═══ FEATURED PORTFOLIO SHOWCASE ═══ */}
      <section style={{ padding: "6rem 0", borderTop: "1px solid var(--border)", background: "linear-gradient(180deg, #050505 0%, rgba(12,14,10,0.6) 50%, #050505 100%)", position: "relative" }}>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="section-container"
        >
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>
              Our Work
            </div>
            <h2 className="section-title">
              Featured <span style={{ color: "var(--primary)" }}>Portfolio</span>
            </h2>
            <p style={{ color: "var(--gray)", fontSize: "1.125rem", maxWidth: 620, margin: "1rem auto 0", lineHeight: 1.6 }}>
              A handpicked selection of high-performing websites, custom software, and digital solutions delivered for visionary businesses.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "2rem" }}>
            {homeProjects.map((project, idx) => {
              const isHovered = hoveredPortfolioSlug === project.slug;
              return (
                <motion.div
                  key={project.id || project.slug || idx}
                  variants={fadeUp}
                  onMouseEnter={() => setHoveredPortfolioSlug(project.slug)}
                  onMouseLeave={() => setHoveredPortfolioSlug(null)}
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: isHovered ? "1px solid rgba(194, 255, 5, 0.45)" : "1px solid var(--border)",
                    boxShadow: isHovered ? "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(194, 255, 5, 0.12)" : "0 10px 25px rgba(0, 0, 0, 0.4)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Link 
                    href={`/portfolio/${project.slug}`} 
                    style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", color: "inherit" }}
                  >
                    {/* Top Image Container */}
                    <div style={{ position: "relative", height: "230px", width: "100%", overflow: "hidden", background: "#0c0e0b" }}>
                      <img
                        src={project.featured_image || project.featuredImage || "/web-dev.png"}
                        alt={project.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transform: isHovered ? "scale(1.08)" : "scale(1)",
                          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                          filter: isHovered ? "brightness(0.85)" : "brightness(0.95)"
                        }}
                      />

                      {/* Category Badge on Image */}
                      <div style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        padding: "0.35rem 0.85rem",
                        borderRadius: "100px",
                        background: "rgba(5, 5, 5, 0.82)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(194, 255, 5, 0.3)",
                        color: "var(--primary)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase"
                      }}>
                        {project.category}
                      </div>

                      {/* Client on top-right */}
                      {project.client && (
                        <div style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "100px",
                          background: "rgba(0, 0, 0, 0.65)",
                          backdropFilter: "blur(8px)",
                          color: "rgba(255, 255, 255, 0.75)",
                          fontSize: "0.75rem",
                          fontWeight: 500
                        }}>
                          {project.client}
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.4) 60%, transparent 100%)",
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.35s ease",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "1.25rem",
                        pointerEvents: "none"
                      }}>
                        <div style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "var(--primary)",
                          fontSize: "0.8125rem",
                          fontWeight: 700
                        }}>
                          <span>View Full Case Study</span>
                          <ArrowRight size={15} />
                        </div>
                      </div>
                    </div>

                    {/* Card Content with Description */}
                    <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        marginBottom: "0.75rem",
                        color: isHovered ? "var(--primary)" : "#ffffff",
                        transition: "color 0.3s ease",
                        lineHeight: 1.3
                      }}>
                        {project.title}
                      </h3>

                      <p style={{
                        color: isHovered ? "rgba(255, 255, 255, 0.9)" : "var(--gray)",
                        fontSize: "0.875rem",
                        lineHeight: 1.65,
                        marginBottom: "1.25rem",
                        display: "-webkit-box",
                        WebkitLineClamp: isHovered ? 5 : 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        flex: 1
                      }}>
                        {project.description || "A cutting-edge solution tailored for exceptional performance and business scalability."}
                      </p>

                      {/* Technologies Pills */}
                      {project.technologies && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.25rem" }}>
                          {(Array.isArray(project.technologies) ? project.technologies : []).slice(0, 3).map((tech, tIdx) => (
                            <span 
                              key={tIdx} 
                              style={{ 
                                fontSize: "0.6875rem", 
                                padding: "0.2rem 0.55rem", 
                                borderRadius: "6px", 
                                background: "rgba(255, 255, 255, 0.05)", 
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                color: "rgba(255, 255, 255, 0.75)" 
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Bottom Link Action */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "0.875rem",
                        borderTop: "1px solid rgba(255, 255, 255, 0.07)",
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: isHovered ? "var(--primary)" : "var(--gray)"
                      }}>
                        <span>Explore Project</span>
                        <div style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: isHovered ? "var(--primary)" : "rgba(255, 255, 255, 0.05)",
                          color: isHovered ? "#000" : "var(--gray)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                          transform: isHovered ? "translateX(3px)" : "none"
                        }}>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* More Portfolio Button */}
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", marginTop: "3.75rem" }}>
            <Link 
              href="/portfolio" 
              className="btn-primary" 
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.625rem", 
                padding: "0.875rem 2.5rem", 
                fontSize: "1rem", 
                fontWeight: 700,
                boxShadow: "0 0 30px rgba(194, 255, 5, 0.25)" 
              }}
            >
              <span>More Portfolio</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
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

      {/* Technologies We Use Section (Categorized) */}
      <section style={{ padding: "5rem 0", background: "#050505", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "0.75rem" }}>
            Our Core Stack
          </div>
          <h2 className="section-title" style={{ fontSize: "2.25rem", marginBottom: "2rem" }}>
            Technologies We <span style={{ color: "var(--primary)" }}>Use</span>
          </h2>

          {/* Category Filter Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.625rem", marginBottom: "2.75rem" }}>
            {TECH_CATEGORIES.map((cat) => {
              const isActive = selectedTechCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedTechCategory(cat)}
                  style={{
                    padding: "0.55rem 1.35rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    background: isActive ? "var(--primary)" : "rgba(255, 255, 255, 0.03)",
                    color: isActive ? "#000000" : "var(--fg)",
                    border: isActive ? "1px solid var(--primary)" : "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: isActive ? "0 0 25px var(--primary-glow)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.color = "var(--primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.color = "var(--fg)";
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          
          {/* Categorized Tech Grid */}
          <motion.div 
            layout
            style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "center", 
              gap: "1.25rem", 
              maxWidth: "1050px", 
              margin: "0 auto" 
            }}
          >
            <AnimatePresence mode="popLayout">
              {(selectedTechCategory === "All" 
                ? ALL_TECHNOLOGIES 
                : ALL_TECHNOLOGIES.filter(t => t.category === selectedTechCategory)
              ).map((tech) => {
                const Icon = tech.icon;
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.25 }}
                    key={tech.name} 
                    className="glass" 
                    style={{ 
                      padding: "0.875rem 1.35rem", 
                      borderRadius: "14px", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px",
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                      transition: "all 0.25s ease",
                      cursor: "default",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = tech.color;
                      e.currentTarget.style.boxShadow = `0 8px 20px ${tech.color}20`;
                      e.currentTarget.style.color = tech.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.color = "var(--fg)";
                    }}
                  >
                    <Icon size={22} color={tech.color} />
                    <span>{tech.name}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div style={{ marginTop: "2.75rem", display: "inline-block", padding: "8px 18px", background: "rgba(194,255,5,0.08)", color: "var(--primary)", borderRadius: "99px", fontWeight: 700, fontSize: "0.8125rem", border: "1px solid rgba(194,255,5,0.2)" }}>
            + Enterprise Architecture Tailored To Your Needs
          </div>
        </div>
      </section>

      {/* ═══ PARALLAX VIDEO BANNER ═══ */}
      <section 
        style={{ 
          position: "relative", 
          minHeight: "340px",
          height: "360px", 
          overflow: "hidden", 
          borderTop: "1px solid var(--border)", 
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          clipPath: "inset(0 0 0 0)",
          WebkitClipPath: "inset(0 0 0 0)",
          background: "#050505"
        }}
      >
        {/* Fixed Background Video playing on loop */}
        <video
          src="/tech-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            opacity: 0.35,
            zIndex: 0,
            pointerEvents: "none"
          }}
        />

        {/* Cinematic gradient overlays for contrast and smooth edge blending */}
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.45) 25%, rgba(5,5,5,0.45) 75%, #050505 100%)", 
            zIndex: 1, 
            pointerEvents: "none" 
          }} 
        />
        <div 
          style={{ 
            position: "absolute", 
            inset: 0, 
            background: "radial-gradient(circle at center, rgba(194,255,5,0.06) 0%, transparent 70%)", 
            zIndex: 1, 
            pointerEvents: "none" 
          }} 
        />

        {/* Clean, tight single-line impactful heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-container"
          style={{ 
            position: "relative", 
            zIndex: 2, 
            textAlign: "center", 
            maxWidth: "880px", 
            padding: "2rem 1.5rem" 
          }}
        >
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            padding: "0.35rem 1rem", 
            borderRadius: "9999px", 
            background: "rgba(194,255,5,0.08)", 
            border: "1px solid rgba(194,255,5,0.25)", 
            color: "var(--primary)", 
            fontSize: "0.8125rem", 
            fontWeight: 700, 
            letterSpacing: "0.1em", 
            textTransform: "uppercase", 
            marginBottom: "1.25rem",
            backdropFilter: "blur(8px)"
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--primary)", boxShadow: "0 0 8px var(--primary)" }} />
            NEXT-GEN DIGITAL ARCHITECTURE
          </div>
          <h2 style={{ 
            fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)", 
            fontWeight: 800, 
            color: "#ffffff", 
            lineHeight: 1.25, 
            letterSpacing: "-0.02em",
            margin: 0,
            textShadow: "0 4px 24px rgba(0,0,0,0.8)"
          }}>
            Building scalable software, resilient cloud systems, and intelligent digital products that drive industry leaders.
          </h2>
        </motion.div>
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
            <Image key={i} src={av.img} alt="Team Member" width={av.size} height={av.size} className={av.hideOnMobile ? "avatar-mobile-hide" : ""} style={{
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
          <div style={{ paddingBottom: "2rem", width: "100%", position: "relative" }}>
            <div 
              id="reviews-slider"
              style={{ 
                display: "flex", 
                gap: "1.5rem", 
                paddingLeft: "1.5rem", 
                paddingRight: "1.5rem", 
                overflowX: "auto", 
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollBehavior: "smooth"
              }}
            >
              <style>{`#reviews-slider::-webkit-scrollbar { display: none; }`}</style>
              {visibleTestimonials.map((t, i) => (
                <div 
                  key={i} 
                  aria-hidden={i >= reviews.length ? "true" : undefined}
                  onClick={() => setSelectedReview(t)} 
                  style={{ 
                    flex: "0 0 auto", 
                    width: "clamp(280px, 85vw, 360px)", 
                    scrollSnapAlign: "center", 
                    background: "#ffffff", 
                    color: "#202124", 
                    borderRadius: 16, 
                    padding: "1.75rem", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)", 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "space-between",
                    minHeight: 220,
                    cursor: "pointer", 
                    transition: "all 0.25s ease",
                    border: "1px solid rgba(255,255,255,0.15)" 
                  }} 
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.45)"; }} 
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)"; }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#4285F4", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.25rem", flexShrink: 0 }}>
                        {t.name ? t.name.charAt(0).toUpperCase() : "G"}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#202124", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                        <div style={{ color: "#70757a", fontSize: "0.8125rem" }}>{t.time || "Recently"}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, flexShrink: 0 }}>
                        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "3px", marginBottom: "0.875rem" }}>
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={15} color={idx < (t.rating || 5) ? "#fbbc04" : "#dadce0"} fill={idx < (t.rating || 5) ? "#fbbc04" : "none"} />
                      ))}
                    </div>
                    <p style={{ color: "#3c4043", lineHeight: 1.6, fontSize: "0.875rem", margin: 0, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                      {t.text || t.review || "Outstanding service and results!"}
                    </p>
                  </div>
                  {t.company && (
                    <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid #f1f3f4", fontSize: "0.75rem", color: "#70757a", fontWeight: 500 }}>
                      {t.role ? `${t.role} • ` : ""}{t.company}
                    </div>
                  )}
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
        <div onClick={() => setSelectedReview(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} style={{ background: "#ffffff", color: "#202124", borderRadius: 16, padding: "2.5rem", maxWidth: 520, width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", position: "relative" }}>
            <button onClick={() => setSelectedReview(null)} style={{ position: "absolute", top: "1rem", right: "1.25rem", background: "none", border: "none", fontSize: "1.75rem", cursor: "pointer", color: "#70757a", lineHeight: 1 }}>×</button>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#4285F4", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
                {selectedReview.name ? selectedReview.name.charAt(0).toUpperCase() : "G"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.125rem", color: "#202124" }}>{selectedReview.name}</div>
                <div style={{ color: "#70757a", fontSize: "0.875rem" }}>{selectedReview.time || "Recently"} {selectedReview.company ? `• ${selectedReview.company}` : ""}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "4px", marginBottom: "1.25rem" }}>
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={18} color={idx < (selectedReview.rating || 5) ? "#fbbc04" : "#dadce0"} fill={idx < (selectedReview.rating || 5) ? "#fbbc04" : "none"} />
              ))}
            </div>
            <p style={{ color: "#3c4043", lineHeight: 1.7, fontSize: "1rem", margin: 0 }}>
              "{selectedReview.text || selectedReview.review}"
            </p>
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
