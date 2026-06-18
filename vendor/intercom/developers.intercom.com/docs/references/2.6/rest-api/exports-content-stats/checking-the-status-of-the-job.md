# Retrieve a job status

You can view the status of your job by sending a `GET` request to the URL
`https://api.intercom.io/export/content/data/{job_identifier}` - the `{job_identifier}` is the value returned in the response when you first created the export job. More on it can be seen in the [Export Job Model](/docs/references/2.6/rest-api/exports-content-stats/export-job-model).

> 🚧 Jobs expire after two days
All jobs that have completed processing (and are thus available to download from the provided URL) will have an expiry limit of two days from when the export ob completed. After this, the data will no longer be available.


> ❗️ Why does my job have a failed status?
If a job has failed, then the HTTP Response Code will show as a 504 (Timeout). This is because this type of error commonly comes from **jobs taking over 12 hours to process** and thus timing out.


## Example Request

```curl
curl https://api.intercom.io/export/content/data/v5xsp8c19ji0s82 \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>'\n-H 'Accept: application/json'
```

## Example Responses

```http
HTTP/1.1 200 OK
{
  "job_identifier":"v5xsp8c19ji0s82",
  "status":"pending",
  "download_expires_at": "",
  "download_url": "",
}
```

```http
HTTP/1.1 200 OK
{
  "job_identifier":"v5xsp8c19ji0s82",
  "status":"complete",
  "download_expires_at": "1530545400",
  "download_url": "https://api.intercom.io/download/messages/data/message-data-export.nsayjlto.5973fb2a-2617-45x9-9f30-60a27b1480f6.csv",
}
```

```http
HTTP/1.1 504 TIMEOUT
{
  "job_identifier":"v5xsp8c19ji0s82",
  "status":"failed",
  "download_expires_at": "",
  "download_url": "",
}
```

## Example Errors

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"000l13h1qd7ktp11tidg\",\n  \"errors\": [\n      {\n        \"code\": \"not_found\",\n        \"message\": \"Export job not found for identifier: mqj3mpa4has8\"\n      }\n  ]\n}\n
```

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"errors\": [\n      {\n        \"code\": \"not_found\",\n        \"message\": \"The requested resource does not exist; check your path and try again\"\n      }\n  ]\n}
```

### Response

This will return a [Export Job Model](/docs/references/2.6/rest-api/exports-content-stats/export-job-model).