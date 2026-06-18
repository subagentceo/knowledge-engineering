# List all tags

## Example List Tag Request

```curl
$ curl https://api.intercom.io/tags \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
{
  "type": "tag.list",
  "tags": [
    {
      "type": "tag",
      "name": "Beta User",
      "id": 1
    },
    {
      "type": "tag",
      "name": "Amazing User",
      "id": 2
    },
    {
      "type": "tag",
      "name": "Epic User",
      "id": 3
    }
  ]
}
```

```ruby
intercom.tags.all.each { ... }
```

```php
<?php
$tags= $intercom->tags->getTags([]);
foreach ($tags->tags as $tag) {
    print "id:".$tag->id." name:".$tag->name."\n";
}?>
```

```java
TagCollection tags = Tag.list();
while (tags.hasNext()) {
    out.println(tags.next().getId());
}
```

You can list all tags.

### Response

A list of tag objects.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'tag.list'* |
| tags | array | A list of tag objects |