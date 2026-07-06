> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Using Claude Desktop on 3P with the Claude API

> Configure Claude Desktop on 3P to send inference directly to Anthropic's Claude API instead of a cloud-provider-hosted Claude deployment

To use Anthropic's Claude API directly as the inference provider, set [`inferenceProvider`](/third-party/claude-desktop/configuration#inferenceprovider) to `anthropic` and supply an API key as described below. This is the first-party path: inference goes straight to Anthropic rather than to a Claude deployment hosted in your Amazon, Google, or Microsoft tenancy.

<Note>
  When `inferenceProvider` is `anthropic`, inference traffic goes to Anthropic's API endpoints rather than staying within your cloud provider. The data-residency and compliance statements on these pages do not apply to this option.
</Note>

For environments where static API keys aren't permitted, set [`inferenceCredentialHelper`](/third-party/claude-desktop/configuration#inferencecredentialhelper) to an executable that fetches a short-lived credential at runtime; see [Write a credential helper](/third-party/claude-desktop/credential-helper).

## Configure the app

### Configuration keys

| Setting                                                                              | Type     | Availability    | Default | Description                                                                                   |
| ------------------------------------------------------------------------------------ | -------- | --------------- | ------- | --------------------------------------------------------------------------------------------- |
| <span id="inferenceanthropicapikey" />Claude API key<br />`inferenceAnthropicApiKey` | `string` | MDM + Bootstrap | —       | Leave blank to fetch a key via browser sign-in, or to supply the key via a credential helper. |
