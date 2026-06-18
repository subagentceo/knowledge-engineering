---
title: Multi-Factor Email Authentication
description: Cloudflare's Multi-Factor Email Authentication prevents unauthorized access by sending one-time codes to your email.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Multi-Factor Email Authentication

## Overview

Cloudflare uses a Multi-Factor Email Authentication (MFA) method for increased account security. MFA prevents customer account takeovers when attackers gain unauthorized access to an account due to an exposed or easily guessed password.

Cloudflare will challenge any login attempt if the user provides the correct credentials from an unrecognized IP address.

![Cloudflare will send an email when your account is logged into from an unknown IP address.](https://developers.cloudflare.com/_astro/hc-import-account_access_email.CGeKtgax_ZmxEnU.webp) 

Cloudflare challenges the login by sending a one-time code that expires in 30 minutes to the email that we have on file for the account. Once the correct code is provided through the dashboard, your IP will be recorded and further login attempts from that IP address will not be challenged for 90 days.

![When your account is logged into from an unknown IP address, you have to enter an authentication token from an email sent to your email address on file.](https://developers.cloudflare.com/_astro/hc-import-login_authentication.B7wAaxsz_gliIl.webp) 

Note

Email MFA can only be disabled by enabling [two-factor authentication](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/)

## Troubleshoot MFA

Cloudflare emails are sometimes flagged as spam by the recipient's email service. If you are expecting an authentication token, you should check the spam folder for any Cloudflare emails and configure a filter to allow Cloudflare emails from _[no-reply@notify.cloudflare.com](mailto:no-reply@notify.cloudflare.com)_\_**.**\_

Other times, emails are rejected by the recipient email service. Cloudflare will try again it will flag your email address after several attempts and no further emails will be sent.

If you still do not receive an email after ensuring your email service is not flagging Cloudflare, contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

---

## Related resources

* [Secure user access with two-factor authentication](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/user-profiles/multi-factor-email-authentication/#page","headline":"Multi-Factor Email Authentication · Cloudflare Fundamentals docs","description":"Cloudflare's Multi-Factor Email Authentication prevents unauthorized access by sending one-time codes to your email.","url":"https://developers.cloudflare.com/fundamentals/user-profiles/multi-factor-email-authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/user-profiles/","name":"User profiles"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/user-profiles/multi-factor-email-authentication/","name":"Multi-Factor Email Authentication"}}]}
```
