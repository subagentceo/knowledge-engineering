# Create a contact

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d\n\n{\n\t\"role\": \"user\",\n\t\"external_id\": \"25\",\n\t\"email\": \"email@example.com\",\n\t\"phone\": \"+1123456789\",\n\t\"name\": \"Joe Example\",\n\t\"avatar\": \"https://example.org/128Wash.jpg\",\n\t\"last_seen_at\": 1571069751,\n\t\"signed_up_at\": 1571069751,\n\t\"owner_id\": 127,\n\t\"unsubscribed_from_emails\": false,\n\t\"custom_attributes\": {\n\t\t\"paid_subscriber\": true,\n\t\t\"monthly_spend\": 155.5,\n\t\t\"team_mates\": 1\n\t}\n}\n
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"contact\",\n  \"id\": \"5ba682d23d7cf92bef87bfd4\",\n  \"workspace_id\": \"ecahpwf5\",\n  \"external_id\": \"25\",\n  \"role\": \"user\",\n  \"email\": \"email@example.com\",\n  \"phone\": \"+1123456789\",\n  \"name\": \"Joe Example\",\n  \"avatar\": \"https://example.org/128Wash.jpg\",\n  \"owner_id\": 127,\n  \"social_profiles\": {\n    \"type\": \"list\",\n    \"data\": [\n      {\n        \"type\": \"social_profile\",\n        \"name\": \"Twitter\",\n        \"url\": \"http://twitter.com/th1sland\"\n      }\n    ]\n  },\n  \"unsubscribed_from_emails\": false,\n  \"created_at\": 1571672154,\n  \"updated_at\": 1571672158,\n  \"signed_up_at\": 1571069751,\n  \"last_seen_at\": 1571069751,\n  \"last_replied_at\": 1571672158,\n  \"last_contacted_at\": 1571672158,\n  \"last_email_opened_at\": 1571673478,\n  \"last_email_clicked_at\": 1571676789,\n  \"language_override\": null,\n  \"browser\": \"chrome\",\n  \"browser_version\": \"77.0.3865.90\",\n  \"browser_language\": \"en\",\n  \"os\": \"OS X 10.14.6\",\n  \"location\": {\n    \"type\": \"location\",\n    \"country\": \"Ireland\",\n    \"region\": \"Dublin\",\n    \"city\": \"Dublin\"\n  },\n  \"android_app_name\": null,\n  \"android_app_version\": null,\n  \"android_device\": null,\n  \"android_os_version\": null,\n  \"android_sdk_version\": null,\n  \"android_last_seen_at\": null,\n  \"ios_app_name\": null,\n  \"ios_app_version\": null,\n  \"ios_device\": null,\n  \"ios_os_version\": null,\n  \"ios_sdk_version\": null,\n  \"ios_last_seen_at\": null,\n  \"custom_attributes\": {\n    \"paid_subscriber\": true,\n    \"monthly_spend\": 155.5,\n    \"team_mates\": 1\n  },\n  \"tags\": {\n    \"type\": \"list\",\n    \"data\": [\n      {\n        \"type\": \"tag\",\n        \"id\": \"2\",\n        \"url\": \"/tags/2\"\n      },\n      {\n        \"type\": \"tag\",\n        \"id\": \"4\",\n        \"url\": \"/tags/4\"\n      },\n      {\n        \"type\": \"tag\",\n        \"id\": \"5\",\n        \"url\": \"/tags/5\"\n      }\n    ],\n    \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/tags\"\n  },\n  \"notes\": {\n    \"type\": \"list\",\n    \"data\": [\n      {\n        \"type\": \"note\",\n        \"id\": \"20114858\",\n        \"url\": \"/notes/20114858\"\n      }\n    ],\n    \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/notes\"\n  },\n  \"companies\": {\n    \"type\": \"list\",\n    \"data\": [\n      {\n        \"type\": \"company\",\n        \"id\": \"5ba686093d7cf93552a3dc99\",\n        \"url\": \"/companies/5ba686093d7cf93552a3dc99\"\n      },\n      {\n        \"type\": \"company\",\n        \"id\": \"5cee64a03d7cf90c51b36f19\",\n        \"url\": \"/companies/5cee64a03d7cf90c51b36f19\"\n      },\n      {\n        \"type\": \"company\",\n        \"id\": \"5d7668883d7cf944dbc5c791\",\n        \"url\": \"/companies/5d7668883d7cf944dbc5c791\"\n      }\n    ],\n    \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/companies\"\n  }\n}
```

## Example Errors

```http
HTTP/1.1 409 CONFLICT\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"80ec9d92-99ff-4da9-9a0e-c0ab7c42f7e7\",\n  \"errors\": [\n    {\n      \"code\": \"conflict\",\n      \"message\": \"A contact matching those details already exists with id=5da6f18e3d7cf967e4582d05\"\n    }\n  ]\n}
```

```http
HTTP/1.1 400 BAD REQUEST\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"00043csj9iva7pl9mmmg\",\n  \"errors\": [\n    {\n      \"code\": \"parameter_invalid\",\n      \"message\": \"The owner specified is not a member of the workspace\"\n    }\n  ]\n}\n
```

You can create a new contact (ie. user or lead).

### Request Body Parameters

| Attribute | Type | Required | Description |
|  --- | --- | --- | --- |
| role | String | Yes | The role of the contact.  Accepted values are `user` or `lead`. |
| external_id | String | Yes - if `role` is `user` and `email` is blank | A unique identifier for the contact which is given to Intercom.  **Note:** Can't be set for role type of  `lead` |
| email | String | Yes - if `role` is `user` and `external_id` is blank | The contacts email |
| phone | String | No | The contacts phone |
| name | String | No | The contacts name |
| avatar | String | No | An image URL containing the avatar of a contact |
| signed_up_at | Date (Unix timestamp in seconds) | No | The time specified for when a contact signed up |
| last_seen_at | Date (Unix timestamp in seconds) | No | The time when the contact was last seen, either where the Intercom Messenger was installed or when specified manually |
| owner_id | Integer | No | The id of an admin that has been assigned account ownership of the contact |
| unsubscribed_from_emails | Boolean | No | Whether the contact is unsubscribed from emails |
| custom_attributes | Object | No | The custom attributes which are set for the contact |


Creating new Custom Data Attributes
You can only write to custom data attributes that already exist on the workspace. If you need to create new attributes to write to, you should [Create Data Attributes](/docs/references/2.3/rest-api/data-attributes/create-data-attributes) through the Data Attributes API.

### Response

This will return a [Contact model](/docs/references/2.3/rest-api/contacts/contacts-model) of the contact you just created.