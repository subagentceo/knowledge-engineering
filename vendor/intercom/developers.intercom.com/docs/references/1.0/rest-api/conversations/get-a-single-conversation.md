# Get a Single Conversation

## Get a Single Conversation

```curl
$ curl https://api.intercom.io/conversations/147 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
    "type": "conversation",
    "id": "147",
    "created_at": 1400850973,
    "updated_at": 1400857494,
    "conversation_message": {
      "type": "conversation_message",
      "subject": "",
      "body": "<p>Hi Alice,</p>\n\n<p>We noticed you using our Product, do you have any questions?</p> \n<p>- Jane</p>",
      "author": {
        "type": "admin",
        "id": "25"
      },
      "attachments": [
        {
          "name": "signature",
          "url": "http://someurl.com/signature.jpg"
        }
      ]
    },
    "user": {
      "type": "user",
      "id": "536e564f316c83104c000020"
    },
    "assignee": {
      "type": "admin",
      "id": "25"
    },
    "open": true,
    "read": true,
    "conversation_parts": {
      "type": "conversation_part.list",
      "conversation_parts": [
        //... List of conversation parts
      ]
    },
    "tags": { "type": 'tag.list', "tags": [] } }
}
```

```ruby
intercom.conversations.find(:id => '147')
```

```php
<?php
$intercom->conversations->getConversation("10957850396");
?>
```

```java
Conversation conversation = Conversation.find("147");

ConversationMessage message =
  conversation.getConversationMessage();

ConversationPartCollection parts =
  conversation.getConversationPartCollection();

List<ConversationPart> list = parts.getPageItems();

for (ConversationPart part : list) {
  String partType = part.getPartType();
  Author author = part.getAuthor();
  String body = part.getBody();
}

ConversationPart recent =
  conversation.getMostRecentConversationPart();

Admin assignee =
  conversation.getAssignee();

User user =
  conversation.getUser();
```

### Parameters

Specify the id of the conversation you wish to retrieve using the URL `https://api.intercom.io/conversations/{id}` URL structure where `{id}` is the `id` field of the conversation.

| Parameter | Required | Description |
|  --- | --- | --- |
| display_as | no | Set to `plaintext` to retrieve conversation messages in plain text |


### Returns

A full Conversation object including Tags, with Conversation Parts.

Parts in the `conversation_parts` object are ordered by with the most recently created parts appearing at the end of the list.

The maximum number of conversation parts that can be returned via the API is 500. If you have more than that we will return the 500 most recent conversation parts.