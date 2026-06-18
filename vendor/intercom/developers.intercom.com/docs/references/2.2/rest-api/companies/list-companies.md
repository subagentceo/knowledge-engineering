# List all companies

## Example Request & Response

```curl
$ curl https://api.intercom.io/companies \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK{  \"type\": \"company.list\",  \"total_count\": 105,  \"companies\": [    {      \"type\": \"company\",      \"id\": \"530370b477ad7120001d\",       ...     },     ...   ],  \"pages\": {    \"next\": \"https://api.intercom.io/companies?per_page=50&page=2\",    \"page\": 1,    \"per_page\": 50,    \"total_pages\": 3  }}# NB: Full company objects are returned
```

```ruby
intercom.companies.all.each { ... }
```

```php
<?php$companies= $intercom->companies->getCompanies([]);foreach ($companies->companies as $company) {    print_r($company->company_id);    echo \"\\";}?>
```

```java
CompanyCollection companies = Company.list();// get first pageList<Company> items = companies.getPageItems();// or iterate over pageswhile (companies.hasNext()) {  System.out.println(companies.next().getName());}
```

You can fetch a list of all companies.

Note that the API does not include companies who have no associated users in list responses.

### Request Query Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| order | No | Accepted values are `asc` or `desc`.  Returns the companies in ascending or descending order. Default is `desc`. |
| sort | No | Accepted values are `updated_at` or `last_request_at`.  Returns the companies ordered by the given value.  Default is `last_request_at`. |
| tag_id | No | The `id` of the tag to filter by. |
| segment_id | No | The `id` of the segment to filter by. |


### Response

This will return a [paginated](/docs/build-an-integration/learn-more/rest-apis/pagination) list of [Company Objects](/docs/references/2.2/rest-api/companies/company-model).

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list` |
| data | Array | An array containing Company Objects. |
| total_count | Integer | The total number of companies. |
| pages | [Pagination Object](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor) | The information needed to paginate through companies |


When using the Companies endpoint and the pages object to iterate through the returned companies, there is a limit of 10,000 Companies that can be returned. If you need to list or iterate on more than 10,000 Companies, please use the [Scroll API](https://developers.intercom.com/reference#iterating-over-all-companies).