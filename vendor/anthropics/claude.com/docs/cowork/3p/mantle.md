> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Using Cowork on 3P with Amazon Bedrock Mantle

> Configure Cowork on 3P to use Claude models through Bedrock Mantle's Anthropic-native API surface

Bedrock Mantle is Amazon Bedrock's Anthropic-native API surface. Unlike the standard [Bedrock provider](/cowork/3p/bedrock), Mantle speaks the Anthropic Messages API directly and authenticates with a bearer token rather than the AWS SigV4 credential chain, so no AWS CLI, named profile, or IAM Identity Center setup is needed on the device.

To use it, set `inferenceProvider` to `mantle` and supply a region and bearer token (or a credential helper that returns one).

## Configuration keys

Mantle reuses the Bedrock key names; keys not listed here (`inferenceBedrockProfile`, `inferenceBedrockSso*`, `inferenceBedrockAwsDir`, `inferenceBedrockAwsCliPath`, `inferenceBedrockServiceTier`) are ignored for this provider.

| Setting                                             | Required              | Description                                                                                                                                                                                                                                             |
| --------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AWS region<br />`inferenceBedrockRegion`            | Yes                   | AWS region for the Mantle endpoint, for example `us-east-1`. Used to construct `bedrock-mantle.<region>.api.aws` when no base URL is set.                                                                                                               |
| AWS bearer token<br />`inferenceBedrockBearerToken` | One credential source | Bearer token for Bedrock Mantle. May be supplied dynamically by an [`inferenceCredentialHelper`](/cowork/3p/configuration#credential-helper) executable instead.                                                                                        |
| Bedrock base URL<br />`inferenceBedrockBaseUrl`     | No                    | Override the regional Mantle endpoint. Provide the full SDK base URL including the `/anthropic` path, for example `https://bedrock-mantle.us-east-1.api.aws/anthropic`. A bare hostname is coerced to `https://`; `http://` is accepted with a warning. |

You must also set `inferenceModels`; Mantle has no model-list endpoint, so model discovery is not available. As with the standard Bedrock provider, server-side Web Search is not supported. See the [Configuration reference](/cowork/3p/configuration#models).

## Configure in the app

Open the in-app configuration window (**Developer → Configure third-party inference**). In the **Connection** section, set **Inference provider** to **Bedrock Mantle**, then fill in the credentials card:

| Field            | Value                    |
| ---------------- | ------------------------ |
| AWS region       | e.g. `us-east-1`         |
| AWS bearer token | your Mantle bearer token |
| Bedrock base URL | *optional*               |

Under **Models**, add at least one **Model list** entry.

Then click **Export** to produce a `.mobileconfig` (macOS) or `.reg` (Windows) file for your MDM. See [Installation and setup](/cowork/3p/installation) for the export and deployment workflow.
