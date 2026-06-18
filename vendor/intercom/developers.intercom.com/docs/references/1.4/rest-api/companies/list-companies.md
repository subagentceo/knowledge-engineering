# List Companies

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

You can fetch a list of companies. The company list is sorted by the `last_request_at` field and by default is ordered descending, most recently requested first.

Note that the API does not include companies who have no associated users in list responses.

### Request Parameters

You can optionally request the result page size and which page to fetch as follows -

| Parameter | Required | Description |
|  --- | --- | --- |
| page | no | what page of results to fetch *defaults to first page*. |
| per_page | no | how many results per page *defaults to 50*. |
| order | no | `asc` or `desc`. Return the companies in ascending or descending order. *defaults to desc*. |


### Returns

A pageable list of companies. The list contains a `pages` object that indicates if more items exist via the `next` field, whose value is a URL that can be used to fetch the next page. If the `next` field is not present, that indicates there are no further items in the list.

When using the Companies endpoint and the pages object to iterate through the returned companies, there is a limit of 10,000 Companies that can be returned. If you need to list or iterate on more than 10,000 Companies, please use the [Scroll API](https://developers.intercom.com/reference#iterating-over-all-companies).