# Errors

Stripe uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the `5xx` range indicate an error with Stripe’s servers (these are rare).

Some `4xx` errors that could be handled programmatically (e.g., a card is [declined](https://docs.stripe.com/declines.md)) include an [error code](https://docs.stripe.com/error-codes.md) that briefly explains the error reported.

## Attributes

- `advice_code` (string, nullable)
  For card errors resulting from a card issuer decline, a short string indicating [how to proceed with an error](https://docs.stripe.com/docs/declines.md#retrying-issuer-declines) if they provide one.

- `charge` (string, nullable)
  For card errors, the ID of the failed charge.

- `code` (string, nullable)
  For some errors that could be handled programmatically, a short string indicating the [error code](https://docs.stripe.com/docs/error-codes.md) reported.

- `decline_code` (string, nullable)
  For card errors resulting from a card issuer decline, a short string indicating the [card issuer’s reason for the decline](https://docs.stripe.com/docs/declines.md#issuer-declines) if they provide one.

- `doc_url` (string, nullable)
  A URL to more information about the [error code](https://docs.stripe.com/docs/error-codes.md) reported.

- `message` (string, nullable)
  A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.

- `network_advice_code` (string, nullable)
  For card errors resulting from a card issuer decline, a 2 digit code which indicates the advice given to merchant by the card network on how to proceed with an error.

- `network_decline_code` (string, nullable)
  For payments declined by the network, an alphanumeric code which indicates the reason the payment failed.

- `param` (string, nullable)
  If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.

- `payment_intent` (object, nullable)
  The [PaymentIntent object](https://docs.stripe.com/docs/api/payment_intents/object.md) for errors returned on a request involving a PaymentIntent.

- `payment_method` (object, nullable)
  The [PaymentMethod object](https://docs.stripe.com/docs/api/payment_methods/object.md) for errors returned on a request involving a PaymentMethod.

- `payment_method_type` (string, nullable)
  If the error is specific to the type of payment method, the payment method type that had a problem. This field is only populated for invoice-related errors.

- `request_log_url` (string, nullable)
  A URL to the request log entry in your dashboard.

- `setup_intent` (object, nullable)
  The [SetupIntent object](https://docs.stripe.com/docs/api/setup_intents/object.md) for errors returned on a request involving a SetupIntent.

- `source` (object, nullable)
  The [source object](https://docs.stripe.com/docs/api/sources/object.md) for errors returned on a request involving a source.

- `type` (enum)
  The type of error returned. One of `api_error`, `card_error`, `idempotency_error`, or `invalid_request_error`
Possible enum values:
  - `api_error`
  - `card_error`
  - `idempotency_error`
  - `invalid_request_error`

### HTTP Status Code Summary

| 200                | OK                         | Everything worked as expected.                                                                   |
| ------------------ | -------------------------- | ------------------------------------------------------------------------------------------------ |
| 400                | Bad Request                | The request was unacceptable, often due to missing a required parameter.                         |
| 401                | Unauthorized               | No valid API key provided.                                                                       |
| 402                | Request Failed             | The parameters were valid but the request failed.                                                |
| 403                | Forbidden                  | The API key doesn’t have permissions to perform the request.                                     |
| 404                | Not Found                  | The requested resource doesn’t exist.                                                            |
| 409                | Conflict                   | The request conflicts with another request (perhaps due to using the same idempotent key).       |
| 424                | External Dependency Failed | The request couldn’t be completed due to a failure in a dependency external to Stripe.           |
| 429                | Too Many Requests          | Too many requests hit the API too quickly. We recommend an exponential backoff of your requests. |
| 500, 502, 503, 504 | Server Errors              | Something went wrong on Stripe’s end. (These are rare.)                                          |

### Error Types

| `api_error`             | API errors cover any other type of problem (e.g., a temporary problem with Stripe’s servers), and are extremely uncommon.                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card_error`            | Card errors are the most common type of error you should expect to handle. They result when the user enters a card that can’t be charged for some reason. |
| `idempotency_error`     | Idempotency errors occur when an `Idempotency-Key` is re-used on a request that does not match the first request’s API endpoint and parameters.           |
| `invalid_request_error` | Invalid request errors arise when your request has invalid parameters.                                                                                    |
