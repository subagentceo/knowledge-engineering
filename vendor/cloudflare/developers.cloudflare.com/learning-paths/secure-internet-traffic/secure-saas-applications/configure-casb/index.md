---
title: Scan SaaS applications with Cloudflare CASB
description: Detect SaaS misconfigurations with CASB scans.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scan SaaS applications with Cloudflare CASB

Note

Only available on Enterprise plans.

Cloudflare CASB provides comprehensive visibility and control over SaaS apps to prevent data leaks and compliance violations. It helps detect insider threats, shadow IT, risky data sharing, and bad actors.

Cloudflare's API-implemented CASB addresses the final, common security concern for administrators of SaaS applications or security organizations: How can I get insights into the existing configurations of my SaaS tools and proactively address issues before there is an incident? CASB integrates with a number of leading SaaS applications and surfaces instant security insights related to misconfiguration and potential for data loss. CASB also powers [risk score heuristics](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/) organized by severity.

For more information on Cloudflare CASB, including available SaaS integrations, refer to [Scan SaaS applications](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/).

## Manage CASB integrations

When you integrate a third-party SaaS application or cloud environment with Cloudflare CASB, you allow CASB to make API calls to its endpoint and read relevant data on your behalf. The CASB integration permissions are read-only and follow the least privileged model. In other words, only the minimum access required to perform a scan is granted.

### Prerequisites

Before you can integrate a SaaS application or cloud environment with CASB, your account with that integration must meet certain requirements. Refer to the SaaS application or cloud environment's [integration guide](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/) to learn more about the prerequisites and permissions.

### Add an integration

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Cloud & SaaS findings** \> **Integrations**.
2. Select **Connect an integration** or **Add integration**.
3. Browse the available integrations and select the application you would like to add.
4. Follow the step-by-step integration instructions in the UI.
5. To run your first scan, select **Save integration**.

After the first scan, CASB will automatically scan your SaaS application or cloud environment on a frequent basis to keep up with any changes. Scan intervals will vary due to each application having their own set of requirements, but the frequency is typically between every 1 hour and every 24 hours.

Once CASB detects at least one finding, you can [view and manage your findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/).

### Pause an integration

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Cloud & SaaS findings** \> **Integrations**.
2. Find the integration you would like to pause and select **Configure**.
3. To stop scanning the application, turn off **Scan for findings**.
4. Select **Save integration**.

You can resume CASB scanning at any time by turning on **Scan for findings**.

### Delete an integration

Warning

When you delete an integration, all keys and OAuth data will be deleted. This means you cannot restore a deleted integration or its scanned data.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Cloud & SaaS findings** \> **Integrations**.
2. Find the integration you would like to delete and select **Configure**.
3. Select **Disenroll**.

To resume scanning the integration for findings, you will need to [add the integration](#add-an-integration) again.

### Integrate DLP policies

If you use both Cloudflare CASB and Cloudflare Data Loss Prevention (DLP), you can use DLP to discover if files stored in your SaaS application contain sensitive data. CASB integrations supported by DLP include:

* [Amazon Web Services (AWS) S3](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/aws-s3/)
* [Box](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/box/)
* [Dropbox](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/dropbox/)
* [Google Cloud Platform (GCP) Cloud Storage](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/gcp-cloud-storage)
* [Google Drive](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-drive/)
* [Microsoft OneDrive](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive/)
* [Microsoft SharePoint](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/sharepoint/)
* [Microsoft 365 Copilot](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/m365-copilot/)
* [OpenAI](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/)
* [Anthropic](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/)

For more information, refer to [Scan SaaS applications with DLP](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/configure-casb/#page","headline":"Scan SaaS applications with Cloudflare CASB · Cloudflare Learning Paths","description":"Detect SaaS misconfigurations with CASB scans.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/secure-saas-applications/configure-casb/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/secure-saas-applications/","name":"Secure SaaS applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/secure-saas-applications/configure-casb/","name":"Scan SaaS applications with Cloudflare CASB"}}]}
```
