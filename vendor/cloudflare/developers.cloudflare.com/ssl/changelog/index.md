---
title: Changelog
description: Track the latest updates and changes to Cloudflare SSL/TLS features.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/ssl.xml) 

## 2026-04-07

  
**Manage mTLS and BYO CA certificates from the Cloudflare dashboard**   

You can now manage mutual TLS (mTLS) and Bring Your Own Certificate Authority (BYO CA) configurations directly from the Cloudflare dashboard — no API required.

Previously, these advanced workflows required the Cloudflare API. The following are now available in the dashboard:

* **AOP certificate management** — Upload and manage your own certificate authorities for [Authenticated Origin Pulls (AOP)](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/)directly from the dashboard.
* **BYO Client mTLS certificate management** — Upload and manage your own CA certificates for [client mTLS enforcement](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/)without needing API access.
* **CDN hostname to client mTLS certificate mapping** — Associate client mTLS certificates with specific hostnames directly from the dashboard.

## 2025-08-25

  
**Manage and deploy your AI provider keys through Bring Your Own Key (BYOK) with AI Gateway, now powered by Cloudflare Secrets Store**   

Cloudflare Secrets Store is now integrated with AI Gateway, allowing you to store, manage, and deploy your AI provider keys in a secure and seamless configuration through [Bring Your Own Key ↗](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/). Instead of passing your AI provider keys directly in every request header, you can centrally manage each key with Secrets Store and deploy in your gateway configuration using only a reference, rather than passing the value in plain text.

You can now create a secret directly from your AI Gateway [in the dashboard ↗](http://dash.cloudflare.com/?to=/:account/ai-gateway) by navigating into your gateway -> **Provider Keys** \-> **Add**.

![Import repo or choose template](https://developers.cloudflare.com/_astro/add-secret-ai-gateway.B-SIPr6s_jJjDD.webp) 

You can also create your secret with the newly available **ai\_gateway** scope via [wrangler ↗](https://developers.cloudflare.com/workers/wrangler/commands/), the [Secrets Store dashboard ↗](http://dash.cloudflare.com/?to=/:account/secrets-store), or the [API ↗](https://developers.cloudflare.com/api/resources/secrets%5Fstore/).

Then, pass the key in the request header using its Secrets Store reference:

Terminal window

```

curl -X POST https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/my-gateway/anthropic/v1/messages \

 --header 'cf-aig-authorization: ANTHROPIC_KEY_1 \

 --header 'anthropic-version: 2023-06-01' \

 --header 'Content-Type: application/json' \

 --data  '{"model": "claude-3-opus-20240229", "messages": [{"role": "user", "content": "What is Cloudflare?"}]}'


```

Or, using Javascript:

```

import Anthropic from '@anthropic-ai/sdk';


const anthropic = new Anthropic({

 apiKey: "ANTHROPIC_KEY_1",

 baseURL: "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/my-gateway/anthropic",

});


const message = await anthropic.messages.create({

 model: 'claude-3-opus-20240229',

 messages: [{role: "user", content: "What is Cloudflare?"}],

 max_tokens: 1024

});


```

For more information, check out the [blog ↗](https://blog.cloudflare.com/ai-gateway-aug-2025-refresh)!

## 2025-05-27

  
**Increased limits for Cloudflare for SaaS and Secrets Store free and Pay-as-you-go plans**   

With upgraded limits to [all free and paid plans ↗](https://www.cloudflare.com/plans/), you can now scale more easily with [Cloudflare for SaaS ↗](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) and [Secrets Store ↗](https://developers.cloudflare.com/secrets-store/).

[Cloudflare for SaaS ↗](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) allows you to extend the benefits of Cloudflare to your customers via their own custom or vanity domains. Now, the [limit for custom hostnames ↗](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/) on a Cloudflare for SaaS Pay-as-you-go plan has been **raised from 5,000 custom hostnames to 50,000 custom hostnames.**

With custom origin server -- previously an enterprise-only feature -- you can route traffic from one or more custom hostnames somewhere other than your default proxy fallback. [Custom origin server ↗](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/custom-origin/) is now available to Cloudflare for SaaS customers on Free, Pro, and Business plans.

You can enable custom origin server on a per-custom hostname basis [via the API ↗](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/edit/) or the UI:

![Import repo or choose template](https://developers.cloudflare.com/_astro/custom-origin-server.B-BXcG-1_ZUd9i6.webp) 

Currently [in beta with a Workers integration ↗](https://blog.cloudflare.com/secrets-store-beta/), [Cloudflare Secrets Store ↗](https://developers.cloudflare.com/secrets-store/) allows you to store, manage, and deploy account level secrets from a secure, centralized platform your [Cloudflare Workers ↗](https://developers.cloudflare.com/workers/). Now, you can create and deploy **100 secrets per account**. Try it out [in the dashboard ↗](http://dash.cloudflare.com/?to=/:account/secrets-store), with [Wrangler ↗](https://developers.cloudflare.com/secrets-store/integrations/workers/), or [via the API ↗](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) today.

## 2025-04-09

  
**Cloudflare Secrets Store now available in Beta**   

Cloudflare Secrets Store is available today in Beta. You can now store, manage, and deploy account level secrets from a secure, centralized platform to your Workers.

![Import repo or choose template](https://developers.cloudflare.com/_astro/secrets-store-landing-page.BQoEWsq8_ZUrGq1.webp) 

To spin up your Cloudflare Secrets Store, simply click the new Secrets Store tab [in the dashboard ↗](http://dash.cloudflare.com/?to=/:account/secrets-store) or use this Wrangler command:

Terminal window

```

wrangler secrets-store store create <name> --remote


```

The following are supported in the Secrets Store beta:

* Secrets Store UI & API: create your store & create, duplicate, update, scope, and delete a secret
* Workers UI: bind a new or existing account level secret to a Worker and deploy in code
* Wrangler: create your store & create, duplicate, update, scope, and delete a secret
* Account Management UI & API: assign Secrets Store permissions roles & view audit logs for actions taken in Secrets Store core platform

For instructions on how to get started, visit our [developer documentation](https://developers.cloudflare.com/secrets-store/).

## 2025-02-14

  
**Upload a certificate bundle with an RSA and ECDSA certificate per custom hostname**   

Cloudflare has supported both RSA and ECDSA certificates across our platform for a number of years. Both certificates offer the same security, but ECDSA is more performant due to a smaller key size. However, RSA is more widely adopted and ensures compatibility with legacy clients. Instead of choosing between them, you may want both – that way, ECDSA is used when clients support it, but RSA is available if not.

Now, you can upload both an RSA and ECDSA certificate on a custom hostname via the API.

```

curl -X POST https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames \

    -H 'Content-Type: application/json' \

    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \

    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \

    -d '{

    "hostname": "hostname",

    "ssl": {

        "custom_cert_bundle": [

            {

                "custom_certificate": "RSA Cert",

                "custom_key": "RSA Key"

            },

            {

                "custom_certificate": "ECDSA Cert",

                "custom_key": "ECDSA Key"

            }

        ],

        "bundle_method": "force",

        "wildcard": false,

        "settings": {

            "min_tls_version": "1.0"

        }

    }

}’


```

You can also:

* [Upload](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/methods/create/) an RSA or ECDSA certificate to a custom hostname with an existing ECDSA or RSA certificate, respectively.
* [Replace](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/subresources/certificate%5Fpack/subresources/certificates/methods/update/) the RSA or ECDSA certificate with a certificate of its same type.
* [Delete](https://developers.cloudflare.com/api/resources/custom%5Fhostnames/subresources/certificate%5Fpack/subresources/certificates/methods/delete/) the RSA or ECDSA certificate (if the custom hostname has both an RSA and ECDSA uploaded).

This feature is available for Business and Enterprise customers who have purchased custom certificates.

## 2024-10-18

**New cloudflare\_branding flag allows hostnames with over 64 characters for all CAs**

To order certificates for hostnames longer than 64 characters, customers can now use the `cloudflare_branding` flag when ordering a certificate via [API ↗](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/create/). Setting `cloudflare_branding` to `true` will cause `sni.cloudflaressl.com` to be used as the common name, while the long hostname is added as part of the subject alternative name (SAN).

## 2024-09-19

**SSL.com available with ACM and SSL for SaaS**

SSL.com is one of the [certificate authorities](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) that Cloudflare partners with. SSL.com is now available as an option to customers with Advanced Certificate Manager (ACM) or SSL for SaaS. Consider our [reference documentation](https://developers.cloudflare.com/ssl/reference/certificate-authorities/#sslcom) for details.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/ssl/changelog/#page","headline":"Changelog · Cloudflare SSL/TLS docs","description":"Track the latest updates and changes to Cloudflare SSL/TLS features.","url":"https://developers.cloudflare.com/ssl/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/changelog/","name":"Changelog"}}]}
```
