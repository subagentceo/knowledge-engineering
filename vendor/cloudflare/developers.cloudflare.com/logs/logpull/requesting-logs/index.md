---
title: Requesting logs
description: Use Logpull API endpoints to request log data.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Requesting logs

## Endpoints

The three endpoints supported by the Logpull API are:

* `GET /logs/received` \- returns HTTP request log data based on the parameters specified
* `GET /logs/received/fields` \- returns the list of all available log fields
* `GET /logs/rayids/{ray_id}` \- returns HTTP request log data matching `{ray_id}`

## Required authentication headers

The following headers are required for all endpoint calls:

* `X-Auth-Email` \- the Cloudflare account email address associated with the domain
* `X-Auth-Key` \- the Cloudflare API key

Alternatively, API tokens with Logs Read permissions can also be used for authentication:

* `Authorization: Bearer <API_TOKEN>`

## Parameters

The API expects endpoint parameters in the GET request query string. The following are example formats:

`logs/received`

Terminal window

```

https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/received?start=<unix|rfc3339>&end=<unix|rfc3339>[&count=<int>][&sample=<float>][&fields=<FIELDS>][&timestamps=<string>][&CVE-2021-44228=<boolean>]


```

`logs/rayids/{ray_id}`

Terminal window

```

https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/rayids/{ray_id}?[&fields=<FIELDS>][&timestamps=<string>]


```

The following table describes the parameters available:

| Parameter      | Description                                                                                                                                                                                                                                                                                             | Applies to                  | Required |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------- |
| start          | \- Inclusive \- Timestamp formatted as UNIX (UTC by definition), UNIX Nano, or rfc3339. To specify rfc3339 time zone in URL query parameters, the URL needs to be encoded, like this start=2024-08-07T07:00:00%2B08:00&end=2024-08-07T07:01:00%2B08:00. \- Must be no more than 7 days earlier than now | /logs/received              | Yes      |
| end            | \- Exclusive \- Same format as _start_ \- Must be at least 1 minute earlier than now and later than _start_                                                                                                                                                                                             | /logs/received              | Yes      |
| count          | \- Return up to that many records \- Do not include if returning all records \- Results are not sorted; therefore, different data for repeated requests is likely \- Applies to number of total records returned, not number of sampled records                                                         | /logs/received              | No       |
| sample         | \- Return only a sample of records \- Do not include if returning all records \- Value can range from 0.0 (exclusive) to 1.0 (inclusive) \- sample=0.1 means return 10% (1 in 10) of all records \- Results are random; therefore, different numbers of results for repeated requests are likely        | /logs/received              | No       |
| fields         | \- Comma-separated list of fields to return \- If empty, the default list is returned                                                                                                                                                                                                                   | /logs/received /logs/rayids | No       |
| timestamps     | \- Format in which timestamp fields will be returned \- Value options are: unixnano (default), unix, rfc3339 \- Timestamps returned as integers for unix and unixnano and as strings for rfc3339                                                                                                        | /logs/received /logs/rayids | No       |
| CVE-2021-44228 | \- Optional redaction for [CVE-2021-44228 ↗](https://www.cve.org/CVERecord?id=CVE-2021-44228). This option will replace every occurrence of the string ${ with x{.  For example: CVE-2021-44228=true                                                                                                    | /logs/received              | No       |

Note

The maximum time range from **start** to **end** cannot exceed 1 hour. Because **start** is inclusive and **end** is exclusive, to get all the data for every minute, starting at 10AM, the proper values are:

`start=2018-05-15T10:00:00Z&end=2018-05-15T10:01:00Z`, then `start=2018-05-15T10:01:00Z&end=2018-05-15T10:02:00Z` and so on.

The overlap will be handled correctly.

## Example API requests using cURL

`logs/received`

Terminal window

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/received?start=2017-07-18T22:00:00Z&end=2017-07-18T22:01:00Z&count=1&fields=ClientIP,ClientRequestHost,ClientRequestMethod,ClientRequestURI,EdgeEndTimestamp,EdgeResponseBytes,EdgeResponseStatus,EdgeStartTimestamp,RayID" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

`logs/rayids/{ray_id}`

Terminal window

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/rayids/{ray_id}}?timestamps=rfc3339" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Note

The IATA code returned as part of the **RayID** does not need to included in the request. For example, if you have a **RayID** such as `49ddb3e70e665831-DFW`, only include `49ddb3e70e665831` in your request.

## Fields

Unless specified in the **fields** parameter, the API returns a limited set of log fields. This default field set may change at any time. The list of all available fields is at:

`https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/received/fields`

The order in which fields are specified does not matter, and the order of fields in the response is not specified.

Using bash subshell and `jq`, you can download the logs with all available fields without manually copying and pasting the fields into the request. For example:

Terminal window

```

FIELDS=$(curl https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/received/fields \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

| jq '. | to_entries[] | .key' -r | paste -sd "," -)


curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/received?start=2017-07-18T22:00:00Z&end=2017-07-18T22:01:00Z&count=1&fields=$FIELDS" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Refer to [Download jq ↗](https://jqlang.github.io/jq/download/) for more information on obtaining and installing `jq`.

Refer to [HTTP request fields](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests) for the currently available fields.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpull/requesting-logs/#page","headline":"Requesting logs · Cloudflare Logs docs","description":"Use Logpull API endpoints to request log data.","url":"https://developers.cloudflare.com/logs/logpull/requesting-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpull/","name":"Logpull"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpull/requesting-logs/","name":"Requesting logs"}}]}
```
