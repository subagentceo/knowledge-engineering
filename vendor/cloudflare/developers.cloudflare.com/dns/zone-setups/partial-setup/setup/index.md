---
title: Setup
description: A CNAME setup (also known as partial) allows you to use Cloudflare's reverse proxy while maintaining your primary and authoritative DNS provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setup

A CNAME setup (also known as partial setup) allows you to use [Cloudflare's reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) while maintaining your primary and authoritative DNS provider.

Use this option to proxy only individual subdomains through Cloudflare when you cannot change your authoritative DNS provider. You will be able to create A, AAAA, and CNAME records, which are the DNS record types that can be [proxied](https://developers.cloudflare.com/dns/proxy-status/).

Availability

A CNAME setup (partial) is only available to customers on a Business or Enterprise plan. Partial setups are not supported on Cloudflare Registrar domains.

---

## Before you begin

1. Create a Cloudflare account and add your domain.
2. Choose **Business** or **Enterprise** as your plan.
3. If you are onboarding a new domain to Cloudflare, ignore the instructions to change your nameservers.
4. (Recommended) Plan for SSL/TLS certificates:  
If you are only using [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) prior to converting your zone, a certificate will be provisioned for your subdomains only after each of the respective DNS records ([step 3](#3-add-dns-records) below) are [proxied](https://developers.cloudflare.com/dns/proxy-status/). Refer to [Enable Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#partial-dns-setup) for details.  
If your domain is sensitive to downtime, instead of using Universal SSL, consider using an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) with [delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/#setup).

## 1\. Convert your zone and review DNS records

* [ Dashboard ](#tab-panel-8137)
* [ API ](#tab-panel-8138)

Make sure you have the correct plan

Make sure your zone is on the Business or Enterprise plan. If you have Free or Pro, the options mentioned below will not be displayed.

1. On the **Overview** page, select **Convert to CNAME DNS Setup**.
2. Select **Convert** to confirm.
3. Save the information from the **Verification TXT Record**. If you lose the information, you can also access it on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page, under **Verification TXT Record**.
4. Make sure that you have all the DNS records (A, AAAA, or CNAME) for subdomains that you want to proxy through Cloudflare.

If you are adding a zone for the first time via API you can add it directly with a `type` of `partial`, without converting it.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Zone Edit`
* `Zone DNS Edit`

Create Zone

```

curl "https://api.cloudflare.com/client/v4/zones" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "example.com",

    "account": {

        "id": "YOUR_ACCOUNT_ID"

    },

    "type": "partial"

  }'


```

## 2\. Verify ownership for your domain

Add the **Verification TXT Record** at your authoritative DNS provider. Cloudflare will verify the TXT record and send a confirmation email. This can take up to a few hours.

Example verification record

A verification record for `example.com` might be:

| Type | Name                          | Content             |
| ---- | ----------------------------- | ------------------- |
| TXT  | cloudflare-verify.example.com | 966215192-518620144 |

Note

If your authoritative DNS provider automatically appends DNS record `name` fields with your domain, make sure to only insert `cloudflare-verify` as the record name. Otherwise, it may result in an incorrect record name, such as `cloudflare-verify.example.com.example.com`.

After creating the record, you can use this [Dig Web Interface link ↗](https://digwebinterface.com/?type=TXT&ns=auth&nameservers=) to search (`dig`) for `cloudflare-verify.<YOUR DOMAIN>` and validate if it is working.

The verification record must remain in place for as long as your domain is active on a CNAME setup on Cloudflare.

If your organization has multiple Cloudflare accounts, also consider using zone holds to have more control over [domain ownership](https://developers.cloudflare.com/dns/zone-setups/partial-setup/#domain-ownership).

## 3\. Add DNS records

1. At your authoritative DNS provider:  
   1. Create CNAME records pointing to `{your-hostname}.cdn.cloudflare.net` for every hostname you wish to proxy through Cloudflare.  
Example CNAME record at authoritative DNS provider  
The CNAME record for `www.example.com` would be:  
```  
www.example.com CNAME www.example.com.cdn.cloudflare.net  
```
2. Remove any previously existing A, AAAA, or CNAME records referencing the hostnames you want to proxy through Cloudflare. For these hostnames, leave only the records pointing to `{your-hostname}.cdn.cloudflare.net`.
3. Repeat this process for each subdomain that should be proxied to Cloudflare.

---

## Other record types

If you are preparing a conversion from CNAME setup (partial) to primary setup (full), or if you have a more specific use case, you can use the [Create DNS Record](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/) API endpoint to create DNS records of any supported type.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/#page","headline":"Set up a partial zone (CNAME setup) · Cloudflare DNS docs","description":"A CNAME setup (also known as partial) allows you to use Cloudflare's reverse proxy while maintaining your primary and authoritative DNS provider.","url":"https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/partial-setup/","name":"CNAME setup (Partial)"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/partial-setup/setup/","name":"Setup"}}]}
```
