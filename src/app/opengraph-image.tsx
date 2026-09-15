import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { palette } from "@/config/palette";

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
          justifyContent: "center",
          padding: "80px",
          backgroundColor: palette.mocha.bg,
          color: palette.mocha.text,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              width: 28,
              height: 28,
              border: `2px solid ${palette.mocha.accent}`,
              borderRadius: 6,
            }}
          />
          <span style={{ fontSize: 22, letterSpacing: 4, color: palette.mocha.muted }}>
            {siteConfig.wordmark}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            maxWidth: 980,
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 1.15,
          }}
        >
          {siteConfig.taglineParts.lead}
          <span style={{ color: palette.mocha.accent }}>
            {siteConfig.taglineParts.accent}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 24,
            color: palette.mocha.muted,
          }}
        >
          {siteConfig.shortDescription}
        </div>
      </div>
    ),
    { ...size },
  );
}
