---
title: Download a report
description: Download a report in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Download a report

Email security allows you to download three types of reports:

* Disposition report
* Retro scan report
* Security report

## Download a disposition report

A disposition report shows you all the email messages based on the type of disposition you selected.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Select **Monitoring** \> **Download report**.
3. In **Report type**, select **Email disposition report**.
4. Under **Email disposition report**, select the **Date Range** (required), and the **Disposition**.
5. Select **Export to CSV**.

Refer to [Dispositions and attributes](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/) to learn more.

## Download a retro scan report

Retro scan scans the last 14 days of your emails, and gives you a report on bulk, spam, spoof, suspicious and malicious emails.

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Select **Monitoring** \> **Download report**.
3. In **Report type**, select **Retro Scan report**.
4. Select **View report** to view a report of your last 14 days of emails.

Refer to [Retro Scan](https://developers.cloudflare.com/cloudflare-one/email-security/retro-scan/) to learn more.

## Download a security report

A security report provides an overview of your email traffic. The report can be generated on the last 30, 60, 90 days, or a timeframe of your choice.

The reports contains:

* An executive summary: A summary of the threats detected in your organization's email traffic in the last 30 days.
* Threat detection: Review metrics regarding dispositions, policy detection, and impersonation attempts.
* Submissions: Review the metrics of emails your security team or users have requested to reclassify.

To download a security report:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), select **Email security**.
2. Select **Monitoring** \> **Download report**.
3. In **Report type**, select **Security report** and the **Date range**.
4. Select **Generate report**.
5. Your security report is being generated. You will receive an email with the security report attached once it is ready.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/download-report/#page","headline":"Download a report · Cloudflare One docs","description":"Download a report in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/download-report/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/monitoring/","name":"Monitoring"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/monitoring/download-report/","name":"Download a report"}}]}
```
