---
title: Terraform
description: Configure Pipelines and R2 Data Catalog with Terraform using the Cloudflare provider.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Terraform

This example shows how to configure [Pipelines](https://developers.cloudflare.com/pipelines/) and [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/) with Terraform using the [Cloudflare provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) (v5.19.0+).

The configuration creates a complete data pipeline: an R2 bucket with the data catalog enabled, a scoped API token for the sink, and the stream, sink, and pipeline resources that ingest JSON data into an [Apache Iceberg ↗](https://iceberg.apache.org/) table.

## Prerequisites

* [Terraform CLI ↗](https://developer.hashicorp.com/terraform/downloads) `>= 1.0`
* A Cloudflare account with R2 and Pipelines enabled
* An API token scoped to your account with the following permissions:  
   * **Pipelines** \- Edit  
   * **Workers R2 Storage** \- Edit  
   * **Workers R2 Data Catalog** \- Edit  
   * **Account API Tokens** \- Edit

For general information on using Terraform with Cloudflare, refer to [the Terraform documentation](https://developers.cloudflare.com/terraform/).

## Terraform resources

This example uses the following Cloudflare Terraform resources:

| Resource                                                                                                                                   | Description                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| [cloudflare\_r2\_bucket ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/r2%5Fbucket)                | Creates an R2 bucket to store pipeline data                       |
| [cloudflare\_r2\_data\_catalog ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/r2%5Fdata%5Fcatalog) | Enables the R2 Data Catalog on a bucket                           |
| [cloudflare\_pipeline\_stream ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/pipeline%5Fstream)    | Creates a stream that receives events via HTTP or Worker bindings |
| [cloudflare\_pipeline\_sink ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/pipeline%5Fsink)        | Creates a sink that writes data to R2 Data Catalog or R2          |
| [cloudflare\_pipeline ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/pipeline)                     | Creates a pipeline with SQL that connects a stream to a sink      |
| [cloudflare\_account\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/account%5Ftoken)        | Creates a scoped API token for sink authentication                |

## End-to-end example

With [terraform ↗](https://developer.hashicorp.com/terraform/downloads) installed, create a directory and the following files.

### 1\. Define variables and provider

Create `variables.tf`:

```

terraform {

  required_providers {

    cloudflare = {

      source  = "cloudflare/cloudflare"

      version = "~> 5.19"

    }

  }

}


provider "cloudflare" {

  api_token = var.cloudflare_api_token

}


variable "cloudflare_api_token" {

  type      = string

  sensitive = true

}


variable "cloudflare_account_id" {

  type = string

}


```

### 2\. Create the pipeline resources

Create `main.tf`:

```

# --- R2 bucket and Data Catalog ---


resource "cloudflare_r2_bucket" "pipeline_bucket" {

  account_id = var.cloudflare_account_id

  name       = "my-pipeline-bucket"

}


resource "cloudflare_r2_data_catalog" "pipeline_catalog" {

  account_id  = var.cloudflare_account_id

  bucket_name = cloudflare_r2_bucket.pipeline_bucket.name

}


# --- Scoped API token for the sink ---


data "cloudflare_account_api_token_permission_groups_list" "r2_bucket_item_write" {

  account_id = var.cloudflare_account_id

  name       = "Workers R2 Storage Bucket Item Write"

}


data "cloudflare_account_api_token_permission_groups_list" "r2_data_catalog_write" {

  account_id = var.cloudflare_account_id

  name       = "Workers R2 Data Catalog Write"

}


resource "cloudflare_account_token" "sink_token" {

  name       = "pipeline-sink-token"

  account_id = var.cloudflare_account_id


  policies = [{

    effect = "allow"

    permission_groups = [

      { id = data.cloudflare_account_api_token_permission_groups_list.r2_bucket_item_write.result[0].id },

      { id = data.cloudflare_account_api_token_permission_groups_list.r2_data_catalog_write.result[0].id },

    ]

    resources = jsonencode({

      "com.cloudflare.api.account.${var.cloudflare_account_id}" = "*"

    })

  }]

}


# --- Stream ---


resource "cloudflare_pipeline_stream" "my_stream" {

  account_id = var.cloudflare_account_id

  name       = "my_stream"

  format = {

    type = "json"

  }

  schema = {

    fields = [{

      name     = "value"

      type     = "json"

      required = true

    }]

  }

  http = {

    enabled        = true

    authentication = false

    cors           = {}

  }

  worker_binding = {

    enabled = false

  }

}


# --- Sink (R2 Data Catalog) ---


resource "cloudflare_pipeline_sink" "my_sink" {

  account_id = var.cloudflare_account_id

  name       = "my_sink"

  type       = "r2_data_catalog"

  format = {

    type = "parquet"

  }

  schema = {

    fields = []

  }

  config = {

    account_id = var.cloudflare_account_id

    bucket     = cloudflare_r2_bucket.pipeline_bucket.name

    table_name = cloudflare_r2_data_catalog.pipeline_catalog.name

    token      = cloudflare_account_token.sink_token.value

  }

}


# --- Pipeline ---


resource "cloudflare_pipeline" "my_pipeline" {

  account_id = var.cloudflare_account_id

  name       = "my_pipeline"

  sql        = "INSERT INTO ${cloudflare_pipeline_sink.my_sink.name} SELECT * FROM ${cloudflare_pipeline_stream.my_stream.name}"

}


```

Use an R2 sink instead of R2 Data Catalog

To write raw Parquet or JSON files to R2 instead of Iceberg tables, replace the sink resource with an R2 sink. This requires R2 S3-compatible credentials instead of a catalog token.

Add variables for S3 credentials to `variables.tf`:

```

variable "r2_access_key_id" {

  type      = string

  sensitive = true

}


variable "r2_access_key_secret" {

  type      = string

  sensitive = true

}


```

Replace the sink resource in `main.tf`:

```

resource "cloudflare_pipeline_sink" "my_sink" {

  account_id = var.cloudflare_account_id

  name       = "my_sink"

  type       = "r2"

  format = {

    type = "json"

  }

  schema = {

    fields = []

  }

  config = {

    account_id = var.cloudflare_account_id

    bucket     = cloudflare_r2_bucket.pipeline_bucket.name

    credentials = {

      access_key_id     = var.r2_access_key_id

      secret_access_key = var.r2_access_key_secret

    }

  }

}


```

When using an R2 sink, you can remove the `cloudflare_r2_data_catalog`, `cloudflare_account_token`, and the two `cloudflare_account_api_token_permission_groups_list` data sources from your configuration.

### 3\. Define outputs

Create `outputs.tf`:

```

output "pipeline_id" {

  value = cloudflare_pipeline.my_pipeline.id

}


output "pipeline_status" {

  value = cloudflare_pipeline.my_pipeline.status

}


output "stream_endpoint" {

  value = cloudflare_pipeline_stream.my_stream.endpoint

}


output "sink_id" {

  value = cloudflare_pipeline_sink.my_sink.id

}


```

### 4\. Deploy

Set your environment variables:

Terminal window

```

export TF_VAR_cloudflare_api_token="<YOUR_API_TOKEN>"

export TF_VAR_cloudflare_account_id="<YOUR_ACCOUNT_ID>"


```

You can then use `terraform plan` to view the changes and `terraform apply` to apply them:

Terminal window

```

terraform init

terraform plan

terraform apply


```

After the apply completes, Terraform outputs the stream endpoint URL. Use it to send data to your pipeline:

Terminal window

```

curl -X POST https://<STREAM_ENDPOINT> \

  -H "Content-Type: application/json" \

  -d '[{"value": {"event": "page_view", "user_id": "user_123"}}]'


```

## Clean up

To remove all resources created by this configuration:

Terminal window

```

terraform destroy


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/reference/terraform/#page","headline":"Terraform · Cloudflare Pipelines Docs","description":"Configure Pipelines and R2 Data Catalog with Terraform using the Cloudflare provider.","url":"https://developers.cloudflare.com/pipelines/reference/terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/reference/terraform/","name":"Terraform"}}]}
```
