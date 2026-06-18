---
title: REST API
description: Manage AI Search instances and sync jobs over HTTP using the Instances REST API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# REST API

Use the AI Search REST API to manage instances and sync jobs over HTTP.

## Authentication

All requests require an API token with **AI Search:Edit** and **AI Search:Run** permissions.

1. In the Cloudflare dashboard, go to **My Profile** \> **API Tokens**.  
[ Go to **API Tokens** ](https://dash.cloudflare.com/profile/api-tokens)
2. Select **Create Token**.
3. Select **Create Custom Token**.
4. Enter a **Token name**, for example `AI Search Manager`.
5. Under **Permissions**, add two permissions:  
   * **Account** \> **AI Search:Edit**  
   * **Account** \> **AI Search:Run**
6. Select **Continue to summary**, then select **Create Token**.
7. Copy and save the token value. This is your `API_TOKEN`.

Include the token in the `Authorization` header for all requests:

```

Authorization: Bearer <API_TOKEN>


```

## API paths

AI Search APIs are available at two base paths:

| Path                                                                    | Description                                                                                                  |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| /accounts/{account\_id}/ai-search/instances/{id}                        | Operates on a specific instance                                                                              |
| /accounts/{account\_id}/ai-search/namespaces/{namespace}/instances/{id} | Operates on instances within a [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/) |

The available operations are the same for both paths. For the namespace-scoped API, refer to the [Namespace API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/).

## Instances

Create, list, get, update, and delete AI Search instances. For the full specification, refer to the [Instances API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/).

| Operation                                                                                                    | Method | Description                   |
| ------------------------------------------------------------------------------------------------------------ | ------ | ----------------------------- |
| [Create](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/create/) | POST   | Create a new instance         |
| [List](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/list/)     | GET    | List all instances            |
| [Get](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/read/)      | GET    | Get an instance by ID         |
| [Update](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/update/) | PUT    | Update instance configuration |
| [Delete](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/delete/) | DELETE | Delete an instance            |
| [Stats](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/methods/stats/)   | GET    | Get indexing statistics       |

### Example: Create an instance

Create an instance in the default namespace:

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -H "Content-Type: application/json" \

  -d '{

    "id": "my-instance"

  }'


```

## Jobs

Trigger and monitor [sync jobs](https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/) that scan your data source and index new or updated content. For the full specification, refer to the [Jobs API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/subresources/jobs/).

| Operation                                                                                                                      | Method | Description                   |
| ------------------------------------------------------------------------------------------------------------------------------ | ------ | ----------------------------- |
| [Create](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/subresources/jobs/methods/create/) | POST   | Trigger a new sync job        |
| [List](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/subresources/jobs/methods/list/)     | GET    | List all jobs for an instance |
| [Get](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/subresources/jobs/methods/read/)      | GET    | Get job details               |
| [Logs](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/instances/subresources/jobs/methods/logs/)     | GET    | View job logs                 |

### Example: Trigger a sync job

Start a new sync job for an instance:

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/<INSTANCE_NAME>/jobs" \

  -H "Authorization: Bearer <API_TOKEN>"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/instances/rest-api/#page","headline":"REST API · Cloudflare AI Search docs","description":"Manage AI Search instances and sync jobs over HTTP using the Instances REST API.","url":"https://developers.cloudflare.com/ai-search/api/instances/rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/instances/","name":"Instances"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/instances/rest-api/","name":"REST API"}}]}
```
