> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Structured procedures

Structured procedures are currently in Alpha. See details in [Release status](#release-status).

## Overview

A structured procedure is a [procedure](/docs/eleven-agents/customization/procedures) that runs a fixed sequence of steps. A [free-form procedure](/docs/eleven-agents/customization/procedures/free-form-procedures) is natural-language guidance the agent interprets and adapts to the situation. A structured procedure is an ordered list of typed steps the agent runs in order every time the procedure applies.

Use a structured procedure when specific steps must happen the same way on every call: verifying a caller's identity, escalating a ticket, or taking a payment. You author it as a short list of plain-language steps.

Like every procedure, a structured procedure has a trigger that describes when it applies. When a conversation matches the trigger, the agent runs the procedure's steps in order, then returns to the rest of the conversation.

![Structured procedure
editor](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/bc996f67b2afad8f1de5abe8febcf8af3766b4f098627b0ae60e0456b3c2703b/assets/images/conversational-ai/procedures/structured-procedure-example.png)

## When to use a structured procedure

Use a structured procedure when specific steps must run the same way every time, but you still want to author quickly in plain steps. For how it compares to free-form procedures, workflows, and the system prompt, see [When to use procedures](/docs/eleven-agents/customization/procedures#when-to-use-procedures).

## Anatomy of a structured procedure

A structured procedure has three parts: a name, a trigger, and an ordered list of steps.

### Name

A short label that identifies the procedure in the dashboard. The name is never sent to the LLM, so it does not affect agent behavior.

### Trigger

A plain-language description of when the agent should run this procedure, for example *When the user asks to refund an order*. The agent compares the user's intent against each procedure's trigger and runs the matching one, so triggers should be concrete and distinct. A trigger works the same way as for any procedure; see [Writing triggers](/docs/eleven-agents/customization/procedures/free-form-procedures#writing-triggers).

### Steps

The procedure body is an ordered list of typed steps. There are multiple step types, and you combine them to describe the task.

| Step     | What it does                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------- |
| **Ask**  | Requests information from the user, then waits for an appropriate response before advancing.      |
| **Tell** | Has the agent generate a single message in its own words to convey your instruction.              |
| **Say**  | Has the agent speak a single message, word for word.                                              |
| **Tool** | Calls a specific tool or API. The agent does not speak during a Tool step; it only runs the tool. |
| **If**   | Branches the flow: runs nested steps when a condition holds, then rejoins the main flow.          |

![Structured procedure step type
menu](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/14976a6b9979d21fd7c77541a49e7475f8aa0764af4940746d3390804e7c4598/assets/images/conversational-ai/procedures/step_type_menu.png)

### Branching with If steps

An **If** step holds a condition and a nested list of steps. When the condition holds, the agent runs the nested steps and then continues with the rest of the procedure. When it does not, the agent skips them and continues. A condition can be expressed two ways:

* **Natural language** — the agent decides at runtime whether the case applies, for example *the user has more than one workspace*. Use this to branch on something the agent learned during the conversation, including the user's answer to an earlier Ask step.
* **Expression** — a precise comparison over [dynamic variables](/docs/eleven-agents/customization/personalization/dynamic-variables), for example `{{system__agent_turns}} == 0`. Use this when the decision can be stated exactly.

A few structural rules keep If steps unambiguous:

* A procedure cannot start with an If step, since it needs a preceding step to branch from.
* If steps cannot be nested inside other If steps.
* Two If steps cannot be placed back to back. Put another step between consecutive If steps.
* To branch on the user's free-text answer to an Ask step, use a natural-language condition rather than an expression.

Write each condition as a plain description of the case, phrased affirmatively or negatively
rather than as true/false. Prefer *NOT a billing question* over *false if it is a billing
question*. When a condition depends on a value you already know, use a fixed value or [dynamic
variable](/docs/eleven-agents/customization/personalization/dynamic-variables) instead of asking
the agent to work it out.

## How a structured procedure runs

When the user's request matches a procedure's trigger during a conversation, the agent enters the procedure and runs its steps in order, the same way every time. While inside the procedure, the agent focuses on those steps; when it reaches the end, it returns to where it left off in the conversation.

If a Tool step fails, the procedure stops at that point and does not run the remaining steps. Use an If step when you need the agent to handle a failure gracefully.

## Best practices

Each step type already enforces its own behavior, so you rarely need to spell it out. Write the
intent of each step and let the step type do the rest. The guidance below covers the cases worth
getting right.

### Writing steps

An Ask step does not advance until it has asked your question and received an appropriate
answer. You do not need a follow-up step to check that the information was collected; the Ask
step guarantees it before moving on.

A Tool step only runs the tool; the agent cannot speak or make a decision during it. To talk to
the user or branch on what the tool returned, put that in a separate step before or after the
Tool step.

Use a Tell step when the agent should compose the message itself, and a Say step when the
wording must be verbatim. Both deliver exactly one message, so there is no need to instruct a
step to send a single message.

### Composing procedures

The general guidance for composing procedures applies to structured procedures too — see [Composing procedures](/docs/eleven-agents/customization/procedures/free-form-procedures#composing-procedures) on the Free-form procedures page.

One pattern is specific to mixing types: a free-form procedure can reference a structured one. Keep open-ended handling in a free-form procedure and delegate the parts that must run the same way every time, such as identity verification or escalation, to a structured procedure.

## Limitations

* If steps cannot be nested, a procedure cannot start with an If step, and two If steps cannot be placed back to back.

See [Procedures](/docs/eleven-agents/customization/procedures#limitations) for limits that apply to all procedures, including the content size cap and how structured procedures differ from free-form ones.

## Release status

Structured procedures are currently in Alpha. Expect the step types, conditions, dashboard controls, and underlying schema to keep evolving before general availability; some changes may be breaking.