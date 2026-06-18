# Get Started with Public Key Client Validation

> \[!NOTE]
>
> Public Key Client Validation is available to Twilio Enterprise Edition and Twilio Security Edition customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

Public Key Client Validation helps organizations in compliance-heavy industries meet strict security requirements, such as not relying on shared secrets, validating senders, and verifying message content.

## Take full control of your secrets

For organizations under strict compliance requirements, relying on shared secrets may not meet required security protocols. With Public Key Client Validation enabled you'll be the only one who knows the Secret, which means the Auth Token — a shared secret — will be rendered invalid for REST requests.

By using Public Key Client Validation, you'll also be able to rotate your keys and stay in full control of your credentials.

## Client and message validation

When you send a request with Public Key Client Validation, Twilio validates:

* That the request comes from a sender who is in control of the private key.
* That the message has not been modified in transit.

## How to use Public Key Client Validation

The [Public Key Client Validation Quickstart](/docs/iam/pkcv/quickstart) will provide you with additional details on how the feature works.

> \[!WARNING]
>
> Public Key Client Validation isn't supported for Flex, Studio, or TaskRouter. If you use any of these products, Public Key Client Validation can't be enforced.
