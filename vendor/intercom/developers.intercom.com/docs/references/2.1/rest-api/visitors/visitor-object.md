# The visitor model

Visitors are useful for representing anonymous people that have not yet been identified. They usually represent website visitors. Visitors are not visible in Intercom platform.
The Visitors resource provides methods to fetch, update, convert and delete.

### Visitor Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | Value is 'visitor'. |
| id | String | The Intercom defined id representing the Visitor. |
| created_at | Date (UNIX timestamp) | The time the Visitor was added to Intercom. |
| updated_at | Date (UNIX timestamp) | The last time the Visitor was updated. |
| user_id | String | Automatically generated identifier for the Visitor. |
| name | String | The name of the Visitor. |
| custom_attributes | Object | The custom attributes you have set on the Visitor. |
| last_request_at | Date (UNIX timestamp) | The time the Lead last recorded making a request. |
| avatar | Object | An avatar object for the Visitor. |
| unsubscribed_from_emails | Boolean | Whether the Visitor is unsubscribed from emails. |
| location_data | Object | A Location Object relating to the Visitor. |
| social_profiles | List | A list of social profiles associated with the Visitor. |
| segments | List | A list of segments the Visitor. |
| tags | List | A list of tags associated with the Visitor. |