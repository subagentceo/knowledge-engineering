# Unsnoozing a conversation

## Unsnooze a conversation

```curl
$ curl 'https://api.intercom.io/conversations/11055118659/reply' \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d'
{
  "admin_id": "814860",
  "message_type":"open"
}'
```

```text
{
    "type": "conversation",
    "id": "11055118659",
    "created_at": 1501496012,
    "updated_at": 1501508752,
    "waiting_since": 1501498931,
    "snoozed_until": null,
    "conversation_message": {
        "type": "conversation_message",
        "id": "55951247",
        "subject": "",
        "body": "<p>Hi \ud83d\ude00 We hope you enjoy the example app. To get started just copy and paste some code into the JS editor. Let us know if you think this is useful? <br></p>",
        "author": {
            "type": "admin",
            "id": "724865"
        },
        "attachments": [],
        "url": null
    },
    "user": {
        "type": "lead",
        "id": "597f02cb22f4bb37597e0b7d"
    },
    "customers": [
        {
            "type": "lead",
            "id": "597f02cb22f4bb37597e0b7d"
        },
        {
            "type": "user",
            "id": "58ff3f670f14ab4f1aa83750"
        }
    ],
    "assignee": {
        "type": "admin",
        "id": "724860"
    },
    "conversation_parts": {
        "type": "conversation_part.list",
        "conversation_parts": [
            {
                "type": "conversation_part",
                "id": "712337945",
                "part_type": "comment",
                "body": "<p>test convo 1</p>",
                "created_at": 1501496025,
                "updated_at": 1501496025,
                "notified_at": 1501496025,
                "assigned_to": null,
                "author": {
                    "type": "user",
                    "id": "597f02cb22f4bb37597e0b7d"
                },
                "attachments": [],
                "external_id": null
            },
            {
                "type": "conversation_part",
                "id": "712338024",
                "part_type": "comment",
                "body": "<p>TestApp typically replies in a few hours. Don\u2019t miss their reply.</p>",
                "created_at": 1501496028,
                "updated_at": 1501496028,
                "notified_at": 1501496028,
                "assigned_to": null,
                "author": {
                    "type": "bot",
                    "id": "815309"
                },
                "attachments": [],
                "external_id": null
            },
            {
                "type": "conversation_part",
                "id": "712338089",
                "part_type": "comment",
                "body": "<p></p><p>Get notified by email</p>",
                "created_at": 1501496030,
                "updated_at": 1501496030,
                "notified_at": 1501496031,
                "assigned_to": null,
                "author": {
                    "type": "bot",
                    "id": "815309"
                },
                "attachments": [],
                "external_id": null
            },
            {
                "type": "conversation_part",
                "id": "712344562",
                "part_type": "comment",
                "body": "<p>group test two</p>",
                "created_at": 1501496290,
                "updated_at": 1501496290,
                "notified_at": 1501496291,
                "assigned_to": {
                    "type": "admin",
                    "id": "724860"
                },
                "author": {
                    "type": "admin",
                    "id": "724860"
                },
                "attachments": [],
                "external_id": null
            },
            {
                "type": "conversation_part",
                "id": "712383990",
                "part_type": "participant_added",
                "body": null,
                "created_at": 1501497831,
                "updated_at": 1501497831,
                "notified_at": 1501497832,
                "assigned_to": null,
                "author": {
                    "type": "admin",
                    "id": "724860"
                },
                "attachments": [],
                "external_id": null
            },
            {
                "type": "conversation_part",
                "id": "712411349",
                "part_type": "participant_added",
                "body": null,
                "created_at": 1501498885,
                "updated_at": 1501498885,
                "notified_at": 1501498885,
                "assigned_to": null,
                "author": {
                    "type": "admin",
                    "id": "724860"
                },
                "attachments": [],
                "external_id": null
            },
            {
                "type": "conversation_part",
                "id": "712412506",
                "part_type": "comment",
                "body": "<p>group test</p>",
                "created_at": 1501498931,
                "updated_at": 1501498931,
                "notified_at": 1501498932,
                "assigned_to": null,
                "author": {
                    "type": "user",
                    "id": "597f02cb22f4bb37597e0b7d"
                },
                "attachments": [],
                "external_id": null
            },
            {
                "type": "conversation_part",
                "id": "712425169",
                "part_type": "participant_removed",
                "body": null,
                "created_at": 1501499414,
                "updated_at": 1501499414,
                "notified_at": 1501499414,
                "assigned_to": null,
                "author": {
                    "type": "admin",
                    "id": "724860"
                },
                "attachments": [],
                "external_id": null
            },
            {
                "type": "conversation_part",
                "id": "712728293",
                "part_type": "snoozed",
                "body": null,
                "created_at": 1501508752,
                "updated_at": 1501508752,
                "notified_at": 1501508752,
                "assigned_to": null,
                "author": {
                    "type": "admin",
                    "id": "724860"
                },
                "attachments": [],
                "external_id": null
            }
        ],
        "total_count": 9
    },
    "open": true,
    "state": "snoozed",
    "read": false,
    "tags": {
        "type": "tag.list",
        "tags": []
    }
}
```

### Arguments

| Argument | Required | Description |
|  --- | --- | --- |
| admin_id | Yes | Only admins can snooze a conversation so you need to provide the admin_id |
| message_type | Yes | Must be `open` to re-open or 'unsnooze' the conversation |