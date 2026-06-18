---
title: PhishGuard
description: PhishGuard in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# PhishGuard

PhishGuard is a team of analysts that routinely inspects your email environment and responds to threats that come through your email inbox.

While Email security uses advanced technologies to protect your email inbox, PhishGuard offers an additional human component to protect your email environment against impersonation events, suspicious items, false negatives/false positives, and any new event that automated intelligent systems may miss due to a lack of context (for example, a compromised account activity).

PhishGuard only works on a post-delivery environment (only emails that have already landed in your email inbox are reviewed). As a result, PhishGuard analysts may [submit a message for review](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/#submit-messages-for-review) or [auto-move](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) based on their findings.

Warning

Auto-moves are mandatory for PhishGuard customers.

PhishGuard coordinates with the email detections team, allowing you to directly request immediate detection for specific items and implement custom detections unique to your needs. An example of this is requesting to block all PayPal traffic if you do not use PayPal for invoicing. This capability allows you to take ownership over the rules governing your email environment through PhishGuard's human intervention.

Additionally, PhishGuard analysts:

* Use real-time threat data to identify malicious activity. Email-based threats are responded to rapidly, and immediately reported and documented.
* Review every [user](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#user-submissions) and [team](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#team-submissions) submission so your security team can focus on more critical activities.
* Help you detect and mitigate threats faster, reducing the time attacks have access to your network. This also helps reducing business impact, because it prevents data breaches, financial loss, and reputational damage.

To use PhishGuard:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **PhishGuard**.

The dashboard will display the following metrics:

* ROI Calculator
* Insider threat defense
* Email threat hunting
* Actions
* API Status
* Managed email security operations
* Reports

## ROI Calculator

Use the ROI Calculator to compare triage durations and hourly rates to calculate PhishGuard's return on investment.

The ROI Calculator displays:

* Total aggregated saved number in USD dollars.
* Triage duration: The amount of time in minutes spent triaging the message.
* Hourly rate.

## Insider threat defense

An [insider threat ↗](https://www.cloudflare.com/en-gb/learning/access-management/what-is-an-insider-threat/) is a risk to an organization's security stemming from someone associated with the organization. PhishGuard looks for threat actor groups.

Insider threat defense on the dashboard displays **Insider leads** and **Insider reports generated**. **Insider leads** displays the number of emails identified as potential insider threat email. **Insider reports generated** displays the number of reports created based on insider leads.

## Email threat hunting

PhishGuard reviews suspicious and highly malicious activity in your email environment.

On the Cloudflare One dashboard, email threat hunting displays previously unknown phishing attacks.

Email threat hunting also gives you information on **Threat leads generated** and **Total reposts generated**.

## Actions

**Actions** allows you to review the most common actions taken by the PhishGuard team, such as escalations, threat hunts, and moves.

## API Status

API Status allows you to monitor and configure the current status of API message auto-moves and directory integrations.

Select **Message moves** to [configure auto-moves](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/). Select **Directory integration** to [configure directories](https://developers.cloudflare.com/cloudflare-one/email-security/directories/).

## Managed email security operations

Managed email security operations allows you to review the results of phish submissions reviewed by the PhishGuard team.

It displays the following:

* Total [phish submissions](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/)
* Tracked incidents
* Median time to resolve
* Resolved track incidents

## Reports

Under Reports, you can review reports of threats discovered and resolved by the PhishGuard team.

If you select the three dots, you can:

* **View report details**: Report Details gives you the following information about each report:  
   * **Overview**: An Overview of the report. This includes date and time of the report, type of attack performed, and more.  
   * **Target and victimology**: Company targeted.  
   * **Details**: Displays information such as delivery disposition, current disposition, ES Alert ID, Message-ID, Timestamp, Subject, and Attempted Fraudulent Amount.  
   * **Indicators of compromise (IOC)**: [Indicators of compromise (IOC) ↗](https://www.cloudflare.com/en-gb/learning/security/what-are-indicators-of-compromise/) are information about a specific security breach that can help security teams determine if an attack has taken place.
* Preview email.
* [Move email](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/phishguard/#page","headline":"PhishGuard · Cloudflare One docs","description":"PhishGuard in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/phishguard/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/phishguard/","name":"PhishGuard"}}]}
```
