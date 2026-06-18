---
title: Download and install the Cloudflare One Client
description: Install the Cloudflare One device client.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Download and install the Cloudflare One Client

Most admins test by manually downloading the Cloudflare One Client and enrolling in your organization's Cloudflare Zero Trust instance.

## Install the Cloudflare One Client

1. First, uninstall any existing third-party VPN software if possible. Sometimes products placed in a disconnected or disabled state will still interfere with the Cloudflare One Client.
2. If you are running third-party firewall or TLS decryption software, verify that it does not inspect or block traffic to the following destinations:  
   * IPv4 API endpoints: `162.159.137.105` and `162.159.138.105`  
   * IPv6 API endpoints: `2606:4700:7::a29f:8969` and `2606:4700:7::a29f:8a69`  
   * SNIs for Cloudflare One Client version 2026.6.0 and later: `api.devices.cloudflare.com`  
   * SNIs for versions earlier than 2026.6.0: `zero-trust-client.cloudflareclient.com` and `notifications.cloudflareclient.com`  
For more information, refer to [WARP with firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/).
3. Manually install the Cloudflare One Client on the device.  
Window, macOS, and Linux  
To enroll your device using the client GUI:  
   * [ Version 2026.2+ ](#tab-panel-9283)  
   * [ Version 2026.1 and earlier ](#tab-panel-9284)  
   1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Client.  
   2. Launch the Cloudflare One Client.  
   3. On the **What would you like to use the Cloudflare One Client for?** screen, select **Zero Trust security**.  
   4. Enter your team name.  
   5. Complete the authentication steps required by your organization.  
   Once authenticated, you will see a Success page and a dialog prompting you to open the Cloudflare One Client.  
   6. Select **Open the Cloudflare One Client** to complete the registration.  
   1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Client.  
   2. Launch the Cloudflare One Client.  
   3. Select the Cloudflare logo in the menu bar.  
   4. Select the gear icon.  
   5. Go to **Preferences** \> **Account**.  
   6. Select **Login with Cloudflare Zero Trust**.  
   7. Enter your team name.  
   8. Complete the authentication steps required by your organization.  
   Once authenticated, you will see a Success page and a dialog prompting you to open the Cloudflare One Client.  
   9. Select **Open Cloudflare WARP.app** to complete the registration.  
iOS, Android, and ChromeOS  
   1. [Download](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) and install the Cloudflare One Agent app.  
   2. Launch the Cloudflare One Agent app.  
   3. Select **Next**.  
   4. Review the privacy policy and select **Accept**.  
   5. Enter your team name.  
   6. Complete the authentication steps required by your organization.  
   7. After authenticating, select **Install VPN Profile**.  
   8. In the **Connection request** popup window, select **OK**.  
   9. If you did not enable [auto-connect ↗](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#auto-connect), manually turn on the switch to **Connected**.

The Cloudflare One Client should show as **Connected**. The device is now connected to your organization and secured with Cloudflare Zero Trust.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/connect-devices-networks/install-agent/#page","headline":"Download and install the Cloudflare One Client · Cloudflare Learning Paths","description":"Install the Cloudflare One device client.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/connect-devices-networks/install-agent/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/connect-devices-networks/","name":"Connect devices and networks to Cloudflare"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/connect-devices-networks/install-agent/","name":"Download and install the Cloudflare One Client"}}]}
```
