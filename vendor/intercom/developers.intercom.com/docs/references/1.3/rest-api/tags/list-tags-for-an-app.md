# List Tags for an App

## Example List Tag Request

```curl
$ curl https://api.intercom.io/tags \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'
```

```curl
{\n  \"type\": \"tag.list\",\n  \"tags\": [\n    {\n      \"type\": \"tag\",\n      \"name\": \"Beta User\",\n      \"id\": 1\n    },\n    {\n      \"type\": \"tag\",\n      \"name\": \"Amazing User\",\n      \"id\": 2\n    },\n    {\n      \"type\": \"tag\",\n      \"name\": \"Epic User\",\n      \"id\": 3\n    }\n  ]\n}
```

```ruby
intercom.tags.all.each { ... }
```

```php
<?php\n$tags= $intercom->tags->getTags([]);\nforeach ($tags->tags as $tag) {\n    print \"id:\".$tag->id.\" name:\".$tag->name.\"\\n\";\n}?>
```

```java
TagCollection tags = Tag.list();\nwhile (tags.hasNext()) {\n    out.println(tags.next().getId());\n}
```

You can fetch the tags for an App by sending a `GET` request to `https://api.intercom.io/tags`.

### Parameters

None.

### Returns

A list of tag objects for the App.

### Tag List

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'tag.list'* |
| tags | array | A list of tag objects |