---
title: Authorization cookie
description: Learn how Cloudflare Access uses CF_Authorization cookies to secure self-hosted web applications.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Authorization cookie

When you protect a site with Cloudflare Access, Cloudflare checks every HTTP request bound for that site to ensure that the request has a valid `CF_Authorization` cookie. If a request does not include the cookie, Access will block the request.

## Access JWTs

The `CF_Authorization` cookie contains the user's identity in the form of a [JSON Web Token (JWT) ↗](https://www.cloudflare.com/learning/access-management/token-based-authentication/). Cloudflare securely creates these tokens through the OAUTH or SAML integration between Cloudflare Access and the configured identity provider.

Access generates two separate `CF_Authorization` tokens depending on the domain:

* **Global session token**: Generated when a user logs in to Access. This token is stored as a cookie at your team domain (for example, `https://<your-team-name>.cloudflareaccess.com`) and prevents a user from needing to log in to each application.
* [**Application token**](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/): Generated for each application that a user reaches. This token is stored as a cookie on the protected domain (for example, `https://jira.site.com`) and may be used to [validate requests](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json) on your origin.

### Multi-domain applications

Cloudflare Access allows you to protect and manage multiple domains in a single [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/). After a user has successfully authenticated to one domain, Access will automatically issue a `CF_Authorization` cookie when they go to another domain in the same Access application. This means that users only need to authenticate once to a multi-domain application.

For Access applications with five or fewer domains, Access preemptively sets the cookie for all domains through a series of redirects when the user first authenticates. This allows single-page applications (SPAs) to retrieve data from other subdomains without requiring the user to visit each subdomain individually. Wildcarded subdomains (for example, `*.example.com`) cannot receive preemptive cookies because Access does not know which concrete subdomain to redirect to. Wildcarded paths are supported.

For Access applications with more than five domains, Access does not preemptively set cookies. Instead, cookies are issued as the user visits each domain. This avoids the latency that would result from redirecting through a large number of domains during authentication.

## Access cookies

The following Access cookies are essential to Access functionality. Cookies that are marked as required cannot be opted out of. The following cookies are not used for tracking or analytics.

### CF\_Authorization (team domain)

| Details                                                                                                                                                                                                                                                                                                                                                                                        | Expiration                                                                                                                                                                                                                                                                                                                                                                                                    | HttpOnly | SameSite | Required? |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------- |
| [JSON web token (JWT)](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#access-jwts) set on the cloudflareaccess.com [team domain](https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#what-is-a-team-domainteam-name) that contains the user's identity and enables Access to perform single sign-on (SSO) | ViewIf set, adheres to [global session duration](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#global-session-duration).If not, adheres to [application session duration](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#application-session-duration).If neither are set, defaults to 24 hours. | Yes      | None     | Required  |

### CF\_Authorization (Access application domain)

| Details                                                                                                                                                                                                                                                                                          | Expiration                                                                                                                                                                                                                                                                                                                                                                                                    | HttpOnly                     | SameSite                     | Required? |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------------- | --------- |
| [JSON web token (JWT)](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#access-jwts) set on the domain protected by Access that allows Access to confirm that the user has been authenticated and is authorized to reach the origin | ViewIf set, adheres to [policy session duration](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#policy-session-duration).If not, adheres to [application session duration](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#application-session-duration).If neither are set, defaults to 24 hours. | Admin choice (Default: None) | Admin choice (Default: None) | Required  |

### CF\_Binding

| Details                                                                                                                                                 | Expiration                                                                                                                                                                                                                                                                                                                                                                                                    | HttpOnly | SameSite | Required? |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------- |
| Refer to [Binding cookie](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#binding-cookie) | ViewIf set, adheres to [policy session duration](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#policy-session-duration).If not, adheres to [application session duration](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#application-session-duration).If neither are set, defaults to 24 hours. | Yes      | None     | Optional  |

### CF\_Session

| Details                                                                                                                                                                                                                                                   | Expiration | HttpOnly | SameSite | Required? |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | --------- |
| [CSRF ↗](https://www.cloudflare.com/learning/security/threats/cross-site-request-forgery/) token used on the cloudflareaccess.com [team domain](https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#what-is-a-team-domainteam-name) | 4 hours    | Yes      | None     | Required  |

### CF\_AppSession

| Details                                                                                                                                                                       | Expiration | HttpOnly | SameSite | Required? |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | --------- |
| [CSRF ↗](https://www.cloudflare.com/learning/security/threats/cross-site-request-forgery/) token used per application domain, scoped to individual applications behind Access | 24 hours   | Yes      | None     | Required  |

### CF\_Device

| Details                                                                                                                                                                                                                                                                                                                                                                                                                                            | Expiration | HttpOnly | SameSite | Required? |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | --------- |
| Cookie set on the cloudflareaccess.com [team domain](https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#what-is-a-team-domainteam-name), used to prevent abuse of [one-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) and [multi-factor authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/) flows | 30 days    | Yes      | Strict   | Required  |

## Cookie settings

Cloudflare Access provides optional security settings that can be added to the browser cookies generated by Access for an authenticated user.

* [SameSite](#samesite-attribute)
* [HttpOnly flag](#httponly)
* [Binding cookie](#binding-cookie)
* [Cookie path](#cookie-path-attribute)

To enable these settings:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Locate the application you would like to configure and select **Configure**.
3. Select **Advanced settings** and scroll down to **Cookie settings**.
4. Configure the desired cookie settings.
5. Select **Save**.

### SameSite Attribute

The [SameSite ↗](https://web.dev/samesite-cookies-explained/) Attribute selector restricts the cookie to only being sent if the cookie's defined site matches the site being requested in the browser. This adds protection against [cross-site request forgery (CSRF) ↗](https://en.wikipedia.org/wiki/Cross-site%5Frequest%5Fforgery).

The selector options are:

* **None** \- Cookies will be sent in all contexts, including cross-origin requests.
* **Lax** \- Cookies are allowed to be sent with top-level navigations and will be sent along with GET requests initiated by third party websites.
* **Strict** \- Cookies will only be sent in a first-party context and not be sent along with requests initiated by third party websites.

Refer to the [Mozilla documentation ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#samesitesamesite-value) for more information.

Warning

If you are receiving the `ERR_TOO_MANY_REDIRECTS` errors, make sure your `SameSite` setting is set to None or Lax. Setting the `SameSite` setting to Strict can result in too many redirects.

#### When not to use SameSite

Do not enable `SameSite` restrictions if you have additional sites or applications that rely on a specific application's authorization cookie.

### HttpOnly

The `HttpOnly` flag is a cookie attribute that prevents the cookie from being accessed by any client-side scripts, reducing the likelihood of Cross-Site Scripting (XSS) attacks. This flag is enabled by default.

#### When not to use HttpOnly

Do not enable `HttpOnly` if:

* You are using the Access application for non-browser based tools (such as SSH or RDP).
* You have software that relies on being able to access a user's cookie generated by Access.

### Binding cookie

The binding cookie (`CF_Binding`) is an optional cookie issued when a user successfully authenticates. The binding cookie is sent by the user's browser and tied to a specific application's `CF_Authorization` cookie. This cookie is stripped at Cloudflare's network and never forwarded to the origin server.

The `CF_Authorization` cookie cannot be used without the associated binding cookie, which prevents a stolen `CF_Authorization` cookie from being reused by an attacker. If a request arrives at Cloudflare's network with a valid `CF_Authorization` cookie but without the expected binding cookie, Cloudflare rejects the request.

#### When not to use Binding Cookie

Do not enable Binding Cookie if:

* You are using the Access application for non-browser based tools (such as SSH or RDP).
* You have enabled [incompatible Cloudflare products](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/#product-compatibility) on the application domain, such as [Zaraz](https://developers.cloudflare.com/zaraz) or [Google tag gateway](https://developers.cloudflare.com/google-tag-gateway/). Enabling Binding Cookie alongside these products can cause an authentication redirect loop (`ERR_TOO_MANY_REDIRECTS`).
* You have turned on [Authenticate with Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/) for the application.

### Cookie Path Attribute

The Cookie Path Attribute adds the application's path URL to the `CF_Authorization` cookie. When enabled, a user who logs in to `example.com/path1` must re-authenticate to access `example.com/path2`. When disabled, the `CF_Authorization` cookie is only scoped to the domain and subdomain.

## Allow third-party cookies in the browser

By default, some browsers block all third-party cookies in private browsing mode, including the `CF_Authorization` cookie. For XHR requests to work in private windows, you will need to exempt your application and team domain from the browser's tracking protection system.

To enable third-party cookies for an Access application:

Chrome

1. Go to **Settings** \> **Privacy and security** \> **Cookies and other site data**.
2. Under **Sites that can always use cookies**, add the following URLs:  
   * Hostname of your Access application (for example, `https://jira.site.com`)  
   * `https://<your-team-name>.cloudflareaccess.com`

Safari

1. Go to **Safari** \> **Settings** \> **Privacy**.
2. Deselect **Block all cookies**.

Firefox

1. Go to **Settings** \> **Privacy & Security**.
2. Scroll down to **Cookies and Site Data**.
3. Select **Manage Exceptions**.
4. Enter the URL of your Access application (for example, `https://jira.site.com`) and select **Allow**.
5. Enter `https://<your-team-name>.cloudflareaccess.com` and select **Allow**.
6. Select **Save Changes**.

Brave

1. Go to `brave://settings/cookies`.
2. Under **Sites that can always use cookies**, add the following URLs:  
   * Hostname of your Access application (for example, `https://jira.site.com`)  
   * `https://<your-team-name>.cloudflareaccess.com`

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#page","headline":"Authorization cookie · Cloudflare One docs","description":"Learn how Cloudflare Access uses CF\\_Authorization cookies to secure self-hosted web applications.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies","JSON web token (JWT)"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/","name":"Authorization cookie"}}]}
```
