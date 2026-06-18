---
title: Audit Logs
description: Review audit log entries for configuration changes made to your D1 databases.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Audit Logs

[Audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) provide a comprehensive summary of changes made within your Cloudflare account, including those made to D1 databases. This functionality is available on all plan types, free of charge, and is always enabled.

## Viewing audit logs

To view audit logs for your D1 databases, go to the **Audit Logs** page.

[ Go to **Audit logs** ](https://dash.cloudflare.com/?to=/:account/audit-log) 

For more information on how to access and use audit logs, refer to [Review audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).

## Logged operations

The following configuration actions are logged:

| Operation                                                                | Description                             | |  CreateDatabase | Creation of a new database. |
| ------------------------------------------------------------------------ | --------------------------------------- | ----------------- | --------------------------- |
| DeleteDatabase                                                           | Deletion of an existing database.       |                   |                             |
| [TimeTravel](https://developers.cloudflare.com/d1/reference/time-travel) | Restoration of a past database version. |                   |                             |

## Example log entry

Below is an example of an audit log entry showing the creation of a new database:

```

{

  "action": { "info": "CreateDatabase", "result": true, "type": "create" },

  "actor": {

    "email": "<ACTOR_EMAIL>",

    "id": "b1ab1021a61b1b12612a51b128baa172",

    "ip": "1b11:a1b2:12b1:12a::11a:1b",

    "type": "user"

  },

  "id": "a123b12a-ab11-1212-ab1a-a1aa11a11abb",

  "interface": "API",

  "metadata": {},

  "newValue": "",

  "newValueJson": { "database_name": "my-db" },

  "oldValue": "",

  "oldValueJson": {},

  "owner": { "id": "211b1a74121aa32a19121a88a712aa12" },

  "resource": {

    "id": "11a21122-1a11-12bb-11ab-1aa2aa1ab12a",

    "type": "d1.database"

  },

  "when": "2024-08-09T04:53:55.752Z"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/observability/audit-logs/#page","headline":"Audit Logs · Cloudflare D1 docs","description":"Review audit log entries for configuration changes made to your D1 databases.","url":"https://developers.cloudflare.com/d1/observability/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/d1/observability/audit-logs/","name":"Audit Logs"}}]}
```
