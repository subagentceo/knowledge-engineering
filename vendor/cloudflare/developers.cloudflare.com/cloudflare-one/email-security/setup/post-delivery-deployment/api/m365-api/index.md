---
title: Set up with Microsoft 365
description: Set up with Microsoft 365 in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up with Microsoft 365

This guide will instruct you through setting up Microsoft 365 with Email security via the Cloudflare dashboard.

## Prerequisites

To use Email security, you will need to have:

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* A [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization)
* A domain to protect

## Enable Email security via the dashboard

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) and select **Email security**..
2. Select **Overview**. Select one of the following options depending on your use case:
* If you have not purchased Email security, select **Contact sales**.
* If you have not associated any integration:  
   * Select **Set up**.  
   * Choose **MS Graph API** \> **Authorize**.  
   * Refer to [Enable Microsoft integration](#enable-microsoft-integration) to continue the onboarding process.
* If you have associated an integration, but have not connected a domain:  
   * Select **Connect a domain**.  
   * Choose **MS Graph API**. Refer to [Connect your domains](#connect-your-domains) to connect your domain(s).

### Enable Microsoft integration

To enable Microsoft integration:

1. **Configure policy**: Choose how [CASB](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) interacts with your data. Select **Read-only mode** or **Read-Write mode**. It is recommended that you choose **Read-Write mode**.
2. **Name integration**: Add your integration name, then select **Continue**.
3. **Authorize integration**:  
   * Select **Authorize**. Selecting **Authorize** will take you to the Microsoft Sign in page where you will have to enter your email address.  
   * Once you enter your email address, select **Next**.  
   * After selecting **Next**, the system will show a dialog box with a list of requested permissions. Select **Accept** to authorize Email security. Upon authorization, you will be redirected to a page where you can review details and enroll integration.
4. **Review details**: Review your integration details, then:  
   * Select **Complete Email security set up** where you will be able to connect your domains and configure auto-moves.  
   * Select **Continue to Email security**.

Continue with [Connect your domains](#connect-your-domains) for the next steps.

### Connect your domains

On the **Set up Email security** page, you will be able to connect your Microsoft domains. To connect your domains:

1. **Connect domains**: Select at least one domain. Then, select **Continue**.
2. (Optional) **Modify default scanning**: You can configure which folder Email security can scan.
3. (Optional - select **Skip for now** to skip this step) **Redirect messages**: Refer to [Auto-moves](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) to learn what auto-moves are, and how to configure auto-moves.
4. **Review details**: Review your connected domains, then select **Go to Domains**.

Your domains are now connected successfully.

### Connect new domains

To connect new domains:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Select **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. Select **Add a domain**.
4. Select a method for connecting your mail environment to Email security:  
   * If you select **MS Graph API**, refer to [Enable Microsoft integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/m365-api/#enable-microsoft-integration).  
   * If you select BCC/Journaling, choose how to connect your domains:  
         * If you select **Integrate with MS**, refer to [Enable Microsoft integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/m365-api/#enable-microsoft-integration).  
         * If you select **Integrate with Google**, refer to [Connect your domains](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/connect-domains/).  
         * If you select **Manual add**, refer to [Enter domain manually](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/journaling-setup/manual-add/#enter-domain-manually).

## Prevent Cloudflare from scanning a domain

If you want to prevent Cloudflare from scanning a domain:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. On the **Domain management** page, select the domain you do not want to be scanned.
4. Select the three dots > **Stop scanning**.

## View an integration

To view the integration for each connected domain:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. Select a domain.
4. Select the three dots > **View integration**.

Once you have set up Email security to scan through your inbox, Email security will display detailed information about your inbox. Refer to [Monitor your inbox](https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/) to learn more.

## Verify successful deployment

To verify that the deployment has been successful and that your emails are being scanned:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. Under **Your domains**, locate your domain, and verify that **Status** (which describes the state of the configuration) displays **Active**.

## Next steps

[Enable logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/email-security-logs/) to send detection data to an endpoint of your choice.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/m365-api/#page","headline":"Set up with Microsoft 365 · Cloudflare One docs","description":"Set up with Microsoft 365 in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/m365-api/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/","name":"Post-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/api/","name":"API deployment"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/api/m365-api/","name":"Set up with Microsoft 365"}}]}
```
