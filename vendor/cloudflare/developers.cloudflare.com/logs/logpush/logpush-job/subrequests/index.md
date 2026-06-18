---
title: Subrequests
description: Control how Worker subrequests appear in Logpush.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Subrequests

When a Cloudflare Worker intercepts a visitor request, it can dispatch additional outbound fetch calls called subrequests. By default, each subrequest generates its own log entry in Logpush, resulting in multiple log lines for a single visitor-facing request.

Each request stage can be identified by its log fields. You can also opt in to subrequest merging, which aggregates subrequest log entries into their parent request so that your Logpush job delivers one log line per visitor request.

## Identifying log types

Each request stage generates its own log line. You can distinguish between them using the following fields.

_Visitor request_ — the original request from the visitor to your zone:

* ClientRequestSource == "eyeball"

_Origin request_ — a request forwarded from Cloudflare to your origin server:

* OriginIP != "", or
* OriginResponseStatus != 0 (for example, OriginResponseStatus == 200)

_Worker subrequest_ — a fetch call dispatched by a Worker:

* WorkerSubrequest == true
* ClientRequestSource == "edgeWorkerFetch"

To correlate a subrequest log with its parent, match the subrequest's ParentRayID field to the RayID of the parent request.

## Subrequest merging

Subrequest merging is an opt-in feature on the http\_requests dataset. With subrequest merging enabled, your Logpush job delivers one log line per visitor request, with subrequest data embedded as a nested array field on the parent log record.

## Merging Eligibility

* A maximum of 50 subrequests are merged per parent request. Subrequests beyond this limit are passed through unmodified as individual log entries.
* Subrequests must complete within 5 minutes of the visitor request. Subrequests that exceed this window are passed through unmodified.

Note

Subrequest merging is being gradually rolled out and is not yet available on all zones. Contact your account team for concerns or to ensure it is enabled for your zone.

## New log field

When subrequest merging is enabled, a `Subrequests` field (`array<object>`) is added to each parent request log record. Each element in the array contains the standard http\_requests fields for that subrequest.

The array only includes subrequests that qualify for merging based on the eligibility criteria above. Subrequests that do not qualify appear as separate log entries. The field will be empty (\[\]) if the request has no subrequests, or none qualify.

## Enable subrequest merging

Subrequest merging can be enabled via API or the Cloudflare dashboard.

### Dashboard

1. In the Cloudflare dashboard, go to the Logpush page at the domain (also known as zone) level.[ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Select Create a Logpush job or select Edit next to an existing http\_requests job.
3. Under Advanced Options, enable the Subrequest merging toggle.
4. Select Save.

### API

1. To enable subrequest merging on a new job, set "merge\_subrequests": true in the request body.

### Required API token permissions

At least one of the following token permissions is required:

* Logs Write

**Create Logpush job**

Terminal window

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "<DOMAIN_NAME>",

    "destination_conf": "s3://<BUCKET_PATH>?region=us-east-1",

    "dataset": "http_requests",

    "output_options": {

      "field_names": [

        "ClientIP",

        "ClientRequestHost",

        "ClientRequestMethod",

        "ClientRequestURI",

        "EdgeStartTimestamp",

        "EdgeResponseStatus",

        "RayID",

        "ParentRayID",

        "Subrequests"

      ],

      "timestamp_format": "rfc3339"

    },

    "merge_subrequests": true,

    "enabled": true

  }'


```

**To enable subrequest merging on an existing job:**

Schema change

Enabling subrequest merging changes your log schema by adding the Subrequests array field. If you have downstream pipelines or queries that depend on a fixed schema, update them before enabling this feature.

**Update Logpush job**

Terminal window

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logpush/jobs/$JOB_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "merge_subrequests": true

  }'


```

## Example log output

Without subrequest merging, a Worker that makes one subrequest produces two separate log records:

```

{"RayID":"abc123","ParentRayID":"","ClientIP":"203.0.113.1","EdgeResponseStatus":200, ...}

{"RayID":"def456","ParentRayID":"abc123","ClientIP":"203.0.113.1","EdgeResponseStatus":200, ...}


```

With subrequest merging enabled, a single record is produced with the subrequest nested inside:

```

{

  "RayID": "abc123",

  "ParentRayID": "",

  "ClientIP": "203.0.113.1",

  "EdgeResponseStatus": 200,

  "Subrequests": [

    {

      "RayID": "def456",

      "ClientIP": "203.0.113.1",

      "EdgeResponseStatus": 200

    }

  ]

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/subrequests/#page","headline":"Subrequests · Cloudflare Logs docs","description":"Control how Worker subrequests appear in Logpush.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/subrequests/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/subrequests/","name":"Subrequests"}}]}
```
