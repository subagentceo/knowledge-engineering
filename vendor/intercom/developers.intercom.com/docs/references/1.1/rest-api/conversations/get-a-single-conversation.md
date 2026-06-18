# Get a Single Conversation

## Get a Single Conversation

```curl
$ curl https://api.intercom.io/conversations/147 \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n    \"assignee\": {\n        \"id\": \"814860\",\n        \"type\": \"admin\"\n    },\n    \"conversation_message\": {\n        \"attachments\": [],\n        \"author\": {\n            \"id\": \"5bc8f7421ae2d96695c18a\",\n            \"type\": \"lead\"\n        },\n        \"body\": \"<p>Hi</p>\",\n        \"delivered_as\": \"customer_initiated\",\n        \"id\": \"269650473\",\n        \"subject\": \"\",\n        \"type\": \"conversation\",\n        \"url\": \"https://intercom-survey-app.glitch.me/\"\n    },\n    \"conversation_parts\": {\n        \"conversation_parts\": [\n            {\n                \"assigned_to\": null,\n                \"attachments\": [],\n                \"author\": {\n                    \"id\": \"815309\",\n                    \"type\": \"bot\"\n                },\n                \"body\": \"<p>Test_App typically replies in a few hours.</p>\",\n                \"created_at\": 1539897200,\n                \"external_id\": null,\n                \"id\": \"2202737122\",\n                \"notified_at\": 1539897200,\n                \"part_type\": \"comment\",\n                \"type\": \"conversation_part\",\n                \"updated_at\": 1539897200\n            },\n          #List of conversation parts...\n        ],\n        \"total_count\": 25,\n        \"type\": \"conversation_part.list\"\n    },\n    \"conversation_rating\": {\n        \"created_at\": null,\n        \"customer\": {\n            \"id\": null,\n            \"type\": null\n        },\n        \"rating\": null,\n        \"remark\": null,\n        \"teammate\": {\n            \"id\": null,\n            \"type\": null\n        }\n    },\n    \"created_at\": 1539897198,\n    \"customer_first_reply\": {\n        \"created_at\": 1539897198,\n        \"type\": \"conversation\",\n        \"url\": \"https://intercom-survey-app.glitch.me/\"\n    },\n    \"customers\": [\n        {\n            \"id\": \"5bc8f7ae2d96695c18a\",\n            \"type\": \"lead\"\n        }\n    ],\n    \"id\": \"1911149811\",\n    \"open\": true,\n    \"read\": true,\n    \"sent_at\": 1539897198,\n    \"snoozed_until\": null,\n    \"state\": \"open\",\n    \"tags\": {\n      \"type\": \"tag.list\",\n      \"tags\": [\n        {\n          \"type\": \"tag\",\n          \"id\": \"1\",\n          \"name\": \"a tag\",\n          \"applied_at\": 1542820819,\n          \"applied_by\": {\n            \"type\": \"admin\",\n            \"id\": \"54\"\n          }\n        },\n        {\n          \"type\": \"tag\",\n          \"id\": \"1\",\n          \"name\": \"a tag\",\n          \"applied_at\": 1542969954,\n          \"applied_by\": {\n            \"type\": \"admin\",\n            \"id\": \"54\"\n          }\n        }\n      ]\n    },\n    \"type\": \"conversation\",\n    \"updated_at\": 1540393270,\n    \"user\": {\n        \"id\": \"5bc8f7421ffae2d96695c18a\",\n        \"type\": \"lead\"\n    },\n    \"waiting_since\": 64654125776\n}
```

```ruby
intercom.conversations.find(:id => '147')
```

```php
<?php\n$intercom->conversations->getConversation(\"10957850396\");\n?>
```

```java
Conversation conversation = Conversation.find(\"147\");\n\nConversationMessage message =\n  conversation.getConversationMessage();\n\nConversationPartCollection parts =\n  conversation.getConversationPartCollection();\n\nList<ConversationPart> list = parts.getPageItems();\n\nfor (ConversationPart part : list) {\n  String partType = part.getPartType();\n  Author author = part.getAuthor();\n  String body = part.getBody();\n}\n\nConversationPart recent =\n  conversation.getMostRecentConversationPart();\n\nAdmin assignee =\n  conversation.getAssignee();\n\nUser user =\n  conversation.getUser();
```

### Parameters

Specify the id of the conversation you wish to retrieve using the URL `https://api.intercom.io/conversations/{id}` URL structure where `{id}` is the `id` field of the conversation.

| Parameter | Required | Description |
|  --- | --- | --- |
| display_as | no | Set to `plaintext` to retrieve conversation messages in plain text |


### Returns

A full Conversation object. This will include a list of tags as Tag objects, with two additional attributes:

| Attribute | Type | Description |
|  --- | --- | --- |
| applied_at | UNIX Timestamp | The date and time when the tag was applied to the conversation. |
| applied_by | Object | Contains the `id` of the `admin` that applied the tag. |


Parts in the `conversation_parts` object are ordered by with the most recently created parts appearing at the end of the list.

The maximum number of conversation parts that can be returned via the API is 500. If you have more than that we will return the 500 most recent conversation parts.