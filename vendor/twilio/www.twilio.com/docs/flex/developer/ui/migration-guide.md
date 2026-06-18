# Migrate from Flex UI 1.x.x to 2.x.x

## Why migrate to Flex UI 2.x.x?

Twilio Flex UI 1.x.x [will reach end-of-life (EOL) on June 30, 2024](/docs/flex/flex-ui-eol-reference). As a result, you must migrate to Flex UI 2.x.x by July 2024.

We recommend that you upgrade to Flex UI 2.x.x so you can continue accessing:

* Real-time, first-party data to provide a detailed view of every individual customer with [Unified Profiles in Flex](https://pages.twilio.com/request-flex-unify-namer.html)
* [AI features](https://twilioalpha.com) that use your data to hyper personalize virtual agent conversations, agent assist recommendations, and insights to reduce operational costs
* [Flex Conversations](/docs/flex/developer/conversations) for a variety of channels, including SMS, chat, WhatsApp, email, and Facebook Messenger (public beta)
* Support for [Citrix VDI](/docs/flex/admin-guide/setup/voice/flex-citrix-vdi) (public beta) for Voice
* Inbound and outbound digital messaging, support building accessible plugins and experiences for disabled users using [Twilio Paste](https://paste.twilio.design/)

## Getting expert help with your migration

You have several options for migrating to Flex UI 2.x.x:

* If you have an in-house developer team, you can use this guide to migrate on your own.
* You can tap into the expertise of [Twilio Professional Services](https://www.twilio.com/en-us/professional-services). Flex solutions experts will complete a focused evaluation of your business's environment and provide documented recommendations for a smooth upgrade. If you decide to take this route, start by reaching out to your Twilio Account Executive to learn more.
* You can reach out to one of Twilio's partners. Twilio has an ecosystem of system integrator partners that work extensively with Flex. They can assess your business's current Flex environment and work with you to develop a migration strategy. See [details about our recommended partners](https://www.twilio.com/en-us/resource-center/benefits-of-flex-2-x-x).

## Use this guide to migrate on your own

This Flex UI `1.x.x` to `2.x.x` migration guide covers breaking changes to the Flex UI programming interfaces. It covers required changes you may need to make to custom code or plugins. The most notable changes are:

* Your dependencies may need to be upgraded
* Some aspects of Flex now use the [Conversations SDK](/docs/conversations-classic/sdk-download-install)
* Flex Conversations replaces Programmable Chat
* If you use Webchat, you must upgrade it. Because Webchat 2.x.x is built on legacy messaging, it's no longer supported. Upgrade to [Webchat 3.x.x](/docs/flex/developer/conversations/webchat), which is built on Conversations and includes enhanced security features. You also have the option to switch to the [Twilio Webchat React app](/docs/flex/developer/conversations/integrate-twilio-webchat-react-app). For more details, including a comparison of all three of these Webchat apps, see [Migrate to Webchat 3.x.x](/docs/flex/developer/conversations/webchat/migrate).
* There is a new [Theming interface](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/theming/Theme)
* State management has changed
* Sync usage has changed

> \[!NOTE]
>
> For details on each Flex UI interface mentioned in this migration guide, their description and usage code examples, check out the [Flex UI API docs](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/).

## Before you begin

Review these resources to learn more about Flex UI 2.x.x:

* [Flex UI 2.0 Enhancements Overview](/docs/flex/developer/ui/20-enhancements)
* [Flex UI 2.x.x Release Notes](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx)
* [Get Started with Flex Conversations](/docs/flex/conversations)
* [Set up your account with Flex Conversations: Prerequisites](/docs/flex/admin-guide/setup/conversations/prerequisites)

## Migration process overview

Try the migration in a test environment first. Starting with a test environment enables you to identify and correct any unexpected effects without impacting your production application.

The following sections outline high-level migration steps that you must take:

### Without custom plugins

If you don't have any custom plugins for Flex UI, complete the following steps:

1. Ensure that you have read [Set up your account with Flex Conversations: Prerequisites](/docs/flex/admin-guide/setup/conversations/prerequisites). Flex UI 2.x.x is designed to work with Conversations.
2. [Enable Flex UI 2.x.x on your account](/docs/flex/developer/ui/migration-guide/migration-guide-enable-update).

### With custom plugins

If you have deployed custom plugins to Flex UI, complete the following steps to ensure that your plugins will work with Flex UI 2.x.x:

1. Review [Flex UI 2.x.x updates that can affect your customizations](/docs/flex/developer/ui/migration-guide/migration-guide-2x-updates) to understand what updates you will need to make.
2. Ensure that you have read [Set up your account with Flex Conversations: Prerequisites](/docs/flex/admin-guide/setup/conversations/prerequisites). Flex UI 2.x.x is designed to work with Flex Conversations.
3. Disable your existing 1.x.x-based plugins.
4. [Enable the latest version of Flex UI on your account](/docs/flex/developer/ui/migration-guide/migration-guide-enable-update) using the [Flex UI version management](https://console.twilio.com/us1/develop/flex/settings/ui-versions) page on Flex Console.
5. [Update dependencies to be compatible with Flex 2.x.x](/docs/flex/developer/ui/migration-guide/migration-guide-update-dependencies).
6. [Test your plugins](/docs/flex/developer/plugins/debugging-with-vscode) in Flex UI 2.x.x. If necessary, [update your plugins for Flex 2.x.x](/docs/flex/developer/ui/migration-guide/migration-guide-update-plugins).
7. Apply any updates to your customizations that you identified in step 1.
8. [Deploy your Flex UI 2.x.x plugins](/docs/flex/developer/plugins/dashboard).
