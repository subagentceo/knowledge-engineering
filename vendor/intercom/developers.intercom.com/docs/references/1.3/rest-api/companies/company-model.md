# Company Model

## Example Company Object

```json
{\n  \"type\": \"company\",\n  \"id\": \"531ee472cce572a6ec000006\",\n  \"name\": \"Example Company Inc.\",\n  \"plan\": \"plan1\",\n  \"company_id\": \"6\",\n  \"remote_created_at\": 1394531169,\n  \"created_at\": 1394533506,\n  \"updated_at\": 1396874658,\n  \"size\": 85,\n  \"website\": \"http://www.example.com\",\n  \"industry\": \"Technology\",\n  \"monthly_spend\": 49,\n  \"session_count\": 26,\n  \"user_count\": 10,\n  \"custom_attributes\": {\n    \"paid_subscriber\" : true,\n    \"team_mates\": 0\n  }\n}
```

## Example Company List

```json
{\n  \"type\": \"company.list\",\n  \"total_count\": 1,\n  \"companies\": [\n    {\n      \"type\": \"company\",\n      \"id\": \"531ee472cce572a6ec000006\",\n      \"name\": \"Example Company Inc.\",\n      \"plan\": \"plan1\",\n      \"company_id\": \"6\",\n      \"remote_created_at\": 1394531169,\n      \"created_at\": 1394533506,\n      \"updated_at\": 1396874658,\n      \"size\": 85,\n      \"website\": \"http://www.example.com\",\n      \"industry\": \"Technology\",\n      \"monthly_spend\": 49,\n      \"session_count\": 26,\n      \"user_count\": 10,\n      \"custom_attributes\": {\n        \"paid_subscriber\" : true,\n        \"team_mates\": 0\n      }\n    }\n  ],\n  \"pages\": {\n    \"page\": 1,\n    \"per_page\": 50,\n    \"total_pages\": 1\n  }\n}
```

### Company Object

A company object contains the following fields -

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'company'* |
| id | string | The Intercom defined id representing the company |
| created_at | timestamp | The time the company was added to Intercom |
| remote_created_at | timestamp | The time the company was created by you |
| updated_at | timestamp | The last time the company was updated |
| last_request_at | timestamp | The time the company last recorded making a request |
| company_id | string | The company id you have defined for the company |
| name | string | The name of the company |
| custom_attributes | object | The custom attributes you have set on the company |
| session_count | integer | How many sessions the company has recorded |
| monthly_spend | number | How much revenue the company generates for your business |
| user_count | number | The number of users in the company |
| plan* | string | The name of the plan you have associated with the company. |
| size | integer | The number of employees in the company |
| website | string | The URL for the company website |
| industry | string | The industry that the company operates in |


* Note that plan is set as a string but returned as an object as described below. You can only set the name of a plan using the `plan` string.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Will always be of type 'plan' |
| id | string | The plan ID |
| name | string | The name of the plan, note that this is the only field that can be set via the API. |


Any integer values in the user model are limited to the int32 range `-2^31 to 2^31 -1`

### Company List

A company list contains the following fields -

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'company.list'* |
| total_count | integer | The number of companies for this App |
| companies | array | A list of companies |
| pages | object | Optional. A pagination object, which may be empty, indicating no further pages to fetch |