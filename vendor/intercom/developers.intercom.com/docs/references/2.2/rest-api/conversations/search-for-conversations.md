# Search for conversations

You can search for multiple conversations by the value of their attributes in order to fetch exactly which ones you want.

To search for conversations, you need to send a POST request to `https://api.intercom.io/conversations/search`. This will accept a `query` object in the body which will define your filters in order to search for conversations.

### Search with single filter

You should provide the following parameters within a `query` object:

| Parameter | Required? | Description |
|  --- | --- | --- |
| field | Yes | The fields associated to a conversation that you can search for. [See all accepted fields](#section-accepted-fields). |
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
You can nest these filters in order to get even more granular insights that pinpoint exactly what you need. Example: (1 OR 2) AND (3 OR 4).\There are some limitations to the amount of multiple's there can be:\_ There's a limit of max 2 nested filters_ There's a limit of max 15 filters for each `AND` or `OR` group

## Example Request (Single Filter)

### Request

```json
{ \"query\":  {    \"field\": \"updated_at\",    \"operator\": \">\",    \"value\": 1560436784  }}
```

## Example Request (Multiple Filters)

```json
{ \"query\":  {    \"operator\": \"AND\",    \"value\": [      {        \"field\": \"statistics.time_to_admin_reply\",        \"operator\": \">\",        \"value\": 1000      },       {        \"field\": \"admin_assignee_id\",        \"operator\": \"=\",        \"value\": \"1627383\"      },      {        \"field\": \"open\",        \"operator\": \"=\",        \"value\": true      }    ]  }}
```

```json
{ \"query\":  {    \"field\": \"tags\",    \"operator\": \"IN\",    \"value\": [\"feature-request\", \"bug\", \"confusion\"]  }}
```

## Example Request (Nested Filters)

### Request

```json
{ \"query\":  {    \"operator\": \"AND\",    \"value\": [      {        \"operator\": \"OR\",        \"value\": [          {            \"field\": \"updated_at\",            \"operator\": \">\",            \"value\": 1560436650          },           {            \"field\": \"conversation_rating.rating\",            \"operator\": \"=\",            \"value\": 1          }        ]      },      {        \"operator\": \"OR\",        \"value\": [          {            \"field\": \"updated_at\",            \"operator\": \">\",            \"value\": 1560436650          },           {            \"field\": \"conversation_rating.rating\",            \"operator\": \"=\",            \"value\": 2          }        ]      }    ]  }}
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
      "message": "Number of elements in composite query is greater than 15, please try again with a smaller list"
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

### Accepted Fields

Most keys listed in [the conversation model](/docs/references/2.2/rest-api/conversations/conversation-model) is searchable, whether writeable or not. The value you search for has to match the accepted type, otherwise the query will fail (ie. as `created_at` accepts a date, the `value` cannot be a string such as `"foorbar"`). The `source.body` field is unique as the search will not be performed against the entire value, but instead against every element of the value separately. For example, when searching for a conversation with a `"I need support"` body - the query should contain a `=` operator with the value `"support"` for such conversation to be returned. A query with a `=` operator and a `"need support"` value will not yield a result.

| Field | Type |
|  --- | --- |
| id | String |
| created_at | Date (UNIX timestamp) |
| updated_at | Date (UNIX timestamp) |
| source.type | String |
| source.id | String |
| source.delivered_as | String |
| source.subject | String |
| source.body | String |
| source.author.id | String |
| source.author.type | String |
| source.author.name | String |
| source.author.email | String |
| source.url | String |
| contact_ids | String |
| teammate_ids | String |
| admin_assignee_id | Integer |
| team_assignee_id | Integer |
| channel_initiated | String  Accepted fields are `conversation`, `push`, `facebook`, `twitter` and `email`. |
| open | Boolena |
| read | Boolen |
| state | String |
| waiting_since | Date (UNIX timestamp) |
| snoozed_until | Date (UNIX timestamp) |
| tag_ids | String |
| priority | String |
| statistics.time_to_assignment | Integer |
| statistics.time_to_admin_reply | Integer |
| statistics.time_to_first_close | Integer |
| statistics.time_to_last_close | Integer |
| statistics.median_time_to_reply | Integer |
| statistics.first_contact_reply_at | Date (UNIX timestamp) |
| statistics.first_assignment_at | Date (UNIX timestamp) |
| statistics.first_admin_reply_at | Date (UNIX timestamp) |
| statistics.first_close_at | Date (UNIX timestamp) |
| statistics.last_assignment_at | Date (UNIX timestamp) |
| statistics.last_assignment_admin_reply_at | Date (UNIX timestamp) |
| statistics.last_contact_reply_at | Date (UNIX timestamp) |
| statistics.last_admin_reply_at | Date (UNIX timestamp) |
| statistics.last_close_at | Date (UNIX timestamp) |
| statistics.last_closed_by_id | String |
| statistics.count_reopens | Integer |
| statistics.count_assignments | Integer |
| statistics.count_conversation_parts | Integer |
| conversation_rating.requested_at | Date (UNIX timestamp) |
| conversation_rating.replied_at | Date (UNIX timestamp) |
| conversation_rating.score | Integer |
| conversation_rating.remark | String |
| conversation_rating.contact_id | String |
| conversation_rating.admin_d | String |


### Accepted Operators

The table below shows the operators you can use to define how you want to search for the value.  The operator should be put in as a string (`"="`). The operator has to be compatible with the field's type  (eg. you cannot search with `>` for a given string value as it's only compatible for integer's and dates).

| Operator | Valid Types | Description |
|  --- | --- | --- |
| = | All | Equals |
| != | All | Doesn't Equal |
| IN | All | In  Shortcut for `OR` queries  Values most be in Array |
| NIN | All | Not In  Shortcut for `OR !` queries  Values must be in Array |
| > | Integer  Date (UNIX Timestamp) | Greater (or equal) than |
| < | Integer  Date (UNIX Timestamp) | Lower (or equal) than |
| ~ | String | Contains |
| !~ | String | Doesn't Contain |
| ^ | String | Starts With |
| $ | String | Ends With |


### Response

A JSON payload with a list of [Conversations Model](/docs/references/2.2/rest-api/conversations/conversation-model) that match the search query, with a `total_count` integer saying how many models have been returned.