---
title: Upgrade your key server
description: Upgrade your Keyless SSL key server to the latest version.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Upgrade your key server

Periodically, you may need to update your key server when using Cloudflare's Keyless SSL.

To upgrade your key server:

1. Back up the contents of `/etc/keyless`.
2. Update your OS’ package listings, for example, `apt-get update` or `yum update`.
3. Upgrade the gokeyless server:
4. Debian/Ubuntu: `apt-get upgrade gokeyless`
5. RHEL/CentOS: `yum install gokeyless`
6. Restart the keyless instance:
7. systemd: `service gokeyless restart`
8. upstart/sysvinit: `/etc/init.d/gokeyless restart`
9. Confirm that HTTPS connections are working as expected.

Warning

If you are running a [high availability configuration](https://developers.cloudflare.com/ssl/keyless-ssl/reference/high-availability/), upgrade one server at a time as new TLS connections will fail to terminate at Cloudflare's global network without a functioning key server.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/upgrading-your-key-server/#page","headline":"Upgrade your key server · Cloudflare SSL/TLS docs","description":"Upgrade your Keyless SSL key server to the latest version.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/upgrading-your-key-server/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/upgrading-your-key-server/","name":"Upgrade your key server"}}]}
```
