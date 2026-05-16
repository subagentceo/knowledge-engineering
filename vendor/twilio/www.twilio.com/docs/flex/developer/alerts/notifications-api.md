# Flex alerts: Notification configuration API (public beta)

> \[!IMPORTANT]
>
> Alerts is currently available as a public beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a SLA.

## Base URL

All URLs referenced in this document have the following base:
`https://flex-api.twilio.com`

## NotificationConfigurations resource

The `NotificationConfigurations` resource manages notification settings for [Flex alerts](/docs/flex/admin-guide/setup/alerts/alerts-contact-center-metrics).

## Create a notification configuration

`POST /v1/Instances/{instanceSid}/NotificationConfigurations`

Create a notification configuration for alerts in your Flex instance.

### Path parameter

| Name                       | Type   | Description                                                     | Example                              | PII?    |
| -------------------------- | ------ | --------------------------------------------------------------- | ------------------------------------ | ------- |
| InstanceSid **(required)** | string | The unique SID identifier for the Flex instance. 34 characters. | `GO00000000000000000000000000000001` | Not PII |

Your Flex instance is the container that holds your Flex resources. You can find your Flex instance SID in Console on the [Flex overview](https://console.twilio.com/us1/develop/flex/overview) page.

### Header parameter

| Name                                 | Type   | Description                  | Example                              | PII?    |
| ------------------------------------ | ------ | ---------------------------- | ------------------------------------ | ------- |
| I-Twilio-Auth-Account **(required)** | string | The SID of the Flex account. | `AC00000000000000000000000000000000` | Not PII |

### Request body schema

Schema: `application/json`.

You can have a maximum of 100 notification configurations per Flex instance.

| Name                                                                | Type                    | Description                                                                                                                                                               | Default  | PII                                                                                           |
| ------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| destinations **(required)**                                         | object                  | The destination types of the notification.                                                                                                                                | -        | Not PII                                                                                       |
| destinations.subscriptions                                          | object or null          | The configuration for subscription type notification.                                                                                                                     | null     | Not PII                                                                                       |
| destinations.subscriptions.defaults                                 | object or null          | The default configuration for subscription type notification.                                                                                                             | null     | Not PII                                                                                       |
| destinations.subscriptions.defaults.archive                         | boolean or null         | Archive the notification.                                                                                                                                                 | true     | Not PII                                                                                       |
| destinations.subscriptions.defaults.enabled                         | boolean or null         | Enable the notification.                                                                                                                                                  | true     | Not PII                                                                                       |
| destinations.subscriptions.defaults.notification\_type              | array of strings unique | The type of the notification.`in_app`, `browser_push`,  or `toast`                                                                                                        | `in_app` | Not PII                                                                                       |
| destinations.subscriptions.recipients **(required)**                | array of objects        | There is a limit of 10 Flex user SIDs per notification configuration. These user sids can be part of the same recipient config or spread over multiple recipient configs. | -        | Not PII                                                                                       |
| destinations.subscriptions.recipients.user\_sids **(required)**     | array of strings        | The list of Flex users.                                                                                                                                                   | -        | Not PII                                                                                       |
| destinations.subscriptions.recipients.notification\_type            | array of strings unique | Override the default notification type for the recipient. `in_app`, `browser_push`, or `toast`                                                                            | -        | Not PII                                                                                       |
| destinations.subscriptions.recipients.archive                       | boolean or null         | Override the default archive configuration for the recipient.                                                                                                             | null     | Not PII                                                                                       |
| destinations.subscriptions.recipients.enabled                       | boolean or null         | Override the default enabled configuration for the recipient.                                                                                                             | null     | Not PII                                                                                       |
| destinations.webhooks                                               | object or null          | The configuration for webhook type notification.                                                                                                                          | null     | Not PII                                                                                       |
| destinations.webhooks.defaults                                      | object or null          | The default configuration for webhook type notification.                                                                                                                  | null     | Not PII                                                                                       |
| destinations.webhooks.defaults.enabled                              | boolean or null         | Enable the notification.                                                                                                                                                  | true     | Not PII                                                                                       |
| destinations.webhooks.endpoints **(required)**                      | array of objects        | There is a limit of one webhook endpoint per notification configuration.                                                                                                  | -        | Not PII                                                                                       |
| destinations.webhooks.endpoints.type **(required)**                 | string                  | The type of the webhook. `slack`, `custom`                                                                                                                                | -        | Not PII                                                                                       |
| destinations.webhooks.endpoints.url **(required)**                  | string `<url>`          | The webhook URL to which the notification will be sent.                                                                                                                   | -        | Not PII                                                                                       |
| destinations.webhooks.endpoints.enabled                             | boolean or null         | Override the default enabled configuration for the webhook.                                                                                                               | null     | Not PII                                                                                       |
| destinations.emails                                                 | object or null          | The configuration for email type notification.                                                                                                                            | null     | Not PII                                                                                       |
| destinations.emails.defaults                                        | object or null          | Default configuration for email type notification.                                                                                                                        | null     | Not PII                                                                                       |
| destinations.emails.defaults.enabled                                | boolean or null         | Enable email notifications.                                                                                                                                               | true     | Not PII                                                                                       |
| destinations.emails.email\_recipients                               | array of objects        | There is a limit of 10 email addresses per notification configuration.                                                                                                    | -        | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| destinations.emails.email\_recipients.email\_address **(required)** | string `<email>`        | The email address to which the notification will be sent.                                                                                                                 | -        | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |

### Response body schema

| Name                                                                | Type                    | Description                                                                                                                                                                      | Default   | PII                                                                                           |
| ------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| ttid **(required)**                                                 | string                  | The TTID of the notification configuration.                                                                                                                                      | -         | Not PII                                                                                       |
| instance\_sid **(required)**                                        | string                  | The SID of the Flex instance.                                                                                                                                                    | -         | Not PII                                                                                       |
| destinations **(required)**                                         | object                  | The destination types of the notification.                                                                                                                                       | -         | Not PII                                                                                       |
| destinations.subscriptions                                          | object or null          | The configuration for subscription type notification.                                                                                                                            | null      | Not PII                                                                                       |
| destinations.subscriptions.defaults                                 | object or null          | The default configuration for subscription type notification.                                                                                                                    | null      | Not PII                                                                                       |
| destinations.subscriptions.defaults.archive                         | boolean or null         | Archive the notification.                                                                                                                                                        | true      | Not PII                                                                                       |
| destinations.subscriptions.defaults.enabled                         | boolean or null         | Enable the notification.                                                                                                                                                         | true      | Not PII                                                                                       |
| destinations.subscriptions.defaults.notification\_type              | array of strings unique | The type of the notification. `in_app`, `browser_push`, or `toast`                                                                                                               | `in_app`] | Not PII                                                                                       |
| destinations.subscriptions.recipients **(required)**                | array of objects        | There is a limit of 10 Flex user SIDs per notification configuration. These user SIDs can be part of the same recipient configuration or spread over multiple recipient configs. | -         | Not PII                                                                                       |
| destinations.subscriptions.recipients.user\_sids **(required)**     | array of strings        | The list of Flex users.                                                                                                                                                          | -         | Not PII                                                                                       |
| destinations.subscriptions.recipients.notification\_type            | array of strings unique | Override the default notification type for the recipient. `in_app`, `browser_push`, or `toast`                                                                                   | -         | Not PII                                                                                       |
| destinations.subscriptions.recipients.archive                       | boolean or null         | Override the default archive configuration for the recipient.                                                                                                                    | null      | Not PII                                                                                       |
| destinations.subscriptions.recipients.enabled                       | boolean or null         | Override the default enabled configuration for the recipient.                                                                                                                    | null      | Not PII                                                                                       |
| destinations.webhooks                                               | object or null          | The configuration for webhook type notification.                                                                                                                                 | null      | Not PII                                                                                       |
| destinations.webhooks.defaults                                      | object or null          | The default configuration for webhook type notification.                                                                                                                         | null      | Not PII                                                                                       |
| destinations.webhooks.defaults.enabled                              | boolean or null         | Enable the notification.                                                                                                                                                         | true      | Not PII                                                                                       |
| destinations.webhooks.endpoints **(required)**                      | array of objects        | There is a limit of one webhook endpoint per notification configuration.                                                                                                         | -         | Not PII                                                                                       |
| destinations.webhooks.endpoints.type **(required)**                 | string                  | The type of the webhook. `slack` or `custom`                                                                                                                                     | -         | Not PII                                                                                       |
| destinations.webhooks.endpoints.url **(required)**                  | string `<url>`          | The webhook URL to which the notification will be sent.                                                                                                                          | -         | Not PII                                                                                       |
| destinations.webhooks.endpoints.enabled                             | boolean or null         | Override the default enabled configuration for the webhook.                                                                                                                      | null      | Not PII                                                                                       |
| destinations.emails                                                 | object or null          | The configuration for email type notification.                                                                                                                                   | null      | Not PII                                                                                       |
| destinations.emails.defaults                                        | object or null          | The default configuration for email type notification.                                                                                                                           | null      | Not PII                                                                                       |
| destinations.emails.defaults.enabled                                | boolean or null         | Enable email notifications.                                                                                                                                                      | true      | Not PII                                                                                       |
| destinations.emails.email\_recipients                               | array of objects        | There is a limit of 10 email addresses per notification configuration.                                                                                                           | -         | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| destinations.emails.email\_recipients.email\_address **(required)** | string `<email>`        | The email address to which the notification will be sent.                                                                                                                        | -         | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |

### Example request

```bash
curl -X POST "https://flex-api.twilio.com/v1/Instances/{instanceSid}/NotificationConfigurations" \
-H "Content-Type: application/json" \
-H "I-Twilio-Auth-Account: AC00000000000000000000000000000000" \
-d '{
   "destinations": {
    "subscriptions": {
      "defaults": {
        "archive": true,
        "enabled": true,
        "notification_type": [
          "in_app"
        ]
      },
      "recipients": [
        {
          "user_sids": [
            "string"
          ],
          "notification_type": [
            "in_app"
          ],
          "archive": true,
          "enabled": false
        }
      ]
    },
    "webhooks": {
      "defaults": {
        "enabled": true
      },
      "endpoints": [
        {
          "type": "slack",
          "url": "https://hooks.xyz.com/services/T0XX/B0XX/XXX",
          "enabled": false
        }
      ]
    },
    "emails": {
      "defaults": {
        "enabled": true
      },
      "email_recipients": [
        {
          "email_address": "user@example.com"
        }
      ]
    }
  }
}'
```

### Example response

```json
{
  "ttid": "flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8",
  "instance_sid": "GO00000000000000000000000000000001",
  "destinations": {
    "subscriptions": {
      "defaults": {
        "archive": true,
        "enabled": true,
        "notification_type": [
          "in_app"
        ]
      },
      "recipients": [
        {
          "user_sids": [
            "string"
          ],
          "notification_type": [
            "in_app"
          ],
          "archive": true,
          "enabled": false
        }
      ]
    },
    "webhooks": {
      "defaults": {
        "enabled": true
      },
      "endpoints": [
        {
          "type": "slack",
          "url": "https://hooks.xyz.com/services/T0XX/B0XX/XXX",
          "enabled": false
        }
      ]
    },
    "emails": {
      "defaults": {
        "enabled": true
      },
      "email_recipients": [
        {
          "email_address": "user@example.com"
        }
      ]
    }
  }
}
```

## Fetch a notification configuration for a Flex instance

`GET /v1/Instances/{instanceSid}/NotificationConfigurations/{notificationConfigTTID}`

Retrieve a notification configuration for a given Flex instance.

### Path parameters

| Name                                  | Type   | Description                                                     | Example                                                     | PII?    |
| ------------------------------------- | ------ | --------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| InstanceSid **(required)**            | string | The unique SID identifier for the Flex instance. 34 characters. | `GO00000000000000000000000000000001`                        | Not PII |
| NotificationConfigTTID **(required)** | string | The TTID of the notification configuration.                     | `flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8` | Not PII |

### Header parameter

| Name                                 | Type   | Description                  | Example                              | PII?    |
| ------------------------------------ | ------ | ---------------------------- | ------------------------------------ | ------- |
| I-Twilio-Auth-Account **(required)** | string | The SID of the Flex account. | `AC00000000000000000000000000000000` | Not PII |

### Example request

```bash
curl -X GET "https://flex-api.twilio.com/v1/Instances/{instanceSid}/NotificationConfigurations/{notificationConfigTTID}" \
-H "Content-Type: application/json" \
-H "I-Twilio-Auth-Account: AC00000000000000000000000000000000"
```

### Example response

```json
{
  "ttid": "flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8",
  "instance_sid": "GO00000000000000000000000000000001",
  "destinations": {
    "subscriptions": {
      "defaults": {
        "archive": true,
        "enabled": true,
        "notification_type": [
          "in_app"
        ]
      },
      "recipients": [
        {
          "user_sids": [
            "string"
          ],
          "notification_type": [
            "in_app"
          ],
          "archive": true,
          "enabled": false
        }
      ]
    },
    "webhooks": {
      "defaults": {
        "enabled": true
      },
      "endpoints": [
        {
          "type": "slack",
          "url": "https://hooks.xyz.com/services/T0XX/B0XX/XXX",
          "enabled": false
        }
      ]
    },
    "emails": {
      "defaults": {
        "enabled": true
      },
      "email_recipients": [
        {
          "email_address": "user@example.com"
        }
      ]
    }
  }
}
```

## Edit a notification configuration for a Flex instance

`POST /v1/Instances/{instanceSid}/NotificationConfigurations/{notificationConfigTTID}`

Update an existing notification configuration for a Flex instance.

### Path parameters

| Name                                  | Type   | Description                                                     | Example                                                     | PII?    |
| ------------------------------------- | ------ | --------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| InstanceSid **(required)**            | string | The unique SID identifier for the Flex instance. 34 characters. | `GO00000000000000000000000000000001`                        | Not PII |
| NotificationConfigTTID **(required)** | string | The TTID of the notification configuration.                     | `flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8` | Not PII |

### Header parameter

| Name                                 | Type   | Description                  | Example                              | PII?    |
| ------------------------------------ | ------ | ---------------------------- | ------------------------------------ | ------- |
| I-Twilio-Auth-Account **(required)** | string | The SID of the Flex account. | `AC00000000000000000000000000000000` | Not PII |

### Request body

The request body must be in `application/json` format. This is used to update the notification configuration.

| Name                        | Type   | Description                                | Example                                  | PII?    |
| --------------------------- | ------ | ------------------------------------------ | ---------------------------------------- | ------- |
| Destinations **(required)** | object | The destination types of the notification. | `subscriptions`, `webhooks`, or `emails` | Not PII |

### Example request

```json
{
  "destinations": {
    "subscriptions": {
      "defaults": {
        "archive": true,
        "enabled": true,
        "notification_type": [
          "in_app"
        ]
      },
      "recipients": [
        {
          "user_sids": [
            "string"
          ],
          "notification_type": [
            "in_app"
          ],
          "archive": true,
          "enabled": false
        }
      ]
    },
    "webhooks": {
      "defaults": {
        "enabled": true
      },
      "endpoints": [
        {
          "type": "slack",
          "url": "https://hooks.xyz.com/services/T0XX/B0XX/XXX",
          "enabled": false
        }
      ]
    },
    "emails": {
      "defaults": {
        "enabled": true
      },
      "email_recipients": [
        {
          "email_address": "user@example.com"
        }
      ]
    }
  }
}
```

### Example response

```json
{
  "ttid": "flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8",
  "instance_sid": "GO00000000000000000000000000000001",
  "destinations": {
    "subscriptions": {
      "defaults": {
        "archive": true,
        "enabled": true,
        "notification_type": [
          "in_app"
        ]
      },
      "recipients": [
        {
          "user_sids": [
            "string"
          ],
          "notification_type": [
            "in_app"
          ],
          "archive": true,
          "enabled": false
        }
      ]
    },
    "webhooks": {
      "defaults": {
        "enabled": true
      },
      "endpoints": [
        {
          "type": "slack",
          "url": "https://hooks.xyz.com/services/T0XX/B0XX/XXX",
          "enabled": false
        }
      ]
    },
    "emails": {
      "defaults": {
        "enabled": true
      },
      "email_recipients": [
        {
          "email_address": "user@example.com"
        }
      ]
    }
  }
}
```

## Delete a notification configuration for a Flex instance

`DELETE /v1/Instances/{instanceSid}/NotificationConfigurations/{notificationConfigTTID}`

Delete a specific notification configuration for a given Flex instance.

### Path parameters

| Name                                  | Type   | Description                                                     | Example                                                     | PII?    |
| ------------------------------------- | ------ | --------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| InstanceSid **(required)**            | string | The unique SID identifier for the Flex instance. 34 characters. | `GO00000000000000000000000000000001`                        | Not PII |
| NotificationConfigTTID **(required)** | string | The TTID of the notification configuration.                     | `flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8` | Not PII |

### Header parameter

| Name                                 | Type   | Description                  | Example                              | PII?    |
| ------------------------------------ | ------ | ---------------------------- | ------------------------------------ | ------- |
| I-Twilio-Auth-Account **(required)** | string | The SID of the Flex account. | `AC00000000000000000000000000000000` | Not PII |

### Example request

```bash
curl -X DELETE "https://flex-api.twilio.com/v1/Instances/{instanceSid}/NotificationConfigurations/{notificationConfigTTID}" \
-H "Content-Type: application/json" \
-H "I-Twilio-Auth-Account: AC00000000000000000000000000000000"
```

### Successful response

`204` No content.
