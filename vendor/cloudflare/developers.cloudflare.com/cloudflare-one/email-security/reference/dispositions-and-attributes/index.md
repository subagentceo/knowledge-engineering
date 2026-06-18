---
title: Dispositions and attributes
description: Reference information for Dispositions and attributes in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dispositions and attributes

Email security uses a variety of factors to determine whether a given email message, domain, URL, or packet is part of a phishing campaign. These small pattern assessments are dynamic in nature and — in many cases — no single pattern will determine the final verdict.

Detection vs. disposition

Detection is the process Email security does to identify what threat an email may contain. An email can have multiple detections, but they will only have one and final disposition. The detections an email have will determine the disposition of the email.

## Dispositions

Any traffic that flows through Email security is given a final disposition, which represents our evaluation of that specific message. Each message will receive only one disposition header, so your organization can take clear and specific actions on different message types.

You can use disposition values when [setting up auto-moves](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/).

### Available values

The following disposition values follow an order of maliciousness:

* **Malicious**: Traffic associated with active threat campaigns. Malicious messages invoked multiple phishing verdict triggers and met thresholds for bad behavior.  
   * **Recommendation**: Block.
* **Spam**: Traffic associated with non-malicious, commercial campaigns.  
   * **Recommendation**: Route to existing Spam quarantine folder.
* **Bulk**: Traffic often associated with newsletters or marketing campaigns. Refer to [Graymail ↗](https://en.wikipedia.org/wiki/Graymail%5F%28email%29) for more details.  
   * **Recommendation**: Monitor or tag.
* **Suspicious**: Traffic associated with phishing campaigns (and is under further analysis by our automated systems).  
   * **Recommendation**: Research these messages internally to evaluate legitimacy.
* **Spoof**: Traffic associated with phishing campaigns that is either non-compliant with your email authentication policies ([SPF ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-spf-record/), [DKIM ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dkim-record/), [DMARC ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dmarc-record/)) or has mismatching `Envelope From` and `Header From` values.  
   * **Recommendation**: Block after investigating (can be triggered by third-party mail services).

### Header structure

When Email security adds a disposition header to an email message, that header matches the following format:

```

X-CFEmailSecurity-Disposition: [Value]


```

Note that emails with a disposition of `SPAM` will be tagged with `UCE` (unsolicited commercial emails) in their headers:

```

X-CFEmailSecurity-Disposition: UCE


```

## Attributes

Traffic that flows through Email security can also receive one or more Attributes, which indicate that a specific condition has been met.

### Available values

| Attribute                                | Notes                                                                                                                                                                                                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CUSTOM\_BLOCK\_LIST                      | This message matches a value you have defined in your custom block list.                                                                                                                                                                                   |
| NEW\_DOMAIN\_SENDER=<REGISTRATION\_DATE> | Alerts to mail from a newly registered domain. Formatted as yyyy-MM-dd HH:mm:ss ZZZ.                                                                                                                                                                       |
| NEW\_DOMAIN\_LINK=<REGISTRATION\_DATE>   | Alerts to mail with links pointing out to a newly registered domain. Formatted as yyyy-MM-dd HH:mm:ss ZZZ.                                                                                                                                                 |
| ENCRYPTED                                | Email message is encrypted.                                                                                                                                                                                                                                |
| EXECUTABLE                               | Email message contains an executable file.                                                                                                                                                                                                                 |
| BEC                                      | Indicates that an email address was contained in your [impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/) list. Associated with MALICIOUS or SPOOF dispositions. |

### Header structure

When Email security adds a disposition header to an email message, that header matches the following format:

```

X-CFEmailSecurity-Attribute: [Value]

X-CFEmailSecurity-Attribute: [Value2]


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/#page","headline":"Dispositions and attributes · Cloudflare One docs","description":"Reference information for Dispositions and attributes in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/reference/dispositions-and-attributes/","name":"Dispositions and attributes"}}]}
```
