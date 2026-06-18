---
title: Publish a self-hosted application to the Internet
description: Publish a self-hosted web application with Cloudflare Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Publish a self-hosted application to the Internet

You can securely publish internal tools and applications by adding Cloudflare Access as an authentication layer between the end user and your origin server.

This page describes how to make a web application accessible to anyone on the Internet via a public hostname. To make the application available over a private IP or hostname, refer to [Add a self-hosted private application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/).

## Prerequisites

* An [active domain on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)
* Domain uses either a [full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or a [partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)

Note

If your domain uses a [partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), refer to [Partial (CNAME) setup](#partial-cname-setup) for additional DNS configuration steps.

## 1\. Add your application to Access

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **Self-hosted and private**.
4. Select **Add public hostname**.
5. In the **Domain** dropdown, select the domain that will represent the application. Domains must belong to an active zone in your Cloudflare account. You can use [wildcards](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/) to protect multiple parts of an application that share a root path.  
Alternatively, to use a [Cloudflare for SaaS custom hostname](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/secure-with-access/), select **Switch to custom input** and enter your custom hostname.
6. Under **Access policies**, add an existing policy or [create a new policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) to control who can connect to your application. All Access applications are deny by default -- a user must match an Allow policy before they are granted access.
7. Configure how users will authenticate:  
   1. Select the [identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) you want to enable for your application.  
   2. (Recommended) If you plan to only allow access via a single IdP, turn on **Apply instant authentication**. End users will not be shown the [Cloudflare Access login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/). Instead, Cloudflare will redirect users directly to your SSO login event.  
   3. (Optional) Turn on **Authenticate with Cloudflare One Client** to allow users to authenticate to the application using their [ Cloudflare One Client session identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
8. (Optional) Configure [independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#configure-independent-mfa-for-an-application) for the application.
9. In **Session Duration**, choose how often the user's [application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/) should expire.  
Cloudflare checks every HTTP request to your application for a valid application token. If the user's application token (and global token) has expired, they will be prompted to reauthenticate with the IdP. For more information, refer to [Session management](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/).
10. (Optional) Go to the **Additional settings** tab to customize the application experience:  
   * **App Launcher customization**: Configure how this application appears to users in the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/).  
   * **Custom block pages**: Choose what users will see when they are denied access to the application.  
         * **Cloudflare default**: Reload the [login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/) and display a block message below the Cloudflare Access logo. The default message is `That account does not have access`, or you can enter a custom message.  
         * **Redirect URL**: Redirect to the specified website.  
         * **Custom page template**: Display a [custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/) hosted in Cloudflare One.  
   * [**Cross-Origin Resource Sharing (CORS) settings**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/cors/)  
   * [**Cookie settings**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#cookie-settings)  
   * **401 Response for Service Auth policies**: Return a `401` response code when a user (or machine) makes a request to the application without the correct [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/).
11. Select **Create**.

## 2\. Connect your origin to Cloudflare

[Set up a Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) to publish your internal application. Only users who match your Access policies will be granted access.

Note

We recommend [creating an Access application](#1-add-your-application-to-access) before setting up the tunnel route. If you do not have an Access application in place, the published application will be available to anyone on the Internet.

If your application is already publicly routable, a tunnel is not strictly required. However, you will then need to protect your origin IP using [other methods](https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/).

## 3\. Validate the Access token

To secure your origin, you must validate the [application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/) issued by Cloudflare Access. Token validation ensures that any requests which bypass Cloudflare Access (for example, due to a network misconfiguration) are rejected.

One option is to configure the Cloudflare Tunnel daemon, `cloudflared`, to validate the token on your behalf. This is done by enabling [**Protect with Access**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/#access) in your Cloudflare Tunnel settings. Alternatively, if you do not wish to perform automatic validation with Cloudflare Tunnel, you can instead [manually configure your origin](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) to check all requests for a valid token.

Users can now connect to your self-hosted application after authenticating with Cloudflare Access.

## Partial (CNAME) setup

If your domain uses a [partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), Cloudflare does not manage your DNS zone. You must manually create DNS records at your external provider after adding a published application route to your tunnel.

### Add a published application route

In the tunnel configuration, [add a published application route](https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/#add-a-published-application-route) that maps a hostname to your internal service. For example, set the hostname to `app.example.com` and point it to `http://localhost:8080`.

### Create a CNAME record at your DNS provider

In a [full DNS setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/), Cloudflare automatically creates DNS records when you add a published application route to a tunnel. In a partial (`CNAME`) setup, you must add a CNAME record at the DNS provider that hosts your domain (your authoritative DNS provider).

At your external DNS provider, create a CNAME record with the following values:

* **Name**: The hostname you configured in the tunnel (for example, `app.example.com`)
* **Target**: `<HOSTNAME>.cdn.cloudflare.net` (for example, `app.example.com.cdn.cloudflare.net`)

Note

The zone apex (for example, `example.com`) cannot use a CNAME record due to [DNS specification restrictions ↗](https://datatracker.ietf.org/doc/html/rfc1912#section-2.4). Some DNS providers work around this with [CNAME flattening](https://developers.cloudflare.com/dns/zone-setups/partial-setup/#cname-flattening), which resolves the CNAME at the provider level. If your provider does not support CNAME flattening, use a subdomain instead.

## Product compatibility

When using Access self-hosted applications, the majority of Cloudflare products will be compatible with your application.

However, the following products are not supported:

* [Automatic Platform Optimization](https://developers.cloudflare.com/automatic-platform-optimization)
* [Zaraz](https://developers.cloudflare.com/zaraz)
* [Google tag gateway for advertisers](https://developers.cloudflare.com/google-tag-gateway)

You can disable Zaraz for a specific application - instead of across your entire zone - using a [Configuration Rule](https://developers.cloudflare.com/rules/configuration-rules/) scoped to the application domain.

Google tag gateway is configured at the zone level and cannot be scoped to specific hostnames. To use Access binding cookie on a hostname, disable Google tag gateway for the entire zone.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/#page","headline":"Publish a self-hosted application to the Internet · Cloudflare One docs","description":"Publish a self-hosted web application with Cloudflare Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/","name":"Publish a self-hosted application to the Internet"}}]}
```
