# Retrieve a conversation

## Example Request & Response

```curl
$ curl https://api.intercom.io/conversations/<id> \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
{
    "type": "conversation",
    "id": "1911149811",
    "created_at": 1539897198,
    "updated_at": 1540393270,
    "source": {
        "attachments": [],
        "author": {
            "id": "5bc8f7421ae2d96695c18a",
            "type": "lead"
        },
        "body": "<p>Hi</p>",
        "delivered_as": "customer_initiated",
        "id": "269650473",
        "subject": "",
        "type": "conversation",
        "url": "https://intercom-survey-app.glitch.me/",
        "redacted": false
    },
    "contacts": [
        {
            "id": "5bc8f7ae2d96695c18a",
            "type": "lead"
        }
    ],
    "teammates": [
        {
            "id": "814860",
            "type": "admin",
          	"name": "Mark Strong",
          	"email": "mk@acmeinc.org"
        }
    ],
    "assignee": {
        {
            "id": "814860",
            "type": "admin",
          	"name": "Mark Strong",
          	"email": "mk@acmeinc.org"
        }
    },
    "open": true,
    "state": "open",
    "read": true,
    "waiting_since": 64654125776
    "snoozed_until": null,
    "tags": {
        "tags": [],
        "type": "tag.list",
    },
    "first_contact_reply": {
    	"created_at": 1539897198
    	"type": "conversation",
    	"url": "https://intercom-survey-app.glitch.me/"
    },
    "priority": "not_priority",
    "sla_applied": {
    	"sla_name": "VIP customer <5m",
      "sla_status": "missed",
    },
    "conversation_rating": {
        "created_at": null,
        "contact": {
            "id": null,
            "type": null
        },
        "rating": null,
        "remark": null,
        "teammate": {
            "id": null,
            "type": null,
            "name": null,
            "email": null
        }
    },
    "statistics": {
      "time_to_assignment": 2310,
      "time_to_admin_reply": 2408,
      "time_to_first_close": 4915 ,
      "time_to_last_close": 5125,
      "median_time_to_reply": 321,
      "first_contacat_reply_at": 1539897200,
      "first_assignment_at": 1539897200,
      "first_admin_reply_at": 1539897200,
      "first_close_at": 1539897200,
      "last_assignment_at": 1539897200,
      "last_assignment_admin_reply_at": 1539897200,
      "last_contact_reply_at": 1539897200,
      "last_admin_reply_at": 1539897200,
      "last_close_at": 1539897200,
      "last_closed_by": {
      	"type": "admin",
        "id": "325432652",
        "name": "Tom Smith",
        "email": "tom@example.com"
      },
      "count_reopens": 3,
      "count_assignments": 2,
      "count_conversation_parts": 67
    },
    "conversation_parts": {
        "conversation_parts": [
            {
                "assigned_to": null,
                "attachments": [],
                "author": {
                    "id": "815309",
                    "type": "bot"
                },
                "body": "<p>Test_App typically replies in a few hours.</p>",
                "created_at": 1539897200,
                "external_id": null,
                "id": "2202737122",
                "notified_at": 1539897200,
                "part_type": "comment",
                "type": "conversation_part",
                "updated_at": 1539897200,
                "redacted": false
            },
          #List of conversation parts...
        ],
        "total_count": 67,
        "type": "conversation_part.list"
    }    
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

You can fetch the details of a single conversation.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The identifier for the conversation as given by Intercom. |


### Request Query Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| display_as | String | No | Set to `plaintext` to retrieve conversation messages in plain text. |


### Response

This will return a single [Conversation model](/docs/references/2.1/rest-api/conversations/conversation-model) with all its conversation parts.

Hard limit of 500 parts
The maximum number of conversation parts that can be returned via the API is 500. If you have more than that we will return the 500 most recent conversation parts.