# Webhook Topics

You can subscribe to the following Webhook topics, and you will receive notifications on your endpoint URL when an event occurs. The 'Object' column shows the [Intercom object](/docs/references/2.5/rest-api/common-structures/object-model) related to the event sent as part of the notification.

Each Webhook topic is associated with one or more permissions. When you set up a subscription to a particular topic, you will need to select the appropriate permissions to be able to receive a notification for that topic.

Multiple permissions
Some topic are associated with multiple permissions. In these cases you don't need to select all of these permissions to subscribe to that topic.

**Admin topics**

Deletion topics send minimal payloads
The `*.deleted` webhook topics send a **minimal identification payload** containing only identifying fields — not the full resource object.

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| admin.added_to_workspace | Admin | An Admin being added to workspace | Read admins |
| admin.away_mode_updated | Admin | Admin away mode updates | Read admins |
| admin.removed_from_workspace | Admin | An Admin being removed from a workspace | Read admins |


**Article topics**

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| article.created | Article | Article creations | Read and list articles |
| article.updated | Article | Article updates | Read and list articles |
| article.published | Article | Article published | Read and list articles |
| article.unpublished | Article | Article unpublished | Read and list articles |
| article.deleted | Article | Article deletions | Read and list articles |


**Company topics**

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| company.created | Company | Company creations | Read users and companies  Read one user and one company |


**Contact topics**

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| contact.archive | Contact | Contacts archived | Read users and companies  Read and write users  Read one user |
| contact.deleted | Contact | Contacts deleted | Read users and companies  Read one user and one company |
| contact.email.updated | Contact | A Contact email address is updated | Read users and companies  Read and write users  Read one user and one company |
| contact.lead.added_email | Contact | An email address is added to a Contact  (Lead) | Read users and companies  Read and write users  Read one user and one company |
| contact.lead.created | Contact | Contact creations  (Lead) | Read users and companies  Read and write users  Read one user and one company |
| contact.lead.signed_up | Contact | Contacts converting from Leads to Users | Read users and companies  Read and write users  Read one user and one company |
| contact.lead.tag.created | Contact Tag | Contacts being tagged (Lead) | Read users and companies  Read and write users  Read one user and one company |
| contact.lead.tag.deleted | Contact Tag | Contacts being untagged (Lead) | Read users and companies  Read and write users  Read one user and one company |
| contact.lead.updated | Contact | Contacts being updated  (Lead) | Read users and companies  Read and write users  Read one user and one company |
| contact.unsubscribed | Contact | Contacts unsubscribing from email | Read users and companies  Read and write users  Read one user and one company |
| contact.user.created | Contact | Contact creations  (User) | Read users and companies  Read and write users  Read one user and one company |
| contact.user.tag.created | Contact Tag | Contacts being tagged  (User) | Read users and companies  Read and write users  Read one user and one company |
| contact.user.tag.deleted | Contact Tag | Contacts being untagged  (User) | Read users and companies  Read and write users  Read one user and one company |


**Conversation topics**

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| conversation.admin.assigned | Conversation | Admin conversation assignments | Read conversations |
| conversation.admin.closed | Conversation | Admin conversation closed | Read conversations |
| conversation.admin.noted | Conversation | Admin conversation notes | Read conversations |
| conversation.admin.opened | Conversation | Admin conversation opens | Read conversations |
| conversation.admin.replied | Conversation | Admin conversation replies | Read conversations |
| conversation.admin.single.created | Conversation | Admin initiated 1:1 conversations | Read conversations |
| conversation.admin.snoozed | Conversation | Admin conversation snoozes | Read conversations |
| conversation.admin.unsnoozed | Conversation | Admin conversation unsnoozes | Read conversations |
| conversation.deleted | Conversation | Conversation deleted | Read conversations |
| conversation_part.redacted | Conversation Part | Conversation parts being deleted | Read conversations |
| conversation_part.tag.created | Conversation Part | Conversation parts being tagged | Read conversations |
| conversation.priority.updated | Conversation | Conversation priority updated | Read conversations |
| conversation.rating.added | Conversation | Conversations getting a rating | Read conversations |
| conversation.user.created | Conversation | Contact initiated conversations  (User and Lead) | Read conversations |
| conversation.user.replied | Conversation | Contact conversation replies  (Visitor, Lead and User) | Read conversations |


**Event topics**

| Topic | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| event.created | Event | Events created | Read events |


**Subscription topics**

| Topics | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| granular.unsubscribe | Subscription | A User unsubscribes from a message subscription type | Read and list users and companies  Read and write users  Read one user and one company |


**Visitor topics**

| Topics | Object | Event description | Permissions |
|  --- | --- | --- | --- |
| visitor.signed_up | Visitor | Contacts converting from Visitors to Users | Read users and companies  Read and write users  Read one user and one company |


**Ping**

|  |  |  |
|  --- | --- | --- |
| ping | Ping | Sent when a post to the subscription's ping resource is received or periodically by Intercom. Ping is always subscribed to. |


## Webhook notification object

A notification object contains the following fields:

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


The contents of `data.item` object will be defined according to its `type` field. In the example to the right, the type value of `Company` indicates a company object.

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

## Handling Webhook notifications

You will receive notifications on your chosen topics when you set up a subscription. How you handle those notifications, i.e. the HTTP status code returned, will determine the subsequent state of that subscription.

Timeout
You have 5 seconds to respond to a notification. If you don't send a response within that time, the notification is treated as failed and will be retried only once after 1 minute. If you respond with too many error responses, we drop future notifications for a period of 15 minutes.

| Response Code | Description | Action |
|  --- | --- | --- |
| 2xx | Success | The webhook was successfully delivered. |
| 410 | Gone | When a 410 is received, we assume the resource is no longer available. We will disable the subscription and no more notifications will be sent. |
| 429 | Too many requests | When a 429 is received, all notifications from that subscription will be throttled. Depending on the rate of delivery, this delay can be between 1 minute to 2 hours. If 429s continue and any notification is delayed for > 2 hours then we will drop that notification. |
| 4xx (excl. 429)  5xx | Client or service errors | We will retry after 1 minute for all other errors. If the 2nd retry fails then we mark the notification delivery as failed. |


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

## Admin object for Webhooks

The Admin object is similar to the model returned via the API. You can see an example object below:

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

## Contact Tag object for Webhooks

We only return the Contact Tag object for Webhooks. You can see an example object below:

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

A contact tag is composed from the existing contact and tag JSON and is sent when contacts are tagged and untagged via the `contact.user.tag.created`, `contact.lead.tag.created`, `contact.lead.tag.deleted` and `contact.user.tag.deleted` topics.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'contact_tag'. |
| created_at | timestamp | The time the contact tag object was created. |
| tag | Tag | The tag that was added or removed. |
| contact | contact | The contact that was tagged or untagged. |