---
title: Customize cipher suites via API
description: Select allowed cipher suites for your zone using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Customize cipher suites via API

Cipher suites are a combination of ciphers used to negotiate security settings during the [SSL/TLS handshake ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) (and therefore separate from the [SSL/TLS protocol](https://developers.cloudflare.com/ssl/reference/protocols/)).

## Prerequisites

Cipher suite customization requires an [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) subscription.

If you are a SaaS provider looking to restrict cipher suites for connections to [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/), this can be configured with a [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) subscription. Refer to [TLS management](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#cipher-suites) instead.

## Before you begin

Note that:

* Updating the cipher suites will result in certificates being redeployed.
* Cipher suites are used in combination with other [SSL/TLS settings](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/#related-ssltls-settings).
* You cannot set specific TLS 1.3 ciphers. Instead, you can [enable TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) for your entire zone and Cloudflare will use all applicable [TLS 1.3 cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/).
* Each cipher suite also supports a specific algorithm (RSA or ECDSA) so you should consider the algorithms in use by your edge certificates when making your ciphers selection. You can find this information under each certificate listed on the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) page.
* It is not possible to configure minimum TLS version nor cipher suites for [Cloudflare Pages](https://developers.cloudflare.com/pages/) hostnames.
* If you use Windows you might need to adjust the `curl` syntax, refer to [Making API calls on Windows](https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/#making-api-calls-on-windows) for further guidance.

Warning

If setting up a per-hostname cipher suite customization, make sure that the hostname is specified on the certificate (instead of being covered by a wildcard). Applying a per-hostname configuration on a wildcard certificate will result in the configuration being applied to all hostnames.

## Steps and API examples

1. Decide which cipher suites you want to specify and which ones you want to disable (meaning they will not be included in your selection).  
Below you will find samples covering the recommended ciphers [by security level](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/recommendations/) and [compliance standards](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/compliance-status/), but you can also refer to the [full list](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/supported-cipher-suites/) of supported ciphers and customize your choice.
2. Log in to the Cloudflare dashboard and get your Global API Key in [**My Profile** \> **API Tokens** ↗](https://dash.cloudflare.com/?to=/:account/profile/api-tokens/).
3. Get the Zone ID from the [Overview page ↗](https://dash.cloudflare.com/?to=/:account/:zone/) of the domain you want to specify cipher suites for.
4. Make an API call to either the [Edit zone setting](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) endpoint or the [Edit TLS setting for hostname](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls/methods/update/) endpoint, specifying `ciphers` in the URL. List your array of chosen cipher suites in the `value` field.

* [ modern ](#tab-panel-10586)
* [ compatible ](#tab-panel-10587)
* [ pci dss ](#tab-panel-10588)
* [ fips-140-3 ](#tab-panel-10589)

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Edit zone setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ciphers" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": [

        "ECDHE-ECDSA-AES128-GCM-SHA256",

        "ECDHE-ECDSA-CHACHA20-POLY1305",

        "ECDHE-RSA-AES128-GCM-SHA256",

        "ECDHE-RSA-CHACHA20-POLY1305",

        "ECDHE-ECDSA-AES256-GCM-SHA384",

        "ECDHE-RSA-AES256-GCM-SHA384"

    ]

  }'


```

To configure cipher suites per hostname, replace the first two lines by the following:

Terminal window

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/hostnames/settings/ciphers/{hostname}" \


```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Edit zone setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ciphers" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": [

        "ECDHE-ECDSA-AES128-GCM-SHA256",

        "ECDHE-ECDSA-CHACHA20-POLY1305",

        "ECDHE-RSA-AES128-GCM-SHA256",

        "ECDHE-RSA-CHACHA20-POLY1305",

        "ECDHE-ECDSA-AES256-GCM-SHA384",

        "ECDHE-RSA-AES256-GCM-SHA384",

        "ECDHE-ECDSA-AES128-SHA256",

        "ECDHE-RSA-AES128-SHA256",

        "ECDHE-ECDSA-AES256-SHA384",

        "ECDHE-RSA-AES256-SHA384"

    ]

  }'


```

To configure cipher suites per hostname, replace the first two lines by the following:

Terminal window

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/hostnames/settings/ciphers/{hostname}" \


```

Note

For compliance with PCI DSS, also [enable TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) on your zone and make sure to up your [Minimum TLS version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) to `1.2`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Edit zone setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ciphers" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": [

        "ECDHE-ECDSA-AES128-GCM-SHA256",

        "ECDHE-RSA-AES128-GCM-SHA256",

        "ECDHE-ECDSA-AES256-GCM-SHA384",

        "ECDHE-RSA-AES256-GCM-SHA384",

        "ECDHE-ECDSA-CHACHA20-POLY1305",

        "ECDHE-RSA-CHACHA20-POLY1305"

    ]

  }'


```

To configure cipher suites per hostname, replace the first two lines by the following:

Terminal window

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/hostnames/settings/ciphers/{hostname}" \


```

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Edit zone setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ciphers" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": [

        "AES128-GCM-SHA256",

        "AES128-SHA",

        "AES128-SHA256",

        "AES256-SHA",

        "AES256-SHA256",

        "DES-CBC3-SHA",

        "ECDHE-ECDSA-AES128-GCM-SHA256",

        "ECDHE-ECDSA-AES128-SHA",

        "ECDHE-ECDSA-AES128-SHA256",

        "ECDHE-ECDSA-AES256-GCM-SHA384",

        "ECDHE-ECDSA-AES256-SHA384",

        "ECDHE-RSA-AES128-GCM-SHA256",

        "ECDHE-RSA-AES128-SHA",

        "ECDHE-RSA-AES128-SHA256",

        "ECDHE-RSA-AES256-GCM-SHA384",

        "ECDHE-RSA-AES256-SHA",

        "ECDHE-RSA-AES256-SHA384"

    ]

  }'


```

To configure cipher suites per hostname, replace the first two lines by the following:

Terminal window

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/zones/{zone_id}/hostnames/settings/ciphers/{hostname}" \


```

### Reset to default values

* [ zone ](#tab-panel-10584)
* [ per-hostname ](#tab-panel-10585)

To reset to the default cipher suites at zone level, use the [Edit zone setting](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) endpoint, specifying `ciphers` as the setting name in the URL, and send an empty array in the `value` field.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Edit zone setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ciphers" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": []

  }'


```

For specific hostname settings, use the [Delete TLS setting for hostname](https://developers.cloudflare.com/api/resources/hostnames/subresources/settings/subresources/tls/methods/delete/) endpoint.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `SSL and Certificates Write`

Delete TLS setting for hostname

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/hostnames/settings/ciphers/$HOSTNAME" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

For guidance around custom hostnames, refer to [TLS settings - Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/enforce-mtls/#cipher-suites).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/#page","headline":"Customize cipher suites via API · Cloudflare SSL/TLS docs","description":"Select allowed cipher suites for your zone using the API.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/","name":"Cipher suites"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/","name":"Customize cipher suites"}},{"@type":"ListItem","position":7,"item":{"@id":"/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/api/","name":"Customize cipher suites via API"}}]}
```
