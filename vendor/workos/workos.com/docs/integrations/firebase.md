# Firebase

## Introduction

In this guide, you'll learn how to use WorkOS to add Single Sign-On (SSO) to a Firebase application. This will allow users to sign in to an existing Firebase application using WorkOS SSO Connections.

## What WorkOS provides

WorkOS will provide the following pieces of information: API key, Client ID, and the Issuer URL.

- The API key can be found in your WorkOS dashboard under **API Keys**.
- The Client ID can be found in your WorkOS dashboard under **Configuration**.
- The Issuer URL is constructed with the Client ID. `https://auth.workos.com/sso/<client_id>`.

## What you'll need

- An existing Firebase project

***

## (1) Configure Authentication for your Firebase project

Log into Firebase and navigate to your project. Click on the Authentication tile to set up a new Authentication method for your project.

![A screenshot showing where to find the Authentication tile in Firebase.](https://images.workoscdn.com/images/612ce59a-a1c8-4eb9-a209-9d0f6b6c5086.png?auto=format\&fit=clip\&q=50)

Next, click **Get started**.

![A screenshot showing where to find the Get started button in Firebase](https://images.workoscdn.com/images/bd877730-1e9a-487d-8938-10782c912d45.png?auto=format\&fit=clip\&q=50)

Click on the Sign-in method tab and then select the OpenID Connect custom provider.

![A screenshot showing where to find the OpenID Connect custom provider in Firebase](https://images.workoscdn.com/images/ee3fbc76-d94b-491e-842a-5f74eb4a2d62.png?auto=format\&fit=clip\&q=50)

Enter the configuration details for the connection between WorkOS and Firebase.

You will need the following pieces of information:

- **WorkOS Client ID**: Found on the **Configuration** tab of the WorkOS Dashboard
- **WorkOS API Key**: Located on the **API Keys** tab of the WorkOS Dashboard
- **Issuer (URL)**: This will be `https://auth.workos.com/sso/` appended with your client ID, ex: `https://auth.workos.com/sso/client_123`
- **Provider ID**: This is found in Firebase under the Name of your OIDC provider. This will be important for a later step.

![A screenshot showing the authentication provider configuration details in Firebase](https://images.workoscdn.com/images/5eb66fe3-8cad-4555-9417-ab38924d1288.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure the Redirect URI in WorkOS

Click Next, then copy the **Callback URL** provided by Firebase.

![A screenshot showing where to obtain the Callback URL in Firebase.](https://images.workoscdn.com/images/a33d3b63-e6f9-4a43-8108-012f54d7c7db.png?auto=format\&fit=clip\&q=50)

In the [Applications](https://dashboard.workos.com/environment/applications) section of the WorkOS Dashboard, open your application and go to the **Redirects** tab. Paste the Callback URL in the redirect URIs list.

![A screenshot showing where to enter the Redirect URI in WorkOS.](https://images.workoscdn.com/images/c2c6ef52-e61e-41af-9c37-1e2187bf1744.png?auto=format\&fit=clip\&q=50)

***

## (3) Create a Firebase web app and get configuration details

On the Firebase Project Overview page, click the web icon above **Add an app to get started**, or navigate to your project settings page if your project is already set up.

![A screenshot showing where to create a web app in Firebase.](https://images.workoscdn.com/images/777e0c57-2c9d-4516-9e3e-985460ed38b6.png?auto=format\&fit=clip\&q=50)

Choose a name for your application, and then take note of the firebaseConfig from the Add Firebase SDK step.

![A screenshot showing where to obtain the firebaseConfig details in Firebase.](https://images.workoscdn.com/images/64b62bc6-4891-4627-9a2a-9440e0d27aa7.png?auto=format\&fit=clip\&q=50)

***

## (4) Configure Firebase login in your application

Your Firebase configuration and Provider ID can now be used along with any Organization ID from an Active WorkOS SSO connection to log users in to your Firebase app. Here is a basic example showing how this can be set up.

Replace the `firebaseConfig` variable value with the config from your Firebase app, the `OAuthProvider` value with your Provider ID, and the organization under `provider.setCustomParameters` with the organization to target. This organization should have an active SSO connection already set up.

> The `connection` parameter may be used in place of the `organization` parameter to target a connection.

Finally, run the app and click the sign-in button.

#### Update Firebase Profile

You will now see the user signed in on the Authentication section's user tab in Firebase. You can also view the user information by decoding the access token which is logged to the console.

![A screenshot showing a successfully authenticated user in Firebase.](https://images.workoscdn.com/images/a4d521f9-3765-4d2d-909c-5340a462ba3e.png?auto=format\&fit=clip\&q=50)
