---
title: Information about your domain
description: How Information about your domain works in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Information about your domain

When you configure your domain, the Cloudflare dashboard will display you the following fields:

* **Domain**: Domain name. Refer to [Manage domains](https://developers.cloudflare.com/cloudflare-one/email-security/setup/manage-domains/) to learn how to add, filter, and delete domains.
* **Configured method**: The deployment method you used to configure your domain. Depending on how you decided to configure Email security, the dashboard will display:  
   * **MS Graph API**: Your current email provider is Microsoft 365, and Email security has been configured via the Microsoft Graph API. You do not need to change any MX record.  
   * **BCC/Journaling**: You have chosen to set your email via BCC/Journaling. A copy of your email is sent to Cloudflare.  
   * **MX/ Inline**: You have configured your email domain using MX/Inline. This configuration requires a [DNS record change](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records).
* **Status**: Status indicates the state of the configuration.  
   * For MX/Inline and BCC/Journaling, the dashboard will display **Active** if Email security has processed any email in the last seven days. The dashboard will display **No mail flow** if there has been no email activity in the last seven days. This is likely due to a misconfiguration. Refer to [Configuration checklist](https://developers.cloudflare.com/cloudflare-one/email-security/setup/#5-configuration-checklist) to ensure you have configured your environment correctly.  
   * For MS Graph API, the dashboard will display **Active** if your integration has been successfully connected, and Email security can scan your inbox with the integration. The dashboard will display **Broken** if the API is not scanning emails. This could be due to a CASB misconfiguration. To troubleshoot this, refer to [Troubleshoot CASB](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/troubleshoot-casb/).
* **Service address**: This is the email address you will use to send a copy of your email.
* **Source**: Depending on how you added the domains, the dashboard will display **MS integration**, **Google**, **CF zones**, or **Manual add**.
* **Integration name**: Name of the integration. This field will only be displayed for Microsoft integrations. To rename your integration:  
   1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) \> **Integrations** \> **Cloud & SaaS**.  
   2. Locate your integration, select **Configure**, then select **Edit**.  
   3. Rename your integration, then select **Save**.
* **Hops**: The number of hops. This will not be displayed if the configuration method is Microsoft Graph API. Hop count will be visible only if it has been configured.
* **Date added**: Date when the domain was added.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/domain-management/domain/#page","headline":"Information about your domain · Cloudflare One docs","description":"How Information about your domain works in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/domain-management/domain/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/settings/","name":"Settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/settings/domain-management/","name":"Domain management"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/settings/domain-management/domain/","name":"Information about your domain"}}]}
```
