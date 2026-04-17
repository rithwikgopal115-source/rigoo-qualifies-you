import { useState } from "react";
import { Quiz } from "./Quiz";
import { WorkGrid } from "./WorkGrid";
import { Placeholder } from "./Placeholder";
import { ASSETS, LOOMS } from "@/lib/placeholders";

type Avatar = "freelancer" | "agency" | "cofounder" | "exploring" | null;

export const ProfessionalTab = () => {
  const [avatar, setAvatar] = useState<Avatar>(null);

  return (
    <div className="relative min-h-screen bg-black text-white anim-tab-cross">
      {/* bg layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ASSETS.bgDark ? (
          <img src={ASSETS.bgDark} alt="" className="w-full h-full object-cover opacity-50" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,68,68,0.08),transparent_60%)]" />
        )}
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-12">
          <h1 className="font-mono-display text-3xl md:text-5xl leading-tight">
            most portfolios are a résumé with a coat of paint.
            <br />
            <span className="text-rigoo-accent">this one qualifies you.</span>
          </h1>
          <p className="mt-4 text-white/60 text-base md:text-lg">pick who you are. the rest adjusts.</p>
        </section>

        {/* Quiz */}
        <section className="px-4 pb-20">
          <Quiz onAvatarChange={setAvatar} />
        </section>

        {/* Work Grid */}
        <WorkGrid avatar={avatar} />

        {/* Influence Accelerator */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="glass-dark rounded-lg border-l-4 border-l-rigoo-accent p-8 md:p-12">
            <h2 className="font-mono-display text-3xl md:text-4xl mb-2">Influence Accelerator</h2>
            <p className="text-white/70 mb-8">a content system. built for people who want their work to actually compound.</p>
            <div className="space-y-4 text-white/80 leading-relaxed text-sm md:text-base">
              <p>most creators have a distribution problem. not a content problem.</p>
              <p>they write decent stuff. it disappears. they post again. same result. the issue is not the content. it is that the content is not built on research, and it is not connected to a system that distributes and compounds.</p>
              <p>IA 3.0 fixes that. it starts with avatar research most agencies skip — conditions decks, problem chains, irrationality mapping. then it builds a content and distribution system on top of that research.</p>
              <p>i built it for myself first. then started building it for others.</p>
            </div>
            <div className="mt-8">
              {LOOMS.ia ? (
                <div className="aspect-video rounded-lg overflow-hidden border border-white/10">
                  <iframe src={LOOMS.ia} allowFullScreen className="w-full h-full" />
                </div>
              ) : (
                <Placeholder filename="ia-loom-embed" alt="ia loom" />
              )}
              <p className="text-white/50 italic text-sm mt-3">7 minutes. shows the full system.</p>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <div className="glass-dark rounded-lg overflow-hidden">
            <Placeholder src={ASSETS.whatsappReactions} filename="whatsapp-reactions.png" alt="reactions" aspect="aspect-[16/7]" />
          </div>
        </section>
      </div>
    </div>
  );
};
