---
title: Linux
description: Install and run cloudflared as a systemd service on Linux.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Linux

You can install `cloudflared` as a system service on Linux.

## Prerequisites

Before you install Cloudflare Tunnel as a service on Linux, follow Steps 1 through 4 of the [Tunnel CLI setup guide](https://developers.cloudflare.com/tunnel/other-tunnel-types/local-management/create-local-tunnel/). At this point you should have a named tunnel and a `config.yml` file in your `.cloudflared` directory.

## 1\. Configure `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `$HOME/.cloudflared/config.yml` [configuration file](https://developers.cloudflare.com/tunnel/other-tunnel-types/local-management/configuration-file/). At a minimum you must specify the following arguments to run as a service:

| Argument         | Description                                          |
| ---------------- | ---------------------------------------------------- |
| tunnel           | The UUID of your tunnel                              |
| credentials-file | The location of the credentials file for your Tunnel |

## 2\. Run `cloudflared` as a service

1. Install the `cloudflared` service.  
Terminal window  
```  
cloudflared service install  
```  
Note  
Installing the `cloudflared` systemd service on Linux typically requires elevated privileges. When the install command is run with `sudo`, `$HOME` points to `/root`, which may prevent `cloudflared` from locating a configuration file created in `/home/<USER>/.cloudflared/config.yml`. In this case, the config path can be passed explicitly:  
Terminal window  
```  
sudo cloudflared --config /home/<USER>/.cloudflared/config.yml service install  
```
2. Start the service.  
Terminal window  
```  
systemctl start cloudflared  
```
3. (Optional) View the status of the service.  
Terminal window  
```  
systemctl status cloudflared  
```

## Next steps

You can now [route traffic through your tunnel](https://developers.cloudflare.com/tunnel/other-tunnel-types/local-management/create-local-tunnel/#5-start-routing-traffic). If you add IP routes or otherwise change the configuration, restart the service to load the new configuration:

Terminal window

```

systemctl restart cloudflared


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/advanced/local-management/as-a-service/linux/#page","headline":"Run as a service on Linux · Cloudflare Docs","description":"Install and run cloudflared as a systemd service on Linux.","url":"https://developers.cloudflare.com/tunnel/advanced/local-management/as-a-service/linux/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Linux"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/advanced/","name":"Advanced"}},{"@type":"ListItem","position":4,"item":{"@id":"/tunnel/advanced/local-management/","name":"Locally-managed tunnels"}},{"@type":"ListItem","position":5,"item":{"@id":"/tunnel/advanced/local-management/as-a-service/","name":"Run as a service"}},{"@type":"ListItem","position":6,"item":{"@id":"/tunnel/advanced/local-management/as-a-service/linux/","name":"Linux"}}]}
```
