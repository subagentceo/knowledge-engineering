---
title: Create a subdomain zone using Terraform
description: Automate the setup of a Cloudflare subdomain zone for Enterprise accounts using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a subdomain zone using Terraform

A [subdomain zone](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) lets you manage a subdomain in a separate Cloudflare zone from the parent domain. This is useful for access control and team management. This guide shows how to automate the setup using the [Cloudflare Terraform provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs). It is only available for Enterprise accounts

> NOTE: subdomain setup is only available for Enterprise accounts

## Prerequisites

* Terraform installed. Refer to [Get started](https://developers.cloudflare.com/terraform/installing/).
* Your Cloudflare account ID and a configured provider block. Refer to [Initialize Terraform](https://developers.cloudflare.com/terraform/tutorial/initialize-terraform/).

## Create the zone

Create a `cloudflare_zone` resource for the subdomain zone. The following example creates a zone for `subdomain.example.com`:

```

resource "cloudflare_zone" "subdomain_example_com" {

  account = {

    id = var.cloudflare_account_id

  }

  name = "subdomain.example.com"

  type = "full"

}


```

Terraform creates the zone in a **Pending** state. You must add NS delegation records to the parent zone before Cloudflare activates it.

Note

Refer to the [cloudflare\_zone docs ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zone) in the Terraform provider documentation when you need to reference other zone properties.

## Related resources

* [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/)
* [cloudflare\_zone resource ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zone)
* [cloudflare\_dns\_record resource ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/dns%5Frecord)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/how-to/create-secondary-zone/#page","headline":"Create a subdomain zone using Terraform · Cloudflare Terraform docs","description":"Automate the setup of a Cloudflare subdomain zone for Enterprise accounts using Terraform.","url":"https://developers.cloudflare.com/terraform/how-to/create-secondary-zone/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/how-to/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/how-to/create-secondary-zone/","name":"Create a subdomain zone using Terraform"}}]}
```
