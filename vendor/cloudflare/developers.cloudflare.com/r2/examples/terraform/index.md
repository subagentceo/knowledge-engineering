---
title: Terraform
description: Configure R2 buckets with Terraform using the Cloudflare provider.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Terraform

**Last reviewed:**  over 3 years ago 

You must [generate an Access Key](https://developers.cloudflare.com/r2/api/tokens/) before getting started. All examples will utilize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

  
This example shows how to configure R2 with Terraform using the [Cloudflare provider ↗](https://github.com/cloudflare/terraform-provider-cloudflare).

Note for using AWS provider

When using the Cloudflare Terraform provider, you can only manage buckets. To configure items such as CORS and object lifecycles, you will need to use the [AWS Provider](https://developers.cloudflare.com/r2/examples/terraform-aws/).

With [terraform ↗](https://developer.hashicorp.com/terraform/downloads) installed, create `main.tf` and copy the content below replacing with your API Token.

```

terraform {

  required_providers {

    cloudflare = {

      source = "cloudflare/cloudflare"

      version = "~> 4"

    }

  }

}


provider "cloudflare" {

  api_token = "<YOUR_API_TOKEN>"

}


resource "cloudflare_r2_bucket" "cloudflare-bucket" {

  account_id = "<YOUR_ACCOUNT_ID>"

  name       = "my-tf-test-bucket"

  location   = "WEUR"

}


```

You can then use `terraform plan` to view the changes and `terraform apply` to apply changes.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/terraform/#page","headline":"Terraform · Cloudflare R2 docs","description":"Configure R2 buckets with Terraform using the Cloudflare provider.","url":"https://developers.cloudflare.com/r2/examples/terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/examples/terraform/","name":"Terraform"}}]}
```
