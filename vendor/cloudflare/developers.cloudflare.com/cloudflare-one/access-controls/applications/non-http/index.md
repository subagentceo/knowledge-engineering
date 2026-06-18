---
title: Non-HTTP applications
description: How Non-HTTP applications works in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Non-HTTP applications

Cloudflare offers both client-based and clientless ways to grant secure access to non-HTTP applications.

Note

Non-HTTP applications require [connecting your private network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/) to Cloudflare. For more details, refer to our [Replace your VPN](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/) implementation guide.

## Cloudflare One Client

Users can connect by installing the Cloudflare One Client on their device and enrolling in your Zero Trust organization. Remote devices connect to your applications as if they were on your private network. By default, all devices enrolled in your organization can access any private route. To restrict access, [create a self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) for a private IP range, port range, and/or hostname and build [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) or [Gateway firewall rules](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) that allow or block specific users.

If you would like to define how users access specific infrastructure servers within your network, [create an infrastructure application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/) in Access for Infrastructure. Access for Infrastructure provides an additional layer of control and visibility over how users access non-HTTP applications, including:

* Define fine-grained policies to govern who has access to specific servers and exactly how a user may access that server.
* Eliminate SSH keys by using short-lived certificates to authenticate users.
* Export SSH command logs to a storage service or SIEM solution using [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

## Clientless access

Clientless access methods are suited for organizations that cannot deploy the Cloudflare One Client or need to support third-party contractors where installing a client is not possible. Clientless access requires onboarding a domain to Cloudflare and configuring a public hostname in order to make the server reachable. Command logging is not supported.

### Browser-rendered terminal

Cloudflare's [browser-based terminal](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/browser-rendering/) allows users to connect over SSH, RDP, and VNC without any configuration. When users visit the public hostname URL (for example, `https://ssh.example.com`) and log in with their Access credentials, Cloudflare will render a terminal in their browser. For RDP connections, users must authenticate to the Windows server using their Windows username and password in addition to being authenticated by Cloudflare Access.

### Client-side cloudflared

Users can log in to the application by installing `cloudflared` on their device and running a hostname-specific command in their terminal. For more information, refer to [cloudflared authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/).

## Related resources

To connect to an application over a specific protocol, refer to these tutorials:

* [SSH](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/)
* [SMB](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/smb/)
* [RDP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/#page","headline":"Non-HTTP applications · Cloudflare One docs","description":"How Non-HTTP applications works in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH","RDP","Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/","name":"Non-HTTP applications"}}]}
```
