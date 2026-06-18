---
title: 5 – Add exceptions with Page Rules
description: Page Rules let you override zone settings for specific URL patterns. Redirects old URLs with a 301 permanent redirect.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 5 – Add exceptions with Page Rules

In the [Configure HTTPS settings](https://developers.cloudflare.com/terraform/tutorial/configure-https-settings/) tutorial, you configured zone settings that apply to all incoming requests for `example.com`. In this tutorial, you will add an exception to these settings using [Page Rules](https://developers.cloudflare.com/rules/page-rules/).

Specifically, you will increase the security level for a URL known to be expensive to render and cannot be cached: `https://www.example.com/expensive-db-call`. Additionally, you will add a redirect from the previous URL used to host this page.

Note

Terraform code snippets below refer to the v5 SDK only.

## 1\. Create Page Rules configuration

Create a new branch and append the configuration.

Terminal window

```

git checkout -b step5-pagerule


```

Page Rules let you override zone settings for specific URL patterns. Add two Page Rules to your `main.tf`:

```

# Increase security for expensive database operations

resource "cloudflare_page_rule" "expensive_endpoint_security" {

  zone_id  = var.zone_id

  target   = "${var.domain}/expensive-db-call"

  priority = 1


  actions = {

    security_level = "under_attack"

  }

}


# Redirect old URLs to new location

resource "cloudflare_page_rule" "legacy_redirect" {

  zone_id  = var.zone_id

  target   = "${var.domain}/old-location.php"

  priority = 2


  actions = {

    forwarding_url = {

      url         = "https://www.${var.domain}/expensive-db-call"

      status_code = 301

    }

  }

}


```

The first rule increases security to "Under Attack" mode for your database endpoint. The second rule redirects old URLs with a 301 permanent redirect.

## 2\. Preview and apply the changes:

Terminal window

```

terraform plan

terraform apply


```

## 3\. Verify changes:

Test the redirect functionality:

Terminal window

```

curl -I https://example.com/old-location.php


```

Expected output:

```

HTTP/1.1 301 Moved Permanently

Location: https://example.com/expensive-db-call


```

Test the increased security (Under Attack mode returns a challenge page):

Terminal window

```

curl -I https://example.com/expensive-db-call


```

Expected output:

```

HTTP/1.1 503 Service Temporarily Unavailable


```

The 503 response indicates the Under Attack mode is active, presenting visitors with a challenge page before allowing access to protect against DDoS attacks.

## 4\. Commit and merge the changes:

Terminal window

```

git add main.tf

git commit -m "Step 5 - Add two Page Rules"

git push


```

The call works as expected. In the first case, the Cloudflare global network responds with a `301` redirecting the browser to the new location. In the second case, the Cloudflare global network initially responds with a `503`, which is consistent with the Under Attack mode.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/tutorial/add-page-rules/#page","headline":"Add exceptions with Page Rules · Cloudflare Terraform docs","description":"Page Rules let you override zone settings for specific URL patterns. Redirects old URLs with a 301 permanent redirect.","url":"https://developers.cloudflare.com/terraform/tutorial/add-page-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/tutorial/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/tutorial/add-page-rules/","name":"5 – Add exceptions with Page Rules"}}]}
```
