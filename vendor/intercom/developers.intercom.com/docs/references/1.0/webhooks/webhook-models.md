# Webhook Topics

You may subscribe to the following topics. The 'Item Type' column shows the schema related to the API type that will be sent as the payload of the notification.

Deletion topics send minimal payloads
The `*.deleted` webhook topics send a **minimal identification payload** containing only identifying fields — not the full resource object.

| Topic | Item Type | Description |
|  --- | --- | --- |
| conversation.user.created | Conversation | Subscribe to user and lead initiated messages |
| conversation.user.replied | Conversation | Subscribe to user conversation replies |
| conversation.admin.replied | Conversation | Subscribe to admin conversation replies |
| conversation.admin.single.created | Conversation | Subscribe to admin initiated 1:1 conversation |
| conversation.admin.assigned | Conversation | Subscribe to admin conversation assignments |
| conversation.admin.noted | Conversation | Subscribe to admin conversation notes |
| conversation.admin.closed | Conversation | Subscribe to admin conversation closes |
| conversation.admin.opened | Conversation | Subscribe to admin conversation opens |
| conversation.admin.snoozed | Conversation | Subscribe to when an admin snoozes a conversation |
| conversation.admin.unsnoozed | Conversation | Subscribe to when an admin unsnoozes a conversation |
| conversation_part.tag.created | Conversation | Subscribe to conversation parts being tagged |
| conversation.deleted | Conversation | Subscribe to when a conversation is deleted |
| user.created | User | Subscribe to user creations |
| user.deleted | User | Subscribe to users being archived. Not sent for bulk archiving. |
| user.unsubscribed | User | Subscribe to user unsubscriptions from email |
| user.unsubscribed_from_sms | User | Subscribe to user unsubscriptions from SMS |
| user.email.updated | User | Subscribe to user's email address being updated |
| user.tag.created | UserTag | Subscribe to users being tagged. Not sent for bulk tagging. |
| user.tag.deleted | UserTag | Subscribe to users being untagged |
| contact.created | Lead | Subscribe to Lead creations |
| contact.signed_up | Lead | Subscribe to Leads converting to a User |
| contact.added_email | Lead | Subscribe to Leads adding email |
| contact.updated | Lead | Subscribe to Leads being updated |
| contact.deleted | Lead | Subscribe to Leads being deleted |
| visitor.signed_up | Visitor | Subscribe to visitors converting to a User |
| company.created | Company | Subscribe to company creations |
| event.created | Event | Subscribe to events |
| ping | Ping | Sent when a post to the Subscription's ping resource is received, or periodically by Intercom. Ping is always subscribed to. |


## User Tag Object

The `user_tag` object is specific to webhooks. Bulk user tagging operations do not trigger webhooks and only single user tag operations will result in a webhook being sent.

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

A user tag is composed from the existing user and tag JSON and is sent when users are tagged and untagged via the `user.tag.created` and `user.tag.deleted` topics -

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'user_tag'* |
| created_at | timestamp | The time the user tag object was created |
| tag | Tag | The tag that was added or removed. |
| user | User | The user that was tagged or untagged. |