---
title: Custom domains
description: Add custom domains and subdomains to your Cloudflare Pages project.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom domains

When deploying your Pages project, you may wish to point custom domains (or subdomains) to your site.

## Add a custom domain

To add a custom domain:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project > **Custom domains**.
3. Select **Set up a domain**.
4. Provide the domain that you would like to serve your Cloudflare Pages site on and select **Continue**.
![Adding a custom domain for your Pages project through the Cloudflare dashboard](https://developers.cloudflare.com/_astro/domains.zq4iMU_J_ZYfYyK.webp) 

### Add a custom apex domain

If you are deploying to an apex domain (for example, `example.com`), then you will need to add your site as a Cloudflare zone and [configure your nameservers](#configure-nameservers).

#### Configure nameservers

To use a custom apex domain (for example, `example.com`) with your Pages project, [configure your nameservers to point to Cloudflare's nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/). If your nameservers are successfully pointed to Cloudflare, Cloudflare will proceed by creating a CNAME record for you.

### Add a custom subdomain

If you are deploying to a subdomain, it is not necessary for your site to be a Cloudflare zone. You will need to [add a custom CNAME record](#add-a-custom-cname-record) to point the domain to your Cloudflare Pages site. To deploy your Pages project to a custom apex domain, that custom domain must be a zone on the Cloudflare account you have created your Pages project on.

Note

If the zone is on the Enterprise plan, make sure that you [release the zone hold](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/#release-zone-holds) before adding the custom domain. A zone hold would prevent the custom subdomain from activating.

#### Add a custom CNAME record

If you do not want to point your nameservers to Cloudflare, you must create a custom CNAME record to use a subdomain with Cloudflare Pages. After logging in to your DNS provider, add a CNAME record for your desired subdomain, for example, `shop.example.com`. This record should point to your custom Pages subdomain, for example, `<YOUR_SITE>.pages.dev`.

| Type  | Name             | Content                |
| ----- | ---------------- | ---------------------- |
| CNAME | shop.example.com | <YOUR\_SITE>.pages.dev |

If your site is already managed as a Cloudflare zone, the CNAME record will be added automatically after you confirm your DNS record.

Note

To ensure a custom domain is added successfully, you must go through the [Add a custom domain](#add-a-custom-domain) process described above. Manually adding a custom CNAME record pointing to your Cloudflare Pages site - without first associating the domain (or subdomains) in the Cloudflare Pages dashboard - will result in your domain failing to resolve at the CNAME record address, and display a [522 error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-522/).

## Delete a custom domain

To detach a custom domain from your Pages project, you must modify your zone's DNS records.

1. Go to the **DNS Records** page for your website in the Cloudflare dashboard.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Locate your Pages project's CNAME record.
3. Select **Edit**.
4. Select **Delete**.
5. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
6. Select your Pages project.
7. Go to **Custom domains**.
8. Select the **three dot icon** next to your custom domain > **Remove domain**.

After completing these steps, your Pages project will only be accessible through the `*.pages.dev` subdomain you chose when creating your project.

## Disable access to `*.pages.dev` subdomain

To disable access to your project's provided `*.pages.dev` subdomain:

1. Use Cloudflare Access over your previews (`*.{project}.pages.dev`). Refer to [Customize preview deployments access](https://developers.cloudflare.com/pages/configuration/preview-deployments/#customize-preview-deployments-access).
2. Redirect the `*.pages.dev` URL associated with your production Pages project to a custom domain. You can use the account-level [Bulk Redirect](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/) feature to redirect your `*.pages.dev` URL to a custom domain.

## Caching

For guidelines on caching, refer to [Caching and performance](https://developers.cloudflare.com/pages/configuration/serving-pages/#caching-and-performance).

## Known issues

### CAA records

Certification Authority Authorization (CAA) records allow you to restrict certificate issuance to specific Certificate Authorities (CAs).

This can cause issues when adding a [custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/) to your Pages project if you have CAA records that do not allow Cloudflare to issue a certificate for your custom domain.

To resolve this, add the necessary CAA records to allow Cloudflare to issue a certificate for your custom domain.

```

example.com.            300     IN      CAA     0 issue "letsencrypt.org"

example.com.            300     IN      CAA     0 issue "pki.goog; cansignhttpexchanges=yes"

example.com.            300     IN      CAA     0 issue "ssl.com"

example.com.            300     IN      CAA     0 issuewild "letsencrypt.org"

example.com.            300     IN      CAA     0 issuewild "pki.goog; cansignhttpexchanges=yes"

example.com.            300     IN      CAA     0 issuewild "ssl.com"


```

Refer to the [Certification Authority Authorization (CAA) FAQ](https://developers.cloudflare.com/ssl/faq/#caa-records) for more information.

### Change DNS entry away from Pages and then back again

Once a custom domain is set up, if you change the DNS entry to point to something else (for example, your origin), the custom domain will become inactive. If you then change that DNS entry to point back at your custom domain, anybody using that DNS entry to visit your website will get errors until it becomes active again. If you want to redirect traffic away from your Pages project temporarily instead of changing the DNS entry, it would be better to use an [Origin rule](https://developers.cloudflare.com/rules/origin-rules/) or a [redirect rule](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) instead.

## Relevant resources

* [Debugging Pages](https://developers.cloudflare.com/pages/configuration/debugging-pages/) \- Review common errors when deploying your Pages project.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/custom-domains/#page","headline":"Custom domains · Cloudflare Pages docs","description":"Add custom domains and subdomains to your Cloudflare Pages project.","url":"https://developers.cloudflare.com/pages/configuration/custom-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/configuration/custom-domains/","name":"Custom domains"}}]}
```
