---
title: Create account
description: Learn how to create a new Cloudflare account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create account

To create a Cloudflare account:

1. Go to the [Sign up page ↗](https://dash.cloudflare.com/sign-up).
2. Enter your **Email** and **Password**.
3. Select **Create Account**.

Once you create your account, Cloudflare will automatically send an email to your address to [verify that email address](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/).

## Account name

Your account name defaults to `<<YOUR_EMAIL_ADDRESS>>'s Account`.

You may want to customize the name of this account, either to help specify its purpose or to help associate it with multiple accounts.

To change your account name:

1. In the Cloudflare dashboard, go to the **Configurations** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. For **Account Name**, select **Change Name**.
3. Enter a new account name.
4. Select **Save**.

## Best practices

If you are creating an account for your team or a business, we recommend choosing an email alias or distribution list for your **Email**, such as `cloudflare@example.com`.

This email address is the main point of contact for your Cloudflare billing, usage notifications, and account recovery.

Refer to [Account and domain management best practices](https://developers.cloudflare.com/fundamentals/reference/best-practices/) for a detailed list of ways to protect your account and domain.

Once you [set up an account](https://developers.cloudflare.com/fundamentals/account/), you have several ways to interact with Cloudflare.

## Interact with Cloudflare

If you prefer working without code, you can manage your account and domain settings through the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login).

Note

If your domain was added to Cloudflare by a hosting partner, manage your DNS records via the hosting partner.

For those who prefer to interact with Cloudflare programmatically, you can use several methods:

| Resource                                                                                 | Docs                                                                   | Description                                                                    |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Cloudflare API](https://developers.cloudflare.com/fundamentals/api/)                    | [API docs](https://developers.cloudflare.com/api/)                     | RESTful API based on HTTPS requests and JSON responses.                        |
| [Terraform ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) | [Terraform docs](https://developers.cloudflare.com/terraform/)         | Configure Cloudflare using HashiCorp's Infrastructure as Code tool, Terraform. |
| [cloudflare-go ↗](https://github.com/cloudflare/cloudflare-go)                           | [README ↗](https://github.com/cloudflare/cloudflare-go#readme)         | The official Go library for the Cloudflare API.                                |
| [cloudflare-typescript ↗](https://github.com/cloudflare/cloudflare-typescript)           | [README ↗](https://github.com/cloudflare/cloudflare-typescript#readme) | The official TypeScript library for the Cloudflare API.                        |
| [cloudflare-python ↗](https://github.com/cloudflare/cloudflare-python)                   | [README ↗](https://github.com/cloudflare/cloudflare-python#readme)     | The official Python library for the Cloudflare API.                            |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/create-account/#page","headline":"Create account · Cloudflare Fundamentals docs","description":"Learn how to create a new Cloudflare account.","url":"https://developers.cloudflare.com/fundamentals/account/create-account/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/create-account/","name":"Create account"}}]}
```
