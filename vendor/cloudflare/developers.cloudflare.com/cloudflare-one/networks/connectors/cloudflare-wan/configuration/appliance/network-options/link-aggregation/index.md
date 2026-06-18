---
title: Configure link aggregation groups
description: Bundle physical LAN ports into a single logical interface for redundancy and bandwidth.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure link aggregation groups

You can bundle multiple physical LAN ports on a Cloudflare One Appliance into a single logical port called a Link Aggregation Group (LAG). This increases LAN bandwidth and provides redundancy. If a member port fails, traffic automatically shifts to the remaining ports in under one second.

Note

Your appliance must be running OS version 2026.2.0 or later. This version deploys automatically.

The following guide assumes you have already created a site and configured your Cloudflare One Appliance. For instructions, refer to [Configure hardware Appliance](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/configure-hardware-appliance/) or [Configure virtual Appliance](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/configure-virtual-appliance/).

## Create a LAG

1. Go to the **Connectors** page.
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections) 
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance you want to configure > **Edit**.
3. Go to the **Appliances** tab.
4. In **Link aggregation groups (LAGs)**, select **Create A LAG**.
5. Select the LAN ports you want to bundle. You can add up to six ports per LAG. All ports must be the same type and speed.
6. Select **Save**.

## Assign a LAN to a LAG

1. Go to the **Connectors** page.
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections) 
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance you want to edit > **Edit**.
3. Go to **Network Configuration** \> **LAN configuration**.
4. Select or create a LAN > **Edit**.
5. In **Interface** \> **Interface type**, select **Aggregate** as your LAG instead of a single port.
6. Select **Save**.

## Monitor LAG status

1. Go to the **Connectors** page.
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections) 
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance > **Edit**.
3. Go to the **Appliances** tab.

The page displays each configured LAG and the status of its member ports.

## Delete a LAG

1. Go to the **Connectors** page.
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections) 
1. Go to the **Appliances** tab > **Profiles**.
2. Select the Cloudflare One Appliance > **Edit**.
3. Go to the **Appliances** tab.
4. Next to the LAG you want to delete, select the three-dot menu > **Delete**.
5. Select **Delete**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/link-aggregation/#page","headline":"Configure link aggregation groups · Cloudflare One docs","description":"Bundle physical LAN ports into a single logical interface for redundancy and bandwidth.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/link-aggregation/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/","name":"Configure with Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/","name":"Network options"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/link-aggregation/","name":"Configure link aggregation groups"}}]}
```
