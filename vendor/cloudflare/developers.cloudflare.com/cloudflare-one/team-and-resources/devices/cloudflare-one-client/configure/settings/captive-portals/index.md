---
title: Captive portal detection
description: How Captive portal detection works in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Captive portal detection

Captive portals are used by public Wi-Fi networks (such as airports, coffee shops, and hotels) to make a user agree to their Terms of Service or provide payment before allowing access to the Internet. When a user connects to the Wi-Fi, the captive portal blocks all HTTPS traffic until the user completes a captive portal login flow in their browser. This prevents the Cloudflare One Client (formerly WARP) from connecting to Cloudflare. At the same time, the Cloudflare One Client creates [firewall rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#ip-traffic) on the device to send all traffic to Cloudflare. The user is therefore unable to access the captive portal login screen unless they temporarily disconnect the Cloudflare One Client.

## Allow users to connect to captive portals

To allow users to connect through a captive portal, administrators can configure the following device client settings:

### No user interaction required

* Enable [Captive portal detection](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#captive-portal-detection). This allows the Cloudflare One Client to temporarily disconnect when it detects a captive portal on the network. For more details, refer to [how captive portal detection works](#how-captive-portal-detection-works) and its [limitations](#limitations).
* Set [Device tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) to **MASQUE**. When using MASQUE, client traffic will look like standard HTTPS traffic and is therefore less likely to be blocked by captive portals.

### User interaction required

* Enable [Lock device client switch](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#lock-device-client-switch) and enable [Allow admin override codes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-admin-override-codes). Users can contact the IT administrator for a one-time code that allows them to manually disconnect the Cloudflare One Client and connect to a portal.
* For employees who travel, disable [Lock device client switch](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#lock-device-client-switch) and set an [Auto connect](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#auto-connect) duration. This allows the user to manually disconnect the Cloudflare One Client without contacting IT.

## How captive portal detection works

If the Cloudflare One Client cannot establish a connection to Cloudflare, it will:

1. Start the captive portal timer.
2. Send a series of requests to the [Cloudflare captive portal URLs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#captive-portal) and other OS and browser-specific captive portal URLs. These requests are sent outside of the WARP tunnel.
3. If a request is intercepted, the Cloudflare One Client assumes the network is behind a captive portal and fully opens the [system firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#ip-traffic). While the firewall is open, all device traffic will bypass the Cloudflare One Client.
4. Re-enable the firewall after the user successfully connects to the portal or after the timeout period expires.

## Limitations

* Due to [how captive portal detection works](#how-captive-portal-detection-works), it may be possible for an employee to spoof a captive portal in order to disconnect the Cloudflare One Client.
* Some captive portals, particularly those on airlines, may be slow to respond and exceed the captive portal detection timeout. Users will likely see a [CF\_CAPTIVE\_PORTAL\_TIMED\_OUT](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/client-errors/#cf%5Fcaptive%5Fportal%5Ftimed%5Fout) error when they try to connect. For context on the steps leading up to these errors, refer to [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/).
* The Cloudflare One Client may not be able to detect multi-stage captive portals, which redirect the user to different networks during the login process. Users will need to manually disconnect the Cloudflare One Client to get through the captive portal.
* Some public Wi-Fi networks are incompatible with running the Cloudflare One Client:  
   * Captive portals that intercept all DNS traffic will block the Cloudflare One Client's [DoH connection](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#overview). Users will likely see a [CF\_NO\_NETWORK](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/client-errors/#cf%5Fno%5Fnetwork) error after they login to the captive portal.  
   * Captive portals that only allow HTTPS traffic will block the Cloudflare One Client's [Wireguard UDP connection](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#overview). Users will likely see a [CF\_HAPPY\_EYEBALLS\_MITM\_FAILURE](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/client-errors/#cf%5Fhappy%5Feyeballs%5Fmitm%5Ffailure) error after they login to the captive portal.

Check system notifications

Captive portal detection relies on system notifications to prompt the user. The login screen may not appear if a notification is dismissed or if the device is in Do Not Disturb mode, is screen recording, or if notifications for the Cloudflare One Client app are disabled in system settings.

## Get captive portal logs Beta

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| All modes                                                                                                                          | All plans                                                       |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2025.4.589.1           |
| macOS    | ✅            | 2025.4.589.1           |
| Linux    | ❌            |                        |
| iOS      | ❌            |                        |
| Android  | ❌            |                        |
| ChromeOS | ❌            |                        |

Captive portal logs are used by Cloudflare Support to troubleshoot Cloudflare One Client captive portal issues. When an end user reports an issue with a captive portal, the IT administrator can ask the user to collect captive portal logs on their device. The administrator can then attach the logs to a Cloudflare Support ticket.

To get captive portal logs:

* [ Version 2026.2+ ](#tab-panel-7462)
* [ Version 2026.1 and earlier ](#tab-panel-7463)

1. Open a terminal window.
2. Run the following command:  
Terminal window  
```  
warp-diag captive-portal  
```
3. When prompted with `You're currently connected via interface '<INTERFACE>' (<SSID>). Is this interface connected to the network causing issues?`, select **Yes** to confirm.

1. Open the Cloudflare One Client.
2. Go to **Settings** (gear icon) > **Preferences** \> **Advanced**.
3. Select **Collect Captive Portal Diag**.
4. The Cloudflare One Client will ask if the device is connected (or attempting to connect) to the Wi-Fi network that is causing issues. Select **Yes** to confirm.

macOS limitation

On macOS, [**Automatically join this network** ↗](https://support.apple.com/guide/mac-help/wi-fi-settings-on-mac-mh11935/mac) should be enabled on the Wi-Fi network that is causing issues. This setting is enabled by default. If manually disabled, the captive portal diagnostic will fail to capture meaningful data and the device will not automatically reconnect to this network.

Once the diagnostic finishes running, the Cloudflare One Client will place a `warp-captive-portal-diag-<date>-<time>.zip` file on the user's desktop. The end user can now share this file with their IT administrator.

## Related resources

* [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) \- Learn about the status messages displayed by the Cloudflare One Client during its connection process, and understand each stage as the client establishes a secure tunnel to Cloudflare.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/captive-portals/#page","headline":"Captive portal detection · Cloudflare One docs","description":"How Captive portal detection works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/captive-portals/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/","name":"Configure the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/","name":"Device client settings"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/captive-portals/","name":"Captive portal detection"}}]}
```
