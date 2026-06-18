> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Inbox

The inbox centralizes all receptionist interactions — call transcripts, voicemails, and questions the receptionist could not answer.

## Conversations

Every call handled by your receptionist is recorded with a full transcript, metadata (duration, time, phone number), and outcome summary (appointment booked, message taken, question answered).

Review conversations regularly to verify your receptionist's responses, spot incorrect information, and identify patterns that suggest new rules or knowledge base updates.

## Messages

When callers leave a message, it's captured with a priority level based on intent:

| Priority      | Meaning                         | Example                                               |
| ------------- | ------------------------------- | ----------------------------------------------------- |
| **Emergency** | Immediate attention needed      | "This is an emergency, I need to reach Dr. Smith now" |
| **Urgent**    | Time-sensitive but not critical | "I need to reschedule my appointment for tomorrow"    |
| **Normal**    | Standard message, no rush       | "Just calling to ask about your hours next week"      |

Messages arrive from three sources:

* **Phone calls** — Caller leaves a message during a conversation
* **Web chat** — Visitor leaves a message via the booking page widget
* **Manual** — You create a message record yourself

Emergency and urgent messages display a priority badge in the sidebar.

## Knowledge gaps

When a caller asks something your receptionist can't find in the knowledge base, it logs a **knowledge gap** — the question, conversation context, and caller details.

### How filling gaps improves your receptionist

When you write an answer to a knowledge gap:

1. All your receptionist agents regenerate with the new information
2. The answer becomes part of the receptionist's available knowledge immediately
3. Similar questions in future calls are answered using your response

This creates a direct feedback loop for improving call quality.

### Best practices

* **Review weekly** — Don't let unanswered gaps pile up
* **Be specific** — "Our return policy is 30 days with receipt" beats "We have a return policy"
* **Spot patterns** — If the same question appears repeatedly, add it to your knowledge base or update your website