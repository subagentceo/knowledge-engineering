---
title: Setup
description: With outgoing zone transfers, you can keep Cloudflare as your primary DNS provider and use one or more secondary providers for increased availability.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setup

With [outgoing zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/), you can keep Cloudflare as your primary DNS provider and use one or more secondary providers for increased availability and fault tolerance.

## Before you begin

Make sure your account team has enabled your zone for outgoing zone transfers.

Consider the [expected behaviors](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/transfer-criteria/) for different record types, and review your [existing DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) to make sure all of them have the desired **Proxy status**.

If using the API, you may also want to [locate your Zone and Account IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

---

## 1\. Create TSIG (optional)

A Transaction Signature (TSIG) authenticates communication between a primary and secondary DNS server.

Note

The TSIG names configured at your primary and secondary DNS providers have to be exactly the same. Any differences in TSIG names will cause zone transfers to fail.

While optional, this step is highly recommended.

* [ Dashboard ](#tab-panel-8151)
* [ API ](#tab-panel-8152)

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

## 2\. Create Peer DNS Server (optional)

You only need to create a peer DNS server if you want:

* Your secondary nameservers to receive **NOTIFYs** for changes to your Cloudflare DNS records.
* A **TSIG** to sign zone transfer requests and **NOTIFYs**.

* [ Dashboard ](#tab-panel-8147)
* [ API ](#tab-panel-8148)

To create a peer using the dashboard:

1. In the Cloudflare dashboard, go to the account **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **DNS Settings**.
3. Under **DNS Zone Transfers**, for **Peer DNS servers**, select **Create**.
4. Enter the following information, paying particular attention to:  
   * **IP**: If configured, specifies where Cloudflare sends NOTIFY requests to.  
   * **Port**: Specifies the IP Port for the NOTIFY IP.  
   * **Enable incremental (IXFR) zone transfers**: Does not apply when you are using Cloudflare as your primary DNS provider (Cloudflare zones always accept IXFR requests).  
   * **Link an existing TSIG**: If desired, link the TSIG you [previously created](#1-create-tsig-optional).
5. Select **Create**.

To create a peer DNS server using the API, send a [POST](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/peers/methods/create/) request.

## 3\. Link peer to primary zone (optional)

If you previously [created a peer DNS server](#2-create-peer-dns-server-optional), you should link it to your primary zone.

Note

The maximum number of linked peers per zone is 30.

* [ Dashboard ](#tab-panel-8149)
* [ API ](#tab-panel-8150)

To link a primary zone to a peer using the dashboard:

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. For **DNS Zone Transfers**, select **Manage linked peers**.
3. Select a peer.
4. Select **Save**.

To link a primary zone to a peer using the API, send a [POST](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/incoming/methods/create/) request with the ID of the peer you [previously created](#2-create-peer-dns-server-optional).

Multiple peers and TSIG

If you link more than one peer to a zone and at least one of them has TSIG configured, all peers are expected to also use the same TSIG.

## 4\. Update your secondary DNS provider

Your secondary DNS provider should send zone transfer requests (via AXFR or IXFR) to [this IP](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#transfer-ip) on port 53 and from the IP address specified in your [peer configuration](#2-create-peer-dns-server-optional).

It should also have updated [Access Control Lists (ACLs)](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#allow-range) to prevent NOTIFY messages sent from Cloudflare IP ranges from being blocked.

## 5\. Add secondary nameservers within Cloudflare

Using the information from your secondary DNS provider, [create NS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) on your zone apex listing your secondary nameservers.

By default, Cloudflare ignores NS records added to the zone apex. To modify this behavior, enable [multi-provider DNS](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#multi-provider-dns).

Note

If your account [zone defaults](https://developers.cloudflare.com/dns/additional-options/dns-zone-defaults/) are already defined to have **Multi-provider DNS** enabled, this step may not be necessary.

* [ Dashboard ](#tab-panel-8153)
* [ API ](#tab-panel-8154)

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Enable **Multi-provider DNS**.

Send the following `PATCH` request replacing the placeholders with your zone ID and authentication information:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone DNS Settings Write`
* `DNS Write`

Update DNS Settings

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_settings" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "multi_provider": true

  }'


```

Note

In case you want to keep Cloudflare as the only authoritative DNS provider, do not enable multi-provider DNS. In this way, your secondary DNS is kept hidden and up-to-date with the Cloudflare primary, as a backup option for disaster recovery scenarios.

## 6\. Enable outgoing zone transfers

When you enable outgoing zone transfers, this will send a DNS NOTIFY message to your secondary DNS provider.

* [ Dashboard ](#tab-panel-8145)
* [ API ](#tab-panel-8146)

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. For **Outgoing Zone Transfers**, switch the toggle to **On**.

To enable outgoing zone transfers using the API, send a [POST](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/outgoing/methods/enable/) request.

## 7\. Add secondary nameservers to registrar

At your registrar, add the nameservers of your secondary DNS provider.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/setup/#page","headline":"Set up outgoing zone transfers (Cloudflare as Primary) · Cloudflare DNS docs","description":"With outgoing zone transfers, you can keep Cloudflare as your primary DNS provider and use one or more secondary providers for increased availability.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-primary/","name":"Cloudflare as Primary"}},{"@type":"ListItem","position":6,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-primary/setup/","name":"Setup"}}]}
```
