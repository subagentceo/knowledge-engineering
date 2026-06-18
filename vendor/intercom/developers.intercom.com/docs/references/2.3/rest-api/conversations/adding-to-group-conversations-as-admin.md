# Attach a contact to a conversation

## Example Request & Response

```curl
$ curl 'https://api.intercom.io/conversations/<id>/customers' \\-X POST \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json' \\-H 'Content-Type:application/json' -d{  \"admin_id\": \"781236\",  \"customer\": {    \"intercom_user_id\": \"58c1c78946a0aa9ef45b098a\"  }}
```

```curl
HTTP/1.1 200 OK{\"customers\":[  {\"type\":\"user\",\"id\":\"597f02cb22f4bb37597e0b7d\"},   {\"type\":\"lead\",\"id\":\"58ff3f670f14ab4f1aa83750\"}]}
```

You can add participants who are contacts to a conversation, on behalf of either another contact or an admin.

### Request Path Parameter

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The identifier for the conversation as given by Intercom. |


### Request Body Parameter

#### Admin's adding a participant

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| admin_id | String | Yes | The `id` of the admin who is adding the new participant. |
| customer | Object | Yes | See Customer Object below for more. |


#### Contact's adding a participant

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| intercom_user_id | String | Yes, if no `user_id` or `email` | The identifier for the contact as given by Intercom. |
| user_id | String | Yes, if no `intercom_user_id` or `email` | The external_id you have defined for the contact who is adding the new participant. |
| email | String | Yes, if no `intercom_user_id` or `user_id` | The email you have defined for the contact who is adding the new participant. |
| customer | Object | Yes | See Contact Object below for more. |


#### Customer Object

| Attribute | Type | Required? | Description |
|  --- | --- | --- | --- |
| intercom_user_id | String | Yes, if no `user_id` or `email` | The identifier for the contact as given by Intercom. |
| user_id | String | Yes, if no `intercom_user_id` or `email` | The external_id you have defined for the contact who is being added as a participant. |
| email | String | Yes, if the contact's `role` is `lead`.  Yes, if no `intercom_user_id` or `user_id`. | The email you have defined for the contact who is being added as a participant. |


Note about contacts without an email
If you add a contact via the email parameter and there is no user/lead found on that workspace with he given email, then we will create a new contact with `role` set to `lead`.

### Response

This will return a `customers` array containing objects listing the participants in the conversation:

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The role associated to the contact - `user` or `lead`. |
| id | String | The identifier for the contact as given by Intercom. |