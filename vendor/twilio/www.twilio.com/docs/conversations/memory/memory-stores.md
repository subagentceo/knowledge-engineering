# Memory stores

## Overview

A memory store is the top-level resource for all Conversation Memory data. Profiles, identifiers, traits, observations, and summaries all live inside a store, which defines the boundary for how data is organized and resolved. You must create a store before creating a conversation configuration, because the configuration needs to know where profiles and memory should be written.

A memory store holds two categories of data: [Conversational memory](#conversational-memory) and [Factual memory](#factual-memory).

### Conversational memory

Conversational memory contains insights automatically extracted from conversations:

* Observations: Behaviors, preferences, mood, and key discussion points
* Summaries: Conversation recaps

### Factual memory

Factual memory includes structured, durable facts about customers:

* Traits: Customer attributes such as name, email, and subscription tier, organized into trait groups
* Identifiers: Unique keys such as phone numbers, emails, and user IDs that link interactions
* Profiles: Unified containers for all customer data
* Identity resolution settings: Rules defining which identifier types are allowed and how they match

For create, list, retrieve, update, and delete operations on memory stores, see the [Memory API docs](/docs/api/memory/v1/Store).

## Memory isolation

Memory isolation means strict, enforced data separation. Profiles, traits, and observations in one store cannot be accessed from another store.

This isolation is especially important for:

* **Regulated industries** (such as healthcare or finance) that require data separation
* **Multi-tenant ISV scenarios** where customer data must be isolated by customer (Twilio recommends using subaccounts for this use case)
* **Environment separation** (such as production, development, or sandbox)
* **Business unit partitioning** where different departments or brands require separate data spaces

> \[!NOTE]
>
> Accounts can have a maximum of 15 memory stores. If you need to support more customers, use subaccounts.

## When to reuse a single store

Most accounts use a single memory store to consolidate all customer data. A single store gives agents a unified view of customers across business functions like support, sales, and billing. Add new channels, such as WhatsApp, SMS, or Voice, to the same store so agents retain customer context across channels.

A memory store can hold millions of profiles. You do not need a new store for every customer. Create a new store only when data rules or data ownership changes.

## When to create a new memory store

You might want to create a new memory store for the following use cases:

* **Data residency and compliance**: When you operate across regions with strict regulatory requirements (for example, GDPR in Europe or CCPA in California), create separate stores such as `store-eu` and `store-us` to ensure data never crosses geographic boundaries.
* **Multi-tenancy (ISV and B2B platforms)**: When you provide AI services to multiple companies, create one store per client so their customer data stays isolated.
* **Environment separation**: When you need separate contexts for development, testing, and production, use stores like `store-development` and `store-production` to prevent test conversations from skewing production AI behavior.
* **Distinct business units**: When a customer interacts with unrelated arms of your business (for example, a pharmacy and an auto repair shop), create separate stores so each unit's agents only recall relevant context.
* **Non-PHI healthcare workflows**: When you need role-based data separation for workflows that don't involve Protected Health Information (PHI), create stores like `store-billing` and `store-care` and restrict API keys so each department only accesses its own data. Keep these workflows strictly isolated from systems handling PHI.

## Memory stores and Conversation Orchestrator

A memory store connects to Conversation Orchestrator through a conversation configuration. Each conversation configuration links to exactly one memory store using `memoryStoreId`, but multiple configurations can share the same store.

| Relationship                     | When to use                                                |
| -------------------------------- | ---------------------------------------------------------- |
| Many configurations to one store | When all your use cases share the same customer data.      |
| One configuration to one store   | When a configuration needs its own isolated data boundary. |

For example, a business running both a sales configuration and a support configuration can point both at `store-production` so a support agent sees the same customer profile as the sales agent. For isolation scenarios, see [When to create a new memory store](#when-to-create-a-new-memory-store).

For instructions on linking a memory store to a conversation configuration, see the [Conversation Orchestrator quickstart](/docs/conversations/orchestrator/quickstart).

## Next steps

* To set up your first memory store, see [Getting started with Conversation Memory](/docs/conversations/memory/getting-started).
* To understand how conversation configurations and memory stores fit into the broader object model, see [Core concepts](/docs/conversations/orchestrator/concepts/core).
