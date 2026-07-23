import { useState, useEffect } from "react";

export const HeroSection = () => {
  const words = ["AI automations", "software", "agentic solutions"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-center relative">
      <div className="max-w-4xl" style={{ padding: "32px 0 0 0" }}>
        <div
          className="font-serif"
          style={{
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            marginBottom: 24,
            textShadow: "0 0 40px rgba(255,255,255,0.4), 0 0 10px rgba(255,255,255,0.2)",
          }}
        >
          <div style={{ opacity: 0, animation: 'fadeSlideUp 1s ease forwards', animationDelay: '0.2s' }}>
            You build complex agencies and ERPs.
          </div>
          <div style={{ opacity: 0, animation: 'fadeSlideUp 1s ease forwards', animationDelay: '1.2s', marginTop: '12px' }}>
            I build the <span key={wordIndex} className="inline-block font-bold text-white anim-fade-up" style={{ borderBottom: "4px solid #ff7a00" }}>{words[wordIndex]}</span> that make them scale.
          </div>
        </div>
        
        <div
          style={{
            opacity: 0,
            animation: 'fadeSlideUp 1s ease forwards',
            animationDelay: '2.2s',
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: "clamp(16px, 1.5vw, 20px)",
            fontWeight: 300,
            color: "rgba(255, 255, 255, 0.9)",
            lineHeight: 1.6,
            marginBottom: 48,
            maxWidth: "800px",
            textShadow: "0 0 20px rgba(255,255,255,0.3)",
          }}
        >
          I'm an 18-year-old generalist obsessed with systems thinking. I don't just execute tasks; I architect solutions for cash flow and operational bottlenecks.
        </div>
        
        <div style={{ opacity: 0, animation: 'fadeSlideUp 1s ease forwards', animationDelay: '3.2s' }}>
          <button
            onClick={() => {
              const el = document.getElementById("projects-showcase");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            style={{
              fontFamily: "Inter, Arial, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              padding: "16px 32px",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(255,255,255,0.1)",
            }}
          >
            See How
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
