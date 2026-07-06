> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Configuration changelog

> Managed configuration keys by the Claude Desktop release they first shipped in

Configuration keys by Claude Desktop release. Each section lists keys added in that release, with the MDM key name (for plist/registry deployment) and the equivalent JSON shape (for local-file or bootstrap remote configuration).

<Update label="v1.18286.0" description="2026-07-02">
  **Removed:**

  * `disableDefaultPlugins` — third-party deployments always skip the default plugin marketplaces and standard deployments always include them, so the key no longer has an effect.
</Update>

<Update label="v1.17377.2" description="2026-07-01">
  No configuration changes in this release.
</Update>

<Update label="v1.17377.1" description="2026-06-30">
  <div className="cfg-keys">
    | MDM key                                                                                                                    | Type       | Description                                                                                                                              |
    | -------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
    | [`allowedPluginMarketplaces`](/third-party/claude-desktop/configuration#allowedpluginmarketplaces)                         | `object[]` | Admin-configured plugin marketplace git URLs appear under the Directory's Organization tab. (MDM-only; not settable via bootstrap JSON.) |
    | [`inferenceVertexWorkforceOidc.omitOfflineAccess`](/third-party/claude-desktop/configuration#inferencevertexworkforceoidc) | `boolean`  | New subfield: omit `offline_access` from the OIDC scope request.                                                                         |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "inference": {
      "credential": {
        "oidc": {
          "omitOfflineAccess": "<boolean>"
        }
      }
    }
  }
  ```
</Update>

<Update label="v1.15962.2" description="2026-06-30">
  No configuration changes in this release.
</Update>

<Update label="v1.15962.1" description="2026-06-26">
  No configuration changes in this release.
</Update>

<Update label="v1.15962.0" description="2026-06-25">
  <div className="cfg-keys">
    | MDM key                                                                                     | Type      | Description                                                              |
    | ------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------ |
    | [`otlpContentCapture`](/third-party/claude-desktop/configuration#otlpcontentcapture)        | `enum[]`  | Content capture categories                                               |
    | [`disableBundledSkills`](/third-party/claude-desktop/configuration#disablebundledskills)    | `boolean` | Disable bundled skills and workflows                                     |
    | [`managedMcpServers[].server`](/third-party/claude-desktop/configuration#managedmcpservers) | `enum`    | Gained `"websearch"` — managed web search (Brave, Tavily, Exa or custom) |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "otlp": {
      "contentCapture": [
        "<userPrompts|assistantResponses|toolDetails|toolContent|rawApiBodies>"
      ]
    },
    "workspace": {
      "disableBundledSkills": "<boolean>"
    },
    "mcp": {
      "managedServers": [
        {
          "name": "Web search",
          "server": "websearch",
          "provider": "<brave|tavily|exa|custom>",
          "headers": { "<header-name>": "<string>" },
          "customUrl": "<string, provider=custom only>"
        }
      ]
    }
  }
  ```
</Update>

<Update label="v1.15200.0" description="2026-06-23">
  No configuration changes in this release.
</Update>

<Update label="v1.14271.0" description="2026-06-18">
  <div className="cfg-keys">
    | MDM key                           | Type      | Description              |
    | --------------------------------- | --------- | ------------------------ |
    | `chatAdvancedFileAnalysisEnabled` | `boolean` | Advanced file analysis   |
    | `inferenceSessionLifetimeSec`     | `integer` | Sign-in session lifetime |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "chatSurface": {
      "advancedFileAnalysis": "<boolean>"
    },
    "inference": {
      "sessionLifetimeSec": "<integer>"
    }
  }
  ```

  **Deprecated:**

  * `betaFeaturesEnabled` — Allow beta features (added and deprecated in this release)
</Update>

<Update label="v1.13576.0" description="2026-06-16">
  <div className="cfg-keys">
    | MDM key                      | Type      | Description    |
    | ---------------------------- | --------- | -------------- |
    | `chatTabEnabled`             | `boolean` | Allow Chat tab |
    | `inferenceBedrockAwsCliPath` | `string`  | AWS CLI path   |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "chatSurface": {
      "enabled": "<boolean>"
    },
    "inference": {
      "awsEnv": {
        "awsCliPath": "<string>"
      }
    }
  }
  ```
</Update>

<Update label="v1.12603.0" description="2026-06-11">
  <div className="cfg-keys">
    | MDM key                         | Type     | Description             |
    | ------------------------------- | -------- | ----------------------- |
    | `inferenceVertexOAuthLoginHint` | `string` | Vertex OAuth login hint |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "inference": {
      "credential": {
        "loginHint": "<string>"
      }
    }
  }
  ```
</Update>

<Update label="v1.10628.0" description="2026-06-03">
  <div className="cfg-keys">
    | MDM key                                         | Type      | Description                        |
    | ----------------------------------------------- | --------- | ---------------------------------- |
    | `inferenceVertexWorkforceAudience`              | `string`  | Workforce Identity audience        |
    | `inferenceVertexWorkforceUserProject`           | `string`  | Workforce Identity billing project |
    | `inferenceVertexWorkforceOidc`                  | `object`  | Workforce Identity IdP (OIDC)      |
    | `organizationPluginsUrl`                        | `string`  | Organization plugins endpoint      |
    | `autoModeEnabled`                               | `boolean` | Allow Auto mode                    |
    | `inferenceCredentialHelperSilentRefreshEnabled` | `boolean` | Re-run helper for silent refresh   |
    | `bootstrapEnabled`                              | `boolean` | Use bootstrap config               |
    | `bootstrapUrl`                                  | `string`  | Bootstrap config URL               |
    | `bootstrapOidc`                                 | `object`  | Bootstrap OIDC parameters          |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "inference": {
      "credential": {
        "audience": "<string>",
        "userProject": "<string>",
        "oidc": {
          "issuer": "<string>",
          "authorizationUrl": "<string>",
          "tokenUrl": "<string>",
          "clientId": "<string>",
          "scopes": "<string>",
          "redirectPort": "<integer>"
        },
        "silentRefreshEnabled": "<boolean>"
      }
    }
  }
  ```
</Update>

<Update label="v1.9659.0" description="2026-06-02">
  <div className="cfg-keys">
    | MDM key            | Type      | Description      |
    | ------------------ | --------- | ---------------- |
    | `coworkTabEnabled` | `boolean` | Allow Cowork tab |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "coworkSurface": {
      "enabled": "<boolean>"
    }
  }
  ```
</Update>

<Update label="v1.9255.0" description="2026-05-27">
  <div className="cfg-keys">
    | MDM key                    | Type     | Description                    |
    | -------------------------- | -------- | ------------------------------ |
    | `otlpDesktopLogLevel`      | `enum`   | Desktop telemetry export level |
    | `inferenceFoundryTenantId` | `string` | Entra ID tenant ID             |
    | `inferenceFoundryClientId` | `string` | Entra ID client ID             |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "otlp": {
      "desktopLogLevel": "<off|error|warn|info|debug>"
    },
    "inference": {
      "credential": {
        "tenantId": "<string>",
        "clientId": "<string>"
      }
    }
  }
  ```
</Update>

<Update label="v1.8555.0" description="2026-05-25">
  <div className="cfg-keys">
    | MDM key                   | Type   | Description     |
    | ------------------------- | ------ | --------------- |
    | `inferenceCredentialKind` | `enum` | Credential kind |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "inference": {
      "credential": {
        "kind": "<static|helper-script|interactive|vendor-profile>"
      }
    }
  }
  ```
</Update>

<Update label="v1.8089.0" description="2026-05-19">
  <div className="cfg-keys">
    | MDM key                               | Type      | Description                                                       |
    | ------------------------------------- | --------- | ----------------------------------------------------------------- |
    | `inferenceAnthropicApiKey`            | `string`  | Claude API key                                                    |
    | `inferenceCustomHeaders`              | `object`  | Custom inference headers (renamed from `inferenceGatewayHeaders`) |
    | `modelDiscoveryEnabled`               | `boolean` | Model discovery                                                   |
    | `orgPluginSettings`                   | `object`  | Organization plugin settings                                      |
    | `builtinToolPolicy`                   | `object`  | Built-in tool policy                                              |
    | `inferenceCredentialHelperTimeoutSec` | `integer` | Credential helper timeout                                         |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "inference": {
      "credential": {
        "apiKey": "<string>",
        "timeoutSec": "<integer>"
      },
      "customHeaders": "<object>"
    }
  }
  ```
</Update>

<Update label="v1.7196.0" description="2026-05-16">
  <div className="cfg-keys">
    | MDM key  | Type     | Description         |
    | -------- | -------- | ------------------- |
    | `banner` | `object` | Organization banner |
  </div>
</Update>

<Update label="v1.6889.0" description="2026-05-08">
  <div className="cfg-keys">
    | MDM key                       | Type      | Description                          |
    | ----------------------------- | --------- | ------------------------------------ |
    | `disableDeepLinkRegistration` | `boolean` | Disable claude:// deep-link handling |
    | `inferenceGatewayOidc`        | `object`  | Gateway SSO IdP (OIDC)               |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "inference": {
      "credential": {
        "oidc": {
          "issuer": "<string>",
          "authorizationUrl": "<string>",
          "tokenUrl": "<string>",
          "clientId": "<string>",
          "scopes": "<string>",
          "redirectPort": "<integer>",
          "bearerTokenType": "<id_token|access_token>",
          "appendOfflineAccess": "<boolean>"
        }
      }
    }
  }
  ```
</Update>

<Update label="v1.6259.0" description="2026-05-06">
  <div className="cfg-keys">
    | MDM key                        | Type     | Description        |
    | ------------------------------ | -------- | ------------------ |
    | `inferenceBedrockSsoStartUrl`  | `string` | AWS SSO start URL  |
    | `inferenceBedrockSsoRegion`    | `string` | AWS SSO region     |
    | `inferenceBedrockSsoAccountId` | `string` | AWS SSO account ID |
    | `inferenceBedrockSsoRoleName`  | `string` | AWS SSO role name  |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "inference": {
      "credential": {
        "ssoStartUrl": "<string>",
        "ssoRegion": "<string>",
        "ssoAccountId": "<string>",
        "ssoRoleName": "<string>"
      }
    }
  }
  ```
</Update>

<Update label="v1.5354.0" description="2026-04-29">
  <div className="cfg-keys">
    | MDM key                  | Type     | Description                       |
    | ------------------------ | -------- | --------------------------------- |
    | `otlpResourceAttributes` | `object` | OpenTelemetry resource attributes |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "otlp": {
      "resourceAttributes": "<object>"
    }
  }
  ```
</Update>

<Update label="v1.5186.0" description="2026-04-28">
  <div className="cfg-keys">
    | MDM key                       | Type   | Description          |
    | ----------------------------- | ------ | -------------------- |
    | `inferenceBedrockServiceTier` | `enum` | Bedrock service tier |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "inference": {
      "serviceTier": "<flex|priority>"
    }
  }
  ```
</Update>

<Update label="v1.3834.0" description="2026-04-21">
  <div className="cfg-keys">
    | MDM key                        | Type      | Description               |
    | ------------------------------ | --------- | ------------------------- |
    | `disableDeploymentModeChooser` | `boolean` | Disable Claude.ai sign-in |
  </div>
</Update>

<Update label="v1.3036.0" description="2026-04-16">
  <div className="cfg-keys">
    | MDM key                      | Type   | Description         |
    | ---------------------------- | ------ | ------------------- |
    | `inferenceGatewayAuthScheme` | `enum` | Gateway auth scheme |
  </div>

  **JSON (Non-MDM User, Bootstrap Remote):**

  ```json theme={null}
  {
    "inference": {
      "credential": {
        "authScheme": "<auto|x-api-key|bearer|sso>"
      }
    }
  }
  ```
</Update>

<Update label="Baseline">
  <div className="cfg-keys">
    | MDM key                               | Type                                  | Description                                                       |
    | ------------------------------------- | ------------------------------------- | ----------------------------------------------------------------- |
    | `isDesktopExtensionEnabled`           | `boolean`                             | Allow desktop extensions (renamed from `isDxtEnabled`)            |
    | `isDesktopExtensionSignatureRequired` | `boolean`                             | Require signed extensions (renamed from `isDxtSignatureRequired`) |
    | `isLocalDevMcpEnabled`                | `boolean`                             | Allow user-added MCP servers                                      |
    | `isClaudeCodeForDesktopEnabled`       | `boolean`                             | Allow Claude Code tab                                             |
    | `coworkEgressAllowedHosts`            | `array<string>`                       | Allowed egress hosts                                              |
    | `otlpEndpoint`                        | `string`                              | OpenTelemetry collector endpoint                                  |
    | `otlpProtocol`                        | `enum`                                | OpenTelemetry exporter protocol                                   |
    | `otlpHeaders`                         | `object`                              | OpenTelemetry exporter headers                                    |
    | `autoUpdaterEnforcementHours`         | `integer`                             | Auto-update enforcement window                                    |
    | `disableAutoUpdates`                  | `boolean`                             | Block auto-updates                                                |
    | `inferenceProvider`                   | `enum`                                | Inference provider                                                |
    | `inferenceGatewayBaseUrl`             | `string`                              | Gateway base URL                                                  |
    | `inferenceGatewayApiKey`              | `string`                              | Gateway API key                                                   |
    | `inferenceVertexProjectId`            | `string`                              | GCP project ID                                                    |
    | `inferenceVertexRegion`               | `string`                              | GCP region                                                        |
    | `inferenceVertexCredentialsFile`      | `string`                              | GCP credentials file path                                         |
    | `inferenceVertexOAuthClientId`        | `string`                              | Vertex OAuth client ID                                            |
    | `inferenceVertexOAuthClientSecret`    | `string`                              | Vertex OAuth client secret                                        |
    | `inferenceVertexOAuthScopes`          | `string`                              | Vertex OAuth scopes                                               |
    | `inferenceVertexBaseUrl`              | `string`                              | Vertex AI base URL                                                |
    | `inferenceBedrockRegion`              | `string`                              | AWS region                                                        |
    | `inferenceBedrockBearerToken`         | `string`                              | AWS bearer token                                                  |
    | `inferenceBedrockBaseUrl`             | `string`                              | Bedrock base URL                                                  |
    | `inferenceBedrockProfile`             | `string`                              | AWS profile name                                                  |
    | `inferenceBedrockAwsDir`              | `string`                              | AWS config directory                                              |
    | `inferenceFoundryResource`            | `string`                              | Azure AI Foundry resource name                                    |
    | `inferenceFoundryApiKey`              | `string`                              | Azure AI Foundry API key                                          |
    | `inferenceModels`                     | `array<string\|object>`               | Model list                                                        |
    | `deploymentOrganizationUuid`          | `string`                              | Organization UUID                                                 |
    | `disableEssentialTelemetry`           | `boolean`                             | Block essential telemetry                                         |
    | `disableNonessentialTelemetry`        | `boolean`                             | Block nonessential telemetry                                      |
    | `disableNonessentialServices`         | `boolean`                             | Block nonessential services                                       |
    | `managedMcpServers`                   | `array<object\|object\|object\|null>` | Managed MCP servers                                               |
    | `disabledBuiltinTools`                | `array<string>`                       | Disabled built-in tools                                           |
    | `allowedWorkspaceFolders`             | `array<string\|object>`               | Allowed workspace folders                                         |
    | `inferenceCredentialHelper`           | `string`                              | Helper script                                                     |
    | `inferenceCredentialHelperTtlSec`     | `integer`                             | Helper script TTL                                                 |
    | `inferenceMaxTokensPerWindow`         | `integer`                             | Max tokens per window                                             |
    | `inferenceTokenWindowHours`           | `integer`                             | Token cap window                                                  |
  </div>

  **Deprecated:**

  * `requireCoworkFullVmSandbox` — Require full VM sandbox
</Update>
