# User Segment/Tag Count Model

The count of tags and segments includes archived tags and segments.

### User Segment/Tag Count Object

> 🚧 Count Object includes count for users and leads.


| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'count'* |
| user | object | Contains a field called segment containing segment counts |
| user.segment | array | Contains a list of segment counts |
| user.tag | array | Contains a list of tag counts |


```json
{
  "type": "count",
  "user": {
    "tag": [
        {
          "Independent": 3
        }
    ]
  }
}
```

```json
{
  "type": "count",
  "user": {
    "segment": [
      {
        "Active": 1
      },
      {
        "New": 0
      },
      {
        "VIP": 0
      },
      {
        "Slipping Away": 0
      },
      {
        "segment 1": 1
      }
    ]
  }
}
```

```curl
# User Tag Count
$ curl 'https://api.intercom.io/counts?type=user&count=tag' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'

# User Segment Count
$ curl 'https://api.intercom.io/counts?type=user&count=segment' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
# User Tag Count
HTTP/1.1 200 OK

{
  "type": "count",
  "user": {
    "tag": [
        {
          "Independent": 3
        }
    ]
  }
}

# User Segment Count
HTTP/1.1 200 OK

{
  "type": "count",
  "user": {
    "segment": [
      {
        "Active": 1
      },
      {
        "New": 0
      },
      {
        "VIP": 0
      },
      {
        "Slipping Away": 0
      },
      {
        "segment 1": 1
      }
    ]
  }
}
```

```ruby
intercom.counts.for_type(type: 'user', count: 'tag')
intercom.counts.for_type(type: 'user', count: 'segment')
```

```php
<?php
// User Tag Count
$counts = $intercom->counts->getCounts(["type" => "user", "count" => "tag"]);
print_r($counts);

// Company Segment Count
$counts = $intercom->counts->getCounts(["type" => "user", "count" => "segment"]);
?>
```

```java
// User Tag Count
final List<Counts.CountItem> tags = Counts.userTags();
for (Counts.CountItem tag : tags) {
  out.println(tag.getName() + ": " + tag.getValue());
}

// User Segment Count
final List<Counts.CountItem> segments = Counts.userSegments();
for (Counts.CountItem seg : segments) {
  out.println(seg.getName() + ": " + seg.getValue());
}
```

The counts for your App can be obtained using `GET` against the `https://api.intercom.io/counts` URL with the `type` and `count` parameters as follows

| Count | Type Value | Count Value |
|  --- | --- | --- |
| User Segment Count | user | segment |
| User Tag Count | user | tag |