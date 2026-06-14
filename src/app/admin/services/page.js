"use client";
import React, { useState, useEffect } from "react";

import { Monitor, ShoppingCart, FileText, Settings, Smartphone, Target, Brush, LineChart, Bot, Plug, Video, Cloud, Shield, Search } from "lucide-react";

const ICON_MAP = {
  "Monitor": Monitor, "ShoppingCart": ShoppingCart, "Smartphone": Smartphone, 
  "Target": Target, "Brush": Brush, "LineChart": LineChart, "Bot": Bot, 
  "FileText": FileText, "Settings": Settings, "Plug": Plug, "Video": Video, 
  "Cloud": Cloud, "Shield": Shield, "Search": Search
};

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    slug: "", title: "", icon: "Monitor", image: "", short_desc: "", long_desc: "", featuresText: "", benefitsText: ""
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data || []);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        ...service,
        featuresText: service.features ? service.features.join("\n") : "",
        benefitsText: service.benefits ? service.benefits.join("\n") : "",
      });
    } else {
      setEditingId(null);
      setFormData({ slug: "", title: "", icon: "Monitor", image: "", short_desc: "", long_desc: "", featuresText: "", benefitsText: "" });
    }
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    try {
      setUploadingImage(true);
      const file = e.target.files[0];
      if (!file) return;

      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setFormData(prev => ({ ...prev, image: data.url }));
    } catch (error) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
        title: formData.title,
        icon: formData.icon,
        image: formData.image,
        short_desc: formData.short_desc,
        long_desc: formData.long_desc,
        features: formData.featuresText.split("\n").filter(f => f.trim() !== ""),
        benefits: formData.benefitsText.split("\n").filter(b => b.trim() !== ""),
      };

      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...payload, id: editingId } : payload;

      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save service");

      setModalOpen(false);
      fetchServices();
    } catch (error) {
      alert("Error saving service: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete service");

      fetchServices();
    } catch (error) {
      alert("Error deleting service: " + error.message);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Manage Services</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary" style={{ padding: "0.625rem 1.25rem", fontSize: "0.875rem" }}>+ Add Service</button>
      </div>

      <div className="glass" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Service</th>
              <th style={{ textAlign: "left", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Status</th>
              <th style={{ textAlign: "right", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" style={{ padding: "2rem", textAlign: "center", color: "var(--gray)" }}>Loading services...</td></tr>
            ) : services.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || Monitor;
              return (
                <tr key={service.id} style={{ borderBottom: i < services.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      {service.image ? (
                        <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
                           <img src={service.image} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : (
                        <div style={{ width: 48, height: 48, borderRadius: 8, background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={24} color="var(--primary)" />
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{service.title}</div>
                        <div style={{ color: "var(--gray)", fontSize: "0.8125rem" }}>/{service.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0.25rem 0.75rem", borderRadius: 9999, background: "rgba(194,255,5,0.08)", color: "var(--primary)" }}>Published</span>
                  </td>
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                    <button onClick={() => handleOpenModal(service)} style={{ background: "none", border: "none", color: "var(--gray)", cursor: "pointer", fontSize: "0.875rem", marginRight: "0.75rem" }}>Edit</button>
                    <button onClick={() => handleDelete(service.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.875rem" }}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "2rem" }}>
          <div className="glass" style={{ width: "100%", maxWidth: 600, padding: "2rem", background: "#0a0a0a", maxHeight: "90vh", overflowY: "auto", borderRadius: 16 }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>{editingId ? "Edit Service" : "Add Service"}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Title</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value, slug: formData.slug || e.target.value.toLowerCase().replace(/\\s+/g, '-')})} className="form-input" style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Slug (URL path)</label>
                  <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Icon</label>
                  <select value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box", appearance: "auto" }}>
                    {Object.keys(ICON_MAP).map(key => <option key={key} value={key}>{key}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Thumbnail Image</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} style={{ width: "100%", fontSize: "0.875rem", padding: "0.375rem 0" }} />
                  {uploadingImage && <span style={{ fontSize: "0.75rem", color: "var(--primary)" }}>Uploading...</span>}
                  {formData.image && <div style={{ marginTop: "0.5rem" }}><img src={formData.image} alt="Preview" style={{ height: 40, borderRadius: 4 }} /></div>}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Short Description</label>
                <textarea required value={formData.short_desc} onChange={e => setFormData({...formData, short_desc: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box", minHeight: "60px", resize: "vertical" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Long Description</label>
                <textarea required value={formData.long_desc} onChange={e => setFormData({...formData, long_desc: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box", minHeight: "120px", resize: "vertical" }} />
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Features (1 per line)</label>
                  <textarea value={formData.featuresText} onChange={e => setFormData({...formData, featuresText: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box", minHeight: "100px", resize: "vertical" }} placeholder="e.g. SEO Optimized\nMobile Responsive" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Benefits (1 per line)</label>
                  <textarea value={formData.benefitsText} onChange={e => setFormData({...formData, benefitsText: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box", minHeight: "100px", resize: "vertical" }} placeholder="e.g. Faster Load Times\nHigher Conversions" />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", color: "var(--gray)", cursor: "pointer" }}>Cancel</button>
                <button type="submit" disabled={uploadingImage} className="btn-primary" style={{ padding: "0.625rem 1.25rem", opacity: uploadingImage ? 0.5 : 1 }}>Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
