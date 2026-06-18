---
title: Configure Bulk Redirects using Terraform
description: Create Bulk Redirects using the Terraform Cloudflare provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure Bulk Redirects using Terraform

Note

Terraform code snippets below refer to the v4 SDK only.

This Terraform example configures account-level Bulk Redirects. It creates a [Bulk Redirect List](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-lists) populated with [URL redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/concepts/#url-redirects) and a corresponding [Bulk Redirect Rule](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-rules) to activate them.

```

# Cloudflare account ID

variable "cloudflare_account_id" {

  default = "<ACCOUNT_ID>"

}


# Bulk redirect list description

variable "bulk_redirect_list_description" {

  default = "my bulk redirect description"

}


# Bulk redirect list name

variable "bulk_redirect_list_name" {

  default = "my_bulk_redirect_list_name"

}


# Bulk redirect list item (URL redirect)

variable "bulk_redirects" {

  type = map(object({

    source_url  = string

    target_url  = string

    status_code = number

  }))


  default = {

    "redirect1" = {

      source_url = "https://source.url/redirect/1"

      target_url = "https://target.url/?redirect=1"

      status_code = 301

    }

    "redirect2" = {

      source_url = "https://source.url/redirect/2"

      target_url = "https://target.url/?redirect=2"

      status_code = 302

    }

    "redirect3" = {

      source_url = "https://source.url/redirect/3"

      target_url = "https://target.url/?redirect=3"

      status_code = 307

    }

  }

}


# Create redirect list

resource "cloudflare_list" "bulk_redirect_to_id" {

  account_id  = var.cloudflare_account_id

  name        = var.bulk_redirect_list_name

  description = var.bulk_redirect_list_description

  kind        = "redirect"

}


# Add redirect item into the redirect list

resource "cloudflare_list_item" "bulk_redirect_to_id_item" {

  for_each = { for redirect in var.bulk_redirects : "${redirect.source_url}" => redirect }


  account_id = var.cloudflare_account_id

  list_id    = cloudflare_list.bulk_redirect_to_id.id


  redirect {

    source_url  = each.value.source_url

    target_url  = each.value.target_url

    status_code = each.value.status_code

  }


  depends_on = [

    cloudflare_list.bulk_redirect_to_id

  ]


}


# Create bulk redirect and attach redirect list

resource "cloudflare_ruleset" "bulk_root_redirect_to_id" {

  account_id  = var.cloudflare_account_id

  name        = var.bulk_redirect_list_name

  description = var.bulk_redirect_list_description

  kind        = "root"

  phase       = "http_request_redirect"


  rules {

    action = "redirect"

    action_parameters {

      from_list {

        name = var.bulk_redirect_list_name

        key  = "http.request.full_uri"

      }

    }

    expression  = "http.request.full_uri in ${"$"}${var.bulk_redirect_list_name}"

    description = var.bulk_redirect_list_description

    enabled     = true

  }


  depends_on = [

    cloudflare_list_item.bulk_redirect_to_id_item

  ]

}


```

## Required token permissions

Your API token must have at least the following [permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/):

* [ Dashboard ](#tab-panel-10067)
* [ API ](#tab-panel-10068)

* Account Filter Lists > Edit
* Bulk URL Redirects > Edit

* Account Rule Lists Write
* Bulk URL Redirects Write

## Additional resources

For additional guidance on using Terraform with Cloudflare, refer to the following resources:

* [Terraform documentation](https://developers.cloudflare.com/terraform/)
* [Cloudflare Provider for Terraform ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) (reference documentation)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/terraform-example/#page","headline":"Configure Bulk Redirects using Terraform · Cloudflare Rules docs","description":"Create Bulk Redirects using the Terraform Cloudflare provider.","url":"https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/terraform-example/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform","Redirects"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/bulk-redirects/","name":"Bulk Redirects"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/bulk-redirects/terraform-example/","name":"Configure Bulk Redirects using Terraform"}}]}
```
