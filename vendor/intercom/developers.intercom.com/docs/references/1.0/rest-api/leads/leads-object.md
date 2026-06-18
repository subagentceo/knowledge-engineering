# Leads Object

## Example Lead Object (i.e. example JSON response)

### Lead example object

```json
{\n    \"anonymous\": true,\n    \"app_id\": \"abc3wodw\",\n    \"avatar\": {\n        \"image_url\": \"https://secure.gravatar.com/avatar/af060c6?\",\n        \"type\": \"avatar\"\n    },\n    \"companies\": {\n        \"companies\": [],\n        \"type\": \"company.list\"\n    },\n    \"created_at\": 1503488750,\n    \"custom_attributes\": {},\n    \"do_not_track\": null,\n    \"email\": \"test@example.com\",\n    \"has_hard_bounced\": false,\n    \"id\": \"599d6aeeda883ed8ba7c2\",\n    \"last_request_at\": 1503488749,\n    \"last_seen_ip\": null,\n    \"location_data\": {\n        \"city_name\": \"Pretoria\",\n        \"continent_code\": \"AF\",\n        \"country_code\": \"ZAF\",\n        \"country_name\": \"South Africa\",\n        \"latitude\": -0.0,\n        \"longitude\": 0.0,\n        \"postal_code\": \"0118\",\n        \"region_name\": \"Gauteng\",\n        \"timezone\": \"Africa/Johannesburg\",\n        \"type\": \"location_data\"\n    },\n    \"marked_email_as_spam\": false,\n    \"name\": null,\n    \"owner_id\": \"321452\",\n    \"phone\": null,\n    \"pseudonym\": \"Test from Pretoria\",\n    \"referrer\": null,\n    \"remote_created_at\": null,\n    \"segments\": {\n        \"segments\": [],\n        \"type\": \"segment.list\"\n    },\n    \"session_count\": 0,\n    \"signed_up_at\": null,\n    \"social_profiles\": {\n        \"social_profiles\": [\n            {\n                \"id\": \"123456\",\n                \"name\": \"GooglePlus\",\n                \"type\": \"social_profile\",\n                \"url\": \"https://plus.google.com/123456\",\n                \"username\": null\n            }\n        ],\n        \"type\": \"social_profile.list\"\n    },\n    \"tags\": {\n        \"tags\": [],\n        \"type\": \"tag.list\"\n    },\n    \"type\": \"contact\",\n    \"unsubscribed_from_emails\": false,\n    \"updated_at\": 1520946390,\n    \"user_agent_data\": \"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36\",\n    \"user_id\": \"e477-55c-47d5-96d3-e45bf\",\n    \"utm_campaign\": null,\n    \"utm_content\": null,\n    \"utm_medium\": null,\n    \"utm_source\": null,\n    \"utm_term\": null\n}
```

A lead object contains the following fields -

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'contact'* |
| id | string | The Intercom defined id representing the Lead |
| created_at | timestamp | The time the Lead was added to Intercom |
| updated_at | timestamp | The last time the Lead was updated |
| user_id | string | Automatically generated identifier for the Lead |
| email | string | The email you have defined for the Lead |
| phone | string | The phone number you have defined for the lead |
| name | string | The name of the Lead |
| custom_attributes | object | The custom attributes you have set on the Lead |
| last_request_at | timestamp | The time the Lead last recorded making a request |
| avatar | object | An avatar object for the Lead |
| unsubscribed_from_emails | boolean | Whether the Lead is unsubscribed from emails |
| location_data | object | A Location Object relating to the Lead |
| user_agent_data | string | Data about the last user agent the Lead was seen using |
| last_seen_ip | no | This will return null in an effort to remove PII from our API. |
| companies | list | A list of companies for the Lead |
| social_profiles | list | A list of social profiles associated with the Lead |
| segments | list | This will return an empty list of segments as part of our effort to deprecate this attribute on the lead model for performance and accuracy reasons. |
| tags | list | A list of tags associated with the Lead. |
| referrer | string | The URL of the page the lead was last on |
| utm_source | string | Identifies which site sent the traffic |
| utm_medium | string | Identifies what type of link was used |
| utm_campaign | string | Identifies a specific product promotion or strategic campaign |
| utm_term | string | Identifies search terms |
| utm_content | string | Identifies what specifically was clicked to bring the user to the site |


Information on social profile, avatar and location objects can be found under the Users documentation.