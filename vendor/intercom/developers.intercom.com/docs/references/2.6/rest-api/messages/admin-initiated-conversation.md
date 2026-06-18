# Create a message

## Example Request & Response

```curl
$ curl https://api.intercom.io/messages \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d

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
}
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

You can create a message that has been initiated by an admin. The conversation can be either an in-app message or an email.

> 🚧 Delay after contact creation
There can be a short delay between when a contact is created and when a contact becomes available to be messaged through the API. A `404 Not Found` error will be returned in this case.


### Request Body Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| message_type | String | Yes | The kind of message being created. Values: `inapp` or `email` |
| subject | String | Yes, if `message_type: email`. | The title of the email. |
| body | String | Yes | The content of the message.HTML and plaintext are supported. |
| template | String | Yes, if `message_type: email`. | The style of the outgoing message.Possible values `plain` or `personal`. |
| from | Object | Yes | See From Object below for more. |
| to | Object | Yes | See To Object below for more. |
| create_conversation_without_contact_reply | Boolean | No | Whether a conversation should be opened in the inbox for the message without the contact replying. Defaults to false if not provided. |


#### From Object

| Attribute | Type | Required? | Description |
|  --- | --- | --- | --- |
| type | String | Yes | Always `admin`. |
| id | String | Yes | The identifier for the admin which is given by Intercom. |


#### To Object

| Attribute | Type | Required? | Description |
|  --- | --- | --- | --- |
| type | String | Yes | The role associated to the contact - `user` or `lead`. |
| id | String | Yes | The identifier for the contact which is given by Intercom. |


### Response

This will return the [Message](/docs/references/2.6/rest-api/messages/messages-model) that has been created.

> 🚧 Retrieving Associated Conversations
As this is a message, there will be no conversation present until the contact responds. Once they do, you will have to search for a contact's conversations with the `id` of the message.