---
title: Download Cloudflare One Client LTS releases
description: Reference information for Download Cloudflare One Client LTS releases in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Download Cloudflare One Client LTS releases

Long-Term Support (LTS) releases are stable releases that are guaranteed to continue receiving security bug fixes for at least 12 months or 90 days after the next LTS release, whichever is greater.

For more details on Cloudflare One Client support timelines and end-of-life (EOL) policies, refer to the [Support lifecycle](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/support-lifecycle/) page.

Note

No LTS releases are currently available, as Cloudflare is still rolling out our new LTS release process. When a stable release is declared an LTS release, it will be listed on this page and announced in the [Cloudflare One Client changelog](https://developers.cloudflare.com/cloudflare-one/changelog/cloudflare-one-client/).

## Windows

| **OS version**             | Windows 10 LTSC, Windows 11, Windows 365 Cloud PC running Windows 11 |
| -------------------------- | -------------------------------------------------------------------- |
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                    |
| **.NET Framework version** | 4.7.2 or later                                                       |
| **HD space**               | 184 MB                                                               |
| **Memory**                 | 3 MB                                                                 |
| **Network interface type** | Wi-Fi or LAN                                                         |
| **MTU**                    | 1381 bytes recommended [1](#user-content-fn-1)                       |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

## macOS

| **OS version**             | Sonoma 14.0+, Sequoia 15.1+ (15.0.x is not supported), Tahoe 26.0+ |
| -------------------------- | ------------------------------------------------------------------ |
| **Processor**              | Intel or M series                                                  |
| **HD space**               | 75 MB                                                              |
| **Memory**                 | 35 MB                                                              |
| **Network interface type** | Wi-Fi or LAN                                                       |
| **MTU**                    | 1381 bytes recommended [1](#user-content-fn-1)                     |

## Footnotes

1. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-1)

## Linux

| **OS version**             | CentOS 8, RHEL 8, RHEL 9 [1](#user-content-fn-1), Debian 12, Debian 13, Fedora 34, Fedora 35, Ubuntu 22.04 LTS, Ubuntu 24.04 LTS |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Processor**              | AMD64 / x86-64 or ARM64 / AArch64                                                                                                |
| **HD space**               | 75 MB                                                                                                                            |
| **Memory**                 | 35 MB                                                                                                                            |
| **Network interface type** | Wi-Fi or LAN                                                                                                                     |
| **MTU**                    | 1381 bytes recommended [2](#user-content-fn-2)                                                                                   |

## Footnotes

1. On RHEL 9 and later, enable the [Extra Packages for Enterprise Linux (EPEL) ↗](https://docs.fedoraproject.org/en-US/epel/) repository (`sudo dnf install epel-release`) before installing `cloudflare-warp`. EPEL provides dependencies required by the client UI. [↩](#user-content-fnref-1)
2. Minimum 1281 bytes with [Path MTU Discovery](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/path-mtu-discovery/) [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/lts-releases/#page","headline":"Download Cloudflare One Client LTS releases · Cloudflare One docs","description":"Reference information for Download Cloudflare One Client LTS releases in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/lts-releases/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/","name":"Download Cloudflare One Client stable releases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/lts-releases/","name":"Download Cloudflare One Client LTS releases"}}]}
```
