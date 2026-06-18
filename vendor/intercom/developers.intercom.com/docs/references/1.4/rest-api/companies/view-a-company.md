# View a Company

## Example View Request and Response

```curl
$ curl \\\n-s https://api.intercom.io/companies?company_id=141 \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H \"Accept:application/json\" \\
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"company\",\n  \"id\": \"531ee472cce572a6ec000006\",\n  \"name\": \"Example Company Inc.\",\n  \"plan\": {\n    \"type\":\"plan\",\n    \"id\":\"1\",\n    \"name\":\"Paid\"\n  },\n  \"company_id\": \"141\",\n  \"remote_created_at\": 1394531169,\n  \"created_at\": 1394533506,\n  \"updated_at\": 1396874658,\n  \"last_request_at\": 1396874658,\n  \"monthly_spend\": 49,\n  \"session_count\": 26,\n  \"user_count\": 10,\n  \"custom_attributes\": {\n    \"paid_subscriber\" : true,\n    \"team_mates\": 0\n  }\n}
```

```ruby
intercom.companies.find(:id => \"41e66f0313708347cb0000d0\")
```

```php
<?php\n# Using the name of the company\n$intercom->companies->getCompanies(['name' => 'OneAmerica']);\n\n# Via company_id\n$intercom->companies->getCompanies(['company_id' => '10']);\n\n?>
```

```java
String id = \"541a144b201ebf2ec5000001\";\nCompany company = Company.find(id);
```

Each company has its own URL -

- `https://api.intercom.io/companies/{id}`


Where `{id}` is the value of the company's `id` field. This URL is the company's canonical address in the API.

### Request Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| name | no | The name of the company |
| company_id | no | The company_id you have given to the company |


A company can also be fetched by its name using a `name` or `company_id` parameter in the url, whose values are the ones you have defined for that company -

- `https://api.intercom.io/companies?name={name}`
- `https://api.intercom.io/companies?company_id={company_id}`


The `name` parameter value should be [url encoded](http://en.wikipedia.org/wiki/Percent-encoding) when sending, as company names are allowed to have values that either need to be encoded as character data (e.g., whitespace) or are reserved characters (e.g., ':').