# Create or update a tag

## Example Request & Response

```curl
$ curl https://api.intercom.io/tags \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d'
{
  "name": "Independent"
}'
```

```curl
HTTP/1.1 200 Ok

{
  "type": "tag",
  "name": "Independent",
  "id": "17513"
}
```

```ruby
intercom.tags.tag(name: 'Independent', users: [{ id: "42ea2f1b93891f6a99000427" }])
```

```php
<?php
$intercom->tags->tag(["name" => "php-tag"]);
?>
```

```java
Tag t = new Tag().setName("Independent");
t = Tag.create(t);
```

You can create or update a tag.

### Request Body Parameters

| Attribute | Required | Description |
|  --- | --- | --- |
| name | Yes | The name of the tag, which will be created if not found, or the new name for the tag if this is an update request. Names are case insensitive. |
| id | Only for update | The id of tag to updates. |


### Response

This will return a [Tag Model](/docs/references/2.5/rest-api/tags/tag-model) of the tag you just created or updated.