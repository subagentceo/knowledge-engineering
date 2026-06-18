# Conversation Memory key terms

This page defines the core terms and concepts for Conversation Memory.

## Memory store

A memory store is the top-level resource for all Conversation Memory data. Profiles, identifiers, traits, observations, and summaries all live inside a store, which defines the boundary for how data is organized and resolved.

For detailed information about memory stores, including what they contain, when to create multiple stores versus reusing a single store, and architecture patterns, see [Memory stores](/docs/conversations/memory/memory-stores).

***

## Profiles

A profile is a unifying container that organizes all data relevant to an individual customer, including their identifiers, traits, events, and observations.

All memory types, including traits, observations, and summaries, are associated with a customer profile. Twilio uses [Identity Resolution](#identity-resolution) for every conversation to determine if a new customer profile should be created or if the incoming conversation should be added to an existing profile.

### Add external profile data

You can build profiles with contextual data from Conversations on Twilio or add external profile data that lives outside of Twilio Conversations. To add external data, use a [CSV upload](/docs/conversations/memory/getting-started#optional-add-user-data-to-your-memory-store), or directly call the profiles endpoint.

When you upload a CSV, you can include traits and categorize them into groups. For example, you can upload traits that help your AI agents with filtering or additional context like payment tier, VIP status, location, or other relevant information.

### Profiles billing

Twilio categorizes Profiles billing into two areas based on data movement:

* Customer Profile Operations (how data gets in)
* Daily Utilized Profiles (how data is used)

#### Customer profile operations

These operations are customer-initiated or Twilio-initiated creates, updates, or identity merges.

*To encourage a robust identity graph, the first 100,000 operations each month are at no cost.*

#### Daily utilized profiles

This metric tracks profile record retrieval for interactions. Any profile lookup or reads performed by an agent, an API, or a Twilio product trigger this metric. A profile is counted only once per 24-hour period, regardless of how many times that specific record is accessed or activated during that window.

> \[!NOTE]
>
> Usage data may take up to 4 hours to reflect in the Usage summary and Usage API. If you have free trial units available, those will be consumed before anything is billed. You'll be billed only after your free trial units are exhausted. Any fractional usage is rounded up to the next whole unit at the end of your billing cycle.
>
> For more information regarding billing and pricing, see [Conversation Memory pricing](https://www.twilio.com/en-us/products/conversational-ai/pricing#memory).

## Enterprise Knowledge

[Enterprise Knowledge](/docs/conversations/knowledge) is a centralized, searchable repository for documents and web content. It allows AI and human agents to access accurate, approved information during customer interactions, reducing errors and ensuring responses are based on trusted sources rather than model hallucinations.

With Enterprise Knowledge, your documents, websites, and content become instantly accessible to agents, enabling efficient and informed conversations.

You can use Enterprise Knowledge as a standalone tool, or together with Conversation Memory.

When using Enterprise Knowledge, there are two terms you need to know:

* **Knowledge base**: Organizes knowledge resources into containers that can be semantically indexed and searched to provide contextual information for AI and retrieval use cases.
* **Knowledge source**: Unstructured or semi-structured data (web pages, documents, text, database extracts, files) processed into searchable chunks for information retrieval and AI workflows.

### Enterprise Knowledge billing

Enterprise Knowledge is billed in two distinct meters: Knowledge Storage (hosting your data) and Knowledge Retrieval (querying it).

#### Knowledge Storage

Knowledge Storage is a meter that measures the hosting of enterprise documents, policies, and reference materials indexed for semantic retrieval.

Twilio bills this meter every hour after taking a snapshot of the total raw storage in the system. Twilio calculates your total usage based on the gigabyte hours of data hosted.

For file uploads, billing is based on the raw file size before processing. For web crawling, each successfully crawled page is treated as 0.5 megabyte (MB).

#### Knowledge Retrieval

Knowledge Retrieval is a meter that measures the frequency with which documents or policies are surfaced from your knowledge base. Every successful knowledge search you perform via a `POST` to the `/Search` endpoint triggers this meter.

Twilio counts a successful retrieval as every time the API returns a success response. You aren't billed for requests that time out or return a 400-level error.

> \[!NOTE]
>
> Usage data may take up to 4 hours to reflect in the Usage summary and Usage API. If you have free trial units available, those will be consumed before anything is billed. You'll be billed only after your free trial units are exhausted. Any fractional usage is rounded up to the next whole unit at the end of your billing cycle.
>
> For more information regarding billing and pricing, see [Enterprise Knowledge pricing](https://www.twilio.com/en-us/products/conversational-ai/pricing#knowledge).

## Observations

Observations are pieces of information extracted from conversations, such as behaviors, mood, preferences, or facts, which help agents adapt to real-time needs.

Observations are free-form phrases that are transient, contextual, and often represent a pattern or behavior. For example:

* "Prefers email over phone"
* "User appeared frustrated when describing issues with their cell provider."
* "Enjoys hiking in Europe."

Conversation Memory stores observations as snippets of information from each conversation. AI agents can then use these observations to understand past interactions and personalize future responses.

## Summaries

Summaries are short textual recaps of a conversation with a customer. They cover key discussion points, issues raised, and outcomes. Conversation Memory automatically generates summaries when a conversation ends or goes inactive.

## Traits

Traits are structured, lasting facts about a customer, like their name, email, subscription status, or customer tier.

Traits are user attributes. They are declared key-value pairs like name, plan, or language that are relatively stable over time and used for personalization, grouping customers, and applying business rules in a memory system.

Traits help agents quickly access key user information, allowing them to provide more relevant, personalized, and efficient support or recommendations during each interaction.

To add traits to profiles, you can include them in a CSV file and upload it. For the traits to upload correctly, they need a matching identifier, which helps map them to the right profiles.

Some examples of traits include:

* `name`
* `email`
* `customerTier`

## Identifiers

Identifiers are important pieces of information, such as phone numbers, email addresses, or internal user IDs. They help connect customer interactions, history, and details to a single, main Unified Profile. Identifiers show if new data, like an event or observation, belongs to an existing profile or a new one. They also help retrieve data like traits and observations.

Unlike traits, which describe information for personalization, identifiers are unique keys that help find and combine the whole profile.

By linking and resolving identities, Conversation Memory makes sure AI agents always get the full and correct context for a customer, no matter which channel or identifier they used to start the interaction.

Twilio uses identifiers to decide how to add new data to customer profiles:

* If the new data's identifiers don't match any existing profile, Twilio creates a new profile.
* If the identifiers match an existing profile, Twilio adds the data to that profile.
* If the identifiers match more than one profile, like when an email is linked to one profile and a phone number to another, Twilio merges the profiles and adds the data to the combined profile.

Some examples of identifiers include:

* `email:customer@example.com`
* `phone:12345678910`
* `userID:0000000000000000001`

## Identity Resolution

Identity Resolution is the process of linking events and data to specific users. With this process, you can decide whether to create a new user profile or add a new conversation to an existing one.

When a new conversation comes in, Conversation Memory looks for profiles that match any identifiers from your traits or the conversation's metadata, such as a phone number. Depending on whether a match is found, one of three actions will occur:

* **Create a new profile**: If no existing profiles have matching identifiers, Conversation Memory will create a new user profile.
* **Add to an existing profile**: If one profile matches all identifiers in a conversation, Conversation Memory will try to match the traits and identifiers to that profile. If there are extra identifiers, Conversation Memory will use the [identity rules](#identity-rules) described below.
* **Merge existing profiles**: If multiple profiles match the identifiers in an event, Conversation Memory will check the identity rules and try to merge the profiles.

### Identity rules

Identity rules are the guidelines that decide how identifiers, like phone numbers or email addresses, are used to create, match, and merge user profiles. These rules specify which data pieces are used for matching, whether identifiers need to be unique and linked to just one profile, and how to handle conflicts and limits. Identity rules help determine if new data should be added to an existing profile or if it should create a new one.

### Identity Resolution priority

Identity Resolution priority determines the search order in which Twilio checks identifiers, like phone numbers or emails, when a new event, such as a message, comes in.

When an event arrives with multiple identifiers, Twilio starts by looking for an existing profile using the highest priority identifier. For example, if both a phone number and an email are present, Twilio will first try to match the identifier with the highest priority. If it finds a match, it stops searching.

If the identifiers in an event match two different profiles, priority rules decides which profile should be used.

If adding a new piece of data exceeds a profile's limit (for example, a profile can only have 1 `user_id`) Twilio looks at the priority. It will keep the higher-priority identifier and ignore or demote the lower priority one to prevent corrupting the profile.

Here is a typical order of priority for identifiers:

* `user_id` (priority 1): This is usually the most stable unique ID from your database.
* `email` (priority 2): This identifier is generally reliable but can sometimes be shared among users.
* `phone` (priority 3): Useful for SMS and voice calls but can change or be reassigned.

### Default identifiers

To support Identity Resolution, Conversation Memory uses default identifiers for every supported channel. These are reserved names to map incoming data to the correct profile.

Default identifiers for Conversation Memory include:

* `email`
* `whatsapp`
* `phone`
* `chat`

These default identifiers are protected:

**Reserved names**: You can't create, rename, or overwrite a trait or identifier using a reserved name. For example, you can't create a custom trait named `whatsapp`.

**Automatic setup**: These are provisioned immediately when a memory store is created or updated.

**Error Handling**: Attempting to use a reserved name for a custom identifier will return an error.

## Conversation Memory billing

Billing for Conversation Memory is divided into two distinct actions: creating the memory (Memory Generation) and retrieving it later (Memory Recall).

### Memory Generation

Memory Generation is a character-based metric that measures the volume of data processed to create conversation summaries or specific profile observations. You trigger this meter every time Conversation Memory runs an execution to generate observations or a conversation summary.

Total usage is calculated based on the combined input and output characters for both the Summary and Observation processes.

Because the Summary run and the Observation run are processed as two separate executions, Twilio counts the input characters (including the conversation transcript and system prompt) for each individual run alongside the output characters (observations and summary content).

* Observation runs occur when a Conversation is inactive and ends. Depending on your conversation configurations, this may run multiple times per conversation generating more billable characters.
* Summary runs occur when a Conversation ends.

See below for an example of how many input and output characters you can expect for Summary and Observation processes.

|            | Summary run                  | Observation run                                                                                |
| ---------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| Transcript | Characters in the transcript | Characters in the transcript                                                                   |
| Prompt     | About 4,000 characters       | About 2,000 characters                                                                         |
| Output     | About 1,000 characters       | About 2,000 characters (\~200 characters per observation x \~10 observations per conversation) |

### Memory Recall

Memory Recall measures the retrieval of stored memories to provide relevant context from a customer's prior interactions. You trigger this meter with every successful semantic search performed using a `POST` to the /Recall endpoint. A query is counted as one successful execution regardless of the result set size. Calls that return zero matches are billable but failed requests (4xx or 5xx) aren't billable.

> \[!NOTE]
>
> Usage data may take up to 4 hours to reflect in the Usage summary and Usage API. If you have free trial units available, those will be consumed before anything is billed. You'll be billed only after your free trial units are exhausted. Any fractional usage is rounded up to the next whole unit at the end of your billing cycle.
>
> For more information regarding billing and pricing, see [Conversation Memory pricing](https://www.twilio.com/en-us/products/conversational-ai/pricing#memory).
