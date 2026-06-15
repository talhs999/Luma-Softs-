import React from "react";
import Link from "next/link";
import { query } from "../../../lib/db";

// Revalidate 0 ensures we always fetch the latest from the database
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let title = "Blog | Luma Softs";
  let description = "Read our latest blog post.";
  try {
    const blogs = await query('SELECT title, description FROM blogs WHERE slug = ? LIMIT 1', [slug]);
    if (blogs && blogs.length > 0) {
      title = `${blogs[0].title} | Luma Softs`;
      description = blogs[0].description;
    }
  } catch (err) {}
  
  return { title, description };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  
  let blog = null;
  try {
    const blogs = await query('SELECT * FROM blogs WHERE slug = ? LIMIT 1', [slug]);
    if (blogs && blogs.length > 0) {
      blog = blogs[0];
    }
  } catch (error) {
    console.error("Failed to fetch blog detail:", error);
  }

  if (!blog) {
    return (
      <section style={{ padding: "8rem 0", textAlign: "center" }}>
        <h1>Blog Not Found</h1>
        <Link href="/blogs" style={{ color: "var(--primary)", marginTop: "1rem", display: "inline-block" }}>
          Return to Blogs
        </Link>
      </section>
    );
  }

  // Simple Markdown-like renderer for content
  const renderContent = (content) => {
    if (!content) return null;
    return content.split("\n").map((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        return <h2 key={index} style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--fg)", marginTop: "2rem", marginBottom: "1rem" }}>{trimmed.replace("## ", "")}</h2>;
      }
      if (trimmed.startsWith("**") && trimmed.includes(":**")) {
         const parts = trimmed.split("**");
         return <p key={index} style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
            <strong>{parts[1]}</strong>{parts[2]}
         </p>
      }
      if (trimmed) {
        return <p key={index} style={{ color: "var(--gray)", fontSize: "1rem", lineHeight: 1.8, marginBottom: "1rem" }}>{trimmed}</p>;
      }
      return null;
    });
  };

  return (
    <section style={{ padding: "6rem 0 8rem" }}>
      <div className="section-container" style={{ maxWidth: 800 }}>
        {/* Back Link */}
        <Link href="/blogs" style={{ color: "var(--gray)", fontSize: "0.875rem", display: "inline-flex", marginBottom: "3rem", transition: "color 0.2s" }} className="hover-primary">
          ← Back to All Blogs
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--bg)", background: "var(--primary)", padding: "0.25rem 0.75rem", borderRadius: 9999, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {blog.category}
            </span>
            <span style={{ color: "var(--gray)", fontSize: "0.875rem" }}>{blog.date}</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem" }}>
            {blog.title}
          </h1>
          <p style={{ fontSize: "1.25rem", color: "var(--gray)", lineHeight: 1.6 }}>
            {blog.description}
          </p>
        </div>

        <div style={{ width: "100%", height: "1px", background: "var(--border)", marginBottom: "3rem" }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {renderContent(blog.content)}
        </div>
      </div>
    </section>
  );
}
