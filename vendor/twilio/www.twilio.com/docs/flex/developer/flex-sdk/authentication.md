# Flex SDK authentication

There are three options to authenticate the Flex SDK:

* [Option 1: Use SSO to authenticate (recommended)](#option-1-use-sso-to-authenticate-recommended)
* [Option 2: Use a JWE token to authenticate](#option-2-use-a-jwe-token-to-authenticate)
* [Option 3: Build your own authentication](#option-3-build-your-own-authentication)

## Option 1: Use SSO to authenticate (recommended)

You can authenticate using SSO:

```javascript
import { getAuthenticationConfig, getLoginDetails, createClient, exchangeToken } from "@twilio/flex-sdk";

// Helper to fetch the active authentication configuration for an account
async function getAuthConfig(accountSid: string) {
  try {
    const authConfig = await getAuthenticationConfig({ accountSid });
    const activeConfig = authConfig.configList.find((config) => config.active);
    if (!activeConfig) {
      console.error('No active auth config found');
      return;
    }
    return activeConfig;
  } catch (err) {
    console.error('Error retrieving authentication config:', err);
  }
}

async function initializeFlexApplication(accountSid: string) {
  const LOGIN_DETAILS_KEY = 'LOGIN_DETAILS';

  // See if an auth code is present in the URL
  const searchParams = new URLSearchParams(window.location.search);
  const authCode = searchParams.get('code');

  const storedLoginDetails = localStorage.getItem(LOGIN_DETAILS_KEY);

  // If we have stored login details and an auth code, exchange it for an access token
  if (storedLoginDetails && authCode) {
    const loginDetails = JSON.parse(storedLoginDetails);
    const authConfig = loginDetails.authConfig.ssoProfileSid;

    const exchangeTokenConfig = {
      code: authCode,
      clientId: loginDetails.clientId,
      codeVerifier: loginDetails.codeVerifier,
      nonce: loginDetails.nonce,
      state: loginDetails.state,
      ssoProfileSid: authConfig?.ssoProfileSid || '',
    };

    const tokenRes = await exchangeToken(exchangeTokenConfig as any);
    if (!tokenRes.accessToken) {
      return;
    }

    const userOptions = {}; // Optional config options
    return createClient(tokenRes.accessToken, userOptions);
  }

  // Otherwise, kick off the login flow
  try {
    const authConfig = await getAuthConfig(accountSid);
    if (!authConfig) {
      return;
    }

    const loginDetails = getLoginDetails({
      clientId: authConfig.clientId,
      ssoProfileSid: authConfig.ssoProfileSid,
      redirectUrl: window.location.origin,
    });

    // Store login details for later use
    localStorage.setItem(
      LOGIN_DETAILS_KEY,
      JSON.stringify({ ...loginDetails, ...authConfig })
    );

    // Redirect user to login page
    window.location.href = loginDetails.loginUrl;
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

const accountSid = 'ACCOUNT_SID';
initializeFlexApplication(accountSid).then((client) => {
  console.log('FlexSDK Client:', client);
  // Do something with the FlexSDK Client
});

```

The authentication process involves these key components:

* **Login Details**: Use the `getLoginDetails` function to retrieve the information needed for the Flex Client to start the login process with your Identity Provider (IdP).
* **Token Management**: Refresh and validate tokens to maintain secure and continuous operation of your system.
* **Authentication Config**: Fetch OAuth configurations to understand your setup and handle any additional parameters required for token exchange.
* **Flex Client**: Create the Flex Client by passing in the token and user-specific configurations to set up your environment.

### Customization

Depending on your specific requirements, you might need to adjust the optional `userOptions` provided to `createClient` for better logging, telemetry, and session management.

### Error handling

It's important to build robust error handling to catch and respond to any issues that might arise during the initialization and operation process.

### Integration

Integrate the provided methods into your Flex SDK application lifecycle to manage user authentication, token validation, and system setup effectively.

## Option 2: Use a JWE token to authenticate

You can get the Flex authentication token from your [authenticated Hosted Flex application](https://flex.twilio.com).

The token is stored in the browser's local storage, and you can use it to initialize the FlexSDK client.

![The JWE token in the browser's local storage.](https://docs-resources.prod.twilio.com/02525bfe608ffd4572df3804b13c17ec124c377618d5441f358cb64f602b9a4e.png)

The following would initialize Flex SDK and enable you to access the surface area of Flex.

```javascript
import { createClient } from '@twilio/flex-sdk'

const client = await createClient("FlexToken");
```

## Option 3: Build your own authentication

If you don't want to use an SSO solution, you can build your own authentication method.

To build your own authentication, you'll need to:

1. [Provision a user](#provision-a-user).
2. [Fetch the user you're authenticating](#fetch-a-user).
3. [Mint an authentication token](#mint-an-authentication-token).

For authorization, use [Basic Authentication](/docs/glossary/what-is-basic-authentication), which is an authentication method that provides a username and password when a request is made. Use your `AccountSid` for the username, and your `AuthToken` for the password.

> \[!WARNING]
>
> Only use the following endpoints internally on the backend. For security reasons, do not expose your `AuthToken` in front-end applications.

### Provision a user

To provision a user, replace `{flex_instance_sid}` in the command below with your **Flex Instance SID** (GOxxxxxxxxxxxxxxxxxxxxx).
You'll find your **Flex Instance SID** in Console on the [Flex Overview](https://console.twilio.com/us1/develop/flex/overview) page.

```bash
curl --location 'https://flex-api.twilio.com/v4/Instances/{flex_instance_sid}/Users/Provision' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data-raw '{
"username": "user1",
"email": "test@example.com",
"full_name": "Foo Bar",
"roles": ["agent"],
"worker" : {
    "attributes" : {
        "channel.voice.capacity" : 10,
        "language": "english, spanish",
        "more.stringarray" : "more,more2"
    }
}
}'
```

Sample response:

```json
{
    "account_sid": "ACCOUNT_SID",
    "created_date": "2025-03-25T15:09:41Z",
    "deactivated": false,
    "deactivated_date": null,
    "email": "user@example.com",
    "flex_team_sid": "FLEX_TEAM_SID",
    "flex_user_sid": "FLEX_USER_SID",
    "full_name": "Foo Bar",
    "instance_sid": "FLEX_INSTANCE_SID",
    "locale": null,
    "roles": [
        "agent"
    ],
    "teams": {
        "team_member": null,
        "team_owner": null
    },
    "updated_date": "2025-03-25T15:09:41Z",
    "username": "user1",
    "version": 0,
    "worker": {
        "worker_sid": "WORKER_SID",
        "workspace_sid": "WORKSPACE_SID"
    }
}

```

Note the **Flex User ID** (FUxxxxxxxxxxxxxxxxxxxxx) as you'll use this later for token minting.

### Fetch a user

To fetch the user you're authenticating, run the following command:

```bash
curl --location 'https://flex-api.twilio.com/v4/Instances/{flex_instance_sid}/Users?Username=user1' \
--header 'Authorization: ••••••' \
```

You can query users with the **Username=** query parameter and value, which is `user1` in the previous example.

Sample response:

```json
{
    "account_sid": "ACCOUNT_SID",
    "instance_sid": "INSTANCE_SID",
    "meta": {
        "direct_token": true,
        "list_key": "users",
        "next_token": null,
        "page_size": 1,
        "previous_token": null
    },
    "users": [
        {
            "account_sid": "ACCOUNT_SID",
            "created_date": "2025-03-25T15:09:41Z",
            "email": "user@example.com",
            "flex_team_sid": "FLEX_TEAM_SID",
            "flex_user_sid": "FLEX_USER_SID",
            "full_name": "Foo Bar",
            "instance_sid": "INSTANCE_SID",
            "locale": null,
            "roles": [
                "agent"
            ],
            "updated_date": "2025-03-25T15:09:41Z",
            "user_sid": null,
            "username": "user1",
            "version": 1,
            "workspace_sid": "WORKSPACE_SID"
        }
    ]
}
```

### Mint an authentication token

To mint an authentication token, update the `{flex_instance_sid}` and `{flex_user_sid}` values, then run the following command:

```bash
curl --location 'https://flex-api.twilio.com/v4/Instances/{flex_instance_sid}/Users/{flex_user_sid}/Tokens' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data '{
  "ttl":3600
}'
```

Sample response:

```json
{
    "access_token": "ACCESS_TOKEN",
    "token_info": {
        "account_sid": "ACCOUNT_SID",
        "expiration": "2025-03-25T16:16:16Z",
        "flex_instance_sid": "FLEX_INSTANCE_SID",
        "flex_user_sid": "FLEX_USER_SID",
        "identity": "user1",
        "permissions": [
            "FPN9999",
            "FPN0000"
        ],
        "roles": [
            "agent"
        ],
        "username": "user1"
    }
}
```
