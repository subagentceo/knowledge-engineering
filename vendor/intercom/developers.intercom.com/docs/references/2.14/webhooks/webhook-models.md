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


### Call topics

These topics apply to Intercom Phone calls only.

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| call.started | Call | A call has started | Read conversations |
| call.ended | Call | A connected call has ended. Not triggered for calls abandoned during routing. | Read conversations |
| call.transcription_available | Call | A call transcription is available | Read conversations |
| call.recording_available | Call | A call recording is available | Read conversations |


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


### Event topics

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| event.created | Event | Events created | Read events |


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
| ticket.closed | Ticket | Ticket closed | Read tickets |
| ticket.rating.provided | Ticket | Ticket getting a rating | Read tickets |


### Visitor topics

| Topics | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| visitor.signed_up | Visitor | Contacts converting from Visitors to Users | Read users and companiesRead and write usersRead one user and one company |


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

The Admin notification object is similar to the [model returned via the API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Admins/admin/). You can see an example object below:

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