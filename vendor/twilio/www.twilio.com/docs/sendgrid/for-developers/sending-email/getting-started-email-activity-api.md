# Getting Started with the Email Activity Feed API

The Email Activity API gives you access to query all of your stored messages, to query individual messages, and to download a CSV with data about the stored messages.

In order to gain access to the Email Activity Feed API, you must [purchase additional email activity history](https://sendgrid.com/solutions/add-ons/30-days-additional-email-activity-history/). Once purchased, you must also [update your existing API key(s)](/docs/sendgrid/ui/account-and-settings/api-keys#editing-an-api-key) to have Email Activity access or [create a new API key](/docs/sendgrid/ui/account-and-settings/api-keys#creating-an-api-key) with Email Activity access.

## Getting started

Start with this basic query to the Email Activity Feed API (replace `<<your API key>>` with an API key from your account):

```bash
curl --request GET \
 --url 'https://api.sendgrid.com/v3/messages?limit=10' \
 --header 'authorization: Bearer <<your API key>>'
```

This returns a list of the 10 most recent emails you've sent. Next, check out some of the common use cases to narrow down your search.

### Encoding queries

All queries need to be [URL encoded](https://meyerweb.com/eric/tools/dencoder/) and have this format:

`query={query_type}="{query_content}"`

Encoded, this query would look like this:

`query=query_type%3D%22query_content%22`

## Queries for common use cases

Here are some queries for common use cases. For a full list of possible query types, see the [query reference](#query-reference).

### Filter by subject

Use this query to filter by email subject (replace `<<your API key>>` with an API key from your account, and replace `<<subject>>` with the subject you want to search):

```bash
curl --request GET \
 --url 'https://api.sendgrid.com/v3/messages?limit=10&query=subject%3D<<subject>>' \
 --header 'authorization: Bearer <<your API key>>'
```

Subject queries have this format:

`subject="This is a subject test"`

Encoded, this query would look like this:

`subject%3D%22This%20is%20a%20subject%20test%22`

### Filter by recipient email

Use this query to filter by a recipient's email: (replace `<<your API key>>` with an API key from your account, and replace `<<email>>` with the URL encoded recipients email):

```bash
curl --request GET \
 --url 'https://api.sendgrid.com/v3/messages?limit=10&query=to_email%3D%22<<email>>%22' \
 --header 'authorization: Bearer <<your API key>>'
```

Recipient email queries have this format:

`to_email="example@example.com"`

Encoded, this query would look like this:

`to_email%3D%22example%40example.com%22`

### Filter by undelivered emails

Use this query to filter by all undelivered emails: (replace `<<your API key>>` with an API key from your account):

```bash
curl --request GET \
 --url 'https://api.sendgrid.com/v3/messages?limit=10&query=status%3D%22not_delivered%22' \
 --header 'authorization: Bearer <<your API key>>'
```

Subject queries have this format:

`status="not_delivered"`

Encoded, this query would look like this:

`status%3D%22not_delivered%22`

## Creating compound queries

Use [operators and keywords](#keywords-and-operator-reference) to combine queries for a compound query. For example, you could filter for emails between a date range or you could filter for when a specific recipient's email is not delivered. Here are some common use cases:

### Filter by a recipient email that was undelivered

Use this query to filter by a recipient's email and by emails that are not delivered: (replace `<<your API key>>` with an API key from your account, and replace `<<email>>` with the URL encoded recipients email):

```bash
curl --request GET \
 --url 'https://api.sendgrid.com/v3/messages?limit=10&query=status%3D%22not_delivered%22%20AND%20to_email%3D%22<<email>>%22' \
 --header 'authorization: Bearer <<your API key>>'
```

### Filter by date range

Use this query to filter to emails between specific dates: (replace `<<your API key>>` with an API key from your account, and replace \{start\_date} and \{end\_date} with a URL encoded UTC date string in this format: `YYYY-MM-DD HH:mm:SS`. Encoded, this looks like this: `2018-02-01T00%3A00%3A00.000Z`)

```bash
curl --request GET \
 --url 'https://api.sendgrid.com/v3/messages?limit=10&query=last_event_time%20BETWEEN%20TIMESTAMP%20%22{start_date}%22%20AND%20TIMESTAMP%20%22{end_date}%22' \
 --header 'authorization: Bearer <<your API key>>'
```

### Filter by a recipient and a date range

Use this query to filter to emails by recipient and between specific dates: (replace `<<your API key>>` with an API key from your account, replace `<<start_date>>` and `<<end_date>>` with a URL encoded UTC date string in this format: `YYYY-MM-DD HH:mm:SS`, and replace `<<email>>` with the URL encoded recipient's email)

```bash
curl --request GET \
 --url 'https://api.sendgrid.com/v3/messages?limit=10&query=last_event_time%20BETWEEN%20TIMESTAMP%20%22{start_date}%22%20AND%20TIMESTAMP%20%22{end_date}%22AND%20to_email%3D%22<<email>>%22' \
 --header 'authorization: Bearer <<your API key>>'
```

## Keywords and Operator reference

There are several operators and keywords that you can use to build [Compound queries](#creating-compound-queries). Use these operators between query statements. If the character used as the delimiter is found within the string. The escape character is `\`, which must be escaped with a preceding `\`. All queries need to be URL encoded.

*This is a full list of accepted operators and keywords:*

* `=`
* `!=`
* `<`
* `>`
* `<=`
* `>=`
* `-` - to
* `+`
* `/`
* `*`
* `-` - subtraction
* `AND`
* `BETWEEN`
* `NOT BETWEEN`
* `CONTAINS`
* `DAY`
* `FALSE`
* `HOUR`
* `IN`
* `NOT IN`
* `INTERVAL`
* `IS`
* `IS NOT`
* `LIKE`
* `NOT LIKE`
* `MINUTE`
* `MONTH`
* `NOT`
* `NULL`
* `OR`
* `SECOND`
* `TIMESTAMP`
* `TRUE`
* `YEAR`

## Query reference

> \[!CAUTION]
>
> Categories and Unique Arguments will be stored as a "Not PII" field and may be used for counting or other operations as SendGrid runs its systems. These fields generally cannot be redacted or removed. You should take care not to place PII in this field. SendGrid does not treat this data as PII, and its value may be visible to SendGrid employees, stored long-term, and may continue to be stored after you've left SendGrid's platform.

This is a full list of basic query types and examples: (replace the data in quotes with the information you want to query, and then URL encode it)

| **Query**                                                                        | **Unencoded example** (put this one into the try it out query - it'll automatically encode it for you) | **Encoded example** (use this one in your code)              |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `msg_id`                                                                         | `msg_id="filter0307p1las1-16816-5A023E36-1.0"`                                                         | `msg_id%3D%22filter0307p1las1-16816-5A023E36-1.0%22`         |
| `from_email`                                                                     | `from_email="testing@sendgrid.net"`                                                                    | `from_email%3D%22testing%40sendgrid.net%22`                  |
| `subject`                                                                        | `subject="This is a subject test"`                                                                     | `subject%22This%20is%20a%20subject%20test%22`                |
| `to_email`                                                                       | `to_email="example@example.com"`                                                                       | `to_email%3D%22example%40example.com%22`                     |
| `status`                                                                         | `status="processing"`. Valid values include "delivered", "not\_delivered" and "processing"             | `status%3D%22processing%22`                                  |
| `template_id`                                                                    | `template_id="8f0d27bc-cf8f-42d3-b951-3990af7d0619"`                                                   | `template_id%3D%228f0d27bc-cf8f-42d3-b951-3990af7d0619%22`   |
| `marketing_campaign_name`                                                        | `marketing_campaign_name="example_campaign"`                                                           | `marketing_campaign_name%3D%22example_campaign%22`           |
| `marketing_campaign_id`                                                          | `marketing_campaign_id=1453849`                                                                        | `marketing_campaign_id%3D1453849`                            |
| `api_key_id`                                                                     | `api_key_id="RaRUTnX1QDGx3JpcAjJ4Aw"` (everything after the first "." and before the second "." )      | `api_key_id%3D%22RaRUTnX1QDGx3JpcAjJ4Aw%22`                  |
| `events`                                                                         | `(Contains(events,"processed"))`                                                                       | `%28Contains%28events%2C%22processed%22%29%29`               |
| `categories` - custom tags that you create                                       | `(Contains(categories,"categories_example"))`                                                          | `(Contains(categories%2C%22categories_example%22))`          |
| `unique_args` - custom tracking arguments that you can attach to SMTP API calls  | `(unique_args['argument']="definition")`                                                               | `(unique_args%5B%27argument%27%5D%3D%22definition%22)`       |
| `outbound_ip` - this is the SendGrid dedicated IP address used to send the email | `outbound_ip="4.77.777.77"`                                                                            | `outbound_ip%3D%224.77.777.77%22`                            |
| `last_event_time`                                                                | `last_event_time>TIMESTAMP "2017-11-07T23:13:58Z"`                                                     | `last_event_time%3ETIMESTAMP+%222017-11-07T23%3A13%3A58Z%22` |
| `clicks`                                                                         | `clicks=0`                                                                                             | `clicks%3D0`                                                 |
| `asm_group_id`                                                                   | `asm_group_id=1041`                                                                                    | `asm_group_id%3D1041`                                        |
| `teammate` - teammates username                                                  | `teammate="my_username"`                                                                               | `teammate%3D%22my_username%22`                               |

## Additional Resources

* [Email Activity Feed API Reference](/docs/sendgrid/api-reference/email-activity/filter-all-messages)
* [Email Activity Feed UI](/docs/sendgrid/ui/analytics-and-reporting/email-activity-feed/)
