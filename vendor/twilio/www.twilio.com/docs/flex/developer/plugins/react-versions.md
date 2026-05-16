# Selecting React versions for Flex

This is a guide on how to select which [React](https://reactjs.org/) and [ReactDOM](https://reactjs.org/docs/react-dom.html) versions your Flex application uses. This allows you to use React's newest APIs, including React Hooks, when developing your [Flex plugins](/docs/flex/developer/ui-and-plugins).

## Getting Started

You will need a few things before you start using this feature:

* A Twilio Account - [sign up here](https://www.twilio.com/try-twilio) if you don't have one yet
* An instance of Twilio Flex - refer to our [getting started guide](/docs/flex/admin-guide/setup/account-creation) to create one
* The Flex Plugins CLI - review our [introductory document](/docs/flex/developer/plugins/cli) to get familiar with the Command Line Interface for building and deploying plugins

## Setting the React version within Flex

1. Navigate to the 'Admin' panel, which is the top icon on your sidebar. You must be logged into Flex as a user with the `admin` role.

   ![Twilio Flex developer setup with React version selection menu showing latest version 16.13.1.](https://docs-resources.prod.twilio.com/8707dced1888dd2ff60a0f7483e742cd365c5399f5020f31073a03bbec56920d.png)
2. Click on the "Developer Setup" tile at the bottom of the page

![Developer setup for building on Flex and Webchat to create custom experiences.](https://docs-resources.prod.twilio.com/81f257e9941a027272ddb60d68dee5d4301f88a5f27fb6d63784bf5288a94fc6.png)

3. Choose the React version in the drop-down. We currently support React version **16.13.1** and Flex's current default version (**16.5.2**). If you are using Flex UI 2.x.x, we currently support React version **17.0.2**.

![React\_2.](https://docs-resources.prod.twilio.com/d00103974a3dd87b8adc0f8316b917e1c21e19ccfaa2d4ac84e7c4e16e1adc90.png)

You are now all set to use and develop locally with the latest version on Flex. Save the Account SID and Auth Token of your account; you will need it when you are deploying your plugin.

## Configuring your local environment

### Creating a new plugin to use the latest React version

If you plan to use the latest version of React with a new plugin, you need to install the latest version of the Flex Plugins CLI.

Then you can create a new plugin using the standard initialization for the Flex Plugins CLI. Run the following command in your terminal:

## Flex UI 2.x

```bash
twilio flex:plugins:create plugin-sample --install --flexui2
```

## Flex UI 1.x

```bash
twilio flex:plugins:create plugin-sample --install --flexui1
```

This command will download the default application template that can be used as a starting point for building plugins. When run successfully, a new directory named `plugin-sample` will be created on your machine. In your terminal, navigate into the new `plugin-sample` directory:

```bash
cd plugin-sample
```

Update your plugin to use the recommended version (according to your Flex UI version) for `react` and `react-dom`. Install React by running the following command in your `plugin-sample` directory:

## Flex UI 2.x

```bash
npm install react@17.0.2 react-dom@17.0.2
```

## Flex UI 1.x

```bash
npm install react@16.13.1 react-dom@16.13.1
```

Verify this step by checking the dependencies section of `package.json`. The version of react and react-dom on the file should now be now set to the correct one.

Finally, execute the following command in the `plugin-sample` directory:

```bash
npm install
```

You're now set to run and test your Plugin locally using the latest version of React.

### Updating a pre-existing plugin to use the latest React version

If your existing plugin is using an older version of the Plugin Builder, [migrate](/docs/flex/developer/plugins/migrate) your plugin to use the latest version of the Flex Plugins CLI.

Update the dependencies in `package.json` within your plugin's directory to ensure you're using the newer React version, according to you version of Flex UI:

## Flex UI 2.x

```json
"dependencies": {
    "craco-config-flex-plugin": "latest",
    "flex-plugin": "latest",
    "flex-plugin-scripts": "latest",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "latest"
}
```

## Flex UI 1.x

```json
"dependencies": {
    "craco-config-flex-plugin": "latest",
    "flex-plugin": "latest",
    "flex-plugin-scripts": "latest",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "latest"
}
```

Delete the `node_modules` directory and `package-lock.json` in your plugin directory.

Finally, re-install the dependencies for the plugin by running the following command in your plugin directory:

```bash
npm install
```

You're now set to run and test your Plugin locally using the latest version of React.

## Building and Deploying Plugins

Once you are ready to deploy your plugin to Flex, run the following commands from within your plugin directory:

```bash
twilio flex:plugins:deploy --major --changelog "Using the latest version of React"
```

Finally, enable your plugin on your application by running the following command in your plugin directory:

```bash
twilio flex:plugins:release --plugin plugin-sample@1.0.0 --name "Plugin Sample Release" --description "Testing React upgrade"
```

The plugin will be successfully deployed if the following conditions are met:

1. Your Flex instance is on version 1.19 or above
2. The version of React used to build the plugin is less than or equal to the version selected within the Flex Admin UI

Congratulations - your Plugin should now be deployed!

You can confirm whether your plugin is enabled by logging into Flex, visiting the [Plugins Dashboard](https://flex.twilio.com/admin/plugins), and viewing the plugin under the 'Installed Plugins' section.

## FAQ

### Which versions of React does Flex currently support?

Flex currently supports the React version 16.13.1 and the default version used by Flex (16.5.2). If you are using Flex UI 2.x.x, we currently support React version 17.0.2.

### What happens if I change the version of React back to the default version?

Your users may be disrupted if you have a plugin deployed that uses the newer features or APIs within React. To avoid this situation, we recommend redeploying any plugins prior to downgrading the React version. That way you can remove any dependencies on the newer APIs.

### Can I use new versions of dependencies like react-redux and react-router?

Flex does not yet support setting versions of `react-redux` and `react-router`. When you choose the React version on the Developer Setup page, we set the versions for `react-dom` and `react`.
