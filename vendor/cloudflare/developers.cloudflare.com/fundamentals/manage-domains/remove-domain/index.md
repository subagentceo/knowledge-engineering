---
title: Remove a domain
description: Remove a domain from your Cloudflare account, including required steps for DNS, subscriptions, and registrar settings.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Remove a domain

Consider the following sections on how you can remove domains from Cloudflare. Removing your domain cancels all active subscriptions on that domain, which will not be refunded per our [billing policy](https://developers.cloudflare.com/billing/understand/billing-policy/). If you add this domain back to Cloudflare later, you will need to re-purchase all subscriptions. Removing your domain from Cloudflare does not change your domain registration.

## Before removing your domain

If you experience website issues, we recommend [temporarily pausing Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/pause-cloudflare/) to evaluate your website's performance.

If you have an Enterprise plan, you need to [change the zone plan](https://developers.cloudflare.com/billing/manage/change-plan/#change-plan-type) to **Free**.

If you need to re-add the domain in a different account, make sure the current settings have been saved. For example, you may [Import and export DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/).

Note

If you have just added a domain and have not configured its plan yet, the domain is in the `Initializing (Finish setup)` status and cannot be deleted. At this step you'll need to select a plan for this domain: the status will then change to `Pending` and you can then delete the domain. Please also note that domains in the `Initializing (Finish setup)` or `Pending` statuses will [automatically be deleted after 28 days](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/#initializing-finish-setup) if they do not activate.

### Actions outside of Cloudflare

* When you remove a domain from Cloudflare, it also prevents your domain from using Cloudflare for DNS resolution. To avoid DNS errors, update your nameservers at your domain registrar to use nameservers not owned by Cloudflare.  
   * Refer to [Check if your nameservers are pointing to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#35-verify-changes) to confirm that your nameservers no longer point to Cloudflare.
* At your registrar, make sure you do not have a **DS** DNS record. This record enables [DNSSEC](https://developers.cloudflare.com/dns/dnssec/) and could prevent your DNS records from being changed.

### Actions within Cloudflare

* [Cancel active add-on subscriptions](https://developers.cloudflare.com/billing/manage/cancel-subscription/).
* [Delete all the Logpush jobs for that domain](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/#optional---delete-a-job)
* If you use Cloudflare Registrar:  
   * [Disable domain auto-renewal](https://developers.cloudflare.com/registrar/account-options/renew-domains/) or [transfer your domain out of Cloudflare](https://developers.cloudflare.com/registrar/account-options/transfer-out-from-cloudflare/).  
   * If the domain has already expired, it will be automatically removed from your account. Refer to [What happens when a domain expires?](https://developers.cloudflare.com/registrar/faq/#what-happens-when-a-domain-expires)  
   * If the domain has not yet expired you can likely request deletion. Refer to [Delete a domain registration](https://developers.cloudflare.com/registrar/account-options/domain-management/#delete-a-domain-registration)  
   * If enabled, disable DNSSEC. In your domain dashboard, go to **DNS** \> **Settings**. Within **DNSSEC**, select **Disable DNSSEC**. Select **Confirm**.

## Remove a domain activated in Cloudflare

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your domain.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/)
2. On the domain **Overview** page, find **Advanced Actions** and then select **Remove from Cloudflare**.  
Note  
If you are using an Enterprise domain, [change your domain plan](https://developers.cloudflare.com/billing/manage/change-plan/#change-plan-type) to **Free**, which will give you access to **Remove from Cloudflare**.  
    
If this does not work, contact your Customer Success Manager.
3. Select **Confirm**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/#page","headline":"Remove a domain from Cloudflare · Cloudflare Fundamentals docs","description":"Remove a domain from your Cloudflare account, including required steps for DNS, subscriptions, and registrar settings.","url":"https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-domains/","name":"Domains"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-domains/remove-domain/","name":"Remove a domain"}}]}
```
