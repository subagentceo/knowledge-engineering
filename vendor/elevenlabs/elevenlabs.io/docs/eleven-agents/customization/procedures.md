> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Procedures

Procedures are currently in Alpha. See details in [Release status](#release-status).

## Overview

A procedure tells your agent how to handle one specific task. Think of your agent's set of procedures as an employee handbook: each procedure has a trigger that describes situations when it applies and content describing what to do in those situations. When your agent encounters a situation that matches one of the triggers, it loads the relevant procedure.

Use procedures when your agent needs to handle many distinct tasks. One example use case is a customer support agent, where each procedure covers one type of request: refunds, identity verification, account recovery, or connection troubleshooting.

![Procedures tab in the agent
dashboard](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/38b190b7a08cb9e628da309a86c5e4b315eabccf238a41d5d3a6c2646aba11af/assets/images/conversational-ai/procedures/procedures-overview.png)

## Procedure types

There are two kinds of procedures:

* **[Free-form procedures](/docs/eleven-agents/customization/procedures/free-form-procedures)** are written as natural-language instructions the agent interprets and adapts to the situation.
* **[Structured procedures](/docs/eleven-agents/customization/procedures/structured-procedures)** are an ordered list of typed steps the agent runs the same way every time.

You can use both kinds, alongside [workflows](/docs/eleven-agents/customization/agent-workflows), on the same agent. The agent picks the relevant procedure from its trigger, regardless of type.

## When to use procedures

Every agent has a [system prompt](/docs/eleven-agents/best-practices/prompting-guide). Procedures and [workflows](/docs/eleven-agents/customization/agent-workflows) are two alternative ways to add structure on top. Pick based on how much the conversation can vary.

| Requirement                                        | Use                                                                                        | Why                                                                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Simple proof of concept agent                      | System prompt only                                                                         | Fastest to set up and iterate on, but a single prompt gets unwieldy as the agent grows in scope.                                                           |
| Task where the agent can adapt wording and order   | [Free-form procedure](/docs/eleven-agents/customization/procedures/free-form-procedures)   | Keeps the whole conversation in one LLM's context, so the agent adapts wording and order and can follow unexpected turns. Uses more of the context window. |
| Task whose steps must run the same way every time  | [Structured procedure](/docs/eleven-agents/customization/procedures/structured-procedures) | Each step runs in the order you set, the same way every time, and you author it as a short list of steps.                                                  |
| Full control over complex branching and edge cases | [Workflow](/docs/eleven-agents/customization/agent-workflows)                              | Runs as a graph of subagents you design and connect yourself, with full control over branching and the model each step uses.                               |

## Limitations

* A procedure's content is capped at 50,000 characters.
* You cannot convert a procedure from one type to the other.
* Free-form procedures can be imported from a document or generated automatically. Structured procedures are built step by step.
* Free-form procedures can reference knowledge base documents and other procedures. Structured procedures cannot.

## Release status

Procedures are currently in Alpha. Expect the feature set, dashboard controls, and underlying schema to keep evolving before general availability; some changes may be breaking.