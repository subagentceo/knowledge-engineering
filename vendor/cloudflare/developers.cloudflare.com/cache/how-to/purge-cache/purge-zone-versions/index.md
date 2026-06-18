---
title: Purge zone versions via API
description: Purge cache for specific zone versions using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Purge zone versions via API

To purge zone versions via the Cloudflare API, follow these steps:

## Step 1: Retrieve the environment ID

First, retrieve your zone's environment ID by sending a request to the following API endpoint:

Terminal window

```

https://api.cloudflare.com/client/v4/zones/<zone_id>/environments


```

This API call will return a JSON response similar to the example below:

```

{

  "result": {

    "environments": [

      {

        "name": "Production",

        "ref": "12abcd3e45f678940a573f51834a54",

        "version": 0,

        "expression": "(cf.zone.name eq \"example.com\")",

        "locked_on_deployment": false,

        "position": {

          "before": "5d41402abc4b2a76b9719d911017c"

        }

      },

      {

        "name": "Staging",

        "ref": "5d41402abc4b2a76b9719d911017c",

        "version": 0,

        "expression": "((cf.edge.server_ip in {1.2.3.4 5.6.7.8})) and (cf.zone.name eq \"example.com\")",

        "locked_on_deployment": false,

        "position": {

          "before": "49f0bad299687c62334182178bfd",

          "after": "12abcd3e45f678940a573f51834a54"

        }

      },

      {

        "name": "Development",

        "ref": "49f0bad299687c62334182178bfd",

        "version": 0,

        "expression": "((any(http.request.cookies[\"development\"][*] eq \"true\"))) and (cf.zone.name eq \"example.com\")",

        "locked_on_deployment": false,

        "position": {

          "after": "5d41402abc4b2a76b9719d911017c"

        }

      }

    ]

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

In this particular example, we have three environments: Production, Staging, and Development. You can find the environment ID in the `ref` field.

## Step 2: Purge cache per environment

To purge the Production environment, use the general cache purge endpoint:

Terminal window

```

https://api.cloudflare.com/client/v4/zones/<zone_id>/purge_cache/


```

To purge non-production environments, you must use a new `purge_cache` endpoint and specify the environment you would like to purge.

To purge the Staging environment from the example above, send a request to the following endpoint:

Terminal window

```

https://api.cloudflare.com/client/v4/zones/<zone_id>/environments/5d41402abc4b2a76b9719d911017c/purge_cache/


```

To purge the Development environment from the example above, send a request to the following endpoint:

Terminal window

```

https://api.cloudflare.com/client/v4/zones/<zone_id>/environments/49f0bad299687c62334182178bfd/purge_cache/


```

Note

When purging everything for a non-production cache environment, all files for that specific cache environment will be purged. However, when purging everything for the production environment, all files will be purged across all environments.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-zone-versions/#page","headline":"Purge zone versions via API · Cloudflare Cache (CDN) docs","description":"Purge cache for specific zone versions using the API.","url":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-zone-versions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/purge-cache/","name":"Purge cache"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/purge-cache/purge-zone-versions/","name":"Purge zone versions via API"}}]}
```
