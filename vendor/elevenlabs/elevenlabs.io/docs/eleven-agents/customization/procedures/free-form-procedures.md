> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Free-form procedures

Free-form procedures are currently in Alpha. See details in [Release status](#release-status).

## Overview

A free-form procedure describes one task in plain, natural language. The agent interprets the instructions and adapts the wording and order to the situation. A free-form procedure can call tools (including system tools like ending a call), look up knowledge base documents, and chain to other procedures.

## When to use a free-form procedure

Use a free-form procedure when the agent can adapt wording and order to fit the situation, and you want to author it quickly in plain language. For how it compares to structured procedures, workflows, and the system prompt, see [When to use procedures](/docs/eleven-agents/customization/procedures#when-to-use-procedures).

## Anatomy of a procedure

Here is a refund procedure in the editor:

![Refund procedure
example](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/e1264b7a4f94403453087d30ef0894e72d412ba69378e6b8cb1b675e53e887b7/assets/images/conversational-ai/procedures/refund-procedure-example.png)

A procedure has two main parts: a trigger and content. Both can contain inline references to other resources, shown in the screenshot above as tags with wrench icons. Each procedure also has a name shown in the dashboard.

### Name

A short label that identifies the procedure in the dashboard. The name is never sent to the LLM, so it does not affect agent behavior.

### Trigger

A description of when the agent should use this procedure, for example *When the user asks to refund an order*.

### Content

The body of the procedure, written in markdown. Content describes what the agent should do: ask a question, look up an order, call a tool, or end the call. It can be a numbered sequence of steps to follow, or general guidance for the situation. Each step or guideline can be a single sentence (*Ask the user for their order ID*) or a short paragraph that explains what to do and why.

Use numbered steps for sequential actions and bullet points for requirements or sub-items within a step.

### Inline references

Procedures can reference different kinds of resources inline:

* Tools (e.g. look up an order, charge a card, end the call, transfer to a human)
* Knowledge base documents
* Other procedures

Use inline references whenever a step needs the agent to use a tool, knowledge base document, or another procedure. References auto-attach the resource to the procedure so the agent can use it. Plain prose mentions (like *use the calculator tool here*) also work, but only if the resource is already attached to the agent.

Insert a reference by typing `/` in the trigger or content and choosing the resource from the slash menu. References appear as clickable tags in the editor. Click a tag to open the underlying resource and confirm its configuration.

A reference in the trigger lets the procedure fire based on a resource's output, for example *When `get_user` returns tier 'gold'*. A reference in content tells the agent to invoke or consult the resource at that step.

![Slash menu in the procedure editor](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/8625ffec0f5584619e6ccb97720fd86f2e8d3cd0061308ad87b57f176e5535e3/assets/images/conversational-ai/procedures/slash-menu.png)

If a referenced resource is deleted later, or your account loses access to it, the tag shows as broken. The **Errors** badge at the top of the editor lists these references: *invalid* if the resource no longer exists, or *unavailable* if it exists but your account does not have access. Open the badge to see which step is affected and fix or remove the reference.

![Errors dialog listing invalid
references](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/e9ec6b19be2992da80a726883baf53265a5d5b38621373cd7e60375c944674cd/assets/images/conversational-ai/procedures/reference-tags.png)

## Importing from a document

You can bootstrap from an existing standard operating procedure (SOP). Choose **From SOP** in the procedure list **+** menu, then upload a file.

Supported formats: `PDF`, `DOCX`, `TXT`, `MD`, `HTML`, `EPUB`. Files must be 20 MB or smaller.

The importer analyzes the document, identifies up to 10 distinct procedures, and creates a draft for each one with a generated name, trigger, and content. Open each draft to refine it. If your document contains more than 10 SOPs, split it into smaller files before uploading.

![Upload SOP dialog](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/716601fc90dea757e23971e5aabe063e6a66fc0f75878247dc9f1fc3011f5197/assets/images/conversational-ai/procedures/upload-sop.png)

## Best practices

The agent has to pick the right procedure from its trigger and follow the content. More capable
models do this more reliably as the number of procedures grows. See
[Models](/docs/eleven-agents/customization/llm) for options.

Writing procedures well means writing two parts well: a trigger that runs the procedure when it should, and content the agent can follow.

### Writing triggers

Overlapping or vague triggers cause the wrong procedure to run. Prefer *When the user asks to
cancel a subscription* over *When the user has a question about their account*.

Describe what the user is asking for, not what the agent should do. Triggers phrased as agent
actions are less reliable.

A narrow trigger can miss real requests when the user phrases things differently. Include the
variations the user might say. *When the user asks to refund, return, or get money back for an
order* runs more reliably than *When the user requests a refund*.

### Writing content

Write steps as instructions to the agent: *Look up the customer's last order* rather than *You
should look up the customer's last order*. Direct instructions are easier to follow than
suggestions.

Reasoning generalizes to edge cases the procedure does not enumerate. A short *because we need
the order ID to issue a refund* helps the agent handle situations the steps did not anticipate.
Avoid all-caps MUSTs and rigid scripts where a one-line explanation would do the same work.

If a procedure starts branching into unrelated outcomes, split it into smaller procedures and
let the agent route between them.

### Composing procedures

If the same steps show up across multiple procedures (verifying a customer's identity, looking
up an order, escalating to a human), extract them into a dedicated procedure and reference it
from each one that needs it via the slash menu. Maintaining the shared steps in one place keeps
every procedure that uses them consistent.

Tone, identity, refusal policies, and guardrails belong in the [system
prompt](/docs/eleven-agents/best-practices/prompting-guide). Put task-specific steps in
procedures.

Procedures are part of the agent's configuration, so they snapshot together when you publish a
new agent version. To roll back to an earlier set of procedures, restore an earlier agent
version. See [Agent versioning](/docs/eleven-agents/operate/versioning).

If your team already has SOPs, use the importer to turn them into drafts and refine from there.

## Release status

Free-form procedures are currently in Alpha. Expect the feature set, dashboard controls, and underlying schema to keep evolving before general availability; some changes may be breaking.