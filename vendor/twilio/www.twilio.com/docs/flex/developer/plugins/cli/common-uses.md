# Common Use Cases

This guide covers useful commands for interacting with your Flex plugins that are managed with the Flex Plugins CLI.

## View all versions of a Flex plugin

```bash
twilio flex:plugins:list:plugin-versions --name <plugin name>
```

![Plugin agent notes versions with changelogs for Slack, CRM, and 2FA integrations.](https://docs-resources.prod.twilio.com/f41b87a4a94706b2aa0fdac81609083ac8fdae585e3e14bd395f9093c144d6bb.png)

## View all Flex plugins you have deployed

The `list` command displays all the plugins that can be enabled or disabled.

```bash
twilio flex:plugins:list:plugins 
```

![List of active and inactive plugins with names, descriptions, and timestamps.](https://docs-resources.prod.twilio.com/7909da3e5a27fb3c733569843a7b990af68a4bdb48752c77a850e0d5a208d4cb.png)

## View your active plugins

```bash
twilio flex:plugins:describe:release --active
```

![Active release with plugin-agent-autoresponse details including version 4.0.0 and Slack integration.](https://docs-resources.prod.twilio.com/ef42451fd7c6b22ec023a553392483f3dbc3ef5cce9981553f061bcd30b1fe1e.png)

## Rollback a release

Sometimes you push changes to your application that need to be reverted and fixed. You can use the Plugins CLI to return to a previous version of your plugin configuration.

### Fetch previous releases

```bash
twilio flex:plugins:list:releases
```

### Choose a prior configuration

From the list of Releases, choose the one that you want to rollback to. Copy the `configuration_sid` of that release.

Use the `describe` command to get details on the Configuration.

```bash
twilio flex:plugins:describe:configuration --sid <Configuration Sid>
```

![Configuration details for Sprint 2 Agents Experience with plugins for autoresponse and Yelp integration.](https://docs-resources.prod.twilio.com/20c56e38f4aaf3d34aa4650349a58ec42bc88fefb15b526248e5ca3cc97b17f9.png)

### Create a new release from your prior configuration

Create a new Release with the copied `configuration_sid.`

```bash
twilio flex:plugins:release --configuration-sid <Configuration Sid>
```

You've successfully rolled back your Contact Center to an operational version. Go hunt down that bug, and get ready to cut a new Release with the revised Plugin Code!

## Disable a plugin

Use the `disable-plugin` argument on the release command to disable a plugin on your Flex application. The format it takes is **pluginName**.

```bash
twilio flex:plugins:release --disable-plugin plugin-agent-autoresponse --name "Flex Next" --description "Remove Agent Autoresponse Plugin"
```

## Deploy multiple plugins

```bash
twilio flex:plugins:release --plugin <plugin-name1>@<version> --plugin <plugin name2>@<version> --name "Sprint Snow Leopard" --description "Agent Productivity Tools"
```

You can group multiple plugins into a single Release. The `twilio flex:plugins:release` command takes multiple plugin names in its argument. Keep in mind that you need to first deploy the versions of the plugins being referred in the command before using it in the release command.

## Compare your configuration with the active release

Use the `diff` command to compare two configurations in your Flex application. If you leave the second parameter blank, it will compare the Configuration to the active Release.

```bash
twilio flex:plugins:diff <Configuration SID> 
```

## Deploy to your own CDN

There are two mechanisms you can use to serve plugins external to Twilio Assets. The Flex Configuration Resource provides `plugin_service_attributes`, which can be used to register external assets for Flex to load.

| **Attribute**        | **Type**                   | **Purpose**                                                                                                                                                                                                                                                                         |
| -------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| custom\_plugins      | JSON array of Flex Plugins | `custom_plugins` enable you to statically define a list of Flex Plugins to return to Flex, this may be particularly useful to incorporate as part of a CI/CD workflow.                                                                                                              |
| custom\_plugins\_url | A valid URL                | `custom_plugins_url` must also return a JSON Array of plugins, but by leveraging the JWE token provided via the `X-Flex-JWE` header you may choose to conditionally return plugins to certain agents to satisfy use-cases such as segmentation by department or canary deployments. |

Only one of these fields is required. This `curl` example demonstrates the syntax for updating either attribute.

```bash
curl https://flex-api.twilio.com/v1/Configuration -X POST -u ACxx:auth_token \
    -H 'Content-Type: application/json' \
    -d '{
        "account_sid": "ACxx",
        "plugin_service_attributes": {
            "custom_plugins": [{"name": "My Plugin", "version": "0.0.1", "src": "https://example.com/my-self-hosted-plugin-0.0.1.js"}],
            "custom_plugins_url": "https://example.com/plugins-list.json"
        }
    }'

```

`custom_plugins_url` takes precedence over `custom_plugins` in the event that both appear. This allows you to leverage `custom_plugins` as a fallback if your URL is inaccessible.
