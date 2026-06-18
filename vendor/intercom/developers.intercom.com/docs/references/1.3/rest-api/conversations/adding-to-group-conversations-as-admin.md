# Adding to group conversations as admin

## Adding a customer to a group conversation

Customers
Note that customers refers to both users and leads.

```curl
$ curl 'https://api.intercom.io/conversations/11055118659/customers' \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json' \
-H 'Content-Type:application/json' -d'
{
  "admin_id": "781236",
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

Customers can be added to a conversation via a `POST` method to `https://api.intercom.io/conversations/{convo_id}/customers/`, which accepts a JSON object describing the customer.

### Arguments

| Argument | Required | Description |
|  --- | --- | --- |
| admin_id | Yes | You must provide the ID of a valid admin to add a customer to the conversation |
| customer | Yes | JSON object describing the customer that you want to add to the conversation. |


Customer object

| Argument | Required | Description |
|  --- | --- | --- |
| intercom_user_id | one of | The Intercom defined id representing the user (in the URL) |
| user_id | one of | The user id you have defined for the user (or auto defined in the case of leads) |
| email | one of | The email you have defined for the user |


Note about customers without an email
If you try to add a customer via intercom_user_id or user_id which does not have an email you will receive an error. Alternatively, If you add a customer via the email parameter and there is no user/lead in the system for that customer then we will create a new lead.