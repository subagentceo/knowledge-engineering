---
title: TXT
description: Validate domain control with a TXT DNS record.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# TXT

TXT record validation requires the creation of a TXT record in the hostname's authoritative DNS.

  
---

## When to use

Generally, you need to perform TXT-based DCV when your certificate [requires DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/) and you cannot perform [Delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).

---

## Setup

### Specify DCV method

If you want to use a [Universal SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/), you will need to edit the `validation_method` [via the API](https://developers.cloudflare.com/api/resources/ssl/subresources/verification/methods/edit/) and specify your chosen validation method.

Alternatively, you could [order an advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) via the dashboard or the API.

### Get DCV values

Once you [create a new certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#create-a-certificate) and choose the validation method of **TXT**, your tokens will be ready after a few seconds.

These tokens can be fetched through the API or the dashboard when the certificates are in a [pending validation](https://developers.cloudflare.com/ssl/reference/certificate-statuses/#new-certificates) state during custom hostname creation or during certificate renewals.

* [ API ](#tab-panel-10606)
* [ Dashboard ](#tab-panel-10607)

You can access these tokens using the API with the [GET request](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/get/) and including `status=pending_validation` as a request parameter.

For example, here are two tokens highlighted in the API response for a wildcard certificate.

Response

```

{

  "result": [

    {

      "id": "<CERTIFICATE_ID>",

      "type": "advanced",

      "hosts": ["*.<DOMAIN>.com", "<DOMAIN>.com"],

      "primary_certificate": "0",

      "status": "pending_validation",

      "certificates": [],

      "created_on": "2022-10-12T21:46:21.979150Z",

      "validity_days": 90,

      "validation_method": "txt",

      "validation_records": [

        {

          "status": "pending",

          "txt_name": "_acme-challenge.<DOMAIN>.com",

          "txt_value": "lXLOcN6cPv0nproViNcUHcahD9TrIPlNgdwesj0pYpk"

        },

        {

          "status": "pending",

          "txt_name": "_acme-challenge.<DOMAIN>.com",

          "txt_value": "O0o8VgJu_OGu-T30_cvT-4xO5ZX1_2WsVNUrpUKE6ns"

        }

      ],

      "certificate_authority": "google"

    }

  ]

}


```

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. Select a certificate.
3. Copy the values for **Certificate validation TXT name** and **Certificate validation TXT value**.

If you had created a **wildcard** certificate, you would need to copy the values for two different validation TXT records.

### Update DNS records

At your authoritative DNS provider, create a TXT record named the `txt_name` and containing the `txt_value`.

Repeat this process for all the DCV records returned in the `validation_records` field to your Authoritative DNS provider.

If one or more of the hostnames on the certificate fail to validate, the certificate will not be issued or renewed.

This means that a wildcard certificate covering `example.com` and `*.example.com` will require two DCV tokens to be placed at the authoritative DNS provider. Similarly, a certificate with five hostnames in the SAN (including a wildcard) will require five DCV tokens to be placed at the authoritative DNS provider. Certificates with several packs (RSA and ECDSA for example) may also require several DCV tokens.

### Complete DCV

Once you update your DNS records, you can either [wait for the next retry](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/) or request an immediate recheck.

To request an immediate recheck, send another [PATCH request](https://developers.cloudflare.com/api/resources/ssl/subresources/verification/methods/edit/) with the same `validation_method` as your current validation method.

TXT records used for DCV can be removed from your authoritative DNS provider as soon as the certificate is issued.

## Renewal

Even if you manually handle DCV when issuing certificates in a [partial DNS setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), at certificate renewal, Cloudflare will attempt to automatically perform DCV via HTTP.

If all of the following conditions are confirmed at the first attempt, the renewal happens automatically via [HTTP](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/http/).

* Hostnames are proxied.
* Hostnames on the certificate resolve to the IPs assigned to the zone.
* The certificate does not contain wildcards.

Note

To automatically renew certificates that do not meet the referred criteria, consider using [Delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/).

If any one of the conditions is not met, the certificate renewal falls back to your chosen method and you will need to [repeat the DCV process](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/txt/#get-dcv-values) manually.

Cloudflare generates renewal tokens 30 days before certificate expiration.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/txt/#page","headline":"TXT method — Domain Control Validation — SSL/TLS · Cloudflare SSL/TLS docs","description":"Validate domain control with a TXT DNS record.","url":"https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/txt/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/changing-dcv-method/","name":"Domain control validation (DCV)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/changing-dcv-method/methods/","name":"Methods"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/edge-certificates/changing-dcv-method/methods/txt/","name":"TXT"}}]}
```
