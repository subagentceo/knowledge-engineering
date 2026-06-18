# Actions

## Introduction

Actions allow you to change the behavior of various flows within the WorkOS platform including user registration and authentication using your own custom logic.

When an action is configured for a particular request type, WorkOS synchronously calls the associated action endpoint and waits for a response that allows or denies the operation. When WorkOS calls an actions endpoint, the request includes contextual metadata such as the profile of the user performing the operation, the organization associated with the operation, or the IP address, all of which you can use for decisioning within the endpoint.

### Action types

WorkOS allows you to configure actions that execute during various user operations:

- **Authentication**: Authentication actions run after a user completes Email + Password, Magic Auth authentication, SSO, or Social Login and before they are redirected to your application.
- **User registration**: User registration actions run after a user attempts to register for your application using Email + Password, Magic Auth sign up, SSO, or Social Login and before they are provisioned.

## Configuring actions

To configure actions, you'll need to:

- Host an actions endpoint that receives requests from WorkOS
- Register your endpoints with WorkOS
- Implement the custom logic of your endpoint
- Test your endpoints

## Set up your endpoint

Create a public endpoint that WorkOS can make requests to. This endpoint should use HTTPS and should accept POST requests with the `workos-signature` header. This header is used for verifying the request's authenticity from WorkOS.

#### Next.js

#### Express

> WorkOS sends the header as `WorkOS-Signature`, but many web servers normalize HTTP request headers to their lowercase variants.

***

## Register your endpoint

Set the actions endpoint URL in the [WorkOS Dashboard](https://dashboard.workos.com/). Set *Enable action* and choose **Save changes**.

![WorkOS Dashboard Actions UI](https://images.workoscdn.com/images/84c8a62b-d8bc-4c46-8ccd-eda4c245645e.png?auto=format\&fit=clip\&q=80)

### Choosing error handling behavior

Each actions endpoint must specify its error handling behavior. By default, if there is an issue reaching your endpoint or validating the response, WorkOS will deny the operation. If this is not the desired behavior for your use case, you can choose a different behavior depending on the action endpoint type; for example, for authentication actions, you can choose *Allow authentication*.

***

## Implement your endpoint

Upon receiving a request, you should respond with an `HTTP 200 OK` as well as a valid response body to signal to WorkOS that the request was successfully handled.

### (A) Validate the requests using the SDK

Before processing the request payload, verify the request was sent by WorkOS and not an unknown party.

WorkOS includes a unique signature in each actions request that it sends, allowing you to verify the authenticity of the request. In order to verify this signature, you must obtain the secret that is generated for you when you set up your actions endpoint in the WorkOS dashboard. Ensure that this secret is stored securely on your actions endpoint server as an environment variable.

The SDKs provide a method to validate the timestamp and signature of an actions. Examples using these methods are included below. The parameters are the payload (raw request body), the request header, and the actions secret.

#### Next.js

#### Express

There is an optional parameter, tolerance, that sets the time validation for the actions request in seconds. The SDK methods have default values for tolerance, usually 3–5 minutes.

### (B) Validate the requests manually

If implementing actions request validation yourself, you'll need to use the following steps:

First, extract the timestamp and signature from the header. There are two values to parse from the `WorkOS-Signature` header, delimited by a `,` character.

| Key                | Value                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `issued_timestamp` | The number of milliseconds since the epoch time at which the event was issued, prefixed by `t=` |
| `signature_hash`   | The HMAC SHA256 hashed signature for the request, prefixed by `v1=`                             |

To avoid replay attacks, we suggest validating that the `issued_timestamp` does not differ too much from the current time.

Next, construct the expected signature. The expected signature is computed from the concatenation of:

1. `issued_timestamp`
2. The `.` character
3. The request's body as a utf-8 decoded string

Hash the string using HMAC SHA256, using the actions secret as the key. The expected signature will be the hex digest of the hash. Finally, compare signatures to make sure the actions request is valid.

Once you've determined the event request is validly signed, it's safe to use the event payload in your application's business logic.

### Create an IP allowlist

WorkOS sends actions requests from a fixed set of IP addresses. It's recommended to restrict access to your actions endpoint to only these IP addresses:

```plain title="WorkOS IP addresses"
3.217.146.166
23.21.184.92
34.204.154.149
44.213.245.178
44.215.236.82
50.16.203.9
52.1.251.34
52.21.49.187
174.129.36.47
```

***

## Build the endpoint response

The endpoint must respond with a signed JSON object indicating a `verdict` of `Allow` or `Deny` as well as an optional `error_message` in the event the `verdict` is `Deny`.

Based on the payload data received, you can determine whether to allow or deny the operation. Each action type receives a different payload model, so be sure to handle the appropriate data in your handler.

### (A) Respond using the SDK

The SDK provides a method to create the signed response.

#### Next.js

#### Express

### (B) Respond manually

If implementing the construction of the actions response yourself, you'll need to use the following steps:

First, store the current epoch timestamp to a variable.

Next, construct the JSON response. The JSON response must contain the following:

- `timestamp`: The epoch timestamp you recorded
- `verdict`: Indicates whether to allow or deny the action. Allowed values: `'Allow' | 'Deny' | 'allow' | 'deny'`
- `error_message`: An optional, 500 character maximum string. This should only be provided with a `verdict` of `deny` or `Deny`

Next, construct the signature. The expected signature is computed from the concatenation of:

1. The current epoch timestamp
2. The `.` character
3. The JSON response body as a utf-8 encoded string

Hash the string using HMAC SHA256, using the actions secret as the key. The expected signature will be the hex digest of the hash.

Finally, the endpoint should respond with a JSON object containing the following properties:

- `object`: `'authentication_action_response' | 'user_registration_action_response'`
- `payload`: The JSON response you formed above
- `signature` The hex digest of the hash you created above

## Test your endpoint

From the dashboard, you can send test actions after configuring an endpoint. Go to the actions *Test* tab and click the **Send test action** button.

![A screenshot showing how to send a test action in the WorkOS dashboard.](https://images.workoscdn.com/images/8d998ae0-2efa-435a-9818-6873fcdc73ac.png?auto=format\&fit=clip\&q=80)

If you would like to test against your local development environment, we recommend using a tool like [ngrok](https://ngrok.com) to create a secure tunnel to your local machine, and sending test webhooks to the public endpoint generated with ngrok. See our [blog post](https://workos.com/blog/test-workos-webhooks-locally-ngrok) to get more details on how you may want to test webhooks locally with ngrok.

***
