import { Placeholder } from "./Placeholder";
import { ASSETS } from "@/lib/placeholders";

export const PersonalTab = () => {
  return (
    <div className="relative min-h-screen bg-white text-[#111] anim-tab-cross">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ASSETS.bgLight ? (
          <img src={ASSETS.bgLight} alt="" className="w-full h-full object-cover opacity-50" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,68,68,0.06),transparent_60%)]" />
        )}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 space-y-16">
        {/* Hero */}
        <section>
          <h1 className="font-mono-display text-5xl md:text-6xl mb-6">hey.</h1>
          <p className="text-lg leading-relaxed">
            i'm rigoo. 18. kerala, india.<br />
            dropped out because i couldn't watch myself walk a path i didn't pick.
          </p>
        </section>

        {/* Photo */}
        <section>
          <div className="rounded-lg overflow-hidden glass-light">
            <Placeholder src={ASSETS.personalPhoto} filename="rigoo-photo.jpg" alt="rigoo" aspect="aspect-[4/5]" variant="light" />
          </div>
        </section>

        {/* Story */}
        <section className="space-y-5 text-base leading-relaxed">
          <h2 className="font-mono-display text-2xl mb-4">what i'm actually doing</h2>
          <p>i write copy grounded in psychology. i build content systems that run without me watching them. i automate the parts that don't need a human.</p>
          <p>the thing i keep coming back to: most smart people are operating way below their actual capacity. it is almost never a talent problem. it is a systems problem.</p>
          <p>right now i am working on three things.</p>
          <p><strong>automate 90.</strong> selling websites to local businesses. not glamorous. it funds everything else. real calls, real clients, real cash.</p>
          <p><strong>IA 3.0.</strong> an AI-powered content architecture i built before anyone asked me to. the kind of system agencies charge 10k to set up. i needed it, so i built it.</p>
          <p><strong>this portfolio.</strong> because i was spending three hours on discovery calls explaining what i do. now the site does that.</p>

          <hr className="border-black/10 my-8" />

          <h2 className="font-mono-display text-2xl mb-4">the honest part</h2>
          <p>i read too much and sometimes theorize instead of shipping. i am better at architecture than operations. i am 18, and some of what i think i know will look different in three years.</p>
          <p>ads are not mine right now. seo either. big team management, no.</p>
          <p>what i am actually good at: seeing how things connect before most people notice. writing copy that moves people. building systems that work without me watching them. finding product-market fit by feel.</p>

          <hr className="border-black/10 my-8" />

          <p>if you want to build something real and need someone already in motion, message me.</p>
        </section>

        {/* Diligence */}
        <section>
          <h2 className="font-mono-display text-2xl mb-6">this is what showing up looks like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-light rounded-lg overflow-hidden">
              <Placeholder src={ASSETS.notionLogs} filename="notion-workday-logs.png" alt="notion" variant="light" />
              <p className="p-3 text-sm text-black/70">every workday logged. august 2024 to now.</p>
            </div>
            <div className="glass-light rounded-lg overflow-hidden">
              <Placeholder src={ASSETS.tallyNotebook} filename="tally-notebook.png" alt="tally" variant="light" />
              <p className="p-3 text-sm text-black/70">before notion. still counts.</p>
            </div>
          </div>
        </section>

        {/* T-Shape */}
        <section>
          <h2 className="font-mono-display text-2xl mb-6">what i go deep on vs what i touch</h2>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-black/50 mb-2 font-mono-display">deep</p>
              <div className="flex flex-wrap gap-2">
                {["copywriting", "avatar research", "AI systems", "content strategy"].map((s) => (
                  <span key={s} className="px-3 py-2 bg-rigoo-accent text-white font-mono-display text-sm rounded">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-black/50 mb-2 font-mono-display">broad</p>
              <div className="flex flex-wrap gap-2">
                {["brand", "offer design", "email", "automation", "psychology"].map((s) => (
                  <span key={s} className="px-3 py-2 glass-light font-mono-display text-sm rounded">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
