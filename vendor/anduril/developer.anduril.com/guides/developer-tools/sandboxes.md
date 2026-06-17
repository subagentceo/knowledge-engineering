> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Lattice Sandboxes

Lattice Sandboxes is a secure, isolated platform for creating environments with simulated data to develop and
test your Lattice SDK app. Apps developed on Sandboxes are portable and can be used in other Lattice
deployments based on your environment requirements.

Lattice Sandboxes environments are provided free of charge.
You can make an unlimited number of free API calls to your
environment to create, stream, and task entities in Lattice.

## Before you begin

* If you don't have access to Lattice Sandboxes, [request to join the Lattice SDK developer program](https://dashboard.developer.anduril.com).

## Sign in

Anduril uses Okta to authenticate access to Lattice Sandboxes. Multi-factor authentication (MFA)
is satisfied with a passkey, such as a browser passkey, operating system biometrics, or a physical FIDO/UBI security key.

Use Chrome or a Chromium-based browser, such as Microsoft Edge or Brave, to access the Lattice Sandboxes developer portal.
Firefox is not supported and will prevent you from completing the sign-in procedure.

If this is your first time signing in, activate your Okta account and register a passkey:

Open the welcome email and choose the&#x20;

**Activate Okta Account**

&#x20;link.
The link expires seven days after the email is sent.

On the&#x20;

**Set up security methods**

&#x20;page, next to&#x20;

**Password**

,
choose&#x20;

**Set up**

, then choose and confirm a password.

Next to **Security Key or Biometric Authenticator**, choose **Set up**,
then register one of the following passkey options:

* **Browser passkey** — Stored by your browser's password manager so that you can sign in from any device signed in to the same browser profile.
* **Operating system biometrics** — Uses Touch ID, Face ID, Windows Hello, or another built-in platform authenticator bound to the current device.
* **Physical FIDO or UBI key** — Uses a hardware token such as a YubiKey, which you can carry with you between devices.

To sign in after activation, do the following:

Open the [Lattice Sandboxes sign-in page](https://login.developer.anduril.com).

For&#x20;

**Username**

, enter the email address that you used to request access to the Lattice Developer program.

For&#x20;

**Password**

, enter the password you created during activation.

Complete the passkey challenge using the authenticator method you registered.
On success, Okta redirects you to the Lattice Sandboxes dashboard.

To manage your passkeys and password, visit `https://login.developer.anduril.com/account-settings/home`.
If you lose access to your passkey, reach out to `lattice-developers@anduril.com` for assistance.

After logging in, the dashboard displays all existing environments associated with your account
and the status of each environment.

## Create an environment

To create a new environment, open the [Environment Catalog](https://sandboxes.developer.anduril.com/environment-catalog),
the do the following:

Choose **New Environment**.

<img src="/_files/anduril.docs.buildwithfern.com/50acdfa5596cba9813763367a61c168ee58a82776b25d4ac1fafda0053e9d5ac/assets/images/screenshots/environments-list-null.png" alt="Shows an empty list of environments" />

On the **Environment Catalog** page, choose **Lattice** and click **Create**. You'll be redirected to the environment
creation details page, where you see the status of your environment:

<img src="/_files/anduril.docs.buildwithfern.com/50b68edbbda8e34fb5b1e6c4fd0db6e979e833aaacd497b965af21c3b7a7a11f/assets/images/screenshots/environment-details.png" alt="Shows the environment details page" />

Once the state changes to **Ready**, review the following details:

Use this to launch the Lattice UI or connect to Lattice programmatically.

Use the client ID to authorize your integration with the Lattice SDK.

Use the client secret to authenticate your integration with the Lattice SDK.

The user name you use to log in to the Lattice UI.

The password you use to log in to the Lattice UI.

This is your **environment token**. Save this token in addition to the
[Sandboxes token](/guides/developer-tools/sandboxes#set-up-credentials), to authenticate your requests with the Lattice API.

Confirm you have access to your environment by clicking the Lattice URL link, then log in using the provided user name and password.

* Create up to **2** concurrent environments in Sandboxes.
* Environments have a maximum lifetime of **12 hours**.
* Environments have a maximum idle lifetime of **2** hours. You must make a
  network call, or sign in to the Lattice UI to keep your environment active.
* Access tokens obtained using client credentials have a lifetime of 30 minutes.

## Set up credentials

To query your Sandboxes environment, you will need:

* **Sandboxes token** (`anduril-sandbox-authorization` header) -- This is your account-level authorization token.
  Create this token once, then use it to access all of your environments.
* **Lattice Client ID** -- This is the credential your integration will use for authorization with the environment.
  The Client ID is automatically generated when [creating a new environment](/guides/developer-tools/sandboxes#create-an-environment).
* **Lattice Client Secret** -- This is the credential your integration will use for authentication with the environment.
  The Client Secret is automatically generated when [creating a new environment](/guides/developer-tools/sandboxes#create-an-environment).

All credentials are required at runtime to interact with Lattice Sandboxes.
The **Sandboxes Proxy** verifies your Sandboxes token, then forwards the request to your environment.

<img src="/_files/anduril.docs.buildwithfern.com/aff262eaf9f72a8e3e87f59fd6d5db7d5e948bd30bc3e0483a98e22f6d6c61fa/assets/images/diagrams/authorization-flow.png" alt="Diagram showing the authorization flow for Lattice Sandboxes." />

<hr />

To create a new Sandboxes token, do the following:

Open the [Account & Security](https://sandboxes.developer.anduril.com/user-settings) page in Sandboxes portal, not the Lattice environment. This token can be used for all environments for the life of the token.

In the **Bearer tokens** section, click **+ New Token**:

<img
  src="/_files/anduril.docs.buildwithfern.com/f9fc9ebcfe81ab1f18459a58d0e220ae9f3af95240b817d8b02166f1a897a27e/assets/images/screenshots/bearer-token.png"
  alt="Shows the Account & Security page where you can create, and manage, your
authorization tokens."
/>

On the **Create Bearer Token** modal, enter the following:

* **Bearer token name** -- Enter a descriptive name for your Sandboxes token.
* **Bearer token expiration** -- Select an expiration time frame.

Click **Create** to generate a Sandboxes token, then save your Sandboxes token.

After this step, the Sandboxes token will not be visible again.

To authenticate API requests to your Sandboxes environment, you will need to obtain an access token using the **Lattice Client ID** and **Lattice Client Secret**.

If your environment page doesn't display a **Lattice Client ID** or **Lattice Client Secret**, under "Resource Credentials", contact your Anduril representative.

Send a `POST` request with the `client_id` and `client_secret` to the `/api/v1/oauth/token` endpoint.

```
curl --request POST "https://$LATTICE_ENDPOINT/api/v1/oauth/token" \
        --header "Anduril-Sandbox-Authorization: Bearer $SANDBOXES_TOKEN" \
        --header "Content-Type: application/x-www-form-urlencoded" \
        --data-urlencode "grant_type=client_credentials" \
        --data-urlencode "client_id=$LATTICE_CLIENT_ID" \
        --data-urlencode "client_secret=$LATTICE_CLIENT_SECRET" 

```

If the request is successful, you will receive a <code>**200**</code> status response. The body will contain the following data:

```json
{
    "access_token" : "*****",
    "expires_in" : 1800,        // seconds
    "scope": "lattice"
}
```

Export the `access_token` as an environment variable.

```
export ENVIRONMENT_TOKEN="*****" 
```

You can now use the `access_token` as the Authorization token to interact with Lattice.

```
curl -X GET https://$LATTICE_ENDPOINT/api/v1/objects \
     -H "Authorization: Bearer $ENVIRONMENT_TOKEN" \
     -H "Anduril-Sandbox-Authorization: Bearer $SANDBOXES_TOKEN"        
```

The `access_token` returned will only be valid for the value of `expires_in`, in seconds. If you're accessing the SDK through the REST clients, the
clients will automatically manage refresh for you. If you are interacting with the SDK using gRPC or cURL, you will have to manage the token refresh
based on the `expires_in` property.

## What's next?

* Test your new environment by running the [Quickstart](/guides/getting-started/quickstart) guide.
* Install the [Lattice SDK](/guides/getting-started/set-up) for a protocol and language of your choice to get started developing with Lattice.