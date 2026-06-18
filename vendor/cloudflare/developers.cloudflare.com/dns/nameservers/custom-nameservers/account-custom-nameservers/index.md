---
title: Set up account custom nameservers
description: With account-level custom nameservers, you can use the same custom nameservers for different zones in the account. The domain or domains that provide the nameservers names do not have to exist as zones in Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up account custom nameservers

Account custom nameservers (ACNS) allow you to define account-level custom nameservers and use them for different zones within a Cloudflare account.

ACNS are organized in different sets (`ns_set`) and ACNS names can be provided by any domain, even if the domain does not exist as a zone in Cloudflare.

For instance, if the ACNS are `ns1.example.com` and `ns2.vanity.test`, the domains `example.com` and `vanity.test` are not required to be zones in Cloudflare.

## Availability

Account custom nameservers are available for customers on Business (after [contacting Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/)) or Enterprise plans. Once configured, account custom nameservers can be used by all zones in the account, regardless of the zone plan. Via API or on the dashboard.

Note

The advantages that come with Foundation DNS [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) are currently not available for [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/). Make sure you only use one at a time.

## Configuration conditions

For this configuration to be possible, a few conditions apply:

* You can create up to five different account custom nameserver sets. Each nameserver set must have between two and five different nameserver names (`ns_name`), and each name cannot belong to more than one set. For example, if `ns1.example.com` is part of `ns_set 1` it cannot be part of `ns_set 2` or vice versa.
* [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) or [reverse zones](https://developers.cloudflare.com/dns/additional-options/reverse-zones/) can use account custom nameservers as long as they use a different nameserver set (`ns_set`) than their parent, child, or any other zone in their direct hierarchy tree.

Note

Account owners that want to [use their own IP prefix](https://developers.cloudflare.com/byoip/) for the account custom nameservers should contact their account team.

* Choosing a set from `ns_set 1` through `ns_set 5` will influence how Cloudflare assigns nameservers to your new zones if you configure [DNS zone defaults](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#dns-zone-defaults).

## Enable account custom nameservers

### 1\. Set up ACNS names and sets

1. Create ACNS names and sets:

* [ Dashboard ](#tab-panel-8113)
* [ API ](#tab-panel-8114)

1. In the Cloudflare dashboard, go to the account **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **DNS Settings**.
3. For **Account custom nameservers**, select **Configure custom nameservers**.
4. Insert a fully qualified domain name for **Nameserver name** and choose a **Nameserver set**. Follow the [configuration conditions](#configuration-conditions).

Use the [Add account custom nameserver endpoint](https://developers.cloudflare.com/api/resources/custom%5Fnameservers/methods/create/) to create account custom nameservers. Follow the [conditions](#configuration-conditions) for `ns_name` and `ns_set`.

Note

If the parameter `ns_set` is omitted, the default set `1` will be assigned.

Cloudflare will assign an IPv4 and an IPv6 address to each ACNS name, and these nameservers will be listed as options that you can [use on existing zones](#2-use-acns-on-existing-zones) or [set up as default for new zones in the account](#3-optional-make-acns-default-for-new-zones).

1. Make sure `A/AAAA` records with the assigned IPv4 and IPv6 exist at the authoritative DNS of the domain that provides the ACNS names.  
   * If the domain uses Cloudflare DNS, the respective `A` and `AAAA` records are automatically created.  
   * If the domain or domains that are used for the account custom nameservers do not exist within the same account, you must manually create the `A/AAAA` records on the configured nameserver names (for example, `ns1.example.com`) at the authoritative DNS provider.

| Type | Name            | Content |
| ---- | --------------- | ------- |
| A    | ns1.example.com | <IPv4>  |

1. Update the registrar of the domain that provides the ACNS names. This step depends on whether you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/):  
   * If you are using Cloudflare Registrar for the domain that provides the ACNS names, [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to add the account custom nameservers and IP addresses as glue records to the domain.  
   * If you are not using Cloudflare Registrar for the domain that provides the ACNS names, add the account custom nameservers and IP addresses to your domain's registrar as glue records ([RFC 1912 ↗](https://www.rfc-editor.org/rfc/rfc1912.html)). If you do not add these records, DNS lookups for your domain will fail.

### 2\. Use ACNS on existing zones

1. Choose an ACNS set as custom nameservers for a zone:

* [ Dashboard ](#tab-panel-8107)
* [ API ](#tab-panel-8108)

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. For **Custom nameservers**, select **Configure**.
3. Select **Use your account custom nameservers** and choose a nameserver set from the list.
4. Select **Save** to confirm.

Use the endpoint [Update DNS Settings for a Zone](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) and configure the `nameservers` object accordingly for each zone.

1. Make sure the nameservers are updated:
* If your domain uses [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to update your nameservers.
* If your domain uses a different registrar, update the nameservers at your registrar to use the account custom nameservers.
* If your zone is delegated, update the corresponding `NS` record at the parent zone.

### 3\. (Optional) Make ACNS default for new zones

To make ACNS the default option for all new zones added to your account from now on:

* [ Dashboard ](#tab-panel-8111)
* [ API ](#tab-panel-8112)

1. In the Cloudflare dashboard, go to the account **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **DNS Settings**.
3. For **DNS zone defaults**, select **Configure defaults**.
4. Change the **Nameserver assignment method** to **Account custom nameservers**.

Refer to [DNS zone defaults](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#dns-zone-defaults) for details.

Use the endpoint [Update DNS Settings for an Account](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/methods/edit/). Within the `zone_defaults` object, set the following:

```

"zone_defaults": {

  "nameservers": {

    "type": "custom.account"

  }

}


```

## Disable account custom nameservers

### 1\. Remove ACNS assignment from zones

To remove ACNS from a zone, first update your nameservers to stop using ACNS:

* [ Dashboard ](#tab-panel-8105)
* [ API ](#tab-panel-8106)

* If you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to set your nameservers back to the regular Cloudflare branded nameservers.
* If you are not using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), modify the domain's registrar to use your regular Cloudflare branded nameservers.

* If you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), use the [Update DNS settings endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) to set the `type` parameter in the `nameservers` object to `"cloudflare.standard"`. Then, [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to set your nameservers back to the regular Cloudflare branded nameservers.
* If you are not using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), modify the domain's registrar to use your regular Cloudflare branded nameservers and then use the [Update DNS settings endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) to set the `type` parameter in the `nameservers` object to `"cloudflare.standard"`.

### 2\. Delete ACNS names or sets

Following the [configuration conditions](#configuration-conditions), each set must have between two and five different nameserver names. When you delete all names or leave a set with only one nameserver name, the set will no longer be listed as an option for the zones in your account.

* [ Dashboard ](#tab-panel-8109)
* [ API ](#tab-panel-8110)

1. In the Cloudflare dashboard, go to the account **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **DNS Settings**.
3. For **Account custom nameservers**, select **Delete** next to the ACNS name.

Use the [Delete account custom nameserver endpoint](https://developers.cloudflare.com/api/resources/custom%5Fnameservers/methods/delete/) to delete a specific ACNS.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/#page","headline":"Account custom nameservers · Cloudflare DNS docs","description":"With account-level custom nameservers, you can use the same custom nameservers for different zones in the account. The domain or domains that provide the nameservers names do not have to exist as zones in Cloudflare.","url":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/nameservers/","name":"Nameservers"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/nameservers/custom-nameservers/","name":"Custom nameservers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/nameservers/custom-nameservers/account-custom-nameservers/","name":"Set up account custom nameservers"}}]}
```
