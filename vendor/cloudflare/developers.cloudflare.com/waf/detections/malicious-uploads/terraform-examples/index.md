---
title: Terraform configuration examples
description: Configure malicious upload detection using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Terraform configuration examples

The following Terraform configuration examples address common scenarios for managing, configuring, and using WAF content scanning.

For more information, refer to the [Terraform Cloudflare provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

If you are using the Cloudflare API, refer to [Common API calls](https://developers.cloudflare.com/waf/detections/malicious-uploads/api-calls/).

## Enable WAF content scanning

Use the `cloudflare_content_scanning` resource to enable content scanning for a zone. For example:

```

resource "cloudflare_content_scanning" "zone_content_scanning_example" {

  zone_id = var.cloudflare_zone_id

  enabled = true

}


```

## Configure a custom scan expression

Use the `cloudflare_content_scanning_expression` resource to add a custom scan expression. For example:

```

resource "cloudflare_content_scanning_expression" "my_custom_scan_expression" {

  zone_id = var.cloudflare_zone_id

  payload = "lookup_json_string(http.request.body.raw, \"file\")"

}


```

For more information, refer to [Custom scan expressions](https://developers.cloudflare.com/waf/detections/malicious-uploads/#custom-scan-expressions).

## Add a custom rule to block malicious uploads

This example adds a [custom rule](https://developers.cloudflare.com/waf/custom-rules/) that blocks requests with one or more content objects considered malicious by using one of the [content scanning fields](https://developers.cloudflare.com/waf/detections/malicious-uploads/#content-scanning-fields) in the rule expression.

To use the [cf.waf.content\_scan.has\_malicious\_obj](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content%5Fscan.has%5Fmalicious%5Fobj/) field you must [enable content scanning](#enable-waf-content-scanning).

* [ Terraform (v5) ](#tab-panel-11194)
* [ Terraform (v4) ](#tab-panel-11195)

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Zone WAF Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

resource "cloudflare_ruleset" "zone_custom_firewall_malicious_uploads" {

  zone_id     = var.cloudflare_zone_id

  name        = "Phase entry point ruleset for custom rules in my zone"

  description = ""

  kind        = "zone"

  phase       = "http_request_firewall_custom"


  rules = [{

    ref         = "block_malicious_uploads"

    description = "Block requests uploading malicious content objects"

    expression  = "(cf.waf.content_scan.has_malicious_obj and http.request.uri.path eq \"/upload.php\")"

    action      = "block"

  }]

}


```

```

resource "cloudflare_ruleset" "zone_custom_firewall_malicious_uploads" {

  zone_id     = var.cloudflare_zone_id

  name        = "Phase entry point ruleset for custom rules in my zone"

  description = ""

  kind        = "zone"

  phase       = "http_request_firewall_custom"


  rules {

    ref         = "block_malicious_uploads"

    description = "Block requests uploading malicious content objects"

    expression  = "(cf.waf.content_scan.has_malicious_obj and http.request.uri.path eq \"/upload.php\")"

    action      = "block"

  }

}


```

## More resources

For additional Terraform configuration examples, refer to [WAF custom rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/malicious-uploads/terraform-examples/#page","headline":"Terraform configuration examples · Cloudflare Web Application Firewall (WAF) docs","description":"Configure malicious upload detection using Terraform.","url":"https://developers.cloudflare.com/waf/detections/malicious-uploads/terraform-examples/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/malicious-uploads/","name":"Malicious uploads detection"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/malicious-uploads/terraform-examples/","name":"Terraform configuration examples"}}]}
```
