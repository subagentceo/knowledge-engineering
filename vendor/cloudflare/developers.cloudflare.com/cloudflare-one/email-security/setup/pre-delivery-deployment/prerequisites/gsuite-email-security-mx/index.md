---
title: Google Workspace as MX Record
description: Integrate Google Workspace as MX Record with Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Google Workspace as MX Record

![A schematic showing where Email security is in the life cycle of an email received](https://developers.cloudflare.com/_astro/Email_Security_Gmail_MX_Inline.BySaw74N_r7mj1.webp) 

In this tutorial, you will learn how to configure Google Workspace with Email security as MX record.

## Prerequisites

To ensure changes made in this tutorial take effect quickly, update the Time to Live (TTL) value of the existing MX records on your domains to five minutes. Do this on all the domains you will be deploying.

Changing the TTL value instructs DNS servers on how long to cache this value before requesting an update from the responsible nameserver. You need to change the TTL value before changing your MX records to Email security. This will ensure that changes take effect quickly and can also be reverted quickly if needed. If your DNS manager does not allow for a TTL of five minutes, set it to the lowest possible setting.

Note

Make TTL changes a few days before the production update, and wait at least as long as the old TTL values before making the update, since some senders might still be using the old cached values.

To check your existing TTL, open a terminal window and run the following command against your domain:

Terminal window

```

dig mx <YOUR_DOMAIN>


```

```

; <<>> DiG 9.10.6 <<>> mx <YOUR_DOMAIN>

;; global options: +cmd

;; Got answer:

;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 39938

;; flags: qr rd ra; QUERY: 1, ANSWER: 5, AUTHORITY: 0, ADDITIONAL: 1


;; OPT PSEUDOSECTION:

; EDNS: version: 0, flags:; udp: 4096

;; QUESTION SECTION:

;<YOUR_DOMAIN>.    IN  MX


;; ANSWER SECTION:

<YOUR_DOMAIN>.    300    IN    MX    10 mxa.global.inbound.cf-emailsecurity.net.

<YOUR_DOMAIN>.    300    IN    MX    10 mxb.global.inbound.cf-emailsecurity.net.


```

In the above example, TTL is shown in seconds as `300` (or five minutes).

If you are using Cloudflare for DNS, you can leave the [TTL setting as **Auto**](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/).

Below is a list with instructions on how to edit MX records for some popular services:

* **Cloudflare**: [Set up email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)
* **GoDaddy**: [Edit an MX Record ↗](https://www.godaddy.com/help/edit-an-mx-record-19235)
* **AWS**: [Creating records by using the Amazon Route 53 console ↗](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html)
* **Azure**: [Create DNS records in a custom domain for a web app ↗](https://learn.microsoft.com/en-us/azure/dns/dns-web-sites-custom-domain)

## Requirements

* Provisioned Email security account.
* Access to the Google administrator console ([Google administrator console ↗](https://admin.google.com/) \> **Apps** \> **Google Workspace** \> **Gmail**).
* Access to the domain nameserver hosting the MX records for the domains that will be processed by Email security.

## 1\. Set up Inbound Email Configuration

Set up [Inbound Email Configuration ↗](https://support.google.com/a/answer/60730?hl=en) with the following details:

* In **Gateway IPs**, select the **Add** link, and add the IPs mentioned in [Egress IPs](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/).
* Select **Automatically detect external IP (recommended)**.
* Select **Require TLS for connections from the email gateways listed above**.
* Do not select **Reject all mail not from gateway IPs**. You will enable this option at a later time to ensure your mail flows.
* Select **SAVE**.

## 2\. (Optional) Set up an email quarantine

[Set up an email quarantine ↗](https://support.google.com/a/answer/6104172?hl=en#add-new-quarantine) with the following details:

* **Name**: Email security Malicious.
* **Description**: Email security Malicious.
* For the **Inbound denial consequence**, select **Drop message**.
* For the **Outbound denial consequence**, select **Drop message**.
* Select **SAVE**.

To access the newly created quarantine, select **GO TO ADMIN QUARANTINE** or access the quarantine directly by pointing your browser to [https://email-quarantine.google.com/adminreview ↗](https://email-quarantine.google.com/adminreview).

## 3\. (Optional) Create a content compliance filter

Go to **Compliance**, and create a [content compliance filter ↗](https://support.google.com/a/answer/1346934?hl=en#zippy=%2Cstep-go-to-gmail-compliance-settings-in-the-google-admin-console%2Cstep-enter-email-messages-to-affect) to send malicious messages to quarantine. Enter the following details:

* **Content compliance**: Add `Quarantine Email security Malicious`.
* **Email messages to affect**: Select **Inbound**.
* **Add expressions that describe the content you want to search for in each message**:  
   * Select **Add** to add the condition.  
   * In **Simple content match**, select **Advanced content match**.  
   * In **Location**, select **Full headers**.  
   * In **Match type**, select **Contains text**.  
   * In **Content**, enter `X-CFEmailSecurity-Disposition: MALICIOUS`.  
   * Select **SAVE** to save the condition.
* If the above expression match, do the following, select **Quarantine message** and the **Email security Malicious** quarantine that was created in the previous step.
* Select **SAVE**.

If you would like to quarantine the other dispositions, repeat the above steps and use the following strings for the other dispositions:

* `X-CFEmailSecurity-Disposition: BULK`
* `X-CFEmailSecurity-Disposition: SPOOF`
* `X-CFEmailSecurity-Disposition: UCE` (`UCE` is the equivalent of `SPAM`)

If desired, you can create a separate quarantine for each of the dispositions.

## 4\. Set up MX/Inline

Now that you have completed the prerequisite steps, set up MX/Inline on the Cloudflare dashboard. Refer to [Set up MX/Inline deployment](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/) for the next steps.

## 5\. (Recommended) Secure Google Workspace from MX records bypass

One method of a DNS attack is to search for old MX records and send phishing emails directly to the mail server. To secure the email flow, you should enforce an email flow where inbound messages are accepted by Google Workspace only when they originate from Email security. This can be done by adding a connector to only allow email from Email security with TLS encryption. This step is optional but recommended.

Important

This step should not be performed until 72 hours after all domains in your Google Workspace have been onboarded to Email security, and Email security is their MX record. If a domain has not been onboarded or DNS is still propagating, you will impact production email flow for that domain.

After 72 hours, the MX record DNS update will have sufficiently propagated across the Internet. It is now safe to secure your email flow. This will ensure that Google Workspace only accepts messages that are first received by Email security. This step is highly recommended to prevent threat actors from using cached MX entries to bypass Email security by injecting messages directly into Google Workspace.

1. Access the [Google Administrative Console ↗](https://admin.google.com/), then select **Apps** \> **Google Workspace** \> **Gmail**.
2. Select **Spam, Phishing and Malware**.
3. Go to **Inbound gateway** and select **Edit Inbound gateway**.
4. Enable **Reject all mail not from gateway IPs** and select **Save**.
5. Select **Save** once more to commit and activate the configuration change in the Gmail advanced configuration console.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/gsuite-email-security-mx/#page","headline":"Google Workspace as MX Record · Cloudflare One docs","description":"Integrate Google Workspace as MX Record with Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/gsuite-email-security-mx/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/","name":"Pre-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/","name":"Prerequisites"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/gsuite-email-security-mx/","name":"Google Workspace as MX Record"}}]}
```
