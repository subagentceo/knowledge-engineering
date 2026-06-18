---
title: Set up a site
description: Set up a site in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up a site

Sites represent the local network of a data center, office, or other physical location, and combine all on-ramps available there. Sites also allow you to quickly check the state of your on-ramps and set up health alert settings so that you get notified when there are issues with the site's on-ramps.

To use a site, start by setting up your on-ramps. On-ramps can be:

* [GRE or IPsec tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/)
* [Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/)
* Direct [CNI link](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/network-interconnect/)

Before creating a site, ensure you have set up at least one on-ramp. Then, follow these steps:

## Add a site

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/).
2. Go to **Insights** \> **Network visibility**.
3. In **Network overview**, select **Add site**.
4. Add a name and description for your new site. Optionally, you can also add the geographical coordinates for your site in **Latitude** and **Longitude**. If you add geographical coordinates, your site's location will appear in the map once created.
5. Select **Create and continue**.
6. Choose one or more on-ramps for your site from the list. Remember to only choose the on-ramps available to that particular site, as the list might include on-ramps available on other locations.
7. Select **Continue**.
8. In **Define alert settings** you set up alerts to notify you when there are issues with your site's on-ramps. If you want to set up alerts later, select **Skip this for now** to complete your setup. Otherwise, continue reading.
9. In **Tunnel Health Check Alert** \> **Notification name**, enter a name for the site's alert.
10. Under **Alert settings**, choose how you want to be notified when there is an issue. You can add webhooks as well as email addresses.
11. In **Alert sensitivity level** define the threshold for Tunnel health alerts to be fired. For details, refer to [How Cloudflare calculates Tunnel health alerts](https://developers.cloudflare.com/cloudflare-wan/reference/how-cloudflare-calculates-tunnel-health-alerts/).
12. Select **Complete setup** to finish setting up your site.

Your site is now set up. If you have other sites you need to set up, repeat the steps above. If you did not set up alerts, we strongly recommend that you do it. Otherwise you will not be notified when there is a problem with one of your on-ramps.

---

## Network overview

After adding your sites, the Network visibility section of the dashboard provides a summary of the connectivity status and traffic analytics for all your sites. This is a great place to start if you receive a Cloudflare WAN alert, need to begin the troubleshooting process, or are performing routine monitoring. 

Network visibility has the following data types available:

Geographic map summary

* [Aggregate Cloudflare WAN site health](#site-health)
* [Cloudflare WAN availability status for sites](#no-status-available)
* [Cloudflare WAN site geographic location](#no-location-set)

Cloudflare WAN site data table

* Site Name
* Site Health
* Site Tunnel Names
* Site Tunnel Statuses
* Site Traffic Sent
* Site Traffic Received

Cloudflare WAN site data

* Traffic Sent by Tunnel
* Traffic Received by Tunnel

To start using network overview:

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/).
2. Go to **Insights** \> **Network visibility**.

You will have access to an overview map with all your active sites, and any alerts for sites that are unhealthy or have no status available to them.

Review the following topics to learn more about the options available to you.

### Network map and traffic overview

The network map section shows all the sites configured with Cloudflare WAN. At a glance, you can check:

* How many active sites you have
* Location for sites in a map (if you set up their geographic location)
* Sites that are healthy or unhealthy
* Sites that have no status available
* Sites that have no location set

The Traffic overview section displays a more granular list of your sites and their status.

#### Site health

Sites can be healthy or unhealthy, and Cloudflare WAN uses this information to route traffic. Refer to [Set thresholds for site health](#set-thresholds-for-site-health) to learn more about this topic.

#### No status available

The status of a site refers to its health. If your sites show a **No status available** message, this means you did not configure your alert settings when creating your site. For instructions, refer to [Configure Tunnel health alerts](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/configure-tunnel-health-alerts/).

#### No location set

The dashboard displays the number of sites with no location set, meaning sites for which you did not set up a geographic location. To add a location to a site, find the site you want to add location to, and select **no location set** to edit its location settings. Refer to [Set geographic coordinates](#set-geographic-coordinates) for more information.

### Traffic overview

Traffic overview aggregates all Cloudflare WAN sites configured in your account. Here, you can check summary information about each site like:

* Site status
* Traffic sent and received

Select one of your sites to have access to a more detailed view of its traffic, including traffic by tunnel.

---

## Edit a site

### Add or remove on-ramps

1. Log in to [Cloudflare One](https://one.dash.cloudflare.com/).
2. Go to **Insights** \> **Network visibility**.
3. In **Network overview** \> **Traffic overview**, find your site > select the three dots in front of it > **Edit**.
4. Select **On-ramps**.
5. Select **Add** to add a new on-ramp.
6. If you want to remove an on-ramp, select the three dots in front of your on-ramp > **Remove**.

### Set geographic coordinates

If you add geographic coordinates to your site, it will appear in the Network map. To set up or edit geographic coordinates to an existing site:

1. Go to **Insights** \> **Network visibility**.
2. In **Network overview** \> **Traffic overview**, find your site > select the three dots in front of it > **Edit**.
1. In **Basic information**, edit your site's **Latitude** and **Longitude** coordinates.
2. Select **Save**.

### Set thresholds for site health

When you set up an alert for your site, you will be notified when there is an issue with one or more on-ramps. These alerts are sent when the percentage of successful health checks for a Cloudflare WAN on-ramp drops below the selected service-level objective (SLO). Setting health alerts will also display unhealthy tunnels in the Network map and in the Traffic overview sections.

To set up health alerts:

1. Configure [Tunnel health alerts](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/configure-tunnel-health-alerts/) across all of the tunnels associated with each Cloudflare WAN site.
2. After configuring Tunnel health alerts, any Cloudflare WAN site with a tunnel (on-ramp) that is outside of its SLO threshold will be labeled unhealthy in Network map and Traffic overview.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/sites/#page","headline":"Set up a site · Cloudflare One docs","description":"Set up a site in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/sites/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/","name":"Common settings"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/sites/","name":"Set up a site"}}]}
```
