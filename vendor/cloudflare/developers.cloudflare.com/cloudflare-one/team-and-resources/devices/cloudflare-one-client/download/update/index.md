---
title: Update the Cloudflare One Client
description: How Update the Cloudflare One Client works in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Update the Cloudflare One Client

This guide covers best practices for updating the Cloudflare One Client (formerly WARP).

## When to update the Cloudflare One Client

There are two update strategies:

* **Always deploy the latest stable release** (recommended) — You get the newest bug fixes, performance improvements, and features.
* **Deploy only LTS releases** — If your organization has limited update cycles due to change management, QA testing, or other constraints, you can skip intermediate stable releases and deploy only the latest [LTS (Long-Term Support) release](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/lts-releases/). This strategy reduces deployment churn while still addressing security bug fixes in a timely manner.

If you run into issues that require troubleshooting or support tickets, one of the first requested actions by our support team will be to update your clients to the latest version.

For more details on Cloudflare One Client support timelines and end-of-life (EOL) policies, refer to the [Support lifecycle](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/support-lifecycle/) page.

Tip

To get notified of new releases, subscribe to the [Cloudflare One Client changelog](https://developers.cloudflare.com/changelog/cloudflare-one-client/).

## How to update the Cloudflare One Client

### Windows, macOS, and Linux

#### Managed devices

JAMF, Intune, and other MDM tools perform software updates by installing a new binary file. If you deployed the Cloudflare One Client using a [device management tool](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/), the update procedure will look exactly the same as your initial installation. To update the Cloudflare One Client, push the [latest binary file](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) with the same deployment parameters. End users will not be signed out of their client, and they will not have to manually engage with the update.

#### Unmanaged devices

If your users have local administration rights on their device, you can allow them to update the Cloudflare One Client on their own via the client GUI. [**Allow updates**](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-updates) is usually disabled on managed devices, as it can introduce version consistency control issues if client versions are centrally managed by IT.

### iOS, Android, and ChromeOS

The iOS App Store and Google Play store can automatically push automatic updates to devices which have auto update enabled. We recommend using this method to keep the Cloudflare One Agent up-to-date on your mobile devices (managed or unmanaged).

## Test before updates

Most issues that occur after an update are due to compatibility issues between the Cloudflare One Client and third party security software. Before rolling out an update to your organization, be sure to test the new Cloudflare One Client release alongside your other software.

To deploy an update incrementally:

1. Install the latest version of the Cloudflare One Client on a single device.
2. Verify connectivity in your Gateway logs, and verify that your third party software still works as expected.
3. Deploy the update to a few more devices that represent a broad set of configurations within your organization. For example, you could include devices from a variety of departments such as Engineering, Human Resources, and IT.
4. Verify connectivity for these devices.
5. Once everything is working, deploy the update to the rest of your organization.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/update/#page","headline":"Update the Cloudflare One Client · Cloudflare One docs","description":"How Update the Cloudflare One Client works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/update/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/","name":"Download Cloudflare One Client stable releases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/update/","name":"Update the Cloudflare One Client"}}]}
```
