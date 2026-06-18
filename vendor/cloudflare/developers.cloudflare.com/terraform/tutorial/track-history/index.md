---
title: 2 – Track your history
description: Learn how to track history with Cloudflare Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 2 – Track your history

In the [Initialize Terraform](https://developers.cloudflare.com/terraform/tutorial/initialize-terraform/) tutorial, you created and applied basic Cloudflare configuration. Now you'll store this configuration in version control for tracking, peer review, and rollback capabilities.

Note

Terraform code snippets below refer to the v5 SDK only.

## 1\. Use environment variables for authentication

Remove credentials from your Terraform files before committing to version control. The Cloudflare provider v5 reads authentication from environment variables automatically. Update your `main.tf` file to remove the hardcoded API token:

```

terraform {

  required_providers {

    cloudflare = {

      source  = "cloudflare/cloudflare"

      version = "~> 5"

    }

  }

}


provider "cloudflare" {

  # API token will be read from CLOUDFLARE_API_TOKEN environment variable

}


variable "zone_id" {

  description = "Cloudflare Zone ID"

  type        = string

  sensitive   = true

}


variable "account_id" {

  description = "Cloudflare Account ID"

  type        = string

  sensitive   = true

}


variable "domain" {

  description = "Domain name"

  type        = string

  default     = "example.com"

}


resource "cloudflare_dns_record" "www" {

  zone_id = var.zone_id

  name    = "www"

  content = "203.0.113.10"

  type    = "A"

  ttl     = 1

  proxied = true

  comment = "Domain verification record"

}


```

Note

You must still include the empty provider definition in the file, so that Terraform knows to install the Cloudflare plugin. For more information about advanced options you can use to customize the Cloudflare provider, refer to [Provider customization](https://developers.cloudflare.com/terraform/advanced-topics/provider-customization/).

Update your `terraform.tfvars` file:

```

zone_id    = "your-zone-id-here"

account_id = "your-account-id-here"

domain     = "your-domain.com"


```

Ensure your API token is set as an environment variable:

Terminal window

```

export CLOUDFLARE_API_TOKEN="your-api-token-here"


```

Verify authentication works:

Terminal window

```

terraform plan


```

You may see changes detected as Terraform compares your new variable-based configuration with the existing resources. This is normal when migrating from hardcoded values to variables:

```

# cloudflare_dns_record.www will be updated in-place

~ resource "cloudflare_dns_record" "www" {

    ~ name     = "www.your-domain.com" -> "www"

    ~ zone_id  = (sensitive value)

    # (other attributes may show changes)

}


Plan: 0 to add, 1 to change, 0 to destroy.


```

## 2\. Store configuration in GitHub

Create a `.gitignore` file with these contents:

```

.terraform/

*.tfstate*

.terraform.lock.hcl

terraform.tfvars


```

Initialize Git and commit your configuration:

Terminal window

```

git init

git add main.tf .gitignore

git commit -m "Step 2 - Initial Terraform v5 configuration"


```

Create a GitHub repository (via web interface or GitHub CLI) and push:

Terminal window

```

git branch -M main

git remote add origin https://github.com/YOUR_USERNAME/cf-config.git

git push -u origin main


```

Your Terraform configuration is now version controlled and ready for team collaboration. The sensitive data (API tokens, zone IDs) remains secure and separate from your code.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/tutorial/track-history/#page","headline":"Track your history · Cloudflare Terraform docs","description":"Learn how to track history with Cloudflare Terraform.","url":"https://developers.cloudflare.com/terraform/tutorial/track-history/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/tutorial/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/tutorial/track-history/","name":"2 – Track your history"}}]}
```
