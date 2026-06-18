---
title: Switch between Zero Trust organizations
description: Switch between Zero Trust organizations in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Switch between Zero Trust organizations

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| All modes                                                                                                                          | All plans                                                       |

| System   | Availability | Minimum WARP version |
| -------- | ------------ | -------------------- |
| Windows  | ✅            | 2024.1.159.0         |
| macOS    | ✅            | 2024.1.160.0         |
| Linux    | ✅            | 2024.2.62.0          |
| iOS      | ✅            | 1.7                  |
| Android  | ✅            | 1.4                  |
| ChromeOS | ✅            | 1.4                  |

In the Cloudflare One Client (formerly WARP), users can switch between multiple Zero Trust organizations (or other [MDM parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/)) that administrators specify in an MDM file. Common use cases include:

* Allow IT security staff to switch between test and production environments.
* Allow Managed Service Providers to support multiple customer accounts.
* Allow users to switch between the default Cloudflare One Client ingress IPs and the [Cloudflare China ingress IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#override%5Fwarp%5Fendpoint).

## MDM file format

To enable multiple organizations, administrators need to modify their [MDM file](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/) to take an array of configurations. Each configuration must include a `display_name` parameter that will be visible to users in the Cloudflare One Client GUI. Because display names are listed in the same order as they appear in the MDM file, we recommend putting the most used configurations at the top of the file. When a user opens the Cloudflare One Client for the first time, they will be prompted to log into the first configuration in the list.

An MDM file supports a maximum of 25 configurations. The following example includes three configurations.

### XML

mdm.xml

```

<dict>

  <key>configs</key>

  <array>

    <dict>

      <key>organization</key>

      <string>mycompany</string>

      <key>display_name</key>

      <string>Production environment</string>

    </dict>

    <dict>

      <key>organization</key>

      <string>mycompany</string>

      <key>override_api_endpoint</key>

      <string>203.0.113.0</string>

      <key>override_doh_endpoint</key>

      <string>203.0.113.0</string>

      <key>override_warp_endpoint</key>

      <string>203.0.113.0:0</string>

      <key>display_name</key>

      <string>China employees</string>

    </dict>

    <dict>

      <key>organization</key>

      <string>test-org</string>

      <key>display_name</key>

      <string>Test environment</string>

    </dict>

  </array>

</dict>


```

### plist

[Download](https://developers.cloudflare.com/cloudflare-one/static/mdm/multiple-orgs/com.cloudflare.warp.plist) an example `.plist` file.

### mobileconfig

[Download](https://developers.cloudflare.com/cloudflare-one/static/mdm/multiple-orgs/CloudflareWARP.mobileconfig) an example `.mobileconfig` file.

## Switch organizations in the Cloudflare One Client

To switch to a different organization as a user:

* [ Windows, macOS, and Linux ](#tab-panel-7488)
* [ iOS and Android ](#tab-panel-7489)

1. Open the Cloudflare One Client on your device.
2. Go to **Home**. The **Configuration** dropdown will show the organizations that the admin has configured for your device.

Version 2026.1 and earlier

In the Cloudflare One Client, select the gear icon > **Switch configurations**.

1. Open the Cloudflare One Agent app on your device.
2. Go to **Settings** \> **Advanced** \> **Switch configurations**. The menu will show the organizations that the admin has configured for your device.

1. Select the configuration that you want to connect to.
2. If prompted, complete the authentication steps required for the new organization. Your authentication information will be saved and you will be able to switch back and forth between configurations.

Note

Only admins can [add additional organizations](#mdm-file-format) to the client GUI. To connect to an organization that is not displayed in the GUI, manually log out[1](#user-content-fn-1) of the old organization and [enroll](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/) in the new organization.

### Troubleshooting

When switching organizations or connecting for the first time, keep the following in mind:

* If this is the first time connecting to an organization, web browsers like Chrome may require a full restart to correctly recognize and trust the organization's root certificate. Cloudflare recommends closing all browser windows after the initial connection. All subsequent switches should not require a restart.
* On macOS, ensure the specific CA certificate for the new organization is properly trusted by verifying its status in Keychain Access.
* Switching configurations may sometimes momentarily disconnect the Cloudflare One Client. If this occurs, simply re-enable the Cloudflare One Client to restore the connection.

## Footnotes

1. Logging out is only possible if [Allow device to leave organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-device-to-leave-organization) is enabled for your device. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#page","headline":"Switch between Zero Trust organizations · Cloudflare One docs","description":"Switch between Zero Trust organizations in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["XML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","name":"Managed deployment"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/","name":"Switch between Zero Trust organizations"}}]}
```
