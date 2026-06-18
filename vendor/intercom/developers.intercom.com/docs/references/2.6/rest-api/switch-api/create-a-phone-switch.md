# Create a phone Switch

## Example Request & Response

```curl
$ curl https://api.intercom.io/phone_call_redirects \
  -X POST \
  -H 'Authorization:Bearer <Your access token>' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' -d

  {
    "phone": <End-user phone number>,
    "custom_attributes": {
      "[KEY1]": "[VALUE1]",
      "[KEY2]": "[VALUE2]"
    }
  }
```

```http
HTTP/1.1 200 OK
{
  "url": "<URL to the Messenger>",
  "type": "phone_call_redirect"
}
```

## Example Errors

```http
HTTP/1.1 422
{
  "error_key": "landline_phone"
}
```

```http
HTTP/1.1 400
{
  "error_key": "invalid_phone_number",
  "message": "Invalid phone number"
}
```

You can use the API to deflect phone calls to the Intercom Messenger. Calling this endpoint will send an SMS with a link to the Messenger to the phone number specified.
If custom attributes are specified, they will be added to the user or lead's custom data attributes.

## Request Body Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| phone | String | Yes | Phone number in E.164 format, that will receive the SMS to continue the conversation in the Messenger |
| custom_attributes | Object | no | Key-value pairs corresponding to custom data attributes that will be assigned to the user or lead. |