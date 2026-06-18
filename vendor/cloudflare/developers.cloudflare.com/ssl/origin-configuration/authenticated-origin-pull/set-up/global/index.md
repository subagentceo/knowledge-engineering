---
title: Global
description: Set up global Authenticated Origin Pulls for all hostnames.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Global

When you enable global Authenticated Origin Pulls (AOP), Cloudflare uses a Cloudflare-provided client certificate for all proxied traffic to your zone. This certificate is shared across all Cloudflare accounts and guarantees that the request is coming from the Cloudflare network.

Global, [zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/), and [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) AOP are independent configurations. Enabling or disabling one does not affect the others.

## Before you begin

* Make sure your zone is using an [SSL/TLS encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) of **Full** or higher.
* Consider your security and certificate needs:  
   * The Cloudflare-provided certificate is not exclusive to your account. It only guarantees that a request is coming from the Cloudflare network. If you need stricter security, set up [zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) or [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) AOP with your own certificate instead.  
   * Global AOP is applied to all proxied hostnames on your zone, including [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/) configured on a Cloudflare for SaaS zone. If you need a different AOP certificate for different custom hostnames, use [per-hostname AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/).

## 1\. Download the Cloudflare certificate

[Download the Cloudflare authenticated origin pull certificate (.PEM)](https://developers.cloudflare.com/ssl/static/authenticated%5Forigin%5Fpull%5Fca.pem) and upload it to your origin server. This certificate is **not** the same as the [Cloudflare Origin CA certificate](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/).

## 2\. Configure origin to accept client certificates

With the certificate installed, set up your origin web server to accept client certificates.

Check the examples below for Apache and NGINX or refer to your origin web server documentation - for example, [HAProxy ↗](https://www.haproxy.com/documentation/hapee/latest/security/authentication/client-certificate-authentication/), [Traefik ↗](https://doc.traefik.io/traefik/https/tls/#client-authentication-mtls), [Caddy ↗](https://caddyserver.com/docs/json/apps/http/servers/tls%5Fconnection%5Fpolicies/client%5Fauthentication/mode/).

Apache example

```

SSLCACertificateFile /path/to/origin-pull-ca.pem


```

For this example, you would have saved your certificate to `/path/to/origin-pull-ca.pem`.

Rename the downloaded .PEM file and upload it to `/path/to/origin-pull-ca.pem` before applying the settings. 

NGINX example

```

ssl_verify_client optional;

ssl_client_certificate /etc/nginx/certs/cloudflare.crt;


```

For this example, you would have saved your certificate to `/etc/nginx/certs/cloudflare.crt`.

Rename the downloaded .PEM file and upload it to `/etc/nginx/certs/cloudflare.crt` before applying the settings. 

At this point, you may also want to enable logging on your origin so that you can verify the configuration is working.

## 3\. Enable global Authenticated Origin Pulls

* [ Dashboard ](#tab-panel-10642)
* [ API ](#tab-panel-10643)

1. Go to the **Origin Server** page.  
[ Go to **Origin Server** ](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/origin)
2. Select the **Authenticated Origin Pulls** tab.
3. In the **Global** section, switch the toggle to **On**.

To enable or disable global Authenticated Origin Pulls with the API, use the [Edit zone setting endpoint](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) with `tls_client_auth` as the setting name in the URI path, and the `value` parameter set to your desired setting (`"on"` or `"off"`).

## 4\. Enforce validation check on your origin

Once you can confirm everything is working as expected for your specific origin setup, configure your origin to enforce the authentication.

Apache example

```

SSLVerifyClient require


```

NGINX example

```

ssl_verify_client on;


```

After completing the process, you can use `curl` to send requests directly to your origin IPs, verifying that the requests fail due to certificate validation being enforced.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/#page","headline":"Global authenticated origin pulls · Cloudflare SSL/TLS docs","description":"Set up global Authenticated Origin Pulls for all hostnames.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/","name":"Authenticated Origin Pulls (mTLS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/","name":"Setup"}},{"@type":"ListItem","position":6,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/set-up/global/","name":"Global"}}]}
```
