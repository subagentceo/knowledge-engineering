# Update a company

## Example Request

```curl
$ curl https://api.intercom.io/companies/<id> \
-X PUT \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type:application/json' -d '
{
  "name": "Example Company Inc.",
  "plan": "Paid",
  "company_id": "6",
  "remote_created_at": 1394531169,
  "size": 750,
  "website": "http://www.example.com",
  "industry": "Technology",
  "custom_attributes": {
    "paid_subscriber" : true,
    "team_mates": 0,
    "monthly_spend": 155.98
  }
}'
```

```curl
HTTP/1.1 200 OK

{
    "type": "company",
    "company_id": "6",
    "id": "57e0120926806ceca3c13ba8",
    "app_id": "pi3243fa",
    "name": "Example Company Inc.",
    "remote_created_at": 1394531169,
    "created_at": 1474302473,
    "updated_at": 1475659931,
    "last_request_at": 1473419085,
    "monthly_spend": 49,
    "session_count": 0,
    "user_count": 0,
    "tags": {
        "type": "tag.list",
        "tags": []
    },
    "segments": {
        "type": "segment.list",
        "segments": [
            {
                "type": "segment",
                "id": "56cc69cc8618d37b45000009"
            }
        ]
    },
    "plan": {
        "type": "plan",
        "id": "108609",
        "name": "Paid"
    },
    "custom_attributes": {
        "paid_subscriber": true,
        "team_mates": 0,
        "referral_source": "Google",
        "founded": "20th Century",
        "monthly_spend": 155.98,
        "remove": true
    }
}
```

**Example Errors**

### Company not found

```json
{\n  \"type\": \"error.list\",\n  \"request_id\": \"2a1900aa-59ec-4ffd-96de-6e0ec78a920a\",\n  \"errors\": [\n    {\n      \"code\": \"company_not_found\",\n      \"message\": \"Company Not Found\"\n    }\n  ]\n}
```

You can update an existing company

### Request Path Parameters

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the company which is given by Intercom |


### Request Body Parameters

| Attribute | Type | Description |
|  --- | --- | --- |
| remote_created_at | timestamp | The time the company was created by you |
| name | string | The name of the company |
| monthly_spend | number | How much revenue the company generates for your business. Note that this will truncate floats. i.e. it only allow for whole integers, 155.98 will be truncated to 155. Note that this has an upper limit of 2**31-1 or 2147483647. |
| plan | string | The name of the plan you have associated with the company |
| size | number | The number of employees in this company |
| website | string | The URL for this company's website. Please note that the value specified here is not validated. Accepts any string. |
| industry | string | The industry that this company operates in |
| custom_attributes | object | A hash of key/value pairs containing any other data about the company you want Intercom to store. |


Creating new Custom Data Attributes
You can only write to custom data attributes that already exist on the workspace. If you need to create new attributes to write to, you should [Create Data Attributes](/docs/references/2.4/rest-api/data-attributes/create-data-attributes) through the data Attributes API.

### Response

This will return the [Company model](/docs/references/2.4/rest-api/companies/company-model) that has been updated.