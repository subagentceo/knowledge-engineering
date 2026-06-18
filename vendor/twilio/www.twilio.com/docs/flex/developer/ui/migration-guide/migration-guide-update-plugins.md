# Update plugins for Flex UI 2.x.x

This page explains how to update your plugins when migrating to Flex UI 2.x.x. For more information about the entire migration process, see [Migrate from Flex UI 1.x.x to 2.x.x](/docs/flex/developer/ui/migration-guide).

> \[!WARNING]
>
> Flex UI 2.x.x works with Flex Plugins CLI 4.1.3 or higher.
>
> [Install](/docs/flex/developer/plugins/cli) the latest version of the Flex Plugins CLI.
>
> Your plugins must use the Flex Plugins CLI in order to be served on Flex UI 2.x.x. If you have plugins built on older versions of the Plugin Builder, you need to [migrate them to use the Plugins CLI](/docs/flex/developer/plugins/migrate).

## Update Flex 1.x.x plugins for Flex 2.x.x

Based on the implementation of your plugin, you may need to update your plugin source code and its dependencies to be compatible with Flex UI 2.x.x.

### Update your plugin dependencies

When you leverage the `create` command of the Flex Plugins CLI to create a new plugin, you need to update the dependencies on the ***package.json*** file of the plugin to make it compatible with 2.x.x.

Note the differences between the dependencies and devDependencies on the following sample ***package.json*** files. You need to update the `devDependencies` in order to run your plugin locally via the `twilio flex:plugins:start` command of the CLI.

## Flex UI 1.x.x

```json
{
 "name": "plugin-sample",
 "version": "0.0.0",
 "private": true,
 "scripts": {
   "postinstall": "flex-plugin pre-script-check"
 },
 "dependencies": {
   "@twilio/flex-plugin-scripts": "5.1.1",
   "react": "16.5.2",
   "react-dom": "16.5.2",
   "react-emotion": "9.2.12"
 },
 "devDependencies": {
   "@twilio/flex-ui": "^1",
   "react-test-renderer": "16.5.2"
 }

```

## Flex UI 2.x.x

```json
{
  "name": "plugin-sample",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "postinstall": "flex-plugin pre-script-check"
  },
  "dependencies": {
    "@twilio/flex-plugin": "7.1.0",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "prop-types": "^15.7.2",
    "@twilio-paste/core": "^15.3.1",
    "@twilio-paste/icons": "^9.2.0"
  },
  "devDependencies": {
    "@twilio/flex-plugin-scripts": "7.1.0",
    "@twilio/flex-ui": "2.10.0",
    "react-test-renderer": "17.0.2",
    "typescript": "^4"
  }
}
```

### Manage migration of your plugins

Following are some guidelines to help you manage the migration of your plugins:

1. Once you have updated your plugin code and [dependencies](/docs/flex/developer/ui/migration-guide/migration-guide-update-dependencies) to be compatible with 2.x.x, test your plugin locally by using the `twilio flex:plugins:start` command of the Flex Plugins CLI.
2. Once you have tested your plugin to ensure that it works as expected, deploy your plugin to your dev or staging environment using the `twilio:flex:plugins:deploy` command. We recommend following the Semantic Versioning format for managing your plugin version. Since this plugin is compatible with 2.x.x, we recommend registering this plugin version as a new major version. Use the --major argument and write a clear description for the Changelog of this version.
3. Enable the plugin deployed on your stage/dev account via the [Plugins Dashboard](/docs/flex/developer/plugins/dashboard) or the [Plugins CLI](/docs/flex/developer/plugins/cli).
4. Follow Steps 1 to 3 for migrating all your plugins to be compatible with Flex UI 2.x.x.
5. Finally, create a release via the CLI or the Plugins Dashboard that contains all the plugins that you have migrated to 2.x.x. Leverage the description and the name fields to tag the release as being compatible with 2.x.x.
