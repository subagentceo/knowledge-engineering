> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# SCIM

## Overview

SCIM is available for **Enterprise** workspaces. Only **Workspace Admins** can configure these
settings.

## Set up SCIM

Follow these steps to connect your Identity Provider (IdP) to ElevenLabs.

Go to **Workspace settings** > **Security & SSO** > **SCIM**.

Click **Generate Token**. Copy the **Base URL** and **Bearer token** immediately.

The token is only shown once. If you lose it, you must generate a new one, which will
invalidate the previous token.

In your IdP SCIM/Provisioning configuration:

* Set the **SCIM Endpoint/Connector URL** to the Base URL.
* Set the authentication mode to bearer token and paste your token.

For provider-specific instructions, see [Setup by Identity Provider](#setup-by-identity-provider).

**Revoking access:** If a user is removed or deactivated via SCIM, their workspace access is
revoked, but their historical activity remains associated with the workspace.

## Capabilities

ElevenLabs supports the SCIM 2.0 protocol with the following capabilities:

| Feature                                     | Supported? | Details                                                    |
| :------------------------------------------ | :--------- | :--------------------------------------------------------- |
| **Discovery Endpoints**                     | ✅ Yes      | `/ServiceProviderConfig`, `/Schemas`, `/ResourceTypes`     |
| **Users**                                   | ✅ Yes      | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`                    |
| **Updating a user's primary email address** | ❌ No       |                                                            |
| **Groups**                                  | ✅ Yes      | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`                    |
| **Search**                                  | ✅ Yes      | `GET` with `?filter` or `POST` to `/.search`               |
| **Pagination**                              | ✅ Yes      | Supports `startIndex` and `count`                          |
| **Bulk Operations**                         | ✅ Yes      | `Max operations per request: 100`, `Max payload size: 1MB` |
| **Attribute filtering**                     | ✅ Yes      | Supports `attributes` and `excludedAttributes`             |
| **Sorting**                                 | ❌ No       | `sortBy` and `sortOrder` are ignored when querying         |

## Supported attributes

* **Users**: `userName`, `name`, `emails`, `active`, `externalId`
* **Groups**: `displayName`, `members`, `externalId`

Email address changes are not supported through SCIM. Updating a user's primary email in your IdP
can cause SCIM sync failures for that user.

## Setup by Identity Provider

In the Microsoft Entra admin center, select your
ElevenLabs app, then open **Provisioning**.

Set **Provisioning Mode** to **Automatic**.

In **Admin Credentials**:

* Set **Tenant URL** to your ElevenLabs SCIM Base URL.
* Set **Secret Token** to your ElevenLabs Bearer token.

Click **Test Connection**, save the configuration, then set **Provisioning Status** to
**On** when ready.

Open the ElevenLabs app that is used for SSO sign-in and go to **General**.

Click **Edit** in **App Settings**, then set **Provisioning** to **SCIM**.

In **Provisioning** > **Settings** > **Integration**:

* Set the **SCIM connector base URL** to your ElevenLabs SCIM Base URL.
* Choose the provisioning actions your workspace needs (for example, push new users, push
  profile updates, and push groups), then run **Test Connector Configuration** and save.
* Set **Authentication Mode** to **HTTP Header**.
* Paste your ElevenLabs Bearer token in the **Authorization** field.
* Click **Save**

In OneLogin Admin, open your ElevenLabs app.

In the **Configuration** tab:

* Set **SCIM Base URL** to your ElevenLabs SCIM Base URL.
* Set **SCIM Bearer token** to your ElevenLabs Bearer token.

Go to **Provisioning** and check "Enable provisioning" for the app.