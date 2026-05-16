# Error Codes

Starting from version 12.1.0 of our iOS SDK, we have introduced new error codes to give you some context around why an API call may be failing.

## List of error codes

| Error Code | Error Message | Description |
|  --- | --- | --- |
| [HTML Error Code] e.g. 401 | ERROR - [HTTP 4xx] - *server error message* | Here, you will get back an HTTP error code and the error message that the server has returned. |
| 2001 | ERROR - Failed to register user - the 'userId' or 'email' property of 'userAttributes' must be populated as a string | Error caused when an invalid userId or email is passed to a login user call |
| 3001 | ERROR - Failed to update user - the update object must be not nil and of type `ICMUserAttributes` | Incorrect instance or nil object passed to the update user call |
| 4001 | ERROR - Failed to register a device token - push notifications are not enabled on the host device | The host device does not have push notification permissions granted |
| 4002 | ERROR - Failed to register a device token - device token is nil | Device token passed to function is nil |
| 4003 | ERROR - Failed to register a device token - identity verification is not setup correctly | Identity verification is not setup for the user |
| 4004 | ERROR - Failed to register a device token - device token is invalid | Attempted to register device with an invalid device token |