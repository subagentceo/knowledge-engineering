---
title: Reports
description: View and share DDoS attack reports from the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Reports

To download an ad-hoc DDoS report, generate a PDF report file by selecting **Print report** in your [analytics dashboard](https://developers.cloudflare.com/ddos-protection/reference/analytics/).

WAF/CDN customers can download a monthly report in Account Home > **Security Center**, by selecting [Security Reports](https://developers.cloudflare.com/analytics/account-and-zone-analytics/app-security-reports/) and downloading the desired monthly report.

Additionally, if you are a Magic Transit or Spectrum BYOIP customer, you will receive weekly DDoS reports by email with a snapshot of the DDoS attacks that Cloudflare detected and mitigated in the previous week.

Note

To receive DDoS reports by email you must have opted in to the **Analytics** category in the [communication preferences](https://developers.cloudflare.com/fundamentals/user-profiles/customize-account/#notifications) for your profile.

## Weekly DDoS reports

Cloudflare sends DDoS reports via email from `no-reply@notify.cloudflare.com` to users with the Super Administrator role on accounts with prefixes advertised by Cloudflare.

Reports contain the following information:

* Total number of DDoS attacks
* Largest DDoS attack in packets per second (pps) and bits per second (bps)
* Changes in DDoS attacks compared to the previous report
* Top attack protocols
* Top targeted IP addresses
* Top targeted destination ports
* Total potential downtime prevented (a sum of the duration of all attacks in that week)
* Total bytes mitigated (a sum of all the mitigated attack traffic)

Cloudflare issues DDoS reports via email each Tuesday. Reports summarize the attacks that occurred from Monday of the previous week to Sunday of the current week. For example, a report issued on 2020-11-10 (Tuesday) summarizes activity from 2020-11-02 (Monday) to 2020-11-08 (Sunday).

To receive real-time attack alerts, configure [DDoS alerts](https://developers.cloudflare.com/ddos-protection/reference/alerts/).

Notes

* Information about top attack protocols, IP addresses, and destination ports is temporarily unavailable in weekly DDoS reports. Use the [Network Analytics dashboard](https://developers.cloudflare.com/analytics/network-analytics/) to get this information.
* DDoS reports and DDoS alerts are independent: DDoS reports will include information about any attacks for which you received DDoS alerts.

### Example report

The following image shows an example DDoS report:

![Example email sent with a weekly DDoS report](https://developers.cloudflare.com/_astro/ddos-report-email.meVYnmIT_Z5AHUW.webp) 

When Cloudflare does not detect any L3/4 DDoS attacks in the prior week, Cloudflare sends a confirmation report:

![Example report email sent when Cloudflare does not detect any DDoS attack in the previous week](https://developers.cloudflare.com/_astro/ddos-report-no-attacks.DOx1yQA2_ZBJVFd.webp) 

### Manage reporting subscriptions

Magic Transit and Spectrum BYOIP customers will receive the weekly DDoS report automatically.

To stop receiving DDoS reports, select the unsubscribe link at the bottom of the report email. To resubscribe after opting out, contact Cloudflare support.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/reference/reports/#page","headline":"DDoS reports · Cloudflare DDoS Protection docs","description":"View and share DDoS attack reports from the Cloudflare dashboard.","url":"https://developers.cloudflare.com/ddos-protection/reference/reports/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/reference/reports/","name":"Reports"}}]}
```
