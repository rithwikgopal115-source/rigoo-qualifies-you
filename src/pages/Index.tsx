import { useEffect, useState, useCallback } from "react";
import { TabBar, type Tab } from "@/components/TabBar";
import { ConversationalFlow } from "@/components/ConversationalFlow";
import { MetroGallery } from "@/components/MetroGallery";
import { PersonalTab } from "@/components/PersonalTab";

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

  const bgColor = flowActivated ? "#f0f0f0" : isPersonal ? "#ffffff" : "#000000";

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: bgColor,
        transition: "background 0.9s ease",
        overflow: "hidden",
      }}
    >
      <TabBar tab={tab} onSwitch={handleTabSwitch} isPersonal={isPersonal} flowActivated={flowActivated} />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "110px clamp(28px, 6vw, 96px) 0",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {tab === "PROFESSIONAL" ? (
          <div style={{ display: "flex", gap: 48, flex: 1, overflow: "hidden" }}>
            {/* Left: conversational flow */}
            <div
              style={{
                flex: "0 0 440px",
                maxWidth: 480,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <ConversationalFlow
                key={flowKey}
                flowActivated={flowActivated}
                onFlowActivated={handleFlowActivated}
                onFlowComplete={handleFlowComplete}
              />
            </div>

            {/* Right: metro gallery, fades when flow activated */}
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                opacity: flowActivated ? 0 : 1,
                transform: flowActivated ? "translateX(24px)" : "translateX(0)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                pointerEvents: flowActivated ? "none" : "auto",
              }}
            >
              <MetroGallery />
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, overflow: "auto", maxWidth: 720, margin: "0 auto", width: "100%" }}>
            <PersonalTab />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
