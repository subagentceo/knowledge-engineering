---
title: Device UUID
description: Device UUID in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Device UUID

Cloudflare One allows you to build Zero Trust rules based on device UUIDs supplied in an MDM file. You can create these rules so that access to applications is granted only to users connecting from company devices.

## Prerequisites

* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## 1\. Assign UUIDs to devices

You will need to use a [managed deployment tool](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/) to assign UUIDs. It is not possible to assign them manually.

1. Generate a unique identifier for each corporate device. For best practices on choosing UUIDs, refer to the [Android documentation ↗](https://developer.android.com/training/articles/user-data-ids#best-practices-android-identifiers).
2. Enter the UUIDs into your MDM configuration file using the [unique\_client\_id key](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#unique%5Fclient%5Fid).

## 2\. Create a list of UUIDs

To create rules based on device UUIDs, you first need to create a [Gateway List](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of UUIDs.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Lists**.
2. Select **Create manual list** or **Upload CSV**. For larger teams, we recommend uploading a CSV or using Cloudflare's [API endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/list/).
3. Give your list a descriptive name, as this name will appear when configuring your policies.
4. Set **List Type** to _Device IDs_.
5. Enter the UUIDs of the devices your team manages, or upload your CSV file.
6. Select **Save**.

Note

Hyphens are automatically stripped from UUIDs. For example, the posture check will match `123e4567-e89b-12d3-a456-426614174000` to `123e4567e89b12d3a456426614174000`.

## 3\. Enable the posture check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **Unique Client ID**.
4. You will be prompted for the following information:  
   * **Name**: Enter a unique name for this device posture check.  
   * **Operating system**: Select the operating system of the device.  
   * **List**: Select your [list of UUIDs](#2-create-a-list-of-uuids).
5. Select **Save**.
6. [Verify](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/#2-verify-device-posture-checks) that the posture check is returning the expected results.

You can now create an Access or Gateway device posture policy that checks if the device presents a UUID on your list.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/device-uuid/#page","headline":"Device UUID · Cloudflare One docs","description":"Device UUID in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/device-uuid/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/device-uuid/","name":"Device UUID"}}]}
```
