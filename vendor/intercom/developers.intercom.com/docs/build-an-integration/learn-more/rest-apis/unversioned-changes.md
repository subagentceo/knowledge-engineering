# Unversioned Changes

Some changes may need to be made across multiple versions and therefore are not considered to be released under any one version. You can find details of those changes here.

Breaking Changes
Breaking changes listed below are prepended with a ❗️symbol. For more details on the Intercom API policy around breaking changes see the details on the [API Changelog information page](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api)

## June 2026

### Contact write endpoints document the Unix timestamp format for date fields

The [Create contact](/docs/references/preview/rest-api/api.intercom.io/contacts/createcontact) (`POST /contacts`) and [Update contact](/docs/references/preview/rest-api/api.intercom.io/contacts/updatecontact) (`PUT /contacts/{id}`) endpoints now document that the `signed_up_at` and `last_seen_at` fields accept a Unix timestamp in seconds. The accepted format is unchanged.

This applies to all API versions.

## May 2026

### ❗️Duplicate conversation custom attribute names now return an error

The [Update a conversation](/docs/references/preview/rest-api/api.intercom.io/conversations/updateconversation/) endpoint (`PUT /conversations/{id}`) now returns a `400 INVALID_PARAMETER` error when the request includes `custom_attributes` and your workspace contains multiple non-archived conversation custom attributes with the same name. Previously, the update would silently apply to a non-deterministic attribute, which could result in the value being written to a different attribute than the one shown in the UI.

To resolve the conflict, rename or archive the duplicate attribute so each name is unique, then retry the request. You can do this through:

- The [Conversation Attributes API](/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/listconversationattributes) (Preview only) — list with `GET /conversations/attributes`, then rename with `PUT /conversations/attributes/{id}` or archive with `DELETE /conversations/attributes/{id}`
- Your workspace settings (Settings → Data → Conversations)


This change applies to all API versions.

## April 2026

### Fin Agent API: SSE (Server-Sent Events) support

The Fin Agent API responses from `/fin/start` and `/fin/reply` now include an optional `sse_subscription_url` field. This URL allows clients to subscribe to Server-Sent Events as an alternative to webhooks for receiving `fin_replied` and `fin_status_updated` events in real time.

**Key details:**

- The SSE stream delivers the same event types and schemas as webhooks
- The `/fin/start` response URL includes a `rewind=2m` parameter to replay recent events and prevent missed events during initial connection
- SSE tokens expire after 3 minutes and are revoked when the conversation reaches `awaiting_user_reply` or `complete` status


This is an additive change that applies to API versions 2.14 and above. No migration is required — existing webhook integrations continue to work unchanged.

See the [Fin Agent API guide](/docs/guides/fin-agent-api/#sse-server-sent-events) for full documentation.

### Fin Agent API: message `id` on `fin_replied` events

The `fin_replied` event's `message` object now includes an optional `id` field — a unique identifier for the message. Use this to deduplicate the same reply received via both SSE and webhooks. This is especially useful for follow-up replies that are not streamed and therefore don't carry a `stream_id`.

This is an additive change that applies to API versions 2.14 and above.

See the [Fin Agent API guide](/docs/guides/fin-agent-api/#deduplication) for details.

### Cross-post notes to linked conversations on back-office tickets

The [Reply to a ticket](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/replyTicket/) endpoint now documents the `cross_post` boolean parameter. When set to `true` on a `note` message type reply to a back-office ticket, the note will be automatically cross-posted to all linked conversations connected through the ticket's message thread.

**Requirements:**

- The ticket must be a back-office ticket
- The `message_type` must be `note`
- The reply must be from an admin (`type: admin`)


## February 2026

### ❗️Contact company association limit now returns an error

The `POST /contacts/{id}/companies` endpoint now returns a `400 Bad Request` error with code `contact_company_limit_exceeded` when a contact has reached the maximum of 1000 company associations. Previously, the API returned `200` but silently dropped the new association. Re-adding a company that is already associated with the contact continues to return `200` successfully.

## July 2025

### News Item API published date control fixed

We've fixed the `published_at` parameter in the `newsfeed_assignments` array so it now works correctly when creating and updating news items:

```json
{
  "news_item": {
    "title": "Halloween is here! 👻",
    "body": "<p>New costumes in store for this spooky season</p>",
    "newsfeed_assignments": [
      {
        "newsfeed_id": 1,
        "published_at": 1677638214
      }
    ]
  }
}
```

You can now successfully set custom published dates for news items, allowing news items to have historic published dates.

## May 2024

### AI Agent metadata in the Conversations API

You can now access additional metadata for conversations where an AI Agent was involved as part of the [Conversations API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/retrieveConversation/).

When `ai_agent_participated` is true, data in the `ai_agent` object will be populated, including:

- `source_type`: How the AI Agent involvement was triggered, like `workflow` or `fin_preview`
- `source_title`: The title of the `profile` or `workflow`
- `last_answer_type`: The type of the last answer delivered in the conversation, like `ai_answer` or `custom_answer`
- `resolution_state`: The resolution outcome from AI Agent's participation in the conversation, such as `confirmed_resolution` or `routed_to_team`
- `rating`: The Customer Satisfaction (CSAT) rating provided from 1-5. Note that you will need to [enable Fin AI Agent CSAT](https://www.intercom.com/help/en/articles/8368157-fin-ai-agent-csat) in order to gather this rating
- `rating_remark`: The user's rating as a comment, if they left one
- `content_sources`: A list of content sources that were used by the AI Agent in the conversation


You can export and save this data for compliance and legal reasons, send it to your data warehouse, and use it in your own BI tools for further analysis and visualization.

Try it on the Conversations API [get a conversation](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/retrieveConversation/), [list conversations](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/listConversations/), and [search conversations](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/searchConversations/) pages or in your own terminal.

## Define your own created at values in Conversations

When you create or reply to a conversation via the API, you now have the option to define your own `created_at` timestamps.

This is especially useful if you are importing conversations data from another source. Try it out using the [Create a Conversation](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/createConversation/) or [Reply to a Conversation](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/replyConversation/) endpoints.

## Add a company ID when you create a Ticket

Now when you create a Ticket, you can add the `company_id` that should be associated with the Ticket.

This is especially useful if you are importing conversations data from another source or if you need to retroactively add a company that the contacts on the ticket are associated with. Try it out using the [Create a Ticket](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/createTicket/) endpoint.

## February 2024

### Ticket States

Retrieving custom ticket states is available in versions `2.9`, `2.10`, `2.11` and `Preview` versions of the [Tickets API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/getTicket/).

Two states have been added:

- `ticket_state_internal_label`: The state the ticket is currently in, in a human readable form. This is only visible within Intercom to teammates.
- `ticket_state_external_label`: The state the ticket is currently in, in a human readable form. This is visible to customers and can be viewed in the Messenger, Email, and Tickets portal.


### Email Domains

The `email_domain` attribute has been added to the [Contacts object](https://developers.intercom.com/docs/references/2.7/rest-api/api.intercom.io/Contacts/contact/) in versions `2.0` and above.

## April 2023

### ❗️Conversation Part IDs are not unique across all workspaces

As flagged in a [previous update](#changing-ids-to-no-longer-be-unique-across-all-workspaces), we're making changes to our databases and models, and as a result, the `id` of a `conversation_part` will no longer be unique across all workspaces. We're continuing to make this change for other models, and we urge you to make the change for all identifiers which don't consider the `workspace_id`/`app_id`.

## Previous updates

### Supported HTML in Articles

From now on, additive changes to the HTML content returned by the [Articles model](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Articles/article/) will not be considered a breaking change. We will not be introducing new API versions when adding new supported HTML elements or attributes.

Removing element support or changing its shape in a way that causes previously [supported HTML](https://developers.intercom.com/docs/guides/help-center/supported-html/#supported-html) to become unsupported will still constitute a breaking change, and a new API version will be introduced in such cases.

We encourage all API consumers reading the contents of the Articles response to handle any valid HTML in the article body, not just the subset defined in the [supported HTML specification](https://developers.intercom.com/docs/guides/help-center/supported-html/#supported-html). This will ensure your code is resilient in handling any new HTML elements or attributes we may support in the future.

### ❗️Listed Articles no longer return statistics

Articles which have been [listed](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Articles/listArticles/) will no longer return a `statistics` object. In order to get these statistics, you will now have to take the id of the article you want to fetch the statistics object for, and [retrieve the article individually](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Articles/listArticles/).

### Tables and Horizontal Rules are supported as Article HTML content

Articles now support both Tables and Horizontal rules. This will mean they will show in the [Articles model](/docs/references/2.6/rest-api/articles/the-article-model), and can be added within the body of an Article when [creating](/docs/references/2.6/rest-api/articles/create-an-article) or [updating](/docs/references/2.6/rest-api/articles/update-an-article) these using the valid HTML. The Articles endpoint is available from V2.1 upwards.

### Text component headers are bold for Messenger Canvas Kit apps

When a [Text component](/docs/references/preview/canvas-kit/presentationcomponents/text) which has a style of `header` is now rendered in a Messenger Canvas Kit app on web, the text will automatically be bold without need for markdown. This is in an effort to better style the text based on its given purpose, and makes for greater content accessibility.

### ❗️Obfuscating Twitter data within Conversation objects

We've been informed by Twitter that changes to their API policies mean we're no longer compliant. As a result, we've obfuscated several fields for conversations received from Twitter. This affects all versions of the API for the following models:

- [Conversation Message Object](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Messages/message/)
- [Customer First Reply Object](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/replyConversation/)
- [Conversation Part Object](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Conversations/conversation/)


### ❗️IDs are not unique across all workspaces

To improve performance, we're making changes to our databases and models, and as a result, `id` will no longer be unique across all workspaces.

This means that the only unique identifier you should use is the `workspace_id`/`app_id`. If you've mapped any data to id's other than the `workspace_id`/`app_id`, then you should ensure that you are providing the `workspace_id`/`app_id` alongside, or in place of, other id's.

We made the change for **conversation identifiers** — meaning the `id` of a [conversation](/docs/references/2.1/rest-api/conversations/conversation-model) will only be unique to a given workspace. We plan to do the same for the id of a `conversation_part` some time in the future. We are also likely to apply this across several models in the future so we urge you to make the change for all identifiers which don't consider the `workspace_id`/`app_id`.