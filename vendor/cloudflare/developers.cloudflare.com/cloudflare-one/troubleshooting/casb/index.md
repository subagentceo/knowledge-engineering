---
title: CASB
description: CASB for Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# CASB

Use this guide to troubleshoot common issues with Cloud Access Security Broker (CASB).

## Security findings

### Findings not appearing

If you do not see findings for an integrated application:

* **Wait for scan**: Initial scans can take up to 24 hours depending on the size of the application.
* **Permissions**: Ensure the account used to integrate the application has the necessary administrative permissions.
* **Enabled status**: Verify that the integration is enabled in the Zero Trust dashboard.

### False positives

If CASB flags a configuration that is intended for your organization:

1. Go to **CASB** \> **Findings**.
2. Select the finding and choose **Dismiss**.
3. Provide a reason for dismissal to help refine future scans.

---

## More CASB resources

For more information, refer to the full CASB documentation.

[ CASB troubleshooting ❯ ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/troubleshooting/) 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/casb/#page","headline":"CASB · Cloudflare One docs","description":"CASB for Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/casb/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/troubleshooting/casb/","name":"CASB"}}]}
```
