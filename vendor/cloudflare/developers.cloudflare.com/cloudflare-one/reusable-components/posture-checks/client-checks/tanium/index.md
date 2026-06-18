---
title: Tanium (legacy)
description: Tanium (legacy) in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tanium (legacy)

Note

Not recommended for new deployments. We recommend using the [Tanium service-to-service integration](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/taniums2s/) to get device posture signals from Tanium.

Cloudflare Access can use endpoint data from [Tanium™ ↗](https://www.tanium.com/) to determine if a request should be allowed to reach a protected resource. When users attempt to connect to a resource protected by Access with a Tanium rule, Cloudflare Access will validate the user's identity, and the browser will connect to the Tanium agent before making a decision to grant access.

Gateway policy limitation

The legacy Tanium integration cannot be used in [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#device-posture). Only [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) are supported.

## Prerequisites

* Tanium Core Platform version 7.2 or later
* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Access integrations](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/access-integrations/).

## Integrate Tanium with Cloudflare Access

Note

The integration does not currently support Safari.

1. Configure your Tanium deployment using the [step-by-step documentation ↗](https://docs.tanium.com/endpoint%5Fidentity/endpoint%5Fidentity/userguide.html) provided. You will need the public key to integrate your Tanium deployment with Cloudflare Access.
2. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
3. Go to **Cloudflare One Client checks** and select **Add a check**.
4. Select **Tanium** from the list of providers.
5. Enter any **Name** for the integration.
6. For **Port**, enter `17472`.  
This is the default port used by the Tanium endpoints to communicate inbound and outbound with Cloudflare Access. You may need to modify it to reflect your organization's deployment.
7. Input the public certificate generated in Step 1.  
Adding the certificate allows Cloudflare to validate that the response from the Tanium agent is valid.

You can now build [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) that check [device posture signals](#tanium-endpoint-signals) from the Tanium endpoint.

## Example Access policy

This example will only grant access to users who are part of your team's email domain and running the Tanium agent.

| Action  | Rule type               | Selector         | Value     |
| ------- | ----------------------- | ---------------- | --------- |
| Allow   | Include                 | Emails Ending in | @team.com |
| Require | Device Posture - Tanium | Managed          |           |

The Tanium rule will require that the device connecting is managed in your Tanium deployment and has checked into the Tanium server in the last 7 days.

## Tanium endpoint signals

| Signal  | Value   | Description                                                                 |
| ------- | ------- | --------------------------------------------------------------------------- |
| Managed | Boolean | Validates that the device is managed in your organization's Tanium account. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/tanium/#page","headline":"Integrate Tanium with Access · Cloudflare One docs","description":"Tanium (legacy) in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/tanium/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/tanium/","name":"Tanium (legacy)"}}]}
```
