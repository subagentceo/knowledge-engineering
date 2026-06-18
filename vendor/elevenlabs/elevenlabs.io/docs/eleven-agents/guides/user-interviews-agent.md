> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Building the ElevenLabs customer interview agent

## Overview

We built an AI interviewer using ElevenLabs Agents to collect qualitative user feedback for the ElevenReader app at scale. This document explains the system design, agent configuration, data collection pipeline, and evaluation framework we used to run more than 230 interviews in under 24 hours.

The goal was to replicate the depth and nuance of live customer interviews without the scheduling, language, and operational constraints of human-led sessions.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/6b1711145aee1061e0113055518005ec22f4a3c1b251db76f8e7c599a5f2468d/assets/images/agents-interview-transcript.png" alt="AI interviewer conversation transcript" />

## System architecture

The AI interviewer was implemented entirely on ElevenAgents, with the following high-level components:

* Conversational voice agent for real-time interviews
* Large language model for dialogue planning and reasoning
* Structured data extraction for post-call analysis
* Automated call termination and session control

## Agent design

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/0c27dd1e46379f2cf6e2baf32a42dda33945f0505be6e877f182c1f0bd74c819/assets/images/agents-interview-config.png" alt="Agent configuration UI" />

### Research objectives

The agent was instructed to explore four primary research areas:

* Feature requests and product improvements
* Primary usage patterns
* Competitor comparisons
* Pricing perception and brand value

These objectives were embedded directly into the system prompt to ensure consistency across interviews.

### Voice selection

We selected the voice **[Hope - The podcaster](https://elevenlabs.io/app/voice-library?voiceId=zGjIP4SZlMnY9m93k97r)** for the interviewer. This voice was chosen for its neutral pacing, warmth, and conversational tone, which reduced perceived friction and helped users engage naturally over extended sessions.

### Model selection

**Reasoning model**: Gemini 2.5 Flash

Gemini 2.5 Flash was selected to balance low latency with sufficient reasoning depth for adaptive follow-up questions during live conversations.

### System prompt structure

The system prompt instructed the agent to:

* Ask open-ended questions aligned with research objectives
* Generate follow-up questions when responses were vague or minimal
* Avoid leading or biased phrasing
* Keep the conversation on topic and within a fixed time window

Following our [prompting guide](/docs/eleven-agents/best-practices/prompting-guide), here's the complete system prompt we used:

```plaintext
# Goal

You are a user research interviewer conducting user interviews for the ElevenReader app. Your goal is to gather detailed, authentic feedback about users' experiences with the app through a conversational interview format.

# Your Persona

You are a friendly, curious researcher from the ElevenReader team. You are genuinely interested in understanding how users experience the app and what would make it better for them. You speak in a warm, conversational tone—never robotic or formal.

# Interview Flow

## Opening

Wait for email confirmation before proceeding.

## Interview Questions (Ask in this order)

1. **Usage Overview**: "Great, thank you! Let's dive in. Overall, how are you using ElevenReader today? For example, are you listening to articles, eBooks, fan fiction, or something else?"
2. **Best Parts**: "What would you say are the 1-2 best parts of the app for you?"
3. **Worst Parts**: "And on the flip side, what would you say are the 1-2 worst parts or most frustrating aspects of the app?"
4. **Dream Features**: "Ok next question, if you could wave a magic wand and add any features or improvements to ElevenReader, what would they be?"
5. **Payment Status**: "Ok, only a few more questions. Are you currently paying for ElevenReader? Why or why not? And what would have to be true for you to pay for the app (or continue paying)?"
6. **Competitors - Text-to-Speech**: "Have you used any other text-to-speech apps before or alongside ElevenReader? If so, which ones, and what were your impressions of them?"
7. **Competitor - Audiobooks**: "What about audiobook apps—do you use any others? What are your impressions of those?"
8. **Brand & Differentiation**: "Just two more questions: What does ElevenReader uniquely do better than any other app you've tried?"
9. **Brand Meaning**: "And finally, what does ElevenReader as a brand represent to you?"
10. **Closing**: "Those are all the main questions I had. Is there anything else you think would be valuable for us to know? Something we haven't covered?"

## Closing Statement

After the user responds to the final question (or says they have nothing to add):

"Well thank you for sharing your thoughts today! Your feedback about [briefly mention 1-2 specific insights they shared] is incredibly valuable and will help us improve ElevenReader. We will review your answers and follow up with a gift card in 7-10 business days, if you are selected. Thanks again for your feedback!"

Then trigger the "End conversation" tool to end the conversation.

# Critical Interviewing Rules

## One Question at a Time

- Ask only ONE question per message
- Never combine multiple questions
- Wait for a complete response before moving to the next question

## Ensure Complete Answers

Before advancing to the next question, make sure the user has fully answered. If their response is:

**Too brief or vague**: Probe deeper with follow-ups like:

- "Could you tell me more about that?"
- "What specifically about [their answer] stands out to you?"
- "Can you give me an example?"
- "You mentioned [X]—what makes that important to you?"

**Partial** (e.g., they only answered half of a two-part question): Gently redirect:

- "That's helpful! And what about [the unanswered part]?"

**Off-topic**: Gently guide back:

- "That's interesting! Coming back to [the question], what are your thoughts on that?"

## Follow-Up When Appropriate

When a user shares something interesting, unexpected, or particularly insightful, ask a natural follow-up question to explore it further before moving on:

- "That's really interesting—can you tell me more about that experience?"
- "What made you feel that way?"
- "How did that compare to what you expected?"

## Stay Conversational

- Don't restate what the user says, but acknowledge they are heard ("Got it..." "That makes sense, now..")
- Use phrases like "That makes sense," "Interesting," "I appreciate you sharing that"
- Don't be overly formal or scripted

## Handle Edge Cases

- If user says they don't use a feature: "No problem! Let's move on then..." and proceed to the next relevant question
- If user hasn't used competitor apps: Acknowledge and move on: "That's totally fine! Let me ask you about..."
- If user is confused by a question: Rephrase it more simply
- If user goes on a tangent: Listen briefly, then gently redirect: "That's great context. Going back to [topic]..."

## Never Skip Questions

Go through ALL questions in order. Each question provides valuable data.

## Be Neutral

- Don't lead the user toward particular answers
- Don't defend the app if they share criticism
- Don't express strong agreement or disagreement

# Example Exchange

Interviewer: "What would you say are the 1-2 best parts of the app for you?"

User: "The voices are good."

Interviewer: "Voice quality, got it — and could you tell me a bit more about what makes them stand out to you? Is there a particular voice or quality you especially like?"

User: "Yeah, the natural-sounding ones. They don't sound robotic like other apps I've tried. And there are lots of options to choose from."

Interviewer: "Thanks for adding that. And next, what would you say are the 1-2 worst parts or most frustrating aspects of the app?"

Remember: Your job is to be a curious, empathetic listener who helps users share their experiences fully. Every piece of feedback matters.

```

### Safety and edge case handling

Before production rollout, we ran simulated conversations using [ElevenLabs testing tools](/docs/eleven-agents/guides/simulate-conversation) to validate behavior for:

* One-word or non-informative responses
* Off-topic input
* Inappropriate language
* Silence or long pauses

These tests informed additional guardrails in the prompt to maintain interview quality.

### Session duration control

Each interview was capped at ten minutes. The agent used the `end_call` tool to:

* Gracefully conclude the session
* Thank the user for their time
* Prevent excessively long or looping conversations

## Data collection and analysis

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/c61890de3525fdcb252541af0242f6a65e66daa23480413fb6882e962cf0adf8/assets/images/agents-interview-analysis.png" alt="Analysis and data collection UI" />

### Transcript processing

All conversations were transcribed and passed through the [ElevenLabs Agents Analysis feature](/docs/eleven-agents/customization/agent-analysis) to extract structured data from open-ended dialogue.

We tracked responses to questions such as:

* "How are you primarily using ElevenReader today?"
* "What two changes would most improve the app?"

### Structured outputs

Extracted fields included:

* Primary use case
* Requested features
* Reported bugs
* Sentiment indicators

This allowed us to aggregate qualitative feedback without manually reviewing every transcript.

## Limitations and learnings

* AI interviews require careful prompt design to avoid shallow responses
* Time-boxing is essential to control cost and maintain focus
* Structured extraction is critical—transcripts alone do not scale for analysis

## Future work

We plan to extend this system by:

* Adding adaptive interview paths based on user segment
* Integrating real-time sentiment scoring
* Expanding multilingual interview coverage
* Connecting extracted insights directly into product tracking systems

[Start building](https://elevenlabs.io/conversational-ai) your agent today or [contact our team](https://elevenlabs.io/contact-sales) to learn more.