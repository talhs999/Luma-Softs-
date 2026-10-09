import React from "react";
import { query } from "../../lib/db";
import PortfolioClient from "./PortfolioClient";

// 0 to bypass caching so we always fetch latest portfolio
export const revalidate = 0;

export const metadata = {
  title: "Our Work & Portfolio | Luma Softs",
  description: "View our recent web development, app development, and UI/UX design projects in Karachi.",
};

export default async function PortfolioPage() {
  let portfolio = [];
  try {
    const res = await query('SELECT * FROM portfolio ORDER BY created_at DESC');
    if (res && res.length > 0) {
      portfolio = res;
    }
  } catch (error) {
    console.error("Database error fetching portfolio:", error);
    // If DB is offline, try fetching from the internal API fallback
    try {
      const res = await fetch("https://lumasofts.com/api/portfolio");
      if (res.ok) {
        portfolio = await res.json();
      }
    } catch (e) {}
  }

  return <PortfolioClient initialPortfolio={portfolio} />;
}
