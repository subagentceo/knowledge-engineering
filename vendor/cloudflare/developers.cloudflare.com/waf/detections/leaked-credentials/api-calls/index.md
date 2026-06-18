---
title: Common API calls
description: Manage leaked credentials detection rules and custom detections using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Common API calls

The following examples address common scenarios of using the Cloudflare API to manage and configure leaked credentials detection.

If you are using Terraform, refer to [Terraform configuration examples](https://developers.cloudflare.com/waf/detections/leaked-credentials/terraform-examples/).

## General operations

The following API examples cover basic operations such as enabling and disabling the leaked credentials detection.

### Turn on leaked credentials detection

To turn on leaked credentials detection, use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Set Leaked Credential Checks Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "enabled": true

  }'


```

### Turn off leaked credentials detection

To turn off leaked credentials detection, use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Set Leaked Credential Checks Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "enabled": false

  }'


```

### Get status of leaked credentials detection

To obtain the current status of the leaked credentials detection, use a `GET` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`

Get Leaked Credential Checks Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": {

    "enabled": true

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## Custom detection location operations

The following API examples cover operations on [custom detection locations](https://developers.cloudflare.com/waf/detections/leaked-credentials/#custom-detection-locations) for leaked credentials detection.

### Add a custom detection location

To add a custom detection location, use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Create Leaked Credential Checks Custom Detection

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "username": "lookup_json_string(http.request.body.raw, \"user\")",

    "password": "lookup_json_string(http.request.body.raw, \"secret\")"

  }'


```

### Get existing custom detection locations

To get a list of existing custom detection locations, use a `GET` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`

List Leaked Credential Checks Custom Detections

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "id": "<DETECTION_ID>",

      "username": "lookup_json_string(http.request.body.raw, \"user\")",

      "password": "lookup_json_string(http.request.body.raw, \"secret\")"

    }

    // (...)

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

### Delete a custom detection location

To delete a custom detection location, use a `DELETE` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Delete Leaked Credential Checks Custom Detection

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections/$DETECTION_ID" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/leaked-credentials/api-calls/#page","headline":"Common API calls · Cloudflare Web Application Firewall (WAF) docs","description":"Manage leaked credentials detection rules and custom detections using the API.","url":"https://developers.cloudflare.com/waf/detections/leaked-credentials/api-calls/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/leaked-credentials/","name":"Leaked credentials detection"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/leaked-credentials/api-calls/","name":"Common API calls"}}]}
```
