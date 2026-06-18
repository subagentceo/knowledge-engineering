# User or Lead Initiated Conversation

## User Initiated Message

```curl
$ curl https://api.intercom.io/messages \\\n-XPOST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d'\n{\n  \"from\": {\n    \"type\": \"user\",\n    \"id\": \"536e564f316c83104c000020\"\n  },\n  \"body\": \"Hey\"\n}'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"user_message\",\n  \"id\": \"2001\",\n  \"created_at\": 1401917202,\n  \"body\" : \"Hey, is the new thing in stock?\",\n  \"message_type\": \"inapp\"\n}
```

```ruby
intercom.messages.create(\n  :from => {\n    :type => \"user\",\n    :id => \"536e564f316c83104c000020\"\n  },\n  :body => \"Hey\"\n)
```

```php
<?php\n$intercom->messages->create([\n    \"message_type\" => \"inapp\",\n    \"body\" => \"Surely, I said, knowledge is the food of the soul\",\n    \"from\" => [\n        \"type\" => \"user\",\n        \"id\" => \"5989303470da497b1babb9ef\"\n    ]\n]);\n?>
```

```java
UserMessage userMessage = new UserMessage()\n  .setBody(\"Hey! Is there, is there a reward?\")\n  .setUser(user);\nConversation.create(userMessage);
```

You can create a new user or lead initiated message by submitting a `POST` to `https://api.intercom.io/messages` along with a JSON message.

The sending user or lead is identified by their `user_id`, `email` or `id` values in the `from` field, along with a `type` field value of `user` or `contact`.

You can also send a message from a visitor by specifying their `user_id` or `id` value in the `from` field, along with a `type` field value of `contact`. This visitor will be automatically converted to a lead once the message is sent.

The `message_type` for a user initiated message is always treated as a `inapp` and will appear as a conversation inside Intercom. The `email` message type is not currently supported for a user initiated message.

User initiated messages can not be sent to specific admins, and as such, do not use the `to` field.

### Attributes

| Attribute | Type | Description |
|  --- | --- | --- |
| body | string | The content of the message. Plaintext only, HTML is not supported. |
| from | object | A user or lead object containing the user's `id` or `user_id` (or `email if lead`). The `type` field must have a value of `user` or `contact`. |


### Returns

The created message object.