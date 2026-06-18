---
title: DHCP relay
description: DHCP relay in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DHCP relay

DHCP Relay provides a way for DHCP clients to communicate with DHCP servers that are not available on the same local subnet/broadcast domain. When you enable DHCP Relay, Cloudflare One Appliance (formerly Magic WAN Connector) forwards DHCP discover messages to a predefined DHCP server, and routes the responses back to the original device that sent the discover message.


	flowchart LR
	accTitle: DHCP Relay diagram
	accDescr: The graph shows Cloudflare One Appliance sending DHCP discover messages to a DHCP server offsite.
			a(Cloudflare One Appliance) <--> b(Cloudflare/Cloudflare WAN) <--> c(DHCP server)

			subgraph Site A
			d[LAN 1] <--> a
			e[LAN 2] <--> a
			end

			subgraph Site B
			c
			end
			classDef orange fill:#f48120,color: black
			class a,b,c orange

_The graph shows Cloudflare One Appliance sending DHCP discover messages to a DHCP server offsite._

Warning

DHCP relay will not work if your DHCP server is behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/). To enable DHCP relay functionality, use either a Cloudflare WAN IPsec/GRE tunnel or a CNI connection.

To configure DHCP relay:

* [ Dashboard ](#tab-panel-7354)
* [ API ](#tab-panel-7355)

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Profiles**.
1. Select your Cloudflare One Appliance > **Edit**.
2. Select **Network Configuration**.
3. In **LAN configuration**, select the LAN where you need to configure DHCP relay.
4. Select **Edit**.
5. Select **This is a DHCP Relay**.
6. In **Upstream DHCP server addresses**, enter the IP address of your DHCP server.
7. (Optional) If you need to add more DHCP server addresses, select **Add upstream DHCP server address** as many times as needed, and enter the new values.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Create a [PUT request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/sites/subresources/lans/methods/update/) to update the LAN where you want to enable DHCP relay:

Example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic WAN Write`
* `Magic Transit Write`

Update Site LAN

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "lan": {

        "static_addressing": {

            "dhcp_relay": {

                "server_addresses": [

                    "192.0.2.1"

                ]

            }

        }

    }

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/#page","headline":"DHCP relay · Cloudflare One docs","description":"DHCP relay in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/","name":"Configure with Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/","name":"Network options"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/","name":"DHCP options"}},{"@type":"ListItem","position":10,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-relay/","name":"DHCP relay"}}]}
```
