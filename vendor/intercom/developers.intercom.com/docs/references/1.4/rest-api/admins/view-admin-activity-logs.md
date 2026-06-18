# View admin activity logs

## Example Request

### cURL

```curl
curl https://api.intercom.io/admins/activity_logs?created_at_after=489222000&created_at_before=685695600 \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json'
```

## Example Response

```http
HTTP/1.1 200 OK
{
	"type": "activity_log.list",
  "pages": {
		"type": "pages",
		"next": nil,
		"page": 1,
		"per_page": 20,
		"total_pages": 1
	},
  "activity_logs": [{
  	"id": "6",
  	"performed_by": {
    	"type": "admin",
    	"id": "123456",
    	"email": "jane.doe@company.com",
    	"ip": "127.0.0.1"
  	},
  	"metadata": {
    	"message"; {
      	"id": 123,
      	"title": "salt&vinegar"
        },
       "before": "before",
       "after": "after"
    	},
  	"created_at": 1547669358,
  	"activity_type": "message_state_change",
  	"activity_description"" "Jane Doe changed your salt&vinegar message from before to after."
  }]
}
```

## Example Errors

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\" => \"error.list\",\n  \"request_id\" => nil,\n  \"errors\" => [{\n\t\"code\" => \"parameter_not_found\",\n\t\"message\" => \"Please provide the following parameters: created_at_after\"\n  }]\n}\n
```

```http
HTTP/1.1 403 RESTRICTED\n{\n  \"type\" => \"error.list\",\n  \"request_id\" => nil,\n  \"errors\" => [{\n\t\"code\" => \"api_plan_restricted\",\n\t\"message\" => \"This feature is not yet available to your app\"\n  }]\n}
```

You can get a log of activities by all admins in an app by sending a GET request to the URL `https://api.intercom.io/admins/activity_logs`.

## Activity List

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is `activity_log.list` |
| activity_logs | array | A list of [activity objects](#activity-object) |
| pages | object | Optional. A pagination object which may be empty, indication no further pages to fetch |


## Activity Object

| Attribute | Type | Description |
|  --- | --- | --- |
| activity_type | string | The type of activity - see Activity Types & Descriptions below. |
| activity_description | string | A sentence or two describing the activity - see Activity Types & Descriptions below. |
| metadata | object | An object containing information on the activity and what it modified |
| created_at | timestamp | The time the activity was performed |
| performed_by | object | An [Admin object](/docs/references/1.4/rest-api/admins/admin-model) of the admin who performed the activity |
| id | string | The id representing the activity |


## Activity Types & Descriptions

| Type | Description |
|  --- | --- |
| admin_deletion | An admin was removed from your app |
| admin_invite_change | The permissions for an invited person to be an admin on your app were changed |
| admin_invite_creation | Someone was invited to be an admin on your app |
| admin_invite_deletion | Someone is no longer invited to be an admin on your app |
| admin_login_failure | An admin tried to login with the wrong credentials |
| admin_login_success | An admin logged in successfully |
| admin_logout | An admin logged out |
| admin_permission_change | The permissions for an admin were changed |
| app_name_change | The name of your app was changed |
| admin_away_mode | An admin changed their away mode and conversation reassignment settings |
| app_timezone_change | The timezone of your app was changed |
| bulk_export | User or lead data was exported from your app |
| message_deletion | A message was deleted from your app |
| message_state_change | A message was changed on your app |
| campaign_deletion | A campaign was deleted from your app |


## Request Parameters

| Parameter | Required? | Description |
|  --- | --- | --- |
| created_at_after | Yes | The start date that you request data for. It must be formatted as a UNIX timestamp. |
| created_at_before | No | The end date that you request data for. It must be formatted as a UNIX timestamp. |


## Returns

This will return an [Activity List](#activity-list) which will contain an array titled `activity_logs`, in turn containing multiple [Activity Objects](#activity-object).