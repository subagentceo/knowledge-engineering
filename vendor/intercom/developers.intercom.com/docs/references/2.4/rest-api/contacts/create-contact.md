# Create a contact

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts \\-X POST \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json'-H 'Content-Type: application/json' -d{\t\"role\": \"user\",\t\"external_id\": \"25\",\t\"email\": \"email@example.com\",\t\"phone\": \"+1123456789\",\t\"name\": \"Joe Example\",\t\"avatar\": \"https://example.org/128Wash.jpg\",\t\"last_seen_at\": 1571069751,\t\"signed_up_at\": 1571069751,\t\"owner_id\": 127,\t\"unsubscribed_from_emails\": false,\t\"custom_attributes\": {\t\t\"paid_subscriber\": true,\t\t\"monthly_spend\": 155.5,\t\t\"team_mates\": 1\t}}
```

```http
HTTP/1.1 200 OK{  \"type\": \"contact\",  \"id\": \"5ba682d23d7cf92bef87bfd4\",  \"workspace_id\": \"ecahpwf5\",  \"external_id\": \"25\",  \"role\": \"user\",  \"email\": \"email@example.com\",  \"phone\": \"+1123456789\",  \"name\": \"Joe Example\",  \"avatar\": \"https://example.org/128Wash.jpg\",  \"owner_id\": 127,  \"social_profiles\": {    \"type\": \"list\",    \"data\": [      {        \"type\": \"social_profile\",        \"name\": \"Twitter\",        \"url\": \"http://twitter.com/th1sland\"      }    ]  },  \"unsubscribed_from_emails\": false,  \"created_at\": 1571672154,  \"updated_at\": 1571672158,  \"signed_up_at\": 1571069751,  \"last_seen_at\": 1571069751,  \"last_replied_at\": 1571672158,  \"last_contacted_at\": 1571672158,  \"last_email_opened_at\": 1571673478,  \"last_email_clicked_at\": 1571676789,  \"language_override\": null,  \"browser\": \"chrome\",  \"browser_version\": \"77.0.3865.90\",  \"browser_language\": \"en\",  \"os\": \"OS X 10.14.6\",  \"location\": {    \"type\": \"location\",    \"country\": \"Ireland\",    \"region\": \"Dublin\",    \"city\": \"Dublin\"  },  \"android_app_name\": null,  \"android_app_version\": null,  \"android_device\": null,  \"android_os_version\": null,  \"android_sdk_version\": null,  \"android_last_seen_at\": null,  \"ios_app_name\": null,  \"ios_app_version\": null,  \"ios_device\": null,  \"ios_os_version\": null,  \"ios_sdk_version\": null,  \"ios_last_seen_at\": null,  \"custom_attributes\": {    \"paid_subscriber\": true,    \"monthly_spend\": 155.5,    \"team_mates\": 1  },  \"tags\": {    \"type\": \"list\",    \"data\": [      {        \"type\": \"tag\",        \"id\": \"2\",        \"url\": \"/tags/2\"      },      {        \"type\": \"tag\",        \"id\": \"4\",        \"url\": \"/tags/4\"      },      {        \"type\": \"tag\",        \"id\": \"5\",        \"url\": \"/tags/5\"      }    ],    \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/tags\"  },  \"notes\": {    \"type\": \"list\",    \"data\": [      {        \"type\": \"note\",        \"id\": \"20114858\",        \"url\": \"/notes/20114858\"      }    ],    \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/notes\"  },  \"companies\": {    \"type\": \"list\",    \"data\": [      {        \"type\": \"company\",        \"id\": \"5ba686093d7cf93552a3dc99\",        \"url\": \"/companies/5ba686093d7cf93552a3dc99\"      },      {        \"type\": \"company\",        \"id\": \"5cee64a03d7cf90c51b36f19\",        \"url\": \"/companies/5cee64a03d7cf90c51b36f19\"      },      {        \"type\": \"company\",        \"id\": \"5d7668883d7cf944dbc5c791\",        \"url\": \"/companies/5d7668883d7cf944dbc5c791\"      }    ],    \"url\": \"/contacts/5ba682d23d7cf92bef87bfd4/companies\"  }}
```

## Example Errors

```http
HTTP/1.1 409 CONFLICT{  \"type\": \"error.list\",  \"request_id\": \"80ec9d92-99ff-4da9-9a0e-c0ab7c42f7e7\",  \"errors\": [    {      \"code\": \"conflict\",      \"message\": \"A contact matching those details already exists with id=5da6f18e3d7cf967e4582d05\"    }  ]}
```

```http
HTTP/1.1 400 BAD REQUEST{  \"type\": \"error.list\",  \"request_id\": \"00043csj9iva7pl9mmmg\",  \"errors\": [    {      \"code\": \"parameter_invalid\",      \"message\": \"The owner specified is not a member of the workspace\"    }  ]}
```

You can create a new contact (ie. user or lead).

### Request Body Parameters

| Attribute | Type | Required | Description |
|  --- | --- | --- | --- |
| role | String | Yes | The role of the contact.  Accepted values are `user` or `lead`. |
| external_id | String | Yes - if `role` is `user` and `email` is blank | A unique identifier for the contact which is given to Intercom |
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
You can only write to custom data attributes that already exist on the workspace. If you need to create new attributes to write to, you should [Create Data Attributes](/docs/references/2.4/rest-api/data-attributes/create-data-attributes) through the data Attributes API.

### Response

This will return a [Contact model](/docs/references/2.4/rest-api/contacts/contacts-model) of the contact you just created.