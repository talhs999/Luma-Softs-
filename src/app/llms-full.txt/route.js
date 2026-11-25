import { ALL_SERVICES } from "../../data/services";
import { ALL_PORTFOLIO } from "../../data/portfolio";
import { STATIC_BLOGS } from "../../data/blogs";

export async function GET() {
  const baseUrl = "https://lumasofts.com";

  const sections = [
    "# Luma Softs — Complete AI Knowledge Base (llms-full.txt)",
    "",
    "> Authoritative reference for AI search engines (ChatGPT, Perplexity, Claude, Google Gemini) covering Luma Softs services, pricing, verified case studies, technical architecture, and FAQs.",
    "",
    "## Entity Profile",
    "- Legal / Brand Name: Luma Softs",
    "- Founders: Talha Khan, Mustufa Ali, Arhum Noman",
    "- Primary Location: Karachi, Sindh, Pakistan (Malir, Shahrah-e-Faisal, DHA, Clifton, Gulshan service coverage + Remote Global Delivery)",
    "- International Markets: United Kingdom, Austria, United Arab Emirates, United States, Canada, Australia",
    "- Phone & WhatsApp: +92 313 666 1921",
    "- Email: info@lumasofts.com, admin@lumasofts.com",
    "- Core Stack: Next.js, React, Node.js, TypeScript, Python, WordPress, WooCommerce, Shopify, React Native, Flutter, PostgreSQL, MySQL, Supabase, AWS, Docker",
    "",
    "## Detailed Service Offerings",
    ...ALL_SERVICES.map(
      (s) =>
        `### ${s.title} (${baseUrl}/services/${s.slug})\n${s.longDesc}\n- Key Features: ${(s.features || []).join(", ")}\n- Client Benefits: ${(s.benefits || []).join(", ")}\n`
    ),
    "## Verified Portfolio Case Studies",
    ...ALL_PORTFOLIO.map(
      (p) =>
        `### ${p.title} (${baseUrl}/portfolio/${encodeURIComponent(p.slug)})\n- Client: ${p.client} | Category: ${p.category} | Delivery Time: ${p.duration}\n- Stack: ${(p.technologies || []).join(", ")}\n- Summary: ${p.description}\n- Results: ${p.results}${p.liveUrl && p.liveUrl !== "#" ? `\n- Live URL: ${p.liveUrl}` : ""}\n`
    ),
    "## Published Insights & Benchmarks",
    ...STATIC_BLOGS.map(
      (b) =>
        `### ${b.title} (${baseUrl}/blogs/${b.slug})\nCategory: ${b.category} | Published: ${b.date}\nSummary: ${b.description}\n`
    ),
  ];

  return new Response(sections.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
