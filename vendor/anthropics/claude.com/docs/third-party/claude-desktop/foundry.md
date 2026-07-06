> ## Documentation Index
> Fetch the complete documentation index at: https://claude.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy Claude Desktop on 3P with Microsoft Foundry

> Set up Azure AI Foundry, choose an authentication path for your organization, and configure Claude Desktop on 3P to use Claude models on Microsoft Foundry

This page walks an IT administrator through a Microsoft Foundry deployment: creating the Azure AI Foundry resource, choosing the authentication path that fits your organization, and pushing the managed configuration. If you only need the list of configuration keys, skip to [Configure the app](#configure-the-app).

<Note>
  Claude models in Microsoft Foundry are available in two hosting options, Hosted on Azure and Hosted on Anthropic. Anthropic acts as an independent processor for Microsoft, and customers are subject to Anthropic's data use terms. For deployments hosted on Azure, prompts and completions remain within Azure; only usage metadata and content flagged by Anthropic's safety systems egress to Anthropic. Deployments hosted on Anthropic run on Anthropic's infrastructure. See [Claude in Microsoft Foundry](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry#hosting-options) for details.
</Note>

## Choose an authentication approach

| Scenario                                                                | Use                                                                                                                    | Per-user identity                  | Notes                                                                                                             |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Proof of concept, single team                                           | [API key](#api-key) (`inferenceFoundryApiKey`)                                                                         | No (shared key)                    | A long-lived secret distributed in the managed profile. Simplest to start.                                        |
| Broad rollout with per-user identity                                    | [In-app Entra ID sign-in](#in-app-entra-id-sign-in) (`inferenceFoundryTenantId`, `inferenceFoundryClientId`)           | Yes                                | Users sign in with their Entra ID account inside the app via device code. Requires app version 1.9255.0 or later. |
| Your organization already has tooling that obtains a Foundry credential | [Credential helper](/third-party/claude-desktop/configuration#inferencecredentialhelper) (`inferenceCredentialHelper`) | Depends on what the helper obtains | An executable that prints the credential to stdout at runtime.                                                    |

## Set up Azure

These steps are performed once per Azure subscription. You need permission to create resources and, for in-app sign-in, to register an application in Microsoft Entra ID.

<Steps>
  <Step title="Create an Azure AI Foundry resource">
    In the Azure portal, create an Azure AI Foundry resource in your subscription. Record the **resource name**; the app constructs the endpoint as `<resource-name>.services.ai.azure.com`.
  </Step>

  <Step title="Deploy the Claude models">
    In the Azure AI Foundry portal for your resource, deploy the Claude models you intend to serve. Record each **deployment name**; you will list these in `inferenceModels`.
  </Step>

  <Step title="Obtain an API key (API-key approach only)">
    If you chose the API-key approach, copy one of the resource's keys from the Azure portal. You will place it in the managed configuration in [Configure the app](#configure-the-app).
  </Step>

  <Step title="Register an Entra ID application (in-app sign-in only)">
    If you chose in-app Entra ID sign-in, register an application in the [Microsoft Entra admin center](https://entra.microsoft.com) under **Identity → Applications → App registrations → New registration**. On the registration:

    * Under **Authentication**, enable **Allow public client flows**. The app uses the OAuth device-code flow, which requires a public client.
    * Under **API permissions**, add the **Azure Cognitive Services** delegated scope (`https://cognitiveservices.azure.com/.default`) so the issued token is accepted by your Foundry resource.

    Record the **Directory (tenant) ID** and **Application (client) ID**.

    Grant the users or groups who will sign in a role on the Foundry resource that permits inference (for example, **Cognitive Services User**).
  </Step>
</Steps>

## Prepare devices

What each end-user device needs depends on the authentication approach you chose.

### API key

No per-device preparation is required. Place the resource's API key in the managed configuration as `inferenceFoundryApiKey`.

### In-app Entra ID sign-in

No per-device preparation is required. Distribute `inferenceFoundryTenantId` and `inferenceFoundryClientId` in the managed configuration.

When both keys are set and `inferenceCredentialKind` is `interactive`, the app shows a **Sign in with Microsoft** page the first time a user opens the Cowork tab. Clicking the button starts a device-code flow against `login.microsoftonline.com`: the app displays a short verification code and opens the Microsoft sign-in page in the default browser, where the user enters the code and approves access. On success, the app stores the refresh token encrypted with the operating system's secure storage (Keychain on macOS, DPAPI on Windows) and returns to the Cowork tab.

These two keys can be set only via an MDM profile, not via a [bootstrap server](/third-party/claude-desktop/bootstrap).

#### Allow network egress

The sign-in flow reaches `login.microsoftonline.com` in addition to your Foundry endpoint. Both hosts are included automatically in the **Egress Requirements** section of the in-app configuration window when these keys are set.

## Configure the app

Open the in-app configuration window (**Developer → Configure Third-Party Inference…**). In the **Connection** section, set **Inference provider** to **Foundry**, then fill in the **Foundry credentials** card with the values for whichever authentication approach you chose:

| Field                          | API key                 | In-app Entra ID sign-in                |
| ------------------------------ | ----------------------- | -------------------------------------- |
| Azure AI Foundry resource name | `your-foundry-resource` | `your-foundry-resource`                |
| Azure AI Foundry API key       | your resource key       | *leave empty*                          |
| Entra ID tenant ID             | *leave empty*           | `00000000-0000-0000-0000-000000000000` |
| Entra ID client ID             | *leave empty*           | `11111111-1111-1111-1111-111111111111` |

Under **Models**, add at least one **Model list** entry using the Foundry deployment name.

Then click **Export** to produce a `.mobileconfig` (macOS) or `.reg` (Windows) file for your MDM. See [Deploy with MDM](/third-party/claude-desktop/mdm) for the export and deployment workflow.

### Configuration keys

The full set of Foundry keys is below. Set `inferenceProvider` to `foundry`, supply the resource name, and provide exactly one credential source.

| Setting                                                                                              | Type     | Availability    | Default | Description                                                                                                       |
| ---------------------------------------------------------------------------------------------------- | -------- | --------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| <span id="inferencefoundryresource" />Azure AI Foundry resource name<br />`inferenceFoundryResource` | `string` | MDM + Bootstrap | —       | Azure AI Foundry resource name used to construct the endpoint URL.                                                |
| <span id="inferencefoundryapikey" />Azure AI Foundry API key<br />`inferenceFoundryApiKey`           | `string` | MDM + Bootstrap | —       | API key for Azure AI Foundry inference.                                                                           |
| <span id="inferencefoundrytenantid" />Entra ID tenant ID<br />`inferenceFoundryTenantId`             | `string` | MDM only        | —       | Directory (tenant) ID of the Entra ID app registration that has the Cognitive Services scope.                     |
| <span id="inferencefoundryclientid" />Entra ID client ID<br />`inferenceFoundryClientId`             | `string` | MDM only        | —       | Application (client) ID of the Entra ID app registration. The app must allow public client flows for device code. |

You must also set `inferenceModels` to a list of Foundry deployment names. See the [Configuration reference](/third-party/claude-desktop/configuration#inferencemodels).

## What users experience

| Approach                | First launch                                                                                                                    | Re-authentication                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| API key                 | The app opens directly; no user action.                                                                                         | Never, until you rotate the key in the managed profile.                                                 |
| In-app Entra ID sign-in | The app shows a **Sign in with Microsoft** page; the user approves a device code in the browser, and the app returns to Cowork. | When the stored refresh token expires or is revoked under your tenant's policy. The app prompts in-app. |

## Troubleshoot

To confirm which keys the app read and whether credentials validated, use **Help → Troubleshooting → Copy Managed Configuration Report**; see [Verifying the deployment](/third-party/claude-desktop/installation#verifying-the-deployment) for that workflow and the common causes when the app does not enter 3P mode. Application log locations are listed in [Data storage and residency](/third-party/claude-desktop/data-storage).

If in-app sign-in fails at the token step, confirm the Entra ID app registration has **Allow public client flows** enabled and that the **Cognitive Services** scope is granted; without the public-client setting, the device-code flow is rejected.
