---
title: Store decrypted matched payloads in logs
description: Store decrypted matched payloads in Logpush logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Store decrypted matched payloads in logs

You can include the encrypted matched payload in your [Logpush](https://developers.cloudflare.com/logs/logpush/) jobs by adding the **General** \> [**Metadata**](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/firewall%5Fevents/#metadata) field from the Firewall Events dataset to your job.

The payload, in its encrypted form, is available in the [encrypted\_matched\_data property](#structure-of-encrypted%5Fmatched%5Fdata-property-in-logpush) of the `Metadata` field.

However, you may want to decrypt the matched payload before storing the logs in your SIEM system of choice. Cloudflare provides a [sample Worker project ↗](https://github.com/cloudflare/matched-data-worker) on GitHub that does the following:

1. Behaves as an S3-compatible storage to receive logs from Logpush. These logs will contain encrypted matched payload data.
2. Decrypts matched payload data using your private key.
3. Sends the logs to the final log storage system with decrypted payload data.

You will need to make some changes to the sample project to push the logs containing decrypted payload data to your log storage system.

Refer to the Worker project's [README ↗](https://github.com/cloudflare/matched-data-worker/blob/main/README.md) for more information on configuring and deploying this Worker project.

## Structure of `encrypted_matched_data` property in Logpush

Matched payload information includes the specific string that triggered a rule, along with some text that appears immediately before and after the matched string.

Once you decrypt its value, the `encrypted_matched_data` property of the `Metadata` field in Logpush has a structure similar to the following:

```

{

  // for fields with only one match (such as URI or user agent fields):

  "<match_location>": {

    "before": "<text_before_match>",

    "content": "<matched_text>",

    "after": "<text_after_match>"

  },

  // for fields with possible multiple matches (such as form, header, or body fields):

  "<match_location>": [

    {

      "before": "<text_before_match_1>",

      "content": "<matched_text_1>",

      "after": "<text_after_match_1>"

    },

    {

      "before": "<text_before_match_2>",

      "content": "<matched_text_2>",

      "after": "<text_after_match_2>"

    }

  ]

}


```

The `before` and `after` properties are optional (there may be no content before/after the matched text) and will contain at most 15 bytes of content appearing before and after the match.

Below are a few examples of payload matches:

URI match

```

{

  "http.request.uri": {

    "before": "/admin",

    "content": "/.git/",

    "after": "config"

  }

}


```

Header value match

```

{

  "http.request.headers.values[3]": [

    { "content": "phar://", "after": "example" }

  ]

}


```

Raw body content match

```

{

  "http.request.body.raw": {

    "before": "NY>",

    "content": "<!ENTITY xxe SYSTEM \"file:///dev/random\">] > ",

    "after": "<foo>&xxe;</foo>"

  }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/decrypt-in-logs/#page","headline":"Store decrypted matched payloads in logs · Cloudflare Web Application Firewall (WAF) docs","description":"Store decrypted matched payloads in Logpush logs.","url":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/decrypt-in-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging","SIEM"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/payload-logging/","name":"Log the payload of matched rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/payload-logging/decrypt-in-logs/","name":"Store decrypted matched payloads in logs"}}]}
```
