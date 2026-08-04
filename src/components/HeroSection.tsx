import { useState, useEffect } from "react";

export const HeroSection = () => {
  const firstWords = ["AI automations", "software", "agentic solutions"];
  const secondWords = ["safe", "scalable", "personalized", "high touch", "seamless"];
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);
  const [isEyebrow, setIsEyebrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEyebrow(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setFirstIndex((prev) => (prev + 1) % firstWords.length);
        setSecondIndex((prev) => (prev + 1) % secondWords.length);
      }, 2500);
    }, 4000);
    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center relative min-h-[60vh] py-12">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        
        <div 
          className={`font-sans font-bold transition-all duration-1000 ease-in-out ${
            isEyebrow 
              ? "uppercase tracking-[0.2em] text-white/70 mb-6" 
              : "tracking-tight text-white mb-0"
          }`}
          style={{
            fontSize: isEyebrow ? "clamp(12px, 1.2vw, 16px)" : "clamp(36px, 5vw, 68px)",
            opacity: 0, 
            animation: 'fadeSlideUp 1s ease forwards', 
            animationDelay: '0.2s',
            textShadow: isEyebrow ? "none" : "0 0 40px rgba(255,255,255,0.3)",
          }}
        >
          You build complex agencies and ERPs.
        </div>
        
        <h1
          className="font-sans font-bold tracking-tight text-white w-full"
          style={{
            fontSize: "clamp(36px, 5vw, 68px)",
            lineHeight: 1.1,
            marginBottom: "32px",
            textShadow: "0 0 40px rgba(255,255,255,0.3)",
          }}
        >
          <div style={{ opacity: 0, animation: 'fadeSlideUp 1s ease forwards', animationDelay: '3.0s' }}>
            I build the <span key={`first-${firstIndex}`} className="inline-block text-white/90 anim-fade-up px-2">{firstWords[firstIndex]}</span><br/> that make them <span key={`second-${secondIndex}`} className="inline-block text-white/90 anim-fade-up px-2">{secondWords[secondIndex]}</span>.
          </div>
        </h1>
        
        <p
          className="font-sans"
          style={{
            opacity: 0,
            animation: 'fadeSlideUp 1s ease forwards',
            animationDelay: '4.0s',
            fontSize: "clamp(16px, 1.5vw, 20px)",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.9)",
            lineHeight: 1.6,
            marginBottom: "48px",
            maxWidth: "700px",
          }}
        >
          I'm an 18-year-old generalist obsessed with systems thinking. I don't just execute tasks; I architect solutions for cash flow and operational bottlenecks.
        </p>
        
        <div style={{ opacity: 0, animation: 'fadeSlideUp 1s ease forwards', animationDelay: '4.5s' }}>
          <button
            onClick={() => {
              const el = document.getElementById("projects-showcase");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center transition-all hover:scale-105"
            style={{
              fontFamily: "Inter, Arial, sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              background: "#0a0a0a",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "9999px",
              padding: "14px 32px",
              cursor: "pointer",
              boxShadow: "0 4px 14px 0 rgba(0,0,0,0.39)",
            }}
          >
            See How &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
};
