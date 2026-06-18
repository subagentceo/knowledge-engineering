# Error Objects

## Error List Object

```curl
{
  "type": "error.list",
  "errors": [
    {
      "code": "not_found",
      "message": "No such user_id[314159]",
      "field": "user_id"
    },
    {
      "code": "not_found",
      "message": "No such email[pi@example.org]",
      "field": "email"
    }
  ]
}
```

```javascript
// the JavaScript client doesn't directly expose error data
```

```ruby
# the Ruby client doesn't directly expose error data
```

```php
<?php
// the PHP client doesn't directly expose error data
?>
```

```java
try {
  UserCollection uc = User.list();
} catch(IntercomException  ie) {
  Error e = ie.getFirstError();
  log.error("{}:{}", e.getCode(), e.getMessage());
}
```

The API will return an Error List for a failed request, which will contain one or more Error objects.

### Error List Attributes

Each error has the following attributes

| Field | Description |
|  --- | --- |
| type | The type is `error.list` |
| errors | An array of one or more error objects |


### Error Object Attributes

Each Error Object has the following attributes

| Field | Description |
|  --- | --- |
| code | A string indicating the kind of error, used to further qualify the HTTP response code |
| message | Optional. Human readable description of the error |
| field | Optional. Used to identify a particular field or query parameter that was in error. |