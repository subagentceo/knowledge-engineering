---
title: Breakout traffic
description: Breakout traffic allows you to define which applications should bypass Cloudflare's security filtering.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Breakout traffic

Breakout traffic allows you to define which applications should bypass Cloudflare's security filtering, and go directly to the Internet. It works via DNS requests inspection. This means that if your network is caching DNS requests, Breakout traffic will only take effect after you cache entries expire and your client issues a new DNS request that Cloudflare One Appliance (formerly Magic WAN Connector) can detect. This can take several minutes.

Warning 

Breakout traffic will not work for applications that use DNS-over-HTTPS.


		flowchart LR
		accTitle: Breakout traffic flow
		accDescr: Applications 1 and 2 are configured to bypass Cloudflare's security filtering, and go straight to the Internet.
		a(Cloudflare One Appliance) --> b(Cloudflare) -->|Filtered traffic|c(Internet)

		a-- Breakout traffic ---d(Application1) & e(Application2) --> c

		classDef orange fill:#f48120,color: black
		class a,b orange
		
_In the graph above, Applications 1 and 2 are configured to bypass Cloudflare's security filtering, and go straight to the Internet._

A note on security 

We recommend [routing](https://www.cloudflare.com/learning/network-layer/what-is-routing/) all traffic through our global network for comprehensive security filtering and access controls. However, there may be specific cases where you want a subset of traffic to bypass Cloudflare's security filtering and route it directly to the Internet. You can scope this breakout traffic to specific applications from the Cloudflare dashboard.

 For details on how Cloudflare routes traffic, refer to [Traffic steering](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/).

## Add an application to your account

Before you can add or remove Breakout traffic applications to your Cloudflare One Appliance, you need to create an account-level list with the applications that you want to configure. Currently, adding to or modifying this list is only possible via API, through the [managed\_app\_id](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/create/) endpoint.

To add applications to your account:

Send a `POST` request to add new apps to your account.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic WAN Write`
* `Magic Transit Write`

Create a new App

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "managed_app_id": "<APP_ID>",

    "name": "<APP_NAME>",

    "type": "<APP_TYPE>"

  }'


```

```

{

  "result": {

    "account_app_id": "eb09v665c0784618a3e4ba9809258fd4",

    "name": "<APP_NAME>",

    "type": "<APP_TYPE>",

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

You can now add this new app to the Breakout traffic list in your Cloudflare One Appliance.

### Add an application to Cloudflare One Appliance

You need to configure Breakout traffic applications for each of your existing sites, as this is a per-site configuration.

* [ Dashboard ](#tab-panel-7348)
* [ API ](#tab-panel-7349)

1. Log in to the [Cloudflare One dashboard](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Profiles**.
1. Select the Cloudflare One Appliance you want to configure > **Edit**.
2. Select **Traffic Steering**.
3. In **Breakout traffic**, select **Create**.
4. Select one or more applications that should bypass Cloudflare filtering from the list. You can also use the search box.
1. (Optional) You can also pin an application to a WAN port. In **Preferred breakout port**, select the WAN you want to assign your applications to. Refer to [Designate WAN ports for breakout apps](#designate-wan-ports-for-breakout-apps) for more information.
1. Select **Save**.

The traffic for the application you chose will now go directly to the Internet and bypass Cloudflare's filtering.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

1. Send a `GET` [request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/list/) to list the applications associated with an account.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic WAN Write`  
   * `Magic WAN Read`  
   * `Magic Transit Read`  
   * `Magic Transit Write`  
List Apps  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
  {  
    "result": [  
      {  
        "managed_app_id": "<APP_ID>",  
        "name": "<APP_NAME>",  
        "type": "File Sharing",  
        "hostnames": [  
          "<app_name.com>",  
          "<app-name.info>"  
        ]  
      }  
    ]  
  }  
```  
Take note of the `"managed_app_id"` value for any application you want to add.
2. Send a `POST` request to add new apps to the Breakout traffic policy.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic WAN Write`  
   * `Magic Transit Write`  
Create a new App Config  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "managed_app_id": "<MANAGED_APP_ID>",  
    "breakout": true  
  }'  
```  
```  
{  
  "result": {  
    "account_app_id": "<APP_ID>",  
    "name": "<APP_NAME>",  
    "type": "<BREAKOUT_OR_PRIORITY>"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```

### Delete an application from Cloudflare One Appliance

* [ Dashboard ](#tab-panel-7346)
* [ API ](#tab-panel-7347)

1. Log in to the [Cloudflare One dashboard](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Profiles**.
1. Select the Appliance you want to configure > **Edit**.
2. Select **Traffic Steering**.
3. In **Breakout traffic**, find the application you want to delete > select the **three dots** next to it > **Remove application traffic**.
4. (Optional) If you have several pages of applications, you can use the search box to quickly find the application you are looking for.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

You need to delete Breakout traffic applications for each of your existing sites, as this is a per-site configuration.

1. Send a [GET request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/list/) to list the applications associated with a site.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic WAN Write`  
   * `Magic WAN Read`  
   * `Magic Transit Read`  
   * `Magic Transit Write`  
List App Configs  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
  {  
    "result": [  
      {  
        "id": "<APP_ID>",  
        "site_id": "<SITE_ID>",  
        "managed_app_id": "<APP_NAME>",  
        "breakout": true  
      }  
    ]  
  }  
```  
Take note of the `"id"` value for the application that you want to delete.
2. Send a `DELETE` request to delete an application from the Breakout traffic policy.  
Terminal window  
```  
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/magic/sites/%7Bsite_id%7D/app_configs/%7Bid%7D" \  
  --request DELETE  
```  
```  
{  
    "result": {  
        "id": "<APP_ID>",  
        "site_id": "<SITE_ID>",  
        "managed_app_id": "<APP_NAME>",  
        "breakout": true  
    },  
    "success": true,  
    "errors": [],  
    "messages": []  
}  
```

## Designate WAN ports for breakout apps

You can pin applications to a specific WAN port in Cloudflare One Appliance when you need control over which WAN port your applications egress from the device. In case your preferred WAN port goes down, Cloudflare One Appliance automatically fails over to a standard configured WAN port priority.

With this preferred breakout port, customers have direct control over their local Internet breakout traffic. You can designate a specific WAN uplink as the primary path for your critical applications configured to bypass the Cloudflare network. This provides the predictability and control needed for performance-sensitive applications, ensuring your critical traffic always takes the path you choose.

To pin applications to a WAN port:

1. Log in to the [Cloudflare One dashboard](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Profiles**.
3. Select the Cloudflare One Appliance you want to configure > **Edit**.
1. In **Traffic steering** \> **Breakout Traffic** find the application you want to pin to a WAN port.
2. Select the three dots next to it > **Edit application traffic**.
3. From the **Preferred breakout port** drop-down menu, select the WAN port you want to assign to the applications.
4. Select **Save**.

## NetFlow exports from Cloudflare One Appliance to Network Flow

You can configure your Cloudflare One Appliance (formerly Magic WAN Connector) to export Netflow statistics for local breakout traffic to [Network Flow](https://developers.cloudflare.com/network-flow) (formerly Magic Network Monitoring). This provides insights into traffic that leaves your site directly, bypassing the Cloudflare network.

The Cloudflare One Appliance uses NetFlow v9 to export flow data for breakout traffic only. You can enable and configure this export by setting the Netflow configuration for the associated site via the Cloudflare API.

### Enable NetFlow exports

Note

To export NetFlow statistics, you will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/), as well as the `site_id` associated with your Cloudflare One Appliance.

1. Send a `PUT` request to the Netflow configuration endpoint for your site.
2. In the JSON body request, you must include the `collector_ip` parameter. To export traffic statistics to Network Flow, use the IP address `162.159.65.1`. This is the only field required to enable the feature.

Minimal configuration example:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/netflow_config" \

  --request PUT \

  --json '{

    "collector_ip": "162.159.65.1"

  }'


```

1. You can customize the configuration by adding optional fields to the JSON payload. These fields include:
* `collector_port`: The UDP port for the collector. The default is `2055`.
* `sampling_rate`: The rate at which packets are sampled.
* `active_timeout`: The timeout for active flows in seconds.
* `inactive_timeout`: The timeout for inactive flows in seconds.

Full configuration example:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/netflow_config" \

  --request PUT \

  --json '{

    "collector_ip": "162.159.65.1",

    "collector_port": 2055,

    "sampling_rate": 100,

    "active_timeout": 60,

    "inactive_timeout": 30

  }'


```

Your Cloudflare One Appliance will now begin exporting Netflow data for its breakout traffic, which will be ingested and displayed within your Network Flow dashboard. You can retrieve the current settings by sending a `GET` request, or disable the export by sending a `DELETE` request to the same endpoint.

## Cloudflare One Client traffic

If you have Cloudflare One Appliance (formerly Magic WAN Connector) and Cloudflare One Clients deployed in your premises, Cloudflare One Appliance automatically routes Cloudflare One Client traffic to the Internet rather than Cloudflare WAN IPsec tunnels. This prevents traffic from being encapsulated twice.

You may need to configure your firewall to allow this new traffic. Make sure to allow the following IPs and ports:

* **Destination IPs**: `162.159.193.0/24`, `162.159.197.0/24`
* **Destination ports**: `443`, `500`, `1701`, `2408`, `4443`, `4500`, `8095`, `8443`

Refer to [Cloudflare One Client with firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/) for more information on this topic.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/#page","headline":"Breakout traffic · Cloudflare One docs","description":"Breakout traffic allows you to define which applications should bypass Cloudflare's security filtering.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/","name":"Configure with Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/","name":"Network options"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/","name":"Application-aware policies"}},{"@type":"ListItem","position":10,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/","name":"Breakout traffic"}}]}
```
