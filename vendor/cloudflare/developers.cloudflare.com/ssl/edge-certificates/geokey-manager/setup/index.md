---
title: Setup
description: Learn how to set up Geo Key Manager and choose the geographical boundaries of where your private encryption keys are stored.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setup

## Geo Key Manager v2 Beta

Note

Geo Key Manager v2 is only available through the Cloudflare API.

Geo Key Manager v2 gives customers flexibility when choosing the geographical boundaries of where their keys are stored.

Using the `policy` field, customers can define policies containing allow and block lists of countries or regions where the private key should be stored.

To use Geo Key Manager v2 with the API, generally, follow the steps to [upload a custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate).

When sending the [POST](https://developers.cloudflare.com/api/resources/custom%5Fcertificates/methods/create/) request, include the `policy` parameter to define policies containing allow and block lists of countries or regions where the private key should be stored.

Note

You also have access to the `geo_restrictions` parameter, which is mutually exclusive with the `policy` parameter and is part of [Geo Key Manager v1](#geo-key-manager-v1).

### Examples

Store private keys in the E.U. and the U.S.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Mutual TLS Certificates Write`
* `SSL and Certificates Write`

Create SSL Configuration

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_certificates" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "certificate": "certificate",

    "private_key": "<PRIVATE_KEY>",

    "policy": "(country: US) and (region: EU)",

    "type": "sni_custom"

  }'


```

Store private keys in the E.U., but not in France

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Mutual TLS Certificates Write`
* `SSL and Certificates Write`

Create SSL Configuration

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_certificates" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "certificate": "certificate",

    "private_key": "<PRIVATE_KEY>",

    "policy": "(region: EU) and (not country: FR)",

    "type": "sni_custom"

  }'


```

Note

For more information on the `policy` field, refer to [Supported options](https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/supported-options/).

## Geo Key Manager v1

The first version of Geo Key Manager supports 3 regions: U.S., E.U., and a set of High Security Data Centers. If you would like to restrict your private key to another country or region, [apply for the closed beta ↗](https://www.cloudflare.com/lp/geo-key-manager/) of the new version.

* [ Dashboard ](#tab-panel-10614)
* [ API ](#tab-panel-10615)

To use Geo Key Manager in the dashboard:

1. Follow the steps to [upload a custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate).
2. For **Private Key Restriction**, choose one of the following options:  
   * **Distribute to all Cloudflare data centers (optimal performance)**  
   * **Distribute only to U.S. data centers**  
   * **Distribute only to E.U. data centers**  
   * **Distribute only to highest security data centers** ([more details](https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/supported-options/#highest-security-data-centers))
3. Select **Upload Custom Certificate**.

To use Geo Key Manager with the API, generally, follow the steps to [upload a custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate).

When sending the [POST](https://developers.cloudflare.com/api/resources/custom%5Fcertificates/methods/create/) request, include the `geo_restrictions` parameter set to one of the following options:

* `us`
* `eu`
* `highest_security`([more details](https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/supported-options/#highest-security-data-centers))

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/setup/#page","headline":"Setup - Geo Key Manager · Cloudflare SSL/TLS docs","description":"Learn how to set up Geo Key Manager and choose the geographical boundaries of where your private encryption keys are stored.","url":"https://developers.cloudflare.com/ssl/edge-certificates/geokey-manager/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS","Compliance","Geolocation"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/geokey-manager/","name":"Geo Key Manager"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/geokey-manager/setup/","name":"Setup"}}]}
```
