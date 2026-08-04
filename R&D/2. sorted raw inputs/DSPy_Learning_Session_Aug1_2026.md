# DSPy Learning Session — Aug 1, 2026

---

## 1. System Overview

DSPy is a Python framework that replaces manual prompt engineering with **declarative programming**. Instead of writing fragile, hand-crafted prompts, you declare *what* a task does (Signature), *how* it reasons (Module), and optionally *what good looks like* (Metric + Examples). Its Compiler then auto-discovers the optimal prompt through experimentation.

**End-to-end flow:**
```
You write Signatures (contracts) for each node
        ↓
Wrap each in a Module (reasoning strategy e.g. ChainOfThought)
        ↓
RAG retrieves relevant MD chunks → fed into InputFields
        ↓
DSPy assembles the prompt → AI Model thinks and outputs
        ↓
Output becomes next node's Input (LangGraph routes between nodes)
        ↓
Compiler (optional) tests examples → saves winning prompt permanently
```

**Key nuance:** DSPy is the plumbing. The AI model is the brain. DSPy never thinks — it organizes, assembles, optimizes, and routes. The actual reasoning is entirely the model's job.

**For this system:** LangGraph is the skeleton (node routing, state, flow). DSPy is the muscle (intelligent reasoning inside each node). The Layer 2 judgment-ordering training set — which psychology layers to pull in what sequence — is the primary moat and must be hand-curated as training examples.

---

## 2. Topics Covered

1. **Signature** — declarative input/output contract for a node; the atomic unit of DSPy
2. **The hiring contract analogy** — Signature as deliverable spec, not instructions
3. **The Compiler** — not a prompt executor; it auto-generates and tests prompt variations
4. **Environment (DSPy as system)** — the Python framework as the overarching infrastructure; configured once globally via `dspy.settings.configure(lm=...)`
5. **Modules** — reasoning strategies (e.g. ChainOfThought) that wrap Signatures and force step-by-step thinking
6. **Code dissection** — full Node 4 example with Signature + ChainOfThought + result outputs including `result.reasoning`
7. **MD docs as InputField data** — full docs or RAG chunks flow into slots, not just label strings
8. **RAG's role** — retrieves only relevant chunks from large knowledge bases before injecting into InputFields
9. **Layer 2 judgment training** — the ordered sequence of which psychological layers to retrieve is itself a learnable, compilable judgment
10. **MVP without Compiler** — Signature + Module + run; fully functional without optimization
11. **What "compile" means** — translating declared intent into optimized executable prompt instructions
12. **How the Compiler experiments** — rounds of example testing, scoring, prompt refinement, locking the winner
13. **DSPy vs. AI Model division of labor** — DSPy = plumbing/engineering; Model = thinking/reasoning
14. **DSPy + LangGraph division** — LangGraph = between-node routing; DSPy = inside-node reasoning quality

---

## 3. Side Notes

- **RAG & LightRAG** — need to learn what RAG is, how it works, and how LightRAG specifically can be incorporated into the Influence Accelerator
- **Layer 2 Judgment File** — the training dataset mapping awareness stages + niches to the correct Layer 2 psychological sequence is the core moat asset; needs its own MD file and curation process
- **LangGraph** — industry standard for stateful, cyclic, graph-based agent workflows; supports conditional routing, human-in-the-loop checkpoints, persistent state; build the MVP on this
- **Competitor Analysis** (in this order):
  - (1) Neurosymbolic Companies for Marketing
  - (2) LLM Fine-Tuned Commercial Platforms:
    - **Jasper AI** — Brand IQ as symbolic constraint layer; learn brand voice enforcement at scale
    - **Writer** — task-based agents + enterprise guardrails; learn specialized writing agent architecture
    - **Copy.ai** — GTM workflow automation, no-code visual pipelines; learn reusable marketing workflow design
    - **Typeface** — enterprise multimodal (text + image + video); learn unified copy + visual asset pipelines

---

## 4. What to Learn Next

- **RAG fundamentals** — how retrieval works, vector databases, chunking strategies; then LightRAG specifically
- **LangGraph** — nodes, edges, state objects, conditional routing, human-in-the-loop; map the 5 nodes into a LangGraph graph
- **DSPy Modules in depth** — `ReAct` (reasoning + acting), `ProgramOfThought`, multi-hop reasoning for Layer 2 traversal
- **The Compiler in practice** — `BootstrapFewShot`, `MIPROv2`; when and how to run optimization on each node
- **Chaining nodes end-to-end** — passing structured outputs between nodes, state management across the pipeline
- **The training dataset** — how to curate, structure, and score examples for the Layer 2 judgment compiler

---

## 5. Key Code Reference

```python
# ENVIRONMENT — configure DSPy globally
import dspy
dspy.settings.configure(lm=dspy.LM("openai/gpt-4o"))

# SIGNATURE — the contract (what goes in, what comes out)
class SelectAngle(dspy.Signature):
    """Select the highest-converting marketing angle."""
    awareness_stage: str = dspy.InputField()   # from Node 1 (full MD doc or RAG chunk)
    brand_voice: str = dspy.InputField()        # from Node 3 (full MD doc or RAG chunk)
    best_angle: str = dspy.OutputField()        # goes to Node 5

# MODULE — the reasoning strategy wrapping the contract
selector = dspy.ChainOfThought(SelectAngle)

# EXECUTION — run it
result = selector(
    awareness_stage=awareness_doc,   # full MD doc content
    brand_voice=brand_voice_doc      # full MD doc content
)

# OUTPUTS
# result.reasoning  → the internal step-by-step monologue
# result.best_angle → the final selected angle
```

---

*Session Date: August 1, 2026*
*System: Influence Accelerator — Node-Based Neurosymbolic AI Marketing System*
