# List all companies

## List companies

```curl
$ curl https://api.intercom.io/companies \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"company.list\",\n  \"total_count\": 105,\n  \"companies\": [\n    {\n      \"type\": \"company\",\n      \"id\": \"530370b477ad7120001d\",\n       ...\n     },\n     ...\n   ],\n  \"pages\": {\n    \"next\": \"https://api.intercom.io/companies?per_page=50&page=2\",\n    \"page\": 1,\n    \"per_page\": 50,\n    \"total_pages\": 3\n  }\n}\n\n# NB: Full company objects are returned
```

```ruby
intercom.companies.all.each { ... }
```

```php
<?php\n$companies= $intercom->companies->getCompanies([]);\nforeach ($companies->companies as $company) {\n    print_r($company->company_id);\n    echo \"\\n\";\n}\n?>
```

```java
CompanyCollection companies = Company.list();\n// get first page\nList<Company> items = companies.getPageItems();\n// or iterate over pages\nwhile (companies.hasNext()) {\n  System.out.println(companies.next().getName());\n}
```

You can list companies. The company list is sorted by the `last_request_at` field and by default is ordered descending, most recently requested first.

Note that the API does not include companies who have no associated users in list responses.

### Request Parameters

You can optionally request the result page size and which page to fetch as follows -

| Parameter | Required | Description |
|  --- | --- | --- |
| page | no | what page of results to fetch *defaults to first page*. |
| per_page | no | how many results per page *defaults to 15*. |
| order | no | `asc` or `desc`. Return the companies in ascending or descending order. *defaults to desc*. |


### Request Query Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| tag_id | one of | The `id` of the tag to filter by. |
| segment_id | one of | The `id` of the segment to filter by. |


### Response

This will return a [paginated](/docs/build-an-integration/learn-more/rest-apis/pagination) list of [Company Objects](/docs/references/2.4/rest-api/companies/company-model)

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list` |
| data | Array | An array containing Company Objects. |
| total_count | Integer | The total number of companies. |
| pages | [Pagination Object](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor) | The information needed to paginate through companies |


When using the Companies endpoint and the pages object to iterate through the returned companies, there is a limit of 10,000 Companies that can be returned. If you need to list or iterate on more than 10,000 Companies, please use the [Scroll API](https://developers.intercom.com/reference#iterating-over-all-companies).