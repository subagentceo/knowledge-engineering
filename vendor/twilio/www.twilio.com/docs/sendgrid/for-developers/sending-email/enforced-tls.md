# Enforced TLS

The Enforced TLS settings specify whether or not the recipient is required to support TLS or have a valid certificate. The Enforced TLS endpoint supports retrieving and updating TLS settings.

> \[!CAUTION]
>
> If either `require_tls` or `require_valid_cert` is set to `true`, the recipient must support TLS 1.1 or higher or have a valid certificate. If these conditions are not met, we drop the message and send a block event with "TLS required but not supported" as the description.

## GET

Get the current Enforced TLS settings.

### Request URL

`GET https://api.sendgrid.com/v3/user/settings/enforced_tls HTTP/1.1`

### Response

```javascript
HTTP/1.1 200
{
    "require_tls": true,
    "require_valid_cert": false,
    "version": 1.1
}
```

## PATCH

Change the Enforced TLS settings

| URI Parameter        | Required | Requirements  | Description                                   |
| -------------------- | -------- | ------------- | --------------------------------------------- |
| require\_tls         | False    | true or false | Require recipient TLS support                 |
| require\_valid\_cert | False    | true or false | Require certificates to be valid              |
| version              | False    | 1.1, 1.2, 1.3 | The minimum required TLS certificate version. |

### Request URL

`PATCH https://api.sendgrid.com/v3/user/settings/enforced_tls HTTP/1.1`

### Request Body

```javascript
{
  "require_tls": true
}
```

### Response \[#response-2]

```javascript
HTTP/1.1 200
{
    "require_tls": true,
    "require_valid_cert": false,
    "version": 1.1
}
```
