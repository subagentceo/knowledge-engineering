---
title: HTTP Strict Transport Security (HSTS)
description: Enforce HTTPS connections with HSTS response headers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP Strict Transport Security (HSTS)

HSTS protects HTTPS web servers from downgrade attacks. These attacks redirect web browsers from an HTTPS web server to an attacker-controlled server, allowing bad actors to compromise user data and cookies.

HSTS adds an HTTP header that directs [compliant web browsers](https://developers.cloudflare.com/ssl/reference/browser-compatibility/) to:

* Transform HTTP links to HTTPS links
* Prevent users from bypassing SSL browser warnings

Before enabling HSTS, review the [requirements](#requirements).

Note

For more background information on HSTS, see the [introductory blog post ↗](https://blog.cloudflare.com/enforce-web-policy-with-hypertext-strict-transport-security-hsts/).

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

## Requirements

In order for HSTS to work as expected, you need to:

* Have enabled HTTPS before HSTS so browsers can accept your HSTS settings
* Keep HTTPS enabled so visitors can access your site

Once you enabled HSTS, avoid the following actions to ensure visitors can still access your site:

* Changing your DNS records from [Proxied to DNS only](https://developers.cloudflare.com/dns/proxy-status/)
* [Pausing Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/) on your site
* Pointing your nameservers away from Cloudflare
* Redirecting HTTPS to HTTP
* Disabling SSL (invalid or expired certificates or certificates with mismatched hostnames)

Warning

If you remove HTTPS before disabling HSTS or before waiting for the duration of the original **Max Age Header** specified in your Cloudflare HSTS configuration, your website becomes inaccessible to visitors for the duration of the Max Age Header or until you enable HTTPS.

## Enable HSTS

* [ Dashboard ](#tab-panel-10590)
* [ API ](#tab-panel-10591)

To enable HSTS using the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **HTTP Strict Transport Security (HSTS)**, select **Enable HSTS**.
3. Read the dialog and select **I understand**.
4. Select **Next**.
5. Configure the [HSTS settings](#configuration-settings).
6. Select **Save**.

To enable HSTS with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) request with `security_header` as the setting name in the URI path, and specify the `value` object that includes your HSTS settings.

Note

To enable HSTS on a specific subdomain only, configure a [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/). Alternatively, you can add the appropriate HSTS header at the origin, or use a [response header transform rule](https://developers.cloudflare.com/rules/transform/response-header-modification/).

## Disable HSTS

To disable HSTS on your website:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.  
[ Go to **Edge Certificates** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **HTTP Strict Transport Security (HSTS)**, select **Enable HSTS**.
3. Set the **Max Age Header** to **0 (Disable)**.
4. If you previously enabled the **No-Sniff** header and want to remove it, set it to **Off**.
5. Select **Save**.

## Configuration settings

| Name                                                | Required | Description                                                                                                                                                                                               | Options                                 |
| --------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Enable HSTS (Strict-Transport-Security)             | Yes      | Serves HSTS headers to browsers for all HTTPS requests. HTTP (non-secure) requests will not contain the header.                                                                                           | Off / On                                |
| Max Age Header (max-age)                            | Yes      | Specifies duration for a browser HSTS policy and requires HTTPS on your website.                                                                                                                          | Disable, or a range from 1 to 12 months |
| Apply HSTS policy to subdomains (includeSubDomains) | No       | Applies the HSTS policy from a parent domain to subdomains. Subdomains are inaccessible if they do not support HTTPS.                                                                                     | Off / On                                |
| Preload                                             | No       | Permits browsers to automatically preload HSTS configuration. Prevents an attacker from downgrading a first request from HTTPS to HTTP. Preload can make a website without HTTPS completely inaccessible. | Off / On                                |
| No-Sniff Header                                     | No       | Sends the X-Content-Type-Options: nosniff header to prevent Internet Explorer and Chrome from automatically detecting a content type other than those explicitly specified by the Content-Type header.    | Off / On                                |

Note

Once HSTS **Preload** is configured, submit requests for addition to each browser’s preload list. Chrome, Firefox/Mozilla, and Safari use the Chrome preload list. A minimum **Max Age Header** of 12 months is required for inclusion in HSTS preload lists.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/#page","headline":"HTTP Strict Transport Security (HSTS) · Cloudflare SSL/TLS docs","description":"Enforce HTTPS connections with HSTS response headers.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/http-strict-transport-security/","name":"HTTP Strict Transport Security (HSTS)"}}]}
```
