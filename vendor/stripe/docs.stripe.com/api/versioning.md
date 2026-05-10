# Versioning

Each major release, such as [Acacia](https://docs.stripe.com/changelog/acacia.md), includes changes that aren’t [backward-compatible](https://docs.stripe.com/upgrades.md#what-changes-does-stripe-consider-to-be-backward-compatible) with previous releases. Upgrading to a new major release can require updates to existing code. Each monthly release includes only backward-compatible changes, and uses the same name as the last major release. You can safely upgrade to a new monthly release without breaking any existing code. The current version is 2026-04-22.dahlia. For information on all API versions, view our [API changelog](https://docs.stripe.com/changelog.md).

By default, requests made with curl use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)) unless you override it by setting the `Stripe-Version` header.

Webhook events also use your account’s API version by default, unless you set an API version during [endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md).

By default, requests made with the Stripe CLI use your account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)) unless you override it with the `stripe-version` argument.

Webhook events also use your account’s API version by default unless you set an API version when [creating the endpoint](https://docs.stripe.com/api/webhook_endpoints/create.md).

- Starting from `stripe-ruby v9`, the requests you send using `stripe-ruby` align with the API version that was current when your version of `stripe-ruby` was released.
- On `stripe-ruby v8` or lower, requests made with `stripe-ruby` use your Stripe account’s default API version, controlled in [Workbench](https://dashboard.stripe.com/workbench).

You can [override the API version](https://docs.stripe.com/sdks/set-version.md) in your code in all versions.

To override the API version, assign the version to the `Stripe.api_version` property, or set it per-request. When overriding it per-request, methods on the returned object reuse the same Stripe version.

Webhook events use the API version that’s set during your [webhook’s endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md). Otherwise, they use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)). If you’re on `stripe-ruby v9` or later, match your webhook endpoint API version to the version pinned by your `stripe-ruby` version (`Stripe.api_version` property).

- Starting from `stripe-python v6`, the API version fixed at the time of your `stripe-python` version release dictates the requests you send using `stripe-python`.
- On `stripe-python v5` or lower, requests made with `stripe-python` use your Stripe account’s default API version, controlled in [Workbench](https://dashboard.stripe.com/workbench).

You can [override the API version](https://docs.stripe.com/sdks/set-version.md) in your code in all versions.

To override the API version, assign the version to the `stripe.api_version` property, or set it per-request. When overriding it per-request, methods on the returned object reuse the same Stripe version.

Webhook events use the API version that’s set during your [webhook’s endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md). Otherwise, they use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)). If you’re on `stripe-python v6` or later, match your webhook endpoint API version to the version pinned by your version of `stripe-python` (`stripe.api_version` property).

- Starting from `stripe-php v11`, the requests you send using `stripe-php` align with the API version that was current when your version of `stripe-php` was released.
- On `stripe-php v10` or lower, requests made with `stripe-php` use your Stripe account’s default API version, controlled in [Workbench](https://dashboard.stripe.com/workbench).

You can [override the API version](https://docs.stripe.com/sdks/set-version.md) in your code in all versions.

To override the API version, pass the version to the `\Stripe\Stripe::setApiVersion()` method, or set it per-request. When overriding it per-request, methods on the returned object reuse the same Stripe version.

Webhook events use the API version that’s set during your [webhook’s endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md). Otherwise, they use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)). If you’re on `stripe-php v11` or later, match your webhook endpoint API version to the version pinned by your version of `stripe-php` (`\Stripe\Stripe::getApiVersion()` method).

Because `stripe-java` is strongly typed, requests that you send using it are fixed to the API version that was the latest at the time your version of `stripe-java` was released. To use a newer or older API version, upgrade or downgrade your version of `stripe-java`. Use the [stripe-java changelog](https://github.com/stripe/stripe-java/blob/master/CHANGELOG.md) to find which versions include the API version you need.

Webhook events use the API version that’s set during your [webhook’s endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md). Otherwise, they use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)). Create a webhook endpoint with an API version equal to the version that’s pinned by your version of `stripe-java`, which you can determine through the `Stripe.API_VERSION` property.

- Starting from `stripe-node v12`, the requests you send using `stripe-node` align with the API version that was current when your version of `stripe-node` was released. This ensures that your TypeScript types are compatible with the API version you use.
- On `stripe-node v11` or lower, requests made with `stripe-node` use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)).

You can [override the API version](https://docs.stripe.com/sdks/set-version.md) in your code in all versions.

To override the API version, provide the `apiVersion` option when initializing the library, or set it per-request. This might cause inaccurate Typescript types.

Webhook events also use your account’s API version by default, unless you set an API version during [endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md).

Because `stripe-go` is strongly typed, the requests you send align with the API version current at your `stripe-go` version’s release time. If you want to use a newer or older API version, consider upgrading or downgrading your stripe-go version. Use the [stripe-go changelog](https://github.com/stripe/stripe-go/blob/master/CHANGELOG.md) to find which versions include the API version you need.

Webhook events use the API version that’s set during your [webhook’s endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md). Otherwise, they use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)). Create a webhook endpoint with an API version equal to the version that’s pinned by your version of `stripe-go`, which you can determine through the `stripe.apiversion` property.

Because `stripe-dotnet` is strongly typed, the requests you send align with the API version current at your `stripe-dotnet` version’s release time. If you want to use a newer or older API version, consider upgrading or downgrading your `stripe-dotnet` version. Use the [stripe-dotnet changelog](https://github.com/stripe/stripe-dotnet/blob/master/CHANGELOG.md) to find which versions include the API version you need.

Webhook events use the API version that’s set during your [webhook’s endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md). Otherwise, they use your Stripe account’s default API version (controlled in [Workbench](https://dashboard.stripe.com/workbench)). Create a webhook endpoint with an API version equal to the version that’s pinned by your version of `stripe-dotnet`, which you can determine through the `StripeConfiguration.ApiVersion` property.

You can upgrade your API version in [Workbench](https://dashboard.stripe.com/workbench). As a precaution, use API versioning to test a new API version before committing to an upgrade.
