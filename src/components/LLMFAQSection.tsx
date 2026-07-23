import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const LLMFAQSection = () => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

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
        body: JSON.stringify({ avatar: "other", subAnswer: "faq", userInput: userText }),
      });

      if (!resp.ok || !resp.body) {
        toast.error("Something went wrong with the AI.");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;
      let aiResponse = "";

      setMessages((prev) => [...prev, { role: "ai", content: "" }]);

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
            if (c) {
              aiResponse += c;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = aiResponse;
                return newMessages;
              });
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white min-h-[60vh] py-24 px-6 md:px-12 flex justify-center border-t border-black/10" style={{ position: "relative", zIndex: 10 }}>
      <div className="max-w-3xl w-full flex flex-col">
        <h2 className="font-sans font-bold tracking-tight text-4xl md:text-5xl text-black mb-4">Interrogate my AI.</h2>
        <p className="font-sans text-black/60 mb-12">Ask it anything about my skills, availability, or process. It's built to be honest.</p>
        
        <div 
          ref={scrollRef}
          className="flex-1 min-h-[300px] max-h-[500px] overflow-y-auto border border-black/10 bg-black/5 backdrop-blur-md rounded-2xl p-6 mb-6"
        >
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-black/40 italic">
              Try asking: "What is your tech stack?" or "Are you available for freelance?"
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`mb-6 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div 
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm md:text-base ${
                  msg.role === "user" 
                    ? "bg-black text-white rounded-br-sm shadow-md" 
                    : "bg-black/5 border border-black/5 text-black/90 rounded-bl-sm font-mono whitespace-pre-wrap"
                }`}
              >
                {msg.content}
                {msg.role === "ai" && loading && i === messages.length - 1 && (
                  <span className="anim-cursor inline-block w-2 h-4 bg-black ml-1 align-middle" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type your question..."
            disabled={loading}
            className="w-full bg-black/5 border border-black/20 rounded-xl py-4 pl-4 pr-16 text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
          />
          <button 
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black rounded-lg text-white disabled:opacity-50 transition-opacity hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
