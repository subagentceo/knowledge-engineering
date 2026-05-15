---
title: "Nintendo Switch"
description: "Learn how to set up Sentry's Nintendo Switch SDK for error monitoring and performance tracking."
url: https://docs.sentry.io/platforms/nintendo-switch/
---

# Nintendo Switch | Sentry for Nintendo Switch

You can get started using Sentry on Nintendo Switch without any changes to your game, on devkits as well as retail devices.

It can be done directly on Nintendo's CRPORTAL. The two environments available are [lp1 for retail devices](https://crash-report.wc.lp1.er.srv.nintendo.net/sentry/get_started) and [dd1 for devkits](https://crash-report.wc.dd1.er.srv.nintendo.net/sentry/get_started). In both cases you can configure Nintendo's servers to start forwarding your crashes directly to Sentry.

If you want to add additional context to your crash dumps, or you want to capture non-fatal events, Sentry offers an SDK specifically for Nintendo Switch. It allows for adding additional context such as [breadcrumbs](https://docs.sentry.io/product/issues/issue-details/breadcrumbs.md) and [tags](https://docs.sentry.io/product/issues/issue-details.md#tags). To get access to the SDK, please reach out via the [Nintendo Developer Authorization](https://developer.nintendo.com/group/development/getting-started/g1kr9vj6/middleware/sentry) form.

Support for Switch 2 as well as the original Switch is available.

## [Using with Game Engines](https://docs.sentry.io/platforms/nintendo-switch.md#using-with-game-engines)

If you're using Unity or Unreal Engine, use the engine-specific SDK instead of integrating the console SDK directly. The game engine SDKs wrap the console SDK and provide engine-specific features:

* [Sentry SDK for Unity on consoles](https://docs.sentry.io/platforms/unity/game-consoles.md) - captures C# exceptions and syncs context with native crashes
* [Sentry SDK for Unreal Engine on consoles](https://docs.sentry.io/platforms/unreal/game-consoles.md) - provides C++ and Blueprint APIs on top of the console SDK

For custom engines or native C++ games, request access to integrate the console SDK directly as described above.

***

"Nintendo", "Nintendo Switch" are trademarks or registered trademarks of Nintendo.
