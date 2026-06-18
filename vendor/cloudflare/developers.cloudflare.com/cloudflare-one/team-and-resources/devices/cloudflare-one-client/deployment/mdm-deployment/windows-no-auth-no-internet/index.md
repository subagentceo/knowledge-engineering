---
title: Block internet access until user authenticates
description: Block internet access on a Windows device until the user authenticates with the Cloudflare One Client.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Block internet access until user authenticates

## Availability Beta

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| All modes                                                                                                                          | All plans                                                       |

| System   | Availability | Minimum WARP version |
| -------- | ------------ | -------------------- |
| Windows  | ✅            | 2026.5.0             |
| macOS    | ❌            |                      |
| Linux    | ❌            |                      |
| iOS      | ❌            |                      |
| Android  | ❌            |                      |
| ChromeOS | ❌            |                      |

When **no-auth-no-internet** is enabled, the Cloudflare One Client locks down general internet traffic on the device whenever the device is in an unauthenticated state (i.e., without a valid device registration). During this lockdown, the client allows only the traffic required for the device to remain on the network and for the user to complete IdP authentication. Once the user signs in, normal connectivity resumes and your configured Gateway, Access, RBI, and DLP policies take effect.

When this feature is enabled, the authentication is done via in-app WebView2 browser instead of the default browser on the system.

The lockdown re-engages automatically any time the device transitions back to an unauthenticated state — for example, if the registration expires, another OS user that has never authenticated with the Cloudflare One Client logs in while in [multi-user mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/), or the user switches into a new organization.

## Prerequisites

* The Cloudflare One Client must be [deployed via MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/#windows).
* The device must have [WebView2](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/#authenticate-in-embedded-browser) available. By default, the WebView2 runtime should be present on all Windows versions that Cloudflare One Client supports.

## Enable no-auth-no-internet

To enable the feature, [deploy an MDM file](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/#windows) with the `no_auth_no_internet` top-level key set to `true`:

```

<dict>

  <key>no_auth_no_internet</key>

  <true/>

  <key>configs</key>

  <array>

    <dict>

      <key>organization</key>

      <string>your-team-name</string>

      <key>display_name</key>

      <string>Default</string>

    </dict>

  </array>

</dict>


```

When the Cloudflare One Client reads this configuration and detects that no user is authenticated, it applies the firewall lockdown and prompts the user to authenticate. After successful authentication, the lockdown is completely lifted.

## Block access to RFC 1918 ranges in lockdown state

By default, the Cloudflare One Client permits traffic to [RFC 1918 ↗](https://datatracker.ietf.org/doc/html/rfc1918) private address ranges (`10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`) while the device is locked down. This allows the device to reach on-premise resources such as a domain controller, an MDM server, or a local printer before the user authenticates.

To block RFC 1918 traffic during lockdown, set `no_auth_no_internet_block_rfc_1918` to `true`:

```

<dict>

  <key>no_auth_no_internet</key>

  <true/>

  <key>no_auth_no_internet_block_rfc_1918</key>

  <true/>

  <key>configs</key>

  <array>

    <dict>

      <key>organization</key>

      <string>your-team-name</string>

      <key>display_name</key>

      <string>Default</string>

    </dict>

  </array>

</dict>


```

## Limitations

* The lockdown is enforced only when there is an active interactive user session (for example, a user is logged in and the device is not locked).
* Since authentication now occurs in an embedded WebView2 window, IdP flows that depend on the user's default browser (for example, browser-specific extensions or password managers) may not work.
* Some Windows applications, including Copilot and Teams (personal), may retain internet access while the Cloudflare One Client authentication window is open.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-no-auth-no-internet/#page","headline":"Block internet access until user authenticates · Cloudflare One docs","description":"Block internet access on a Windows device until the user authenticates with the Cloudflare One Client.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-no-auth-no-internet/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Windows"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","name":"Managed deployment"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-no-auth-no-internet/","name":"Block internet access until user authenticates"}}]}
```
