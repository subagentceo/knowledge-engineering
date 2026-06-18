---
title: Configure tunnel health alerts
description: Use the API to set up and configure tunnel health alerts
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure tunnel health alerts

You can configure Tunnel Health Alerts (formerly Magic Tunnel health alerts) to receive email, webhook, and PagerDuty notifications when the percentage of successful health checks for an IPsec/GRE tunnel drops below the selected [service-level objective (SLO)](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/how-cloudflare-calculates-tunnel-health-alerts/).

Tunnel health alerts monitor the health check success rate of each IPsec/GRE tunnel included in the alert that has actively transferred customer traffic (excluding health check traffic) over the past six hours. You can define an SLO threshold for the percentage of health checks that must be successful for each IPsec/GRE tunnel. If the number of successful health checks for the IPsec/GRE tunnel(s) included in the alert drops below the SLO threshold, an alert fires.

## Alert data

When a Tunnel health alert fires, you receive the following data in the email, webhook, and PagerDuty notification:

* Cloudflare account name
* Cloudflare account ID
* Alert type
* Tunnel name
* Tunnel ID
* Tunnel status
* Alert SLO
* Timestamp

## SLO thresholds

Currently, there are seven SLO threshold values that you can configure through the Cloudflare dashboard. For a more granular approach, use the [API](#set-up-tunnel-health-alerts).

The SLO threshold for Tunnel health alerts is the percentage of successful health checks for each IPsec/GRE tunnel in the alert:

| Alert Sensitivity Level | SLO threshold |
| ----------------------- | ------------- |
| Minimum                 | 95.0          |
| Very low                | 96.0          |
| Low                     | 97.0          |
| Medium                  | 98.0          |
| High                    | 99.0          |
| Very high               | 99.5          |
| Maximum                 | 99.9          |

The time it takes to receive alerts depends on the sensitivity level you configure for your SLO thresholds. Higher sensitivity levels notify you faster when a tunnel's health degrades, but they may also trigger alerts for brief or minor disruptions. Lower sensitivity levels reduce the chance of false alarms but may delay notifications for less severe issues.

While the underlying detection timing remains consistent across sensitivity levels, the speed of notification depends on how significantly the tunnel's health has dropped and the sensitivity you have chosen. Cloudflare recommends that you [test SLO thresholds](#test-slos) to determine which one better serves your use case.

For details, refer to [How Cloudflare calculates Tunnel health alerts](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/how-cloudflare-calculates-tunnel-health-alerts/).

## Set up Tunnel Health Alerts

* [ Dashboard ](#tab-panel-7366)
* [ API ](#tab-panel-7367)

1. Go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. From the **Product** drop-down menu, select **Cloudflare WAN**.
4. Select **Tunnel Health Check Alert** \> **Select** to add a notification. You can add alerts by tunnel or by data center (beta).

Alert by tunnel

1. Select **Alert by tunnel**.
2. Enter a name and description for the notification.
3. Add webhooks or an email address for the person who should receive the notification, and select **Next**.
4. Select the **Alert Sensitivity Level** threshold from the drop-down menu. The threshold defaults to _Medium (98.0)_. You can choose from options between _Minimum (95.0)_ and _Maximum (99.9)_. For details, refer to [How Cloudflare calculates Tunnel health alerts](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/how-cloudflare-calculates-tunnel-health-alerts/).
5. From the **Alert interval** drop-down menu, set the minimum amount of time that must pass before Cloudflare sends you a duplicate alert. Options range from five minutes to seven days.
6. Enable **Set as default alert for any new tunnels created in the future** if you want the alert sensitivity level you chose to be automatically applied to all new tunnels you create.
7. Select **Next**.
8. Choose the tunnels you want to receive alerts for. You can search by specific tunnel names, or filter them by type (Generic Routing Encapsulation (GRE), Internet Protocol Security (IPsec), and CNI (Cloudflare Network Interconnect)). Select **Next**.
9. Review the details of your alert. If these details are correct, select **Create alert**.

Alert by data center (beta)

1. Select **Alert by data center**.
2. Enter a name and description for the notification.
3. Add webhooks or an email address for the person who should receive the notification, and select **Next**.
4. Select the **Alert Sensitivity Level** threshold from the drop-down menu. The threshold defaults to _Medium (98.0)_. You can choose from options between _Minimum (95.0)_ and _Maximum (99.9)_. For details, refer to [How Cloudflare calculates Tunnel health alerts](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/how-cloudflare-calculates-tunnel-health-alerts/).
5. From the **Alert interval** drop-down menu, set the minimum amount of time that must pass before Cloudflare sends you a duplicate alert. Options range from five minutes to seven days.
6. Choose the data centers you want to receive alerts for, and select **Next**.
7. Choose the tunnels you want to receive alerts for. You can search by specific tunnel names, or filter them by type (GRE, IPsec, and CNI (Cloudflare Network Interconnect)). Select **Next**.
8. Review the details of your alert. If these details are correct, select **Create alert**.

Note

For details on specific permissions, refer to the [documentation for Notifications](https://developers.cloudflare.com/notifications/get-started/).

Send a [POST request](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/create/) to create a tunnel health alert. You can set tunnel health alerts with any SLO value between `0` and `99.99`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Notifications Write`
* `Account Settings Write`

Create a Notification policy

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/policies" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "alert_type": "magic_wan_tunnel_health",

    "description": "<DESCRIBE_POLICY>",

    "enabled": true,

    "filters": {

        "slo": [

            "99.9"

        ]

    },

    "mechanisms": {

        "email": [

            {

                "id": "EMAIL_ADDRESS"

            }

        ]

    },

    "name": "<DESCRIBE_ALERT>"

  }'


```

```

  {

    "result": [

      {

        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",

        "name": "<POLICY_NAME>",

        "description": "<POLICY_DESCRIPTION>",

        "enabled": true,

        "alert_type": "magic_wan_tunnel_health",

        "mechanisms": {

          "email": [

            {

              "id": "<YOUR_EMAIL>"

            }

          ]

        },

        "created": "2024-09-11T14:13:29.585658Z",

        "modified": "2024-09-11T14:13:29.585658Z",

        "conditions": {

          "and": [

            {

              "or": [

                {

                  "<=": [

                    {

                      "var": "slo"

                    },

                    "99.9"

                  ]

                }

              ]

            }

          ]

        },

        "filters": {

          "slo": ["99.9"]

        }

      }

    ],

    "success": true,

    "errors": [],

    "messages": []

  }


```

## Test SLOs

To test whether a specific alert sensitivity level works for your use case:

1. [Create an alert](#set-up-tunnel-health-alerts) with a specific sensitivity level for a tunnel with active traffic within the past six hours. If you are unsure which tunnels to choose, refer to [Network Analytics](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/analytics/network-analytics/) for real-time and historical data about your network.
2. Disable the tunnel you are testing, so there is 100% [health check failure](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/tunnel-health-checks/).
3. The time it takes for Cloudflare to send you an alert depends on the sensitivity you chose for your alerts.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/configure-tunnel-health-alerts/#page","headline":"Configure tunnel health alerts · Cloudflare One docs","description":"Use the API to set up and configure tunnel health alerts","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/configure-tunnel-health-alerts/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/","name":"Common settings"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/configure-tunnel-health-alerts/","name":"Configure tunnel health alerts"}}]}
```
