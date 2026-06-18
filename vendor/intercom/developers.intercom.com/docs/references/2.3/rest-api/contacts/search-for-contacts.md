# Search for contacts

You can search for multiple contacts by the value of their attributes in order to fetch exactly who you want.

To search for contacts, you need to send a POST request to `https://api.intercom.io/contacts/search`. This will accept a `query` object in the body which will define your filters in order to search for contacts.

Why is there a delay when creating contacts and searching for them?
If a contact has recently been created, there is a possibility that it will not yet be available when searching. This means that it may not appear in the response. This delay can take a few minutes. If you need to be instantly notified then you could [use webhooks](https://developers.intercom.com/build-an-integration/docs/webhook-model) instead, which you'd currently have to iterate on to see if they match your search filters.

### Search with single filter

You should provide the following parameters within a `query` object:

| Parameter | Required? | Description |
|  --- | --- | --- |
| field | Yes | The fields associated to a customer that you can search for. [See all accepted fields below](#accepted-fields). |
| operator | Yes | The operator that you want to compare by.  [See all accepted operators below](#accepted-operators). |
| value | Yes | The value you want to search by. |


### Search with multiple filters

You can search with multiple filters by combining a list of single filter objects within a `value` array and saying whether you want to ensure all given values match (`AND`), or only one of these match (`OR`). The `query` object should contain these parameters.

| Parameter | Required? | Description |
|  --- | --- | --- |
| operator | Yes | The operator (`AND` or `OR`) by which to query the combined values. |
| value | Yes | An array of single query objects. |


Only checking if one value matches?
If you're only using `OR` to check that one matches out of the values, you could instead use `IN` as the operator in a single filter query. You could also use `NIN` to say that it does not match one of the values.

Nesting & Limitations
You can nest these filters in order to get even more granular insights that pinpoint exactly what you need. Example: (1 OR 2) AND (3 OR 4).\n\nThere are some limitations to the amount of multiple's there can be:\n\n_ There's a limit of max 2 nested filters\n_ There's a limit of max 15 filters for each `AND` or `OR` group

## Example Request (Single Filter)

### Request

```json
{\n \"query\":  {\n    \"field\": \"custom_attributes.salesforce_status\",\n    \"operator\": \"~\",\n    \"value\": \"open\"\n  }\n}
```

## Example Request (Multiple Filters)

```json
{\n \"query\":  {\n    \"operator\": \"AND\",\n    \"value\": [\n      {\n        \"field\": \"custom_attributes.social_network\",\n        \"operator\": \"=\",\n        \"value\": \"facebook\"\n      }, \n      {\n        \"field\": \"custom_attributes.social_network\",\n        \"operator\": \"=\",\n        \"value\": \"twitter\"\n      },\n      {\n        \"field\": \"custom_attributes.social_network\",\n        \"operator\": \"=\",\n        \"value\": \"instagram\"\n      }\n    ]\n  }\n}
```

```json
{\n \"query\":  {\n    \"field\": \"custom_attributes.social_network\",\n    \"operator\": \"IN\",\n    \"value\": [\"facebook\", \"twitter\", \"instagram\"]\n  }\n}
```

## Example Request (Nested Filters)

### Request

```json
{\n \"query\":  {\n    \"operator\": \"AND\",\n    \"value\": [\n      {\n        \"operator\": \"OR\",\n        \"value\": [\n          {\n            \"field\": \"created_at\",\n            \"operator\": \">\",\n            \"value\": 1560436650\n          }, \n          {\n            \"field\": \"signed_up_at\",\n            \"operator\": \">\",\n            \"value\": 1560436784\n          }\n        ]\n      },\n      {\n        \"operator\": \"OR\",\n        \"value\": [\n          {\n            \"field\": \"custom_attributes.salseforce_status\",\n            \"operator\": \"~\",\n            \"value\": \"Open\"\n          }, \n          {\n            \"field\": \"custom_attributes.salesforce_object_type\",\n            \"operator\": \"=\",\n            \"value\": \"Lead\"\n          }\n        ]\n      }\n    ]\n  }\n}
```

## Example Errors

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": null,
  "errors": [
      {
        "code": "bad_request",
        "message": "bad 'random_param' parameter"
      }
  ]
}
```

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": null,
  "errors": [
    {
      "code": "invalid_query",
      "message": "Invalid query. Ensure 'field', 'operator', 'value' are present for field queries. Ensure 'operator' and 'value' for composite queries."
    }
  ]
}
```

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": null,
  "errors": [
    {
      "code": "invalid_values",
      "message": "Value depth exceeds 10 items"
    }
  ]
}
```

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": null,
  "errors": [
    {
      "code": "invalid_value",
      "message": "123 is not a valid string"
    }
  ]
}
```

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": null,
  "errors": [
    {
      "code": "invalid_field",
      "message": "not_a_field is not a valid field"
    }
  ]
}
```

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": null,
  "errors": [
    {
      "code": "invalid_operator",
      "message": "Composite operators must be of type AND or OR "
    }
  ]
}
```

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": null,
  "errors": [
    {
      "code": "invalid_operator",
      "message": "email does not support operator: >"
    }
  ]
}
```

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": null,
  "errors": [
    {
      "code": "invalid_value",
      "message": "Number of elements in composite query is greater than 15, please try again with a smaller list"
    }
  ]
}
```

### Merged Contacts

Contacts that have been [merged](/docs/references/2.3/rest-api/contacts/merge-contact) are excluded from search results. If a contact was recently merged into another, it will no longer appear in queries filtered by `updated_at` or any other field. Only the target contact from the merge remains searchable.

### Accepted Fields

Searching for Timestamp Fields
All timestamp fields (`created_at`, `updated_at` etc.) are indexed as Dates for Contact Search queries; Datetime queries are not currently supported. This means you can only query for timestamp fields by day - not hour, minute or second.\n\nFor example, if you search for all Contacts with a created_at value greater (`>`) than `1577869200` (the Unix timestamp for January 1st, 2020 9:00 AM), that will be interpreted as `1577836800` (January 1st, 2020 12:00 AM). The search results will then include Contacts created from January 2nd, 2020 12:00 AM onwards.\n\nIf you'd like to get contacts created on January 1st, 2020 you should search with a created_at value equal (`=`) to `1577836800` (January 1st, 2020 12:00 AM).\n\nThis behaviour applies only to timestamps used in search queries. The search results will still contain the full Unix timestamp and be sorted accordingly.

Searching for Fields with a null Value
When searching for fields that have no value, note that the data type (i.e. String, etc.) isn't required to be adhered to. Rather you just need to add the null operator, without any quotes or any other decorators.\n\nFor example, this search will return no results:\n\n`\n{\n    \"query\": {\n        \"field\": \"email\",\n        \"operator\": \"=\",\n        \"value\": \"null\"\n    }\n }\n`\n\nBut this search will return all of your contacts with no email address:\n\n`\n{\n    \"query\": {\n        \"field\": \"email\",\n        \"operator\": \"=\",\n        \"value\": null\n    }\n }\n`

Most key listed as part of the [Contacts Model](/docs/references/2.3/rest-api/contacts/contacts-model) are searchable, whether writeable or not. The value you search for has to match the accepted type, otherwise the query will fail (ie. as `created_at` accepts a date, the `value` cannot be a string such as `"foorbar"`).

| Field | Type |
|  --- | --- |
| id | String |
| role | StringAccepts user or lead |
| name | String |
| avatar | String |
| owner_id | Integer |
| email | String |
| phone | String |
| external_id | String |
| created_at | Date (Unix timestamp in seconds) |
| signed_up_at | Date (Unix timestamp in seconds) |
| updated_at | Date (Unix timestamp in seconds) |
| last_seen_at | Date (Unix timestamp in seconds) |
| last_contacted_at | Date (Unix timestamp in seconds) |
| last_replied_at | Date (Unix timestamp in seconds) |
| last_email_opened_at | Date (Unix timestamp in seconds) |
| last_email_clicked_at | Date (Unix timestamp in seconds) |
| language_override | String |
| browser | String |
| browser_language | String |
| os | String |
| location.country | String |
| location.region | String |
| location.city | String |
| unsubscribed_from_emails | Boolean |
| marked_email_as_spam | Boolean |
| has_hard_bounced | Boolean |
| ios_last_seen_at | Date (Unix timestamp in seconds) |
| ios_app_version | String |
| ios_device | String |
| ios_app_device | String |
| ios_os_version | String |
| ios_app_name | String |
| ios_sdk_version | String |
| android_last_seen_at | Date (Unix timestamp in seconds) |
| android_app_version | String |
| android_device | String |
| android_app_name | String |
| andoid_sdk_version | String |
| segment_id | String |
| tag_id | String |
| custom_attributes.{attribute_name} | String |


### Accepted Operators

The table below shows the operators you can use to define how you want to search for the value.  The operator should be put in as a string (`"="`). The operator has to be compatible with the field's type  (eg. you cannot search with `>` for a given string value as it's only compatible for integer's and dates).

| Operator | Valid Types | Description |
|  --- | --- | --- |
| = | All | Equals |
| != | All | Doesn't Equal |
| IN | All | InShortcut for `OR` queriesValues must be in Array |
| NIN | All | Not InShortcut for `OR !` queriesValues must be in Array |
| > | IntegerDate (Unix timestamp in seconds) | Greater than |
| < | IntegerDate (Unix timestamp in seconds) | Lower than |
| ~ | String | Contains |
| !~ | String | Doesn't Contain |
| ^ | String | Starts With |
| $ | String | Ends With |


### Response

A JSON payload with a list of [Contact model](/docs/references/2.3/rest-api/contacts/contacts-model) that match the search query, with a `total_count` integer saying how many models have been returned.