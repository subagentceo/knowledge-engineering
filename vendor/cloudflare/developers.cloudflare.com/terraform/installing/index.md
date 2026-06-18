---
title: Get started
description: Install Terraform and configure the Cloudflare provider on your operating system.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Terraform ships as a single binary file. The examples below include installation information for popular operating systems.

For official instructions on installing Terraform, refer to [Install Terraform ↗](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli).

Warning

Terraform maintains your configuration state, which can be broken when you make configuration changes through both Terraform and either the Cloudflare Dashboard or API.

To avoid this state, make sure you manage Terraform resources only in Terraform. For more details, refer to our [best practices](https://developers.cloudflare.com/terraform/advanced-topics/best-practices/).

## Mac

The easiest way to install Terraform on macOS is with Homebrew.

Terminal window

```

brew tap hashicorp/tap

brew install hashicorp/tap/terraform


```

## Linux

You can install the `terraform` binary via your distribution's package manager. For example:

Terminal window

```

sudo apt install terraform


```

Alternatively, you can fetch a specific version directly and place the binary in your `PATH`:

Terminal window

```

wget -q https://releases.hashicorp.com/terraform/1.4.5/terraform_1.4.5_linux_amd64.zip


unzip terraform_1.4.5_linux_amd64.zip


```

```

Archive:  terraform_1.4.5_linux_amd64.zip

  inflating: terraform


```

Terminal window

```

sudo mv terraform /usr/local/bin/terraform


terraform version


```

```

Terraform v1.4.5


```

## Windows

1. Download the 32 or 64-bit executable from the [Download Terraform ↗](https://developer.hashicorp.com/terraform/downloads) page.
2. Unzip and place `terraform.exe` somewhere in your path.

## Other

For additional installers, refer to the [Download Terraform ↗](https://developer.hashicorp.com/terraform/downloads) page.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/installing/#page","headline":"Install Terraform · Cloudflare Terraform docs","description":"Install Terraform and configure the Cloudflare provider on your operating system.","url":"https://developers.cloudflare.com/terraform/installing/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/installing/","name":"Get started"}}]}
```
