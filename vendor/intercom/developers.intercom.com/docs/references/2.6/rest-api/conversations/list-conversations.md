# List all conversations

## Example Request & Response

```curl
$ curl \"https://api.intercom.io/conversations \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
  "type": "conversation.list",
  "conversations": [
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
      "first_contact_reply_at": 1539897200,
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
    
    # list of conversations
  ],
 	"pages": {
    "type": "pages",
    "next": {
      "page": 2,
      "starting_after": "WzE2NTg3NTk2MzAwMDAsNCwzXQ=="
    },
   	"page": 1,
   	"per_page": "1",
    "total_pages": 3
  },
}
```

You can fetch a list of all conversations.

### Request Parameters

You can optionally request the result page size and which page to fetch as follows -

| Parameter | Required | Description |
|  --- | --- | --- |
| per_page | no | How many results per page (*defaults to 150*). |
| starting_after | no | String used to get the next page of conversations. |


### Response

Pagination
The list all conversations query have a default per_page value of 150.

A [Pagination (Cursor)](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor) of [Conversations](/docs/references/2.6/rest-api/conversations/conversation-model) is returned, without the `conversation_parts` object.

Retrieving Conversation Parts
You must [retrieve a single conversation](/docs/references/2.6/rest-api/conversations/retrieve-a-conversation) using the conversation's `id` to return a conversation with the `conversation_part` array and objects included.