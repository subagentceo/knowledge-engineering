---
title: Roll back per-hostname AOP
description: Roll back per-hostname Authenticated Origin Pulls to zone-level settings.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Roll back per-hostname AOP

If you need to disable or remove your [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) Authenticated Origin Pulls configuration, follow these steps.

Note

[Global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/), [zone-level AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/), and [per-hostname AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) are three independent configurations. Enabling or disabling one does not affect the others.

1. Use a [PUT request](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostnames/methods/update/) to disable Authenticated Origin Pulls on the hostname.  
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
            "enabled": false,  
            "cert_id": "<CERT_ID>",  
            "hostname": "<YOUR_HOSTNAME>"  
        }  
    ]  
  }'  
```
2. (Optional) Use a [GET request](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostname%5Fcertificates/methods/list/) to obtain a list of the client certificate IDs. You will need the ID of the certificate you want to remove for the following step.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `SSL and Certificates Write`  
   * `SSL and Certificates Read`  
List Certificates  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin_tls_client_auth/hostnames/certificates" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```
3. Use the [Delete hostname client certificate](https://developers.cloudflare.com/api/resources/origin%5Ftls%5Fclient%5Fauth/subresources/hostname%5Fcertificates/methods/delete/) endpoint to remove the certificate you had uploaded.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `SSL and Certificates Write`  
Delete Hostname Client Certificate  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin_tls_client_auth/hostnames/certificates/$CERTIFICATE_ID" \  
  --request DELETE \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/rollback/#page","headline":"Roll back per-hostname AOP · Cloudflare SSL/TLS docs","description":"Roll back per-hostname Authenticated Origin Pulls to zone-level settings.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/rollback/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/","name":"Authenticated Origin Pulls (mTLS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/rollback/","name":"Roll back per-hostname AOP"}}]}
```
