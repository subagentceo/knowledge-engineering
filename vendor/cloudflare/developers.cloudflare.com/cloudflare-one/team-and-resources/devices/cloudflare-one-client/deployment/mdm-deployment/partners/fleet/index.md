---
title: Fleet
description: Fleet in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Fleet

This guide covers how to deploy the Cloudflare One Client (formerly WARP) using [Fleet ↗](https://fleetdm.com/) device management software.

## macOS

### 1\. Create a custom MDM file

1. [Download](https://developers.cloudflare.com/cloudflare-one/static/mdm/CloudflareWARP.mobileconfig) an example `.mobileconfig` file.
2. Modify the file with your desired [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/).

### 2\. Upload MDM file to Fleet

1. In the Fleet admin console, go to **Controls**.
2. From the **Teams** dropdown, select the team (group of hosts) that requires the Cloudflare One Client.
3. Select **OS settings** \> **Custom settings**.
4. Select **Add profile** and upload the custom `.mobileconfig`.
5. Select the hosts which require the Cloudflare One Client:  
   * **All hosts**: Deploys the Cloudflare One Client to all hosts in the team.  
   * **Custom**: Deploys the Cloudflare One Client to a subset of the hosts in the team. Use [labels ↗](https://fleetdm.com/guides/managing-labels-in-fleet#basic-article) to define the hosts that should be included or excluded.
6. Select **Add profile**.

The defined hosts will immediately receive the deployment profile, but the Cloudflare One Client is not yet installed.

### 3\. Download Cloudflare One Client package for macOS

Visit the [Download page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#macos) to review system requirements and download the installer for your operating system.

### 4\. Upload Cloudflare One Client package to Fleet

To add the Cloudflare One Client installer package for distribution to your hosts enrolled in Fleet:

1. In the Fleet admin console, go to **Software**.
2. From the **Teams** dropdown, select the team (group of hosts) that requires the Cloudflare One Client.
3. Select **Add Software** and upload the `.pkg` file that was previously downloaded.

### 5\. Install the Cloudflare One Client with Fleet

To deploy the uploaded `.pkg` file to your hosts:

1. In the Fleet admin console, go to **Hosts**.
2. Select the host that requires the Cloudflare One Client.
3. Go to **Software** and search for `Cloudflare`.
4. Select **Actions** \> **Install**.

Installation will happen automatically when the host comes online. To deploy with REST API or GitOps, refer to the [Fleet documentation ↗](https://fleetdm.com/guides/deploy-software-packages). 

After deploying the Cloudflare One Client, you can check its connection progress using the [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) messages displayed in the Cloudflare One Client GUI.

### 6\. Uninstall the Cloudflare One Client with Fleet

To uninstall the Fleet-deployed Cloudflare One Client:

1. In the Fleet admin console, go to **Hosts**.
2. Select the host that requires the Cloudflare One Client to be uninstalled.
3. Go to **Software** and search for `Cloudflare`.
4. Select **Actions** \> **Uninstall**.

## Windows

### 1\. Download Cloudflare One Client package for Windows

Visit the [Download page](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#windows) to review system requirements and download the installer for your operating system.

### 2\. Upload Cloudflare One Client package to Fleet

To add the Cloudflare One Client installer package for distribution to your hosts enrolled in Fleet:

1. In the Fleet admin console, go to **Software**.
2. From the **Teams** dropdown, select the team (group of hosts) that requires the Cloudflare One Client.
3. Select **Add Software** and upload the `.msi` file that was previously downloaded.
4. (Optional) To allow users to install the Cloudflare One Client from Fleet Desktop, select **Self-service**.
5. Select **Advanced options**.
6. In **Install script**, replace the default script with the following:

Terminal window

```

$logFile = "${env:TEMP}/fleet-install-software.log"


try {


$installProcess = Start-Process msiexec.exe `

  -ArgumentList "/quiet /norestart ORGANIZATION=your-team-name SUPPORT_URL=https://example.com /lv ${logFile} /i `"${env:INSTALLER_PATH}`"" `

  -PassThru -Verb RunAs -Wait


Get-Content $logFile -Tail 500


Exit $installProcess.ExitCode


} catch {

  Write-Host "Error: $_"

  Exit 1

}


```

Refer to [deployment parameters](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/parameters/) for a description of each argument.

### 3\. Install the Cloudflare One Client with Fleet

To deploy the uploaded `.pkg` file to your hosts:

1. In the Fleet admin console, go to **Hosts**.
2. Select the host that requires the Cloudflare One Client.
3. Go to **Software** and search for `Cloudflare`.
4. Select **Actions** \> **Install**.

Installation will happen automatically when the host comes online. To deploy with REST API or GitOps, refer to the [Fleet documentation ↗](https://fleetdm.com/guides/deploy-software-packages). 

After deploying the Cloudflare One Client, you can check its connection progress using the [Connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/) messages displayed in the Cloudflare One Client GUI.

### 4\. Uninstall the Cloudflare One Client with Fleet

To uninstall the Fleet-deployed Cloudflare One Client:

1. In the Fleet admin console, go to **Hosts**.
2. Select the host that requires the Cloudflare One Client to be uninstalled.
3. Go to **Software** and search for `Cloudflare`.
4. Select **Actions** \> **Uninstall**.

## Linux

Fleet allows you to [execute custom scripts ↗](https://fleetdm.com/guides/scripts) on Linux hosts. The following example script creates an [MDM file](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/#linux) and installs the Cloudflare One Client on an Ubuntu 22.04 host:

```

#!/bin/sh


# Write the mdm.xml file

touch /var/lib/cloudflare-warp/mdm.xml

echo -e "<dict>\n   <key>organization</key>\n   <string>your-team-name</string>\n</dict>

" > /var/lib/cloudflare-warp/mdm.xml


# Add cloudflare gpg key

curl -fsSL https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor --output /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg


# Add this repo to your apt repositories

echo "deb [signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg] https://pkg.cloudflareclient.com/ any main" | sudo tee /etc/apt/sources.list.d/cloudflare-client.list


# Install

sudo apt-get -y update && sudo apt-get -y install cloudflare-warp


```

To install the Cloudflare One Client on other Linux distributions, refer to the [package repository ↗](https://pkg.cloudflareclient.com/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/fleet/#page","headline":"Fleet · Cloudflare One docs","description":"Fleet in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/fleet/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/","name":"Deploy the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/","name":"Managed deployment"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/","name":"Partners"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/partners/fleet/","name":"Fleet"}}]}
```
