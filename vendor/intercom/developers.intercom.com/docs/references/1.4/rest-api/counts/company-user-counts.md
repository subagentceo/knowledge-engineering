# App Total Count Model

### App Total Count Object

The total count object contains the summary of the following fields in your app -

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'count.hash'* |
| company | object | Contains the number of companies in your App |
| segment | object | Contains the number of segments in your App |
| tag | object | Contains the number of tags in your App |
| user | object | Contains the number of users in your App |
| lead | object | Contains the number of leads in your App |


The count of tags and segments includes archived tags and segments.

```json
{
    "type": "count.hash",
    "company": {
        "count": 55
    },
    "user": {
        "count": 54944
    },
    "lead": {
        "count": 17
    },
    "tag": {
        "count": 1012
    },
    "segment": {
        "count": 7
    }
}
```

```curl
# App Counts
$ curl 'https://api.intercom.io/counts' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
# App Total Counts
HTTP/1.1 200 OK

{
    "type": "count.hash",
    "company": {
        "count": 55
    },
    "user": {
        "count": 54944
    },
    "lead": {
        "count": 17
    },
    "tag": {
        "count": 1012
    },
    "segment": {
        "count": 7
    }
}
```

```ruby
intercom.counts.for_app
```

```php
<?php
// Global App Counts
$intercom->counts->getCounts([]);
?>
```

```java
// Global App Counts
final Counts.Totals appTotals = Counts.appTotals();
appTotals.getCompany().getValue();
appTotals.getSegment().getValue();
appTotals.getTag().getValue();
appTotals.getUser().getValue();
```

The counts for your App can be obtained using `GET` against the `https://api.intercom.io/counts` URL with the `type` and `count` parameters as follows

| Count | Type Value | Count Value |
|  --- | --- | --- |
| Global App Counts | None | None |