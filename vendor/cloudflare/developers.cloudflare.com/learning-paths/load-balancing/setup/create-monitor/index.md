---
title: Create monitor
description: Learn about create monitor in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create monitor

Instead of starting on your production domain, you likely should create a load balancer on a test or staging domain. This may involve temporary changes to your monitors and pools, depending on your infrastructure setup.

Starting with a test domain allows you to verify everything is working correctly before routing production traffic.

* [ Dashboard ](#tab-panel-9071)
* [ API ](#tab-panel-9072)

**Set up the monitor**

You can create a monitor within the [load balancer workflow](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/) or in the **Monitors** tab:

1. Go to **Load Balancing**.
2. Select the **Monitors** tab.
3. Select **Create monitor**.
4. Add the following information:  
   * **Type**: The protocol to use for health monitors  
         * _Non-enterprise customers_: Choose **HTTP**, **HTTPS**, or **TCP**.  
         * _Enterprise customers_: Choose **HTTP**, **HTTPS**, **TCP**, **UDP ICMP**, **ICMP Ping**, or **SMTP**.  
   * **Path**: The endpoint path to run health monitor requests against  
   * **Port**: The destination port for health monitors
5. For additional settings, select **Advanced health monitor settings**:  
   * **Interval**:  
         * By increasing the default, you can improve failover time, but you may also increase load on your endpoints.  
         * Minimum time in seconds is 60 (Pro), 15 (Business), and 10 (Enterprise).  
   * **Timeout** and **Retries**:  
         * The health monitor request will return unhealthy if it exceeds the duration specified in **Timeout** (and exceeds this duration more times than the specified number of **Retries**).  
   * **Expected Code(s)**: The expected HTTP response codes listed individually (`200`, `302`) or as a range (for example, entering `2xx` would cover all response codes in the `200` range).  
   * **Response Body**:  
         * Looks for a case-insensitive substring in the response body.  
         * Make sure that the value is relatively static and within the first 10 KB of the HTML page.  
   * **Simulate Zone**:  
         * It is recommended to use the same zone in which the Load Balancer exists.  
         * Changes the egress zone settings of a health monitor request to ensure compatibility with features like [Authenticated Origin Pulls (mTLS)](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/), [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/), [Bring your own CA (mTLS)](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/), [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/), and [HTTP/2 to Origin](https://developers.cloudflare.com/speed/optimization/protocol/http2-to-origin/).  
   * **Follow Redirects**:  
         * Instead of reporting a `301` or `302` code as unhealthy, the health monitor request follows redirects to the final endpoint.  
   * **Configure Request Header(s)**:  
         * Useful if your endpoints are expecting specific incoming headers.  
   * **Header**:  
         * The HTTP request headers to send in the health monitor. It is recommended that you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.
6. Select **Save**.

Note

To increase confidence in pool status, you can also increase the `consecutive_up` and `consecutive_down` fields when [creating a monitor with the API](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/monitors/methods/create/).

To become healthy or unhealthy, monitored endpoints must pass this health monitor request the consecutive number of times specified in these parameters.

**Prepare your servers**

Make sure that your firewall or web server does not block or rate limit your configured health monitors or requests associated with [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips).

Each health monitor has the HTTP user-agent of `"Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; pool-id: $poolid)"`, where the `$poolid` is the first 16 characters of the [associated pool](https://developers.cloudflare.com/load-balancing/pools/).

Warning

If you know that your endpoint is healthy but Load Balancing is reporting it as unhealthy, refer to our [Monitor troubleshooting guide](https://developers.cloudflare.com/load-balancing/troubleshooting/load-balancing-faq/#why-is-my-endpoint-or-pool-considered-unhealthy).

**Set up the monitor**

For a full list of monitor properties, refer to [Create Monitor](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/monitors/methods/create/). If you need help with API authentication, refer to [Cloudflare API documentation](https://developers.cloudflare.com/fundamentals/api/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Load Balancing: Monitors and Pools Write`

Create Monitor

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "type": "https",

    "description": "Login page monitor",

    "method": "GET",

    "path": "/health",

    "header": {

        "Host": [

            "example.com"

        ],

        "X-App-ID": [

            "abc123"

        ]

    },

    "port": 8080,

    "timeout": 3,

    "retries": 0,

    "interval": 90,

    "expected_body": "alive",

    "expected_codes": "2xx",

    "follow_redirects": true,

    "allow_insecure": true,

    "consecutive_up": 3,

    "consecutive_down": 2,

    "probe_zone": "example.com"

  }'


```

The response contains the complete definition of the new monitor.

Response

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "id": ":monitor-id",

    "created_on": "2021-01-01T05:20:00.12345Z",

    "modified_on": "2021-01-01T05:20:00.12345Z",

    "type": "https",

    "description": "Login page monitor",

    "method": "GET",

    "path": "/health",

    "header": {

      "Host": [

        "example.com"

      ],

      "X-App-ID": [

        "abc123"

      ]

    },

    "port": 8080,

    "timeout": 3,

    "retries": 0,

    "interval": 90,

    "expected_body": "alive",

    "expected_codes": "2xx",

    "follow_redirects": true,

    "allow_insecure": true,

    "consecutive_up": 3,

    "consecutive_down": 2,

    "probe_zone": "example.com"

  }

}


```

**Prepare your servers**

Make sure that your firewall or web server does not block or rate limit your configured health monitors or requests associated with [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips).

Each health monitor has the HTTP user-agent of `"Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; pool-id: $poolid)"`, where the `$poolid` is the first 16 characters of the [associated pool](https://developers.cloudflare.com/load-balancing/pools/).

Warning

If you know that your endpoint is healthy but Load Balancing is reporting it as unhealthy, refer to our [Monitor troubleshooting guide](https://developers.cloudflare.com/load-balancing/troubleshooting/load-balancing-faq/#why-is-my-endpoint-or-pool-considered-unhealthy).

Example monitor configuration

| Field            | Value     |
| ---------------- | --------- |
| Type             | HTTP      |
| Path             | /         |
| Port             | 80        |
| Interval         | 60        |
| Method           | GET       |
| Timeout          | 5 seconds |
| Retries          | 2         |
| Expected Code(s) | 200       |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/create-monitor/#page","headline":"Create monitor · Cloudflare Learning Paths","description":"Learn about create monitor in this guide.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/create-monitor/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/setup/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/setup/create-monitor/","name":"Create monitor"}}]}
```
