---
title: OS version
description: OS version in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OS version

The OS Version device posture attribute checks whether the version of a device's operating system matches, is greater than or lesser than the configured value.

## Prerequisites

* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Enable the OS version check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **OS version**.
4. Configure the **Operating system**, **Operator**, and **Version** fields to specify the [OS version](#determine-the-os-version) you want devices to match.  
Note  
The OS version must be specified as a valid [Semver ↗](https://semver.org/). For example, if your device is running OS version `1.2`, you must enter `1.2.0`.
5. (Optional) Configure additional OS-specific fields:  
   * [ Windows ](#tab-panel-7416)  
   * [ macOS ](#tab-panel-7417)  
   * [ Linux ](#tab-panel-7418)  
   * [ iOS ](#tab-panel-7419)  
To check that Windows devices have required security patches and features installed, include an Update Build Revision (UBR) number in the OS version check.  
   * **Update Build Revision**: Enter the Windows UBR you want devices to match (for example, `3803`). The UBR is the fourth part of the full Windows version number (for example, in `10.0.19045.3803`, the UBR is `3803`).  
   * **Rapid Security Response Version**: Enter the macOS [Rapid Security Response (RSR) ↗](https://support.apple.com/guide/deployment/rapid-security-responses-dep93ff7ea78/web) version you want devices to match (for example, `(a)`). Be sure to include the parenthesis around the letter.  
   * **Distro name** and **Distro revision**: Enter the Linux distribution you want devices to match (for example, `ubuntu 22.04`). The distro version always matches with an equal-to operator (==) regardless of the **Operator** setting.  
   * **Patch Version**: Enter the [patch version](#linux) of the kernel. For example, if the kernel is `6.50.0-1007-oem`, enter `1007`.  
   * **Rapid Security Response Version**: Enter the iOS [Rapid Security Response (RSR) ↗](https://support.apple.com/guide/deployment/rapid-security-responses-dep93ff7ea78/web) version you want devices to match (for example, `(a)`). Be sure to include the parenthesis around the letter.
6. Select **Save**.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the OS version check is returning the expected results.

## Determine the OS version

Operating systems display version numbers in different ways. This section covers how to retrieve the version number in each OS, in a format matching what the OS version posture check expects.

### macOS

1. Open a terminal window.
2. Use the `defaults` command to check for the value of `SystemVersionStampAsString`.  
Terminal window  
```  
defaults read loginwindow SystemVersionStampAsString  
```

### Windows

Windows version numbers consist of four parts: `Major.Minor.Build.UBR`. For example, `10.0.19045.3803` where:

* `10.0` is the **Version** (Major.Minor)
* `19045` is the **Build** number
* `3803` is the **UBR** (Update Build Revision)

To determine the Windows version on your device:

1. Open a PowerShell window.
2. Get the **Version** (Major.Minor.Build):  
Terminal window  
```  
(Get-CimInstance Win32_OperatingSystem).version  
```  
This returns the version in the format `Major.Minor.Build` (for example, `10.0.19045`).
3. Get the **UBR** (Update Build Revision):  
Terminal window  
```  
(Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion" -Name UBR).UBR  
```  
This returns the UBR value (for example, `3803`).

### Linux

#### OS version

The Linux OS version check reads the system kernel version.

1. Open a Terminal window.
2. Run the `uname -r` command to get the complete kernel version. For example,  
Terminal window  
```  
$ uname -r  
5.14.0-25.el9.x86_64  
```
3. **Version** is the first three numbers of the output in SemVer format (`5.14.0`).
4. **Patch Version** is the first number after the SemVer (`25`).

#### Distro version

The Cloudflare One Client reads **Distro name** and **Distro revision** from the `/etc/os-release` file. The name comes from the **ID** field, and the revision comes from the **VERSION\_ID** field.

To determine the Linux distro version on your device:

1. Open a Terminal window.
2. Get the OS identification fields that contain `ID`:  
Terminal window  
```  
cat /etc/os-release | grep "ID"  
```
3. If the output of the above command contained `ID=ubuntu` and `VERSION_ID=22.04`, **Distro name** would be `ubuntu` and **Distro revision** would be `22.04`. The Cloudflare One Client will check these strings for an exact match.

### ChromeOS

ChromeOS version numbers consist of [four parts ↗](https://www.chromium.org/developers/version-numbers/): `MAJOR.MINOR.BUILD.PATCH`. The OS version posture check returns `MAJOR.MINOR.BUILD`.

To determine the ChromeOS version on your device:

1. Open Chrome browser and go to `chrome://system`.
2. Find the following values:  
| Property                             | OS version component |  
| ------------------------------------ | -------------------- |  
| CHROMEOS\_RELEASE\_CHROME\_MILESTONE | MAJOR                |  
| CHROMEOS\_RELEASE\_BUILD\_NUMBER     | MINOR                |  
| CHROMEOS\_RELEASE\_BRANCH\_NUMBER    | BUILD                |
3. The OS version in Semver format is `MAJOR.MINOR.BUILD` (for example, `103.14816.131`).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/#page","headline":"OS version · Cloudflare One docs","description":"OS version in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/","name":"OS version"}}]}
```
