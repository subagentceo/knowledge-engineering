---
title: Isolate self-hosted application
description: Isolate self-hosted application in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Isolate self-hosted application

Note

Requires [Cloudflare Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/).

With Access policies, you can require users to open self-hosted applications in a secure [remote browser](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/). Because the remote browser is directly integrated into our Secure Web Gateway platform, [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) can be applied to isolated applications without needing to install the Cloudflare One Client. This allows you to distribute internal applications to unmanaged users while retaining control over sensitive data.

## Prerequisites

Your browser must [allow third-party cookies](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#allow-third-party-cookies-in-the-browser) on the application domain.

## Enable Browser Isolation

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Browser isolation** \> **Browser isolation settings**.
2. Turn on **Allow users to open a remote browser without the device client**.
1. Go to **Access controls** \> **Applications**.
2. Choose a [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) and select **Configure**.
3. Go to **Policies**.
4. Choose an [Allow policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) and select **Configure**.
5. Under **Additional settings**, turn on **Isolate application**.
6. Save the policy.

Browser Isolation is now enabled for users who match this policy. After the user logs into Access, the application will launch in a remote browser. To confirm that the application is isolated, refer to [Check if a web page is isolated](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/#3-check-if-a-web-page-is-isolated).

You can optionally add another Allow policy for users on managed devices who do not require isolation.

## Policies for isolated applications

Traffic to the isolated Access application is filtered by your Gateway [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/). Useful policies include:

* [Identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) to allow or block requests based on user identity.
* [Data Loss Prevention policies](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) to log or block transmission of sensitive data.
* [Isolation policies](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/) to disable browser actions such as copy/paste, printing, or file downloads.

For example, if your application is hosted on `internal.site.com`, the following policy blocks users from uploading and downloading credit card numbers within the remote browser:

| Selector    | Operator | Value                 | Logic | Action |
| ----------- | -------- | --------------------- | ----- | ------ |
| Domain      | in       | internal.site.com     | And   | Block  |
| DLP Profile | in       | Financial Information |       |        |

## Product compatibility

For a list of products that are incompatible with the **Isolate application** feature, refer to [Product Compatibility](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/#product-compatibility) .

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/isolate-application/#page","headline":"Isolate self-hosted application · Cloudflare One docs","description":"Isolate self-hosted application in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/isolate-application/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/policies/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/policies/isolate-application/","name":"Isolate self-hosted application"}}]}
```
