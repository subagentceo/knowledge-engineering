---
title: Set up MX/Inline deployment
description: How Set up MX/Inline deployment works in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up MX/Inline deployment

## Prerequisites

To use Email security, you will need to have:

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* A [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization)
* A domain to protect

## Initiate MX/Inline configuration

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Overview**. Select one of the following options:
* If you have not purchased Email security, select **Contact sales**.
* If you have not associated any integration, [associate an integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/#associate-an-integration), then select **Set up**.
* If you have associated an integration, but have not connected a domain, select [**Connect a domain**](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/#connect-a-domain).
1. Select **MX/Inline**.
2. To start the MX/Inline configuration, you will need to have completed the prerequisite setup on your email provider's platform. Once you have completed this step, select **I confirm that I have completed all the necessary requirements**. Then, select **Start configuration**.

Note

You can only onboard one domain at a time.

## Associate an integration

MX/Inline does not require an integration for protection to be effective. However, it is a best practice to connect an integration.

To associate an integration:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Integrations** \> **Cloud & SaaS Integrations** \> **Integrations**
2. Select **Connect an integration**.
3. Select an application: Choose between **Google Workspace CASB + EMAIL**, or **Microsoft CASB + EMAIL**.  
   * Refer to [Enable Gmail BCC integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/#1-create-a-service-account-in-your-gcp-project) if you select **Google Workspace CASB + EMAIL**.  
   * Refer to [Enable Microsoft integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/m365-api/#enable-microsoft-integration) if you select **Microsoft CASB + EMAIL**.
4. After you have associated an integration, go to **Email security** \> **Set up**.
5. Follow the instructions to [connect a domain](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/#connect-a-domain).

## Connect a domain

If you have verified zones on Cloudflare, continue with the following steps:

1. **Connect a domain**: Select your domain. Then, select **Continue**.
2. **Select position**: This step allows you to choose where Email security fits into your mail flow and configure position settings:  
   * **Select position**: Choose between:  
         * **Sit first (hop count = 1)**: Email security is the first server that receives the email. There are no other email scanners or services between the Internet and Cloudflare.  
         * **Sit in the middle (hop count > 1)**: Email security sits anywhere other than the first position. Other servers receive emails _before_ Email security. There are other email scanners or email services in between.  
   * **Position settings**: Refine how Email security receives and forwards emails:  
         * **Forwarding address**: This is your mail flow next hop after Email security. This value is auto-filled, but you can still change it.  
         * **Outbound TLS**: Choose between:  
                  1. **Forward all messages over TLS** (recommended).  
                  2. **Forward all messages using opportunistic TLS**.  
   * Select **Continue**.
3. (**Optional**, select **Skip for now** to skip this step) **Configure quarantine policy**: Select dispositions to automatically prevent certain types of incoming messages from reaching a recipient's inbox.
4. (Optional) **Update MX records**:  
   * Email security can automatically update MX records for domains that proxy traffic through Cloudflare. Under **Your mail processing location**, select your mail processing location. You can refer to [Regional processing](https://developers.cloudflare.com/cloudflare-one/email-security/reference/regional-processing/) for more information.  
   * You can also choose to allow Cloudflare to update MX records by selecting **I confirm that I allow Cloudflare to update to the new MX records**. When Email security updates MX records, we replace your original MX records with Email security MX records.  
   * Select **Continue**.
5. **Review details**: Review your domain, then select **Go to domains**.

## Users who do not have domains with Cloudflare

If you do not have domains with Cloudflare, the dashboard will display two options:

* [Enter domain manually](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/#enter-domain-manually).
* [Add a domain to Cloudflare](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/#add-a-domain-to-cloudflare).

## Enter domain manually

1. **Add domains**: Manually enter domain names.
2. **Review all domains**: Review all your domains, then select **Continue**.
3. **Verify your domains**: It may take up to 24 hours for your domains to be verified. Select **Done**.
4. Once your domains have been verified, the dashboard will display a message like this: **You have verified domains ready to connect to Email security**. This means that you can now set up Email security via MX/Inline.
5. Select **Set up**, then select **MX/Inline**.
6. Follow the steps to [initiate MX/Inline configuration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/#initiate-mxinline-configuration).

### Add a domain to Cloudflare

Selecting **Add a domain to Cloudflare** will redirect you to a new page where you will connect your domain to Cloudflare. Once you have entered an existing domain, select **Continue**.

Then, follow the steps to [Set up MX/Inline](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/).

## Verify successful deployment

To verify that the deployment has been successful and that your emails are being scanned:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. Under **Your domains**, locate your domain, and verify that **Status** (which describes the state of the configuration) displays **Active**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/#page","headline":"Set up MX/Inline deployment · Cloudflare One docs","description":"How Set up MX/Inline deployment works in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/","name":"Pre-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/","name":"Set up MX/Inline deployment"}}]}
```
