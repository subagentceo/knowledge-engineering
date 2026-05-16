# Setup

Please reach out to your accounts team to discuss access.

API version
The Fin Agent API is available on API version **2.14 and above**. Make sure your integration uses [version 2.14 or later](/docs/references/2.14/introduction).

## Installation

### API key

1. In your Intercom workspace, go to Fin AI Agent from the sidebar.
2. Then click on **Deploy** nav item to expand its options.
3. You should see **Fin Agent API**. Click on it, and you should see the following page:


![Generate API Key](/assets/fin-agent-api-installation-1.f0523fdbe7a8c89b929369707ddd88fbbf7efd02be27c3470065adc35baa075c.71a4f21c.png)

1. From there, click **Generate API key**.
2. Once generated, click on **Manage API key**.


![Manage API Key](/assets/fin-agent-api-installation-2.3ac2e20d486b74397f68b9e7ddd9b21100b45e071b0289936461cf904a185de8.71a4f21c.png)

1. You’ll see two buttons beside the API key, for copying to clipboard and revealing the key in that respective order.
2. Copy the key.
3. [Use this API key](#how-to-use-your-api-key) in your requests as a Bearer token.


### OAuth Scopes & Permissions

The Fin Agent API access token is created with minimal OAuth scopes following the principle of least privilege for enhanced security.

#### Default Scope

Your Fin Agent API token has the following OAuth scope:

- **`write_conversations`** - Allows replying to, marking as read, and closing conversations


This scope is sufficient for all Fin Agent API operations (`/fin/start` and `/fin/reply` endpoints).

![Fin Agent API Token Scopes](/assets/fin_agent_api_auth_token_scopes.9905426a13f4eb7172a99c24fdf0e1190bfb01b8200fdf29297f25d2522e6bf0.71a4f21c.png)

#### Token Security

Server-to-Server API Only
Your API key must be used for **server-to-server communication** only. It must:

- Only be used in backend/server-side code
- **Never** be exposed in client-side code (JavaScript, mobile apps, browser extensions)
- **Never** be committed to public repositories or shared publicly


Even with reduced scopes, an exposed token could be used to send messages on behalf of your organization or access conversation data.

Reduced Permission Surface
Fin Agent API tokens have significantly reduced permissions compared to general-purpose API keys. This means:

- If compromised, the token can only be used to interact with conversations
- The token **cannot** access user data, export reports, manage admins, or perform other administrative actions
- This 97% reduction in permission surface area minimizes security risk


#### Using the Token for Other APIs

Token Scope Limitations
The Fin Agent API token is specifically designed for the Fin Agent API endpoints. If you need to call other Intercom APIs (such as the REST API for users, companies, or other resources), you should:

1. Create a separate API key or App with the appropriate scopes for those endpoints
2. Use different tokens for different API integrations to maintain security boundaries


**Do not** attempt to use the Fin Agent API token for other Intercom API endpoints, as it lacks the necessary permissions.

#### Customizing Scopes

If you need to adjust the OAuth scopes for your Fin Agent API token:

1. Navigate to **Settings → Developer Hub → App Packages**
2. Find your **Fin Agent API** app package
3. Click on the OAuth section to view and modify scopes


Once you save your scope changes, your token is automatically regenerated. We recommend updating your integration to start using the new token straight away so the new scopes take effect.

**Note:** While you can add additional scopes, we recommend keeping only the scopes you actually need for security best practices.

## Notifications

Configure how you receive events from Fin. You can use **Webhooks** (server callback), **SSE** (real-time stream returned in the API response), or both.

### Webhooks

Configure a callback URL to receive webhook notifications from Fin.

![Fin Agent API - Webhooks](/assets/fin-agent-api-webhooks.4ec0e07fbf5bcf0c30de5a182952ca662dba5eefcf96344603cfd7fed3203bcd.71a4f21c.png)

1. You'll need to provide a **callback URL** to receive notifications.
2. Initially, the signing secret will be empty. Once you save a callback URL, a secret will be generated and displayed.
3. Now, you can use the buttons to copy the secret to clipboard, or reveal the secret.
4. Use this secret to validate the [webhook requests](#validation).


#### Validation

All webhook requests will include an `X-Fin-Agent-API-Webhook-Signature` header containing an HMAC-SHA256 signature of the request body. Validation can be done by generating a signature using the request body and the signing secret from the settings, and comparing it with the aforementioned header value.

We compute the value of this `X-Fin-Agent-API-Webhook-Signature` header by creating a signature using the body of the JSON request and your Webhook secret value, which you can find in the Webhook settings of your API.

The signature is the hexadecimal (64-byte) representation of a SHA-256 signature computed using the HMAC algorithm as defined in [RFC6234](https://datatracker.ietf.org/doc/html/rfc6234).


```http
POST https://example.org/hooks
X-Fin-Agent-API-Webhook-Signature: sha256=21ff2e149e0fdcac6f947740f6177f6434bda921
Content-Type: application/json
```

### SSE

![Fin Agent API - SSE](/assets/fin-agent-api-sse.56a5b5c74bdb3b9c5fe4bc88a2e012b2c09713dc6bf648313b8ba8b4ff630408.71a4f21c.png)

Enable SSE to receive events via a real-time stream. When enabled, the `/fin/start` and `/fin/reply` responses include an `sse_subscription_url` that you can connect to directly.

See [SSE (Server-Sent Events)](/docs/guides/fin-agent-api/#sse-server-sent-events) in the overview guide for connection details and token lifecycle.

 

#### Streaming

![Fin Agent API - SSE](/assets/fin-agent-api-streaming.52c86777158db41517582768776a2f051ce706446bc79b270344a826d811d4a7.71a4f21c.png)

Enable streaming to reduce time-to-first-token (TTFT) in your UI. When enabled, Fin emits `fin_reply_chunk` events over SSE as it generates its response. Each chunk carries the full accumulated answer text so far, allowing you to render Fin's reply progressively. When the `fin_replied` event arrives, replace the streamed text with the final HTML body.

## How to use your API key

Please refer to [Intercom’s authentication guidelines](https://developers.intercom.com/docs/build-an-integration/learn-more/authentication#how-to-use-the-token) for more information.