# Prompt Engineering — Reference

Source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview  
Saved: 2026-06-08

---

## Overview

Prompt engineering is the practice of iteratively improving prompts to better meet success criteria. Before engineering:

1. Define success criteria for your use case.
2. Build empirical tests against those criteria.
3. Have a first-draft prompt to improve.

Not every problem is best solved by prompt engineering — latency and cost are often better addressed by model selection.

---

## Core Techniques (from Prompting Best Practices)

Full reference: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

### Clarity and Specificity
- Be explicit about format, length, and tone.
- Use positive instructions ("do X") not just negatives ("don't do Y").
- Give context about *why* you want something — Claude reasons better with rationale.

### XML Structure
Use XML tags to delineate parts of a prompt:
```xml
<document>
  <content>...</content>
</document>
<instructions>
  Extract the main argument from the document above.
</instructions>
```

### Role Prompting
```
You are an expert Rust systems programmer specializing in serde serialization patterns.
```

### Step-by-Step Reasoning
Ask Claude to think through steps before answering:
```
Before answering, reason through the schema design step by step, then provide the final YAML definition.
```

### Examples (Few-Shot)
Provide input/output pairs to demonstrate the pattern:
```
Input: "I want to add a new agent type to e2m"
Normalized intent: "Add a new agent type to the e2m protocol schema"
Payload: {entity: "agent_type", operation: "add", target: "e2m protocol schema"}
```

### Output Format Specification
Specify exactly what structure you want, ideally backed by `output_config.format` for guaranteed compliance.

---

## Prompt Normalization for e2m

When applying this skill, normalize user prompts to `E2MInput` before responding:

```yaml
# Example normalization
input_raw: "hey can you make me the rust types for my input schema"
normalized:
  intent: "Generate Rust serde structs for E2MInput schema"
  payload:
    target_language: rust
    schema: E2MInput
    framework: serde
  meta:
    schema_version: "1.0.0"
```

Rules:
- Preserve the user's actual intent — don't over-interpret.
- Lowercase, strip filler ("hey", "can you", "please").
- Extract named entities into `payload`.
- Keep `intent` under 80 characters.

---

## Console Tools

- **Prompt generator**: https://platform.claude.com/dashboard — generates a first draft from a description.
- **Prompt improver**: Takes an existing prompt and suggests improvements.
- **Templates and variables**: For parameterized prompts.

---

## Interactive Tutorials

- GitHub: https://github.com/anthropics/prompt-eng-interactive-tutorial
- Google Sheets: https://docs.google.com/spreadsheets/d/19jzLgRruG9kjUQNKtCg1ZjdD6l6weA6qRXG5zLIAhC8
