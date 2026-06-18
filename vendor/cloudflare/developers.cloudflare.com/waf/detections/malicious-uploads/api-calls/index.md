---
title: Common API calls
description: Manage malicious upload detection using the Cloudflare API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Common API calls

The following examples address common scenarios of using the Cloudflare API to manage and configure WAF content scanning.

If you are using Terraform, refer to [Terraform configuration examples](https://developers.cloudflare.com/waf/detections/malicious-uploads/terraform-examples/).

## General operations

The following API examples cover basic operations such as enabling and disabling WAF content scanning.

### Enable WAF content scanning

To enable content scanning, use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Enable Content Scanning

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/enable" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Disable WAF content scanning

To disable content scanning, use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Disable Content Scanning

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/disable" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Get WAF content scanning status

To obtain the current status of the content scanning feature, use a `GET` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`

Get Content Scanning Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/settings" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## Custom expression operations

The following API examples cover operations on custom scan expressions for content scanning.

### Get existing custom scan expressions

To get a list of existing custom scan expressions, use a `GET` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`

List Existing Custom Scan Expressions

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "id": "<EXPRESSION_ID>",

      "payload": "lookup_json_string(http.request.body.raw, \"file\")"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

### Add a custom scan expression

Use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Add Custom Scan Expressions

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '[

    {

        "payload": "lookup_json_string(http.request.body.raw, \"file\")"

    }

  ]'


```

### Delete a custom scan expression

Use a `DELETE` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Delete a Custom Scan Expression

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads/$EXPRESSION_ID" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/malicious-uploads/api-calls/#page","headline":"Common API calls for content scanning · Cloudflare Web Application Firewall (WAF) docs","description":"Manage malicious upload detection using the Cloudflare API.","url":"https://developers.cloudflare.com/waf/detections/malicious-uploads/api-calls/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/malicious-uploads/","name":"Malicious uploads detection"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/malicious-uploads/api-calls/","name":"Common API calls"}}]}
```
