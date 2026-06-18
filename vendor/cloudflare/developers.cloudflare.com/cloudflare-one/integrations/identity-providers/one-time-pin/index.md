---
title: One-time PIN login
description: One-time PIN login in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# One-time PIN login

Cloudflare Access can send a one-time PIN (OTP) to approved email addresses as an alternative to integrating an identity provider. You can simultaneously configure OTP login and the identity provider of your choice to allow users to select their own authentication method.

For example, if your team uses Okta but you are collaborating with someone outside your organization, you can use OTP to grant access to guests.

Note

Access and the Cloudflare One Client will evaluate identity based on a user's last-known state. If a user authenticates via your Identity Provider, but later authenticates with a different method (such as One-Time PIN), Access will no longer evaluate the user's Identity Provider group memberships. Identity Provider group memberships are created and managed by the IdP and group membership data can only persist in an IdP-based authentication.

## Set up OTP

* [ Dashboard ](#tab-panel-7224)
* [ API ](#tab-panel-7225)
* [ Terraform (v5) ](#tab-panel-7226)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **One-time PIN**.

Make a `POST` request to the [Identity Providers](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/identity%5Fproviders/methods/create/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Organizations, Identity Providers, and Groups Write`

Add an Access identity provider

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "One-time PIN login",

    "type": "onetimepin",

    "config": {}

  }'


```

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Access: Organizations, Identity Providers, and Groups Write`
2. Configure the [cloudflare\_zero\_trust\_access\_identity\_provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fidentity%5Fprovider) resource:  
```  
resource "cloudflare_zero_trust_access_identity_provider" "onetimepin_login" {  
  account_id = var.cloudflare_account_id  
  name       = "One-time PIN login"  
  type       = "onetimepin"  
  config      = {}  
}  
```

Tip

If your organization uses a third-party email scanning service (for example, Mimecast or Barracuda), add `noreply@notify.cloudflare.com` to the email scanning allowlist.

To grant a user access to an application, simply add their email address to an [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/#create-a-policy).

## Log in with OTP

To log in to Access using the one-time PIN:

1. Go to the application protected by Access.
2. On the Access login page, enter your email address and select **Send login code**.![Enter email to sign in with OTP.](https://developers.cloudflare.com/_astro/otp1.CDOVB8yE_2oGUEX.webp)
3. If the email is allowed by an Access policy, you will receive a PIN in your inbox. This secure PIN expires 10 minutes after the initial request.

Note

By design, blocked users will not receive an email. The login page will always say **A code has been emailed to you**, regardless of whether or not an email was sent.

1. Paste the PIN into the Access login page and select **Sign in**.![Enter PIN to sign in.](https://developers.cloudflare.com/_astro/otp2.CPS5ZkdL_2pa0u3.webp)  
   * If the code was valid, you will be redirected to the application.  
   * If the code was invalid, you will see **That account does not have access.**  
   * If you see **This One-Time PIN has already been used**, the code was already consumed. This typically occurs when an email security tool on your network automatically scans the email and follows the link before you enter the code. Select **Request new code** and try again.

Note

Access only logs an authentication attempt after the user enters a code. If the user enters their email but never submits a code, the event will not appear in your [audit logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/#authentication-logs).

## OTP behavior and limits

Keep the following behavior in mind when troubleshooting OTP logins:

* Each PIN is single-use.
* Requesting a new PIN invalidates the previous PIN.
* Cloudflare only sends the email if the user is allowed by an Access policy.
* Third-party mail security tools may consume the link before the user does, which makes the code appear already used.

If users repeatedly fail to sign in, request a fresh code and verify that your mail filtering or link-scanning product is allowlisting `noreply@notify.cloudflare.com`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/#page","headline":"One-time PIN login · Cloudflare One docs","description":"One-time PIN login in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/one-time-pin/","name":"One-time PIN login"}}]}
```
