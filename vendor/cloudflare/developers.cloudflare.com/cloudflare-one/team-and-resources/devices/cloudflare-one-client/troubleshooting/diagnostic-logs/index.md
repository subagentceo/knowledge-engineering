---
title: Diagnostic logs
description: Reference information for Diagnostic logs in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Diagnostic logs

The Cloudflare One Client (formerly WARP) provides diagnostic logs that you can use to troubleshoot connectivity issues on a device.

Chapters

* ![Introduction](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=0s)  
 **Introduction** 0s
* ![What are warp-diag files?](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=44s)  
 **What are warp-diag files?** 44s
* ![How to download and navigate warp-diag files](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=76s)  
 **How to download and navigate warp-diag files** 1m16s
* ![warp-status.txt](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=126s)  
 **warp-status.txt** 2m06s
* ![warp-settings.txt](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=149s)  
 **warp-settings.txt** 2m29s
* ![daemon.log](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=217s)  
 **daemon.log** 3m37s
* ![Addition tips](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=487s)  
 **Addition tips** 8m07s
* ![Conclusion](https://customer-1mwganm1ma0xgnmj.cloudflarestream.com/c29964ab3dcf7c3432ebb2b4e93c3aca/thumbnails/thumbnail.jpg?fit=crop&time=523s)  
 **Conclusion** 8m43s

## macOS/Windows/Linux

### Collect logs via the CLI

To view client logs on desktop devices:

* [ macOS ](#tab-panel-7501)
* [ Windows ](#tab-panel-7502)
* [ Linux ](#tab-panel-7503)

1. Open a Terminal window.
2. Run the `warp-diag` tool:  
Terminal window  
```  
warp-diag  
```

This will place a `warp-debugging-info-<date>-<time>.zip` on your desktop.

1. Open a Command Prompt or PowerShell window.
2. Run the `warp-diag` tool:  
Terminal window  
```  
C:\Users\JohnDoe>warp-diag  
```

This will place a `warp-debugging-info-<date>-<time>.zip` on your desktop.

1. Open a Terminal window.
2. Run the `warp-diag` tool:  
Terminal window  
```  
warp-diag  
```

This will place a `warp-debugging-info-<date>-<time>.zip` in the same folder you ran the command from.

### Collect logs via the dashboard

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode  Traffic only mode                                                                                            | All plans                                                       |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2024.12.492.0          |
| macOS    | ✅            | 2024.12.492.0          |
| Linux    | ✅            | 2024.12.492.0          |
| iOS      | ❌            |                        |
| Android  | ❌            |                        |
| ChromeOS | ❌            |                        |

You can collect client diagnostic logs remotely from the Zero Trust dashboard by using Digital Experience Monitoring (DEX) [remote captures](https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/).

Devices must be actively connected to the Internet for remote captures to run.

To capture data from a remote device:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **DEX** \> **Remote captures**.
2. Select up to 10 devices that you want to run a capture on. Devices must be [registered](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) in your Zero Trust organization.
3. Configure the types of captures to run.  
   * **Packet captures (PCAP)**: Performs packet captures for traffic outside of the WARP tunnel (default network interface) and traffic inside of the WARP tunnel ([virtual interface](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#ip-traffic)).  
   * **Device diagnostic logs**: Generates a [Cloudflare One Client diagnostic log](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#warp-diag-logs) of the past 96 hours. To include a routing test for all IPs and domains in your [Split Tunnel configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/), select **Test all routes**.  
   Note  
   **Test all routes** will extend the time for diagnostics to run and may temporarily impact device performance during the test.
4. Select **Run diagnostics**.

DEX will now send capture requests to the configured devices. If the Cloudflare One Client is disconnected, the capture will time out after 10 minutes.

#### Download remote captures

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **DEX** \> **Remote captures**.
2. Find a successful capture.
3. Select the three-dot menu and select **Download**.

This will download a ZIP file to your local machine called `<capture-id>.zip`. DEX will store capture data according to our [log retention policy](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention).

#### Diagnostics analyzer (beta)

The diagnostics analyzer highlights what Cloudflare determines to be the most important detection events in a `warp-diag` log. You can use the detection report to help parse your [log files](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#warp-diag-logs) and identify the root cause of client issues. The diagnostics analyzer is only available for logs [collected via the dashboard](#collect-logs-via-the-dashboard).

To access the diagnostics analyzer:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **DEX** \> **Remote captures**.
2. Locate an existing `warp-diag` log from the list or select **Run diagnostics** to generate a new `warp-diag` log.
3. Select the three dots for the `warp-diag` log that you want to analyze, then select **View Device Diag**.  
The **Overview** tab will display an [AI-generated summary](https://developers.cloudflare.com/fundamentals/reference/cloudy-ai-agent/) of the results, a list of detection events, and basic device information.  
Explanation of the fields  
| Field                         | Description                                                                                                                                                                                                                                                                                               |  
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| Detection type                | A common Cloudflare One Client issue that can appear in the diagnostic logs.                                                                                                                                                                                                                              |  
| Occurrences                   | Number of times an issue was detected in the logs.                                                                                                                                                                                                                                                        |  
| Severity level                | Indicates the impact of the issue on Cloudflare One Client functionality. The severity levels are: **Critical**: Issue causes complete loss of functionality. **Warning**: Issue causes degraded functionality but core features should still work. **No detection**: Issue was not detected in the logs. |  
| Operating system              | OS and OS version of the device.                                                                                                                                                                                                                                                                          |  
| Cloudflare One Client version | [Cloudflare One Client release version](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/)                                                                                                                                                      |  
| Profile ID                    | [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) UUID                                                                                                                                                       |  
| Service mode                  | [Client mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/)                                                                                                                                                                         |  
| Configuration name            | Name of the [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/switch-organizations/) that the Cloudflare One Client is connected to.                                                                  |  
| Device ID                     | ID generated by the Cloudflare One Client.                                                                                                                                                                                                                                                                |
4. Select a detection type for more information about the event and recommended next steps.

Cloudflare DEX will store the `warp-diag` log and its detection report per our [log retention policy](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention). To save a copy onto your local machine, [download the log file](#download-remote-captures) and go to the **JSON file** tab to copy the report in JSON format.

### `warp-diag` logs

The `warp-debugging-info-<date>-<time>.zip` archive contains the following files:

| File name                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| .qlog                                                                     | QLog files used to debug MASQUE connection issues.                                                                                                                                                                                                                                                                                                                                         |
| .pcap                                                                     | Packet capture (PCAP) files manually generated using warp-cli debug pcap commands, or automatically generated via [extra debug logging](#extra-debug-logging).                                                                                                                                                                                                                             |
| .etl                                                                      | Windows-only trace files generated by [extra debug logging](#extra-debug-logging), containing packet captures, netsh TCPIP traces, and Windows Filtering Platform (WFP) captures.                                                                                                                                                                                                          |
| .xml                                                                      | Windows-only WFP trace files generated by [extra debug logging](#extra-debug-logging).                                                                                                                                                                                                                                                                                                     |
| alternate-networks-check.txt                                              | Connectivity status for each [managed network](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/managed-networks/).                                                                                                                                                                                                             |
| boringtun.log                                                             | Log for the WARP tunnel that serves traffic from the device to Cloudflare's global network.                                                                                                                                                                                                                                                                                                |
| bound-dns-ports.txt                                                       | Active processes on port 53.                                                                                                                                                                                                                                                                                                                                                               |
| captive-portal-hotspot-detect.txt                                         | HTTP response of captive.apple.com                                                                                                                                                                                                                                                                                                                                                         |
| connectivity.txt                                                          | DNS resolution and HTTP trace requests to [validate a successful connection](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#connectivity-checks). Can be used to determine whether traffic is routing through the WARP tunnel.                                                                                     |
| \*-checks-\*.txt                                                          | One-shot connectivity checks that run when [extra debug logging](#extra-debug-logging) is first enabled. These contain the same information as connectivity.txt.                                                                                                                                                                                                                           |
| daemon\_dns.log                                                           | Contains detailed DNS logs if **Log DNS queries** is enabled in the Cloudflare One Client.                                                                                                                                                                                                                                                                                                 |
| daemon.log                                                                | Detailed log of all actions performed by the Cloudflare One Client, including all communication between the device and Cloudflare's global network. **Note:** This is the most useful debug log.                                                                                                                                                                                           |
| date.txt                                                                  | Date and time (UTC) when you ran the warp-diag command.                                                                                                                                                                                                                                                                                                                                    |
| dex.log                                                                   | Logs related to [DEX test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) execution.                                                                                                                                                                                                                                                                                |
| dhcp-lease-plists.txt                                                     | DHCP lease information from /var/db/dhcpclient/leases/ for each interface that has a DHCP lease.                                                                                                                                                                                                                                                                                           |
| dhcp-lease.txt                                                            | DHCP lease information from ipconfig (macOS) or nmcli (Linux).                                                                                                                                                                                                                                                                                                                             |
| dig.txt                                                                   | DNS lookup query output for cloudflare.com and apple.com.                                                                                                                                                                                                                                                                                                                                  |
| dns\_stats.log                                                            | Statistics on the DNS queries received and resolved by the Cloudflare One Client, generated every two minutes.                                                                                                                                                                                                                                                                             |
| dns-check.txt                                                             | Verifies that the Cloudflare One Client DNS servers are set as system default. For [operating modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) where DNS filtering is enabled, this file contains the IPs of the local DNS proxy (127.0.2.2:0, 127.0.2.3:0, \[fd01:db8:1111::2\]:0, and \[fd01:db8:1111::3\]:0). |
| dynamic.log                                                               | Reserved for use by Cloudflare Support.                                                                                                                                                                                                                                                                                                                                                    |
| etc-hosts.txt                                                             | Static DNS config of device.                                                                                                                                                                                                                                                                                                                                                               |
| firewall-pfctl-all.txt                                                    | Packet filter (pf) firewall configuration (macOS only).                                                                                                                                                                                                                                                                                                                                    |
| firewall-rules.txt                                                        | The [system firewall rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#system-firewall) configured by the Cloudflare One Client.                                                                                                                                                       |
| gui-launcher.log                                                          | macOS console log showing application launch.                                                                                                                                                                                                                                                                                                                                              |
| gui-log.log                                                               | Log file for the GUI app that users interact with.                                                                                                                                                                                                                                                                                                                                         |
| hostname.txt                                                              | Name of the device.                                                                                                                                                                                                                                                                                                                                                                        |
| ifconfig.txt ipconfig.txt                                                 | IP configuration of each network interface.                                                                                                                                                                                                                                                                                                                                                |
| installed\_applications.txt                                               | List of installed applications.                                                                                                                                                                                                                                                                                                                                                            |
| installed\_cert.pem                                                       | [Root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) installed on the system.                                                                                                                                                                                                                                           |
| installer.log msi-installer.log                                           | MSI or PKG installation log.                                                                                                                                                                                                                                                                                                                                                               |
| InstallHistory.plist macos\_installer.log                                 | macOS software installation logs.                                                                                                                                                                                                                                                                                                                                                          |
| ipc.log                                                                   | Logs IPC communication between the GUI and daemon. Useful for situations where the GUI crashes or is unable to communicate with the daemon.                                                                                                                                                                                                                                                |
| kernel-modules.txt                                                        | List of loaded kernel modules (macOS and Linux) or drivers (Windows).                                                                                                                                                                                                                                                                                                                      |
| launchd-dumpstate.txt                                                     | Current state of the macOS launchd system including the loaded jobs, their status, and dependencies.                                                                                                                                                                                                                                                                                       |
| local\_policy.redacted.txt mdm.plist mdm.xml                              | [Managed deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) on the device.                                                                                                                                                                                                    |
| lsb-release.txt                                                           | Output from the lsb\_release command (Linux only).                                                                                                                                                                                                                                                                                                                                         |
| netstat.txt routetable.txt                                                | Routing table used by the device.                                                                                                                                                                                                                                                                                                                                                          |
| netstat-v6.txt                                                            | IPv6 routing table (Linux only).                                                                                                                                                                                                                                                                                                                                                           |
| platform.txt                                                              | Operating system of the device.                                                                                                                                                                                                                                                                                                                                                            |
| ps.txt processes.txt                                                      | List of all active processes on the device when warp-diag was run.                                                                                                                                                                                                                                                                                                                         |
| resolv.conf                                                               | The contents of the /etc/resolv.conf file on Mac/Linux, where system DNS servers are configured.                                                                                                                                                                                                                                                                                           |
| route.txt                                                                 | Output from the ip route get command, used to verify that network traffic is going over the correct interface. You can optionally use the warp-diag --enable-all-routes flag to include tests for all IPs and domains in your Split Tunnel configuration.                                                                                                                                  |
| route-change.log                                                          | Changes to the IP routing table.                                                                                                                                                                                                                                                                                                                                                           |
| scutil-dns.txt                                                            | DNS configuration on macOS/Linux (available in ipconfig.txt on Windows).                                                                                                                                                                                                                                                                                                                   |
| scutil-networkinfo.txt                                                    | IPv4 and IPv6 network interface configuration on macOS (available in interfaces-config.txt on Windows).                                                                                                                                                                                                                                                                                    |
| scutil-proxy.txt                                                          | Proxy configuration on macOS/Linux (available in ipconfig.txt on Windows).                                                                                                                                                                                                                                                                                                                 |
| snapshots-collection.log                                                  | Logs generated when collecting snapshots/\*.log. Used to debug why the Cloudflare One Client failed to collect a snapshot.                                                                                                                                                                                                                                                                 |
| snapshots/\*.log                                                          | Diagnostics generated when an error occurs.                                                                                                                                                                                                                                                                                                                                                |
| stats.log                                                                 | Uptime and throughput stats for the WARP tunnel, generated every two minutes.                                                                                                                                                                                                                                                                                                              |
| sw-vers.txt                                                               | Operating system of the device.                                                                                                                                                                                                                                                                                                                                                            |
| sysinfo.json                                                              | CPU and memory usage when warp-diag was run. This information is useful for determining whether slow speeds are due to heavy system load.                                                                                                                                                                                                                                                  |
| system-extension-diagnostics.txt                                          | Status and health of loaded system extensions (macOS only).                                                                                                                                                                                                                                                                                                                                |
| systeminfo.txt system-profile.txt                                         | System software overview.                                                                                                                                                                                                                                                                                                                                                                  |
| System.evtx                                                               | Windows system event log.                                                                                                                                                                                                                                                                                                                                                                  |
| taskdump.log                                                              | If the daemon hangs, this file will contain a dump of the currently running processes. This is helpful in debugging hangs, deadlocks, and tasks.                                                                                                                                                                                                                                           |
| timezone.txt                                                              | Local timezone of the device specified as a UTC offset.                                                                                                                                                                                                                                                                                                                                    |
| traceroute.txt                                                            | Traceroute to the [WARP ingress IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#warp-ingress-ip) showing the path from the device to Cloudflare's global network.                                                                                                                                              |
| \*-traceroute-\*.txt                                                      | One-shot traceroute to Tunnel edge connection IPs, Device API endpoint hostname and IPs, and DNS resolver hostname and IPs; started when [extra debug logging](#extra-debug-logging) is first enabled.                                                                                                                                                                                     |
| uname.txt                                                                 | Linux-only system information including kernel version.                                                                                                                                                                                                                                                                                                                                    |
| v4interfaces.txt v4subinterfaces.txt v6interfaces.txt v6subinterfaces.txt | IPv4 and IPv6 network configuration on Windows.                                                                                                                                                                                                                                                                                                                                            |
| version.txt                                                               | [Cloudflare One Client version](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) installed on the device.                                                                                                                                                                                                                      |
| warp-account.txt                                                          | Cloudflare One Client device enrollment information.                                                                                                                                                                                                                                                                                                                                       |
| warp-bus-metrics.txt                                                      | Metrics for the internal message bus framework used by the Cloudflare One Client.                                                                                                                                                                                                                                                                                                          |
| warp-device-posture.txt                                                   | Current [device posture](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/) status.                                                                                                                                                                                                                                                       |
| warp-dex-data.txt                                                         | Currently configured [DEX tests](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) and their most recent statuses.                                                                                                                                                                                                                                                     |
| warp-dns-fallbacks.txt                                                    | List of default DNS fallbacks used by the WARP DNS proxy.                                                                                                                                                                                                                                                                                                                                  |
| warp-dns-lock.json                                                        | Default DNS providers and network interface information.                                                                                                                                                                                                                                                                                                                                   |
| warp-dns-stats.txt                                                        | Summary of recent DNS queries on the device since dns-stats.log was generated.                                                                                                                                                                                                                                                                                                             |
| warp-network.txt                                                          | Network settings on the device detected by the Cloudflare One Client.                                                                                                                                                                                                                                                                                                                      |
| warp-settings.txt                                                         | [Cloudflare One Client settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) applied to the device.                                                                                                                                                                                                             |
| warp-stats.txt                                                            | Uptime and throughput of the WARP tunnel since stats.log was generated.                                                                                                                                                                                                                                                                                                                    |
| warp-status.txt                                                           | Status of the Cloudflare One Client connection (Connected or Disconnected).                                                                                                                                                                                                                                                                                                                |
| wdutil-info.txt                                                           | Wi-Fi diagnostics (macOS only).                                                                                                                                                                                                                                                                                                                                                            |
| xpc-launchd.log                                                           | Most recent log file for the launchd process on macOS.                                                                                                                                                                                                                                                                                                                                     |

#### Multiple versions of the same log

The `warp-debugging-info` folder may contain multiple versions of the same log, such as `daemon.log`, `daemon.1.log`, and `daemon.2.log`. Since logs can get very long, they are rotated either daily or when they exceed a certain size.

* `<logfile>.log` is the most current log. This is almost always the log you should be looking at, as it shows events that occurred on the day you ran the `warp-diag` command.
* `<logfile>.1.log` shows events from the previous day.
* `<logfile>.2.log` shows events from two days before.

Note

In timestamped logs such as `daemon.log`, the most recent events will appear at the end of the file.

### Extra debug logging

Starting with version 2026.5.0, you can enable extra debug logging with the command `warp-cli debug extra start`. Extra debug logging times out after 10 minutes unless you manually stop it with `warp-cli debug extra stop`.

This enables a few more logging features:

* Packet captures (PCAPs) on all interfaces (on Windows, the original `.etl` file is preserved; other PCAP commands convert it to `.pcap` before removing it)
* QLog files for MASQUE tunnel connections
* DNS logs for [service modes with DNS filtering](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/)
* One-shot connectivity checks (same information as `connectivity.txt`, collected when extra debug logging starts rather than when `warp-diag` runs)
* One-shot traceroutes to:  
   * DNS resolver IPs  
   * DNS resolver hostname  
   * Device API endpoint IPs  
   * Device API endpoint hostname  
   * Tunnel edge connection IPs
* On Windows, if you are an administrator:  
   * [netsh trace ↗](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh-trace) with the `Microsoft-Windows-TCPIP` provider  
   * [WFP capture ↗](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh-wfp)

If extra debug logging is enabled, the command `warp-cli debug extra reconnect` forces the tunnel connection to restart. This can be useful for collecting log information if the tunnel connection fails.

Extra debug logging space requirements

On Windows, log data created by extra debug logging may consume 600 MB of space or more over 10 minutes of collection. The `netsh` TCPIP trace file contains the majority of this data (500 MB), and compresses well into the diagnostic archive.

Extra debug logging on other platforms generates significantly less data.

### Log retention window

Each client log file (such as `connection_stats.log`, `dns_stats.log`, `daemon.log`, `boringtun.log`, `daemon_dns.log`, `dex.log` and `captive-portal.log`) is limited by size and age:

* **Maximum file size:** 10 MB
* **Maximum file age:** 24 hours
* **Maximum number of retained versions per log:** 4 (for example, `daemon.log`, `daemon.1.log`, `daemon.2.log`, and `daemon.3.log`)

Log files may include data from up to 96 hours (four days) prior to when `warp-diag` was run, but only if log activity is minimal. In environments with high logging volume (for example, repeated errors), logs may rotate more frequently, and the captured window could be much shorter (only a few hours).

Always check the timestamps at the end of each log file to verify the time range covered by the diagnostic archive.

Linux log behavior

On Linux, the WARP daemon logs are written to the system logs by the `warp-svc` service.

If you need to adjust the maximum log level or filter what gets logged, you can configure the WARP `systemd` unit file using the [LogLevelMax= option ↗](https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html#LogLevelMax=).

The Cloudflare One Client does not provide an official method to configure logging levels during the installation process.

## iOS/Android/ChromeOS

### Collect logs

To view client logs on mobile devices:

* [ iOS ](#tab-panel-7499)
* [ Android/ChromeOS ](#tab-panel-7500)

1. Open the Cloudflare One Agent app.
2. Go to **Settings** \> **Advanced** \> **Diagnostics**.
3. Collect extension logs:  
   1. From the **Diagnostics** page, select **Console logs** \> **Extension logs**.  
   2. Select **Share** and choose a file sharing method.  
   3. Enter a descriptive file name (such as `extension.log`) if available for your sharing method. Then share or save the file.
4. Collect application logs:  
   1. From the **Diagnostics** page, select **Console logs** \> **Application logs**.  
   2. Select **Share** and choose a file sharing method.  
   3. Enter a descriptive file name (such as `application.log`) if available for your sharing method. Then share or save the file.
5. (Optional) Collect qlogs for devices using the [MASQUE tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol):  
   1. From the **Diagnostics** page, turn on **Enable qlogs**.  
   2. Select **Export QLogs**.  
   3. Enter a descriptive file name (such as `qlogs.zip`) if available for your sharing method. Then share or save the file.

1. Open the Cloudflare One Agent app.
2. Go to **Settings** \> **Advanced** \> **Diagnostics**.
3. Scroll down to the **Debug logs** section.
4. (Optional) Turn on **Enable qlogs** for devices using the [MASQUE tunnel protocol](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#device-tunnel-protocol).
5. Select **Download logs**.
6. Share the `warp-debugging-info-<date>-<time>.zip` file via email, Google Drive, or another installed app.

### Mobile app logs

The following log files are available for iOS, Android, and ChromeOS devices.

#### iOS

| Name                 | Description                                                                                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Extension logs**   | Logs from the core VPN tunnel service, including connection state changes and packet flow operations between the device and Cloudflare's network. Similar to the desktop daemon.log file. |
| **Application logs** | Logs from the iOS app process, including GUI events, setting changes, and API calls.                                                                                                      |
| **Qlogs**            | QUIC protocol event logs used to debug MASQUE/HTTP3 tunnel connections. Archive contains up to 10 .sqlog files named by connection ID.                                                    |

#### Android/ChromeOS

The `warp-debugging-info-<date>-<time>.zip` archive contains the following files:

| Name                     | Description                                                                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| unhandled\_exception.log | Captures errors in the Android application layer that were not caught and could have crashed the app.                                                                                     |
| console.log              | Logs from the Android application layer, including VPN service events, API calls, failed DNS queries, GUI interactions, and setting changes.                                              |
| native\_tunnel.log       | Logs from the core VPN tunnel service, including connection state changes and packet flow operations between the device and Cloudflare's network. Similar to the desktop daemon.log file. |
| <connection\_id>.sqlog   | QUIC protocol event logs used to debug MASQUE/HTTP3 tunnel connections.                                                                                                                   |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/#page","headline":"Diagnostic logs · Cloudflare One docs","description":"Reference information for Diagnostic logs in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging","Video"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/","name":"Troubleshoot the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/","name":"Diagnostic logs"}}]}
```
