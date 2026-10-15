import { ImageResponse } from "next/og";

// Social share card (1200×630) — generated at build from the design tokens so it
// reads as the same board: charcoal substrate, ivory name, one copper trace + via.
// Colors are the dark-theme token literals (ImageResponse can't read CSS vars).
export const alt = "Sudhanshu Kumar — Full-Stack Developer & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#101112",
          color: "#f4f1e8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#8f8b83",
          }}
        >
          <span style={{ color: "#f4f1e8", fontWeight: 700, letterSpacing: 6 }}>SK</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span>Available for new roles</span>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                border: "2px solid #c67a55",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
            <span style={{ width: 64, height: 2, backgroundColor: "#c67a55" }} />
            <span style={{ fontSize: 26, color: "#c8c4bb", letterSpacing: 1 }}>
              Full-stack &amp; AI, engineered end-to-end
            </span>
          </div>
          <div style={{ fontSize: 108, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
            Sudhanshu Kumar
          </div>
          <div style={{ fontSize: 34, color: "#b8b4aa", marginTop: 22 }}>
            Full-Stack Developer &amp; AI Engineer
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#8f8b83" }}>
          <span style={{ width: 8, height: 8, borderRadius: 9999, backgroundColor: "#c67a55" }} />
          <span>React · Next.js · TypeScript · Node.js · PostgreSQL · RAG</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
