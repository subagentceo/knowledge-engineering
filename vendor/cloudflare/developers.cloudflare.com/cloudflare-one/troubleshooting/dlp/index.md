---
title: DLP
description: DLP for Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DLP

Use this guide to troubleshoot common issues with Data Loss Prevention (DLP).

## DLP policy does not trigger or block content

DLP not inspecting or blocking content is the most common issue reported. If you have configured a [DLP policy](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/) but it fails to inspect or block traffic, the cause is almost always that the traffic is not being decrypted. To use DLP to scan the content of HTTPS requests, you must turn on [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/).

To turn on TLS decryption:

* [ Dashboard ](#tab-panel-7698)
* [ Terraform (v5) ](#tab-panel-7699)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. In **Proxy and inspection**, turn on **Inspect HTTPS requests with TLS decryption**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Configure the `tls_decrypt` argument in [cloudflare\_zero\_trust\_gateway\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fgateway%5Fsettings):  
```  
resource "cloudflare_zero_trust_gateway_settings" "team_name" {  
  account_id = var.cloudflare_account_id  
  settings = {  
    tls_decrypt = {  
      enabled = true  
    }  
  }  
}  
```

Once you turn on TLS decryption, you can create a DLP policy to inspect the content of HTTPS requests. For example:

| Selector    | Operator | Value                 | Logic | Action |
| ----------- | -------- | --------------------- | ----- | ------ |
| Domain      | in       | box.com               | And   | Block  |
| DLP Profile | in       | _Credit card numbers_ |       |        |

## DLP scans trigger false positives or block legitimate sites

If your DLP policy is blocking access to business-critical applications (such as Zoho, Google, or internal domains) or generating a high number of false positives, your DLP policy is likely too broad. Profiles such as **Credentials and Secrets** are powerful but can be overly aggressive if not scoped correctly.

### Problematic configuration

Applying a sensitive profile to all traffic causes unnecessary blocks. For example:

| Selector    | Operator | Value                     | Action |
| ----------- | -------- | ------------------------- | ------ |
| DLP Profile | in       | _Credentials and Secrets_ | Block  |

### Recommended solution

Make your policies more specific. Instead of a catch-all block, create granular policies that target high-risk destinations or user groups.

This policy only blocks uploads of financial data to file-sharing websites for a specific user group, reducing the risk of false positives on other sites.

| Selector           | Operator | Value                       | Logic | Action |
| ------------------ | -------- | --------------------------- | ----- | ------ |
| Destination Domain | in       | dropbox.com, wetransfer.com | And   | Block  |
| DLP Profile        | in       | _Financial Information_     | And   |        |
| User Group Names   | in       | Finance Team                |       |        |

You can also create policies that match trusted applications using the [**Do Not Scan** action](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-scan).

## DLP detections are inconsistent

If DLP detects sensitive data in plain text but not within images or certain applications, check for the following issues:

* **OCR is turned on**: For DLP to scan text within images (such as a picture of a credit card), you must turn on [Optical Character Recognition (OCR)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/#optical-character-recognition-ocr) in the corresponding DLP profile.
* **Application-specific behavior**: Some applications, such as WhatsApp Web, use protocols or encryption methods (such as WebSockets) that Gateway may not be able to fully inspect with HTTP policies.
* **Supported file types**: Content must be in a [supported file type](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/#supported-file-types) for DLP inspection.

## DLP options are missing or you cannot create custom profiles

If you cannot use the _DLP Profile_ selector when creating an HTTP policy or are blocked from creating a custom DLP profile, it typically means one of two things:

1. Incorrect plan. These features require a Zero Trust Enterprise plan. If you believe your account should have this entitlement, contact your account team to confirm your subscription details.
2. Permissions issue. You may not have the required administrative privileges to configure DLP settings. Check with your Cloudflare account administrator.

---

## More DLP resources

For more information, refer to the full DLP documentation.

[ DLP troubleshooting ❯ ](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/troubleshoot-dlp/) 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/dlp/#page","headline":"DLP · Cloudflare One docs","description":"DLP for Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/dlp/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/troubleshooting/dlp/","name":"DLP"}}]}
```
