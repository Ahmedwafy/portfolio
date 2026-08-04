import { ImageResponse } from "next/og";
import { getPerson } from "@/sanity/fetchers";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const person = await getPerson();
  const eyebrow = (person?.skills ?? []).slice(0, 4).join("   ·   ");

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
          background: "#14161F",
        }}
      >
        {eyebrow && (
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              color: "#E8A23D",
              marginBottom: 28,
            }}
          >
            {eyebrow.toUpperCase()}
          </div>
        )}
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "#EDEAE3",
            maxWidth: 950,
            lineHeight: 1.2,
          }}
        >
          {person?.headline ?? "Developer Portfolio"}
        </div>
        {person?.name && (
          <div style={{ fontSize: 28, color: "#8A90A6", marginTop: 32 }}>
            {person.name}
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
