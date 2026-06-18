# Authentication

## Overview

The Fin Custom Helpdesk Integration uses token-based authentication to secure both inbound requests (Fin calling your endpoints) and outbound webhooks (your system notifying Fin).

## Authentication Methods

### Inbound Authentication (Fin → Your Endpoints)

When Fin calls your API endpoints, you need to verify that the requests are coming from Fin. You can configure the access token used in all API requests to your system from the Fin Deployment UI. We support two-legged OAuth 2.0 for authentication.

#### Configuration

1. Navigate to the Fin Deployment UI
2. Configure your authorization token(s)
3. Fin will include this token in all API requests to your endpoints


![image_preview](/assets/oauth-setup.daeebda836986aa9bbf55ab2b6d4fd53cbfb4ad9bea3505fea01225d134ec71d.71a4f21c.png)

#### Implementation

Each API request will include the following header containing the OAuth access token issued by your token API:

```http
Authorization: Bearer your-secret-token
```

Your endpoint should validate this token on every request.

On any `401` or `403` response from your API, we will attempt to fetch another access token from your configured token endpoint.

### Outbound Authentication (Your System → Fin)

When your system sends webhooks to Fin to notify of conversation changes, Fin needs to verify the requests are coming from you.

On setup, you will be given a webhook secret key. You must provide this secret in your requests to the `custom_helpdesk_conversation_event` endpoint under an `X-Webhook-Key` header.

> Note that the URL will vary depending on your Fin workspace region.
US - `https://api.intercom.io/hooks/standalone/custom_helpdesk_conversation_event`
EU - `https://api.eu.intercom.io/hooks/standalone/custom_helpdesk_conversation_event`
AU - `https://api.au.intercom.io/hooks/standalone/custom_helpdesk_conversation_event`


![image_preview](/assets/webhook-secret.6824b5ea95fe23cec7e2a004226de709a18daf96a6c98954c6e06d221589d1e7.71a4f21c.png)

### IP Allowlisting (Optional)

For additional security, you can allowlist Fin's IP addresses.

You can find the list of IP ranges for your region [here](/docs/webhooks#which-ip-addresses-should-i-add-to-my-allowlist-for-intercom-webhooks)