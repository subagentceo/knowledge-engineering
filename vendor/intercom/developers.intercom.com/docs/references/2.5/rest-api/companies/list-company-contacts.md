# List attached contacts

## Example Request & Response

```curl
$ curl https://api.intercom.io/companies/<id>/contacts \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"list\",\n  \"data\": [\n    {\n      \"type\": \"contact\",\n      \"id\": \"5ba682d23d7cf92bef87bfd4\",\n      \"workspace_id\": \"ecahpwf5\",\n      \"external_id\": \"25\",\n      \"role\": \"user\",\n      \"email\": \"email@example.com\",\n      \"phone\": \"+1123456789\",\n      \"name\": \"Joe Example\",\n      \"avatar\": \"https://example.org/128Wash.jpg\",\n      \"owner_id\": 127,\n      \"social_profiles\": {\n        \"type\": \"list\",\n        \"data\": [\n          {\n            \"type\": \"social_profile\",\n            \"name\": \"Twitter\",\n            \"url\": \"http://twitter.com/th1sland\"\n          }\n        ]\n      },\n      \"unsubscribed_from_emails\": false,\n      \"created_at\": 1571672154,\n      \"updated_at\": 1571672158,\n      \"signed_up_at\": 1571069751,\n      \"last_seen_at\": 1571069751,\n      \"last_replied_at\": 1571672158,\n      \"last_contacted_at\": 1571672158,\n      \"last_email_opened_at\": 1571673478,\n      \"last_email_clicked_at\": 1571676789,\n      \"language_override\": null,\n      \"browser\": \"chrome\",\n      \"browser_version\": \"77.0.3865.90\",\n      \"browser_language\": \"en\",\n      \"os\": \"OS X 10.14.6\",\n      \"location\": {\n        \"type\": \"location\",\n        \"country\": \"Ireland\",\n        \"region\": \"Dublin\",\n        \"city\": \"Dublin\"\n      },\n      \"android_app_name\": null,\n      \"android_app_version\": null,\n      \"android_device\": null,\n      \"android_os_version\": null,\n      \"android_sdk_version\": null,\n      \"android_last_seen_at\": null,\n      \"ios_app_name\": null,\n      \"ios_app_version\": null,\n      \"ios_device\": null,\n      \"ios_os_version\": null,\n      \"ios_sdk_version\": null,\n      \"ios_last_seen_at\": null,\n      \"custom_attributes\": {\n        \"paid_subscriber\": true,\n        \"monthly_spend\": 155.5,\n        \"team_mates\": 1\n      },\n      \"tags\": {\n        \"type\": \"list\",\n        \"data\": [\n          {\n            \"type\": \"tag\",\n            \"id\": \"2\",\n            \"url\": \"/tags/2\"\n          },\n          {\n            \"type\": \"tag\",\n            \"id\": \"4\",\n            \"url\": \"/tags/4\"\n          },\n          {\n            \"type\": \"tag\",\n            \"id\": \"5\",\n            \"url\": \"/tags/5\"\n          }\n        ],\n        \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/tags\"\n      },\n      \"notes\": {\n        \"type\": \"list\",\n        \"data\": [\n          {\n            \"type\": \"note\",\n            \"id\": \"20114858\",\n            \"url\": \"/notes/20114858\"\n          }\n        ],\n        \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/notes\"\n      },\n      \"companies\": {\n        \"type\": \"list\",\n        \"data\": [\n          {\n            \"type\": \"company\",\n            \"id\": \"5ba686093d7cf93552a3dc99\",\n            \"url\": \"/companies/5ba686093d7cf93552a3dc99\"\n          },\n          {\n            \"type\": \"company\",\n            \"id\": \"5cee64a03d7cf90c51b36f19\",\n            \"url\": \"/companies/5cee64a03d7cf90c51b36f19\"\n          },\n          {\n            \"type\": \"company\",\n            \"id\": \"5d7668883d7cf944dbc5c791\",\n            \"url\": \"/companies/5d7668883d7cf944dbc5c791\"\n          }\n        ],\n        \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/companies\"\n      }\n    }\n  ],\n  \"total_count\": 436,\n  \"pages\": {\n    \"type\": \"pages\",\n    \"next\": {\n      \"page\": 2,\n      \"starting_after\": \"WzE1NzEzMTc0NDYwMDAsIjViYTY4MmQyM2Q3Y2Y5MmJlZjg3YmZkNCIsMl0=\"\n    },\n    \"page\": 1,\n    \"per_page\": 1,\n    \"total_pages\": 436\n  }\n}
```

## Example Errors

### Invalid starting_after param

```http
HTTP/1.1 400 BAD REQUEST\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"000nbboasf1qqab6b910\",\n  \"errors\": [\n    {\n      \"code\": \"client_error\",\n      \"message\": \"Invalid starting_after param. Please try again using a starting_after value from a paginated response\"\n    }\n  ]\n}\n
```

You can fetch a list of all contacts that belong to a company.

### Response

This will return a [paginated](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor) list of [Contact objects](/docs/references/2.5/rest-api/contacts/contacts-model).

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list` |
| data | Array | An array containing Contact Objects |
| total_count | Integer | The total number of contacts |
| pages | [Pagination Object](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor) | The information needed to paginate through contacts |