# API upgrades

Keep track of changes and upgrades to the Stripe API.

Check the [Developer Changelog](https://docs.stripe.com/changelog.md) for the complete record of changes to Stripe’s API.

Your API version controls the API and webhook behavior you see (for example, what parameters you can include in requests, what properties you see in responses, and so on). Your version gets set the first time you make an API request. Each major release, such as [Acacia](https://docs.stripe.com/changelog/acacia.md), includes changes that aren’t backward-compatible with previous releases. Upgrading to a new major release can require updates to existing code. Each monthly release includes only backward-compatible changes, and uses the same name as the last major release. You can safely upgrade to a new monthly release without breaking any existing code. To upgrade your API version, follow [these steps](https://docs.stripe.com/upgrades.md#how-can-i-upgrade-my-api).

When a [Connect](https://stripe.com/connect) platform makes requests on behalf of connected accounts without specifying an API version, Stripe always uses the platform’s API version. Regardless of a connected account’s API version, the platform’s requests on its behalf always return responses matching the API version of the request.

## Backward-compatible changes 

Stripe considers the following changes to be backward-compatible:

- Adding new API resources.
- Adding new optional request parameters to existing API methods.
- Adding new properties to existing API responses.
- Changing the order of properties in existing API responses.
- Changing the length or format of opaque strings, such as object IDs, error messages, and other human-readable strings.
  - This includes adding or removing fixed prefixes (such as `ch_` on charge IDs).
  - Make sure that your integration can handle Stripe-generated object IDs, which can contain up to 255 characters. For example, if you’re using MySQL, store the IDs in a `VARCHAR(255) COLLATE utf8_bin` column (the `COLLATE` configuration provides case-sensitivity during lookups).
- Adding new event types.
  - Make sure that your webhook listener gracefully handles unfamiliar event types.

## Upgrade your API version 

If you’re running an older version of the API, upgrade to the latest version to take advantage of new features and enhanced functionality.

Upgrading your API version affects:

- The API calls you make without a `Stripe-Version` header: the parameters you can send and the structure of objects returned.
- The structure of objects received with [Stripe.js](https://docs.stripe.com/payments/elements.md) methods such as [confirmCardPayment](https://docs.stripe.com/js.md#stripe-confirm-card-payment).
- The structure of objects sent to your webhook endpoints (both Account and [Connect](https://docs.stripe.com/connect/webhooks.md)). However, if an endpoint has an explicit version set, it always uses that version.
- Automated Billing operations performed by Stripe (for example, generating an *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice) for a new subscription period) use your account’s default API version. See the API changelog for details about how your default API version impacts these operations.

### View your API version and the latest available upgrade in Workbench

See the [API version used by recent requests](https://docs.stripe.com/workbench/guides.md#view-api-versions) on your account and the latest available upgrade from the [Overview](https://dashboard.stripe.com/workbench/overview) tab in Workbench.

When performing an API upgrade, make sure that you specify the API version that you’re integrating against in your code instead of relying on your account’s default API version. To test a newer version for API calls, set the `Stripe-Version` header (in live or testing environments). Learn how to manage versioning in our [server-side SDKs](https://docs.stripe.com/sdks.md#server-side-libraries).

### Upgrade and test your webhooks

> [Thin events](https://docs.stripe.com/event-destinations.md#thin-events) for API v1 resources are available in private preview. You can use them to streamline integration upgrades without changing your webhook configuration. Previously, thin events only supported API v2 resources. [Learn more and request access](https://docs.google.com/forms/d/e/1FAIpQLSeEkqzB02afvlklMkqwA6wsBH90eW8gxmc-hBOvqe2N6TRujQ/viewform?usp=dialog).

Read our guide on [how to handle webhook versioning](https://docs.stripe.com/webhooks/versioning.md).

### Perform the upgrade

When you’re confident that your code can handle the latest API version, perform the upgrade using Workbench:

1. Open the [Overview](https://dashboard.stripe.com/workbench/overview) tab in Workbench.
1. In the **API versions** section, click **Upgrade available**, which is visible if a newer API version is available.
1. Review which API version will be assigned to your account, and click **Upgrade.**

This switches the version used by API calls that don’t have the `Stripe-Version` header and also switches the version used to render objects sent to your webhooks.

> The shape of resources inside [events retrieved from the API](https://docs.stripe.com/api/events.md) is defined by the default API version of your account at the time the event occurred. If your code retrieves events created when your default API version was different, it must account for any differences in the event versions.

### Roll back your API version

For 72 hours after you’ve upgraded your API version, you can safely roll back to the version you were upgrading from in Workbench.

After you’ve rolled back, webhooks that were sent with the new object structure and failed will be retried with the old structure.

## Stay informed

[Developer changelog](https://docs.stripe.com/changelog.md): Complete record of changes to the Stripe API

[Stripe roadmap](https://stripe.com/roadmap): Preview upcoming Stripe product releases
