# The company model

## Example Company Object

```json
{
  "type": "company",
  "id": "531ee472cce572a6ec000006",
  "name": "Example Company Inc.",
  "plan": {
    "type": "plan",
    "id": "269315",
    "name": "pro"
  },
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

Companies allow you to represent organizations using your product. Each company will have its own description and be associated with contacts. You can fetch, create, update and list companies.

Companies will not appear within Intercom until users have been added or associated with a company.

### Company object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | Value is 'company'. |
| id | String | The Intercom defined id representing the company. |
| created_at | Date (UNIX timestamp) | The time the company was added to Intercom. |
| remote_created_at | Date (UNIX timestamp) | The time the company was created by you. |
| updated_at | Date (UNIX timestamp) | The last time the company was updated. |
| last_request_at | Date (UNIX timestamp) | The time the company last recorded making a request. |
| company_id | String | The company id you have defined for the company. |
| name | String | The name of the company. |
| custom_attributes | Object | The custom attributes you have set on the company. |
| session_count | Integer | How many sessions the company has recorded. |
| monthly_spend | Integer | How much revenue the company generates for your business. |
| user_count | Integer | The number of users in the company. |
| plan | Object | The name of the plan you have associated with the company. |
| size | Integer | The number of employees in the company. |
| website | String | The URL for the company website. |
| industry | String | The industry that the company operates in. |


### Plan object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Will always be of type 'plan' |
| id | string | The plan ID |
| name | string | The name of the plan, note that this is the only field that can be set via the API. |