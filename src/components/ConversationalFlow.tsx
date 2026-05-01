import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LINKS, LOOMS } from "@/lib/placeholders";
import { supabase } from "@/integrations/supabase/client";

type Avatar = "agency" | "cofounder" | "freelancer" | "other";

const STEP1_OPTIONS: { label: string; key: Avatar }[] = [
  { label: "i run an agency and need someone serious", key: "agency" },
  { label: "i'm building something and want a collaborator", key: "cofounder" },
  { label: "just exploring", key: "other" },
  { label: "i'm looking for a freelancer", key: "freelancer" },
];

const STEP2_OPTIONS: Record<Exclude<Avatar, "other">, string[]> = {
  freelancer: ["content written", "a content system built", "AI automation", "copywriting and messaging", "something else"],
  agency: ["someone who thinks, not just executes", "someone to own a function on my team", "copy and content muscle", "something else"],
  cofounder: ["want to think through something together", "checking if we're actually aligned", "i have something early and need someone to build with", "something else"],
};

const STEP2_QUESTION: Record<Avatar, string> = {
  agency: "what are you looking for?",
  cofounder: "what brought you here?",
  freelancer: "what do you need?",
  other: "",
};

const CTA_BY_AVATAR: Record<Avatar, { text: string; href: string } | null> = {
  agency: { text: "BOOK A 30-MINUTE CALL", href: LINKS.calendly },
  cofounder: { text: "MESSAGE ME ON WHATSAPP", href: LINKS.whatsapp },
  freelancer: { text: "GET IN TOUCH", href: LINKS.email },
  other: null,
};

const LOOM_CAPTION: Record<Avatar, string> = {
  agency: "agency walkthrough — 8 to 10 min. ia 3.0 architecture, conditions deck methodology, how rigoo thinks about content systems.",
  cofounder: "cofounder walkthrough — 10 to 12 min. honest, unscripted. what rigoo is building, why, and what kind of person he wants to build with.",
  freelancer: "freelancer walkthrough — 5 to 7 min. one real piece of work end to end, thinking visible throughout.",
  other: "",
};

const WALKTHROUGH: Record<Avatar, string[]> = {
  agency: [
    "30-minute call. not a sales call — a scoping conversation. i want to understand how your agency operates, what the gap is, and whether i'm the right person to fill it.",
    "if there's a fit, i send a one-page doc: exactly how i'd plug in, what i'd own, what i'd need from your side, what the first 30 days look like.",
    "we agree on a trial scope. a real project, not a test. something that matters.",
    "i execute. we debrief honestly — what worked, what didn't.",
    "if it worked, we define what ongoing looks like.",
  ],
  cofounder: [
    "message me on whatsapp. real conversation, not a pitch.",
    "if there's genuine overlap in how we think, we define one specific thing to work on together.",
    "we work on that one thing. this is the only real way to know if building together makes sense.",
    "honest debrief after.",
    "if yes — we define what building together actually looks like.",
  ],
  freelancer: [
    "send a brief. rigoo responds with a one-pager: objective, avatar, psychological lever.",
    "work begins after alignment. no guessing.",
    "deliverable arrives with reasoning attached.",
    "one round of revisions standard.",
    "timeline: 48–72 hours for most sequences.",
  ],
  other: [],
};

type Msg = { text: string; sent: boolean };
type Step =
  | "hero"
  | "step2"
  | "freetext"
  | "loading"
  | "ai_response"
  | "walkthrough"
  | "cta";

interface Props {
  flowActivated: boolean;
  onFlowActivated: () => void;
  onFlowComplete: () => void;
}

const LOADING_LINES = [
  "reading what you need...",
  "checking what rigoo can actually do...",
  "writing your assessment...",
];

export const ConversationalFlow = ({ flowActivated, onFlowActivated, onFlowComplete }: Props) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("hero");
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [subAnswer, setSubAnswer] = useState<string>("");
  const [freeText, setFreeText] = useState("");
  const [aiText, setAiText] = useState("");
  const [streamDone, setStreamDone] = useState(false);
  const [walkthroughIdx, setWalkthroughIdx] = useState(0);
  const [walkthroughDone, setWalkthroughDone] = useState(false);
  const [loomVisible, setLoomVisible] = useState(false);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, step, aiText, walkthroughIdx, loomVisible]);

  // loading text rotator
  useEffect(() => {
    if (step !== "loading") return;
    const t = setInterval(() => setLoadingIdx((i) => (i + 1) % LOADING_LINES.length), 1400);
    return () => clearInterval(t);
  }, [step]);

  // walkthrough reveal
  useEffect(() => {
    if (step !== "walkthrough" || !avatar) return;
    const steps = WALKTHROUGH[avatar];
    if (walkthroughIdx < steps.length) {
      const t = setTimeout(() => setWalkthroughIdx((i) => i + 1), 800);
      return () => clearTimeout(t);
    } else {
      setWalkthroughDone(true);
      const t = setTimeout(() => setLoomVisible(true), 600);
      const t2 = setTimeout(() => setStep("cta"), 800);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, [step, walkthroughIdx, avatar]);

  // scroll-to-reset when CTA visible
  useEffect(() => {
    if (step !== "cta") return;
    const el = scrollRef.current;
    if (!el) return;
    let triggered = false;
    const onScroll = () => {
      if (triggered) return;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
      if (atBottom) {
        triggered = true;
        el.removeEventListener("scroll", onScroll);
        setTimeout(() => onFlowComplete(), 200);
      }
    };
    const timer = setTimeout(() => el.addEventListener("scroll", onScroll), 1200);
    return () => { clearTimeout(timer); el.removeEventListener("scroll", onScroll); };
  }, [step, onFlowComplete]);

  const addMessage = (text: string, sent: boolean) =>
    setMessages((p) => [...p, { text, sent }]);

  const handleStep1 = (label: string, key: Avatar) => {
    addMessage(label, true);
    setAvatar(key);
    onFlowActivated();
    if (key === "other") {
      setTimeout(() => {
        addMessage("tell me what you're curious about.", false);
        setStep("freetext");
      }, 500);
    } else {
      setTimeout(() => {
        addMessage(STEP2_QUESTION[key], false);
        setTimeout(() => setStep("step2"), 400);
      }, 500);
    }
  };

  const handleStep2 = (label: string) => {
    addMessage(label, true);
    setSubAnswer(label);
    setTimeout(() => {
      addMessage("tell me more. the more specific you are, the more useful this gets.", false);
      setTimeout(() => setStep("freetext"), 400);
    }, 500);
  };

  const handleSubmit = async () => {
    if (!freeText.trim() || !avatar) return;
    addMessage(freeText, true);
    const text = freeText;
    setFreeText("");
    setStep("loading");
    setAiText("");
    setStreamDone(false);

    try {
      const SUPABASE_URL = (supabase as any).supabaseUrl || import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_KEY = (supabase as any).supabaseKey || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/assess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify({ avatar, subAnswer: subAnswer || "n/a", userInput: text }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Rate limit hit. Try again in a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted.");
        else toast.error("Something went wrong.");
        setStep("hero");
        return;
      }

      setStep("ai_response");
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content as string | undefined;
            if (c) setAiText((prev) => prev + c);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
      setStreamDone(true);
      // After streaming, show walkthrough (if avatar has one)
      if (avatar !== "other") {
        setTimeout(() => setStep("walkthrough"), 400);
      } else {
        setTimeout(() => setStep("cta"), 400);
      }
    } catch (e) {
      console.error(e);
      toast.error("Network error. Try again.");
      setStep("hero");
    }
  };

  const effectivePersonal = flowActivated;
  const heroPrimary = effectivePersonal ? "#0a0a0a" : "#ffffff";
  const heroMuted = effectivePersonal ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.35)";
  const textColor = effectivePersonal ? "#0a0a0a" : "#fff";
  const mutedColor = effectivePersonal ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.4)";
  const cta = avatar ? CTA_BY_AVATAR[avatar] : null;

  const heroLine = (text: string, color: string, mb = 4) => (
    <div
      style={{
        fontFamily: "Arial",
        fontSize: "clamp(28px,3.4vw,46px)",
        fontWeight: 200,
        lineHeight: 1.05,
        letterSpacing: "0.01em",
        color,
        marginBottom: mb,
        transition: "color 0.8s ease",
      }}
    >
      {text}
    </div>
  );

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto pb-12"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Hero */}
      <div className="anim-fade-up" style={{ padding: "32px 0 36px 0" }}>
        {heroLine("most portfolios are a résumé", heroPrimary, 4)}
        {heroLine("with a coat of paint.", "#ff4242", 10)}
        {heroLine("this one", heroPrimary, 4)}
        {heroLine("qualifies you.", "#ff4242", 8)}
        <div
          style={{
            fontFamily: "Arial",
            fontSize: "clamp(12px,1.1vw,14px)",
            fontWeight: 300,
            color: heroMuted,
            letterSpacing: "0.04em",
            marginBottom: 32,
            transition: "color 0.8s ease",
          }}
        >
          pick who you are. the rest adjusts.
        </div>
      </div>

      {/* Messages */}
      <div style={{ marginBottom: 16 }}>
        {messages.map((m, i) => (
          <ChatBubble key={i} text={m.text} sent={m.sent} effectivePersonal={effectivePersonal} />
        ))}
      </div>

      {/* Step 1 */}
      {step === "hero" && (
        <div className="anim-fade-up">
          {STEP1_OPTIONS.map((opt, i) => (
            <OptionLine
              key={opt.key}
              text={opt.label}
              delay={i * 100}
              effectivePersonal={effectivePersonal}
              onSelect={() => handleStep1(opt.label, opt.key)}
            />
          ))}
        </div>
      )}

      {/* Step 2 */}
      {step === "step2" && avatar && avatar !== "other" && (
        <div className="anim-fade-up">
          {STEP2_OPTIONS[avatar].map((opt, i) => (
            <OptionLine
              key={opt}
              text={opt}
              delay={i * 100}
              effectivePersonal={effectivePersonal}
              onSelect={() => handleStep2(opt)}
            />
          ))}
        </div>
      )}

      {/* Free text */}
      {step === "freetext" && (
        <div className="anim-fade-up" style={{ marginTop: 8 }}>
          <textarea
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
            }}
            placeholder="describe what you need"
            autoFocus
            style={{
              width: "100%",
              minHeight: 100,
              background: effectivePersonal ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
              border: effectivePersonal ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.12)",
              borderRadius: 4,
              padding: "14px 16px",
              fontFamily: "Arial",
              fontSize: 13,
              color: textColor,
              resize: "vertical",
              outline: "none",
              lineHeight: 1.7,
            }}
          />
          <div
            style={{
              fontFamily: "Arial",
              fontSize: 11,
              color: mutedColor,
              marginTop: 6,
              marginBottom: 12,
            }}
          >
            be specific if you can. the more real you are, the more useful this gets. ⌘+enter to submit.
          </div>
          <button
            onClick={handleSubmit}
            className="anim-pulse-once"
            style={{
              fontFamily: "Arial",
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: "0.2em",
              background: "#ff4242",
              color: "#fff",
              border: "none",
              borderRadius: 3,
              padding: "12px 24px",
              cursor: "pointer",
            }}
          >
            SHOW ME →
          </button>
        </div>
      )}

      {/* Loading */}
      {step === "loading" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "40px 0" }}>
          <svg width="32" height="32" viewBox="0 0 26 26" fill="none" style={{ animation: "spinCW 2s linear infinite" }}>
            <rect x="1" y="1" width="10" height="10" stroke="#ff4242" strokeWidth="0.75" />
            <rect x="15" y="1" width="10" height="10" stroke="#ff4242" strokeWidth="0.75" />
            <rect x="1" y="15" width="10" height="10" stroke="#ff4242" strokeWidth="0.75" />
            <rect x="15" y="15" width="10" height="10" stroke="#ff4242" strokeWidth="0.75" />
            <circle cx="13" cy="13" r="1.5" fill="#ff4242" />
          </svg>
          <div
            className="anim-fade-in"
            style={{
              fontFamily: "Arial",
              fontSize: 12,
              fontWeight: 300,
              color: mutedColor,
              letterSpacing: "0.08em",
            }}
            key={loadingIdx}
          >
            {LOADING_LINES[loadingIdx]}
          </div>
        </div>
      )}

      {/* AI assessment + walkthrough + loom + cta — all on light glass card */}
      {(step === "ai_response" || step === "walkthrough" || step === "cta") && (
        <div className="anim-fade-up" style={{ marginBottom: 20 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(0,0,0,0.08)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderRadius: 4,
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontFamily: "Arial",
                fontSize: 10,
                letterSpacing: "0.2em",
                fontWeight: 300,
                color: "rgba(255,66,66,0.8)",
                marginBottom: 12,
              }}
            >
              RIGOO'S ASSESSMENT
            </div>
         <div
            style={{
              fontFamily: "Arial",
              fontSize: 12,
              lineHeight: 1.9,
              color: "#0a0a0a",
              whiteSpace: "pre-wrap",
            }}
          >
              {aiText}
              {!streamDone && (
                <span className="anim-cursor" style={{ color: "#ff4242", marginLeft: 2 }}>█</span>
              )}
            </div>

            {/* Walkthrough */}
            {(step === "walkthrough" || step === "cta") && avatar && avatar !== "other" && (
              <div style={{ marginTop: 24 }}>
                <div
                  style={{
                    fontFamily: "Arial",
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    color: "rgba(255,66,66,0.7)",
                    marginBottom: 16,
                  }}
                >
                  WHAT HAPPENS NEXT
                </div>
                {WALKTHROUGH[avatar].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      opacity: i < walkthroughIdx ? 1 : 0,
                      transform: i < walkthroughIdx ? "translateY(0)" : "translateY(10px)",
                      transition: "all 0.5s ease",
                      display: "flex",
                      gap: 16,
                      marginBottom: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ fontFamily: "Arial", fontSize: 11, color: "#ff4242", minWidth: 24, paddingTop: 2 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div style={{ fontFamily: "Arial", fontSize: 13, lineHeight: 1.7, color: "rgba(0,0,0,0.75)" }}>
                      {s}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Loom */}
            {loomVisible && avatar && avatar !== "other" && (
              <div className="anim-fade-up" style={{ marginTop: 24 }}>
                <div
                  style={{
                    fontFamily: "Arial",
                    fontSize: 13,
                    fontStyle: "italic",
                    color: "rgba(0,0,0,0.55)",
                    marginBottom: 12,
                  }}
                >
                  i recorded this specifically for you. watch before you decide.
                </div>
                {LOOMS[avatar] ? (
                  <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 4, overflow: "hidden" }}>
                    <iframe src={LOOMS[avatar]} allowFullScreen className="w-full h-full" />
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      background: "rgba(0,0,0,0.04)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        border: "2px solid rgba(255,66,66,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "#ff4242", fontSize: 18, marginLeft: 4 }}>▶</span>
                    </div>
                    <div
                      style={{
                        fontFamily: "Arial",
                        fontSize: 11,
                        fontWeight: 300,
                        letterSpacing: "0.15em",
                        color: "rgba(0,0,0,0.3)",
                        textAlign: "center",
                        padding: "0 20px",
                      }}
                    >
                      {LOOM_CAPTION[avatar]}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            {step === "cta" && cta && (
              <div className="anim-fade-up" style={{ marginTop: 24 }}>
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    fontFamily: "Arial",
                    fontSize: 12,
                    fontWeight: 300,
                    letterSpacing: "0.18em",
                    background: "#ff4242",
                    color: "#fff",
                    padding: "12px 24px",
                    borderRadius: 2,
                    textDecoration: "none",
                  }}
                >
                  {cta.text} →
                </a>
                <div
                  style={{
                    marginTop: 32,
                    fontFamily: "Arial",
                    fontSize: 10,
                    fontWeight: 300,
                    letterSpacing: "0.14em",
                    color: "rgba(0,0,0,0.28)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  className="anim-fade-in"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <line x1="6" y1="0" x2="6" y2="10" stroke="rgba(0,0,0,0.28)" strokeWidth="1" />
                    <path d="M2 7 L6 11 L10 7" stroke="rgba(0,0,0,0.28)" strokeWidth="1" fill="none" />
                  </svg>
                  scroll down to start over
                </div>
                {/* spacer to enable scroll */}
                <div style={{ height: 200 }} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ChatBubble = ({ text, sent, effectivePersonal }: { text: string; sent: boolean; effectivePersonal: boolean }) => (
  <div
    className="anim-fade-up"
    style={{
      display: "flex",
      justifyContent: sent ? "flex-end" : "flex-start",
      marginBottom: 10,
    }}
  >
    <div
      style={{
        maxWidth: "70%",
        padding: sent ? "10px 16px" : "0",
        borderRadius: sent ? "12px 12px 2px 12px" : "0",
        background: sent ? "#ff4242" : "transparent",
        fontFamily: "Arial",
        fontWeight: 300,
        fontSize: 14,
        lineHeight: 1.6,
        color: sent ? "#fff" : effectivePersonal ? "#0a0a0a" : "rgba(255,255,255,0.85)",
      }}
    >
      {text}
    </div>
  </div>
);

const OptionLine = ({
  text, delay, effectivePersonal, onSelect,
}: { text: string; delay: number; effectivePersonal: boolean; onSelect: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const handleClick = () => {
    if (selected) return;
    setSelected(true);
    setTimeout(onSelect, 350);
  };

  const textColor = selected
    ? "#ff4242"
    : hovered
      ? effectivePersonal ? "#0a0a0a" : "#ffffff"
      : effectivePersonal ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)";
  const chevronColor = selected || hovered ? "#ff4242" : effectivePersonal ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)";

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.35s ease, transform 0.35s ease, color 0.5s ease`,
        display: "flex",
        alignItems: "baseline",
        gap: 10,
        marginBottom: 14,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span
        style={{
          fontFamily: "Arial",
          fontSize: 18,
          fontWeight: 200,
          color: chevronColor,
          transition: "color 0.5s",
          lineHeight: 1,
          minWidth: 14,
        }}
      >
        {">"}
      </span>
      <span
        style={{
          fontFamily: "Arial",
          fontSize: 18,
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: textColor,
          transition: "color 0.5s",
          lineHeight: 1.3,
        }}
      >
        {text}
      </span>
    </div>
  );
};
