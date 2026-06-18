---
title: Programmable Flow Protection
description: Configure Programmable Flow Protection programs and rules using the Cloudflare API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Programmable Flow Protection

Use the [Cloudflare API](https://developers.cloudflare.com/api/) to configure Programmable Flow Protection.

For examples of API calls, refer to [Common API calls](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/examples/).

## Endpoints

To obtain the complete endpoint, append the Programmable Flow Protection API endpoints listed below to the Cloudflare API base URL:

```

https://api.cloudflare.com/client/v4


```

The `{account_id}` argument is the [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The tables in the following sections summarize the available operations.

### Program operations

| Operation           | Method and endpoint / Description                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| List programs       | GET accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programsFetches all Programmable Flow Protection programs in the account. |
| Upload a program    | POST accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programsUploads a new program to the account.                            |
| Get a program       | GET accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs/{program\_id}Fetches the details of an existing program.         |
| Update a program    | PATCH accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs/{program\_id}Updates an existing program.                      |
| Delete a program    | DELETE accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs/{program\_id}Deletes an existing program from the account.    |
| Delete all programs | DELETE accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programsDeletes all existing programs from the account.                |

### Rule operations

| Operation        | Method and endpoint / Description                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| List rules       | GET accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rulesFetches all Programmable Flow Protection rules in the account. |
| Create a rule    | POST accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rulesCreates a new rule in the account.                            |
| Get a rule       | GET accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rules/{rule\_id}Fetches the details of an existing rule.            |
| Update a rule    | PATCH accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rules/{rule\_id}Updates an existing rule in the account.          |
| Delete a rule    | DELETE accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rules/{rule\_id}Deletes an existing rule from the account.       |
| Delete all rules | DELETE accounts/{account\_id}/magic/programmable\_flow\_protection/configs/rulesDeletes all existing rules from the account.                |

### Debug operations

| Operation       | Method and endpoint / Description                                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Debug with PCAP | POST accounts/{account\_id}/magic/programmable\_flow\_protection/configs/programs/{program\_id}/pcapRuns a program against a PCAP file and returns an annotated PCAP with program verdicts. |

## Pagination

The API operations that return a list of items use pagination. For more information on the available pagination query parameters, refer to [Pagination](https://developers.cloudflare.com/fundamentals/api/how-to/make-api-calls/#pagination).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/#page","headline":"Configure Programmable Flow Protection via API · Cloudflare DDoS Protection docs","description":"Configure Programmable Flow Protection programs and rules using the Cloudflare API.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/","name":"API configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/","name":"Programmable Flow Protection"}}]}
```
