# Retrieve a company

## Example Request & Response

```curl
$ curl \
-s https://api.intercom.io/companies?company_id=141 \
-H 'Authorization:Bearer <Your access token>' \
-H "Accept:application/json" \
```

```curl
HTTP/1.1 200 OK

{
  "type": "company",
  "id": "531ee472cce572a6ec000006",
  "name": "Example Company Inc.",
  "plan": {
    "type":"plan",
    "id":"1",
    "name":"Paid"
  },
  "company_id": "141",
  "remote_created_at": 1394531169,
  "created_at": 1394533506,
  "updated_at": 1396874658,
  "last_request_at": 1396874658,
  "monthly_spend": 49,
  "session_count": 26,
  "user_count": 10,
  "custom_attributes": {
    "paid_subscriber" : true,
    "team_mates": 0
  }
}
```

```ruby
intercom.companies.find(:id => "41e66f0313708347cb0000d0")
```

```php
<?php
# Using the name of the company
$intercom->companies->getCompanies(['name' => 'OneAmerica']);

# Via company_id
$intercom->companies->getCompanies(['company_id' => '10']);

?>
```

```java
String id = "541a144b201ebf2ec5000001";
Company company = Company.find(id);
```

You can fetch a single company.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| name | String | No | The name of the company.The parameter should be **url encoded**. |
| company_id | String | No | The company_id you have given to the company. |


A company can also be fetched by its name using a `name` or `company_id` parameter in the url, whose values are the ones you have defined for that company -

- `https://api.intercom.io/companies?name={name}`
- `https://api.intercom.io/companies?company_id={company_id}`


### Response

This will return the [Company model](/docs/references/2.3/rest-api/companies/company-model) that has been created or updated.