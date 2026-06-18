# List all segments

## Example Request & Response

```curl
$ curl https://api.intercom.io/segments
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
  "type": "segment.list",
  "segments": [
    {
      "created_at": 1393613031,
      "id": "5310d8e7598c9a0b24000002",
      "name": "Active",
      "type": "segment",
      "updated_at": 1393613031
    },
    {
      "created_at": 1393613030,
      "id": "5310d8e6598c9a0b24000001",
      "name": "New",
      "type": "segment",
      "updated_at": 1393613030
    },
    {
      "created_at": 1393613031,
      "id": "5310d8e7598c9a0b24000003",
      "name": "Slipping Away",
      "type": "segment",
      "updated_at": 1393613031
    }
  ]
}
```

```ruby
intercom.segments.all.each { ... }
```

```php
<?php
$intercom->segments->getSegments([]);
?>
```

```java
SegmentCollection segments = Segment.list();
while (segments.hasNext()) {
    out.println(segments.next().getId());
}
```

You can fetch a list of all segments.

### Request Query Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| include_count | Boolean | No | It includes the count of contacts that belong to each segment. |


### Response

This will return a list of [Segment Objects](/docs/references/2.4/rest-api/segments/segment-model). The result may also have a `pages` object if the response is paginated.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | *value is 'segment.list'* |
| segments | Array | A list of segment objects |
| pages | Object | Optional. A pagination object, which may be empty, indicating no further pages to fetch. |