# Delete a Tag

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

A tag can be deleted by sending a `DELETE` request to its URL. A tag's URL is defined using using the tag's `id` field to create a URL of the form, `https://api.intercom.io/tags/{id}`.