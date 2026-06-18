---
title: Download Cloudflare One Client stable releases
description: Reference information for Download Cloudflare One Client stable releases in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Download Cloudflare One Client stable releases

This page contains the stable Cloudflare One Client (formerly WARP) releases from the past year. We recommend using stable releases for production environments. You can download stable releases from the links below after checking requirements.

Cloudflare also offers an unstable [beta release track](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/beta-releases/) with the latest features and improvements, and an [LTS release track](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/lts-releases/) with extended support durations.

For more details on Cloudflare One Client support timelines and end-of-life (EOL) policies, refer to the [Support lifecycle](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/support-lifecycle/) page.

## Windows

[ Download latest stable release ](https://downloads.cloudflareclient.com/v1/download/windows/ga) 

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

**Version:**  Windows 2026.4.1390.0 **Date:**  2026-05-26 **Size:** 52.3 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.4.1390.0) 

#### Release notes

This release introduces the new Cloudflare One Client UI for Windows! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Fixed a proxy mode connection stall issue.

**Known issues**

* Registration authentication for devices via the integrated WebView2 browser is unavailable in this version as a temporary measure. As a result, the client will utilize the default browser on the device to complete the authentication process.
* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of Split Tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.
* Windows ARM may prompt the user to close running applications while trying to install this version. Simply click “Ok” with the default highlighted option.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected.  
   To work around this issue, please reconnect the client by selecting "disconnect" and then "connect" in the client user interface.

Previous version history (11)

Windows 2026.4.1350.0

**Version:**  Windows 2026.4.1350.0 **Date:**  2026-05-11 **Size:** 52.3 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.4.1350.0) 

#### Release notes

This release introduces the new Cloudflare One Client UI for Windows! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.

**Known issues**

* Registration authentication for devices via the integrated WebView2 browser is unavailable in this version as a temporary measure. As a result, the client will utilize the default browser on the device to complete the authentication process.
* An error indicating that Microsoft Edge can't read and write to its data directory may be displayed during captive portal login; this error is benign and can be dismissed.
* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of Split Tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.
* Windows ARM may prompt the user to close running applications while trying to install this version. Simply click “Ok” with the default highlighted option.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected.  
   To work around this issue, please reconnect the client by selecting "disconnect" and then "connect" in the client user interface.

Windows 2026.3.851.0

**Version:**  Windows 2026.3.851.0 **Date:**  2026-04-07 **Size:** 136 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.3.851.0) 

#### Release notes

This release contains minor fixes and improvements.

The next stable release for Windows will introduce the new Cloudflare One Client UI, providing a cleaner and more intuitive design as well as easier access to common actions and information.

**Changes and improvements**

* Fixed an issue causing Windows client tunnel interface initialization failure which prevented clients from establishing a tunnel for connection.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm for local proxy mode to Cubic for improved reliability across platforms.
* Fixed packet capture failing on tunnel interface when the tunnel interface is renamed by SCCM VPN boundary support.
* Fixed unnecessary registration deletion caused by RDP connections in multi-user mode.
* Fixed increased tunnel interface start-up time due to a race between duplicate address detection (DAD) and disabling NetBT.
* Fixed tunnel failing to connect when the system DNS search list contains unexpected characters.
* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in local proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed an issue where the emergency disconnect status of a prior organization persisted after a switch to a different organization.
* Fixed initiating managed network detections checks when no network is available, which caused device profile flapping.
* Fixed an issue where degraded Windows Management Instrumentation (WMI) state could put the client in a failed connection state loop during initialization.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution. This warning will be omitted from future release notes. This Windows update was released in July 2025.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later. This warning will be omitted from future release notes. This Microsoft Security Intelligence update was released in May 2025.
* DNS resolution may be broken when the following conditions are all true:  
   * The client is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while the client is connected.  
To work around this issue, reconnect the client by selecting **Disconnect** and then **Connect** in the client user interface.

Windows 2026.1.150.0

**Version:**  Windows 2026.1.150.0 **Date:**  2026-02-24 **Size:** 137 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2026.1.150.0) 

#### Release notes

This release contains minor fixes, improvements, and new features.

**Changes and improvements**

* Improvements to [multi-user mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/windows-multiuser/). Fixed an issue where when switching from a pre-login registration to a user registration, Mobile Device Management (MDM) configuration association could be lost.
* Added a new feature to [manage NetBIOS over TCP/IP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#netbios-over-tcpip) functionality on the Windows client. NetBIOS over TCP/IP on the Windows client is now disabled by default and can be enabled in [device profile settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/).
* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for the Windows [client certificate posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/) to ensure logged results are from checks that run once users log in.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.
* Fixed an issue where misconfigured DEX HTTP tests prevented new registrations.
* Fixed an issue causing DNS requests to fail with clients in Traffic and DNS mode.
* Improved service shutdown behavior in cases where the daemon is unresponsive.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.10.186.0

**Version:**  Windows 2025.10.186.0 **Date:**  2026-01-13 **Size:** 135 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.10.186.0) 

#### Release notes

This release contains minor fixes, improvements, and new features. New features include the ability to manage WARP client connectivity for all devices in your fleet using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect), and a new WARP client device posture check for [Antivirus](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/antivirus/).

**Changes and improvements**

* Added a new feature to manage WARP client connectivity for all devices using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect). This feature allows administrators to send a global signal from an on-premises HTTPS endpoint that force disconnects or reconnects all WARP clients in an account based on configuration set on the endpoint.
* Fixed an issue that caused occasional audio degradation and increased CPU usage on Windows by optimizing route configurations for large [domain-based split tunnel rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#domain-based-split-tunnels).
* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Fixed an issue where sending large messages to the daemon by Inter-Process Communication (IPC) could cause the daemon to fail and result in service interruptions.
* Added support for a new WARP client device posture check for [Antivirus](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/antivirus/). The check confirms the presence of an antivirus program on a Windows device with the option to check if the antivirus is up to date.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.9.558.0

**Version:**  Windows 2025.9.558.0 **Date:**  2025-11-11 **Size:** 136 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.9.558.0) 

#### Release notes

This release contains minor fixes, improvements, and new features including [Path Maximum Transmission Unit Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery). When PMTUD is enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to diagnose connectivity issues.

**Changes and improvements**

* Fixed an inconsistency with [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings in multi-user environments when switching between users.
* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to diagnose connectivity issues.
* Fixed an issue where deleting a registration was erroneously reported as having failed.
* Path Maximum Transmission Unit Discovery (PMTUD) may now be used to discover the effective MTU of the connection. This allows the WARP client to improve connectivity optimized for each network. PMTUD is disabled by default. To enable it, refer to the [PMTUD documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery).
* Improvements for the [OS version](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/os-version/) WARP client check. Windows Updated Build Revision (UBR) numbers can now be checked by the client to ensure devices have required security patches and features installed.
* The WARP client now supports Windows 11 ARM-based machines. For information on known limitations, refer to the [Known limitations page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/known-limitations/#cloudflare-one-client-disconnected-on-windows-arm).

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.8.779.0

**Version:**  Windows 2025.8.779.0 **Date:**  2025-10-07 **Size:** 135 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.8.779.0) 

#### Release notes

This release contains significant fixes and improvements.

**Changes and improvements**

* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) has been enhanced for even faster resolution. Proxy mode now supports SOCKS4, SOCK5, and HTTP CONNECT over an L4 tunnel with custom congestion control optimizations instead of the previous L3 tunnel to Cloudflare's network. This has more than doubled Proxy mode throughput in lab speed testing, by an order of magnitude in some cases.
* The MASQUE protocol is now the only protocol that can use [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode). If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new WARP mode or switch to the MASQUE protocol. Otherwise, all devices matching the profile will lose connectivity.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.7.176.0

**Version:**  Windows 2025.7.176.0 **Date:**  2025-09-30 **Size:** 134 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.7.176.0) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* MASQUE is now the default [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) for all new WARP device profiles.
* Improvement to limit idle connections in [Gateway with DoH mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) to avoid unnecessary resource usage that can lead to DoH requests not resolving.
* Improvement to maintain TCP connections to reduce interruptions in long-lived connections such as RDP or SSH.
* Improvements to maintain [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings when [switching between organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#switch-organizations-in-the-cloudflare-one-client).
* Improvements to maintain client connectivity during network changes.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.6.1400.0

**Version:**  Windows 2025.6.1400.0 **Date:**  2025-08-21 **Size:** 134 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.6.1400.0) 

#### Release notes

This release contains a hotfix for pre-login for multi-user for the 2025.6.1135.0 release.

**Changes and improvements**

* Fixes an issue where new pre-login registrations were not being properly created.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 KB5062553](https://support.microsoft.com/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about Win32/ClickFix.ABA being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, please reconnect the WARP client by toggling off and back on.

Windows 2025.6.1335.0

**Version:**  Windows 2025.6.1335.0 **Date:**  2025-08-19 **Size:** 134 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.6.1335.0) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Improvements to better manage multi-user pre-login registrations.
* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement for faster client connectivity on high-latency captive portal networks.
* Fixed an issue where recursive CNAME records could cause intermittent WARP connectivity issues.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with KB5055523 installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.5.943.0

**Version:**  Windows 2025.5.943.0 **Date:**  2025-07-23 **Size:** 130 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.5.943.0) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* WARP proxy mode now uses the operating system's DNS settings. Changes made to system DNS settings while in proxy mode require the client to be turned off then back on to take effect.
* Changes to the [SCCM VPN boundary support](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#sccm-vpn-boundary-support) feature to no longer restart the SMS Agent Host (`ccmexec.exe`) service.
* Fixed an issue affecting clients in Split Tunnel Include mode, where access to split-tunneled traffic was blocked after reconnecting the client.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5062553](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).
* Devices with `KB5055523` installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

Windows 2025.5.893.0

**Version:**  Windows 2025.5.893.0 **Date:**  2025-06-30 **Size:** 129 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/windows/version/2025.5.893.0) 

#### Release notes

This release contains improvements and new exciting features, including [SCCM VPN boundary support](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#sccm-vpn-boundary-support) and [post-quantum cryptography](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum). By tunneling your corporate network traffic over Cloudflare, you can now gain the immediate protection of post-quantum cryptography without needing to upgrade any of your individual corporate applications or systems.

**Changes and improvements**

* Fixed a device registration issue that caused WARP connection failures when changing networks.
* Captive portal improvements and fixes:  
   * Captive portal sign in notifications will now be sent through operating system notification services.  
   * Fix for firewall configuration issue affecting clients in DoH only mode.
* Improved the connectivity status message in the client GUI.
* Fixed a bug affecting clients in Gateway with DoH mode where the original DNS servers were not restored after disabling WARP.
* The WARP client now applies post-quantum cryptography end-to-end on enabled devices accessing resources behind a Cloudflare Tunnel. This feature can be [enabled by MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum).
* Improvement to handle client configuration changes made by an MDM while WARP is not running.
* Improvements for multi-user experience to better handle fast user switching and transitions from a pre-login to a logged-in state.
* Added a WARP client device posture check for SAN attributes to the [client certificate check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/).
* Fixed an issue affecting Split Tunnel Include mode, where traffic outside the tunnel was blocked when switching between Wi-Fi and Ethernet networks.
* Added [SCCM VPN boundary support](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#sccm-vpn-boundary-support) to device profile settings. With SCCM VPN boundary support enabled, operating systems will register WARP's local interface IP with the on-premise DNS server when reachable.
* Fix for an issue causing WARP connectivity to fail without full system reboot.

**Known issues**

* For Windows 11 24H2 users, Microsoft has confirmed a regression that may lead to performance issues like mouse lag, audio cracking, or other slowdowns. Cloudflare recommends users experiencing these issues upgrade to a minimum [Windows 11 24H2 version KB5060829](https://support.microsoft.com/en-us/topic/july-8-2025-kb5062553-os-build-26100-4652-523e69cb-051b-43c6-8376-6a76d6caeefd) or higher for resolution.
* Devices with `KB5055523` installed may receive a warning about `Win32/ClickFix.ABA` being present in the installer. To resolve this false positive, update Microsoft Security Intelligence to [version 1.429.19.0](https://www.microsoft.com/en-us/wdsi/definitions/antimalware-definition-release-notes?requestVersion=1.429.19.0) or later.
* DNS resolution may be broken when the following conditions are all true:  
   * WARP is in Secure Web Gateway without DNS filtering (tunnel-only) mode.  
   * A custom DNS server address is configured on the primary network adapter.  
   * The custom DNS server address on the primary network adapter is changed while WARP is connected.  
To work around this issue, reconnect the WARP client by toggling off and back on.

## macOS

[ Download latest stable release ](https://downloads.cloudflareclient.com/v1/download/macos/ga) 

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

**Version:**  macOS 2026.4.1390.0 **Date:**  2026-05-26 **Size:** 133 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.4.1390.0) 

#### Release notes

This release introduces the new Cloudflare One Client UI for macOS! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Fixed a proxy mode connection stall issue.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

Previous version history (10)

macOS 2026.4.1350.0

**Version:**  macOS 2026.4.1350.0 **Date:**  2026-05-11 **Size:** 133 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.4.1350.0) 

#### Release notes

This release introduces the new Cloudflare One Client UI for macOS! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Additional Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

macOS 2026.3.846.0

**Version:**  macOS 2026.3.846.0 **Date:**  2026-04-02 **Size:** 113 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.3.846.0) 

#### Release notes

This release contains minor fixes and improvements.

The next stable release for macOS will introduce the new Cloudflare One Client UI, providing a cleaner and more intuitive design as well as easier access to common actions and information.

**Changes and improvements**

* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in local proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed an issue where the emergency disconnect status of a prior organization persisted after a switch to a different organization.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm for local proxy mode to Cubic for improved reliability across platforms.
* Fixed initiating managed network detections checks when no network is available, which caused device profile flapping.

macOS 2026.1.150.0

**Version:**  macOS 2026.1.150.0 **Date:**  2026-02-24 **Size:** 115 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2026.1.150.0) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.
* Fixed an issue with DNS server configuration failures that caused tunnel connection delays.
* Fixed an issue where misconfigured DEX HTTP tests prevented new registrations.
* Fixed an issue causing DNS requests to fail with clients in Traffic and DNS mode.

macOS 2025.10.186.0

**Version:**  macOS 2025.10.186.0 **Date:**  2026-01-13 **Size:** 111 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.10.186.0) 

#### Release notes

This release contains minor fixes, improvements, and new features, including the ability to manage WARP client connectivity for all devices in your fleet using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect).

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Added a new feature to manage WARP client connectivity for all devices using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect). This feature allows administrators to send a global signal from an on-premises HTTPS endpoint that force disconnects or reconnects all WARP clients in an account based on configuration set on the endpoint.

macOS 2025.9.558.0

**Version:**  macOS 2025.9.558.0 **Date:**  2025-11-11 **Size:** 111 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.9.558.0) 

#### Release notes

This release contains minor fixes, improvements, and new features including [Path Maximum Transmission Unit Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery). When PMTUD is enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to diagnose connectivity issues.

**Changes and improvements**

* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to diagnose connectivity issues.
* Fixed an issue where deleting a registration was erroneously reported as having failed.
* Path Maximum Transmission Unit Discovery (PMTUD) may now be used to discover the effective MTU of the connection. This allows the WARP client to improve connectivity optimized for each network. PMTUD is disabled by default. To enable it, refer to the [PMTUD documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery).

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.8.779.0

**Version:**  macOS 2025.8.779.0 **Date:**  2025-10-07 **Size:** 108 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.8.779.0) 

#### Release notes

This release contains significant fixes and improvements.

**Changes and improvements**

* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) has been enhanced for even faster resolution. Proxy mode now supports SOCKS4, SOCK5, and HTTP CONNECT over an L4 tunnel with custom congestion control optimizations instead of the previous L3 tunnel to Cloudflare's network. This has more than doubled Proxy mode throughput in lab speed testing, by an order of magnitude in some cases.
* The MASQUE protocol is now the only protocol that can use [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode). If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new WARP mode or switch to the MASQUE protocol. Otherwise, all devices matching the profile will lose connectivity.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.7.176.0

**Version:**  macOS 2025.7.176.0 **Date:**  2025-09-30 **Size:** 109 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.7.176.0) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed a bug preventing the `warp-diag captive-portal` command from running successfully due to the client not parsing SSID on macOS.
* Improvements to maintain [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings when [switching between organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#switch-organizations-in-the-cloudflare-one-client).
* MASQUE is now the default [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) for all new WARP device profiles.
* Improvement to limit idle connections in [Gateway with DoH mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) to avoid unnecessary resource usage that can lead to DoH requests not resolving.
* Improvements to maintain client connectivity during network changes.
* The WARP client now supports macOS Tahoe (version 26.0).

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.6.1335.0

**Version:**  macOS 2025.6.1335.0 **Date:**  2025-08-19 **Size:** 108 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.6.1335.0) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement for faster client connectivity on high-latency captive portal networks.
* Fixed an issue where recursive CNAME records could cause intermittent WARP connectivity issues.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.5.943.0

**Version:**  macOS 2025.5.943.0 **Date:**  2025-07-23 **Size:** 96.7 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.5.943.0) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* WARP proxy mode now uses the operating system's DNS settings. Changes made to system DNS settings while in proxy mode require the client to be turned off then back on to take effect.
* Fixed an issue affecting clients in Split Tunnel Include mode, where access to split-tunneled traffic was blocked after reconnecting the client.
* For macOS deployments, the WARP client can now be managed using an `mdm.xml` file placed in `/Library/Application Support/Cloudflare/mdm.xml`. This new configuration option offers an alternative to the still supported method of deploying a managed plist through an MDM solution.

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.
* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

macOS 2025.5.893.0

**Version:**  macOS 2025.5.893.0 **Date:**  2025-06-30 **Size:** 95.5 MB 

[Download](https://downloads.cloudflareclient.com/v1/download/macos/version/2025.5.893.0) 

#### Release notes

This release contains improvements and new exciting features, including [post-quantum cryptography](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum). By tunneling your corporate network traffic over Cloudflare, you can now gain the immediate protection of post-quantum cryptography without needing to upgrade any of your individual corporate applications or systems.

**Changes and improvements**

* Fixed an issue where WARP sometimes failed to automatically relaunch after updating.
* Fixed a device registration issue causing WARP connection failures when changing networks.
* Captive portal improvements and fixes:  
   * Captive portal sign in notifications will now be sent through operating system notification services.  
   * Fix for firewall configuration issue affecting clients in DoH only mode.
* Improved the connectivity status message in the client GUI.
* The WARP client now applies post-quantum cryptography end-to-end on enabled devices accessing resources behind a Cloudflare Tunnel. This feature can be [enabled by MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum).
* Improvement to handle client configuration changes made by an MDM while WARP is not running.
* Fixed an issue affecting Split Tunnel Include mode, where traffic outside the tunnel was blocked when switching between Wi-Fi and Ethernet networks.
* Improvement for WARP connectivity issues on macOS due to the operating system not accepting DNS server configurations.
* Added a WARP client device posture check for SAN attributes to the [client certificate check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/).

**Known issues**

* macOS Sequoia: Due to changes Apple introduced in macOS 15.0.x, the WARP client may not behave as expected. Cloudflare recommends the use of macOS 15.4 or later.

## Linux

Support for Cloudflare Mesh on RHEL 9

Starting with Cloudflare One Client version 2026.3.846.0, [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) functionality is supported for both RHEL 9 and RHEL 8, whereas full Cloudflare One Client functionality is currently only supported on RHEL 8\. This note will be removed once RHEL 9 support is complete.

[ Package repository ](https://pkg.cloudflareclient.com/) 

| **OS version**             | CentOS 8, RHEL 8, RHEL 9 [1](#user-content-fn-1), Debian 12, Debian 13, Fedora 34, Fedora 35, Ubuntu 22.04 LTS, Ubuntu 24.04 LTS |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                                                                                |
| **HD space**               | 75 MB                                                                                                                            |
| **Memory**                 | 35 MB                                                                                                                            |
| **Network interface type** | Wi-Fi or LAN                                                                                                                     |
| **MTU**                    | 1381 bytes recommended [2](#user-content-fn-2)                                                                                   |

## Footnotes

1. On RHEL 9 and later, enable the [Extra Packages for Enterprise Linux (EPEL) ↗](https://docs.fedoraproject.org/en-US/epel/) repository (`sudo dnf install epel-release`) before installing `cloudflare-warp`. EPEL provides dependencies required by the client UI. [↩](#user-content-fnref-1)
2. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-2)

Latest release

**Version:**  Linux 2026.4.1390.0 **Date:**  2026-05-26 **Size:** 79.9 MB 

 CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Debian 13 (arm64)  Debian 13 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2026.4.1390.0) 

#### Release notes

This release introduces the new Cloudflare One Client UI for Linux! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Official support for RHEL 9 has been added for Cloudflare Mesh nodes. To install the RHEL 9 package, the Extra Packages for Enterprise Linux (EPEL) repository must be active, as it contains dependencies required for the tray icon and captive portal webview.
* Fixed a proxy mode connection stall issue.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

Previous version history (10)

Linux 2026.4.1350.0

**Version:**  Linux 2026.4.1350.0 **Date:**  2026-05-11 **Size:** 79.9 MB 

 CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Debian 13 (arm64)  Debian 13 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2026.4.1350.0) 

#### Release notes

This release introduces the new Cloudflare One Client UI for Linux! You can expect a cleaner and more intuitive design as well as easier access to common actions and information. Here are some of the many things we have found our users appreciate:

* Right click context menu to access the most common client actions quickly
* Built-in captive portal login experience

**Changes and improvements**

* Added a new CLI command: warp-cli mdm refresh. This command executes an immediate refresh of the Mobile Device Management (MDM) configuration file.
* Official support for RHEL 9 has been added for Cloudflare Mesh nodes. To install the RHEL 9 package, the Extra Packages for Enterprise Linux (EPEL) repository must be active, as it contains dependencies required for the tray icon and captive portal webview.

**Known issues**

* Registration may hang at "Checking your organization configuration" due to IPC errors. A system reboot should resolve the error, allowing registration to proceed.
* Split tunnel list configuration is not available in the new UI. Management of split tunnel entries is currently only possible via `warp-cli tunnel ip` and `warp-cli tunnel host`. UI support will be added in a future release.

Linux 2026.3.846.0

**Version:**  Linux 2026.3.846.0 **Date:**  2026-04-02 **Size:** 57.2 MB 

 CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 11 (arm64)  Debian 11 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Debian 13 (arm64)  Debian 13 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 20.04 (arm64)  Ubuntu 20.04 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2026.3.846.0) 

#### Release notes

This release contains minor fixes and improvements.

The next stable release for Linux will introduce the new Cloudflare One Client UI, providing a cleaner and more intuitive design as well as easier access to common actions and information.

**Changes and improvements**

* Empty MDM files are now rejected instead of being incorrectly accepted as a single MDM config.
* Fixed an issue in local proxy mode where the client could become unresponsive due to upstream connection timeouts.
* Fixed an issue where the emergency disconnect status of a prior organization persisted after a switch to a different organization.
* Consumer-only CLI commands are now clearly distinguished from Zero Trust commands.
* Added detailed QUIC connection metrics to diagnostic logs for better troubleshooting.
* Added monitoring for tunnel statistics collection timeouts.
* Switched tunnel congestion control algorithm for local proxy mode to Cubic for improved reliability across platforms.
* Fixed initiating managed network detections checks when no network is available, which caused device profile flapping.

Linux 2026.1.150.0

**Version:**  Linux 2026.1.150.0 **Date:**  2026-02-24 **Size:** 55.1 MB 

 CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 11 (arm64)  Debian 11 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Debian 13 (arm64)  Debian 13 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 20.04 (arm64)  Ubuntu 20.04 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2026.1.150.0) 

#### Release notes

This release contains minor fixes and improvements.

WARP client version 2025.8.779.0 introduced an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com).

**Changes and improvements**

* Fixed an issue causing failure of the [local network exclusion](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion) feature when configured with a timeout of `0`.
* Improvement for more accurate reporting of device colocation information in the Cloudflare One dashboard.
* Fixed an issue where misconfigured DEX HTTP tests prevented new registrations.
* Fixed issues causing DNS requests to fail with clients in Traffic and DNS mode or DNS only mode.

Linux 2025.10.186.0

**Version:**  Linux 2025.10.186.0 **Date:**  2026-01-13 **Size:** 52 MB 

 CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 11 (arm64)  Debian 11 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Debian 13 (arm64)  Debian 13 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 20.04 (arm64)  Ubuntu 20.04 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2025.10.186.0) 

#### Release notes

This release contains minor fixes, improvements, and new features, including the ability to manage WARP client connectivity for all devices in your fleet using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect).

WARP client version 2025.8.779.0 introduced an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com).

**Changes and improvements**

* The [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) feature has been fixed for devices running WARP client version 2025.4.929.0 and newer. Previously, these devices could experience failures with Local Domain Fallback unless a fallback server was explicitly configured. This configuration is no longer a requirement for the feature to function correctly.
* Linux [disk encryption posture check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/disk-encryption/) now supports non-filesystem encryption types like `dm-crypt`.
* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) now supports transparent HTTP proxying in addition to CONNECT-based proxying.
* Fixed an issue where the GUI becomes unresponsive when the **Re-Authenticate in browser** button is clicked.
* Added a new feature to manage WARP client connectivity for all devices using an [external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/emergency-disconnect/#set-up-external-emergency-disconnect). This feature allows administrators to send a global signal from an on-premises HTTPS endpoint that force disconnects or reconnects all WARP clients in an account based on configuration set on the endpoint.

Linux 2025.9.558.0

**Version:**  Linux 2025.9.558.0 **Date:**  2025-11-11 **Size:** 54.7 MB 

 CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 11 (arm64)  Debian 11 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Debian 13 (arm64)  Debian 13 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 20.04 (arm64)  Ubuntu 20.04 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2025.9.558.0) 

#### Release notes

This release contains minor fixes, improvements, and new features including [Path Maximum Transmission Unit Discovery (PMTUD)](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery). When PMTUD is enabled, the client will dynamically adjust packet sizing to optimize connection performance. There is also a new connection status message in the GUI to inform users that the local network connection may be unstable. This will make it easier to diagnose connectivity issues.

WARP client version 2025.8.779.0 introduced an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com/).

**Changes and improvements**

* The GUI now displays the health of the tunnel and DNS connections by showing a connection status message when the network may be unstable. This will make it easier to diagnose connectivity issues.
* Fixed an issue where deleting a registration was erroneously reported as having failed.
* Path Maximum Transmission Unit Discovery (PMTUD) may now be used to discover the effective MTU of the connection. This allows the WARP client to improve connectivity optimized for each network. PMTUD is disabled by default. To enable it, refer to the [PMTUD documentation](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/#enable-path-mtu-discovery).

Linux 2025.8.779.0

**Version:**  Linux 2025.8.779.0 **Date:**  2025-10-07 **Size:** 51.4 MB 

 CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 11 (arm64)  Debian 11 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Debian 13 (arm64)  Debian 13 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 20.04 (arm64)  Ubuntu 20.04 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2025.8.779.0) 

#### Release notes

This release contains significant fixes and improvements including an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com/).

**Changes and improvements**

* [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode) has been enhanced for even faster resolution. Proxy mode now supports SOCKS4, SOCK5, and HTTP CONNECT over an L4 tunnel with custom congestion control optimizations instead of the previous L3 tunnel to Cloudflare's network. This has more than doubled Proxy mode throughput in lab speed testing, by an order of magnitude in some cases.
* The MASQUE protocol is now the only protocol that can use [Proxy mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#local-proxy-mode). If you previously configured a device profile to use Proxy mode with Wireguard, you will need to select a new WARP mode or switch to the MASQUE protocol. Otherwise, all devices matching the profile will lose connectivity.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

Linux 2025.7.176.0

**Version:**  Linux 2025.7.176.0 **Date:**  2025-09-30 **Size:** 52.7 MB 

 CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 11 (arm64)  Debian 11 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Debian 13 (arm64)  Debian 13 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 20.04 (arm64)  Ubuntu 20.04 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/centos8-arm/version/2025.7.176.0) 

#### Release notes

This release contains minor fixes and improvements including an updated public key for Linux packages. The public key must be updated if it was installed before September 12, 2025 to ensure the repository remains functional after December 4, 2025\. Instructions to make this update are available at [pkg.cloudflareclient.com](https://pkg.cloudflareclient.com/).

**Changes and improvements**

* MASQUE is now the default [tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol) for all new WARP device profiles.
* Improvement to limit idle connections in [Gateway with DoH mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#dns-only-mode) to avoid unnecessary resource usage that can lead to DoH requests not resolving.
* Improvements to maintain [Global WARP override](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-warp-on-all-devices) settings when [switching between organizations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/#switch-organizations-in-the-cloudflare-one-client).
* Improvements to maintain client connectivity during network changes.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

Linux 2025.6.1335.0

**Version:**  Linux 2025.6.1335.0 **Date:**  2025-08-19 **Size:** 50.6 MB 

 buster-arm  buster-intel  CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 11 (arm64)  Debian 11 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 20.04 (arm64)  Ubuntu 20.04 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/buster-arm/version/2025.6.1335.0) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* Fixed an issue preventing devices from reaching split-tunneled traffic even when WARP was disconnected.
* Fix to prevent WARP from re-enabling its firewall rules after a user-initiated disconnect.
* Improvement for faster client connectivity on high-latency captive portal networks.
* Fixed an issue where recursive CNAME records could cause intermittent WARP connectivity issues.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

Linux 2025.5.943.0

**Version:**  Linux 2025.5.943.0 **Date:**  2025-07-23 **Size:** 44.3 MB 

 buster-arm  buster-intel  CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 11 (arm64)  Debian 11 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 20.04 (arm64)  Ubuntu 20.04 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/buster-arm/version/2025.5.943.0) 

#### Release notes

This release contains minor fixes and improvements.

**Changes and improvements**

* WARP proxy mode now uses the operating system's DNS settings. Changes made to system DNS settings while in proxy mode require the client to be turned off then back on to take effect.
* Fixed an issue affecting clients in Split Tunnel Include mode, where access to split-tunneled traffic was blocked after reconnecting the client.

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

Linux 2025.5.893.0

**Version:**  Linux 2025.5.893.0 **Date:**  2025-06-30 **Size:** 44.8 MB 

 buster-arm  buster-intel  CentOS / RHEL 8 (arm64)  CentOS / RHEL 8 (x86-64)  Debian 11 (arm64)  Debian 11 (x86-64)  Debian 12 (arm64)  Debian 12 (x86-64)  Fedora 34 (arm64)  Fedora 34 (x86-64)  Fedora 35 (arm64)  Fedora 35 (x86-64)  Ubuntu 20.04 (arm64)  Ubuntu 20.04 (x86-64)  Ubuntu 22.04 (arm64)  Ubuntu 22.04 (x86-64)  Ubuntu 24.04 (arm64)  Ubuntu 24.04 (x86-64) [Download](https://downloads.cloudflareclient.com/v1/download/buster-arm/version/2025.5.893.0) 

#### Release notes

This release contains improvements and new exciting features, including [post-quantum cryptography](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum). By tunneling your corporate network traffic over Cloudflare, you can now gain the immediate protection of post-quantum cryptography without needing to upgrade any of your individual corporate applications or systems.

**Changes and improvements**

* Fixed a device registration issue causing WARP connection failures when changing networks.
* Captive portal improvements and fixes:  
   * Captive portal sign in notifications will now be sent through operating system notification services.  
   * Fix for firewall configuration issue affecting clients in DoH only mode.
* Improved the connectivity status message in the client GUI.
* The WARP client now applies post-quantum cryptography end-to-end on enabled devices accessing resources behind a Cloudflare Tunnel. This feature can be [enabled by MDM](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/#enable%5Fpost%5Fquantum).
* Improvement to handle client configuration changes made by MDM while WARP is not running.
* Fixed an issue affecting Split Tunnel Include mode, where traffic outside the tunnel was blocked when switching between Wi-Fi and Ethernet networks.
* Added a WARP client device posture check for SAN attributes to the [client certificate check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/warp-client-checks/client-certificate/).

**Known issues**

* Devices using WARP client 2025.4.929.0 and up may experience Local Domain Fallback failures if a fallback server has not been configured. To configure a fallback server, refer to [Route traffic to fallback server](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#route-traffic-to-fallback-server).

## iOS

| **OS version** | iOS 11+ |
| -------------- | ------- |

[Download from the iOS App Store ↗](https://apps.apple.com/us/app/cloudflare-one-agent/id6443476492) or search for "Cloudflare One Agent".

Migrate from 1.1.1.1

The legacy iOS client, [1.1.1.1: Faster Internet ↗](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), has been replaced by the Cloudflare One Agent. Learn more in our [migration guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/cloudflare-one-agent-migration/).

## Android

| **OS version** | 5.0+ |
| -------------- | ---- |

[Download from the Google Play store ↗](https://play.google.com/store/apps/details?id=com.cloudflare.cloudflareoneagent) or search for "Cloudflare One Agent".

Migrate from 1.1.1.1

The legacy Android client, [1.1.1.1 + WARP: Safer Internet ↗](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone), has been replaced by the Cloudflare One Agent. Learn more in our [migration guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/cloudflare-one-agent-migration/).

## ChromeOS

| **OS version** | Chromebooks manufactured after 2019 |
| -------------- | ----------------------------------- |

Chromebooks are supported by our [Android app](#android). All Chromebooks made after 2019 should fully support our Android app. If you have a Chromebook made before 2019, [refer to this list ↗](https://www.chromium.org/chromium-os/chrome-os-systems-supporting-android-apps/) to verify that your device is supported.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#page","headline":"Download Cloudflare One Client stable releases · Cloudflare One docs","description":"Reference information for Download Cloudflare One Client stable releases in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/","name":"Download Cloudflare One Client stable releases"}}]}
```
