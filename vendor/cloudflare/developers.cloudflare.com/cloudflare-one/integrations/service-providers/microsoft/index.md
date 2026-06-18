---
title: Microsoft Endpoint Manager
description: Microsoft Endpoint Manager in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Microsoft Endpoint Manager

Cloudflare One can integrate with Microsoft to require that users connect to certain applications from managed devices. This service-to-service posture check uses the Cloudflare One Client to read endpoint data from Microsoft. Devices are identified by their serial numbers. If multiple devices have the same serial number, Cloudflare cannot accurately match a device with a third-party provider device. You must ensure that each of your devices has a unique serial number.

## Prerequisites

Device posture with Microsoft Endpoint Manager requires:

* An Intune license
* Microsoft Endpoint Manager is managing the device.
* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Service providers](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/).

## 1\. Obtain Microsoft Graph settings

The following values are required:

* Client secret
* Application (client) ID
* Direct (tenant) ID

To retrieve those values:

1. Log in to your Microsoft Dashboard.
2. Go to **App Registrations** and select **New Registrations**.
3. Copy the `Application (client) ID` value to a safe place. This will be your Client ID.
4. Copy the `Directory (tenant) ID` value to a safe place. This will be your Customer ID.
5. Go to **Certificates & Secrets** and select **New client secret**.
6. Fill in a description and how long the secret should be valid.
7. After completing the form, immediately copy the resulting secret. This will be your Client Secret.
8. Go to **API Permissions** and select **Add permission**.
9. Select **Microsoft Graph**.
10. Select **Application permissions**.
11. Add `DeviceManagementManagedDevices.Read.All`.
12. If the permission status shows **Not granted**, select **Grant admin consent**.

## 2\. Add Intune as a service provider

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Service providers**.
2. Select **Add new**.
3. Select **Microsoft Endpoint Manager**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
1. Enter the **Client ID**, **Client secret** and **Customer ID** as you noted down above.
2. Select a **Polling frequency** for how often Cloudflare One should query Microsoft Graph API for information.
3. Select **Test and save**.

## 3\. Configure the posture check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks** \> **Service provider checks**.
2. Select **Add a check**.
3. Select the Microsoft Endpoint Manager provider.
4. Enter any name for the posture check.
5. Configure the [attributes](#device-posture-attributes) required for the device to pass the posture check.
6. Select **Save**.
7. To test, go to **Insight** \> **Logs** \> **Posture logs** and verify that the service provider posture check is returning the expected results.

You can now use this posture check in a [device posture policy](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/#3-build-a-device-posture-policy).

## Device posture attributes

The Microsoft Endpoint Manager device posture check relies on information from the Microsoft Graph API. Refer to Microsoft's [ComplianceState ↗](https://docs.microsoft.com/en-us/graph/api/resources/intune-devices-compliancestate?view=graph-rest-1.0) and [List managedDevices ↗](https://docs.microsoft.com/en-us/graph/api/intune-devices-manageddevice-list?view=graph-rest-1.0) documentation for a list of properties returned by the API.

To learn more about how to control ComplianceState, refer to Microsoft's [compliance policies guide ↗](https://docs.microsoft.com/en-us/mem/intune/protect/device-compliance-get-started).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/microsoft/#page","headline":"Microsoft Endpoint Manager · Cloudflare One docs","description":"Microsoft Endpoint Manager in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/microsoft/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/service-providers/","name":"Service providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/service-providers/microsoft/","name":"Microsoft Endpoint Manager"}}]}
```
