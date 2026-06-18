# Company Model

## Example Company Object

```json
{
  "type": "company",
  "id": "531ee472cce572a6ec000006",
  "name": "Example Company Inc.",
  "plan": "plan1",
  "company_id": "6",
  "remote_created_at": 1394531169,
  "created_at": 1394533506,
  "updated_at": 1396874658,
  "size": 85,
  "website": "http://www.example.com",
  "industry": "Technology",
  "monthly_spend": 49,
  "session_count": 26,
  "user_count": 10,
  "custom_attributes": {
    "paid_subscriber": true,
    "team_mates": 0
  }
}
```

## Example Company List

```json
{
  "type": "company.list",
  "total_count": 1,
  "companies": [
    {
      "type": "company",
      "id": "531ee472cce572a6ec000006",
      "name": "Example Company Inc.",
      "plan": "plan1",
      "company_id": "6",
      "remote_created_at": 1394531169,
      "created_at": 1394533506,
      "updated_at": 1396874658,
      "size": 85,
      "website": "http://www.example.com",
      "industry": "Technology",
      "monthly_spend": 49,
      "session_count": 26,
      "user_count": 10,
      "custom_attributes": {
        "paid_subscriber": true,
        "team_mates": 0
      }
    }
  ],
  "pages": {
    "page": 1,
    "per_page": 50,
    "total_pages": 1
  }
}
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