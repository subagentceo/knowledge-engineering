# Permanently delete a user

User Delete Requests allow you to irrevocably remove data about a User. After creating a User Delete Request, the User's data will be hard-deleted within 90 days. This deletion cannot be cancelled or reversed.

User Delete Requests can be created via a POST to
`https://api.intercom.io/user_delete_requests`
This endpoint accepts an internal Intercom ID as described below.

## Attributes

| Parameter | Required | Description |
|  --- | --- | --- |
| intercom_user_id | Yes | The internal ID of the User to irrevocably delete |


## Returns

The ID of the User Delete Request, for your reference.
User Delete Requests cannot be altered.

Hard delete
Important: If you delete a user/lead by mistake, contact us within 7 days (via the Messenger) and we can retrieve the information. After 7 days this data will be permanently destroyed.

## Permanently delete users

```curl
curl https://api.intercom.io/user_delete_requests \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d '\n{\n  \"intercom_user_id\": \"530370b477ad7120001d\"\n}'
```

```http
HTTP/1.1 200 OK\n\n{\n    \"id\": 10\n}
```