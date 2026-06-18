# Changelog (Preview)

Preview API
The Preview API provides early access to new capabilities we're actively developing. It's suitable for production use, and we're continuing to refine it based on customer feedback. We may make iterative improvements to Preview endpoints, including adding new fields or refining existing ones. When changes are not backward-compatible, we'll communicate them in advance.

For changes that have been updated across all versions, see the [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) page.

## Help Center Redirects API

You can now manage a help center's URL redirects through the API. A redirect maps a `from_url` to an article or collection, so links to old or external URLs resolve to live content — useful when migrating from another knowledge base or restructuring article URLs.

These endpoints require the `Intercom-Version: Preview` header. Listing and reading redirects works with the `read_help_center_redirects_scope` OAuth scope; creating and deleting require the `read_write_help_center_redirects_scope` OAuth scope.

- [`GET /help_center/help_centers/{help_center_id}/redirects`](/docs/references/preview/rest-api/api.intercom.io/help-center/listhelpcenterredirects) — List all redirects for a help center
- [`POST /help_center/help_centers/{help_center_id}/redirects`](/docs/references/preview/rest-api/api.intercom.io/help-center/createhelpcenterredirect) — Create a redirect
- [`GET /help_center/help_centers/{help_center_id}/redirects/{id}`](/docs/references/preview/rest-api/api.intercom.io/help-center/retrievehelpcenterredirect) — Retrieve a redirect
- [`DELETE /help_center/help_centers/{help_center_id}/redirects/{id}`](/docs/references/preview/rest-api/api.intercom.io/help-center/deletehelpcenterredirect) — Delete a redirect


The `from_url` must be an absolute URL within the help center's URL space, and a redirect's target (article or collection) must belong to the help center.

## Schedule Article publishing and unpublishing

You can now schedule when an article publishes and when it unpublishes. Two new optional fields have been added to the Articles API:

- `scheduled_publish_at` — schedule a future publish for the article. Combine with `state: "published"` to schedule the article instead of publishing it immediately. Setting it to `null` cancels a pending publish schedule. Combining with `state: "draft"` returns a 400 error.
- `scheduled_unpublish_at` — schedule a future unpublish for the article. Setting it to `null` cancels a pending unpublish schedule. The article must have been published at least once.


Only one pending schedule can exist per article at a time — `scheduled_publish_at` and `scheduled_unpublish_at` are mutually exclusive in the same request. Both fields are `null` when no schedule is pending.

On requests, the fields accept an ISO 8601 timestamp string (for example, `"2026-12-31T09:00:00Z"`). On responses, they are returned as Unix timestamps in seconds (or `null`).

Timestamps must be strictly in the future — values in the past or equal to the current time are rejected with 400 `parameter_invalid`.

The fields are accepted on the request body of [`POST /articles`](/docs/references/preview/rest-api/api.intercom.io/articles/createarticle) and [`PUT /articles/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/updatearticle), and returned by [`GET /articles`](/docs/references/preview/rest-api/api.intercom.io/articles/listarticles), [`GET /articles/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/retrievearticle), [`GET /articles/search`](/docs/references/preview/rest-api/api.intercom.io/articles/searcharticles), [`POST /articles`](/docs/references/preview/rest-api/api.intercom.io/articles/createarticle), and [`PUT /articles/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/updatearticle).

This change is available in the Preview API version only.

## Article version history

Preview only
These endpoints are available in the Preview API version only. They are not yet included in any stable API version.

You can now read the version history of an article through the API. Versions are returned newest-first, and you can retrieve any prior version's full content (`title`, `body`, `body_markdown`) without affecting the live article.

These endpoints require the `Intercom-Version: Preview` header and the `read_articles_scope` OAuth scope.

- [`GET /articles/{article_id}/versions`](/docs/references/preview/rest-api/api.intercom.io/articles/listarticleversions) — List version metadata for an article (newest-first, paginated).
- [`GET /articles/{article_id}/versions/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/retrievearticleversion) — Retrieve a single version with its full content.


Both endpoints accept an optional `locale` query parameter to scope the response to a specific locale.

## Search Knowledge Hub content

Preview only
This endpoint is available in the Preview API version only. It is not yet included in any stable API version.

You can now search across all Knowledge Hub content types — articles, content snippets, external content, file source content, and internal articles — in a single call with [`GET /content/search`](/docs/references/preview/rest-api/api.intercom.io/content/searchcontent). The endpoint requires the `Intercom-Version: Preview` header and the `read_content` OAuth scope.

You can narrow results with filters for publication state, locale, tags, folders, content type, AI usage (Copilot, Fin AI Agent, and Fin Sales Agent), admin attribution (created by and last updated by), and creation or update date ranges.

## Content import source webhook topics

Preview only
These webhook topics are available in the Preview API version only. They are not yet included in any stable API version.

You can now subscribe to webhook notifications for content import source lifecycle events. Three new topics are available:

- `content_import_source.created` — fires when a content import source is created
- `content_import_source.updated` — fires when a content import source's URL, sync behavior, or status changes
- `content_import_source.deleted` — fires when a content import source is deleted


All three topics require the **Read content** permission. The `content_import_source.created` and `content_import_source.updated` payloads contain the full content import source object; `content_import_source.deleted` sends a minimal identification payload. See the [webhook topics reference](/docs/references/preview/webhooks/webhook-models) for details.

## Article drafts

You can now manage the draft lifecycle of a published article through the API. Staging changes as a draft leaves the live article untouched until you choose to publish.

A published article that has staged edits reports `has_unpublished_changes: true` along with a `draft_updated_at` timestamp, so you can detect pending changes before reading or publishing them.

These endpoints require the `Intercom-Version: Preview` header. Reading a draft works with the `read_articles_scope` OAuth scope; staging and publishing require the `read_write_articles_scope` OAuth scope.

- [`GET /articles/{id}/draft`](/docs/references/preview/rest-api/api.intercom.io/articles/retrievearticledraft) — Retrieve a staged draft
- [`PUT /articles/{id}/draft`](/docs/references/preview/rest-api/api.intercom.io/articles/stagearticledraft) — Stage a draft
- [`POST /articles/{id}/draft/publish`](/docs/references/preview/rest-api/api.intercom.io/articles/publisharticledraft) — Publish a staged draft


On a multilingual workspace, publishing requires a `locales` array naming which locales to publish; on a single-language workspace the body can be omitted.

## Orchestrate Fin with new Fin Agent API endpoints

You can now drive Fin from your own orchestrating agent with three new endpoints:

- [`POST /fin/capabilities`](/docs/references/preview/rest-api/api.intercom.io/fin-agent/listfincapabilities) — discover the per-user list of what Fin can do, so your agent can decide which endpoint to call.
- [`POST /fin/ask`](/docs/references/preview/rest-api/api.intercom.io/fin-agent/askfin) — ask Fin a single, self-contained question and receive one informational answer (non-conversational).
- [`POST /fin/procedures/{procedure_id}/run`](/docs/references/preview/rest-api/api.intercom.io/fin-agent/runfinprocedure) — deterministically run a specific procedure on a new conversation.


Continue a procedure conversation with [`POST /fin/reply`](/docs/references/preview/rest-api/api.intercom.io/fin-agent/replytofin): when the conversation's status is `awaiting_user_reply`, send the user's response there.

## Banners API

You can now retrieve the banners a contact matches and record dismissals through the new Banners API. This lets you display banners on surfaces outside the Messenger, such as native mobile apps, kiosks, and embedded tools, while keeping dismissal state in sync with the web Messenger.

These endpoints require the `Intercom-Version: Preview` header and an OAuth token with the `read_write_users` scope.

- [`GET /contacts/{id}/banners`](/docs/references/preview/rest-api/api.intercom.io/banners/listcontactbanners) — List the banners a contact currently matches
- [`POST /contacts/{id}/banners/{view_id}/dismiss`](/docs/references/preview/rest-api/api.intercom.io/banners/dismisscontactbanner) — Dismiss a banner for a contact


Requesting a contact's banners records an impression for each banner returned, so call the endpoint at the point you're about to display them. Banners that rely on client-side targeting rules (such as page URL or time on page) aren't returned by this endpoint.

## Office Hours API

You can now manage office hours schedules and their exceptions through the new Office Hours API. Schedules define the recurring weekly hours your workspace is open; exceptions override those hours on specific dates (for example, public holidays).

These endpoints require the `Intercom-Version: Preview` header and an OAuth token with the `read_write_office_hours` scope. The API is in limited availability — the scope becomes available once the feature is enabled for your workspace; until then requests return `403 api_plan_restricted`.

**Schedules**

- [`GET /office_hours_schedules`](/docs/references/preview/rest-api/api.intercom.io/office-hours/listofficehoursschedules) — List all schedules
- [`POST /office_hours_schedules`](/docs/references/preview/rest-api/api.intercom.io/office-hours/createofficehoursschedule) — Create a schedule
- [`GET /office_hours_schedules/{id}`](/docs/references/preview/rest-api/api.intercom.io/office-hours/getofficehoursschedule) — Retrieve a schedule
- [`PUT /office_hours_schedules/{id}`](/docs/references/preview/rest-api/api.intercom.io/office-hours/updateofficehoursschedule) — Update a schedule
- [`DELETE /office_hours_schedules/{id}`](/docs/references/preview/rest-api/api.intercom.io/office-hours/deleteofficehoursschedule) — Delete a schedule


**Exceptions**

- [`GET /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions`](/docs/references/preview/rest-api/api.intercom.io/office-hours/listofficehoursexceptions) — List exceptions for a schedule
- [`POST /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions`](/docs/references/preview/rest-api/api.intercom.io/office-hours/createofficehoursexception) — Create an exception
- [`GET /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions/{id}`](/docs/references/preview/rest-api/api.intercom.io/office-hours/getofficehoursexception) — Retrieve an exception
- [`PUT /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions/{id}`](/docs/references/preview/rest-api/api.intercom.io/office-hours/updateofficehoursexception) — Update an exception
- [`DELETE /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions/{id}`](/docs/references/preview/rest-api/api.intercom.io/office-hours/deleteofficehoursexception) — Delete an exception


## Audience webhook topics

Preview only
The Audiences API and these webhook topics are available in the Preview API version only. They are not yet included in any stable API version.

You can now subscribe to webhook notifications for audience lifecycle and membership events. Five new topics are available:

- `audience.created` — fires when an audience is created
- `audience.updated` — fires when an audience's name, predicates, or role predicates change
- `audience.deleted` — fires when an audience is deleted
- `audience.member_added` — fires when a piece of content is added as a member of an audience
- `audience.member_removed` — fires when a piece of content is removed from an audience


All five topics require the **Read audiences** permission. The `audience.created` and `audience.updated` payloads contain the full audience object; `audience.deleted` sends a minimal identification payload; and the `audience.member_*` payloads contain an `audience_membership` object describing the content entity and the audience it belongs to. See the [webhook topics reference](/docs/references/preview/webhooks/webhook-models) for details.

## Help Center audience added to Articles

A new optional, read-only field has been added to the Articles API:

- `help_center_audience` (string) — the audience that can view the article in the Help Center: one of `everyone`, `all_users`, `all_visitors`, `all_leads`, `all_visitors_and_leads`, or `restricted` (a custom audience ruleset). For multilingual articles this is the article-level audience, and it is `null` when no audience is configured.


This field is returned by [`GET /articles`](/docs/references/preview/rest-api/api.intercom.io/articles/listarticles), [`GET /articles/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/retrievearticle), [`GET /articles/search`](/docs/references/preview/rest-api/api.intercom.io/articles/searcharticles), [`POST /articles`](/docs/references/preview/rest-api/api.intercom.io/articles/createarticle), [`PUT /articles/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/updatearticle), and the `article.*` webhook topics. It is read-only — set the audience through the Articles UI in Intercom.

## Fin statistics added to article statistics

Three new optional, read-only fields have been added to the `statistics` object on Article responses:

- `fin_involvements` (integer) — the number of conversations in which Fin AI Agent used the article, summed across all of the article's locales.
- `fin_resolutions` (integer) — the number of those conversations that Fin AI Agent resolved using the article, summed across all of the article's locales.
- `fin_resolution_rate` (number) — the percentage of Fin involvements that resulted in a resolution (`fin_resolutions` / `fin_involvements` * 100).


These fields are returned in the article `statistics` object by [`GET /articles/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/retrievearticle), [`POST /articles`](/docs/references/preview/rest-api/api.intercom.io/articles/createarticle), and [`PUT /articles/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/updatearticle). They are read-only and reflect Fin AI Agent reporting.

## Audit and suggestion fields added to Articles

Three new optional, read-only fields have been added to the Articles API:

- `created_by_id` (integer) — the ID of the teammate who created the content. At the article root, this is the creator of the default language's content; inside each per-locale entry in `translated_content`, it is the creator of that content version.
- `updated_by_id` (integer) — the ID of the teammate who last updated the content. At the article root, this is the last editor of the default language's content; inside each per-locale entry in `translated_content`, it is the last editor of that content version.
- `exclude_from_article_suggestions` (boolean) — whether the article is excluded from Fin AI Agent article suggestions. Returned at the article root only.


These fields are returned by [`GET /articles`](/docs/references/preview/rest-api/api.intercom.io/articles/listarticles), [`GET /articles/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/retrievearticle), [`GET /articles/search`](/docs/references/preview/rest-api/api.intercom.io/articles/searcharticles), [`POST /articles`](/docs/references/preview/rest-api/api.intercom.io/articles/createarticle), [`PUT /articles/{id}`](/docs/references/preview/rest-api/api.intercom.io/articles/updatearticle), and the `article.*` webhook topics. They are read-only — set the underlying values through the Articles UI in Intercom.

## Conversations API: include QA monitor evaluations and scorecards

The Conversations API can now return QA monitor evaluations and scorecard results on conversation responses when you opt in. Two new query parameters control which fields are included:

- `include_monitors=true` — adds a `monitor_evaluations` array listing any QA monitors that flagged the conversation.
- `include_scorecards=true` — adds a `scorecards` array with scorecard results, including per-evaluator outcomes and the reviewed teammate (Fin or a specific admin).


Both parameters are available on:

- [`GET /conversations`](/docs/references/preview/rest-api/api.intercom.io/conversations/listconversations)
- [`GET /conversations/{id}`](/docs/references/preview/rest-api/api.intercom.io/conversations/retrieveconversation)
- [`POST /conversations/search`](/docs/references/preview/rest-api/api.intercom.io/conversations/searchconversations)


When the corresponding parameter is omitted or `false`, the response is unchanged. Each array is empty if the conversation has no QA evaluations.

## Complete Audiences API

You can now create, retrieve, update, and delete audiences through the Audiences API.

**New endpoints:**

- `GET /audiences/{id}` — Retrieve a single audience
- `POST /audiences` — Create a new audience
- `PUT /audiences/{id}` — Update an existing audience
- `DELETE /audiences/{id}` — Delete an audience


**Updated:**

- `GET /audiences` — Response now includes `predicates` and `role_predicates` on each audience object


The `audience` object now includes `predicates` and `role_predicates` arrays, which define the matching rules for the audience. Each predicate contains `attribute`, `type`, `comparison`, and `value` fields.

## Contacts: `merge_history` field and `GET /contacts/{id}/merge_history` endpoint added

You can now retrieve the merge history of a contact — the list of contacts that were merged into it.

Pass `include_merge_history=true` as a query parameter on any of the following endpoints to include a `merge_history` array in the response:

- [Get a contact](/docs/references/preview/rest-api/api.intercom.io/contacts/showcontact)
- [Get a contact by External ID](/docs/references/preview/rest-api/api.intercom.io/contacts/showcontactbyexternalid)
- [List contacts](/docs/references/preview/rest-api/api.intercom.io/contacts/listcontacts)
- [Search contacts](/docs/references/preview/rest-api/api.intercom.io/contacts/searchcontacts)
- [Update a contact](/docs/references/preview/rest-api/api.intercom.io/contacts/updatecontact)
- [Merge a lead and a user](/docs/references/preview/rest-api/api.intercom.io/contacts/mergecontact) — returns the merge history of the resulting target contact


Only returned for contacts with a `user` role. Each entry contains:

- `type` — `"merge_history"`
- `source_contact_id` — the Intercom ID of the contact that was merged in
- `source_contact_role` — the role (`lead` or `user`) of the merged contact
- `merged_at` — UNIX timestamp of when the merge occurred (nullable)


[GET /contacts/{id}/merge_history](/docs/references/preview/rest-api/api.intercom.io/contacts/listcontactmergehistory) also returns a paginated list of merge history entries. Supports `cursor`, `per_page`, and `order` query parameters. Only available for contacts with a `user` role.

## Breaking change: Merged contacts now return 410 Gone instead of 404

After a merge, requesting the source contact by its original ID now returns **HTTP 410 Gone** instead of `404 Not Found`, with a `Link` response header pointing to the canonical (merged-into) contact:

```
Link: </contacts/{canonical_id}>; rel="canonical"
```

The response body contains:

```json
{
  "type": "error.list",
  "errors": [{ "code": "contact_merged", "message": "This contact has been merged. See the 'Link' header for the canonical contact." }]
}
```

The `Link` header resolves multi-hop merge chains (up to 3 hops) to return the final target contact. This applies to [Get a contact](/docs/references/preview/rest-api/api.intercom.io/contacts/showcontact) and lookups by `external_id`. Merged contacts continue to be excluded from [List contacts](/docs/references/preview/rest-api/api.intercom.io/contacts/listcontacts) and [Search contacts](/docs/references/preview/rest-api/api.intercom.io/contacts/searchcontacts) results.

## Agent availability fields added to Content Snippets, Internal Articles, Articles, and External Pages

Boolean fields `ai_chatbot_availability`, `ai_copilot_availability`, and `ai_sales_agent_availability` are now available on the following resources:

- **Content Snippets** — Added to `GET`, `POST`, and `PUT` responses and request bodies. These fields let you control whether a content snippet is available to AI Chatbot (Fin), AI Copilot, or AI Sales Agent.
- **Internal Articles** — Added to `GET`, `POST`, and `PUT` responses and request bodies.
- **Articles** — Added to `POST` and `PUT` request bodies (already present in responses).
- **External Pages** — `ai_sales_agent_availability` added to `GET` responses and `POST`/`PUT` request bodies. `ai_agent_availability` and `ai_copilot_availability` added to `PUT` request bodies (already present in `GET` responses and `POST` requests).


## Activity Log: `hide_csat_from_agents_setting_change` event type added

The `hide_csat_from_agents_setting_change` event type has been added to the Activity Log event types enum. This event is recorded when a workspace admin enables or disables the "Hide CSAT scores from agents" setting.

There are [breaking changes](/docs/build-an-integration/learn-more/rest-apis/api-changelog#about-breaking-changes-in-the-intercom-api) in this version, which are detailed below.

## Dedicated Conversation Attributes API

You can now create, update, and archive conversation attributes through dedicated endpoints at `/conversations/attributes`. Responses include type-specific fields based on `data_type`.

**New endpoints:**

- `GET /conversations/attributes` — List all conversation attributes
- `GET /conversations/attributes/{id}` — Get a single conversation attribute
- `POST /conversations/attributes` — Create a new conversation attribute
- `PUT /conversations/attributes/{id}` — Update a conversation attribute
- `DELETE /conversations/attributes/{id}` — Archive a conversation attribute (soft delete)
- `POST /conversations/attributes/{id}/options` — Add an option to a list attribute
- `PUT /conversations/attributes/{id}/options/{option_id}` — Rename a list option
- `DELETE /conversations/attributes/{id}/options/{option_id}` — Archive a list option


**Type-specific fields:**

- **String** — includes `multiline` (boolean)
- **List** — includes `options` (array of option objects, each with `id` UUID, `label`, and `archived`)
- **Relationship** — includes `reference` object with `type` (one/many) and `object_type_id`
- **Other types** — return base shape only


**List option management:**

List options are managed individually through the nested options endpoints rather than by replacing the full array on `PUT /conversations/attributes/{id}`. Each option object includes a UUID (`id`) that is used as the `option_id` path parameter when updating or archiving. A list attribute must always have at least 2 active (non-archived) options.

## Breaking change: `GET /data_attributes` no longer returns conversation attributes

`GET /data_attributes` (with or without `model=conversation`) no longer returns conversation attributes in the Preview API version. Use [GET /conversations/attributes](/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/listconversationattributes) instead.

- Calling `GET /data_attributes` without a `model` parameter no longer includes conversation attributes in the response.
- Calling `GET /data_attributes?model=conversation` returns a `422` error:


```json
{
  "type": "error.list",
  "errors": [
    {
      "code": "parameter_invalid",
      "message": "model=conversation is no longer supported. Use GET /conversations/attributes instead"
    }
  ]
}
```

All stable API versions (2.15, 2.14, etc.) continue to return conversation attributes from this endpoint unchanged.

## Conversations API: `channel` field for channel mix reporting

The `GET /conversations/{id}`, `GET /conversations`, and `POST /conversations/search` endpoints now include a `channel` object on each conversation, exposing which channel the conversation originated from and its current channel.

This makes it possible to accurately report on channel mix.

**New field on `conversation` and `conversation_list_item`:**

- `channel` (object, nullable) — channel metadata for the conversation. Returns `null` if channel data is unavailable.
  - `initial` (string, nullable) — the channel through which the conversation was originally initiated. Possible values: `messenger`, `zendesk_sunshine`, `zendesk_ticket`, `twitter`, `email`. `null` if channel data is unavailable.
  - `current` (string, nullable) — the current channel of the conversation. May differ from `initial` if the conversation was migrated between channels. `null` if channel data is unavailable.


**Example:**

```json
{
  "channel": {
    "initial": "zendesk_sunshine",
    "current": "zendesk_sunshine"
  }
}
```

## Conversations: `POST /conversations/{id}/merge` added

You can now merge a secondary conversation into a primary conversation via the API. The secondary conversation is closed and linked to the primary, which becomes the surviving thread. Returns the primary conversation on success.

Requires `write_conversations` OAuth scope. When the secondary is a ticket, `write_tickets` scope is also required.

## Articles: `audience_ids` field

Articles can now be targeted to specific Fin AI Agent audiences via the API.

**New field on responses** (`article_content`):

- `audience_ids` (array of integers) — the audience IDs this article content is targeted to. On multilingual help centers this appears per-locale inside `translated_content`. On single-language help centers it appears at the article root level. Empty array means no targeting is set.


**New field on write requests** (`POST /articles`, `PUT /articles/{id}`):

- Top-level `audience_ids: [id1, id2]` — broadcasts the same set to every locale
- `translated_content.<locale>.audience_ids` — targets a specific locale without affecting others
- When both are sent in the same request, top-level wins
- `audience_ids: []` on `PUT` clears all audience memberships from every locale
- Unknown audience IDs return a `404` error with no partial commit


**Affected endpoints:**

- `GET /articles`, `GET /articles/{id}`
- `POST /articles`, `PUT /articles/{id}`


## Fin Agent API: `settings` object

The `/fin/start` and `/fin/reply` endpoints now accept an optional top-level `settings` object to control Fin's behaviour per request.

**New fields:**

- `follow_up_questions` (boolean, default `true`) — When `true` (default), Fin may ask clarifying questions and escalate to a human agent as needed. Set to `false` to put Fin in non-conversational mode: it will not ask follow-up questions or escalate, and will instead produce a single self-contained answer. Suitable for asynchronous channels where multi-turn conversation is not practical.
- `procedures` (boolean, default `true`) — When `false`, Fin skips configured procedures and responds using its general knowledge and content only.
- `email` (boolean, default `false`) — When `true`, Fin formats replies in an email-style structure, appropriate for sending directly to users via email rather than in a chat interface.


All fields are optional and can be used independently or together.

**Affected endpoints:**

- `POST /fin/start`
- `POST /fin/reply`


## Articles, Internal Articles & Content Snippets: `body_markdown` field

All knowledge API endpoints now support a `body_markdown` field for reading and writing content in Markdown format, alongside the existing HTML `body` and `json_blocks` fields.

**GET responses** include `body_markdown` — the article content serialized as Markdown. Standard blocks (headings, paragraphs, lists, code, images, tables) render as native GFM Markdown. Rich blocks (callouts, video embeds, buttons, collapsible sections, attachments, etc.) render as CommonMark `:::` directives (e.g. `:::button label="Sign up" href="..." :::`) for lossless round-tripping.

**POST/PUT requests** accept `body_markdown` as an alternative to `body` or `json_blocks`. The fields are mutually exclusive — providing more than one returns `422`.

**Affected endpoints:**

- `GET /articles`, `GET /articles/{id}`, `GET /articles/search`
- `POST /articles`, `PUT /articles/{id}`
- `GET /internal_articles`, `GET /internal_articles/{id}`
- `POST /internal_articles`, `PUT /internal_articles/{id}`
- `GET /content_snippets`, `GET /content_snippets/{id}`
- `POST /content_snippets`, `PUT /content_snippets/{id}`


## Audiences API

The Audiences API is now available in the Preview version. You can list all audiences configured for your workspace using `GET /audiences`. The response is a paginated list of audience objects, each containing `id`, `name`, `created_at`, and `updated_at` fields. This endpoint requires the `read_audiences` OAuth scope.

## Call timing metrics

The [Calls API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Calls/showCall) now returns four new timing fields on call objects:

- `duration` — Total call duration in seconds from the caller's perspective.
- `talk_time` — Total time in seconds the agent and customer were connected.
- `queue_time` — Total time in seconds the caller waited in queue before connecting.
- `hold_time` — Total time in seconds the caller was placed on hold during the call.


All four fields are nullable integers and are available on both `GET /calls/{id}` and `GET /calls` endpoints.

## Conversations API: source field accuracy improved

The `source` field on conversation objects was returning `null` for some conversations — including those started by an admin sending an email, outbound phone calls, and conversations created via third-party integrations like Zendesk Tickets or Salesforce Cases.

## POST /tags response status

`POST /tags` no longer returns `404` when a referenced user or company does not exist. Instead, the tag is created (or updated), valid entities are linked and missing entities are skipped.

The response now includes two new fields: `users` and `companies`, list of objects containing:

- `id`: the Intercom ID of the entity (string)
- `tagged`: `true` if the entity was tagged, `false` if untagged


**Example response (company not found):**

```json
{
  "type": "tag",
  "id": "789",
  "name": "VIP",
  "users": [],
  "companies": []
}
```

**Example response (one company tagged, one missing):**

```json
{
  "type": "tag",
  "id": "789",
  "name": "VIP",
  "users": [],
  "companies": [{ "id": "valid-123", "tagged": true }]
}
```

This fixes a long-standing issue where `POST /tags` would create an orphaned tag before validating that entities exist — the tag was committed but no entities were linked.

## Content snippet webhook topics

Preview only
The Content Snippets API is available in the Preview API version only. It is not yet included in any stable API version.

You can now subscribe to webhook notifications for content snippet lifecycle events. Three new topics are available:

- `content_snippet.created` — fires when a content snippet is created
- `content_snippet.updated` — fires when a content snippet's content or metadata is updated
- `content_snippet.deleted` — fires when a content snippet is deleted


These topics require the `Read content snippets` permission. See the [webhook topics reference](/docs/references/preview/webhooks/webhook-models) for full details.

## Delete content snippets via API

Preview only
The Content Snippets API is available in the Preview API version only. It is not yet included in any stable API version.

You can now delete content snippets through the API using `DELETE /content_snippets/{id}`. This completes the full CRUD surface for content snippets, which previously supported list, get, create, and update operations.

The endpoint returns `204 No Content` on success. If the snippet is referenced by Fin Procedures, the request returns `422` with error code `content_has_procedure_dependencies`.

## Procedures HITL API

A new `POST /procedures/{conversation_id}/collect_agent_input` endpoint enables external systems to submit human-collected input to Fin Procedures paused at a Human in the Loop (HITL) step.

**New Webhook Topic:**

- `procedure.hitl_notification.created` — Fires when a Fin Procedure reaches a HITL step with the API channel enabled. Delivers conversation context, the HITL question, attributes to collect, and a callback URL.


**New Endpoint:**

- [`POST /procedures/{conversation_id}/collect_agent_input`](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Procedures/collectProcedureAgentInput) — Submit attribute values collected by your system to resume the procedure.


**Requirements:**

- Preview API version
- OAuth app with `write_conversations` scope (callback) and `Read conversations` permission (webhook)
- Procedures HITL API feature enabled for your workspace


## Article webhook topics

You can now subscribe to webhook notifications for Help Center article lifecycle events. Five new topics are available:

- `article.created` — fires when an article is created
- `article.updated` — fires when an article's content or metadata is updated
- `article.published` — fires when an article is published
- `article.unpublished` — fires when an article is unpublished
- `article.deleted` — fires when an article is deleted


All topics require the **Read and list articles** permission. The `data.item` payload contains the full article object, including content, statistics, tags, and translated content (for multilingual help centers).

## Articles API: `parent_ids` replaces `parent_id` and `parent_type`

The `parent_id` and `parent_type` fields have been removed from article API **response** payloads.

The `parent_ids` field is now also **writable** on create and update. You can send an array of collection IDs to place an article in one or more collections, or send an empty array to remove it from all collections.

**Affected endpoints:**

- `GET /articles` — `parent_id` and `parent_type` removed from response
- `POST /articles` — `parent_ids` now accepted in request; `parent_id` and `parent_type` removed from response
- `GET /articles/{id}` — `parent_id` and `parent_type` removed from response
- `PUT /articles/{id}` — `parent_ids` now accepted in request; `parent_id` and `parent_type` removed from response
- `GET /articles/search` — `parent_id` and `parent_type` removed from response


## Breaking change: Contact owner_id now returns as string

The `Contact.owner_id` field now returns as a string type in the Preview API version, aligning with `Admin.id`. This change only affects the Preview version—all stable versions (2.15, 2.14, etc.) continue to return `owner_id` as an integer for backward compatibility.

**Affected endpoints:**

- `GET /contacts/{id}`
- `POST /contacts`
- `PUT /contacts/{id}`


**Example responses:**

*Before:*

```json
{
  "id": "5ba682d23d7cf92bef87bfd4",
  "owner_id": 321
}
```

*After:*

```json
{
  "id": "5ba682d23d7cf92bef87bfd4",
  "owner_id": "321"
}
```

## Identity Verification Secret rotation via API

You can now list, create, and delete Messenger [Identity Verification](https://www.intercom.com/help/en/articles/183-enable-identity-verification-for-web-and-mobile) secrets programmatically, without using the Intercom dashboard. This lets you script rotation into your existing secret-management workflows.

**New endpoints:**

- `GET /secure_mode_secrets` — list configured secrets (metadata only).
- `POST /secure_mode_secrets` — create a new 256-bit HMAC secret. The `secret` field is returned **only** in this response.
- `DELETE /secure_mode_secrets/{id}` — delete a secret (completes rotation out).


**Write-once semantics.** For safety, the raw signing material is only ever returned from `POST /secure_mode_secrets`. The list endpoint returns metadata only (name, platforms, `created_at`). If you lose the `secret` returned on create, you must rotate a new secret in and delete the lost one. This mirrors the write-once posture of AWS IAM access keys and GitHub fine-grained personal access tokens.

**Typical rotation flow:**

1. `POST /secure_mode_secrets` with a descriptive `name` and the platform(s) you want the secret enabled for — capture the returned `secret`.
2. Roll the new `secret` out to every client that signs `user_hash` values (your application backend, mobile apps, etc.). During this window, both the old and new secrets are valid, so end-user sessions remain uninterrupted.
3. Once all traffic is signing with the new secret, `DELETE /secure_mode_secrets/{old_id}` to finalize the rotation. Any sessions still signed with the old secret will fail verification on their next request.


The legacy `GET /secure_mode_secret` endpoint continues to work unchanged for backwards compatibility.

**OAuth scopes:** requires `write_secure_mode_secret` for create/delete and `read_secure_mode_secret` (or `read_all`) for list.

## Content Import Sources: Audience targeting

Content Import Sources now support audience targeting. You can associate audiences with a content import source so that imported content is scoped to specific user segments.

**New fields:**

- `audience_ids` (array of integers, nullable) — on create, update, and response payloads. Identifies the audiences associated with the content import source. Set to `null` or an empty array to remove all audiences.
- `apply_audience_to_existing_content` (boolean, default `false`) — on update requests only. When `true`, the audience is applied to all existing external pages belonging to the content import source.


**Affected endpoints:**

- `POST /ai/content_import_sources`
- `PUT /ai/content_import_sources/{id}`
- `GET /ai/content_import_sources`
- `GET /ai/content_import_sources/{id}`


## Breaking Change: Conversation assignee IDs return 0 instead of null when unassigned

The `admin_assignee_id` and `team_assignee_id` fields in Conversation API responses now return **`0`** instead of `null` when a conversation is unassigned.

**Before (null):**

```json
{
  "admin_assignee_id": null,
  "team_assignee_id": null
}
```

**After (integer):**

```json
{
  "admin_assignee_id": 0,
  "team_assignee_id": 0
}
```

## Breaking Change: Ticket assignee IDs are now integers

The `admin_assignee_id` and `team_assignee_id` fields in the Ticket API response are now returned as **integers** instead of strings. This aligns the Ticket API with the Conversation API, which already returns these fields as integers.

**Before (string):**

```json
{
  "admin_assignee_id": "991268013",
  "team_assignee_id": "0"
}
```

**After (integer):**

```json
{
  "admin_assignee_id": 991268013,
  "team_assignee_id": 0
}
```

## Custom Object Instances: list-all endpoint

`GET /custom_object_instances/{type}` now supports three modes:

- **No filter** — returns a paginated list of all instances for the type.
- **`references_contact_id`** — returns instances associated with the given contact.
- **`references_conversation_id`** — returns instances associated with the given conversation.


Supports `page` and `per_page` pagination parameters (max 150 per page).

## Sales Agent metadata on Conversations

Conversations now include `sales_agent_participated` and `sales_agent` fields, exposing metadata about Sales Agent (SDR) involvement. This mirrors the existing `ai_agent` object.

**New Fields on Conversation:**

- `sales_agent_participated` (boolean) — whether the Sales Agent participated
- `sales_agent` (object, nullable) — Sales Agent metadata, including:
  - `outcome` — fixed outcome enum (`qualified`, `disqualified`, `product_discovery`, `escalated_to_support`, `spam`)
  - `routing_outcome` — user-defined routing outcome identifier
  - `collected_data` — flat key-value map of memory fields collected during the conversation


**Applies to:**

- `GET /conversations/{id}`
- `GET /conversations/search`


## Side Conversations API

A new `GET /conversations/{id}/side_conversations` endpoint is now available for retrieving side conversations (internal teammate threads) associated with a conversation. Results are paginated and include the full conversation parts for each side conversation.

**New Endpoint:**

- [`GET /conversations/{id}/side_conversations`](https://developers.intercom.com/docs/references/unstable/rest-api/api.intercom.io/Conversations/listSideConversations)


**Query Parameters:**

- `page` (optional) - Page number of results to return (default: 1)
- `per_page` (optional) - Number of side conversations per page, between 1 and 50 (default: 25)


**Example Response:**

```json
{
  "type": "side_conversation.list",
  "side_conversations": [
    {
      "side_conversation_id": "456",
      "conversation_parts": [
        {
          "type": "conversation_part",
          "id": "789",
          "part_type": "comment",
          "body": "<p>Internal note about this issue</p>",
          "author": {
            "type": "admin",
            "id": "123",
            "name": "Jane Example",
            "email": "jane@example.com"
          }
        }
      ],
      "total_count": 1
    }
  ],
  "total_count": 1,
  "pages": {
    "type": "pages",
    "page": 1,
    "per_page": 25,
    "total_pages": 1
  }
}
```

**OAuth Scope:** `read_conversations`

## Company Activity Tracking via API

The `POST /companies` and `PUT /companies/{id}` endpoints now accept an `update_last_request_at` boolean parameter. When set to `true`, the company's `last_request_at` field is updated to the current time.

This is useful for workspaces that manage companies via the REST API and need to keep the "Last seen" value up to date. Requires the `write_users_companies` OAuth scope.

## Search Activity Logs API

A new `POST /admins/activity_logs/search` endpoint is now available for searching and filtering admin activity logs. This provides a dedicated search endpoint with event type filtering capabilities.

**New Endpoint:**

- [`POST /admins/activity_logs/search`](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Admins/searchActivityLogs)


**Request Body Parameters:**

- `created_at_after` (optional) - Start date as a UNIX timestamp (defaults to 30 days ago)
- `created_at_before` (optional) - End date as a UNIX timestamp
- `event_types` (optional) - Array of event type strings to filter by
- `page` (optional) - Page number of results to return (default: 1)
- `per_page` (optional) - Number of results per page, between 1 and 250 (default: 20)


**Example Request:**

```json
{
  "created_at_after": "1677253093",
  "created_at_before": "1677861493",
  "event_types": ["app_name_change", "message_state_change"]
}
```

Use the [`GET /admins/activity_log_event_types`](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Admins/listActivityLogEventTypes) endpoint to retrieve all valid event type values.

This endpoint requires the `read_admins` OAuth scope.

## Content Snippets API

Preview only
The Content Snippets API is available in the Preview API version only. It is not yet included in any stable API version.

New endpoints to manage content snippets via the public API. Content snippets are reusable pieces of content that power Fin (AI agent) and Copilot responses.

**Endpoints:**

- `GET /content_snippets` - List all content snippets (paginated)
- `GET /content_snippets/{id}` - Retrieve a single content snippet
- `POST /content_snippets` - Create a new content snippet
- `PUT /content_snippets/{id}` - Update an existing content snippet


**OAuth Scope:** `read_write_content_snippets`

**Example Request:**

```
GET /content_snippets
```

**Example Response:**

```json
{
  "type": "list",
  "data": [
    {
      "type": "content_snippet",
      "id": "123",
      "title": "How to reset your password",
      "locale": "en",
      "json_blocks": [
        { "type": "paragraph", "text": "Navigate to Settings > Security > Reset password." }
      ],
      "chatbot_availability": 1,
      "copilot_availability": 1,
      "created_at": 1663597223,
      "updated_at": 1663597223
    }
  ],
  "total_count": 1,
  "page": 1,
  "per_page": 50,
  "total_pages": 1
}
```

## Real-Time Team Metrics

A new `GET /teams/{team_id}/metrics` endpoint is now available, providing real-time per-admin conversation metrics (open, idle, snoozed counts) for a given team. This is designed for workforce management integrations that need to monitor agent workload in real time.

**Endpoint:** `GET /teams/{team_id}/metrics`

**Path Parameters:**

- `team_id` - The ID of the team to retrieve metrics for. Use `GET /teams` to list available team IDs.


**Optional Parameters:**

- `idle_threshold` - Seconds after which an open conversation is considered idle (default: 1800, clamped to 1–86400).


**Example Request:**

```
GET /teams/42/metrics
```

**Example Response:**

```json
{
  "type": "team_metric.list",
  "data": [
    {
      "type": "team_metric",
      "admin_id": "123",
      "open": 5,
      "idle": 2,
      "snoozed": 1
    }
  ]
}
```

This endpoint requires the real-time monitoring feature to be enabled for your workspace and the `read_admins` OAuth scope.

For complete documentation, see the [Team Metrics API Reference](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Teams/getTeamMetrics).

## Email History in Conversation Source

The `GET /conversations/{id}` endpoint now supports an `include_email_history` query parameter. When set to `true`, the `source` object of the conversation (email) will include an `email_message_metadata` field containing:

- `message_id` — the unique identifier from the email's `Message-ID` header
- `subject` — the subject of the email
- `email_address_headers` — a list of an email address headers
- `history` — the HTML content of any quoted or forwarded email history from the initial inbound message


**Updated Endpoint:**

- `GET /conversations/{id}?include_email_history=true` — returns `email_message_metadata` in the `source` object


**Note:** The `history` is only available for the conversation source (initial part), not for individual conversation parts. This parameter is not available on list/search endpoints.

## List Deleted Conversations API

You can now retrieve a list of deleted conversation IDs and their deletion timestamps using the new `GET /conversations/deleted` endpoint.

details
summary
Try Listing Deleted Conversations
## GET /fin_voice/conversation/{conversation_id} added

Added missing endpoint for retrieving Fin Voice calls associated with a conversation ID. Also backfilled to v2.15.

## Fin Agent API: New `replying` status for intermediate reply events

The `fin_replied` webhook event now uses a `replying` status for intermediate reply parts, and a separate `fin_status_updated` event with `awaiting_user_reply` fires as a "done" signal when Fin has finished replying. This replaces the previous behavior where every `fin_replied` event had `status: awaiting_user_reply`, making it impossible to distinguish intermediate replies from the final one.

**Before:**

```
fin_replied (status: awaiting_user_reply) — part 1
fin_replied (status: awaiting_user_reply) — part 2
fin_replied (status: awaiting_user_reply) — part 3
```

**After:**

```
fin_replied (status: replying) — part 1
fin_replied (status: replying) — part 2
fin_replied (status: replying) — part 3
fin_status_updated (status: awaiting_user_reply) — done signal
```

**What changed:**

- `fin_replied` event: `status` enum now includes `replying` (new default for intermediate replies) and `awaiting_user_reply` (legacy)
- `fin_status_updated` event: `status` enum now includes `awaiting_user_reply` in addition to `escalated`, `resolved`, and `complete`


Clients should update their integrations to listen for the `fin_status_updated` event with `status: awaiting_user_reply` as the signal that Fin is done replying and the user can respond.

## Activity Log Event Types API

A new endpoint lets you retrieve all possible event type values for admin activity logs. Use these values to understand what actions are trackable and to filter results when querying the [Activity Logs API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Admins/listActivityLogs).

**New Endpoint:**

- `GET /admins/activity_log_event_types` - List all activity log event types


**Example Response:**

```json
{
  "type": "activity_log_event_type.list",
  "event_types": [
    "admin_login_success",
    "admin_logout",
    "app_name_change",
    "message_state_change"
  ]
}
```

**OAuth Scope Required:** `Read admins and teammates`

For complete documentation, see the [Activity Log Event Types API Reference](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Admins/listActivityLogEventTypes).

## Conversations API: `retain_metrics` parameter for conversation deletion

The [Delete a conversation](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/deleteConversation) endpoint now supports a `retain_metrics` query parameter that controls how conversation data is deleted:

- **`retain_metrics=true` (default)**: Deletes the conversation while retaining reporting data.
- **`retain_metrics=false`**: Deletes the conversation and all associated reporting data.


Required scope for retain_metrics=false
Using `retain_metrics=false` requires the `delete_conversations_and_metrics` OAuth scope. See [OAuth Scopes](/docs/build-an-integration/learn-more/authentication/oauth-scopes) for details.

**Example Request:**

```bash
curl -X DELETE https://api.intercom.io/conversations/123?retain_metrics=false \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
  -H 'Accept: application/json' \
  -H 'Intercom-Version: Preview'
```

For more info, see [this help center article](https://www.intercom.com/help/en/articles/13885146-deleting-a-conversation).

## Folder Management API

A new top-level Folders API is now available at `/folders` for organizing content into hierarchical folder structures.

**New endpoints:**

- `GET /folders` — List all folders (supports pagination and `parent_folder_id` filter)
- `POST /folders` — Create a new folder
- `GET /folders/{id}` — Retrieve a folder
- `PUT /folders/{id}` — Update a folder
- `DELETE /folders/{id}` — Delete a folder (must be empty)


**Article and Internal Article changes:**

- A `folder_id` field has been added to article and internal article responses, as well as create and update request payloads, allowing you to organize articles into folders.
- The `/internal_articles/search` endpoint's `folder_id` parameter now searches recursively through descendant folders.


## Ticket state change tracking

The Ticket object now includes a `previous_ticket_state_id` field that returns the ID of the ticket's previous state. This enables tracking ticket state transitions for reporting and compliance. The field returns `null` when no state change history exists.

## Company Notes API

You can now create notes on company records via the API using `POST /companies/{company_id}/notes`, mirroring the existing contact notes functionality. The request and response format is identical to contact notes, with an optional `admin_id` parameter that defaults to the token owner. Notes are polymorphic — a single note belongs to either a contact or a company, never both.

## Admin role now included in API responses

The admin object returned by `GET /admins`, `GET /admins/{id}`, `GET /me`, and `PUT /admins/{id}/away` now includes a `role` attribute when the admin has a role assigned. The `role` object contains the role `id` and `name`.

**Example:**

```json
{
  "type": "admin",
  "id": "1295",
  "name": "Joe Example",
  "role": {
    "type": "role",
    "id": "456",
    "name": "Support Agent"
  }
}
```

**Note:** Admins with custom per-user permissions (no role assigned) will not have the `role` field.

## Conversations API: display_as parameter behavior

The `display_as` query parameter in the Retrieve Conversation and List Conversation Parts endpoints now affects both the `body` and `subject` fields of conversation messages when set to `plaintext`. By default, both fields are returned in HTML format.

## Conversation Webhook Serialization Alignment

Conversation webhook payloads now use the same serialization format as API responses:

- **Statistics date fields** (`first_contact_reply_at`, `first_assignment_at`, `first_admin_reply_at`, `first_close_at`, `last_assignment_at`, `last_assignment_admin_reply_at`, `last_contact_reply_at`, `last_admin_reply_at`, `last_close_at`) now return Unix timestamp integers instead of ISO8601 strings.
- **`body` and `subject` fields** now return plain text instead of HTML.


## Data Connectors API

We've added a new Data Connectors API that lets you create, update, delete, and list your data connectors, plus view their execution history. Data connectors allow you to make HTTP requests to external APIs from Intercom workflows and AI agents.

**Endpoints:**

- `POST /data_connectors` - Create a new data connector
- `PATCH /data_connectors/{id}` - Update a data connector (fields, state transitions)
- `DELETE /data_connectors/{id}` - Delete a data connector
- `GET /data_connectors` - List all data connectors (paginated)
- `GET /data_connectors/{id}` - Retrieve a single data connector with full detail
- `GET /data_connectors/{id}/execution_results` - List execution results
- `GET /data_connectors/{id}/execution_results/{id}` - Retrieve a single execution result


**Key Features:**

- **Create in draft**: New connectors start in `draft` state — configure URL, headers, data inputs, and audiences before publishing
- **Audience targeting**: Control which user types (leads, users, visitors) can trigger the connector
- **Safe deletion**: Returns `409` if the connector is in use or not in draft state
- **Cursor-based pagination**: Navigate through data connectors and execution results using `starting_after` and `per_page`
- **Filtering**: Filter execution results by `success`, `error_type`, and time range
- **Opt-in bodies**: Use `include_bodies=true` to include request/response bodies in execution results


**OAuth Scope Required:** `Read data connectors` (read-only) or `Read and write data connectors` (create/update/delete)

For complete documentation and examples, see the [Data Connectors API Reference](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Data-Connectors).

## New Data Connector execution webhook topic

You can now receive real-time notifications when Data Connector actions complete execution using the new `data_connector.execution.completed` webhook topic. This webhook provides operational visibility into connector execution outcomes, including success/failure status, HTTP response codes, error categorization, and execution timing. See the [webhook models](/docs/references/preview/webhooks/webhook-models) for details on how to subscribe to execution events.

## Macros API

We've added a new Macros API that provides programmatic access to saved replies (macros) in Intercom. This API enables external applications to retrieve and display your team's pre-written responses, making it easier to integrate Intercom macros with third-party tools and workflows.

**New Endpoints:**

- `GET /macros` - List all available macros with pagination
- `GET /macros/{id}` - Retrieve a specific macro by ID


**Key Features:**

- **Cursor-based pagination**: Navigate through large sets of macros efficiently using the `starting_after` parameter with Base64-encoded cursors
- **Smart placeholder transformation**: Macros containing Intercom placeholders (e.g., `{{user.name}}`) are automatically transformed to XML-like attributes (`<attribute key="user.name"/>`) for easier parsing
- **Flexible filtering**: Use the `updated_since` parameter to retrieve only recently modified macros
- **Team visibility controls**: Respects macro visibility settings, showing only macros available to the authenticated user's teams
- **Channel availability**: Each macro indicates where it can be used (`inbox`, `messenger`, or both)


**OAuth Scope Required:** `READ_CONVERSATIONS`

**Use Cases:**

- Integration with training platforms like Solidroad for customer service simulations
- Building custom macro management interfaces
- Exporting macros for documentation or backup purposes
- Analyzing macro usage and content across your organization


**Example Request:**

```bash
curl -X GET https://api.intercom.io/macros?per_page=10 \
  -H 'Authorization: Bearer <YOUR_ACCESS_TOKEN>' \
  -H 'Accept: application/json' \
  -H 'Intercom-Version: Preview'
```

**Example Response:**

```json
{
  "type": "list",
  "data": [
    {
      "type": "macro",
      "id": "123",
      "name": "Order Status Update",
      "body": "<p>Hi <attribute key=\"user.name\" default=\"there\"/>, your order is ready!</p>",
      "body_text": "Hi there, your order is ready!",
      "created_at": "2025-07-17T11:18:08.000Z",
      "updated_at": "2025-07-17T15:30:24.000Z",
      "visible_to": "everyone",
      "visible_to_team_ids": [],
      "available_on": ["inbox", "messenger"]
    }
  ],
  "pages": {
    "type": "pages",
    "per_page": 10,
    "next": {
      "starting_after": "WzE3MTk0OTM3NTcuMCwgIjEyMyJd"
    }
  }
}
```

**Important Notes:**

- This API is currently available in the Preview version only
- Placeholders in macro bodies are transformed from Intercom format to XML-like attributes
- The pagination cursor encodes `[updated_at, id]` for stable ordering
- Maximum 150 macros can be retrieved per request


For complete documentation and more examples, see the [Macros API Reference](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/macros/).

## New WhatsApp Message status API

The [WhatsApp Message status API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/whatsapp/getwhatsappmessagestatus) is now available in the Preview version. This endpoint returns paginated status events for WhatsApp messages sent via the Outbound module, providing information about delivery state and related message details.

## Enforcement of ticket permissions on the Conversations API

Starting in early August 2024, accessing a ticket directly through the [Conversations API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/retrieveConversation/) will requires the "Read tickets" or "Write tickets" scope, as appropriate. When [listing conversations](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/listConversations/) or [searching conversations](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/searchConversations/), tickets will only be returned in the results if the caller has the "Read tickets" scope.

Breaking permission changes
Previously, tickets were accessible through the Conversations API using only the "Read conversations" or "Write conversations" scope(s). Any apps relying on this behaviour will need to add the appropriate ticket permission, and have users reauthenticate.

## New Searchable Contact Attribute

We added `formatted_phone` as a searchable attribute for contacts. This is the contact's phone number normalized to the E164 format.

## Reporting Data Export API: qualified_id for Attribute Disambiguation

The Reporting Data Export API now includes a `qualified_id` field in the `get_datasets` response to uniquely identify attributes across different types.

**Problem Solved:**
Custom attributes can have the same name across different types (e.g., a "Brand" attribute might exist for both user custom data and conversation custom data). Previously, using just the `id` field could result in ambiguous attribute selection.

**New Field:**
The `qualified_id` field uses a namespaced format: `"type.name"` (e.g., `"people.Brand"`, `"conversation.Brand"`).

**Available Prefixes:**

- `people` - User custom data attributes
- `company` - Company custom data attributes
- `conversation` - Conversation custom data attributes
- `ticket` - Ticket attributes
- `system` - System-defined attributes


**Example Response:**

```json
{
  "type": "list",
  "data": [
    {
      "id": "conversation",
      "name": "Conversation",
      "attributes": [
        {
          "id": "Brand",
          "qualified_id": "people.Brand",
          "name": "Brand"
        }
      ]
    }
  ]
}
```

**Usage:**
When calling the `enqueue` endpoint, you must use `qualified_id` values in the `attribute_ids` array. The simple `id` is no longer accepted — use the `qualified_id` from the `get_datasets` response to ensure unambiguous attribute selection.