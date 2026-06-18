# List by Tag or Segment

## Example List by tag request

```curl
$ curl https://api.intercom.io/companies?tag_id=17 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
  "type": "company.list",
  "total_count": 105,
  "companies": [
    {
      "type": "company",
      "id": "530370b477ad7120001d",
       ...
     },
     ...
   ],
  "pages": {
    "next": "https://api.intercom.io/companies?tag=14&per_page=50&page=2",
    "page": 1,
    "per_page": 50,
    "total_pages": 3
  }
}

# NB: Full company objects are returned
```

```ruby
intercom.companies.find(:tag_id => "1234")
intercom.companies.find(:segment_id => "4567")
```

```php
<?php
$companies = $intercom->companies->getCompanies(["tag_id" => '1153470']);
print_r($companies->companies);

$companies = $intercom->companies->getCompanies(["segment_id" => '596f8022227edee8a052e910']);
print_r($companies->companies);

?>
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("tag_id", "1234");
Company company = Company.list(map);

params = Maps.newHashMap();
params.put("segment_id", "4567");
Company company = Company.list(map);
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