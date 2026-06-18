---
title: Contact Cloudflare Support
description: Contact Cloudflare Support in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Contact Cloudflare Support

If you cannot resolve an issue using our troubleshooting guides, you can [open a support case](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

To help us investigate your issue quickly, please collect and provide the following information when you contact Cloudflare Support.

## 1\. Gather general information

For all issues, please include:

* **Timestamp (UTC)**: The exact time the issue occurred.
* **Detailed description**: A clear description of the problem and the steps to reproduce it.
* **Actual vs. Expected**: What happened versus what you expected to happen.
* **Problem frequency**: How often does the issue occur?
* **Screenshots**: Any relevant screenshots or videos of the error.
* **Example URLs**: Specific URLs where the issue is occurring.

## 2\. Collect product diagnostics

Depending on the product, providing diagnostic files is critical for a technical investigation.

### Cloudflare One Client (WARP)

If the issue involves the Cloudflare One Client, run the `warp-diag` command on the affected device and attach the resulting `.zip` file to your case. For more information, refer to [Diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/).

### Cloudflare Tunnel

If the issue involves Cloudflare Tunnel, run the `cloudflared tunnel diag` command and provide the generated report. For more information, refer to [Tunnel diagnostic logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/diag-logs/).

### Access and Gateway

For issues related to authentication loops, blocked websites, or policy enforcement:

* **HAR file**: Provide a [HAR file](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#generate-a-har-file) captured while reproducing the issue.
* **Ray ID**: If you see a Cloudflare error page, provide the **Ray ID** displayed at the bottom of the page.
* **Identity Provider logs**: Relevant logs from your identity provider (IdP) if the issue involves login failures.
* **Request ID**: For Gateway issues, you can find the `request_id` (HTTP logs) or `query_id` (DNS logs) in your [Gateway logs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/troubleshooting/).

### Digital Experience Monitoring (DEX)

For issues with DEX tests or device monitoring, provide a [remote capture](https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/) from the Zero Trust dashboard.

---

For more information, refer to [Contacting Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/contact-support/#page","headline":"Contact Cloudflare Support · Cloudflare One docs","description":"Contact Cloudflare Support in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/contact-support/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/troubleshooting/contact-support/","name":"Contact Cloudflare Support"}}]}
```
