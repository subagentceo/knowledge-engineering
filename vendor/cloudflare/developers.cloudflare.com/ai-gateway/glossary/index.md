---
title: Header Glossary
description: Reference all supported AI Gateway headers for configuring, customizing, and managing API requests.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Header Glossary

AI Gateway supports a variety of headers to help you configure, customize, and manage your API requests. This page provides a complete list of all supported headers, along with a short description

| Term                   | Definition                                                                                                                                                                                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cf-aig-backoff         | Header to customize the backoff type for [request retries](https://developers.cloudflare.com/ai-gateway/configuration/request-handling/#request-retries) of a request.                                                                                                                          |
| cf-aig-cache-key       | The [cf-aig-cache-key-aig-cache-key](https://developers.cloudflare.com/ai-gateway/features/caching/#custom-cache-key-cf-aig-cache-key) let you override the default cache key in order to precisely set the cacheability setting for any resource.                                              |
| cf-aig-cache-status    | [Status indicator for caching](https://developers.cloudflare.com/ai-gateway/features/caching/#default-configuration), showing if a request was served from cache.                                                                                                                               |
| cf-aig-cache-ttl       | Specifies the [cache time-to-live for responses](https://developers.cloudflare.com/ai-gateway/features/caching/#cache-ttl-cf-aig-cache-ttl).                                                                                                                                                    |
| cf-aig-collect-log     | The [cf-aig-collect-log](https://developers.cloudflare.com/ai-gateway/observability/logging/#collect-logs-cf-aig-collect-log) header allows you to bypass the default log setting for the gateway.                                                                                              |
| cf-aig-custom-cost     | Allows the [customization of request cost](https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/#custom-cost) to reflect user-defined parameters.                                                                                                                            |
| cf-aig-dlp             | A response header returned when a [DLP policy](https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/#dlp-response-header) matches a request or response. Contains JSON with the action taken (Flag or Block), matched policy IDs, matched profile IDs, and detection entry IDs. |
| cf-aig-event-id        | [cf-aig-event-id](https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-api/#3-retrieve-the-cf-aig-log-id) is a unique identifier for an event, used to trace specific events through the system.                                                                         |
| cf-aig-log-id          | The [cf-aig-log-id](https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-api/#3-retrieve-the-cf-aig-log-id) is a unique identifier for the specific log entry to which you want to add feedback.                                                                         |
| cf-aig-max-attempts    | Header to customize the number of max attempts for [request retries](https://developers.cloudflare.com/ai-gateway/configuration/request-handling/#request-retries) of a request.                                                                                                                |
| cf-aig-metadata        | [Custom metadata](https://developers.cloudflare.com/ai-gateway/configuration/custom-metadata/)allows you to tag requests with user IDs or other identifiers, enabling better tracking and analysis of your requests.                                                                            |
| cf-aig-request-timeout | Header to set a [request timeout](https://developers.cloudflare.com/ai-gateway/configuration/request-handling/#request-timeouts) (measured in milliseconds). If the provider does not respond within this time, the request returns an error.                                                   |
| cf-aig-retry-delay     | Header to customize the retry delay for [request retries](https://developers.cloudflare.com/ai-gateway/configuration/request-handling/#request-retries) of a request.                                                                                                                           |
| cf-aig-skip-cache      | Header to [bypass caching for a specific request](https://developers.cloudflare.com/ai-gateway/features/caching/#skip-cache-cf-aig-skip-cache).                                                                                                                                                 |
| cf-aig-step            | The cf-aig-step response header identifies which step in a request flow successfully processed the request, useful for tracking and debugging.                                                                                                                                                  |
| cf-cache-ttl           | Deprecated: This header is replaced by cf-aig-cache-ttl. It specifies cache time-to-live.                                                                                                                                                                                                       |
| cf-skip-cache          | Deprecated: This header is replaced by cf-aig-skip-cache. It bypasses caching for a specific request.                                                                                                                                                                                           |

## Configuration hierarchy

Settings in AI Gateway can be configured at two levels: **Request** and **Gateway**. Since the same settings can be configured in multiple locations, the following hierarchy determines which value is applied:

1. **Request-level headers**: Headers included in individual requests take precedence over gateway-level settings.
2. **Gateway-level settings**: Act as the default if no headers are set at the request level.

This hierarchy ensures consistent behavior, prioritizing the most specific configurations. Use request-level headers for fine-tuned control, and gateway settings for general defaults.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/glossary/#page","headline":"Header Glossary · Cloudflare AI Gateway docs","description":"Reference all supported AI Gateway headers for configuring, customizing, and managing API requests.","url":"https://developers.cloudflare.com/ai-gateway/glossary/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/glossary/","name":"Header Glossary"}}]}
```
