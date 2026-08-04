import { ImageResponse } from "next/og";
import { getPerson } from "@/sanity/fetchers";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const person = await getPerson();
  const initials = person?.name
    ? person.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "P";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14161F",
          color: "#E8A23D",
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {initials}
      </div>
    ),
    { ...size }
  );
}
