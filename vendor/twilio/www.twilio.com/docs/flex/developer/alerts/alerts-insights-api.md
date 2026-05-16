# Flex alerts: Rules API (public beta)

> \[!IMPORTANT]
>
> Alerts is currently available as a public beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a SLA.

> \[!WARNING]
>
> Avoid using a person's name, home address, email, phone number, or other PII in the `rule_friendly_name` field. Instead, use some form of pseudonymized identifier.
>
> Learn more about how we process your data in our [privacy policy](https://www.twilio.com/legal/privacy).

## Base URL

All URLs referenced in this document have the following base:
`https://flex-api.twilio.com`

## InsightsRules resource

The `InsightsRules` resource manages [alert rules and thresholds](/docs/flex/admin-guide/setup/alerts/alerts-contact-center-metrics) for your Flex instance.

## Create an alert

`POST /v1/Instances/{InstanceSid}/InsightsRules`

Create an alert in your Flex instance.

To create an alert:

1. If you want to use in-app notifications (optional), make a `GET` request to `/v1/Instances/{InstanceSid}/Users`. See [Flex Users resource](/docs/flex/developer/user-management/flex-users-api) to retrieve the list of users.
2. Make a `GET` request to the [TaskQueues resource](/docs/taskrouter/api/task-queue#action-list) to retrieve the TaskQueue SID.
3. Make a `GET` request to the [TaskChannels resource](/docs/taskrouter/api/task-channel#read-multiple-taskchannel-resources) to retrieve the TaskChannel SID.
4. [Create a notification configuration](/docs/flex/developer/alerts/notifications-api#section-create-a-notification-configuration). Choose your notification method:
   * For `in_app` notifications: Use the user SIDs from step 1 in the `recipients.user_sids` array.
   * For `webhook` notifications: Provide webhook URLs in the `endpoints` array.
   * For `email` notifications: Provide email addresses in the `email_recipients` array.
5. Make a `POST` request to `/v1/Instances/{InstanceSid}/InsightsRules` to create the alert. In the request body, use the `ttid` from the notification configuration response (step 4) as the value for `notify_methods_id`, and include the TaskQueue SID and TaskChannel SID from steps 2 and 3.

### Path parameter

| Name                       | Type   | Description                                                                                                   | PII?    |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | string | The unique SID identifier for the Flex Instance. 34 characters. Example: `GO1234567890abcdef1234567890abcdef` | Not PII |

Your Flex instance is the container that holds your Flex resources. You can find your Flex instance SID in Console on the [Flex overview](https://console.twilio.com/us1/develop/flex/overview) page.

### Request body schema

Schema: `application/json`

| Name                                | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | PII?                                                                                          |
| ----------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| rule\_friendly\_name **(required)** | string           | The friendly name for the rule.                                                                                                                                                                                                                                                                                                                                                                                                                                             | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| metric\_id **(required)**           | string           | The metric ID on which the Insights rule is based. Includes `Active (Now)`, `Waiting (Now)`, `Available Agents (Now)`, `Offline Agents (Now)`, `Unavailable Agents (Now)`, `Abandoned (30 min)`, `Abandoned (Today)`, `Accepted (30 min)`, `Accepted (Today)`, `Avg. Speed of Answer (Today)`, `Avg. Handle Time (Today)`, `Missed Invitations (30 min)`, `Missed Invitations (Today)`, `SLA (30 min)`, `SLA (Today)`, `Longest Available Agent (Now)`, and `Longest (Now)` | Not PII                                                                                       |
| task\_channel\_sid **(required)**   | string           | The SID of the task channel.                                                                                                                                                                                                                                                                                                                                                                                                                                                | Not PII                                                                                       |
| task\_queue\_sids **(required)**    | array of strings | Array of SIDs for queues to which the Insights Rule belongs.                                                                                                                                                                                                                                                                                                                                                                                                                | Not PII                                                                                       |
| active **(required)**               | boolean          | Whether the rule is active or not.                                                                                                                                                                                                                                                                                                                                                                                                                                          | Not PII                                                                                       |
| rule\_thresholds **(required)**     | array of objects | Array of threshold objects including: threshold\_type ( `Critical` or `Warning`), threshold\_operator (`Greater Than` or `Lesser Than`), threshold\_value (integer)                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| notify\_enabled **(required)**      | boolean          | Whether notifications are enabled for the rule.                                                                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| notify\_severity                    | string           | The type of threshold. `Critical`or `Warning`                                                                                                                                                                                                                                                                                                                                                                                                                               | Not PII                                                                                       |
| notify\_duration                    | integer          | The duration in milliseconds for which the notification should be sent.                                                                                                                                                                                                                                                                                                                                                                                                     | Not PII                                                                                       |
| notify\_methods\_id                 | string           | The TTID of the notification configuration that contains the notification methods to be used when sending a notification.                                                                                                                                                                                                                                                                                                                                                   | Not PII                                                                                       |

### Request example

```json
{
"rule_friendly_name": "Waiting tasks now rule",
"metric_id": "Active (Now)",
"task_channel_sid": "string",
"task_queue_sids": [
"WQ00000000000000000000000000000001"
],
"active": true,
"rule_thresholds": [
{
"threshold_type": "Critical",
"threshold_operator": "Greater Than",
"threshold_value": 5000
}
],
"notify_enabled": true,
"notify_severity": "Critical",
"notify_duration": 900000,
"notify_methods_id": "flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8"
}
```

### Response headers

| Name                             | Type    | Description                                                                                         | PII?    |
| -------------------------------- | ------- | --------------------------------------------------------------------------------------------------- | ------- |
| Access-Control-Allow-Origin      | string  | Specify the origin(s) allowed to access the resource. Example: `*`                                  | Not PII |
| Access-Control-Allow-Methods     | string  | Specify the HTTP methods allowed when accessing the resource. Example: `POST`                       | Not PII |
| Access-Control-Allow-Headers     | string  | Specify the headers allowed when accessing the resource. Example: `Content-Type` or `Authorization` | Not PII |
| Access-Control-Allow-Credentials | boolean | Indicates whether the browser should include credentials.                                           | Not PII |
| Access-Control-Expose-Headers    | string  | Headers exposed to the client. Example: `X-Custom-Header1`, `X-Custom-Header2`                      | Not PII |

### Response schema

Schema: `application/json`

| Name                 | Type                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      | PII?                                                                                          |
| -------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| url                  | string or null `<uri>`                  | The URL of this resource.                                                                                                                                                                                                                                                                                                                                                                                                                                        | Not PII                                                                                       |
| sid                  | string or null. 34 characters           | The Flex Insights alert rules ID.                                                                                                                                                                                                                                                                                                                                                                                                                                | Not PII                                                                                       |
| account\_sid         | string or null. 34 characters           | The unique SID identifier of the account.                                                                                                                                                                                                                                                                                                                                                                                                                        | Not PII                                                                                       |
| instance\_sid        | string or null. 34 characters           | The unique SID identifier of the instance.                                                                                                                                                                                                                                                                                                                                                                                                                       | Not PII                                                                                       |
| task\_channel\_sid   | string or null. 34 characters           | The task channel this rule applies to.                                                                                                                                                                                                                                                                                                                                                                                                                           | Not PII                                                                                       |
| task\_queue\_sids    | array of strings or null. 34 characters | The task queues this rule applies to.                                                                                                                                                                                                                                                                                                                                                                                                                            | Not PII                                                                                       |
| rule\_friendly\_name | string or null                          | The friendly name of the rule.                                                                                                                                                                                                                                                                                                                                                                                                                                   | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| metric\_id           | string                                  | The metric this rule is associated with. Includes `Active (Now)`, `Waiting (Now)`, `Available Agents (Now)`, `Offline Agents (Now)`, `Unavailable Agents (Now)`, `Abandoned (30 min)`, `Abandoned (Today)`, `Accepted (30 min)`, `Accepted (Today)`, `Avg. Speed of Answer (Today)`, `Avg. Handle Time (Today)`, `Missed Invitations (30 min)`, `Missed Invitations (Today)`, `SLA (30 min)`, `SLA (Today)`, `Longest Available Agent (Now)` and `Longest (Now)` | Not PII                                                                                       |
| active               | boolean or null                         | Whether the rule is currently active or not.                                                                                                                                                                                                                                                                                                                                                                                                                     | Not PII                                                                                       |
| rule\_thresholds     | any or null                             | The thresholds that trigger the rule.                                                                                                                                                                                                                                                                                                                                                                                                                            | Not PII                                                                                       |
| date\_created        | string or null `<date-time>`            | The date and time in GMT when the resource was created specified in ISO 8601 format.                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| date\_updated        | string or null `<date-time>`            | The date and time in GMT when the resource was last updated specified in ISO 8601 format.                                                                                                                                                                                                                                                                                                                                                                        | Not PII                                                                                       |
| notify\_enabled      | boolean or null                         | Whether notifications are enabled for this rule.                                                                                                                                                                                                                                                                                                                                                                                                                 | Not PII                                                                                       |
| notify\_severity     | string                                  | The minimum severity level that will trigger a notification. `Critical` or `Warning`                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| notify\_duration     | integer                                 | The amount of time the threshold condition must be met before a notification is sent, in milliseconds. Default: 0                                                                                                                                                                                                                                                                                                                                                | Not PII                                                                                       |
| notify\_methods\_id  | string or null                          | The SID of the notification configuration that contains the notification methods to be used when sending a notification.                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |

### Response example

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "QYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "rule_friendly_name": "Waiting tasks now rule",
  "metric_id": "Active (Now)",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sids": ["WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
  "active": true,
  "rule_thresholds": [
    {
      "threshold_type": "Critical",
      "threshold_operator": "Greater Than",
      "threshold_value": 5000
    }
  ],
  "date_created": "2019-08-24T14:15:22Z",
  "date_updated": "2019-08-24T14:15:22Z",
  "notify_enabled": true,
  "notify_severity": "Critical",
  "notify_duration": 900000,
  "notify_methods_id": "flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8",
  "url": "https://flex-api.twilio.com/v1/Instances/{instanceSid}/InsightsRules/{sid}"
}
```

### Error codes

| Error code | Description                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| 400        | Bad Request. The request could not be understood or was missing required parameters.                         |
| 401        | Authorization Required. Authentication failed or user does not have permissions for the requested operation. |
| 500        | Internal Server Error. An error occurred with an internal server.                                            |

## List all alerts

`GET /v1/Instances/{InstanceSid}/InsightsRules`

Retrieve a list of alert rules for a Flex instance.

### Path parameter

| Name                       | Type   | Description                                                                                                    | PII?    |
| -------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | string | The unique SID identifier for the Flex Instance. 34 characters. Example: `GO1234567890abcdef1234567890abcdef`. | Not PII |

### Query parameters

| Name          | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             | PII?    |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Active        | boolean          | Filter by whether the rule is active or not. Example: `Active=true`                                                                                                                                                                                                                                                                                                                                                                                     | Not PII |
| MetricId      | array of strings | Filter rules by the metric id. Includes `Active (Now)`, `Waiting (Now)`, `Available Agents (Now)`, `Offline Agents (Now)`, `Unavailable Agents (Now)`, `Abandoned (30 min)`, `Abandoned (Today)`, `Accepted (30 min)`, `Accepted (Today)`, `Avg. Speed of Answer (Today)`, `Avg. Handle Time (Today)`, `Missed Invitations (30 min)`, `Missed Invitations (Today)`, `SLA (30 min)`, `SLA (Today)`, `Longest Available Agent (Now)`, and `Longest (Now)` | Not PII |
| TaskQueueSids | array of strings | Filter rules by the task queue sids. Example: `TaskQueueSids=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`                                                                                                                                                                                                                                                                                                                                                        | Not PII |
| Sort          | string           | A comma-separated list of fields to sort by. Prepend a field with '-' to sort in descending order. Valid fields are: date\_created, date\_updated, rule\_friendly\_name, metric\_id. Example: `Sort=rule_friendly_name`                                                                                                                                                                                                                                 | Not PII |
| PageSize      | integer          | How many resources to return in each list page. The default is 50, and the maximum is 1000.                                                                                                                                                                                                                                                                                                                                                             | Not PII |
| Page          | integer >= 0     | The page index. This value is simply for client state.                                                                                                                                                                                                                                                                                                                                                                                                  | Not PII |
| PageToken     | string           | The page token. This is provided by the API.                                                                                                                                                                                                                                                                                                                                                                                                            | Not PII |

### Response headers

| Name                             | Type    | Description                                                                                       | PII?    |
| -------------------------------- | ------- | ------------------------------------------------------------------------------------------------- | ------- |
| Access-Control-Allow-Origin      | string  | Specify the origin(s) allowed to access the resource. Example: `*`                                | Not PII |
| Access-Control-Allow-Methods     | string  | Specify the HTTP methods allowed when accessing the resource. Example: `POST`                     | Not PII |
| Access-Control-Allow-Headers     | string  | Specify the headers allowed when accessing the resource. Example: `Content-Type`, `Authorization` | Not PII |
| Access-Control-Allow-Credentials | boolean | Indicates whether the browser should include credentials                                          | Not PII |
| Access-Control-Expose-Headers    | string  | Headers exposed to the client. Example: `X-Custom-Header1`, `X-Custom-Header2`                    | Not PII |

### Response schema

Schema: `application/json`

| Name                 | Type                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                       | PII?                                                                                          |
| -------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| rules                | array of objects              | An array.                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| url                  | string or null `<uri>`        | The URL of this resource.                                                                                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| sid                  | string or null. 34 characters | The Flex Insights alert rules ID.                                                                                                                                                                                                                                                                                                                                                                                                                                 | Not PII                                                                                       |
| account\_sid         | string or null. 34 characters | The unique SID identifier of the Account.                                                                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| instance\_sid        | string or null. 34 characters | The unique SID identifier of the Instance.                                                                                                                                                                                                                                                                                                                                                                                                                        | Not PII                                                                                       |
| task\_channel\_sid   | string or null. 34 characters | The task channel this rule applies to.                                                                                                                                                                                                                                                                                                                                                                                                                            | Not PII                                                                                       |
| task\_queue\_sids    | array of strings or null      | The task queues this rule applies to.                                                                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| rule\_friendly\_name | string or null                | The friendly name of the rule.                                                                                                                                                                                                                                                                                                                                                                                                                                    | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| metric\_id           | string                        | The metric this rule is associated with. Includes `Active (Now)`, `Waiting (Now)`, `Available Agents (Now)`, `Offline Agents (Now)`, `Unavailable Agents (Now)`, `Abandoned (30 min)`, `Abandoned (Today)`, `Accepted (30 min)`, `Accepted (Today)`, `Avg. Speed of Answer (Today)`, `Avg. Handle Time (Today)`, `Missed Invitations (30 min)`, `Missed Invitations (Today)`, `SLA (30 min)`, `SLA (Today)`, `Longest Available Agent (Now)`, and `Longest (Now)` | Not PII                                                                                       |
| active               | boolean or null               | Whether the rule is currently active or not.                                                                                                                                                                                                                                                                                                                                                                                                                      | Not PII                                                                                       |
| rule\_thresholds     | any or null                   | The thresholds that trigger the rule.                                                                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| date\_created        | string or null `<date-time>`  | The date and time in GMT when the resource was created specified in ISO 8601 format.                                                                                                                                                                                                                                                                                                                                                                              | Not PII                                                                                       |
| date\_updated        | string or null `<date-time>`  | The date and time in GMT when the resource was last updated specified in ISO 8601 format.                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| notify\_enabled      | boolean or null               | Whether notifications are enabled for this rule.                                                                                                                                                                                                                                                                                                                                                                                                                  | Not PII                                                                                       |
| notify\_severity     | string                        | The minimum severity level that will trigger a notification. `Critical`, `Warning`                                                                                                                                                                                                                                                                                                                                                                                | Not PII                                                                                       |
| notify\_duration     | integer                       | The amount of time the threshold condition must be met before a notification is sent, in milliseconds. Default: 0                                                                                                                                                                                                                                                                                                                                                 | Not PII                                                                                       |
| notify\_methods\_id  | string or null                | The SID of the Notification Configuration that contains the notification methods to be used when sending a notification.                                                                                                                                                                                                                                                                                                                                          | Not PII                                                                                       |
| meta                 | object                        | Pagination metadata containing navigation URLs and page information.                                                                                                                                                                                                                                                                                                                                                                                              | Not PII                                                                                       |
| first\_page\_url     | string `<uri>`                | The URL to retrieve the first page of results.                                                                                                                                                                                                                                                                                                                                                                                                                    | Not PII                                                                                       |
| key                  | string                        | The key name for the main data array in the response.                                                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| next\_page\_url      | string or null `<uri>`        | The URL to retrieve the next page of results. `null` if this is the last page.                                                                                                                                                                                                                                                                                                                                                                                    | Not PII                                                                                       |
| page                 | integer                       | The current page number (0-indexed).                                                                                                                                                                                                                                                                                                                                                                                                                              | Not PII                                                                                       |
| page\_size           | integer                       | The number of resources returned in this page.                                                                                                                                                                                                                                                                                                                                                                                                                    | Not PII                                                                                       |
| previous\_page\_url  | string or null `<uri>`        | The URL to retrieve the previous page of results. `null` if this is the first page.                                                                                                                                                                                                                                                                                                                                                                               | Not PII                                                                                       |
| url                  | string `<uri>`                | The URL of the current request.                                                                                                                                                                                                                                                                                                                                                                                                                                   | Not PII                                                                                       |

### Response example

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://flex-api.twilio.com/v1/Instances/GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/InsightsRules?Active=true&Sort=rule_friendly_name&TaskQueueSids=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://flex-api.twilio.com/v1/Instances/GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/InsightsRules?Active=true&Sort=rule_friendly_name&TaskQueueSids=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "rules"
  },
  "rules": [
    {
      "sid": "QYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "rule_friendly_name": "Waiting tasks now rule",
      "metric_id": "Active (Now)",
      "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_queue_sids": [
        "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      ],
      "active": true,
      "rule_thresholds": [
        {
          "threshold_type": "Critical",
          "threshold_operator": "Greater Than",
          "threshold_value": 5000
        }
      ],
      "date_created": "2019-08-24T14:15:22Z",
      "date_updated": "2019-08-24T14:15:22Z",
      "notify_enabled": true,
      "notify_severity": "Critical",
      "notify_duration": 900000,
      "notify_methods_id": "flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8",
      "url": "https://flex-api.twilio.com/v1/Instances/{instanceSid}/InsightsRules/{sid}"
    }
  ]
}
```

### Error codes

| Error code | Description                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| 400        | Bad Request. The request could not be understood or was missing required parameters.                         |
| 401        | Authorization Required. Authentication failed or user does not have permissions for the requested operation. |
| 500        | Internal Server Error. An error occurred with an internal server.                                            |

## Fetch a specific Flex alert rule

`GET /v1/Instances/{InstanceSid}/InsightsRules/{Sid}`

Retrieve a specific Flex alert rule.

To fetch a specific Flex alert rule:

1. Make a `GET` request to `/v1/Instances/{InstanceSid}/InsightsRules/{Sid}` endpoint.
2. Use the `notify_methods_id` from the response to make a request to [Fetch notification configuration](/docs/flex/developer/alerts/notifications-api#fetch-a-notification-configuration-for-a-flex-instance) to view the notification settings.

### Path parameters

| Name                       | Type   | Description                                                                                                   | PII?    |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | string | The unique SID identifier for the Flex Instance. 34 characters. Example: `GO1234567890abcdef1234567890abcdef` | Not PII |
| Sid **(required)**         | string | The SID that identifies the Flex Insights alert rule to update. 34 characters.                                | Not PII |

### Response headers

| Name                             | Type    | Description                                                                                         | PII?    |
| -------------------------------- | ------- | --------------------------------------------------------------------------------------------------- | ------- |
| Access-Control-Allow-Origin      | string  | Specify the origin(s) allowed to access the resource. Example: `*`                                  | Not PII |
| Access-Control-Allow-Methods     | string  | Specify the HTTP methods allowed when accessing the resource. Example: `POST`                       | Not PII |
| Access-Control-Allow-Headers     | string  | Specify the headers allowed when accessing the resource. Example: `Content-Type` or `Authorization` | Not PII |
| Access-Control-Allow-Credentials | boolean | Indicates whether the browser should include credentials                                            | Not PII |
| Access-Control-Expose-Headers    | string  | Headers exposed to the client. Example: `X-Custom-Header1`, `X-Custom-Header2`                      | Not PII |

### Response schema

Schema: `application/json`

| Name                 | Type                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                       | PII?                                                                                          |
| -------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| url                  | string or null `<uri>`        | The URL of this resource.                                                                                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| sid                  | string or null. 34 characters | The Flex Insights alert rules ID.                                                                                                                                                                                                                                                                                                                                                                                                                                 | Not PII                                                                                       |
| account\_sid         | string or null. 34 characters | The unique SID identifier of the Account.                                                                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| instance\_sid        | string or null. 34 characters | The unique SID identifier of the Instance.                                                                                                                                                                                                                                                                                                                                                                                                                        | Not PII                                                                                       |
| task\_channel\_sid   | string or null. 34 characters | The task channel this rule applies to.                                                                                                                                                                                                                                                                                                                                                                                                                            | Not PII                                                                                       |
| task\_queue\_sids    | array of strings or null      | The task queues this rule applies to.                                                                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| rule\_friendly\_name | string or null                | The friendly name of the rule.                                                                                                                                                                                                                                                                                                                                                                                                                                    | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| metric\_id           | string                        | The metric this rule is associated with. Includes `Active (Now)`, `Waiting (Now)`, `Available Agents (Now)`, `Offline Agents (Now)`, `Unavailable Agents (Now)`, `Abandoned (30 min)`, `Abandoned (Today)`, `Accepted (30 min)`, `Accepted (Today)`, `Avg. Speed of Answer (Today)`, `Avg. Handle Time (Today)`, `Missed Invitations (30 min)`, `Missed Invitations (Today)`, `SLA (30 min)`, `SLA (Today)`, `Longest Available Agent (Now)`, and `Longest (Now)` | Not PII                                                                                       |
| active               | boolean or null               | Whether the rule is currently active or not.                                                                                                                                                                                                                                                                                                                                                                                                                      | Not PII                                                                                       |
| rule\_thresholds     | any or null                   | The thresholds that trigger the rule.                                                                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| date\_created        | string or null `<date-time>`  | The date and time in GMT when the resource was created specified in ISO 8601 format.                                                                                                                                                                                                                                                                                                                                                                              | Not PII                                                                                       |
| date\_updated        | string or null `<date-time>`  | The date and time in GMT when the resource was last updated specified in ISO 8601 format.                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| notify\_enabled      | boolean or null               | Whether notifications are enabled for this rule.                                                                                                                                                                                                                                                                                                                                                                                                                  | Not PII                                                                                       |
| notify\_severity     | string                        | The minimum severity level that will trigger a notification. `Critical` or `Warning`                                                                                                                                                                                                                                                                                                                                                                              | Not PII                                                                                       |
| notify\_duration     | integer                       | The amount of time the threshold condition must be met before a notification is sent, in milliseconds. Default: 0                                                                                                                                                                                                                                                                                                                                                 | Not PII                                                                                       |
| notify\_methods\_id  | string or null                | The SID of the notification configuration that contains the notification methods to be used when sending a notification.                                                                                                                                                                                                                                                                                                                                          | Not PII                                                                                       |

### Response sample

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "QYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "rule_friendly_name": "Waiting tasks now rule",
  "metric_id": "Active (Now)",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sids": [
    "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "active": true,
  "rule_thresholds": [
    {
      "threshold_type": "Critical",
      "threshold_operator": "Greater Than",
      "threshold_value": 5000
    }
  ],
  "date_created": "2019-08-24T14:15:22Z",
  "date_updated": "2019-08-24T14:15:22Z",
  "notify_enabled": true,
  "notify_severity": "Critical",
  "notify_duration": 900000,
  "notify_methods_id": "flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8",
  "url": "https://flex-api.twilio.com/v1/Instances/{instanceSid}/InsightsRules/{sid}"
}
```

## Update an alert

`POST /v1/Instances/{InstanceSid}/InsightsRules/{Sid}`

To update a specific Flex alert rule:

1. Make a `GET` request to `/v1/Instances/{InstanceSid}/InsightsRules/{Sid}` to retrieve the alert you want to update.
2. Update the alert. Make a `POST` request to `/v1/Instances/{InstanceSid}/InsightsRules/{Sid}` to update the alert details.
3. (Optional) To update the notification configuration, use the `notify_methods_id` from the alert response and make a request to [Edit Notification configuration](/docs/flex/developer/alerts/notifications-api#edit-a-notification-configuration-for-a-flex-instance).

### Path parameters

| Name                       | Type   | Description                                                                                                    | PII?    |
| -------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | string | The unique SID identifier for the Flex Instance. 34 characters. Example: `GO1234567890abcdef1234567890abcdef`. | Not PII |
| Sid **(required)**         | string | The SID that identifies the Flex Insights alert rule to update. 34 characters.                                 | Not PII |

### Request body schema

Schema: `application/json`

| Name                                | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | PII?                                                                                          |
| ----------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| rule\_friendly\_name **(required)** | string           | The friendly name for the rule.                                                                                                                                                                                                                                                                                                                                                                                                                                             | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| metric\_id **(required)**           | string           | The metric id on which the Insights rule is based. Includes `Active (Now)`, `Waiting (Now)`, `Available Agents (Now)`, `Offline Agents (Now)`, `Unavailable Agents (Now)`, `Abandoned (30 min)`, `Abandoned (Today)`, `Accepted (30 min)`, `Accepted (Today)`, `Avg. Speed of Answer (Today)`, `Avg. Handle Time (Today)`, `Missed Invitations (30 min)`, `Missed Invitations (Today)`, `SLA (30 min)`, `SLA (Today)`, `Longest Available Agent (Now)`, and `Longest (Now)` | Not PII                                                                                       |
| task\_channel\_sid **(required)**   | string           | The SID of the task channel.                                                                                                                                                                                                                                                                                                                                                                                                                                                | Not PII                                                                                       |
| task\_queue\_sids **(required)**    | array of strings | The array of SIDs for queues to which the Insights rule belongs.                                                                                                                                                                                                                                                                                                                                                                                                            | Not PII                                                                                       |
| active **(required)**               | boolean          | Whether the rule is active or not.                                                                                                                                                                                                                                                                                                                                                                                                                                          | Not PII                                                                                       |
| rule\_thresholds **(required)**     | array of objects | An array of threshold objects including: threshold\_type (`Critical` or `Warning`), threshold\_operator (`Greater Than` or `Lesser Than`), threshold\_value (integer)                                                                                                                                                                                                                                                                                                       | Not PII                                                                                       |
| notify\_enabled **(required)**      | boolean          | Whether notifications are enabled for the rule.                                                                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| notify\_severity                    | string           | The type of threshold we are defining. `Critical` or `Warning`                                                                                                                                                                                                                                                                                                                                                                                                              | Not PII                                                                                       |
| notify\_duration                    | integer          | The duration in milliseconds for which the notification should be sent.                                                                                                                                                                                                                                                                                                                                                                                                     | Not PII                                                                                       |
| notify\_methods\_id                 | string           | The TTID of the notification configuration that contains the notification methods to be used when sending a notification.                                                                                                                                                                                                                                                                                                                                                   | Not PII                                                                                       |

### Request example

```json
{
"rule_friendly_name": "Waiting tasks now rule",
"metric_id": "Active (Now)",
"task_channel_sid": "string",
"task_queue_sids": [
"WQ00000000000000000000000000000001"
],
"active": true,
"rule_thresholds": [
{
"threshold_type": "Critical",
"threshold_operator": "Greater Than",
"threshold_value": 5000
}
],
"notify_enabled": true,
"notify_severity": "Critical",
"notify_duration": 900000,
"notify_methods_id": "flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8"
}
```

### Response headers

| Name                             | Type    | Description                                                                                       | PII?    |
| -------------------------------- | ------- | ------------------------------------------------------------------------------------------------- | ------- |
| Access-Control-Allow-Origin      | string  | Specify the origin(s) allowed to access the resource. Example: `*`                                | Not PII |
| Access-Control-Allow-Methods     | string  | Specify the HTTP methods allowed when accessing the resource. Example: `POST`                     | Not PII |
| Access-Control-Allow-Headers     | string  | Specify the headers allowed when accessing the resource. Example: `Content-Type`, `Authorization` | Not PII |
| Access-Control-Allow-Credentials | boolean | Indicates whether the browser should include credentials                                          | Not PII |
| Access-Control-Expose-Headers    | string  | Headers exposed to the client. Example: `X-Custom-Header1`, `X-Custom-Header2`                    | Not PII |

### Response schema

Schema: `application/json`

| Name                 | Type                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                       | PII?                                                                                          |
| -------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| url                  | string or null `<uri>`        | The URL of this resource.                                                                                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| sid                  | string or null. 34 characters | The Flex Insights alert rules ID.                                                                                                                                                                                                                                                                                                                                                                                                                                 | Not PII                                                                                       |
| account\_sid         | string or null. 34 characters | The unique SID identifier of the Account.                                                                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| instance\_sid        | string or null. 34 characters | The unique SID identifier of the Instance.                                                                                                                                                                                                                                                                                                                                                                                                                        | Not PII                                                                                       |
| task\_channel\_sid   | string or null. 34 characters | The task channel this rule applies to.                                                                                                                                                                                                                                                                                                                                                                                                                            | Not PII                                                                                       |
| task\_queue\_sids    | Array of strings or null      | The task queues this rule applies to.                                                                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| rule\_friendly\_name | string or null                | The friendly name of the rule.                                                                                                                                                                                                                                                                                                                                                                                                                                    | [PII MTL: 30 days](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) |
| metric\_id           | string                        | The metric this rule is associated with. Includes `Active (Now)`, `Waiting (Now)`, `Available Agents (Now)`, `Offline Agents (Now)`, `Unavailable Agents (Now)`, `Abandoned (30 min)`, `Abandoned (Today)`, `Accepted (30 min)`, `Accepted (Today)`, `Avg. Speed of Answer (Today)`, `Avg. Handle Time (Today)`, `Missed Invitations (30 min)`, `Missed Invitations (Today)`, `SLA (30 min)`, `SLA (Today)`, `Longest Available Agent (Now)`, and `Longest (Now)` | Not PII                                                                                       |
| active               | boolean or null               | Whether the rule is currently active or not.                                                                                                                                                                                                                                                                                                                                                                                                                      | Not PII                                                                                       |
| rule\_thresholds     | any or null                   | The thresholds that trigger the rule.                                                                                                                                                                                                                                                                                                                                                                                                                             | Not PII                                                                                       |
| date\_created        | string or null `<date-time>`  | The date and time in GMT when the resource was created specified in ISO 8601 format.                                                                                                                                                                                                                                                                                                                                                                              | Not PII                                                                                       |
| date\_updated        | string or null `<date-time>`  | The date and time in GMT when the resource was last updated specified in ISO 8601 format.                                                                                                                                                                                                                                                                                                                                                                         | Not PII                                                                                       |
| notify\_enabled      | boolean or null               | Whether notifications are enabled for this rule.                                                                                                                                                                                                                                                                                                                                                                                                                  | Not PII                                                                                       |
| notify\_severity     | string                        | The minimum severity level that will trigger a notification. `Critical` or `Warning`                                                                                                                                                                                                                                                                                                                                                                              | Not PII                                                                                       |
| notify\_duration     | integer                       | The amount of time the threshold condition must be met before a notification is sent, in milliseconds. Default: 0                                                                                                                                                                                                                                                                                                                                                 | Not PII                                                                                       |
| notify\_methods\_id  | string or null                | The SID of the notification configuration that contains the notification methods to be used when sending a notification.                                                                                                                                                                                                                                                                                                                                          | Not PII                                                                                       |

### Response example

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "instance_sid": "GOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "QYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "rule_friendly_name": "Waiting tasks now rule",
  "metric_id": "Active (Now)",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sids": ["WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
  "active": true,
  "rule_thresholds": [
    {
      "threshold_type": "Critical",
      "threshold_operator": "Greater Than",
      "threshold_value": 5000
    }
  ],
  "date_created": "2019-08-24T14:15:22Z",
  "date_updated": "2019-08-24T14:15:22Z",
  "notify_enabled": true,
  "notify_severity": "Critical",
  "notify_duration": 900000,
  "notify_methods_id": "flex_notificationconfiguration_01jt2gntpafkt9671avqj50sq8",
  "url": "https://flex-api.twilio.com/v1/Instances/{instanceSid}/InsightsRules/{sid}"
}
```

### Error codes

| Error code | Description                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| 400        | Bad Request. The request could not be understood or was missing required parameters.                         |
| 401        | Authorization Required. Authentication failed or user does not have permissions for the requested operation. |
| 500        | Internal Server Error. An error occurred with an internal server.                                            |

## Delete an alert

`DELETE /v1/Instances/{InstanceSid}/InsightsRules/{Sid}`

1. Make a `GET` request to `/v1/Instances/{InstanceSid}/InsightsRules/{Sid}` to retrieve the alert you want to delete.
2. Delete the notification configuration using the retrieved `notify_methods_id`. Make a request to [Delete notification configuration](/docs/flex/developer/alerts/notifications-api#delete-a-notification-configuration-for-a-flex-instance) to delete the notification configuration.
3. Make a `DELETE` request to `/v1/Instances/{InstanceSid}/InsightsRules/{Sid}` to delete the alert.

### Path parameters

| Name                       | Type   | Description                                                                                                   | PII?    |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- | ------- |
| InstanceSid **(required)** | string | The unique SID identifier for the Flex Instance. 34 characters. Example: `GO1234567890abcdef1234567890abcdef` | Not PII |
| Sid **(required)**         | string | The SID that identifies the Flex Insights alert rule to update. 34 characters.                                | Not PII |

### Response

Status: `204` The resource was deleted successfully.
