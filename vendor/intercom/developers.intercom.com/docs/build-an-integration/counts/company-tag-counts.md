# Company User/Segment/Tag Count Model

### Company User/Segment/Tag Count Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'count'* |
| company | object | Contains a field called segment containing segment counts |
| company.segment | array | Contains a list of segment objects their name and their number of companies tagged |
| company.tag | array | Contains a list of tag objects with their name and their number of companies tagged |
| company.user | array | Contains an array of companies with their name and their number of users |


```bash
# Company Tag Count
$ curl 'https://api.intercom.io/counts?type=company&count=tag&per_page=5' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'

# Company Segment Count
$ curl 'https://api.intercom.io/counts?type=company&count=segment' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'

# Company User Count
$ curl 'https://api.intercom.io/counts?type=company&count=user' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
# Company Tag Count
HTTP/1.1 200 OK

{
    "type": "count",
    "company": {
        "tag": [
            {
                "VIP": 0
            },
            {
                "UpMarket": 0
            },
            {
                "test": 0
            },
            {
                "new": 0
            },
            {
                "smb": 0
            }
        ]
    },
    "pages": {
        "pages": {
            "type": "pages",
            "next": "https://api.intercom.io/counts?type=company&count=tag&page=2&per_page=5",
            "page": 1,
            "per_page": 5,
            "total_pages": 203
        }
    }
}

# Company Segment Count
HTTP/1.1 200 OK
{
    "type": "count",
    "company": {
        "segment": [
            {
                "Active": 2
            },
            {
                "New": 0
            },
            {
                "Slipping Away": 0
            },
            {
                "id=10": 10
            }
        ]
    },
    "pages": {}
}

# Company User Count
HTTP/1.1 200 OK

{
  "type": "count",
  "company": {
    "user": [
      {
        "Independents": 7,
        "remote_company_id": "6"
      },
      {
        "Alliance": 1,
        "remote_company_id": "7"
      }
    ]
  },
  "pages": {}
}
```

```ruby
intercom.counts.for_type(type: 'company', count: 'tag')
intercom.counts.for_type(type: 'company', count: 'segment')
intercom.counts.for_type(type: 'company', count: 'user')
```

```php
<?php
// Company Tag Count
$counts = $intercom->counts->getCounts(["type" => "company", "count" => "tag"]);
print_r($counts);

// Company User Count
$counts = $intercom->counts->getCounts(["type" => "company", "count" => "user"]);
print_r($counts);

//Company Segment Count
$counts = $intercom->counts->getCounts(["type" => "company", "count" => "segment"]);
print_r($counts);

?>
```

```java
// Company User Count
final List<Counts.CountItem> users1 = Counts.companyUsers();
for (Counts.CountItem c : users1) {
  out.println(c.getName() + ": " + c.getValue());
}

// Company Tag Count
final List<Counts.CountItem> tags1 = Counts.companyTags();
for (Counts.CountItem tag : tags1) {
  out.println(tag.getName() + ": " + tag.getValue());
}

// Company Segment Count
final List<Counts.CountItem> segments1 = Counts.companySegments();
for (Counts.CountItem seg : segments1) {
 out.println(seg.getName() + ": " + seg.getValue());
}
```

The counts for your App can be obtained using `GET` against the `https://api.intercom.io/counts` URL with the `type` and `count` parameters as follows

| Count | Type Value | Count Value |
|  --- | --- | --- |
| Company Segment Count | company | segment |
| Company Tag Count | company | tag |
| Company User Count | company | user |


Pagination with company counts
Company tag counts are returned via pagination, which means it defaults to 50 results per page unless you specify otherwise. e.g. '[https://api.intercom.io/counts?type=company&count=tag&per_page=10](https://api.intercom.io/counts?type=company&count=tag&per_page=10)"

To get the next page of results you need to make a GET request with the "next" RUL supplied in the initial response.