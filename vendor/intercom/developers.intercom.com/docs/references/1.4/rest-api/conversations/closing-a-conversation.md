# Closing or reopening a conversation

You can close or reopen a conversation with or without a reply, via a `POST` method to `https://api.intercom.io/conversations/{convo_id}/reply/`, which accepts a JSON object identifying whether you want to close or reopen.

| Argument | Required | Description |
|  --- | --- | --- |
| type | yes | Must be `admin` |
| message_type | yes | Must be `open` or `close` |
| admin_id | yes | ID of the admin the close or open will be attributed to |


**Closing a Conversation Without Reply**

```curl
curl https://api.intercom.io/conversations/xxx/reply
-X POST
-H 'Authorization:Bearer <Your access token>'
-H 'Accept:application/json'
-H 'Content-Type:application/json'
-d '{ "admin_id": CLOSING_ADMIN_ID, "message_type": "close", "type": "admin"}'
```

```php
<?php

$intercom->conversations->replyToConversation("10957850396", [
    "type" => "admin",
    "admin_id" => "814860",
    "message_type" => "close"
]);
?>
```

## Closing a Conversation With Reply

```curl
curl https://api.intercom.io/conversations/xxx/reply
-X POST
-H 'Authorization:Bearer <Your access token>'
-H 'Accept:application/json'
-H 'Content-Type:application/json'
-d '{ "body":"closing this convo", "admin_id": CLOSING_ADMIN_ID, "message_type": "close", "type": "admin"}'
```

```php
<?php

$convo = $intercom->conversations->replyToConversation("10957850396", [
    "body" => "The beginning is the most important part of the work, but this is the end ... of the conversation!",
    "type" => "admin",
    "admin_id" => "814860",
    "message_type" => "close"
]);
?>
```