# Retrieve a segment

## Example Request & Response

```curl
$ curl https://api.intercom.io/segments/53203e244cba153d39000062 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
  "type": "segment",
  "id": "53203e244cba153d39000062",
  "name": "New",
  "created_at": 1394621988,
  "updated_at": 1394622004
}
```

```ruby
intercom.segments.find(:id => '1234')
```

```java
Segment segment = Segment.find("1234");
```

You can fetch the details of a single segment.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identified of a given segment. |


### Request Query Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| include_count | Boolean | No | Includes the count of contacts that belong to a given segment. |


### Response

This will return a [Segment Model](/docs/references/2.5/rest-api/segments/segment-model).