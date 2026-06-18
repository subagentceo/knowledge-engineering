---
title: Terraform configuration examples
description: Terraform examples for managing and configuring leaked credentials detection.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Terraform configuration examples

The following Terraform configuration examples address common scenarios for managing, configuring, and using leaked credentials detection.

For more information, refer to the [Terraform Cloudflare provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

If you are using the Cloudflare API, refer to [Common API calls](https://developers.cloudflare.com/waf/detections/leaked-credentials/api-calls/).

## Enable leaked credentials detection

Use the `cloudflare_leaked_credential_check` resource to enable leaked credentials detection for a zone. For example:

```

resource "cloudflare_leaked_credential_check" "zone_lcc_example" {

  zone_id = var.cloudflare_zone_id

  enabled = true

}


```

## Configure a custom detection location

Use the `cloudflare_leaked_credential_check_rule` resource to add a custom detection location. For example:

```

resource "cloudflare_leaked_credential_check_rule" "custom_location_example" {

  zone_id = var.cloudflare_zone_id

  username = "lookup_json_string(http.request.body.raw, \"user\")"

  password = "lookup_json_string(http.request.body.raw, \"secret\")"

}


```

You only need to provide an expression for the username in custom detection locations.

## Add a custom rule to challenge requests with leaked credentials

This example adds a [custom rule](https://developers.cloudflare.com/waf/custom-rules/) that challenges requests with leaked credentials by using one of the [leaked credentials fields](https://developers.cloudflare.com/waf/detections/leaked-credentials/#leaked-credentials-fields) in the rule expression.

To use the [cf.waf.credential\_check.username\_and\_password\_leaked](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.credential%5Fcheck.username%5Fand%5Fpassword%5Fleaked/) field you must [enable leaked credentials detection](#enable-leaked-credentials-detection).

* [ Terraform (v5) ](#tab-panel-11184)
* [ Terraform (v4) ](#tab-panel-11185)

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Zone WAF Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

resource "cloudflare_ruleset" "zone_custom_firewall_leaked_creds" {

  zone_id     = var.cloudflare_zone_id

  name        = "Phase entry point ruleset for custom rules in my zone"

  description = ""

  kind        = "zone"

  phase       = "http_request_firewall_custom"


  rules = [{

    ref         = "challenge_leaked_username_password"

    description = "Challenge requests with a leaked username and password"

    expression  = "(cf.waf.credential_check.username_and_password_leaked)"

    action      = "managed_challenge"

  }]

}


```

```

resource "cloudflare_ruleset" "zone_custom_firewall_leaked_creds" {

  zone_id     = var.cloudflare_zone_id

  name        = "Phase entry point ruleset for custom rules in my zone"

  description = ""

  kind        = "zone"

  phase       = "http_request_firewall_custom"


  rules {

    ref         = "challenge_leaked_username_password"

    description = "Challenge requests with a leaked username and password"

    expression  = "(cf.waf.credential_check.username_and_password_leaked)"

    action      = "managed_challenge"

  }

}


```

## More resources

For additional Terraform configuration examples, refer to [WAF custom rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/leaked-credentials/terraform-examples/#page","headline":"Terraform configuration examples · Cloudflare Web Application Firewall (WAF) docs","description":"Terraform examples for managing and configuring leaked credentials detection.","url":"https://developers.cloudflare.com/waf/detections/leaked-credentials/terraform-examples/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/leaked-credentials/","name":"Leaked credentials detection"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/leaked-credentials/terraform-examples/","name":"Terraform configuration examples"}}]}
```
