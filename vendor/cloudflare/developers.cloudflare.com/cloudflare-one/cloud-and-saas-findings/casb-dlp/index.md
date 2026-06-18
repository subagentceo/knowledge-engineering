---
title: Scan for sensitive data
description: How Scan for sensitive data works in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scan for sensitive data

Note

Requires Cloudflare CASB and Cloudflare DLP.

You can use [Cloudflare Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) to discover if files stored in a SaaS application contain sensitive data. To perform DLP scans in a SaaS app, first configure a [DLP profile](#configure-a-dlp-profile) (a set of patterns that define what counts as sensitive data) with the data patterns you want to detect, then [add the profile](#enable-dlp-scans-in-casb) to a CASB integration.

## Supported integrations

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

## Configure a DLP profile

You may either use DLP profiles predefined by Cloudflare, or create your own custom profiles based on regex, predefined detection entries, datasets, and document fingerprints.

### Configure a predefined profile

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Profiles**.
2. Choose a [predefined profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) and select **Edit**.
3. Enable one or more **Detection entries** according to your preferences.
4. Select **Save profile**.

Most predefined profiles match when any enabled detection entry matches. The **Personally Identifiable Information (PII) Record** profile is an exception and requires at least three unique detection entries in close proximity before the profile matches.

Your DLP profile is now ready to use with CASB.

### Build a custom profile

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Profiles**.
2. Select **Create profile**.
3. Enter a name and optional description for the profile.
4. Add detection entries to the profile.  
Create a custom entry  
   1. Select **Create custom entry**.  
   2. Choose the type of detection entry you want to create and configure its values.  
   For information on supported detection entry types, refer to [Configure detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/).  
   3. To save the detection entry, select **Done**.  
Add existing entries  
Existing entries include [predefined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/predefined-detection-entries/) and [user-defined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/) detection entries that you manage from the Detection entries section.  
   1. Select **Add existing entries**.  
   2. Choose which entries you want to add, then select **Confirm**.  
   3. To finish, select **Done**.
5. (Optional) Add data classes to include reusable classification rules.  
   * Select **Add data classes**  
   * Choose the data classes you want to add, then select **Confirm**
6. (Optional) Use labels as match criteria for the profile.  
   * Select a sensitivity schema and minimum sensitivity level.  
   * Select a data tag group and one or more data tags.  
For more information on labels, templates, and data classes, refer to [Data Classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/).
7. (Optional) Configure [**profile settings**](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/) for the profile.
8. Select **Save profile**.

Your DLP profile is now ready to use with CASB.

For more information, refer to [Configure a DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/).

## Enable DLP scans in CASB

### Add a new integration

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Cloud & SaaS**.
2. Select **Add integration** and choose a [supported integration](#supported-integrations).
3. During the setup process, you are prompted to select DLP profiles for the integration.
4. Select **Save integration**.

CASB will scan every publicly accessible file in the integration for text that matches the DLP profile. The initial scan may take up to a few hours to complete.

### Modify an existing integration

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Cloud & SaaS**.
2. Choose a [supported integration](#supported-integrations) and select **Configure**.
3. Under **DLP profiles**, select the profiles that you want the integration to scan for.
4. Select **Save integration**.

If you enable a DLP profile from the **Manage integrations** page, CASB will only scan publicly accessible files that have had a modification event since enabling the DLP profile. Modification events include changes to the following attributes:

* Contents of the file
* Name of the file
* Visibility of the file (only if changed to publicly accessible)
* Owner of the file
* Location of the file (for example, moved to a different folder)

Warning

If you add a DLP profile to an existing integration, CASB only scans files modified after you enabled the profile. To scan all files, you must enable the DLP profile during the [integration setup flow](#add-a-new-integration).

## Limitations

DLP in CASB will only scan:

* [Text-based files](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/#supported-file-types) such as documents, spreadsheets, and PDFs. Images are not supported.
* Files less than or equal to 100 MB in size.
* Java and R source code files that are at least 5 KB. Smaller files in these languages are skipped.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/#page","headline":"Scan for sensitive data · Cloudflare One docs","description":"How Scan for sensitive data works in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/cloud-and-saas-findings/","name":"Cloud and SaaS findings"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/cloud-and-saas-findings/casb-dlp/","name":"Scan for sensitive data"}}]}
```
