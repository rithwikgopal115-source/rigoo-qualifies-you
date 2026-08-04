import { useState } from "react";

type Tile =
  | { type: "header"; label: string }
  | { type: "image"; size: string; tag: string; title: string; caption: string; file: string }
  | { type: "stat"; size: string; stat: string; caption: string };

const TILES: Tile[] = [
  { type: "header", label: "copywriting" },
  { type: "image", size: "2x2", tag: "EMAIL SEQUENCE", title: "value / story / sales", caption: "hook: bad sleep hits the same as 5 beers at work. that one insight built the whole sequence.", file: "email-sequence-sample.png" },
  { type: "image", size: "2x1", tag: "VSL", title: "B2C VSL — mansagar singh", caption: "lead, pitch, close. every section mapped to one emotional state before a word was written.", file: "vsl-framework-mansagar.png" },
  { type: "stat", size: "1x1", stat: '"eyewateringly good"', caption: "client feedback on the outreach copy. verbatim." },
  { type: "image", size: "1x1", tag: "OUTREACH", title: "cold email copy", caption: "they said don't change anything.", file: "whatsapp-reactions.png" },

  { type: "header", label: "research" },
  { type: "image", size: "2x2", tag: "CONDITIONS DECK", title: "30+ false beliefs mapped", caption: "method, internal, external. this is the research that makes copy feel like it reads the person.", file: "conditions-deck-mansagar.png" },
  { type: "image", size: "2x1", tag: "PROBLEM CHAIN", title: "surface want vs real chain", caption: "speak better english. safety, belonging, status. the problem chain finds the real lever.", file: "problem-chain-layout.png" },
  { type: "image", size: "1x1", tag: "ICP", title: "defining avatar", caption: "3-part formula. applied before any content is written.", file: "defining-avatar-slide.png" },
  { type: "stat", size: "1x1", stat: "30+", caption: "false beliefs mapped for one client" },

  { type: "header", label: "systems" },
  { type: "image", size: "1x1", tag: "CRM", title: "automate 90 CRM", caption: "50 calls/day. built because nothing off the shelf did what was needed.", file: "automate90-crm-screenshot.png" },
  { type: "image", size: "2x1", tag: "PIPELINE", title: "automate 90 pipeline", caption: "cold call to close. crm, delivery workflow, scripts, follow-up. running it solo.", file: "automate90-pipeline.png" },
  { type: "stat", size: "1x1", stat: "50/day", caption: "cold calls running through the system" },
  { type: "image", size: "3x1", tag: "IA 3.0 — AI CONTENT SYSTEM", title: "influence accelerator", caption: "full-stack agentic content distribution. research layer → distribution architecture → CMF engine.", file: "n8n-workflow.png" },
];

export const MetroGallery = () => {
  return (
    <div className="overflow-y-auto h-full pt-2 pb-12 pr-2">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "minmax(110px, auto)",
          gap: 6,
          width: "100%",
        }}
      >
        {TILES.map((tile, i) => (
          <TileEl key={i} tile={tile} idx={i} />
        ))}
      </div>
    </div>
  );
};

const TileEl = ({ tile, idx }: { tile: Tile; idx: number }) => {
  const [hovered, setHovered] = useState(false);

  if (tile.type === "header") {
    return (
      <div
        style={{
          gridColumn: "span 4",
          padding: "16px 0 8px 0",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 4,
          display: "flex",
          alignItems: "center",
          gap: 12,
          animation: `fadeSlideUp 0.5s ease ${idx * 60}ms both`,
        }}
      >
        <div style={{ width: 6, height: 6, background: "#ff4242" }} />
        <div
          style={{
            fontFamily: "Arial",
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {tile.label}
        </div>
      </div>
    );
  }

  const [colsStr, rowsStr] = tile.size.split("x");
  const cols = Number(colsStr);
  const rows = Number(rowsStr);
  const gridCol = `span ${cols}`;
  const gridRow = `span ${rows}`;

  if (tile.type === "stat") {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          gridColumn: gridCol,
          gridRow: gridRow,
          background: hovered ? "rgba(255,66,66,0.8)" : "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          transition: "all 0.25s ease",
          animation: `fadeSlideUp 0.5s ease ${idx * 60}ms both`,
        }}
      >
        <div
          style={{
            fontFamily: "Arial",
            fontSize: "clamp(18px,2.2vw,28px)",
            fontWeight: 200,
            color: hovered ? "#fff" : "#ff4242",
            lineHeight: 1.1,
            marginBottom: 8,
            transition: "color 0.25s",
          }}
        >
          {tile.stat}
        </div>
        <div
          style={{
            fontFamily: "Arial",
            fontSize: 10,
            fontWeight: 300,
            color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)",
            letterSpacing: "0.06em",
            lineHeight: 1.5,
            transition: "color 0.25s",
          }}
        >
          {tile.caption}
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: gridCol,
        gridRow: gridRow,
        background: hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: hovered ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        cursor: "pointer",
        position: "relative",
        animation: `fadeSlideUp 0.5s ease ${idx * 60}ms both`,
      }}
    >
      <div
        style={{
          flex: rows === 2 ? "1 1 60%" : rows === 1 && cols >= 2 ? "1 1 55%" : "1 1 50%",
          minHeight: 60,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            fontFamily: "Arial",
            fontSize: 8,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.18)",
            textAlign: "center",
            padding: "0 12px",
            lineHeight: 1.7,
          }}
        >
          [ {tile.file} ]
        </div>
        {hovered && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderLeft: "20px solid transparent",
              borderTop: "20px solid #ff4242",
            }}
          />
        )}
      </div>
      <div style={{ padding: "10px 12px", flex: "0 0 auto" }}>
        <div
          style={{
            fontFamily: "Arial",
            fontSize: 8,
            fontWeight: 300,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,66,66,0.6)",
            marginBottom: 4,
          }}
        >
          {tile.tag}
        </div>
        <div style={{ fontFamily: "Arial", fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.85)", marginBottom: 4, lineHeight: 1.2 }}>
          {tile.title}
        </div>
        <div style={{ fontFamily: "Arial", fontSize: 10, fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>
          {tile.caption}
        </div>
      </div>
    </div>
  );
};
