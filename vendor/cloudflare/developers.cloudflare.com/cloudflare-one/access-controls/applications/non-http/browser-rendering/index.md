---
title: Browser-rendered terminal
description: Browser-rendered terminal in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Browser-rendered terminal

Cloudflare can render SSH, VNC, and RDP applications in a browser without the need for client software or end-user configuration changes. For SSH and VNC, user email prefixes must match their username on the server. RDP leverages your existing Windows usernames and passwords for authenticating to the Windows server; Cloudflare does not manage any credentials on the Windows server.

## Limitations

* Browser rendering is only supported for [self-hosted public applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/), not private IPs or hostnames.
* You can only render a browser-rendered terminal on domains and subdomains, not on specific paths.
* Cloudflare does not control the length of an active SSH, VNC, or RDP session. [Application session durations](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/) determine the window in which a user can initiate a new connection or refresh an existing one.
* Cloudflare uses TLS to secure the egress RDP connection to your Windows server. We do not currently validate the chain of trust.

## Turn on browser rendering

### SSH and VNC

To turn on browser rendering for an SSH or VNC application:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Locate the SSH or VNC application you created when [connecting the server to Cloudflare](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/). Select **Configure**.
3. Turn on **Allow access through browser-based RDP, SSH, or VNC sessions**, then select _SSH_ or _VNC_.  
Note  
Ensure that only **Allow** or **Block** policies are present. **Bypass** and **Service Auth** are not supported for browser-rendered applications.
4. Select **Save**.

When users authenticate and visit the URL of the application, Cloudflare will render a terminal in their browser.

### RDP

To set up browser-rendering for RDP, refer to our [browser-based RDP guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-browser/).

### SSH key exchange algorithms

Cloudflare's browser-rendered SSH terminal supports the following Key Exchange (KEX) algorithms:

* `curve25519-sha256@libssh.org`
* `curve25519-sha256`
* `ecdh-sha2-nistp256`
* `ecdh-sha2-nistp384`
* `ecdh-sha2-nistp521`

For browser-rendered SSH connections to work, you may need to update the `sshd_config` file on your server to accept these algorithms.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/browser-rendering/#page","headline":"Browser-rendered terminal · Cloudflare One docs","description":"Browser-rendered terminal in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/browser-rendering/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH","RDP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/","name":"Non-HTTP applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/browser-rendering/","name":"Browser-rendered terminal"}}]}
```
