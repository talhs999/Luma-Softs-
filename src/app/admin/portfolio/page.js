"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Plus, Edit2, Trash2, Image as ImageIcon, X, Save, RefreshCw } from "lucide-react";

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [form, setForm] = useState({
    title: "", slug: "", category: "Web Development", featured_image: "",
    client: "", duration: "", technologies: "", description: "", challenge: "",
    solution: "", results: "", testimonial: "", live_url: ""
  });

  const categories = [
    "Web Development", "Mobile Apps", "Graphic Design", "UI/UX Design",
    "Digital Marketing", "AI Solutions", "Software Development", "eCommerce"
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
    if (error) console.error("Error fetching projects:", error);
    else setProjects(data || []);
    setLoading(false);
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setForm({
      title: "", slug: "", category: "Web Development", featured_image: "",
      client: "", duration: "", technologies: "", description: "", challenge: "",
      solution: "", results: "", testimonial: "", live_url: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setIsEditing(true);
    setCurrentId(project.id);
    setForm({
      title: project.title,
      slug: project.slug,
      category: project.category,
      featured_image: project.featured_image || "",
      client: project.client || "",
      duration: project.duration || "",
      technologies: project.technologies ? project.technologies.join(", ") : "",
      description: project.description || "",
      challenge: project.challenge || "",
      solution: project.solution || "",
      results: project.results || "",
      testimonial: project.testimonial || "",
      live_url: project.live_url || ""
    });
    setIsModalOpen(true);
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from("portfolio_images").upload(filePath, file);

    if (uploadError) {
      alert("Error uploading image: " + uploadError.message);
    } else {
      const { data } = supabase.storage.from("portfolio_images").getPublicUrl(filePath);
      setForm({ ...form, featured_image: data.publicUrl });
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const projectData = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      technologies: form.technologies.split(",").map(t => t.trim()).filter(Boolean)
    };

    if (isEditing) {
      const { error } = await supabase.from("portfolio").update(projectData).eq("id", currentId);
      if (error) alert("Error updating: " + error.message);
      else { setIsModalOpen(false); fetchProjects(); }
    } else {
      const { error } = await supabase.from("portfolio").insert([projectData]);
      if (error) alert("Error adding: " + error.message);
      else { setIsModalOpen(false); fetchProjects(); }
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const { error } = await supabase.from("portfolio").delete().eq("id", id);
      if (error) alert("Error deleting: " + error.message);
      else fetchProjects();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Manage Portfolio</h1>
        <button onClick={openAddModal} className="btn-primary" style={{ padding: "0.625rem 1.25rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--gray)" }}>
          <RefreshCw className="spin" size={24} style={{ margin: "0 auto 1rem" }} />
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="glass" style={{ textAlign: "center", padding: "4rem", color: "var(--gray)" }}>
          No portfolio projects found. Add your first project!
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
          {projects.map((project) => (
            <div key={project.id} className="glass" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: "180px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid var(--border)", position: "relative" }}>
                {project.featured_image ? (
                  <img src={project.featured_image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray)" }}>
                    <ImageIcon size={48} opacity={0.5} />
                  </div>
                )}
                <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "var(--primary)", color: "#000", fontSize: "0.625rem", fontWeight: "bold", padding: "0.25rem 0.5rem", borderRadius: "999px" }}>
                  {project.category}
                </div>
              </div>
              
              <div style={{ padding: "1.5rem", flex: 1 }}>
                <h3 style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.5rem" }}>{project.title}</h3>
                <p style={{ color: "var(--gray)", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {project.description ? project.description.substring(0, 80) + "..." : "No description."}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                  <button onClick={() => openEditModal(project)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--fg)", cursor: "pointer", fontSize: "0.8125rem", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background="rgba(255,255,255,0.1)"} onMouseLeave={(e) => e.currentTarget.style.background="rgba(255,255,255,0.05)"}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} style={{ padding: "0.5rem 0.75rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, color: "#ef4444", cursor: "pointer", fontSize: "0.8125rem", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background="rgba(239,68,68,0.2)"} onMouseLeave={(e) => e.currentTarget.style.background="rgba(239,68,68,0.1)"}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass" style={{ width: "100%", maxWidth: "800px", maxHeight: "90vh", overflowY: "auto", padding: "2rem", position: "relative" }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "var(--gray)", cursor: "pointer" }}>
              <X size={24} />
            </button>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>
              {isEditing ? "Edit Project" : "Add New Project"}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Image Upload */}
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Featured Image</label>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {form.featured_image && (
                    <img src={form.featured_image} alt="Preview" style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)" }} />
                  )}
                  <div style={{ position: "relative", overflow: "hidden", display: "inline-block" }}>
                    <button type="button" className="btn-outline" style={{ pointerEvents: "none" }}>
                      {uploading ? "Uploading..." : "Upload Image"}
                    </button>
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ position: "absolute", left: 0, top: 0, opacity: 0, cursor: "pointer", height: "100%" }} />
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Project Title *</label>
                  <input type="text" required value={form.title} onChange={(e) => {
                    setForm({ ...form, title: e.target.value, slug: isEditing ? form.slug : generateSlug(e.target.value) })
                  }} className="form-input" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Slug *</label>
                  <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="form-input" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Category *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="form-input">
                    {categories.map(c => <option key={c} value={c} style={{ background: "#050505" }}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Client Name</label>
                  <input type="text" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="form-input" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Duration (e.g. 4 Weeks)</label>
                  <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="form-input" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Technologies (comma separated)</label>
                  <input type="text" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="form-input" placeholder="Next.js, Tailwind, Supabase" />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Short Description *</label>
                <textarea required rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="form-input" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>The Challenge</label>
                  <textarea rows={3} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} className="form-input" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>The Solution</label>
                  <textarea rows={3} value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} className="form-input" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Results/Impact</label>
                  <textarea rows={2} value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} className="form-input" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Client Testimonial</label>
                  <textarea rows={2} value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} className="form-input" />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", color: "var(--gray)", marginBottom: "0.5rem" }}>Live URL (Optional)</label>
                <input type="url" value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} className="form-input" placeholder="https://" />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
                <button type="submit" disabled={saving || uploading} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Save size={16} /> {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
