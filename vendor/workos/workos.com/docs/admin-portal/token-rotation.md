# Bearer token rotation

## Overview

SCIM bearer tokens authenticate the requests an identity provider sends to your directory sync endpoint. Tokens can now be created and revoked on demand from two places:

- The **WorkOS Dashboard** — on the directory details page, replacing the static bearer token field.
- The **Admin Portal** — on the post-configuration page for an existing directory, so IT contacts can manage tokens themselves without contacting your team.

Up to two tokens can be active on a directory at the same time, which makes it possible to rotate tokens with no downtime.

## Why this matters

- **Customer self-service.** IT contacts can rotate a leaked or expiring token from the Admin Portal without filing a support ticket or waiting on your engineering team.
- **Zero-downtime rotation.** Because two tokens can be active at once, you can roll a new token out to the identity provider and confirm SCIM traffic is healthy before revoking the old one.
- **Better hygiene.** Newly generated tokens are revealed exactly once at creation time which limits the impact of a leaked dashboard or admin portal session.

## Managing tokens in the Dashboard

Sign in to the [WorkOS Dashboard](https://dashboard.workos.com/) and open the directory you want to manage. The **Bearer tokens** card on the directory details page lists every active token along with when it was created and last used.

![The WorkOS Dashboard showing the bearer tokens card on the directory details page.](https://images.workoscdn.com/images/2b438d96-e5a4-4102-bb2d-a6d8324d2278.png)

To generate a token, click **Generate token**. The new token is shown once. Copy it immediately and store it somewhere secure; you will not be able to view it again.

To revoke a token, click on the revoke action for the row you are removing and confirm the revocation. Any SCIM requests still using that token will start failing immediately after it is revoked, so make sure the identity provider has been updated to use a different active token first.

## Managing tokens in the Admin Portal

When an IT contact opens the Admin Portal post-configuration page for a SCIM directory, they see the same **Bearer tokens** card with the same generate and revoke actions.

![The Admin Portal post-configuration page showing the bearer tokens card.](https://images.workoscdn.com/images/50777e5f-0dca-4153-b960-445c6ed5d836.png)

After clicking **Generate token**, the IT contact is shown the secret once and prompted to copy it into their identity provider. Once both tokens are active, a callout reminds them to update their identity provider and revoke the older token when they are done.

## Zero-downtime rotation

The recommended flow for rotating a token without dropping SCIM traffic:

1. From the Dashboard or the Admin Portal, click **Generate token** to create a second token. Copy the secret.
2. Update the identity provider's SCIM connector with the new token.
3. Trigger or wait for a SCIM request and confirm the new token's **Last used** timestamp updates.
4. Revoke the old token.

A directory can have at most two active tokens at any time. If you already have two, revoke one before generating another.

## Migration

There is nothing to do for existing integrations.

- **No code changes.** Your application continues to consume the same SCIM endpoint, and existing webhook payloads, SDK calls, and event types are unchanged.
- **No breaking changes.** Tokens currently displayed in the Dashboard keep working until they are explicitly revoked.
- **New tokens are managed in the new UI.** Tokens generated from the Dashboard or Admin Portal are only viewable at creation time and only manageable through the new token UI in either surface.
