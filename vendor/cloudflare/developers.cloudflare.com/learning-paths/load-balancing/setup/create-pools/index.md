---
title: Create pools
description: Create server pools for load balancing.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create pools

Instead of starting on your production domain, you likely should create a load balancer on a test or staging domain. This may involve temporary changes to your monitors and pools, depending on your infrastructure setup.

Starting with a test domain allows you to verify everything is working correctly before routing production traffic.

* [ Dashboard ](#tab-panel-9073)
* [ API ](#tab-panel-9074)

You can create a pool within the [load balancer workflow](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/) or in the **Pools** tab:

1. Go to **Load Balancing**.
2. Select the **Pools** tab and then **Create pool**.
3. For your pool, enter the following information:  
   * A name (must be unique)  
   * A description to provide more detail on the name  
   * A choice for [**Endpoint Steering**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/), which affects how your pool routes traffic to each endpoint
4. For each endpoint, enter the following information:  
   * A name (must be unique)  
   * The endpoint address or associated hostname  
   * (Optional) A [**Virtual Network**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/). Required when the endpoint has a private IP address.  
   * A [**Weight**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights)  
   * (Optional) A [hostname](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/) by clicking **Add host header**  
   * (Optional) The destination port to which the traffic will be served.

Note

If your endpoint is a website or application hosted on [Cloudflare Pages](https://developers.cloudflare.com/pages/), you will need to fill in the host header field with the project domain for it to resolve correctly.

1. Repeat this process for additional endpoints in the pool.
2. (Optional) Set up coordinates for [Proximity Steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/proximity-steering/) on the pool.
3. On the pool, update the following information:  
   * **Health Threshold**:  
   The Health Threshold is the number of healthy endpoints for the pool as a whole to be considered _Healthy_ and receive traffic based on pool order in a load balancer. Increasing this number makes the pool more reliable, but also more likely to become unhealthy.  
   * **Monitor**: Attach a [monitor](https://developers.cloudflare.com/load-balancing/monitors/create-monitor/)  
   * **Health Monitor Regions**: Choose whether to check pool health from [multiple locations](https://developers.cloudflare.com/load-balancing/monitors/#health-monitor-regions), which increases accuracy but can lead to probe traffic to your endpoint  
   * **Pool Notifications**: You can set up new alerts - and view existing alerts - to be notified when pools are enabled or disabled, or pools or endpoints have changes in their [health status](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/).
4. When finished, select **Save**.

For a full list of properties, refer to [Create Pool](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/create/). If you need help with API authentication, refer to [Cloudflare API documentation](https://developers.cloudflare.com/fundamentals/api/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Load Balancing: Monitors and Pools Write`

Create Pool

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "Primary data center - Provider XYZ",

    "name": "primary-dc-1",

    "enabled": false,

    "load_shedding": {

        "default_percent": 0,

        "default_policy": "random",

        "session_percent": 0,

        "session_policy": "hash"

    },

    "minimum_origins": 2,

    "monitor": "f1aba936b94213e5b8dca0c0dbf1f9cc",

    "check_regions": [

        "WEU",

        "ENAM"

    ],

    "origins": [

        {

            "name": "app-server-1",

            "address": "0.0.0.0",

            "enabled": true,

            "weight": 0.56,

            "header": {

                "Host": [

                    "example.com"

                ]

            }

        }

    ],

    "origin_steering": {

        "policy": "random"

    },

    "notification_filter": {

        "origin": {

            "disable": false,

            "healthy": null

        },

        "pool": {

            "disable": false,

            "healthy": null

        }

    }

  }'


```

The response contains the complete definition of the new pool.

Response

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "id": "17b5962d775c646f3f9725cbc7a53df4",

    "created_on": "2021-01-01T05:20:00.12345Z",

    "modified_on": "2021-01-01T05:20:00.12345Z",

    "description": "Primary data center - Provider XYZ",

    "name": "primary-dc-1",

    "enabled": false,

    "load_shedding": {

      "default_percent": 0,

      "default_policy": "random",

      "session_percent": 0,

      "session_policy": "hash"

    },

    "minimum_origins": 2,

    "monitor": "f1aba936b94213e5b8dca0c0dbf1f9cc",

    "check_regions": [

      "WEU",

      "ENAM"

    ],

    "origins": [

      {

        "name": "app-server-1",

        "address": "0.0.0.0",

        "enabled": true,

        "weight": 0.56,

        "header": {

          "Host": [

            "example.com"

          ]

        }

      }

    ],

    "origin_steering": {

      "policy": "random"

    },

    "notification_filter": {

      "origin": {

        "disable": false,

        "healthy": null

      },

      "pool": {

        "disable": false,

        "healthy": null

      }

    }

  }

}


```

After creating the pool, you would also want to [create a new notification](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/create/) with the following parameters specified:

```

"alert_type": "load_balancing_health_alert",

"filters": {

  "pool_id": <<ARRAY_OF_INCLUDED_POOL_IDS>>,

  "new_health": <<ARRAY_OF_STATUS_TRIGGERS>> ["Unhealthy", "Healthy"],

  "event_source": <<ARRAY_OF_OBJECTS_WATCHED>> ["pool", "origin"]

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/create-pools/#page","headline":"Create pools · Cloudflare Learning Paths","description":"Create server pools for load balancing.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/create-pools/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/setup/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/setup/create-pools/","name":"Create pools"}}]}
```
