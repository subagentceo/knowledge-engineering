# Segmentation Query Language Reference

> \[!WARNING]
>
> The [Segmentation v1 API](/docs/sendgrid/api-reference/segmenting-contacts/get-segment-by-id) was deprecated on December 31, 2022. Following deprecation, all segments created in the Marketing Campaigns user interface began using the [Segmentation v2 API](/docs/sendgrid/api-reference/segmenting-contacts-v2).
>
> To enable manual migration and data retrieval, the `GET` and `DELETE` v1 API endpoints will remain available. The `POST` (create) and `PATCH` (update) v1 endpoints were removed on January 31, 2023 because it is no longer possible to create new v1 segments or modify existing ones. See our [Segmentation v1 to v2 upgrade instructions](/docs/sendgrid/for-developers/sending-email/getting-started-the-marketing-campaigns-v2-segmentation-api#upgrade-a-v1-segment-to-v2) to manually migrate your segments to the v2 API.

## Data Types

### Numeric

Any numeric type that can be an integer or float.

**Integer**: \[1-9]\[0-9]\*\
**Float**: \[0-9]+.\[0-9]+

### String

A set of characters delimited by double or single quotes.

#### Escaping

Escaping must be done for the character used as the delimiter if it is found within the string. The escape character is the backslash, `\`, which must also be escaped with a preceding `\`.

##### Escaping example

```bash
'Hello, World! It\'s a beautiful day'
```

#### Wildcards

When using the `LIKE` or `NOT LIKE` operators, The percentage symbol, `%`, will be interpreted as a wildcard character. To escape this character and not treat it as a wildcard, a second `%` should be used.

##### Wildcard example

```bash
"email LIKE '%gmail.com'"
```

### DateTime

A timestamp whose literal value is formatted as a string in ISO 8601 format: `YYYY-MM-DDTHH:mm:SSZ(-)HH:mm`

### Interval

A time interval with an integral scalar value and some unit of time, which can be one of the following: second, minute, hour, day, month, or year.

#### Interval example

```bash
"10 day"
```

### Boolean

Boolean values are true or false.

### Null

Null is a special type that represents a lack of a value.

## Operators

### Logical

| Operator | Associativity | Operands   |
| -------- | ------------- | ---------- |
| AND      | Left          | 2          |
| OR       | Left          | 2          |
| NOT      | Right         | 2 (binary) |
| NOT      | Right         | 1 (unary)  |

### Arithmetic

Precedence from low to high:

| Operator | Associativity | Operands   | Supported Types                                                       |
| -------- | ------------- | ---------- | --------------------------------------------------------------------- |
| -        | Left          | 2 (binary) | Numeric - Numeric DateTime - Interval                                 |
| +        | Left          | 2          | Numeric + Numeric DateTime + Interval String + String (concatenation) |
| /        | Left          | 2          | Numeric / Numeric                                                     |
| \*       | Left          | 2          | Numeric \* Numeric                                                    |
| %        | Left          | 2          | Numeric % Numeric (modulo)                                            |
| -        | Left          | 1 (unary)  | - Numeric                                                             |

### Comparison

| Operator       | Supported Types (T represents any type)                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| =              | T = T                                                                                                                         |
| !=             | T != T                                                                                                                        |
| \<             | Numeric \< Numeric DateTime \< DateTime String \< String                                                                      |
| `>`            | Numeric \< Numeric DateTime \< DateTime String \< String                                                                      |
| \&lt;=         | Numeric \< Numeric DateTime \< DateTime String \< String                                                                      |
| >=             | Numeric \< Numeric DateTime \< DateTime String \< String                                                                      |
| LIKE/ NOT LIKE | String (NOT) LIKE String                                                                                                      |
| IS (NOT)       | T is (NOT) NULL                                                                                                               |
| (NOT) IN       | T IN (T)                                                                                                                      |
| (NOT) BETWEEN  | Numeric (NOT) BETWEEN Numeric AND Numeric DateTime (NOT) BETWEEN DateTime AND DateTime String (NOT) BETWEEN String AND String |

## Identifiers

Identifiers are named things within a given query. These include both function names and field/column names. Identifiers cannot be a keyword and must only allow the characters: `[a-zA-Z_]+.`.

> \[!NOTE]
>
> Identifiers that do not meet the previous format may still be used. However, they must be encapsulated within backticks. I.E. `000supercoolid`

## Functions

Functions can be invoked with or without parameters by providing the function name—remember, function names are identifiers—followed by a list of comma separated arguments enclosed in parentheses.

### Function called with arguments example

```bash
MY_FUNCTION(a,b,c)
```

### Well Defined Functions

These are functions that should be used consistently across consumers of the parser. Whether or not your implementation actually supports them is up to you.

#### CONTAINS()

```bash
CONTAINS(array_or_map, value_or_key)
```

Contains should return a Boolean indicating the presence of a value in an array or map. When used with an array, true should be returned when the array holds the given value. When used with a map, true should be returned when the map has an element with the given key.

#### CONCAT()

```bash
CONCAT(string_one,string_two)
```

Concat takes two strings, combines them as a single string in the order they are passed in, and returns the result.

#### LENGTH()

```bash
LENGTH(string)
```

Length takes a single string and returns the number of characters in the string.

#### LOWER()

```bash
LOWER(string)
```

Lower returns a lowercase version of the given string.

#### NOW()

```bash
NOW()
```

Returns the current date and time.

## Fields

A number of fields are available on every contact. These include the strings:

* `alternate_emails`
* `address_line_1`
* `address_line_2`
* `city`
* `contact_id`
* `country`
* `created_at`
* `email`
* `phone_number_id`
* `external_id`
* `anonymous_id`
* `email_domains`
* `event_data`
* `event_source`
* `event_timestamp`
* `event_type`
* `first_name`
* `list_ids`
* `last_name`
* `postal_code`
* `state_province_region`
* `updated_at`

> \[!NOTE]
>
> In the future, the address fields may be used with a third-party service to populate a `location` type field when contacts are added or updated. In addition, a contact's `alternate_emails` field represents a set of strings.

## Examples and Use Cases

### A query for getting all gmail users

```json
{
  "name": "All Gmail Users",
  "query_dsl": "email LIKE '%gmail.com'"
}
```

### A query for getting contacts in specific zip codes

```json
{
  "name": "My Favorite Zip Codes",
  "query_dsl": "postal_code IN ('90124', '90125', '90126')"
}
```

### A query for getting contacts NOT in specific zip codes

```json
{
  "name": "My Least Favorite Zip Codes",
  "query_dsl": "postal_code NOT IN ('90124', '90125', '90126')"
}
```

### A query showing how to use lowercase text

```json
{
  "name": "Everyone named Bob, BOB or bob",
  "query_dsl": "lower(first_name) = 'bob'"
}
```

### A query for contacts that received any email in the last 10 days

```json
{
  "name": "All Delivered in Last 10 days",
  "query_dsl": "(event_source = 'mail' AND event_type = 'delivered' AND event_timestamp >= (NOW() - interval 10 day))"
}
```

### A query for contacts that received any email between two dates

```json
{
  "name": "All Delivered in Last 10 days",
  "query_dsl": "(event_source = 'mail' AND event_type = 'delivered' AND event_timestamp BETWEEN TIMESTAMP '2019-08-07T18:00:00Z' AND TIMESTAMP '2019-08-08T18:00:00Z')"
}
```

### A query for getting contacts by external\_id

```json
{
"name": "My External ID Contacts",
"query_dsl": "external_id LIKE '123%'"
}
```
