---
title: Secure compromised account
description: If you observe suspicious activity within your Cloudflare account, secure your account with these steps.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Secure compromised account

If you observe suspicious activity within your Cloudflare account, secure your account with these steps.

## Step 1 - Change your password

For more guidance on changing your password, refer to [Change email address or password](https://developers.cloudflare.com/fundamentals/user-profiles/change-password-or-email/).

## Step 2 - Revoke active account sessions

When there is more than one active session associated with your email account, you can revoke any session that is not the current session.

To revoke a session:

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **My Profile** \> **Sessions**.
3. On a specific section, click **Revoke**.
4. You will be prompted to enter your password before revoking the session.

## Step 3 - Enable Two-Factor Authentication (2FA)

To prevent future compromises, make sure that you have [Two-Factor Authentication (2FA)](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/) enabled on your account.

## Step 4 - Change API keys and tokens

### API keys

If your API key might be compromised, change your API key:

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **My Profile** \> **API Tokens**.
3. In the **API Keys** section, find your key.
4. Select **Change**.

### API tokens

If your token is lost or compromised, you can either create a new token or roll your token to generate a new secret. Rolling your API token into a new one will invalidate the previous token, but the access and permissions will be the same as the previous API token. The new token uses the [scannable format](https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/), which allows credential scanning tools to detect leaked tokens.

To roll your API token:

1. Go to **My Profile** \> **API Tokens**.  
[ Go to **API Tokens** ](https://dash.cloudflare.com/profile/api-tokens)
2. Next to the API token you want to roll, select the **three dot icon** \> **Roll**.
3. Select **Confirm** to generate a new API token.

## Step 5 - Review the audit log

To access audit logs in the Cloudflare dashboard:

In the Cloudflare dashboard, go to the **Audit Logs** page.

[ Go to **Audit logs** ](https://dash.cloudflare.com/?to=/:account/audit-log) 

You can search these audit logs by user email or domain and filter by date range. To download audit logs, click **Download CSV**.

Note

Depending on the volume of data, the export of large amounts of events from Audit Logs might fail with errors. We always recommend using Cloudflare [Logpush](https://developers.cloudflare.com/logs/logpush/) to make sure Audit Logs are always available and stored externally.

If you notice any settings were changed, you should undo those changes.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/account-security/secure-a-compromised-account/#page","headline":"Secure compromised account · Cloudflare Fundamentals docs","description":"If you observe suspicious activity within your Cloudflare account, secure your account with these steps.","url":"https://developers.cloudflare.com/fundamentals/account/account-security/secure-a-compromised-account/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/account-security/","name":"Account security"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/account/account-security/secure-a-compromised-account/","name":"Secure compromised account"}}]}
```
