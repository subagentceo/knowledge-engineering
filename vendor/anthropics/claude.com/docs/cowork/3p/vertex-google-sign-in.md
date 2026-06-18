> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Sign in with Google for Google Cloud's Vertex AI

> Configure per-user Google authentication for Google Cloud's Vertex AI instead of distributing a shared service-account key

By default, Cowork on 3P authenticates to Google Cloud's Vertex AI with a credentials file that you distribute to every device (`inferenceVertexCredentialsFile`). As an alternative, you can configure an interactive Google sign-in. Each user authenticates once with their own Google Workspace account, and the app stores an encrypted refresh token on the device.

Use Google sign-in when you want:

* Per-user attribution in Cloud Audit Logs instead of a single shared service account
* IAM controlled at the user or group level rather than at the key
* To avoid distributing and rotating long-lived service-account key files

The sign-in experience uses a Google OAuth client that **you create in your own Google Cloud project**. Anthropic does not provide or operate an OAuth client for this flow.

## How it works

When `inferenceVertexOAuthClientId` and `inferenceVertexOAuthClientSecret` are both set, the app shows a **Sign in with Google** page the first time a user opens the Cowork tab. Clicking the button opens the system browser for a standard Google consent flow, and the app listens on a loopback address for the redirect. On success, the app stores the user's Google refresh token encrypted with the operating system's secure storage (Keychain on macOS, DPAPI on Windows) and returns to the Cowork tab.

At the start of each Cowork session, the app writes an `authorized_user` Application Default Credentials file (the same format produced by `gcloud auth application-default login`) into the session sandbox and points `GOOGLE_APPLICATION_CREDENTIALS` at it. The Google Cloud client library inside the sandbox handles access-token minting and refresh automatically.

If the stored refresh token is revoked or expires, or if you deploy a new OAuth client ID, the app clears the stored token and shows the sign-in page again.

## Prerequisites

* A Google Cloud project with the **Vertex AI API** enabled, containing the Claude models you intend to serve
* Admin access to that project to create an OAuth client and grant IAM roles
* A Google Workspace organization (recommended) so the OAuth consent screen can be set to **Internal**

## Set up Google sign-in

<Steps>
  <Step title="Configure the OAuth consent screen">
    In the Google Cloud Console for your Vertex project, open **APIs & Services → OAuth consent screen**.

    If your project belongs to a Google Workspace organization, select the **Internal** user type. Internal apps are limited to users in your Workspace and do not require Google verification, regardless of which scopes they request.

    If the project is not in a Workspace organization, you must use the **External** user type. Because this flow requests the `https://www.googleapis.com/auth/cloud-platform` scope, Google classifies the app as using a sensitive scope, and publishing it beyond test users requires Google's OAuth verification process. For that reason, Internal is strongly recommended for enterprise deployments.
  </Step>

  <Step title="Create a Desktop OAuth client">
    In **APIs & Services → Credentials**, choose **Create credentials → OAuth client ID**, and select **Desktop app** as the application type.

    Record the generated **Client ID** (ending in `.apps.googleusercontent.com`) and **Client secret**. For installed applications, Google does not treat the client secret as confidential; the flow is protected by PKCE and by the loopback redirect, so it is safe to distribute the secret in a managed configuration profile.

    You do not need to add redirect URIs. Desktop-app clients permit loopback (`http://127.0.0.1:<port>`) redirects automatically.
  </Step>

  <Step title="Grant users access to Vertex AI">
    Each signed-in user calls Vertex AI as themselves, so each user's Google identity needs permission to invoke the model.

    On the Vertex project, grant the **Vertex AI User** role (`roles/aiplatform.user`) to the Google Workspace group that contains your Cowork users, or to individual users. If your organization uses a narrower custom role, it must include at minimum the `aiplatform.endpoints.predict` permission.
  </Step>

  <Step title="Configure in the app">
    Open the in-app configuration window (**Developer → Configure third-party inference**) on an evaluation device. In the **Connection** section, set **Inference provider** to **Vertex AI** and **Credential kind** to **Interactive sign-in**, then fill in the **Vertex credentials** card:

    | Field                      | Value                                          |
    | -------------------------- | ---------------------------------------------- |
    | GCP project ID             | `your-gcp-project`                             |
    | GCP region                 | e.g. `us-east5`                                |
    | GCP credentials file path  | *leave empty*                                  |
    | Vertex OAuth client ID     | `1234567890-abc123.apps.googleusercontent.com` |
    | Vertex OAuth client secret | `GOCSPX-xxxxxxxxxxxxxxxxxxxx`                  |
    | Vertex OAuth scopes        | *leave empty for the default*                  |

    Leave **GCP credentials file path** empty. If both it and the OAuth client are set, Google sign-in wins, but the app surfaces a multi-credential warning, so keep one cleared to avoid ambiguity.

    Then click **Export** to produce a `.mobileconfig` (macOS) or `.reg` (Windows) file for your MDM. See [Installation and setup](/cowork/3p/installation) for the export and deployment workflow, or the [Configuration keys](#configuration-keys) table below if you author policy by hand.
  </Step>

  <Step title="Allow network egress">
    The sign-in flow and subsequent token refreshes reach `accounts.google.com` and `oauth2.googleapis.com` from the user's device. These hosts are already included in the standard Vertex AI egress requirements, so if you allowed egress based on the **Egress Requirements** section of the configuration window, no additional firewall changes are needed.
  </Step>
</Steps>

## User experience

On first launch after the configuration is applied, the Cowork tab shows a **Sign in with Google** page instead of the task composer. The user clicks the button, approves access in their default browser, and the app returns to the Cowork tab. The browser flow runs on the host, outside the Cowork sandbox, so it can use the user's existing Google session and any security keys or passkeys configured on the device.

Users stay signed in across app restarts. To sign out, a user can revoke access for your OAuth client from their Google Account's [third-party connections page](https://myaccount.google.com/connections); the app detects the revoked token at the next session start and shows the sign-in page again.

## Configuration keys

| Setting                                                            | Type   | Description                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Credential kind<br />`inferenceCredentialKind`                     | string | Set to `interactive` to select Google sign-in explicitly. Recommended when authoring policy by hand so the credential source is unambiguous.                                                                                                                                                            |
| Vertex OAuth client ID<br />`inferenceVertexOAuthClientId`         | string | Client ID of the Desktop-app OAuth client in your GCP project. Must be set together with the client secret.                                                                                                                                                                                             |
| Vertex OAuth client secret<br />`inferenceVertexOAuthClientSecret` | string | Client secret for the OAuth client above. Not treated as confidential for installed apps; PKCE protects the flow.                                                                                                                                                                                       |
| Vertex OAuth scopes<br />`inferenceVertexOAuthScopes`              | string | Space-separated OAuth scopes requested during sign-in. Defaults to `openid email https://www.googleapis.com/auth/cloud-platform`. Override only if your organization's access policies restrict the default scope.                                                                                      |
| Vertex OAuth login hint<br />`inferenceVertexOAuthLoginHint`       | string | Sent as the OAuth `login_hint` parameter to pre-fill Google's account chooser. Push a literal email address, or a template like `{username}@your-domain.com` — the app replaces `{username}` with the device's OS login name at sign-in time. This is a sign-in convenience, not an access restriction. |

See [Using Cowork on 3P with Google Cloud's Vertex AI](/cowork/3p/vertex) for the full list of Vertex keys.

## Federate to a third-party identity provider

The in-app sign-in always opens Google's authorization endpoint, because Vertex AI only accepts Google-issued access tokens. To have users authenticate with your organization's own identity provider (Microsoft Entra ID, Okta, Ping, or an in-house SAML IdP) instead of a Google password, configure Cloud Identity as a broker:

1. In the Google Admin console, set up [SSO with a third-party IdP](https://support.google.com/cloudidentity/answer/12032922) and assign the SSO profile to your Cowork users' organizational unit.
2. Provision those users into Cloud Identity (via SCIM from your IdP, or Google Cloud Directory Sync) so IAM grants resolve.
3. Optionally set `inferenceVertexOAuthLoginHint` so Google skips its own account chooser and routes straight to your IdP with the user's identity pre-filled.

With this in place, clicking **Sign in with Google** opens the browser, Google immediately redirects to your IdP, the user authenticates there (including smart-card or PIV authentication if your IdP supports it), and Google issues the tokens on return. Cowork is unchanged; the federation is configured entirely in Google Admin and your IdP.

## Notes and limitations

* **Precedence.** When both `inferenceVertexOAuthClientId` and `inferenceVertexCredentialsFile` are set and `inferenceCredentialKind` is not, Google sign-in takes precedence and the credentials file is ignored (the app logs a multi-credential warning). To force the credentials file, set `inferenceCredentialKind` to `vendor-profile` or remove the OAuth client keys.
* **Both keys required.** If only one of `inferenceVertexOAuthClientId` or `inferenceVertexOAuthClientSecret` is set, the app logs a warning and falls back to standard Application Default Credentials discovery.
* **Alternatives.** If your users don't have Google identities, use [in-app Workforce Identity sign-in](/cowork/3p/vertex#in-app-workforce-identity-sign-in) instead — the app authenticates against your own IdP and exchanges the token at Google STS. A [credential helper](/cowork/3p/configuration#credential-helper) is also supported for Vertex AI.
* **Client rotation.** If you replace the OAuth client in Google Cloud and push the new client ID via MDM, existing users are automatically signed out and prompted to sign in again on next launch.
