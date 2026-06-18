---
title: Customize device profiles
description: Configure WARP client device profiles.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Customize device profiles

A device profile defines [Cloudflare One Client settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) for a specific set of devices in your organization. You can create multiple profiles and apply different settings based on the user's identity, the device's location, and other criteria.

For example, users in one identity provider group (signifying a specific office location) might have different routes that need to be excluded from their WARP tunnel, or some device types (like Linux) might need different DNS settings to accommodate local development services.

## Configure the default profile

Set your default device profile to be applicable to a majority of your userbase, or any user without known explicit considerations.

To customize the default settings:

* [ Dashboard ](#tab-panel-9270)
* [ API ](#tab-panel-9271)
* [ Terraform (v5) ](#tab-panel-9272)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Select the **Default** profile and select \*_Edit_.
3. Many users running Cloudflare Zero Trust to secure their organization have a default profile that resembles the following. Refer to [Cloudflare One Client settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) for a description of each setting.  
| Setting                              | State                                                                                                                             | Notes                                                                                                                                                                                                                                                                                                       |  
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| Captive portal detection             | Enabled                                                                                                                           |                                                                                                                                                                                                                                                                                                             |  
| Mode switch                          | Disabled                                                                                                                          | If enabled, users have the option to switch to a DNS-only security mode and lose access to your private network.                                                                                                                                                                                            |  
| Lock device client switch            | Enabled                                                                                                                           | Should be enabled unless users have an explicit reason to disable the device client, such as a conflicting VPN client on the device or other extenuating circumstances. If disabled for concerns about user experience, **Auto Connect** should be enabled and set on a short interval, like 10-15 minutes. |  
| Allow device to leave organization   | Disabled                                                                                                                          |                                                                                                                                                                                                                                                                                                             |  
| Allow updates                        | Disabled                                                                                                                          | Usually disabled on managed devices. If enabled, users who are local administrators on their device can update the Cloudflare One Client on their own — this can introduce version consistency control issues if client versions are centrally managed by IT.                                               |  
| Auto connect                         | Enabled                                                                                                                           | Timeout is usually set between 10min - 30min.                                                                                                                                                                                                                                                               |  
| Support URL                          | Enabled                                                                                                                           |                                                                                                                                                                                                                                                                                                             |  
| Service mode                         | Traffic and DNS mode                                                                                                              | Proxies device traffic to Cloudflare according to your Split Tunnel rules.                                                                                                                                                                                                                                  |  
| Local Domain Fallback                | Refer to [Resolve Private DNS](https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/private-dns/). |                                                                                                                                                                                                                                                                                                             |  
| Split Tunnels                        | Exclude IPs and domains                                                                                                           | Refer to [Define Split Tunnels settings](https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/split-tunnel-settings/).                                                                                                                                                       |  
| Directly route Microsoft 365 traffic | Disabled                                                                                                                          | Usually disabled to allow inspection of Microsoft 365 traffic.                                                                                                                                                                                                                                              |
4. Save the profile.
5. Configure [global settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#global-settings) for all device profiles:  
   1. (Recommended) Enable **Admin override code** if you turned on **Lock device client switch**.  
   2. Enable **Install CA to system certificate store** if you want users to see a [custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/).

1. Update the default device settings profile:

Terminal window

```

curl --request PATCH \

https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "allow_mode_switch": false,

  "allow_updates": false,

  "allowed_to_leave": false,

  "auto_connect": 900,

  "captive_portal": 180,

  "disable_auto_fallback": true,

  "exclude_office_ips": false,

  "service_mode_v2": {

    "mode": "warp"

  },

  "support_url": "https://it.company.com/help",

  "switch_locked": true

}'


```

1. Update global settings:

Terminal window

```

curl --request PUT \

https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/settings \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "disable_for_time": 3600,

  "root_certificate_installation_enabled": true

}'


```

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Configure default profile settings using the [cloudflare\_zero\_trust\_device\_default\_profile ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fdefault%5Fprofile) resource:  
```  
resource "cloudflare_zero_trust_device_default_profile" "default_profile" {  
  account_id            = var.cloudflare_account_id  
  allow_mode_switch     = false  
  allow_updates         = false  
  allowed_to_leave      = false  
  auto_connect          = 600  
  captive_portal        = 180  
  disable_auto_fallback = true  
  exclude_office_ips    = false  
  service_mode_v2       = {mode = "warp"}  
  support_url           = "https://support.example.com"  
  switch_locked         = true  
  tunnel_protocol       = "wireguard"  
}  
```
3. Configure [global settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#global-settings) using the [cloudflare\_zero\_trust\_device\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fsettings) resource:  
```  
resource "cloudflare_zero_trust_device_settings" "global_warp_settings" {  
  account_id            = var.cloudflare_account_id  
  disable_for_time      = 3600  
  root_certificate_installation_enabled = true  
  use_zt_virtual_ip     = false  
}  
```

## (Optional) Create an office profile

You can configure a device settings profile to take effect when the device is connected to a trusted network such as an office. For example, you may wish to allow users in the office to access applications directly rather than route traffic through Cloudflare.

For setup instructions, refer to [Add a managed network](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/managed-networks/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/device-profiles/#page","headline":"Customize device profiles · Cloudflare Learning Paths","description":"Configure WARP client device profiles.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/device-profiles/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/","name":"Configure the device agent"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/device-profiles/","name":"Customize device profiles"}}]}
```
