---
title: REST API
description: Upload, list, and manage documents in AI Search instances using the Items REST API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# REST API

Use the AI Search REST API to upload, list, and manage individual documents within an instance.

Note

The Items API uploads files to an instance's built-in storage. For more details, refer to [Built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/).

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

| Path                                                                     | Description                                                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| /accounts/{account\_id}/ai-search/instances/{id}/                        | Operates on a specific instance                                                                              |
| /accounts/{account\_id}/ai-search/namespaces/{namespace}/instances/{id}/ | Operates on instances within a [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/) |

The available operations are the same for both paths. For the namespace-scoped API, refer to the [Namespace API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/).

## Items

Upload, list, get, delete, and download items within an instance. For the full specification, refer to the [Items API reference](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/subresources/instances/subresources/items/).

| Operation                                                                                                                                                   | Method | Description                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------ |
| [Upload](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/subresources/instances/subresources/items/methods/upload/)     | POST   | Upload a document for indexing |
| [List](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/subresources/instances/subresources/items/methods/list/)         | GET    | List all items in an instance  |
| [Get](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/subresources/instances/subresources/items/methods/get/)           | GET    | Get item info by ID            |
| [Delete](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/subresources/instances/subresources/items/methods/delete/)     | DELETE | Delete an item                 |
| [Download](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/namespaces/subresources/instances/subresources/items/methods/download/) | GET    | Download the original file     |

### Example: Upload a document

Upload a file to an instance:

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/<INSTANCE_NAME>/items" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -F "file=@/path/to/your/file.pdf"


```

### Example: List items

List all items in an instance:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances/<INSTANCE_NAME>/items" \

  -H "Authorization: Bearer <API_TOKEN>"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/api/items/rest-api/#page","headline":"REST API · Cloudflare AI Search docs","description":"Upload, list, and manage documents in AI Search instances using the Items REST API.","url":"https://developers.cloudflare.com/ai-search/api/items/rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/api/items/","name":"Items"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/api/items/rest-api/","name":"REST API"}}]}
```
