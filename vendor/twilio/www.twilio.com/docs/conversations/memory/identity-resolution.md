# Identity Resolution

Identity Resolution is how Conversation Memory creates, matches, and merges customer profiles across channels.

When a customer contacts you through any channel — Voice, SMS, WhatsApp, or Email — Conversation Memory needs to determine who that customer is and whether a profile already exists for them. Identity Resolution is the process that makes this determination: it decides whether to create a new profile, add data to an existing one, or merge profiles where identifiers overlap.

## The building blocks

Identity Resolution is built on four interconnected concepts that work together to identify and track your customers:

| Concept       | Description                                                                                                                  | Example / Notes                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Trait         | Any factual attribute about a customer.                                                                                      | Name, address, subscription tier, language preference, zip code       |
| Identifier    | A trait promoted to uniquely identify a customer across interactions.                                                        | Email address, phone number, User ID                                  |
| Identity Rule | Configuration that governs how an identifier is used for matching, storage, and normalization.                               | Phone: exact match, up to 100 values, FIFO eviction set by default    |
| Profile       | The unified container for all customer data resolved via identity, including traits, observations, and conversation history. | Jim's full record: name, phone, email, past interactions, preferences |

## How Identity Resolution works

When a new conversation arrives, Conversation Memory extracts identifiers from the event and checks them against existing profiles in priority order. One of three outcomes results:

![Identity Resolution flow](https://docs-resources.prod.twilio.com/0ee7facca734103ee506a8e707a9b5775a7b1959b316eca8ec85c898a8c79544.png)

## Multichannel Identity Resolution

A customer can be recognized across different channels as long as an identifier is present and hydrated for each channel into the customer profile. In the example below, a phone identifier and an email identifier both belong to the same person — and Identity Resolution links both channel interactions to a single unified profile.

![Multichannel Identity Resolution](https://docs-resources.prod.twilio.com/0604b016fd8448bb607247387db58d91f906f3ef707fb282cc92eea7430dba4d.png)

## Default Identity Rules

Every Conversation Memory store is provisioned with four default Identity Rules. These are reserved, automatically normalized, and mapped to incoming traffic from their respective Twilio channels:

| Identifier   | Channel              | Notes                                                      |
| ------------ | -------------------- | ---------------------------------------------------------- |
| **email**    | Email                | Normalized to lowercase; case-insensitive matching         |
| **whatsapp** | WhatsApp             | Automatically mapped from incoming Twilio WhatsApp traffic |
| **phone**    | Voice, SMS, RCS, MMS | Automatically normalized to E.164 format before matching   |
| **chat**     | Chat                 | Normalized using trim; string passed by a consumer or app  |

## Identity Rule Priority

When an incoming event contains multiple identifiers, Identity Resolution evaluates them in priority order — the highest-priority identifier is checked first, and the first match wins. An example of a typical priority order is:

* **user\_id (Priority 1)** — Most stable and unique; sourced directly from your own systems.
* **email (Priority 2)** — Reliably unique in most deployments; low risk of being shared.
* **whatsapp (Priority 3)** — Reliably unique in most deployments; low risk of being shared.
* **phone (Priority 3)** — Widely used but can change or be reassigned over time.
* **chat (Priority 4)** — Can change or be reassigned often.

> \[!NOTE]
>
> Conversation Memory works out of the box with Twilio Conversations and channels. However, the most consistent cross-channel experience comes from proactively uploading customer profiles before interactions begin — linking identifiers such as User ID, phone, email, and WhatsApp number together in a single profile.
>
> Example: Jim contacts your support team via SMS. Conversation Memory creates a profile linked to his phone number. A week later, Jim emails your support address — but because no email identifier was pre-linked to his phone profile, Conversation Memory creates a second profile. Your agent sees no prior context and must start from scratch.
>
> With proactive hydration, Jim's profile is uploaded in advance with his user\_id, phone, and email all linked together. When Jim contacts you via any channel — SMS, email, WhatsApp, or Voice — Conversation Memory instantly resolves his identity to the same unified profile, ensuring agents have complete context.
