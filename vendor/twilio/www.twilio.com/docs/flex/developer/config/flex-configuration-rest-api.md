# Flex Configuration REST API

The Flex Configuration REST API resource contains a collection of properties that control the appearance and functionality of your Flex instance.

> \[!NOTE]
>
> For self-hosted Flex UI instances, any configuration values specified in [your server's appConfig.js object](/docs/flex/developer/config/appconfigjs) will take precedence over corresponding values in the REST API Configuration resource.

## Fetch Your Current Configuration

To review your account's current Flex Configuration properties, fetch the resource instance by making a `GET` request to the `/Configuration` endpoint.

The response contains a complete JSON representation of the configuration.

## Example Fetch Request

```bash
curl -X GET "https://flex-api.twilio.com/v1/Configuration" \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Sample response

```json
{
  "flex_insights_hr": null,
  "crm_type": null,
  "date_updated": "2023-01-18T18:28:33Z",
  "integrations": null,
  "markdown": {
    "enabled": true,
    "mode": "readWrite"
  },
  "debugger_integration": {
    "enabled": true
  },
  "crm_callback_url": null,
  "serverless_service_sids": null,
  "queue_stats_configuration": null,
  "plugin_service_enabled": null,
  "crm_attributes": null,
  "ui_version": "2.n",
  "crm_fallback_url": null,
  "service_version": null,
  "taskrouter_target_workflow_sid": "WW74da98d61ff7d3c47d163eb6830dd61a",
  "messaging_service_instance_sid": null,
  "plugin_service_attributes": null,
  "call_recording_enabled": null,
  "call_recording_webhook_url": null,
  "public_attributes": null,
  "crm_enabled": null,
  "status": "ok",
  "taskrouter_worker_attributes": null,
  "chat_service_instance_sid": "IS6562209199cc4fb7b2ebfd7de02f5f95",
  "taskrouter_worker_channels": null,
  "ui_dependencies": null,
  "taskrouter_offline_activity_sid": "WA7e7d193ff7ecd9a1a5234292b64789c6",
  "notifications": {
    "enabled": true,
    "mode": "whenNotInFocus"
  },
  "taskrouter_workspace_sid": "WS75619e5ea77e8e1dd01b40d65ff7d8c0",
  "channel_configs": [
    {
      "cbm_attachments": {
        "max_file_size": 16777216,
        "max_total_file_size": 67108864,
        "accepted_extensions": [
          "jpg",
          "jpeg",
          "png",
          "amr",
          "mp3",
          "mp4",
          "pdf",
          "heic",
          "txt",
          "gif"
        ],
        "enabled": true,
        "number_of_attachments": 1
      },
      "address_type": "web"
    },
    {
      "cbm_attachments": {
        "max_file_size": 2097152,
        "max_total_file_size": 5242880,
        "accepted_extensions": [
          "jpg",
          "jpeg",
          "png",
          "amr",
          "mp3",
          "mp4",
          "pdf",
          "heic"
        ],
        "enabled": true,
        "number_of_attachments": 1
      },
      "address_type": "sms"
    },
    {
      "cbm_attachments": {
        "max_file_size": 16777216,
        "max_total_file_size": 67108864,
        "accepted_extensions": [
          "jpg",
          "jpeg",
          "png",
          "amr",
          "mp3",
          "mp4",
          "pdf",
          "heic",
          "oga"
        ],
        "enabled": true,
        "number_of_attachments": 1
      },
      "address_type": "whatsapp"
    },
    {
      "cbm_attachments": {
        "max_file_size": 157286400,
        "max_total_file_size": 157286400,
        "accepted_extensions": [
          "jpg",
          "jpeg",
          "png",
          "amr",
          "mp3",
          "mp4",
          "pdf",
          "heic",
          "txt",
          "gif"
        ],
        "enabled": true,
        "number_of_attachments": 10
      },
      "address_type": "email"
    }
  ],
  "date_created": "2023-01-18T18:28:19Z",
  "taskrouter_skills": null,
  "taskrouter_taskqueues": null,
  "ui_attributes": {
    "warmTransfers": {
      "enabled": true
    },
    "notifications": {
      "browser": true
    }
  },
  "flex_insights_drilldown": true,
  "url": "https://flex-api.twilio.com/v1/Configuration",
  "outbound_call_flows": null,
  "taskrouter_target_taskqueue_sid": "WQc9fb6967e9d4675df72b99bc1cadeb62",
  "account_sid": "AC8e0ce685xxxxxxxxxxxxxxxxxxxxxxxx",
  "runtime_domain": "iris-macaw-7585.twil.io",
  "flex_url": null,
  "ui_language": null,
  "attributes": null,
  "flex_service_instance_sid": "ISb194bb2b0f24efb3f4ef73d225af7b0d",
  "flex_ui_status_report": {
    "enabled": true
  }
}
```

> \[!NOTE]
>
> Not sure where to find your account SID or auth token? Check out [this intro to using Twilio's REST APIs](/docs/usage/requests-to-twilio) for help.

## Update Your Configuration

Issue a `POST` request to the `/Configuration` endpoint to update Flex Configuration values. Include a JSON object in the request body that contains your Twilio account SID along with any configuration items that you wish to update.

The following example request illustrates how to update a single configuration property with a Boolean value.

```bash
JSON_PAYLOAD=$(cat <<EOF
{
    "account_sid": "ACXXXXXXXXXXXXXXXXX",
    "call_recording_enabled": true
}
EOF
)

curl -X POST https://flex-api.twilio.com/v1/Configuration \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
    -H 'Content-Type: application/json' \
    -d $JSON_PAYLOAD
```

> \[!NOTE]
>
> Some properties expect a type as the value (Boolean, string, integer, etc), while other properties expect a value that is itself a full JSON object. **When updating a JSON type property, the existing value of the property will be completely replaced by the JSON object that you provide as the new value.**
>
> To prevent accidentally overriding existing fields of a JSON type property when performing an update, you should always first fetch the existing value of the property first. Then make any desired adjustments to the JSON object before sending it in the body of a `POST` request to update the property. You'll see an illustration of this in the following example.

Let's see how to update a property that uses a JSON object rather than a scalar as its value.

Suppose we want to update the `ui_attributes` property in order to disable browser notifications. Since the value of `ui_attributes` is a JSON object and it might contain fields other than the one we want to modify, we will first fetch the Configuration to get the complete current state of the object. Let's say that the current value of `ui_attributes` that we see in the response looks like this:

```json
{
    "warmTransfers": {
      "enabled": true
    },
    "notifications": {
      "browser": true
    }
}

```

Here's how we can send a request to update the property with our adjustment to one field within the JSON object value.

```bash
JSON_PAYLOAD=$(cat <<EOF
{
    "account_sid": "ACXXXXXXXXXXXXXXXXX",
    "ui_attributes": {
        "warmTransfers": {
            "enabled": true
        },
        "notifications": {
            "browser": false
         }
    }
}
EOF
)

curl -X POST 'https://flex-api.twilio.com/v1/Configuration' \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
    -H 'Content-Type: application/json' \
    -d $JSON_PAYLOAD
```

The existing value for the `ui_attributes` property will be entirely replaced by the JSON object we provided in the `POST` request.

> \[!WARNING]
>
> Some fields are read-only. If you attempt to update a read-only field, the API will return an HTTP 400 response with an error message:
>
> ```json
> {
>   "code": 45004,
>   "message": "You are not allowed to modify property for [flex_service_instance_sid].",
>   "more_info": "https://www.twilio.com/docs/errors/45004",
>   "status": 400
> }
> ```

## Configuration properties reference

Following is a description of some of the Configuration properties that you may wish to change.

### ui\_attributes

*JSON object*

These configuration values control some aspects of the appearance and functionality of the Flex UI web application.

For self-hosted Flex UI instances, properties specified here are merged with any properties present in the server's `appConfig.js` object. Values specified in `appConfig.js` take precedence over corresponding values in the `ui_attributes` field of the REST API Configuration resource.

Check out the [appConfig.js guide](/docs/flex/developer/config/appconfigjs) to learn more about the available Flex UI configuration options.

> \[!NOTE]
>
> Example value
>
> ```json
> {
>     "warmTransfers": {
>         "enabled": true
>     },
>     "notifications": {
>         "browser": true
>     },
>     "logLevel": "debug",
>     "theme": {
>         "isLight": false
>     }
> }
> ```

### taskrouter\_skills

*JSON object*

This field allows you to define custom [skills-based routing parameters](/docs/flex/admin-guide/tutorials/skills-assignment) for your Flex instance.

> \[!NOTE]
>
> Example value
>
> ```json
> [
>   {
>     "name": "voice",
>     "multivalue": false,
>     "minimum": null,
>     "maximum": null
>   },
>   {
>     "name": "language_fr",
>     "multivalue": false,
>     "minimum": null,
>     "maximum": null
>   },
>   {
>     "name": "language_ge",
>     "multivalue": false,
>     "minimum": null,
>     "maximum": null
>   },
>   {
>     "name": "messaging",
>     "multivalue": false,
>     "minimum": null,
>     "maximum": null
>   },
>   {
>     "name": "special_language",
>     "multivalue": true,
>     "minimum": 1,
>     "maximum": 10
>   }
> ]
> ```
