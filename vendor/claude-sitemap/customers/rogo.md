# How Rogo evaluates frontier models for institutional finance

Rogo is an AI platform built specifically for finance. More than 35,000 financial professionals at major banks, investment firms, and advisory practices run over 50,000 queries a day on the platform. We spoke with Strib Walker, Head of Product at Rogo, about what makes financial AI different, how Rogo evaluates models, and where the work is headed.

## Anthropic: What do most people get wrong about applying AI to finance?

**Strib Walker, Rogo:** Finance demands very bespoke tools, and the difference between "looks right" and "is right" is enormous. A lot of what makes something “right” in finance is highly specific to the context. It varies by specialty, firm, industry, team, and even individual senior preferences. General models may understand standard financial line items from a 10-K, but they often miss nuances like which ratios matter most, which peers are appropriate, or how information should be presented. Those details are critical to professionals and can change the interpretation entirely.

## Where does Claude fit into what you're building?

**Walker:** What we do in plain terms is help institutions operationalize AI inside their firms. Claude Opus 4.7 and Sonnet 4.6 are integrated across the Rogo platform, where they power parts of the core research, analysis, and artifact-generation experience our customers rely on every day. Anthropic models are available through Felix, our agent orchestrator for end-to-end financial workflows. Felix takes on the kinds of multi-step assignments that define the work in finance: building decks, financial models, and documents from start to finish with the structure, formatting, and rigor the work demands. Claude is one of several frontier models Rogo draws on inside Felix.

## What specifically drew you to Claude?

**Walker:** Two things. The first was long-context reasoning over the documents that finance lives in: data rooms, multi-year filing sets, transcript archives, internal research libraries. Reasoning effectively over a fully utilized context window is exactly what diligence and deep research demand.

The second, and the one that most directly tipped the decision, was artifact creation. In our most recent benchmarks, we focused specifically on artifact generation in PowerPoint and Excel, reflecting the primary formats used in real-world financial analysis and reporting. Claude showed strong improvements in PowerPoint generation.

Success for us had three components: measurable improvement on our internal finance benchmarks; production-grade quality on artifact generation as graded by our finance evaluators; and a deployment that met the security, privacy, and compliance bar our customers require, at the speed they expect us to move.

## You have former bankers working alongside AI researchers. What does that collaboration actually look like?

**Walker:** To close that gap between looking right and actually right that I mentioned, we have an entire team of former bankers, investors, and research analysts embedded alongside our AI researchers and engineers. They work together on model evaluation, prompting, artifact pipelines, and workflow design, mapping how the work is actually done on the desk onto what frontier models like Claude can do.
