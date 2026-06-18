---
title: Client errors
description: Reference information for Client errors in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Client errors

This page lists the error codes that can appear in the Cloudflare One Client (formerly WARP) GUI. If you do not see your error below, refer to [common issues](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/) or [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

Troubleshoot the Cloudflare One Client

For step-by-step guidance on diagnosing and resolving Cloudflare One Client issues, refer to the [Cloudflare One Client troubleshooting guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/). The guide covers:

* How to collect diagnostic logs via the Cloudflare dashboard or CLI
* How to review key configuration files
* Common misconfigurations and their fixes
* Best practices for filing support tickets

![Example of error message in Cloudflare One Client GUI](https://developers.cloudflare.com/_astro/warp-gui-error.vzmG4-Ab_Z22XLik.webp)

## CF\_CAPTIVE\_PORTAL\_TIMED\_OUT

### Symptoms

* Unable to login to a captive portal network
* No Internet connectivity

### Cause

[Captive portal detection](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#captive-portal-detection) is turned on and one of the following issues occurred:

* The user did not complete the captive portal login process within the time limit set by the Cloudflare One Client.
* The captive portal redirected the user to a flow that is not yet supported by the captive portal detection feature.

### Resolution

1. Increase the [captive portal timeout](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#captive-portal-detection) to allow users more time to login.
2. If this does not resolve the issue, allow users to manually [disconnect](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#lock-device-client-switch). We recommend setting an [auto connect](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#auto-connect) value so that the client turns itself back on after a few minutes.

## CF\_CONNECTIVITY\_FAILURE\_UNKNOWN

### Symptoms

* Unable to connect the Cloudflare One Client
* No Internet connectivity
* User may be behind a captive portal

### Cause

The initial [connectivity check](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#connectivity-checks) failed for an unknown reason. Refer to [Unable to connect the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#unable-to-connect-warp) for the most common reasons why this error occurs.

### Resolution

1. Retrieve [client diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/) for the device.
2. Follow the troubleshooting steps in [Unable to connect the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#unable-to-connect-warp).

## CF\_DNS\_LOOKUP\_FAILURE

### Symptoms

* Unable to connect the Cloudflare One Client
* Unable to browse the Internet
* `nslookup` and `dig` commands fail on the device

### Cause

The Cloudflare One Client was unable to resolve hostnames via its [local DNS proxy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#dns-traffic).

### Resolution

1. Verify that the network the user is on has DNS connectivity.
2. Verify that DNS resolution works when the Cloudflare One Client is disabled.
3. Ensure that no third-party tools are interfering with the Cloudflare One Client for control of DNS.
4. Ensure that no third-party tools are [performing TLS decryption](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#a-third-party-security-product-is-interfering-with-gateway) on traffic to the [WARP IP addresses](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).

## CF\_DNS\_PROXY\_FAILURE

### Symptoms

* Unable to connect the Cloudflare One Client in a [mode that enables DNS filtering](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/).

### Cause

A third-party process (usually a third-party DNS software) is bound to port `53`, which is used by the Cloudflare One Client's [local DNS proxy](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#dns-traffic) to perform DNS resolution. The name of third-party process will appear in the GUI error message.

On macOS, you may see `mDNSResponder` instead of the specific application name -- `mDNSResponder` is a macOS system process that handles DNS requests on behalf of other processes. There is no known way to determine which process caused `mDNSResponder` to bind to port `53`, but the most common culprits are virtual machine software (for example, Docker and VMware Workstation) and the macOS Internet Sharing feature.

### Resolution

1. Remove or disable DNS interception in the third-party process.

mDNSResponder

Below is a non-exhaustive list of third-party software that are known to cause `mDNSResponder` to bind to port `53`. Rather than try to stop `mDNSResponder`, you should either configure the third-party software so that they no longer use port `53`, or temporarily disable them before connecting the Cloudflare One Client.

* **Docker**: [Turn off kernel networking for UDP ↗](https://github.com/docker/for-mac/issues/7008#issuecomment-1746653802) in Docker. Alternatively, uncheck **Start Docker Desktop when you sign in to your computer** under [**Settings** \> **General** ↗](https://docs.docker.com/desktop/settings-and-maintenance/settings/#general). Disabling the automatic startup process will prevent Docker from binding to port `53` before the Cloudflare One Client.
* **Internet Sharing feature**: To disable Internet Sharing:  
   1. On macOS, go to **System Settings** \> **General** \> **Sharing**.  
   2. Turn off **Internet Sharing**.
* **Certain VM software (such as VMware Workstation or Parallels)**: The presence of VM software does not guarantee that it is the offending program, since compatibility with the Cloudflare One Client is highly dependent on the VM's configuration. To work around the issue, connect the Cloudflare One Client before running any VMs:  
   1. Stop/quit all VMs.  
   2. Connect the Cloudflare One Client.  
   3. Start the VMs again.
* **Apple Container**: [Apple Container ↗](https://github.com/apple/container) will also bind `mDNSResponder` to port `53` if started before the Cloudflare One Client (or while the Client is stopped).  
   1. On macOS, run this in the terminal to temporarily stop the container system: `container system stop`  
   2. Cloudflare One Client DNS mode should now start with no errors.  
   3. You can then restart the container system (`container system start`) and pass explicit DNS flags when running containers.
1. Alternatively, switch the Cloudflare One Client to [Traffic only mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#traffic-only-mode) mode.

## CF\_FAILED\_READ\_SYSTEM\_DNS\_CONFIG

### Symptoms

* Unable to connect the Cloudflare One Client
* Unable to browse the Internet

### Cause

The Cloudflare One Client could not read the system DNS configuration, most likely because it contains an invalid nameserver or search domain.

### Resolution

On macOS and Linux, validate that `/etc/resolv.conf` is [formatted correctly ↗](https://man7.org/linux/man-pages/man5/resolv.conf.5.html) and check for [invalid characters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#maclinux-the-devices-etcresolvconf-file-has-an-invalid-character).

On Windows, validate that the registry entry `HKLM\System\CurrentControlSet\Services\TCPIP\Parameters\SearchList` contains only valid search domains. Examples of invalid entries include IP addresses and domains that start with a period (such as `.local`).

## CF\_FAILED\_TO\_SET\_MTLS

### Symptoms

* Unable to connect the Cloudflare One Client

### Cause

The device failed to present a [valid mTLS certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#check-for-mtls-certificate) during device enrollment.

### Resolution

1. Ensure that there are no admin restrictions on certificate installation.
2. Re-install the client certificate on the device.

## CF\_HAPPY\_EYEBALLS\_MITM\_FAILURE

### Symptoms

* Unable to connect the Cloudflare One Client

### Cause

A router, firewall, antivirus software, or other third-party security product is blocking UDP on the WARP ports.

### Resolution

1. Configure the third-party security product to allow the [WARP ingress IPs and ports](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#warp-ingress-ip).
2. Ensure that your Internet router is working properly and try rebooting the router.
3. Check that the device is not revoked by going to **Team & Resources** \> **Devices**.

## CF\_HOST\_UNREACHABLE\_CHECK

### Symptoms

* Unable to connect the Cloudflare One Client
* No Internet connectivity
* User may be behind a captive portal

### Cause

The [connectivity check](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#connectivity-checks) inside of the WARP tunnel has failed.

### Resolution

1. Check for the presence of third-party HTTP filtering software (AV, DLP, or firewall) that could be intercepting traffic to the [WARP IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall).
2. In the third-party software, bypass inspection for all IP traffic going through the Cloudflare One Client. To find out what traffic routes through the WARP tunnel, refer to [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/).

## CF\_INSUFFICIENT\_DISK

### Symptoms

* Unable to connect the Cloudflare One Client
* OS warns that the disk is full

### Cause

The hard drive is full or has incorrect permissions for the Cloudflare One Client to write data.

### Resolution

1. Ensure that your device meets the [HD space requirements](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) for the Cloudflare One Client.
2. Check for disk permissions that may prevent the Cloudflare One Client from using disk space.
3. Empty trash or remove large files.

## CF\_INSUFFICIENT\_FILE\_DESCRIPTORS

### Symptoms

* Unable to connect the Cloudflare One Client
* Unable to open files on the device

### Cause

The device does not have sufficient file descriptors to create network sockets or open files.

### Resolution

Increase the file descriptor limit in your system settings.

## CF\_INSUFFICIENT\_MEMORY

### Symptoms

* Unable to connect the Cloudflare One Client
* Device is very slow

### Cause

The device does not have enough memory to run the Cloudflare One Client.

### Resolution

1. Ensure that your device meets the [minimum memory requirements](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) for the Cloudflare One Client.
2. List all running processes to check memory usage.

## CF\_LOCAL\_POLICY\_FILE\_FAILED\_TO\_PARSE

### Symptoms

* Unable to connect the Cloudflare One Client

### Cause

The Cloudflare One Client was deployed on the device using an invalid MDM configuration file.

### Resolution

1. Review the [managed deployment guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/) for your operating system.
2. Locate the MDM configuration file on your device.
3. Ensure that the file is formatted correctly and only contains [accepted arguments](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/).

## CF\_NO\_NETWORK

### Symptoms

* Unable to connect the Cloudflare One Client
* No Internet connectivity

### Cause

The device is not connected to a Wi-Fi network or LAN that has connectivity to the Internet.

### Resolution

1. Launch the network settings panel on your device.
2. Ensure that you are connected to a valid network.
3. Check that your device is retrieving a valid IP address.
4. If this does not resolve the error, try rebooting your device or running your system's network diagnostics tool.

## CF\_REGISTRATION\_MISSING

### Symptoms

* Unable to connect the Cloudflare One Client

### Cause

The device is not authenticated to an [organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization) because:

* The device was revoked in Zero Trust.
* The registration was corrupted or deleted for an unknown reason.

### Resolution

* [ Version 2026.2+ ](#tab-panel-7497)
* [ Version 2026.1 and earlier ](#tab-panel-7498)

1. Launch the Cloudflare One Client.
2. Go to **Profile** \> **Account information**.
3. Select **Re-Authenticate**.
4. Complete the authentication steps required by your organization.
5. If this does not resolve the error, select **Logout** and then [re-enroll your device](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/). Logging out is only possible if [Allow device to leave organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-device-to-leave-organization) is enabled for your device.
6. If the issue persists, contact your administrator for assistance.

1. Launch the Cloudflare One Client.
2. Select the gear icon and go to **Preferences** \> **Account**.
3. Select **Re-Authenticate Session**.
4. Complete the authentication steps required by your organization.
5. If this does not resolve the error, select **Logout from Cloudflare Zero Trust** and then log back in. Logging out is only possible if [Allow device to leave organization](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-device-to-leave-organization) is enabled for your device.
6. If the issue persists, contact your administrator for assistance.

### CF\_REGISTRATION\_MISSING (Revoked)

#### Cause

Your device was unenrolled from your company's [organization](https://developers.cloudflare.com/cloudflare-one/setup/#2-create-a-zero-trust-organization) by an administrator on your account.

#### Resolution

Contact your company or team administrator for assistance.

## CF\_TLS\_INTERCEPTION\_BLOCKING\_DOH

### Symptoms

* DNS requests fail to resolve when the Cloudflare One Client is connected.

### Cause

A third-party application or service is intercepting DNS over HTTPS traffic from the Cloudflare One Client.

### Resolution

Configure the third-party application to exempt the [WARP DoH IPs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/#doh-ip).

## CF\_TLS\_INTERCEPTION\_CHECK

### Symptoms

* Unable to connect the Cloudflare One Client

### Cause

A third-party security product on the device or network is performing TLS decryption on HTTPS traffic. For more information, refer to the [Troubleshooting guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#a-third-party-security-product-is-interfering-with-gateway).

### Resolution

In the third-party security product, disable HTTPS inspection and TLS decryption for the [WARP IP addresses](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).

## Admin directed disconnect

### Symptoms

* Unable to connect the Cloudflare One Client

### Cause

The account administrator has disconnected the Cloudflare One Client for all devices registered to the account.

### Resolution

The account administrator must turn off both of the following features: - [Disconnect the Cloudflare One Client on all devices](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#disconnect-the-cloudflare-one-client-on-all-devices) \- [Manage device connection using an external signal](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#manage-device-connection-using-an-external-signal)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/client-errors/#page","headline":"Client errors · Cloudflare One docs","description":"Reference information for Client errors in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/client-errors/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/","name":"Troubleshoot the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/client-errors/","name":"Client errors"}}]}
```
