---
title: Tenant API
description: Tenant API in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tenant API

Note

Only available for [Cloudflare Partners ↗](https://www.cloudflare.com/partners/) on Enterprise plans. To gain access, contact your account team.

Gateway supports the [Cloudflare Tenant API](https://developers.cloudflare.com/tenant/), which allows Cloudflare-partnered managed service providers (MSPs) to set up and manage Cloudflare accounts and services for their customers. With the Tenant API, MSPs can create Zero Trust deployments with global Gateway policy control. Policies can be customized or overridden at a group or individual account level.

Warning

The Tenant API platform only supports [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/). To apply HTTP, network, and resolver policies, use [Cloudflare Organizations](https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/organizations/) instead.

For more information, refer to the [Cloudflare Zero Trust for managed service providers ↗](https://blog.cloudflare.com/gateway-managed-service-provider/) blog post.

## Get started

To set up the Tenant API, refer to [Get started](https://developers.cloudflare.com/tenant/get-started/). Once you have provisioned and configured your customer's Cloudflare accounts, you can create [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/).

## Account types

The Gateway Tenant platform supports tiered and siloed account configurations.

### Tiered accounts

In a tiered account configuration, a top-level parent account enforces global security policies that apply to all of its child accounts. Child accounts can override or add policies as needed while still being managed by the parent account. MSPs can also configure child accounts independently from the parent account for the following Gateway features:

* **[Custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/)**: Child accounts will use the block page setting used by the parent account unless you configure separate block settings for the child account. This applies to both redirects and custom block pages. The block page uses the account certificate for each child account.
* **[Root certificates](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/)**: If Gateway cannot attribute an incoming DNS query to a child account, it will use the parent account's certificate. This happens when the source IP address of the DNS query does not match a child account or if a custom DNS resolver endpoint is not configured.
* **[DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/)**
* **[Lists](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/)**

Each child account is subject to the default Zero Trust [account limits](https://developers.cloudflare.com/cloudflare-one/account-limits/).

Gateway evaluates parent account policies before any child account policies. To allow a child account to override a specific parent account policy, you can use the [Update a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/update/) endpoint to set the policy's `allow_child_bypass` rule setting to `true`.

flowchart TD
%% Accessibility
 accTitle: How Gateway policies work in a tiered account configuration
 accDescr: Flowchart describing the order of precedence Gateway applies policies in a tiered account configuration.

%% Flowchart
 subgraph s1["Parent account"]
        n1["Block malware"]
        n2["Block DNS tunnel"]
        n3["Block spyware"]
  end
 subgraph s2["Child account A"]
        n4["Block social media"]
  end
 subgraph s3["Child account B"]
        n5["Block instant messaging"]
  end
    n1 ~~~ n2
    n2 ~~~ n3
    A["Tenant"] --Administers--> s1
    s1 -- "Applies policies to" --> s2 & s3

    n1@{ shape: lean-l}
    n2@{ shape: lean-l}
    n3@{ shape: lean-l}
    n4@{ shape: lean-l}
    n5@{ shape: lean-l}

### Siloed accounts

In a siloed account configuration, each account operates independently within the same tenant. MSPs manage each account's own security policies, resources, and configurations separately.

flowchart TD
%% Accessibility
 accTitle: How Gateway policies work in a siloed account configuration
 accDescr: Flowchart describing the order of precedence Gateway applies policies in a siloed account configuration.

%% Flowchart
 subgraph s1["Siloed account A"]
        n1["Block social media"]
  end
 subgraph s2["Siloed account C"]
        n2["Block instant messaging"]
  end
 subgraph s3["Siloed account B"]
        n3["Block news"]
  end
    A["Tenant"] -- Administers --> s1 & s3 & s2

    n1@{ shape: lean-l}
    n2@{ shape: lean-l}
    n3@{ shape: lean-l}

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/tenant-api/#page","headline":"Tenant API · Cloudflare One docs","description":"Tenant API in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/tiered-policies/tenant-api/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS","REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/tiered-policies/","name":"Tiered policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/tiered-policies/tenant-api/","name":"Tenant API"}}]}
```
