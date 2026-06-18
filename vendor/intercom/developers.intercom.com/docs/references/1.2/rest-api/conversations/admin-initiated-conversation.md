# Admin Initiated Conversation

## Email From Admin

```curl
$ curl https://api.intercom.io/messages \\\n-XPOST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d'\n{\n  \"message_type\": \"email\",\n  \"subject\": \"Hey\",\n  \"body\": \"Ponies, cute small horses or something more sinister?\",\n  \"template\": \"plain\",\n  \"from\": {\n    \"type\": \"admin\",\n    \"id\": \"394051\"\n  },\n  \"to\": {\n    \"type\": \"user\",\n    \"id\": \"536e564f316c83104c000020\"\n  }\n}'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"admin_message\",\n  \"id\": \"2001\",\n  \"created_at\": 1401916877,\n  \"message_type\": \"email\",\n  \"subject\" : \"Hey\",\n  \"body\" : \"Ponies, cute small horses or something more sinister?\",\n  \"template\": \"plain\",\n  \"owner\": {\n    \"email\": \"email@example.com\",\n    \"id\": \"394051\",\n    \"name\": \"Wash\",\n    \"type\": \"admin\"\n  }\n}
```

```ruby
intercom.messages.create(\n  :message_type => 'email',\n  :subject  => 'This Land',\n  :body     => \"Har har har! Mine is an evil laugh!\",\n  :template => \"plain\", # or \"personal\",\n  :from => {\n    :type => \"admin\",\n    :id   => \"394051\"\n  },\n  :to => {\n    :type => \"user\",\n    :id => \"536e564f316c83104c000020\"\n  }\n)
```

```php
<?php\n$intercom->messages->create([\n    \"message_type\" => \"email\",\n    \"subject\" => \"Plato Quote\",\n    \"body\" => \"And what, Socrates, is the food of the soul?\",\n    \"from\" => [\n        \"type\" => \"admin\",\n        \"id\" => \"814860\"\n    ],\n    \"to\" => [\n        \"type\" => \"user\",\n        \"email\" => \"socrates@email.com\"\n    ]\n]);\n?>
```

```java
User user = new User()\n  .setId(\"5310d8e8598c9a0b24000005\");\nAdmin admin = new Admin()\n  .setId(\"394051\");\nAdminMessage adminMessage = new AdminMessage()\n  .setAdmin(admin)\n  .setUser(user)\n  .setSubject(\"This Land\")\n  .setBody(\"Har har har! Mine is an evil laugh!\")\n  .setMessageType(\"email\")\n  .setTemplate(\"plain\"); // or personal\nConversation.create(adminMessage);
```

You can create a [new admin initiated message](https://docs.intercom.io/faqs/how-does-intercom-deliver-push-email-and-inapp-notifications#for-admins) by submitting a `POST` to `https://api.intercom.io/messages` along with JSON message.

An admin initiated message can be delivered to a user as an In-App conversation or as an Email. The `message_type` field is used to determine which, with a value of either `inapp` or `email`. For admin initiated In-App messages, they will not trigger push notifications.

Receiving Users are identified by a `user_id`, `id`, or `email` field in the `to` object.

Receiving Contacts are identified by a `user_id` or `id` field in the `to` object.

The `type` field for the `to` object is then set to either `contact` or `user`.

The `subject` field is only used for `email` type messages and will not be used for `inapp` message types.

A sending admin must be added using the `from` field, along with a `type` field value of `admin` and the corresponding Intercom `id` for that admin. The admin's Intercom `id` value may be obtained from the [List Admins](/docs/references/1.2/rest-api/admins/list-admins) resource.

Conversation V Message
Note that since creating an admin-initiated conversation hits the `/messages` endpoint, the response contains a message object rather than a conversation object. As a result you will not see the conversation ID in the returned message object. You may, however, retrieve the customers's conversations and iterate over them looking for the message_id value.

### Attributes

| Attribute | Type | Description |
|  --- | --- | --- |
| message_type | string | The kind of message being created. Values: `inapp` or `email` |
| subject | string | Optional unless message_type is email. The title of the email. |
| body | string | The content of the message. HTML or plaintext. |
| template | string | The style of the outgoing message. Only valid for email messages. Possible values `plain` or `personal`. |
| from | object | Required. An admin object containing the admin's `id`. The `type` field must have a value of `admin`. |
| to | object | Required. A user object containing the user's `id`, `email` or `user_id`. The `type` field must have a value of `user` or of `contact`. |


### Returns

The created message object.

If the `from` type was supplied with an admin's details, the `owner` field in the response will represent the admin in question.