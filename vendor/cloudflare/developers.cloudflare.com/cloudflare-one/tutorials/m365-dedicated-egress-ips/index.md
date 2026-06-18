---
title: Protect access to Microsoft 365 with dedicated egress IPs
description: This tutorial covers how to secure access to your Microsoft 365 applications with Cloudflare Gateway dedicated egress IPs.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protect access to Microsoft 365 with dedicated egress IPs

**Last reviewed:**  over 2 years ago 

Note

Only available on Zero Trust Enterprise plans.

This tutorial covers how to secure access to your Microsoft 365 applications with Cloudflare Gateway dedicated egress IPs.

You can map a named location in Microsoft Entra ID to a location associated with your dedicated egress IPs. Traffic will egress from Cloudflare with these IP addresses. If users attempt to access your Microsoft applications without these IPs, Entra ID will block access.

## Before you begin

Make sure you have:

* In Cloudflare, a Zero Trust Enterprise plan with [dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/)
* In Microsoft 365, an organization managed with [Microsoft Entra ID ↗](https://learn.microsoft.com/en-us/entra/identity/)

## Create an egress policy in Cloudflare Gateway

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Traffic policies** \> **Egress policies**.
2. Select **Add a policy**.
3. Name your policy, then add conditions to check users are configured in Microsoft Entra ID. For example, you can check for [identity conditions](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/):  
| Selector         | Operator | Value                                   |  
| ---------------- | -------- | --------------------------------------- |  
| User Group Names | in       | Sales and Marketing, Retail, U.S. Sales |  
Additionally, you can check for [device posture conditions](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/):  
| Selector                    | Operator | Value                                           | Logic |  
| --------------------------- | -------- | ----------------------------------------------- | ----- |  
| Passed Device Posture Check | is       | CrowdStrike Overall ZTA score (Crowdstrike s2s) | And   |  
| Passed Device Posture Check | is       | AppCheckMac - Required Software (Application)   |       |
4. Enable **Use dedicated Cloudflare egress IPs**. Select your desired IPv4 and IPv6 addresses. For example:  
| Primary IPv4 address | IPv6 address  |  
| -------------------- | ------------- |  
| 203.0.113.0          | 2001:db8::/32 |

## Create a named IP range location in Microsoft Entra ID

1. Log in to the [Microsoft Azure portal ↗](https://aka.ms/azureportal).
2. In the sidebar, select **Microsoft Entra ID**.
3. Go to **Security** \> **Named locations**.
4. Select **IP ranges location**.
5. Name your location, then add the IP addresses used in your Cloudflare dedicated egress IP policy.
6. Select **Upload**.

This named location corresponds with the locations of your dedicated egress IPs.

## Create a conditional access policy in Microsoft Entra ID

1. In **Protect**, go to **Conditional Access**.
2. Select **Create new policy**.
3. Configure which Entra ID users you want to limit access for, and which traffic, applications, or actions you want to protect.
4. In **Conditions**, select **Locations**. Enable **Configure**.
5. In **Include**, select _Any location_. In **Exclude**, select the named location you created.
6. In **Access controls**, go to **Grant**. Enable _Block access_.

Your policy will block access for your selected users from any location except those using your dedicated egress IPs.

## Test your policies

1. Using [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/), sign in to your Zero Trust organization with a user's account.
2. Go to any Microsoft 365 app within your organization. Entra ID should allow access.
3. Disconnect the Cloudflare One Client from your Zero Trust organization. Entra ID should block access to any Microsoft 365 applications.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/m365-dedicated-egress-ips/#page","headline":"Protect access to Microsoft 365 with dedicated egress IPs · Cloudflare One docs","description":"This tutorial covers how to secure access to your Microsoft 365 applications with Cloudflare Gateway dedicated egress IPs.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/m365-dedicated-egress-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft","IPv4","IPv6"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/m365-dedicated-egress-ips/","name":"Protect access to Microsoft 365 with dedicated egress IPs"}}]}
```
