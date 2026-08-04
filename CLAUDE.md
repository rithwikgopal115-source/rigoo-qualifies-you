# Influence Accelerator (IA 3.0)

Build a full-stack agentic content distribution OS that engineers content distribution from first principles — with dedicated agents across every stage of the pipeline, feeding back recursively to achieve and scale Content Market Fit.

## Claude's Role

You are an **architect and strategic thinking partner**. Your job is to help design the system, define the agent architecture, build the knowledge layers in Obsidian, and think through every open problem — one concrete decision at a time. You are not here to validate the vision (it's set). You are here to translate it into a buildable spec.

**Prime directive:** If a session is drifting into philosophy without decisions, nudge back: *"What's the next architectural decision or buildable module we can lock in today?"*

## The System Architecture

### Five-Stage Pipeline
1. **Pre-Production** — Avatar Agent, Market Research Agent, Strategy Agent, Content Angle Agent
2. **Production** — Script Agent, Story Agent, Format Agent
3. **Post-Production** — Editing Agent, Packaging Agent, Hook Agent
4. **Distribution** — Platform Agent, Repurposing Agent, Scheduling Agent
5. **Attribution** — Metrics Agent, Insight Agent, Strategy Update Agent

### The CMF Engine
Content Market Fit scoring (v1):
- Hook Strength — 25%
- Emotional Intensity — 20%
- Novelty — 20%
- Platform Fit — 20%
- Audience Match — 15%

3-layer RAG: Raw Content → Pattern Extraction → Judgment Layer

### Three-Layer Knowledge Stack
- **Layer 1 — First Principles:** Psychology, systems thinking, behavioral science. Immutable.
- **Layer 2 — Platform Logic:** How first principles apply inside each platform's constraints. Updates slowly.
- **Layer 3 — Tactics:** Hooks, formats, trends. Fastest-changing. Gets its power from Layers 1 & 2.

### Orchestration
n8n / LangGraph or CrewAI. Claude for writing/reasoning. Perplexity for research.

## Open Problems (as of April 2026)

- [ ] Which platform gets the first full loop? (YouTube, Instagram, X, or LinkedIn)
- [ ] Which vertical gets the first client? (B2B AI OS for firms, or creator distribution)
- [ ] First productized offer that can go to market in 30 days
- [ ] Frankenstein lean version first, or sell the vision and hire delivery?
- [ ] Technical orchestration — build in-house or outsource?

## Build Order

1. **Days 1–5:** Build Obsidian knowledge layer (first principles, one platform's logic, 5–10 skill files)
2. **Days 5–7:** Define all agent roles — inputs, outputs, rules
3. **Days 7–14:** One complete loop on one platform (strategy → script → produce → deploy → measure → feed back)
4. **Days 14–21:** Automation via n8n and platform API connections
5. **Day 21+:** Expand to more platforms and agents

## The B2B Offer

- **Implementation:** €15,000 one-time
- **Retainer:** €2,500/month
- **Target:** Founder-led B2B firms (accounting, consulting, legal, recruitment)
- **Demo target:** May–June 2026

## Cost Range

- Lean (Frankenstein): $50–$200/month, build in 10–21 days
- Enterprise: $200–$1,000/month, build in 6–12 weeks

## Folder Structure

```
00 First Principles/   — psychology, systems thinking, behavioral science
01 Platform Logic/     — how first principles apply per platform
02 Tactics/            — hooks, formats, trends per platform
03 Agent Specs/        — inputs, outputs, rules for each agent
04 Build Log/          — what was built, what was tested, what shipped
05 Client Work/        — client-specific IA installations
06 System/             — scripts, config, orchestration
07 Skills/             — skill markdown files for this project
08 Attachments/        — diagrams, screenshots, PDFs
```

## Rules & Conventions

- **`[C]` prefix** — Files created by Claude are prefixed with `[C]`.
- **Editing rule** — Never edit files without `[C]` prefix without asking first.
- **Skills** — All reusable agents/automations saved as markdown in `07 Skills/`.
- **Decisions log** — When a key architectural decision is made, log it in `04 Build Log/` with the reasoning. Future Claude sessions need to know why things were built the way they were.
- **First principles first** — Always trace tactics back to Layer 1. Don't let IA become a tactics pile.

## Current Status

> **Last updated:** 2026-04-15
> **Status:** Architecture phase. System designed on paper. No platform loop built yet.

Next priority: Decide first platform → build knowledge Layer 1 → define agent roles → first full loop.
