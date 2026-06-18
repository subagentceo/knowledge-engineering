---
title: Custom Providers
description: Create and manage custom AI providers for your account.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom Providers

## Overview

Custom Providers allow you to integrate AI providers that are not natively supported by AI Gateway. This feature enables you to use AI Gateway's observability, caching, rate limiting, and other features with any AI provider that has an HTTPS API endpoint.

## Use cases

* **Internal AI models**: Connect to your organization's self-hosted AI models
* **Regional providers**: Integrate with AI providers specific to your region
* **Specialized models**: Use domain-specific AI services not available through standard providers
* **Custom endpoints**: Route requests to your own AI infrastructure

## Before you begin

### Prerequisites

* An active Cloudflare account with AI Gateway access
* A valid API key from your custom AI provider
* The HTTPS base URL for your provider's API

### Authentication

The API endpoints for creating, reading, updating, or deleting custom providers require authentication. You need to create a Cloudflare API token with the appropriate permissions.

To create an API token:

1. Go to the [Cloudflare dashboard API tokens page ↗](https://dash.cloudflare.com/?to=:account/api-tokens)
2. Click **Create Token**
3. Select **Custom Token** and add the following permissions:  
   * `AI Gateway - Edit`
4. Click **Continue to summary** and then **Create Token**
5. Copy the token - you'll use it in the `Authorization: Bearer $CLOUDFLARE_API_TOKEN` header

## Create a custom provider

* [ API ](#tab-panel-6528)
* [ Dashboard ](#tab-panel-6529)

To create a new custom provider using the API:

1. Get your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and Account Tag.
2. Send a `POST` request to create a new custom provider:

Create Custom Provider

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "name": "My Custom Provider",

    "slug": "some-provider",

    "base_url": "https://api.myprovider.com",

    "description": "Custom AI provider for internal models",

    "enable": true

  }'


```

**Required fields:**

* `name` (string): Display name for your provider
* `slug` (string): Unique identifier (alphanumeric with hyphens). Must be unique within your account.
* `base_url` (string): HTTPS URL for your provider's API endpoint. Must start with `https://`.

**Optional fields:**

* `description` (string): Description of the provider
* `link` (string): URL to provider documentation
* `enable` (boolean): Whether the provider is active (default: `false`)
* `beta` (boolean): Mark as beta feature (default: `false`)
* `curl_example` (string): Example cURL command for using the provider
* `js_example` (string): Example JavaScript code for using the provider

**Response:**

```

{

  "success": true,

  "result": {

    "id": "550e8400-e29b-41d4-a716-446655440000",

    "account_id": "abc123def456",

    "account_tag": "my-account",

    "name": "My Custom Provider",

    "slug": "some-provider",

    "base_url": "https://api.myprovider.com",

    "description": "Custom AI provider for internal models",

    "enable": true,

    "beta": false,

    "logo": "Base64 encoded SVG logo",

    "link": null,

    "curl_example": null,

    "js_example": null,

    "created_at": 1700000000,

    "modified_at": 1700000000

  }

}


```

Auto-generated logo

A default SVG logo is automatically generated for each custom provider. The logo is returned as a base64-encoded string.

To create a new custom provider using the dashboard:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to [**Compute & AI** \> **AI Gateway** \> **Custom Providers** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway/custom-providers).
3. Select **Add Custom Provider**.
4. Enter the following information:  
   * **Provider Name**: Display name for your provider  
   * **Provider Slug**: Unique identifier (alphanumeric with hyphens)  
   * **Base URL**: HTTPS URL for your provider's API endpoint (e.g., `https://api.myprovider.com/v1`)
5. Select **Save** to create your custom provider.

## List custom providers

* [ API ](#tab-panel-6530)
* [ Dashboard ](#tab-panel-6531)

Retrieve all custom providers with optional filtering and pagination:

List all providers

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

**Query parameters:**

* `page` (number): Page number (default: `1`)
* `per_page` (number): Items per page (default: `20`, max: `100`)
* `enable` (boolean): Filter by enabled status
* `beta` (boolean): Filter by beta status
* `search` (string): Search in id, name, or slug fields
* `order_by` (string): Sort field and direction (default: `"name ASC"`)

**Examples:**

List only enabled providers:

Terminal window

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers?enable=true" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Search for specific providers:

Terminal window

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers?search=custom" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

**Response:**

```

{

  "success": true,

  "result": [

    {

      "id": "550e8400-e29b-41d4-a716-446655440000",

      "name": "My Custom Provider",

      "slug": "some-provider",

      "base_url": "https://api.myprovider.com",

      "enable": true,

      "created_at": 1700000000,

      "modified_at": 1700000000

    }

  ],

  "result_info": {

    "page": 1,

    "per_page": 20,

    "total_count": 1,

    "total_pages": 1

  }

}


```

To view all your custom providers:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to [**Compute & AI** \> **AI Gateway** \> **Custom Providers** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway/custom-providers).
3. You will see a list of all your custom providers with their names, slugs, base URLs, and status.

## Get a specific custom provider

* [ API ](#tab-panel-6527)

Retrieve details for a specific custom provider by its ID:

Get provider by ID

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers/{provider_id}" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

**Response:**

```

{

  "success": true,

  "result": {

    "id": "550e8400-e29b-41d4-a716-446655440000",

    "account_id": "abc123def456",

    "account_tag": "my-account",

    "name": "My Custom Provider",

    "slug": "some-provider",

    "base_url": "https://api.myprovider.com",

    "description": "Custom AI provider for internal models",

    "enable": true,

    "beta": false,

    "logo": "Base64 encoded SVG logo",

    "link": "https://docs.myprovider.com",

    "curl_example": "curl -X POST https://api.myprovider.com/v1/chat ...",

    "js_example": "fetch('https://api.myprovider.com/v1/chat', {...})",

    "created_at": 1700000000,

    "modified_at": 1700000000

  }

}


```

## Update a custom provider

* [ API ](#tab-panel-6532)
* [ Dashboard ](#tab-panel-6533)

Update an existing custom provider. All fields are optional - only include the fields you want to change:

Update provider

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers/{provider_id}" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "name": "Updated Provider Name",

    "enable": true,

    "description": "Updated description"

  }'


```

**Updatable fields:**

* `name` (string): Provider display name
* `slug` (string): Provider identifier
* `base_url` (string): API endpoint URL (must be HTTPS)
* `description` (string): Provider description
* `link` (string): Documentation URL
* `enable` (boolean): Active status
* `beta` (boolean): Beta flag
* `curl_example` (string): Example cURL command
* `js_example` (string): Example JavaScript code

**Examples:**

Enable a provider:

Terminal window

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers/{provider_id}" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{"enable": true}'


```

Update provider URL:

Terminal window

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers/{provider_id}" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{"base_url": "https://api.newprovider.com"}'


```

Cache invalidation

Updates to custom providers automatically invalidate any cached entries related to that provider.

To update an existing custom provider:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to [**Compute & AI** \> **AI Gateway** \> **Custom Providers** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway/custom-providers).
3. Find the custom provider you want to update and select **Edit**.
4. Update the fields you want to change (name, slug, base URL, etc.).
5. Select **Save** to apply your changes.

## Delete a custom provider

* [ API ](#tab-panel-6534)
* [ Dashboard ](#tab-panel-6535)

Delete a custom provider:

Delete provider

```

# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,

# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.

curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers/{provider_id}" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

**Response:**

```

{

  "success": true,

  "result": {

    "id": "550e8400-e29b-41d4-a716-446655440000",

    "name": "My Custom Provider",

    "slug": "some-provider"

  }

}


```

Impact of deletion

Deleting a custom provider will immediately stop all requests routed through it. Ensure you have updated your applications before deleting a provider. Cache entries related to the provider will also be invalidated.

To delete a custom provider:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to [**Compute & AI** \> **AI Gateway** \> **Custom Providers** ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway/custom-providers).
3. Find the custom provider you want to delete and select **Delete**.
4. Confirm the deletion when prompted.

Impact of deletion

Deleting a custom provider will immediately stop all requests routed through it. Ensure you have updated your applications before deleting a provider.

## Using custom providers with AI Gateway

Once you've created a custom provider, you can route requests through AI Gateway using one of two approaches: the **Unified API** or the **provider-specific endpoint**. When referencing your custom provider with either approach, you must prefix the slug with `custom-`.

Custom provider prefix

All custom provider slugs must be prefixed with `custom-` when making requests through AI Gateway. For example, if your provider slug is `some-provider`, you must use `custom-some-provider` in your requests.

### How URL routing works

When AI Gateway receives a request for a custom provider, it constructs the upstream URL by combining the provider's configured `base_url` with the path that comes after `custom-{slug}/` in the gateway URL.

**The `base_url` field should contain only the root domain** (or domain with a fixed prefix) of the provider's API. Any API-specific path segments (like `/v1/chat/completions`) go in the request URL, not in `base_url`.

The formula is:

```

Gateway URL:   https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/custom-{slug}/{provider-path}

Upstream URL:  {base_url}/{provider-path}


```

Everything after `custom-{slug}/` in your request URL is appended directly to the `base_url` to form the final upstream URL. This means `{provider-path}` can include multiple path segments, query parameters, or any path structure your provider requires.

### Choosing between Unified API and provider-specific endpoint

| Unified API (/compat)           | Provider-specific endpoint                      |                                           |
| ------------------------------- | ----------------------------------------------- | ----------------------------------------- |
| **Best for**                    | Providers with OpenAI-compatible APIs           | Providers with any API structure          |
| **Request format**              | Must follow the OpenAI /chat/completions schema | Uses the provider's native request format |
| **Path control**                | Fixed to /compat/chat/completions               | Full control over the upstream path       |
| **How to specify the provider** | model field: custom-{slug}/{model-name}         | URL path: /custom-{slug}/{path}           |

Use the **Unified API** when your custom provider accepts the OpenAI-compatible `/chat/completions` request format. This is the simplest option and works well with OpenAI SDKs.

Use the **provider-specific endpoint** when your custom provider uses a non-standard API path or request format. This gives you full control over both the URL path and the request body sent to the upstream provider.

### Via Unified API

The Unified API sends requests to the provider's chat completions endpoint using the OpenAI-compatible format. Specify the model using the format `custom-{slug}/{model-name}`.

Request using custom provider via Unified API

```

# Run `wrangler auth token` to get an auth token to replace $CF_AIG_TOKEN for use with the API.

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  -H "Authorization: Bearer $PROVIDER_API_KEY" \

  -H "cf-aig-authorization: Bearer $CF_AIG_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "model": "custom-some-provider/model-name",

    "messages": [{"role": "user", "content": "Hello!"}]

  }'


```

### Via provider-specific endpoint

The provider-specific endpoint gives you full control over the upstream path. Everything after `custom-{slug}/` in the URL is appended to the `base_url`.

Direct provider endpoint

```

# Run `wrangler auth token` to get an auth token to replace $CF_AIG_TOKEN for use with the API.

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/custom-some-provider/v1/chat/completions \

  -H "Authorization: Bearer $PROVIDER_API_KEY" \

  -H "cf-aig-authorization: Bearer $CF_AIG_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "model": "model-name",

    "messages": [{"role": "user", "content": "Hello!"}]

  }'


```

If `base_url` is `https://api.myprovider.com`, this request is proxied to: `https://api.myprovider.com/v1/chat/completions`

### Examples

The following examples show how to configure `base_url` and construct request URLs for different types of providers.

#### Example 1: OpenAI-compatible provider (standard `/v1/` path)

Many providers follow the OpenAI convention of hosting their API at `{domain}/v1/chat/completions`.

**Configuration:**

* `slug`: `my-openai-compat`
* `base_url`: `https://api.example-provider.com`

**Provider-specific endpoint:**

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/custom-my-openai-compat/v1/chat/completions \

  -H "Authorization: Bearer $PROVIDER_API_KEY" \

  -H "Content-Type: application/json" \

  -d '{

    "model": "example-model",

    "messages": [{"role": "user", "content": "Hello!"}]

  }'


```

**URL mapping:**

| Component     | Value                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| Gateway URL   | https://gateway.ai.cloudflare.com/v1/{account\_id}/{gateway\_id}/custom-my-openai-compat/v1/chat/completions |
| base\_url     | https://api.example-provider.com                                                                             |
| Provider path | /v1/chat/completions                                                                                         |
| Upstream URL  | https://api.example-provider.com/v1/chat/completions                                                         |

Since this provider is OpenAI-compatible, you could also use the Unified API:

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \

  -H "Authorization: Bearer $PROVIDER_API_KEY" \

  -H "Content-Type: application/json" \

  -d '{

    "model": "custom-my-openai-compat/example-model",

    "messages": [{"role": "user", "content": "Hello!"}]

  }'


```

#### Example 2: Provider with a non-standard API path

Some providers use API paths that don't follow the `/v1/` convention. For example, a provider whose chat endpoint is at `https://api.custom-ai.com/api/coding/paas/v4/chat/completions`.

**Configuration:**

* `slug`: `custom-ai`
* `base_url`: `https://api.custom-ai.com`

**Provider-specific endpoint:**

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/custom-custom-ai/api/coding/paas/v4/chat/completions \

  -H "Authorization: Bearer $PROVIDER_API_KEY" \

  -H "Content-Type: application/json" \

  -d '{

    "model": "custom-ai-model",

    "messages": [{"role": "user", "content": "Hello!"}]

  }'


```

**URL mapping:**

| Component     | Value                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| Gateway URL   | https://gateway.ai.cloudflare.com/v1/{account\_id}/{gateway\_id}/custom-custom-ai/api/coding/paas/v4/chat/completions |
| base\_url     | https://api.custom-ai.com                                                                                             |
| Provider path | /api/coding/paas/v4/chat/completions                                                                                  |
| Upstream URL  | https://api.custom-ai.com/api/coding/paas/v4/chat/completions                                                         |

Note

For providers with non-standard paths, you must use the provider-specific endpoint. The Unified API only supports the `/chat/completions` path and cannot route to custom API paths.

#### Example 3: Self-hosted model with a path prefix

If you host your own model behind a reverse proxy or on a platform that adds a path prefix, include only the fixed prefix portion in `base_url` if all your endpoints share it. Otherwise, keep `base_url` as just the domain.

**Configuration (domain-only `base_url`):**

* `slug`: `internal-llm`
* `base_url`: `https://ml.internal.example.com`

**Provider-specific endpoint:**

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/custom-internal-llm/serving/models/my-model:predict \

  -H "Authorization: Bearer $INTERNAL_API_KEY" \

  -H "Content-Type: application/json" \

  -d '{

    "instances": [{"prompt": "Summarize the following text:"}]

  }'


```

**URL mapping:**

| Component     | Value                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| Gateway URL   | https://gateway.ai.cloudflare.com/v1/{account\_id}/{gateway\_id}/custom-internal-llm/serving/models/my-model:predict |
| base\_url     | https://ml.internal.example.com                                                                                      |
| Provider path | /serving/models/my-model:predict                                                                                     |
| Upstream URL  | https://ml.internal.example.com/serving/models/my-model:predict                                                      |

#### Example 4: Provider using OpenAI SDK with a custom base URL

When using the OpenAI SDK to connect to a custom provider through AI Gateway, set the SDK's `base_url` to the gateway's provider-specific endpoint path (up to and including the API version prefix that your provider expects).

**Configuration:**

* `slug`: `alt-provider`
* `base_url`: `https://api.alt-provider.com`

**Python (OpenAI SDK):**

Using OpenAI SDK with a custom provider

```

from openai import OpenAI


client = OpenAI(

    api_key="your-provider-api-key",

    base_url="https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/custom-alt-provider/v1",

    default_headers={

        "cf-aig-authorization": "Bearer {cf_aig_token}",

    },

)


# The SDK appends /chat/completions to the base_url automatically.

# Final upstream URL: https://api.alt-provider.com/v1/chat/completions

response = client.chat.completions.create(

    model="alt-model-v2",

    messages=[{"role": "user", "content": "Hello!"}],

)


```

**URL mapping:**

| Component          | Value                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| SDK base\_url      | https://gateway.ai.cloudflare.com/v1/{account\_id}/{gateway\_id}/custom-alt-provider/v1                  |
| SDK appends        | /chat/completions                                                                                        |
| Full gateway URL   | https://gateway.ai.cloudflare.com/v1/{account\_id}/{gateway\_id}/custom-alt-provider/v1/chat/completions |
| Provider base\_url | https://api.alt-provider.com                                                                             |
| Provider path      | /v1/chat/completions                                                                                     |
| Upstream URL       | https://api.alt-provider.com/v1/chat/completions                                                         |

## Common errors

### 409 Conflict - Duplicate slug

```

{

  "success": false,

  "errors": [

    {

      "code": 1003,

      "message": "A custom provider with this slug already exists",

      "path": ["body", "slug"]

    }

  ]

}


```

Each custom provider slug must be unique within your account. Choose a different slug or update the existing provider.

### 404 Not Found

```

{

  "success": false,

  "errors": [

    {

      "code": 1004,

      "message": "Custom Provider not found"

    }

  ]

}


```

The specified provider ID does not exist or you don't have access to it. Verify the provider ID and your authentication credentials.

### 400 Bad Request - Invalid base\_url

```

{

  "success": false,

  "errors": [

    {

      "code": 1002,

      "message": "base_url must be a valid HTTPS URL starting with https://",

      "path": ["body", "base_url"]

    }

  ]

}


```

The `base_url` field must be a valid HTTPS URL. HTTP URLs are not supported for security reasons.

### 404 when making requests to a custom provider

If you receive a 404 from the upstream provider, the most common cause is an incorrect path mapping. Verify that:

1. Your `base_url` is set to the provider's **root domain** (for example, `https://api.provider.com`) rather than including API path segments.
2. Your request URL includes the **full API path** after `custom-{slug}/`. For example, if the upstream endpoint is `https://api.provider.com/api/v2/chat`, your gateway URL should end in `/custom-{slug}/api/v2/chat`.
3. There is no duplicate or missing path segment. A common mistake is including `/v1` in both `base_url` and the request path, resulting in the upstream receiving `/v1/v1/chat/completions`.

## Best practices

1. **Use descriptive slugs**: Choose slugs that clearly identify the provider (e.g., `internal-gpt`, `regional-ai`)
2. **Document your integrations**: Use the `curl_example` and `js_example` fields to provide usage examples
3. **Enable gradually**: Test with `enable: false` before making the provider active
4. **Monitor usage**: Use AI Gateway's analytics to track requests to your custom providers
5. **Secure your endpoints**: Ensure your custom provider's base URL implements proper authentication and authorization
6. **Use BYOK**: Store provider API keys securely using [BYOK](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) instead of including them in every request

## Limitations

* Custom providers are account-specific and not shared across Cloudflare accounts
* The `base_url` must use HTTPS (HTTP is not supported)
* Provider slugs must be unique within each account
* Cache and rate limiting settings apply globally to the provider, not per-model

## Related resources

* [Get started with AI Gateway](https://developers.cloudflare.com/ai-gateway/get-started/)
* [Configure authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/)
* [BYOK (Store Keys)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/)
* [Dynamic routing](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/)
* [Caching](https://developers.cloudflare.com/ai-gateway/features/caching/)
* [Rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/configuration/custom-providers/#page","headline":"Custom Providers · Cloudflare AI Gateway docs","description":"Create and manage custom AI providers for your account.","url":"https://developers.cloudflare.com/ai-gateway/configuration/custom-providers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/configuration/custom-providers/","name":"Custom Providers"}}]}
```
