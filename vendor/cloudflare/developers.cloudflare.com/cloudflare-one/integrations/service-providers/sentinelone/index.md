---
title: SentinelOne
description: SentinelOne in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SentinelOne

Cloudflare One can integrate with SentinelOne to require that users connect to certain applications from managed devices. This service-to-service posture check uses the Cloudflare One Client to read endpoint data from SentinelOne. Devices are identified by their serial numbers. If multiple devices have the same serial number, Cloudflare cannot accurately match a device with a third-party provider device. You must ensure that each of your devices has a unique serial number.

## Prerequisites

* SentinelOne agent is deployed on the device.
* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Service providers](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/).

## Set up SentinelOne as a service provider

### 1\. Obtain SentinelOne settings

The following SentinelOne values are needed to set up the SentinelOne posture check:

* API Token
* REST API URL

To retrieve those values:

1. Log in to your SentinelOne Dashboard.
2. Go to **Settings** \> **Users** \> **Create new Service User**.
3. Select **Create New Service User**.
4. Enter a **Name** and **Expiration Date** and select **Next**.
5. Set **Scope of Access** to _Viewer_.
6. Select **Create User**. SentinelOne will generate an API Token for this user.
7. Copy the **API Token** to a safe location.
8. Select **Close**.
9. Copy the **Rest API URL** from your browser's address bar (for example, `https://<S1-DOMAIN>.sentinelone.net`).

### 2\. Add SentinelOne as a service provider

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Service providers**.
2. Select **Add new**.
3. Select **SentinelOne**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
1. In **Client Secret**, enter your **API Token**.
2. In **Rest API URL**, enter `https://<S1-DOMAIN>.sentinelone.net`.
3. Choose a **Polling frequency** for how often Cloudflare One should query SentinelOne for information.
4. Select **Test and save**.

### 3\. Configure the posture check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks** \> **Service provider checks**.
2. Select **Add a check**.
3. Select the SentinelOne provider.
4. Enter any name for the posture check.
5. Configure the [attributes](#device-posture-attributes) required for the device to pass the posture check.
6. Select **Save**.
7. To test, go to **Insight** \> **Logs** \> **Posture logs** and verify that the service provider posture check is returning the expected results.

You can now use this posture check in a [device posture policy](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/#3-build-a-device-posture-policy).

## Device posture attributes

Device posture data is gathered from the SentinelOne Management APIs. For more information, refer to `https://<S1-DOMAIN>.sentinelone.net/api-doc/overview`.

| Selector          | Description                                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Infected          | Whether the device is infected                                                                                                             |
| Active Threats    | Number of active threats on the device                                                                                                     |
| Is Active         | Whether the SentinelOne Agent is active                                                                                                    |
| Network status    | Whether the SentinelOne Agent is connected to the SentinelOne service                                                                      |
| Operational State | The [operational state ↗](https://community.sentinelone.com/s/login/?ec=302&startURL=%2Fs%2Farticle%2F000005285) of the SentinelOne Agent. |

### Detect user risk behavior

SentinelOne provides endpoint detection and response (EDR) signals to determine [user risk score](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/). User risk scores allow you to detect users that present security risks to your organization. For more information, refer to [Predefined risk behaviors](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/risk-score/#predefined-risk-behaviors).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/sentinelone/#page","headline":"SentinelOne - Posture checks · Cloudflare One docs","description":"SentinelOne in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/sentinelone/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SentinelOne"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/service-providers/","name":"Service providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/service-providers/sentinelone/","name":"SentinelOne"}}]}
```
