import { Placeholder } from "./Placeholder";
import { ASSETS } from "@/lib/placeholders";

type Avatar = "freelancer" | "agency" | "cofounder" | "exploring" | null;

interface Card {
  src: string;
  filename: string;
  caption: string;
}

const FREELANCER: Card[] = [
  { src: ASSETS.emailSequence, filename: "email-sequence-sample.png", caption: "email sequence for an online coaching brand. the hook was one insight: bad sleep hits the same as 5 beers. that framing built the whole sequence — value email, story email, close." },
  { src: ASSETS.vslMansagar, filename: "vsl-framework-mansagar.png", caption: "B2C VSL for mansagar singh's fitness brand. lead, pitch, close. every section was mapped to one emotional state before a line of copy got written." },
  { src: ASSETS.conditionsDeckMansagar, filename: "conditions-deck-mansagar.png", caption: "the research that comes before the copy. 30+ false beliefs across three categories. that is what makes copy feel like it reads the person." },
  { src: ASSETS.whatsappReactions, filename: "whatsapp-reactions.png", caption: "what happens when the research is right." },
];

const AGENCY: Card[] = [
  { src: ASSETS.definingAvatarSlide, filename: "defining-avatar-slide.png", caption: "conditions deck + problem chain + irrationality mapping = a profile specific enough to write directly from. this is how research becomes strategy." },
  { src: ASSETS.problemChain, filename: "problem-chain-layout.png", caption: "the surface want is \"speak better english.\" the real chain is safety, belonging, status. that is what the copy has to address. the problem chain finds it." },
  { src: ASSETS.conditionsDeckMansagar, filename: "conditions-deck-mansagar.png", caption: "30+ false beliefs, three categories: method, internal, external. this is the difference between copy that informs and copy that converts." },
  { src: ASSETS.creativeBriefIcp, filename: "creative-brief-icp.png", caption: "ICP document for mansagar singh fitness. full psychographic, pain mapped to product, cultural context. written before any content piece, not after." },
  { src: ASSETS.automate90Crm, filename: "automate90-crm-screenshot.png", caption: "built a CRM to run a 50-call/day outreach operation. pipeline, client intel, process logs. nothing off the shelf did exactly what was needed, so i built it." },
];

const COFOUNDER: Card[] = [
  { src: ASSETS.automate90Pipeline, filename: "automate90-pipeline.png", caption: "automate 90 — cold call to close. built the whole system: crm, delivery workflow, scripts, fup. running it solo rn." },
  { src: ASSETS.automate90Crm, filename: "automate90-crm-screenshot.png", caption: "built my own crm. not to flex. paying for tools i can build myself is an l." },
  { src: ASSETS.problemChain, filename: "problem-chain-layout.png", caption: "ia 3.0 — built it before anyone asked. this is the research layer. the distribution system sits on top of it." },
  { src: ASSETS.notionLogs, filename: "notion-workday-logs.png", caption: "every workday logged since august 2024. not for the aesthetic." },
];

export const WorkGrid = ({ avatar }: { avatar: Avatar }) => {
  let cards = AGENCY;
  let heading = "how i think, not just what i've done";
  if (avatar === "freelancer") { cards = FREELANCER; heading = "relevant work"; }
  else if (avatar === "cofounder") { cards = COFOUNDER; heading = "what i've actually shipped"; }
  else if (avatar === "agency") { cards = AGENCY; heading = "how i think, not just what i've done"; }
  else if (!avatar || avatar === "exploring") { cards = AGENCY; heading = "selected work"; }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <h2 className="font-mono-display text-2xl md:text-3xl text-white mb-8">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <div key={c.filename} className="glass-dark rounded-lg overflow-hidden transition red-glow">
            <Placeholder src={c.src} filename={c.filename} alt={c.filename} aspect="aspect-video" />
            <p className="p-4 text-sm text-white/70 leading-relaxed">{c.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
