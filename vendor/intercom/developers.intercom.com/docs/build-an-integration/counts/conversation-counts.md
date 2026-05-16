# Conversation Count Model

### Conversation Count Object

The conversation count supplies global counts about your App's conversations

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'count'* |
| conversation | object | Contains counts related to conversations |
| conversation.assigned | number | Contains the number of assigned conversations |
| conversation.closed | number | Contains the number of closed conversations |
| conversation.open | number | Contains the number of open conversations |
| conversation.unassigned | number | Contains the number of unassigned conversations |



```json
{
    "type": "count",
    "conversation": {
        "open": 30,
        "closed": 17,
        "unassigned": 0,
        "assigned": 30
    }
}
```


```bash
# Conversation Counts
$ curl 'https://api.intercom.io/counts?type=conversation' \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```


```curl
# Conversation App Counts
HTTP/1.1 200 OK

{
    "type": "count",
    "conversation": {
        "open": 30,
        "closed": 17,
        "unassigned": 0,
        "assigned": 30
    }
}
```


```ruby
intercom.counts.for_type(type: 'conversation')
```


```php
<?php
$counts = $intercom->counts->getCounts(["type" => "conversation"]);
print_r($counts);
?>
```


```java
// Conversation Counts
final Counts.Conversation totals = Counts.conversationTotals();
totals.getAssigned();
totals.getClosed();
totals.getOpen();
totals.getUnassigned();
```

The counts for your App can be obtained using `GET` against the `https://api.intercom.io/counts` URL with the `type` and `count` parameters as follows

| Count | Type Value | Count Value |
|  --- | --- | --- |
| Conversation Count | conversation | None |