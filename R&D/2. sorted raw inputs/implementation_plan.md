# Layer 1 — MVP: Influence Accelerator (Deterministic Node Harness)

Implementation plan for building the **Layer 1 MVP** of the Influence Accelerator system — a deterministic, node-based agentic pipeline built on **LangGraph** and **DSPy** that extracts deep psychographic avatar intelligence and generates top 1% direct-response copy.

---

## User Review Required

> [!IMPORTANT]
> **Key Architecture Decisions for Review:**
> 1. **Framework Choice:** We will use **LangGraph** for multi-agent stateful graph orchestration (cycles, routing, quality gates) combined with **DSPy** for compiling and optimizing the node-level LLM calls.
> 2. **Interactive Onboarding Interface:** The Onboarding Agent will run via a clean terminal CLI interface (or lightweight Python API) that interactively asks 28 psychographic questions one-by-one, displays a live progress bar, and persists `Avatar_Internal.md`.
> 3. **Quality Threshold:** The LLM-as-a-Judge evaluation gate requires an average rubric score of **≥ 7.0 / 10** across 7 dimensions (Hook Strength, Avatar Specificity, Emotional Intensity, Brand Voice Alignment, Platform Fit, CTA Clarity, Sophistication Match) before copy is approved.

---

## Open Questions

> [!IMPORTANT]
> **Clarifications to resolve during planning:**
> 1. **Primary LLM Provider:** Should we default to OpenAI (GPT-4o) or Anthropic (Claude 3.5/3.7) as the underlying engine for DSPy and LangGraph nodes, or support both via environment variables (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`)?
> 2. **Web Search API:** For the Research Agent's RAG crawl (crawling Reddit/forums/YouTube comments), do you prefer using Tavily / Serper API, or an open-source python crawler?

---

## Proposed Changes

We will build the MVP codebase within the `c:\Users\rithw\OneDrive\Desktop\chaos\RG Second brain\RG's Brain\03 Projects\Influence Accelerator\src` directory (or workspace root `src/` folder), cleanly modularized.

```
src/
├── config.py                 # Environment variables, model settings
├── state.py                  # LangGraph TypedDict state schemas
├── onboarding/
│   ├── interrogator.py       # 28 Psychographic question bank & interactive CLI
│   └── progress.py           # Progress bar tracking (0% -> 100%)
├── research/
│   ├── crawler.py            # RAG crawler for Reddit, YouTube, forums
│   └── self_refine.py        # Self-Refine loop for research depth
├── writing/
│   ├── nodes.py              # 5-Node constraint harness (Awareness, Platform, Funnel, Voice, Lead)
│   └── dspy_modules.py       # DSPy declarative modules & signature definitions
├── evaluation/
│   └── judge.py              # LLM-as-a-Judge 7-dimension evaluation rubric
├── graph.py                  # Main LangGraph pipeline definition & state machine
└── main.py                   # CLI entry point to run Onboarding, Research, or Copy Generation
```

---

### Core Architecture Components

#### [NEW] [config.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/config.py)
Configuration settings for API keys, model selections (GPT-4o / Claude 3.5 Sonnet), default thresholds, and file paths.

#### [NEW] [state.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/state.py)
Defines the `IASystemState` schema for LangGraph:
- `demographics`: Dict (Age, Gender, Zipcode, Language)
- `psychographics`: Dict tracking the 28 categories (Trauma, Fears, Doubts, Beliefs, Routines, Finances, etc.)
- `progress_percentage`: float (0.0 to 100.0)
- `avatar_internal_md`: str (Path/Content)
- `conditions_deck_market_md`: str (Path/Content)
- `problem_chain_mermaid`: str
- `copy_brief`: Dict (Target Platform, Format, Awareness Stage, Offer)
- `current_draft`: str
- `critique_history`: List[Dict]
- `judge_scores`: Dict[str, float]
- `is_approved`: bool

---

### Component 1: Onboarding Agent & Progress Bar

#### [NEW] [interrogator.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/onboarding/interrogator.py)
- Houses the 28 ultra-deep psychographic questions (Trauma, Obstacles, Doubts, Goals/Dreams, Fears, Insecurities, Vices, Beliefs, Identity, Emotional Patterns, Resentments, Role Models, Guilt/Shames, Media, Platforms, Routines, Family, Purchases, Health, Traits, Values, Education, Social Life, Hobbies, Work Experience, Finances).
- Interrogates user one question at a time.
- Validates answer density ("Is that their only bad habit? Give me an article or video they watch").
- Generates `Avatar_Internal.md` upon green light.

#### [NEW] [progress.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/onboarding/progress.py)
- Calculates completeness across the 28 psychographic categories.
- Renders a terminal progress bar `[████████░░░░] 65% Complete` with category checkmarks.

---

### Component 2: Research Agent (Agentic RAG + Self-Refine)

#### [NEW] [crawler.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/research/crawler.py)
- Takes `Avatar_Internal.md` as context boundary.
- Crawls targeted subreddits, YouTube comments, and forums for raw market language and unfiltered venting.
- Populates `Conditions_Deck_Market.md`.

#### [NEW] [self_refine.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/research/self_refine.py)
- Critiques retrieved research: *"Is this data deep enough? Does it reveal the underlying emotional driver or just surface complaints?"*
- Loops back to search deeper until research density criteria are satisfied.
- Generates Mermaid.js Problem Chain diagram (`Core Desire -> Big Problem -> Problem Fractals -> Unique Mechanism -> Sub-Mechanisms`).

---

### Component 3: Writing Agent (DSPy + Node Harness)

#### [NEW] [nodes.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/writing/nodes.py)
Forces copy through 5 sequential expert nodes:
1. **Node 1 (Awareness Mapping):** Unaware -> Problem Aware -> Solution Aware -> Product Aware -> Most Aware.
2. **Node 2 (Platform & Format Rules):** IG Reel, YT Script, LinkedIn Post, Sales Email formatting constraints.
3. **Node 3 (Funnel Context & Brand Voice):** Creator voice injection, tone constraints, prohibited clichés ("delve", "furthermore").
4. **Node 4 (Lead & Angle Selection):** Apply Clayton Makepeace direct response rules (Rule of One, sensationalism, Overton window).
5. **Node 5 (Writing Agent):** Takes all structured output from Nodes 1–4 and writes the actual copy draft using a high-quality model (e.g., Claude Sonnet).

#### [NEW] [dspy_modules.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/writing/dspy_modules.py)
- Implements DSPy declarative modules (`dspy.Signature`, `dspy.ChainOfThought`, `dspy.Module`) for copy drafting and refinement.

---

### Component 4: LLM-as-a-Judge Evaluation Gate

#### [NEW] [judge.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/evaluation/judge.py)
Evaluates copy drafts across 7 dimensions (scored 1 to 10):
1. **Hook Strength**
2. **Avatar Specificity**
3. **Emotional Intensity**
4. **Brand Voice Alignment**
5. **Platform Fit**
6. **CTA Clarity**
7. **Sophistication Match**

If `average_score < 7.0`, generates structured critique and routes state back to the Writing Agent's Self-Refine loop. If `average_score >= 7.0`, marks `is_approved = True`.

---

### Component 5: Orchestration Graph & Entry Point

#### [NEW] [graph.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/graph.py)
Constructs the LangGraph `StateGraph`:
```
OnboardingNode ──> ResearchNode ──> WritingNode ──> JudgeNode ──(Pass?)──> Done
                                           ▲               │
                                           └──────(Fail)───┘
```

#### [NEW] [main.py](file:///c:/Users/rithw/OneDrive/Desktop/chaos/RG%20Second%20brain/RG%27s%20Brain/03%20Projects/Influence%20Accelerator/src/main.py)
CLI interface allowing users to:
1. Run Onboarding (`python src/main.py onboard`)
2. Run Research (`python src/main.py research`)
3. Generate Copy (`python src/main.py generate --platform reel --awareness problem_aware`)

---

## Verification Plan

### Automated Tests
- Run Python unit tests for state transitions and node functions:
  ```powershell
  python -m unittest discover -s src/tests
  ```
- Run DSPy module validation test script:
  ```powershell
  python src/tests/test_dspy_pipeline.py
  ```

### Manual Verification
1. Run interactive onboarding CLI (`python src/main.py onboard`) and verify the 28 psychographic data points, live progress bar, and generation of `Avatar_Internal.md`.
2. Trigger research phase and verify `Conditions_Deck_Market.md` and Mermaid Problem Chain diagram.
3. Trigger writing agent with sample input and verify LLM-as-a-Judge scoring, Self-Refine loop (if score < 7.0), and final approved output.

---

## DSPy Learning Log — August 1, 2026

*Succinct record of what was learned and confirmed in the DSPy learning session.*

### Concepts Confirmed

| # | Concept | One-Line Summary |
|---|---------|-----------------|
| 1 | **Signature** | Typed declaration of a node's inputs/outputs. Tells DSPy *what* to do, not *how*. |
| 2 | **Environment** | DSPy itself — an open-source Python library configured once globally via `dspy.settings.configure(lm=...)`. |
| 3 | **Compiler** | Auto-prompt engineer. Runs experiments (wordings + examples) until it finds the best prompt, then locks it. |
| 4 | **Modules** | Predefined reasoning strategies (e.g., `dspy.ChainOfThought`) that wrap a Signature and force step-by-step reasoning. |
| 5 | **MD Docs as Input Data** | InputFields accept full MD doc content directly (small docs) or RAG-retrieved chunks (large docs). |
| 6 | **RAG's Role** | Retrieves only the relevant chunk from a large knowledge base before injecting it into a DSPy InputField. |
| 7 | **DSPy vs. AI Model Division** | DSPy = plumbing (assembles prompts, routes outputs, runs Compiler). AI Model = brain (reasons and generates). |
| 8 | **DSPy + LangGraph Division** | LangGraph = skeleton (routes, state, conditional logic). DSPy = muscle (intelligent reasoning inside each node). |

### Key Insight on Layer 2 Judgment
The judgment of *which* Layer 2 psychological level to pull, in *what order*, is itself a learnable judgment — trained by the Compiler from curated examples. That training dataset (the Judgment File) is the core moat of this system.

### Still To Learn (Shelved for Post-MVP)
- 🔴 RAG & LightRAG fundamentals and integration
- 🔴 LangGraph in depth — stateful cycles, conditional routing, human-in-the-loop checkpoints
- 🔴 Layer 2 Judgment File — curate training dataset mapping awareness stages + niches to the correct Layer 2 psychological sequence
- 🔴 Compiler in practice — BootstrapFewShot, MIPROv2
- 🔴 LLM-as-Judge / Metric — separate build phase
- 🔴 DSPy Modules in depth — ReAct, ProgramOfThought, multi-hop reasoning for Layer 2 traversal
- 🔴 Chaining nodes end-to-end with structured state passing

### MVP Build Order (No Compiler Needed Yet)
1. `pip install dspy`
2. `dspy.settings.configure(lm=...)`
3. Write Signature for Node 1 (AudienceAwareness)
4. Wrap in ChainOfThought module
5. Feed full MD docs into InputFields
6. Run it — get structured output
7. Repeat for Nodes 2–5
8. Use LangGraph to wire nodes together

### Next Tasks (In Order)

**1. Competitor Research**
- Neurosymbolic companies working on marketing AI
- LLM fine-tuned platforms:
  - **Jasper AI** — brand voice constraints
  - **Writer** — specialized agent guardrails
  - **Copy.ai** — visual workflow pipelines
  - **Typeface** — multimodal copy + visual

**2. Learn RAG & LightRAG**
- Understand fundamentals of RAG first
- Then understand how LightRAG can be incorporated into this system's knowledge retrieval

**3. Learn LangGraph**
- Stateful, cyclic, graph-based agent workflows
- Conditional routing, human-in-the-loop checkpoints, persistent state
- Map the 5 nodes into a LangGraph graph

**4. Write the Global MD Knowledge Base Files**
- Audience Awareness stages (definitions, niche variations, platform mappings)
- Brand Voice & Funnel Context (creator personality + taste ingestion)
- Layer 2 Judgment File (the training dataset — the core moat)
