---
title: Set-up 2FA
description: Configure two-factor authentication for account security.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set-up 2FA

Two-factor authentication (2FA) allows user account owners to add an additional layer of login security to Cloudflare accounts. This additional authentication step requires you to provide both something you know, such as a Cloudflare password, and something you have, such as an authentication code from a mobile device.

Note

Cloudflare user accounts configured to use single sign-on (SSO) cannot configure 2FA.

Cloudflare offers the option to use either a phishing-resistant security key, like a YubiKey, or a Time-Based One-Time password (TOTP) mobile app for authentication, like Google Authenticator, or both. If you add both of these authentication methods to your account, you are initially prompted to log in with the security key, but can opt-out and use TOTP instead.

To ensure that you can securely access your account even without your mobile device or security keys, Cloudflare also provides backup codes for download.

Tip

After downloading your backup codes, we recommend saving them in a secure location.

As the user account owner, you are automatically assigned the [Super Administrator](https://developers.cloudflare.com/fundamentals/manage-members/) role. Once 2FA is enabled, all Cloudflare account members are required to configure 2FA on their mobile devices.

---

## Enable 2FA

We recommend that all Cloudflare user account holders enable two-factor authentication (2FA) to keep your accounts secure. 

2FA can only be enabled successfully on an account with a [verified email address](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/). If you do not verify your email address first, you may lock yourself out of your account.

Warning

Super Administrators can turn on **2FA Enforcement** to require all members to enable 2FA. If you are not a Super Administrator, you will be forced to turn on 2FA prior to accepting the invitation to join a Cloudflare account as a member.

To enable two-factor authentication for your Cloudflare login:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login).
2. Under the **My Profile** dropdown, select **My Profile**.
3. Select **Authentication**.
4. Select **Add** next to [Mobile App Authentication](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/#configure-totp-mobile-application-authentication) or [Security Key Authentication](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/#configure-security-key-authentication-for-two-factor-cloudflare-login), or **Enable** next to [Email Authentication](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/#configure-email-two-factor-authentication).

Note

Cloudflare recommends that users enable at least two different 2FA factors, as well as safely store [backup codes](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/#regenerate-backup-codes)) to prevent lockouts.

## Additional configurations

Cloudflare also supports 2FA with device built-in authenticators (Apple Touch ID, Android fingerprint, or Windows Hello), Yubikeys and TOTP mobile applications.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/account-security/set-up-2fa/#page","headline":"Set-up 2FA · Cloudflare Learning Paths","description":"Configure two-factor authentication for account security.","url":"https://developers.cloudflare.com/learning-paths/application-security/account-security/set-up-2fa/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/account-security/","name":"Account security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/account-security/set-up-2fa/","name":"Set-up 2FA"}}]}
```
