import React from "react";
import { query } from "../../lib/db";
import { ALL_PORTFOLIO } from "../../data/portfolio";
import PortfolioClient from "./PortfolioClient";

// 0 to bypass caching so we always fetch latest portfolio
export const revalidate = 0;

export const metadata = {
  title: "Our Work & Case Studies — Shopify, WordPress & Next.js Portfolio | Luma Softs",
  description: "Explore 150+ websites, rapid 4-day eCommerce stores, UK/Europe luxury brands, and custom software case studies built by Luma Softs.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Featured Portfolio & Client Case Studies | Luma Softs",
    description: "Verified results across eCommerce, SaaS, AI automation, and corporate platforms.",
    url: "https://lumasofts.com/portfolio",
  },
};

export default async function PortfolioPage() {
  let portfolio = [];
  try {
    const res = await query('SELECT * FROM portfolio ORDER BY created_at DESC');
    if (res && res.length > 0) {
      portfolio = res;
    }
  } catch (error) {
    console.warn("Database offline or query error, using static portfolio fallback:", error.message);
  }

  if (portfolio.length === 0) {
    portfolio = ALL_PORTFOLIO.map((item, index) => ({
      id: index + 1,
      slug: item.slug,
      title: item.title,
      category: item.category,
      featured_image: item.featuredImage,
      client: item.client,
      duration: item.duration,
      technologies: item.technologies,
      description: item.description,
      challenge: item.challenge,
      solution: item.solution,
      results: item.results,
      testimonial: item.testimonial,
      live_url: item.liveUrl,
      show_on_home: item.show_on_home ? 1 : 0
    }));
  }

  return <PortfolioClient initialPortfolio={portfolio} />;
}
