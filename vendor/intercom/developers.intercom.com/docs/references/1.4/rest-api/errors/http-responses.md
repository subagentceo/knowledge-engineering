# HTTP Responses

The API returns HTTP responses on each request to indicate the success or otherwise of API requests. The codes listed below are often used, and the API may use others. Note that 4xx and 5xx responses may be returned for any request and clients should cater for them.

| Response Code | Description |
|  --- | --- |
| 400 | Bad Request -- General client error, possibly malformed data. |
| 401 | Unauthorized -- The API Key was not authorised (or no API Key was found). |
| 402 | Payment Required -- The API is not available on your current plan. |
| 403 | Forbidden -- The request is not allowed. |
| 404 | Not Found -- The resource was not found. |
| 405 | Method Not Allowed -- The resource does not accept the HTTP method. |
| 406 | Not Acceptable -- The resource cannot return the client's required content type. |
| 408 | Request Timeout -- The server would not wait any longer for the client. |
| 409 | Conflict - Multiple existing users match this email address - must be more specific using user_id |
| 415 | Unsupported Media Type - The server doesn't accept the submitted content-type. |
| 422 | Unprocessable Entity -- The data was well-formed but invalid. |
| 429 | Too Many Requests -- The client has reached or exceeded a rate limit, or the server is overloaded. |
| 500, 502, 503, 504 | Server errors - something went wrong with Intercom's servers. These responses are most likely momentary operational errors (e.g. temporary unavailability), and, as a result, requests should be retried once. |