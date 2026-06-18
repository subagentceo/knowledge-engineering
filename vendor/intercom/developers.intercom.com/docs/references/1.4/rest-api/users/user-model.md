# User Model

## Example User Object (i.e. example JSON response)

```json
{\n  \"type\": \"user\",\n  \"id\": \"530370b477ad7120001d\",\n  \"user_id\": \"25\",\n  \"email\": \"email@example.com\",\n  \"phone\": \"+1123456789\",\n  \"name\": \"Joe Example\",\n  \"updated_at\": 1392734388,\n  \"unsubscribed_from_emails\": false,\n  \"last_request_at\": 1397574667,\n  \"signed_up_at\": 1392731331,\n  \"created_at\": 1392734388,\n  \"session_count\": 179,\n  \"pseudonym\": null,\n  \"anonymous\": false,\n  \"referrer\": \"https://example.org\",\n  \"owner_id\": \"321452\",\n  \"utm_campaign\": null,\n  \"utm_content\": null,\n  \"utm_medium\": null,\n  \"utm_source\": null,\n  \"utm_term\": null,\n  \"custom_attributes\": {\n    \"paid_subscriber\" : true,\n    \"monthly_spend\": 155.5,\n    \"team_mates\": 1\n  },\n  \"avatar\": {\n    \"type\":\"avatar\",\n    \"image_url\": \"https://example.org/128Wash.jpg\"\n  },\n  \"location_data\": {\n      \"type\": \"location_data\",\n      \"city_name\": \"Dublin\",\n      \"continent_code\": \"EU\",\n      \"country_code\": \"IRL\",\n      \"country_name\": \"Ireland\",\n      \"postal_code\": null,\n      \"region_name\": \"Dublin\",\n      \"timezone\": \"Europe/Dublin\"\n  },\n  \"social_profiles\": {\n    \"type\":\"social_profile.list\",\n    \"social_profiles\": [\n      {\n        \"name\": \"Twitter\",\n        \"id\": \"1235d3213\",\n        \"username\": \"th1sland\",\n        \"url\": \"http://twitter.com/th1sland\"\n      }\n    ]\n  },\n  \"companies\": {\n    \"type\": \"company.list\",\n    \"companies\": [\n      {\n        \"id\" : \"530370b477ad7120001e\"\n      }\n    ]\n  },\n  \"segments\": {\n    \"type\": \"segment.list\",\n    \"segments\": [ ]\n  },\n  \"tags\": {\n    \"type\": \"tag.list\",\n    \"tags\": [\n      {\n        \"id\": \"202\"\n      }\n    ]\n  }\n}
```

## Example List of Users

```json
{\n  \"type\": \"user.list\",\n  \"total_count\": 1, \n  \"users\": [\n    # an array of user objects\n  ],\n  \"pages\": {}\n}
```

### User Object

A user object contains the following fields

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'user' or 'contact' |
| id | string | The Intercom defined id representing the user |
| created_at | timestamp | The time (in seconds) the user was added to Intercom |
| signed_up_at | timestamp | The time (in seconds) the user signed up |
| updated_at | timestamp | The last time the user was updated |
| user_id | string | The user id you have defined for the user. (Max limit of 255 UTF-8 characters, and should not have trailing or leading spaces) |
| email | string | The email you have defined for the user. (Max limit of 255 UTF-8 characters, and should not have trailing or leading spaces) |
| phone | string | The phone number of the user |
| custom_attributes | object | The custom attributes you have set on the user (case sensitive). |
| last_request_at | timestamp | The time the user last recorded making a request |
| session_count | integer | How many sessions the user has recorded |
| avatar | object | An avatar object for the user. |
| unsubscribed_from_emails | boolean | Whether the user is unsubscribed from emails |
| location_data | object | A Location Object relating to the user |
| pseudonym | string | The pseudonym used if this user was previously a Lead ([https://www.intercom.com/help/en/Intercom-for-customer-communication/the-intercom-messenger](https://www.intercom.com/help/en/Intercom-for-customer-communication/the-intercom-messenger)) |
| anonymous | boolean | Whether or not this is a Lead. Always false |
| companies | list | A list of companies for the user |
| social_profiles | list | A list of social profiles associated with the user |
| segments | list | This will return an empty list of segments as part of our effort to deprecate this attribute on the user model for performance and accuracy reasons. |
| tags | list | A list of tags associated with the user |
| name | string | The full name of the user |
| referrer | string | The URL of the page the user was last on |
| utm_source | string | Identifies which site sent the traffic |
| utm_medium | string | Identifies what type of link was used |
| utm_campaign | string | Identifies a specific product promotion or strategic campaign |
| utm_term | string | Identifies search terms |
| utm_content | string | Identifies what specifically was clicked to bring the user to the site |


Note that in some parts of the API, the user `id` field may be referred to using `intercom_user_id`.
Any integer values in the user model are limited to the int32 range `-2^31 to 2^31 -1`

### Social Profile Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'social_profile' |
| name | string | The name of the service (e.g., twitter, facebook) |
| username | string | User name or handle on the service |
| url | string | The user homepage on the service |
| id | string | Optional. User ID on the service |


Social data is read only and can not be updated via the API.

### Avatar Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'avatar' |
| image_url | string | An avatar image URL. note: the image url needs to be https. |


### Location Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'location_data' |
| city_name | string | Optional. A city name |
| continent_code | string | Optional. A continent code |
| country_code | string | Optional. An ISO 3166 country code |
| country_name | string | Optional. The country name |
| postal_code | string | Optional. A postal code |
| region_name | string | Optional. A region name |
| timezone | string | Optional. An ISO 8601 timezone |


Location data is read only and can not be updated via the API.

### User List

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'user.list' |
| total_count | integer | The number of users for this app |
| pages | object | A Pagination object |
| users | array | A list of users |


The user list does not return Leads - this means all objects in the list will have an `anonymous` value of `false`. Any user in the list that was converted from a Lead will retain their pseudonym value.