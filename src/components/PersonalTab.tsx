import { LINKS } from "@/lib/placeholders";

const muted = "rgba(0,0,0,0.45)";

export const PersonalTab = () => {
  return (
    <div className="overflow-y-auto" style={{ color: "#0a0a0a" }}>
      {/* Hero */}
      <div className="anim-fade-up" style={{ minHeight: "65vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 0 48px 0" }}>
        <div style={{ fontFamily: "Arial", fontSize: 11, letterSpacing: "0.2em", fontWeight: 300, color: "rgba(255,66,66,0.8)", marginBottom: 20 }}>
          rithwik gopal
        </div>
        <h2 style={{ fontFamily: "Arial", fontSize: "clamp(40px,5vw,68px)", fontWeight: 200, lineHeight: 1.05, marginBottom: 16, color: "#0a0a0a", letterSpacing: "0.01em" }}>
          hey.
        </h2>
        <p style={{ fontFamily: "Arial", fontSize: "clamp(15px,1.5vw,18px)", fontWeight: 300, color: "rgba(0,0,0,0.6)", lineHeight: 1.85, maxWidth: 540, marginBottom: 20 }}>
          i'm rigoo. i write copy, build systems, and automate the parts that don't need a human.
        </p>
        <div style={{ fontFamily: "Arial", fontSize: "clamp(14px,1.3vw,16px)", fontWeight: 300, fontStyle: "italic", color: "#ff4242", lineHeight: 1.5, maxWidth: 480 }}>
          unlocking human potential. that's the mission.
          <br />
          everything else is infrastructure.
        </div>
      </div>

      {/* Photo placeholder */}
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            aspectRatio: "4/5",
            background: "rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontFamily: "Arial", fontSize: 10, letterSpacing: "0.1em", color: "rgba(0,0,0,0.2)", textAlign: "center", padding: "0 20px", lineHeight: 1.8 }}>
            [ your photo here<br />not a headshot — a real moment<br />working, thinking, building ]
          </div>
        </div>
      </div>

      {/* Story */}
      <div style={{ marginBottom: 52 }}>
        <div style={{ fontFamily: "Arial", fontSize: 11, letterSpacing: "0.2em", fontWeight: 300, color: "rgba(255,66,66,0.7)", marginBottom: 20 }}>
          what i'm actually doing
        </div>
        <p style={{ fontFamily: "Arial", fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: "rgba(0,0,0,0.65)", maxWidth: 580, marginBottom: 20 }}>
          i write copy grounded in psychology. i build content systems that run without me watching them. i automate the parts that don't need a human.
        </p>
        <p style={{ fontFamily: "Arial", fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: "rgba(0,0,0,0.65)", maxWidth: 580, marginBottom: 20 }}>
          the thing i keep coming back to: most smart people are operating way below their actual capacity. it's almost never a talent problem. it's a systems problem.
        </p>
        <p style={{ fontFamily: "Arial", fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: "rgba(0,0,0,0.65)", maxWidth: 580, marginBottom: 8 }}>
          right now i'm working on three things.
        </p>

        {[
          ["automate 90", "selling websites to local businesses. not glamorous. it funds everything else. real calls, real clients, real cash."],
          ["IA 3.0", "an AI-powered content architecture i built before anyone asked me to. the kind of system agencies charge 10k to set up."],
          ["this portfolio", "because i was spending three hours on discovery calls explaining what i do. now the site does that."],
        ].map(([title, body]) => (
          <div key={title} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
            <div style={{ fontFamily: "Arial", fontSize: 11, fontWeight: 300, color: "#ff4242", minWidth: 90, paddingTop: 3, letterSpacing: "0.06em" }}>
              {title}
            </div>
            <div style={{ fontFamily: "Arial", fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: "rgba(0,0,0,0.6)" }}>
              {body}
            </div>
          </div>
        ))}
      </div>

      {/* Honest part */}
      <div style={{ marginBottom: 52 }}>
        <div
          style={{
            background: "rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.08)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: 4,
            padding: "24px 28px",
          }}
        >
          <div style={{ fontFamily: "Arial", fontSize: 11, letterSpacing: "0.2em", fontWeight: 300, color: "rgba(255,66,66,0.7)", marginBottom: 16 }}>
            the honest part
          </div>
          <p style={{ fontFamily: "Arial", fontSize: 14, fontWeight: 300, lineHeight: 1.85, color: "rgba(0,0,0,0.65)", maxWidth: 520, marginBottom: 12 }}>
            i read too much and sometimes theorize instead of shipping. i'm better at architecture than operations. i'm 18, and some of what i think i know will look different in three years.
          </p>
          <p style={{ fontFamily: "Arial", fontSize: 14, fontWeight: 300, lineHeight: 1.85, color: "rgba(0,0,0,0.65)", maxWidth: 520 }}>
            ads are not mine right now. seo either. big team management, no. what i'm actually good at: seeing how things connect before most people notice. writing copy that moves people. building systems that work without me watching them.
          </p>
        </div>
      </div>

      {/* Diligence */}
      <div style={{ marginBottom: 52 }}>
        <div style={{ fontFamily: "Arial", fontSize: 11, letterSpacing: "0.2em", fontWeight: 300, color: "rgba(255,66,66,0.7)", marginBottom: 20 }}>
          this is what showing up looks like
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            ["notion-workday-logs.png", "every workday logged", "august 2024 to now. not for the aesthetic."],
            ["tally-notebook.png", "before notion. still counts.", "hand-drawn tally counter. before a single paying client."],
          ].map(([file, title, body]) => (
            <div
              key={file}
              style={{
                flex: 1,
                minWidth: 220,
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div style={{ width: "100%", aspectRatio: "4/3", background: "rgba(0,0,0,0.04)", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: "Arial", fontSize: 9, color: "rgba(0,0,0,0.2)", letterSpacing: "0.08em", textAlign: "center", padding: "0 16px", lineHeight: 1.8 }}>
                  [ {file} ]
                </div>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontFamily: "Arial", fontSize: 12, fontWeight: 300, color: "#0a0a0a", marginBottom: 4 }}>{title}</div>
                <div style={{ fontFamily: "Arial", fontSize: 12, fontWeight: 300, color: muted, lineHeight: 1.6 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div style={{ paddingTop: 40, paddingBottom: 80, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ fontFamily: "Arial", fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 200, color: "#0a0a0a", lineHeight: 1.5, maxWidth: 480, marginBottom: 28 }}>
          if you want to build something real
          <br />
          and need someone already in motion,
          <br />
          <span style={{ color: "#ff4242" }}>message me.</span>
        </div>
        <a
          href={LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            fontFamily: "Arial",
            fontSize: 12,
            fontWeight: 300,
            letterSpacing: "0.18em",
            background: "#0a0a0a",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 2,
            textDecoration: "none",
          }}
        >
          MESSAGE ME ON WHATSAPP →
        </a>
      </div>
    </div>
  );
};
