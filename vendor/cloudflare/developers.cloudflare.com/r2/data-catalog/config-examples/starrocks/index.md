---
title: StarRocks
description: Connect StarRocks to R2 Data Catalog to query and modify Iceberg tables.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# StarRocks

**Last reviewed:**  11 months ago 

Below is an example of using [StarRocks ↗](https://docs.starrocks.io/docs/data%5Fsource/catalog/iceberg/iceberg%5Fcatalog/#rest) to connect, query, modify data from R2 Data Catalog (read-write).

## Prerequisites

* Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
* [Create an R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [enable the data catalog](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/#enable-r2-data-catalog-on-a-bucket).
* [Create an R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with both [R2 and data catalog permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions).
* A running [StarRocks ↗](https://www.starrocks.io/) frontend instance. You can use the [all-in-one ↗](https://docs.starrocks.io/docs/quick%5Fstart/shared-nothing/#launch-starrocks) docker setup.

## Example usage

In your running StarRocks instance, run these commands:

```

-- Create an Iceberg catalog named `r2` and set it as the current catalog


CREATE EXTERNAL CATALOG r2

PROPERTIES

(

    "type" = "iceberg",

    "iceberg.catalog.type" = "rest",

    "iceberg.catalog.uri" = "<r2_catalog_uri>",

    "iceberg.catalog.security" = "oauth2",

    "iceberg.catalog.oauth2.token" = "<r2_api_token>",

    "iceberg.catalog.warehouse" = "<r2_warehouse_name>"

);


SET CATALOG r2;


-- Create a database and display all databases in newly connected catalog


CREATE DATABASE testdb;


SHOW DATABASES FROM r2;


+--------------------+

| Database           |

+--------------------+

| information_schema |

| testdb             |

+--------------------+

2 rows in set (0.66 sec)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/data-catalog/config-examples/starrocks/#page","headline":"StarRocks · Cloudflare R2 docs","description":"Connect StarRocks to R2 Data Catalog to query and modify Iceberg tables.","url":"https://developers.cloudflare.com/r2/data-catalog/config-examples/starrocks/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/data-catalog/","name":"R2 Data Catalog"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/data-catalog/config-examples/","name":"Connect to Iceberg engines"}},{"@type":"ListItem","position":5,"item":{"@id":"/r2/data-catalog/config-examples/starrocks/","name":"StarRocks"}}]}
```
