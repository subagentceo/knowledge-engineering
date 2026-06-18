---
title: Custom Origin Trust Store
description: Custom Origin Trust Store allows you to upload certificate authorities (CAs) that Cloudflare will use to authenticate connections to your origin server.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom Origin Trust Store

By default, Cloudflare's global network maintains [a list of publicly trusted certificate authorities ↗](https://github.com/cloudflare/cfssl%5Ftrust). This means that when using [Full (strict) encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/), Cloudflare will only trust origin server certificates issued by a CA included in this trust store.

Custom Origin Trust Store allows you to upload certificate authorities (CAs) that Cloudflare will use to authenticate connections to your origin server. Use this feature to override the default trust store with your preferred CA or CAs.

  
When a CA has been uploaded to Custom Origin Trust Store, Cloudflare will ignore all default publicly trusted CAs and exclusively use the CA or CAs that have been uploaded to authenticate the origin server.

## Availability

To get access to Custom Origin Trust Store, [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) must be enabled on the zone.

## How to

To manage origin trust stores in the dashboard:

1. Go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. Select the **Custom Origin Trust Store** tab.
3. Select **Upload trust store** to add a CA certificate, or use the table to manage existing trust stores.

To manage origin trust stores using the API, refer to the [API commands](#api-commands).

## Limitations

With [Full (strict) encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) enabled, if your uploaded CA expires and no alternative CAs are valid within the trust store, Cloudflare will not be able to properly authenticate connections to the origin server.

## API commands

#### List Custom Origin Trust Store Details

* API documentation: [List Custom Origin Trust Store Details](https://developers.cloudflare.com/api/resources/acm/subresources/custom%5Ftrust%5Fstore/methods/list/)
* Method: `GET`
* Endpoint: `/zones/$ZONE_ID/acm/custom_trust_store`

#### Custom Origin Trust Store Details

* API documentation: [Custom Origin Trust Store Details](https://developers.cloudflare.com/api/resources/acm/subresources/custom%5Ftrust%5Fstore/methods/get/)
* Method: `GET`
* Endpoint: `/zones/$ZONE_ID/acm/custom_trust_store/$CUSTOM_ORIGIN_TRUST_STORE_ID`  
Note  
The `$CUSTOM_ORIGIN_TRUST_STORE_ID` can be found via the [List command](#list-custom-origin-trust-store-details).

#### Upload Custom Origin Trust Store

* API documentation: [Upload Custom Origin Trust Store](https://developers.cloudflare.com/api/resources/acm/subresources/custom%5Ftrust%5Fstore/methods/create/)
* Method: `POST`
* Endpoint: `/zones/$ZONE_ID/acm/custom_trust_store`

#### Delete Custom Origin Trust Store

* API documentation: [Delete Custom Origin Trust Store](https://developers.cloudflare.com/api/resources/acm/subresources/custom%5Ftrust%5Fstore/methods/delete/)
* Method: `DELETE`
* Endpoint: `/zones/$ZONE_ID/acm/custom_trust_store/$CUSTOM_ORIGIN_TRUST_STORE_ID`  
Note  
The `$CUSTOM_ORIGIN_TRUST_STORE_ID` can be found via the [List command](#list-custom-origin-trust-store-details).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/custom-origin-trust-store/#page","headline":"Custom Origin Trust Store · Cloudflare SSL/TLS docs","description":"Custom Origin Trust Store allows you to upload certificate authorities (CAs) that Cloudflare will use to authenticate connections to your origin server.","url":"https://developers.cloudflare.com/ssl/origin-configuration/custom-origin-trust-store/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/custom-origin-trust-store/","name":"Custom Origin Trust Store"}}]}
```
