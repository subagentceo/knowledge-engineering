---
title: Provider customization
description: Customize the Cloudflare Terraform provider settings using configuration parameters or environment variables.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Provider customization

Terraform communicates with cloud and global network provider APIs such as Cloudflare through modules known as providers. These providers are [installed automatically](https://developers.cloudflare.com/terraform/tutorial/initialize-terraform/#2-initialize-terraform-and-the-cloudflare-provider) when you run `terraform init` in a directory that has a `.tf` file containing a provider.

Typically, the only required parameters to the provider are those required to authenticate. However, you may want to customize the provider to your needs. The following section covers some [optional settings ↗](https://www.terraform.io/docs/providers/cloudflare/#argument-reference) that you can pass to the Cloudflare Terraform provider.

## Adjust the default Cloudflare provider settings

Note

The examples below build on the [Cloudflare Terraform tutorial](https://developers.cloudflare.com/terraform/tutorial/).

You can customize the Cloudflare Terraform provider using configuration parameters, specified either in your `.tf` configuration files or via environment variables. Using environment variables may make sense when running Terraform from a CI/CD system or when the change is temporary and does not need to be persisted in your configuration history.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/advanced-topics/provider-customization/#page","headline":"Provider customization · Cloudflare Terraform docs","description":"Customize the Cloudflare Terraform provider settings using configuration parameters or environment variables.","url":"https://developers.cloudflare.com/terraform/advanced-topics/provider-customization/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/advanced-topics/","name":"Advanced topics"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/advanced-topics/provider-customization/","name":"Provider customization"}}]}
```
