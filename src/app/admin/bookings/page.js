"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Calendar, Clock, User, Mail, Phone, ChevronDown, Check, X, Tag, Trash2 } from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setBookings(data);
    }
    setLoading(false);
  };

  const updateStatus = async (booking, newStatus) => {
    try {
      const res = await fetch("/api/bookings/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking, newStatus })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      fetchBookings();
    } catch (error) {
      alert("Error updating status: " + error.message);
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
      fetchBookings();
    } catch (error) {
      alert("Error deleting booking.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return { bg: "rgba(234, 179, 8, 0.1)", color: "#eab308" };
      case "Confirmed": return { bg: "rgba(194, 255, 5, 0.1)", color: "var(--primary)" };
      case "Completed": return { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" };
      case "Cancelled": return { bg: "rgba(239, 68, 68, 0.1)", color: "#ef4444" };
      default: return { bg: "rgba(255, 255, 255, 0.1)", color: "#fff" };
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Meeting Bookings</h1>
        <button onClick={fetchBookings} className="btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
          Refresh
        </button>
      </div>

      <div className="glass" style={{ overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--gray)" }}>Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--gray)" }}>No meeting bookings yet.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}>
                <th style={{ textAlign: "left", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Client Details</th>
                <th style={{ textAlign: "left", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Service & Schedule</th>
                <th style={{ textAlign: "left", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Status</th>
                <th style={{ textAlign: "right", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--gray)", fontWeight: 600, textTransform: "uppercase" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, i) => {
                const statusStyle = getStatusColor(booking.status);
                return (
                  <tr key={booking.id} style={{ borderBottom: i < bookings.length - 1 ? "1px solid var(--border)" : "none", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "1.25rem" }}>
                      <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <User size={14} color="var(--primary)" /> {booking.name}
                      </div>
                      <div style={{ color: "var(--gray)", fontSize: "0.875rem", marginBottom: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Mail size={12} /> <a href={"mailto:" + booking.email} style={{ color: "inherit", textDecoration: "none" }}>{booking.email}</a>
                      </div>
                      <div style={{ color: "var(--gray)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Phone size={12} /> <a href={"tel:" + booking.phone} style={{ color: "inherit", textDecoration: "none" }}>{booking.phone}</a>
                      </div>
                    </td>
                    <td style={{ padding: "1.25rem" }}>
                      <div style={{ fontWeight: 500, fontSize: "0.9375rem", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Tag size={14} color="var(--primary)" /> {booking.service}
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <span style={{ fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.05)", padding: "4px 8px", borderRadius: "4px" }}>
                          <Calendar size={12} color="var(--gray)" /> {booking.booking_date}
                        </span>
                        <span style={{ fontSize: "0.8125rem", display: "flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.05)", padding: "4px 8px", borderRadius: "4px" }}>
                          <Clock size={12} color="var(--gray)" /> {booking.booking_time}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "1.25rem" }}>
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <select 
                          value={booking.status} 
                          onChange={(e) => updateStatus(booking, e.target.value)}
                          style={{
                            appearance: "none", background: statusStyle.bg, color: statusStyle.color,
                            border: "1px solid " + statusStyle.color, borderRadius: "9999px",
                            padding: "6px 28px 6px 12px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer",
                            outline: "none"
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <ChevronDown size={12} color={statusStyle.color} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                      </div>
                    </td>
                    <td style={{ padding: "1.25rem", textAlign: "right", verticalAlign: "top" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                        <button onClick={() => deleteBooking(booking.id)} style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "6px", padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", fontWeight: 600, transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background="rgba(239, 68, 68, 0.2)"} onMouseLeave={(e) => e.currentTarget.style.background="rgba(239, 68, 68, 0.1)"}>
                          <Trash2 size={14} /> Delete
                        </button>
                        <div style={{ fontSize: "0.75rem", color: "var(--gray)", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                          <span>Booked on:</span>
                          <span>{new Date(booking.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
