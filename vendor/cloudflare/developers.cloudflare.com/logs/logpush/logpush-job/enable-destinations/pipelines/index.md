---
title: Enable Cloudflare Pipelines
description: Push Cloudflare logs to Cloudflare Pipelines.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Cloudflare Pipelines

[Cloudflare Pipelines](https://developers.cloudflare.com/pipelines/) ingests events, transforms them with [SQL](https://developers.cloudflare.com/pipelines/sql-reference/), and delivers them to [R2](https://developers.cloudflare.com/r2/) as [Iceberg](https://developers.cloudflare.com/r2/data-catalog/) tables or as Parquet and JSON files. Logpush can write data to Pipelines as a native destination.

Instead of sending raw logs directly to a storage bucket as JSON, Logpush can route them to a Pipeline to filter, enrich, and transform your data into Parquet or Apache Iceberg tables managed by [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/). This allows the data to be much more compact and optimized for analytics such as querying with [R2 SQL](https://developers.cloudflare.com/r2-sql/).

The Pipelines destination supports the following Logpush datasets:

| Scope   | Datasets                                    |
| ------- | ------------------------------------------- |
| Zone    | http\_requests, firewall\_events, dns\_logs |
| Account | workers\_trace\_events                      |

For a full list of fields available in each dataset, refer to [Datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/).

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or domain (also known as zone) level.  
   * For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
   * For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Select **Create a Logpush job**.
3. Select **Pipelines** as the destination.
4. In the **Dataset** step, select the dataset from the dropdown.  
   * A Pipeline name is auto-generated, but you can edit it.
5. In the **Destination** step, configure the destination:  
   * Select an existing R2 bucket or type a new name to create one during setup.  
   * Choose the storage format: Parquet, JSON, or [R2 Data Catalog (Apache Iceberg)](https://developers.cloudflare.com/r2/data-catalog/).  
   * If you select R2 Data Catalog, enter a catalog namespace and table name.  
   * Optionally, expand **Delivery settings** to configure roll size, roll interval, and other destination-specific settings. For more information about these settings, refer to the [Pipelines Sinks documentation](https://developers.cloudflare.com/pipelines/sinks/).
6. In the **Transform** step, choose how to process logs before they are written to the Sink:  
   * **Simple** forwards all fields without modification (default).  
   * **Custom SQL** opens a SQL editor where you can filter, transform, and enrich your data. Refer to the [Pipelines SQL reference](https://developers.cloudflare.com/pipelines/sql-reference/) for a complete list of SQL functions.
7. In the **Review** step, verify your configuration and select **Create**. This automatically creates all required resources, including the [Stream](https://developers.cloudflare.com/pipelines/streams/), [Sink](https://developers.cloudflare.com/pipelines/sinks/), R2 credentials or Data Catalog token, [Pipeline](https://developers.cloudflare.com/pipelines/), and the Logpush job.

Note

It can take a few minutes for the events to start streaming from the Logpush source.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/pipelines/#page","headline":"Enable Cloudflare Pipelines · Cloudflare Logs docs","description":"Push Cloudflare logs to Cloudflare Pipelines.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/pipelines/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/pipelines/","name":"Enable Cloudflare Pipelines"}}]}
```
