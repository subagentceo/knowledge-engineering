---
title: Find account and zone IDs
description: Locate your Cloudflare account ID and zone ID in the dashboard for use with the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Find account and zone IDs

Once you [set up a new account](https://developers.cloudflare.com/fundamentals/account/) and [add your domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to Cloudflare, you may need access to your zone and account IDs for API operations.

## Copy your Account ID

1. In the Cloudflare dashboard, go to the **Account home** page.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Select the menu button at the end of the account row.![Screenshot of the Overview page with the API section highlighted](https://developers.cloudflare.com/_astro/overview-account-id.0vaDbwHf_Z21Ejkq.webp)
3. Select **Copy account ID**.

### Users with a single account

To copy the account ID when you only have one account:

1. In the Cloudflare dashboard, go to the **Account home** page and locate your account.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Select the menu button next to your account name.
3. From the list that appears, select **Copy account ID**.![Screenshot of the Overview page with the API section highlighted](https://developers.cloudflare.com/_astro/single-account-id.D7jBJK09_Z29PioK.webp)

## Copy your Zone ID

1. In the Cloudflare dashboard, go to the **Account** home and locate your account.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. From the **Overview** page for your account, locate the **API** section towards the bottom of the page.
![Screenshot of the Overview page with the API section highlighted](https://developers.cloudflare.com/_astro/dash-overview-api-highlighted.BUg6qi1p_IpAUW.webp) 
1. Under **Zone ID** select **Click to copy**. You can also find your **Account ID** under the **API** section.

## Find account ID (Workers and Pages)

You can also find your account ID from the **Workers & Pages** section of your account.

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. The **Account details** section contains your **Account ID**.
3. To copy the Account ID, select **Click to copy**.
![Screenshot of the Workers & Pages Overview page with the account ID section highlighted](https://developers.cloudflare.com/_astro/workers-account-id.BrhDn1KP_1SxaIU.webp) 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/#page","headline":"Find account and zone IDs · Cloudflare Fundamentals docs","description":"Locate your Cloudflare account ID and zone ID in the dashboard for use with the API.","url":"https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/find-account-and-zone-ids/","name":"Find account and zone IDs"}}]}
```
