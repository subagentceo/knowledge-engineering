> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Using Cowork on 3P with an LLM Gateway

> Configure Cowork on 3P to use Claude models on a self-hosted gateway that implements the Anthropic Messages API

To use a self-hosted LLM gateway (for example LiteLLM, Portkey, or an in-house proxy) as the inference provider, set `inferenceProvider` to `gateway` and supply the base URL and credentials described below.

The gateway must implement the Anthropic [Messages API](https://docs.claude.com/en/api/messages):

* `POST /v1/messages` with [streaming](https://docs.claude.com/en/api/streaming) and [tool use](https://docs.claude.com/en/docs/tool-use) is required.
* `GET /v1/models` is optional. If the gateway implements it, Cowork on 3P auto-discovers available models; if not, set `inferenceModels` explicitly.

<Note>
  The data-residency and "no conversation data sent to Anthropic" statements elsewhere in these pages apply to a gateway deployment provided your gateway does not route inference to Anthropic-operated infrastructure (directly to the Anthropic API or via Microsoft Foundry). Data handling is otherwise determined by the gateway you operate and the upstream provider it routes to.
</Note>

## Configuration keys

| Setting                                               | Required                                                | Description                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gateway base URL<br />`inferenceGatewayBaseUrl`       | Yes                                                     | Gateway base URL. Must be `https://`.                                                                                                                                                                                                                                                             |
| Gateway API key<br />`inferenceGatewayApiKey`         | Unless using interactive sign-in or a credential helper | API key sent to the gateway. The field cannot be empty, so if your gateway authenticates by network identity and does not require a key, set a placeholder value.                                                                                                                                 |
| Gateway auth scheme<br />`inferenceGatewayAuthScheme` | No                                                      | Which HTTP header carries the credential. `bearer` (default) sends `Authorization: Bearer <key>`. `x-api-key` sends the `x-api-key` header instead. This setting controls the wire format only; to select interactive sign-in instead of a static key, set `inferenceCredentialKind` (see below). |

To send additional HTTP headers on every inference request (tenant routing, org IDs, and similar), set [`inferenceCustomHeaders`](/cowork/3p/configuration#activation). It applies to all providers, not just gateways.

As an alternative to a static `inferenceGatewayApiKey`, configure an [`inferenceCredentialHelper`](/cowork/3p/configuration#credential-helper) executable that prints the gateway credential to stdout, or set [`inferenceCredentialKind`](/cowork/3p/configuration#activation) to `interactive` for per-user [single sign-on](/cowork/3p/gateway-sso) through your identity provider.

## Models

When `inferenceModels` is unset, Cowork on 3P populates the model picker from your gateway's `GET /v1/models` response. Auto-discovery shows only models whose IDs are recognizably Claude; if your gateway advertises models under opaque aliases, set `inferenceModels` explicitly. Set [`inferenceModels`](/cowork/3p/configuration#models) to override discovery with an explicit list — the picker will show exactly the entries you provide. Use the model IDs your gateway expects (for example `bedrock/us.anthropic.claude-opus-4-7` for a LiteLLM-style routing prefix).

## Configure in the app

Open the in-app configuration window (**Developer → Configure third-party inference**). In the **Connection** section, set **Inference provider** to **Gateway**, then fill in the **Gateway credentials** card:

| Field               | Value                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| Gateway base URL    | `https://llm-gateway.example.corp`                                                                    |
| Gateway API key     | your gateway key (or a placeholder if your gateway has none)                                          |
| Credential kind     | **Static API key** (default), or **Interactive sign-in** for [single sign-on](/cowork/3p/gateway-sso) |
| Gateway auth scheme | **Bearer** (default) or **x-api-key**                                                                 |

Then click **Export** to produce a `.mobileconfig` (macOS) or `.reg` (Windows) file for your MDM. See [Installation and setup](/cowork/3p/installation) for the export and deployment workflow.
