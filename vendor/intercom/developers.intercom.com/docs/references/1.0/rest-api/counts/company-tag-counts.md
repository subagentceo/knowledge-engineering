# Company User/Segment/Tag Count Model

### Company User/Segment/Tag Count Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'count'* |
| company | object | Contains a field called segment containing segment counts |
| company.segment | array | Contains a list of segment objects their name and their number of companies tagged |
| company.tag | array | Contains a list of tag objects with their name and their number of companies tagged |
| company.user | array | Contains an array of companies with their name and their number of users |


```curl
# Company Tag Count\n$ curl 'https://api.intercom.io/counts?type=company&count=tag&per_page=5' \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n\n# Company Segment Count\n$ curl 'https://api.intercom.io/counts?type=company&count=segment' \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n\n# Company User Count\n$ curl 'https://api.intercom.io/counts?type=company&count=user' \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
# Company Tag Count\nHTTP/1.1 200 OK\n\n{\n    \"type\": \"count\",\n    \"company\": {\n        \"tag\": [\n            {\n                \"VIP\": 0\n            },\n            {\n                \"UpMarket\": 0\n            },\n            {\n                \"test\": 0\n            },\n            {\n                \"new\": 0\n            },\n            {\n                \"smb\": 0\n            }\n        ]\n    },\n    \"pages\": {\n        \"pages\": {\n            \"type\": \"pages\",\n            \"next\": \"https://api.intercom.io/counts?type=company&count=tag&page=2&per_page=5\",\n            \"page\": 1,\n            \"per_page\": 5,\n            \"total_pages\": 203\n        }\n    }\n}\n\n# Company Segment Count\nHTTP/1.1 200 OK\n{\n    \"type\": \"count\",\n    \"company\": {\n        \"segment\": [\n            {\n                \"Active\": 2\n            },\n            {\n                \"New\": 0\n            },\n            {\n                \"Slipping Away\": 0\n            },\n            {\n                \"id=10\": 10\n            }\n        ]\n    },\n    \"pages\": {}\n}\n\n# Company User Count\nHTTP/1.1 200 OK\n\n{\n  \"type\": \"count\",\n  \"company\": {\n    \"user\": [\n      {\n        \"Independents\": 7,\n        \"remote_company_id\": \"6\"\n      },\n      {\n        \"Alliance\": 1,\n        \"remote_company_id\": \"7\"\n      }\n    ]\n  },\n  \"pages\": {}\n}
```

```ruby
intercom.counts.for_type(type: 'company', count: 'tag')\nintercom.counts.for_type(type: 'company', count: 'segment')\nintercom.counts.for_type(type: 'company', count: 'user')
```

```php
<?php\n// Company Tag Count\n$counts = $intercom->counts->getCounts([\"type\" => \"company\", \"count\" => \"tag\"]);\nprint_r($counts);\n\n// Company User Count\n$counts = $intercom->counts->getCounts([\"type\" => \"company\", \"count\" => \"user\"]);\nprint_r($counts);\n\n//Company Segment Count\n$counts = $intercom->counts->getCounts([\"type\" => \"company\", \"count\" => \"segment\"]);\nprint_r($counts);\n\n?>
```

```java
// Company User Count\nfinal List<Counts.CountItem> users1 = Counts.companyUsers();\nfor (Counts.CountItem c : users1) {\n  out.println(c.getName() + \": \" + c.getValue());\n}\n\n// Company Tag Count\nfinal List<Counts.CountItem> tags1 = Counts.companyTags();\nfor (Counts.CountItem tag : tags1) {\n  out.println(tag.getName() + \": \" + tag.getValue());\n}\n\n// Company Segment Count\nfinal List<Counts.CountItem> segments1 = Counts.companySegments();\nfor (Counts.CountItem seg : segments1) {\n out.println(seg.getName() + \": \" + seg.getValue());\n}
```

The counts for your App can be obtained using `GET` against the `https://api.intercom.io/counts` URL with the `type` and `count` parameters as follows

| Count | Type Value | Count Value |
|  --- | --- | --- |
| Company Segment Count | company | segment |
| Company Tag Count | company | tag |
| Company User Count | company | user |


Pagination with company counts
Company tag counts are returned via pagination, which means it defaults to 50 results per page unless you specify otherwise. e.g. \n'[https://api.intercom.io/counts?type=company&count=tag&per_page=10\"\n\nTo](https://api.intercom.io/counts?type=company&count=tag&per_page=10%5C%22%5Cn%5CnTo) get the next page of results you need to make a GET request with the "next" RUL supplied in the initial response.