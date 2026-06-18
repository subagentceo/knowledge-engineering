# Webhook Topics

The following topics are available and you can be notified when an action relating to that topic occurs. You just need to tell us where to send the notification. The 'Item Type' column shows the API type that will be sent as the data of the notification.

Deletion topics send minimal payloads
The `*.deleted` webhook topics send a **minimal identification payload** containing only identifying fields — not the full resource object.

| Topic | Item Type | Description |
|  --- | --- | --- |
| conversation.user.created | Conversation | Subscribe to user/lead initiated conversations |
| conversation.user.replied | Conversation | Subscribe to contact user/lead  conversation replies |
| conversation.admin.replied | Conversation | Subscribe to admin conversation replies |
| conversation.admin.single.created | Conversation | Subscribe to admin initiated 1:1 conversations |
| conversation.admin.assigned | Conversation | Subscribe to admin conversation assignments |
| conversation.admin.noted | Conversation | Subscribe to admin conversation notes |
| conversation.admin.closed | Conversation | Subscribe to admin conversation closes |
| conversation.admin.opened | Conversation | Subscribe to admin conversation opens |
| conversation.admin.snoozed | Conversation | Subscribe to admin conversation snoozes |
| conversation.admin.unsnoozed | Conversation | Subscribe to admin conversation unsnoozes |
| conversation_part.tag.created | Conversation | Subscribe to conversation parts being tagged |
| conversation.deleted | Conversation | Subscribe to conversation deleted |
| user.created | User | Subscribe to user creations |
| user.deleted | User | Subscribe to user deletions |
| user.unsubscribed | User | Subscribe to user unsubscriptions from email |
| user.email.updated | User | Subscribe to user email address being updated |
| user.tag.created | UserTag | Subscribe to users being tagged |
| user.tag.deleted | UserTag | Subscribe to users being untagged |
| contact.created | Lead | Subscribe to lead creations |
| contact.signed_up | Lead | Subscribe to leads converting to users |
| contact.added_email | Lead | Subscribe to emails being added to leads |
| contact.tag.created | ContactTag | Subscribe to leads being tagged |
| contact.tag.deleted | ContactTag | Subscribe to leads being untagged |
| visitor.signed_up | Visitor | Subscribe to visitors converting to users |
| company.created | Company | Subscribe to company creations |
| event.created | Event | Subscribe to events |
| ping | Ping | Sent when a post to the subscription's ping resource is received, or periodically by Intercom. Ping is always subscribed to. |


## Webhooks and Permissions

Each webhook topic is associated with one or more permission scopes. If you would like to setup a webhook for a particular topic then you will need to select the appropriate permission scope to be able to request a notification for that topic.

Multiple permissions
Some topic are associated with multiple permissions. In these cases you don't need to select all of these permissions to subscribe to that topic.

| Webhook topic | Works with permissions | Groups |
|  --- | --- | --- |
| conversation_part.tag.created | Read conversations | Conversation data |
| conversation.admin.assigned | Read conversations | Conversation data |
| conversation.admin.closed | Read conversations | Conversation data |
| conversation.admin.noted | Read conversations | Conversation data |
| conversation.admin.opened | Read conversations | Conversation data |
| conversation.admin.replied | Read conversations | Conversation data |
| conversation.admin.single.  created | Read conversations | Conversation data |
| conversation.admin.snoozed | Read conversations | Conversation data |
| conversation.admin.unsnoozed | Read conversations | Conversation data |
| conversation.user.created | Read conversations | Conversation data |
| conversation.user.replied | Read conversations | Conversation data |
| conversation.deleted | Read conversations | Conversation data |
| contact.added_email | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| contact.created | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| contact.signed_up | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| contact.tag.created | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| contact.tag.deleted | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| user.created | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| user.deleted | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| user.email.updated | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| user.tag.created | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| user.tag.deleted | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| user.unsubscribed | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| visitor.signed_up | Read users and companies, Read and write users,  Read one user and one company | Customer data |
| event.created | Read events | Customer event data |
| company.created | Read users and companies, Read one user and one company | Company data |


## Webhook Notification Object

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


The contents of `data.item` object will be defined according to its `type` field. In the example to the right, the type value of `company` indicates a company object.

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

## Handling Webhook Notifications

When you setup a subscription you will receive notifications on your chosen topics. How you handle those notifications, i.e. the HTTP status code returned, will determine the subsequent state of that subscription.

| Response Code | Description | Action |
|  --- | --- | --- |
| 2xx | Success | The webhook was successfully delivered. |
| 410 | Gone | When a 410 is received, we assume the resource is no longer available. We will disable the subscription and no more notifications will be sent. |
| 429 | Too many requests | When a 429 is received, all notifications from that subscription will be throttled. Depending on the rate of delivery, this delay can be between 1 minute to 2 hours. If 429s continue and any notification is delayed for > 2 hours then we will drop that notification. |
| 4xx (excl. 429)  5xx | Client or service errors | We will retry after 1 minute for all other errors. If the 2nd retry fails then we mark the notification delivery as failed. |


Timeout
You have 5 seconds to respond to a notification. If you don't send a response within that time, the notification is treated as failed and will be retried only once after 1 minute. If you respond with too many error responses, we drop future notifications for a period of 15 minutes.

## Signed Notifications

Each webhook notification is signed by Intercom via an `X-Hub-Signature` header. We do this so that you can verify the notification came from Intercom by decoding the signature.

The value of this `X-Hub-Signature` header is computed by creating a signature using the body of the JSON request and your app's `client_secret` value, which you can find on the Basic Info page of your app.

The signature is the hexadecimal (40-byte) representation of a SHA-1 signature computed using the HMAC algorithm as defined in [RFC2104](http://tools.ietf.org/html/rfc2104).

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

## Contact Tag Model for Webhooks

The Contact Tag model is only returned for webhooks. It is not used with the Lead (i.e. contact) or Tag endpoints themselves. You can see an example object below:

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
      "user_id": "12"
  }
}
```

A contact tag is composed from the existing contact and tag JSON and is sent when contacts are tagged and untagged via the `contact.tag.created` and `contact.tag.deleted` topics.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'contact_tag'. |
| created_at | timestamp | The time the contact tag object was created. |
| tag | Tag | The tag that was added or removed. |
| contact | contact | The contact that was tagged or untagged. |


## User Tag Model for Webhooks

The User Tag model is only returned for webhooks. It is not used with the User or Tag endpoints themselves. You can see an example object below:

```json
{
  "type": "user_tag",
  "created_at": 1392731331,
  "tag" : {
      "id": "17513",
      "name": "independent",
      "type": "tag"
    },
  "user" : {
      "type": "user",
      "id": "530370b477ad7120001d",
      "user_id": "25"
  }
}
```

A user tag is composed from the existing user and tag JSON and is sent when users are tagged and untagged via the `user.tag.created` and `user.tag.deleted` topics.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'user_tag'. |
| created_at | timestamp | The time the user tag object was created. |
| tag | Tag | The tag that was added or removed. |
| user | User | The user that was tagged or untagged. |