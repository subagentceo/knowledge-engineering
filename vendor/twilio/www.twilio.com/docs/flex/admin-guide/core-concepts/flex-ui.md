# Core concepts: Flex UI

> \[!NOTE]
>
> This article uses [Flex UI 2.0.x](/docs/flex/developer/ui/migration-guide)
> screenshots.

## Overview

The fastest way to try out Flex is to [sign up for Twilio](https://www.twilio.com/try-twilio) and create a new Flex account from Twilio Console, with Flex UI running on Twilio's cloud platform.

![Flex setup steps with messaging channel enabled, showing Twilio Flex interface.](https://docs-resources.prod.twilio.com/4531617bd5009673afa63d7044bd47eeac2b11e45ae43371a81718b5a01fd445.png)

After the initial setup, you can access your Flex instance at `flex.twilio.com`.

## Requirements

To view a list of hardware, software (including the browser), and networking requirements for running Flex UI, refer to [Flex UI requirements](/docs/flex/developer/ui/requirements). Also refer to the [network connectivity requirements for Voice](/docs/voice/sdks/network-connectivity-requirements) if your agents use the Voice channel.

While you have the option to host Flex UI on your own infrastructure, all the backend services associated with Flex continue to run on Twilio's platform. You still need network connectivity with Twilio.

## Flex UI structure

### Agent Desktop

The Agent Desktop is where agents accept and work on incoming [voice](/docs/flex/admin-guide/tutorials/voice-setup), [conversation](/docs/flex/end-user-guide/conversations/use-chat-and-messaging) or [messaging](/docs/flex/admin-guide/setup/messaging/test-channels) tasks. Agents spend most of their time in this view, since it's where they engage with customers. Depending on your Flex UI configuration, agents can also interact with [your contact center's CRM UI](/docs/flex/developer/ui/v1/configuration#configuring-crm-integration) on this page. Admins can [turn on the Flex Dialpad](/docs/flex/admin-guide/setup/voice/dialpad/enable) to show it in the Agent Desktop and allow agents to make outbound calls to customers.

The following views are available in Flex UI for respective [user roles](/docs/flex/admin-guide/core-concepts/introduction#users-and-roles-in-flex):

### Flex Admin UI

The Flex Admin UI lets administrators perform basic configuration tasks and provides a central entry point for admin settings in Twilio Console.

![Twilio Flex admin dashboard with options for versions, plugins, skills, and integrations.](https://docs-resources.prod.twilio.com/f135ed48012adfffd64ba7f23706b6daa673c27affd74b90dd26bcefed224870.png)

### Teams view

Teams view is visible for supervisors and administrators and displays a maximum of 200 agents. It provides a real-time view of contact center agents' activity. This gives supervisors a high-level overview of the tasks individual agents are working on, with [the ability to read a chat history or listen in on individual conversations](/docs/flex/end-user-guide/real-time-reporting/monitor-agent-activity).

### Real-time Queues view

Real-time Queues view is visible for supervisors and administrators. It gives visibility into inbound and outbound tasks on your contact center. This view updates every 1 to 3 seconds and displays real-time metrics across both the whole contact center and the individual queues.

### Flex Insights view

[Flex Insights](/docs/flex/end-user-guide/insights) is a reporting tool that provides insight into your contact center's performance. It gives team leads and supervisors the ability to assess conversations and provide feedback on performance.

To turn on Flex Insights view in Flex UI, you need to have a paid plan. When you turn it on, you get additional Flex UI views, including the **Dashboards** view, which displays historical data about your contact center.

## Flex UI settings

Flex UI settings control how the overall UI loads, as well as the appearance and behavior of individual Flex components.

You can access Flex UI settings in the following ways:

* Using the Flex Configuration API to update the `ui_attributes` property.
* Specifying the settings in the **appConfig.js** file. Values set in **appConfig.js** take precedence over values in the Flex Configuration API. This option may be more accessible for self-hosted Flex UI customers.

Learn more about these settings in the [developer documentation](/docs/flex/developer/ui/v1/configuration).

## Flex UI versioning

UI version updates are applied to your account based on your configurations on the [**Flex UI versions**](https://console.twilio.com/us1/develop/flex/settings/ui-versions) page.

By default, all accounts are configured to automatically update to new Flex UI minor releases. If you prefer not to receive automatic updates, turn off **Update minor versions** to keep the your current Flex version. If you choose not to receive automatic updates, remember to manually update your Flex version regularly to receive the latest features and updates and to ensure that you remain on a supported version.

![Flex UI version 2.13.2 details with options to update or revert versions.](https://docs-resources.prod.twilio.com/64c7bcfe318d00bb085c65578e6ee9cfb32e0d42f995413aee8ca4275a8f7bdb.png)

Because new major versions may include breaking changes, we won't automatically update your Flex instance to new major versions. You control when to apply those updates.

For more details, see [How We Release Flex](/docs/flex/how-we-release-flex#flextwiliocom).

## Single sign-on

Single sign-on (SSO) is an authentication method that lets users log in with one set of credentials to any software system configured to work with an identity provider (IdP).

Flex integrates with your existing IdP to authenticate users (agents, supervisors, or admins). [Flex supports any IdP](/docs/flex/admin-guide/setup/sso-configuration) that uses SAML 2.0 (such as Google, Microsoft Entra, and Okta). This enables you to use your primary corporate account as the identity provider for Flex.

## Opt-in features

The [**Opt-in features**](https://console.twilio.com/us1/develop/flex/settings/features/ga) page helps administrators stay up-to-date and interact with optional Flex features, including Flex pilot and beta features:

* **Beta features** (public and private betas) deliver core capabilities while Twilio continues to invest in their architecture for a generally available (GA) release. The Twilio SLA or Twilio Support Plans don't cover these features.
* **Pilot features** give you early access to potentially upcoming new features. These features are subject to change or removal while under development. Due to known limitations and no guarantees on backward compatibility, we don't recommend using these features in production environments.

## Themes

By default, Twilio provides some preset themes or skins, and customization options for the left and top navigation panes. From the Admin panel, you can click **Edit** under **Configure Design** and make your changes in the [UI Configuration](https://flex.twilio.com/admin/ui-configure) page. More fine-grained customizations are available on the code level.

## Flex plugins

Flex UI supports [plugins](/docs/flex/developer/ui-and-plugins), which are self-contained React components that let developers extend, modify, or add new functionality to the Flex frontend. Plugins have access to all the Flex frontend APIs.

> \[!NOTE]
>
> Check out the [Flex Plugin Library](/docs/flex/developer/plugins/plugin-library). It requires Flex UI 2.x.x and gives you access to ready-to-install plugins without using the CLI.

### View installed plugins in Flex UI

You can view and manage the plugins on your Flex application by going to **Admin** > **Plugins** > [**Custom plugins**](/docs/flex/developer/plugins/dashboard).

![Twilio Flex manage plugins page showing plugin library with options for Twilio and community plugins.](https://docs-resources.prod.twilio.com/31393a932a6b38afea3b2799c8d45fd7134a6c7d356e2e1237e5a7006c849377.png)

If you have plugins that are currently using an older Flex UI version, you can view them on the [Developer Setup](https://flex.twilio.com/admin/developers) page.

### How to deploy plugins

[Using the Plugins CLI](/docs/flex/developer/plugins/cli/deploy-and-release) is the most straightforward way to deploy a plugin. The Plugin Builder stores the plugin as a Twilio Asset and registers it with Flex.

Alternatively, you can [deploy the plugin to your own infrastructure](/docs/flex/developer/plugins/cli/common-uses#deploy-to-your-own-cdn) and register your external asset for Flex to load. Once you deploy your plugins, Flex identifies and serves the assets when the UI loads. Learn more about the [Flex Plugins CLI](/docs/flex/developer/plugins/cli).
