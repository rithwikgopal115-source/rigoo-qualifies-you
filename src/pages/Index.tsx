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
          padding: "110px clamp(16px, 4vw, 96px) 0",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {tab === "PROFESSIONAL" ? (
            <div className="pro-layout" style={{ display: "flex", gap: 48, flex: 1, overflow: "hidden" }}>
              {/* Left: conversational flow */}
              <div
                className="flow-col"
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
                className="gallery-col"
                style={{
                  flex: 1,
                  overflow: "hidden",
                  opacity: flowActivated ? 0 : 1,
                  transform: flowActivated ? "translateX(24px)" : "translateX(0)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                  pointerEvents: flowActivated ? "none" : "auto",
                }}
              >
                {/* Mobile-only proof of work heading */}
                <div
                  className="md:hidden"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    paddingBottom: 16,
                    paddingTop: 8,
                    marginBottom: 16,
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ width: 6, height: 6, background: "#ff4242", flexShrink: 0 }} />
                  <div
                    style={{
                      fontFamily: "Arial",
                      fontSize: 10,
                      fontWeight: 300,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    proof of work
                  </div>
                </div>
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
