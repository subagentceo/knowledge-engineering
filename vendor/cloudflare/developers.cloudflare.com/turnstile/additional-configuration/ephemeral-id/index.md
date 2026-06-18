---
title: Ephemeral IDs
description: Generate single-use Ephemeral IDs for fraud detection and analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Ephemeral IDs

Ephemeral IDs are short-lived device identifiers that Turnstile generates for each visitor interaction. Unlike IP-based detection, Ephemeral IDs link visitor behavior to a specific client device without relying on cookies or client-side storage. This makes them effective against attackers who change IP addresses between requests.

## How Ephemeral IDs work

Ephemeral IDs are dynamically generated for each Turnstile solve attempt. No cookies or local storage is required.

Ephemeral IDs are scoped to your Cloudflare account and cannot be shared across accounts. IDs expire within a few days and cannot be used to identify individual users.

This approach is particularly effective against credential stuffing and fake account creation attacks, where attackers rotate IP addresses to evade detection.

Refer to the [blog post ↗](https://blog.cloudflare.com/turnstile-ephemeral-ids-for-fraud-detection/) for more information.

---

## Implementation

### Enable Ephemeral IDs

1. Contact your Cloudflare account team to enable Ephemeral ID entitlement for your account. This feature requires Enterprise-level access and cannot be self-activated.
2. After entitlement is enabled, activate Ephemeral IDs for specific widgets using the Cloudflare API.  
cURL command  
```  
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$WIDGET_ID" \  
  -H "Authorization: Bearer $API_TOKEN" \  
  -H "Content-Type: application/json" \  
  -d '{  
    "ephemeral_id": true  
  }'  
```
3. Confirm Ephemeral IDs are active by checking your widget configuration.  
cURL command  
```  
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/challenges/widgets/$WIDGET_ID" \  
  -H "Authorization: Bearer $API_TOKEN"  
```

### Access Ephemeral IDs

Once enabled, Ephemeral IDs are included in Siteverify API responses.

Siteverify API response

```

{

  "success": true,

  "challenge_ts": "2022-02-28T15:14:30.096Z",

  "hostname": "example.com",

  "error-codes": [],

  "action": "login",

  "cdata": "sessionid-123456789",

  "metadata": {

    "ephemeral_id": "x:9f78e0ed210960d7693b167e"

  }

}


```

---

## Availability

Ephemeral IDs are available to Enterprise Bot Management customers with the Enterprise Turnstile add-on or standalone Enterprise Turnstile customers. Contact your account team for access to Ephemeral IDs.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/additional-configuration/ephemeral-id/#page","headline":"Ephemeral IDs · Cloudflare Turnstile docs","description":"Generate single-use Ephemeral IDs for fraud detection and analytics.","url":"https://developers.cloudflare.com/turnstile/additional-configuration/ephemeral-id/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Account takeover"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/additional-configuration/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/additional-configuration/ephemeral-id/","name":"Ephemeral IDs"}}]}
```
