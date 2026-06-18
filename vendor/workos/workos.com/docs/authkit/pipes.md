# Pipes

## Introduction

Pipes allows your users to securely connect their third-party accounts to your
application. With Pipes, you can easily integrate with popular services like
GitHub, Slack, Google, Salesforce, and many more without managing OAuth flows,
token refresh logic, or credential storage.

## Configuring providers

To make an provider available to your users, you will need to configure it in
the WorkOS Dashboard.

Visit the *Pipes* section of the WorkOS Dashboard to get started. Click *Connect
provider* then choose the provider from the list. If you don't see the provider
you need, please reach out to [our team](mailto:support@workos.com).

### Custom Credentials

Configure the provider with your own OAuth credentials:

1. **Create an OAuth application** within the provider's dashboard.
   1. You can find instructions on setting up the provider in the documentation section of the setup modal.
2. Use the provided **redirect URI** when configuring the provider.
3. Set the **client ID and secret** from the provider.
4. Specify the required **scopes** for your application.
   1. You may need to set these scopes in the provider configuration as well.
5. Provide an optional **description**. This will be used in the widget to inform users
   on how your application will use their data from the provider.

Commonly used scopes are provided in-line, but you should consult each provider's documentation for the full list of available scopes.

## Provider management in your application

The [Pipes Widget](https://workos.com/docs/widgets/pipes) provides a pre-built UI for users to connect
and manage their connected accounts. The widget shows the user which
providers are available, and lets them easily initiate the authorization
flow. It communicates with the WorkOS API and stores the connection information
for the user. If there's ever a problem with the user's access token, the widget
will let them know they need to reauthorize.

![Pipes widget screenshot](https://images.workoscdn.com/images/e84a33bb-0510-4d85-9041-33b1a0ce938c.png?auto=format\&fit=clip\&q=50)

> The description in the widget is set in the provider's configuration in the WorkOS Dashboard.

## Fetching access tokens

Once a user has connected a provider, you can [fetch access tokens](https://workos.com/docs/reference/pipes) from your
backend to make API calls to the connected service on their behalf. Pipes takes
care of refreshing the token if needed, so you'll always have a fresh token. If
there's a problem with the token, the endpoint will return information about the issue so you can
direct the user to the correct it. This may require sending the user to re-authorize directly
or via the page with the Pipes widget.
