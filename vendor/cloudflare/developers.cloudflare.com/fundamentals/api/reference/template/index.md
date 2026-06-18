---
title: API token templates
description: Explore Cloudflare's API token templates to efficiently manage permissions. Start with a template and customize token permissions and resources as needed.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# API token templates

Below is a table of the currently available API token templates and the default [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) they grant. You can start creating a token with one of these templates and modify the permissions and resources from there.

| Template Name                           | Permission                               | Resource            |
| --------------------------------------- | ---------------------------------------- | ------------------- |
| Edit Zone DNS                           | DNS Write                                | Zone                |
| Read billing info                       | Billing Read                             | Account             |
| Account resources: Include all accounts |                                          |                     |
| Read analytics and logs                 | Analytics Read                           | Zone                |
| Logs Read                               | Zone                                     |                     |
| Edit Cloudflare Workers                 | Workers Routes Write                     | Zone                |
| Workers Scripts Write                   | Account                                  |                     |
| Workers KV Storage Write                | Account                                  |                     |
| Workers Tail Read                       | Account                                  |                     |
| Workers R2 Storage Write                | Account                                  |                     |
| Account Settings Read                   | Account                                  |                     |
| User Details Read                       | User                                     |                     |
| User Memberships Read                   | User                                     |                     |
| Edit load balancing configuration       | Load Balancing: Monitors and Pools Write | Account             |
| Load Balancers Write                    | Zone                                     |                     |
| WordPress                               | Analytics Read                           | Zone                |
| Zone Read                               | Zone                                     |                     |
| Zone Settings Write                     | Zone                                     |                     |
| Account Settings Read                   | Account                                  |                     |
| DNS Read                                | Zone                                     |                     |
| Cache Purge                             | Zone                                     |                     |
| Account resources: Include all accounts |                                          |                     |
| Zone resources: Include all zones       |                                          |                     |
| Create Additional Tokens                | API Tokens Write                         | User                |
| Read All Resources                      | _(All read permissions)_                 | Account, Zone, User |
| Account resources: Include all accounts |                                          |                     |
| Zone resources: Include all zones       |                                          |                     |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/reference/template/#page","headline":"API token templates · Cloudflare Fundamentals docs","description":"Explore Cloudflare's API token templates to efficiently manage permissions. Start with a template and customize token permissions and resources as needed.","url":"https://developers.cloudflare.com/fundamentals/api/reference/template/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/reference/template/","name":"API token templates"}}]}
```
