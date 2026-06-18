# Detach a conversation

## Example Request & Response

```curl
$ curl https://api.intercom.io/conversations/<id>/tags/<tag_id> \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' -d\n{\n   \"admin_id\": \"814860\"\n}\n
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"tag\",\n  \"id\": \"2084335\",\n  \"name\": \"Independent\"\n}\n
```

## Example Errors

```http
HTTP/1.1 404 NOT FOUND
{
  "type": "error.list",
  "request_id": "9a3d0816-9707-4598-977e-c009ba630148",
  "errors": [
    {
      "code": "not_found",
      "message": "Contact Not Found"
    }
  ]
}
```

```html
HTTP/1.1 404 NOT FOUND
{
  "type": "error.list",
  "request_id": "5f6b2623-f844-4914-8b8d-ac01acc62a76",
  "errors": [
    {
      "code": "not_found",
      "message": "Resource Not Found"
    }
  ]
}
```

```text
HTTP/1.1 404 BAD REQUEST
{
  "type": "error.list",
  "request_id": "5f6b2623-f844-4914-8b8d-ac01acc62a76",
  "errors": [
    {
      "code": "parameter_not_found",
      "message": "admin_id is a required parameter"
    }
  ]
}
```

You can untag a single conversation.

### Request Path Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the conversation which is given by Intercom |
| tag_id | String | Yes | The unique identifier for the tag which is given by Intercom. |


### Request Body Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| admin_id | String | Yes | The unique identifier for the admin (which is given by intercom) performing the untag action. |


### Response

This will return a [Tag model](/docs/references/2.2/rest-api/tags/tag-model) for the tag that was removed from the conversation.