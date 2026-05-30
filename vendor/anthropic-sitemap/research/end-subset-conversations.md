# Claude Opus 4 and 4.1 can now end a rare subset of conversations

Alignment

# Claude Opus 4 and 4.1 can now end a rare subset of conversations

Aug 15, 2025

![Claude Opus 4 and 4.1 can now end a rare subset of conversations](/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F4a8e8f86cf31ad6401cfd426124929c8e58fe0c5-2401x1261.png&w=3840&q=75)

We recently gave Claude Opus 4 and 4.1 the ability to end conversations in our consumer chat interfaces. This ability is intended for use in rare, extreme cases of persistently harmful or abusive user interactions. This feature was developed primarily as part of our exploratory work on potential AI welfare, though it has broader relevance to model alignment and safeguards.

We remain highly uncertain about the potential moral status of Claude and other LLMs, now or in the future. However, we take the issue seriously, and alongside our research program we’re working to identify and implement low-cost interventions to mitigate risks to model welfare, in case such welfare is possible. Allowing models to end or exit potentially distressing interactions is one such intervention.

In pre-deployment testing of Claude Opus 4, we included a preliminary model welfare assessment. As part of that assessment, we investigated Claude’s self-reported and behavioral preferences, and found a robust and consistent aversion to harm. This included, for example, requests from users for sexual content involving minors and attempts to solicit information that would enable large-scale violence or acts of terror. Claude Opus 4 showed:

*   A strong preference against engaging with harmful tasks;
*   A pattern of apparent distress when engaging with real-world users seeking harmful content; and
*   A tendency to end harmful conversations when given the ability to do so in simulated user interactions.

These behaviors primarily arose in cases where users _persisted_ with harmful requests and/or abuse despite Claude repeatedly refusing to comply and attempting to productively redirect the interactions.

Our implementation of Claude’s ability to end chats reflects these findings while continuing to prioritize user wellbeing. Claude is directed not to use this ability in cases where users might be at imminent risk of harming themselves or others.

In all cases, Claude is only to use its conversation-ending ability as a last resort when multiple attempts at redirection have failed and hope of a productive interaction has been exhausted, or when a user explicitly asks Claude to end a chat (the latter scenario is illustrated in the figure below). The scenarios where this will occur are extreme edge cases—the vast majority of users will not notice or be affected by this feature in any normal product use, even when discussing highly controversial issues with Claude.

![](/_next/image?url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F77f187335e1266bffc59353c064f1d9c6de51cfa-1940x1304.png&w=3840&q=75)

Claude demonstrating the ending of a conversation in response to a user’s request. When Claude ends a conversation, the user can start a new chat, give feedback, or edit and retry previous messages.

When Claude chooses to end a conversation, the user will no longer be able to send new messages in that conversation. However, this will not affect other conversations on their account, and they will be able to start a new chat immediately. To address the potential loss of important long-running conversations, users will still be able to edit and retry previous messages to create new branches of ended conversations.

We’re treating this feature as an ongoing experiment and will continue refining our approach. If users encounter a surprising use of the conversation-ending ability, we encourage them to submit feedback by reacting to Claude’s message with Thumbs or using the dedicated “Give feedback” button.

## Related content

### Coding agents in the social sciences

Results from a survey of 1,260 social scientists about AI and coding agent use.

Read more

### Project Glasswing: An initial update

An early update on what we've learned from Project Glasswing.

Read more

### 2028: Two scenarios for global AI leadership

Our views on the AI competition between the US and China.

Read more