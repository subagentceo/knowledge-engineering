---
title: Get started
description: Install the Pulumi CLI on Mac, Linux, or Windows and verify your installation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pulumi/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Follow the recommended steps for your operating system below. For official instructions on installing Pulumi and other install options, refer to [Install Pulumi ↗](https://www.pulumi.com/docs/install/).

Note

Pulumi is free, open source, and optionally pairs with the [Pulumi Cloud ↗](https://www.pulumi.com/product/pulumi-cloud/) to make managing infrastructure secure, reliable, and hassle-free.

Warning

To avoid resource management conflicts, it’s **always** recommended to manage Pulumi-controlled resources via Pulumi.

## Installation

### Mac

Install via Homebrew package manager.

Terminal window

```

brew install pulumi/tap/pulumi


```

### Linux

Use the installation script.

Terminal window

```

curl -fsSL https://get.pulumi.com | sh


```

### Windows

1. Download the latest installer from the [Pulumi Repository ↗](https://github.com/pulumi/pulumi-winget/releases/latest)
2. Double click the MSI file and complete the wizard.

## Verify installation

To verify your installation, run the following in the terminal:

Terminal window

```

pulumi version


```

Note

For upgrades and installation alternatives, refer to [Install Pulumi ↗](https://www.pulumi.com/docs/install/).

## Next steps

Follow the [Hello World tutorial](https://developers.cloudflare.com/pulumi/tutorial/hello-world/) to write a simple Pulumi program. It takes about 10 minutes to complete.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pulumi/installing/#page","headline":"Get started · Pulumi docs","description":"Install the Pulumi CLI on Mac, Linux, or Windows and verify your installation.","url":"https://developers.cloudflare.com/pulumi/installing/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pulumi/","name":"Pulumi"}},{"@type":"ListItem","position":3,"item":{"@id":"/pulumi/installing/","name":"Get started"}}]}
```
