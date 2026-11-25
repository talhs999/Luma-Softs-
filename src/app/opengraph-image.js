import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luma Softs — Web, Mobile, AI & SEO Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #050505 0%, #0d1206 55%, #050505 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "999px",
              background: "#c2ff05",
            }}
          />
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "#c2ff05",
              textTransform: "uppercase",
            }}
          >
            WE ARE LUMA SOFTS
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "66px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Engineering High-Speed Websites, AI Systems &amp; Global SEO Growth.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#a1a1aa",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Next.js • WordPress &amp; Shopify • Mobile Apps • AI Automation • Technical &amp; AI SEO (GEO)
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: "28px",
            fontSize: "22px",
            color: "#d4d4d8",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <span style={{ color: "#c2ff05", fontWeight: 700 }}>150+ Projects Delivered</span>
            <span>•</span>
            <span>4.9★ Rated Agency</span>
            <span>•</span>
            <span>Karachi • UK • Europe • UAE • US</span>
          </div>
          <div style={{ fontWeight: 700, color: "#ffffff" }}>lumasofts.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
