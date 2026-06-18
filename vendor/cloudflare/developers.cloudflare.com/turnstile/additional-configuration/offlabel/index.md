---
title: Remove Cloudflare branding with Offlabel
description: Remove Cloudflare branding from Turnstile widgets with Offlabel mode.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Remove Cloudflare branding with Offlabel

Offlabel is an Enterprise-only feature that removes Cloudflare branding and logo from Turnstile widgets. When enabled, widgets display without any visual references to Cloudflare.

When Offlabel is enabled:

* The Cloudflare logo and color schemes are removed from all widget states.
* The widget maintains the same functionality, behavior, and WCAG 2.2 AA accessibility compliance.
* All security features remain unchanged.

The widget will display with a clean, unbranded appearance that integrates seamlessly with your website's design.

---

## Implementation

### Enable Offlabel

After your account team enables the Offlabel entitlement, you can activate it for specific widgets using the Cloudflare API.

cURL command

```

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$WIDGET_ID" \

-H "Authorization: Bearer $API_TOKEN" \

-H "Content-Type: application/json" \

-d '{

    "offlabel": true

}'


```

### Create new widgets with Offlabel

You can enable Offlabel when creating new widgets.

cURL command

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets" \

-H "Authorization: Bearer $API_TOKEN" \

-H "Content-Type: application/json" \

-d '{

    "name": "Branded Widget",

    "domains": ["example.com"],

    "mode": "managed",

    "offlabel": true

}'


```

### Verification

Confirm Offlabel is enabled by checking your widget configuration.

cURL command

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$WIDGET_ID" \

-H "Authorization: Bearer $API_TOKEN"


```

The response will include `"offlabel": true` when the feature is active.

### Link to Cloudflare's Turnstile Privacy Policy

As a condition of enabling offlabel, you must reference Cloudflare's [Turnstile Privacy Addendum ↗](https://www.cloudflare.com/turnstile-privacy-policy/) in one of two ways:

1. Link to it in your own privacy policy.
2. Configure the widget to display a link to Cloudflare's privacy policy using the [JavaScript Render Parameters](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/#complete-configuration-reference).

---

## Availability

Offlabel is available exclusively to Enterprise customers with the Enterprise Turnstile add-on or Standalone Enterprise Turnstile customers.

Contact your account team for access to the Offlabel feature.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/additional-configuration/offlabel/#page","headline":"Remove Cloudflare branding with Offlabel · Cloudflare Turnstile docs","description":"Remove Cloudflare branding from Turnstile widgets with Offlabel mode.","url":"https://developers.cloudflare.com/turnstile/additional-configuration/offlabel/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/additional-configuration/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/additional-configuration/offlabel/","name":"Remove Cloudflare branding with Offlabel"}}]}
```
