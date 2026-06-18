# Redact a conversation part

## Example Request & Response

```curl
$ curl https://api.intercom.io/conversations/redact \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-d 

{
  "type": <resource_type>,
  "conversation_id": <conversation_id>,
  "conversation_part_id": <conversation_part_id>,
  "source_id": <source_id>,
}
```

```http
HTTP/1.1 200 OK
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
    "admin_assignee_id": 814860,
    "team_assignee_id": 5017691,
    "custom_attributes": {
      "issue_type": "Billing",
      "priority": "High"
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

## Example Errors

```json
{
  "type": "error.list",
  "request_id": "ffa661e0-a805-4ca1-9c8f-87a926ce72bc",
  "errors": [
    {
      "code": "parameter_not_found",
      "message": "conversation_id is a required parameter"
    }
  ]
}
```

```json
{
  "type": "error.list",
  "request_id": "ffa661e0-a805-4ca1-9c8f-87a926ce72bc",
  "errors": [
    {
      "code": "conversation_part_not_redactable",
      "message": "Part can't be redacted"
    }
  ]
}
```

```json
{
  "type": "error.list",
  "request_id": "ffa661e0-a805-4ca1-9c8f-87a926ce72bc",
  "errors": [
    {
      "code": "type_mismatch",
      "message": "The type attribute provided should be either 'conversation_part' or 'source'"
    }
  ]
}
```

You can redact a conversation part or the source message of a conversation (as seen in the `source` object).

Which parts and source messages can I redact?
If you are redacting a conversation part, it must have a `body`.\nIf you are redacting a source message, it must have been created by a contact.\nWe will return a `conversation_part_not_redactable` error if these criteria are not met.

### Request Body Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| type | String | Yes | The type of resource being redacted.  Accepted values are `conversation_part` or `source`. |
| conversation_id | String | Yes | The id of the conversation. |
| conversation_part_id | String | Yes (if `type: conversation_part`) | The id of the conversation_part. |
| source_id | String | Yes (if `type: source`) | The id of the source. |


### Response

This will return the [Conversation](/docs/references/2.3/rest-api/conversations/conversation-model) with the Conversation Parts which have been redacted.