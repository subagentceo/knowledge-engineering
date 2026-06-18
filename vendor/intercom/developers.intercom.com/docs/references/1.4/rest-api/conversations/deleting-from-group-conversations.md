# Deleting from group conversations

## Deleting a customer from a group conversation

Customers
Note that customers refers to both users and leads.

```curl
$ curl 'https://api.intercom.io/conversations/11055118659/customers/58c1c72246a0aa9ef45a098e' \
-X DELETE \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d'
{
  "admin_id": "781345"
}'
```

```curl
HTTP/1.1 200 OK

{"customers":[
  {"type":"user","id":"597f02cb22f4bb37597e0b7d"}]
}x§
```

Customers can be removed from a conversation via a `DELETE` method to `https://api.intercom.io/conversations/{convo_id}/customers/{id}`, which accepts a JSON object describing the customer.

### Arguments

| Argument | Required | Description |
|  --- | --- | --- |
| admin_id | Yes | You must provide the ID of a valid admin to remove a customer to the conversation |