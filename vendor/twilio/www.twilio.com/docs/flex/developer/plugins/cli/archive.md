# Archive Plugins and Configurations

The `twilio flex:plugins:archive` command provides the ability to archive a plugin, a plugin version, or a configuration. When archived, you can no longer enable the plugin for agents via the Plugins Dashboard or Plugins CLI. You can archive a configuration to prevent it from being redeployed.

> \[!WARNING]
>
> Archiving a plugin or configuration is a permanent action and cannot be undone.

## Compatible CLI versions

You need to [install the latest version](/docs/flex/developer/plugins/cli/install) of the Flex Plugins CLI in order to use these features. If you're migrating a legacy plugin to use the new CLI, refer to our [Migration Guide](/docs/flex/developer/plugins/migrate).

## Archive a plugin

* A plugin can be archived only if [it is not currently enabled](/docs/flex/developer/plugins/cli/common-uses#disable-a-plugin) within Flex.
* When a plugin is archived, none of its versions can be enabled within Flex.
* You cannot redeploy any prior release that contains the archived plugin or plugin version.

You can archive a **plugin** by passing its name via the `--name` argument.

```bash
twilio flex:plugins:archive:plugin --name plugin-sample
```

You can archive a **version of a plugin** by passing the plugin name and the version via the `--name` and `--version` arguments.

```bash
twilio flex:plugins:archive:plugin-version --name plugin-test --version 1.0.0
```

## Archive a configuration

Sometimes you push changes to your application that need to be reverted and fixed. You can archive those changes to prevent someone from accidentally redeploying the changes to your application.

### Fetch previous releases

```bash
twilio flex:plugins:list:releases
```

### Choose a prior configuration

From the list of Releases, choose the one that you want to archive. Copy the `configuration_sid` of that release.

Use the `describe` command to get details on the Configuration and confirm that it is the Configuration you want to archive.

```bash
twilio flex:plugins:describe:configuration --sid <Configuration Sid>
```

### Archive the configuration

Run the archive command with the copied `configuration_sid.`

```bash
twilio flex:plugins:archive:configuration --sid <Configuration Sid>
```

## Plugins Dashboard: View archived plugins

You can access the [Plugins Dashboard](https://flex.twilio.com/admin/plugins) by logging in as a Flex Admin. Archived plugins can be viewed along with the rest of your plugins.

![Manage plugins page showing archived and enabled plugins with update details.](https://docs-resources.prod.twilio.com/d72e1bbf6bd88eafb35b6fd89ee08512a4058aab8a28b2353f1a6440873757ce.png)

Click on a plugin and on the version dropdown to see information of versions of the plugin that have been archived.

![Plugin management interface showing plugin-agent-autoresponse update to version 5.0.0 archived.](https://docs-resources.prod.twilio.com/348e201976f29562a039ab051aa760e93cd3490a3107be097618d28b24334b75.png)

**Viewing archived configurations:**

![List of plugin releases with archived tags highlighted for December 2, 2020.](https://docs-resources.prod.twilio.com/c62d1b86b7083bd03bf6ea90d1b05e81ee637f30efbc6786f009fb0991bf1b0f.png)

## Next Steps

* [Deploy](/docs/flex/developer/plugins/cli/deploy-and-release) your plugins to your agents, and [keep your development environment up-to-date](/docs/flex/developer/plugins/updating).
* Learn about [other common use cases](/docs/flex/developer/plugins/cli/common-uses) for the Plugins CLI.
