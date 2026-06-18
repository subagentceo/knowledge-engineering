---
title: Zone status
description: Zone status values and what they mean.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Zone status

Review information on the different statuses that your [zone](https://developers.cloudflare.com/dns/concepts/#zone) can have after you [add your website or application](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to Cloudflare.

Zone status is also referred to as domain status. An **active** domain status is a requirement for your [application services configurations](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) to be applied. Refer to [How Cloudflare works](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) for details.

If your zone status changes, you will receive an email at the address associated with your account.

The following diagram gives you an overview of the different statuses applicable and how your zone may transition from one status to the other. For zones with an active paid subscription, the time to automatic deletion or purge may not correspond to this diagram. Refer to the sections below for details.

flowchart LR
accTitle: Zone status flow
accDescr: Diagram of the different statuses applicable to Cloudflare zones and the transitions from one status to the other.

A[Initializing]
B[Pending]
C[Active]
D[Moved]
E[Deleted]
F[Purged]

 A-- Plan <br />selection --> B
 B-- Zone <br />authentication --> C
 C-- DNS <br />checks fail --> D
 D-- Moved <br />for 7 days --> E
 E-- Deleted <br />for 7 days --> F

 B-- Pending for <br />28 days --> E
 A-- Initializing for 28 days --> E

Note

If you use the API to add your website or application to Cloudflare, your zone will be created directly in a **Pending** status. **Initializing** only applies to domains added via the dashboard.

## Initializing (Finish setup)

You have initiated the setup via dashboard, but did not select a plan for your zone. Your zone status is presented as **Finish setup** on the Cloudflare dashboard.

In this state, Cloudflare does not respond to any DNS queries for your domain.

If your zone is in **Finish setup** for over 28 days, it will be automatically [deleted](#deleted).

Note

If you have mistakenly added a zone to your account via dashboard, you can safely [remove it](https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/) after selecting the Free plan.

## Pending

Your zone status is presented as **Pending Nameserver Update** on the Cloudflare dashboard.

Cloudflare responds to DNS queries for pending zones on the assigned Cloudflare nameserver IPs, but your zone is still not active and cannot be used to [proxy traffic to Cloudflare](https://developers.cloudflare.com/dns/proxy-status/limitations/#pending-domains).

### Causes

* [Primary setup (Full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/): You have either not [changed your authoritative nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) or your change has not yet been authenticated by Cloudflare.
* [CNAME setup (Partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/): You have either not added the verification TXT record to your authoritative DNS provider or the record has not yet been authenticated by Cloudflare.
* [Cloudflare as Secondary DNS provider](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/): When you have either not [changed your authoritative nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) to include the Cloudflare Secondary nameservers or your change has not yet been authenticated by Cloudflare.

After you add your domain, Cloudflare performs checks on a schedule to confirm you have updated your nameservers. The first check occurs after 60 seconds and the following attempts happen at gradually increased intervals. You can re-trigger the check [via API](https://developers.cloudflare.com/api/resources/zones/subresources/activation%5Fcheck/methods/trigger/) or on the Dashboard, in the respective domain [Overview page ↗](https://dash.cloudflare.com/?to=/:account/:zone/).

The activation check behavior depends on your zone setup:

| Zone setup                                                                                                                                                                                                                                                                                                                         | Activation requirement                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/) without [multi-provider DNS](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#multi-provider-dns)                                                                                                                       | At the registrar (or parent zone), only the assigned Cloudflare nameservers must be listed. Any nameservers from other DNS providers cause failure. |
| [Primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/) with [multi-provider DNS](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#multi-provider-dns) enabled, or [secondary setup](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | At the registrar (or parent zone), the assigned Cloudflare nameservers must be present. Nameservers from other DNS providers are allowed.           |
| [CNAME setup (partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                                                                                                                                                                                                                                          | The verification TXT record must be present on your authoritative DNS provider. Nameservers at the registrar are not changed.                       |

### Expected behavior for different plans

If your domain is on the Free plan, it will be automatically deleted if it is not activated within 28 days.

Any pending zone with a paid plan (Pro, Business, Enterprise) will remain pending until the plan is removed, or the domain is activated or [removed from Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/).

Do not use pending zones in production

Make sure not to use pending zones for production traffic. Cloudflare responds to DNS queries for pending zones on the assigned Cloudflare nameserver IPs but there are associated risks, especially if you do not use [zone holds](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/).

For Enterprise zones, if you want to adjust settings before zone activation, Logpush for [DNS logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/dns%5Flogs/) and [DNS Zone Transfer](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/) configuration work as expected in pending state.

## Active

Cloudflare has authenticated your [nameserver changes](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) or [verification TXT record](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/#2-verify-ownership-for-your-domain) and you can proxy domain traffic through Cloudflare. For more details refer to [How Cloudflare works](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) and [Domain configurations](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).

## Moved

Your domain has failed multiple DNS checks, where either the Cloudflare nameservers are no longer present on your domain's `NS` records ([Primary setup (Full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/)) or no `SOA` record is returned for the zone ([CNAME setup (Partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)).

### Expected behavior for different plans

If your domain is on the Free plan, it will be automatically deleted 7 days after it entered the moved status.

For moved zones with a paid plan (Pro, Business, Enterprise), deletion will occur after 7 days if any of the following is observed:

* The paid plan is removed.
* The domain is activated in another Cloudflare account.

You can also [manually remove](https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/) your domain from Cloudflare.

## Deleted

Your zone has been archived. Cloudflare still responds to DNS queries for deleted zones on the assigned Cloudflare nameserver IPs (for non-deleted DNS records) and you can re-add the domain to Cloudflare by following the [regular onboarding flow](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).

New nameserver assignment

When you re-add a previously deleted domain, Cloudflare assigns a new nameserver pair as a security measure. If you are not using Cloudflare Registrar, make sure to [update your registrar](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) with the new nameservers after re-adding the domain. Refer to [nameserver assignment](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#assignment-method) for details.

After being deleted for seven days, zones are automatically [purged](#purged).

## Purged

After a zone is deleted for seven days, it will be purged. Cloudflare does not respond to DNS queries for purged zones and, unlike [deleted zones](#deleted), this status cannot be reverted. In this case, even if you re-add the domain to the same Cloudflare account, none of the zone settings are expected to be restored.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/#page","headline":"Zone status · Cloudflare DNS docs","description":"Zone status values and what they mean.","url":"https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/reference/domain-status/","name":"Zone status"}}]}
```
