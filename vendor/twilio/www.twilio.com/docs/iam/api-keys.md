# API keys overview

API keys are the preferred way to [authenticate with Twilio's REST APIs](/docs/usage/requests-to-twilio). With API keys, you control which users and applications have access to your Twilio Account's API resources, and you can revoke access at your discretion.

If your Twilio application uses one of the client-side SDKs, then you need to use API keys to create [Access Tokens](/docs/iam/access-tokens).

> \[!NOTE]
>
> Twilio API credentials are a Region-specific resource. If your Account uses [Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions), refer to [Manage Regional API Credentials](/docs/global-infrastructure/manage-regional-api-credentials).
>
> When using the Twilio CLI to create regional profiles, you must specify both `--region` and `--edge` flags together. See [Regional CLI usage](/docs/twilio-cli/general-usage/regional) for details.

## Why you should use API keys

API keys are a powerful and flexible way to manage access to Twilio resources.

While you can use your Account SID and Auth Token as your API credentials for local testing, using them in production is risky. If a bad actor gains access to your Account SID and Auth Token, then your Twilio Account is compromised. This could cost you money and harm your business's reputation.

Instead, you can create individual API keys for specific purposes and for specific individuals. You have complete control of the lifecycle of the API credentials for your Twilio Account. For example, you can issue separate API keys to different developers or different subsystems within your application. If a key is compromised or no longer used, then you can revoke it to prevent unauthorized access.

You can further reduce security risks by using [Restricted API keys](/docs/iam/api-keys/restricted-api-keys) to provide minimum and specific levels of access.

## Types of API keys

The API key types are `Main`, `Standard`, and `Restricted` (Key resource v1 only). The following table describes each type:

| Key type   | Access permissions                                                                                                                                                                                                                                 | Create in Console | Create with REST API |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------------- |
| Main       | Full access to all Twilio API resources. Equivalent to using your Account SID and Auth Token for API requests.                                                                                                                                     | Yes               | No                   |
| Standard   | Access to all Twilio API resources, except for Accounts ([`/Accounts`](/docs/iam/api-keys/keys-in-console)) or Keys ([`/Accounts/{SID}/Keys`](/docs/iam/api-keys/key-resource-v2010), [`/v1/Keys`](/docs/iam/api-keys/key-resource-v1)) resources. | Yes               | Yes                  |
| Restricted | Customized, fine-grained access to specific Twilio API resources. Learn more about [Restricted API keys](/docs/iam/api-keys/restricted-api-keys).                                                                                                  | Yes               | Yes (**v1 only**)    |

## What's next?

* Create and manage API keys [in the Twilio Console](/docs/iam/api-keys/keys-in-console).
* Create and manage API keys [using the REST API](/docs/iam/api-keys/key-resource-v1).
* Create and manage API Keys using [CLI profiles](/docs/twilio-cli/general-usage/profiles) for regional authentication.
* Create Access Tokens if you plan on using a client-side SDK with Twilio. Learn more about [Access Tokens](/docs/iam/access-tokens).
* Learn how to safely store your API keys in environment variables in the ["How to Set Environment Variables" Blog post](https://www.twilio.com/blog/how-to-set-environment-variables-html).
* Read the ["Guide to Basic API Security Best Practices" Blog post](https://www.twilio.com/blog/basic-api-security-guide).
