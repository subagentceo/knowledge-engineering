---
title: Generic OIDC application
description: Generic OIDC application in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Generic OIDC application

This page provides generic instructions for setting up a SaaS application in Cloudflare Access using the OpenID Connect (OIDC) authentication protocol.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to the account of the SaaS application

## 1\. Get SaaS application URL

In your SaaS application account, obtain the **Redirect URL** (also known as the callback URL). This is the SaaS endpoint where users are redirected to after they authenticate with Cloudflare Access.

Some SaaS applications provide the Redirect URL after you [configure the SSO provider](#3-configure-sso-in-your-saas-application).

## 2\. Add your application to Access

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **SaaS application**.
4. Select your **Application** from the drop-down menu. If your application is not listed, enter a custom name in the **Application** field and select the textbox that appears below.
5. Select **OIDC**.
6. Select **Add application**.
7. In **Scopes**, select the user attributes that you want Access to send in the ID token. For more information about configuring OIDC scopes and claims, refer to [OIDC claims](#oidc-claims).
8. In **Redirect URLs**, enter the callback URL obtained from the SaaS application.
9. (Optional) Enable [Proof of Key Exchange (PKCE) ↗](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.
10. Copy the following values to input into your SaaS application. Different SaaS applications may require different sets of input values.  
| Field                  | Description                                                                                                                                                                                                                                                                           |  
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| Client secret          | Credential used to authorize Access as an SSO provider                                                                                                                                                                                                                                |  
| Client ID              | Unique identifier for this Access application                                                                                                                                                                                                                                         |  
| Configuration endpoint | If supported by your SaaS application, you can configure OIDC using this endpoint instead of manually entering the URLs listed below. https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/.well-known/openid-configuration                              |  
| Issuer                 | Base URL for this OIDC integration https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>                                                                                                                                                                  |  
| Token endpoint         | Returns the user's ID token https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/token                                                                                                                                                                   |  
| Authorization endpoint | URL where users authenticate with Access https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/authorization                                                                                                                                              |  
| Key endpoint           | Returns the current public keys used to [verify the Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/jwks |  
| User info endpoint     | Returns all user claims in JSON format https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/userinfo                                                                                                                                                     |
11. Under **Access policies**, add an existing policy or [create a new policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) to control who can connect to your application. All Access applications are deny by default -- a user must match an Allow policy before they are granted access.
12. Configure how users will authenticate:  
   1. Select the [identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) you want to enable for your application.  
   2. (Recommended) If you plan to only allow access via a single IdP, turn on **Apply instant authentication**. End users will not be shown the [Cloudflare Access login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/). Instead, Cloudflare will redirect users directly to your SSO login event.  
   3. (Optional) Turn on **Authenticate with Cloudflare One Client** to allow users to authenticate to the application using their [ Cloudflare One Client session identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
13. (Optional) Go to **Additional settings** to customize the application experience:  
   * **App Launcher customization**: Configure how this application appears to users in the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/). If **Show application in App Launcher** is enabled, then you must enter an **App Launcher URL**. The App Launcher URL is provided by the SaaS application. It may match the base URL portion of **Redirect URL** (`https://<INSTANCE-NAME>.example-app.com`) but could be a different value.  
   * **Custom block pages**: Choose what users will see when they are denied access to the application.  
         * **Cloudflare default**: Reload the [login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/) and display a block message below the Cloudflare Access logo. The default message is `That account does not have access`, or you can enter a custom message.  
         * **Redirect URL**: Redirect to the specified website.  
         * **Custom page template**: Display a [custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/) hosted in Cloudflare One.
14. Select **Create**.

## 3\. Configure SSO in your SaaS application

Next, configure your SaaS application to require users to log in through Cloudflare Access. Refer to your SaaS application documentation for instructions on how to configure a third-party OIDC SSO provider.

## 4\. Test the integration

Open an incognito browser window and go to the SaaS application's login URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

## OIDC claims

OIDC claims refer to the user identity characteristics that Cloudflare Access shares with your OIDC SaaS application upon successful authentication. An OIDC scope defines a set of OIDC claims. By default, Cloudflare Access passes all [standard claims ↗](https://openid.net/specs/openid-connect-core-1%5F0.html#StandardClaims) that are included in the `openid`, `email`, `profile`, and `groups` scopes (if available).

| Scope   | Description                                                       |
| ------- | ----------------------------------------------------------------- |
| openid  | Includes a unique identifier for the user (required).             |
| email   | Includes the user's email address.                                |
| profile | Includes the user's name and all custom OIDC claims from the IdP. |
| groups  | Include the user's IdP group membership.                          |

In your Access application, you can configure the OIDC scopes and claims that Access sends to the SaaS provider. For example, you can remove the `groups` scope if your SaaS application does not need to receive user group information.

### Filter groups

In **Group filter regex**, you can enter a regular expression to define the identity provider groups that you want to include in the `groups` scope. For example, if you enter the expression `(^TEAM-Engineering-.$)|(^TEAM-Product-.$)`, only groups with names like TEAM-Engineering-A or TEAM-Product-B would get passed to the SaaS application.

### Add claims

To add additional OIDC claims onto the ID token sent to your SaaS application, configure the following fields for each claim:

* **Name**: OIDC claim name
* **Scope**: Select the OIDC scope where this claim should be included. In most cases, we recommend selecting `profile` since it already includes other custom claims from the IdP.
* **IdP claim**: The identity provider value that should map to this OIDC claim. You can select any [SAML attribute](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#saml-headers-and-attributes) or [OIDC claim](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) that was configured in a Zero Trust IdP integration.
* **Required**: If a claim is marked as required but is not provided by an IdP, Cloudflare will fail the authentication request and show an error page.
* **Add per IdP claim**: (Optional) If you turned on multiple identity providers for the SaaS application, you can choose different attribute mappings for each IdP. These values will override the parent **IdP claim**.

## Advanced settings

### Access token lifetime

The OIDC Access token authorizes users to connect to the SaaS application through Cloudflare Access. You can set an **Access token lifetime** to determine the window in which the token can be used to establish authentication with the SaaS application — if it expires, the user must re-authenticate through Cloudflare Access. To balance security and user convenience, Cloudflare recommends configuring a short Access token lifetime in conjunction with a longer **Refresh token lifetime** (if supported by your application). When the access token expires, Cloudflare will use the refresh token to obtain a new access token after checking the user's identity against your Access policies. When the refresh token expires, the user will need to log back in to the identity provider. The refresh token lifetime should be less than your [global session duration](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/), otherwise the global session would take precedence.

Note

OIDC Access tokens only control the front door to a SaaS app; Access does not control how long the user can stay in the SaaS app itself. For example, if the user logs out of the SaaS app and then comes back to it, a valid Access token allows them to re-authenticate without another login. The SaaS app issues its own authorization cookie that manages the user's session within the app.

### OIDC flows

Some SaaS applications require SSO providers to provide tokens to the browser without backend authentication. Access for SaaS supports the following OIDC flows:

* **No additional OIDC flows**: (Default) Recommended unless your application requires additional flows.
* **Hybrid flows**: Used by applications that require information from the ID token before authenticating the user.
* **Implicit flows**: (Not recommended) Typically used by frontend applications that cannot store secrets and which do not support **PKCE without client secret**.

Cloudflare allows various `response_type` values in the authorization request depending on the selected flow. For example, the implicit flow allows Cloudflare to return the ID token, Access token, or both the ID token and Access token from the Authorization endpoint.

| response\_type values | Default flow | Hybrid flow | Implicit flow |
| --------------------- | ------------ | ----------- | ------------- |
| code                  | ✅            | ✅           | ❌             |
| id\_token             | ❌            | ✅           | ✅             |
| token                 | ❌            | ✅           | ✅             |

To include `id_token` in the authorization request, turn on **Return ID Token from Authorization Endpoint**. To include `token`, turn on **Return Access Token from Authorization Endpoint**

Note

[Refresh tokens](#access-token-lifetime) are not supported with Hybrid or Implicit flows.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-oidc-saas/#page","headline":"Generic OIDC application · Cloudflare One docs","description":"Generic OIDC application in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-oidc-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-oidc-saas/","name":"Generic OIDC application"}}]}
```
