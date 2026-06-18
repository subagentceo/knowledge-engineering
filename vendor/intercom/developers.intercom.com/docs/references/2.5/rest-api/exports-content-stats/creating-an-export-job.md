# Creating an export job

To create your export job, you need to send a `POST` request to the export endpoint `https://api.intercom.io/export/content/data`.

This endpoint exports message delivery and engagement data for outbound content (Emails, Posts, Custom Bots, Surveys, Tours, Series, and more). The exported data includes who received each message, when they received it, and how they engaged with it (opens, clicks, replies, completions, dismissals, unsubscribes, and bounces). It does not export raw message or conversation content. See [Downloading the Data](/docs/references/2.5/rest-api/exports-content-stats/downloading-the-data) for full CSV schemas.

The only parameters you need to provide are the range of dates that you want exported.

| Parameter | Required? | Description |
|  --- | --- | --- |
| created_at_after | Yes | The start date that you request data for. It must be formatted as a unix timestamp. |
| created_at_before | Yes | The end date that you request data for. It must be formatted as a unix timestamp. |


> 🚧 Limit of one active job
You can only have one active job per workspace. You will receive a HTTP status code of 429 with the message `Exceeded rate limit of 1 pending message data export jobs` if you attempt to create a second concurrent job.


> ❗️ Updated_at not included
It should be noted that the timeframe only includes messages **sent** during the time period and not messages that were only updated during this period. For example, if a message was updated yesterday but sent two days ago, you would need to set the created_at_after date before the message was sent to include that in your retrieval job.


Date ranges are inclusive
Requesting data for 2018-06-01 until 2018-06-30 will get all data for those days **including those specified** - e.g. 2018-06-01 00:00:00 until 2018-06-30 23:59:99.

## Example Request

### cURL

```curl
curl https://api.intercom.io/export/content/data \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d '\n{\n  \"created_at_after\": 1527811200,\n  \"created_at_before\": 1530316800\n}'
```

## Example Response

### HTTP

```http
HTTP/1.1 200 OK\n{\n  \"job_identifier\":\"v5xsp8c19ji0s82\",\n  \"status\":\"pending\",\n  \"download_expires_at\": \"\",\n  \"download_url\": \"\",\n}
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
        "message": "created_at_after is greater than created_at_before"
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
        "code": "bad_request",
        "message": "'created_at_before' is a required parameter"
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
        "code": "bad_request",
        "message": "bad 'random_param' parameter"
      }
  ]
}
```

## Returns

See [Export Job Model](/docs/references/2.5/rest-api/exports-content-stats/export-job-model)