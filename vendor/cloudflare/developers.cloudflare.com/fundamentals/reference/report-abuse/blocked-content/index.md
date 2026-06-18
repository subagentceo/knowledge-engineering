---
title: Blocked Content
description: Request removal of Trust and Safety content blocks on your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Blocked Content

If your domain has content that has been blocked, Blocked Content on the dashboard gives you the ability to request the Trust and Safety team to remove a block.

To view Blocked Content on the dashboard:

1. In the Cloudflare dashboard, go to the **Blocked Content** page.
[ Go to **Blocked content** ](https://dash.cloudflare.com/?to=/:account/blocked-content) 

Note

You must have Admin, Super Admin, or Trust and Safety [role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) to access Blocked Content.

The Security Center dashboard displays three statuses for blocked content: active, pending, or resolved blocks.

## Active blocks

An active block is a block that is in effect on blocking content.

When you select **Request Review**, the status changes to **In Review**, and the block will be reviewed by the Trust and Safety team.

## Pending blocks

A pending block represents a blocking action Cloudflare will take at the scheduled time.

You can view all your pending blocks by selecting **Pending** on the dashboard. Selecting **Request Review** cancels the pending delayed action. This means that the block will not be placed.

## Resolved blocks

Resolved blocks list your recently resolved blocks. Resolved blocks are limited to 30 days of recently resolved blocks. Resolved blocks require no action. You can only sort and/or filter the list.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/report-abuse/blocked-content/#page","headline":"Blocked Content · Cloudflare Fundamentals docs","description":"Request removal of Trust and Safety content blocks on your domain.","url":"https://developers.cloudflare.com/fundamentals/reference/report-abuse/blocked-content/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/report-abuse/","name":"Abuse"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/reference/report-abuse/blocked-content/","name":"Blocked Content"}}]}
```
