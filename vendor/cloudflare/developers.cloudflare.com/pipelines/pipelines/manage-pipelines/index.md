---
title: Manage pipelines
description: Create, configure, and manage SQL transformations between streams and sinks
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage pipelines

Learn how to:

* Create pipelines with SQL transformations
* View pipeline configuration and SQL
* Delete pipelines when no longer needed

## Create a pipeline

Pipelines execute SQL statements that define how data flows from streams to sinks.

### Dashboard

1. In the Cloudflare dashboard, go to the **Pipelines** page.  
[ Go to **Pipelines** ](https://dash.cloudflare.com/?to=/:account/pipelines/overview)
2. Select **Create Pipeline** to launch the pipeline creation wizard.
3. Follow the wizard to configure your stream, sink, and SQL transformation.

### Wrangler CLI

To create a pipeline, run the [pipelines create](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-create) command:

Terminal window

```

npx wrangler pipelines create my-pipeline \

  --sql "INSERT INTO my_sink SELECT * FROM my_stream"


```

You can also provide SQL from a file:

Terminal window

```

npx wrangler pipelines create my-pipeline \

  --sql-file pipeline.sql


```

Alternatively, to use the interactive setup wizard that helps you configure a stream, sink, and pipeline, run the [pipelines setup](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-setup) command:

Terminal window

```

npx wrangler pipelines setup


```

### SQL transformations

Pipelines support SQL statements for data transformation. For complete syntax, supported functions, and data types, see the [SQL reference](https://developers.cloudflare.com/pipelines/sql-reference/).

Common patterns include:

#### Basic data flow

Transfer all data from stream to sink:

```

INSERT INTO my_sink SELECT * FROM my_stream


```

#### Filtering events

Filter events based on conditions:

```

INSERT INTO my_sink

SELECT * FROM my_stream

WHERE event_type = 'purchase' AND amount > 100


```

#### Selecting specific fields

Choose only the fields you need:

```

INSERT INTO my_sink

SELECT user_id, event_type, timestamp, amount

FROM my_stream


```

#### Transforming data

Apply transformations to fields:

```

INSERT INTO my_sink

SELECT

  user_id,

  UPPER(event_type) as event_type,

  timestamp,

  amount * 1.1 as amount_with_tax

FROM my_stream


```

## View pipeline configuration

### Dashboard

1. In the Cloudflare dashboard, go to the **Pipelines** page.
2. Select a pipeline to view its SQL transformation, connected streams/sinks, and associated metrics.

### Wrangler CLI

To view a specific pipeline, run the [pipelines get](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-get) command with either the pipeline ID or pipeline name:

Terminal window

```

npx wrangler pipelines get <PIPELINE_NAME_OR_ID>


```

To list all pipelines in your account, run the [pipelines list](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-list) command:

Terminal window

```

npx wrangler pipelines list


```

## Delete a pipeline

Deleting a pipeline stops data flow from the connected stream to sink.

### Dashboard

1. In the Cloudflare dashboard, go to the **Pipelines** page.
2. Select the pipeline you want to delete. 3\. In the **Settings** tab, and select **Delete**.

### Wrangler CLI

To delete a pipeline, run the [pipelines delete](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-delete) command:

Terminal window

```

npx wrangler pipelines delete <PIPELINE_ID>


```

Warning

Deleting a pipeline immediately stops data flow between the stream and sink.

## Limitations

Pipeline SQL cannot be modified after creation. To change the SQL transformation, you must delete and recreate the pipeline.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/pipelines/manage-pipelines/#page","headline":"Manage pipelines · Cloudflare Pipelines Docs","description":"Create, configure, and manage SQL transformations between streams and sinks","url":"https://developers.cloudflare.com/pipelines/pipelines/manage-pipelines/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/pipelines/manage-pipelines/","name":"Manage pipelines"}}]}
```
