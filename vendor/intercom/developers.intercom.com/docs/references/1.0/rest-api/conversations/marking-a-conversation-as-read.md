# Marking a Conversation as Read

You can mark a conversation within Intercom as read.

## Mark a Conversation as Read

```curl
$ curl https://api.intercom.io/conversations/147 \
-X PUT \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d'
{
  "read": true
}'
```

```curl
HTTP/1.1 200 OK

{
  "type": "conversation",
  "id": "147",
  "created_at": 1400850973,
  "updated_at": 1400857494,
  "read": true
  # ...
}

# NB: Full Conversation Object returned
```

```ruby
conversation.read = true
intercom.conversations.save(conversation)
```

```php
<?php
$intercom->conversations->markConversationAsRead("10957850396");
?>
```

```java
Admin admin = new Admin().setId("1");
AdminReply adminReply = new AdminReply(admin);
adminReply.setMessageType("close");
Conversation.reply("66", adminReply);
```