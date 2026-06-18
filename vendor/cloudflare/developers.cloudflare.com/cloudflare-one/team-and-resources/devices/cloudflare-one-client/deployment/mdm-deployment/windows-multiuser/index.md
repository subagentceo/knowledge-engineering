---
title: Multiple users on a Windows device
description: How Multiple users on a Windows device works in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Multiple users on a Windows device

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| All modes                                                                                                                          | All plans                                                       |

| System   | Availability | Minimum WARP version |
| -------- | ------------ | -------------------- |
| Windows  | ✅            | 2025.6.1400.0        |
| macOS    | ❌            |                      |
| Linux    | ❌            |                      |
| iOS      | ❌            |                      |
| Android  | ❌            |                      |
| ChromeOS | ❌            |                      |

The Cloudflare One Client (formerly WARP) supports multiple users on a single Windows device. In multi-user mode, each user has their own [device registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/device-registration/), and the Cloudflare One Client will automatically switch device registrations when a user logs in to their Windows account. All traffic to Cloudflare will be attributed to the currently active Windows user. This allows administrators to apply identity-based policies and device settings, audit user activity, and remove individual users from a shared workstation.

DNS logging

If a user enables **Log DNS queries** in the Cloudflare One Client GUI (or runs `warp-cli dns log enable`), the Cloudflare One Client will store all DNS queries on the device onto disk. Any user on the device will be able to examine the DNS queries of another user.

## Enable multi-user mode

To enable multi-user support on Windows, [deploy an MDM file](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/#windows) onto the device with the `multi_user` key set to `true`. For example:

```

<dict>

  <key>multi_user</key>

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

To use multi-user mode alongside the [Windows pre-login](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-prelogin/) and [Switch between Zero Trust organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/) options:

```

<dict>

  <key>multi_user</key>

  <true/>

  <key>pre_login</key>

  <dict>

    <key>organization</key>

    <string>mycompany</string>

    <key>auth_client_id</key>

    <string>88bf3b6d86161464f6509f7219099e57.access</string>

    <key>auth_client_secret</key>

    <string>bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5</string>

  </dict>

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

      <string>test-org</string>

      <key>display_name</key>

      <string>Test environment</string>

    </dict>

  </array>

</dict>


```

When enabling multi-user mode for the first time, users will need to re-register even if they had a previous registration.

## Cloudflare One Client registration logic

The following flowchart shows how Cloudflare One Client registration settings take effect as users log in and out:

flowchart TB
    start(["Enable multi-user mode"])-->reg["Active Windows user is prompted to register Cloudflare One Client"]
		reg--"Log out of Windows"-->prelogin
		reg--"Switch user"-->regexists

    subgraph preloginbehavior["Windows login screen"]
		prelogin{{"Is there a pre-login <br />registration?"}}
    preloginyes["Use pre-login settings"]
		prelogin--"Yes"-->preloginyes
		prelogin-. "No" .->preloginno
		preloginno["Stay registered as <br />previous Windows user"]
		end

		preloginbehavior--"Log in to Windows"---->regexists{{"Has the user already registered with Cloudflare One Client?"}}
		regexists--"Yes"-->user["Switch to that user's registration"]
		regexists-. "No" .->reg

### Fast user switching

Note

Requires [multi-user mode](#enable-multi-user-mode).

[Fast user switching ↗](https://learn.microsoft.com/windows/win32/shell/fast-user-switching) is a Windows feature that allows users to switch accounts without logging out. With fast user switching, multiple users may be logged in to the device and generating network traffic. The Cloudflare One Client will attribute all traffic to the user who has the [interactive windows station ↗](http://techcommunity.microsoft.com/blog/askperf/sessions-desktops-and-windows-stations/372473). For example, if user A is logged in and fast user switches to user B, traffic from both accounts will appear to come from user B. This is because user B is now actively using the Windows desktop GUI. Now assume that user B logs out and there is no [pre-login registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-prelogin/); the Cloudflare One Client will continue to attribute traffic to user B until user A logs back in to the Windows desktop.

To accurately attribute network traffic to specific users, Cloudflare recommends disabling fast user switching or at the very least configuring a [pre-login registration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-prelogin/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/#page","headline":"Multiple users on a Windows device · Cloudflare One docs","description":"How Multiple users on a Windows device works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Windows"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","name":"Managed deployment"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/","name":"Multiple users on a Windows device"}}]}
```
