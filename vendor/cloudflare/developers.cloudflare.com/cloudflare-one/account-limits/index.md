---
title: Account limits
description: Reference information for Account limits in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Account limits

This page lists the default account limits for rules, applications, fields, and other features. These limits may be increased on Enterprise accounts. To request a limit increase, contact your account team.

## Access

| Feature                               | Limit    |
| ------------------------------------- | -------- |
| Applications                          | 500      |
| Audit Logpush jobs                    | 5        |
| Email addresses per rule              | 1,000    |
| Rule groups                           | 300      |
| Rules per rule group                  | 1,000    |
| IP addresses per rule                 | 1,000    |
| mTLS root certificates                | 50       |
| Service tokens                        | 50       |
| Identity providers                    | 50       |
| Reusable policies                     | 500      |
| Rules per application                 | 1,000    |
| Domains per application               | 5        |
| Infrastructure targets                | 5,000    |
| MCP portals                           | 20       |
| MCP servers per portal                | 20       |
| Custom domains per MCP portal         | 5        |
| MCP portal session inactivity timeout | 24 hours |

## Gateway

| Feature                                   | Limit |
| ----------------------------------------- | ----- |
| DNS policies per account                  | 500   |
| Network policies per account              | 500   |
| HTTP policies per account                 | 500   |
| Egress policies per account               | 500   |
| Resolver policies per account             | 500   |
| DNS locations                             | 250   |
| Source IP CIDRs per DNS location          | 1,500 |
| Concurrent streams for HTTP/2 connections | 256   |
| PAC files (Standard users)                | 50    |
| PAC files (Enterprise users)              | 1,000 |
| Proxy endpoints (Standard users)          | 50    |
| Proxy endpoints (Enterprise users)        | 500   |
| Source IP CIDRs per proxy endpoint        | 2,000 |
| Lists                                     | 100   |
| Entries per list (Standard users)         | 1,000 |
| Entries per list (Enterprise users)       | 5,000 |
| List API requests per minute              | 600   |
| DNS Logpush jobs                          | 5     |
| HTTP Logpush jobs                         | 5     |

## Data Loss Prevention (DLP)

| Feature                                  | Limit     |
| ---------------------------------------- | --------- |
| Custom entries                           | 25        |
| Exact Data Match cells per spreadsheet   | 100,000   |
| Custom Wordlist keywords per spreadsheet | 200       |
| Custom Wordlist keywords per account     | 1,000     |
| Dataset cells per account                | 1,000,000 |

## Cloudflare Tunnel

| Feature                                            | Limit                               |
| -------------------------------------------------- | ----------------------------------- |
| cloudflared tunnels per account                    | 1,000                               |
| Routes (CIDR routes + Hostname routes) per account | 1,000 (shared with Cloudflare Mesh) |
| Active cloudflared replicas per tunnel             | 25                                  |
| Virtual networks per account                       | 1,000                               |

## Cloudflare Mesh

| Feature                          | Limit                                 |
| -------------------------------- | ------------------------------------- |
| Mesh nodes per account           | 50                                    |
| Routes (CIDR routes) per account | 1,000 (shared with Cloudflare Tunnel) |

## Digital Experience Monitoring (DEX)

| Feature                 | Limit                                                                      |
| ----------------------- | -------------------------------------------------------------------------- |
| DEX Tests per account   | Zero Trust Free: 10  Zero Trust Standard: 30  Zero Trust Enterprise: 50    |
| Remote captures per day | Zero Trust Free: 100  Zero Trust Standard: 200  Zero Trust Enterprise: 800 |

## Certificates

| Feature                        | Limit |
| ------------------------------ | ----- |
| Active certificates            | 10    |
| Certificates generated per day | 3     |
| Custom certificates            | 5     |

## Maximum number of characters

| Feature                       | Character limit |
| ----------------------------- | --------------- |
| Application name              | 350             |
| Group name                    | 350             |
| mTLS certificates name        | 350             |
| Service token name            | 350             |
| IdP name                      | 350             |
| Target name                   | 255             |
| Application URL               | 63              |
| Team domain                   | 63              |
| MCP portal name               | 350             |
| MCP server name               | 350             |
| MCP server description        | 512             |
| MCP tool alias                | 40              |
| MCP portal/server ID          | 32              |
| Gateway API policy expression | 140,000         |

## Cloudflare One Client

| Feature                                                                    | Limit  |
| -------------------------------------------------------------------------- | ------ |
| Characters per device profile expression                                   | 10,000 |
| Combined Split Tunnel and Local Domain Fallback entries per device profile | 1,000  |
| Device IP profiles per account                                             | 30     |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/account-limits/#page","headline":"Account limits · Cloudflare One docs","description":"Reference information for Account limits in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/account-limits/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-04","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/account-limits/","name":"Account limits"}}]}
```
