# Webhook Topics

You can subscribe to the following Webhook topics, and you will receive notifications on your endpoint URL when an event occurs. The 'Object' column shows the [Intercom object](/docs/build-an-integration/learn-more/object-model) related to the event sent as part of the notification.

Each Webhook topic is associated with one or more permissions. When you set up a subscription to a particular topic, you will need to select the appropriate permissions to be able to receive a notification for that topic.

Multiple permissions
Some topic are associated with multiple permissions. In these cases you don't need to select all of these permissions to subscribe to that topic.

Deletion topics send minimal payloads
The `*.deleted` webhook topics send a **minimal identification payload** containing only identifying fields — not the full resource object.

### Admin topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| admin.added_to_workspace | Admin | An Admin being added to workspace | Read admins |
| admin.away_mode_updated | Admin | Admin away mode updates | Read admins |
| admin.activity_log_event.created | Admin | Run each time a new admin activity log is created | Read admins |
| admin.removed_from_workspace | Admin | An Admin being removed from a workspace | Read admins |
| admin.logged_in | Admin | An Admin logging into a workspace | Read admins |
| admin.logged_out | Admin | An Admin manually logging out of Intercom in the current workspace or when the Admin's session expires after signing in through [SAML SSO](https://www.intercom.com/help/en/articles/3974587-integrate-with-an-identity-provider-and-log-in-with-saml-sso) | Read admins |


### Article topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| article.created | Article | Article creations | Read and list articles |
| article.updated | Article | Article updates | Read and list articles |
| article.published | Article | Article published | Read and list articles |
| article.unpublished | Article | Article unpublished | Read and list articles |
| article.deleted | Article | Article deletions | Read and list articles |


### Audience topics

These topics are available on the Preview API version only.

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| audience.created | Audience | Audience created | Read audiences |
| audience.updated | Audience | Audience updated (name, predicates, or role predicates) | Read audiences |
| audience.deleted | Audience | Audience deleted | Read audiences |
| audience.member_added | Audience Membership | Content added as a member of an audience | Read audiences |
| audience.member_removed | Audience Membership | Content removed as a member of an audience | Read audiences |


### Call topics

These topics apply to Intercom Phone calls only.

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| call.started | Call | A call has started | Read conversations |
| call.ended | Call | A connected call has ended. Not triggered for calls abandoned during routing. | Read conversations |
| call.transcription_available | Call | A call transcription is available | Read conversations |
| call.recording_available | Call | A call recording is available | Read conversations |


### Content import source topics

These topics are available on the Preview API version only.

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| content_import_source.created | Content Import Source | Content import source created | Read content |
| content_import_source.updated | Content Import Source | Content import source updated | Read content |
| content_import_source.deleted | Content Import Source | Content import source deleted | Read content |


### Content snippet topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| content_snippet.created | Content Snippet | Content snippet creations | Read content snippets |
| content_snippet.updated | Content Snippet | Content snippet updates | Read content snippets |
| content_snippet.deleted | Content Snippet | Content snippet deletions | Read content snippets |


### Company topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| company.created | Company | Company creations | Read users and companiesRead one user and one company |
| company.deleted | Company | Company deletions | Read users and companiesRead one user and one company |
| company.updated | Company | Company being updated | Read users and companiesRead one user and one company |
| company.contact.attached | Company, Contact | Company attached to a Contact | Read users and companies, Read one user and one company |
| company.contact.detached | Company, Contact | Company detached from a Contact | Read users and companies, Read one user and one company |


### Contact topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| contact.archived | Contact | Contacts archived | Read users and companiesRead and write usersRead one user and one company |
| contact.deleted | Contact | Contacts deleted | Read users and companiesRead one user and one company |
| contact.email.updated | Contact | A Contact email address is updated | Read users and companiesRead and write usersRead one user and one company |
| contact.lead.added_email | Contact | An email address is added to a Contact(Lead) | Read users and companiesRead and write usersRead one user and one company |
| contact.lead.created | Contact | Contact creations(Lead) | Read users and companiesRead and write usersRead one user and one company |
| contact.lead.signed_up | Contact | Contacts converting from Leads to Users | Read users and companiesRead and write usersRead one user and one company |
| contact.lead.tag.created | Contact Tag | Contacts being tagged (Lead) | Read users and companiesRead and write usersRead one user and one company |
| contact.lead.tag.deleted | Contact Tag | Contacts being untagged (Lead) | Read users and companiesRead and write usersRead one user and one company |
| contact.lead.updated | Contact | Contacts being updated(Lead) | Read users and companiesRead and write usersRead one user and one company |
| contact.merged | Contact ([payload details](#contact-merged-payload)) | Contacts being merged(User and Lead) | Read users and companiesRead and write usersRead one user and one company |
| contact.subscribed | Subscription | Contacts subscribing to email | Read users and companiesRead and write usersRead one user and one company |
| contact.unarchive | Contact | Contacts unarchived | Read users and companiesRead and write usersRead one user and one company |
| contact.unsubscribed | Subscription | Contacts unsubscribing from email | Read users and companiesRead and write usersRead one user and one company |
| contact.user.created | Contact | Contact creations(User) | Read users and companiesRead and write usersRead one user and one company |
| contact.user.tag.created | Contact Tag | Contacts being tagged(User) | Read users and companiesRead and write usersRead one user and one company |
| contact.user.tag.deleted | Contact Tag | Contacts being untagged(User) | Read users and companiesRead and write usersRead one user and one company |
| contact.user.updated | Contact | Contact updated (User) | Read users and companies, Read and write users,Read one user and one company |


### Conversation topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| conversation.admin.assigned | Conversation | Admin conversation assignments | Read conversations |
| conversation.admin.closed | Conversation | Admin conversation closed | Read conversations |
| conversation.admin.noted | Conversation | Admin conversation notes | Read conversations |
| conversation.admin.open.assigned | Conversation | Admin open conversation assignments | Read conversations |
| conversation.admin.opened | Conversation | Admin conversation opens | Read conversations |
| conversation.admin.replied | Conversation | Admin conversation replies | Read conversations |
| conversation.admin.single.created | Conversation | Admin initiated 1:1 conversations | Read conversations |
| conversation.admin.snoozed | Conversation | Admin conversation snoozes | Read conversations |
| conversation.admin.unsnoozed | Conversation | Admin conversation unsnoozes | Read conversations |
| conversation.operator.replied | Conversation | Fin/Bot replies to a conversation | Read conversations |
| conversation.deleted | Conversation | Conversation deleted | Read conversations |
| conversation_part.redacted | Conversation Part | Conversation parts being deleted | Read conversations |
| conversation_part.tag.created | Conversation Part | Conversation parts being tagged | Read conversations |
| conversation.priority.updated | Conversation | Conversation priority updated | Read conversations |
| conversation.rating.added | Conversation | Conversations getting a rating | Read conversations |
| conversation.read | Conversation | Contacts reading conversations(User and Lead) |  |
| conversation.user.created | Conversation | Contact initiated conversations(User and Lead) | Read conversations |
| conversation.user.replied | Conversation | Contact conversation replies(Visitor, Lead and User) | Read conversations |
| conversation.contact.attached | Conversation, Contact | Contact attached to a conversation | Read conversations |
| conversation.contact.detached | Conversation, Contact | Contact detached from a conversation | Read conversations |
| conversation.company.updated | Conversation | Company association updated on a conversation | Read conversations |


### Content stat topics

| Topics | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| content_stat.banner | Content Stat | [Banner message](https://www.intercom.com/help/en/articles/4557393-how-to-create-a-banner-message) events:- receipt (Banner displayed)- goal_success- click- collected_email- reaction | Read content data |
| content_stat.carousel | Content Stat | [Mobile carousel](https://www.intercom.com/help/en/articles/4164612-design-and-build-a-mobile-carousel) events:- receipt (Carousel displayed)- goal_success- button_tap- completion- dismissal- permission_grant | Read content data |
| content_stat.chat | Content Stat | [Chat message](https://www.intercom.com/help/en/articles/3292781-get-started-sending-chat-and-post-messages) events:- receipt (Chat delivered)- goal_success- open- click- collected_email- reply | Read content data |
| content_stat.checklist | Content Stat | [Checklist](https://www.intercom.com/help/en/articles/6612245-intercom-checklists-beta) events:- receipt (Checklist shown)- goal_success | Read content data |
| content_stat.custom_bot | Content Stat | [Custom Bot](https://www.intercom.com/help/en/articles/2216447-custom-bots-explained) events:- receipt- goal_success- reply- completion | Read content data |
| content_stat.email | Content Stat | [Email](https://www.intercom.com/help/en/articles/3292845-get-started-sending-emails) events:- receipt (Email sent)- goal_success- open- click- replyEmail failure events:- hard_bounce- soft_bounce- spam_complaint- unsubscribe | Read content data |
| content_stat.news_item | Content Stat | [News Item](https://www.intercom.com/help/en/articles/6362267-getting-started-with-news#h_61de793119) events:- receipt (News Item displayed)- open- click- reaction | Read content data |
| content_stat.post | Content Stat | [Post message](https://www.intercom.com/help/en/articles/3292781-get-started-sending-chat-and-post-messages) events:- receipt (Post sent)- goal_success- open- click- Reply- reaction | Read content data |
| content_stat.push | Content Stat | [Push message](https://www.intercom.com/help/en/articles/3292847-get-started-with-mobile-push-messages) events:- receipt (Push sent)- goal_success- OpenPush message failure events:- push_failure | Read content data |
| content_stat.series | Content Stat | [Series campaign](https://www.intercom.com/help/en/articles/4425207-series-explained) events:- receipt- goal_success- series_completion- series_disengagement- series_exit | Read content data |
| content_stat.series.webhook | Content Stat | [Series Webhook](https://www.intercom.com/help/en/articles/5222039-sending-webhooks-with-series) events:- receiptSeries Webhook failure event:- failure | Read content data |
| content_stat.sms | Content Stat | [SMS](https://www.intercom.com/help/en/articles/6311186-creating-and-sending-sms) message events:- receipt (SMS sent)- goal_success- keyword_replyFailure stat types include:- sms_failure- unsubscribe | Read content data |
| content_stat.survey | Content Stat | [Survey](https://www.intercom.com/help/en/articles/5966645-how-to-create-a-survey) events:- receipt (Survey shown)- goal_success- answer- click- completion- dismissal | Read content data |
| content_stat.tooltip_group | Content Stat | [Tooltip](https://www.intercom.com/help/en/articles/6475942-how-to-create-a-tooltip) events:- receipt- goal_success | Read content data |
| content_stat.tour | Content Stat | [Product tour](https://www.intercom.com/help/en/articles/2900885-product-tours-explained) events:- receipt (Tour shown)- goal_success- tour_step_failure- completion | Read content data |


### Event topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| event.created | Event | Events created | Read events |


### API Activity topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| api.request.completed | API Request | Successful v3 API request completed | Read API activity logs |


### Jobs topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| job.completed | Job | Job completed | Read jobs |


### Ping

| Topic | Object | Event description |
|  --- | --- | --- |
| ping | Ping | Sent when a post to the subscription's ping resource is received or periodically by Intercom. Ping is always subscribed to. |


### Subscription topics

| Topics | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| granular.unsubscribe | Subscription | A User unsubscribes from a message subscription type | Read and list users and companiesRead and write usersRead one user and one company |
| granular.subscribe | Subscription | A User subscribes from a message subscription type | Read and list users and companiesRead and write usersRead one user and one company |


### Ticket topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| ticket.created | Ticket | Ticket created | Read tickets |
| ticket.state.updated | Ticket | Ticket state updated | Read tickets |
| ticket.note.created | Ticket | Ticket note created | Read tickets |
| ticket.admin.assigned | Ticket | Ticket admin assigned | Read tickets |
| ticket.team.assigned | Ticket | Ticket team assigned | Read tickets |
| ticket.contact.attached | Ticket | Ticket contact attached | Read tickets |
| ticket.contact.detached | Ticket | Ticket contact detached | Read tickets |
| ticket.attribute.updated | Ticket | Ticket attribute updated | Read tickets |
| ticket.admin.replied | Ticket | Ticket admin replied | Read tickets |
| ticket.contact.replied | Ticket | Ticket contact replied | Read tickets |
| ticket.closed | Ticket* | Ticket conversation closed | Read tickets |
| ticket.rating.provided | Ticket | Ticket getting a rating | Read tickets |
| ticket.resolved | Ticket | Ticket state transitioned to resolved | Read tickets |


* The `ticket.closed` payload wraps the Ticket inside a `ticket` field on `data.item` — see the note below.

ticket.resolved and ticket.closed webhook topics
The `ticket.resolved` and `ticket.closed` webhook topics have distinct behaviors:

- **ticket.resolved** - Fires when a ticket's state transitions to "resolved". This is a state-based event.
- **ticket.closed** - Fires when a ticket conversation is closed. This is separate from state transitions.


**Payload shape (API v2.15+):** The two topics deliver the Ticket in different positions inside the notification payload:

- `ticket.resolved` — the Ticket is the top-level item: `data.item.ticket_id`, `data.item.ticket_state`, etc.
- `ticket.closed` — the Ticket is nested under a `ticket` field on `data.item`: `data.item.ticket.ticket_id`, `data.item.ticket.ticket_state`, etc.


Consumers that handle both topics should branch on the topic name (or check for the presence of `data.item.ticket`) before reading ticket fields.

**API Versioning:** In API versions prior to the introduction of `ticket.resolved`, the `ticket.closed` webhook fired when tickets transitioned to "resolved" state. For backward compatibility, both webhooks may fire in certain scenarios when using older API versions. When using the latest API version, these webhooks have distinct behaviors as described above.

### Visitor topics

| Topics | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| visitor.signed_up | Visitor | Contacts converting from Visitors to Users | Read users and companiesRead and write usersRead one user and one company |


### Data connector topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| data_connector.execution.completed | Data Connector Execution | Data Connector action execution completed | Read data connectors |


### Procedure topics

These topics are available on the Preview API version only.

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| procedure.hitl_notification.created | Procedure HITL Notification | A Fin Procedure reached a Human in the Loop step requiring external input via API | Read conversations |


## Webhook notification object

A standard Webhook notification object contains the following fields:

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'notification_event' |
| id | string | The Intercom defined id representing the notification. |
| self | string | The Intercom defined URL for the subscription. Optional. |
| created_at | timestamp | The timestamp the notification was created. |
| topic | string | Corresponds to a topic. |
| delivery_attempts | number | The number of times this notification has been attempted. |
| first_sent_at | timestamp | The first time the delivery was attempted. |
| data | object | A container for the data associated with the notification. |
| data.item | object | The data associated with the notification, which will have a 'type' field. |


The contents of `data.item` object will be defined according to its `type` field. In the example below, the type value of `Company` indicates a company object.

```json
{
  "type": "notification_event",
  "topic": "company.created",
  "id": "notif_ccd8a4d0-f965-11e3-a367-c779cae3e1b3",
  "app_id" : "a86dr8yl",
  "created_at": 1392731331,
  "delivery_attempts": 1,
  "first_sent_at": 1392731392,
  "data": {
    "item": {
      "type": "company",
      "id": "531ee472cce572a6ec000006",
      "name": "Example Company Inc.",
      "company_id": "6",
      "remote_created_at": 1394531169,
      "created_at": 1394533506,
      "updated_at": 1396874658,
      "custom_attributes": {
      }
    }
  }
}
```

## `contact.merged` payload

For `contact.merged` events, `data.item` is the standard Contact object representing the surviving target contact, with an additional `merged_from` field identifying the source contact that was absorbed into it.

| Attribute | Type | Description |
|  --- | --- | --- |
| merged_from | object | The source contact that was merged into the target. Contains `type` (`"contact"`) and `id`. |


```json
{
  "type": "contact",
  "id": "5f2a1b3c4d5e6f7a8b9c0d1e",
  "external_id": "user-42",
  "email": "alice@example.com",
  "name": "Alice Example",
  "role": "user",
  "...": "all other Contact fields",
  "merged_from": {
    "type": "contact",
    "id": "6a3b2c4d5e6f7a8b9c0d1e2f"
  }
}
```

The `merged_from` field appears only on the `contact.merged` topic. It is not present on other Contact-shaped webhook events or on REST Contact responses.

## Handling Webhook notifications

You will receive notifications on your chosen topics when you set up a subscription. How you handle those notifications, i.e. the HTTP status code returned, will determine the subsequent state of that subscription.

Timeout
You have 5 seconds to respond to a notification. If you don't send a response within that time, the notification is treated as failed and will be retried only once after 1 minute. If you respond with too many error responses, we drop future notifications for a period of 15 minutes.

| Response Code | Description | Action |
|  --- | --- | --- |
| 2xx | Success | The webhook was successfully delivered. |
| 410 | Gone | When a 410 is received, we assume the resource is no longer available. We will disable the subscription and no more notifications will be sent. |
| 429 | Too many requests | When a 429 is received, all notifications from that subscription will be throttled. Depending on the rate of delivery, this delay can be between 1 minute to 2 hours. If 429s continue and any notification is delayed for > 2 hours then we will drop that notification. |
| 4xx (excl. 429)5xx | Client or service errors | We will retry after 1 minute for all other errors. If the 2nd retry fails then we mark the notification delivery as failed. |


## Signed notifications

Intercom signs webhook notifications via an `X-Hub-Signature` header. We do this so that you can verify that the notification came from Intercom by decoding the signature.

We compute the value of this `X-Hub-Signature` header by creating a signature using the body of the JSON request and your App's `client_secret` value, which you can find on the Basic Info page of your App.

The signature is the hexadecimal (40-byte) representation of an SHA-1 signature computed using the HMAC algorithm defined in [RFC2104](http://tools.ietf.org/html/rfc2104).

The `X-Hub-Signature` header value starts with the string `sha1=` followed by the signature.

```http
POST https://example.org/hooks
User-Agent: intercom-parrot-service-client/1.0
X-Hub-Signature: sha1=21ff2e149e0fdcac6f947740f6177f6434bda921
Accept: application/json
Content-Type: application/json

{
  "type" : "notification_event",
  "id" : "notif_78c122d0-23ba-11e4-9464-79b01267cc2e",
  "topic" : "user.created",
  "app_id" : "a86dr8yl",
  "data" : {
    "type" : "notification_event_data",
    "item" : {
      "type" : "user",
      "id" : "530370b477ad7120001d",
      "user_id" : "25",
      "name" : "Joe Example",
      "unsubscribed_from_emails" : false,
      "custom_attributes" : {}
    }
  }
}
```

## Admin notification object

The Admin notification object is similar to the [model returned via the API](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Admins/admin/). You can see an example object below:

```json
{
  "type": "admin",
  "id": "1",
  "name": "John Doe",
  "email": "john.doe@intercom.io",
  "job_title": "CEO",
  "away_mode_enabled": true,
  "away_mode_reassign": false,
  "away_status_reason": "🍔 On lunch",
  "has_inbox_seat": true,
  "team_ids": []
}
```

## Contact Tag notification object

We only return the Contact Tag notification object for Webhooks. You can see an example object below:

```json
{
  "type": "contact_tag",
  "created_at": 1392731331,
  "tag" : {
      "id": "1287",
      "name": "independent",
      "type": "tag"
    },
  "contact" : {
      "type": "contact",
      "id": "1287ab1287fefe",
        ........
  }
}
```

A Contact Tag notification object is composed from the existing Contact and Tag objects and is sent when Contacts are tagged and untagged via the `contact.user.tag.created`, `contact.lead.tag.created`, `contact.lead.tag.deleted` and `contact.user.tag.deleted` topics.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'contact_tag'. |
| created_at | timestamp | The time the contact tag object was created. |
| tag | Tag | The tag that was added or removed. |
| contact | contact | The contact that was tagged or untagged. |


## Content Stat notification object

We only return the Content Stat notification object for Webhooks. You can see an example object below:

```json
{
  "type": "content_stat.series",
  "created_at": "2022-10-11T15:01:07.000Z",
  "content_stat": {
    "id": 1,
    "content_type": "series",
     "content_id": 1,
     "stat_type": "receipt",
     "ruleset_id": 29,
     "content_title": "Untitled",
     "ruleset_version_id": -1,
     "receipt_id": 1,
     "tags": {
       "type": "list",
       "has_more": false,
       "data": [],
       "total_count": 0
     },
     "series_id": 1,
     "series_title": null,
     "node_id": 3
  },
  "contact": {
    "type": "contact",
    "id": "6318db7dfb80c614fe1792b5",
    ...
  }
}
```

The Content Stat notification object will match our existing Webhook notification object detailed [here](https://developers.intercom.com/intercom-api-reference/reference/webhook-models#webhook-notification-object) and contains the following fields:

| Attribute | Type | Description |
|  --- | --- | --- |
| id | string | The unique identifier for the Content Stat set by Intercom |
| content_type | string | The type of Content the Stat relates to, e.g. Email, Chat, Post, Push etc |
| content_id | string | The unique identifier for the Content given by Intercom, In an A/B test each version has its own identifier. |
| stat_type | string | Type of the stat event. While there are some common stat types like "receipt", others are content specific. Content Type email, for example, has stats for unsubscribe, bounce etc. The list of supported stat types is included in the table above. Others may be added over time. |
| content_title | string | The title of Content you see in your Intercom Workspace |
| ruleset_id | string | The unique identifier of the Outbound Message the Content relates to in your Intercom Workspace |
| ruleset_version_id | string | The unique identifier of the Outbound Message version the Content relates to in your Intercom Workspace |
| series_id | string | Optional - If the stat relates to a Content object (email, push, etc) which is part of a Series campaign, this will include the ID of that Series campaign |
| series_title | string | Optional - If the stat relates to a Content object (email, push, etc) which is part of a Series campaign, this is title of the Series |
| node_id | string | Optional - If the stat relates to a Content object (email, push, etc) which is part of a Series campaign, this is the ID of the Node in the Series |
| contact | object | Nested Contact object. This is the user or lead to whom the content was sent. |
| company | object | Optional nested Company object. If the content stat relates to a company (company predicates were used in the audience targeting), the company information is also included. |


## Content Stat Survey response notification object

The `content_stat.survey` notification object contains additional payload fields relating to Survey answers. The individual answer key is included in the answer stat type event. The answers key is included in the completion stat type event showing all answers in the Survey.

| Attribute | Type | Description |
|  --- | --- | --- |
| answered_at | string | The time the question was answered. |
| question_id | string | The ID of the specific survey question. |
| question_text | string | The text of the question |
| response | string | The raw response from the user |


## Data Connector Execution notification object

The Data Connector Execution notification object is sent via the `data_connector.execution.completed` topic when a Data Connector action finishes executing. This webhook provides operational visibility into connector execution outcomes without exposing sensitive request/response data. You can see an example object below:

```json
{
  "type": "notification_event",
  "topic": "data_connector.execution.completed",
  "id": "notif_78c122d0-23ba-11e4-9464-79b01267cc2e",
  "app_id": "a86dr8yl",
  "created_at": 1726425600,
  "delivery_attempts": 1,
  "first_sent_at": 1726425600,
  "data": {
    "type": "notification_event_data",
    "item": {
      "type": "data_connector.execution",
      "id": "987654321",
      "app_id": "a86dr8yl",
      "action_id": "123456789",
      "action_name": "Create Ticket in System X",
      "success": false,
      "http_status": 400,
      "error_type": "request_configuration_error",
      "execution_time_ms": 312,
      "completed_at": "2025-09-16T01:10:18.536Z",
      "source_type": "workflow",
      "source_id": "456789012",
      "conversation_id": "41084211973",
      "user_id": "6318db7dfb80c614fe1792b5",
      "admin_id": "1"
    }
  }
}
```

The `data.item` object contains the execution details with the following fields:

### Execution Metadata

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is always 'data_connector.execution' |
| id | string | Unique execution ID for deduplication and reference |
| app_id | string | Your workspace ID |
| action_id | string | The Data Connector action that was executed |
| action_name | string | Human-readable name of the action (e.g., "Create Support Ticket") |


### Execution Results

| Attribute | Type | Description |
|  --- | --- | --- |
| success | boolean | `true` if the action completed successfully, `false` otherwise |
| http_status | integer | HTTP status code from the external API (0 if unknown or not applicable) |
| error_type | string or null | Categorized error type when `success` is `false`, `null` on success. See table below. |


### Timing Information

| Attribute | Type | Description |
|  --- | --- | --- |
| execution_time_ms | integer or null | Total execution time in milliseconds from invocation to completion |
| completed_at | string | ISO-8601 timestamp of when the execution completed |


### Execution Context

| Attribute | Type | Description |
|  --- | --- | --- |
| source_type | string | What triggered this action. See source types table below. |
| source_id | string or null | ID of the specific trigger (workflow ID, answer ID, etc.) |
| conversation_id | string or null | Related conversation ID if applicable |
| user_id | string or null | End user who triggered this if applicable |
| admin_id | string or null | Admin or teammate who triggered this if applicable |


### Error Types

When `success` is `false`, the `error_type` field categorizes what went wrong:

| Error Type | Description |
|  --- | --- |
| `request_configuration_error` | Problem with action configuration (bad URL, missing required fields, etc.) |
| `faraday_error` | Network-level error (timeout, connection refused, DNS failure) |
| `third_party_error` | External API returned an error response (4xx/5xx status) |
| `response_mapping_error` | External API response couldn't be parsed/mapped to expected format |
| `token_refresh_error` | OAuth token refresh failed for authenticated connectors |
| `fin_action_response_formatting_error` | Response format issues specific to Fin AI Agent actions |
| `fin_action_identity_verification_error` | Identity verification failed for Fin actions |
| `non_fin_standalone_action_identity_verification_error` | Identity verification failed for standalone (non-Fin) actions |
| `email_verification_error` | Email verification failed during action execution |


### Source Types

The `source_type` field indicates what triggered the Data Connector execution:

| Source Type | Description |
|  --- | --- |
| `workflow` | Triggered by a Workflow automation |
| `custom_bot` | Triggered by a Custom Bot (includes all bot variants) |
| `answer` | Triggered by Fin AI Agent using a Custom Answer |
| `inbox` | Triggered manually from the inbox by a teammate |
| `other` | Triggered by other sources (saved replies, etc.) |


## Procedure HITL notification object

The Procedure HITL notification object is sent via the `procedure.hitl_notification.created` topic when a Fin Procedure reaches a Human in the Loop (HITL) step with the API channel enabled. The webhook delivers conversation context, the question to be answered, the attributes that need to be collected, and a callback URL for submitting the response. You can see an example object below:

```json
{
  "type": "notification_event",
  "topic": "procedure.hitl_notification.created",
  "id": "notif_a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "app_id": "a86dr8yl",
  "created_at": 1700000000,
  "delivery_attempts": 1,
  "first_sent_at": 1700000000,
  "data": {
    "type": "notification_event_data",
    "item": {
      "type": "procedure.hitl_notification",
      "app_id": "a86dr8yl",
      "conversation_id": "215473853299345",
      "step_id": "d5b81f72-adb9-4317-b973-75b3c3624c09",
      "procedure_name": "Refund Request",
      "hitl_question": "Should we approve the refund for this customer?",
      "attributes_to_collect": [
        {
          "type": "data_attribute",
          "identifier": "workflow_local_variables.72c5a6b3-3cce-41d8-8e30-14da40791958",
          "name": "Approve Refund",
          "label": "Approve Refund",
          "data_type": "boolean"
        },
        {
          "type": "data_attribute",
          "identifier": "workflow_local_variables.5adb55fb-f549-44a0-8ee9-7e652ad77c25",
          "name": "Refund Reason",
          "label": "Refund Reason",
          "data_type": "list",
          "options": [
            {
              "id": "85f00ba7-558c-4b02-a397-6f5c3659941c",
              "label": "Defective Product"
            },
            {
              "id": "a3e2f1c4-7890-4b5d-9e6f-0123456789ab",
              "label": "Changed Mind"
            }
          ]
        }
      ],
      "callback_url": "https://api.intercom.io/procedures/215473853299345/collect_agent_input",
      "expires_at": 1700086400,
      "priority": "priority",
      "assign_to": {
        "type": "team",
        "id": "814865",
        "name": "Customer Support"
      },
      "conversation_url": "https://app.intercom.com/a/inbox/a86dr8yl/inbox/shared/all/conversation/215473853299345",
      "recent_messages": [
        {
          "type": "conversation_part",
          "id": "98765",
          "part_type": "comment",
          "body": "<p>Hi, I'd like a refund for my recent order #12345.</p>",
          "created_at": 1699999800,
          "author": {
            "type": "user",
            "id": "6318db7dfb80c614fe1792b5",
            "name": "Jane Doe",
            "email": "jane@example.com"
          }
        },
        {
          "type": "conversation_part",
          "id": "98766",
          "part_type": "comment",
          "body": "<p>I can help with that. Let me check your order details and get approval for the refund.</p>",
          "created_at": 1699999900,
          "author": {
            "type": "bot",
            "id": "814866",
            "name": "Fin",
            "email": null
          }
        }
      ]
    }
  }
}
```

The `data.item` object contains the HITL notification details with the following fields:

### Payload fields

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is always `procedure.hitl_notification` |
| app_id | string | Your workspace ID |
| conversation_id | string | The ID of the conversation where the HITL step was triggered |
| step_id | string | Unique identifier for this HITL step instance. Must be passed back in the callback request |
| procedure_name | string | Human-readable name of the procedure (e.g., "Refund Request") |
| hitl_question | string | The question or context presented to the human reviewer |
| attributes_to_collect | array | Array of attribute definitions that must be collected. See attribute definition fields below |
| callback_url | string | The URL to POST collected attribute values to. See the callback endpoint documentation |
| expires_at | integer or null | Unix timestamp (seconds) when this HITL request expires. `null` if no timeout is configured |
| priority | string | Either `"priority"` or `"not_priority"` |
| assign_to | object or null | The team or admin this request is assigned to. `null` if unassigned. See assign to fields below |
| conversation_url | string | Direct link to the conversation in the Intercom inbox |
| recent_messages | array | The last 5 non-internal conversation parts for context. See recent message fields below |


### Attribute definition fields

Each object in the `attributes_to_collect` array describes an attribute that must be collected from the reviewer:

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is always `data_attribute` |
| identifier | string | The full identifier for this attribute. Must be passed back exactly in the callback request |
| name | string | Human-readable name of the attribute |
| label | string | Display label for the attribute |
| data_type | string | The data type expected for this attribute's value. See data types below |
| options | array or null | For `list` type attributes only. Array of valid option objects with `id` and `label` fields |


### Recent message fields

Each object in the `recent_messages` array represents a conversation part:

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is always `conversation_part` |
| id | string | The conversation part ID |
| part_type | string | The type of conversation part (e.g., `comment`, `note`, `assignment`) |
| body | string | The HTML body of the conversation part |
| created_at | integer | Unix timestamp (seconds) when the part was created |
| author | object | The author of the conversation part. See author fields below |


### Author fields

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | One of `user`, `admin`, `bot`, or `team` |
| id | string | The author's ID |
| name | string or null | The author's name |
| email | string or null | The author's email address |


### Assign to fields

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Either `admin` or `team` |
| id | string | The ID of the assigned admin or team |
| name | string | The name of the assigned admin or team |


### Data types

The `data_type` field on attribute definitions indicates what type of value should be submitted in the callback:

| Data type | Expected value format |
|  --- | --- |
| `string` | A text string |
| `integer` | A whole number |
| `decimal` | A decimal number |
| `boolean` | `true` or `false` |
| `list` | The `id` of a valid option from the attribute's `options` array |
| `datetime` | An ISO 8601 datetime string (e.g., `2024-01-15T09:30:00Z`) or Unix timestamp |


### Lifecycle notes

- **Expiration**: If `expires_at` is set and the current time exceeds that timestamp, the callback endpoint will return a `404` error. The procedure will follow its configured timeout escalation path.
- **Concurrent channels**: HITL requests may be sent to multiple channels simultaneously (API, Slack, Inbox). The first response wins — subsequent responses to the same `step_id` will receive a `409 Conflict` response.
- **Authentication**: Inbound webhook notifications are signed with HMAC using your app's `client_secret` via the `X-Hub-Signature` header. The callback URL requires an OAuth bearer token with `write_conversations` scope.


## Audience notification object

The Audience notification object is sent via the `audience.created` and `audience.updated` topics. It is similar to the [model returned via the API](/docs/references/preview/rest-api/api.intercom.io/audiences/audience). You can see an example object below:

```json
{
  "type": "notification_event",
  "topic": "audience.created",
  "id": "notif_a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "app_id": "a86dr8yl",
  "created_at": 1717200000,
  "delivery_attempts": 1,
  "first_sent_at": 1717200000,
  "data": {
    "type": "notification_event_data",
    "item": {
      "type": "audience",
      "id": "123",
      "name": "VIP Customers",
      "predicates": [
        {
          "attribute": "company.name",
          "type": "string",
          "comparison": "contains",
          "value": "Acme"
        }
      ],
      "role_predicates": [
        {
          "attribute": "role",
          "type": "role",
          "comparison": "eq",
          "value": "user"
        }
      ],
      "created_at": 1717200000,
      "updated_at": 1717200000
    }
  }
}
```

The `data.item` object contains the audience with the following fields:

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is always `audience`. |
| id | string | The unique identifier representing the audience. |
| name | string | The name of the audience. |
| predicates | array | The predicates that define which contacts belong to the audience. |
| role_predicates | array | Role-based predicates that further filter membership by contact role. |
| created_at | integer | The time the audience was created, as a Unix timestamp. |
| updated_at | integer | The time the audience was last updated, as a Unix timestamp. |


The `audience.deleted` topic sends a minimal identification payload — only `type`, `id`, and `deleted` — as noted in the deletion-topics callout at the top of this page:

```json
{
  "type": "audience",
  "id": "123",
  "deleted": true
}
```

## Audience membership notification object

The Audience membership notification object is sent via the `audience.member_added` and `audience.member_removed` topics. It describes a piece of content — for example an article or content snippet — being added to or removed from an audience. The member is the content entity referenced by the `content` object, not a contact. You can see an example object below:

```json
{
  "type": "notification_event",
  "topic": "audience.member_added",
  "id": "notif_b2c3d4e5-6789-01ab-cdef-2345678901bc",
  "app_id": "a86dr8yl",
  "created_at": 1717200000,
  "delivery_attempts": 1,
  "first_sent_at": 1717200000,
  "data": {
    "type": "notification_event_data",
    "item": {
      "type": "audience_membership",
      "audience_id": "123",
      "content": {
        "type": "article_content",
        "id": "456"
      }
    }
  }
}
```

The `data.item` object contains the membership with the following fields:

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is always `audience_membership`. |
| audience_id | string | The unique identifier of the audience the content was added to or removed from. |
| content | object | The content entity that is the member of the audience. Contains `type` and `id`. |
| content.type | string | The type name of the content entity, for example `article_content` or `content_snippet`. |
| content.id | string | The unique identifier of the content entity. |


## Content import source notification object

The Content import source notification object is sent via the `content_import_source.created` and `content_import_source.updated` topics. It is similar to the [model returned via the API](/docs/references/preview/rest-api/api.intercom.io/ai-content/getcontentimportsource). You can see an example object below:

```json
{
  "type": "notification_event",
  "topic": "content_import_source.created",
  "id": "notif_a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "app_id": "a86dr8yl",
  "created_at": 1734537259,
  "delivery_attempts": 1,
  "first_sent_at": 1734537259,
  "data": {
    "type": "notification_event_data",
    "item": {
      "type": "content_import_source",
      "id": 33,
      "last_synced_at": 1734537259,
      "status": "active",
      "url": "https://support.example.com/us/1",
      "sync_behavior": "automatic",
      "created_at": 1734537259,
      "updated_at": 1734537259,
      "audience_ids": [5678]
    }
  }
}
```

The `data.item` object contains the content import source with the following fields:

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is always `content_import_source`. |
| id | integer | The unique identifier representing the content import source. |
| last_synced_at | integer | The time the source was last synced, as a Unix timestamp. |
| status | string | The status of the source: `active` or `deactivated`. |
| url | string | The URL of the root of the external source. |
| sync_behavior | string | How the source is synced: `api`, `automatic`, or `manual`. |
| created_at | integer | The time the source was created, as a Unix timestamp. |
| updated_at | integer | The time the source was last updated, as a Unix timestamp. |
| audience_ids | array | The unique identifiers of the audiences associated with the source. |


The `content_import_source.deleted` topic sends a minimal identification payload — only `type`, `id`, and `deleted` — as noted in the deletion-topics callout at the top of this page:

```json
{
  "type": "content_import_source",
  "id": 33,
  "deleted": true
}
```