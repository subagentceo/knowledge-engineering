# Validate, deploy, and release a plugin using the Flex Plugins CLI

The `twilio flex:plugins:deploy` command automates the process of uploading your plugin to Flex. This allows you to deploy your plugins using the command line, without needing to manually upload them using a GUI. After a deploy, your plugin is not yet enabled for your Flex users. You need to run the `release` command after the deploy to enable any changes.

The `twilio flex:plugins:release` command is used to change which plugins are live for your users. You can group multiple plugins into a release, and you can re-activate any prior release to rollback changes.

This guide includes examples for deploying and releasing your Flex plugins.

## Compatible CLI versions

You need to [install the latest version](/docs/flex/developer/plugins/cli/install) of the Flex Plugins CLI in order to use these features. If you're migrating a legacy plugin to use the new CLI, refer to our [Migration Guide](/docs/flex/developer/plugins/migrate).

## Validating a plugin

In the Flex Plugins CLI version 7.0.0 and later, you can validate your plugin code. During validation, the Plugins CLI provides recommendations that help you follow best practices for maintaining the compatibility of your plugins as Flex UI evolves.

When you run the [Deploy](/docs/flex/developer/plugins/cli/reference#deploy) command for your plugin, the validation process runs implicitly. You can also validate your plugin anytime with the [Validate](/docs/flex/developer/plugins/cli/reference#validate) command.

If you use automated deployments, such as a CI/CD pipeline, the plugin validation that happens during deployment can disrupt your automations. To prevent this issue, use the `--bypass-validation` option on the Deploy command to ignore plugin validation errors for automated deployments.

### How does plugin validation work?

The Flex Plugins CLI scans the source code of your plugin against a pre-defined set of rules and recommendations. Twilio does not store your plugin source code or use AI to evaluate it.

If the validation process finds any issues, the CLI displays the issues and our recommendations to resolve them. We highly recommend that you address these issues to improve the compatibility of your plugin with future Flex releases. However, you can choose to skip fixing some or all these issues and deploy your plugin as-is.

The recommendations provided by the validation process help you follow best practices to keep your plugin compatible with future Flex UI releases. However, we cannot guarantee future compatibility.

## Deploying a major version of a plugin

```bash
twilio flex:plugins:deploy --major --changelog "Notes for this version" --description "Functionality of the plugin"
```

The `deploy` command does the following:

* It publishes your plugin as a [Private Asset](/docs/serverless/functions-assets/assets) that is accessible by the Functions & Assets API. If you want to deploy your plugin as a Public Asset, you may pass `--public` to your `deploy` command.
* It registers a new version of the plugin with the [Plugins API](/docs/flex/developer/plugins/api). For the example above, the `--major` flag is passed. This creates a new major version of the plugin (for example, v1 to v2), and it stores the provided changelog along with your new version. If a version option (`major`, `minor`, or `patch`) is not provided, the `deploy` command defaults to a new patch version.
* It updates the version field in the `package.json` of your plugin to the new version.
* If the plugin is being deployed the first time, it also registers it as a new plugin with the provided description. The `description` option does not need to be provided on additional deploys.

## Creating a new release

Releasing plugins is a two-step process using the Plugins API.

1. You create a [Flex Plugin Configuration](/docs/flex/developer/plugins/api/plugin-configuration). This contains the list of plugins you want active and their versions.
2. You create a [Flex Release](/docs/flex/developer/plugins/api/release-update) with the configuration created in the previous step.

The **Plugins CLI** `release` command combines both of these steps to simplify the most common scenarios.

### One-step release

You can create a release by listing each of the plugins that should be active for your users:

```bash
twilio flex:plugins:release --plugin example-plugin@1.0.0 --plugin additional-plugin@2.1.0 --name "Example 1" --description "Demonstrating use of twilio flex:plugins:release"
```

The `release` command does the following:

* It creates a [Flex Plugin Configuration](/docs/flex/developer/plugins/api/plugin-configuration) resource using the [Plugins API](/docs/flex/developer/plugins/api/release-guide) with all of the provided arguments.
* It creates a [Flex Release](/docs/flex/developer/plugins/api/release-update) resource for the Configuration that was just created.

When constructing a new release:

* The `--plugin` argument takes the plugin you want to enable in the format **plugin-name@version.** Multiple plugins can be grouped into a release by using `--plugin` for each plugin that should be enabled.
* We recommend setting the `--name` and `--description` options. These can be used to describe what changed within this release, and these details will be displayed within the Plugins Dashboard. These are a useful reference when reviewing your release history or choosing to re-deploy a prior release.

### Separate your configuration and release

A new configuration does not need to be immediately released to users. You can instead create a configuration first and then pass in a reference to the configuration when creating a release. This is similar to the process you'll use to re-deploy a prior release.

First, create a new Flex Plugin Configuration:

```bash
twilio flex:plugins:create-configuration --name "Example config1" --description "Testing new plugins" --plugin plugin-test-example@1.0.0 --plugin <additional-plugin-name>@<version>
```

This command will create a new configuration and return the SID of your new resource. You can lookup the SID of a configuration by running:

```bash
twilio flex:plugins:list:configurations
```

Finally, create a new Release with your provided Flex Plugin Configuration:

```bash
twilio flex:plugins:release --configuration-sid <Configuration Sid>
```

## Releasing multiple plugins

By default, the `release` and `create-configuration` commands will merge the list of plugins you provide with the plugins that are on the active configuration. This behavior can be changed with the `--new` argument. Suppose you have two plugins live: `plugin-alpha@1.0.1` and `plugin-beta@2.1.1`. A new v1.1.0 version of `plugin-alpha` has been deployed, and you are creating a new release:

**Without --new (default)**

```bash
twilio flex:plugins:release --plugin plugin-alpha@1.1.0 --name "Bumping Alpha" --description "Alpha and Beta both up-to-date"
```

In this release, `plugin-alpha` is updated to the version provided in the command. `plugin-beta` stays enabled on the active version.

**With --new**

```bash
twilio flex:plugins:release --new --plugin plugin-alpha@1.1.0 --name "Removing Beta" --description "Bumping Alpha and disabling Beta"
```

In this release, only the provided plugins are added to this release's configuration. The end result will be that only `plugin-alpha` is enabled.

The `--new` argument **must** be used if you are disabling a plugin that is on the active configuration.

## Managing multiple accounts

The Flex Plugins CLI uses your Twilio Account SID and Auth Token to deploy your plugins.

If you are deploying your plugins to multiple accounts, you will need to provide credentials for each account. You can [create multiple profiles using the Twilio CLI](/docs/twilio-cli/general-usage) to store multiple credentials, and then pass them through to your commands in a few ways:

### Use a Profile Name

Let's say you have created a profile called `stage`. You can pass the profile name in the `deploy` command to use the designated account.

```bash
twilio flex:plugins:deploy -p stage
```

### Switch profiles

Alternatively, you may switch which profile is active using the Twilio CLI's `profiles` command. To see the full list of local profiles and choose a new active profile, run:

```bash
twilio profiles:list
twilio profiles:use PROFILE_ID
```

### Environment variables

New pairs of `AccountSid` and `AuthToken` credentials may also be provided as environment variables with the `deploy` command:

```bash
TWILIO_ACCOUNT_SID=ACxxx TWILIO_AUTH_TOKEN=abc123 twilio flex:plugins:deploy

```

This will use the provided credentials and save them in the keychain. If you have multiple accounts saved and you do not provide credentials along with your `deploy` command, then you will be prompted to select one:

```bash
? Select from one of the following Account Sids (Use arrow keys)
❯ AC0000000000000000000000000000000
  AC0000000000000000000000000000001
  AC0000000000000000000000000000002

```

You can use the above commands to tie plugin deployment into a CI/CD pipeline. For example:

```bash
# !/bin/bash
# This script runs within your plugin directory
npm install
npm run test
npm run lint
TWILIO_ACCOUNT_SID=ACXXXX TWILIO_AUTH_TOKEN=pass123 twilio flex:plugins:deploy

```

Make sure to handle your `AccountSid` and `Auth` Token as environment variables or arguments passed into your scripts.

## Next steps

* Learn about [other common use cases](/docs/flex/developer/plugins/cli/common-uses) for the Plugins CLI
* Start [building your first Plugin](/docs/flex/quickstart/getting-started-plugin)
* Learn about the underlying [Plugins API](/docs/flex/developer/plugins/api)
