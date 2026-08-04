# DSPy Architecture Mapping for the Influence Accelerator

To build a neurosymbolic marketing system that actually possesses *judgment* and *taste*, we cannot rely on traditional "prompt engineering." Prompting is brittle; if you change the model (e.g., from Claude 3.5 Sonnet to Opus) or change the context, a massive prompt breaks.

**DSPy (Declarative Self-Improving Language Programs)**, developed by Stanford, fundamentally changes how we build AI systems. It treats language models not as chatbots, but as **processors in a programmatic pipeline**.

Understanding DSPy first is the absolute correct move, because it changes *what a node actually is* in your architecture.

---

## 1. The Core Philosophy of DSPy

In a traditional AI workflow, you write massive, complex prompts trying to force the AI to reason (e.g., *"You are an expert marketer. Think step-by-step using evolutionary biology..."*). 

In **DSPy**, you **do not write prompts**. Instead, you define:
1. **The inputs and outputs** of a step (The Node).
2. **The reasoning pattern** (The Layer 2 Human Sociality integration).
3. **The metric of success** (The LLM-as-a-Judge Rubric).

DSPy then uses an **Optimizer (Compiler)** to run thousands of simulated tests, automatically discovering the absolute best way to instruct the underlying LLM to achieve that specific metric. 

It is the bridge between **Rithwik's deterministic rules** (the pipeline) and **Charis's recursive learning** (the optimizer).

---

## 2. Mapping DSPy to the Influence Accelerator

Here is exactly how DSPy maps to the architecture and your 16-level Human Sociality framework.

### A. Signatures (The Nodes)
A `Signature` in DSPy defines strictly what a node takes in, and what it must spit out. It is completely deterministic. You don't tell it *how* to do it, just the structure.

**Example: The Lead & Angle Selection Node**
*   **Input:** `Avatar_Psychographics` (from Onboarding Agent)
*   **Input:** `Human_Sociality_Level` (e.g., Level 3: Affective Systems - Fear/Belonging)
*   **Input:** `Platform_Context` (e.g., Twitter Thread)
*   **Output:** `Marketing_Angle`

### B. Modules (The Layer 2 Reasoning)
Modules are the built-in reasoning engines. Instead of a basic `dspy.Predict` (which just spits out an answer), you wrap your signatures in modules like `dspy.ChainOfThought`. 

This is where your **Layer 2 (The 16 Levels of Human Sociality)** lives. Before the node outputs the `Marketing_Angle`, the `ChainOfThought` module forces the AI to internally reason through the sociological and evolutionary context you provided. It creates a hidden "scratchpad" of deep reasoning before outputting the final angle.

### C. Metrics (The Taste & Judgment)
This is the most critical part. A metric is a Python function that scores the output. 
If the Writing Agent drafts a copy, the Metric (using an LLM-as-a-Judge) scores it out of 10 based on:
1. Does this align with the Creator's brand voice?
2. Does it tap into the specified evolutionary or cognitive driver?
3. Is it distinct and not "AI slop"?

### D. Optimizers / The Compiler (The Recursive Learning)
This is the magic. You give DSPy a few examples of great angles (from KJ Rainey or yourself). 
The DSPy Compiler takes your **Nodes**, your **Reasoning Module**, and your **Metric**, and it runs hundreds of iterations. When an angle scores poorly on the Metric, DSPy's optimizer recursively tweaks the hidden prompts, weights, and examples until the system organically *learns* the exact pattern of judgment required to score a 10/10.

**This literally manifests Charis's vision:** The AI develops an instinctual judgment through repeated pattern recognition, constrained by Rithwik's deterministic nodes.

---

## 3. What this means for your Figma / Architecture Planning

Because DSPy works this way, when you are designing your nodes in Figma or writing your Global MD files, you don't need to write out exactly *how* the AI should think in every single scenario. 

Instead, you just need to design:
1. **The Flow of Data (Signatures):** What does Node A pass to Node B?
2. **The Knowledge Graph (Layer 2):** The brilliant 16-level Human Sociality hierarchy.
3. **The Rubric (Metrics):** How do we mathematically define a "good" output for this node?

Once you design the constraints, DSPy will recursively figure out the optimal way to execute the reasoning.
