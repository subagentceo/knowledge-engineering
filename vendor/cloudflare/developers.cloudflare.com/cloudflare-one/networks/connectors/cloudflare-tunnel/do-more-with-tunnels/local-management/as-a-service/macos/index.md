---
title: macOS
description: macOS in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# macOS

You can install `cloudflared` as a system service on macOS.

## Prerequisites

Before you install Cloudflare Tunnel as a service on your OS, follow Steps 1 through 4 of the [Tunnel CLI setup guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/). At this point you should have a named tunnel and a `config.yml` file in your `$HOME/.cloudflared` directory.

## 1\. Configure `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/). At a minimum you must specify the following arguments to run as a service:

| Argument         | Description                                          |
| ---------------- | ---------------------------------------------------- |
| tunnel           | The UUID of your tunnel                              |
| credentials-file | The location of the credentials file for your tunnel |

## 2\. Run `cloudflared` as a service

You can install the service to either run at login or at boot.

### Run at login

Open a terminal window and run the following command:

Terminal window

```

cloudflared service install


```

Cloudflare Tunnel will be installed as a launch agent and start whenever you log in, using your local user configuration found in `~/.cloudflared/`.

### Run at boot

Open a terminal window and run the following command:

Terminal window

```

sudo cloudflared service install


```

Cloudflare Tunnel will be installed as a launch daemon and start whenever your system boots, using your configuration found in `/etc/cloudflared`.

## 3\. Manually start the service

Run the following command:

Terminal window

```

sudo launchctl start com.cloudflare.cloudflared


```

The output will be logged to `/Library/Logs/com.cloudflare.cloudflared.err.log` and `/Library/Logs/com.cloudflare.cloudflared.out.log`.

## Next steps

You can now [route traffic through your tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/#5-start-routing-traffic). If you add IP routes or otherwise change the configuration, restart the service to load the new configuration:

Terminal window

```

sudo launchctl stop com.cloudflare.cloudflared

sudo launchctl start com.cloudflare.cloudflared


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/macos/#page","headline":"Run as a service on macOS · Cloudflare One docs","description":"macOS in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/macos/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MacOS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/","name":"Other tunnel types"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/","name":"Locally-managed tunnels"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/","name":"Run as a service"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/macos/","name":"macOS"}}]}
```
