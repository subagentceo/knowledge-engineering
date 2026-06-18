# Retrieve the exported data

When a job has a status of `complete`, and thus a filled `download_url`, you can download your data by hitting that provided URL, formatted like so: `https://api.intercom.io/download/content/data/xyz1234`.

Your exported message data will be streamed continuously back down to you in a gzipped CSV format.

Octet header required
You will have to specify the header `Accept: application/octet-stream` when hitting this endpoint.

## Example Request

```curl
curl https://api.intercom.io/download/content/data/xyz1234 \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/octet-stream'\n
```

```curl
curl --compressed https://api.intercom.io/download/messages/data/xyz1234 \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/octet-stream'
```

## Example Errors

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"errors\": [\n      {\n        \"code\": \"not_found\",\n        \"message\": \"The requested resource does not exist.\"\n      }\n  ]\n}\n
```

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"errors\": [\n      {\n        \"code\": \"not_found\",\n        \"message\": \"Object not found.\"\n      }\n  ]\n}\n
```

### Response

This will return a gzipped folder containing multiple CSVs, one for each message statistic that you will need to unzip. If a statistic has no records then it will not be included in the zipped file.

## receipts_YYYYMMDD_hhmmss.csv

| Field | Type | Description |
|  --- | --- | --- |
| user_id | string | The user_id of the user who was sent the message. |
| user_external_id | string | The external_user_id of the user who was sent the message |
| company_id | string | The company ID of the user in relation to the message that was sent. Will return `-1` if no company is present. |
| email | string | The users email who was sent the message. |
| name | string | The full name of the user receiving the message |
| ruleset_id | string | The id of the message. |
| content_id | string | The specific content that was received. In an A/B test each version has its own Content ID. |
| content_type | string | Email, Chat, Post etc. |
| content_title | string | The title of the content you see in your Intercom workspace. |
| ruleset_version_id | string | As you edit content we record new versions. This ID can help you determine which version of a piece of content that was received. |
| receipt_id | string | ID for this receipt. Will be included with any related stats in other files to identify this specific delivery of a message. |
| received_at | timestamp | Timestamp for when the receipt was recorded. |
| series_id | string | The id of the series that this content is part of. Will return -1 if not part of a series. |
| series_title | string | The title of the series that this content is part of. |
| node_id | string | The id of the series node that this ruleset is associated with. Each block in a series has a corresponding node_id. |
| first_reply | timestamp | The first time a user replied to this message if the content was able to receive replies. |
| first_completion | timestamp | The first time a user completed this message if the content was able to be completed e.g. Tours, Surveys. |
| first_series_completion | timestamp | The first time the series this message was a part of was completed by the user. |
| first_series_disengagement | timestamp | The first time the series this message was a part of was disengaged by the user. |
| first_series_exit | timestamp | The first time the series this message was a part of was exited by the user. |
| first_goal_success | timestamp | The first time the user met this messages associated goal if one exists. |
| first_open | timestamp | The first time the user opened this message. |
| first_click | timestamp | The first time the series the user clicked on a link within this message. |
| first_dismisall | timestamp | The first time the series the user dismissed this message. |
| first_unsubscribe | timestamp | The first time the user unsubscribed from this message. |
| first_hard_bounce | timestamp | The first time this message hard bounced for this user |


## click_YYYYMMDD_hhmmss.csv

A click is recorded whenever a user, lead or visitor clicks a link in a piece of content. Here a link could be a regular text link, a button or an image that links somewhere.

Link this file with the receipts file to track and analyze multiple clicks within the same message.

| Field | Type | Description |
|  --- | --- | --- |
| receipt_id | string | ID of the receipt linked to this stat |
| clicked_at | timestamp | Timestamp for when the link, image or button was clicked. |