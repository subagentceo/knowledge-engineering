---
title: AI security
description: Reference information for AI security in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AI security

The AI security report dashboard summarizes your organization's AI usage and potential security risks.

To view the AI security report dashboard:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights**.
2. Go to **Dashboards**.
3. Select **AI security report**.

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## Prerequisites

To populate the AI security report dashboard, you must have:

* [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) enabled to inspect outbound HTTP and DNS traffic.
* User traffic to SaaS AI applications (for example, ChatGPT or Gemini) sent through Cloudflare Gateway.
* [Model Context Protocol (MCP) servers](https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/) behind [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/) policies.

## Available insights

The AI security report dashboard includes the following panels and metrics:

* [Top 5 visited AI applications by user count](#top-5-visited-ai-applications-by-user-count)
* [Statuses applied to AI applications by application count](#statuses-applied-to-ai-applications-by-application-count)
* [Data uploaded to Artificial Intelligence applications by status](#data-uploaded-to-artificial-intelligence-applications-by-status)
* [MCP servers behind Access over time](#mcp-servers-behind-access-over-time)
* [Access login events to MCP servers](#access-login-events-to-mcp-servers)

### Top 5 visited AI applications by user count

Displays the most accessed AI tools in your organization and the number of users visiting each application in a time-series graph.  
Each bar represents user activity for a specific AI application (for example, ChatGPT or Gemini) over time.

Use this chart to monitor adoption trends and detect new or unauthorized AI tools being accessed.

### Statuses applied to AI applications by application count

Reports the total number of AI applications identified and their review statuses.  
Statuses include:

* Unreviewed — Applications not yet evaluated by administrators.
* In Review — Applications currently under review for approval.
* Unapproved — Applications that are restricted or blocked.
* Approved — Applications explicitly permitted for organizational use.

### Data uploaded to Artificial Intelligence applications by status

Reports the amount of data transferred to AI tools, broken down by review status (Unreviewed, In Review, Unapproved, Approved).  
Use this report to understand whether sensitive data is being sent to unapproved or unreviewed AI applications.

### MCP servers behind Access over time

Displays the number of Model Context Protocol (MCP) servers protected by [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/) policies over time. Use this panel to verify that newly deployed MCP servers are protected.

### Access login events to MCP servers

Reports the number of login events to MCP servers protected by Access policies. Use this panel to identify unusual login patterns, such as spikes in access from unexpected users.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/ai-security/#page","headline":"AI security · Cloudflare One docs","description":"Reference information for AI security in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/ai-security/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/analytics/","name":"Dashboards"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/analytics/ai-security/","name":"AI security"}}]}
```
