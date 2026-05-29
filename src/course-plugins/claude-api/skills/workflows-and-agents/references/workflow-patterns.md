# Workflow patterns

**Chaining** — split a large task into sequential, distinct steps instead of one massive prompt, so Claude focuses on one subtask at a time. Essential for constraint-heavy prompts (e.g. "no emojis, no AI mention, professional tone") that Claude violates in a single pass: step 1 produce a draft, step 2 a follow-up prompt that rewrites based on the specific violations found. Example: topic → search trends → pick → research → write script → render video → post.

**Routing** — a first call categorizes the input into a predefined genre, then routes to a specialized pipeline with category-specific prompts/tools. Example: topic → categorize as "educational" → use the educational template. One routing step → multiple specialized pipelines.

**Parallelization** — break a complex decision into independent subtasks run simultaneously, then aggregate. Example: instead of one prompt choosing metal/polymer/ceramic/composite at once, run one focused request per material, then an aggregator compares. Gains: focus, modularity (improve/eval each prompt separately), scalability, quality. Structure: input → parallel subtasks → aggregator → output.

**Evaluator-optimizer** — a producer generates output and an evaluator assesses it in a loop until accepted. Example: image→3D model — Claude describes the image, models it with CADQuery, renders it, compares the render to the original, and repeats with feedback if inaccurate. Identifying a pattern doesn't implement it — you still write the code.
