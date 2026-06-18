> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Coaching

Coaching is currently in Alpha. See details in [Release status](#release-status).

Coaching gives your agent an internal coach you can talk to in order to improve it.

## Overview

When coaching is enabled, your agent has a separate **coach agent** you interact with directly. The coach is focused on improving the coached agent — not on handling end-user conversations.

The coach can read the coached agent's system prompt, memories, and procedures. You can ask it to change configuration based on a specific conversation, a pattern you have noticed, or instructions you provide in chat.

### Memories

**Memories** are concise knowledge snippets the coached agent maintains and retrieves during conversations. Each memory has:

* **Summary**: A one-sentence, search-optimized description the agent uses to find relevant memories.
* **Text**: The full content — policies, steps, links, or other factual detail the agent should follow.

Memories are stored in a **memory base** on the coached agent. They are versioned, so updates create a new version rather than overwriting the previous one. Entries can have an optional expiry date.

Unlike a [knowledge base](/docs/eleven-agents/customization/knowledge-base), which holds large documents for retrieval, memories are short, targeted facts the agent curates over time. The coach is the primary way to create and update them. You can also view, edit, and delete memories from the **Memory** tab under **Knowledge Base** on your agent's page.

### What the coach can do

The coach can:

* Analyze a given conversation
* Modify the coached agent's system prompt
* Create, update, or delete memories
* Create, update, or delete procedures

### Proposals and approval

The coach does not apply changes automatically. When it identifies an improvement, it creates a **proposal** with a rationale and a diff showing exactly what will change.

Proposals start as **pending**. Open the **Coaching** tab on your agent's page to review them. Filter by status, type, or date range. Select a proposal to view its rationale and diff, then click **Approve** or **Reject**. You can also review proposals in Slack. Approved changes are applied to the coached agent immediately. Rejected proposals leave the configuration unchanged.

![Coaching tab showing pending proposals](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/500549e03d34f27ad0f27def46cb3285a5a6b3f7eaeb8ea55b7cbb6c90beda2a/assets/images/conversational-ai/coaching_tab.png)

| Type                | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| Memory entry create | Adds a new memory to the coached agent's memory base.                |
| Memory entry update | Refines an existing memory that is vague, outdated, or incomplete.   |
| Memory entry delete | Removes an outdated or incorrect memory.                             |
| Prompt change       | Modifies the coached agent's system prompt.                          |
| Procedure create    | Adds a new procedure the coached agent follows during conversations. |
| Procedure update    | Updates an existing procedure.                                       |
| Procedure delete    | Removes a procedure that is no longer needed.                        |

## Getting started

Open your agent in the dashboard. Go to **Settings**, open the **Advanced** tab, and toggle **Coaching** on.

![Coaching toggle in agent Advanced settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/a61523c305f3cedb2941c0f5781c1af895d9c314e21f4ce5165feb044c1909cd/assets/images/conversational-ai/coaching_enable.png)

To talk to the coach from Slack, create a [Slack trigger](/docs/eleven-agents/customization/integrations/slack) for your workspace and select **Agent name (coach)** as the agent. This routes messages in the connected channel to the coach instead of the coached agent.

## Examples

### Ask questions about a conversation in the dashboard

Go to the **History** tab and select a completed conversation.

![Analyze with coach button in conversation history](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/803acba254d6521b34316802d9f3fea17a6a7dca70637ee07a3a86b3e2df34a4/assets/images/conversational-ai/analyze_with_coach_button.png)

Click **Analyze with coach** to open the coach chat panel next to the transcript.

![Coach chat panel alongside a conversation transcript](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/4f6db78527770f8f28b0bac370c709957fbef8f7e1624e531349ffcf03b89ec9/assets/images/conversational-ai/conversation_coaching_side_panel.png)

Type a question or use a quick prompt (for example, "What went wrong?" or "How can the agent improve?"). Highlight a specific message in the transcript to focus the coach on that part of the conversation.

When the coach identifies an improvement, it creates a proposal.

![Coaching proposal with rationale and diff in the dashboard](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/ab9e8c730c3b37ddffebbd25bcc464cfe1814c97d8f4bcaba0a49d9814eceb92/assets/images/conversational-ai/coaching_proposal.png)

### Create a memory from Slack

When a coach Slack trigger is connected, you can manage the coached agent from Slack.

Send a message in the connected channel (for example, "Add a memory that refunds within 30 days are processed automatically").

The coach replies in the thread and posts a proposal with the proposed change and a diff. Use **Approve** or **Reject** on the message, or review it later on the agent's **Coaching** tab.

Proposal messages in Slack include the type, rationale, diff, and action buttons. When a proposal's status changes from Slack or the dashboard, the Slack message updates to match.

![Coaching proposal in Slack with Approve and Reject buttons](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/d77026e2fbf551bf6c2d2dedf056828d5879acd0d54f60f7b18539e48ae7d12b/assets/images/conversational-ai/slack_coaching.png)

## Coach chat

The coach chat supports multi-turn conversations. After the initial analysis, ask follow-up questions, request the coach to focus on a different aspect, or ask it to refine a proposal.

If you ask the coach to focus on a specific issue, it addresses only that issue and mentions other observations as follow-up suggestions rather than creating proposals for them.

## Best practices

Highlight a specific message in the transcript before asking the coach. Targeted questions produce more actionable proposals than broad reviews. Address multiple issues in separate questions within the same session.

As the coach creates memories over time, review them on the **Memory** tab under **Knowledge Base** to remove duplicates or outdated information.

## Troubleshooting

The underlying resource was modified after the proposal was created. Reject the stale proposal and start a new coaching session.

The coach only proposes changes when it identifies a clear improvement. If the conversation went well and the configuration already handles similar scenarios, the coach explains this instead.

## Release status

Coaching is currently in Alpha. Expect the feature set, dashboard controls, and underlying schema to keep evolving before general availability.

Breaking changes during this period mainly affect **existing proposals**. Pending proposals may fail to approve or reject, and older proposals may display incorrectly in the dashboard or in Slack. Changes that have already been **applied** to your agent are not affected.