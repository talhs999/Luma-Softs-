"use client";
import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Power, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoBlogEnabled, setAutoBlogEnabled] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  
  // Edit Modal State
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
    fetchSettings();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setAutoBlogEnabled(data.auto_blog_enabled === "true");
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
    }
  };

  const toggleAutoBlog = async () => {
    setIsToggling(true);
    const newValue = !autoBlogEnabled;
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setting_key: "auto_blog_enabled", setting_value: String(newValue) }),
      });
      if (res.ok) {
        setAutoBlogEnabled(newValue);
      } else {
        alert("Failed to update settings.");
      }
    } catch (error) {
      alert("Error updating settings.");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog? This cannot be undone.")) return;
    
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        fetchBlogs();
      } else {
        alert("Failed to delete blog.");
      }
    } catch (error) {
      alert("Error deleting blog.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingBlog.id,
          title: editingBlog.title,
          category: editingBlog.category,
          description: editingBlog.description,
          content: editingBlog.content
        }),
      });
      
      if (res.ok) {
        setEditingBlog(null);
        fetchBlogs();
      } else {
        alert("Failed to update blog.");
      }
    } catch (error) {
      alert("Error updating blog.");
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>Manage Blogs</h1>
          <p style={{ color: "var(--gray)", fontSize: "0.875rem" }}>View, edit, and control automated blogs.</p>
        </div>

        {/* ON/OFF Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--bg-light)", padding: "1rem 1.5rem", borderRadius: 12, border: "1px solid var(--border)" }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.25rem" }}>Auto-Blog System</div>
            <div style={{ fontSize: "0.75rem", color: "var(--gray)" }}>Generates 10 blogs per month (approx. every 3 days)</div>
          </div>
          <button 
            onClick={toggleAutoBlog} 
            disabled={isToggling}
            style={{ 
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: autoBlogEnabled ? "rgba(194,255,5,0.1)" : "rgba(255,50,50,0.1)", 
              color: autoBlogEnabled ? "var(--primary)" : "#ff4444",
              border: `1px solid ${autoBlogEnabled ? "var(--primary)" : "#ff4444"}`,
              padding: "0.5rem 1rem", borderRadius: 8, cursor: isToggling ? "not-allowed" : "pointer",
              fontWeight: 600, transition: "0.2s"
            }}
          >
            <Power size={16} />
            {isToggling ? "Updating..." : (autoBlogEnabled ? "SYSTEM ON" : "SYSTEM OFF")}
          </button>
        </div>
      </div>

      {/* Blogs List */}
      <div className="glass" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "var(--gray)", textTransform: "uppercase" }}>Date Posted</th>
              <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "var(--gray)", textTransform: "uppercase" }}>Title</th>
              <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "var(--gray)", textTransform: "uppercase" }}>Category</th>
              <th style={{ padding: "1rem 1.5rem", fontSize: "0.75rem", color: "var(--gray)", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ padding: "2rem", textAlign: "center", color: "var(--gray)" }}>Loading blogs...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: "2rem", textAlign: "center", color: "var(--gray)" }}>No blogs found.</td></tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "1rem 1.5rem", fontSize: "0.875rem", color: "var(--gray)", whiteSpace: "nowrap" }}>{blog.date}</td>
                  <td style={{ padding: "1rem 1.5rem", fontWeight: 500, fontSize: "0.9375rem" }}>{blog.title}</td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.05)", padding: "0.25rem 0.5rem", borderRadius: 4, color: "var(--gray)" }}>
                      {blog.category}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.5rem", textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                    <Link href={`/blogs/${blog.slug}`} target="_blank" style={{ padding: "0.5rem", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: "var(--fg)" }}>
                      <Eye size={16} />
                    </Link>
                    <button onClick={() => setEditingBlog(blog)} style={{ padding: "0.5rem", borderRadius: 6, background: "rgba(194,255,5,0.1)", color: "var(--primary)", border: "none", cursor: "pointer" }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(blog.id)} style={{ padding: "0.5rem", borderRadius: 6, background: "rgba(255,50,50,0.1)", color: "#ff4444", border: "none", cursor: "pointer" }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingBlog && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass" style={{ width: "100%", maxWidth: 800, maxHeight: "90vh", overflowY: "auto", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Edit Blog</h2>
              <button onClick={() => setEditingBlog(null)} style={{ background: "transparent", border: "none", color: "var(--gray)", fontSize: "1.5rem", cursor: "pointer" }}>&times;</button>
            </div>
            
            <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Title</label>
                <input type="text" required value={editingBlog.title} onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--fg)" }} />
              </div>
              
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Category</label>
                <input type="text" required value={editingBlog.category} onChange={e => setEditingBlog({...editingBlog, category: e.target.value})} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--fg)" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Short Description</label>
                <textarea required rows={2} value={editingBlog.description} onChange={e => setEditingBlog({...editingBlog, description: e.target.value})} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--fg)", resize: "vertical" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Markdown Content</label>
                <textarea required rows={10} value={editingBlog.content} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--fg)", resize: "vertical", fontFamily: "monospace" }} />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setEditingBlog(null)} style={{ padding: "0.75rem 1.5rem", borderRadius: 8, background: "transparent", border: "1px solid var(--border)", color: "var(--fg)", cursor: "pointer" }}>Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
