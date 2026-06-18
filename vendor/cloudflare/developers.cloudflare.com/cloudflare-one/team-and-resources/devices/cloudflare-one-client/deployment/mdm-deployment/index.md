---
title: Managed deployment
description: Managed deployment in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Managed deployment

Organizations can deploy the Cloudflare One Client (formerly WARP) automatically to their fleet of devices in a single operation. The Cloudflare One Client is compatible with the vast majority of managed deployment workflows, including [mobility management solutions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/) such as Intune or JAMF, or by executing an `.msi` file on desktop machines.

This page provides generic instructions for an automated deployment. If you want to deploy the Cloudflare One Client manually, refer to the [instructions for manual deployment](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/manual-deployment/).

Warning

[MDM parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) that you specify in a local policy file will overrule any [device client settings](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/) configured in the dashboard.

## Prerequisites

* Refer to the [Download page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#windows) to review system requirements and download the installer for your operating system.
* After deploying the Cloudflare One Client, you can check its connection progress using the [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) messages displayed in the Cloudflare One Client GUI.

## Windows

The Cloudflare One Client for Windows allows for an automated install via tools like Intune, AD, or any script or management tool that can execute a `.msi` file.

### Install the Cloudflare One Client

To install the Cloudflare One Client, run the following command:

Terminal window

```

msiexec /i "Cloudflare_WARP_<VERSION>.msi" /qn ORGANIZATION="your-team-name" SUPPORT_URL="http://support.example.com"


```

#### Supported properties

The Cloudflare One Client MSI installer supports the following [public properties ↗](https://learn.microsoft.com/en-us/windows/win32/msi/public-properties):

* `ORGANIZATION`
* `GATEWAY_UNIQUE_ID`
* `AUTH_CLIENT_ID`
* `AUTH_CLIENT_SECRET`
* `ONBOARDING`
* `OVERRIDE_API_ENDPOINT`
* `OVERRIDE_DOH_ENDPOINT`
* `OVERRIDE_WARP_ENDPOINT`
* `SERVICE_MODE`
* `SUPPORT_URL`
* `SWITCH_LOCKED`

Refer to [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) for a description of each property.

### Uninstall the Cloudflare One Client

To uninstall the Cloudflare One Client:

1. First, locate the `.msi` package with the following PowerShell command:

PowerShell

```

Get-WmiObject Win32_Product | Where-Object { $_.Name -match "WARP" } | Sort-Object -Property Name | Format-Table IdentifyingNumber, Name, LocalPackage -AutoSize


```

```

IdentifyingNumber                      Name            LocalPackage

-----------------                      ----            ------------

{5RA4DJWK-13D8-2NSX-QRF8-UANLODWD6D90} Cloudflare WARP C:\WINDOWS\Installer\3f476db.msi


```

1. You can then use the LocalPackage output in the uninstall command. For example,

PowerShell

```

msiexec /x C:\WINDOWS\Installer\<WARP_RELEASE>.msi /quiet


```

### Update MDM parameters

The on-disk configuration of the Windows client can be changed at any time by modifying or replacing the contents of `C:\ProgramData\Cloudflare\mdm.xml`. The format of this file is as follows:

```

<dict>

  <key>organization</key>

  <string>your-team-name</string>

  <key>onboarding</key>

  <false/>

</dict>


```

Changes to this file are processed immediately by the Cloudflare One Client.

### Authenticate in embedded browser

By default the Cloudflare One Client will use the user's default browser to perform registration. You can override the default setting to instead authenticate users in an embedded browser. The embedded browser will work around any protocol handler issues that may prevent the default browser from launching.

To use an embedded browser:

1. Download and install WebView2 by following the [Microsoft instructions ↗](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section).
2. Add a registry key with the following command:  
```  
REG ADD HKLM\SOFTWARE\Cloudflare\CloudflareWARP /f /v UseWebView2 /t REG_SZ /d y  
```

The Cloudflare One Client will now launch WebView2 when the user is registering their device with Zero Trust.

## macOS

The Cloudflare One Client for macOS allows for an automated install via tools like Jamf, Intune, Kandji, or JumpCloud or any script or management tool that can place a `com.cloudflare.warp.plist` file in `/Library/Managed Preferences`. The plist can also be wrapped in a `.mobileconfig`.

Warning

Do not deploy the Cloudflare One Client via [Intune's line-of-business (LOB) deployment method ↗](https://learn.microsoft.com/en-us/intune/intune-service/apps/lob-apps-macos). This deployment type is not supported. Use [Intune's .pkg deployment method ↗](https://learn.microsoft.com/en-us/intune/intune-service/apps/macos-unmanaged-pkg) instead to successfully install the Cloudflare One Client on macOS.

If you do not wish to use a management tool, you can manually place an `mdm.xml` file in `/Library/Application Support/Cloudflare`.

### Prepare file for MDM deployment

#### `plist` file

1. [Download](https://developers.cloudflare.com/cloudflare-one/static/mdm/com.cloudflare.warp.plist) an example `com.cloudflare.warp.plist` file.
2. Replace `your-team-name` with your Cloudflare One team name.
3. Modify the file with your desired [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/).

#### `mobileconfig` file

1. [Download](https://developers.cloudflare.com/cloudflare-one/static/mdm/CloudflareWARP.mobileconfig) an example `.mobileconfig` file.
2. Replace `your-team-name` with your Cloudflare One team name.
3. Run `uuidgen` from your macOS Terminal. This will generate a value for `PayloadUUID`, which you can use to replace the default value used for `PayloadUUID`.
4. Modify the file with your desired [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/).

### Place an unmanaged `mdm.xml` file

You can configure [Cloudflare One Client deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) on macOS by manually placing an `mdm.xml` file in `/Library/Application Support/Cloudflare`. This deployment method is an alternative to pushing a `plist` or `mobileconfig` using an MDM tool.

The format of `/Library/Application Support/Cloudflare/mdm.xml` is as follows:

```

<dict>

  <key>organization</key>

  <string>your-team-name</string>

</dict>


```

## Linux

The Cloudflare One Client for Linux allows for an automated install via the presence of an `mdm.xml` file in `/var/lib/cloudflare-warp`. The format of `/var/lib/cloudflare-warp/mdm.xml` is as follows:

```

<dict>

  <key>organization</key>

  <string>your-team-name</string>

</dict>


```

Refer to [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) for a list of accepted arguments.

To learn how to automate Cloudflare One Client deployment on headless servers, refer to our [tutorial](https://developers.cloudflare.com/cloudflare-one/tutorials/deploy-client-headless-linux/).

## iOS

Migrate from 1.1.1.1

The legacy iOS client, [1.1.1.1: Faster Internet ↗](https://apps.apple.com/us/app/1-1-1-1-faster-internet/id1423538627), has been replaced by the Cloudflare One Agent. Learn more in our [migration guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/cloudflare-one-agent-migration/).

The Cloudflare One Client for iOS, known in the App Store as [Cloudflare One Agent ↗](https://apps.apple.com/us/app/cloudflare-one-agent/id6443476492), allows for an automated install via tools like Jamf, Intune, or SimpleMDM.

To proceed with the installation, here is an example of the XML code you will need:

```

<dict>

    <key>organization</key>

    <string>your-team-name</string>

    <key>auto_connect</key>

    <integer>1</integer>

    <key>switch_locked</key>

    <false />

    <key>service_mode</key>

    <string>warp</string>

    <key>support_url</key>

    <string>https://support.example.com</string>

</dict>


```

Refer to [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) for a description of each argument.

## Android / ChromeOS

Migrate from 1.1.1.1

The legacy Android client, [1.1.1.1 + WARP: Safer Internet ↗](https://play.google.com/store/apps/details?id=com.cloudflare.onedotonedotonedotone), has been replaced by the Cloudflare One Agent. Learn more in our [migration guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/cloudflare-one-agent-migration/).

The Cloudflare One Client for Android, known in the Google Play store as [Cloudflare One Agent ↗](https://play.google.com/store/apps/details?id=com.cloudflare.cloudflareoneagent), allows for an automated install via tools like Intune, Google Endpoint Manager, and others.

To proceed with the installation, here is an example of the XML code you will need:

```

<key>organization</key>

<string>your-team-name</string>

<key>switch_locked</key>

<true />

<key>auto_connect</key>

<integer>0</integer>

<key>gateway_unique_id</key>

<string>your_gateway_doh_subdomain</string>

<key>service_mode</key>

<string>warp</string>

<key>support_url</key>

<string>https://support.example.com</string>


```

If your MDM tool does not support XML, you may need to convert the XML to JSON. Here is an example below:

```

{

  "organization": "your-team-name",

  "gateway_unique_id": "your_gateway_doh_subdomain",

  "onboarding": true,

  "switch_locked": true,

  "auto_connect": 0,

  "service_mode": "warp",

  "support_url": "https://support.example.com"

}


```

Refer to [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) for a description of each value.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/#page","headline":"Managed deployment · Cloudflare One docs","description":"Managed deployment in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["XML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","name":"Managed deployment"}}]}
```
