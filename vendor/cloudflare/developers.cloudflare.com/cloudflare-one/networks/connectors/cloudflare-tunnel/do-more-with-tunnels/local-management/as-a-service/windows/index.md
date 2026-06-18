---
title: Windows
description: Windows in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Windows

You can install `cloudflared` as a system service on Windows.

## Configure `cloudflared` as a service

By default, Cloudflare Tunnel expects all of the configuration to exist in the `%USERPROFILE%\.cloudflared\config.yml` [configuration file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/configuration-file/). At a minimum you must specify the following arguments to run as a service:

| Argument         | Description                                          |
| ---------------- | ---------------------------------------------------- |
| tunnel           | The UUID of your tunnel                              |
| credentials-file | The location of the credentials file for your tunnel |

## Run `cloudflared` as a service

1. [Download](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/) the latest `cloudflared` version.
2. Create a new directory:  
Terminal window  
```  
C:\Cloudflared\bin  
```
3. Copy the `.exe` file you downloaded in step 1 to the new directory and rename it to `cloudflared.exe`.
4. Open CMD as an administrator and go to `C:\Cloudflared\bin`.
5. Run this command to install `cloudflared`:  
Terminal window  
```  
cloudflared.exe service install  
```
6. Next, run this command to create another directory:  
Terminal window  
```  
mkdir C:\Windows\System32\config\systemprofile\.cloudflared  
```
7. Log in and authenticate `cloudflared`:  
Terminal window  
```  
cloudflared.exe login  
```
8. The login command will generate a `cert.pem` file and save it to your user profile by default. Copy the file to the `.cloudflared` folder created in step 5 using this command:  
Terminal window  
```  
copy C:\Users\%USERNAME%\.cloudflared\cert.pem C:\Windows\System32\config\systemprofile\.cloudflared\cert.pem  
```
9. Next, create a tunnel:  
Terminal window  
```  
cloudflared.exe tunnel create <Tunnel Name>  
```  
This will generate a [credentials file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/local-tunnel-terms/#credentials-file) in `.json` format.
10. [Create a configuration file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/#4-create-a-configuration-file) with the following content:  
```  
tunnel: <Tunnel ID>  
credentials-file: C:\Windows\System32\config\systemprofile\.cloudflared\<Tunnel-ID>.json  
# Uncomment the following two lines if you are using self-signed certificates in your origin server  
# originRequest:  
#   noTLSVerify: true  
ingress:  
  - hostname: app.mydomain.com  
    service: https://internal.mydomain.com  
  - service: http_status:404  
logfile:  C:\Cloudflared\cloudflared.log  
```
11. Copy the credentials file to the folder created in step 6:  
Terminal window  
```  
copy C:\Users\%USERNAME%\.cloudflared\<Tunnel-ID>.json C:\Windows\System32\config\systemprofile\.cloudflared\<Tunnel-ID>.json  
```
12. Validate the ingress rule entries in your configuration file using the command:  
Terminal window  
```  
cloudflared.exe tunnel ingress validate  
```
13. In the Registry Editor, go to `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Cloudflared`.
14. In the Cloudflared registry entry, modify `ImagePath` to point to the `cloudflared.exe` and `config.yml` files. Make sure that there are no extra spaces or characters while you modify the registry entry, as this could cause problems with starting the service.  
Terminal window  
```  
C:\Cloudflared\bin\cloudflared.exe --config=C:\Windows\System32\config\systemprofile\.cloudflared\config.yml tunnel run  
```
15. If the service does not start, run the following command from `C:\Cloudflared\bin`:  
Terminal window  
```  
sc start cloudflared  
```  
You will see the output below:  
```  
SERVICE_NAME: cloudflared  
        TYPE               : 10  WIN32_OWN_PROCESS  
        STATE              : 2  START_PENDING  
                                (NOT_STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)  
        WIN32_EXIT_CODE    : 0  (0x0)  
        SERVICE_EXIT_CODE  : 0  (0x0)  
        CHECKPOINT         : 0x0  
        WAIT_HINT          : 0x7d0  
        PID                : 3548  
        FLAGS              :  
```

## Next steps

You can now [route traffic through your tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/#5-start-routing-traffic). If you add IP routes or otherwise change the configuration, restart the service to load the new configuration:

Terminal window

```

sc stop cloudflared

sc start cloudflared


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/windows/#page","headline":"Run as a service on Windows · Cloudflare One docs","description":"Windows in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/windows/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Windows"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/","name":"Other tunnel types"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/","name":"Locally-managed tunnels"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/","name":"Run as a service"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/windows/","name":"Windows"}}]}
```
