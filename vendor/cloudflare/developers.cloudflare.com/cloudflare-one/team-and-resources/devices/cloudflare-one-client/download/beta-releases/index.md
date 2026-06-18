---
title: Download Cloudflare One Client beta releases
description: Reference information for Download Cloudflare One Client beta releases in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Download Cloudflare One Client beta releases

Cloudflare tests new Cloudflare One Client features and improvements in an unstable beta release before adding them to the [stable release](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/). Beta releases are not recommended for production environments. To get early access to new features, download the latest beta client from the links below.

## Windows

[ Download latest beta release ](https://downloads.cloudflareclient.com/v1/download/windows/beta) 

| **OS version**             | Windows 10 LTSC, Windows 11, Windows 365 Cloud PC running Windows 11 |
| -------------------------- | -------------------------------------------------------------------- |
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                    |
| **.NET Framework version** | 4.7.2 or later                                                       |
| **HD space**               | 184 MB                                                               |
| **Memory**                 | 3 MB                                                                 |
| **Network interface type** | Wi-Fi or LAN                                                         |
| **MTU**                    | 1381 bytes recommended [1](#user-content-fn-1)                       |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

Latest release

**Version:**  Windows 2026.5.1155.1 **Date:**  2026-05-29 **Size:** 56 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.5.1155.1) 

#### Release notes

This release introduces the new Cloudflare One Client UI for Windows! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* The client now applies DNS search suffixes configured in your [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles) / [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies). Administrators can push a list of DNS search domains that the client appends to single-label queries, alongside any system-configured suffixes. See [DNS search suffixes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes) for details.
* Administrators can now control which virtual networks (VNETs) are available to which users via WARP device profile settings in the Zero Trust dashboard. Previously, every VNET in the organization was visible to every device; you can now scope the VNET picker per profile so users only see the networks relevant to them. See [VNET availability](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#vnet-availability) for details.
* Added mandatory authentication. When enabled via MDM, the Cloudflare One Client blocks all Internet traffic from the moment the machine boots until the user authenticates, closing the visibility gap on newly deployed devices and during re-authentication. See the [announcement blog](https://blog.cloudflare.com/mandatory-authentication-mfa/) and [documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-no-auth-no-internet/) for details.
* Added a local-file signal source for Emergency Disconnect. In addition to the existing HTTPS polling mechanism, administrators can now configure WARP to monitor for a file on disk; the presence of the file triggers an emergency disconnect even if both Cloudflare and your own infrastructure are unreachable. Either signal being asserted triggers disconnect; both must be cleared for normal operation to resume.
* Added new warp-cli debug commands for interactive connection diagnosis. See [Extra debug logging](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#extra-debug-logging) for details.
* The local DNS proxy now supports DNSSEC passthrough. DNSSEC-signed responses are forwarded to the application intact (including DO/AD bits and RRSIG records), so applications that validate DNSSEC locally — including resolvers and the dig/drill tooling — work correctly through the client.
* Added a new MDM format for organization-wide settings, including a cleaner way to configure the compliance environment (e.g. FedRAMP). The previous per-configuration approach still works, but the new format is now recommended. See the updated [Cloudflare One MDM documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization%5Fconfigs) for details.
* Client Certificate device-posture checks now support template variables (e.g. `${serial_number}`, `${device_uuid}`) in the Subject Alternative Name field, matching what the documentation has always claimed. Previously only the Common Name field accepted variables, which broke posture rules that pinned identity to a SAN entry.
* The UseWebView2 registry value (HKLM\\SOFTWARE\\Cloudflare\\CloudflareWARP\\UseWebView2 = y) is once again honored by the new GUI for authentication, so administrators who prefer the embedded WebView2 browser for sign-in can opt back in. This setting was effectively ignored in the previous release; the default browser was always used. This key is now also honored for re-authentications.
* Fixed a crash in the authentication browser when navigating to a site that prompts for browser permissions (microphone, camera, notifications, etc.). The same fix had previously landed for the captive-portal browser; this extends it to the auth browser.
* Fixed an issue in proxy mode where hostnames containing underscores (e.g. ai\_app.com) were rejected, breaking apps that depend on such hostnames (notably ChatGPT sandbox apps). The local proxy now accepts underscore-containing hostnames in CONNECT requests.

**Known issues**

* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of Split Tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.
* Windows ARM may prompt the user to close running applications while trying to install this version. Simply click “Ok” with the default highlighted option.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected.  
   To work around this issue, please reconnect the client by selecting "disconnect" and then "connect" in the client user interface.

Previous version history (6)

Windows 2026.3.566.1

**Version:**  Windows 2026.3.566.1 **Date:**  2026-03-10 **Size:** 51.4 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.3.566.1) 

#### Release notes

This release contains minor fixes and introduces a brand new visual style for the client interface. The new Cloudflare One Client interface changes connectivity management from a toggle to a button and brings useful connectivity settings to the home screen. The redesign also introduces a collapsible navigation bar. When expanded, more client information can be accessed including connectivity, settings, and device profile information. If you have any feedback or questions, visit the [Cloudflare Community forum](https://community.cloudflare.com/t/introducing-the-new-cloudflare-one-client-interface/901362) and let us know.

**Changes and improvements**

* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm to Cubic for improved reliability across platforms.
* Fixed packet capture failing on tunnel interface when the tunnel interface is renamed by SCCM VPN boundary support.
* Fixed unnecessary registration deletion caused by RDP connections in multi-user mode.
* Fixed increased tunnel interface start-up time due to a race between duplicate address detection (DAD) and disabling NetBT.
* Fixed tunnel failing to connect when the system DNS search list contains unexpected characters.
* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed emergency disconnect state from a previous organization incorrectly persisting after switching organizations.
* Fixed initiating managed network detection checks when no network is available, which caused device profile flapping.

**Known issues**

* The client may unexpectedly terminate during captive portal login. To work around this issue, use a web browser to authenticate with the captive portal and then re-launch the client.
* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* The client may become stuck in a `Connecting` state. To resolve this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface. Alternatively, change the client's operation mode.
* The client may display an empty white screen upon the device waking from sleep. To resolve this issue, exit and then open the client to re-launch it.
* Canceling login during a single MDM configuration setup results in an empty page with no way to resume authentication. To work around this issue, exit and relaunch the client.
* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later. This warning will be omitted from future release notes. This Microsoft Security Intelligence update was released in May 2025.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected. To work around this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface.

Windows 2026.1.89.1

**Version:**  Windows 2026.1.89.1 **Date:**  2026-01-27 **Size:** 137 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.1.89.1) 

#### Release notes

This release contains minor fixes, improvements, and new features.

**Changes and improvements**

* Improvements to [multi-user mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/). Fixed an issue where when switching from a pre-login registration to a user registration, Mobile Device Management (MDM) configuration association could be lost.
* Added a new feature to [manage NetBIOS over TCP/IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#netbios-over-tcpip) functionality on the Windows client. NetBIOS over TCP/IP on the Windows client is now disabled by default and can be enabled in [device profile settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/).
* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for the Windows [client certificate posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/) to ensure logged results are from checks that run once users log in.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.10.118.1

**Version:**  Windows 2025.10.118.1 **Date:**  2025-12-09 **Size:** 136 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.10.118.1) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Fixed an issue where sending large messages to the WARP daemon by Inter-Process Communication (IPC) could cause WARP to crash and result in service interruptions.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.9.173.1

**Version:**  Windows 2025.9.173.1 **Date:**  2025-10-16 **Size:** 135 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.9.173.1) 

#### Release notes

This release contains minor fixes, improvements, and new features including Path Maximum Transmission Unit Discovery (PMTUD). With PMTUD enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to debug connectivity issues.

**Changes and improvements**

* Improvements for [Windows multi-user](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/) to maintain the [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) state when switching between users.
* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to debug connectivity issues.
* Deleting registrations no longer returns an error when succeeding.
* Path Maximum Transmission Unit Discovery (PMTUD) is now used to discover the effective MTU of the connection. This allows the client to improve connection performance optimized for the current network.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.7.106.1

**Version:**  Windows 2025.7.106.1 **Date:**  2025-09-10 **Size:** 135 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.7.106.1) 

#### Release notes

This release contains minor fixes and improvements including enhancements to [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) for even faster resolution. The MASQUE protocol is now the only protocol that can use Proxy mode. If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new [WARP mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) or all devices matching the profile will lose connectivity.

**Changes and improvements**

* Enhancements to [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) for even faster resolution. The MASQUE protocol is now the only protocol that can use Proxy mode. If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new [WARP mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) or all devices matching the profile will lose connectivity.
* Improvement to keep TCP connections up the first time WARP connects on devices so that remote desktop sessions (such as RDP or SSH) continue to work.
* Improvements to maintain Global WARP Override settings when switching between organization configurations.
* The [MASQUE protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) is now the default protocol for all new WARP device profiles.
* Improvement to limit idle connections in DoH mode to avoid unnecessary resource usage that can lead to DoH requests not resolving.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about Win32/ClickFix.ABA being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.6.824.1

**Version:**  Windows 2025.6.824.1 **Date:**  2025-07-24 **Size:** 134 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.6.824.1) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Improvements to better manage multi-user pre-login registrations.
* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement to managed network detection checks for faster switching between managed networks.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with `KB5055523` installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## macOS

[ Download latest beta release ](https://downloads.cloudflareclient.com/v1/download/macos/beta) 

| **OS version**             | Sonoma 14.0+, Sequoia 15.1+ (15.0.x is not supported), Tahoe 26.0+ |
| -------------------------- | ------------------------------------------------------------------ |
| **Processor**              | Intel or M series                                                  |
| **HD space**               | 75 MB                                                              |
| **Memory**                 | 35 MB                                                              |
| **Network interface type** | Wi-Fi or LAN                                                       |
| **MTU**                    | 1381 bytes recommended [1](#user-content-fn-1)                     |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

Latest release

**Version:**  macOS 2026.5.1155.1 **Date:**  2026-05-29 **Size:** 143 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.5.1155.1) 

#### Release notes

This release introduces the new Cloudflare One Client UI for macOS! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* The client now applies DNS search suffixes configured in your [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles) / [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies). Administrators can push a list of DNS search domains that the client appends to single-label queries, alongside any system-configured suffixes. See [DNS search suffixes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes) for details.
* Administrators can now control which virtual networks (VNETs) are available to which users via WARP device profile settings in the Zero Trust dashboard. Previously, every VNET in the organization was visible to every device; you can now scope the VNET picker per profile so users only see the networks relevant to them. See [VNET availability](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#vnet-availability) for details.
* Added a local-file signal source for Emergency Disconnect. In addition to the existing HTTPS polling mechanism, administrators can now configure WARP to monitor for a file on disk; the presence of the file triggers an emergency disconnect even if both Cloudflare and your own infrastructure are unreachable. Either signal being asserted triggers disconnect; both must be cleared for normal operation to resume.
* Added new warp-cli debug commands for interactive connection diagnosis. See [Extra debug logging](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#extra-debug-logging) for details.
* The local DNS proxy now supports DNSSEC passthrough. DNSSEC-signed responses are forwarded to the application intact (including DO/AD bits and RRSIG records), so applications that validate DNSSEC locally — including resolvers and the dig/drill tooling — work correctly through the client.
* Added a new MDM format for organization-wide settings, including a cleaner way to configure the compliance environment (e.g. FedRAMP). The previous per-configuration approach still works, but the new format is now recommended. See the updated [Cloudflare One MDM documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#organization%5Fconfigs) for details.
* Client Certificate device-posture checks now support template variables (e.g. `${serial_number}`, `${device_uuid}`) in the Subject Alternative Name field, matching what the documentation has always claimed. Previously only the Common Name field accepted variables, which broke posture rules that pinned identity to a SAN entry.
* Fixed the in-client captive-portal browser rendering a blank "Success" page on some airline Wi-Fi networks (United inflight Wi-Fi was the reported case). The browser now reliably loads the airline's real portal page so users can complete sign-in from inside the client instead of having to open a separate browser.
* Fixed an issue in proxy mode where hostnames containing underscores (e.g. ai\_app.com) were rejected, breaking apps that depend on such hostnames (notably ChatGPT sandbox apps). The local proxy now accepts underscore-containing hostnames in CONNECT requests.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

Previous version history (6)

macOS 2026.3.566.1

**Version:**  macOS 2026.3.566.1 **Date:**  2026-03-10 **Size:** 128 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.3.566.1) 

#### Release notes

This release contains minor fixes and introduces a brand new visual style for the client interface. The new Cloudflare One Client interface changes connectivity management from a toggle to a button and brings useful connectivity settings to the home screen. The redesign also introduces a collapsible navigation bar. When expanded, more client information can be accessed including connectivity, settings, and device profile information. If you have any feedback or questions, visit the [Cloudflare Community forum](https://community.cloudflare.com/t/introducing-the-new-cloudflare-one-client-interface/901362) and let us know.

**Changes and improvements**

* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed emergency disconnect state from a previous organization incorrectly persisting after switching organizations.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm to Cubic for improved reliability across platforms.
* Fixed initiating managed network detection checks when no network is available, which caused device profile flapping.

**Known issues**

* The client may become stuck in a `Connecting` state. To resolve this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface. Alternatively, change the client's operation mode.
* The client may display an empty white screen upon the device waking from sleep. To resolve this issue, exit and then open the client to re-launch it.
* Canceling login during a single MDM configuration setup results in an empty page with no way to resume authentication. To work around this issue, exit and relaunch the client.

macOS 2026.1.89.1

**Version:**  macOS 2026.1.89.1 **Date:**  2026-01-27 **Size:** 115 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.1.89.1) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.

macOS 2025.10.118.1

**Version:**  macOS 2025.10.118.1 **Date:**  2025-12-09 **Size:** 111 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.10.118.1) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.

macOS 2025.9.173.1

**Version:**  macOS 2025.9.173.1 **Date:**  2025-10-16 **Size:** 111 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.9.173.1) 

#### Release notes

This release contains minor fixes, improvements, and new features including Path Maximum Transmission Unit Discovery (PMTUD). With PMTUD enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to debug connectivity issues.

**Changes and improvements**

* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to debug connectivity issues.
* Deleting registrations no longer returns an error when succeeding.
* Path Maximum Transmission Unit Discovery (PMTUD) is now used to discover the effective MTU of the connection. This allows the client to improve connection performance optimized for the current network.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.7.106.1

**Version:**  macOS 2025.7.106.1 **Date:**  2025-09-10 **Size:** 108 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.7.106.1) 

#### Release notes

This release contains minor fixes and improvements including enhancements to [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) for even faster resolution. The MASQUE protocol is now the only protocol that can use Proxy mode. If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new [WARP mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) or all devices matching the profile will lose connectivity.

**Changes and improvements**

* Enhancements to [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) for even faster resolution. The MASQUE protocol is now the only protocol that can use Proxy mode. If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new [WARP mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) or all devices matching the profile will lose connectivity.
* Fixed a bug preventing the `warp-diag captive-portal` command from running successfully due to the client not parsing SSID on macOS.
* Improvements to maintain Global WARP Override settings when switching between organization configurations.
* The [MASQUE protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) is now the default protocol for all new WARP device profiles.
* Improvement to limit idle connections in DoH mode to avoid unnecessary resource usage that can lead to DoH requests not resolving.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.6.824.1

**Version:**  macOS 2025.6.824.1 **Date:**  2025-07-24 **Size:** 107 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.6.824.1) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement to managed network detection checks for faster switching between managed networks.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/#page","headline":"Download Cloudflare One Client beta releases · Cloudflare One docs","description":"Reference information for Download Cloudflare One Client beta releases in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/","name":"Download Cloudflare One Client stable releases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/","name":"Download Cloudflare One Client beta releases"}}]}
```
