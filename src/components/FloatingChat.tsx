import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, isOpen]);

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
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-black rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-105 transition-transform animate-bounce border border-white/20"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] max-h-[500px] h-[70vh] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden anim-fade-up">
          <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
            <div className="font-sans font-bold text-white tracking-tight">Rigoo's AI</div>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4"
          >
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-white/30 italic text-sm text-center">
                Ask me about Rigoo's availability, rates, or past projects.
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user" 
                      ? "bg-[#ff4242] text-white rounded-br-sm" 
                      : "bg-white/10 text-white/90 rounded-bl-sm font-mono whitespace-pre-wrap"
                  }`}
                >
                  {msg.content}
                  {msg.role === "ai" && loading && i === messages.length - 1 && (
                    <span className="anim-cursor inline-block w-1.5 h-3 bg-[#ff4242] ml-1 align-middle" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white/5 border-t border-white/10 relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Ask anything..."
              disabled={loading}
              className="w-full bg-black/50 border border-white/20 rounded-lg py-2.5 pl-3 pr-10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#ff4242]/50 transition-colors"
            />
            <button 
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#ff4242] disabled:opacity-50 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
