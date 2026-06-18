---
title: Manually add domains
description: Manually add domains for BCC or journaling email scanning.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manually add domains

This page will teach you how to manually add domains via BCC/Journaling on the Cloudflare dashboard.

This setup is ideal if your email provider is not Microsoft 365 or Google Workspace, or you do not want to directly integrate your account. Beware that manually add does not support [auto-move](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) or [directory synchronization](https://developers.cloudflare.com/cloudflare-one/email-security/directories/).

## Prerequisites

To use Email security, you will need to have:

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* A [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization)
* A domain to protect

## Manually add domains

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) \> **Email security**.
2. Select **Overview**. If you have not purchased Email security, select **Contact Sales**. Otherwise, select **Set up** \> **BCC/Journaling**.
3. Select **Manual add**.

## Users with domains on Cloudflare

On the **Set up Email security** page:

1. **Connect domains**: Select at least one domain. Then, select **Continue**.
2. (**Optional**) **Add manual domains**: Manually enter additional domains. Then, select **Continue**.
3. (**Optional**) **Adjust hop count**: Enter the number of hops, and then select **Continue**.
4. **Select your processing location**: Configure where you want Cloudflare to process your email. **Global** will be the default option. If you choose **Global**, `<account tag>@CF-emailsecurity.com` will be your regional service address. Once you have chosen your processing location, select **Continue**.
5. **Review details**: Review your connected domains and regional service address. Then, select **Go to domains.**

## Users who do not have domains with Cloudflare

If you do not have domains with Cloudflare, the Cloudflare dashboard will display two options:

* Add a domain to Cloudflare.
* Enter domain manually.

### Add a domain to Cloudflare

Selecting **Add a domain to Cloudflare** will redirect you to a new page where you will connect your domain to Cloudflare. Once you have entered an existing domain, select **Continue**.

### Enter domain manually

On the **Set up Email security** page:

1. **Connect domains**: Select at least one domain. Then, select **Continue**.
2. (**Optional**) **Add manual domains**: Manually enter additional domains. Then, select **Continue**.
3. (**Optional**) **Adjust hop count**: Enter the number of hops, and then select **Continue**.
4. **Configure service address with your third party email provider**: Copy and paste the service address into your third-party email provider to allow BCC/Journaling: `<account tag>@CF-emailsecurity.com`.
5. **Review details**: Review your connected domains. Then, select **Go to domains.**

## Enable auto-moves

To enable auto-move events, you will have to associate an integration.

To associate an integration:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) \> **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains** \> Select **View**.
3. On the **Domain management** page, locate your domain, select the three dots, then select **Associate an integration**.
4. Select **Connect an integration**. Follow the steps to [enable the Microsoft 365 integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/m365-api/#enable-microsoft-integration).
5. Select the three dots, then select **Associate an integration**. Select the integration, then select **Associate**.

Now that your domain has an associated integration, enable [auto-move events](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) on your domain.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/manual-add/#page","headline":"Manually add domains · Cloudflare One docs","description":"Manually add domains for BCC or journaling email scanning.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/manual-add/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/","name":"Post-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/","name":"BCC/Journaling"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/","name":"Journaling setup"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/manual-add/","name":"Manually add domains"}}]}
```
