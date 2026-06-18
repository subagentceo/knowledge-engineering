---
title: Client-side cloudflared
description: Client-side cloudflared in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Client-side cloudflared

With Cloudflare Zero Trust, users can connect to non-HTTP applications via a public hostname without installing the Cloudflare One Client. This method requires you to onboard a domain to Cloudflare and install `cloudflared` on both the server and the user's device.

Users log in to the application by running a `cloudflared access` command in their terminal. `cloudflared` will launch a browser window and prompt the user to authenticate with your identity provider.

Note

Automated services should only authenticate with `cloudflared` if they cannot use a [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/). Cloudflared authentication relies on WebSockets to establish a connection. WebSockets have a known limitation where persistent connections may close unexpectedly. We recommend either a [Service Auth policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth) or using [Warp to Tunnel routing](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/) in these instances.

For examples of how to connect to Access applications with client-side `cloudflared`, refer to these tutorials:

* [Connect through Access using a CLI](https://developers.cloudflare.com/cloudflare-one/tutorials/cli/)
* [Connect through Access using kubectl](https://developers.cloudflare.com/cloudflare-one/tutorials/kubectl/)
* [Connect to SSH with client-side cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-cloudflared-authentication/)
* [Connect over RDP with cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/#connect-to-rdp-server-with-cloudflared-access)
* [Connect over SMB with cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/smb/)
* [Connect over arbitrary TCP with cloudflared](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/arbitrary-tcp/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/#page","headline":"Client-side cloudflared · Cloudflare One docs","description":"Client-side cloudflared in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/","name":"Non-HTTP applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/","name":"Client-side cloudflared"}}]}
```
