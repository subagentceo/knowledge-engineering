> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Call settings

Call settings control how inbound calls are handled — who answers first, when to transfer, and which numbers to block.

## Answering mode

Answering mode determines who picks up the phone first when a call comes in.

### AI agent first (default)

The AI receptionist answers immediately. Best for businesses that want 24/7 coverage without human involvement.

### Staff first

Your staff's phone rings first. If nobody answers within the configured ring time (5–60 seconds), the AI receptionist takes over.

When staff-first is enabled, you configure:

| Setting                    | Description                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| **Staff phone number**     | The number to ring first                                                                        |
| **Max ring time**          | How long to ring before AI takes over (5–60 seconds)                                            |
| **Hold music**             | What the caller hears while waiting (ambient, classical, electronica, guitars, rock, soft-rock) |
| **Connecting message**     | Spoken to the caller while ringing staff                                                        |
| **Agent fallback message** | Spoken when staff doesn't answer and AI takes over                                              |
| **Staff answering hours**  | Schedule when staff-first is active (outside these hours, AI answers directly)                  |

Staff-first mode is useful during business hours when you prefer personal interaction, with AI as
a safety net for missed calls.

## Call transfer rules

Transfer rules let your receptionist route calls to specific people or departments based on what the caller says. You can create up to **10 transfer rules** per receptionist.

Each rule has:

* **Label** — Short name (1–200 characters)
* **Condition** — When to trigger, in natural language (1–2000 characters)
* **Destination** — Phone number to transfer to

### Example transfer rules

| Label           | Condition                                                 | Destination         |
| --------------- | --------------------------------------------------------- | ------------------- |
| Owner           | Caller asks to speak with the owner or manager            | Owner's mobile      |
| Billing         | Caller has questions about billing, payments, or invoices | Finance line        |
| Emergency       | Caller describes an emergency or urgent medical situation | Emergency contact   |
| Specific person | Caller asks for Sarah by name                             | Sarah's direct line |

## Blocked numbers

Block specific phone numbers from reaching your receptionist. Blocked callers are rejected immediately. Numbers can also be blocked directly from a conversation history or client profile.