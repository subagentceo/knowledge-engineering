---
title: Create a partial zone using Terraform
description: Automate the setup of a Cloudflare partial (CNAME) zone using the Terraform provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a partial zone using Terraform

A [partial zone](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) lets you use Cloudflare for a subdomain while keeping your existing authoritative DNS provider for the parent domain. This guide shows how to automate the setup using the [Cloudflare Terraform provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

Warning

A partial zone cannot be created in the same Cloudflare account as the parent domain's full zone.

## Prerequisites

* Terraform installed. Refer to [Get started](https://developers.cloudflare.com/terraform/installing/).
* Your Cloudflare account ID and a configured provider block. Refer to [Initialize Terraform](https://developers.cloudflare.com/terraform/tutorial/initialize-terraform/).

## Create the zone

Add the zone configuration and apply the change to create the zone:

```

resource "cloudflare_zone" "subdomain_example_com" {

  account = {

    id = var.cloudflare_account_id

  }

  name = "subdomain.example.com"

}


```

Then, in a new Terraform plan and apply cycle, upgrade the zone to a Business plan or higher:

```

resource "cloudflare_zone_subscription" "example_zone_subscription" {

  zone_id = cloudflare_zone.subdomain_example_com.id

  frequency = "monthly"

  rate_plan = {

    id = "business"

    currency = "USD"

  }

}


```

Then, again in a new Terraform plan and apply cycle, update your Terraform configuration to add `type = "partial"` to the zone:

```

resource "cloudflare_zone" "subdomain_example_com" {

  account = {

    id = var.cloudflare_account_id

  }

  name = "subdomain.example.com"

  type = "partial"

}


```

Terraform places the zone in a **Pending** state. You must add the necessary DNS records and verify domain ownership before Cloudflare activates it.

Note

Refer to the [cloudflare\_zone docs ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zone) in the Terraform provider documentation when you need to reference other zone properties.

## Related resources

* [Partial zone setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)
* [Convert a full zone to partial](https://developers.cloudflare.com/dns/zone-setups/conversions/convert-full-to-partial/)
* [cloudflare\_zone resource ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zone)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/how-to/create-partial-zone/#page","headline":"Create a partial zone using Terraform · Cloudflare Terraform docs","description":"Automate the setup of a Cloudflare partial (CNAME) zone using the Terraform provider.","url":"https://developers.cloudflare.com/terraform/how-to/create-partial-zone/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/how-to/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/how-to/create-partial-zone/","name":"Create a partial zone using Terraform"}}]}
```
