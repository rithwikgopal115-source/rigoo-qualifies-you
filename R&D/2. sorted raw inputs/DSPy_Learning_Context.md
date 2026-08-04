# DSPy Learning Session — Context & Prompt

---

## CONTEXT: What I Am Building

I am building a neurosymbolic, node-based AI marketing system called the **Influence Accelerator**. It coordinates three core agents — a Research Agent, a Marketing Agent, and a Writing Agent — plus a Creator Voice Agent that has a built-in Humanizer module. The Humanizer looks at the token-prediction patterns of AI writing and deliberately disrupts them to produce genuinely human-sounding output.

The system works in nodes. Each node performs a specific function and passes structured output to the next:

- **Node 1 — Audience Awareness**: Identifies the audience's stage of awareness (problem-unaware through most-aware). This requires a global MD knowledge base defining what each stage is, how to approach it, and how it maps to different niches and platforms.
- **Node 2 — Platform & Format Constraints**: Maps the awareness stage to the right platform, format, and structural constraints.
- **Node 3 — Funnel Context & Brand Voice**: Ingests the creator's existing writing, personality, and taste to produce a brand-matched output.
- **Node 4 — Lead & Angle Selection**: Generates multiple leads and angles, then selects the best one. This is the highest-judgment node. It requires deep reasoning from Layer 2.
- **Node 5 — Writing Agent**: Takes all the context from nodes 1–4 and writes the actual copy draft using a high-quality model (e.g., Claude Sonnet).

**Layer 2 (The Reasoning Engine)** sits on top of this MVP. It is a database of the mental models and thinking patterns of the greatest marketers — drawn from human sociality research spanning 16 levels from Evolutionary Foundations (most concrete/micro) through Biology, Affective Systems, Neuroscience, Cognitive Science, Psychology, Friendship, Attachment, Social Dynamics, Community, Communication, Anthropology, Sociology, Political Psychology, Religion & Meaning, and Philosophy & Human Flourishing (most abstract/macro).

The system's final output is:
1. A **Marketing Strategy** (from the Marketing Agent)
2. A **Copy Draft** (from the Writing Agent)

**Why DSPy?** I need to understand DSPy before I can properly design the node-based architecture, because DSPy changes *what a node actually is*. Instead of writing massive brittle prompts, DSPy lets you define the inputs/outputs of a node (Signatures), the reasoning pattern (Modules like ChainOfThought), and a quality metric (LLM-as-a-Judge). Its Compiler/Optimizer then auto-discovers the best way to instruct the model to hit that metric — bridging deterministic node logic with recursive, learned judgment.

---

## REFERENCE DOCUMENTS

When I share files or ask you to refer to documents, these are the key ones:

1. **IA System Building Notes (For MVP) — Aug 1.pdf** ← Most important. My personal notes on everything.
2. **Influence Accelerator 3.0 Overview.pdf** ← The top-level system overview.
3. **user_vision_and_execution_plan.md** ← My exact synthesis of the architecture and next steps.
4. **implementation_plan.md** ← The full Layer 1 MVP build spec (LangGraph + DSPy).
5. **dspy_architecture_mapping.md** ← Initial mapping of DSPy concepts to this system.

---

## THE LEARNING PROMPT

I want to learn **DSPy** from first principles, building up to practical tactics, specifically so I can architect and build the node-based marketing system described above.

**Rules for how you teach me:**

- **One concept per response, 50–100 words. No walls of text. Stop and wait — I'll say "next" when I'm ready to continue.**
- **Think in systems.** Every concept you explain should map to: Input (what goes in), Process (what happens to it), Output (what comes out), Environment (external factors you don't control), Feedback (how you know if it worked). Not every concept needs all five, but default to this frame.
- **Define terms inline**, in plain words, without breaking flow. If you use a term I might not know, explain it briefly in the same sentence or the next one. Don't make me ask "what is X?" separately. Weave it in naturally.
- **Always tie the concept back to this system.** After explaining any DSPy concept, give me one sentence showing how it applies directly to one of my nodes (Audience Awareness → Platform Constraints → Brand Voice → Lead/Angle Selection → Writing Agent).
- **Side notes.** If I say "side note: [thought]," treat it as something to hold in working memory for this session, not a full topic to teach right now. Acknowledge briefly, then continue or return to the current topic. Collect these for the final summary.
- **Mastery checkpoint.** Periodically (and any time I ask), tell me plainly whether I've reached baseline working mastery yet, or what's left before I have full input → process → output coverage of DSPy.
- **Ending the session.** When I say "learning session finished," give me a final wrap-up with these sections:
  - *System overview* — the "big answer" you'd normally lead with on day one: what DSPy is, how it works end to end, and key nuances, now that I have the vocabulary to actually absorb it
  - *Topics covered* — numbered list of every concept taught this session, one line each
  - *Side notes* — everything I flagged mid-session, listed together
  - *What to learn next* — the logical next layer beyond this session's scope

**Begin with the single most foundational concept in DSPy — the one that, if you don't understand it, nothing else makes sense.**
