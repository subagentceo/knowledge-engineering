---
title: GitHub
description: GitHub in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GitHub

Cloudflare One allows your team to connect to your applications using their GitHub login. You do not need to have a GitHub organization to use the integration.

## Set up GitHub Access

To configure GitHub access in both GitHub and Cloudflare One:

1. Log in to [GitHub ↗](https://github.com/).
2. Go to your account > **Settings** \> **Developer Settings**.
3. In **Developer Settings**, select **OAuth Apps** and select **New OAuth app**.
4. On the **Register a new OAuth application** page, enter an **Application name**. Your users will see this application name on the login page.
5. In the **Homepage URL** field, enter your team domain:  
```  
https://<your-team-name>.cloudflareaccess.com  
```  
You can find your team name in the [Cloudflare dashboard ↗](https://dash.cloudflare.com) under **Settings** \> **Team name and domain** \> **Team name**.
6. In the GitHub **Authorization callback URL** field, enter the following URL:  
```  
https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback  
```
7. Select **Register application**.
8. Make note of the **Client ID**.
9. Select **Generate a new client secret** and copy the client secret to a safe place.
10. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
11. Select **Add new identity provider** and select **GitHub**.
12. In **App ID**, enter the **Client ID** obtained from GitHub (refer to step 8).
13. In **Client secret**, enter the **Client secret** obtained from GitHub (refer to step 9).
14. Select **Save**.
15. Select **Finish setup** to launch a GitHub authorization page. You will be asked to grant the following permissions to Cloudflare Access:  
   * Organizations and teams (read-only)  
   * Email addresses (read-only)
16. Select **Authorize**.

To test that your connection is working, go to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) \> **Zero Trust** \> **Integrations** \> **Identity providers** and select **Test** next to your GitHub login method. If you have GitHub two-factor authentication enabled, you will need to first login to GitHub directly and return to Access.

Troubleshooting organization policies

When using a GitHub organization policy, if a user joins the required organization after a failed login attempt, they will remain blocked. To fix this, they must revoke the application's access in their GitHub settings and log in again to update their permissions.

## Example API Configuration

```

{

  "config": {

    "client_id": "<your client id>",

    "client_secret": "<your client secret>"

  },

  "type": "github",

  "name": "my example idp"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/github/#page","headline":"GitHub · Cloudflare One docs","description":"GitHub in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/github/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GitHub"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/github/","name":"GitHub"}}]}
```
