# Admin Initiated Conversation

## Email From Admin

```curl
$ curl https://api.intercom.io/messages \
-XPOST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d'
{
  "message_type": "email",
  "subject": "Hey",
  "body": "Ponies, cute small horses or something more sinister?",
  "template": "plain",
  "from": {
    "type": "admin",
    "id": "394051"
  },
  "to": {
    "type": "user",
    "id": "536e564f316c83104c000020"
  }
}'
```

```curl
HTTP/1.1 200 OK

{
  "type": "admin_message",
  "id": "2001",
  "created_at": 1401916877,
  "message_type": "email",
  "subject" : "Hey",
  "body" : "Ponies, cute small horses or something more sinister?",
  "template": "plain",
  "owner": {
    "email": "email@example.com",
    "id": "394051",
    "name": "Wash",
    "type": "admin"
  }
}
```

```ruby
intercom.messages.create(
  :message_type => 'email',
  :subject  => 'This Land',
  :body     => "Har har har! Mine is an evil laugh!",
  :template => "plain", # or "personal",
  :from => {
    :type => "admin",
    :id   => "394051"
  },
  :to => {
    :type => "user",
    :id => "536e564f316c83104c000020"
  }
)
```

```php
<?php
$intercom->messages->create([
    "message_type" => "email",
    "subject" => "Plato Quote",
    "body" => "And what, Socrates, is the food of the soul?",
    "from" => [
        "type" => "admin",
        "id" => "814860"
    ],
    "to" => [
        "type" => "user",
        "email" => "socrates@email.com"
    ]
]);
?>
```

```java
User user = new User()
  .setId("5310d8e8598c9a0b24000005");
Admin admin = new Admin()
  .setId("394051");
AdminMessage adminMessage = new AdminMessage()
  .setAdmin(admin)
  .setUser(user)
  .setSubject("This Land")
  .setBody("Har har har! Mine is an evil laugh!")
  .setMessageType("email")
  .setTemplate("plain"); // or personal
Conversation.create(adminMessage);
```

You can create a [new admin initiated message](https://docs.intercom.io/faqs/how-does-intercom-deliver-push-email-and-inapp-notifications#for-admins) by submitting a `POST` to `https://api.intercom.io/messages` along with JSON message.

An admin initiated message can be delivered to a user as an In-App conversation or as an Email. The `message_type` field is used to determine which, with a value of either `inapp` or `email`. For admin initiated In-App messages, they will not trigger push notifications.

Receiving Users are identified by a `user_id`, `id`, or `email` field in the `to` object.

Receiving Contacts are identified by a `user_id` or `id` field in the `to` object.

The `type` field for the `to` object is then set to either `contact` or `user`.

The `subject` field is only used for `email` type messages and will not be used for `inapp` message types.

A sending admin must be added using the `from` field, along with a `type` field value of `admin` and the corresponding Intercom `id` for that admin. The admin's Intercom `id` value may be obtained from the [List Admins](/docs/references/1.0/rest-api/admins/list-admins) resource.

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