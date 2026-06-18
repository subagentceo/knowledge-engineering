# Delete a tag

## Example Delete Tag Request

```curl
$ curl https://api.intercom.io/tags/17513 \
-X DELETE \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```ruby
# Not exposed in Ruby client
```

```php
<?php
// Not exposed in PHP client
?>
```

```java
Tag.delete(tag);
```

You can delete a single tag.

### Request Path Parameters

| Paremeter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier of the tag. |


### Response

This will return a [Tag Model](/docs/references/2.6/rest-api/tags/tag-model) of the tag you just deleted.