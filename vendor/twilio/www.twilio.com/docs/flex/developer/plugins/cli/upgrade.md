# Upgrade Flex Plugins CLI

The Flex Plugins CLI can be upgraded using the Twilio CLI. Your first step is keeping the Twilio CLI up-to-date. Details are available in the [CLI Quickstart Guide](/docs/twilio-cli/quickstart). The Twilio CLI will always report if a new version is available when you are executing `twilio` commands.

## Upgrading the Flex Plugin CLI

The Flex Plugin CLI can be updated using the original `install` command used when setting up your development environment.

1. Identify the latest available version of the Flex Plugin CLI.

```bash
$ npm show @twilio-labs/plugin-flex
4.8.0
```

2. Check the version of the Flex Plugins CLI currently installed on your local environment.

```bash
$ twilio plugins
@twilio-labs/plugin-flex 1.0.0
```

3. Upgrade to the latest version available.

```bash
twilio plugins:install @twilio-labs/plugin-flex
```

## Upgrading your plugins

Upgrading the Plugins CLI will not affect any of your existing plugins. Make sure to follow our guide for [updating your plugins](/docs/flex/developer/plugins/updating) and keeping everything up-to-date.

## Next Steps

* [Migrate pre-existing plugins](/docs/flex/developer/plugins/migrate) to use the latest Flex Plugins CLI
* Check our [Reference Guide](/docs/flex/developer/plugins/cli/reference) to get more details on the Flex Plugins CLI
