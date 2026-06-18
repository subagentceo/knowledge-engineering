---
title: Verify email address
description: Confirm the email address on your Cloudflare account to unlock dashboard features like adding members and updating preferences.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Verify email address

For security reasons, Cloudflare attempts to verify the email address associated with your account. You cannot perform certain tasks within the Cloudflare dashboard -- for example, [adding a new member](https://developers.cloudflare.com/fundamentals/manage-members/manage/#add-account-members), [changing your email address](https://developers.cloudflare.com/fundamentals/user-profiles/change-password-or-email/#change-email-address) or [updating your communication preferences](https://developers.cloudflare.com/fundamentals/user-profiles/customize-account/#notifications) \-- without verifying your email.

## When creating your account

When you first [create an account](https://developers.cloudflare.com/fundamentals/account/create-account/), Cloudflare automatically sends a message to the email address you provided for your account.

To verify your email:

1. Log in to your email provider and find your recent message from Cloudflare. If you cannot find the message, check your Spam folder.
2. Go to the link in the email.
3. Log in to Cloudflare to verify the email address associated with your account.

Note

If someone else used your email to sign up for a Cloudflare account, you can remove this account by going to our [unintended registration ↗](https://dash.cloudflare.com/unintended-registration) page and entering the information at the end of your confirmation email.

## Resend verification emails

If you cannot find your verification email or your email has expired, request another verification email:

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **My Profile**.
3. For **Email Address**, select **Send verification email** (if this option is not available, your email has already been verified).

## Verification issues

If you experience issues with your verification link, you might have already verified your email address.

To check your verification:

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **My Profile**.
3. For **Email Address**, your email address will have `(verified)` added after it.

If your email is still not verified, try clicking the verification link in a different browser or a private window.

If this still does not work, try [resending](#resend-verification-emails) the verification email to get a new verification link.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/#page","headline":"Verify email address · Cloudflare Fundamentals docs","description":"Confirm the email address on your Cloudflare account to unlock dashboard features like adding members and updating preferences.","url":"https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/user-profiles/","name":"User profiles"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/user-profiles/verify-email-address/","name":"Verify email address"}}]}
```
