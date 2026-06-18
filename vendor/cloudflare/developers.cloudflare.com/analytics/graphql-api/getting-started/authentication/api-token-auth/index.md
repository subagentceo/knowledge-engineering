---
title: Configure an Analytics API token
description: Learn about configure an analytics api token in Cloudflare analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure an Analytics API token

Cloudflare recommends API tokens as the preferred authentication method with Cloudflare APIs. This article walks through creating API tokens for authentication to the GraphQL Analytics API.

For more details on API tokens and the full range of supported options, refer to [Creating API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

To create an API token for authentication to the GraphQL Analytics API, use this workflow:

* [Access the Create API Token page](#access-the-create-api-token-page)
* [Configure a custom API token](#configure-a-custom-api-token)
* [Review and create your API token](#review-and-create-your-api-token)
* [Copy and test your API token](#copy-and-test-your-api-token)

## Access the Create API Token page

1. In the Cloudflare dashboard, go to the **Account API tokens** page.  
[ Go to **Account API tokens** ](https://dash.cloudflare.com/?to=/:account/api-tokens)
2. Select **Create Token**.
![API Tokens tab](https://developers.cloudflare.com/_astro/user-profile-api-tokens-tab.Cfjm5UAa_Z27c0cL.webp) 

The **Create API Token** page displays.

![Clicking Get started in the Create API Token page](https://developers.cloudflare.com/_astro/create-api-token-page-display.DTQbXvJf_1PY59q.webp) 

The next section of this walkthrough shows you how to configure a custom token for access to the GraphQL Analytics API.

## Configure a custom API token

To configure a custom token, follow these steps:

1. Select **Get started** in the **Custom token** section of the **Create API Token** page:
![Clicking Get started in the Create API Token page](https://developers.cloudflare.com/_astro/create-api-token-get-started.BaVcSeWC_ZdfidW.webp) 

The **Create Custom Token** page displays:

![Create Custom Token page](https://developers.cloudflare.com/_astro/create-custom-api-token.CFX0TYIj_Z1Saoga.webp) 
1. Enter a descriptive name for your token in the **Token name** text input field.
2. To configure access to the GraphQL Analytics API, use the **Permissions** drop-down lists.
3. To set permissions for the GraphQL Analytics API, select _Account_ in the first drop-down list, _Account Analytics_ from the second drop-down list, and _Read_ from the third.

This example scopes account-level permissions for read access to the Analytics API:

![Permissions configuration page](https://developers.cloudflare.com/_astro/create-custom-token-permissions.C95JIEHR_Z2t4MXb.webp) 
1. To configure the specific zones to which the token grants access, use the **Zone Resources** drop-down lists. In this example, the token is set to grant access to all zones:
![Resources configuration page](https://developers.cloudflare.com/_astro/create-custom-token-zone-resources.CfSpKkcP_2a7KPx.webp) 
1. To restrict the API token to specific IP addresses, use the **Client IP Address Filtering** controls.
![IP Address Filtering configuration page](https://developers.cloudflare.com/_astro/create-custom-token-ip-address-filtering.X4iaKSyi_Z2steW8.webp) 
1. To define how long the token is valid, select the **TTL** (time-to-live) start/end date.
![TTL configuration page](https://developers.cloudflare.com/_astro/create-custom-token-ttl.Bo81ViQe_11z701.webp) 
1. Select **Continue to summary**.

The next section of this walkthrough covers how to review and test your API token.

## Review and create your API token

Once you select **Continue to summary**, the **API Token Summary** page displays.

Use the **API Token Summary** to confirm that you have scoped the API Token to the desired permissions and resources before creating it.

![API Token Summary page](https://developers.cloudflare.com/_astro/api-token-summary.BcCShVRo_Z1LNqny.webp) 

Once you have validated your API token configuration, select **Create Token**.

## Copy and test your API token

When you create a new token, a confirmation page displays that includes your token and a custom `curl` command.

![Page displaying your API token and the curl command to test your token](https://developers.cloudflare.com/_astro/token-complete.Dg4S1W72_Qfk9z.webp) 

To copy the token to your device's clipboard, select the **Copy** button.

Warning

The token displays only on the confirmation page, so copy the token and store it safely, since anyone who has the token can use it to access your data.

If you lose the token, you can [regenerate it from the API Tokens page](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/), so that you do not have to configure all the permissions again.

To test your token, copy the `curl` command and paste it into a terminal.

When you have finished, select **View all API tokens**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/#page","headline":"Configure an Analytics API token · Cloudflare Analytics docs","description":"Learn about configure an analytics api token in Cloudflare analytics.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/getting-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/getting-started/authentication/","name":"Authentication"}},{"@type":"ListItem","position":6,"item":{"@id":"/analytics/graphql-api/getting-started/authentication/api-token-auth/","name":"Configure an Analytics API token"}}]}
```
