# Errors

WorkOS uses standard HTTP response codes to indicate the success or failure of your API requests.

200
: Successful request.

400
: The request was not acceptable. Check that the parameters were correct.

401
: The API key used was invalid.

403
: The API key used did not have the correct permissions.

404
: The resource was not found.

422
: Validation failed for the request. Check that the parameters were correct.

429
: Too many requests. Refer to the [Rate Limits](https://workos.com/docs/reference/rate-limits) section.

5xx
: Indicates an error with WorkOS servers.