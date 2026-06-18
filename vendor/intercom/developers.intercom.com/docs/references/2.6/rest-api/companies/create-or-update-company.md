# Create or update a company

## Example Request & Response

```curl
$ curl https://api.intercom.io/companies \
-X POST \
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

```ruby
intercom.companies.create(:company_id => 6, :name => "Example Company Inc.", :plan => "Paid")
```

```php
<?php
$intercom->companies->create([
    "name" => "Academy",
    "id" => "10"
])
?>
```

```java
import static io.intercom.api.CustomAttribute.*;

Company company = new Company()
  .setName("Example Company Inc.")
  .setCompanyID("1")
  .setPlan(new Company.Plan("premium"))
  .addCustomAttribute(newIntegerAttribute("items", 246))
  .addCustomAttribute(CustomAttribute.newStringAttribute("bar", "fruity"));

company = Company.create(company);

company.setName("Example Company Inc. Corporation");
Company.update(company);
```

You can create or update a company.

Companies with no users
Companies will be only visible in Intercom when there is at least one associated user.

Companies are looked up via `company_id` in a `POST` request, if not found via `company_id`, the new company will be created, if found, that company will be updated.

### Request Body Parameters

| Argument | Type | Description |
|  --- | --- | --- |
| remote_created_at | timestamp | The time the company was created by you. |
| company_id | string | The company id you have defined for the company.**Can't be updated**. |
| name | string | The name of the company. |
| monthly_spend | number | How much revenue the company generates for your business. Note that this will truncate floats. i.e. it only allow for whole integers, 155.98 will be truncated to 155. Note that this has an upper limit of 2**31-1 or 2147483647.. |
| plan | string | The name of the plan you have associated with the company. |
| size | number | The number of employees in this company. |
| website | string | The URL for this company's website. Please note that the value specified here is not validated. Accepts any string. |
| industry | string | The industry that this company operates in. |
| custom_attributes | object | A hash of key/value pairs containing any other data about the company you want Intercom to store.. |


### Response

This will return the [Company model](/docs/references/2.6/rest-api/companies/company-model) that has been created or updated.