---
title: Configure routes
description: Set up Magic Transit static routes.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure routes

Magic Transit Virtual Network uses a routing table to steer your traffic from Cloudflare's global network to your connected networks via next-hop. You can add entries to the Magic Transit Virtual Network routing table through static route configuration or routes learned from BGP peering (beta) (available over CNI with Dataplane v2, as well as IPsec and GRE tunnels).

Refer to [Traffic Steering](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/) for more information about all the technical aspects related to:

* Routes' priorities and weights
* Regional scoping of traffic to reduce latency
* BGP peering (beta)

Anycast routing

Cloudflare uses anycast to route traffic. Anycast is a network addressing and routing method that routes incoming requests to different locations. Traffic can arrive at a different geographic location than expected. Not all requests go to the closest data center because Internet routing and peering relationships are complex, and Cloudflare optimizes for performance and reliability.

## Configure static routes

### Create a static route

* [ Dashboard ](#tab-panel-9047)
* [ API ](#tab-panel-9048)

1. Go to **Routes** page.
[ Go to **Routes** ](https://dash.cloudflare.com/?to=/:account/magic-networks/routes)
1. From the **Routes** tab, select **Create static route** to add a new route.
1. Enter a descriptive name for your route in **Description**.
2. In **Prefix**, enter your range of IP addresses. For example, `10.10.10.100/24`.
3. In **Tunnel/Next hop**, select a tunnel for your route from the tunnels you created in [Configure tunnel endpoints](https://developers.cloudflare.com/magic-transit/how-to/configure-tunnel-endpoints/).
4. Choose the **Priority** for your route. Lower numbers have higher priorities.  
Note  
Cloudflare routing applies longest-prefix match. A more specific static route (like `/30`) always takes precedence over a less specific one (like `/29`), regardless of tunnel priority — unless you remove the more specific route.  
 Keep this in mind when configuring priorities for your routes. Refer to [Route prioritization](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/#route-prioritization) for more information.
5. (Optional) Choose a **Weight** for your route. Refer to [Set priority and weights for static routes](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/#set-priority-and-weights-for-static-routes) for examples.
6. (Optional) If you need to scope your route to a specific region, you can do it in **Region code**.
7. (Optional) We highly recommend testing your route before adding it by selecting **Test routes**.
8. Select **Add routes**.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Create a `POST` request [using the API](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/routes/methods/create/) to create one or more static routes.

Example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic WAN Write`
* `Magic Transit Write`

Create a Route

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "nexthop": "<IP_NEXT_HOP>",

    "prefix": "<YOUR_IP_PREFIX>",

    "priority": 0,

    "id": "023e105f4ecef8ad9ca31a8372d0c353",

    "description": "<ROUTE_DESCRIPTION>",

    "scope": {

        "colo_names": [

            "den01"

        ],

        "colo_regions": [

            "APAC"

        ]

    },

    "weight": 0

  }'


```

```

{

  "errors": [

    {

      "code": 1000,

      "message": "message"

    }

  ],

  "messages": [

    {

      "code": 1000,

      "message": "message"

    }

  ],

  "result": {

    "routes": [

      {

        "nexthop": "203.0.113.1",

        "prefix": "192.0.2.0/24",

        "priority": 0,

        "id": "023e105f4ecef8ad9ca31a8372d0c353",

        "description": "New route for new prefix 203.0.113.1",

        "scope": {

          "colo_names": [

            "den01"

          ],

          "colo_regions": [

            "APAC"

          ]

        },

        "weight": 0

      }

    ]

  },

  "success": true

}


```

### Edit a static route

* [ Dashboard ](#tab-panel-9049)
* [ API ](#tab-panel-9050)

1. From the **Routes** tab, locate the route to modify.
2. Select the three dots next to it > **Edit**.
1. Enter the updated route information.
2. (Optional) We highly recommend testing your route before adding it by selecting **Test routes**.
3. Select **Edit routes**.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Create a `PUT` request [using the API](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/routes/methods/update/) to update one or more static routes.

Example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic WAN Write`
* `Magic Transit Write`

Update Route

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes/$ROUTE_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "nexthop": "<IP_NEXT_HOP>",

    "prefix": "<YOUR_IP_PREFIX>",

    "priority": 0,

    "id": "023e105f4ecef8ad9ca31a8372d0c353",

    "description": "<ROUTE_DESCRIPTION>",

    "scope": {

        "colo_names": [

            "den01"

        ],

        "colo_regions": [

            "APAC"

        ]

    },

    "weight": 0

  }'


```

```

{

  "errors": [

    {

      "code": 1000,

      "message": "message"

    }

  ],

  "messages": [

    {

      "code": 1000,

      "message": "message"

    }

  ],

  "result": {

    "modified": true,

    "modified_route": {

      "nexthop": "203.0.113.1",

      "prefix": "192.0.2.0/24",

      "priority": 0,

      "id": "023e105f4ecef8ad9ca31a8372d0c353",

      "description": "New route for new prefix 203.0.113.1",

      "scope": {

        "colo_names": [

          "den01"

        ],

        "colo_regions": [

          "APAC"

        ]

      },

      "weight": 0

    }

  },

  "success": true

}


```

### Delete static route

* [ Dashboard ](#tab-panel-9045)
* [ API ](#tab-panel-9046)

1. From the **Routes** tab, locate the static route to delete.
2. Select the three dots next to it > **Delete**.
1. Confirm the action by selecting the checkbox and select **Delete**.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Create a `DELETE` request [using the API](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/routes/methods/delete/) to delete a static route.

Example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic WAN Write`
* `Magic Transit Write`

Delete Route

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes/$ROUTE_ID" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "errors": [

    {

      "code": 1000,

      "message": "message"

    }

  ],

  "messages": [

    {

      "code": 1000,

      "message": "message"

    }

  ],

  "result": {

    "deleted": true,

    "deleted_route": {

      "nexthop": "203.0.113.1",

      "prefix": "192.0.2.0/24",

      "priority": 0,

      "id": "023e105f4ecef8ad9ca31a8372d0c353",

      "description": "New route for new prefix 203.0.113.1",

      "scope": {

        "colo_names": [

          "den01"

        ],

        "colo_regions": [

          "APAC"

        ]

      },

      "weight": 0

    }

  },

  "success": true

}


```

## Configure BGP routes

BGP peering is available when using the following on-ramps:

* [CNI with Dataplane v2](https://developers.cloudflare.com/network-interconnect/).
* [IPsec and GRE tunnels (beta)](https://developers.cloudflare.com/magic-transit/how-to/configure-tunnel-endpoints/). Requires [Unified Routing (beta)](https://developers.cloudflare.com/magic-transit/reference/traffic-steering/#unified-routing-mode-beta).

### Choose an ASN for BGP peering

The Magic Transit Virtual Network routing table is managed by the customer. You can select both the Cloudflare-side ASN (Autonomous System Number) and the ASN for your customer device. The customer device ASN can be 2-byte or 4-byte. [Public ASNs used for Magic Transit](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/#cloudflare-asn-vs-your-own-asn) are verified during the onboarding process.

By default, each BGP peering session uses the same Cloudflare-side ASN to represent peering with the Magic Transit Virtual Network routing table. This ASN is called the **CF Account ASN** and is set to `13335`. You can configure this to a private 2-byte ASN (any value between `64512` and `65534`, such as `65000`).

Note

If you are setting up BGP over IPsec or GRE tunnels you cannot change this value.

To set this ASN:

1. Go to the Routes page.
[ Go to **Routes** ](https://dash.cloudflare.com/?to=/:account/magic-networks/routes)
1. Select **WAN configuration**.
2. In **CF Account ASN**, enter Cloudflare's ASN.
3. Select **Update**.

Magic Transit customers should also be aware of the following:

* The Cloudflare side ASN will never be exposed in `AS_PATH` of anycast announcements from the Cloudflare edge. In those announcements, Cloudflare will always use the Cloudflare ASN of `13335` optionally prepended with a bring-your-own ASN as described in [Cloudflare ASN vs. your own ASN](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/#cloudflare-asn-vs-your-own-asn).
* The customer device ASN can be a private ASN or the ASN they are using for Magic Transit anycast announcements at the edge: this has no impact on the ASN for the anycast announced prefix at the edge of the Cloudflare global network.

### Set up BGP peering

You need to configure two ASNs:

* The Cloudflare [account-scoped ASN](#choose-an-asn-for-bgp-peering) named **CF Account ASN**.
* One ASN for each on-ramp you want to configure with BGP.

If you have already set up your Cloudflare account ASN, skip steps two and three below.

#### Set up BGP for an interconnect

Note

BGP over CNI is in closed beta and is not currently available to new customers. If you are interested in BGP peering over CNI, contact your account team.

1. Go to the Routes page.
[ Go to **Routes** ](https://dash.cloudflare.com/?to=/:account/magic-networks/routes)
1. Select **WAN configuration**.
2. In **CF Account ASN**, enter Cloudflare's ASN, and select **Update**.
3. Go to **Interconnects**.
[ Go to **Interconnects** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections/cni-tunnels) 
1. Locate the CNI interconnect with Dataplane v2 to configure with BGP > select the **three dots** next to it > **Configure BGP**.
2. In **Customer device ASN**, enter the ASN for your network.
3. In **MD5 key**, you can optionally enter the key for your network. Note that this is meant to prevent accidental misconfigurations and is not a security mechanism.
4. (Optional) In **Additional Advertised prefix list**, input any additional prefixes you want to advertise alongside your existing routes. Leave this blank if you do not want to advertise extra routes. Typical prefixes to configure here include:  
   * A route to `0.0.0.0/0`, the default route — to attract all Internet-bound traffic if using Magic Transit with Egress.  
   * A route to `100.96.0.0/12`, the portion of CGNAT space [used by default with Cloudflare One Clients](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#return-traffic-routing).
5. Select **Save**.

#### Set up BGP for IPsec/GRE tunnels

1. Go to the Routes page.
[ Go to **Routes** ](https://dash.cloudflare.com/?to=/:account/magic-networks/routes)
1. Select **WAN configuration**.
2. In **CF Account ASN**, enter Cloudflare's ASN, and select **Update**.
3. Go to **Connectors**.
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections) 
1. In **IPsec/GRE tunnels**, locate the tunnel you want to configure with BGP > select the **three dots** next to it > **Configure BGP**.
2. In **Customer device ASN**, enter the ASN for your network.
3. In **MD5 key**, you can optionally enter the key for your network. Note that this is meant to prevent accidental misconfigurations and is not a security mechanism.
4. (Optional) In **Additional Advertised prefix list**, input any additional prefixes you want to advertise alongside your existing routes. Leave this blank if you do not want to advertise extra routes. Typical prefixes to configure here include:  
   * A route to `0.0.0.0/0`, the default route — to attract all Internet-bound traffic if using Magic Transit with Egress.  
   * A route to `100.96.0.0/12`, the portion of CGNAT space [used by default with Cloudflare One Clients](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/#return-traffic-routing).
5. Select **Save**.

### Important remarks for GRE/IPsec tunnels

If you are configuring BGP peering for a tunnel (GRE or IPsec) you must be aware of the following:

* Your Customer Premises Equipment (CPE) must initiate the BGP peering session. Cloudflare will not initiate.
* Your BGP speaker must peer with the tunnel's IPv4 interface address. Your CPE may use any IPv4 address for its side of the peering connection; it does not need to use the other address from the `/31` or `/30` interface subnet.  
Warning  
If the tunnel is to an Azure VPN gateway, the tunnel interface address must not be in the link-local range. Azure will not initiate BGP sessions to peers using link-local addresses. Use an RFC 1918 address for your tunnel interface address instead.
* Hold time must be greater than 0 seconds (BGP `KEEPALIVE` messages are required). Cloudflare recommends at least 45 seconds. Cloudflare advertises a hold time of 90 seconds for GRE/IPsec tunnels. If you set a value greater than 90 seconds, the negotiated hold time will be 90 seconds, according to the standard way BGP has of negotiating hold times.
* Connect retry time should be low (for example, five or 10 seconds).
* Your CPE may advertise up to 5,000 prefixes on one BGP session.
* MD5 authentication is optional. You can use a maximum of 80 characters. Supported characters include `` a-zA-Z0-9'!@#$%^&*()+[]{}<>/.,;:_-~`= \\| ``  
Warning  
MD5 authentication is not a valid security mechanism. The MD5 key is not treated as a secret value. This is only supported for preventing misconfiguration, not for defending against malicious attacks.  
When MD5 is enabled, you cannot use Telnet to test BGP connectivity (Telnet does not support TCP MD5 authentication).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/data-center-protection/configure-tunnels-routes/configure-routes/#page","headline":"Configure routes · Cloudflare Learning Paths","description":"Set up Magic Transit static routes.","url":"https://developers.cloudflare.com/learning-paths/data-center-protection/configure-tunnels-routes/configure-routes/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/data-center-protection/configure-tunnels-routes/","name":"Configure tunnels and routes"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/data-center-protection/configure-tunnels-routes/configure-routes/","name":"Configure routes"}}]}
```
