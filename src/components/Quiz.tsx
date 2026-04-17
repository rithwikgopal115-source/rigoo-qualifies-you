import { useEffect, useRef, useState } from "react";
import { Placeholder } from "./Placeholder";
import { ASSETS, LOOMS, LINKS } from "@/lib/placeholders";
import { toast } from "sonner";

type Avatar = "freelancer" | "agency" | "cofounder" | "exploring";

const STEP1_OPTIONS: { key: Avatar; label: string }[] = [
  { key: "freelancer", label: "i'm looking for a freelancer" },
  { key: "agency", label: "i run an agency and need someone serious" },
  { key: "cofounder", label: "i'm building something and want a collaborator" },
  { key: "exploring", label: "just exploring" },
];

const STEP2: Record<Avatar, { question: string; options: string[] }> = {
  freelancer: {
    question: "what do you need?",
    options: ["content written", "a content system built", "AI automation", "copywriting and messaging", "something else"],
  },
  agency: {
    question: "what are you looking for?",
    options: ["someone who thinks, not just executes", "someone to own a function on my team", "copy and content muscle", "something else"],
  },
  cofounder: {
    question: "what brought you here?",
    options: ["want to think through something together", "checking if we're actually aligned", "i have something early and need someone to build with", "something else"],
  },
  exploring: { question: "", options: [] },
};

const STATUS_LINES = ["reading what you need...", "checking what rigoo can actually do...", "writing your assessment..."];

export const Quiz = ({ onAvatarChange }: { onAvatarChange: (a: Avatar | null) => void }) => {
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [subAnswer, setSubAnswer] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [aiText, setAiText] = useState("");
  const [statusIdx, setStatusIdx] = useState(0);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => onAvatarChange(avatar), [avatar, onAvatarChange]);

  useEffect(() => {
    if (!streaming) return;
    const t = setInterval(() => setStatusIdx((i) => (i + 1) % STATUS_LINES.length), 1400);
    return () => clearInterval(t);
  }, [streaming]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [avatar, subAnswer, submitted, aiText, done]);

  const handleSubmit = async () => {
    if (!avatar || (avatar !== "exploring" && !subAnswer) || !userInput.trim()) return;
    setSubmitted(true);
    setStreaming(true);
    setAiText("");

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/assess`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ avatar, subAnswer: subAnswer ?? "n/a", userInput }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Rate limit hit. Try again in a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted.");
        else toast.error("Something went wrong reaching the assistant.");
        setStreaming(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let streamDone = false;
      while (!streamDone) {
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
          if (json === "[DONE]") { streamDone = true; break; }
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
      setStreaming(false);
      setDone(true);
    } catch (e) {
      console.error(e);
      toast.error("Network error. Try again.");
      setStreaming(false);
    }
  };

  const ctaForAvatar = () => {
    if (avatar === "freelancer") return { label: "reply to my proposal on upwork", href: LINKS.upwork };
    if (avatar === "agency") return { label: "book a 30 minute call", href: LINKS.calendly };
    if (avatar === "cofounder") return { label: "message me on whatsapp", href: LINKS.whatsapp };
    return null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Step 1 */}
      <Bubble received>who are you here as?</Bubble>
      {!avatar ? (
        <OptionList
          options={STEP1_OPTIONS.map((o) => o.label)}
          onPick={(label) => setAvatar(STEP1_OPTIONS.find((o) => o.label === label)!.key)}
        />
      ) : (
        <Bubble sent>{STEP1_OPTIONS.find((o) => o.key === avatar)!.label}</Bubble>
      )}

      {/* Step 2 */}
      {avatar && avatar !== "exploring" && (
        <>
          <Bubble received>{STEP2[avatar].question}</Bubble>
          {!subAnswer ? (
            <OptionList options={STEP2[avatar].options} onPick={setSubAnswer} />
          ) : (
            <Bubble sent>{subAnswer}</Bubble>
          )}
        </>
      )}

      {/* Step 3 - text input */}
      {((avatar === "exploring") || (avatar && subAnswer)) && !submitted && (
        <div className="anim-fade-in-left space-y-2">
          <Bubble received>describe what you need</Bubble>
          <div className="glass-dark rounded-lg p-4">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="describe what you need"
              rows={4}
              className="w-full bg-transparent text-white/90 font-mono-display placeholder:text-white/30 outline-none resize-none"
            />
            <p className="text-xs text-white/40 mt-2">
              be specific if you can. the more real you are, the more useful this gets.
            </p>
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className="mt-4 px-6 py-2 bg-rigoo-accent text-white font-mono-display text-sm rounded-md hover:opacity-90 transition disabled:opacity-30"
            >
              show me
            </button>
          </div>
        </div>
      )}

      {submitted && <Bubble sent>{userInput}</Bubble>}

      {/* Step 4 - AI response */}
      {submitted && (
        <div className="anim-fade-in-left">
          {streaming && aiText.length === 0 && (
            <div className="flex items-center gap-3 text-white/60 font-mono-display text-sm">
              <div className="w-8 h-8 anim-breathe rounded-full bg-rigoo-accent/20 border border-rigoo-accent/50" />
              <span>{STATUS_LINES[statusIdx]}</span>
            </div>
          )}
          {aiText && (
            <div className="glass-dark rounded-lg p-5 font-mono-display text-rigoo-tint whitespace-pre-wrap leading-relaxed text-sm">
              {aiText}
              {streaming && <span className="inline-block w-2 h-4 bg-rigoo-accent ml-1 animate-pulse" />}
            </div>
          )}
        </div>
      )}

      {/* Step 5 - Loom */}
      {done && avatar && avatar !== "exploring" && (
        <div className="anim-fade-in-up space-y-3">
          {LOOMS[avatar] ? (
            <div className="aspect-video rounded-lg overflow-hidden border border-white/10">
              <iframe src={LOOMS[avatar]} allowFullScreen className="w-full h-full" />
            </div>
          ) : (
            <Placeholder filename={`${avatar}-loom-embed`} alt="loom" />
          )}
          <p className="italic text-white/50 text-sm">i recorded this specifically for you. watch before you decide.</p>
        </div>
      )}

      {/* Step 6 - CTA */}
      {done && ctaForAvatar() && (
        <div className="anim-fade-in-up">
          <a
            href={ctaForAvatar()!.href}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-3 bg-rigoo-accent text-white font-mono-display text-sm rounded-md hover:opacity-90 transition"
          >
            {ctaForAvatar()!.label}
          </a>
        </div>
      )}

      <div ref={scrollRef} />
    </div>
  );
};

const Bubble = ({ children, received, sent }: { children: React.ReactNode; received?: boolean; sent?: boolean }) => (
  <div className={`flex ${sent ? "justify-end" : "justify-start"} anim-fade-in-left`}>
    <div
      className={`max-w-[85%] px-4 py-3 rounded-2xl font-mono-display text-sm ${
        sent ? "bg-rigoo-accent text-white rounded-br-sm" : received ? "glass-dark text-white/90 rounded-bl-sm" : ""
      }`}
    >
      {children}
    </div>
  </div>
);

const OptionList = ({ options, onPick }: { options: string[]; onPick: (s: string) => void }) => {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      {options.map((opt, i) => (
        <button
          key={opt}
          disabled={!!picked}
          onClick={() => {
            setPicked(opt);
            setTimeout(() => onPick(opt), 700);
          }}
          style={{ animationDelay: `${i * 100}ms` }}
          className={`anim-fade-in-up glass-dark px-4 py-3 rounded-xl text-rigoo-tint font-mono-display text-sm text-left w-full max-w-[85%] transition red-glow ${
            picked === opt ? "anim-lock-blink bg-rigoo-accent/30 border-rigoo-accent" : ""
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};
