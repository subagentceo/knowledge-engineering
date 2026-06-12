# AI model comparison

Compare available AI models in Copilot Chat and choose the best model for your task.

## Comparison of AI models for GitHub Copilot

GitHub Copilot supports multiple AI models with different capabilities. The model you choose affects the quality and relevance of responses by Copilot Chat and Copilot inline suggestions. Some models offer lower latency, while others offer fewer hallucinations or better performance on specific tasks. This guide helps you pick the best model based on your task, not just model names.

> \[!NOTE]
>
> * Different models consume AI credits at different rates based on their token pricing. For details, see [Models and pricing for GitHub Copilot](/en/copilot/reference/copilot-billing/models-and-pricing).
> * When you use Copilot Chat in supported IDEs, **Auto** will automatically select the best model for you based on availability. You can manually choose a different model to override this selection. See [About Copilot auto model selection](/en/copilot/concepts/auto-model-selection).

### Recommended models by task

Use this table to find a suitable model quickly, see more detail in the sections below.

| Model                                 | Task area                                          | Excels at (primary use case)                                                                                                                                   | Further reading                                                                                                            |
| ------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| GPT-5 mini                            | General-purpose coding and writing                 | Fast, accurate code completions and explanations                                                                                                               | [GPT-5 mini model card](https://cdn.openai.com/gpt-5-system-card.pdf)                                                      |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| GPT-5.3-Codex                         | Agentic software development                       | Agentic tasks                                                                                                                                                  | [GPT-5.3-Codex model card](https://deploymentsafety.openai.com/gpt-5-3-codex)                                              |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| GPT-5.4                               | Deep reasoning and debugging                       | Multi-step problem solving and architecture-level code analysis                                                                                                | [GPT-5.4 model card](https://deploymentsafety.openai.com/gpt-5-4-thinking/introduction)                                    |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| GPT-5.4 mini                          | Agentic software development                       | Codebase exploration and is especially effective when using grep-style tools                                                                                   | [GPT-5.4 mini model card](https://deploymentsafety.openai.com/gpt-5-4-thinking/gpt-5-4-thinking.pdf)                       |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| GPT-5.5                               | Deep reasoning and debugging                       | Multi-step problem solving and architecture-level code analysis                                                                                                | [GPT-5.5 model card](https://deploymentsafety.openai.com/gpt-5-5/gpt-5-5.pdf)                                              |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Claude Fable 5                        | Long-horizon, autonomous coding and knowledge-work | First-attempt correctness through upfront reasoning, aggressive parallel tool batching, and proactive verification of pre-existing test state before debugging | [Claude Fable 5 model card](https://anthropic.com/claude-fable-5-mythos-5-system-card)                                     |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Claude Haiku 4.5                      | Fast help with simple or repetitive tasks          | Fast, reliable answers to lightweight coding questions                                                                                                         | [Claude Haiku 4.5 model card](https://assets.anthropic.com/m/99128ddd009bdcb/Claude-Haiku-4-5-System-Card.pdf)             |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Claude Opus 4.6 (fast mode) (preview) | Deep reasoning and debugging                       | Complex problem-solving challenges, sophisticated reasoning                                                                                                    | Not available                                                                                                              |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Claude Opus 4.7                       | Deep reasoning and debugging                       | Complex problem-solving challenges, sophisticated reasoning                                                                                                    | [Claude Opus 4.7 model card](https://cdn.sanity.io/files/4zrzovbb/website/037f06850df7fbe871e206dad004c3db5fd50340.pdf)    |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Claude Opus 4.8                       | Deep reasoning and debugging                       | Complex problem-solving challenges, sophisticated reasoning                                                                                                    | Not available                                                                                                              |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Claude Sonnet 4.5                     | General-purpose coding and agent tasks             | Complex problem-solving challenges, sophisticated reasoning                                                                                                    | [Claude Sonnet 4.5 model card](https://assets.anthropic.com/m/12f214efcc2f457a/original/Claude-Sonnet-4-5-System-Card.pdf) |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Claude Sonnet 4.6                     | General-purpose coding and agent tasks             | Complex problem-solving challenges, sophisticated reasoning                                                                                                    | [Claude Sonnet 4.6 model card](https://www-cdn.anthropic.com/78073f739564e986ff3e28522761a7a0b4484f84.pdf)                 |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Gemini 2.5 Pro                        | Deep reasoning and debugging                       | Complex code generation, debugging, and research workflows                                                                                                     | [Gemini 2.5 Pro model card](https://storage.googleapis.com/model-cards/documents/gemini-2.5-pro.pdf)                       |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Gemini 3 Flash                        | Fast help with simple or repetitive tasks          | Fast, reliable answers to lightweight coding questions                                                                                                         | [Gemini 3 Flash model card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Flash-Model-Card.pdf)       |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Gemini 3.1 Pro                        | Deep reasoning and debugging                       | Effective and efficient edit-then-test loops with high tool precision                                                                                          | Not available                                                                                                              |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Gemini 3.5 Flash                      | Fast help with simple or repetitive tasks          | Fast, reliable answers to lightweight coding questions                                                                                                         | [Gemini 3.5 Flash model card](https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-5-Flash-Model-Card.pdf)   |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| MAI-Code-1-Flash[^mai-code-1-flash]   | General-purpose coding and writing                 | Fast, accurate code completions and explanations                                                                                                               | [MAI-Code-1-Flash model card](https://aka.ms/mai-code-1-flash-modelcard)                                                   |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Qwen2.5                               | General-purpose coding and writing                 | Code generation, reasoning, and code repair / debugging                                                                                                        | [Qwen2.5 model card](https://arxiv.org/pdf/2409.12186)                                                                     |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |
| Raptor mini                           | General-purpose coding and writing                 | Fast, accurate code completions and explanations                                                                                                               | Coming soon                                                                                                                |
|                                       |                                                    |                                                                                                                                                                |                                                                                                                            |

## Task: General-purpose coding and writing

Use these models for common development tasks that require a balance of quality, speed, and cost efficiency. These models are a good default when you don't have specific requirements.

| Model            | Why it's a good fit                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GPT-5.3-Codex    | Delivers higher-quality code on complex engineering tasks like features, tests, debugging, refactors, and reviews without lengthy instructions.          |
| GPT-5 mini       | Reliable default for most coding and writing tasks. Fast, accurate, and works well across languages and frameworks.                                      |
| Raptor mini      | Specialized for fast, accurate inline suggestions and explanations.                                                                                      |
| MAI-Code-1-Flash | Strong instruction-following and adaptive reasoning make it a reliable default for everyday coding tasks, writing, and multi-turn development workflows. |

### When to use these models

Use one of these models if you want to:

* Write or review functions, short files, or code diffs.
* Generate documentation, comments, or summaries.
* Explain errors or unexpected behavior quickly.
* Work in a non-English programming environment.

### When to use a different model

If you're working on complex refactoring, architectural decisions, or multi-step logic, consider a model from [Deep reasoning and debugging](#task-deep-reasoning-and-debugging). For faster, simpler tasks like repetitive edits or one-off code suggestions, see [Fast help with simple or repetitive tasks](#task-fast-help-with-simple-or-repetitive-tasks).

## Task: Fast help with simple or repetitive tasks

These models are optimized for speed and responsiveness. They’re ideal for quick edits, utility functions, syntax help, and lightweight prototyping. You’ll get fast answers without waiting for unnecessary depth or long reasoning chains.

### Recommended models

| Model            | Why it's a good fit                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Haiku 4.5 | Balances fast responses with quality output. Ideal for small tasks and lightweight code explanations.                                                   |
| MAI-Code-1-Flash | Handles quick coding tasks with adaptive efficiency, stays concise for simple requests and delivers fast, accurate responses without unnecessary depth. |

### When to use these models

Use one of these models if you want to:

* Write or edit small functions or utility code.
* Ask quick syntax or language questions.
* Prototype ideas with minimal setup.
* Get fast feedback on simple prompts or edits.

### When to use a different model

If you’re working on complex refactoring, architectural decisions, or multi-step logic, see [Deep reasoning and debugging](#task-deep-reasoning-and-debugging).
For tasks that need stronger general-purpose reasoning or more structured output, see [General-purpose coding and writing](#task-general-purpose-coding-and-writing).

## Task: Deep reasoning and debugging

These models are designed for tasks that require step-by-step reasoning, complex decision-making, or high-context awareness. They work well when you need structured analysis, thoughtful code generation, or multi-file understanding.

### Recommended models

| Model             | Why it's a good fit                                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GPT-5 mini        | Delivers deep reasoning and debugging with faster responses and lower resource usage than GPT-5. Ideal for interactive sessions and step-by-step code analysis. |
| GPT-5.5           | Great at complex reasoning, code analysis, and technical decision-making.                                                                                       |
| Claude Sonnet 4.6 | Improves on Sonnet 4.5 with more reliable completions and smarter reasoning under pressure.                                                                     |
| Claude Opus 4.7   | Anthropic’s most powerful model. Improves on Claude Opus 4.6.                                                                                                   |
| Gemini 3.1 Pro    | Advanced reasoning across long contexts and scientific or technical analysis.                                                                                   |

### When to use these models

Use one of these models if you want to:

* Debug complex issues with context across multiple files.
* Refactor large or interconnected codebases.
* Plan features or architecture across layers.
* Weigh trade-offs between libraries, patterns, or workflows.
* Analyze logs, performance data, or system behavior.

### When to use a different model

For fast iteration or lightweight tasks, see [Fast help with simple or repetitive tasks](#task-fast-help-with-simple-or-repetitive-tasks).
For general development workflows or content generation, see [General-purpose coding and writing](#task-general-purpose-coding-and-writing).

## Task: Working with visuals (diagrams, screenshots)

Use these models when you want to ask questions about screenshots, diagrams, UI components, or other visual input. These models support multimodal input and are well suited for front-end work or visual debugging.

| Model             | Why it's a good fit                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GPT-5 mini        | Reliable default for most coding and writing tasks. Fast, accurate, and supports multimodal input for visual reasoning tasks. Works well across languages and frameworks. |
| Claude Sonnet 4.6 | Improves on Sonnet 4.5 with more reliable completions and smarter reasoning under pressure.                                                                               |
| Gemini 3.1 Pro    | Deep reasoning and debugging, ideal for complex code generation, debugging, and research workflows.                                                                       |

### When to use these models

Use one of these models if you want to:

* Ask questions about diagrams, screenshots, or UI components.
* Get feedback on visual drafts or workflows.
* Understand front-end behavior from visual context.

> \[!TIP]
> If you're using a model in a context that doesn’t support image input (like a code editor), you won’t see visual reasoning benefits. You may be able to use an MCP server to get access to visual input indirectly. See [Extending GitHub Copilot Chat with Model Context Protocol (MCP) servers](/en/copilot/customizing-copilot/using-model-context-protocol/extending-copilot-chat-with-mcp).

### When to use a different model

If your task involves deep reasoning or large-scale refactoring, consider a model from [Deep reasoning and debugging](#task-deep-reasoning-and-debugging). For text-only tasks or simpler code edits, see [Fast help with simple or repetitive tasks](#task-fast-help-with-simple-or-repetitive-tasks).

## Next steps

[^mai-code-1-flash]: MAI-Code-1-Flash is a continuously improving model. Performance and behavior may evolve over time as new checkpoints are released.

Choosing the right model helps you get the most out of Copilot. If you're not sure which model to use, start with a general-purpose option like GPT-5 mini, then adjust based on your needs.

* For detailed model specs and pricing, see [Supported AI models in GitHub Copilot](/en/copilot/using-github-copilot/ai-models/supported-ai-models-in-copilot).
* For more examples of how to use different models, see [Comparing AI models using different tasks](/en/copilot/using-github-copilot/ai-models/comparing-ai-models-using-different-tasks).
* To switch between models, refer to [Changing the AI model for GitHub Copilot Chat](/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat) or [Changing the AI model for GitHub Copilot inline suggestions](/en/copilot/how-tos/use-ai-models/change-the-completion-model).
* To learn how Copilot Chat serves different AI models, see [Hosting of models for GitHub Copilot](/en/copilot/reference/ai-models/model-hosting).