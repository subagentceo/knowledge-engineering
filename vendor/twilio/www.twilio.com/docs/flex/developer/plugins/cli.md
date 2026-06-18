# Flex Plugins CLI

> \[!NOTE]
>
> Check out the [Flex Plugin Library](/docs/flex/developer/plugins/plugin-library). It requires Flex UI 2.x.x and gives you access to ready-to-install plugins without using the CLI.

The Flex Plugins CLI (command line interface) is the interface for developing, testing, and releasing plugins. It accelerates your plugin development by automating the key workflows you'll use while customizing Flex for your users. All plugins developed using the Plugins CLI can be managed on the [Plugins Dashboard](/docs/flex/developer/plugins/dashboard).

## CLI Features

### **Build new plugins**

The Flex Plugins CLI enables you to create new plugins in JavaScript or TypeScript. You can start with a blank slate, or create a plugin from a pre-existing template with the `--template` parameter. You can manage packages either via [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/getting-started) (Supported in Flex UI versions 1.19 and up).

### **Deploy and release plugin versions**

The Flex Plugins CLI is built on the [Plugins API](/docs/flex/developer/plugins/api). You can define plugin versions to track incremental updates to your customer experience. Deploy updates for each of your plugins individually, or bundle all of your updates together in a single release.

### **Manage your version and release history**

All of the updates to your plugin versions are tracked as a history of releases. Use this history to quickly identify and track changes in your application, and select a prior configuration to re-release in the event of an issue with your users.

### Validate your plugin code

Get code recommendations from the Flex Plugins CLI to help you follow best practices for maintaining the compatibility of your plugins as Flex UI evolves. Plugin code validation runs implicitly when you use the plugin [Deploy](/docs/flex/developer/plugins/cli/reference#deploy) command. You can also use the [Validate](/docs/flex/developer/plugins/cli/reference#validate) command to run it explicitly.

### What's next?

* [Install](/docs/flex/developer/plugins/cli/install) the Plugins CLI
* [Migrate](/docs/flex/developer/plugins/migrate) your legacy plugins to use the new CLI
* Check out the [Reference Guide](/docs/flex/developer/plugins/cli/reference) to see everything the Plugins CLI can do
