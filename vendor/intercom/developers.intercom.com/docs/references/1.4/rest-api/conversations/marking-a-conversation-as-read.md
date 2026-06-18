# Marking a Conversation as Read

You can mark a conversation within Intercom as read.

## Mark a Conversation as Read

```curl
$ curl https://api.intercom.io/conversations/147 \\\n-X PUT \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' \\\n-H 'Content-Type:application/json' -d'\n{\n  \"read\": true\n}'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"conversation\",\n  \"id\": \"147\",\n  \"created_at\": 1400850973,\n  \"updated_at\": 1400857494,\n  \"read\": true\n  # ...\n}\n\n# NB: Full Conversation Object returned
```

```ruby
conversation.read = true\nintercom.conversations.save(conversation)
```

```php
<?php\n$intercom->conversations->markConversationAsRead(\"10957850396\");\n?>
```

```java
Admin admin = new Admin().setId(\"1\");\nAdminReply adminReply = new AdminReply(admin);\nadminReply.setMessageType(\"close\");\nConversation.reply(\"66\", adminReply);
```