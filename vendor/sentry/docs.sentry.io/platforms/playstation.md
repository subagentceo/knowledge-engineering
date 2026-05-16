---
title: "PlayStation"
description: "Learn how to set up Sentry's PlayStation SDK for error monitoring and performance tracking."
url: https://docs.sentry.io/platforms/playstation/
---

# PlayStation | Sentry for PlayStation

You can get started using Sentry on PlayStation without any changes to your game, on devkits as well as retail devices.

Configuration can be done in your Sentry project settings, on a new page called PlayStation that is made available to you once the middleware verification process is done.

The verification process starts [inside the PlayStation Partners website](https://game.develop.playstation.net/tm/verify/functionalsw) where you can confirm your developer status by clicking on *Confirm status*. We'll receive your request and get back to you with the next steps.

Even though crash dump collection doesn't require a Sentry SDK, if you add it, you can get additional context in your crash dumps, as well as capture non-fatal events. Sentry offers SDK support specifically for PlayStation so you can add context such as [breadcrumbs](https://docs.sentry.io/product/issues/issue-details/breadcrumbs.md) and [tags](https://docs.sentry.io/product/issues/issue-details.md#tags).

## [Using with Game Engines](https://docs.sentry.io/platforms/playstation.md#using-with-game-engines)

If you're using Unity or Unreal Engine, use the engine-specific SDK instead of integrating the console SDK directly. The game engine SDKs wrap the console SDK and provide engine-specific features:

* [Sentry SDK for Unity on consoles](https://docs.sentry.io/platforms/unity/game-consoles.md) - captures C# exceptions and syncs context with native crashes
* [Sentry SDK for Unreal Engine on consoles](https://docs.sentry.io/platforms/unreal/game-consoles.md) - provides C++ and Blueprint APIs on top of the console SDK

For custom engines or native C++ games, request access to integrate the console SDK directly as described above.

##### Availability of PlayStation support

PlayStation support is exclusive to our SaaS offering, as it depends on confidential components that cannot be distributed for self-hosted use.

Access to Sentry's error and crash reporting for consoles is a paid feature. We will review the pricing and details with you during the verification process.

***

"PlayStation", "PS5" are registered trademarks or trademarks of Sony Interactive Entertainment Inc.
