# Environment variables in Flex Plugins

We recommend that you manage your Flex application by using multiple accounts to represent different environments. For example: development, staging, and production. You can deploy each plugin you build to your different environments based on your testing strategy. The Plugins CLI helps you manage [profiles to store your Twilio account credentials](/docs/twilio-cli/general-usage).

Each environment often has different values for certain parameters like the location of an API server, whether a feature is enabled, or the SID of a necessary resource. **Environment variables** help you integrate these into your plugin.

## Set up support for environment variables

You need to modify your [webpack configuration](https://webpack.js.org/configuration/) to enable environment variables. This allows you to use a standard `.env` file for managing your variables.

### Step 1: install dotenv

We recommend the [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) package for managing environment variables with the Plugins CLI. Combined with webpack, which is natively used within the Plugins CLI, this package lets you access environment variables from within your plugin code. To install `dotenv-webpack`, run the following command from within your plugin directory:

```bash
npm install dotenv-webpack --save
```

In addition to installing `dotenv-webpack`, this also adds the library as a dependency within your plugin's `package.json` file. If you are attempting a global installation or already have this package installed, make sure to update the `package.json` file for each plugin you are updating.

### Step 2: create `.env` files

Each Twilio account (that is, each profile in your CLI) is mapped to a single `.env` file. Create a new file in the root directory for your plugin and provide a distinctive name like `.Dev.env`, `.Stage.env`, and `.Production.env`.

The following is an example of a `.env` file:

```bash
TWILIO_WORKFLOW_SID=WWXXXXXXX
```

> \[!NOTE]
>
> Keep in mind that the environment variable names are required to start with TWILIO\_, FLEX\_ or REACT\_

> \[!WARNING]
>
> Never commit your `.env` files to your source code repository. These files can contain sensitive information, like secrets and API keys, and you don't want to expose these credentials. Include the `.env` files in your `.gitignore` or the appropriate tool for your version control.
>
> Without the `.env` files, the developers on your team will need to know which environment variables are required for your application. Create and commit a `.env.sample` file in your repository with variable names and placeholder values. Your team members can duplicate and update this file when they pull the source code.

### Step 3: update webpack

You must customize webpack to map your active CLI profile to one of the `.env` files you created. In the root directory for your plugin, replace `webpack.config.js` with the following code:

```javascript
const DotEnvWebpack = require('dotenv-webpack');
module.exports = (config, { isProd, isDev, isTest }) => {
    /**
     * Customize the webpack by modifying the config object.
     * Consult https://webpack.js.org/configuration for more information
     */
    // We dynamically change the path to the .env that contains the file corresponding to our profile
    let envPath;
    switch (process.env.TWILIO_PROFILE) {
        case 'Dev':
            envPath = `.Dev.env`;
            break;
        case 'Stage':
            envPath = '.Stage.env';
            break;
        case 'Production':
            envPath = '.Production.env';
            break;
    }
    // If path was set, use the dotenv-webpack to inject the variables
    if (envPath) {
        config.plugins.push(new DotEnvWebpack({
            path: envPath
        }));
    }
    return config;
}
```

Then, customize the `switch` statement based on the names of your CLI profiles and the filenames for your `.env` files.

### Step 4: deploy plugin

To deploy your plugin to specific accounts and environments, use the following commands:

```bash
twilio flex:plugins:deploy --profile=StageProfileName
```

```bash
twilio flex:plugins:deploy --profile=ProdProfileName
```

## Read environment variables

All variables that you define in your `.env` files are accessible within your plugin via `process.env`. Use these variables directly within your code:

```javascript
console.log(process.env.TWILIO_WORKFLOW_SID);
```

> \[!WARNING]
>
> The [dotenv-webpack package](https://www.npmjs.com/package/dotenv-webpack) works by running a string replacement within your plugin code when the plugin is bundled. This has two side effects:
>
> * Any sensitive values, like API keys, are visible to any user or system that has access to the bundled code for your plugin
> * The variables aren't dynamic if the bundled plugin (the final `.js` file) is shared and deployed to multiple accounts directly
>
> In these situations, it's better to use a remotely-accessed environment variable. One option is to add these variables within the [attributes field of your Flex Configuration](/docs/flex/developer/ui/creating-styling-custom-components).
