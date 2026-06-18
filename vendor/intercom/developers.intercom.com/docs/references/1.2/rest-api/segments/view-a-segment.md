# View a Segment

## Example Request

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

Each segment has its own URL -

- `https://api.intercom.io/segments/{id}`


Where `{id}` is the value of the segment's `id` field. A `GET` request to a segment's URL will return the segment object.

You can also get a count for an individual user segment by adding the parameter `include_count=true`

```curl
$ curl https://api.intercom.io/segments/58a707924f6651b07b94376c?include_count=true \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

{
    "type": "segment",
    "id": "58a707924f6651b07b94376c",
    "name": "id=10",
    "created_at": 1487341458,
    "updated_at": 1487341459,
    "person_type": "user",
    "count": 5
}
```

### Returns

A segment object.