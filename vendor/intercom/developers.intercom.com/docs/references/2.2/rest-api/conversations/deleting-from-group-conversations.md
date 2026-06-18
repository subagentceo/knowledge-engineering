# Detach a contact from a group conversation

## Example Request & Response

```curl
$ curl 'https://api.intercom.io/conversations/<conversation_id>/customers/<contact_id>' \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' \\\n-H 'Content-Type:application/json' -d\n\n{\n  \"admin_id\": \"781345\"\n}
```

```http
HTTP/1.1 200 OK\n\n{\"customers\":[\n  {\"type\":\"user\",\"id\":\"597f02cb22f4bb37597e0b7d\"}]\n}x§
```

Removes a Contact from a group conversation.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| conversation_id | String | Yes | The identifier for the conversation as given by Intercom. |
| contact_id | String | Yes | The identifier for the contact as given by Intercom. |


### Request Body Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| admin_id | String | Yes | The `id` of the admin who is performing the action. |


### Response

This will return the [Contact](/docs/references/2.2/rest-api/contacts/contacts-model) who was detached from the conversation.