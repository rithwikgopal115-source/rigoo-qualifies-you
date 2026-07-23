import { useEffect, useState, useCallback } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { AboutAndContact } from "@/components/AboutAndContact";
import { LLMFAQSection } from "@/components/LLMFAQSection";
import { FloatingChat } from "@/components/FloatingChat";

const Index = () => {
  const [tab, setTab] = useState<Tab>("PROFESSIONAL");
  const [flowActivated, setFlowActivated] = useState(false);
  const [flowKey, setFlowKey] = useState(0);
  const isPersonal = tab === "PERSONAL";

  useEffect(() => {
    document.body.classList.toggle("personal-mode", isPersonal && !flowActivated);
    document.body.classList.toggle("flow-activated", flowActivated && !isPersonal);
  }, [isPersonal, flowActivated]);

  const handleTabSwitch = (t: Tab) => {
    setTab(t);
    setFlowActivated(false);
    setFlowKey((k) => k + 1);
  };

  const handleFlowActivated = useCallback(() => setFlowActivated(true), []);

  const handleFlowComplete = useCallback(() => {
    setFlowActivated(false);
    setFlowKey((k) => k + 1);
  }, []);

  return (
    <div
      className="bg-cover bg-center bg-fixed bg-no-repeat w-full"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: "url('/green rolling hills.png')",
        backgroundColor: "#000000",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-0"></div>

      {/* Navbar */}
      <div className="w-full h-20 flex items-center justify-between px-8 relative z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div></div>
        <div className="w-10 h-10 bg-black border border-white/30 text-white flex items-center justify-center font-serif font-bold text-xl rounded shadow-lg">
          R
        </div>
      </div>

      <main className="w-full max-w-[1400px] mx-auto px-6 pt-32 pb-16 z-10 flex flex-col justify-center">
        <HeroSection />
      </main>

      {/* Projects Showcase - Orange Background */}
      <ProjectsShowcase />

      {/* LLM FAQ Section */}
      <div className="w-full bg-black/90 backdrop-blur-md border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-24">
          <LLMFAQSection />
        </div>
      </div>

      {/* About & Contact */}
      <AboutAndContact />
      
      <FloatingChat />
    </div>
  );
};

export default Index;
