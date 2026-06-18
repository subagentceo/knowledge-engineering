---
title: Transform Rules configuration using Terraform
description: Create URL rewrites, request header, and response header Transform Rules using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Transform Rules configuration using Terraform

This page provides examples of creating [Transform Rules](https://developers.cloudflare.com/rules/transform/) in a zone using Terraform. The examples cover the following scenarios:

* [Create a URL rewrite rule](#create-a-url-rewrite-rule)
* [Create a request header transform rule](#create-a-request-header-transform-rule)
* [Create a response header transform rule](#create-a-response-header-transform-rule)
* [Configure Managed Transforms](#configure-managed-transforms)

If you are using the Cloudflare API, refer to the following resources:

* [Create a URL rewrite rule via API](https://developers.cloudflare.com/rules/transform/url-rewrite/create-api/)
* [Create a request header transform rule via API](https://developers.cloudflare.com/rules/transform/request-header-modification/create-api/)
* [Create a response header transform rule via API](https://developers.cloudflare.com/rules/transform/response-header-modification/create-api/)
* [Configure Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/configure/)

## Before you start

### Obtain the necessary account or zone IDs

The Terraform configurations provided in this page need the zone ID (or account ID) of the zone/account where you will deploy rulesets.

* To retrieve the list of accounts you have access to, including their IDs, use the [List accounts](https://developers.cloudflare.com/api/resources/accounts/methods/list/) operation.
* To retrieve the list of zones you have access to, including their IDs, use the [List zones](https://developers.cloudflare.com/api/resources/zones/methods/list/) operation.

### Import or delete existing rulesets

Terraform assumes that it has complete control over account and zone rulesets. If you already have rulesets configured in your account or zone, do one of the following:

* [Import existing rulesets to Terraform](https://developers.cloudflare.com/terraform/advanced-topics/import-cloudflare-resources/) using the `cf-terraforming` tool. Recent versions of the tool can generate resource definitions for existing rulesets and import their configuration to Terraform state.
* Start from scratch by [deleting existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete/#delete-ruleset) (account and zone rulesets with `"kind": "root"` and `"kind": "zone"`, respectively) and then defining your rulesets configuration in Terraform.

---

## Create a URL rewrite rule

The following example creates a URL rewrite rule that rewrites requests for `example.com/old-folder` to `example.com/new-folder`:

* [ Terraform (v5) ](#tab-panel-10944)
* [ Terraform (v4) ](#tab-panel-10945)

Required API token permissions

All of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) are required:

* `Zone Transform Rules Write`
* `Account Rulesets Read`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

resource "cloudflare_ruleset" "transform_url_rewrite" {

  zone_id     = var.cloudflare_zone_id

  name        = "Transform Rule performing a static URL rewrite"

  description = ""

  kind        = "zone"

  phase       = "http_request_transform"


  rules = [{

    ref         = "url_rewrite_old_folder"

    description = "Example URL rewrite rule"

    expression  = "(http.host eq \"example.com\" and http.request.uri.path eq \"/old-folder\")"

    action      = "rewrite"

    action_parameters = {

      uri = {

        path = {

          value = "/new-folder"

        }

      }

    }

  }]

}


```

```

resource "cloudflare_ruleset" "transform_url_rewrite" {

  zone_id     = "<ZONE_ID>"

  name        = "Transform Rule performing a static URL rewrite"

  description = ""

  kind        = "zone"

  phase       = "http_request_transform"


  rules {

    ref         = "url_rewrite_old_folder"

    description = "Example URL rewrite rule"

    expression  = "(http.host eq \"example.com\" and http.request.uri.path eq \"/old-folder\")"

    action      = "rewrite"

    action_parameters {

      uri {

        path {

          value = "/new-folder"

        }

      }

    }

  }

}


```

To create another URL rewrite rule, add a new `rules` object to the same `cloudflare_ruleset` resource.

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications).

  
For more information on rewriting URLs, refer to [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/).

## Create a request header transform rule

The following configuration example performs the following adjustments to HTTP request headers:

* Adds a `my-header-1` header to the request with a static value.
* Adds a `my-header-2` header to the request with a dynamic value defined by an expression.
* Deletes the `existing-header` header from the request, if it exists.

* [ Terraform (v5) ](#tab-panel-10946)
* [ Terraform (v4) ](#tab-panel-10947)

Required API token permissions

All of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) are required:

* `Zone Transform Rules Write`
* `Account Rulesets Read`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

resource "cloudflare_ruleset" "transform_modify_request_headers" {

  zone_id     = var.cloudflare_zone_id

  name        = "Transform Rule performing HTTP request header modifications"

  description = ""

  kind        = "zone"

  phase       = "http_request_late_transform"


  rules = [{

    ref         = "modify_request_headers"

    description = "Example request header transform rule"

    expression  = "true"

    action      = "rewrite"

    action_parameters = {

      headers = {

        "my-header-1" = {

          operation = "set"

          value     = "Fixed value"

        }

        "my-header-2" = {

          operation  = "set"

          expression = "cf.zone.name"

        }

        "existing-header" = {

          operation = "remove"

        }

      }

    }

  }]

}


```

```

resource "cloudflare_ruleset" "transform_modify_request_headers" {

  zone_id     = "<ZONE_ID>"

  name        = "Transform Rule performing HTTP request header modifications"

  description = ""

  kind        = "zone"

  phase       = "http_request_late_transform"


  rules {

    ref         = "modify_request_headers"

    description = "Example request header transform rule"

    expression  = "true"

    action      = "rewrite"

    action_parameters {

      headers {

        name      = "my-header-1"

        operation = "set"

        value     = "Fixed value"

      }

      headers {

        name       = "my-header-2"

        operation  = "set"

        expression = "cf.zone.name"

      }

      headers {

        name      = "existing-header"

        operation = "remove"

      }

    }

  }

}


```

To create another request header transform rule, add a new `rules` object to the same `cloudflare_ruleset` resource.

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications).

For more information on modifying request headers, refer to [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/request-header-modification/).

## Create a response header transform rule

The following configuration example performs the following adjustments to HTTP response headers:

* Adds a `my-header-1` header to the response with a static value.
* Adds a `my-header-2` header to the response with a dynamic value defined by an expression.
* Deletes the `existing-header` header from the response, if it exists.

* [ Terraform (v5) ](#tab-panel-10948)
* [ Terraform (v4) ](#tab-panel-10949)

Required API token permissions

All of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) are required:

* `Zone Transform Rules Write`
* `Account Rulesets Read`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

resource "cloudflare_ruleset" "transform_modify_response_headers" {

  zone_id     = var.cloudflare_zone_id

  name        = "Transform Rule performing HTTP response header modifications"

  description = ""

  kind        = "zone"

  phase       = "http_response_headers_transform"


  rules = [{

    ref         = "modify_response_headers"

    description = "Example response header transform rule"

    expression  = "true"

    action      = "rewrite"

    action_parameters = {

      headers = {

        "my-header-1" = {

          operation = "set"

          value     = "Fixed value"

        }

        "my-header-2" = {

          operation  = "set"

          expression = "cf.zone.name"

        }

        "existing-header" = {

          operation = "remove"

        }

      }

    }

  }]

}


```

```

resource "cloudflare_ruleset" "transform_modify_response_headers" {

  zone_id     = "<ZONE_ID>"

  name        = "Transform Rule performing HTTP response header modifications"

  description = ""

  kind        = "zone"

  phase       = "http_response_headers_transform"


  rules {

    ref         = "modify_response_headers"

    description = "Example response header transform rule"

    expression  = "true"

    action      = "rewrite"

    action_parameters {

      headers {

        name      = "my-header-1"

        operation = "set"

        value     = "Fixed value"

      }

      headers {

        name       = "my-header-2"

        operation  = "set"

        expression = "cf.zone.name"

      }

      headers {

        name      = "existing-header"

        operation = "remove"

      }

    }

  }

}


```

To create another response header transform rule, add a new `rules` object to the same `cloudflare_ruleset` resource.

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications).

For more information on modifying response headers, refer to [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/).

## Configure Managed Transforms

* [ Terraform (v5) ](#tab-panel-10942)
* [ Terraform (v4) ](#tab-panel-10943)

Required API token permissions

All of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) are required:

* `Managed headers Write`
* `Account Rulesets Read`

Configure the [cloudflare\_managed\_transforms ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/managed%5Ftransforms) resource:

```

resource "cloudflare_managed_transforms" "tf_example" {

  zone_id = var.cloudflare_zone_id


  managed_request_headers = [{

    id      = "add_visitor_location_headers"

    enabled = true

  }]


  managed_response_headers = [{

    id      = "remove_x-powered-by_header"

    enabled = true

  }]

}


```

```

resource "cloudflare_managed_headers" "tf_example" {

  zone_id = "<ZONE_ID>"


  managed_request_headers {

    id      = "add_visitor_location_headers"

    enabled = true

  }


  managed_response_headers {

    id      = "remove_x-powered-by_header"

    enabled = true

  }

}


```

Make sure you include the Managed Transforms you are updating in the correct object (`managed_request_headers` or `managed_response_headers`).

For more information on Managed Transforms, refer to [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/additional-configurations/transform-rules/#page","headline":"Transform Rules configuration using Terraform · Cloudflare Terraform docs","description":"Create URL rewrites, request header, and response header Transform Rules using Terraform.","url":"https://developers.cloudflare.com/terraform/additional-configurations/transform-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/additional-configurations/transform-rules/","name":"Transform Rules configuration using Terraform"}}]}
```
