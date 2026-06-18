---
title: Terraform example
description: Create Cache Rules using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Terraform example

The following example defines a single cache rule for a zone using Terraform. The rule configures several cache settings and sets a custom cache key for incoming requests addressed at `example.net`.

Terraform `cloudflare_ruleset` resource

```

# Cache rule configuring cache settings and defining custom cache keys

resource "cloudflare_ruleset" "cache_rules_example" {

  zone_id     = "<ZONE_ID>"

  name        = "Set cache settings"

  description = "Set cache settings for incoming requests"

  kind        = "zone"

  phase       = "http_request_cache_settings"


  rules {

    ref         = "cache_settings_custom_cache_key"

    description = "Set cache settings and custom cache key for example.net"

    expression  = "(http.host eq \"example.net\")"

    action      = "set_cache_settings"

    action_parameters {

      edge_ttl {

        mode    = "override_origin"

        default = 60

        status_code_ttl {

          status_code = 200

          value       = 50

        }

        status_code_ttl {

          status_code_range {

            from = 201

            to   = 300

          }

          value = 30

        }

      }

      browser_ttl {

        mode = "respect_origin"

      }

      serve_stale {

        disable_stale_while_updating = true

      }

      respect_strong_etags = true

      cache_key {

        ignore_query_strings_order = false

        cache_deception_armor      = true

        custom_key {

          query_string {

            exclude {

              all = true

            }

          }

          header {

            include        = ["habc", "hdef"]

            check_presence = ["habc_t", "hdef_t"]

            exclude_origin = true

          }

          cookie {

            include        = ["cabc", "cdef"]

            check_presence = ["cabc_t", "cdef_t"]

          }

          user {

            device_type = true

            geo         = false

          }

          host {

            resolved = true

          }

        }

      }

      origin_error_page_passthru = false

    }

  }

}


```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

For additional guidance on using Terraform with Cloudflare, refer to [Terraform](https://developers.cloudflare.com/terraform/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/terraform-example/#page","headline":"Cache Rules — Terraform example · Cloudflare Cache (CDN) docs","description":"Create Cache Rules using Terraform.","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/terraform-example/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-rules/terraform-example/","name":"Terraform example"}}]}
```
