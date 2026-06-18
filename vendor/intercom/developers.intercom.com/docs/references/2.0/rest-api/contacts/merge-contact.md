# Merge two contacts

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/merge \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' -d \\\n-H 'Content-Type:application/json' -d \\\n\n{\n  \"from\": \"5d70dd30de4efd54f42fd526\",\n  \"into\": \"5ba682d23d7cf92bef87bfd4\"\n}\n
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"contact\",\n  \"id\": \"5ba682d23d7cf92bef87bfd4\",\n  \"workspace_id\": \"ecahpwf5\",\n  \"external_id\": \"25\",\n  \"role\": \"user\",\n  \"email\": \"email@example.com\",\n  \"phone\": \"+1123456789\",\n  \"name\": \"Joe Example\",\n  \"avatar\": \"https://example.org/128Wash.jpg\",\n  \"owner_id\": 127,\n  \"social_profiles\": {\n    \"type\": \"list\",\n    \"data\": [\n      {\n        \"type\": \"social_profile\",\n        \"name\": \"Twitter\",\n        \"url\": \"http://twitter.com/th1sland\"\n      }\n    ]\n  },\n  \"unsubscribed_from_emails\": false,\n  \"created_at\": 1571672154,\n  \"updated_at\": 1571672158,\n  \"signed_up_at\": 1571069751,\n  \"last_seen_at\": 1571069751,\n  \"last_replied_at\": 1571672158,\n  \"last_contacted_at\": 1571672158,\n  \"last_email_opened_at\": 1571673478,\n  \"last_email_clicked_at\": 1571676789,\n  \"language_override\": null,\n  \"browser\": \"chrome\",\n  \"browser_version\": \"77.0.3865.90\",\n  \"browser_language\": \"en\",\n  \"os\": \"OS X 10.14.6\",\n  \"location\": {\n    \"type\": \"location\",\n    \"country\": \"Ireland\",\n    \"region\": \"Dublin\",\n    \"city\": \"Dublin\"\n  },\n  \"android_app_name\": null,\n  \"android_app_version\": null,\n  \"android_device\": null,\n  \"android_os_version\": null,\n  \"android_sdk_version\": null,\n  \"android_last_seen_at\": null,\n  \"ios_app_name\": null,\n  \"ios_app_version\": null,\n  \"ios_device\": null,\n  \"ios_os_version\": null,\n  \"ios_sdk_version\": null,\n  \"ios_last_seen_at\": null,\n  \"custom_attributes\": {\n    \"paid_subscriber\": true,\n    \"monthly_spend\": 155.5,\n    \"team_mates\": 1\n  },\n  \"tags\": {\n    \"type\": \"list\",\n    \"data\": [\n      {\n        \"type\": \"tag\",\n        \"id\": \"2\",\n        \"url\": \"/tags/2\"\n      },\n      {\n        \"type\": \"tag\",\n        \"id\": \"4\",\n        \"url\": \"/tags/4\"\n      },\n      {\n        \"type\": \"tag\",\n        \"id\": \"5\",\n        \"url\": \"/tags/5\"\n      }\n    ],\n    \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/tags\"\n  },\n  \"notes\": {\n    \"type\": \"list\",\n    \"data\": [\n      {\n        \"type\": \"note\",\n        \"id\": \"20114858\",\n        \"url\": \"/notes/20114858\"\n      }\n    ],\n    \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/notes\"\n  },\n  \"companies\": {\n    \"type\": \"list\",\n    \"data\": [\n      {\n        \"type\": \"company\",\n        \"id\": \"5ba686093d7cf93552a3dc99\",\n        \"url\": \"/companies/5ba686093d7cf93552a3dc99\"\n      },\n      {\n        \"type\": \"company\",\n        \"id\": \"5cee64a03d7cf90c51b36f19\",\n        \"url\": \"/companies/5cee64a03d7cf90c51b36f19\"\n      },\n      {\n        \"type\": \"company\",\n        \"id\": \"5d7668883d7cf944dbc5c791\",\n        \"url\": \"/companies/5d7668883d7cf944dbc5c791\"\n      }\n    ],\n    \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/companies\"\n  }\n}
```

## Example Errors

```http
HTTP/1.1 404 FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Contact Not Found\"\n    }\n  ]\n}\n
```

```http
HTTP/1.1 400 UNPROCESSABLE ENTITY\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"0019c4t1derm7namdon0\",\n  \"errors\": [\n    {\n      \"code\": \"invalid_merge\",\n      \"message\": \"Merging can only be performed on a lead into a user\"\n    }\n  ]\n}\n
```

You can merge a contact with a `role` of `lead` into a contact with a `role` of `user`.

What happens upon a contact being merged?
The contact that's specified as `from` will be deleted after being merged into the contact specified as `into`. Attributes that don't exist on the contact specified as `into` will be copied over.

Merged contacts are not retrievable via the API
Once a merge is completed, the source contact (`from`) is permanently removed from the active contact list. This means:

- **GET /contacts/:id** — Requesting the source contact by its original ID will return a `404 Not Found` error.
- **POST /contacts/search** — The source contact will not appear in search results, including queries filtered by `updated_at`.
- **GET /contacts** — The source contact will not appear in list results.


Only the target contact (`into`) remains accessible. If your application stores contact IDs, update them to use the target contact's ID after a merge. You can subscribe to the `contact.merged` webhook to be notified when merges occur.

### Request Body Parameters

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| from | String | Yes | The unique identifier for the contact to merge away from. Must be a  `lead`. |
| into | String | Yes | The unique identifier for the contact to merge into. Must be a  `user`. |


### Response

This will return a [Contact model](/docs/references/2.0/rest-api/contacts/contacts-model) for the contact who's been merged into.