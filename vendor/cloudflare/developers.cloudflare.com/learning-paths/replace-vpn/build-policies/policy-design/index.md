---
title: Policy design
description: Design Zero Trust access policies.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Policy design

Most policy building for private network access happens within the Gateway DNS and Gateway Network policy builders. For the most part, customers use a mixture of DNS resolution, SNI hostname values, and IP address groupings as the baseline for defining policies that pertain to specific applications.

## Considerations

Before building your policies, it is helpful to ask yourself a few questions:

* Should all users and services be able to reach all connected subnets? Are there explicit exceptions?
* Do all applications live within a primary network range, and are they defined by static or dynamic hosts and IP addresses?
* Are there DevOps workflows that rely on completely ephemeral IPs or subdomains?
* Do you have sources of truth for identity and device posture that will be used in policies?
* Do you plan to immediately implement a default-deny model? In other words, will you block all users except for those who match an explicit Allow policy?

## Prepare to build policies

We recommend the following approach when planning your Zero Trust Network Access policies.

### 1\. Determine your sources of truth

#### Identity

Determine which identity provider you will use as the source of truth for user email, user groups, and other [identity-based attributes](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/).

Note

Ensure that the [identity provider is connected to Cloudflare](https://developers.cloudflare.com/learning-paths/replace-vpn/get-started/configure-idp/) and available to users in your [device enrollment permissions](https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/device-enrollment-permissions/).

If you plan to grant access to services based on group membership, [view the user registry](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/) and verify that the target users have that group value in their User Registry.

#### Device posture

Most customers will also build policies that are contingent on the use of a corporate device. For example, all users on corporate devices can access `*.jira.internal.com`, but users on personal devices can only access `dev.internal.jira.com`. In order for this to be effective, we recommend defining a source of truth for your corporate devices. This is sometimes the presence of a specific [issued certificate](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/client-certificate/), the presence of a [process with a matched hash](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/application-check/), or an API integration with a supported [thirty-party endpoint security provider](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/) like Crowdstrike or SentinelOne.

Note

Be sure to [enable the device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) that you want to use in your policies.

### 2\. Define your networks

Almost all businesses have a series of interconnected networks, either physical or virtual. Prepare a list of all relevant networks, subnets, or segments within your network that users currently access, either locally or when using the VPN. For example,

| Network name | Location              | IP range   | Accessible by VPN? |
| ------------ | --------------------- | ---------- | ------------------ |
| Corporate DC | AWS US East - VA, USA | 10.0.0.0/8 | Yes                |

### 3\. Define your applications

Next, prepare a list of all relevant internal applications on your networks that will have distinct policy requirements (for example, different user identity or device posture requirements). Each application should be defined by an IP list, a hostname/domain list, or sometimes both.

| Application name | Local IPs   | Hostnames         | Accessible via IP? | Static or dynamic IP? |
| ---------------- | ----------- | ----------------- | ------------------ | --------------------- |
| Company Wiki     | 10.128.0.10 | wiki.internal.com | Yes                | Static                |

For example, you may have an application at `a.internal.com` which points to a load balancer with a static IP address, balancing a series of dynamic hosts serving the application on `a.internal.com`. Because the IPs of the application hosts are dynamic, the best practice would be to build two policies: a network policy for the load balancer IP, and a DNS policy for the application hostnames.

On the other hand, if the IPs behind the load balancer are static or only semi-dynamic, it may make sense to directly use the application IPs in your network policy. You can build a workflow to update the application IP list via a Cloudflare API call whenever host changes are made in your infrastructure provider.

### 4\. List existing policies

Gather any existing security policies or block lists that you wish to migrate from your VPN provider to Zero Trust.

Descaler program

If you are an Enterprise organization migrating from Zscaler, you can use our [Descaler toolkit ↗](https://blog.cloudflare.com/descaler-program/) to export policies from Zscaler Internet Access (ZIA) and import them into Cloudflare Gateway.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/policy-design/#page","headline":"Policy design · Cloudflare Learning Paths","description":"Design Zero Trust access policies.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/policy-design/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/build-policies/","name":"Build secure access policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/build-policies/policy-design/","name":"Policy design"}}]}
```
