---
title: Block page
description: Display custom Access block pages.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Block page

You can customize the block page that displays when users fail to authenticate to an Access application. Each application can have a different block page.

Gateway block page

To customize the page that users see when they are blocked by a Gateway firewall policy, refer to [Gateway block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/).

## Types of block pages

Cloudflare Access offers three different block page options:

* **Default**: Displays a Cloudflare branded block page.
* **Custom Redirect URL** \- Redirects blocked requests to the specified URL. For example, you could redirect the user to a [dynamic Access Denied page ↗](https://github.com/cloudflare/cf-identity-dynamic) that fetches their identity and shows the exact reason they were blocked.
* **Custom Page Template** \- (Only available on Pay-as-you-go and Enterprise plans) Displays a [custom HTML page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/#create-a-custom-block-page) hosted by Cloudflare.

### Identity versus non-identity

You can display a different [type of block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/#types-of-block-pages) to users who fail an identity-based policy versus a non-identity policy.

* **Identity failure block page**: Displays when the user is blocked by an identity-based Access policy (such as email, user group, or external evaluation rule), after logging in to their identity provider.
* **Non-identity failure block page**: Displays when the user is blocked by a non-identity Access policy (such as country, IP, or device posture). Cloudflare checks non-identity attributes before prompting the user to login.

## Create a custom block page

Note

Only available on Pay-as-you-go and Enterprise plans.

To create a custom block page for Access:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Custom pages**.
2. Find the **Access Custom Pages** setting and select **Manage**.
3. Select **Add a page template**.
4. Enter a unique name for the block page.
5. In **Type**, select whether this is an [identity or non-identity block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/#identity-versus-non-identity).
6. In **Custom HTML**, enter the HTML code for your custom page. For example,  
```  
<!doctype html>  
<html>  
  <body>  
    <h1>Access denied.</h1>  
    <p>To obtain access, contact your IT administrator.</p>  
  </body>  
</html>  
```
7. To check the appearance of your custom page, select **Download** and open the HTML file in a browser.
8. Once you are satisfied with your custom page, select **Save**.

You can now select this block page when you [configure an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/block-page/#page","headline":"Block page · Cloudflare Learning Paths","description":"Display custom Access block pages.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/block-page/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/customize-ux/","name":"Customize the end user experience"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/customize-ux/block-page/","name":"Block page"}}]}
```
