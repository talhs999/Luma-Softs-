"use client";
import React, { useState, useEffect } from "react";

import { Edit2, Trash2, Plus, X, Star } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
    time: ""
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (review = null) => {
    if (review) {
      setEditingId(review.id);
      setFormData({
        name: review.name,
        role: review.role,
        text: review.text,
        rating: review.rating,
        time: review.time
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", role: "", text: "", rating: 5, time: "Just now" });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const payload = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch("/api/admin/reviews", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save review");

      handleCloseModal();
      fetchReviews();
    } catch (error) {
      alert("Error saving review: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        const res = await fetch(`/api/admin/reviews?id=${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to delete review");
        
        fetchReviews();
      } catch (error) {
        alert("Error deleting review: " + error.message);
      }
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Reviews ({reviews.length})</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
          <Plus size={16} /> Add Review
        </button>
      </div>

      {loading ? (
        <div style={{ padding: "4rem", textAlign: "center", color: "var(--gray)" }}>Loading reviews...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
          {reviews.map((review) => (
            <div key={review.id} className="glass" style={{ padding: "1.5rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--primary)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.25rem" }}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{review.name}</div>
                    <div style={{ color: "var(--gray)", fontSize: "0.75rem" }}>{review.role} • {review.time}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} color={i < review.rating ? "#fbbc04" : "var(--border)"} fill={i < review.rating ? "#fbbc04" : "none"} />
                ))}
              </div>
              <p style={{ color: "var(--gray)", fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "1.5rem", flex: 1 }}>"{review.text}"</p>
              
              <div style={{ display: "flex", gap: "0.5rem", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
                <button onClick={() => handleOpenModal(review)} className="btn-outline" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", padding: "0.375rem", fontSize: "0.8125rem" }}>
                  <Edit2 size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(review.id)} className="btn-outline" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", padding: "0.375rem", fontSize: "0.8125rem", color: "#ef4444", borderColor: "rgba(239,68,68,0.2)" }}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div className="glass" style={{ background: "#111", width: "100%", maxWidth: 500, padding: "2rem", borderRadius: 12, position: "relative" }}>
            <button onClick={handleCloseModal} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "var(--gray)", cursor: "pointer" }}>
              <X size={24} />
            </button>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.5rem" }}>
              {editingId ? "Edit Review" : "Add New Review"}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--gray)" }}>Client Name *</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--fg)" }} />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--gray)" }}>Role / Company *</label>
                  <input required type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--fg)" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--gray)" }}>Time (e.g. 2 weeks ago) *</label>
                  <input required type="text" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--fg)" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--gray)" }}>Rating (1-5)</label>
                <input required type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--fg)" }} />
              </div>
              
              <div>
                <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--gray)" }}>Review Text *</label>
                <textarea required rows={4} value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--fg)", resize: "vertical" }} />
              </div>
              
              <button type="submit" className="btn-primary" style={{ marginTop: "1rem", padding: "0.875rem" }}>
                {editingId ? "Save Changes" : "Add Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
