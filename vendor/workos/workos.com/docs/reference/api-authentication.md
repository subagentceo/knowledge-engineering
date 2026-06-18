# API authentication

WorkOS authenticates your API requests using your account's API keys. API requests made without authentication or using an incorrect key will return a `401` error. Requests using a valid key but with insufficient permissions will return a `403` error. All API requests must be made over HTTPS. Any requests made over plain HTTP will fail.

#### Using an API key

You can view and manage your API keys in the [WorkOS Dashboard](https://dashboard.workos.com/api-keys).

## Secure your API Keys

API keys can perform any API request to WorkOS. They should be kept secure and private! Be sure to prevent API keys from being made publicly accessible, such as in client-side code, GitHub, unsecured S3 buckets, and so forth. API keys are prefixed with `sk_`.

## In Staging

Your Staging Environment comes with an API key already generated for you. Staging API keys may be viewed as often as they are needed and will appear inline throughout our documentation in code examples if you are logged in to your WorkOS account. API requests will be scoped to the provided key's Environment.

## In Production

Once you unlock Production access you will need to generate an API Key for it. Production API keys may only be viewed once and will need to be saved in a secure location upon creation of them.