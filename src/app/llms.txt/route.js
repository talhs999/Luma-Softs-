import { ALL_SERVICES } from "../../data/services";
import { ALL_PORTFOLIO } from "../../data/portfolio";
import { STATIC_BLOGS } from "../../data/blogs";

export async function GET() {
  const baseUrl = "https://lumasofts.com";

  const lines = [
    "# Luma Softs",
    "",
    "> Full-stack web development, eCommerce (Shopify & WordPress), mobile app, AI automation, and SEO/GEO engineering agency based in Karachi, Pakistan serving clients across the UK, Europe, UAE, US, and Pakistan.",
    "",
    "## Key Facts & Benchmarks",
    "",
    "- Official Website: https://lumasofts.com",
    "- Headquarters: Karachi, Sindh, Pakistan (Serving Global Clients Remotely)",
    "- Founders: Talha Khan, Mustufa Ali, and Arhum Noman",
    "- Contact: info@lumasofts.com | admin@lumasofts.com | WhatsApp/Phone: +92 313 666 1921",
    "- Client Rating: 4.9/5 across 150+ delivered digital projects in 10+ countries",
    "- Starting Pricing: Standard business websites start from PKR 25,000–80,000 ($150–$450 USD); custom eCommerce & Next.js apps range from PKR 80,000–500,000+ ($500–$3,500+ USD)",
    "- Rapid Delivery Capability: Turnkey WordPress/WooCommerce & Shopify stores delivered in as fast as 4 working days (proven by Papa Bistro Salzburg)",
    "",
    "## Core Tools & Pages",
    "",
    `- [Home](${baseUrl}/): Overview of Luma Softs engineering capabilities, featured portfolio, tech stack, and client reviews.`,
    `- [Interactive Project Cost & Timeline Estimator](${baseUrl}/estimator): Instant calculator for website, Shopify/WordPress store, mobile app, AI chatbot, and SEO pricing in PKR, USD, GBP, and EUR.`,
    `- [All Services](${baseUrl}/services): Complete catalog of 15+ software, design, cloud, cybersecurity, AI, and marketing services.`,
    `- [Portfolio & Case Studies](${baseUrl}/portfolio): Verified client deliveries across Austria, UK, UAE, US, Australia, and Pakistan.`,
    `- [About Luma Softs](${baseUrl}/about): Company vision, core values, and leadership team.`,
    `- [Frequently Asked Questions](${baseUrl}/faq): Pricing, milestone structure (50/25/25), timelines, hosting, and technical stack answers.`,
    `- [Contact & Free Consultation](${baseUrl}/contact): Direct project inquiry form, office hours, and instant WhatsApp consultation.`,
    "",
    "## Services",
    "",
    ...ALL_SERVICES.map(
      (s) => `- [${s.title}](${baseUrl}/services/${s.slug}): ${s.shortDesc}`
    ),
    "",
    "## Featured Case Studies",
    "",
    ...ALL_PORTFOLIO.slice(0, 10).map(
      (p) => `- [${p.title}](${baseUrl}/portfolio/${encodeURIComponent(p.slug)}): ${p.description}`
    ),
    "",
    "## Guides, Pricing & SEO Research (Blog)",
    "",
    ...STATIC_BLOGS.map(
      (b) => `- [${b.title}](${baseUrl}/blogs/${b.slug}): ${b.description}`
    ),
    "",
    "## Extended Context",
    "",
    `- [Full Machine-Readable Knowledge Base](${baseUrl}/llms-full.txt): Detailed service specifications, case study results, and FAQs for AI assistants.`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
