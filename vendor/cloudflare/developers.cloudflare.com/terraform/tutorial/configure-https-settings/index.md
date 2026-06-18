---
title: 3 – Configure HTTPS settings
description: This tutorial shows how to enable TLS 1.3, Automatic HTTPS Rewrites, and Strict SSL mode using the updated v5 provider.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 3 – Configure HTTPS settings

After setting up basic DNS records, you can configure zone settings using Terraform. This tutorial shows how to enable [TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/), [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/), and [Strict SSL mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) using the updated v5 provider.

## Prerequisites

* Completed tutorials [1](https://developers.cloudflare.com/terraform/tutorial/initialize-terraform/) and [2](https://developers.cloudflare.com/terraform/tutorial/track-history/)
* Valid SSL certificate on your origin server (use the [Cloudflare Origin CA](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) to generate one for strict SSL mode)

Note

Terraform code snippets below refer to the v5 SDK only.

## 1\. Create zone setting configuration

Create a new branch and add zone settings:

Terminal window

```

git checkout -b step3-zone-settings


```

Add the following to your `main.tf` file:

```

# Enable TLS 1.3

resource "cloudflare_zone_setting" "tls_1_3" {

  zone_id    = var.zone_id

  setting_id = "tls_1_3"

  value      = "on"

}


# Enable automatic HTTPS rewrites

resource "cloudflare_zone_setting" "automatic_https_rewrites" {

  zone_id    = var.zone_id

  setting_id = "automatic_https_rewrites"

  value      = "on"

}


# Set SSL mode to strict

resource "cloudflare_zone_setting" "ssl" {

  zone_id    = var.zone_id

  setting_id = "ssl"

  value      = "strict"

}


```

## 2\. Preview and apply the changes

Review the proposed changes:

Terminal window

```

terraform plan


```

Expected output

```

Plan: 3 to add, 0 to change, 0 to destroy.


Terraform will perform the following actions:


  # cloudflare_zone_setting.automatic_https_rewrites will be created

  + resource "cloudflare_zone_setting" "automatic_https_rewrites" {

      + setting_id = "automatic_https_rewrites"

      + value      = "on"

      + zone_id    = "your-zone-id"

    }


  # cloudflare_zone_setting.ssl will be created

  + resource "cloudflare_zone_setting" "ssl" {

      + setting_id = "ssl"

      + value      = "strict"

      + zone_id    = "your-zone-id"

    }


  # cloudflare_zone_setting.tls_1_3 will be created

  + resource "cloudflare_zone_setting" "tls_1_3" {

      + setting_id = "tls_1_3"

      + value      = "on"

      + zone_id    = "your-zone-id"

    }


```

Commit and merge the changes:

Terminal window

```

git add main.tf

git commit -m "Step 3 - Enable TLS 1.3, automatic HTTPS rewrites, and strict SSL"

git checkout main

git merge step3-zone-settings

git push


```

Before applying the changes, try to connect with TLS 1.3\. Technically, you should not be able to with default settings. To follow along with this test, you will need to [compile curl against BoringSSL ↗](https://everything.curl.dev/source/build/tls/boringssl#build-boringssl).

Terminal window

```

curl -v --tlsv1.3 https://www.example.com 2>&1 | grep "SSL connection\|error"


```

As shown above, you should receive an error because TLS 1.3 is not yet enabled on your zone. Enable it by running `terraform apply` and try again.

Apply the configuration:

Terminal window

```

terraform apply


```

Type `yes` when prompted.

## 3\. Verify the settings

Try the same command as before. The command will now succeed.

Terminal window

```

curl -v --tlsv1.3 https://www.example.com 2>&1 | grep "SSL connection\|error"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/tutorial/configure-https-settings/#page","headline":"Configure HTTPS settings · Cloudflare Terraform docs","description":"This tutorial shows how to enable TLS 1.3, Automatic HTTPS Rewrites, and Strict SSL mode using the updated v5 provider.","url":"https://developers.cloudflare.com/terraform/tutorial/configure-https-settings/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/tutorial/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/tutorial/configure-https-settings/","name":"3 – Configure HTTPS settings"}}]}
```
