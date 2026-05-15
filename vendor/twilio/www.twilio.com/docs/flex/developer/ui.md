# The Flex UI

## Overview

Flex UI allows developers to build a custom user experience and custom behaviors for the Flex Agent Desktop and Flex Supervisor Desktop.

> \[!NOTE]
>
> [Auto-Generated Documentation for the Flex UI](https://assets.flex.twilio.com/docs/releases/flex-ui/latest) is now available as a beta distribution. The auto-generated documentation is accurate and comprehensive, and so may differ from what you see in the official Flex UI documentation.

The Flex UI Component Library is built in [React](https://reactjs.org/) and published on [NPM](https://www.npmjs.com/). [@twilio/flex-ui](https://www.npmjs.com/package/@twilio/flex-ui) is a node package that provides all the individual elements of the UI at the component level. It also provides a high-level API to interact with bundled SDKs such as Voice JavaScript SDK, Programmable Chat, and TaskRouter.

The Flex UI documentation provides information to help you:

* Configure the UI or manipulate default properties for standard Flex components
* Customize themes and styles
* Control localization and templates
* Add, replace, or remove components
* Take advantage of UI actions by listening, intercepting, and manipulating UI events
* Customize agent desktop notifications using Notifications Framework
* Alter behavior and appearance for native channels and define custom ones with Task Channel Definition API
* Mix-in Task or Theme context to your custom components
* Leverage the Flex Manager object to get access and control underlying SDKs
* Programmatically customize the UI using Plugin Builder
* Programmatically [customize your agent experiences](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/ProfileTabs/) in Unified Profiles

## Building with plugins

If you're building with the Flex UI, chances are you're also using Flex Plugins. The Flex UI documentation provides the programming interfaces and best practices you need to augment the Flex UI. The Plugin docs explain the development environment and help set you up to take advantage of the Flex UI's programmability.

## Next steps

* Build your first [React-based Flex plugin](/docs/flex/quickstart/getting-started-plugin)
* Explore how the Flex UI uses [Redux](/docs/flex/developer/ui/redux), a state management tool
* Discover the various [components of the Flex UI](/docs/flex/developer/ui)
