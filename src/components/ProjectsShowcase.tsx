import { useState } from "react";

export const ProjectsShowcase = () => {
  return (
    <div id="projects-showcase" className="w-full bg-[#000000] py-24 px-6 md:px-12 relative z-10 text-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-16 md:gap-24 relative z-10">
        
        {/* Intro */}
        <div className="anim-fade-up max-w-3xl text-center md:text-left mx-auto md:mx-0">
          <h2 className="font-sans text-4xl md:text-5xl mb-6 font-bold tracking-tight text-white">Systemic Leverage</h2>
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-white/90">
            The gap between a good agency and a great one is systemic leverage. I build the tools, dashboards, and AI agents that give you that leverage.
          </p>
        </div>

        {/* Project 1: Builder's House */}
        <div className="anim-fade-up flex flex-col md:flex-row gap-12 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sticky top-24 z-10">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-sans text-4xl font-bold tracking-tight mb-4 text-black">Builder's House</h3>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest border border-black/20 rounded-full px-3 py-1 bg-black/5 text-black">Community Platform</span>
            </div>
            <h4 className="font-bold font-sans text-lg mb-2 text-black/90">The Problem</h4>
            <p className="text-black/80 mb-6 leading-relaxed font-sans">
              The AI industry moves at a breakneck speed. It's overwhelming to learn and implement without getting distracted by the hype cycle.
            </p>
            <h4 className="font-bold font-sans text-lg mb-2 text-black/90">The Reality</h4>
            <p className="text-black/80 mb-8 leading-relaxed font-mono bg-black/5 p-4 rounded-lg border border-black/10">
              56% of CEOs report no AI ROI. This channel-based Slack + Skool + Claude-like community is here to find the 44% that DOES PRODUCE ROI and execute on it faster than the market.
            </p>
            <a 
              href="https://builders-house-collective.vercel.app/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center transition-all hover:scale-105 w-max"
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
              See Now &rsaquo;
            </a>
          </div>
          <div className="flex-1 relative aspect-video bg-black/5 rounded-xl overflow-hidden shadow-inner border border-black/5">
            <iframe 
              src="https://www.youtube.com/embed/whslTUyfRsw?si=2sxUSMYtIn995Yix" 
              title="Builder's House Video"
              className="w-full h-full absolute inset-0"
              allowFullScreen
            />
          </div>
        </div>

        {/* Project 2: LEDGR */}
        <div className="anim-fade-up flex flex-col md:flex-row-reverse gap-12 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sticky top-32 z-20">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-sans text-4xl font-bold tracking-tight mb-4 text-black">LEDGR</h3>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest border border-black/20 rounded-full px-3 py-1 bg-black/5 text-black">Finance Dashboard</span>
            </div>
            <h4 className="font-bold font-sans text-lg mb-2 text-black/90">The Problem</h4>
            <p className="text-black/80 mb-6 leading-relaxed font-sans">
              Agency cash flow and financial data are often scattered across spreadsheets, making real-time decision-making impossible.
            </p>
            <h4 className="font-bold font-sans text-lg mb-2 text-black/90">The Reality</h4>
            <p className="text-black/80 mb-8 leading-relaxed font-mono bg-black/5 p-4 rounded-lg border border-black/10">
              70% of agency owners run their business on vibes and scattered spreadsheets. LEDGR centralizes that into 1 dashboard. It transforms raw data into clear, actionable insights—the exact internal tooling ERP clients need.
            </p>
          </div>
          <div className="flex-1 relative aspect-square md:aspect-[4/3] bg-white rounded-xl shadow-inner border border-black/10 p-2 flex items-center justify-center">
            <ImageCollage 
              images={[
                "/Screenshot 2026-07-23 181518.png",
                "/Screenshot 2026-07-23 181529.png",
                "/Screenshot 2026-07-23 181542.png",
                "/Screenshot 2026-07-23 181552.png"
              ]}
            />
          </div>
        </div>

        {/* Project 3: Automate 90 */}
        <div className="anim-fade-up flex flex-col md:flex-row gap-12 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sticky top-40 z-30">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-sans text-4xl font-bold tracking-tight mb-4 text-black">Automate 90</h3>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest border border-black/20 rounded-full px-3 py-1 bg-black/5 text-black">Automated CRM & Pipeline</span>
            </div>
            <h4 className="font-bold font-sans text-lg mb-2 text-black/90">The Problem</h4>
            <p className="text-black/80 mb-6 leading-relaxed font-sans">
              High-volume operations (like managing 50+ cold calls a day) create massive bottlenecks and lead to dropped balls when handled manually.
            </p>
            <h4 className="font-bold font-sans text-lg mb-2 text-black/90">The Reality</h4>
            <p className="text-black/80 mb-8 leading-relaxed font-mono bg-black/5 p-4 rounded-lg border border-black/10">
              Saves approximately $500 in operational costs and reduces the time to generate a prospect demo site from 30 minutes down to just 10. Run entirely on headless browser, Python, and JS.
            </p>
            <a 
              href="https://drive.google.com/drive/u/3/folders/1woIKl3v88-NQ1pYg4UCKP15weDn2I9PD" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center transition-all hover:scale-105 w-max"
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
              View Setup Architecture &rsaquo;
            </a>
          </div>
          <div className="flex-1 relative aspect-video bg-black/5 rounded-xl overflow-hidden shadow-inner border border-black/5">
            <iframe 
              src="https://www.youtube.com/embed/NSOGbAH1ZTs" 
              title="Automate 90 Video"
              className="w-full h-full absolute inset-0"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </div>
  );
};

const ImageCollage = ({ images }: { images: string[] }) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-8 overflow-hidden">
      {images.map((img, i) => {
        const transforms = [
          "translate(-15%, -15%) rotate(-6deg)",
          "translate(15%, -5%) rotate(8deg)",
          "translate(-5%, 15%) rotate(-3deg)",
          "translate(10%, 20%) rotate(5deg)"
        ];
        return (
          <img 
            key={i}
            src={img} 
            alt="Dashboard Screenshot" 
            className="absolute rounded-lg border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-110 hover:z-20 cursor-pointer"
            style={{ 
              width: "60%", 
              height: "auto",
              transform: transforms[i % transforms.length],
              zIndex: i + 1
            }}
          />
        );
      })}
    </div>
  );
};
