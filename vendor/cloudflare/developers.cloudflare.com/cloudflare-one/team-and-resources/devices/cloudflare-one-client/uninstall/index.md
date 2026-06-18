---
title: Uninstall the Cloudflare One Client
description: Uninstall the Cloudflare One Client in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Uninstall the Cloudflare One Client

The following procedures will uninstall the Cloudflare One Client (formerly WARP) from your device. If you used the Cloudflare One Client to deploy a root certificate, the certificate will also be removed.

## Windows

1. Go to Windows Settings (Windows Key + I).
2. Select **Apps**.
3. Select **App & Features**.
4. Scroll to find the Cloudflare One Client application and select **Uninstall**.

## macOS

We include an uninstall script as part of the macOS package that you originally used.

1. To find and run the uninstall script, run the following commands:

Terminal window

```

cd /Applications/Cloudflare\ WARP.app/Contents/Resources

./uninstall.sh


```

1. If prompted, enter your admin credentials to proceed with the uninstall.

Note

You can bypass the **Are you sure** prompt by passing `-f` as a parameter to the macOS uninstall command.

## Linux

On CentOS 8, RHEL 8:

Terminal window

```

sudo yum remove cloudflare-warp


```

On Ubuntu 18.04, Ubuntu 20.04, Ubuntu 22.04, Debian 9, Debian 10, Debian 11:

Terminal window

```

sudo apt remove cloudflare-warp


```

## iOS and Android

1. Find the Cloudflare One Agent application (or the legacy 1.1.1.1 application) on the home screen.
2. Select and hold the application tile, and then select **Remove App**.
3. Select **Delete App**.

Note

If you [manually deployed a Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/manual-deployment/), remember to manually delete the certificate from the device.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/uninstall/#page","headline":"Uninstall the Cloudflare One Client · Cloudflare One docs","description":"Uninstall the Cloudflare One Client in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/uninstall/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/uninstall/","name":"Uninstall the Cloudflare One Client"}}]}
```
