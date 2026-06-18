# List all activity logs

## Example Request & Response

```curl
curl https://api.intercom.io/admins/activity_logs?created_at_after=489222000&created_at_before=685695600 \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json'
```

```html
HTTP/1.1 200 OK\n{\n\t\"type\": \"activity_log.list\",\n  \"pages\": {\n\t\t\"type\": \"pages\",\n\t\t\"next\": nil,\n\t\t\"page\": 1,\n\t\t\"per_page\": 20,\n\t\t\"total_pages\": 1\n\t},\n  \"activity_logs\": [{\n  \t\"id\": \"6\",\n  \t\"performed_by\": {\n    \t\"type\": \"admin\",\n    \t\"id\": \"123456\",\n    \t\"email\": \"jane.doe@company.com\",\n    \t\"ip\": \"127.0.0.1\"\n  \t},\n  \t\"metadata\": {\n    \t\"message\"; {\n      \t\"id\": 123,\n      \t\"title\": \"salt&vinegar\"\n        },\n       \"before\": \"before\",\n       \"after\": \"after\"\n    \t},\n  \t\"created_at\": 1547669358,\n  \t\"activity_type\": \"message_state_change\",\n  \t\"activity_description\"\" \"Jane Doe changed your salt&vinegar message from before to after.\"\n  }]\n}\n
```

**Example Errors**

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\" => \"error.list\",\n  \"request_id\" => nil,\n  \"errors\" => [{\n\t\"code\" => \"parameter_not_found\",\n\t\"message\" => \"Please provide the following parameters: created_at_after\"\n  }]\n}\n
```

```http
HTTP/1.1 403 RESTRICTED\n{\n  \"type\" => \"error.list\",\n  \"request_id\" => nil,\n  \"errors\" => [{\n\t\"code\" => \"api_plan_restricted\",\n\t\"message\" => \"This feature is not yet available to your app\"\n  }]\n}
```

You can get a log of activities by all admins in an app by sending a GET request to the URL `https://api.intercom.io/admins/activity_logs`.

### Activity List

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is `activity_log.list` |
| activity_logs | array | A list of [activity objects](#activity-object) |
| pages | object | Optional. A pagination object which may be empty, indication no further pages to fetch |


### Activity Object

| Attribute | Type | Description |
|  --- | --- | --- |
| activity_type | string | The type of activity - see Activity Types & Descriptions below. |
| activity_description | string | A sentence or two describing the activity - see Activity Types & Descriptions below. |
| metadata | object | An object containing information on the activity and what it modified |
| created_at | timestamp | The time the activity was performed |
| performed_by | object | An [Admin object](/docs/references/2.0/rest-api/admins/admin-model) of the admin who performed the activity |
| id | string | The id representing the activity |


### Activity Types & Descriptions

| Type | Description |
|  --- | --- |
| admin_assignment_limit_change | A teammate changed their assignment limit |
| admin_away_mode_change | A teammate changed their away mode and conversation reassignment settings |
| admin_deletion | A teammate was removed from your workspace |
| admin_deprovisioned | A teammate was deprovisioned from your workspace via SCIM |
| admin_invite_change | The permissions for a teammate invite were changed |
| admin_invite_creation | A teammate invite was created |
| admin_invite_deletion | A teammate invite was deleted |
| admin_login_failure | A teammate tried to login with the wrong credentials |
| admin_login_success | A teammate logged in successfully |
| admin_logout | A teammate logged out |
| admin_password_reset_request | A teammate requested a password reset |
| admin_password_reset_success | A teammate's password was successfully reset |
| admin_permission_change | The permissions for a teammate were changed |
| admin_provisioned | A teammate was provisioned on your workspace via SCIM |
| app_admin_join | A teammate joined your workspace (i.e. accepted your invite) |
| app_authentication_method_change | Your workspace's authentication methods were changed |
| app_data_deletion | A user or lead was deleted from your workspace |
| app_data_export | Message or conversation data was exported from your workspace |
| app_google_sso_domain_change | Your workspace's Google SSO domain was changed |
| app_identity_verification_change | Your workspace's identity verification setting was changed |
| app_name_change | The name of your workspace was changed |
| app_outbound_address_change | The outbound email address was changed for your workspace |
| app_package_installation | An app package was installed on your workspace |
| app_package_token_regeneration | An access token for a specific app package was updated |
| app_package_uninstallation | An app package was uninstalled from your workspace |
| app_team_creation | A team was created |
| app_team_deletion | A team was deleted |
| app_team_membership_modification | A team's membership was modified |
| app_timezone_change | An app package was installed in your workspace |
| app_webhook_creation | A webhook subscription was created |
| app_webhook_deletion | A webhook subscription was deleted |
| articles_in_messenger_enabled_change | The Messenger search for articles setting was changed |
| bulk_delete | User or lead data was deleted from your workspace |
| bulk_export | User or lead data was exported from your workspace |
| campaign_deletion | A campaign was deleted from your workspace |
| campaign_state_change | A campaign was changed on your workspace |
| conversation_topic_change | A conversation topic was changed |
| conversation_topic_creation | A conversation topic was created |
| conversation_topic_deletion | A conversation topic was deleted |
| help_center_settings_change | Your Help Center was turned on or off |
| inbound_conversations_change | The Messenger inbound conversations setting was changed |
| inbox_access_change | The inbox access setting was changed |
| message_deletion | A team was deleted from your workspace |
| message_state_change | A message's state was changed |
| messenger_look_and_feel_change | The Messenger look and feel setting was changed |
| messenger_search_required_change | The Messenger search required setting was changed |
| office_hours_change | The office hours setting was changed |
| role_change | A role was changed |
| role_creation | A role was created |
| role_deletion | A role was deleted |
| seat_change | A teammate's seat was changed |
| seat_revoke | A teammate's seat was revoked |
| security_settings_change | Your workspace's security settings were changed |
| temporary_expectation_change | The Messenger special notice settings were changed |
| upfront_email_collection_change | The Messenger upfront email collection settings were changed |
| welcome_message_change | The Messenger welcome message settings were changed |


### Request Query Parameters

| Parameter | Required? | Description |
|  --- | --- | --- |
| created_at_after | Yes | The start date that you request data for. It must be formatted as a UNIX timestamp. |
| created_at_before | No | The end date that you request data for. It must be formatted as a UNIX timestamp. |


### Response

This will return an [Activity List](#activity-list) which will contain an array titled `activity_logs`, in turn containing multiple [Activity Objects](#activity-object).