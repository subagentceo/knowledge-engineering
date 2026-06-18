# Plugins CLI Reference

This page describes the available commands in the Flex Plugins CLI and their associated parameters.

> \[!NOTE]
>
> For general Flex Plugins CLI usage help, you can run `twilio flex:plugins --help` from your command line. To review the command usage details as well as required and optional flags, run `twilio flex:plugins:COMMAND --help`.

## Archive

```bash
twilio flex:plugins:archive
```

[Archives](/docs/flex/developer/plugins/cli/archive) a plugin, a plugin version, or a configuration.

| **Options**               | **Description**                                    |
| ------------------------- | -------------------------------------------------- |
| --json                    | Outputs the result of the command as a JSON string |
| --name=plugin\_name       | The name of the plugin to archive                  |
| --version=version\_number | The version of a plugin to archive                 |
| --sid=configuration\_sid  | The SID of a configuration to archive              |

## Build

```bash
twilio flex:plugins:build 
```

Builds Flex plugin and creates a JavaScript and sourcemap bundle. This command needs to be invoked inside a plugin directory.

## Create

```bash
twilio flex:plugins:create NAME
```

Creates a new Twilio Flex Plugin project.

| **Arguments** | **Description**          |
| ------------- | ------------------------ |
| Name          | The name of your plugin. |

| **Options**                 | **Description**                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------- |
| -a, --accountSid=accountSid | The Account SID for your Flex Project                                               |
| --flexui1                   | Creates a plugin compatible with Flex UI 1.0                                        |
| --flexui2                   | Creates a plugin compatible with [Flex UI 2.0](/docs/flex/developer/ui-and-plugins) |
| -i, --install               | Auto-install dependencies                                                           |
| -r, --runtimeUrl            | The Runtime URL for your Flex Project                                               |
| -s, --typescript            | Create a TypeScript project                                                         |
| -t, --template=template     | A URL to a template direction                                                       |
| -v, --version=version       | Start your plugin at a particular version                                           |
| -y, --yarn                  | Use yarn as your dependency manager                                                 |

## Create Configuration

```bash
twilio flex:plugins:create-configuration
```

Creates a Flex Plugin Configuration. This command is not required to be run in a plugin directory

| **Options**                   | **Description**                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| --plugin=plugin               | Required. The plugin to install, formatted as pluginName@version. Use additional --plugin to provide other plugins to install         |
| --description=description     | The description of this Flex Plugin Configuration                                                                                     |
| --enable-plugin=plugin\_name  | The plugin to enable, formatted as pluginName@version. Use additional `--`enable-plugin arguments to provide other plugins to install |
| --disable-plugin=plugin\_name | The plugin to disable, formatted as pluginName. Use additional --disable-plugin arguments to provide other plugins to disable         |
| --json                        | Outputs the result of the command as a JSON string                                                                                    |
| --name=name                   | The friendly name of the Flex Plugin Configuration                                                                                    |
| --new                         | Creates a new Flex Plugin Configuration, otherwise will append to existing active Configuration                                       |

## Deploy

```bash
twilio flex:plugins:deploy
```

Deploys a new plugin version. This command needs to be invoked inside a plugin directory.

In version 7.0.0 and later of the Flex Plugins CLI, when you run this command, the [Validate](#validate) command also runs implicitly. For more information about how validation works, see [Validating a plugin](/docs/flex/developer/plugins/cli/deploy-and-release#validating-a-plugin).

> \[!WARNING]
>
> If you use automated deployments, such as a CI/CD pipeline, the plugin validation that happens during deployment can disrupt your automations. When the Deploy command runs, if the plugin validation process finds any errors, the deployment process stops to ask for input. To prevent this issue, use the `--bypass-validation` option on the Deploy command to skip plugin validation for automated deployments.

| **Options**               | **Description**                                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| --version=version         | The custom version to publish                                                                                                                                                        |
| --changelog=changelog     | The changes (added/removed) made in this plugin version                                                                                                                              |
| --description=description | The description of the plugin being deployed                                                                                                                                         |
| --json                    | Outputs the result of the command as a JSON string                                                                                                                                   |
| --major                   | Publishes the version as a major version in semantic versioning                                                                                                                      |
| --minor                   | Publishes the version as a minor version in semantic versioning                                                                                                                      |
| --patch                   | Publishes the version as a patch in semantic versioning                                                                                                                              |
| --public                  | Publishes the Plugin as a public Twilio Asset; the default is private                                                                                                                |
| --bypass-validation       | Ignores any issues that are found by the validation step and continues to plugin deployment <br /><br /> *Tip: Use this option for automated deployments, such as a CI/CD pipeline.* |

## Describe

```bash
twilio flex:plugins:describe:{release/plugin/configuration}
```

Can accept Plugin, Plugin-Version, Configuration, or Release as a resource to describe. Provides details like status, description, and associated plugins.

| **Option** | **Description**                                              |
| ---------- | ------------------------------------------------------------ |
| --active   | Indicates that you want to describe the most recent release. |
| --json     | Outputs the result of the command as a JSON string           |
| --sid=sid  | The SID of the resource you want to describe                 |

## Diff

```csharp
twilio flex:plugins:diff <ID1> [<ID2>]
```

Finds the diff between two Flex Plugin Configurations.

| **Arguments** | **Description**                                                                            |
| ------------- | ------------------------------------------------------------------------------------------ |
| ID1           | Required. The SID of the Configuration resource to compare to the active Release or to ID2 |
| ID2           | Optional. The SID of the Configuration resource to compare to ID1                          |

| **Options** | **Description**                                    |
| ----------- | -------------------------------------------------- |
| --json      | Outputs the result of the command as a JSON string |

## List

```bash
twilio flex:plugins:list
```

Can accept Plugin, Plugin-Version, Configuration, or Release as a resource to describe. Lists the resources on the account.

| **Options** | **Description**                                    |
| ----------- | -------------------------------------------------- |
| --json      | Outputs the result of the command as a JSON string |

## Release

```bash
twilio flex:plugins:release
```

Creates a Flex Plugin Release. This command is not required to be run in a plugin directory

| **Options**                                  | **Description**                                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| --new                                        | Creates a new Flex Plugin Configuration, otherwise will append to existing active Configuration                                       |
| --enable-plugin=plugin\_name                 | The plugin to enable, formatted as pluginName@version. Use additional `--`enable-plugin arguments to provide other plugins to install |
| --disable-plugin=plugin\_name                | The plugin to disable, formatted as pluginName. Use additional --disable-plugin arguments to provide other plugins to disable         |
| --plugin=plugin\_name                        | Alias for --enable-plugin                                                                                                             |
| --configuration-sid=your\_configuration\_sid | The Flex Plugin Configuration SID to release; other options are not required when using this option                                   |
| --description=description                    | The description of this Release                                                                                                       |
| --json                                       | Outputs the result of the command as a JSON string                                                                                    |
| --name=name                                  | The friendly name of the Release                                                                                                      |

## Start

```bash
twilio flex:plugins:start
```

Starts a dev-server to build the Flex plugin locally. This command needs to be invoked inside a plugin directory.

| **Parameter**    | **Description**                                    |
| ---------------- | -------------------------------------------------- |
| --include-remote | Includes all remote plugins in your build          |
| --json           | Outputs the result of the command as a JSON string |
| --name=name      | The name of the plugin(s) you would like to run    |
| --port           | The port to start the development server           |

## Validate

```bash
twilio flex:plugins:validate
```

Available in Flex Plugins CLI 7.0.0 and later.

Shows plugin code recommendations to improve the resilience of your plugins by improving compatibility with future releases of Flex UI.

The recommendations displayed by this command help you follow best practices to keep your plugin code compatible with Flex UI as the platform evolves. However, it cannot guarantee compatibility.

In version 7.0.0 and later, this command also runs implicitly as part of the [Deploy](#deploy) command. If you use automated deployments, such as a CI/CD pipeline, the plugin validation that happens during deployment can disrupt your automations. To prevent this issue, use the `--bypass-validation` option on the Deploy command to skip plugin validation for automated deployments. For details, see [Deploy](#deploy).

For more information about how validation works, see [Validating a plugin](/docs/flex/developer/plugins/cli/deploy-and-release#validating-a-plugin).

| **Parameter** | **Description**                                                         |
| ------------- | ----------------------------------------------------------------------- |
| --flex-ui-2.0 | Checks the validity of the plugin with the latest Flex UI 2.x.x version |
