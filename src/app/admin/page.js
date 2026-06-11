"use client";
import React, { useState, useEffect } from "react";
import { Settings, Briefcase, Users, Mail, RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { ALL_SERVICES } from "../../data/services";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: ALL_SERVICES.length,
    portfolio: 0,
    team: 0,
    messages: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    try {
      // Fetch exact counts
      const { count: portfolioCount } = await supabase.from('portfolio').select('*', { count: 'exact', head: true });
      const { count: teamCount } = await supabase.from('team_members').select('*', { count: 'exact', head: true });
      const { count: messagesCount } = await supabase.from('messages').select('*', { count: 'exact', head: true });

      setStats({
        services: ALL_SERVICES.length,
        portfolio: portfolioCount || 0,
        team: teamCount || 0,
        messages: messagesCount || 0
      });

      // Fetch recent messages for activity
      const { data: recentMessages } = await supabase
        .from('messages')
        .select('name, created_at')
        .order('created_at', { ascending: false })
        .limit(4);

      if (recentMessages) {
        setRecentActivity(recentMessages.map(msg => {
          const time = new Date(msg.created_at);
          // Simple time formatting logic
          const diff = Math.floor((new Date() - time) / 1000);
          let timeAgo = "";
          if (diff < 60) timeAgo = "just now";
          else if (diff < 3600) timeAgo = `${Math.floor(diff/60)} mins ago`;
          else if (diff < 86400) timeAgo = `${Math.floor(diff/3600)} hours ago`;
          else timeAgo = `${Math.floor(diff/86400)} days ago`;

          return {
            text: `New contact form submission from ${msg.name}`,
            time: timeAgo
          };
        }));
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
    
    setLoading(false);
  };

  const STAT_CARDS = [
    { label: "Total Services", value: stats.services, icon: <Settings size={24} /> },
    { label: "Total Portfolio", value: stats.portfolio, icon: <Briefcase size={24} /> },
    { label: "Team Members", value: stats.team, icon: <Users size={24} /> },
    { label: "Messages", value: stats.messages, icon: <Mail size={24} /> },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>
          Dashboard
        </h1>
        <button onClick={fetchDashboardData} className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
          <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {STAT_CARDS.map((stat, i) => (
          <div key={i} className="glass" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.8125rem", color: "var(--gray)" }}>{stat.label}</span>
              <span style={{ fontSize: "1.25rem", color: loading ? "var(--gray)" : "inherit" }}>{stat.icon}</span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: loading ? "var(--gray)" : "var(--primary)" }}>
              {loading ? "-" : stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass" style={{ padding: "1.5rem" }}>
        <h2 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "1.25rem" }}>Recent Activity</h2>
        {loading ? (
          <div style={{ color: "var(--gray)", fontSize: "0.875rem" }}>Loading activity...</div>
        ) : recentActivity.length === 0 ? (
          <div style={{ color: "var(--gray)", fontSize: "0.875rem" }}>No recent activity to show.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {recentActivity.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: i < recentActivity.length - 1 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: "0.9375rem" }}>{item.text}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--gray)", flexShrink: 0, marginLeft: "1rem" }}>{item.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
