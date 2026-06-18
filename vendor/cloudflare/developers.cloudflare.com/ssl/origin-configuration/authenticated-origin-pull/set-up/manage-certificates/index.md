---
title: Manage certificates
description: Upload and manage certificates for Authenticated Origin Pulls.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage certificates

Refer to the following sections to learn how to manage certificates used with [zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) and [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) Authenticated Origin Pulls. [Global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/) uses a Cloudflare-provided certificate and does not require certificate management.

---

## Expired certificates

Cloudflare does not delete client certificates upon expiration unless you send a delete request to the Cloudflare API for the relevant certificate ([Delete a zone-level certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/zone%5Fcertificates/methods/delete/) or [Delete a hostname-level certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostname%5Fcertificates/methods/delete/)). If your origin only accepts a valid client certificate, it will drop requests when the certificate expires.

Make sure you have [notifications](https://developers.cloudflare.com/notifications/notification-available/#ssltls) set up to get alerts 30 days and 14 days before an AOP certificate expires.

---

## Use specialized certificates

To apply different client certificates simultaneously at the zone and hostname level, you can combine zone-level and per-hostname custom certificates.

First, set up [zone-level AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) using your certificate. Then, upload specialized certificates for [individual hostnames](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/). Per-hostname certificates take precedence over zone-level certificates for the specified hostname.

---

## Replace a certificate without downtime via API

No automatic removal

Cloudflare does not delete client certificates upon expiration unless you send a delete request to the Cloudflare API for the relevant certificate ([Delete a zone-level certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/zone%5Fcertificates/methods/delete/) or [Delete a hostname-level certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostname%5Fcertificates/methods/delete/)).

### Per-hostname

1. [Upload the new certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostname%5Fcertificates/methods/create/).
2. [List your certificates](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostname%5Fcertificates/methods/list/) and note the ID for the certificate you uploaded.
3. [Enable Authenticated Origin Pulls for the specific hostname](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostnames/methods/update/), using the ID obtained in step 2 to specify the certificate you want to use:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`

Enable or Disable a Hostname for Client Authentication

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin_tls_client_auth/hostnames" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "config": [

        {

            "enabled": true,

            "hostname": "<HOSTNAME>",

            "cert_id": "<CERT_ID>"

        }

    ]

  }'


```

Note

If you keep both certificates, the API will state `active` for both but the most recently deployed certificate will be the one enabled and used.

### Zone-level

1. [Upload the new certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/zone%5Fcertificates/methods/create/).
2. [Check whether new certificate is Active](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/zone%5Fcertificates/methods/get/).
3. Once certificate is active, [delete the previous certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/zone%5Fcertificates/methods/delete/).

Note

If you keep both certificates, the API will state `active` for both but the most recently deployed certificate will be the one enabled and used.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/manage-certificates/#page","headline":"Manage AOP certificates · Cloudflare SSL/TLS docs","description":"Upload and manage certificates for Authenticated Origin Pulls.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/manage-certificates/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/","name":"Authenticated Origin Pulls (mTLS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/manage-certificates/","name":"Manage certificates"}}]}
```
