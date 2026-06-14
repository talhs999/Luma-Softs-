"use client";
import React, { useState, useEffect } from "react";

import { User } from "lucide-react";

export default function AdminTeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "", role: "", image_url: "", details: "",
    instagram: "", linkedin: "", twitter: ""
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        const data = await res.json();
        setTeam(data || []);
      }
    } catch (error) {
      console.error("Error fetching team:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingId(member.id);
      setFormData(member);
    } else {
      setEditingId(null);
      setFormData({ name: "", role: "", image_url: "", details: "", instagram: "", linkedin: "", twitter: "" });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const payload = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch("/api/admin/team", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save member");

      setModalOpen(false);
      fetchTeam();
    } catch (error) {
      alert("Error saving member: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete member");

      fetchTeam();
    } catch (error) {
      alert("Error deleting member: " + error.message);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Manage Team</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary" style={{ padding: "0.625rem 1.25rem", fontSize: "0.875rem" }}>+ Add Member</button>
      </div>

      <div className="glass" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Member</th>
              <th style={{ textAlign: "left", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Role</th>
              <th style={{ textAlign: "right", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" style={{ padding: "2rem", textAlign: "center", color: "var(--gray)" }}>Loading team...</td></tr>
            ) : team.map((member, i) => (
              <tr key={member.id} style={{ borderBottom: i < team.length - 1 ? "1px solid var(--border)" : "none" }}>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {member.image_url ? <img src={member.image_url} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <User size={20} color="var(--gray)" />}
                    </div>
                    <span style={{ fontWeight: 600 }}>{member.name}</span>
                  </div>
                </td>
                <td style={{ padding: "1rem 1.25rem", color: "var(--gray)", fontSize: "0.9375rem" }}>{member.role}</td>
                <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                  <button onClick={() => handleOpenModal(member)} style={{ background: "none", border: "none", color: "var(--gray)", cursor: "pointer", fontSize: "0.875rem", marginRight: "0.75rem" }}>Edit</button>
                  <button onClick={() => handleDelete(member.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.875rem" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
          <div className="glass" style={{ width: "100%", maxWidth: 500, padding: "2rem", background: "#0a0a0a", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>{editingId ? "Edit Member" : "Add Member"}</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Role</label>
                <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Image URL (e.g. /talha.jpg)</label>
                <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Details / Bio</label>
                <textarea value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box", minHeight: "100px", resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Instagram URL</label>
                  <input type="url" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>LinkedIn URL</label>
                  <input type="url" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>X (Twitter) URL</label>
                <input type="url" value={formData.twitter} onChange={e => setFormData({...formData, twitter: e.target.value})} className="form-input" style={{ width: "100%", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", color: "var(--gray)", cursor: "pointer" }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: "0.625rem 1.25rem" }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
