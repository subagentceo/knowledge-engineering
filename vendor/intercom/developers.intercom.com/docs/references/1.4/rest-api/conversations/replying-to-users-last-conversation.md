# Replying to Users Last Conversation

Instead of specifying a conversation id when replying, you can also reply to the most recent conversation for a user at [https://api.intercom.io/conversations/last/reply](https://api.intercom.io/conversations/last/reply):

## Replying to the Users Most Recent Conversation

```curl
# Send a reply from admin 1234 to a user's last conversation
$ curl https://api.intercom.io/conversations/last/reply \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d'
{
  "intercom_user_id": "536e564f316c83104c000020",
  "body": "Let me know if you have any more questions!",
  "type": "admin",
  "admin_id": "1234",
  "message_type": "comment"
}'
```

```php
<?php

$intercom->conversations->replyToLastConversation([
    "intercom_user_id" => "5977303470ab497b1babb9ef",
    "body" => "I am the wisest man alive, for I know one thing, and that is that I know nothing.",
    "type" => "user",
    "message_type" => "comment"
]);
?>
```