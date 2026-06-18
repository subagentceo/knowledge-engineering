---
title: 4 – Improve performance
description: Learn how to use Terraform with Cloudflare Load Balancing product to fail traffic over as needed.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 4 – Improve performance

In this tutorial, you will add a second origin for some basic round robining, and then use the [Cloudflare Load Balancing](https://developers.cloudflare.com/load-balancing/) product to fail traffic over as needed. You will also enhance your load balancing configuration through the use of "geo steering" to serve results from an origin server that is geographically closest to your end users.

## Prerequisites

* Completed [Tutorial 1](https://developers.cloudflare.com/terraform/tutorial/initialize-terraform/), [Tutorial 2](https://developers.cloudflare.com/terraform/tutorial/track-history/) and [Tutorial 3](https://developers.cloudflare.com/terraform/tutorial/configure-https-settings/)
* [Load Balancing](https://developers.cloudflare.com/load-balancing/get-started/enable-load-balancing/) enabled on your Cloudflare account

Note

Terraform code snippets below refer to the v5 SDK only.

## 1\. Add another DNS record for www

Create a new branch and add a DNS record for your Asia server:

Terminal window

```

git checkout -b step4-configure-load-balancing


```

Add a DNS record for a second web server, located in Asia. For example purposes, the IP address for this server is `198.51.100.15`. Add the second DNS record to your `main.tf`:

```

# Asia origin server

resource "cloudflare_dns_record" "www_asia" {

  zone_id = var.zone_id

  name    = "www"

  content = "198.51.100.15"

  type    = "A"

  ttl     = 300

  proxied = true

  comment = "Asia origin server"

}


```

Note

Note that while the name of the `resource` is different because Terraform resources of the same type must be uniquely named, the DNS name, or what your customers will type in their browser, is the same: `www`.

Apply this change to see basic round-robin behavior:

Terminal window

```

terraform plan

terraform apply


```

Test the basic load distribution:

Terminal window

```

# Make several requests to see both origins

for i in {1..4}; do

  curl https://www.example.com

  sleep 1

done


```

Expected output:

```

Hello, this is 203.0.113.10!

Hello, this is 203.0.113.10!

Hello, this is 198.51.100.15!

Hello, this is 203.0.113.10!


```

You'll see random distribution between your two origin servers. This basic DNS-based load balancing has limitations - no health checks, no geographic steering, and unpredictable distribution patterns. For more advanced scenarios like origins in different geographies or automatic failover, you'll want to use [Cloudflare's Load Balancing](https://developers.cloudflare.com/load-balancing/).

## 2\. Switch to using Cloudflare's Load Balancing product

As described in the [Load Balancing tutorial](https://developers.cloudflare.com/learning-paths/load-balancing/concepts/), you will need to complete three tasks:

1. Create a monitor to run health checks against your origin servers.
2. Create a pool of one or more origin servers that will receive load balanced traffic.
3. Create a load balancer with an external hostname — for example, `www.example.com` — and one or more pools.

We can monitor the origins by creating a basic health check that makes a GET request to each origin on the URL. If the origin returns the 200 status code (OK) within five seconds, it is considered healthy. If it fails to do so three times in a row, it is considered unhealthy. This health check will be run once per minute from several regions and you can configure an email notification in the event any failures are detected.

In this example, the pool will be called `www-origins` with two origins added to it:

* `www-us` (`203.0.113.10`)
* `www-asia` (`198.51.100.15`)

For now, skip any sort of [geo routing](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/).

When you create a load balancer (LB), it will [replace any existing DNS records with the same name](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/). For example, if you create the `www.example.com` load balancer below, it will supersede the two `www` DNS records that you previously defined. One benefit of leaving the DNS records in place is that if you temporarily disable load balancing, connections to this hostname are still possible.

To achieve the above, add the load balancing configuration to `main.tf`:

```

# Health check monitor

resource "cloudflare_load_balancer_monitor" "health_check" {

  account_id     = var.account_id

  expected_body = "alive"

  expected_codes = "2xx"

  method         = "GET"

  timeout        = 5

  path           = "/health"

  interval       = 60

  retries        = 2

  description    = "Health check for www origins"

  type           = "https"


  header = {

    Host = ["${var.domain}"]

  }

}


# Origin pool

resource "cloudflare_load_balancer_pool" "www_pool" {

  account_id = var.account_id

  name       = "www-origins"

  monitor    = cloudflare_load_balancer_monitor.health_check.id


  origins = [{

    name    = "www-us"

    address = "203.0.113.10"

    enabled = true

  }, {

    name    = "www-asia"

    address = "198.51.100.15"

    enabled = true

  }]


  description     = "Primary www server pool"

  enabled         = true

  minimum_origins = 1

  notification_email = "<YOUR_EMAIL>"

  check_regions   = ["WEU", "EEU", "WNAM", "ENAM", "SEAS", "NEAS"]

}


# Load balancer

resource "cloudflare_load_balancer" "www_lb" {

  zone_id       = var.zone_id

  name          = "www.${var.domain}"

  default_pools = [cloudflare_load_balancer_pool.www_pool.id]

  fallback_pool = cloudflare_load_balancer_pool.www_pool.id

  description   = "Load balancer for www.${var.domain}"

  proxied       = true

}


```

Note

The load balancer will automatically replace your existing DNS records with the same name (www).

Preview and apply the changes:

Terminal window

```

terraform plan

terraform apply


```

Test the improved load balancing:

Terminal window

```

# Test load distribution with health monitoring

for i in {1..6}; do

  echo "Request $i:"

  curl -s https://www.example.com

  sleep 2

done


```

Expected output:

```

Request 1:

Hello, this is 198.51.100.15!

Request 2:

Hello, this is 203.0.113.10!

Request 3:

Hello, this is 198.51.100.15!

Request 4:

Hello, this is 203.0.113.10!

Request 5:

Hello, this is 203.0.113.10!

Request 6:

Hello, this is 198.51.100.15!


```

You should now see more predictable load distribution with the added benefits of health monitoring and automatic failover.

Merge and verify:

Terminal window

```

git add main.tf

git commit -m "Step 4 - Create load balancer (LB) monitor, LB pool, and LB"

git push


```

Verify the configuration is working by checking the Cloudflare dashboard under **Traffic** \> **Load Balancing**. You should see your monitor, pool, and load balancer with health status indicators. Your load balancer will now:

* Distribute traffic intelligently between origins
* Automatically route around unhealthy servers
* Provide real-time health monitoring

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/tutorial/use-load-balancing/#page","headline":"Improve performance and reliability · Cloudflare Terraform docs","description":"Learn how to use Terraform with Cloudflare Load Balancing product to fail traffic over as needed.","url":"https://developers.cloudflare.com/terraform/tutorial/use-load-balancing/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/tutorial/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/tutorial/use-load-balancing/","name":"4 – Improve performance"}}]}
```
