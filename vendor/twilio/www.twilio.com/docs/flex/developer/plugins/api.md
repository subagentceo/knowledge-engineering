# The Plugins API

> \[!NOTE]
>
> Check out the [Flex Plugin Library](/docs/flex/developer/plugins/plugin-library). It requires Flex UI 2.x.x and gives you access to ready-to-install plugins without using the CLI.

The Plugins API defines which plugins the Flex UI will load during initialization. [Flex Plugins](/docs/flex/developer/ui-and-plugins) are bundled JavaScript or TypeScript customizations that change the presentation and behavior of the Flex UI.

The Plugins API is used by the [Flex Plugin CLI](/docs/flex/developer/plugins/cli) and the [Custom Plugins Dashboard](/docs/flex/developer/plugins/dashboard) to simplify common workflows like:

1. Defining a plugin and each incremental version that you develop
2. Control which plugins are enabled for your agents
3. Track your version and release history as you update Flex
4. Quickly revert to a previously known working configuration when troubleshooting agent issues

## Resources

A **[Release](/docs/flex/developer/plugins/api/release)** enables your plugin configuration. Only one release can be active within your account.

A **[Configuration](/docs/flex/developer/plugins/api/plugin-configuration)** contains the collection of plugin versions that you want to roll out to your contact center.

A **[Plugin Version](/docs/flex/developer/plugins/api/plugin-version)** contains all the information about a particular version of a plugin: the link to the plugin package, the version number, and which plugin it relates to. Plugin Versions can be hosted on [Twilio Assets](/docs/serverless/api) or at any other destination you prefer.

A **[Plugin](/docs/flex/developer/plugins/api/plugin)** contains information about a plugin, like its name and description.

The diagram below shows the relationship between each of the resources mentioned above:

![Flowchart showing Plugin A, B, C connecting to versions v1, v2 leading to Releases 1.0, 2.0, 3.0.](https://docs-resources.prod.twilio.com/a081864aa6558b9acf9dd8b8f886fa2ba545cc311fdf91432acacffdbb013233.png)

## Next Steps

While it's useful to know about the Plugins API for advanced use cases, the Flex Plugins CLI makes it a lot easier to interact with it. Head over to the [Flex Plugins CLI docs](/docs/flex/developer/plugins/cli) to learn more. If you would rather use a UI to manage your plugins, refer to the [Custom Plugins Dashboard usage guide](/docs/flex/developer/plugins/dashboard) to get started.
