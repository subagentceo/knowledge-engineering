---
title: Configure exposed credentials checks using Terraform
description: Configure exposed credentials checks using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure exposed credentials checks using Terraform

Deprecation notice

Exposed credentials check has been deprecated.

Switch from exposed credentials check to [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) for improved security. To upgrade your current configuration, refer to the [upgrade guide](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/upgrade-to-leaked-credentials-detection/).

The following Terraform configuration example addresses a common use case of exposed credentials checks.

For more information, refer to the [Terraform Cloudflare provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

If you are using the Cloudflare API, refer to [Configure exposed credentials checks via API](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/configure-api/).

## Add a custom rule to check for exposed credentials

The following configuration creates a custom ruleset with a single rule that [checks for exposed credentials](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/configure-api/#create-a-custom-rule-checking-for-exposed-credentials).

You can only add exposed credential checks to rules in a custom ruleset (that is, a ruleset with `kind = "custom"`).

Note

Terraform code snippets below refer to the v4 SDK only.

```

resource "cloudflare_ruleset" "account_firewall_custom_ruleset_exposed_creds" {

  account_id  = "<ACCOUNT_ID>"

  name        = "Custom ruleset checking for exposed credentials"

  description = ""

  kind        = "custom"

  phase       = "http_request_firewall_custom"


  rules {

    ref         = "check_for_exposed_creds_add_header"

    description = "Add header when there is a rule match and exposed credentials are detected"

    expression  = "http.request.method == \"POST\" && http.request.uri == \"/login.php\""

    action      = "rewrite"

    action_parameters {

      headers {

        name      = "Exposed-Credential-Check"

        operation = "set"

        value     = "1"

      }

    }

    exposed_credential_check {

      username_expression = "url_decode(http.request.body.form[\"username\"][0])"

      password_expression = "url_decode(http.request.body.form[\"password\"][0])"

    }

  }

}


```

To create another rule, add a new `rules` object to the same `cloudflare_ruleset` resource.

The following configuration deploys the custom ruleset. It defines a dependency on the `account_firewall_custom_ruleset_exposed_creds` resource and obtains the ID of the created custom ruleset:

Note

Terraform code snippets below refer to the v4 SDK only.

```

resource "cloudflare_ruleset" "account_firewall_custom_entrypoint" {

  account_id  = "<ACCOUNT_ID>"

  name        = "Account-level entry point ruleset for the http_request_firewall_custom phase deploying a custom ruleset checking for exposed credentials"

  description = ""

  kind        = "root"

  phase       = "http_request_firewall_custom"


  depends_on = [cloudflare_ruleset.account_firewall_custom_ruleset_exposed_creds]


  rules {

    ref         = "deploy_custom_ruleset_example_com"

    description = "Deploy custom ruleset for example.com"

    expression  = "(cf.zone.name eq \"example.com\")"

    action      = "execute"

    action_parameters {

      id = cloudflare_ruleset.account_firewall_custom_ruleset_exposed_creds.id

    }

  }

}


```

## More resources

For additional Terraform configuration examples, refer to [WAF custom rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/configure-terraform/#page","headline":"Configure exposed credentials checks using Terraform · Cloudflare Web Application Firewall (WAF) docs","description":"Configure exposed credentials checks using Terraform.","url":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/configure-terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/check-for-exposed-credentials/","name":"Check for exposed credentials"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/check-for-exposed-credentials/configure-terraform/","name":"Configure exposed credentials checks using Terraform"}}]}
```
