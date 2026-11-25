export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/admin/", "/login/", "/api/"],
      },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot", "Claude-User", "Googlebot", "Applebot"],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/services/", "/portfolio/", "/blogs/", "/estimator", "/faq"],
        disallow: ["/admin/", "/login/", "/api/"],
      },
    ],
    sitemap: "https://lumasofts.com/sitemap.xml",
    host: "https://lumasofts.com",
  };
}
