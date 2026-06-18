---
title: Set up tenant custom nameservers
description: With tenant-level custom nameservers, you can use the same custom nameservers for different zones and across different accounts, as long as the accounts are part of the [tenant](/tenant/). The domain or domains that provide the nameservers names do not have to exist as zones in Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up tenant custom nameservers

Tenant custom nameservers (TCNS) allow you to define tenant-level custom nameservers and use them for different accounts within a Cloudflare tenant.

TCNS are organized in different sets (`ns_set`) and TCNS names can be provided by any domain, even if the domain does not exist as a zone in Cloudflare.

For instance, if the TCNS are `ns1.example.com` and `ns2.vanity.test`, the domains `example.com` and `vanity.test` are not required to be zones in Cloudflare.

## Availability

Tenant custom nameservers, if created by the tenant owner, will be available to all zones belonging to any account that is part of the tenant. Via API only.

## Configuration conditions

For this configuration to be possible, a few conditions apply:

* Tenant owners can create up to five different tenant custom nameserver sets. Each nameserver set must have between two and five different nameserver names (`ns_name`), and each name cannot belong to more than one set. For example, if `ns1.example.com` is part of `ns_set 1` it cannot be part of `ns_set 2` or vice versa.
* [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) or [reverse zones](https://developers.cloudflare.com/dns/additional-options/reverse-zones/) can use tenant custom nameservers as long as they use a different nameserver set (`ns_set`) than their parent, child, or any other zone in their direct hierarchy tree.

Note

Tenant owners that want to [use their own IP prefix](https://developers.cloudflare.com/byoip/) for the tenant custom nameservers should contact their account team.

## For account owners

### Enable tenant custom nameservers on a zone

If you are an account owner and your account is part of a tenant that has custom nameservers, do the following:

1. Use the endpoint [Update DNS Settings for a Zone](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) and configure the `nameservers` object accordingly.  
```  
  "nameservers": {  
    "type": "custom.tenant"  
  }  
```  
Note  
If the parameter `ns_set` is omitted, the default set `1` will be assigned.
2. If you are **not** using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), update the nameservers at your registrar to use the TCNS names. If you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), no further action is needed.

To make these TCNS the default namerservers for all new zones added to your account from now on, use the endpoint [Update DNS Settings for an Account](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/methods/edit/). Within the `zone_defaults` object, set the following:

```

"zone_defaults": {

  "nameservers": {

    "type": "custom.tenant"

  }

}


```

### Disable tenant custom nameservers on a zone

* If you are using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), use the [Update DNS settings endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) to set the `type` parameter in the `nameservers` object to a different value. Then, [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to set your nameservers back to the nameservers you chose to use.
* If you are not using Cloudflare Registrar, use the [Update DNS settings endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) to choose a different nameserver type, and also remove the TCNS at your domain's registrar.

## For tenant owners

### Create tenant custom nameservers

If you are a tenant owner and you want to make TCNS available for accounts within your tenant, do the following:

1. Observe the [conditions](#configuration-conditions) for `ns_name` and `ns_set`, and create TCNS in your tenant by using the following POST command:

Terminal window

```

curl https://api.cloudflare.com/client/v4/tenants/{tenant_id}/custom_ns \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "ns_name": "<NS_NAME>",

  "ns_set": <SET>

}'


```

Note

If the parameter `ns_set` is omitted, the default set `1` will be assigned.

1. Add the account custom nameservers and IP addresses to your domain's registrar as glue (A and AAAA) records ([RFC 1912 ↗](https://www.rfc-editor.org/rfc/rfc1912.html)).
2. If the domain or domains that are used for the tenant custom nameservers do not exist within the same account, you must create the `A/AAAA` records on the configured nameserver names (for example, `ns1.example.com`) at the authoritative DNS provider.

| Type | Name            | Content |
| ---- | --------------- | ------- |
| A    | ns1.example.com | <IPv4>  |

### Get a list of all TCNS names

To get a list of all TCNS names in your tenant account, use the following API request:

Terminal window

```

curl https://api.cloudflare.com/client/v4/tenants/{tenant_id}/custom_ns \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/tenant-custom-nameservers/#page","headline":"Tenant custom nameservers · Cloudflare DNS docs","description":"With tenant-level custom nameservers, you can use the same custom nameservers for different zones and across different accounts, as long as the accounts are part of the tenant. The domain or domains that provide the nameservers names do not have to exist as zones in Cloudflare.","url":"https://developers.cloudflare.com/dns/nameservers/custom-nameservers/tenant-custom-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/nameservers/","name":"Nameservers"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/nameservers/custom-nameservers/","name":"Custom nameservers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/nameservers/custom-nameservers/tenant-custom-nameservers/","name":"Set up tenant custom nameservers"}}]}
```
