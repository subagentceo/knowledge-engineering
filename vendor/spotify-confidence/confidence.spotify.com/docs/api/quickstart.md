> ## Documentation Index
> Fetch the complete documentation index at: https://confidence-auth-testing.mintlify.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Get Started with Confidence APIs

> This tutorial helps you make your first Confidence API call by retrieving a list of existing feature flags.

The steps to take are the following:

1. Create an API client if you haven't done so
2. Request an access token
3. Use the access token to request a list of flags

## Before You Begin

* This tutorial assumes you have a Confidence account.
* Use cURL to make API calls. You can install cURL using the
  package manager of your choice.

## Create an API Client

An API client provides a client ID and client secret needed to request an
access token by implementing any of the authorization flows.

<Steps>
  <Step title="Go to Confidence" />

  <Step title="Navigate to API Clients">
    On the bottom of the left sidebar, select **Admin > API Clients**.
  </Step>

  <Step title="Click Create" />

  <Step title="Enter display name">
    Enter `API client` as the **Display name**.
  </Step>

  <Step title="Click Save" />
</Steps>

## Request an Access Token

The access token is a string which has the credentials and permissions
that you can use to access a given resource (for example, flags, events, and metrics).

To request the access token you first need your client ID and client secret:

<Steps>
  <Step title="Go to Confidence" />

  <Step title="Navigate to API Clients">
    On the bottom of the left sidebar, select **Admin > API Clients**.
  </Step>

  <Step title="Select the API client">
    Select the API client you just created. You find the client ID immediately on the page. The client secret is available behind the **View client secret** link.
  </Step>
</Steps>

With the credentials in hand, you are ready to request an access token. This
tutorial uses the client credentials flow, so you must:

<Steps>
  <Step title="Send a POST request to the token endpoint URL" />

  <Step title="Add the Content-Type header">
    Set to the `application/json` value.
  </Step>

  <Step title="Add the HTTP body">
    Include the `clientId` and `clientSecret`, along with the `grantType` parameter set to `client_credentials`.
  </Step>
</Steps>

```bash Request theme={null}
curl -X POST "https://iam.confidence.dev/v1/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{
    "grantType": "client_credentials",
    "clientId": "clientId",
    "clientSecret": "clientSecret"
  }'
```

The response returns an access token valid for 1 hour:

```json Response theme={null}
{
  "accessToken": "eyJraWQiOi...zWyvwvtz_oEU1x",
  "expiresIn": "86400"
}
```

## Example: Request a List of Flags

For this example, use the list flags endpoint in the Flags API to
request information about existing feature flags.

Your API call must include the access token you have just generated using the
`Authorization` header as follows:

```bash Request theme={null}
curl -X GET "https://flags.confidence.dev/v1/flags" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

The API returns the following JSON response:

```json Response theme={null}
{
  "flags": [...]
}
```

Congratulations! You made your first API call to Confidence. Since you probably
have not created any flags yet, the response is empty.

## Summary

The Confidence platform provides different APIs depending on the functionality
you want to access. The API calls must include the Authorization header along
with a valid access token.

This tutorial makes use of the client credentials grant type to retrieve the
access token. That works fine in scenarios where you control the API call to
Confidence, for example where your backend is connecting to the API. It does
not work in cases where your app connects on behalf of a specific user, for
example when getting private playlist or profile data.

## What's Next?

* The tutorial used the Flags API to retrieve a list of flags. An interesting
  exercise would be to extend the example by trying to create a flag. Do you
  accept the challenge?

* The [API basics](./api-basics) page provides more information on how
  to work with Confidence platform APIs.
