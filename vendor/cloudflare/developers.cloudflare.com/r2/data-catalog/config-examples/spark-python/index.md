---
title: Spark (PySpark)
description: Connect PySpark to R2 Data Catalog to read and write Iceberg tables.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Spark (PySpark)

**Last reviewed:**  about 1 year ago 

Below is an example of using [PySpark ↗](https://spark.apache.org/docs/latest/api/python/index.html) to connect to R2 Data Catalog.

## Prerequisites

* Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
* [Create an R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [enable the data catalog](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/#enable-r2-data-catalog-on-a-bucket).
* [Create an R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with both [R2 and data catalog permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions).
* Install the [PySpark ↗](https://spark.apache.org/docs/latest/api/python/getting%5Fstarted/install.html) library.

## Example usage

Python

```

from pyspark.sql import SparkSession


# Define catalog connection details (replace variables)

WAREHOUSE = "<WAREHOUSE>"

TOKEN = "<TOKEN>"

CATALOG_URI = "<CATALOG_URI>"


# Build Spark session with Iceberg configurations

spark = SparkSession.builder \

  .appName("R2DataCatalogExample") \

  .config('spark.jars.packages', 'org.apache.iceberg:iceberg-spark-runtime-3.5_2.12:1.6.1,org.apache.iceberg:iceberg-aws-bundle:1.6.1') \

  .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions") \

  .config("spark.sql.catalog.my_catalog", "org.apache.iceberg.spark.SparkCatalog") \

  .config("spark.sql.catalog.my_catalog.type", "rest") \

  .config("spark.sql.catalog.my_catalog.uri", CATALOG_URI) \

  .config("spark.sql.catalog.my_catalog.warehouse", WAREHOUSE) \

  .config("spark.sql.catalog.my_catalog.token", TOKEN) \

  .config("spark.sql.catalog.my_catalog.header.X-Iceberg-Access-Delegation", "vended-credentials") \

  .config("spark.sql.catalog.my_catalog.s3.remote-signing-enabled", "false") \

  .config("spark.sql.defaultCatalog", "my_catalog") \

  .getOrCreate()

spark.sql("USE my_catalog")


# Create namespace if it does not exist

spark.sql("CREATE NAMESPACE IF NOT EXISTS default")


# Create a table in the namespace using Iceberg

spark.sql("""

    CREATE TABLE IF NOT EXISTS default.my_table (

        id BIGINT,

        name STRING

    )

    USING iceberg

""")


# Create a simple DataFrame

df = spark.createDataFrame(

    [(1, "Alice"), (2, "Bob"), (3, "Charlie")],

    ["id", "name"]

)


# Write the DataFrame to the Iceberg table

df.write \

    .format("iceberg") \

    .mode("append") \

    .save("default.my_table")


# Read the data back from the Iceberg table

result_df = spark.read \

    .format("iceberg") \

    .load("default.my_table")


result_df.show()


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/data-catalog/config-examples/spark-python/#page","headline":"Spark (PySpark) · Cloudflare R2 docs","description":"Connect PySpark to R2 Data Catalog to read and write Iceberg tables.","url":"https://developers.cloudflare.com/r2/data-catalog/config-examples/spark-python/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/data-catalog/","name":"R2 Data Catalog"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/data-catalog/config-examples/","name":"Connect to Iceberg engines"}},{"@type":"ListItem","position":5,"item":{"@id":"/r2/data-catalog/config-examples/spark-python/","name":"Spark (PySpark)"}}]}
```
