"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, Users, Mail, Menu, X, Settings, Star, Calendar, Briefcase } from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { href: "/admin/services", label: "Services", icon: <Settings size={20} /> },
  { href: "/admin/portfolio", label: "Portfolio", icon: <Briefcase size={20} /> },
  { href: "/admin/reviews", label: "Reviews", icon: <Star size={20} /> },
  { href: "/admin/bookings", label: "Bookings", icon: <Calendar size={20} /> },
  { href: "/admin/team", label: "Team", icon: <Users size={20} /> },
  { href: "/admin/messages", label: "Messages", icon: <Mail size={20} /> },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 72px)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          borderRight: "1px solid var(--border)",
          padding: "2rem 0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1rem" }}>
            Admin <span style={{ color: "var(--primary)" }}>Panel</span>
          </h2>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1.5rem",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: pathname === item.href ? "var(--primary)" : "var(--gray)",
                background: pathname === item.href ? "rgba(194,255,5,0.05)" : "transparent",
                borderRight: pathname === item.href ? "2px solid var(--primary)" : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: "0 1.5rem" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.625rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--gray)",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        {children}
      </div>
    </div>
  );
}
