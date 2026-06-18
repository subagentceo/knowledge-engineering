---
title: Enabling log retention
description: Turn log retention on or off for Logpull.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enabling log retention

By default, your HTTP request logs are not retained. When using the Logpull API for the first time, you will need to enable retention. You can also turn off retention at any time. Note that after retention is turned off, previously saved logs will be available until the retention period expires (refer to [Data retention period](https://developers.cloudflare.com/logs/logpull/understanding-the-basics/#data-retention-period)).

## Endpoints

There are two endpoints for managing log retention:

* `GET /logs/control/retention/flag` \- returns the current status of retention
* `POST /logs/control/retention/flag` \- turns retention on or off

Note

In the Linux examples below we use the optional [jq](https://developers.cloudflare.com/logs/logpush/parsing-json-log-data/) tool to help parse the response data.

To make a `POST` call, you must have zone-scoped `edit` permissions, such as Super Administrator, Administrator, or Log Share. Refer to [Make API calls](https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/) for more information.

## Example API requests using cURL

### Check log retention status

* [ Linux ](#tab-panel-9343)
* [ CMD ](#tab-panel-9344)
* [ PowerShell ](#tab-panel-9345)

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`
* `Logs Read`

Get log retention flag

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/control/retention/flag" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

curl.exe "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag" ^

--header "Authorization: Bearer <API_TOKEN>"


```

PowerShell

```

$uri = "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag"

$headers = @{"Authorization" = "Bearer <API_TOKEN>"}

Invoke-RestMethod -Uri $uri -Method Get -Headers $headers


```

If the zone has log retention [enabled](https://developers.cloudflare.com/logs/logpull/enabling-log-retention/#enabled-response) you get the value `true`, whereas a value of `false` is returned when it is [disabled](https://developers.cloudflare.com/logs/logpull/enabling-log-retention/#disabled-response).

### Turn on log retention

* [ Linux ](#tab-panel-9346)
* [ CMD ](#tab-panel-9347)
* [ PowerShell ](#tab-panel-9348)

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Update log retention flag

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/control/retention/flag" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "flag": true

  }'


```

```

curl.exe "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag" ^

--request POST ^

--header "Authorization: Bearer <API_TOKEN>" ^

--header "Content-Type: application/json" ^

--data "{""flag"": true}"


```

PowerShell

```

$uri = "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag"

$headers = @{"Authorization" = "Bearer <API_TOKEN>"}

$bodyFlag = @{flag = $true} | ConvertTo-Json

Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $bodyFlag -ContentType "application/json"


```

#### Enabled response

```

{

  "flag": true

}


```

### Turn off log retention

* [ Linux ](#tab-panel-9349)
* [ CMD ](#tab-panel-9350)
* [ PowerShell ](#tab-panel-9351)

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Update log retention flag

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/control/retention/flag" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "flag": false

  }'


```

```

curl.exe "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag" ^

--header "Authorization: Bearer <API_TOKEN>" ^

--header "Content-Type: application/json" ^

--data "{""flag"": false}"


```

PowerShell

```

$uri = "https://api.cloudflare.com/client/v4/zones/{zone_id}/logs/control/retention/flag"

$headers = @{"Authorization" = "Bearer <API_TOKEN>"}

$bodyFlag = @{flag = $false} | ConvertTo-Json

Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $bodyFlag -ContentType "application/json"


```

#### Disabled response

```

{

  "flag": false

}


```

## Audit

Turning log retention on or off is recorded in [Cloudflare Audit Logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/#access-audit-logs).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpull/enabling-log-retention/#page","headline":"Enabling log retention · Cloudflare Logs docs","description":"Turn log retention on or off for Logpull.","url":"https://developers.cloudflare.com/logs/logpull/enabling-log-retention/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpull/","name":"Logpull"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpull/enabling-log-retention/","name":"Enabling log retention"}}]}
```
