> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration reference

> Every managed-configuration key Claude Desktop on 3P supports, what it controls, and recommended security profiles

<Tip>Most settings on this page are easier to configure in the [in-app configuration window](/third-party/claude-desktop/in-app-configuration). Use this reference when you're scripting an MDM policy or bootstrap response by hand.</Tip>

Claude Desktop on third-party (3P) is configured entirely through OS-native managed preferences: a `.mobileconfig` profile on macOS, registry policy on Windows, or a root-owned JSON file on Linux. This page documents every supported key. For the desktop release each key first appeared in, see the [configuration changelog](/third-party/claude-desktop/configuration-changelog).

The easiest way to author a configuration is the in-app configuration window (**Developer → Configure third-party inference**), which validates values, shows per-provider requirements, and exports directly to `.mobileconfig` or `.reg`. Use this reference when you need to author policy by hand, audit an existing profile, or understand exactly what a key does.

## How keys are read

| Platform | Managed (MDM) location                                                            | Local (user) location                                    |
| -------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- |
| macOS    | `/Library/Managed Preferences/<user>/com.anthropic.claudefordesktop.plist`        | `~/Library/Application Support/Claude-3p/configLibrary/` |
| Windows  | `HKLM\SOFTWARE\Policies\Claude` (machine), `HKCU\SOFTWARE\Policies\Claude` (user) | `%LOCALAPPDATA%\Claude-3p\configLibrary\`                |
| Linux    | `/etc/claude-desktop/managed-settings.json`                                       | `~/.config/Claude-3p/configLibrary/`                     |

The local location is a directory: `_meta.json` records which saved configuration is applied, and each configuration is a `<id>.json` file alongside it. The in-app configuration window writes here.

When a managed source is present, it wins and locally written values are ignored. The exception is a managed source that sets only the update keys (`disableAutoUpdates` and `autoUpdaterEnforcementHours`): those two keys are enforced from the managed source, but the rest of the configuration stays local and user-editable. Configuration is read **once at launch**, so fully quit and reopen the app after any change. See [Deploy with MDM](/third-party/claude-desktop/mdm#update-keys-and-managed-precedence) for the full precedence rules.

### Value types

All values are stored as **strings** in the OS preference store, even booleans and arrays.

| Documented type  | What to write                                                          | Example                                       |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------------- |
| string           | Plain string                                                           | `vertex`                                      |
| boolean          | `"true"` or `"false"` (or `1` / `0`)                                   | `"true"`                                      |
| integer          | Decimal string                                                         | `"3600"`                                      |
| string\[] (JSON) | JSON array **encoded as a string** (not a native plist/registry array) | `["claude-sonnet-4","claude-opus-4"]`         |
| object (JSON)    | JSON object mapping name to value, as a string                         | `{"X-Org-Id":"team1"}`                        |
| object\[] (JSON) | JSON array of objects, as a string                                     | see [`managedMcpServers`](#managedmcpservers) |

<Warning>
  The most common configuration mistake is writing array- or object-typed keys as native plist/registry structures. Keys like `inferenceModels`, `inferenceGatewayOidc`, `managedMcpServers`, `coworkEgressAllowedHosts`, and `otlpHeaders` must be **JSON strings**. In a `.mobileconfig`, that means a single `<string>` element containing `[...]` or `{...}` — not an `<array>`, not a `<dict>`, and not separate keys with dotted names like `inferenceGatewayOidc.clientId`.
</Warning>

### Linux

The managed source on Linux is a single JSON file, `/etc/claude-desktop/managed-settings.json`, with keys at the top level exactly as named in the [reference](#reference) — no wrapper object, no nesting:

```json theme={null}
{
  "inferenceProvider": "gateway",
  "inferenceGatewayBaseUrl": "https://gateway.example.com/v1",
  "inferenceGatewayApiKey": "sk-example",
  "inferenceCustomHeaders": { "X-Tenant-Id": "acme" }
}
```

Because the file is real JSON, array- and object-typed keys use native JSON values — the string-encoding rule above applies to plist and registry sources only. (String-encoded values are also accepted, so a profile generated for another platform can be reused.)

The file is only honored when it can't be edited by the user it configures:

* `managed-settings.json` must be a regular file (not a symlink), owned by root, and not group- or world-writable.
* `/etc/claude-desktop` itself must be a directory (not a symlink), owned by root, and not group- or world-writable.

A file that fails these checks is ignored, and the reason is logged to `main.log` in the app's logs directory — `~/.config/Claude/logs/` (or `~/.config/Claude-3p/logs/` once the app is running in 3P mode); search for `managed-settings.json`. The same log names any key that fails schema validation.

There is no per-user managed location on Linux; per-user configuration goes through the in-app configuration window, which writes to the local `configLibrary` directory above.

## Reference

The reference below is generated from the configuration schema and grouped to match the sidebar of the in-app configuration window. The **Availability** column shows whether a key can be set in an MDM profile, returned from a [bootstrap server](/third-party/claude-desktop/bootstrap), or both.

## Connection

| Setting                                                                                                                                          | Type      | Availability    | Default | Description                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | --------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="inferencecustomheaders" />Custom inference headers<br />`inferenceCustomHeaders`                                                       | `object`  | MDM + Bootstrap | —       | Extra HTTP headers sent on every inference request to the configured provider. For tenant routing, org IDs, Bedrock Guardrails, etc. Previously named `inferenceGatewayHeaders`.                           |
| <span id="inferencesessionlifetimesec" />Sign-in session lifetime<br />`inferenceSessionLifetimeSec`                                             | `integer` | MDM + Bootstrap | —       | How long a sign-in stays valid under your IdP's session policy. Shows a re-authenticate banner before it expires.                                                                                          |
| <span id="inferencecredentialhelper" />Helper script<br />`inferenceCredentialHelper`                                                            | `string`  | MDM only        | —       | Absolute path to an executable that prints the credential, optionally with per-request headers.                                                                                                            |
| <span id="inferencecredentialhelperttlsec" />Helper script TTL<br />`inferenceCredentialHelperTtlSec`                                            | `integer` | MDM only        | `3600`  | Helper output is cached for this many seconds. Re-runs at the next session start after expiry. Defaults to `3600`.                                                                                         |
| <span id="inferencecredentialhelpertimeoutsec" />Credential helper timeout<br />`inferenceCredentialHelperTimeoutSec`                            | `integer` | MDM only        | `60`    | Maximum wait for the helper executable to finish. Raise this if the helper opens a browser for interactive sign-in. Defaults to `60`. Range: 1–600.                                                        |
| <span id="inferencecredentialhelpersilentrefreshenabled" />Re-run helper for silent refresh<br />`inferenceCredentialHelperSilentRefreshEnabled` | `boolean` | MDM only        | `true`  | When a session's credential expires, re-run the helper with CLAUDE\_HELPER\_CONTEXT=mid-session-refresh to recover silently. Turn this off if your helper can't run non-interactively. Defaults to `true`. |
| <span id="inferenceprovider" />Inference provider<br />`inferenceProvider`                                                                       | `enum`    | MDM + Bootstrap | —       | Selects the inference backend. Setting this key activates third-party mode. One of: `gateway`, `anthropic`, `bedrock`, `mantle`, `vertex`, `foundry`.                                                      |
| <span id="inferencecredentialkind" />Credential kind<br />`inferenceCredentialKind`                                                              | `enum`    | MDM + Bootstrap | —       | Selects the credential source. When set, only that source is used (no fallback). One of: `static`, `helper-script`, `interactive`, `vendor-profile`, `oauth`, `workforce`.                                 |

<AccordionGroup>
  <Accordion title="inferenceCustomHeaders details">
    Sent on every inference and model-discovery request (joined into the CLI's `ANTHROPIC_CUSTOM_HEADERS`).

    Use this for fleet-wide constants. For per-user or per-session values, have the **credential helper script** emit JSON with a `headers` field; those are merged over these static entries (helper wins on conflict).
  </Accordion>

  <Accordion title="inferenceCredentialHelper details">
    Claude runs the executable with no arguments and reads **stdout** (trimmed). Exit code must be `0`; any output on **stderr** is logged but ignored. **Stdout must contain only one of the formats below** (no banners, prompts, or log lines).

    **Output format** is either:

    * a single bare token (the API key / bearer token), or
    * a JSON object `{"token": "...", "headers": {"Name": "Value", ...}}` when per-request headers are needed (merged over **Custom inference headers**, helper wins on conflict)

    Result is cached for the TTL below. On TTL expiry the helper is re-invoked transparently (no user prompt, no relaunch).

    **Expiry and refresh:** the app checks the active credential's expiry before each turn and refreshes silently when possible (re-runs the helper, or uses the stored refresh token for interactive sign-in kinds). If the provider returns HTTP 401 mid-turn, the same silent refresh is attempted before surfacing an error. When silent refresh fails, a prompt appears with a provider-specific action (re-sign-in for interactive kinds; admin-contact for static credentials). Applies to all providers and both tabs.

    **Typical use:** a shell script that pulls from Keychain, 1Password CLI, or an internal secret broker. Example:

    `security find-generic-password -s anthropic-api -w`

    If this field is set, static credential fields (API key, bearer token) are ignored. The helper always wins.
  </Accordion>

  <Accordion title="inferenceProvider details">
    The app activates 3P mode only when this is set and the required credential keys for the selected provider are present and valid; otherwise it launches in standard mode. Keys for providers other than the selected one are ignored. Each provider's required keys are documented on its dedicated page under Inference providers.
  </Accordion>
</AccordionGroup>

### Anthropic

| Setting                                                                              | Type     | Availability    | Default | Description                                                                                   |
| ------------------------------------------------------------------------------------ | -------- | --------------- | ------- | --------------------------------------------------------------------------------------------- |
| <span id="inferenceanthropicapikey" />Claude API key<br />`inferenceAnthropicApiKey` | `string` | MDM + Bootstrap | —       | Leave blank to fetch a key via browser sign-in, or to supply the key via a credential helper. |

### Bedrock

| Setting                                                                                          | Type     | Availability    | Default | Description                                                                                                       |
| ------------------------------------------------------------------------------------------------ | -------- | --------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| <span id="inferencebedrockregion" />AWS region<br />`inferenceBedrockRegion`                     | `string` | MDM + Bootstrap | —       | AWS region for the Bedrock runtime endpoint.                                                                      |
| <span id="inferencebedrockbaseurl" />Bedrock base URL<br />`inferenceBedrockBaseUrl`             | `string` | MDM + Bootstrap | —       | For VPC endpoints or gateway proxies. Host origin only.                                                           |
| <span id="inferencebedrockservicetier" />Bedrock service tier<br />`inferenceBedrockServiceTier` | `enum`   | MDM + Bootstrap | —       | Sent as the X-Amzn-Bedrock-Service-Tier header. Leave unset for on-demand. One of: `flex`, `priority`.            |
| <span id="inferencebedrockbearertoken" />AWS bearer token<br />`inferenceBedrockBearerToken`     | `string` | MDM + Bootstrap | —       | Static bearer token for inference. For providers that support profile or helper-script credentials, prefer those. |
| <span id="inferencebedrockssostarturl" />AWS SSO start URL<br />`inferenceBedrockSsoStartUrl`    | `string` | MDM + Bootstrap | —       | Enables in-app AWS sign-in (no AWS CLI needed). Set with the three SSO fields below.                              |
| <span id="inferencebedrockssoregion" />AWS SSO region<br />`inferenceBedrockSsoRegion`           | `string` | MDM + Bootstrap | —       | IAM Identity Center home region.                                                                                  |
| <span id="inferencebedrockssoaccountid" />AWS SSO account ID<br />`inferenceBedrockSsoAccountId` | `string` | MDM + Bootstrap | —       | 12-digit AWS account ID assigned to users in IAM Identity Center.                                                 |
| <span id="inferencebedrockssorolename" />AWS SSO role name<br />`inferenceBedrockSsoRoleName`    | `string` | MDM + Bootstrap | —       | IAM Identity Center permission-set name granting bedrock:InvokeModel\* on the account above.                      |
| <span id="inferencebedrockprofile" />AWS profile name<br />`inferenceBedrockProfile`             | `string` | MDM only        | —       | AWS named profile to use for Bedrock inference credentials.                                                       |
| <span id="inferencebedrockawsdir" />AWS config directory<br />`inferenceBedrockAwsDir`           | `string` | MDM only        | —       | Folder with AWS config/credentials. Defaults to \~/.aws when no bearer token is set.                              |
| <span id="inferencebedrockawsclipath" />AWS CLI path<br />`inferenceBedrockAwsCliPath`           | `string` | MDM only        | —       | Absolute path to the aws executable. Leave unset to find it on PATH.                                              |

<AccordionGroup>
  <Accordion title="inferenceBedrockServiceTier details">
    Tier availability varies by model and region. Reserved capacity uses a provisioned-throughput ARN as the model ID instead of this setting. Older bundled Claude Code CLI versions ignore this key.
  </Accordion>
</AccordionGroup>

### Foundry

| Setting                                                                                              | Type     | Availability    | Default | Description                                                                                                       |
| ---------------------------------------------------------------------------------------------------- | -------- | --------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| <span id="inferencefoundryresource" />Azure AI Foundry resource name<br />`inferenceFoundryResource` | `string` | MDM + Bootstrap | —       | Azure AI Foundry resource name used to construct the endpoint URL.                                                |
| <span id="inferencefoundryapikey" />Azure AI Foundry API key<br />`inferenceFoundryApiKey`           | `string` | MDM + Bootstrap | —       | API key for Azure AI Foundry inference.                                                                           |
| <span id="inferencefoundrytenantid" />Entra ID tenant ID<br />`inferenceFoundryTenantId`             | `string` | MDM only        | —       | Directory (tenant) ID of the Entra ID app registration that has the Cognitive Services scope.                     |
| <span id="inferencefoundryclientid" />Entra ID client ID<br />`inferenceFoundryClientId`             | `string` | MDM only        | —       | Application (client) ID of the Entra ID app registration. The app must allow public client flows for device code. |

### Gateway

| Setting                                                                                       | Type     | Availability    | Default  | Description                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------- | -------- | --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="inferencegatewaybaseurl" />Gateway base URL<br />`inferenceGatewayBaseUrl`          | `string` | MDM + Bootstrap | —        | Full URL of the inference gateway endpoint.                                                                                                                                                                                                     |
| <span id="inferencegatewayapikey" />Gateway API key<br />`inferenceGatewayApiKey`             | `string` | MDM + Bootstrap | —        | API key for the configured inference gateway.                                                                                                                                                                                                   |
| <span id="inferencegatewayauthscheme" />Gateway auth scheme<br />`inferenceGatewayAuthScheme` | `enum`   | MDM + Bootstrap | `bearer` | How the gateway credential is sent on the wire (Authorization: Bearer vs x-api-key header). One of: `bearer`, `x-api-key`. Defaults to `bearer`.                                                                                                |
| <span id="inferencegatewayoidc" />Gateway SSO IdP (OIDC)<br />`inferenceGatewayOidc`          | `object` | MDM + Bootstrap | —        | External IdP for gateway sign-in. The user authenticates against this issuer; the resulting token (ID token by default) is sent to the gateway as the Bearer credential. Leave unset only if the gateway is its own OAuth authorization server. |

<AccordionGroup>
  <Accordion title="inferenceGatewayOidc details">
    **External IdP mode.** The app discovers `<issuer>/.well-known/openid-configuration`, runs an OIDC authorization-code-with-PKCE flow in the system browser with `clientId`, and sends the resulting token as `Authorization: Bearer` on every inference request — see **Bearer token type** below for how the gateway validates it.

    **Bearer token type.** `id_token` (the default) sends the OIDC ID token — the gateway validates signature + `iss` + `aud`, where `aud` is the `clientId` configured here. `access_token` sends the OAuth access token — the gateway validates as an OAuth resource server against the audience/scope the IdP issued the token for; set `scopes` to the gateway's registered API scope (required in this mode). Use `access_token` for gateways that expect a resource-server token (Portkey, Kong, Envoy JWT filter, AWS API Gateway authorizers).

    **The gateway MUST validate `iss` AND `aud`, not just the signature.** Signature + issuer alone accepts *any* token from the same tenant, including tokens issued to unrelated apps. In `id_token` mode the audience is the `clientId`:

    ```yaml theme={null}
    # LiteLLM example — `audience` is REQUIRED, not optional
    general_settings:
      litellm_jwtauth:
        public_key_url: https://login.microsoftonline.com/<tenant>/discovery/v2.0/keys
        audience: <clientId>           # ⚠ omitting this accepts any token from the tenant
    ```

    **IdP setup.** The app's loopback callback binds `http://127.0.0.1:<port>/callback` (RFC 8252 §7.3). Register `127.0.0.1`; most IdPs do **not** treat `localhost` and `127.0.0.1` as interchangeable. **Entra:** register a public-client app, add a *Mobile and desktop applications* redirect URI of `http://127.0.0.1/callback`. (Microsoft's docs say the path is wildcarded for loopback; in practice it is not: `http://127.0.0.1` without `/callback` fails with `AADSTS50011`. The port IS wildcarded.) Grant `openid profile email offline_access` (delegated, no admin consent); in `access_token` mode **also** add the gateway API's delegated permission under *API permissions* (and ensure the gateway's own app registration exposes that scope via *Expose an API*) — without it Entra rejects the sign-in with `AADSTS65001`. **Okta:** register a *Native* app with the exact redirect URI `http://127.0.0.1:<port>/callback` and set `redirectPort` here to that port (Okta requires an exact match).

    **Refresh:** `offline_access` returns a refresh token; the app refreshes the bearer silently before expiry. When refresh fails (revoked, idle past the IdP's window), the user re-authenticates in the browser. **Google Workspace caveat (`id_token` mode only):** Google never returns `id_token` on a refresh-token grant, so a Google-backed gateway in `id_token` mode will prompt a browser sign-in roughly once per ID-token TTL (\~1h). Entra and Okta return a fresh `id_token` and are unaffected; `access_token` mode is unaffected on all IdPs.

    **Leave this unset** for a gateway that hosts its own RFC 8414 metadata at `<baseUrl>/.well-known/oauth-authorization-server` (the original gateway-as-AS path).

    | Field                 | Type      | Default    | Description                                                                                                                                                                                                                                                   |
    | --------------------- | --------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `clientId`            | `string`  | —          |                                                                                                                                                                                                                                                               |
    | `issuer`              | `string`  | —          |                                                                                                                                                                                                                                                               |
    | `authorizationUrl`    | `string`  | —          |                                                                                                                                                                                                                                                               |
    | `tokenUrl`            | `string`  | —          |                                                                                                                                                                                                                                                               |
    | `bearerTokenType`     | `enum`    | `id_token` | Which token to send as the gateway bearer. Use access token for gateways that validate as an OAuth resource server. One of: `id_token`, `access_token`.                                                                                                       |
    | `scopes`              | `string`  | —          |                                                                                                                                                                                                                                                               |
    | `appendOfflineAccess` | `boolean` | `true`     | Automatically append offline\_access to scopes so the IdP returns a refresh token for silent refresh. Turn off only if your authorization server rejects offline\_access as an unknown scope; include the server's own refresh-token scope in Scopes instead. |
    | `redirectPort`        | `integer` | —          |                                                                                                                                                                                                                                                               |
  </Accordion>
</AccordionGroup>

### Models

| Setting                                                                         | Type       | Availability    | Default | Description                                                          |
| ------------------------------------------------------------------------------- | ---------- | --------------- | ------- | -------------------------------------------------------------------- |
| <span id="modeldiscoveryenabled" />Model discovery<br />`modelDiscoveryEnabled` | `boolean`  | MDM + Bootstrap | —       | Auto-populate the model picker from the provider at launch.          |
| <span id="inferencemodels" />Model list<br />`inferenceModels`                  | `object[]` | MDM + Bootstrap | —       | Override the auto-discovered model list. First entry is the default. |

<AccordionGroup>
  <Accordion title="modelDiscoveryEnabled details">
    Auto-populate the model picker from the provider's model-list endpoint at launch. For gateway and Anthropic providers, a config that doesn't set this key skips discovery automatically when the model list below already makes it unnecessary; the toggle here only sets it explicitly on or off. Turn off if the endpoint isn't reachable from your network, or to use a fixed list. When off, the model list below is required and must use full model IDs (aliases like sonnet/opus are resolved via discovery).
  </Accordion>

  <Accordion title="inferenceModels details">
    Use the **provider's exact model ID**: Vertex publisher IDs (`claude-sonnet-4@20250514`), Bedrock inference-profile IDs (`us.anthropic.claude-sonnet-4-...-v1:0`), or Foundry deployment names. The first entry is the default. Entries may be plain ID strings or objects.

    **Gateway:** the `name` must be the exact ID your gateway's `/v1/models` endpoint returns. If you set `supports1m` on an alias (`sonnet`) but discovery returns the full ID, the variant won't appear.

    **Extended context** (`supports1m`) is a capability assertion you make about your deployment; only set it for models you've confirmed support the 1M-token window:

    ```json theme={null}
    [{"name": "claude-opus-4", "supports1m": true}, "claude-sonnet-4"]
    ```

    **Display label** (`labelOverride`) is for IDs the picker can't derive a friendly name from (Bedrock ARNs, gateway routing aliases). Display-only; `name` is still what the app sends:

    ```json theme={null}
    [{"name": "arn:aws:bedrock:us-east-1:123:application-inference-profile/abc", "labelOverride": "Claude Opus (Prod)"}]
    ```

    **Tier mapping** (`anthropicFamilyTier`) tells the app which Claude tier (`haiku`/`sonnet`/`opus`/`fable`/`mythos`) an entry stands in for, so bare tier aliases (e.g. in the Code tab) resolve to your model. `isFamilyDefault: true` picks the winner when several entries share a tier:

    ```json theme={null}
    [{"name": "us.anthropic.claude-opus-4-...-v1:0", "anthropicFamilyTier": "opus"}]
    ```

    | Field                 | Type      | Default | Description                                                                                                                                                                    |
    | --------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
    | `name`                | `string`  | —       |                                                                                                                                                                                |
    | `labelOverride`       | `string`  | —       | Shown in the model picker. Leave blank to auto-format from the ID.                                                                                                             |
    | `supports1m`          | `boolean` | —       |                                                                                                                                                                                |
    | `anthropicFamilyTier` | `enum`    | —       | Which Claude tier this model stands in for. Pins the bare alias (e.g. 'opus') and, for opus/fable, the refusal fallback. One of: `sonnet`, `opus`, `haiku`, `fable`, `mythos`. |
    | `isFamilyDefault`     | `boolean` | —       |                                                                                                                                                                                |
  </Accordion>
</AccordionGroup>

### Vertex

| Setting                                                                                                                        | Type     | Availability    | Default | Description                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------ | -------- | --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="inferencevertexprojectid" />GCP project ID<br />`inferenceVertexProjectId`                                           | `string` | MDM + Bootstrap | —       | Google Cloud project ID for Vertex AI inference.                                                                                                    |
| <span id="inferencevertexregion" />GCP region<br />`inferenceVertexRegion`                                                     | `string` | MDM + Bootstrap | —       | GCP region where your Vertex AI Claude models are deployed.                                                                                         |
| <span id="inferencevertexbaseurl" />Vertex AI base URL<br />`inferenceVertexBaseUrl`                                           | `string` | MDM + Bootstrap | —       | PSC endpoint, if using one.                                                                                                                         |
| <span id="inferencevertexoauthclientid" />Vertex OAuth client ID<br />`inferenceVertexOAuthClientId`                           | `string` | MDM + Bootstrap | —       | Desktop-app OAuth client ID. Enables Sign in with Google instead of a credentials file.                                                             |
| <span id="inferencevertexoauthclientsecret" />Vertex OAuth client secret<br />`inferenceVertexOAuthClientSecret`               | `string` | MDM + Bootstrap | —       | Secret for the Desktop-app OAuth client above.                                                                                                      |
| <span id="inferencevertexoauthscopes" />Vertex OAuth scopes<br />`inferenceVertexOAuthScopes`                                  | `string` | MDM + Bootstrap | —       | Override the Google OAuth scopes (space-separated). Leave blank for the default.                                                                    |
| <span id="inferencevertexoauthloginhint" />Vertex OAuth login hint<br />`inferenceVertexOAuthLoginHint`                        | `string` | MDM + Bootstrap | —       | Pre-fill Google's account chooser and forward to your federated IdP. \{username} expands to the OS login name.                                      |
| <span id="inferencevertexworkforceaudience" />Workforce Identity audience<br />`inferenceVertexWorkforceAudience`              | `string` | MDM + Bootstrap | —       | Workforce-pool provider audience. When set, sign-in uses your own IdP plus a GCP STS exchange instead of a Google identity.                         |
| <span id="inferencevertexworkforceuserproject" />Workforce Identity billing project<br />`inferenceVertexWorkforceUserProject` | `string` | MDM + Bootstrap | —       | GCP project for STS billing and quota. Defaults to the Vertex project ID above.                                                                     |
| <span id="inferencevertexworkforceoidc" />Workforce Identity IdP (OIDC)<br />`inferenceVertexWorkforceOidc`                    | `object` | MDM + Bootstrap | —       | Your organization's OIDC IdP. The app runs an authorization-code-with-PKCE flow against this issuer and exchanges the returned ID token at GCP STS. |
| <span id="inferencevertexcredentialsfile" />GCP credentials file path<br />`inferenceVertexCredentialsFile`                    | `string` | MDM only        | —       | Absolute path to service-account JSON. Leave blank to fall back to ADC.                                                                             |

<AccordionGroup>
  <Accordion title="inferenceVertexWorkforceOidc details">
    | Field               | Type      | Default | Description                                                                                                                                                                       |
    | ------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `clientId`          | `string`  | —       |                                                                                                                                                                                   |
    | `issuer`            | `string`  | —       |                                                                                                                                                                                   |
    | `authorizationUrl`  | `string`  | —       |                                                                                                                                                                                   |
    | `tokenUrl`          | `string`  | —       |                                                                                                                                                                                   |
    | `scopes`            | `string`  | —       |                                                                                                                                                                                   |
    | `redirectPort`      | `integer` | —       |                                                                                                                                                                                   |
    | `omitOfflineAccess` | `boolean` | —       | Only enable if your IdP rejects the offline\_access scope on this client. Without it the app cannot refresh silently and will prompt for sign-in each time the IdP token expires. |
  </Accordion>
</AccordionGroup>

## Workspace restrictions

### Authentication

| Setting                                                                                                          | Type      | Availability | Default | Description                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------- | --------- | ------------ | ------- | -------------------------------------------------------------------------------------------------------------------- |
| <span id="disabledeploymentmodechooser" />Disable Claude.ai sign-in<br />`disableDeploymentModeChooser`          | `boolean` | MDM only     | `false` | Users see only this provider at the login screen. The option to sign in to Claude.ai is hidden. Defaults to `false`. |
| <span id="disabledeeplinkregistration" />Disable claude:// deep-link handling<br />`disableDeepLinkRegistration` | `boolean` | MDM only     | `false` | Stop external apps and websites from opening Cowork via claude:// links. Defaults to `false`.                        |

### Chat surface

| Setting                                                                                                    | Type      | Availability           | Default | Description                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------- | --------- | ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="chattabenabled" />Allow Chat tab<br />`chatTabEnabled`                                           | `boolean` | MDM + Bootstrap · Beta | —       | Enable the Chat tab. Quick questions and drafting.                                                                                                                                                                                                                   |
| <span id="chatadvancedfileanalysisenabled" />Advanced file analysis<br />`chatAdvancedFileAnalysisEnabled` | `boolean` | MDM + Bootstrap · Beta | —       | Allow Claude to run code in a local sandbox to analyze attached files it can't read natively — like Excel and PowerPoint — and perform inline data analysis. The sandbox can only read files attached to the conversation and has no network access. Off by default. |

### Code surface

| Setting                                                                                               | Type      | Availability    | Default | Description                                                           |
| ----------------------------------------------------------------------------------------------------- | --------- | --------------- | ------- | --------------------------------------------------------------------- |
| <span id="isclaudecodefordesktopenabled" />Allow Claude Code tab<br />`isClaudeCodeForDesktopEnabled` | `boolean` | MDM + Bootstrap | `true`  | Enable the Code tab. Claude writes and runs code. Defaults to `true`. |

### Cowork surface

| Setting                                                                | Type      | Availability    | Default | Description                                                                                                     |
| ---------------------------------------------------------------------- | --------- | --------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| <span id="coworktabenabled" />Allow Cowork tab<br />`coworkTabEnabled` | `boolean` | MDM + Bootstrap | `true`  | Enable the Cowork tab. Claude works on longer tasks like research, analysis, and documents. Defaults to `true`. |

### Workspace

| Setting                                                                                            | Type       | Availability                 | Default | Description                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------- | ---------- | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="disabledbuiltintools" />Disabled built-in tools<br />`disabledBuiltinTools`              | `string[]` | MDM + Bootstrap              | —       | Built-in tools removed from Cowork.                                                                                                                                                                                       |
| <span id="disablebundledskills" />Disable bundled skills and workflows<br />`disableBundledSkills` | `boolean`  | MDM + Bootstrap              | —       | Disables Claude Code's bundled skills and workflows (deep-research and similar). Use where they cannot function, for instance when WebFetch is egress-blocked and the gateway does not forward the WebSearch server tool. |
| <span id="builtintoolpolicy" />Built-in tool policy<br />`builtinToolPolicy`                       | `object`   | MDM + Bootstrap              | —       | Per-tool approval policy. "ask" requires user approval before each call; "allow" is the default. Use Disabled built-in tools to remove a tool entirely.                                                                   |
| <span id="automodeenabled" />Allow Auto mode<br />`autoModeEnabled`                                | `boolean`  | MDM + Bootstrap              | `false` | Offer Auto mode in the Cowork and Code permission selectors. Claude decides which actions need approval. Defaults to `false`.                                                                                             |
| <span id="allowedworkspacefolders" />Allowed workspace folders<br />`allowedWorkspaceFolders`      | `object[]` | MDM + Bootstrap              | —       | Folders users may attach as a workspace. Leave unset for unrestricted access. Supports \~ and a fixed set of environment variables.                                                                                       |
| <span id="coworkegressallowedhosts" />Allowed egress hosts<br />`coworkEgressAllowedHosts`         | `string[]` | MDM + Bootstrap              | —       | Hostnames the agent's tools may reach from the Cowork and Code tabs. Also surfaced under Egress Requirements.                                                                                                             |
| <span id="requirecoworkfullvmsandbox" />Require full VM sandbox<br />`requireCoworkFullVmSandbox`  | `boolean`  | MDM + Bootstrap · Deprecated | `false` | Runs tools inside an isolated VM instead of the host. Stronger isolation; slower file access and no host-process tools. Defaults to `false`.                                                                              |

<AccordionGroup>
  <Accordion title="autoModeEnabled details">
    When enabled, users can select **Auto mode** (Code tab) / **Act without asking** (Cowork tab). Claude runs a safety classifier on each action and only prompts for approval on actions it judges risky, instead of following the static per-tool policy.

    Requires a model that supports the classifier (Claude 4.6+). Older models show the option greyed out. `builtinToolPolicy` and this key may both be set; Auto mode is a user-selectable option alongside the default policy, not a replacement for it.

    In the Code tab, a separately deployed Claude Code [managed-settings](https://claude.com/docs/third-party/claude-desktop/code#interaction-with-claude-code%E2%80%99s-own-managed-settings) file that sets `disableAutoMode` to `"disable"` overrides this key and keeps Auto mode hidden.
  </Accordion>

  <Accordion title="allowedWorkspaceFolders details">
    Paths can reference `~` and these environment variables, expanded per user: `%OneDrive%`, `%OneDriveCommercial%`, `%OneDriveConsumer%`, `%APPDATA%`, `%LOCALAPPDATA%`, `%USERNAME%`, `%XDG_DOCUMENTS_DIR%`. The set is fixed; an entry that references any other `%VAR%`, or one that is unset on the device, is ignored.

    | Field               | Type      | Default | Description                                                                                  |
    | ------------------- | --------- | ------- | -------------------------------------------------------------------------------------------- |
    | `path`              | `string`  | —       |                                                                                              |
    | `isDefaultSelected` | `boolean` | —       | Shows as a folder chip on the new-task page and skips the trust prompt. Users can remove it. |
  </Accordion>

  <Accordion title="coworkEgressAllowedHosts details">
    Applies to **both** the Cowork and Code tabs. In the Cowork tab it governs the sandbox's web fetch, shell commands, and package installs. In the Code tab it is [translated into Claude Code's network sandbox allowlist](https://claude.com/docs/third-party/claude-desktop/code#applied-as-managed-policy); a separately deployed Claude Code managed-settings file on the endpoint takes precedence by default.

    Does **not** apply to Web Search, which runs server-side at your inference provider rather than from the sandbox.

    Only affects **tool calls**. Inference and MCP traffic are covered by their own allowlists elsewhere. When unset, only the inference endpoint is reachable from the sandbox; the agent's package installs (pip/npm) and web fetches will fail with a 403.

    Accepts exact hostnames (`api.github.com`), wildcards (`*.corp.com` matches one subdomain level), and `*` to allow all. `*.corp.com` matches `docs.corp.com` but not `corp.com` itself; add both if you need the apex. IP literals and localhost always resolve regardless of this list; this is a public-egress filter, not a sandbox.

    Hosts you add here also need to be open on your network firewall. See **Egress Requirements** for the full allowlist.
  </Accordion>
</AccordionGroup>

## Connectors & extensions

### Extensions

| Setting                                                                                                               | Type      | Availability    | Default | Description                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------- | --------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="isdesktopextensionenabled" />Allow desktop extensions<br />`isDesktopExtensionEnabled`                      | `boolean` | MDM + Bootstrap | `true`  | .dxt and .mcpb installs. Defaults to `true`. Previously named `isDxtEnabled`.                                                         |
| <span id="isdesktopextensionsignaturerequired" />Require signed extensions<br />`isDesktopExtensionSignatureRequired` | `boolean` | MDM + Bootstrap | `false` | Reject desktop extensions that are not signed by a trusted publisher. Defaults to `false`. Previously named `isDxtSignatureRequired`. |

### MCP

| Setting                                                                                    | Type       | Availability    | Default | Description                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------ | ---------- | --------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="managedmcpservers" />Managed MCP servers<br />`managedMcpServers`                | `object[]` | MDM + Bootstrap | —       | Org-pushed MCP servers: remote (HTTP/SSE) or local (stdio command). May embed bearer tokens.                                                                                                 |
| <span id="islocaldevmcpenabled" />Allow user-added MCP servers<br />`isLocalDevMcpEnabled` | `boolean`  | MDM + Bootstrap | `true`  | Local stdio servers added via the Developer settings. Remote servers come from the managed list above, or plugins mounted to a user's computer by an organization admin. Defaults to `true`. |

<AccordionGroup>
  <Accordion title="managedMcpServers details">
    For OAuth-authenticated entries, the app builds the redirect URI as `http://<callbackHost>:<callbackPort>/callback`; register that exact value with the OAuth provider. Tokens refresh automatically during a session, so users aren't interrupted when the initial access token expires.

    `toolPolicy` locks the per-tool approval state. `"blocked"` removes the tool from the session and labels it admin-blocked. `"ask"` requires approval on every call (Allow once / Deny only; no persistent always-allow). `"allow"` pre-approves. Tools **not listed** follow the user's choice: the prompt offers a persistent Always allow, except for tools that can modify data, which instead show a session-scoped **Allow for this task** alongside **Allow for all tasks** with a malicious-instruction warning. In the Code tab, `blocked`/`ask` are forwarded as Claude Code permission rules; `allow` is not.

    | Field                       | Type       | Default | Description                                                                                                                                                                                                                                                                                                                                                           |
    | --------------------------- | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `name`                      | `string`   | —       |                                                                                                                                                                                                                                                                                                                                                                       |
    | `server`                    | `string`   | —       | One of: `microsoft365`, `websearch`.                                                                                                                                                                                                                                                                                                                                  |
    | `tenantId`                  | `string`   | —       | Your organization's Microsoft Entra directory (tenant) ID.                                                                                                                                                                                                                                                                                                            |
    | `clientId`                  | `string`   | —       | Entra public-client (PKCE) app registration ID.                                                                                                                                                                                                                                                                                                                       |
    | `azureCloud`                | `enum`     | —       | Microsoft cloud for sign-in and Graph. Leave as global for commercial Microsoft 365; US Government clouds require your own app registration (Client ID). One of: `global`, `us-gov-high`, `us-gov-dod`.                                                                                                                                                               |
    | `scope`                     | `string`   | —       | What the server may request at sign-in. If blank, Desktop's default read set is used.                                                                                                                                                                                                                                                                                 |
    | `toolPolicy`                | `object`   | —       | Lock the approval state for specific tools. Unlisted tools stay user-controlled.                                                                                                                                                                                                                                                                                      |
    | `headers`                   | `object`   | —       |                                                                                                                                                                                                                                                                                                                                                                       |
    | `headersHelper`             | `string`   | —       | Script that prints the auth header as a JSON object to stdout. Runs before each request (cached for the TTL below) so the key can come from a secrets manager instead of being stored inline.                                                                                                                                                                         |
    | `headersHelperTtlSec`       | `integer`  | —       |                                                                                                                                                                                                                                                                                                                                                                       |
    | `provider`                  | `enum`     | —       | Runs search from the desktop, for inference providers without native web search (Bedrock, custom gateways). On Anthropic API and Vertex, the model's built-in web search is available without this. Set the provider's auth header below — Brave: X-Subscription-Token, Exa: x-api-key, Tavily: Authorization (Bearer …). One of: `brave`, `tavily`, `exa`, `custom`. |
    | `customUrl`                 | `string`   | —       | POST endpoint accepting \{q} JSON and returning a results\[] array. Only used when provider is Custom.                                                                                                                                                                                                                                                                |
    | `transport`                 | `enum`     | —       | One of: `http`, `sse`, `stdio`.                                                                                                                                                                                                                                                                                                                                       |
    | `url`                       | `string`   | —       |                                                                                                                                                                                                                                                                                                                                                                       |
    | `oauth`                     | `object`   | —       |                                                                                                                                                                                                                                                                                                                                                                       |
    | `oauth.clientId`            | `string`   | —       |                                                                                                                                                                                                                                                                                                                                                                       |
    | `oauth.clientSecret`        | `string`   | —       | Only for IdPs whose token endpoint requires a client secret (e.g. Box). Leave blank for PKCE-only public clients.                                                                                                                                                                                                                                                     |
    | `oauth.clientSecretHelper`  | `string`   | —       | Executable that prints the client secret on stdout. Overrides the inline value.                                                                                                                                                                                                                                                                                       |
    | `oauth.authorizationServer` | `string[]` | —       | Issuer URLs the OAuth sign-in may use, as a JSON array. Pre-filled by presets; ask your IdP admin if unsure.                                                                                                                                                                                                                                                          |
    | `oauth.tenantId`            | `string`   | —       | Required for single-tenant Entra apps. Leave blank for multi-tenant or non-Microsoft IdPs.                                                                                                                                                                                                                                                                            |
    | `oauth.scope`               | `string`   | —       |                                                                                                                                                                                                                                                                                                                                                                       |
    | `oauth.appendOfflineAccess` | `boolean`  | —       | Adds offline\_access to the authorize request so the IdP returns a refresh token for silent renewal. Leave off if Scope already includes it or the server rejects it.                                                                                                                                                                                                 |
    | `oauth.callbackHost`        | `enum`     | —       | Use localhost only if your IdP's registered redirect URI specifies it. One of: `127.0.0.1`, `localhost`.                                                                                                                                                                                                                                                              |
    | `oauth.callbackPort`        | `integer`  | —       | Only set if your IdP requires an exact-match redirect port. Entra accepts any.                                                                                                                                                                                                                                                                                        |
    | `command`                   | `string`   | —       | Absolute path to the server executable, run on the user's machine.                                                                                                                                                                                                                                                                                                    |
    | `args`                      | `string[]` | —       |                                                                                                                                                                                                                                                                                                                                                                       |
    | `env`                       | `object`   | —       |                                                                                                                                                                                                                                                                                                                                                                       |
  </Accordion>
</AccordionGroup>

## Telemetry & updates

| Setting                                                                                                    | Type      | Availability    | Default | Description                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------- | --------- | --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="deploymentorganizationuuid" />Organization UUID<br />`deploymentOrganizationUuid`                | `string`  | MDM + Bootstrap | —       | A UUID you generate. Tags telemetry so Anthropic support can locate your fleet's events. If unset, a shared placeholder UUID is sent and your events can't be distinguished from other unconfigured deployments. Not used for auth. |
| <span id="disableessentialtelemetry" />Block essential telemetry<br />`disableEssentialTelemetry`          | `boolean` | MDM only        | `false` | Crash and performance reports to Anthropic. Defaults to `false`.                                                                                                                                                                    |
| <span id="disablenonessentialtelemetry" />Block nonessential telemetry<br />`disableNonessentialTelemetry` | `boolean` | MDM + Bootstrap | `false` | Product-usage analytics and diagnostic-report uploads. No message content. Defaults to `false`.                                                                                                                                     |
| <span id="disablenonessentialservices" />Block nonessential services<br />`disableNonessentialServices`    | `boolean` | MDM + Bootstrap | `false` | Favicon fetch and the artifact-preview iframe origin. Artifacts will not render. Defaults to `false`.                                                                                                                               |

<AccordionGroup>
  <Accordion title="disableEssentialTelemetry details">
    "Essential" means the signals Anthropic needs to keep your deployment working: **crash stacks**, **startup failure reasons**, and **version/OS metadata**. No prompts, completions, file contents, or identifiers beyond a random install ID.

    **What you lose when this is on:** when a Cowork build hits a bug that only reproduces on your OS version or locale, Anthropic can't see it unless a user manually reports. Fixes ship slower.

    **Why this is discouraged, not blocked:** some air-gapped environments require zero outbound telemetry as a matter of policy. The switch exists for them. If you don't have that constraint, leave it off.
  </Accordion>

  <Accordion title="disableNonessentialTelemetry details">
    "Nonessential" covers two things: **product-usage analytics** (which features get used, navigation patterns; no prompts or completions) and the **Send** action in Help → Generate Diagnostic Report. Turning this on stops both.

    Destination for both: `claude.ai`. Already listed under Egress Requirements → Nonessential telemetry.
  </Accordion>
</AccordionGroup>

### Auto update

| Setting                                                                                                    | Type      | Availability    | Default | Description                                                                                        |
| ---------------------------------------------------------------------------------------------------------- | --------- | --------------- | ------- | -------------------------------------------------------------------------------------------------- |
| <span id="disableautoupdates" />Block auto-updates<br />`disableAutoUpdates`                               | `boolean` | MDM + Bootstrap | `false` | Stop Cowork from fetching updates. You'll need to push new versions yourself. Defaults to `false`. |
| <span id="autoupdaterenforcementhours" />Auto-update enforcement window<br />`autoUpdaterEnforcementHours` | `integer` | MDM + Bootstrap | —       | Hours before a downloaded update force-installs. Blank = 72-hour default. Range: 1–72.             |

### OTLP

| Setting                                                                                             | Type     | Availability    | Default         | Description                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------- | -------- | --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="otlpendpoint" />OpenTelemetry collector endpoint<br />`otlpEndpoint`                      | `string` | MDM + Bootstrap | —               | Where Cowork sends OpenTelemetry logs and metrics. Leave blank to disable.                                                                                                                                          |
| <span id="otlpprotocol" />OpenTelemetry exporter protocol<br />`otlpProtocol`                       | `enum`   | MDM + Bootstrap | `http/protobuf` | grpc or http/protobuf. One of: `http/protobuf`, `http/json`, `grpc`. Defaults to `http/protobuf`.                                                                                                                   |
| <span id="otlpheaders" />OpenTelemetry exporter headers<br />`otlpHeaders`                          | `object` | MDM + Bootstrap | —               | Optional auth headers for the collector.                                                                                                                                                                            |
| <span id="otlpresourceattributes" />OpenTelemetry resource attributes<br />`otlpResourceAttributes` | `object` | MDM + Bootstrap | —               | Extra resource attributes to attach to every span/metric.                                                                                                                                                           |
| <span id="otlpdesktoploglevel" />Desktop telemetry export level<br />`otlpDesktopLogLevel`          | `enum`   | MDM + Bootstrap | `error`         | Controls the Claude Desktop application's events, separate from Cowork and Code sessions. Defaults to error. One of: `off`, `error`, `warn`, `info`, `debug`. Defaults to `error`.                                  |
| <span id="otlpcontentcapture" />Content capture categories<br />`otlpContentCapture`                | `enum[]` | MDM + Bootstrap | —               | Content categories the desktop exporter sends unredacted to your collector. Leave empty to redact all content (default). One of: `userPrompts`, `assistantResponses`, `toolDetails`, `toolContent`, `rawApiBodies`. |

<AccordionGroup>
  <Accordion title="otlpContentCapture details">
    Each category enables a class of raw content in OpenTelemetry events sent to your collector (this data never reaches Anthropic). `userPrompts` — user-typed prompt text. `assistantResponses` — assistant message text. `toolDetails` — tool input arguments, e.g. the web-search query string. `toolContent` — tool output content, e.g. fetched page text or command stdout. `rawApiBodies` — full inference API request and response bodies. These mirror Claude Code's `OTEL_LOG_*` env vars; see the [Claude Code monitoring docs](https://code.claude.com/docs/en/monitoring-usage).
  </Accordion>
</AccordionGroup>

## Usage limits

### Token limits

| Setting                                                                                           | Type      | Availability    | Default | Description                                                                                  |
| ------------------------------------------------------------------------------------------------- | --------- | --------------- | ------- | -------------------------------------------------------------------------------------------- |
| <span id="inferencemaxtokensperwindow" />Max tokens per window<br />`inferenceMaxTokensPerWindow` | `integer` | MDM + Bootstrap | —       | Per-user soft cap, counted client-side over the duration below. Not a server-enforced quota. |
| <span id="inferencetokenwindowhours" />Token cap window<br />`inferenceTokenWindowHours`          | `integer` | MDM + Bootstrap | —       | Tumbling window length for the token cap. Max 720 hours (30 days). Range: 1–720.             |

## Appearance

| Setting                                               | Type     | Availability    | Default | Description                                                         |
| ----------------------------------------------------- | -------- | --------------- | ------- | ------------------------------------------------------------------- |
| <span id="banner" />Organization banner<br />`banner` | `object` | MDM + Bootstrap | —       | A persistent banner across the top of the app window after sign-in. |

<AccordionGroup>
  <Accordion title="banner details">
    Use this for compliance notices, an internal-support link, or to identify the deployment. The banner is shown on every page after sign-in and cannot be dismissed by the user. Colors are six-digit hex (`#RRGGBB`); when `linkUrl` is set the banner text becomes an HTTPS link.

    | Field             | Type      | Default   | Description                                                                |
    | ----------------- | --------- | --------- | -------------------------------------------------------------------------- |
    | `enabled`         | `boolean` | —         |                                                                            |
    | `text`            | `string`  | —         | Single line, truncated on overflow. Maximum 200 characters.                |
    | `backgroundColor` | `string`  | `#F5F5F5` | Six-digit hex (#RRGGBB). Applied exactly as configured; not theme-adapted. |
    | `textColor`       | `string`  | `#000000` | Six-digit hex (#RRGGBB). Applied exactly as configured; not theme-adapted. |
    | `linkUrl`         | `string`  | —         | Optional HTTPS URL. The banner text becomes a link when set.               |
  </Accordion>
</AccordionGroup>

## Plugins & skills

| Setting                                                                                         | Type       | Availability    | Default | Description                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------- | ---------- | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="organizationpluginsurl" />Organization plugins endpoint<br />`organizationPluginsUrl` | `string`   | MDM + Bootstrap | —       | Typically supplied by your bootstrap server. Ignored when bootstrap is disabled.                                                                                                                                    |
| <span id="orgpluginsettings" />Organization plugin settings<br />`orgPluginSettings`            | `object[]` | MDM + Bootstrap | —       | Admin policy applied to plugin-delivered MCP servers.                                                                                                                                                               |
| <span id="allowedpluginmarketplaces" />Plugin marketplaces<br />`allowedPluginMarketplaces`     | `object[]` | MDM only · Beta | —       | Git repositories to surface as plugin marketplaces in the Directory's Organization tab. Users can browse and install plugins from these sources; the app re-clones each repository periodically to pick up updates. |

<AccordionGroup>
  <Accordion title="orgPluginSettings details">
    Applies `toolPolicy` locks to MCP servers that arrive via the org-plugins directory, keyed by server name. Either shape is accepted; when hand-authoring a profile, use the legacy record shape until your fleet floor parses the canonical array form:

    ```json theme={null}
    {"mcpServers": {"internal-search": {"toolPolicy": {"delete_document": "blocked"}}}}
    ```

    If a Managed MCP servers entry and an org-plugin server share a name, the Managed MCP servers entry wins and its `toolPolicy` (if any) applies; the entry here for that name is ignored.

    | Field              | Type       | Default | Description                        |
    | ------------------ | ---------- | ------- | ---------------------------------- |
    | `serverName`       | `string`   | —       |                                    |
    | `tools`            | `object[]` | —       |                                    |
    | `tools.toolName`   | `string`   | —       |                                    |
    | `tools.permission` | `enum`     | —       | One of: `allow`, `ask`, `blocked`. |
  </Accordion>

  <Accordion title="allowedPluginMarketplaces details">
    | Field                    | Type     | Default | Description                                                                                                                                                                                     |
    | ------------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `source`                 | `string` | —       | One of: `github`, `git`.                                                                                                                                                                        |
    | `repo`                   | `string` | —       |                                                                                                                                                                                                 |
    | `ref`                    | `string` | —       |                                                                                                                                                                                                 |
    | `path`                   | `string` | —       |                                                                                                                                                                                                 |
    | `expectedName`           | `string` | —       | The marketplace's manifest name. When set, the host clone is rejected if the repository's manifest.name differs — so an upstream rename cannot silently replace another configured marketplace. |
    | `installationPreference` | `enum`   | —       | One of: `available`, `auto_install`, `required`.                                                                                                                                                |
    | `credentialKind`         | `enum`   | —       | One of: `anonymous`, `userGit`, `credentialHelper`.                                                                                                                                             |
    | `credentialHelper`       | `string` | —       |                                                                                                                                                                                                 |
    | `url`                    | `string` | —       |                                                                                                                                                                                                 |
  </Accordion>
</AccordionGroup>

## Source

| Setting                                                                 | Type     | Availability   | Default | Description                                                                                                                                          |
| ----------------------------------------------------------------------- | -------- | -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span id="claudeaiimport" />Claude.ai data import<br />`claudeAiImport` | `object` | Bootstrap only | —       | Export endpoint and OAuth client for importing a user's Claude.ai conversation history into this deployment. Delivered by the bootstrap server only. |

<AccordionGroup>
  <Accordion title="claudeAiImport details">
    | Field           | Type     | Default | Description |
    | --------------- | -------- | ------- | ----------- |
    | `url`           | `string` | —       |             |
    | `oauthIssuer`   | `string` | —       |             |
    | `oauthClientId` | `string` | —       |             |
  </Accordion>
</AccordionGroup>

### Bootstrap

| Setting                                                                    | Type      | Availability | Default | Description                                                                                                                        |
| -------------------------------------------------------------------------- | --------- | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| <span id="bootstrapenabled" />Use bootstrap config<br />`bootstrapEnabled` | `boolean` | MDM only     | `true`  | Fetch and apply the URL above at launch. Turn off to keep the URL saved but skip the fetch. Defaults to `true`.                    |
| <span id="bootstrapurl" />Bootstrap config URL<br />`bootstrapUrl`         | `string`  | MDM only     | —       | HTTPS endpoint that returns a per-user JSON config overlay. Values from the response override local settings and become read-only. |
| <span id="bootstrapoidc" />Bootstrap OIDC parameters<br />`bootstrapOidc`  | `object`  | MDM only     | —       | When set, the bootstrap request sends a Bearer token from a browser sign-in (authorization-code-with-PKCE).                        |

<AccordionGroup>
  <Accordion title="bootstrapOidc details">
    Set this to use a separate identity provider (Microsoft Entra ID, Okta, Ping, or any compliant OIDC provider) for the bootstrap sign-in. The app runs an authorization-code-with-PKCE flow in the system browser. Omit to use device-code mode against the bootstrap server's own origin.

    This is an **object-typed key** — in an MDM profile it is a single JSON-string value, not separate keys with dotted names like `bootstrapOidc.clientId`. Writing the sub-fields as separate registry values causes the app to silently fall through to device-code mode.

    | Field              | Type      | Default | Description                                                                            |
    | ------------------ | --------- | ------- | -------------------------------------------------------------------------------------- |
    | `clientId`         | `string`  | —       |                                                                                        |
    | `issuer`           | `string`  | —       |                                                                                        |
    | `authorizationUrl` | `string`  | —       |                                                                                        |
    | `tokenUrl`         | `string`  | —       |                                                                                        |
    | `scopes`           | `string`  | —       | Space-separated; the token's audience must match what your bootstrap server validates. |
    | `redirectPort`     | `integer` | —       |                                                                                        |
  </Accordion>
</AccordionGroup>

## Guides

### Recommended security profiles

The profiles below are illustrative examples rather than built-in presets, and the labels are descriptive only. Use them as starting points and adjust for your environment. Layer the inference-provider keys for your cloud on top of whichever profile you choose.

<Tabs>
  <Tab title="Standard">
    Recommended for most enterprise deployments. Telemetry and auto-updates stay on so Anthropic can diagnose issues and ship fixes; users can extend Claude Desktop with their own connectors.

    | Key                                                                           | Value              |
    | ----------------------------------------------------------------------------- | ------------------ |
    | [`deploymentOrganizationUuid`](#deploymentorganizationuuid)                   | `<your-org-uuid>`  |
    | [`autoUpdaterEnforcementHours`](#autoupdaterenforcementhours)                 | `24`               |
    | [`isDesktopExtensionSignatureRequired`](#isdesktopextensionsignaturerequired) | `true`             |
    | [`otlpEndpoint`](#otlpendpoint)                                               | `<your-collector>` |
  </Tab>

  <Tab title="Restricted">
    For regulated environments that need to control what users can connect Claude Desktop to, while keeping Anthropic supportability.

    | Key                                                             | Value                             |
    | --------------------------------------------------------------- | --------------------------------- |
    | [`deploymentOrganizationUuid`](#deploymentorganizationuuid)     | `<your-org-uuid>`                 |
    | [`disableNonessentialTelemetry`](#disablenonessentialtelemetry) | `true`                            |
    | [`disableNonessentialServices`](#disablenonessentialservices)   | `true`                            |
    | [`isLocalDevMcpEnabled`](#islocaldevmcpenabled)                 | `false`                           |
    | [`isDesktopExtensionEnabled`](#isdesktopextensionenabled)       | `false`                           |
    | [`allowedWorkspaceFolders`](#allowedworkspacefolders)           | `[{"path":"~/Documents/Claude"}]` |
    | [`coworkEgressAllowedHosts`](#coworkegressallowedhosts)         | `["*.example.corp"]`              |
    | [`otlpEndpoint`](#otlpendpoint)                                 | `<your-collector>`                |
  </Tab>

  <Tab title="Locked down">
    For air-gapped or maximally restricted environments. **The only traffic leaving the device goes to your inference endpoint and OTLP collector.** With this profile, Anthropic has zero remote visibility, so your team owns log collection and update distribution.

    | Key                                                             | Value                             |
    | --------------------------------------------------------------- | --------------------------------- |
    | [`disableEssentialTelemetry`](#disableessentialtelemetry)       | `true`                            |
    | [`disableNonessentialTelemetry`](#disablenonessentialtelemetry) | `true`                            |
    | [`disableNonessentialServices`](#disablenonessentialservices)   | `true`                            |
    | [`disableAutoUpdates`](#disableautoupdates)                     | `true`                            |
    | [`isLocalDevMcpEnabled`](#islocaldevmcpenabled)                 | `false`                           |
    | [`isDesktopExtensionEnabled`](#isdesktopextensionenabled)       | `false`                           |
    | [`disabledBuiltinTools`](#disabledbuiltintools)                 | `["WebSearch","WebFetch"]`        |
    | [`coworkEgressAllowedHosts`](#coworkegressallowedhosts)         | `[]`                              |
    | [`allowedWorkspaceFolders`](#allowedworkspacefolders)           | `[{"path":"~/Documents/Claude"}]` |
    | [`otlpEndpoint`](#otlpendpoint)                                 | `<your-collector>`                |
  </Tab>
</Tabs>
