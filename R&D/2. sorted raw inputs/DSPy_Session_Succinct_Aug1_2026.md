# DSPy Learning Session — Succinct Log
*August 1, 2026*

---

## What I Learned (With My Exact Questions)

---

### 1. Signature — The Atomic Unit of DSPy

**What it is:** A typed declaration of a node's inputs and outputs. It tells DSPy *what* a node does, not *how*.

'give me an easy analogy'
→ A Signature is a **hiring contract**. You specify the raw materials (inputs) and the exact deliverable (outputs). You don't tell them how to work. DSPy figures that out.

```python
class AudienceAwareness(dspy.Signature):
    """Identify the audience's stage of awareness."""
    content_brief: str = dspy.InputField()
    awareness_stage: str = dspy.OutputField()
```

---

### 2. The Environment — DSPy Itself

'so the environment everything runs on is DSPy software. Is it a software?'
→ Yes. DSPy is an open-source Python library. It is the "sun" in the systems diagram — the overarching infrastructure that dictates how everything runs. You configure it once globally:

```python
dspy.settings.configure(lm=dspy.LM("openai/gpt-4o"))
```

---

### 3. The Compiler — Auto Prompt Engineer

'ok so the compiler will just execute the prewritten prompt as is?'
→ No. You don't write prompts. The Compiler auto-generates, tests, and refines prompts for you. It runs experiments — trying different prompt wordings and example combinations — until it finds the version that produces the best outputs consistently. Then it locks that prompt in.

'WHAT IS COMPILER?'
→ The Compiler is an **auto-prompt engineer**. You never wrote the final prompt. It found it.

'It runs experiments in the background — trying different prompt wordings, different example combinations — until it finds the version that produces the best outputs consistently. how? with examples'
→ Step by step:
- Round 1: tries basic prompt → gets 1/3 examples right
- Round 2: adds Example 1 into the prompt → gets 2/3 right
- Round 3: adds Example 2 → gets 3/3 right ✅ → locked

'what is the meaning of compile?'
→ Borrowed from programming. Compile = translate your declared intent into the best possible executable instructions the LLM can act on.

---

### 4. Modules — Reasoning Strategies

**What it is:** A predefined cognitive strategy that wraps a Signature. ChainOfThought forces the LLM to reason step-by-step before answering.

```python
selector = dspy.ChainOfThought(SelectAngle)
result = selector(awareness_stage=doc, brand_voice=doc)

# result.reasoning → the internal monologue
# result.best_angle → the final answer
```

---

### 5. MD Docs as Input Data

'awareness_stage: str = dspy.InputField() — here i add the outputs from the avatar md research for each of these nodes? right?'
→ Yes. The InputField is a labeled slot. At runtime you fill it with the actual content — the full MD doc or a RAG-retrieved chunk.

'no not just a description like this, small — i want the DSPy to refer to the entire fricking doc, otherwise just saying "problem unaware" won't work.'
→ Correct. Two options:
- **Option A (small docs):** inject the full MD file directly into the InputField
- **Option B (large docs):** use RAG to retrieve only the relevant chunk, then inject that

---

### 6. RAG's Role

**What it is:** RAG (Retrieval Augmented Generation) retrieves only the relevant chunk from a large knowledge base before injecting it into a DSPy InputField.

'This is exactly why your RAG side note is critical... RAG finds and pulls only the mental models relevant to this specific audience stage and angle — and the JUDGEMENT to surf which layer in what order needs to be trained with examples and there needs to be an md file for that, that "judgement" file is the most valuable thing here, making the outputs of layer one much elevated, with the layer 2.'
→ The judgment of which Layer 2 psychological layer to pull, in what order, is itself a learnable judgment — trained by the Compiler from curated examples. That training dataset is the core moat.

'is it just these strings only or is there a RAG system beneath it compiling from examples?'
→ Just strings in basic DSPy. But for this system, RAG retrieves the right MD chunk *before* it becomes the example input. DSPy handles the structure. RAG handles the content.

---

### 7. DSPy vs. AI Model — Division of Labor

'which tasks are done by DSPy and which tasks are done by the AI model?'

| Task | Who Does It |
|------|-------------|
| Define inputs/outputs (Signature) | You (code) |
| Retrieve MD chunks (RAG) | DSPy infrastructure |
| Assemble the prompt | DSPy |
| Test prompt variations (Compiler) | DSPy |
| Save the winning prompt | DSPy |
| **Actually think and reason** | **The AI Model** |
| **Generate the output text** | **The AI Model** |
| Pass output to next node | DSPy |

→ DSPy is the **plumbing**. The AI model is the **brain**.

---

### 8. DSPy + LangGraph Division

'i can understand now, the DSPy calls these RAG systems in and spins up a model and puts these prompts together into the model that creates another prompt which is copied and saved for later, and then uses it in the other agent as input and it outputs the output and it checks itself. You see?'
→ Yes — with one correction: "checks itself" only happens during compilation (training time), not at runtime. Once compiled, the saved prompt just executes. Like a chef perfecting a recipe (compile) and then just following it (runtime).

**DSPy + LangGraph:**
- **LangGraph** = skeleton (routes between nodes, manages state, conditional logic)
- **DSPy** = muscle (intelligent reasoning inside each node)

---

## What I Still Need to Learn (Side Notes)

- **RAG & LightRAG** — what RAG is, how it works fundamentally, and how LightRAG can be incorporated into this system
- **LangGraph** — stateful, cyclic, graph-based agent workflows; conditional routing, human-in-the-loop checkpoints, persistent state; map the 5 nodes into a LangGraph graph
- **Layer 2 Judgment File** — curate the training dataset mapping awareness stages + niches to the correct Layer 2 psychological sequence; this is the core moat
- **Compiler in practice** — BootstrapFewShot, MIPROv2; when and how to run optimization on each node (shelved for MVP)
- **LLM-as-Judge / Metric** — shelved for later; separate build phase
- **DSPy Modules in depth** — ReAct, ProgramOfThought, multi-hop reasoning for Layer 2 traversal
- **Chaining nodes end-to-end** — structured output passing between nodes, state management
- **Competitor Analysis** (in order):
  - (1) Neurosymbolic Companies for Marketing
  - (2) LLM Fine-Tuned Platforms: Jasper AI (brand voice constraints), Writer (specialized agent guardrails), Copy.ai (visual workflow pipelines), Typeface (multimodal copy + visual)

---

## MVP Build Order (No Compiler Needed Yet)

```
1. Install DSPy: pip install dspy
2. Configure environment: dspy.settings.configure(lm=...)
3. Write Signature for Node 1 (AudienceAwareness)
4. Wrap in ChainOfThought module
5. Feed full MD docs into InputFields
6. Run it — get structured output
7. Repeat for Nodes 2–5
8. Use LangGraph to wire nodes together
```

---

*Session Date: August 1, 2026*
*System: Influence Accelerator — Node-Based Neurosymbolic AI Marketing System*
