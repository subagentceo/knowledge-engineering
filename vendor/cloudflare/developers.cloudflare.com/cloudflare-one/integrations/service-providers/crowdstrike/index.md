---
title: CrowdStrike
description: CrowdStrike in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# CrowdStrike

Cloudflare One can integrate with Crowdstrike to require that users connect to certain applications from managed devices. This service-to-service posture check uses the Cloudflare One Client to read endpoint data from Crowdstrike. Devices are identified by their serial numbers. If multiple devices have the same serial number, Cloudflare cannot accurately match a device with a third-party provider device. You must ensure that each of your devices has a unique serial number.

## Prerequisites

Device posture with Crowdstrike requires:

* Falcon Enterprise plan or above
* Crowdstrike agent is deployed on the device.
* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Service providers](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/).

## Set up CrowdStrike as a service provider

### 1\. Obtain CrowdStrike settings

The following CrowdStrike values are needed to set up the CrowdStrike posture check:

* Client ID
* Client Secret
* Base URL
* Customer ID

To retrieve those values:

1. Log in to your Falcon Dashboard.
2. Go to **Support and resources** \> **API Clients and Keys**.
3. Select **Create API client** and enter any name for the client.
4. Turn on the following API permissions:  
| Scope                 | Permission |  
| --------------------- | ---------- |  
| Hosts                 | Read       |  
| Zero Trust Assessment | Read       |
5. Select **Create**.
6. Copy the **Client ID**, **Client Secret**, and **Base URL** to a safe place.
7. Go to **Host setup and management** \> **Sensor downloads** and copy your **Customer ID**.

### 2\. Add CrowdStrike as a service provider

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Service providers**.
2. Select **Add new**.
3. Select **Crowdstrike**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
1. Enter the **Client ID** and **Client secret** you noted down above.
2. In **Rest API URL**, enter your **Base URL**.
3. Enter your **Customer ID**.
4. Choose a **Polling frequency** for how often Cloudflare Zero Trust should query CrowdStrike for information.
5. Select **Test and save**.

### 3\. Configure the posture check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks** \> **Service provider checks**.
2. Select **Add a check**.
3. Select the Crowdstrike provider.
4. Enter any name for the posture check.
5. Configure the [attributes](#device-posture-attributes) required for the device to pass the posture check.
6. Select **Save**.
7. To test, go to **Insight** \> **Logs** \> **Posture logs** and verify that the service provider posture check is returning the expected results.

You can now use this posture check in a [device posture policy](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/#3-build-a-device-posture-policy).

## Device posture attributes

Device posture data is gathered from the [CrowdStrike Zero Trust Assessment APIs ↗](https://falcon.us-2.crowdstrike.com/documentation/156/zero-trust-assessment-apis). To learn more about how scores are calculated, refer to the [CrowdStrike Zero Trust Assessment ↗](https://falcon.us-2.crowdstrike.com/documentation/138/zero-trust-assessment) documentation.

| Selector      | Description                                                                                   | Value                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| OS            | OS signal score                                                                               | 1 to 100                                                                                        |
| Overall       | Overall ZTA score                                                                             | 1 to 100                                                                                        |
| Sensor config | Sensor signal score                                                                           | 1 to 100                                                                                        |
| Version       | ZTA score version                                                                             | 2.1.0                                                                                           |
| State         | Current online status of the device                                                           | _Online_, _Offline_, or _Unknown_                                                               |
| Last seen     | Elapsed time since the device was last seen. Only returned if its state is online or unknown. | In the last 1 hour, 3 hours, 6 hours, 12 hours, 24 hours, 7 days, 30 days, or more than 30 days |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/#page","headline":"CrowdStrike · Cloudflare One docs","description":"CrowdStrike in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["CrowdStrike"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/service-providers/","name":"Service providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/service-providers/crowdstrike/","name":"CrowdStrike"}}]}
```
