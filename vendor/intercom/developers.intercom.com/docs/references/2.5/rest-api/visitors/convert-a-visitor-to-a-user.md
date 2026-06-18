# Convert a visitor

You can merge a Visitor to a Contact of role type `lead` or `user`.

What happens upon a visitor being converted?
If the User exists, then the Visitor will be merged into it, the Visitor deleted and the User returned. If the User does not exist, the Visitor will be converted to a User, with the User identifiers replacing it's Visitor identifiers.

### Request Body Parameters

| Argument | Type | Required? | Description |
|  --- | --- | --- | --- |
| visitor | Object | Yes | The unique identifiers to convert a single Visitor. |
| user | Object | Yes | The unique identifiers retained after converting or merging. |
| type | String | Yes | Represents the role of the [Contact model](/docs/references/2.5/rest-api/contacts/contacts-model). Accepts `lead` or `user`. |


### Visitor object

| Argument | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | One of | The unique identifier for the contact which is given by Intercom. |
| user_id | String | One of | A unique identifier for the contact which is given to Intercom. |
| email | String | One of | The visitor's email. |


### User object *(a contact)*

| Argument | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | One of | The unique identifier for the contact which is given by Intercom. |
| user_id | String | One of | A unique identifier for the contact which is given to Intercom, which will be represented as `external_id`. |
| email | String | No | The contact's email, retained by default if one is present. |


## Example Request & Response

```curl
$ curl \\https://api.intercom.io/visitors/convert \\-X POST \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json' \\-H 'Content-Type: application/json' -d '{  \"visitor\": {    \"user_id\": \"8a88a590-e1c3-41e2-a502-e0649dbf721c\"  },  \"user\": {    \"email\": \"joe@example.com\"  },  \"type\": \"user\"}'
```

```curl
# NB: Full User objects are returned{  \"type\": \"lead\",  \"user_id\": \"8a88a590-e1c3-41e2-a502-e0649dbf721c\"}
```

### Response

This will return a [Contact model](/docs/references/2.5/rest-api/contacts/contacts-model) of the visitor you just converted or merged into.