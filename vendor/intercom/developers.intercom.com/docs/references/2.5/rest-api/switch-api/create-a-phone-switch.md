# Create a phone Switch

Example Request & Response

```curl
$ curl https://api.intercom.io/phone_call_redirects \\\n  -X POST \\\n  -H 'Authorization:Bearer <Your access token>' \\\n  -H 'Accept: application/json' \\\n  -H 'Content-Type: application/json' -d\n  \n  {\n    \"phone\": <End-user phone number>,\n    \"custom_attributes\": {\n      \"[KEY1]\": \"[VALUE1]\",\n      \"[KEY2]\": \"[VALUE2]\"\n    }\n  }
```

```http
HTTP/1.1 200 OK\n{\n  \"url\": \"<URL to the Messenger>\",\n  \"type\": \"phone_call_redirect\"\n}
```

Example Errors

```http
HTTP/1.1 422 \n{\n  \"error_key\": \"landline_phone\"\n}
```

```http
HTTP/1.1 400\n{\n  \"error_key\": \"invalid_phone_number\",\n  \"message\": \"Invalid phone number\"\n}
```

You can use the API to deflect phone calls to the Intercom Messenger. Calling this endpoint will send an SMS with a link to the Messenger to the phone number specified.
If custom attributes are specified, they will be added to the user or lead's custom data attributes.

## Request Body Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| phone | String | Yes | Phone number in E.164 format, that will receive the SMS to continue the conversation in the Messenger |
| custom_attributes | Object | no | Key-value pairs corresponding to custom data attributes that will be assigned to the user or lead. |