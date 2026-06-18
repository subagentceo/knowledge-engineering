> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration reference

> Every managed-configuration key Cowork on 3P supports, what it controls, and recommended security profiles

Cowork on third-party (3P) is configured entirely through OS-native managed preferences: a `.mobileconfig` profile on macOS or registry policy on Windows. This page documents every supported key.

The easiest way to author a configuration is the in-app configuration window (**Developer → Configure third-party inference**), which validates values, shows per-provider requirements, and exports directly to `.mobileconfig` or `.reg`. Use this reference when you need to author policy by hand, audit an existing profile, or understand exactly what a key does.

## How keys are read

| Platform | Managed (MDM) location                                                            | Local (user) location                                    |
| -------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- |
| macOS    | `/Library/Managed Preferences/<user>/com.anthropic.claudefordesktop.plist`        | `~/Library/Application Support/Claude-3p/configLibrary/` |
| Windows  | `HKLM\SOFTWARE\Policies\Claude` (machine), `HKCU\SOFTWARE\Policies\Claude` (user) | `%LOCALAPPDATA%\Claude-3p\configLibrary\`                |

The local location is a directory: `_meta.json` records which saved configuration is applied, and each configuration is a `<id>.json` file alongside it. The in-app configuration window writes here.

When a managed source is present, it wins and locally written values are ignored. Configuration is read **once at launch**, so fully quit and reopen the app after any change. See [Installation and setup](/cowork/3p/installation) for the full precedence rules.

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

The sections below match the sidebar of the in-app configuration window.

***

<div className="cfg-keys">
  ## Source

  These keys point Claude Desktop at a [bootstrap server](/cowork/3p/bootstrap) that returns the rest of the configuration per user at sign-in. When a bootstrap response is in effect, it replaces every bootstrap-settable key below; the values in this profile are not consulted.

  | Setting                                        | Type          | Default | Description                                                                                                                                                                                                                                         |
  | ---------------------------------------------- | ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Bootstrap config URL<br />`bootstrapUrl`       | string (URL)  | unset   | HTTPS endpoint of your bootstrap server. Setting this enables bootstrap.                                                                                                                                                                            |
  | Use bootstrap config<br />`bootstrapEnabled`   | boolean       | `true`  | Set to `false` to keep `bootstrapUrl` configured but skip the fetch.                                                                                                                                                                                |
  | Bootstrap OIDC parameters<br />`bootstrapOidc` | object (JSON) | unset   | Identity-provider settings for the PKCE sign-in mode. Omit to use device-code mode against the bootstrap server's own origin. See [Per-user configuration with a bootstrap server](/cowork/3p/bootstrap) for the sub-fields and per-provider setup. |

  ## Connection

  ### Activation

  | Setting                                                | Type          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
  | ------------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | Inference provider<br />`inferenceProvider`            | string        | Selects the inference backend. One of `anthropic`, `gateway`, `vertex`, `bedrock`, `mantle`, `foundry`. **3P mode activates only when this key is set *and* the required credential keys for the selected provider are present and valid**; otherwise the app launches in standard mode.                                                                                                                                                                                                                                                                                                                                 |
  | Credential kind<br />`inferenceCredentialKind`         | string        | Selects the credential source for the chosen provider. One of `static` (an API key you supply), `helper-script` (an executable that returns a short-lived credential — see [Credential helper](#credential-helper)), `interactive` (the user signs in through their browser), or `vendor-profile` (the cloud vendor's own CLI or SDK profile). When set, only that source is used and the app does not fall back to another. Optional — when unset, the app derives the kind from which credential keys are present. Not all kinds are available for every provider; see each provider's page for the supported options. |
  | Custom inference headers<br />`inferenceCustomHeaders` | object (JSON) | Extra HTTP headers sent on every inference request to the configured provider, as a JSON object mapping header name to value (e.g. `{"X-Org-Id":"team1"}`). A JSON array of `"Name: Value"` strings is also accepted for compatibility. Applies to all providers. The former name `inferenceGatewayHeaders` is still accepted as an alias.                                                                                                                                                                                                                                                                               |

  ### Provider credentials

  Each provider has its own required keys, documented on its dedicated page below. Keys for providers other than the one selected in `inferenceProvider` are ignored.

  <CardGroup cols={2}>
    <Card title="Google Cloud's Vertex AI" href="/cowork/3p/vertex">
      `inferenceProvider: "vertex"`
    </Card>

    <Card title="Amazon Bedrock" href="/cowork/3p/bedrock">
      `inferenceProvider: "bedrock"`
    </Card>

    <Card title="Amazon Bedrock Mantle" href="/cowork/3p/mantle">
      `inferenceProvider: "mantle"`
    </Card>

    <Card title="Microsoft Foundry" href="/cowork/3p/foundry">
      `inferenceProvider: "foundry"`
    </Card>

    <Card title="LLM gateway" href="/cowork/3p/gateway">
      `inferenceProvider: "gateway"`
    </Card>
  </CardGroup>

  In the in-app configuration window, each provider's credentials card has a **Test connection** button that makes a minimal inference request with the values you've entered, and a **Test model discovery** button that calls the provider's model-list endpoint. Use them to validate credentials and reachability before exporting.

  #### Anthropic API

  When `inferenceProvider` is `anthropic`, inference goes directly to the Anthropic API. This option does not offer third-party data residency; see the [overview](/cowork/3p/overview) for what that means for the compliance statements on these pages.

  | Setting                                           | Required                         | Description                                                                                                  |
  | ------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
  | Anthropic API key<br />`inferenceAnthropicApiKey` | Unless using a credential helper | Anthropic API key (`sk-ant-…`). Leave unset to supply the key via a [credential helper](#credential-helper). |

  ### Credential helper

  For environments where static API keys aren't permitted, Cowork on 3P can invoke an executable you provide to fetch a short-lived credential at runtime.

  | Setting                                                                               | Type    | Description                                                                                                                                                                                                                                                                                                |
  | ------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Helper script<br />`inferenceCredentialHelper`                                        | string  | Absolute path to an executable on the host. Its **stdout** is used as the inference credential, replacing the static API-key key for the chosen provider. May print a bare token or a JSON object — see below.                                                                                             |
  | Helper script TTL<br />`inferenceCredentialHelperTtlSec`                              | integer | Cache the helper's output for this many seconds before re-running it. Default `3600`.                                                                                                                                                                                                                      |
  | Credential helper timeout<br />`inferenceCredentialHelperTimeoutSec`                  | integer | Maximum seconds to wait for the helper executable to finish before treating the run as failed. Default `60`. Raise this if the helper opens a browser for interactive sign-in.                                                                                                                             |
  | Re-run helper for silent refresh<br />`inferenceCredentialHelperSilentRefreshEnabled` | boolean | When a running session's credential is rejected mid-turn, re-run the helper (with a 20-second timeout) to recover silently. Default `true`. Set to `false` if your helper cannot run non-interactively; the app then prompts the user to start a new session instead of re-running the helper mid-session. |

  The helper runs on the host (outside the sandbox) and applies to all providers, including Google Cloud's Vertex AI. For Vertex the helper's token is sent as the bearer on each request; combine with [`inferenceCustomHeaders`](#activation) or return `headers` from the helper JSON if your deployment requires additional per-request headers. Pair the helper with your organization's SSO, secrets manager, or PKI tooling.

  The script may print either a bare credential string, or a JSON object of the form `{"token": "...", "headers": {"X-Name": "Value", ...}}`. When JSON is returned, `token` is used as the credential and each entry in `headers` is sent as a custom HTTP header on every inference request. These headers are merged with [`inferenceCustomHeaders`](#activation); on a name conflict, the helper's value wins.

  The app sets the `CLAUDE_HELPER_CONTEXT` environment variable on every invocation so the script can tell a user-initiated session start from a mid-session refresh or a background health check. See [Write a credential helper](/cowork/3p/credential-helper) for the full stdout contract, the context values, and timeout behavior.

  #### Credential expiry and refresh

  The app checks the active credential's expiry before each turn and refreshes it silently when possible — re-running the helper (unless `inferenceCredentialHelperSilentRefreshEnabled` is `false`), or using the stored refresh token for interactive sign-in kinds. If the provider returns HTTP 401 mid-turn, the app attempts the same silent refresh before surfacing an error. When silent refresh fails, a prompt appears with a provider-specific action — a re-sign-in button for interactive sign-in kinds, or an admin-contact message for static credentials. This applies to all providers, including Vertex AI and Bedrock IAM Identity Center sign-in, and to both the Cowork and Code tabs.

  In the in-app configuration window, the **Helper script** card has a **Test script** button that executes the script once and shows a status chip with the exit code, the run time, and whether stdout produced a non-empty credential. Use it to validate the script before exporting the configuration.

  ### Models

  | Setting                                      | Type                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
  | -------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | Model discovery<br />`modelDiscoveryEnabled` | boolean                      | Auto-populate the model picker from the provider's model-list endpoint at launch. Leave unset for automatic behavior: discovery runs, except for gateway providers when `inferenceModels` is set and contains only full model IDs (no bare `haiku`/`sonnet`/`opus` aliases), in which case the app skips the model-list call and uses your list as-is. Set `true` to always run discovery, or `false` to never run it; when off, `inferenceModels` is required and must contain full model IDs (short aliases like `sonnet` are resolved via discovery).                                                                                                                                                                 |
  | Model list<br />`inferenceModels`            | (string \| object)\[] (JSON) | Models to expose in the picker. Use the **provider's exact model ID**: Vertex publisher IDs (`claude-sonnet-4@20250514`), Bedrock inference-profile IDs (`us.anthropic.claude-sonnet-4-...-v1:0`), or Foundry deployment names. The first entry is the default. **Required for Vertex, Mantle, and Foundry**; Bedrock auto-discovers when using a bearer token (set explicitly for profile/SSO auth); gateways auto-discover available models unless this list is set with only full model IDs (see Model discovery above). Entries may be plain strings or objects of the form `{"name": "<id>", "labelOverride": "<label>", "supports1m": true, "anthropicFamilyTier": "<tier>", "isFamilyDefault": true}`; see below. |

  #### Offering a 1M-token context variant

  If your provider serves a model with the extended 1M-token context window, you can expose it as a separate picker entry by setting `supports1m: true` on that model's entry:

  ```json theme={null}
  "inferenceModels": [
    { "name": "claude-opus-4", "supports1m": true },
    "claude-sonnet-4"
  ]
  ```

  `supports1m` is a capability assertion you make about your deployment — Cowork doesn't probe the provider to verify it. Only set it for models you've confirmed support the extended window; selecting a 1M variant on a model that doesn't will fail mid-session once the conversation grows past the model's actual limit.

  <Note>
    **Gateway:** the `name` must be the exact ID your gateway's `/v1/models` endpoint returns. If you set `supports1m` on an alias (`sonnet`) but discovery returns the full ID (`claude-sonnet-4-6`), the variant won't appear.
  </Note>

  #### Setting a display label

  By default, Cowork derives a friendly picker label from the model ID. For IDs where that derivation falls through (Bedrock application-inference-profile ARNs, provisioned-throughput ARNs, or gateway routing aliases), set `labelOverride` to the text you want shown in the model picker:

  ```json theme={null}
  "inferenceModels": [
    {
      "name": "arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/abc123",
      "labelOverride": "Claude Opus (Prod)"
    },
    { "name": "us.anthropic.claude-sonnet-4-20250514-v1:0" }
  ]
  ```

  `labelOverride` is display-only; the `name` value is still what Cowork sends to the provider.

  #### Mapping a model to a Claude tier

  The Code tab and some Cowork features refer to models by tier alias — `haiku`, `sonnet`, `opus`, `fable`, `mythos` — rather than by full ID. When your provider uses its own model IDs (for example Bedrock inference-profile IDs or gateway routing aliases), set `anthropicFamilyTier` on each entry so the app knows which Claude tier that ID stands in for:

  ```json theme={null}
  "inferenceModels": [
    { "name": "us.anthropic.claude-opus-4-20250514-v1:0", "anthropicFamilyTier": "opus" },
    { "name": "us.anthropic.claude-sonnet-4-20250514-v1:0", "anthropicFamilyTier": "sonnet" }
  ]
  ```

  This controls which of your configured models is used when the app asks for a bare tier alias, and which model the Code tab falls back to when a higher tier refuses a request. An unknown value is silently dropped; the entry is kept. When more than one entry shares the same tier (for example a standard and a 1M-context variant), set `isFamilyDefault: true` on the one that should win; otherwise the first matching entry is used.

  ## Workspace restrictions

  | Setting                                                                 | Type             | Default                 | Description                                                                                                                                                                                                                                                                                                                                                        |
  | ----------------------------------------------------------------------- | ---------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | Disable Claude.ai sign-in<br />`disableDeploymentModeChooser`           | boolean          | `false`                 | When `true`, hides the **Sign in to Anthropic** option on the sign-in screen so users see only the third-party option from this configuration. The screen itself still appears. Any previously persisted sign-in choice is ignored.                                                                                                                                |
  | Built-in tool policy<br />`builtinToolPolicy`                           | object (JSON)    | `{}`                    | Per-tool approval policy, as a JSON object mapping tool name to `"allow"` or `"ask"`. `"ask"` requires user approval before each call; `"allow"` (the default) runs without a prompt. Valid tool names are the same as for `disabledBuiltinTools` below. To remove a tool entirely, use `disabledBuiltinTools` — `"blocked"` is not accepted here.                 |
  | Allow Auto mode<br />`autoModeEnabled`                                  | boolean          | `false`                 | Offer Auto mode in the Cowork and Code permission selectors. See [Auto mode](#auto-mode) below.                                                                                                                                                                                                                                                                    |
  | Disabled built-in tools<br />`disabledBuiltinTools`                     | string\[] (JSON) | `[]`                    | Built-in tool names to remove from the agent entirely (e.g. `["WebSearch","Bash"]`). Valid names: `Bash`, `Read`, `Write`, `Edit`, `Glob`, `Grep`, `NotebookEdit`, `WebFetch`, `WebSearch`, `Task`, `TodoWrite`, `TaskCreate`, `TaskUpdate`, `TaskGet`, `TaskList`, `TaskStop`, `Skill`, `REPL`, `JavaScript`, `AskUserQuestion`, `ToolSearch`, `SendUserMessage`. |
  | Allowed workspace folders<br />`allowedWorkspaceFolders`                | string\[] (JSON) | unrestricted            | Absolute paths users may attach as workspace folders. Leading `~` expands to the user's home. When set, any path outside this list is rejected.                                                                                                                                                                                                                    |
  | Allowed egress hosts<br />`coworkEgressAllowedHosts`                    | string\[] (JSON) | inference endpoint only | Hostnames the agent's web-fetch and shell tools may reach. Supports `*.example.com` wildcards. `["*"]` disables egress filtering. The configured inference endpoint is always allowed implicitly. When unset, only the inference endpoint is reachable; the agent's package installs and web fetches will fail.                                                    |
  | Allow Cowork tab<br />`coworkTabEnabled`                                | boolean          | `true`                  | Show the Cowork tab. At least one of Cowork, Code, or Chat must remain enabled; if all are disabled, the app re-enables Cowork with a warning.                                                                                                                                                                                                                     |
  | Allow Claude Code tab<br />`isClaudeCodeForDesktopEnabled`              | boolean          | `true`                  | Show the Code tab.                                                                                                                                                                                                                                                                                                                                                 |
  | Allow Chat tab<br />`chatTabEnabled`                                    | boolean          | `false`                 | Show the Chat tab for quick questions and drafting. Opt-in. The Chat tab is a beta feature, so it is also hidden when `betaFeaturesEnabled` is `false`.                                                                                                                                                                                                            |
  | Allow code execution in Chat<br />`chatCodeExecutionEnabled`            | boolean          | `false`                 | Allow Claude to analyze attachments and create files by running code in an isolated sandbox during Chat conversations. The sandbox can read only the files attached to the conversation. Has no effect unless `chatTabEnabled` is `true`, and is forced off when `Bash` is in `disabledBuiltinTools`. Beta feature.                                                |
  | Allow beta features<br />`betaFeaturesEnabled`                          | boolean          | `true`                  | Allow features that are marked as beta in the app. When `false`, beta features are hidden from the UI, and the app also refuses to start sessions for them.                                                                                                                                                                                                        |
  | Disable claude:// deep-link handling<br />`disableDeepLinkRegistration` | boolean          | `false`                 | Stop the app registering as the `claude://` URL handler, so external apps and websites can't open Cowork via deep links.                                                                                                                                                                                                                                           |

  <Note>
    `coworkEgressAllowedHosts` applies to **both** the Cowork and Code tabs. In the Cowork tab it governs the sandbox's web fetch, shell commands, and package installs. In the Code tab it is [translated into Claude Code's network sandbox allowlist](/cowork/3p/code#applied-as-managed-policy); if you have also deployed a separate Claude Code managed-settings file on the endpoint, that policy takes precedence by default — see [Interaction with Claude Code's own managed settings](/cowork/3p/code#interaction-with-claude-codes-own-managed-settings).

    It does **not** apply to [Web Search](/cowork/3p/web-tools#web-search), which runs server-side at your inference provider rather than from the sandbox.
  </Note>

  ### Auto mode

  When `autoModeEnabled` is `true`, users can select **Act without asking** in the Cowork tab and **Auto mode** in the Code tab. In this mode, Claude runs a safety classifier on each action and only prompts for approval on actions it judges risky, instead of following the static per-tool policy.

  Auto mode requires a model that supports the classifier; on older models the option is shown greyed out. `builtinToolPolicy` and `autoModeEnabled` may both be set — Auto mode is a user-selectable option alongside the default policy, not a replacement for it.

  In the Code tab, a separately deployed Claude Code [managed-settings](/cowork/3p/code#interaction-with-claude-codes-own-managed-settings) file that sets `disableAutoMode` to `"disable"` overrides this key and keeps Auto mode hidden.

  ## Connectors & extensions

  | Setting                                                              | Type             | Default | Description                                                                                                                                               |
  | -------------------------------------------------------------------- | ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Managed MCP servers<br />`managedMcpServers`                         | object\[] (JSON) | `[]`    | Remote MCP servers deployed to all users. See [schema](#managedmcpservers).                                                                               |
  | Allow user-added MCP servers<br />`isLocalDevMcpEnabled`             | boolean          | `true`  | Allow users to add their own local MCP servers from **Settings → Developer**. End users cannot add remote MCP servers regardless of this setting.         |
  | Allow desktop extensions<br />`isDesktopExtensionEnabled`            | boolean          | `true`  | Allow installing local desktop extensions (`.mcpb`).                                                                                                      |
  | Require signed extensions<br />`isDesktopExtensionSignatureRequired` | boolean          | `false` | Reject unsigned desktop extensions.                                                                                                                       |
  | Organization plugin settings<br />`orgPluginSettings`                | object (JSON)    | `{}`    | Per-tool policy for MCP servers delivered via [organization plugins](/cowork/3p/extensions#organization-plugins-admin). See [schema](#orgpluginsettings). |

  See [MCP, plugins, skills, and hooks](/cowork/3p/extensions) for the org-plugins directory layout and the full `managedMcpServers` schema.

  ### `managedMcpServers`

  A JSON-stringified array of server objects:

  | Field                 | Required         | Description                                                                                                                                                                                                                                  |
  | --------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `name`                | Yes              | Unique display name.                                                                                                                                                                                                                         |
  | `url`                 | For `http`/`sse` | Server URL. Must be `https://`.                                                                                                                                                                                                              |
  | `transport`           | —                | `"http"` (default), `"sse"`, or `"stdio"` for a local command.                                                                                                                                                                               |
  | `headers`             | —                | Static string→string header map. Mutually exclusive with `oauth`.                                                                                                                                                                            |
  | `headersHelper`       | —                | Absolute path to an executable that prints a JSON header object on stdout, for short-lived auth tokens. Mutually exclusive with `oauth`.                                                                                                     |
  | `headersHelperTtlSec` | —                | Cache helper output for this many seconds. Default `300`.                                                                                                                                                                                    |
  | `oauth`               | —                | Enables a browser-based OAuth flow; tokens stored in the OS keychain. Set to `true` for dynamic client registration, or to an object that supplies a pre-registered client (see below). Mutually exclusive with `headers` / `headersHelper`. |
  | `toolPolicy`          | —                | Map of tool name → `"allow"` / `"ask"` / `"blocked"`. Locks the per-tool approval state for that server.                                                                                                                                     |
  | `command`             | For `stdio`      | Absolute path to the executable to spawn.                                                                                                                                                                                                    |
  | `args`                | —                | Command-line arguments (`stdio` only).                                                                                                                                                                                                       |
  | `env`                 | —                | Environment variables for the spawned process (`stdio` only).                                                                                                                                                                                |

  When the MCP server's OAuth provider doesn't support dynamic client registration (for example, Slack or Microsoft Entra ID), set `oauth` to an object describing a client you've registered with that provider:

  | `oauth` field         | Required                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
  | --------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `clientId`            | Yes                                                | Client ID of the pre-registered OAuth client.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
  | `clientSecret`        | —                                                  | Client secret for confidential-client IdPs whose token endpoint requires one (e.g. Box). Sent only to the authorization server's token endpoint, never to the MCP server.                                                                                                                                                                                                                                                                                                                            |
  | `clientSecretHelper`  | —                                                  | Absolute path to an executable that prints `{"clientSecret":"..."}` on stdout. Overrides `clientSecret` when both are set. Managed configuration only.                                                                                                                                                                                                                                                                                                                                               |
  | `authorizationServer` | When `clientSecret` or `clientSecretHelper` is set | Array of issuer URLs the OAuth flow may use, pinned so a compromised MCP server can't redirect the token exchange.                                                                                                                                                                                                                                                                                                                                                                                   |
  | `tenantId`            | —                                                  | Tenant ID, for providers that scope clients to a tenant (e.g. Microsoft Entra ID).                                                                                                                                                                                                                                                                                                                                                                                                                   |
  | `scope`               | When `tenantId` is set                             | Space-separated OAuth scopes to request. Required when `tenantId` is set (pinning the authority skips discovery, so scope can't be inferred).                                                                                                                                                                                                                                                                                                                                                        |
  | `appendOfflineAccess` | —                                                  | Controls whether the `offline_access` scope is added to the authorization request. When unset, the app appends it only if the authorization server's discovered metadata lists it in `scopes_supported`. Set to `true` to always append it, or to `false` to never append it automatically; a value already present in `scope` is kept either way. Applies to pre-registered clients and to dynamic client registration; for the latter, set `oauth` to an object with this field and no `clientId`. |
  | `callbackPort`        | —                                                  | Loopback port the client's registered redirect URI uses (1024–65535). Defaults to `53280`.                                                                                                                                                                                                                                                                                                                                                                                                           |
  | `callbackHost`        | —                                                  | Loopback host: `127.0.0.1` (default) or `localhost`. Set to match the registered redirect URI exactly.                                                                                                                                                                                                                                                                                                                                                                                               |

  The app builds the redirect URI as `http://<callbackHost>:<callbackPort>/callback`; register that exact value with the OAuth provider. OAuth-authenticated connectors refresh their access token automatically during a session, so users are not interrupted when the initial token expires.

  #### `toolPolicy`

  Each value controls what users see when Claude calls that tool:

  | Value          | Behavior in the Cowork tab                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
  | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `"blocked"`    | The tool is removed from the session entirely and labeled "Blocked by your admin" in connector settings.                                                                                                                                                                                                                                                                                                                                                                                                         |
  | `"ask"`        | Every call requires approval. The prompt offers **Allow once** or **Deny** only. There is no persistent always-allow option, and any always-allow the user saved before the policy took effect is ignored.                                                                                                                                                                                                                                                                                                       |
  | `"allow"`      | The tool is pre-approved and runs without an approval prompt.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
  | *(not listed)* | The user decides: the approval prompt includes an **Always allow** option that persists across sessions (unless another organization setting disables persistent approvals). For tools that can modify data (anything the server doesn't mark read-only), the prompt instead shows a warning that malicious instructions in files, emails, or web content could trick Claude into unintended actions, offers a session-scoped **Allow for this task**, and labels the persistent option **Allow for all tasks**. |

  In the Code tab, `blocked` and `ask` are enforced as Claude Code permission rules (see [Applied as managed policy](/cowork/3p/code#applied-as-managed-policy)); `allow` is not forwarded there. The tool follows Claude Code's normal prompting, the same as a tool that isn't listed.

  ### `orgPluginSettings`

  A JSON-stringified object that applies `toolPolicy` locks to MCP servers delivered through the [org-plugins directory](/cowork/3p/extensions#organization-plugins-admin), keyed by server name:

  ```json theme={null}
  {
    "mcpServers": {
      "internal-search": { "toolPolicy": { "delete_document": "blocked" } }
    }
  }
  ```

  If a `managedMcpServers` entry and an org-plugin server share a name, the `managedMcpServers` entry wins and its `toolPolicy` (if any) applies; the `orgPluginSettings` entry for that name is ignored.

  ## Telemetry & updates

  See [Telemetry and egress](/cowork/3p/telemetry) for what each category sends and the network paths involved.

  ### Anthropic telemetry and updates

  | Setting                                                           | Type    | Default | Description                                                                                                                                                                     |
  | ----------------------------------------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Organization UUID<br />`deploymentOrganizationUuid`               | string  | —       | A UUID **you generate** to identify your deployment, in standard `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` format. Used to attribute telemetry to your organization.               |
  | Block essential telemetry<br />`disableEssentialTelemetry`        | boolean | `false` | Block crash reports and error telemetry to Anthropic. **Disabling this opts you into a manual support model** in which your team collects and sends logs to Anthropic directly. |
  | Block nonessential telemetry<br />`disableNonessentialTelemetry`  | boolean | `false` | Block product-usage analytics to Anthropic.                                                                                                                                     |
  | Block nonessential services<br />`disableNonessentialServices`    | boolean | `false` | Block non-critical third-party services: connector favicons and the artifact-preview iframe.                                                                                    |
  | Block auto-updates<br />`disableAutoUpdates`                      | boolean | `false` | Block update checks and downloads from Anthropic. Your IT team must redistribute new builds.                                                                                    |
  | Auto-update enforcement window<br />`autoUpdaterEnforcementHours` | integer | `72`    | Force a pending update to install after this many hours (1–72). Ignored when auto-updates are disabled.                                                                         |

  <Note>
    Generate and set `deploymentOrganizationUuid` before rollout. Anthropic uses this value to locate crash reports and telemetry from your fleet when you open a support case. If it's unset, your telemetry is tagged with a shared placeholder UUID (`00000000-0000-4000-8000-000000000001`) that every unconfigured deployment also uses, and Anthropic cannot distinguish your organization's events from anyone else's.
  </Note>

  ### OpenTelemetry export

  Export full session activity to your own collector. See [Monitoring](/cowork/monitoring) for the event schema.

  | Setting                                                         | Type          | Description                                                                                                                                                                                                                                                                                                                                                  |
  | --------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | OpenTelemetry collector endpoint<br />`otlpEndpoint`            | string        | Base URL of your OTLP collector. When set, sessions export logs and metrics (prompts, tool calls, token counts). The endpoint host is automatically added to the sandbox network allowlist.                                                                                                                                                                  |
  | OpenTelemetry exporter protocol<br />`otlpProtocol`             | string        | `http/protobuf` (default), `http/json`, or `grpc`.                                                                                                                                                                                                                                                                                                           |
  | OpenTelemetry exporter headers<br />`otlpHeaders`               | object (JSON) | Headers sent on every OTLP request, as a JSON object mapping header name to value (e.g. `{"Authorization":"Bearer …"}`). A comma-separated `key=value` string (the `OTEL_EXPORTER_OTLP_HEADERS` format) is also accepted for compatibility.                                                                                                                  |
  | OpenTelemetry resource attributes<br />`otlpResourceAttributes` | object (JSON) | Extra resource attributes attached to every exported span and metric, as a JSON object mapping attribute name to value (e.g. `{"enduser.id":"alice@example.com"}`). Appended to the app's built-in attributes; keys that collide with built-ins such as `service.name` are dropped. A comma-separated `key=value` string is also accepted for compatibility. |
  | Desktop telemetry export level<br />`otlpDesktopLogLevel`       | string        | Minimum severity at which the desktop app's own events are exported to your collector, separate from Cowork and Code session spans. One of `off`, `error` (default), `warn`, `info`, or `debug`.                                                                                                                                                             |

  ## Usage limits

  | Setting                                                  | Type    | Description                                                                                                                                                                  |
  | -------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Max tokens per window<br />`inferenceMaxTokensPerWindow` | integer | Total input + output tokens permitted per device per window. When reached, the app refuses new messages until the window resets. Enforced locally; persists across restarts. |
  | Token cap window<br />`inferenceTokenWindowHours`        | integer | Length of the tumbling window for the cap above, 1–720 hours.                                                                                                                |

  ## Appearance

  | Setting              | Type          | Default | Description                                                                                      |
  | -------------------- | ------------- | ------- | ------------------------------------------------------------------------------------------------ |
  | Banner<br />`banner` | object (JSON) | unset   | A persistent banner shown across the top of the app window after sign-in. See [schema](#banner). |

  ### `banner`

  A JSON-stringified object:

  | Field             | Required     | Description                                                      |
  | ----------------- | ------------ | ---------------------------------------------------------------- |
  | `enabled`         | —            | Show the banner.                                                 |
  | `text`            | When enabled | Banner text. Single line, up to 200 characters.                  |
  | `backgroundColor` | —            | Six-digit hex color (`#RRGGBB`) for the banner background.       |
  | `textColor`       | —            | Six-digit hex color (`#RRGGBB`) for the banner text.             |
  | `linkUrl`         | —            | HTTPS URL. When set, the banner text becomes a link to this URL. |
</div>

## Plugins & skills

Plugins and skills have no configuration keys. They are distributed by placing plugin bundles in the [org-plugins directory](/cowork/3p/extensions#organization-plugins-admin) on each device, which the configuration window's Plugins & skills section displays for reference.

***

## Recommended security profiles

The profiles below are illustrative examples rather than built-in presets, and the labels are descriptive only. Use them as starting points and adjust for your environment. Layer the inference-provider keys for your cloud on top of whichever profile you choose.

<Tabs>
  <Tab title="Standard">
    Recommended for most enterprise deployments. Telemetry and auto-updates stay on so Anthropic can diagnose issues and ship fixes; users can extend Cowork with their own connectors.

    | Key                                   | Value              |
    | ------------------------------------- | ------------------ |
    | `deploymentOrganizationUuid`          | `<your-org-uuid>`  |
    | `autoUpdaterEnforcementHours`         | `24`               |
    | `isDesktopExtensionSignatureRequired` | `true`             |
    | `otlpEndpoint`                        | `<your-collector>` |
  </Tab>

  <Tab title="Restricted">
    For regulated environments that need to control what users can connect Cowork to, while keeping Anthropic supportability.

    | Key                            | Value                    |
    | ------------------------------ | ------------------------ |
    | `deploymentOrganizationUuid`   | `<your-org-uuid>`        |
    | `disableNonessentialTelemetry` | `true`                   |
    | `disableNonessentialServices`  | `true`                   |
    | `isLocalDevMcpEnabled`         | `false`                  |
    | `isDesktopExtensionEnabled`    | `false`                  |
    | `allowedWorkspaceFolders`      | `["~/Documents/Claude"]` |
    | `coworkEgressAllowedHosts`     | `["*.your-org.com"]`     |
    | `otlpEndpoint`                 | `<your-collector>`       |
  </Tab>

  <Tab title="Locked down">
    For air-gapped or maximally restricted environments. **The only traffic leaving the device goes to your inference endpoint and OTLP collector.** With this profile, Anthropic has zero remote visibility, so your team owns log collection and update distribution.

    | Key                            | Value                      |
    | ------------------------------ | -------------------------- |
    | `disableEssentialTelemetry`    | `true`                     |
    | `disableNonessentialTelemetry` | `true`                     |
    | `disableNonessentialServices`  | `true`                     |
    | `disableAutoUpdates`           | `true`                     |
    | `isLocalDevMcpEnabled`         | `false`                    |
    | `isDesktopExtensionEnabled`    | `false`                    |
    | `disabledBuiltinTools`         | `["WebSearch","WebFetch"]` |
    | `coworkEgressAllowedHosts`     | `[]`                       |
    | `allowedWorkspaceFolders`      | `["~/Documents/Claude"]`   |
    | `otlpEndpoint`                 | `<your-collector>`         |
  </Tab>
</Tabs>
