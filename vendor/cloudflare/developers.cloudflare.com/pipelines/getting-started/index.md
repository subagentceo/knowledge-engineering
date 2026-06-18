---
title: Getting started
description: Create your first pipeline to ingest streaming data and write to R2 Data Catalog as an Apache Iceberg table.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Getting started

This guide will instruct you through:

* Creating an [API token](https://developers.cloudflare.com/r2/api/tokens/) needed for pipelines to authenticate with your data catalog.
* Creating your first pipeline with a simple ecommerce schema that writes to an [Apache Iceberg ↗](https://iceberg.apache.org/) table managed by R2 Data Catalog.
* Sending sample ecommerce data via HTTP endpoint.
* Validating data in your bucket and querying it with R2 SQL.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create an API token

Pipelines must authenticate to R2 Data Catalog with an [R2 API token](https://developers.cloudflare.com/r2/api/tokens/) that has catalog and R2 permissions.

1. In the Cloudflare dashboard, go to the **R2 object storage** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select **Manage API tokens**.
3. Select **Create Account API token**.
4. Give your API token a name.
5. Under **Permissions**, select the **Admin Read & Write** permission.
6. Select **Create Account API Token**.
7. Note the **Token value**.

Note

This token also includes the R2 SQL Read permission, which allows you to query your data with R2 SQL.

## 2\. Create your first pipeline

* [ Wrangler CLI ](#tab-panel-9449)
* [ Dashboard ](#tab-panel-9450)

First, create a schema file that defines your ecommerce data structure:

**Create `schema.json`:**

```

{

  "fields": [

    {

      "name": "user_id",

      "type": "string",

      "required": true

    },

    {

      "name": "event_type",

      "type": "string",

      "required": true

    },

    {

      "name": "product_id",

      "type": "string",

      "required": false

    },

    {

      "name": "amount",

      "type": "float64",

      "required": false

    }

  ]

}


```

Use the interactive setup to create a pipeline that writes to R2 Data Catalog:

Terminal window

```

npx wrangler pipelines setup


```

Note

The setup command automatically creates the [R2 bucket](https://developers.cloudflare.com/r2/buckets/) and enables [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/) if they do not already exist, so you do not need to create them beforehand.

Follow the prompts:

1. **Pipeline name**: Enter `ecommerce`
2. **Stream configuration**:  
   * Enable HTTP endpoint: `yes`  
   * Require authentication: `no` (for simplicity)  
   * Configure custom CORS origins: `no`  
   * Schema definition: `Load from file`  
   * Schema file path: `schema.json` (or your file path)
3. **Sink configuration**:  
   * Destination type: `Data Catalog (Iceberg)`  
   * Setup mode: `Simple (recommended defaults)`  
   * R2 bucket name: `pipelines-tutorial` (created automatically if it does not exist)  
   * Table name: `ecommerce`  
   * Catalog API token: Enter your token from step 1
4. **Review**: Confirm the summary and select `Create resources`
5. **SQL transformation**: Choose `Simple ingestion (SELECT * FROM stream)`

Note

If you make a mistake during setup (such as an invalid name or incorrect credentials), you will be prompted to retry rather than needing to restart the entire setup process.

Advanced mode options

If you select **Advanced** instead of **Simple** during sink configuration, you can customize the following additional options:

* **Format**: Output file format (for example, Parquet)
* **Compression**: Compression algorithm (for example, zstd)
* **Rolling policy**: File size threshold (minimum 5 MB) and time interval (minimum 10 seconds) for creating new files
* **Credentials**: Choose between automatic credential generation or manually entering R2 credentials
* **Namespace**: Data Catalog namespace (defaults to `default`)

After setup completes, the command outputs a configuration snippet for your Wrangler file, a Worker binding example with sample data, and a curl command for the HTTP endpoint. Note the HTTP endpoint URL and the `pipelines` configuration for use in the following steps.

You can also pre-set the pipeline name using the `--name` flag:

Terminal window

```

npx wrangler pipelines setup --name ecommerce


```

1. In the Cloudflare dashboard, go to **R2 object storage**.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select **Create bucket** and enter the bucket name: `pipelines-tutorial`.
3. Select **Create bucket**.
4. Select the bucket, switch to the **Settings** tab, scroll down to **R2 Data Catalog**, and select **Enable**.
5. Once enabled, note the **Catalog URI** and **Warehouse name**.
6. Go to **Pipelines** \> **Pipelines**.  
[ Go to **Pipelines** ](https://dash.cloudflare.com/?to=/:account/pipelines/overview)
7. Select **Create Pipeline**.
8. **Connect to a Stream**:  
   * Pipeline name: `ecommerce`  
   * Enable HTTP endpoint for sending data: Enabled  
   * HTTP authentication: Disabled (default)  
   * Select **Next**
9. **Define Input Schema**:  
   * Select **JSON editor**  
   * Copy in the schema:  
   ```  
   {  
     "fields": [  
       {  
         "name": "user_id",  
         "type": "string",  
         "required": true  
       },  
       {  
         "name": "event_type",  
         "type": "string",  
         "required": true  
       },  
       {  
         "name": "product_id",  
         "type": "string",  
         "required": false  
       },  
       {  
         "name": "amount",  
         "type": "float64",  
         "required": false  
       }  
     ]  
   }  
   ```  
   * Select **Next**
10. **Define Sink**:  
   * Select your R2 bucket: `pipelines-tutorial`  
   * Storage type: **R2 Data Catalog**  
   * Namespace: `default`  
   * Table name: `ecommerce`  
   * **Advanced Settings**: Change **Maximum Time Interval** to `10 seconds`  
   * Select **Next**
11. **Credentials**:  
   * Disable **Automatically create an Account API token for your sink**  
   * Enter **Catalog Token** from step 1  
   * Select **Next**
12. **Pipeline Definition**:  
   * Leave the default SQL query:  
   ```  
   INSERT INTO ecommerce_sink SELECT * FROM ecommerce_stream;  
   ```  
   * Select **Create Pipeline**
13. After pipeline creation, note the **Stream ID** for the next step.

## 3\. Send sample data

Send ecommerce events to your pipeline's HTTP endpoint:

Terminal window

```

curl -X POST https://{stream-id}.ingest.cloudflare.com \

  -H "Content-Type: application/json" \

  -d '[

    {

      "user_id": "user_12345",

      "event_type": "purchase",

      "product_id": "widget-001",

      "amount": 29.99

    },

    {

      "user_id": "user_67890",

      "event_type": "view_product",

      "product_id": "widget-002"

    },

    {

      "user_id": "user_12345",

      "event_type": "add_to_cart",

      "product_id": "widget-003",

      "amount": 15.50

    }

  ]'


```

Replace `{stream-id}` with your actual stream endpoint from the pipeline setup.

## 4\. Validate data in your bucket

1. In the Cloudflare dashboard, go to the **R2 object storage** page.
2. Select your bucket: `pipelines-tutorial`.
3. You should see Iceberg metadata files and data files created by your pipeline. If you are not seeing any files in your bucket, wait a couple of minutes and try again.
4. The data is organized in the Apache Iceberg format with metadata tracking table versions.

## 5\. Query your data using R2 SQL

Set up your environment to use R2 SQL:

Terminal window

```

export WRANGLER_R2_SQL_AUTH_TOKEN=YOUR_API_TOKEN


```

Or create a `.env` file with:

```

WRANGLER_R2_SQL_AUTH_TOKEN=YOUR_API_TOKEN


```

Where `YOUR_API_TOKEN` is the token you created in step 1\. For more information on setting environment variables, refer to [Wrangler system environment variables](https://developers.cloudflare.com/workers/wrangler/system-environment-variables/).

Query your data:

Terminal window

```

npx wrangler r2 sql query "YOUR_WAREHOUSE_NAME" "

SELECT

    user_id,

    event_type,

    product_id,

    amount

FROM default.ecommerce

WHERE event_type = 'purchase'

LIMIT 10"


```

Replace `YOUR_WAREHOUSE_NAME` with the warehouse name noted during pipeline setup. You can find it in the Cloudflare dashboard under **R2 object storage** \> your bucket > **Settings** \> **R2 Data Catalog**.

You can also query this table with any engine that supports Apache Iceberg. To learn more about connecting other engines to R2 Data Catalog, refer to [Connect to Iceberg engines](https://developers.cloudflare.com/r2/data-catalog/config-examples/).

## Learn more

[ Streams ](https://developers.cloudflare.com/pipelines/streams/) Learn about configuring streams for data ingestion. 

[ Pipelines ](https://developers.cloudflare.com/pipelines/pipelines/) Understand SQL transformations and pipeline configuration. 

[ Sinks ](https://developers.cloudflare.com/pipelines/sinks/) Configure data destinations and output formats. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/getting-started/#page","headline":"Getting started · Cloudflare Pipelines Docs","description":"Create your first pipeline to ingest streaming data and write to R2 Data Catalog as an Apache Iceberg table.","url":"https://developers.cloudflare.com/pipelines/getting-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/getting-started/","name":"Getting started"}}]}
```
