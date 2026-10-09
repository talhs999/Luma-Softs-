import React from "react";
import { query } from "../../../lib/db";
import Link from "next/link";
import ServiceDetailClient from "./ServiceDetailClient";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let title = "Service | Luma Softs";
  let description = "Professional digital services by Luma Softs.";

  try {
    const res = await query('SELECT title, short_desc FROM services WHERE slug = ? LIMIT 1', [slug]);
    if (res && res.length > 0) {
      title = `${res[0].title} | Luma Softs`;
      description = res[0].short_desc;
    }
  } catch (err) {}

  return { title, description };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  let service = null;

  try {
    const res = await query('SELECT * FROM services WHERE slug = ? LIMIT 1', [slug]);
    if (res && res.length > 0) {
      service = res[0];
      // parse json fields safely
      try {
        if (typeof service.features === "string") service.features = JSON.parse(service.features);
        if (typeof service.benefits === "string") service.benefits = JSON.parse(service.benefits);
        if (typeof service.faq === "string") service.faq = JSON.parse(service.faq);
      } catch (e) {
        console.error("Error parsing JSON fields in service:", e);
      }
    }
  } catch (error) {
    console.error("Failed to fetch service detail:", error);
  }

  if (!service) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Service Not Found</h1>
        <Link href="/services" className="btn-outline" style={{ color: "var(--primary)" }}>← Back to Services</Link>
      </div>
    );
  }

  return <ServiceDetailClient service={service} />;
}
