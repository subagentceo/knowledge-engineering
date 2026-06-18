# Adding to group conversations as customer

## Adding a customer to a group conversation as customer

```curl
$ curl 'https://api.intercom.io/conversations/11055118659/customers' \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d'
{
  "intercom_user_id": "55c1c78946b0aa9ef45b09ff",
  "customer":{
    "intercom_user_id": "58c1c78946a0aa9ef45b098a"
  }
}'
```

```curl
HTTP/1.1 200 OK

{"customers":[
  {"type":"user","id":"597f02cb22f4bb37597e0b7d"}, 
  {"type":"lead","id":"58ff3f670f14ab4f1aa83750"}]
}
```

Customers can also be added by other customer that's already part of the conversation.

### Arguments

| Argument | Required | Description |
|  --- | --- | --- |
| intercom_user_id | one of | The Intercom defined id representing the user (in the URL) |
| user_id | one of | The user id you have defined for the user (or auto defined in the case of leads) |
| email | one of | The email you have defined for the user |
| customer | Yes | JSON object describing the customer that you want to add to the conversation. |