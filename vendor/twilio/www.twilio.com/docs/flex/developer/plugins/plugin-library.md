# Flex Plugin Library

## Overview

The [Flex Plugin Library](https://flex-plugins-library.twilio.com/) is a collection of ready-to-install Flex plugins. It simplifies the discovery and installation of quality Flex plugins. You can install a library plugin directly on the [Manage Plugins](https://flex.twilio.com/admin/plugins/library/) page of the Flex UI without having to use the [Flex Plugins command line interface (CLI)](/docs/flex/developer/plugins/cli).

Plugins in the library require Flex UI version 2.x.x or later. If you are still on Flex UI version 1.x.x, you won't be able to install plugins from the library. Consider [migrating to Flex UI 2.0](/docs/flex/developer/ui/migration-guide) to use the library.

## Navigate to the Plugin Library

To access the Plugin Library:

* Visit the [Twilio Flex Plugins](https://flex-plugins-library.twilio.com/) page. You don't need to be logged in to Twilio to see this page.
* If you're logged in to Twilio Console as an administrator, click **Plugins** on the Flex [Admin dashboard](https://flex.twilio.com/admin/).

![Twilio Flex Admin dashboard with Plugins section highlighted.](https://docs-resources.prod.twilio.com/36c19e5aeda8ad75a10e1c1e0cc3f5318287c3b78c5f75d8f0ad6ea9c65b4ff4.jpg)

## Browse for a plugin

You can browse the Plugin Library directly from the [Twilio Flex Plugins](https://flex-plugins-library.twilio.com/) page or from the **Manage Plugins** page in the Admin dashboard, which is shown below.

![Tabs for Plugin Library, Custom Plugins, and Custom Plugin Releases under Manage Plugins.](https://docs-resources.prod.twilio.com/d373acc8074c2c3a0e22cbd57bf0da258b837aebb7892acdc4bacb2da9f3a344.png)

This view in the Admin dashboard has changed since the introduction of the Plugin Library. Here's a glossary of the tabs:

* **Plugin Library**: This is where ready-to-install Flex plugins live. Plugins in the library are plugins built by the Twilio product teams.
* **Custom plugins**: This tab was previously called "Plugins" and lists plugins that customers have developed or customized and uploaded via the Plugins CLI. You can even customize a plugin from the Plugin Library.
* **Custom plugin releases**: This tab lists all the versions of the **Custom plugins** you have released and allows rolling back to a previous release.

If you're logged in to the Flex Admin dashboard, you're ready to install, update, or uninstall a plugin, depending on your needs. If you found a plugin through the [Twilio Flex Plugins](https://flex-plugins-library.twilio.com/) page, you must log in to Twilio Console before you can add or modify the plugin in your Flex instance.

## Install a plugin

The **Manage Plugins** page displays a collection of ready-to-install Flex plugins. Click a plugin thumbnail to view more details. The **Plugin Details** page describes the functionality the plugin provides and related attributes such as plugin versioning, supported Flex UI versions, and required installation steps.

To install a plugin, click **Install** on the Plugin Details page and provide any necessary information the plugin requires. Also make sure you follow additional [Twilio Console](/docs/flex/admin-guide/core-concepts/introduction) steps outlined in the page.

![Twilio Flex plugin page showing call recording pause and resume with TaskRouter Workspace SID input.](https://docs-resources.prod.twilio.com/601272a0626de4fa0b306928efcb70cca460dc840ed6ec1d6221fe5e461a128c.jpg)

You'll be notified once the plugin is installed. In the meantime, feel free to install other plugins or navigate elsewhere.

## Update a plugin

If a new version of the plugin is available, you'll see an "Upgrade available" tag on the plugin thumbnail in the **Manage Plugins** page or the **Plugin Details** page. Click **Upgrade** to apply the update.

The **Upgrade** button only appears if you have previously installed the plugin and a higher version is available.

## Uninstall a plugin

If for some reason you don't need the plugin anymore, click **Uninstall** on the page.

Installing, updating, or uninstalling a plugin affects all agents associated with your Flex application.
