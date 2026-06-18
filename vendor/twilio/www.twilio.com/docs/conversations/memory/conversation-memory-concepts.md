# Conversation Memory concepts

Use the [Recall endpoint](#recall-endpoint) to read data from your customer's profiles during a conversation. After a conversation is complete, Twilio [writes new data to your customer profiles as observations](#observation-extraction).

## Recall endpoint

The Recall endpoint uses both semantic search and lexical search to return the most relevant memories about your customer. Recall can accept a custom query to run the vector search, but if you don't provide a query in your call, Twilio uses contextual query expansion methods to infer one from the last ten conversation turns. If you don't provide a conversation ID in your call, Twilio returns the most recent observations and conversation summaries collected about your customer.

You can further narrow the scope of your search by providing optional date ranges and result limits.

When using Conversation Memory with [Twilio Agentic Framework (TAC)](/docs/conversations/agent-connect/), Twilio automatically calls Recall on each turn for messaging. For [Programmable Voice](/docs/voice/), you can choose the Recall frequency to optimize for latency and agent performance.

For more information about how to use the Recall endpoint, see [Recall conversation data](/docs/conversations/memory/api-quickstart#recall-conversation-data).

## Observation extraction

After your customer finishes their conversation with your agents, Conversation Memory automatically extracts observations, or unstructured facts about your customer, from the conversation.

Twilio then compares potential observations gained from the latest conversation against the observations currently on a customer's profile.
Potential observations can then be:

* **Added to your customer's profile**: if incoming observations don't match to or conflict with any existing observations, they're added to your customer's profile as-is.
* **Reconciled against an existing observation**: if the incoming observation adds additional detail to or directly contradicts an existing observation, Twilio uses the incoming observation to update the observation that already exists on your customer's profile. For more details, see [Reconcile observations](#reconcile-observations).
* **Discarded**: If an incoming observation contradicts an existing observation but lacks concrete detail or supporting evidence, Twilio discards the incoming observation.

## Reconcile observations

Your customer's preferences might change or be updated over time, which can lead to incoming observations being in direct conflict with observations already on the profile. To reconcile this conflict, Twilio takes the latest observation, compares it against existing observations, and, where there's room for improvements to your observation, updates a customer's profile with the new information.

> \[!TIP]
>
> By reconciling observations, Twilio keeps your customer's profile up-to-date with the latest context and ensures that any observations your AI Agents are using to personalize communications contain the most up-to-date information.

### Contradictions

If an observation is about the same subject, but directly contradicts an observation already on the profile, Twilio updates the profile with the most recent observation. For example, in a customer's first interaction with you, they might mention that their favorite dish is sushi, and in a later interaction, mention that their favorite dish is actually pizza. After the first interaction with that customer, Twilio would add an observation of `Favorite dish is sushi` to your customer's profile. After that customer's later interaction, Twilio would update the observation about your customer's favorite dish from `Favorite dish is sushi` to `Favorite dish is pizza`.

### Additional information

If an incoming observation contains additional details about an existing observation, for example, dates, models, or quantities, or if the scope of the observation becomes more specific, Twilio updates the observation with the new context. For example, if your customer mentioned initially that they were vegetarian, and in a later conversation let you know that they became vegetarian in 2020, the observation would be updated from `User is vegetarian` to `User is vegetarian (since 2020)`. In another example, if your customer let you know that they're vegetarian in an initial conversation, but in a second conversation mentioned that they were vegan, the observation would be updated from `User is vegetarian` to `User is vegan`.
