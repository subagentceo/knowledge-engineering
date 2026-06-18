---
title: Create and manage widgets using Terraform
description: Create and manage Turnstile widgets using the Terraform provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create and manage widgets using Terraform

Manage Turnstile widgets as code using Terraform for version control and automated deployments.

## Prerequisites

Before you begin, you must have:

* [Terraform ↗](https://terraform.io/) installed
* A Cloudflare API token with `Account:Turnstile:Edit permissions`
* (Optional) A `cf-terraforming` tool for importing existing widgets

## Setup

### 1\. Configure provider

Create a `main.tf` file.

Note

Terraform code snippets below refer to the v4 SDK only.

```

terraform {

  required_providers {

    cloudflare = {

      source  = "cloudflare/cloudflare"

      version = "~> 4.0"

    }

  }

}


provider "cloudflare" {

  api_token = var.cloudflare_api_token

}


variable "cloudflare_api_token" {

  description = "Cloudflare API Token"

  type        = string

  sensitive   = true

}


variable "account_id" {

  description = "Cloudflare Account ID"

  type        = string

}


```

### 2\. Define widgets

```

resource "cloudflare_turnstile_widget" "login_form" {

  account_id = var.account_id

  name       = "Login Form Widget"

  domains    = ["example.com", "www.example.com"]

  mode       = "managed"

  region     = "world"

}


resource "cloudflare_turnstile_widget" "api_protection" {

  account_id = var.account_id

  name       = "API Protection"

  domains    = ["api.example.com"]

  mode       = "invisible"

  region     = "world"

}


# Output the sitekeys for use in your application

output "login_sitekey" {

  value = cloudflare_turnstile_widget.login_form.sitekey

}


output "api_sitekey" {

  value = cloudflare_turnstile_widget.api_protection.sitekey

}


```

### 3\. Environment variables

Create a `.env` file or set environment variables.

Terminal window

```

export TF_VAR_cloudflare_api_token="your-api-token"

export TF_VAR_account_id="your-account-id"


```

---

## Terraform commands

### Initialize and plan

Initialize Terraform

```

terraform init


```

Plan changes

```

terraform plan


```

Apply configuration

```

terraform apply


```

### Manage changes

Update widget configuration

```

terraform plan


```

Apply changes

```

terraform apply


```

Destroy widgets

```

terraform destroy


```

---

## Advanced Terraform configuration

### Multiple environments

```

locals {

  environments = {

    dev = {

      domains = ["dev.example.com"]

      mode    = "managed"

    }

    staging = {

      domains = ["staging.example.com"]

      mode    = "non_interactive"

    }

    prod = {

      domains = ["example.com", "www.example.com"]

      mode    = "invisible"

    }

  }

}


resource "cloudflare_turnstile_widget" "app_widget" {

  for_each = local.environments


  account_id = var.account_id

  name       = "App Widget - ${each.key}"

  domains    = each.value.domains

  mode       = each.value.mode

  region     = "world"

}


```

### Widget with Enterprise features

```

resource "cloudflare_turnstile_widget" "enterprise_widget" {

  account_id     = var.account_id

  name          = "Enterprise Form"

  domains       = ["enterprise.example.com"]

  mode          = "managed"

  region        = "world"

  offlabel      = true  # Remove Cloudflare branding

  bot_fight_mode = true # Enable bot fight mode

}


```

---

## Import existing widgets

Use [cf-terraforming](https://developers.cloudflare.com/terraform/advanced-topics/import-cloudflare-resources/#cf-terraforming) to import existing widgets.

Install cf-terraforming

```

go install github.com/cloudflare/cf-terraforming/cmd/cf-terraforming@latest


```

Generate Terraform configuration from existing widgets

```

cf-terraforming generate \

  --resource-type cloudflare_turnstile_widget \

  --account $ACCOUNT_ID


```

Import existing widget

```

terraform import cloudflare_turnstile_widget.existing_widget \

  $ACCOUNT_ID/$WIDGET_SITEKEY


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/get-started/widget-management/terraform/#page","headline":"Create and manage widgets using Terraform · Cloudflare Turnstile docs","description":"Create and manage Turnstile widgets using the Terraform provider.","url":"https://developers.cloudflare.com/turnstile/get-started/widget-management/terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/get-started/widget-management/","name":"Widget management"}},{"@type":"ListItem","position":5,"item":{"@id":"/turnstile/get-started/widget-management/terraform/","name":"Create and manage widgets using Terraform"}}]}
```
