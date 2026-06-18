---
title: Common issues
description: Reference information for Common issues in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Common issues

This section covers the most common issues you might encounter as you deploy the Cloudflare One Client (formerly WARP) in your organization, or turn on new features that interact with the client.

Troubleshoot the Cloudflare One Client

For step-by-step guidance on diagnosing and resolving Cloudflare One Client issues, refer to the [Cloudflare One Client troubleshooting guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/). The guide covers:

* How to collect diagnostic logs via the Cloudflare dashboard or CLI
* How to review key configuration files
* Common misconfigurations and their fixes
* Best practices for filing support tickets

## Connectivity and registration

### Stuck on "Disconnected" or frequent flapping

If the Cloudflare One Client is stuck in the `Disconnected` state or frequently changes between `Connected` and `Disconnected`, this indicates that the client cannot establish a connection to Cloudflare's global network.

In your [client diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/), `daemon.log` will typically show one or more of the following errors:

* Happy Eyeball checks failing: `All Happy Eyeballs checks failed`.
* Connectivity checks timing out for `connectivity.cloudflareclient.com`.

**Common causes**:

* **Firewall blocks**: A local or network firewall is blocking the [required IP addresses](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).
* **VPN interference**: A third-party VPN is fighting for control over the routing table or DNS. Refer to the [VPN compatibility guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/vpn/).
* **ISP blocks**: Your country or ISP may be explicitly blocking client traffic.

### Registration error (Authentication Expired)

When registering the client, you may see `Authentication Expired` or `Registration error. Please try again later`.

**Common causes**:

* **System clock out of sync**: Your computer system clock must be properly synced via NTP. If your clock is off by more than 20 seconds, the authentication token (JWT) will be invalid.
* **Prompt timeout**: You must complete the registration in your browser and return to the client within one minute of the prompt.

### (Linux) DNS connectivity check failed

This error often means that `systemd-resolved` is not allowing the client to resolve DNS requests. In `daemon.log`, you will see `DNS connectivity check failed to resolve host="warp-svc."`.

**Solution**:

1. Add `ResolveUnicastSingleLabel=yes` to `/etc/systemd/resolved.conf`.
2. Ensure no other DNS servers are explicitly configured in that file.
3. Restart the service: `sudo systemctl restart systemd-resolved.service`.

### (Mac/Linux) Invalid character in resolv.conf

The client cannot parse `resolv.conf` files containing invalid characters like `!@#$%^&*()<>?` in `search` directives. Remove these characters to restore service.

## Browser and certificate issues

### "Your connection is not private" or untrusted warnings

Advanced security features require the [Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) to be trusted on the device.

* **Chrome/Edge**: These browsers cache certificates. If you installed the certificate while the browser was running, you must restart the browser.
* **Root certificate expiry**: The default Cloudflare root certificate expired on February 2, 2025\. If you are seeing errors, [generate and activate a new certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/#generate-a-cloudflare-root-certificate) in the dashboard.

### 2025 Certificate migration

Starting with version 2024.12.554.0, the client can automatically install new certificates as soon as they are **Available** in the dashboard. For older versions, certificates had to be marked **In-Use** first. Ensure **Install CA to system certificate store** is enabled in your [Device settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/).

## Windows-specific issues

### Windows shows "No Internet access"

This is often a cosmetic error with Windows Network Connectivity Status Indicator (NCSI). Apps like Outlook or JumpCloud may refuse to connect because of this status.

**Solution**: Configure NCSI to detect the client's local DNS proxy and use active probing by setting these registry keys to `1`:

* `HKEY_LOCAL_MACHINE\SOFTWARE\POLICIES\MICROSOFT\Windows\NetworkConnectivityStatusIndicator\UseGlobalDNS`
* `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet\EnableActiveProbing`

### Setup Wizard ends prematurely

This usually indicates a missing dependency, such as .NET Framework `4.7.2` or later. Legacy systems (like Windows 10 Enterprise 1607) may require a manual update of the [.NET Framework Runtime ↗](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net472).

## Other environment issues

### WSL2 connectivity

If WSL2 loses connectivity, check your [split tunnel configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/). The IP range used by WSL to communicate with the host may be accidentally included in the tunnel. Exclude the WSL network range to restore connectivity.

### SMTP port 25 blocked

The client blocks outgoing traffic on port `25` to prevent spam and reputational harm to IP adresses used by customers. Use port `587` or `465` for encrypted email.

### Admin override codes expired

[Admin override codes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-admin-override-codes) are time-sensitive and adhere to fixed-hour blocks. A code generated at 9:30 AM with a 1-hour timeout will expire at 10:00 AM because its validity is counted within the 9:00 AM-10:00 AM window.

---

## Next steps

* [Diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/) \- Learn how to collect logs for support.
* [Known limitations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/known-limitations/) \- Review unsupported features and environments.
* [Troubleshooting Cloudflare One](https://developers.cloudflare.com/cloudflare-one/troubleshooting/) \- View troubleshooting guides for other products.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#page","headline":"Common issues · Cloudflare One docs","description":"Reference information for Common issues in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/","name":"Troubleshoot the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/","name":"Common issues"}}]}
```
