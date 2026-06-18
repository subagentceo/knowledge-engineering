---
title: Cisco - Email security as MX Record
description: Integrate Cisco - Email security as MX Record with Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cisco - Email security as MX Record

![A schematic showing where Email security sits in the life cycle of an email received](https://developers.cloudflare.com/_astro/Cisco_to_Email_Security_MX_Inline.CY054jTO_Z1C8rNN.webp) 

In this tutorial, you will learn how to configure Cisco IronPort with Email security as MX record.

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

## 1\. Add a Sender Group for Email security Email Protection IPs

To add a new Sender Group:

1. Go to **Mail Policies** \> **HAT Overview**.
2. Select **Add Sender Group**.
3. Configure the new Sender Group as follows:  
   * **Name**: `Email security`.  
   * **Order**: Order above the existing **WHITELIST** sender group.  
   * **Comment**: `Email security Email Protection egress IP Addresses`.  
   * **Policy**: `TRUSTED` (by default, spam detection is disabled for this mail flow policy).  
   * **SBRS**: Leave blank.  
   * **DNS Lists**: Leave blank.  
   * **Connecting Host DNS Verification**: Leave all options unchecked.
4. Select **Submit and Add Senders** and add the IP addresses mentioned in [Egress IPs](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/)

## 2\. Configure Incoming Relays

You need to configure the Incoming Relays section to tell IronPort to ignore upstream hops, since all the connections are now coming from Email security. This step is needed so the IronPort can retrieve the original IPs to calculate IP reputation. IronPort also uses this information in the Anti-Spam (IPAS) scoring of messages.

1. To enable the Incoming Relays Feature, select **Network** \> **Incoming Relays**.
2. Select **Enable** and commit your changes.
3. Now, you will have to add an Incoming Relay. Select **Network** \> **Incoming Relays**.
4. Select **Add Relay** and give your relay a name.
5. Enter the IP address of the MTA, MX, or other machine that connects to the email gateway to relay incoming messages. You can use IPv4 or IPv6 addresses.
6. Specify the `Received:` header that will identify the IP address of the original external sender.
7. Commit your changes.

## 3\. Disable SPF checks

Make sure you disable Sender Policy Framework (SPF) checks in IronPort. Because Email security is acting as the MX record, if you do not disable SPF checks, IronPort will block emails due to an SPF failure.

Refer to [Cisco's documentation ↗](https://www.cisco.com/c/en/us/support/docs/security/email-security-appliance/117973-faq-esa-00.html) for more information on how to disable SPF checks.

## 4\. Set up MX/Inline

Now that you have completed the prerequisite steps, set up MX/Inline on the Cloudflare dashboard. Refer to [Set up MX/Inline deployment](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment-setup/) for the next steps.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/cisco-email-security-mx/#page","headline":"Cisco - Email security as MX Record · Cloudflare One docs","description":"Integrate Cisco - Email security as MX Record with Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/cisco-email-security-mx/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/","name":"Pre-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/","name":"Prerequisites"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/prerequisites/cisco-email-security-mx/","name":"Cisco - Email security as MX Record"}}]}
```
