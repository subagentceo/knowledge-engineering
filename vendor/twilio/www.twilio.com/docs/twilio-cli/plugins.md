# CLI Plugins

Beyond the base commands that are already available, the Twilio CLI's functionality can be extended through plugins. You can publish your own plugins to share with the wider Twilio community, or make them private for your own—or your clients'—business workflows.

> \[!NOTE]
>
> While Twilio CLI itself is generally available, each plugin has its own individual release status. Please check a plugin's documentation to learn more about its development status.

## Install a plugin

Plugins are installed using the `twilio plugins` command.

```bash
twilio plugins:install PLUGIN_PACKAGE_NAME
```

For example:

```bash
twilio plugins:install @twilio-labs/plugin-serverless
```

Once the plugin is installed, refer to the plugin's documentation to see what new commands are available.

> \[!WARNING]
>
> If you're using [autocomplete](/docs/twilio-cli/general-usage/autocomplete), you'll need to re-run `twilio autocomplete` after installing a plugin. This will rebuild the CLI's cache, and enable autocompletion for commands tied to the new plugin.

### Available plugins

[Twilio Labs](/en-us/labs) supports numerous plugins targeted at supporting common workflows for developers. These are just a few options:

* [Dev Phone](https://github.com/twilio-labs/dev-phone) — A developer tool for testing Twilio SMS and Voice applications, even if you don't have service.

  ```bash
  twilio plugins:install @twilio-labs/plugin-dev-phone
  ```
* [Serverless Toolkit](https://github.com/twilio-labs/serverless-toolkit/tree/main/packages/plugin-serverless) — Use this to streamline your development workflow with [Twilio Functions & Assets](/docs/serverless/functions-assets).

  ```bash
  twilio plugins:install @twilio-labs/plugin-serverless
  ```
* [Twilio Assets Plugin](https://github.com/twilio-labs/serverless-toolkit/tree/main/packages/plugin-assets) — Allows you to upload and manage static assets in a [Twilio Assets service](/docs/serverless/functions-assets/assets).

  ```bash
  twilio plugins:install @twilio-labs/plugin-assets
  ```
* [Twilio Webhook Plugin](https://github.com/twilio-labs/plugin-webhook) — Allows you to emulate [webhook](/docs/glossary/what-is-a-webhook) events to validate your applications and [TwiML Bins](/docs/serverless/twiml-bins).

  ```bash
  twilio plugins:install @twilio-labs/plugin-webhook
  ```
* [twilio watch](https://github.com/twilio-labs/plugin-watch) — Allows you to watch debugger alerts, voice calls, and messages as they come in, in real time.

  ```bash
  twilio plugins:install @twilio-labs/plugin-watch
  ```
* [twilio token](https://github.com/twilio-labs/plugin-token) — Install and use this plugin to generate a token for use in a client-side SDK, e.g., a chat application.

  ```bash
  twilio plugins:install @twilio-labs/plugin-token
  ```
* [twilio flex](https://github.com/twilio/flex-plugin-builder/tree/main/packages/plugin-flex) — Allows you to create, build, and deploy [Flex plugins](/docs/flex/developer/plugins/cli).

  ```bash
  twilio plugins:install @twilio-labs/plugin-flex
  ```

### Create a plugin

Want to write your own plugin? [This document will show you how](https://github.com/twilio/twilio-cli/blob/main/docs/plugins.md).
