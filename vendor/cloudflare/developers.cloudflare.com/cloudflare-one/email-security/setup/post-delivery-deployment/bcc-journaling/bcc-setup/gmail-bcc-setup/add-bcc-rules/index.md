---
title: Add BCC rules
description: Add BCC rules in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add BCC rules

This page will show you how to add BCC rules in the Google Admin Console.

BCC stands for Blind Carbon Copy. A BCC rule is a Google Workspace feature that allows you to create a secure copy of all selected outbound and inbound emails. When you allow Email security to receive a copy of your emails, Cloudflare can perform post-delivery analysis to protect your email inbox.

To add BCC rules:

1. Log in to the [Google Admin Console ↗](https://admin.google.com/).
2. On the sidebar, go to **Apps** \> **Google Workspace** \> **Gmail** \> **Compliance**.
3. Go to **Content Compliance** \> Select **Edit**.
4. Add a **Content Compliance** filter, and name it `Email security - BCC`.
5. In **Email messages to affect**, select **Inbound**.
6. Select the recipients you want to send emails to Email security via BCC. Under **Add expressions that describe the content you want to search for in each message**:  
   * Select **If ANY of the following match the message**.  
   * Select **Add** to configure the expression.  
         * Select **Advanced content match**.  
         * In **Location**, select **Headers + Body**.  
         * In **Match type**, select **Matches regex**.  
         * In **Regexp**, input `.*`. You can customize the regex as needed and test within the admin page or on sites like [Regexr ↗](https://regexr.com/).  
         * Select **SAVE**.
7. In **If the above expressions match, do the following**:  
   * Select **Modify message**.  
         * Ensure that **Envelope recipient** \> **Change envelope recipient** is unselected, so that emails will not be dropped as an unintended consequence. You will select this option at a later stage.  
         * Go to **Also deliver to**, select **Add more recipients** \> **ADD** \> Choose **Advanced**:  
                  * Under **Envelope recipient**, select **Change envelope recipient** \> **Replace recipient** \> Enter the service address. This is the service address you copied and pasted in step 5 when [connecting your domains](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/connect-domains/). If you did not copy and paste the service address: - In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Email security**. - Go to **Settings** and locate your domain under **Your domains**. - Select the three dots > **View domain** \> **Service address**. Copy and paste the service address.  
                  * Under **Spam and delivery options**, ensure **Suppress bounces from this recipient** is not enabled.  
                  * Under **Headers**, select **Add X-Gm-Spam and X-Gm-Phishy headers**.  
                  * Select **SAVE**.
8. In **Account types to affect**, select **Users** and **Groups**.
9. Select **SAVE**.

To verify that BCC rules have been configured successfully:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Email security** \> **Settings**.
2. Select **Domains** \> **View**.
3. Locate your domain. Under Status, the dashboard should display **Active**. This means that the BCC rules have been configured successfully, and your mail flow is being detected.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/add-bcc-rules/#page","headline":"Add BCC rules · Cloudflare One docs","description":"Add BCC rules in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/add-bcc-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/","name":"Post-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/","name":"BCC/Journaling"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/","name":"BCC setup"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/","name":"Gmail BCC setup"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/add-bcc-rules/","name":"Add BCC rules"}}]}
```
