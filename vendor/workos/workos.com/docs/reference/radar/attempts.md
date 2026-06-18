# Attempts

A Radar attempt represents a sign-in or signup attempt and includes context such as IP address and user agent. The Radar engine assesses attempts for risk and returns a decision that you can use to drive behavior in your application.

## Create an attempt

Assess a request for risk using the Radar engine and receive a verdict.

#### Request

#### Response

## Update a Radar attempt

You may optionally inform Radar that an authentication attempt or challenge was successful using this endpoint. Some Radar controls depend on tracking recent successful attempts, such as impossible travel.

#### Request

### /radar/attempts

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip_address` | string | Yes | The IP address of the client |
| `user_agent` | string | Yes | The user agent of the client |
| `email` | string | Yes | The email address of the user making the attempt |
| `auth_method` | "Password" \| "Passkey" \| "Authenticator" \| ... | Yes | The authentication method used for the attempt Possible values: `Password` `Passkey` `Authenticator` `SMS_OTP` `Email_OTP` `Social` `SSO` `Other` |
| `action` | "sign-up" \| "sign-in" | Yes | The action of the attempt. `sign-up` or `sign-in` |

### PUT /radar/attempts/{id}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The ID of the Radar attempt |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |