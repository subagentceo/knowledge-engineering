# Run assignment rules on a conversation

Deprecation of Run Assignment Rules
Run assignment rules is now deprecated in version 2.12 and future versions and will be permanently removed on December 31, 2026. After this date, any requests made to this endpoint will fail.

You can set up [**assignment rules**](https://docs.intercom.com/support-and-retain-customers/work-as-a-team/assign-conversations-to-teammates-and-teams) to assign conversations to the correct team or teammate.

This usually happens upon a new, user initiated conversation coming in. This API call allows you to trigger the assignment rules - whether that's during a conversation, or when a user responds to an admin initiated conversation.

Required Product
Assignment Rules are only available with **Inbox Pro.** You can upgrade [here](https://app.intercom.com/a/apps/_/billing/subscription).

## Assign based on assignment rules

```curl
curl 'https://api.intercom.io/conversations/{convo_id}/run_assignment_rules' \\\n-X POST \\\n-H 'Authorization: Bearer <Acess Token>' \\ \n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json'
```

```http
HTTP/1.1 200 OK\n\n{\n    \"type\": \"conversation\",\n    \"id\": \"14113586456\",\n    \"created_at\": 1516147337,\n    \"updated_at\": 1519928682,\n    \"waiting_since\": 64632601013,\n    \"snoozed_until\": null,\n    \"conversation_message\": {\n        \"type\": \"conversation_message\",\n        \"id\": \"55951247\",\n        \"subject\": \"\",\n        \"body\": \"<p>Hi \\ud83d\\ude00 We hope you enjoy the example app. To get started just copy and paste some code into the JS editor. Let us know if you think this is useful? <br></p>\",\n        \"author\": {\n            \"type\": \"admin\",\n            \"id\": \"814865\"\n        },\n        \"attachments\": [],\n        \"url\": null\n    },\n    \"user\": {\n        \"type\": \"user\",\n        \"id\": \"58bed1207d39a857fc9488e7\"\n    },\n    \"customers\": [\n        {\n            \"type\": \"user\",\n            \"id\": \"58bed1207d39a857fc9488e7\"\n        }\n    ],\n    \"assignee\": {\n        \"type\": \"admin\",\n        \"id\": \"814860\"\n    },\n    \"conversation_parts\": {\n        \"type\": \"conversation_part.list\",\n        \"conversation_parts\": [\n            {\n                ...\n            }\n        ],\n        \"total_count\": 17\n    },\n    \"open\": true,\n    \"state\": \"open\",\n    \"read\": false,\n    \"tags\": {\n        \"type\": \"tag.list\",\n        \"tags\": []\n    },\n    \"conversation_rating\": {\n        \"rating\": null,\n        \"remark\": null,\n        \"created_at\": null,\n        \"customer\": {\n            \"type\": null,\n            \"id\": null\n        },\n        \"teammate\": {\n            \"type\": null,\n            \"id\": null\n        }\n    }\n}
```