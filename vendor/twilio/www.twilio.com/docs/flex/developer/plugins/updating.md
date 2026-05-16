# Keeping Plugins Up-To-Date

When developing [Flex Plugins](/docs/flex/developer/ui-and-plugins), there are three sets of versions that you want to keep updated:

1. The Flex Plugins CLI version that provides the tooling required for building and managing plugins
2. The `flex-plugin` version of your plugin's development environment
3. The versions of the plugins you create

Each of these is managed independently. Updating the Flex Plugins CLI won't automatically update the development environment of your existing plugins. This allows you to trial new features in your latest plugins without risking backwards-incompatible changes in your other codebases.

## Upgrade Flex Plugins CLI

To identify the latest version release available, run the following command:

```bash
$ npm show @twilio-labs/plugin-flex

1.0.0
```

To identify the version installed in your development environment, run the following command:

```bash
$ twilio plugins

@twilio-labs/plugin-flex 4.8.0
```

Refer to our [Upgrade Guide](/docs/flex/developer/plugins/cli/upgrade) if your installed version is behind the latest available version.

> \[!WARNING]
>
> If you aren't using the [Flex Plugins CLI](/docs/flex/developer/plugins/cli) or don't have the [Twilio CLI](/docs/twilio-cli/quickstart) installed to run the `twilio` command, then you may be running Flex using legacy plugins. Refer to our [migration guide](/docs/flex/developer/plugins/migrate) for updating your plugins to use the Flex Plugins CLI.

## Upgrade flex-plugin dependencies

Existing plugin directories are not automatically updated to use the latest features from the Flex Plugins CLI. These must be individually migrated to add new build scripts or apply updated dependencies. You can verify the version of your plugin by checking the `flex-plugin` dependency within your plugin's `package.json`.

```json
"dependencies": {
    "flex-plugin": "4.0.0",
    ...,
}
```

In your plugin directory, run the following command using the CLI. This command upgrades and installs your plugin dependencies to be compatible to use the latest version of Plugins CLI.

```bash
twilio flex:plugins:upgrade-plugin --install
```

The command updates the scripts and the dependencies in the *package.json* of your plugin. This command will not override any of the changes you made in the package.json.

To upgrade your plugin to be compatible with Flex UI `2.x`, run the following command:

```bash
twilio flex:plugins:upgrade-plugin --flexui2
```

Check out our [Migration Guide](/docs/flex/developer/ui/migration-guide) to determine the necessary steps for your plugin upgrade.

### Check additional dependencies

As you develop your plugins, you may include dependencies in addition to the ones we've provided as part of the `create-flex-plugin` template. The [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) package can check all of the dependencies in your `package.json` and identify the latest available versions. To use this package:

1. Install `npm-check-updates` globally.

```bash
npm install -g npm-check-updates
```

2. Run the `ncu` command in the root directory of your plugin to display any new dependencies for the project.

```bash
ncu 
Checking ~/plugin-sample/package.json
[====================] 21/21 100%

 craco-config-flex-plugin  ^3.0.0  →  ^3.0.1

Run ncu -u to upgrade package.json
```

3. Update any of the identified dependencies in your `package.json` and run another `npm install`.

## Upgrade which plugin versions are live

If you have been using the Flex Plugins CLI to deploy and release your plugins, you can confirm which versions are live by running the following command.

```bash
twilio flex:plugins:describe:release --active
```

An example output is shown below:

![Active release details with configuration and plugin information for signal-demo profile.](https://docs-resources.prod.twilio.com/ef42451fd7c6b22ec023a553392483f3dbc3ef5cce9981553f061bcd30b1fe1e.png)

For each active plugin, you can identify the latest available version using the `describe:plugin` command. For example:

```bash
twilio flex:plugins:describe:plugin --name plugin-agent-notes
```

![Plugin details for agent notes, including SID, version, URL, changelog, access, and creation date.](https://docs-resources.prod.twilio.com/3b5ebd4cd97fd93c2eb77a6d1d46634c4e4957ccba30052c640c6f47bfc25c8b.png)

You must generate a new [plugin release](/docs/flex/developer/plugins/cli/deploy-and-release) to update Flex to use the latest version of your plugins. If we wanted to update `plugin-agent-notes`, and this is the only plugin active for your agents, you'd use the following command:

```bash
twilio flex:plugins:release --description "Integrating notes with CRM" --name "Agent Notes v5" --plugin plugin-agent-notes@5.0.0
```

You can also change the version of a plugin by using the Plugins Dashboard. Refer to the [Plugins Dashboard Usage Guide](/docs/flex/developer/plugins/dashboard) for more details.
