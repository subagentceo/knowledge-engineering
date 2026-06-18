---
title: Accounts, zones, and profiles
description: Understand how Cloudflare organizes resources into user profiles, accounts, and zones, and where settings and products apply.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Accounts, zones, and profiles

Within the Cloudflare ecosystem, there are three organizing concepts that control where specific settings live: user profiles, accounts, and zones.

flowchart LR
accTitle: Accounts contain zones and user profiles contain user settings
subgraph Account
    subgraph Zone - example.com
        A[WAF]
        B[DNS]
    end
    subgraph Zone - example2.com
        C[Cache rules]
        D[Waiting Room]
    end
    Workers
    K[Account members]
end
subgraph User profile
    G[Email address]
    H[Language]
    I[Communication preferences]
end

---

## User profiles

Each user has a profile that contains several settings, such as [Communication preferences](https://developers.cloudflare.com/fundamentals/user-profiles/customize-account/#notifications) and [Language preferences](https://developers.cloudflare.com/fundamentals/user-profiles/customize-account/#language).

To access your profile, select the user icon and then **My Profile** from any page within the [Cloudflare dashboard ↗](https://dash.cloudflare.com).

## Accounts

An account refers to an organization account, which contains one or more users and zones. Users can belong to multiple accounts, and each account maintains its own settings, including [billing profiles](https://developers.cloudflare.com/billing/get-started/create-billing-profile/), [account members](https://developers.cloudflare.com/fundamentals/manage-members/), [lists](https://developers.cloudflare.com/waf/tools/lists/), and other configurations.

Several account-level products - such as [Workers](https://developers.cloudflare.com/workers/), [Pages](https://developers.cloudflare.com/pages/), [Security Center](https://developers.cloudflare.com/security-center/), and [Bulk redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/) \- can affect some or all zones contained within that account.

After you [log in ↗](https://dash.cloudflare.com) and select an account - but before you select a zone - the sidebar will list account-level products.

When you log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com), you can access all accounts where your user is a member. To access account settings and account-level products from within a zone, use the **Accounts** option from the navigation sidebar.

## Zones

Domains (or [subdomains](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/)) that are added to Cloudflare become zones[1](#user-content-fn-1), which have a direct impact on the security and performance of your website, application, or API. Use your zone to monitor security and performance, update configurations, and apply zone-level products and services.

Zone-level services - such as [Load Balancers](https://developers.cloudflare.com/load-balancing/) and [Cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) \- only affect your website, application, or API for that zone and not other zones, even if they are contained within the same account.

When you log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and choose an account, you can view a list of all zones within that account.

Once you are within a zone, items within the sidebar will be zone-related products. If you need to change to another zone, use the forward arrow next to the zone name or by go back to the homepage of your account.

## Footnotes

1. Similar to [DNS zones ↗](https://www.cloudflare.com/learning/dns/glossary/dns-zone/), but with additional capabilities. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#page","headline":"Accounts, zones, and profiles · Cloudflare Fundamentals docs","description":"Understand how Cloudflare organizes resources into user profiles, accounts, and zones, and where settings and products apply.","url":"https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/concepts/accounts-and-zones/","name":"Accounts, zones, and profiles"}}]}
```
