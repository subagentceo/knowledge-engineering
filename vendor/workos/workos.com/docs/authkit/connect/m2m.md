# M2M Applications

## Overview

Machine-to-machine (M2M) applications are designed for use-cases where clients are other services, such as one of your customer's applications. M2M applications use the underlying `client_credentials` flow for authentication.

M2M access tokens will contain an `org_id` claim which represents the third-party you are granting access to via the M2M application.

> M2M applications can only be configured as third-party.

M2M applications are one of two ways WorkOS enables you to issue credentials to your customers that they use to programmatically access your application. The other is [API keys](https://workos.com/docs/authkit/api-keys). The [API Keys vs M2M Applications guide](https://workos.com/blog/api-keys-vs-m2m-applications) can help you decide which is best for your use case.

## Common Use Cases

M2M applications are commonly used to provide API access credentials to customers or partners, allowing them to programmatically access your APIs and integrate your services into their applications. They're also ideal for partner integrations that run server-to-server without user interaction, where you need to track and control access on a per-organization basis.

## Receiving Tokens

Machine-to-machine applications can use the `client_credentials` grant type with the [Token Endpoint](https://workos.com/docs/reference/workos-connect/token) to obtain an `access_token` to authenticate calls to your API.

#### Obtain access token

## Organization-Based Access Control

M2M applications are always associated with a specific [Organization](https://workos.com/docs/reference/organization), which represents the customer or partner. Since machine-to-machine applications are associated with a particular organization, issued access tokens contain an `org_id` claim that your application's API can use to control access.

This association provides several benefits:

1. **Scoped Access**: Access tokens contain an `org_id` claim that identifies which organization the client is acting on behalf of
2. **Resource Isolation**: Your API can use the `org_id` to ensure clients only access resources they're authorized for
3. **Audit Trail**: All API calls can be attributed to a specific organization for auditing purposes

## Verifying Tokens

Your application can verify the tokens sent by external M2M applications for the purpose of authenticating requests using the JWKS for your environment. The process is similar to validating the access token JWT provided by an AuthKit login.

#### M2M

In addition to fast stateless verification, you can use the [Token Introspection API](https://workos.com/docs/reference/workos-connect/introspection) to synchronously check whether a token is still valid.

## Configuration

M2M applications require the following configuration:

### Credentials

M2M applications use the `client_id` and `client_secret` from a credential to authenticate to the [Connect APIs](https://workos.com/docs/reference/workos-connect) using the client credentials flow.

### Name and Description

While not displayed to users (since M2M apps don't have user interaction), the name and description help you manage and identify different M2M applications in your dashboard.

## Next Steps

- [Connect API Reference](https://workos.com/docs/reference/workos-connect) - Complete API documentation
