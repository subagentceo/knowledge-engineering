# Assign a conversation

## Example Request & Response (Assigning to Admin)

```curl
$ curl https://api.intercom.io/conversations/{id}/parts \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' \\\n-H 'Content-Type:application/json' -d\n\n{\n  \"type\": \"admin\",\n  \"admin_id\": \"814860\",\n  \"assignee_id\": \"530165\",\n  \"message_type\": \"assignment\",\n  \"body\": \"Reassigning for X reason.\"\n}
```

```curl
{\n    \"type\": \"conversation\",\n    \"id\": \"1911149811\",\n    \"created_at\": 1539897198,\n    \"updated_at\": 1540393270,\n    \"source\": {\n        \"attachments\": [],\n        \"author\": {\n            \"id\": \"5bc8f7421ae2d96695c18a\",\n            \"type\": \"lead\"\n        },\n        \"body\": \"<p>Hi</p>\",\n        \"delivered_as\": \"customer_initiated\",\n        \"id\": \"269650473\",\n        \"subject\": \"\",\n        \"type\": \"conversation\",\n        \"url\": \"https://intercom-survey-app.glitch.me/\"\n    },\n    \"contacts\": [\n        {\n            \"id\": \"5bc8f7ae2d96695c18a\",\n            \"type\": \"lead\"\n        }\n    ],\n    \"teammates\": [\n        {\n            \"id\": \"814860\",\n            \"type\": \"admin\",\n          \t\"name\": \"Mark Strong\",\n          \t\"email\": \"mk@acmeinc.org\"\n        }\n    ],\n   \"assignee\": {\n        {\n            \"id\": \"814860\",\n            \"type\": \"admin\",\n          \t\"name\": \"Mark Strong\",\n          \t\"email\": \"mk@acmeinc.org\"\n        }\n    },\n    \"open\": true,\n    \"state\": \"open\",\n    \"read\": true,\n    \"waiting_since\": 64654125776\n    \"snoozed_until\": null,\n    \"tags\": {\n        \"tags\": [],\n        \"type\": \"tag.list\",\n    },\n    \"first_contact_reply\": {\n    \t\"created_at\": 1539897198\n    \t\"type\": \"conversation\",\n    \t\"url\": \"https://intercom-survey-app.glitch.me/\"\n    },\n    \"priority\": \"not_priority\",\n    \"sla_applied\": {\n    \t\"sla_name\": \"VIP customer <5m\",\n      \"sla_status\": \"missed\",\n    },\n    \"conversation_rating\": {\n        \"created_at\": null,\n        \"contact\": {\n            \"id\": null,\n            \"type\": null\n        },\n        \"rating\": null,\n        \"remark\": null,\n        \"teammate\": {\n            \"id\": null,\n            \"type\": null,\n            \"name\": null,\n            \"email\": null\n        }\n    },\n    \"statistics\": {\n      \"time_to_assignment\": 2310,\n      \"time_to_admin_reply\": 2408,\n      \"time_to_first_close\": 4915 ,\n      \"time_to_last_close\": 5125,\n      \"median_time_to_reply\": 321,\n      \"first_contacat_reply_at\": 1539897200,\n      \"first_assignment_at\": 1539897200,\n      \"first_admin_reply_at\": 1539897200,\n      \"first_close_at\": 1539897200,\n      \"last_assignment_at\": 1539897200,\n      \"last_assignment_admin_reply_at\": 1539897200,\n      \"last_contact_reply_at\": 1539897200,\n      \"last_admin_reply_at\": 1539897200,\n      \"last_close_at\": 1539897200,\n      \"last_closed_by\": {\n      \t\"type\": \"admin\",\n        \"id\": \"325432652\",\n        \"name\": \"Tom Smith\",\n        \"email\": \"tom@example.com\"\n      },\n      \"count_reopens\": 3,\n      \"count_assignments\": 2,\n      \"count_conversation_parts\": 67\n    },   \n}
```

## Example Request & Response (Auto Assignment)

```curl
$ curl 'https://api.intercom.io/conversations/{id}/run_assignment_rules'\n-X POST \n-H 'Authorization: Bearer <Your access token>' \n-H 'Accept: application/json' \n-H 'Content-Type: application/json'\n
```

```curl
{\n    \"type\": \"conversation\",\n    \"id\": \"1911149811\",\n    \"created_at\": 1539897198,\n    \"updated_at\": 1540393270,\n    \"source\": {\n        \"attachments\": [],\n        \"author\": {\n            \"id\": \"5bc8f7421ae2d96695c18a\",\n            \"type\": \"lead\"\n        },\n        \"body\": \"<p>Hi</p>\",\n        \"delivered_as\": \"customer_initiated\",\n        \"id\": \"269650473\",\n        \"subject\": \"\",\n        \"type\": \"conversation\",\n        \"url\": \"https://intercom-survey-app.glitch.me/\"\n    },\n    \"contacts\": [\n        {\n            \"id\": \"5bc8f7ae2d96695c18a\",\n            \"type\": \"lead\"\n        }\n    ],\n    \"teammates\": [\n        {\n            \"id\": \"814860\",\n            \"type\": \"admin\",\n          \t\"name\": \"Mark Strong\",\n          \t\"email\": \"mk@acmeinc.org\"\n        }\n    ],\n    \"assignee\": {\n        {\n            \"id\": \"814860\",\n            \"type\": \"admin\",\n          \t\"name\": \"Mark Strong\",\n          \t\"email\": \"mk@acmeinc.org\"\n        }\n    },\n    \"open\": true,\n    \"state\": \"open\",\n    \"read\": true,\n    \"waiting_since\": 64654125776\n    \"snoozed_until\": null,\n    \"tags\": {\n        \"tags\": [],\n        \"type\": \"tag.list\",\n    },\n    \"first_contact_reply\": {\n    \t\"created_at\": 1539897198\n    \t\"type\": \"conversation\",\n    \t\"url\": \"https://intercom-survey-app.glitch.me/\"\n    },\n    \"priority\": \"not_priority\",\n    \"sla_applied\": {\n    \t\"sla_name\": \"VIP customer <5m\",\n      \"sla_status\": \"missed\",\n    },\n    \"conversation_rating\": {\n        \"created_at\": null,\n        \"contact\": {\n            \"id\": null,\n            \"type\": null\n        },\n        \"rating\": null,\n        \"remark\": null,\n        \"teammate\": {\n            \"id\": null,\n            \"type\": null,\n            \"name\": null,\n            \"email\": null\n        }\n    },\n    \"statistics\": {\n      \"time_to_assignment\": 2310,\n      \"time_to_admin_reply\": 2408,\n      \"time_to_first_close\": 4915 ,\n      \"time_to_last_close\": 5125,\n      \"median_time_to_reply\": 321,\n      \"first_contacat_reply_at\": 1539897200,\n      \"first_assignment_at\": 1539897200,\n      \"first_admin_reply_at\": 1539897200,\n      \"first_close_at\": 1539897200,\n      \"last_assignment_at\": 1539897200,\n      \"last_assignment_admin_reply_at\": 1539897200,\n      \"last_contact_reply_at\": 1539897200,\n      \"last_admin_reply_at\": 1539897200,\n      \"last_close_at\": 1539897200,\n      \"last_closed_by\": {\n      \t\"type\": \"admin\",\n        \"id\": \"325432652\",\n        \"name\": \"Tom Smith\",\n        \"email\": \"tom@example.com\"\n      },\n      \"count_reopens\": 3,\n      \"count_assignments\": 2,\n      \"count_conversation_parts\": 67\n    },    \n}
```

You can assign a conversation to an admin or team. You can also let it be automatically assigned following assignment rules.

### Request Path Parameters

| Parameter | Required? | Description |
|  --- | --- | --- |
| id | Yes | The identifier for the conversation as given by Intercom. |
| run_assignment_rules | No | Runs through all assignment rules created in the Intercom Inbox product for a given workspace. |


### Request Body Parameters

No body parameters are required when auto assigning conversations using the `{id}/run_assignment_rules` path parameter.

| Argument | Type | Required? | Description |
|  --- | --- | --- | --- |
| message_type | String | Yes | Always `assignment`. |
| type | String | Yes | Accepts `admin` or `team`. |
| admin_id | String | Yes | The `id` of the admin who is performing the action. |
| assignee_id | String | Yes | The `id` of the admin or team which will be assigned the conversation.  Set this to `0` if you want to assign it to no-one (ie. Unassigned). |
| body | String | No | Optionally you can leave a note in the conversation for additional context to other teammates. |


### Response

This will return the [Conversation](/docs/references/2.1/rest-api/conversations/conversation-model) that has been assigned.