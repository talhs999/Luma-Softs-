import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { query } from "../../lib/db";
import { STATIC_BLOGS } from "../../data/blogs";

export const metadata = {
  title: "Tech Blog — SEO, Web Development & Case Studies | Luma Softs",
  description: "Read the latest insights on software development, SEO backlinks, rapid e-commerce case studies, and digital marketing strategies from Luma Softs experts in Pakistan.",
};

export const revalidate = 0; // Ensures it fetches fresh blogs on every load

export default async function BlogsPage() {
  let ALL_BLOGS = [];
  try {
    const res = await query('SELECT slug, title, category, date, description AS `desc` FROM blogs ORDER BY created_at DESC');
    if (res && res.length > 0) {
      ALL_BLOGS = res;
    }
  } catch (error) {
    console.warn("Failed to fetch blogs from db, using static fallback:", error.message);
  }

  if (ALL_BLOGS.length === 0) {
    ALL_BLOGS = STATIC_BLOGS;
  }

  return (
    <section style={{ padding: "4rem 0 6rem" }}>
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Insights & News</div>
          <h1 className="section-title">Our <span style={{ color: "var(--primary)" }}>Blogs</span></h1>
          <p className="section-subtitle" style={{ margin: "1rem auto 0" }}>
            Stay updated with the latest trends in technology, design, and digital business strategies.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "1.5rem" }}>
          {ALL_BLOGS.map((blog) => (
            <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="glass link-card" style={{ padding: "2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{blog.category}</span>
                <span style={{ color: "var(--gray)", fontSize: "0.8125rem" }}>{blog.date}</span>
              </div>
              <h3 style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: "1rem", lineHeight: 1.4 }}>{blog.title}</h3>
              <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>{blog.desc}</p>
              <span style={{ color: "var(--fg)", fontSize: "0.875rem", fontWeight: 600, marginTop: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Read Article <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
