---
title: PyIceberg
description: Connect PyIceberg to R2 Data Catalog to create and query Iceberg tables in Python.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# PyIceberg

**Last reviewed:**  about 1 year ago 

Below is an example of using [PyIceberg ↗](https://py.iceberg.apache.org/) to connect to R2 Data Catalog.

## Prerequisites

* Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
* [Create an R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [enable the data catalog](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/#enable-r2-data-catalog-on-a-bucket).
* [Create an R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with both [R2 and data catalog permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions).
* Install the [PyIceberg ↗](https://py.iceberg.apache.org/#installation) and [PyArrow ↗](https://arrow.apache.org/docs/python/install.html) libraries.

## Example usage

Python

```

import pyarrow as pa

from pyiceberg.catalog.rest import RestCatalog

from pyiceberg.exceptions import NamespaceAlreadyExistsError


# Define catalog connection details (replace variables)

WAREHOUSE = "<WAREHOUSE>"

TOKEN = "<TOKEN>"

CATALOG_URI = "<CATALOG_URI>"


# Connect to R2 Data Catalog

catalog = RestCatalog(

    name="my_catalog",

    warehouse=WAREHOUSE,

    uri=CATALOG_URI,

    token=TOKEN,

)


# Create default namespace

catalog.create_namespace("default")


# Create simple PyArrow table

df = pa.table({

    "id": [1, 2, 3],

    "name": ["Alice", "Bob", "Charlie"],

})


# Create an Iceberg table

test_table = ("default", "my_table")

table = catalog.create_table(

    test_table,

    schema=df.schema,

)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/data-catalog/config-examples/pyiceberg/#page","headline":"PyIceberg · Cloudflare R2 docs","description":"Connect PyIceberg to R2 Data Catalog to create and query Iceberg tables in Python.","url":"https://developers.cloudflare.com/r2/data-catalog/config-examples/pyiceberg/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/data-catalog/","name":"R2 Data Catalog"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/data-catalog/config-examples/","name":"Connect to Iceberg engines"}},{"@type":"ListItem","position":5,"item":{"@id":"/r2/data-catalog/config-examples/pyiceberg/","name":"PyIceberg"}}]}
```
