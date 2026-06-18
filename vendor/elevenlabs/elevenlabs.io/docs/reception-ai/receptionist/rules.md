> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Rules

Rules let you control your receptionist's behavior beyond its default capabilities. Each rule is a natural language instruction that your receptionist follows during calls. You can have up to **50 rules** per receptionist.

## Rule priority

Each rule has a priority level that controls how strictly your receptionist follows it:

| Priority       | Behavior                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------- |
| **Strict**     | The receptionist must always follow this rule, no exceptions                             |
| **Suggestion** | The receptionist treats this as guidance but may deviate if the conversation requires it |

Use strict for hard business rules (pricing, legal requirements, safety). Use suggestion for stylistic preferences and soft guidelines.

## Example rules

| Priority   | Title                    | Description                                                                                          |
| ---------- | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| Strict     | No medical advice        | Never provide medical advice. Always recommend the caller schedule an appointment with a specialist. |
| Strict     | Confirm phone number     | Always confirm the caller's phone number before booking any appointment.                             |
| Suggestion | Mention discount         | When booking a first appointment, mention our 20% new client discount.                               |
| Suggestion | After-hours greeting     | If someone calls outside business hours, let them know our hours and offer to take a message.        |
| Strict     | No competitor discussion | Never discuss competitor products, pricing, or services.                                             |
| Suggestion | Upsell add-ons           | When booking a haircut, suggest adding a conditioning treatment.                                     |

## Best practices

* Use **strict** sparingly — only for non-negotiable business rules
* Keep descriptions specific and actionable
* Test after adding rules to verify they work as expected
* Fewer focused rules work better than many vague ones