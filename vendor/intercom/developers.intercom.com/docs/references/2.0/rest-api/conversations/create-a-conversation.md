# Create a conversation

## Example Request & Response

```curl
$ curl https://api.intercom.io/conversations \
-XPOST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d

{
  "from": {
    "type": "contact",
    "id": "536e564f316c83104c000020"
  },
  "body": "Hey"
}
```

```curl
HTTP/1.1 200 OK

{
  "type": "user_message",
  "id": "2001",
  "created_at": 1401917202,
  "body" : "Hey, is the new thing in stock?",
  "message_type": "inapp"
}
```

```ruby
intercom.messages.create(
  :from => {
    :type => "user",
    :id => "536e564f316c83104c000020"
  },
  :body => "Hey"
)
```

```php
<?php
$intercom->messages->create([
    "message_type" => "inapp",
    "body" => "Surely, I said, knowledge is the food of the soul",
    "from" => [
        "type" => "user",
        "id" => "5989303470da497b1babb9ef"
    ]
]);
?>
```

```java
UserMessage userMessage = new UserMessage()
  .setBody("Hey! Is there, is there a reward?")
  .setUser(user);
Conversation.create(userMessage);
```

You can create a conversation that has been initiated by a contact (ie. user or lead).

Sending for visitors
You can also send a message from a visitor by specifying their `user_id` or `id` value in the `from` field, along with a `type` field value of `contact`. This visitor will be automatically converted to a contact with a lead role once the conversation is created.

### Request Body Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| from | Object | Yes | See From Object below for more. |
| body | String | Yes | The content of the message.  HTML is not supported. |


#### From Object

| Attribute | Type | Required? | Description |
|  --- | --- | --- | --- |
| type | String | Yes | You can pass in `contact` for both users and leads. |
| id | String | Yes | The identifier for the contact which is given by Intercom. |


### Response

This will return the [Message model](/docs/references/2.0/rest-api/messages/messages-model) that has been created.