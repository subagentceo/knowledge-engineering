# Update a conversation

## Example Request & Response

```curl
$ curl https://api.intercom.io/conversations/<id> \
-X PUT \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d

{
  "read": true,
  "custom_attributes": {
	  "issue_type": "Billing",
	  "priority": "High"
  }
}
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
        "url": "https://intercom-survey-app.glitch.me/"
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
    "admin_assignee_id": 814860,
    "team_assignee_id": 5017691,
    "custom_attributes": {
      "issue_type": "Billing",
      "priority": "High"
    },
    "topics": {
        "type": "topic.list",
        "topics": [
            {
                "type": "topic"
                "name": "Example Topic 1",
                "id": 839
            }
        ],
        "total_count": 1
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
}
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

You can update an existing conversation.

> 📘
If you want to update a conversation with either a reply (or actions such as assign, unassign, open, close or snooze) then take a look at their own sections respectively as they currently require different endpoints and parameters.


> 📘
Ensure that `Content-Type` header is set to `application/json`. It's required for the update to succeed.


### Request Path Parameters

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The identifier for the conversation as given by Intercom. |


### Request Body Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| read | Boolean | No | Mark a conversation as read within Intercom. |
| custom_attributes | Hash | No | Set custom attributes and their values for the conversation. |


### custom_attributes Hash for Custom Object Association creation

| Attribute | Type | Required? | Description |
|  --- | --- | --- | --- |
| A custom attribute of type relationship e.g "orders" | Array of Strings | No | With a relationship attribute as the key, an array of Custom Object Instance ids can be passed to create associations between the contact and the Custom Object Instance |


#### Example

```json
{
  "custom_attributes": {
    "orders": ["123", "234", "345"]
  }
}
```

### Response

This will return the [Conversation](/docs/references/2.6/rest-api/conversations/conversation-model) that has been updated.