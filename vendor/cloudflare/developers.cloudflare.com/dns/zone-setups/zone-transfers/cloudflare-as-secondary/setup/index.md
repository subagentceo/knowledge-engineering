---
title: Setup
description: With incoming zone transfers, you can keep your primary DNS provider and use Cloudflare as a secondary DNS provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setup

With [incoming zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/), you can keep your primary DNS provider and use Cloudflare as a secondary DNS provider.

Normal incoming zone transfers only provide DNS resolution. If you also want your traffic to benefit from Cloudflare's performance and security features, you need to [set up Secondary DNS Override](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/).

  
## Before you begin

* You should already have a registered domain, set up with your primary DNS provider.
* Review the available options and plan for how you will use [DNSSEC with Cloudflare as secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/).
* Make sure you have completed the following tasks at your primary DNS provider and at Cloudflare.

### At your primary DNS provider

Your primary DNS provider should allow traffic from the IP address and port specified in your [peer server configuration](#2-create-peer-server).

It should also have updated [Access Control Lists (ACLs)](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#cloudflare-as-secondary) to prevent zone transfers from being blocked.

We strongly recommend configuring [DNS NOTIFY ↗](https://datatracker.ietf.org/doc/html/rfc1996) at your primary DNS provider to ensure your secondary zone on Cloudflare is updated with the most recent changes as quickly as possible. In order to do so, set up [Cloudflare NOTIFY IPs](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#notify-ips) at your primary DNS provider.

You will also need the following information from your Primary DNS provider:

* **Primary IP address**: The IP address that Cloudflare sends zone transfer requests to (via AXFR or IXFR).
* **Zone transfer type**: Will zone transfers be full (AXFR) or incremental (IXFR)?
* **TSIG name** (optional): A descriptive name of the TSIG following domain name syntax ([RFC 8945 section 4.2 ↗](https://datatracker.ietf.org/doc/html/rfc8945#section-4.2)).  
Note  
The TSIG names configured at your primary and secondary DNS providers have to be exactly the same. Any differences in TSIG names will cause zone transfers to fail.
* **TSIG secret** (optional): The secret string used to authenticate zone transfers.
* **TSIG algorithm** (optional): The algorithm used to authenticate zone transfers.

### At Cloudflare

Make sure your account team has enabled your zone for Secondary DNS.

Get the following values from your Cloudflare account:

* [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/)
* [Zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/)
* [Nameserver names](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#31-get-nameserver-names), which should have **secondary** in the name.

---

## 1\. Create TSIG (optional)

A Transaction Signature (TSIG) authenticates communication between a primary and secondary DNS server.

Note

The TSIG names configured at your primary and secondary DNS providers have to be exactly the same. Any differences in TSIG names will cause zone transfers to fail.

While optional, this step is highly recommended.

* [ Dashboard ](#tab-panel-8163)
* [ API ](#tab-panel-8164)

To create a TSIG using the dashboard:

1. In the Cloudflare dashboard, go to the account **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **DNS Settings**.
3. Under **DNS Zone Transfers**, for **TSIG**, select **Create**.
4. Enter the following information:  
   * **TSIG name**: The name of the TSIG object using domain name syntax (more details in [RFC 8945 section 4.2 ↗](https://datatracker.ietf.org/doc/html/rfc8945#section-4.2)).  
   * **Secret (optional)**: Get a shared secret to add to your third-party nameservers. If left blank, this field generates a random secret.  
   * **Algorithm**: Choose a TSIG signing algorithm.
5. Select **Create**.

To create a TSIG using the API, send a [POST](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/tsigs/methods/create/) request.

## 2\. Create Peer Server

* [ Dashboard ](#tab-panel-8161)
* [ API ](#tab-panel-8162)

To create a peer server using the dashboard:

1. In the Cloudflare dashboard, go to the account **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **DNS Settings**.
3. Under **DNS Zone Transfers**, for **Peer DNS servers**, select **Create**.
4. Enter the following information, paying particular attention to:  
   * **IP**: Specifies where Cloudflare sends transfer requests to.  
   * **Port**: Specifies the IP Port for the transfer IP.  
   * **Enable incremental (IXFR) zone transfers**: Specifies if Cloudflare sends IXFR requests in addition to the default AXFR requests.  
   * **Link an existing TSIG**: If desired, link the TSIG you [previously created](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/#1-create-tsig-optional).
5. Select **Create**.

To create a peer DNS server using the API, send a [POST request](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/peers/).

## 3\. Create the Secondary Zone

* [ Dashboard ](#tab-panel-8165)
* [ API ](#tab-panel-8166)

To create a secondary zone using the dashboard:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login) and select your account.
2. Select **Onboard a domain**.
3. Enter your zone name and choose **Secondary DNS** (if this option is not available, contact your account team).
4. Select **Continue**.
5. Select your plan type.
6. Choose a value for **Zone refresh**, which controls the number of seconds between zone updates from your primary DNS server.  
Warning  
Cloudflare will not use the REFRESH value inside the SOA record that is served by your primary provider. Instead the value of zone refresh configured for your secondary zone on Cloudflare will be used to determine the interval after which the SOA serial of the primary zone will be checked for changes.
7. Select the peer server you [previously created](#2-create-peer-server). If needed, you can link more than one peer server to a zone.  
Note  
The maximum number of linked peers per zone is 30.
8. Select **Continue**.
9. Review the list of transferred records and select **Continue**.  
Note  
If no records appear, you may have misconfigured the TSIG or the IP address of the peer server or the [Access Control List](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#cloudflare-as-secondary) was improperly configured at your primary DNS provider.
10. Select **Initiate zone transfer**.

To create a secondary zone using the API, send a [POST](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/incoming/methods/create/) request with the `type` parameter set to `"secondary"`.

## 4\. Update registrar

At your registrar, add the secondary nameservers [specified in the Cloudflare dashboard](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#31-get-nameserver-names). Do not remove your primary DNS provider's nameservers.

When you have added the Cloudflare nameservers, go into your new secondary zone and select **Done, check nameservers**.

## 5\. Create notifications (optional)

To increase the reliability of your incoming zone transfers, [set up notifications](https://developers.cloudflare.com/notifications/get-started/#create-a-notification) to be notified when your primaries are failing, when records are updated, [and more](https://developers.cloudflare.com/notifications/notification-available/#dns).

## 6\. Proxy traffic through Cloudflare (optional)

Normal incoming zone transfers only provide DNS resolution. If you also want your traffic to benefit from Cloudflare's performance and security features, you need to [set up Secondary DNS Override](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/#page","headline":"Set up incoming zone transfers (Cloudflare as Secondary) · Cloudflare DNS docs","description":"With incoming zone transfers, you can keep your primary DNS provider and use Cloudflare as a secondary DNS provider.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-secondary/","name":"Cloudflare as Secondary"}},{"@type":"ListItem","position":6,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/","name":"Setup"}}]}
```
