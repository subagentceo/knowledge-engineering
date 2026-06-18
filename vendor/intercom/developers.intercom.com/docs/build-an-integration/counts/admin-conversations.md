# Admin Conversations Count Model

### Admin Conversation Count Object

The admin conversation count supplies per Admin counts

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'count'* |
| conversation | object | Contains counts related to admins |
| conversation.admin | array | Contains and array of objects detailing each Admin |
| conversation.admin.open | number | Contains the number of open conversations for the Admin |
| conversation.admin.closed | number | Contains the number of closed conversations for the Admin |
| conversation.admin.id | string | Contains the Admin id |
| conversation.admin.name | string | Contains the Admin name |


```text
{
  "type": "count",
  "conversation": {
    "admin": [
      {
        "id": "1",
        "name": "Wash",
        "open": 0,
        "closed": 1
      },
      {
        "id": "2",
        "name": "Jayne",
        "open": 0,
        "closed": 0
      }
    ]
  }
}
```

```bash
# Conversation Admin Counts
$ curl 'https://api.intercom.io/counts?type=conversation&count=admin' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
# Conversation Admin Counts
HTTP/1.1 200 OK

{
  "type": "count",
  "conversation": {
    "admin": [
      {
        "id": "1",
        "name": "Wash",
        "open": 0,
        "closed": 1
      },
      {
        "id": "2",
        "name": "Jayne",
        "open": 0,
        "closed": 0
      }
    ]
  }
}
```

```ruby
intercom.counts.for_type(type: 'conversation', count: 'admin')
```

```php
<?php
// Conversation Admin Count
$counts = $intercom->counts->getCounts(["type" => "conversation", "count" => "admin"]);
print_r($counts);
?>
```

```java
// Conversation Admin Count
final Counts.Conversation counts = Counts.conversationAdmins();
List<Admin> admins = counts.getAdmins();
for (Admin admin : admins) {
    out.println(
      admin.getName() + ": " +
      admin.getClosed() + ", " +
      admin.getOpen());
}
```

The counts for your App can be obtained using `GET` against the `https://api.intercom.io/counts` URL with the `type` and `count` parameters as follows

| Count | Type Value | Count Value |
|  --- | --- | --- |
| Conversation Admin Count | conversation | admin |