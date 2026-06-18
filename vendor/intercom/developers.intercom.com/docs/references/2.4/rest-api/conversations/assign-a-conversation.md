# Assign a conversation

## Example Request & Response (Assigning to Admin)

```curl
$ curl https://api.intercom.io/conversations/{id}/parts \\-X POST \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json' \\-H 'Content-Type:application/json' -d{  \"type\": \"admin\",  \"admin_id\": \"814860\",  \"assignee_id\": \"814860\",  \"message_type\": \"assignment\",  \"body\": \"Reassigning for X reason.\",}
```

```json
{    \"type\": \"conversation\",    \"id\": \"1911149811\",    \"created_at\": 1539897198,    \"updated_at\": 1540393270,    \"source\": {        \"attachments\": [],        \"author\": {            \"id\": \"5bc8f7421ae2d96695c18a\",            \"type\": \"lead\"        },        \"body\": \"<p>Hi</p>\",        \"delivered_as\": \"customer_initiated\",        \"id\": \"269650473\",        \"subject\": \"\",        \"type\": \"conversation\",        \"url\": \"https://intercom-survey-app.glitch.me/\"    },    \"contacts\": [        {            \"id\": \"5bc8f7ae2d96695c18a\",            \"type\": \"lead\"        }    ],    \"teammates\": [        {            \"id\": \"814860\",            \"type\": \"admin\",          \t\"name\": \"Mark Strong\",          \t\"email\": \"mk@acmeinc.org\"        }    ],    \"admin_assignee_id\": \"814860\",    \"team_assignee_id\": null,    \"custom_attributes\": {      \"issue_type\": \"Billing\",      \"priority\": \"High\"    },    \"topics\": {        \"type\": \"topic.list\",        \"topics\": [            {                \"type\": \"topic\"                \"name\": \"Example Topic 1\",                \"id\": 839            }        ],        \"total_count\": 1    },    \"open\": true,    \"state\": \"open\",    \"read\": true,    \"waiting_since\": 64654125776    \"snoozed_until\": null,    \"tags\": {        \"tags\": [],        \"type\": \"tag.list\",    },    \"first_contact_reply\": {    \t\"created_at\": 1539897198    \t\"type\": \"conversation\",    \t\"url\": \"https://intercom-survey-app.glitch.me/\"    },    \"priority\": \"not_priority\",    \"sla_applied\": {    \t\"sla_name\": \"VIP customer <5m\",      \"sla_status\": \"missed\",    },    \"conversation_rating\": {        \"created_at\": null,        \"contact\": {            \"id\": null,            \"type\": null        },        \"rating\": null,        \"remark\": null,        \"teammate\": {            \"id\": null,            \"type\": null,            \"name\": null,            \"email\": null        }    },    \"statistics\": {      \"time_to_assignment\": 2310,      \"time_to_admin_reply\": 2408,      \"time_to_first_close\": 4915 ,      \"time_to_last_close\": 5125,      \"median_time_to_reply\": 321,      \"first_contacat_reply_at\": 1539897200,      \"first_assignment_at\": 1539897200,      \"first_admin_reply_at\": 1539897200,      \"first_close_at\": 1539897200,      \"last_assignment_at\": 1539897200,      \"last_assignment_admin_reply_at\": 1539897200,      \"last_contact_reply_at\": 1539897200,      \"last_admin_reply_at\": 1539897200,      \"last_close_at\": 1539897200,      \"last_closed_by\": {      \t\"type\": \"admin\",        \"id\": \"325432652\",        \"name\": \"Tom Smith\",        \"email\": \"tom@example.com\"      },      \"count_reopens\": 3,      \"count_assignments\": 2,      \"count_conversation_parts\": 67    },   }
```

## Example Request & Response (Auto Assignment)

```curl
$ curl 'https://api.intercom.io/conversations/{id}/run_assignment_rules'-X POST -H 'Authorization: Bearer <Your access token>' -H 'Accept: application/json' -H 'Content-Type: application/json'
```

```json
{    \"type\": \"conversation\",    \"id\": \"1911149811\",    \"created_at\": 1539897198,    \"updated_at\": 1540393270,    \"source\": {        \"attachments\": [],        \"author\": {            \"id\": \"5bc8f7421ae2d96695c18a\",            \"type\": \"lead\"        },        \"body\": \"<p>Hi</p>\",        \"delivered_as\": \"customer_initiated\",        \"id\": \"269650473\",        \"subject\": \"\",        \"type\": \"conversation\",        \"url\": \"https://intercom-survey-app.glitch.me/\"    },    \"contacts\": [        {            \"id\": \"5bc8f7ae2d96695c18a\",            \"type\": \"lead\"        }    ],    \"teammates\": [        {            \"id\": \"814860\",            \"type\": \"admin\",          \t\"name\": \"Mark Strong\",          \t\"email\": \"mk@acmeinc.org\"        }    ],    \"assignee\": {        {            \"id\": \"814860\",            \"type\": \"admin\",          \t\"name\": \"Mark Strong\",          \t\"email\": \"mk@acmeinc.org\"        }    },    \"custom_attributes\": {      \"issue_type\": \"Billing\",      \"priority\": \"High\"    },    \"open\": true,    \"state\": \"open\",    \"read\": true,    \"waiting_since\": 64654125776    \"snoozed_until\": null,    \"tags\": {        \"tags\": [],        \"type\": \"tag.list\",    },    \"first_contact_reply\": {    \t\"created_at\": 1539897198    \t\"type\": \"conversation\",    \t\"url\": \"https://intercom-survey-app.glitch.me/\"    },    \"priority\": \"not_priority\",    \"sla_applied\": {    \t\"sla_name\": \"VIP customer <5m\",      \"sla_status\": \"missed\",    },    \"conversation_rating\": {        \"created_at\": null,        \"contact\": {            \"id\": null,            \"type\": null        },        \"rating\": null,        \"remark\": null,        \"teammate\": {            \"id\": null,            \"type\": null,            \"name\": null,            \"email\": null        }    },    \"statistics\": {      \"time_to_assignment\": 2310,      \"time_to_admin_reply\": 2408,      \"time_to_first_close\": 4915 ,      \"time_to_last_close\": 5125,      \"median_time_to_reply\": 321,      \"first_contacat_reply_at\": 1539897200,      \"first_assignment_at\": 1539897200,      \"first_admin_reply_at\": 1539897200,      \"first_close_at\": 1539897200,      \"last_assignment_at\": 1539897200,      \"last_assignment_admin_reply_at\": 1539897200,      \"last_contact_reply_at\": 1539897200,      \"last_admin_reply_at\": 1539897200,      \"last_close_at\": 1539897200,      \"last_closed_by\": {      \t\"type\": \"admin\",        \"id\": \"325432652\",        \"name\": \"Tom Smith\",        \"email\": \"tom@example.com\"      },      \"count_reopens\": 3,      \"count_assignments\": 2,      \"count_conversation_parts\": 67    },    }
```

You can assign a conversation to an admin and/or team. You can also let it be automatically assigned following assignment rules.

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
| assignee_id | String | Yes | The `id` of the admin or team which will be assigned the conversation.  A conversation can be assigned both an admin and a team.  Set `0` if you want this assign to no admin or team (ie. Unassigned). |
| body | String | No | Optionally you can leave a note in the conversation for additional context to other teammates. |


### Response

This will return the [Conversation](/docs/references/2.4/rest-api/conversations/conversation-model) that has been assigned.