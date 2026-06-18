---
title: Require U2F with Okta
description: This tutorial covers how to Integrate Cloudflare Access with Okta. It also covers the steps to set up Cloudflare Access and integrate Okta with Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Require U2F with Okta

**Last reviewed:**  over 5 years ago 

Many identity providers, like Okta, support multiple multifactor authentication (MFA) options simultaneously. For example, Okta will allow you to login with your password and a temporary code generated in an app or a U2F hard key like a Yubikey.

Some second factor methods are more resistant to phishing. U2F options require you to have access to a physical device, also known as a hardware key. Without that key, a user cannot impersonate you even if they have your password. You can build rules in Cloudflare Access to require that users authenticate with a hardware key - even if your provider supports multiple options. When users login with a less secure option, like an app-based code, Access will block them.

**This tutorial covers how to:**

* Integrate Cloudflare Access with Okta
* Configure Okta for U2F enrollment
* Build an [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) that require users login with a hardware key
* Specify that policy to apply to certain Access applications

The first two sections of this tutorial link to guides to set up Cloudflare Access and integrate Okta. If you already use Cloudflare Access with Okta, you can skip ahead to the fourth section.

**Time to complete:**

20 minutes

---

## Configure Cloudflare Access

Before you begin, you'll need to follow [these instructions](https://developers.cloudflare.com/cloudflare-one/setup/) to set up Cloudflare Access in your account. The hardware key feature is available on any plan, including the free plan.

## Integrate Okta

Follow [these instructions](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/okta/) to integrate Okta with your Cloudflare Access account. Once integrated, Access will be able to apply rules using identity, group membership, and multifactor method from Okta.

## Configure Okta for U2F

An Okta administrator in your organization must first [enable U2F support ↗](https://help.okta.com/en/prod/Content/Topics/Security/MFA.htm) in your Okta account **and** [configure users ↗](https://help.okta.com/en/prod/Content/Topics/Security/healthinsight/required-factors.htm) to be prompted for it. This is a global setting; if your account has already configured U2F, you do not need to do anything unique to use it with Cloudflare Access.

## Test U2F in Access

You can begin building U2F policies by testing your Okta integration.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Access settings**.
2. In **Manage your App Launcher**, select **Manage**.
3. Choose **Login methods**.
4. Choose the row for Okta and select **Test**.

Cloudflare Access will prompt you to login with your Okta account. For the purposes of the test, use a second factor option like an app-based code. Okta will return `amr` values to Cloudflare Access - these are standard indicators of multifactor methods shared between identity control systems.

The `mfa` value is sent by Okta to tell Cloudflare Access that you used a multifactor authentication option. The `pwd` value indicates you used a password. In this example, the `otp` value is sent because the user authenticatd with an app-based code.

You can test with a hardkey by logging out of Okta and returning to the list of providers in Access. Select **Test** again, but this time use your hardware key as a second factor. Cloudflare Access will now see Okta share `hwk` in the `amr` fields.

![Test MFA](https://developers.cloudflare.com/_astro/with-hwk.CL1DMkwd_Z6LXdY.webp) 

## Build a Zero Trust policy to require U2F

You can use this information to build a rule in Access. Go to the `Applications` list in the Cloudflare Access section of the dashboard. Choose an application that you have already built or create a new one. This example adds the requirement to an existing application.

Select **Edit** to edit the existing `Allow` rule.

Add a `Require` rule and select `Authentication Method` from the list. Choose `hwk` as the required `Authentication Method`. Select **Save rule**.

![Require Rule](https://developers.cloudflare.com/_astro/require-hwk.D9ImfCao_ZAoRHD.webp) 

Optional: you can also configure Cloudflare Access to only show users Okta for this application if you have multiple other providers integrated. In the `Authentication` Tab, choose `Okta` as the only option to show users.

## Testing the rule

You can now test the rule. Visit the application and attempt to login using an app-based code or method other than a hardware security key. Access will block the attempt.

![Blocked](https://developers.cloudflare.com/_astro/blocked-user.DutI7nnY_2mWm6R.webp) 

If you sign out of Okta, and reattempt with a hardware key, Access will then allow the connection.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/okta-u2f/#page","headline":"Require U2F with Okta · Cloudflare One docs","description":"This tutorial covers how to Integrate Cloudflare Access with Okta. It also covers the steps to set up Cloudflare Access and integrate Okta with Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/okta-u2f/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Okta"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/okta-u2f/","name":"Require U2F with Okta"}}]}
```
