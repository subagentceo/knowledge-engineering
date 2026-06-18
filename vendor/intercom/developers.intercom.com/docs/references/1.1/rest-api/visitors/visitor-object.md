# Visitor Object

A visitor object contains the following fields -

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | value is 'visitor' |
| id | string | The Intercom defined id representing the Visitor |
| created_at | timestamp | The time the Visitor was added to Intercom |
| updated_at | timestamp | The last time the Visitor was updated |
| user_id | string | Automatically generated identifier for the Visitor |
| name | string | The name of the Visitor |
| custom_attributes | object | The custom attributes you have set on the Visitor |
| last_request_at | timestamp | The time the Lead last recorded making a request |
| avatar | object | An avatar object for the Visitor |
| unsubscribed_from_emails | boolean | Whether the Visitor is unsubscribed from emails |
| last_seen_ip | null | This will return null as of V1.1 in an effort to remove PII from our API. |
| user_agent_data | null | This will return null as of V1.1 in an effort to remove PII from our API. |
| location_data | object | A Location Object relating to the Visitor |
| social_profiles | list | A list of social profiles associated with the Visitor |
| segments | list | This will return an empty list of segments as part of our effort to deprecate this attribute on the visitor model for performance and accuracy reasons. |
| tags | list | A list of tags associated with the Visitor. |