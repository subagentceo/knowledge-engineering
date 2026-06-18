---
title: Deploy to production
description: Set up custom domains for preview URLs in production.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy to production

Only required for preview URLs

This guide covers `exposePort()` in production. Custom domain setup is ONLY needed if you use `exposePort()` to expose services from sandboxes. If your application does not use `exposePort()`, you can deploy to `.workers.dev` without this configuration.

For public URLs without custom-domain setup, [sandbox.tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/) is an alternative: quick tunnels for development, named tunnels for stable hostnames in production.

Deploy your Sandbox SDK application to production with preview URL support. Preview URLs require wildcard DNS routing because they generate unique subdomains for each exposed port: `https://8080-abc123.yourdomain.com`.

The `.workers.dev` domain does not support wildcard subdomains, so production deployments that use preview URLs need a custom domain.

Subdomain depth matters for TLS

If your worker runs on a subdomain (for example, `sandbox.yourdomain.com`), preview URLs become second-level wildcards like `*.sandbox.yourdomain.com`. Cloudflare's Universal SSL only covers first-level wildcards (`*.yourdomain.com`), so you need a certificate covering `*.sandbox.yourdomain.com`. Without it, preview URLs will fail with TLS handshake errors.

You have three options:

* **Deploy on the apex domain** (`yourdomain.com`) so preview URLs stay at the first level (`*.yourdomain.com`), which Universal SSL covers automatically. This is the simplest option.
* **Use [Advanced Certificate Manager](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/)** ($10/month) to provision a certificate for `*.sandbox.yourdomain.com` through the Cloudflare dashboard.
* **Upload a custom certificate** from a provider like [Let's Encrypt ↗](https://letsencrypt.org/) (free). Generate a wildcard certificate for `*.sandbox.yourdomain.com` using the DNS-01 challenge, then upload it via the Cloudflare dashboard under **SSL/TLS > Edge Certificates > [Custom Certificates](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/)**. You will need to renew it before expiry.

## Prerequisites

* Active Cloudflare zone with a domain
* Worker that uses `exposePort()`
* [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed

## Setup

### Create Wildcard DNS Record

In the Cloudflare dashboard, go to your domain and create an A record:

* **Type**: A
* **Name**: \* (wildcard)
* **IPv4 address**: 192.0.2.0
* **Proxy status**: Proxied (orange cloud)

This routes all subdomains through Cloudflare's proxy. The IP address `192.0.2.0` is a documentation address (RFC 5737) that Cloudflare recognizes when proxied.

### Configure Worker Routes

Add a wildcard route to your Wrangler configuration:

* [  wrangler.jsonc ](#tab-panel-10485)
* [  wrangler.toml ](#tab-panel-10486)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "my-sandbox-app",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "routes": [

    {

      "pattern": "*.yourdomain.com/*",

      "zone_name": "yourdomain.com"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "my-sandbox-app"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"


[[routes]]

pattern = "*.yourdomain.com/*"

zone_name = "yourdomain.com"


```

Replace `yourdomain.com` with your actual domain. This routes all subdomain requests to your Worker and enables Cloudflare to provision SSL certificates automatically.

### Deploy

Deploy your Worker:

Terminal window

```

npx wrangler deploy


```

## Verify

Test that preview URLs work:

TypeScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


const sandbox = getSandbox(env.Sandbox, 'test-sandbox');

await sandbox.startProcess('python -m http.server 8080');

const exposed = await sandbox.exposePort(8080, { hostname });


console.log(exposed.url);

// https://8080-test-sandbox.yourdomain.com


```

Visit the URL in your browser to confirm your service is accessible.

## Troubleshooting

* **CustomDomainRequiredError**: Verify your Worker is not deployed to `.workers.dev` and that the wildcard DNS record and route are configured correctly.
* **SSL/TLS errors**: Wait a few minutes for certificate provisioning. Verify the DNS record is proxied and SSL/TLS mode is set to "Full" or "Full (strict)" in your dashboard. If your worker is on a subdomain (for example, `sandbox.yourdomain.com`), Universal SSL won't cover the second-level wildcard `*.sandbox.yourdomain.com` — see the [TLS caution](#subdomain-depth-matters-for-tls) at the top of this page for options.
* **Preview URL not resolving**: Confirm the wildcard DNS record exists and is proxied. Wait 30-60 seconds for DNS propagation.
* **Port not accessible**: Ensure your service binds to `0.0.0.0` (not `localhost`) and that `proxyToSandbox()` is called first in your Worker's fetch handler.

For detailed troubleshooting, see the [Workers routing documentation](https://developers.cloudflare.com/workers/configuration/routing/).

## Related Resources

* [Preview URLs](https://developers.cloudflare.com/sandbox/concepts/preview-urls/) \- How preview URLs work
* [Expose Services](https://developers.cloudflare.com/sandbox/guides/expose-services/) \- Patterns for exposing ports
* [Tunnels API](https://developers.cloudflare.com/sandbox/api/tunnels/) \- Zero-config `*.trycloudflare.com` URLs for development (not for production)
* [Workers Routing](https://developers.cloudflare.com/workers/configuration/routing/) \- Advanced routing configuration
* [Cloudflare DNS](https://developers.cloudflare.com/dns/) \- DNS management

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/production-deployment/#page","headline":"Deploy to production · Cloudflare Sandbox SDK docs","description":"Set up custom domains for preview URLs in production.","url":"https://developers.cloudflare.com/sandbox/guides/production-deployment/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/production-deployment/","name":"Deploy to production"}}]}
```
