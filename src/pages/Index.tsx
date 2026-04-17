import { useState } from "react";
import { ProfessionalTab } from "@/components/ProfessionalTab";
import { PersonalTab } from "@/components/PersonalTab";
import { ASSETS } from "@/lib/placeholders";

type Tab = "professional" | "personal";

const Index = () => {
  const [tab, setTab] = useState<Tab>("professional");
  const isDark = tab === "professional";

  return (
    <div className="min-h-screen">
      {/* Sticky tab bar */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
          isDark ? "bg-black/70 border-b border-white/10" : "bg-white/70 border-b border-black/10"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {ASSETS.logo ? (
              <img src={ASSETS.logo} alt="rigorawmedia" className="h-6" />
            ) : (
              <span className={`font-mono-display text-sm ${isDark ? "text-white" : "text-black"}`}>
                rigoraw<span className="text-rigoo-accent">media</span>
              </span>
            )}
          </div>
          <nav className="flex gap-6">
            {(["professional", "personal"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative font-mono-display text-xs uppercase tracking-wider py-4 transition ${
                  tab === t
                    ? isDark ? "text-white" : "text-black"
                    : isDark ? "text-white/40 hover:text-white/70" : "text-black/40 hover:text-black/70"
                }`}
              >
                {t}
                {tab === t && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-rigoo-accent" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main key={tab}>{tab === "professional" ? <ProfessionalTab /> : <PersonalTab />}</main>
    </div>
  );
};

export default Index;
