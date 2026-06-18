---
title: Advanced TCP Protection
description: Configure Advanced TCP Protection prefixes, allowlists, and rules using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Advanced TCP Protection

You can configure Advanced TCP Protection using the Advanced TCP Protection API.

The Advanced TCP Protection API only supports [API token authentication](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

For examples of API calls, refer to [Common API calls](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/examples/).

## Endpoints

To obtain the complete endpoint, append the Advanced TCP Protection API endpoints listed below to the Cloudflare API base URL.

The Cloudflare API base URL is:

```

https://api.cloudflare.com/client/v4


```

The `{account_id}` argument is the account ID (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The tables in the following sections summarize the available operations.

### General operations

| Operation                             | Method and endpoint / Description                                                                                                                               |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get Advanced TCP Protection status    | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_protection\_statusGets the global Advanced TCP Protection status (enabled or disabled). |
| Update Advanced TCP Protection status | PATCH accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_protection\_statusEnables or disables Advanced TCP Protection.                        |

### Prefix operations

| Operation            | Method and endpoint / Description                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List prefixes        | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixesFetches all Advanced TCP Protection prefixes in the account.                 |
| Add prefixes in bulk | POST accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/bulkAdds prefixes in bulk to the account (up to 300 prefixes per request). |
| Get a prefix         | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}Fetches the details of an existing prefix.                      |
| Update a prefix      | PATCH accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}Updates an existing prefix.                                   |
| Delete a prefix      | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}Deletes an existing prefix.                                  |
| Delete all prefixes  | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixesDeletes all existing prefixes from the account.                           |

### Allowlist operations

| Operation                       | Method and endpoint / Description                                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List allowlisted prefixes       | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlistFetches all prefixes in the account allowlist.                              |
| Add an allowlisted prefix       | POST accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlistAdds a prefix to the allowlist.                                            |
| Get an allowlisted prefix       | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist/{allowlist\_id}Fetches the details of an existing prefix in the allowlist. |
| Update an allowlisted prefix    | PATCH accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist/{allowlist\_id}Updates an existing prefix in the allowlist.              |
| Delete an allowlisted prefix    | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist/{allowlist\_id}Deletes an existing prefix from the allowlist.           |
| Delete all allowlisted prefixes | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlistDeletes all existing prefixes from the allowlist.                        |

### SYN Flood Protection operations

#### Rules

| Operation                  | Method and endpoint / Description                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List SYN flood rules       | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rulesFetches all SYN flood rules in the account.                                  |
| Add a SYN flood rule       | POST accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rulesAdds a SYN flood rule to the account.                                       |
| Get a SYN flood rule       | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rules/{rule\_id}Fetches the details of an existing SYN flood rule in the account. |
| Update a SYN flood rule    | PATCH accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rules/{rule\_id}Updates an existing SYN flood rule in the account.              |
| Delete a SYN flood rule    | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rules/{rule\_id}Deletes an existing SYN flood rule from the account.           |
| Delete all SYN flood rules | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rulesDeletes all existing SYN flood rules from the account.                    |

#### Filters

| Operation                    | Method and endpoint / Description                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List SYN flood filters       | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filtersFetches all SYN flood filters in the account.                                    |
| Add a SYN flood filter       | POST accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filtersAdds a SYN flood filter to the account.                                         |
| Get a SYN flood filter       | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filters/{filter\_id}Fetches the details of an existing SYN flood filter in the account. |
| Update a SYN flood filter    | PATCH accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filters/{filter\_id}Updates an existing SYN flood filter in the account.              |
| Delete a SYN flood filter    | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filters/{filter\_id}Deletes an existing SYN flood filter from the account.           |
| Delete all SYN flood filters | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filtersDeletes all existing SYN flood filters from the account.                      |

### Out-of-state TCP Protection operations

#### Rules

| Operation                         | Method and endpoint / Description                                                                                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List out-of-state TCP rules       | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rulesFetches all out-of-state TCP rules in the account.                                  |
| Add an out-of-state TCP rule      | POST accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rulesAdds an out-of-state TCP rule to the account.                                      |
| Get an out-of-state TCP rule      | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules/{rule\_id}Fetches the details of an existing out-of-state TCP rule in the account. |
| Update an out-of-state TCP rule   | PATCH accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules/{rule\_id}Updates an existing out-of-state TCP rule in the account.              |
| Delete an out-of-state TCP rule   | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules/{rule\_id}Deletes an existing out-of-state TCP rule from the account.           |
| Delete all out-of-state TCP rules | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rulesDeletes all existing out-of-state TCP rules from the account.                    |

#### Filters

| Operation                           | Method and endpoint / Description                                                                                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| List out-of-state TCP filters       | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filtersFetches all out-of-state TCP filters in the account.                                    |
| Add an out-of-state TCP filter      | POST accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filtersAdds an out-of-state TCP filter to the account.                                        |
| Get an out-of-state TCP filter      | GET accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}Fetches the details of an existing out-of-state TCP filter in the account. |
| Update an out-of-state TCP filter   | PATCH accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}Updates an existing out-of-state TCP filter in the account.              |
| Delete an out-of-state TCP filter   | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}Deletes an existing out-of-state TCP filter from the account.           |
| Delete all out-of-state TCP filters | DELETE accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filtersDeletes all existing out-of-state TCP filters from the account.                      |

## Pagination

The API operations that return a list of items use pagination. For more information on the available pagination query parameters, refer to [Pagination](https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/#pagination).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/#page","headline":"Configure Advanced TCP Protection via API · Cloudflare DDoS Protection docs","description":"Configure Advanced TCP Protection prefixes, allowlists, and rules using the API.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/","name":"API configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/tcp-protection/","name":"Advanced TCP Protection"}}]}
```
