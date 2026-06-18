# List by Tag or Segment

## Example List by tag request

```curl
$ curl https://api.intercom.io/companies?tag_id=17 \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"company.list\",\n  \"total_count\": 105,\n  \"companies\": [\n    {\n      \"type\": \"company\",\n      \"id\": \"530370b477ad7120001d\",\n       ...\n     },\n     ...\n   ],\n  \"pages\": {\n    \"next\": \"https://api.intercom.io/companies?tag=14&per_page=50&page=2\",\n    \"page\": 1,\n    \"per_page\": 50,\n    \"total_pages\": 3\n  }\n}\n\n# NB: Full company objects are returned
```

```ruby
intercom.companies.find(:tag_id => \"1234\")\nintercom.companies.find(:segment_id => \"4567\")
```

```php
<?php\n$companies = $intercom->companies->getCompanies([\"tag_id\" => '1153470']);\nprint_r($companies->companies);\n\n$companies = $intercom->companies->getCompanies([\"segment_id\" => '596f8022227edee8a052e910']);\nprint_r($companies->companies);\n\n?>
```

```java
Map<String, String> params = Maps.newHashMap();\nparams.put(\"tag_id\", \"1234\");\nCompany company = Company.list(map);\n\nparams = Maps.newHashMap();\nparams.put(\"segment_id\", \"4567\");\nCompany company = Company.list(map);
```

You can fetch segmented and tagged companies by querying the companies resource with the `segment_id` and `tag_id` parameters (for information on how to tag companies see the section ["Create and update tags"](#create-and-update-tags)).

Note that you can query by tag or segment but not both in the same request.

### Request Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| tag_id | one of | The `id` of the tag to filter by. |
| segment_id | one of | The `id` of the segment to filter by. |


### Returns

A pageable list of companies. Like a plain company list, the result contains a `pages` object that indicates if more companies exist via the `next` field.