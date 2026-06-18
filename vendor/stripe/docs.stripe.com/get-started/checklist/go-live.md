# Go-live checklist

Use this checklist when taking your integration live.

> [Become a Stripe Partner](https://stripe.com/partners/become-a-partner) to access additional best practices and receive relevant news and updates from Stripe.

As you complete each item and check it off, the state of each checkbox is stored within your browser’s cache. You can refer back to this page at any time to see what you’ve completed so far.

You can [log in](https://dashboard.stripe.com) to see some of your current settings.

Stripe has designed its live and *sandbox* (A sandbox is an isolated test environment that allows you to test Stripe functionality in your account without affecting your live integration. Use sandboxes to safely experiment with new features and changes) environments to function as [similarly as possible](https://docs.stripe.com/keys.md#test-live-modes). Switching between them is mostly a matter of swapping your [API keys](https://docs.stripe.com/keys.md).

If you’re a developer (or had a developer perform an integration for you) also consider the following items before going live. If you’re using Stripe through a connected website or a plug-in, most won’t apply.

- [ ] Set the API version
      > All requests use your account API settings, unless you override the API version. The [changelog](https://docs.stripe.com/changelog.md) lists every available version. By default, webhook events are structured according to your account API version, unless you set an API version during [endpoint creation](https://docs.stripe.com/api/webhook_endpoints/create.md).

      If you’re using a strongly typed language (Go, Java, TypeScript, .NET), the server-side library pins the API version based on the library version you’re using. If you’re not familiar with how Stripe manages versioning, see [versioning](https://docs.stripe.com/sdks.md#server-side-libraries).

      To make sure everything is in sync:

      - Upgrade to the latest API version in [Workbench](https://dashboard.stripe.com/workbench) within the Dashboard
      - For dynamic languages (Node.js, PHP, Python, Ruby): [set the API version](https://docs.stripe.com/sdks.md#server-side-libraries) in the server-side library
      - For strongly typed languages (Go, Java, TypeScript, .NET): [upgrade to the latest version](https://docs.stripe.com/sdks.md#server-side-libraries) of your chosen library

- [ ] Handle edge cases
      We’ve created several [test values](https://docs.stripe.com/testing.md) you can use to replicate various states and responses. Beyond these options, perform your due diligence, testing your integration with:

      - Incomplete data
      - Invalid data
      - Duplicate data (for example, retry the same request to see what happens) We also recommend you have someone else test your integration, especially if that other person isn’t a developer themselves.

- [ ] Review your API error handling
      Don’t wait to go live before discovering that you haven’t properly written your code to handle every possible [error type](https://docs.stripe.com/api/errors.md), including those that should “never” happen. Make sure your code is defensive, handling not just the common errors, but all possibilities.

      When testing your error handling, pay close attention to what information you show to your users. A card being declined (that is, a `card_error`) is a different concern than an error on your back end (for example, an `invalid_request_error`).

- [ ] Review your logging
      Stripe logs every request made with your API keys, with these records being viewable in the [Dashboard](https://dashboard.stripe.com/logs). We recommend that you log all important data on your end also, despite the apparent redundancy. Your own logs serve as a backup if your server has a problem contacting Stripe or you have an issue with your API keys—both cases would prevent us from logging your request.

      Regularly examine your logs to make sure they store only the information you need, and not anything of a sensitive nature (for example, credit card details or personally identifiable information).

- [ ] Ensure you're not relying on test objects
      Stripe objects created in a sandbox environment—such as plans, coupons, products, and SKUs—aren’t usable in live mode. This prevents your test data from being inadvertently used in your production code. When recreating necessary objects in live mode, be sure to use the same ID values (for example, the same plan *ID*, not the same *name*) to guarantee your code continues to work without issue.

- [ ] Ensure you've registered your production webhooks
      Your Stripe account can have both test and live [webhook endpoints](https://docs.stripe.com/webhooks.md). If you’re using webhooks, make sure you’ve defined live endpoints in your Stripe account. Then confirm that the live endpoint functions exactly the same as your test endpoint.

      While examining your webhooks status, also make sure to check that your production endpoint:

      - Handles delayed webhook notifications
      - Handles duplicate webhook notifications
      - Doesn’t require event notifications to occur in a specific order

- [ ] Subscribe to the API announcements mailing list
      We recommend all developers subscribe to our [API updates mailing list](https://groups.google.com/a/lists.stripe.com/forum/#!forum/api-announce) to keep up with new features as we release them.

- [ ] Change and secure your API keys
      As a security measure, we recommend [rotating your API keys](https://docs.stripe.com/keys.md#rolling-keys) on a regular basis. Before you go live:

      - Rotate your keys in case they’ve been saved somewhere outside of your codebase during development.
      - Make sure your code doesn’t include any API keys.
      - Review the other [best practices for managing secret API keys](https://docs.stripe.com/keys-best-practices.md) before making your integration live.
