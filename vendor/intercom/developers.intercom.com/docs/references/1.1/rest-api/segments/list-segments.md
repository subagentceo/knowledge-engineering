# List Segments

## Example Request

```curl
$ curl https://api.intercom.io/segments\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"segment.list\",\n  \"segments\": [\n    {\n      \"created_at\": 1393613031,\n      \"id\": \"5310d8e7598c9a0b24000002\",\n      \"name\": \"Active\",\n      \"type\": \"segment\",\n      \"updated_at\": 1393613031\n    },\n    {\n      \"created_at\": 1393613030,\n      \"id\": \"5310d8e6598c9a0b24000001\",\n      \"name\": \"New\",\n      \"type\": \"segment\",\n      \"updated_at\": 1393613030\n    },\n    {\n      \"created_at\": 1393613031,\n      \"id\": \"5310d8e7598c9a0b24000003\",\n      \"name\": \"Slipping Away\",\n      \"type\": \"segment\",\n      \"updated_at\": 1393613031\n    }\n  ]\n}
```

```ruby
intercom.segments.all.each { ... }
```

```php
<?php\n$intercom->segments->getSegments([]);\n?>
```

```java
SegmentCollection segments = Segment.list();\nwhile (segments.hasNext()) {\n    out.println(segments.next().getId());\n}
```

You can list the user segments for your App by sending a `GET` request to `https://api.intercom.io/segments`. Company segments can be listed by sending a `GET` request to `https://api.intercom.io/segments?type=company`.

You can also include counts in your segment model in the response if you add the parameter `include_count=true` in the request. Note that this is only relevant for user segments.

```curl
$ curl 'https://api.intercom.io/segments?include_count=true'
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
    "type": "segment.list",
    "segments": [
        {
            "type": "segment",
            "id": "56cc69cd8618d37b4500000c",
            "name": "Active",
            "created_at": 1456237005,
            "updated_at": 1487064099,
            "person_type": "user",
            "count": 3
        },
        {
            "type": "segment",
            "id": "56cc69cc8618d37b4500000b",
            "name": "New",
            "created_at": 1456237004,
            "updated_at": 1473241975,
            "person_type": "user",
            "count": 0
        },
        {
            "type": "segment",
            "id": "56cc69cd8618d37b4500000d",
            "name": "Slipping Away",
            "created_at": 1456237005,
            "updated_at": 1473241975,
            "person_type": "user",
            "count": 0
        },
        {
            "type": "segment",
            "id": "56e6f1f2b7ebc2061200000d",
            "name": "test3WebSession",
            "created_at": 1457975794,
            "updated_at": 1473241976,
            "person_type": "user",
            "count": 1
        }
    ]
}
```

### Segment List

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'segment.list'* |
| segments | array | A list of segment objects |
| pages | object | Optional. A pagination object, which may be empty, indicating no further pages to fetch. |


### Returns

A list of segment objects for the App. The result may also have a `pages` object if the response is paginated.