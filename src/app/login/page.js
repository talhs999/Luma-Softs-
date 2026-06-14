"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 72px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div className="glass" style={{ padding: "2.5rem", width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ margin: "0 auto 1.5rem", display: "flex", justifyContent: "center" }}>
            <img src="/logo.png" alt="Luma Softs Logo" style={{ height: "64px", width: "auto", objectFit: "contain" }} />
          </div>
          <h1 style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: "0.25rem" }}>Admin Login</h1>
          <p style={{ color: "var(--gray)", fontSize: "0.875rem" }}>Sign in to manage Luma Softs</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "0.75rem 1rem", color: "#ef4444", fontSize: "0.875rem" }}>
              {error}
            </div>
          )}
          <div style={{ width: "100%" }}>
            <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@lumasofts.com"
              className="form-input" style={{ width: "100%", display: "block" }} />
          </div>
          <div style={{ width: "100%" }}>
            <label style={{ display: "block", fontSize: "0.8125rem", color: "var(--gray)", marginBottom: "0.375rem" }}>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="form-input" style={{ width: "100%", display: "block" }} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", marginTop: "0.5rem", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
