# Using Conversation Memory APIs

The Conversation Memory APIs allow AI or human agents to remember key facts, preferences, or insights about customers, so agents can use this information to better personalize responses.

This page outlines how to authenticate and get started with the Conversation Memory APIs. You'll also learn about some key Conversation Memory API concepts.

## Authentication

Twilio supports HTTP Basic authentication. To authenticate, include the Basic Authentication header where the username:password pair is one of the following:

| Username    | Password       | Best practice                                                                                                                                            |
| ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Key     | API Key Secret | This is the recommended way to authenticate with the Twilio APIs. When a key is compromised or no longer used, revoke it to prevent unauthorized access. |
| Account SID | AuthToken      | Limit your use to local testing.                                                                                                                         |

See our [Twilio API requests](/docs/usage/requests-to-twilio) doc to learn more about using Twilio APIs.

## Using the Conversation Memory APIs

You can use the following APIs to get started with Conversation Memory:

1. [Create a memory store](#create-a-memory-store)
2. [Set up a conversation configuration](#set-up-a-conversation-configuration)

After you complete these steps, Conversation Memory passively hydrates conversations from your existing Twilio SMS channels. These conversations are added to profiles in the memory store, along with observations.

The following steps are optional but recommended to enhance Conversation Memory functionality:

3. [Recall conversation data](#recall-conversation-data)
4. [Add trait groups and traits](#add-trait-groups-and-traits)
5. [Add identifiers](#add-identifiers) - for omnichannel experiences
6. [Configure ID Resolution rules](#configure-id-resolution-rules)

> \[!NOTE]
>
> If you prefer getting started with Conversation Memory in Console, see the [Conversation Memory getting started guide](/docs/conversations/memory/getting-started).

## Create a memory store

To get started with Conversation Memory, you first need to create a memory store. A memory store is a container for your customer profiles.

With your Twilio account you can create a single memory store, or multiple stores (up to 15 per account) to organize data for different use cases, such as separating production and sandbox data. Different business units within the same account may also choose to use separate sets of profiles.

```bash
POST "https://memory.twilio.com/v1/ControlPlane/Stores"
```

Request body schema

| Name                             | Type                                               | Description                                                                                                                                                                                                     |
| -------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| displayName <br />(**Required**) | string <br /> \<= 32 characters ^\[a-zA-Z0-9-\_]+$ | Provides a unique and addressable name to be assigned to this store. This name is assigned by the developer and can be used in addition to the ID. Intended to be human-readable and unique within the account. |
| description <br />(**Required**) | string                                             | A human readable description of this resource, up to 128 characters.                                                                                                                                            |

See the full [memory store API reference](/docs/api/memory/v1/store/create-store) to learn more.

## Set up a conversation configuration

Conversation configurations allow you to define the type of data you'll use to create customer profiles, store customer conversations, and resolve customer interaction data into profiles.

```bash
POST "https://conversations.twilio.com/v2/ControlPlane/Configurations"
```

Request body schema

| Name                                          | Type                                        | Description                                                                                                                                                                                                |
| --------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| displayName <br />(**Required**)              | string \<= 32 characters ^\[a-zA-Z0-9-\_]+$ | A unique, URL-safe identifier for the conversation configuration. Limited to 32 characters, no spaces or URL-unsafe symbols (for example, `my-configuration`). Used for lookup operations.                 |
| description <br />(**Required**)              | string                                      | Human-readable description for the conversation configuration. Allows spaces and special characters, typically limited to a paragraph of text. This serves as a descriptive field rather than just a name. |
| conversationGroupingType <br />(**Required**) | string                                      | The type of Conversation grouping strategy. Enum: "GROUP\_BY\_PARTICIPANT\_ADDRESSES"  "GROUP\_BY\_PARTICIPANT\_ADDRESSES\_AND\_CHANNEL\_TYPE"                                                             |
| memoryStoreId                                 | string                                      | Memory store ID for profile resolution.                                                                                                                                                                    |

See the full [conversation configuration API reference](/docs/api/conversations/v2/configuration/create-configuration) to learn more.

## Recall conversation data

Use the Recall endpoint to read conversational data from a customer's profile. After each conversation, Twilio writes new data to customer profiles as observations.

```bash
POST https://memory.twilio.com/v1/Stores/{storeId}/Profiles/{profileId}/Recall
```

Path parameters

| Name                           | Type   | Description                                                             |
| ------------------------------ | ------ | ----------------------------------------------------------------------- |
| storeId <br />(**Required**)   | string | A unique memory store ID using Twilio Type ID (TTID) format.            |
| profileId <br />(**Required**) | string | A unique identifier for the profile using Twilio Type ID (TTID) format. |

Request body schema

| Name                | Type                      | Description                                                                                                                                                                                         |
| ------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| conversationId      | string                    | A unique identifier for the conversation using Twilio Type ID (TTID) format.                                                                                                                        |
| query               | string                    | Hybrid search query for finding relevant memories. Omit to use query expansion to generate a query from the previous 10 communications in a conversation.                                           |
| beginDate           | string \<date-time>       | A start date for filtering memories (inclusive).                                                                                                                                                    |
| endDate             | string \<date-time>       | An end date for filtering memories (inclusive).                                                                                                                                                     |
| communicationsLimit | integer \[0 - 100]        | Maximum number of conversational session memories to return. If omitted or set to `0`, no session memories will be fetched.                                                                         |
| observationsLimit   | integer \[0 - 100]        | The maximum number of observation memories to return. If omitted, defaults to `20`. If set to `0`, no observation memories will be fetched.                                                         |
| summariesLimit      | integer \[0 - 100]        | The maximum number of summary memories to return. If omitted, defaults to `5`. If set to `0`, no summary memories will be fetched.                                                                  |
| relevanceThreshold  | number \<double> \[0 - 1] | The minimum relevance score threshold for observations and summaries to be returned. Only memories with a relevance score greater than or equal to this threshold will be included in the response. |

See the full [recall API reference](/docs/api/memory/v1/retrieval/create-fetch-profile-memory) to learn more.

## Add trait groups and traits

Traits are structured, lasting facts about a customer, such as their name, location, subscription status, or customer tier.

Agents can use traits to:

* Personalize interactions
  * Use traits like name, loyalty tier, or language to tailor responses and recommendations.
* Recognize users across channels
  * Match users by email, phone, or user ID to maintain context across web, mobile, and messaging.
* Perform smart routing and handoffs
  * Route high-value customers to priority support or escalation paths based on loyalty or account status.
* Automate decisions and workflows
  * Trigger relevant actions (for example, promotional offers or verification flows) based on stored profile attributes.
* Verify identity and enable secure actions
  * Use known contact methods for authentication, recovery, or safe account changes.
* Adapt to compliance and preferences
  * Respect regional settings, consent controls, and communication preferences stored in traits.
* Improve continuity and reduce repetition
  * Avoid asking users for information they've already provided (for example, "What's your email?").

Use this API to create or update up to 1,000 profiles in a single asynchronous batch. Each profile body follows the same structure as single profile creation. If a profile already exists, its traits are merged (new keys added and existing keys overwritten).

```bash
PUT https://memory.twilio.com/v1/Stores/{storeId}/Profiles/Bulk
```

Path parameters

| Name                         | Type   | Description                                                  |
| ---------------------------- | ------ | ------------------------------------------------------------ |
| storeID <br />(**Required**) | string | A unique memory store ID using Twilio Type ID (TTID) format. |

Request body schema

| Name                                                 | Type                                    | Description                                                                                                                |
| ---------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| profiles.traits <br />(**Required**)                 | object (traitGroups)  \<= 50 properties | Multiple trait groups.                                                                                                     |
| profiles.TraitGroupPropertyName <br />(**Required**) | object \<= 50 properties                | The value of a trait. Can be a string, integer, boolean, or an array of these types (arrays cannot contain nested arrays). |

See the full [traits](/docs/api/memory/v1/traits/list-profile-traits) and [trait groups](/docs/api/memory/v1/trait-group/create-trait-group) API references to learn more.

## Add identifiers

Identifiers are unique attributes (like phone numbers, email addresses, or internal user IDs) used to map customer interactions, history, and traits back to a single, canonical profile. Conversation Memory uses identifiers for searching, merging, and resolving profiles within Twilio.

Adding identifiers is especially useful for omnichannel use cases. For example, if you're deploying your conversation across email and Voice, you'll want to merge conversations from both of these conversations if they are with the same customer.

```bash
POST https://memory.twilio.com/v1/Stores/{storeId}/Profiles/{profileId}/Identifiers
```

Path parameters

| Name                           | Type   | Description                                                             |
| ------------------------------ | ------ | ----------------------------------------------------------------------- |
| storeID <br />(**Required**)   | string | A unique memory store ID using Twilio Type ID (TTID) format.            |
| profileID <br />(**Required**) | string | A unique identifier for the profile using Twilio Type ID (TTID) format. |

Request body schema

| Name                        | Type                      | Description                                                                                                                                                                                                                     |
| --------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| idType <br />(**Required**) | string 2-32 characters    | Identifier type as configured in the service's Identity Resolution settings. Must match an `idType` defined in the corresponding identifier settings and must satisfy the same length constraints.                              |
| value <br />(**Required**)  | string \<= 255 characters | Raw value captured for the identifier. The service may normalize this value according to the normalization rule defined in the identifier settings before storage or matching (for example E.164 formatting for phone numbers). |

See the full [identifiers API reference](/docs/api/memory/v1/identifiers) to learn more.

## Configure ID Resolution rules

Create or replace the Identity Resolution settings for your memory store. Identity Resolution rules help determine if a new profile should be created, or if the incoming conversation should be added to an existing profile.

```bash
PUT https://memory.twilio.com/v1/ControlPlane/Stores/{storeId}/IdentityResolutionSettings
```

Path parameters

| Name                         | Type   | Description                                                  |
| ---------------------------- | ------ | ------------------------------------------------------------ |
| storeID <br />(**Required**) | string | A unique memory store ID using Twilio Type ID (TTID) format. |

Request body schema

| Name                                                 | Type                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IdentifierConfigs.IDType <br />(**Required**)        | string 2-30 characters                                 | Name of the identifier to use for identity resolution. Usual values can include email, phone, or user\_id.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| IdentifierConfigs.matchingAlgo <br />(**Required**)  | String                                                 | Enum: “EXACT”  <br /> The algorithm to use for matching the identifier's value. The value must be `EXACT`  which will match the identifier exactly.                                                                                                                                                                                                                                                                                                                                                                                                      |
| IdentifierConfigs.limit <br />(**Required**)         | integer 1-20                                           | Maximum number of values to retain for this identifier for a profile.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| IdentifierConfigs.limitPolicy <br />(**Required**)   | string                                                 | Enum: must be “FIFO” <br /> Policy to apply when the number of values for the identifier exceeds the limit. The extra values will be removed using the FIFO policy to make them compliant. FIFO will be applied based on the event timestamp of the request that added the identifier.                                                                                                                                                                                                                                                                   |
| IdentifierConfigs.enforceUnique <br />(**Required**) | boolean                                                | Value must be `True`, meaning that only one profile will have the identifier, forcing profiles that share it to merge.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| IdentifierConfigs.normalization <br />(**Required**) | string                                                 | Enum: “email” , “phone” <br /> Normalization to apply to the identifier value before storing and matching.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| matchingRules                                        | array of strings 1-15 items \[Items \<= 30 characters] | List of rules to apply to match identifiers for new profile updates against existing profiles (if any). If no rule matches against existing profiles, a new profile will be created. If a rule matches a single existing profile, the profile will be updated with the new data. If a rule matches multiple existing profiles, those existing profiles will be merged into a single unique profile updated with the new data. All identifiers should match based on the matching condition (for example, `matchingAlgo`) as per the `identifierConfigs`. |
