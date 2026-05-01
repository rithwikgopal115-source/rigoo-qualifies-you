import { useState } from "react";
import { IconGrid, IconFan, IconBrandR } from "./Icons";

export type Tab = "PROFESSIONAL" | "PERSONAL";

interface Props {
  tab: Tab;
  onSwitch: (t: Tab) => void;
  isPersonal: boolean;
  flowActivated: boolean;
}

export const TabBar = ({ tab, onSwitch, isPersonal, flowActivated }: Props) => {
  const lightMode = flowActivated || isPersonal;
  const bg = flowActivated
    ? "rgba(240,240,240,0.92)"
    : isPersonal
      ? "rgba(255,255,255,0.85)"
      : "rgba(0,0,0,0.85)";
  const border = lightMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.07)";
  const textPrimary = lightMode ? "#0a0a0a" : "#ffffff";
  const textMuted = lightMode ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.32)";
  const divider = lightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center"
      style={{
        padding: "12px 0 12px 28px",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        background: bg,
        borderBottom: `1px solid ${border}`,
        transition: "all 0.8s ease",
      }}
    >
      <NavSection
        icon={<IconGrid color={tab === "PROFESSIONAL" ? "#ff4242" : textMuted} />}
        label="professional"
        sub={["who are you", "what you need", "work & proof"]}
        active={tab === "PROFESSIONAL"}
        textPrimary={textPrimary}
        textMuted={textMuted}
        divider={divider}
        onClick={() => onSwitch("PROFESSIONAL")}
      />
      <NavSection
        icon={<IconFan color={tab === "PERSONAL" ? "#ff4242" : textMuted} />}
        label="personal"
        sub={["origin", "mission", "what i'm building"]}
        active={tab === "PERSONAL"}
        textPrimary={textPrimary}
        textMuted={textMuted}
        divider={divider}
        onClick={() => onSwitch("PERSONAL")}
      />
      <div className="flex-1" />
      <div style={{ paddingRight: 24, opacity: 0.45 }}>
        <IconBrandR color={textPrimary} />
      </div>
      <style>{`@keyframes spinCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </header>
  );
};

const NavSection = ({
  icon, label, sub, active, textPrimary, textMuted, divider, onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string[];
  active: boolean;
  textPrimary: string;
  textMuted: string;
  divider: string;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        cursor: "pointer",
        padding: "0 28px",
        borderLeft: `1px solid ${divider}`,
        transition: "opacity 0.3s",
        opacity: active ? 1 : hovered ? 0.75 : 0.45,
      }}
    >
      <div style={{ paddingTop: 2, flexShrink: 0 }}>{icon}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            fontFamily: "Arial",
            fontSize: 12,
            fontWeight: active ? 500 : 300,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: active ? "#ff4242" : textPrimary,
            transition: "color 0.5s",
          }}
        >
          {label}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {sub.map((s) => (
            <div
              key={s}
              style={{
                fontFamily: "Arial",
                fontSize: 10,
                fontWeight: 300,
                letterSpacing: "0.04em",
                color: textMuted,
                lineHeight: 1.5,
                transition: "color 0.5s",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
