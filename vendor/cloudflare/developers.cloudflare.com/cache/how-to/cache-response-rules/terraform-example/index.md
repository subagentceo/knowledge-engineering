---
title: Terraform example
description: Create cache response rules using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Terraform example

The following example defines a single Cache Response Rule for a zone using Terraform. The rule strips Set-Cookie and ETag headers from JavaScript file responses before caching.

Terraform `cloudflare_ruleset` resource

```

# Cache Response Rule to strip headers from JS responses

resource "cloudflare_ruleset" "cache_response_rules_example" {

  zone_id     = "<ZONE_ID>"

  name        = "Cache Response Rules"

  description = "Configure cache settings for origin responses"

  kind        = "zone"

  phase       = "http_response_cache_settings"


  rules {

    ref         = "strip_js_headers"

    description = "Strip caching headers from JS file responses"

    expression  = "http.request.uri.path.extension eq \"js\""

    action      = "set_cache_settings"

    action_parameters {

      strip_etags      = true

      strip_set_cookie = true

    }

  }


  rules {

    ref         = "tag_api_responses"

    description = "Tag API responses for targeted purging"

    expression  = "starts_with(http.request.uri.path, \"/api/\")"

    action      = "set_cache_tags"

    action_parameters {

      operation = "set"

      values    = ["api-response", "dynamic-content"]

    }

  }


  rules {

    ref         = "cache_control_200"

    description = "Set cache-control for successful responses"

    expression  = "http.response.code eq 200"

    action      = "set_cache_control"

    action_parameters {

      s_maxage {

        operation      = "set"

        value          = 86400

        cloudflare_only = true

      }

      must_revalidate {

        operation = "set"

      }

    }

  }

}


```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

For additional guidance on using Terraform with Cloudflare, refer to [Terraform](https://developers.cloudflare.com/terraform/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/terraform-example/#page","headline":"Cache Response Rules Terraform example · Cloudflare Cache (CDN) docs","description":"Create cache response rules using Terraform.","url":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/terraform-example/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-response-rules/","name":"Cache Response Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-response-rules/terraform-example/","name":"Terraform example"}}]}
```
