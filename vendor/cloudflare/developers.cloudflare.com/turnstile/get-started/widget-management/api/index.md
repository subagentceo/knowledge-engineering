---
title: Create and manage widgets using Cloudflare API
description: Create and manage Turnstile widgets using the Cloudflare API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create and manage widgets using Cloudflare API

Use the [Cloudflare API](https://developers.cloudflare.com/api/resources/turnstile/) for programmatic widget management and automation.

## Prerequisites

Before you begin, you must have:

* A Cloudflare API token with `Account:Turnstile:Edit` permissions
* An account ID found in your Cloudflare dashboard

### Create a widget via the API

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Turnstile Sites Write`
* `Account Settings Write`

Create a Turnstile Widget

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "domains": [

        "example.com"

    ],

    "mode": "managed",

    "name": "My Example Turnstile Widget"

  }'


```

### Manage widgets via the API

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Turnstile Sites Write`
* `Turnstile Sites Read`
* `Account Settings Write`
* `Account Settings Read`

List Turnstile Widgets

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Turnstile Sites Write`
* `Turnstile Sites Read`
* `Account Settings Write`
* `Account Settings Read`

Turnstile Widget Details

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Turnstile Sites Write`
* `Account Settings Write`

Update a Turnstile Widget

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "domains": [

        "203.0.113.1",

        "cloudflare.com",

        "blog.example.com"

    ],

    "mode": "invisible",

    "name": "blog.cloudflare.com login form",

    "clearance_level": "interactive"

  }'


```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Turnstile Sites Write`
* `Account Settings Write`

Rotate Secret for a Turnstile Widget

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY/rotate_secret" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "invalidate_immediately": false

  }'


```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Turnstile Sites Write`
* `Account Settings Write`

Delete a Turnstile Widget

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$SITEKEY" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/get-started/widget-management/api/#page","headline":"Create and manage widgets using Cloudflare API · Cloudflare Turnstile docs","description":"Create and manage Turnstile widgets using the Cloudflare API.","url":"https://developers.cloudflare.com/turnstile/get-started/widget-management/api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/get-started/widget-management/","name":"Widget management"}},{"@type":"ListItem","position":5,"item":{"@id":"/turnstile/get-started/widget-management/api/","name":"Create and manage widgets using Cloudflare API"}}]}
```
