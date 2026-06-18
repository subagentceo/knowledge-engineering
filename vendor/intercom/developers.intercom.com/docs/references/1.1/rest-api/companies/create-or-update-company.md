# Create or Update Company

## Example Request

```curl
$ curl https://api.intercom.io/companies \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type:application/json' -d '\n{\n  \"name\": \"Example Company Inc.\",\n  \"plan\": \"Paid\",\n  \"company_id\": \"6\",\n  \"remote_created_at\": 1394531169,\n  \"size\": 750,\n  \"website\": \"http://www.example.com\",\n  \"industry\": \"Technology\",\n  \"custom_attributes\": {\n    \"paid_subscriber\" : true,\n    \"team_mates\": 0,\n    \"monthly_spend\": 155.98\n  }\n}'
```

```curl
HTTP/1.1 200 OK\n\n{\n    \"type\": \"company\",\n    \"company_id\": \"6\",\n    \"id\": \"57e0120926806ceca3c13ba8\",\n    \"app_id\": \"pi3243fa\",\n    \"name\": \"Example Company Inc.\",\n    \"remote_created_at\": 1394531169,\n    \"created_at\": 1474302473,\n    \"updated_at\": 1475659931,\n    \"last_request_at\": 1473419085,\n    \"monthly_spend\": 49,\n    \"session_count\": 0,\n    \"user_count\": 0,\n    \"tags\": {\n        \"type\": \"tag.list\",\n        \"tags\": []\n    },\n    \"segments\": {\n        \"type\": \"segment.list\",\n        \"segments\": [\n            {\n                \"type\": \"segment\",\n                \"id\": \"56cc69cc8618d37b45000009\"\n            }\n        ]\n    },\n    \"plan\": {\n        \"type\": \"plan\",\n        \"id\": \"108609\",\n        \"name\": \"Paid\"\n    },\n    \"custom_attributes\": {\n        \"paid_subscriber\": true,\n        \"team_mates\": 0,\n        \"referral_source\": \"Google\",\n        \"founded\": \"20th Century\",\n        \"monthly_spend\": 155.98,\n        \"remove\": true\n    }\n}
```

```ruby
intercom.companies.create(:company_id => 6, :name => \"Example Company Inc.\", :plan => \"Paid\")
```

```php
<?php\n$intercom->companies->create([\n    \"name\" => \"Academy\",\n    \"id\" => \"10\"\n])\n?>
```

```java
import static io.intercom.api.CustomAttribute.*;\n\nCompany company = new Company()\n  .setName(\"Example Company Inc.\")\n  .setCompanyID(\"1\")\n  .setPlan(new Company.Plan(\"premium\"))\n  .addCustomAttribute(newIntegerAttribute(\"items\", 246))\n  .addCustomAttribute(CustomAttribute.newStringAttribute(\"bar\", \"fruity\"));\n\ncompany = Company.create(company);\n\ncompany.setName(\"Example Company Inc. Corporation\");\nCompany.update(company);
```

Companies can be created or updated via a `POST` to `https://api.intercom.io/companies`, which accepts a JSON object describing the company.

Companies with no users
It is important to note that companies will be only visible in Intercom when there is at least one associated user. Check the [**Companies and Users**](https://developers.intercom.com/reference#companies-and-users) section for more information

Companies are looked up via `company_id`, if not found via `company_id`, the new company will be created, if found, that company will be updated.

Note that the `company_id` field itself cannot be updated through the API.

Companies may also be created or updated via a User request - see the section ["Create or Update User"](#create-or-update-user).

### Attributes

The table below shows the fields you can create or update for a company -

| Attribute | Type | Description |
|  --- | --- | --- |
| remote_created_at | timestamp | The time the company was created by you |
| company_id | string | The company id you have defined for the company |
| name | string | The name of the company |
| monthly_spend | number | How much revenue the company generates for your business. Note that this will truncate floats. i.e. it only allow for whole integers, 155.98 will be truncated to 155. Note that this has an upper limit of 2**31-1 or 2147483647. |
| plan | string | The name of the plan you have associated with the company |
| size | number | The number of employees in this company |
| website | string | The URL for this company's website. Please note that the value specified here is not validated. Accepts any string. |
| industry | string | The industry that this company operates in |
| custom_attributes | object | A hash of key/value pairs containing any other data about the company you want Intercom to store. |


### Custom Attributes

The `custom_attributes` object allows you to send any information you wish about a company with the following restrictions -

- Field names must not contain Periods (.) or Dollar ($) characters
- Field names must be no longer than 190 characters.
- Field values must be JSON Strings, Numbers or Booleans - Objects and Arrays will be rejected.
- String field values must be no longer than 255 characters.
- Maximum of 100 fields.


### Session Count

A company's session count is tied to users' session count whilst in the context of that company. So, to update a company session count,
update the user with that company and increment the user's session.

### Returns

The created or updated company object.

New company objects will be provided with an `id` field - this value cannot be created or edited by clients.