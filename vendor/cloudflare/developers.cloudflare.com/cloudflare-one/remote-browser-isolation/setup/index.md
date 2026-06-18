---
title: Set up Browser Isolation
description: Set up Browser Isolation in Browser Isolation.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up Browser Isolation

Browser Isolation is enabled through [Secure Web Gateway HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/). By default, no traffic is isolated until you have added an Isolate policy to your HTTP policies.

## 1\. Connect devices to Cloudflare

Setup instructions vary depending on how you want to connect your devices to Cloudflare. Refer to the links below to view the setup guide for each deployment option.

| Connection                                                                                                                                 | Mode         | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Traffic and DNS mode](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/)                                | In-line      | Apply identity-based HTTP policies to traffic proxied through the Cloudflare One Client.                                                                                       |
| [Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/isolate-application/)                                   | In-line      | Apply identity-based HTTP policies to Access applications that are rendered in a remote browser.                                                                               |
| [Gateway proxy endpoint](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/non-identity/)                    | In-line      | Apply non-identity HTTP policies to traffic forwarded to a [proxy endpoint](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/). |
| [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/non-identity/)                            | In-line      | Apply non-identity HTTP policies to traffic connected through a GRE or IPsec tunnel (site-to-site encrypted connections to Cloudflare's network).                              |
| [Clientless remote browser](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) | Prefixed URL | Render web pages in a remote browser when users go to https://<your-team-name>.cloudflareaccess.com/browser/<URL>.                                                             |

**In-line** mode means traffic is inspected as it flows through Gateway — users browse to websites using normal URLs, not a special Cloudflare prefix. Some in-line methods require device or network configuration, such as installing the Cloudflare One Client or configuring a PAC file. **Prefixed URL** mode requires users to visit a Cloudflare-hosted URL that wraps the target website.

## 2\. Build an Isolation policy

To configure Browser Isolation policies:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Traffic policies** \> **Firewall policies** \> **HTTP**.
2. Select **Add a policy** and enter a name for the policy.
3. Use the HTTP policy [selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#selectors) and [operators](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#comparison-operators) to specify the websites or content you want to isolate.
4. For **Action**, choose either [_Isolate_](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#isolate) or [_Do not Isolate_](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#do-not-isolate).
5. (Optional) Configure [settings](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#policy-settings) for an Isolate policy.
6. Select **Create policy**.

Next, [verify that your policy is working](#3-check-if-a-web-page-is-isolated).

## 3\. Check if a web page is isolated

Users can see if a webpage is isolated by using one of the following methods:

* Select the padlock in the address bar and check for the presence of a Cloudflare Root CA.
* Right-click the web page and view the context menu options.

### Normal browsing

* A non-Cloudflare root certificate indicates that Cloudflare did not proxy this web page. The root certificate is the certificate authority (CA) that your browser trusts to verify the site's identity.  
![Website does not present a Cloudflare root certificate](https://developers.cloudflare.com/_astro/non-cloudflare-root-ca.DUtGDw33_ZFcJnQ.webp)
* The right-click context menu will have all of the normal options.  
![Normal right-click menu in browser](https://developers.cloudflare.com/_astro/non-isolated-browser.B9h2hRe6_Z19cAm7.webp)

### Isolated browsing

* A Cloudflare root certificate indicates traffic was proxied through Cloudflare Gateway.  
![Website presents a Cloudflare root certificate](https://developers.cloudflare.com/_astro/cloudflare-gateway-root-ca.DLxxnVYn_ZdwfJP.webp)
* The right-click context menu will be simplified.  
![Simplified right-click menu in browser](https://developers.cloudflare.com/_astro/isolated-browser.CBtYLGGn_141dVf.webp)

#### Disconnect Browser Isolation

Cloudflare One Client users can temporarily disable remote browsing by [disconnecting the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#lock-device-client-switch). Once the Cloudflare One Client is disconnected, a refresh will return the non-isolated page.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/#page","headline":"Set up Browser Isolation · Cloudflare One docs","description":"Set up Browser Isolation in Browser Isolation.","url":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/remote-browser-isolation/","name":"Remote browser isolation"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/remote-browser-isolation/setup/","name":"Set up Browser Isolation"}}]}
```
