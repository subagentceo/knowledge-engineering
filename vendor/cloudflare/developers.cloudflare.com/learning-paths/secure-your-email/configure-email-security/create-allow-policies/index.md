---
title: Create allow policies
description: Configure trusted sender allow policies.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create allow policies

Email security allows you to configure allow policies. An allow policy exempts messages that match certain patterns from normal detection scanning.

You can choose how Email security will handle messages that match your criteria:

* **Trusted Sender**: Messages will bypass all [detections](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/) and link following. Typically, it only applies to phishing simulations from vendors such as KnowBe4\. Many emails contain links in them. Some of these could be links to surveys, phishing simulations and other trackable links. By marking a message as a Trusted Sender, Email security will not scan any attachments from the sender and will not attempt to open the links in the emails.
* **Exempt Recipient**: Messages will be exempt from all Email security [detections](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/) intended for recipients matching this pattern (email address or regular expression only). Typically, this only applies to submission mailboxes for user reporting to security.
* **Accept Sender**: Messages will exempt messages from the `SPAM`, `SPOOF`, and `BULK` [dispositions](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/) (but not `MALICIOUS` or `SUSPICIOUS`). Commonly used for external domains and sources that send mail on behalf of your organization, such as marketing emails or internal tools.

## Configure allow policies

To configure allow policies:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**, then go to **Detection settings** \> **Allow policies**.
4. On the **Detection settings** page, select **Add a policy**.
5. On the **Add an allow policy** page, enter the policy information:  
   * **Input method**: Choose between **Manual input**, and **Uploading an allow policy**:  
         * **Manual input**:  
                  * **Action**: Select one of the following to choose how Email security will handle messages that match your criteria:  
                              * **Trust sender**: Messages will bypass all detections and link following.  
                              * **Exempt recipient**: Message to this recipient will bypass all detections.  
                              * **Accept sender**: Messages from this sender will be exempted from Spam, Spoof, and Bulk dispositions.  
         * **Rule type**: Specify the scope of your policy. Choose one of the following:  
                  * **Email addresses**: Must be a valid email.  
                  * **IP addresses**: Can only be IPv4\. IPv6 and CIDR are invalid entries.  
                  * **Domains**: Must be a valid domain.  
                  * **Regular expressions**: Must be valid Java expressions. Regular expressions are matched with fields related to the sender email address (envelope from, header from, reply-to), the originating IP address, and the server name for the email.  
         * **(Recommended) Sender verification**: This option enforces DMARC, SPF, or DKIM authentication. If you choose to enable this option, Email security will only honor policies that pass authentication.  
                  * **Notes**: Provide additional information about your allow policy.  
   * **Uploading an allow policy**: Upload a file no larger than 150 KB. The file can only contain `Pattern`, `Notes`, `Verify Email`, `Trusted Sender`, `Exempt Recipient`, and `Acceptable Sender` fields. The first row must be a header row.
6. Select **Save**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/create-allow-policies/#page","headline":"Create allow policies · Cloudflare Learning Paths","description":"Configure trusted sender allow policies.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/create-allow-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/","name":"Configure Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/create-allow-policies/","name":"Create allow policies"}}]}
```
