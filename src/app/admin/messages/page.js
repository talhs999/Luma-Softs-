"use client";
import React, { useState, useEffect } from "react";

import { Trash2, Mail, Clock, RefreshCw } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        const res = await fetch(`/api/admin/messages?id=${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to delete message");
        
        fetchMessages();
      } catch (error) {
        alert("Error deleting message: " + error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Inbox ({messages.length})</h1>
        <button onClick={fetchMessages} className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
          <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--gray)" }}>
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="glass" style={{ textAlign: "center", padding: "4rem", color: "var(--gray)" }}>
          <Mail size={48} style={{ margin: "0 auto 1rem", opacity: 0.5 }} />
          No messages received yet.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {messages.map((msg) => (
            <div key={msg.id} className="glass" style={{ padding: "1.5rem", borderLeft: "3px solid var(--primary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "1.125rem", marginBottom: "0.25rem" }}>{msg.name}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--primary)" }}>
                    <a href={`mailto:${msg.email}`}>{msg.email}</a>
                  </div>
                  {msg.phone && (
                    <div style={{ fontSize: "0.8125rem", color: "var(--gray)", marginTop: "0.25rem" }}>
                      Phone: <a href={`tel:${msg.phone}`}>{msg.phone}</a>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gray)", fontSize: "0.8125rem" }}>
                  <Clock size={14} />
                  {formatDate(msg.created_at)}
                </div>
              </div>
              
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "1.25rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.5rem" }}>
                  Subject: {msg.subject || "No Subject"}
                </div>
                <p style={{ color: "var(--gray)", fontSize: "0.9375rem", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {msg.message}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button onClick={() => handleDelete(msg.id)} style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.5rem 0.75rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, color: "#ef4444", cursor: "pointer", fontSize: "0.8125rem", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background="rgba(239,68,68,0.15)"} onMouseLeave={(e) => e.currentTarget.style.background="rgba(239,68,68,0.08)"}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
