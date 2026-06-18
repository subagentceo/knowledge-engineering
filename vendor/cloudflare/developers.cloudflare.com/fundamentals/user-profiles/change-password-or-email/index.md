---
title: Email address and password
description: Learn how to change your email address or password associated with your account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email address and password

## Change email address

Note

You cannot change your email address if your administrator has [enabled single sign-on (SSO)](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/) or if you did not successfully verify the original email address.

For example, if the email address was entered incorrectly or is a non-working email address, you will need to create a new account with a working email address and [move domains](https://developers.cloudflare.com/fundamentals/manage-domains/move-domain/).

To change the email address associated with your Cloudflare account:

1. Go to your [Profile ↗](https://dash.cloudflare.com/?to=/:account/profile).
2. Select your account.
3. In the Email Address panel, select **Change Email Address**.
4. In the dialog, enter your new email address in **New email** and **Confirm email**.
5. Enter your current password.
6. Select **Save**.

Billing and notification email addresses must be updated separately

The process above will update your user profile email, but you may have specified separate emails to receive [billing invoices](https://developers.cloudflare.com/billing/manage/invoices/#turn-on-invoice-emails-from-cloudflare) and other types of [notifications](https://developers.cloudflare.com/notifications/get-started/#edit-a-notification). You will also need to update those email addresses if you want to receive those emails at your new address.

## Change password

Note

If your administrator has [enabled Single sign-on (SSO)](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/), you cannot change your **Authentication** settings.

To change your Cloudflare password:

1. Go to your [Profile ↗](https://dash.cloudflare.com/?to=/:account/profile).
2. Select your account.
3. Select **Authentication**.
4. On **Password**, select **Change Password**.
5. Change your password and select **Save**.

For added account security, consider changing your [API tokens](https://developers.cloudflare.com/fundamentals/api/how-to/roll-token/) as well.

## Forgot your email address

Note

If you are an Enterprise customer and forgot the email address associated with your account, contact your Customer Success Manager.

If you forget the email address associated with your application:

1. Go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login) and select **Forgot your email?**.
2. Enter your domain name.
3. Cloudflare will send an email to the email address associated with your domain name. If you do not receive an email within 20 minutes, check your spam folder. The message will be sent from `no-reply@cloudflare.com` or `noreply@notify.cloudflare.com`.

## Forgot your password

You must be logged out of the Cloudflare dashboard to view the **Forgot your password?** option.

If you forget the password associated with your email address:

1. Go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login) and select **Forgot your password?**.
2. Enter your email address.
3. Cloudflare will send an email with instructions to reset your password. If you do not receive an email within 20 minutes, check your spam folder. The message will be sent from `no-reply@cloudflare.com` or `noreply@notify.cloudflare.com`.

Note

This process does not affect your account or share your email address with anyone.

If you still cannot access the email address associated with your Cloudflare account, you may need to [move your domain to another account](https://developers.cloudflare.com/fundamentals/manage-domains/move-domain/).

Cloudflare requires these steps to prevent account hijacking.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/user-profiles/change-password-or-email/#page","headline":"Email address and password · Cloudflare Fundamentals docs","description":"Learn how to change your email address or password associated with your account.","url":"https://developers.cloudflare.com/fundamentals/user-profiles/change-password-or-email/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/user-profiles/","name":"User profiles"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/user-profiles/change-password-or-email/","name":"Email address and password"}}]}
```
