---
title: Microsoft 365 as MX Record
description: Integrate Microsoft 365 as MX Record with Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Microsoft 365 as MX Record

![A schematic showing where Email security is in the life cycle of an email received](https://developers.cloudflare.com/_astro/Email_security_M365_MX_Inline.BeUQoQiv_Z2khods.webp) 

In this tutorial, you will learn how to configure Microsoft 365 with Email security as its MX record.

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

## 1\. Add Email security IP addresses to Allow List

1. Go to the [Anti-spam policies page ↗](https://security.microsoft.com/antispam) \> Select **Edit connection filter policy**.
2. In **Always allow messages from the following IP addresses or address range**, add IP addresses and CIDR blocks mentioned in the [Egress IPs](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/) page.
3. Select **Save**.
4. Microsoft recommends disabling SPF Hard fail when an email solution is placed in front of it:  
   * Return to the [Anti-spam option ↗](https://security.microsoft.com/antispam).  
   * Select **Default anti-spam policy**.  
   * Select **[Edit spam threshold and properties ↗](https://learn.microsoft.com/en-us/defender-office-365/anti-spam-bulk-complaint-level-bcl-about)** \> **Mark as spam** \> **SPF record: hard fail**, and ensure it is set to **Off**.
5. Select **Save**.

## 2\. Configure Enhanced Filtering

### Create an inbound connector

1. [Set up a connector ↗](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/set-up-connectors-to-route-mail#1-set-up-a-connector-from-your-email-server-to-microsoft-365-or-office-365).
2. Select **Partner organization** under **Connection from**.  
   * Provide a name for the connector:  
         * **Name**: `Email security Inbound Connector`  
         * **Description**: `Inbound connector for Enhanced Filtering`
3. In **Authenticating sent email**, select **By verifying that the IP address of the sending server matches one of the following IP addresses, which belongs to your partner organization.**
4. Enter all of the egress IPs in the [Egress IPs](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/) page.
5. In **Security restrictions**, accept the default **Reject email messages if they aren't sent over TLS** setting.

### Enable enhanced filtering

Now that the inbound connector has been configured, you will need to enable the enhanced filtering configuration of the connector.

1. Go to the [Security admin console ↗](https://security.microsoft.com/homepage), and [enable enhanced filtering ↗](https://learn.microsoft.com/en-us/exchange/mail-flow-best-practices/use-connectors-to-configure-mail-flow/enhanced-filtering-for-connectors#use-the-microsoft-defender-portal-to-configure-enhanced-filtering-for-connectors-on-an-inbound-connector).
2. Select **Automatically detect and skip the last IP address** and **Apply to entire organization**.
3. Select **Save**.

## 3\. Configure anti-spam policies

To configure anti-spam policies:

1. Open the [Microsoft 365 Defender console ↗](https://security.microsoft.com/).
2. Go to **Email & collaboration** \> **Policies & rules**.
3. Select **Threat policies**.
4. Under **Policies**, select **Anti-spam**.
5. Select the **Anti-spam inbound policy (Default)** text (not the checkbox).
6. In **Actions**, scroll down and select **Edit actions**.
7. Set the following conditions and actions (you might need to scroll up or down to find them):
* **Spam**: _Move messages to Junk Email folder_.
* **High confidence spam**: _Quarantine message_.  
   * **Select quarantine policy**: _AdminOnlyAccessPolicy_.
* **Phishing**: _Quarantine message_.  
   * **Select quarantine policy**: _AdminOnlyAccessPolicy_.
* **High confidence phishing**: _Quarantine message_.  
   * **Select quarantine policy**: _AdminOnlyAccessPolicy_.
* **Retain spam in quarantine for this many days**: Default is 15 days. Email security recommends 15-30 days.  
   * Select the spam actions in the above step:
1. Select **Save**.

## 4\. Create transport rules

To create the transport rules that will send emails with certain [dispositions](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/#dispositions) to Email security:

1. Open the new [Exchange admin center ↗](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** \> **Rules**.
3. Select **Add a Rule** \> **Create a new rule**.
4. Set the following rule conditions:  
   * **Name**: _Email Security Deliver to Junk Email folder_.  
   * **Apply this rule if**: _The message headers_ \> _includes any of these words_.  
         * **Enter text**: `X-CFEmailSecurity-Disposition` \> **Save**.  
         * **Enter words**: `BULK` \> **Add** \> **Save**.  
   * **Apply this rule if**: Select **+** to add a second condition.  
   * **And**: _The sender_ \> _IP address is in any of these ranges or exactly matches_ \> enter the egress IPs mentioned in [Egress IPs](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/).  
   * **Do the following** \- _Modify the message properties_ \> _Set the Spam Confidence Level (SCL)_ \> _5_.
5. Select **Next**.
6. You can use the default values on this screen. Select **Next**.
7. Review your settings and select **Finish** \> **Done**.
8. Select the rule **Email security Deliver to Junk Email folder** you have just created, and **Enable**.
9. Select **Add a Rule** \> **Create a new rule**.
10. Set the following rule conditions:  
   * **Name**: `Email security Deliver to Junk Email folder`.  
   * **Apply this rule if**: _The message headers_ \> _includes any of these words_.  
         * **Enter text**: `X-CFEmailSecurity-Disposition` \> **Save**.  
         * **Enter words**: `MALICIOUS`, `UCE`, `SPOOF` \> **Add** \> **Save**.  
   * **Apply this rule if**: Select **+** to add a second condition.  
   * **And**: _The sender_ \> _IP address is in any of these ranges or exactly matches_ \> enter the egress IPs in the [Egress IPs](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/).  
   * **Do the following**: _Redirect the message to_ \> _hosted quarantine_.
11. Select **Next**.
12. You can use the default values on this screen. Select **Next**.
13. Review your settings and select **Finish** \> **Done**.
14. Select the rule you have just created, and select **Enable**.

## 5\. Set up MX/Inline

Now that you have completed the prerequisite steps, set up MX/Inline on the Cloudflare dashboard. Refer to [Set up MX/Inline deployment](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/) for the next steps.

## 6\. (Recommended) Secure Microsoft 365 from MX records bypass

One method of a DNS attack is to search for old MX records and send phishing emails directly to the mail server. To secure the email flow, you should enforce an email flow where inbound messages are accepted by Microsoft 365 only when they originate from Email security. This can be done by adding a connector to only allow email from Email security with TLS encryption. This step is optional but recommended.

Important

This step should not be performed until 72 hours after all domains in your Microsoft 365 organization have been onboarded to Email security, and Email security is their MX record. If a domain has not been onboarded or DNS is still propagating, you will impact production email flow for that domain.

#### Create Connector

1. Go to the new [Exchange admin center ↗](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** \> **Connectors**.
3. Select **Add a connector**.
4. Go to **Connection from** \> **Partner organization**.
5. Select **Next**.
6. Set the following options:  
   * **Name** \- `Secure M365 Inbound`  
   * **Description** \- `Only accept inbound email from Email security`
7. Select **Next**.
8. Make sure **By Verifying that the sender domain matches one of the following domains** is selected.
9. Enter `*` in the text field, and select **+**.
10. Select **Next**.
11. Make sure **Reject email messages if they aren't sent over TLS** is selected.
12. Still in the same screen, select **Reject email messages if they aren't sent from within this IP address range**, and enter all the egress IPs in the [Egress IPs](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/) page.
13. Select **Next**.
14. Review your settings and select **Create connector**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/m365-email-security-mx/#page","headline":"Microsoft 365 as MX Record · Cloudflare One docs","description":"Integrate Microsoft 365 as MX Record with Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/m365-email-security-mx/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/","name":"Pre-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/","name":"Prerequisites"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/m365-email-security-mx/","name":"Microsoft 365 as MX Record"}}]}
```
