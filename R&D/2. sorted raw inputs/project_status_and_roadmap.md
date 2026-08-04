# Influence Accelerator — Status & Project Roadmap

**Legend:**
- 🟢 **[GREEN - DONE]**: Decided, resolved, or completed.
- 🟡 **[YELLOW - DOING]**: Currently in progress / implementation stage.
- 🔴 **[RED - NOT DONE]**: Scheduled for future layers or post-MVP testing.

---

## Why the MVP Agent Must Be Built First

We are building the first layer MVP first. We must prove that an AI can actually extract visceral market data and write high-converting copy before adding any further complexity on top.

| Task | Status | Summary |
|------|--------|---------|
| **Task 1 — Data Ingestion** | 🟢 DONE | Built the Python daemon to automatically slice raw transcripts into dense chunks. You cannot process information if the system is drowning in noise. We fixed the data flow first. |
| **Task 2 — The Visual Matrix** | 🟢 DONE | Built the live Excalidraw integration. We needed a structural map to visualize the logic before we tried to execute it. |
| **Task 3 — The MVP Agent** | 🟡 DOING | Building the Deterministic Node Harness on LangGraph + DSPy (Onboarding Agent, Research Agent, Writing Agent, LLM-as-a-Judge quality gate). |
| **Task 4 — Stress Testing** | 🔴 NOT DONE | Scheduled after the Layer 1 MVP build is verified. We will hunt for failure points, patch leaks, stabilize, and then advance to Layer 2 (Reflexion memory store) and Layer 3 (Teacher-Student Distillation). |

---

## Debates & Resolutions

### 1.1 — Symbolic AI vs. Neural AI

**Charis's Position:** AI needs recursive, instinct-driven pattern recognition (RLHF) and a relativistic purpose to develop true "judgment." Rules alone will never produce real taste.

**Rithwik's Position:** High judgment can be manufactured systematically by chaining micro-systems (a node-based logic harness) together to force macro-judgment at the output level.

> 🟢 **RESOLVED — NEUROSYMBOLIC AI**
>
> We do not choose one over the other. The frontier of AI is Neurosymbolic AI. Rithwik's node harness provides the **Symbolic Layer** (hard constraints and expert rules that prevent slop), while Charis's vision is fulfilled by the **Neural Layer** using DSPy + Self-Refine + Reflexion memory — the AI critiques its own work and optimizes its prompts over time.

---

### 1.2 — Avatar Choice & Psychographic Extraction

**Charis's Question:** Can the user choose the avatar? If the system is universal, static prompts fail and recursive learning and evals are required across industries.

**Rithwik's Proposal:** Build a recursive, human-in-the-loop interview process that extracts 28 ultra-deep psychographic data points (trauma, fears, routines, finances, etc.) to prevent generic slop at the source.

> 🟢 **RESOLVED**
>
> Users choose demographic parameters, and the AI acts as an active interrogator extracting the 28 psychographic points into `Avatar_Internal.md`. This file then acts as the ultimate RAG context window for all downstream copy generation.

---

## Outcomes & Decisions Reached

| Decision | Status | Resolution |
|----------|--------|------------|
| **User Avatar Choice & Onboarding Interrogator** | 🟢 DONE | System allows fully custom avatars. The onboarding AI asks directed questions based on the Conditions Deck and tracks context density in real time. |
| **Context Sufficiency Criteria** — When is context enough? | 🟢 DONE | Solved using the LLM-as-a-Judge Rubric scoring 7 dimensions: Hook Strength, Avatar Specificity, Emotional Intensity, Brand Alignment, Platform Fit, CTA Clarity, Sophistication Match. When category depth reaches threshold, the progress bar turns green. |
| **Hybrid System Architecture** | 🟢 DONE | Built on LangGraph (state graph managing node handoffs and cyclic review loops) + DSPy (declarative modules that compile and optimize prompt logic). |
| **Writing Agent Feedback Loop** | 🟢 DONE | Implemented via Self-Refine (Madaan et al.) + Reflexion (Shinn et al.). Draft → Critique → Revise loop runs until LLM-as-a-Judge score is ≥ 7.0/10. |
| **Human-in-the-Loop Psychographic Extraction** | 🟢 DONE | Deep psychographic data requires strict human-in-the-loop input during onboarding to ensure zero fluff and maximum specificity. |
| **Avatar Understanding as Foundational Bottleneck** | 🟢 DONE | `Avatar_Internal.md` must be fully mapped before the writing agents unlock. This is a hard gate, not a soft suggestion. |

---

## Implementation Status

### Node-Based Handoffs (28 Points → Writing Agent)
🟡 **IN PROGRESS** — `src/writing/nodes.py`

The 28 psychographic data points flow through 5 sequential expert nodes before a single word of copy is written:

| Node | Name | Function |
|------|------|----------|
| **1** | Audience Awareness Stage | Maps the avatar from Unaware → Problem Aware → Solution Aware → Product Aware → Most Aware |
| **2** | Platform & Format Constraints | Applies formatting and structural rules for the target platform (Reel, YouTube, LinkedIn, Email) |
| **3** | Funnel Context & Brand Voice Injection | Injects creator personality, tone, and taste. Applies prohibited clichés and voice constraints. |
| **4** | Lead & Angle Selection | Generates multiple leads and angles and selects the best using the Clayton Makepeace / POWER Copy framework |
| **5** | Writing Agent | Takes all structured output from Nodes 1–4 and writes the actual copy draft using a high-quality model (e.g., Claude Sonnet) |

### Visual Progress Bar
🟡 **IN PROGRESS** — `src/onboarding/progress.py`

Tracks 0% → 100% completion across all 28 psychographic categories. When all categories hit their depth threshold, the bar turns green and the writing agents unlock.

### Research Agent (Agentic RAG + Self-Refine)
🟡 **IN PROGRESS** — `src/research/`

Takes `Avatar_Internal.md` as the context boundary and crawls targeted subreddits, YouTube comments, and forums for raw market language and unfiltered venting. Populates `Conditions_Deck_Market.md`. Then runs a Self-Refine loop that critiques the retrieved data — *"Is this deep enough? Does it reveal the underlying emotional driver or just surface complaints?"* — and loops back to search deeper until the research density criteria are satisfied. Also generates the Mermaid.js Problem Chain diagram (Core Desire → Big Problem → Problem Fractals → Unique Mechanism → Sub-Mechanisms).

### Marketing Agent
🟡 **IN PROGRESS** — `src/marketing/`

Takes the fully populated `Avatar_Internal.md` and `Conditions_Deck_Market.md` and synthesizes a dynamic marketing strategy. This is the strategic layer — it does not write copy, it decides the angle, the emotional lever to pull, the awareness stage to target, and the platform-specific approach. Its output feeds directly into Node 4 (Lead & Angle Selection) of the Writing Agent. The reasoning here is powered by Layer 2 (Human Sociality) — the Marketing Agent thinks through the relevant evolutionary, psychological, and sociological drivers before outputting a strategy.

### Creator Voice Agent (with Humanizer)
🟡 **IN PROGRESS** — `src/voice/`

Ingests the creator's existing writing, personality, and taste to build a brand voice profile. It then applies that profile as a hard constraint on the Writing Agent's output. Built into this agent is the **Humanizer module** — it analyzes the token-prediction patterns typical of AI-generated writing and deliberately disrupts them, making the final output sound genuinely human. This is not cosmetic; it operates at the structural level of how sentences are constructed and how ideas are sequenced.

---

## Questions Resolved

| Question | Resolution |
|----------|------------|
| **Pattern Observation as Judgment** | Demonstrated via Self-Refine — the AI evaluates a draft against psychographic drivers (e.g., identifying that 40-year-old dads buy fitness out of mortality fear rather than vanity), critiques its own draft, and rewrites accordingly. |
| **Transition from UGC/Slang to Marketing Strategy** | Handled via Agentic RAG (Plan → Retrieve → Reason → Evaluate → Generate), extracting raw slang and UGC language and injecting it into the DSPy writing modules as hard context constraints. |
| **Mechanical Operation of Recursive Learning** | Onboarding uses interactive single-question probing (non-tedious, one at a time). Post-onboarding, Self-Refine and Reflexion run in the background as LLM-to-LLM critique loops without needing constant human babysitting. |

---

## Next Phase

🔴 **Task 4 — Stress-Testing**: Scheduled after the Layer 1 MVP build is verified. We will systematically hunt for failure points, patch leaks, and stabilize the system.

Once stable, we advance:
- **Layer 2** — Reflexion memory store (the AI learns from past failures across sessions)
- **Layer 3** — Teacher-Student Distillation (a larger teacher model trains a smaller, faster student model to replicate elite marketing judgment at low cost)
