"use client";
import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { supabase } from "../lib/supabase";

// Raw SVGs for icons that might not exist in the older lucide-react version
const CloseIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const Instagram = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const Linkedin = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const Twitter = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      if (!supabase) return;
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (error) throw error;
      setTeam(data || []);
    } catch (err) {
      console.error("Error fetching team:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Our People</div>
          <h2 className="section-title">Meet the Team</h2>
        </div>
        
        {loading ? (
          <div style={{ textAlign: "center", color: "var(--gray)", padding: "2rem" }}>Loading team...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "1.5rem" }}>
            {team.map((m, i) => (
              <div 
                key={m.id || i} 
                className="glass" 
                style={{ padding: "2rem", textAlign: "center", cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => setSelectedMember(m)}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ width: 180, height: 180, borderRadius: "16px", background: "rgba(194,255,5,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", overflow: "hidden" }}>
                  {m.image_url ? (
                    <img src={m.image_url} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <User size={48} color="var(--gray)" />
                  )}
                </div>
                <h3 style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{m.name}</h3>
                <p style={{ color: "var(--primary)", fontSize: "0.8125rem", fontWeight: 500 }}>{m.role}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {selectedMember && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(5px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "1rem"
        }} onClick={() => setSelectedMember(null)}>
          <div 
            className="glass" 
            style={{ 
              maxWidth: 500, width: "100%", padding: "2.5rem", position: "relative",
              background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMember(null)}
              style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "var(--gray)", cursor: "pointer" }}
            >
              <CloseIcon size={24} />
            </button>
            
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 1rem", overflow: "hidden", border: "2px solid var(--primary)" }}>
                {selectedMember.image_url ? (
                  <img src={selectedMember.image_url} alt={selectedMember.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <User size={48} color="var(--gray)" style={{ margin: "36px auto" }} />
                )}
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>{selectedMember.name}</h2>
              <p style={{ color: "var(--primary)", fontWeight: 500 }}>{selectedMember.role}</p>
            </div>
            
            {selectedMember.details && (
              <div style={{ color: "var(--gray)", lineHeight: 1.6, fontSize: "0.9375rem", marginBottom: "2rem", textAlign: "center" }}>
                {selectedMember.details}
              </div>
            )}
            
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              {selectedMember.instagram && (
                <a href={selectedMember.instagram} target="_blank" rel="noreferrer" style={{ color: "var(--gray)", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="var(--primary)"} onMouseLeave={(e) => e.target.style.color="var(--gray)"}>
                  <Instagram size={20} />
                </a>
              )}
              {selectedMember.linkedin && (
                <a href={selectedMember.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--gray)", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="var(--primary)"} onMouseLeave={(e) => e.target.style.color="var(--gray)"}>
                  <Linkedin size={20} />
                </a>
              )}
              {selectedMember.twitter && (
                <a href={selectedMember.twitter} target="_blank" rel="noreferrer" style={{ color: "var(--gray)", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color="var(--primary)"} onMouseLeave={(e) => e.target.style.color="var(--gray)"}>
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
