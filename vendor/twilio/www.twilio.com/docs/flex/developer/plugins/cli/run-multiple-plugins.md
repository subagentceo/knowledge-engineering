# Run Multiple Plugins Locally Using the Flex Plugins CLI

The `twilio flex:plugins:start` command enables you to load multiple plugins on a local instance of Flex. It can load plugins either from the local source directory of a plugin or those that are currently enabled on your Flex application. This command makes it easier and quicker to test a plugin you are developing locally with other plugins.

## Compatible CLI versions

You need to [install the latest version](/docs/flex/developer/plugins/cli/install) of the Flex Plugins CLI in order to use these features. If you're migrating a legacy plugin to use the new CLI, refer to our [Migration Guide](/docs/flex/developer/plugins/migrate).

## Register existing plugins

Plugins on your development machine must be registered with the Plugins CLI if you want to include them in a test environment. To register your plugins:

**Option 1**: Download your plugin source using the CLI

```bash
twilio flex:plugins:create --template <github url of plugin> --install
```

**Option 2**: Register a plugin already on your machine

```bash
# Executed within the directory of your plugin
twilio flex:plugins:start

```

## Run multiple plugins

The Plugins CLI can access any plugin that you have deployed to your Flex account (remote plugins) and any plugin that you are developing on your own machine (local plugins).

### Using local plugins

You can choose the plugins you want to run locally by using the `--name` argument. The name corresponds to the name field in the `package.json` of your plugin. When you run the command in your plugin directory, you don't have to pass the name of the plugin.

```bash
plugin-agent-response $ twilio flex:plugins:start --name plugin-sample
```

The command does the following:

* Starts a local instance of Flex
* Since the command is being run in a plugin directory, it loads *plugin-agent-response*
* Since *plugin-sample* is being passed using the --name argument, it also loads the plugin *plugin-sample*

By default, your local Flex instance can be accessed from ***localhost:3000***. If you see a login page, the '[Login with Twilio](/docs/flex/admin-guide/setup/sso-configuration#can-i-log-into-flex-agent-desktop-without-an-identity-provider)' option will log you into Flex without configuring SSO.

> \[!WARNING]
>
> If you need to log in to Flex using SSO instead, make sure that you first [configure the appConfig.js file](/docs/flex/admin-guide/setup/sso-configuration/self-hosted-sso) to support `localhost` as one of the `redirectUrl` values.

Refer to your Terminal output for information on the plugin directories being used by the local server:

![Twilio plugin app running locally with sample and agent response plugins.](https://docs-resources.prod.twilio.com/c000fa81cd82139ac436bb4d62a1caf777abbe7049619e912f4531be254440b8.png)

### Using remote plugins

#### Viewing plugins deployed on you Flex application

You can view the plugins currently deployed on your Flex application by accessing the [Plugins Dashboard](https://flex.twilio.com/admin/plugins) or by running the following command via the CLI

```bash
twilio flex:plugins:list:plugins
```

#### Including every remote plugin

Use the `--include-remote` argument to load every plugin that is already enabled on your live Flex application. This shortcut allows you to test any new changes against your normal Flex environment, without manually downloading & running each plugin individually.

```bash
plugin-agent-response $ twilio flex:plugins:start --include-remote
```

The command does the following:

* Starts a local instance of Flex
* Since the command is being run in a plugin directory, it loads *plugin-agent-response*
* Since `--include-remote` is used, it accesses your live Flex application, fetches the list of all currently enabled plugins, and loads each of these alongside *plugin-agent-response*

If `plugin-agent-response` is **already** deployed to your live Flex application, your local version will be used in place of the remote version.

An example output is shown below:

![Terminal showing local and remote plugin paths for a Twilio Flex app.](https://docs-resources.prod.twilio.com/0353b01253a6b32f183bfec6dffa46c9da1d63b28eae1014b800aec4599d5a67.png)

#### Including select remote plugins

You can use the `@remote` tag if you only want to run a subset of your live plugins. The @remote tag will automatically load the version that is currently enabled on your Flex application. Each plugin you want to include must be identified with the `--name` flag.

```bash
plugin-agent-response $ twilio flex:plugins:start --name plugin-agent-notes@remote
```

An example output is shown below:

![CLI output showing local and remote plugin paths for a running plugin app.](https://docs-resources.prod.twilio.com/dc644df686ee9b10567cb66842051014b52302f7a8cc4f8c049fd8423ffd1a60.png)

#### Including select remote plugin version

You can choose a version of a plugin to load by using the format `plugin name@version`. You need to ensure that the version has been deployed to your Flex application. This lets you run a remote plugin locally without enabling it on your account.

```bash
plugin-sample $ twilio flex:plugins:start --name plugin-agent-notes@1.0.0
```

An example output is shown below:

![Plugin app running locally and on network with sample and agent-autoresponse plugins.](https://docs-resources.prod.twilio.com/f3d7b8ecb5dbdb6d13059a6b0202bda2b69742e3aba0fe3e7f134b70d29dbde5.png)

## View all plugins registered by Flex Plugins CLI

> \[!WARNING]
>
> This settings file is used to identify which plugins can be accessed by the CLI. If you remove or edit this file, you may need to re-register your plugins using the [methods listed above](#register-existing-plugins).

The Plugins CLI keeps track of all your registered plugins in a settings file. To view details on your registered plugins:

### macOS/Linux

```bash
cd & cat ~/.twilio-cli/flex/plugins.json
```

### Windows

Run the following command in your Home Directory ( C:\Users\\$USERNAME)

```bash
type .twilio-cli\flex\plugins.json
```

> \[!NOTE]
>
> While testing your plugin across multiple Flex applications, we recommend switching your project within your remote Flex application and restarting your development server.

## Next Steps

* [Deploy](/docs/flex/developer/plugins/cli/deploy-and-release) your plugins to your agents, and [keep your development environment up-to-date](/docs/flex/developer/plugins/updating).
* Learn about [other common use cases](/docs/flex/developer/plugins/cli/common-uses) for the Plugins CLI.
