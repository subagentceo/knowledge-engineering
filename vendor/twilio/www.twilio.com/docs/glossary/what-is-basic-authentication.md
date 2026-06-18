# Basic Authentication

Basic Authentication is a method for an HTTP user agent (e.g., a web browser) to provide a username and password when making a request.

When employing Basic Authentication, users include an encoded string in the [Authorization header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) of each request they make. The string is used by the request's recipient to verify users' identity and rights to access a resource.

The Authorization header follows this format:

```bash
Authorization: Basic <credentials>
```

We then construct the `credentials` like this:

1. The user's username and password are combined with a colon.
2. The resulting string is [base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoded.

So if your username and password are `twilio` and `ahoy!`, the combination is `twilio:ahoy!`, and when base64 encoded, this becomes `dHdpbGlvOmFob3kh`. So requests made by this user would be sent with the following header:

```bash
Authorization: Basic dHdpbGlvOmFob3kh
```

When your server or [Twilio Function](/docs/serverless/functions-assets/functions) receives this request, it can access the Authorization header, decode the credentials, and look up the user to determine if they should be allowed access to the requested resource.
