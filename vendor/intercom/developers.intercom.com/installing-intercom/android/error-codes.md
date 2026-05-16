# Error Codes

Starting from version 12.1.0 of our Android SDK, we have introduced new error codes to give you some context around why an API call may be failing.

## List of error codes

| Error Code | Error Message | Description |
|  --- | --- | --- |
| 1001 | ERROR - [HTTP 4xx] - *server error message* | Here, you will get back an HTTP error code and the error message that the server has returned. |
| 3002 | ERROR - Failed to register user. We already have a registered user. If you are attempting to register a new user, call logout() before this. | Register user was called when another user is already registered. |