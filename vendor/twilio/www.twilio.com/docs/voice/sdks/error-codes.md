# Voice SDK Error Codes

The majority of Programmable Voice error codes are five-digit integers that start in the 31000 range.

For details about an error code, its possible causes, and recommended solutions, see the full [Error and Warning Dictionary](/docs/api/errors).

> \[!NOTE]
>
> The JavaScript SDK emits errors that include a `twilioError` field.
>
> This field contains a `TwilioError` object, which is the default error format in the SDK.

## Common errors

### 310xx series: general errors

| Code                            | Description                                                                                                                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [31000](/docs/api/errors/31000) | General Twilio Voice SDK error. Additional information might be available in the debugger. The `twilioError` field (JavaScript SDK only) can also provide more context.                                                                                    |
| [31001](/docs/api/errors/31001) | TwiML application not found.                                                                                                                                                                                                                               |
| [31002](/docs/api/errors/31002) | Connection declined. Check the debugger for details about the underlying cause.                                                                                                                                                                            |
| [31003](/docs/api/errors/31003) | Connection timed out.                                                                                                                                                                                                                                      |
| [31005](/docs/api/errors/31005) | The WebSocket connection to Twilio signaling servers was unexpectedly closed. If this issue occurs consistently, verify that the provided hostname resolves correctly. If you specify a region during `Device` setup, make sure the region value is valid. |
| [31009](/docs/api/errors/31009) | No transport is available to send or receive messages.                                                                                                                                                                                                     |

### 311xx series: malformed requests

| Code                            | Description                                                                                                                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [31100](/docs/api/errors/31100) | Generic malformed request.                                                                                                                                                                                                                                 |
| [31101](/docs/api/errors/31101) | The request is missing the parameter array.                                                                                                                                                                                                                |
| [31102](/docs/api/errors/31102) | Authorization token is missing from the request.                                                                                                                                                                                                           |
| [31103](/docs/api/errors/31103) | The total length of parameters exceeds *MAX\_PARAM\_LENGTH*.                                                                                                                                                                                               |
| [31104](/docs/api/errors/31104) | Invalid bridge token.                                                                                                                                                                                                                                      |
| [31105](/docs/api/errors/31105) | Invalid client name (identity). The value provided in the AccessToken can include only alphanumeric and underscore characters. Using any other character, including spaces, results in unexpected behavior. The maximum identity length is 256 characters. |

### 312xx series: authorization errors

| Code                            | Description                                |
| ------------------------------- | ------------------------------------------ |
| [31201](/docs/api/errors/31201) | Unknown authorization error.               |
| [31202](/docs/api/errors/31202) | JWT signature validation failed.           |
| [31203](/docs/api/errors/31203) | Invalid or inactive account.               |
| [31204](/docs/api/errors/31204) | Invalid JWT token.                         |
| [31205](/docs/api/errors/31205) | JWT token has expired.                     |
| [31206](/docs/api/errors/31206) | Request rate exceeds the authorized limit. |
| [31207](/docs/api/errors/31207) | JWT token expiration interval is too long. |
| [31208](/docs/api/errors/31208) | User denied microphone access.             |

### 53xxx series: signaling errors

| Code                            | Description                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------- |
| [53000](/docs/api/errors/53000) | Signaling connection error: the WebSocket timed out during pre-flight.       |
| [53405](/docs/api/errors/53405) | Media connection failed or media activity ceased: the ICE connection failed. |
