# Install Flex Plugins CLI

## Install the Flex Plugins CLI

The Flex Plugins CLI is available via the Twilio CLI. You can install it using the `twilio plugins` command:

```csharp
twilio plugins:install @twilio-labs/plugin-flex
```

This will use the Twilio CLI's plugin functionality to install the Flex Plugins CLI capabilities. Under the hood, the Flex Plugins CLI uses the Flex Plugins API.

### Prerequisites

In order to install the Flex Plugins CLI, you'll need:

* Any macOS, Linux, or Windows machine
* NPM version 6.0.0 or later (type npm -v in your terminal to check)
* Node versions 16, 18, or 20 (type node -v in your terminal to check)
* The Twilio CLI. Refer to the [Quick Start Guide](/docs/twilio-cli/quickstart) for installation instructions.

### Checking your installed version

The `twilio plugins` command will return details on all plugins you've installed on the Twilio CLI:

```csharp
twilio plugins

```

The Flex Plugins CLI is installed if the `plugin-flex` version is 1.0.0 or greater:

```csharp
@twilio-labs/plugin-flex 7.0.0
```

## Uninstalling legacy versions of the Plugins Builder

Legacy plugins were created by directly using the `create-flex-plugin` node package. The Flex Plugins CLI manages this dependency for you, and you can remove any prior installations you may have created. You can remove a global installation with:

```bash
npm uninstall -g create-flex-plugin
```

## What's next?

Now that you have installed the Plugins CLI, it is time to it learn how to use it with Flex Plugins. [Migrate any existing plugins](/docs/flex/developer/plugins/migrate) you have developed, review [common development workflows](/docs/flex/developer/plugins/cli/common-uses), and [get started with a new plugin](/docs/flex/quickstart/getting-started-plugin).
