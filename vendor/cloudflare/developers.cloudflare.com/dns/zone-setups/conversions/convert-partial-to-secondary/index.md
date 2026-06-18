---
title: Convert partial setup to secondary setup
description: If you initially set up a partial zone on Cloudflare, you can later convert it to use a secondary setup.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Convert partial setup to secondary setup

If you initially set up a [partial zone (CNAME setup)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) on Cloudflare, you can later convert it to use a [secondary setup](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/).

Subdomain setup

If you also use subdomain setup[1](#user-content-fn-1), consider the [available combinations](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/#available-setups) and whether your zone conversion could have any implications.

## Footnotes

1. Meaning you have one or more subdomains (`sub.example.com`) added to Cloudflare as their own zone, separate from your apex domain (`example.com`). [↩](#user-content-fnref-1)

This page will guide you through this conversion using [export and import](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/) and API calls.

## Before you begin

Make sure you consider the following:

* Proxying traffic with secondary zones requires a setting that is not turned on by default. Refer to [Secondary DNS override](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/) to learn more. The steps below include enabling this setting.
* There are a few options for [DNSSEC with incoming zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/). If you want to use DNSSEC, plan for which option you will configure and confirm that your other DNS provider(s) support the setup.
* You can prepare SSL/TLS in advance by either ordering an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) or [uploading a custom certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/). You should confirm that the certificate covers all your proxied hostnames and that the [status of your SSL certificate ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) is **Active**.

## 1\. Prepare a zone file

1. Export a zone file from the authoritative DNS provider you were using with your CNAME setup (partial).
2. Edit the zone file to remove any occurrences of the `cdn.cloudflare.net` suffix.
* If the `CNAME` target is only appending the Cloudflare suffix to the same hostname at which it is created, replace it by the records on the Cloudflare partial zone.

Example

Original record in authoritative DNS provider:

| Type  | Name            | Content                            |
| ----- | --------------- | ---------------------------------- |
| CNAME | www.example.com | www.example.com.cdn.cloudflare.net |

Records in the Cloudflare partial zone:

| Type | Name            | Content |
| ---- | --------------- | ------- |
| A    | www.example.com | <IPv4>  |
| A    | www.example.com | <IPv4>  |

Final records adjusted in the zone file:

| Type | Name            | Content |
| ---- | --------------- | ------- |
| A    | www.example.com | <IPv4>  |
| A    | www.example.com | <IPv4>  |

* If the `CNAME` record points to a different hostname, keep this record but remove the `cdn.cloudflare.net` suffix, and also bring the records from the Cloudflare partial zone.

Example

Original record in authoritative DNS provider:

| Type  | Name            | Content                                       |
| ----- | --------------- | --------------------------------------------- |
| CNAME | www.example.com | other-hostname.example.com.cdn.cloudflare.net |

Records in the Cloudflare partial zone (CNAME setup):

| Type | Name                       | Content |
| ---- | -------------------------- | ------- |
| A    | other-hostname.example.com | <IPv4>  |
| A    | other-hostname.example.com | <IPv4>  |

Final records adjusted in the zone file:

| Type  | Name                       | Content                    |
| ----- | -------------------------- | -------------------------- |
| CNAME | www.example.com            | other-hostname.example.com |
| A     | other-hostname.example.com | <IPv4>                     |
| A     | other-hostname.example.com | <IPv4>                     |

## 2\. Configure the Cloudflare zone

1. Use the [Import DNS Records endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/import/) with a properly [formatted zone file](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/#format-your-zone-file) to import the records into your partial zone.  
The zone file size limit is 256 KiB (262144 bytes).  
 Existing and already proxied records will not be overwritten by the import.
2. Use the [Update DNS Settings endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) with `secondary_overrides` set to `true`, to enable Secondary DNS Override.

Warning

This step is essential so that Cloudflare can keep the proxy status of the records after the conversion.

1. Use the [Edit Zone endpoint](https://developers.cloudflare.com/api/resources/zones/methods/edit/) with `type` set to `secondary`, to convert the zone type.  
You can verify if it answers as expected by querying the new assigned secondary nameservers. You can find your nameservers on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page, and they should follow a format like `ns0123.secondary.cloudflare.com`.

Terminal window

```

# Replace ns0123 with your actual Cloudflare nameservers

dig example.com @ns0123.secondary.cloudflare.com


```

1. At your registrar, [update your nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) to point to the Cloudflare nameservers.

Once the time to live (TTL) of previous `NS` records is expired and this information is evicted from resolvers' cache, your zone will be properly delegated to Cloudflare. In order to update DNS records, you must configure [zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/) in the next steps.

## 3\. Configure the zone transfers

1. Remove all references to `cdn.cloudflare.net` from your primary DNS provider. You can do this by importing the same zone file you prepared in [Step 1](#1-prepare-a-zone-file) onto your primary zone.

Warning

If you keep any DNS records that still refer `cdn.cloudflare.net`, HTTP traffic for the respective hostnames will break.

1. Enable outgoing zone transfers at your primary provider and create a peer DNS server on your Cloudflare account.

* [ Dashboard ](#tab-panel-8131)
* [ API ](#tab-panel-8132)

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

1. Link your Cloudflare zone to the peer DNS server you just created.

* [ Dashboard ](#tab-panel-8129)
* [ API ](#tab-panel-8130)

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Under **DNS Zone Transfers**, select **Manage linked peers**.
3. Choose a value for **Zone refresh**, which controls the number of seconds between zone updates from your primary DNS server.  
Warning  
Cloudflare will not use the REFRESH value inside the SOA record that is served by your primary provider. Instead the value of zone refresh configured for your secondary zone on Cloudflare will be used to determine the interval after which the SOA serial of the primary zone will be checked for changes.
4. Select the peer server you previously created. If needed, you can link more than one peer server to a zone.
5. Select **Save** to confirm.

Use the [Update Secondary Zone Configuration endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/peers/methods/update/) to link your Cloudflare zone to the peer DNS server.

1. On the [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) page, confirm the linked peer is listed under **DNS Zone Transfers**, and select **Initiate zone transfer**. Alternatively, you can use the [Force AXFR endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/force%5Faxfr/methods/create/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-partial-to-secondary/#page","headline":"Convert partial setup to secondary setup · Cloudflare DNS docs","description":"If you initially set up a partial zone on Cloudflare, you can later convert it to use a secondary setup.","url":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-partial-to-secondary/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/conversions/","name":"DNS setup conversions"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/conversions/convert-partial-to-secondary/","name":"Convert partial setup to secondary setup"}}]}
```
