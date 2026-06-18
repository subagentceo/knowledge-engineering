---
title: Dedicated Egress IP for Logpush
description: Send Logpush logs via a dedicated egress IP.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dedicated Egress IP for Logpush

This guide covers [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/) and Logpush configuration and testing instructions to enable log delivery with a fixed, dedicated egress IP.

## Prerequisites

To use Logpush with a dedicated egress IP, you will need to have [Smart Shield Advanced](https://developers.cloudflare.com/smart-shield/get-started/#smart-shield-advanced) with Dedicated CDN Egress IPs (formerly known as Aegis). Note that the Dedicated CDN Egress IPs pool is associated with a zone, not with an account. To use Logpush with dedicated IPs, traffic must be routed to a single zone.

The general approach is to have your Logpush job proxying Logpush data through a Cloudflare zone with Dedicated CDN Egress IPs enabled to send data to your desired destination. This way your destination will only need to allowlist the provisioned dedicated egress IPs of your proxy zone.

As a prerequisite, you need to create a dedicated zone or use an existing zone. If using an existing zone, be aware that the zone's egress will be restricted to Dedicated CDN Egress IPs. Make sure all services using that zone will not be impacted.

It is recommended to use a separate, dedicated zone as a proxy to avoid impacting production systems. If you choose to create a new zone, follow the [steps](https://developers.cloudflare.com/registrar/get-started/register-domain/) to register a new domain with Cloudflare.

The following example shows how to set up logpush and Dedicated CDN Egress IPs to proxy an HTTPS destination, but the proxying should work for any supported Logpush destination as all destinations use the HTTP protocol underneath.

## 1\. Provision dedicated egress IP Pool

1. Work with your Cloudflare account team to purchase [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/) for your zone.
2. (Optional but recommended) Request two IPs — one in PDX-B and one in SJC-A — to ensure coverage across regions.
3. Confirm Pool ID once provisioned.

## 2\. Configure a zone

1. Register or use an existing zone for the dedicated egress IPs pool.
2. Contact your account team to get the ID for your dedicated egress IPs pool.
3. Make a `PATCH` request to the [Edit Zone Setting](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) endpoint:
* Specify `aegis` as the setting ID in the URL.
* In the request body, set `enabled` to `true` and use the ID from the previous step as `pool_id`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Edit zone setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/aegis" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "id": "aegis",

    "value": {

        "enabled": true,

        "pool_id": "<YOUR_EGRESS_POOL_ID>"

    }

  }'


```

## 3\. Proxy zone setup

1. In your zone, add a DNS record (CNAME or A/AAAA) with **Target** as HTTP destination endpoint.
![Create a DNS record in the Cloudflare dashboard to define the HTTP destination endpoint](https://developers.cloudflare.com/_astro/endpoint.DmFFJC-j_14G61L.webp) 
1. If needed, configure [origin rules](https://developers.cloudflare.com/rules/origin-rules/) to specify a custom port. This is useful if your destination only accepts traffic on a non standard port, for example `12345`. You can configure `logpush.yourdestinationendpoint.com` (without specifying a port, as Cloudflare by default only proxies traffic on HTTP/HTTPS ports) to proxy to `yourdestinationendpoint.com:12345`.

## 4\. Configure Logpush

1. Create a Logpush job with the following details:
* Destination: HTTP
* Endpoint: Use the domain/path set up (the Cloudflare dashboard will auto-validate the destination). Use the server name specified in the **Name** section in the DNS record. In this case, `logpush.yourdestionationendpoint.com`.
![Enter destination details when creating a Logpush job in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/destination-details.imLwZlEZ_PT9vI.webp) 
* Configuration: Select dataset, job name, filters, and fields. Refer to the [Logpush documentation](https://developers.cloudflare.com/logs/logpush/) for more details.
1. Check destination to confirm if the logs are received.

## 5\. Secure your proxy zone endpoint

The proxy zone hostname is publicly resolvable, but traffic passes through Cloudflare's edge where you can apply security controls. Use the following best practices to protect your endpoint.

### Add a secret header with WAF validation

Add a secret token as an HTTP header in your Logpush job, then create a WAF rule to block requests without it. This is the recommended approach for most deployments.

**Configure Logpush with a secret header**

Any URL parameter starting with `header_` becomes an HTTP header in the request. When creating or updating your Logpush job, add the secret header to your destination URL:

```

https://logpush.yourdestinationendpoint.com?header_X-Logpush-Secret=YOUR_RANDOM_SECRET_TOKEN


```

Generate a strong random token using `openssl rand -hex 32`.

**Create a WAF custom rule**

In the proxy zone, go to **Security** \> **WAF** \> **Custom rules** and create a rule to block requests without the correct secret header.

* **Expression:**  
```  
(http.host eq "logpush.yourdestinationendpoint.com" and all(http.request.headers["x-logpush-secret"][*] ne "YOUR_RANDOM_SECRET_TOKEN"))  
```
* **Action:** Block

### Add ASN-based filtering

For defense in depth, add a rule to only allow traffic from Cloudflare's ASNs. Logpush traffic originates from Cloudflare's network (ASN 13335, 132892, or 202623).

* **Expression:**  
```  
(http.host eq "logpush.yourdestinationendpoint.com" and not ip.geoip.asnum in {13335 132892 202623})  
```
* **Action:** Block

Note

ASN filtering alone is insufficient because other Cloudflare customers' traffic also originates from these ASNs. Always combine with secret header validation.

### Use Access Service Tokens for high-security environments

For stronger authentication, use [Cloudflare Access Service Tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) for machine-to-machine authentication. Create a Service Token in the Zero Trust dashboard, then configure Logpush with the Access headers:

```

https://logpush.yourdestinationendpoint.com?header_CF-Access-Client-Id=YOUR_CLIENT_ID&header_CF-Access-Client-Secret=YOUR_CLIENT_SECRET


```

### Verify your security configuration

Test that your WAF rules are blocking unauthorized requests:

Terminal window

```

$ curl https://logpush.yourdestinationendpoint.com

# Expected: error code: 1020


$ curl -H "X-Logpush-Secret: wrong-token" https://logpush.yourdestinationendpoint.com

# Expected: error code: 1020


```

Check Cloudflare Analytics for the proxy zone to confirm Logpush traffic is flowing, and monitor WAF events to ensure unauthorized requests are blocked.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/egress-ip/#page","headline":"Dedicated Egress IP for Logpush · Cloudflare Logs docs","description":"Send Logpush logs via a dedicated egress IP.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/egress-ip/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/egress-ip/","name":"Dedicated Egress IP for Logpush"}}]}
```
