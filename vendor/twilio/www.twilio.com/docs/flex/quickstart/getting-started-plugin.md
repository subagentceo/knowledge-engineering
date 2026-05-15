# Twilio Flex Quickstart: Getting Started with Flex Plugin Development

**In just a few minutes**, you can extend and modify your [Twilio Flex](/docs/flex/developer) call center instance using the [JavaScript React framework.](https://reactjs.org/)

During this Quickstart, you'll use React to customize your Flex instance by integrating a search engine into the Flex CRM container. This Quickstart only involves cutting/pasting some React code. If you want to learn more, check out the [official React Docs](https://reactjs.org/tutorial/tutorial.html).

At the end of this Quickstart, you'll know how to develop a Flex plugin, test it locally, and upload your changes to a Twilio-hosted Flex instance. Once you've seen basic changes you can make with React, you can start to make more extensive modifications to your contact center instance.

In this Quickstart, we will:

1. Create a new Flex hosted instance
2. Install the [Flex Plugins CLI](/docs/flex/developer/plugins/cli/install)
3. Walk through the plugin creation steps locally
4. Develop your plugins locally
5. Deploy your plugins and enable your plugin on your Flex application
6. Verify your changes in the Twilio hosted call center instance

*Prefer other styles of learning? See our [collection of Flex video tutorials and demos](https://www.youtube.com/playlist?list=PLqrz4nXepkz4wXHPRc1NdPEajPJ8cbNKI)*.

## Create a hosted Twilio Flex instance

Before you start working on plugins for Flex, you'll need a cloud call center instance to apply them on. Let's create a new Flex instance now.

> \[!NOTE]
>
> If you already have a Twilio Flex instance you'd like to customize, feel free to skip ahead to the [plugin prerequisites](/docs/flex/quickstart/getting-started-plugin#prerequisites-for-developing-a-flex-plugin).

### Sign up for (or sign in to) Twilio and create a Flex Project

Before you can work with Flex, you'll need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) or sign into your existing account.

1. Once in the console, navigate to the [Flex product](https://www.twilio.com/console/flex/overview):

   ![Twilio Console showing Flex under Solutions for cloud contact center platform.](https://docs-resources.prod.twilio.com/7c3fc02fe0169a285dd317200550d85f09a6356a23be56844a6f09aad582cbce.png)
2. Now, select 'Create My Flex Account':

   ![Twilio Flex dashboard with no active tasks and Bing search page.](https://docs-resources.prod.twilio.com/93a98211164b2989a87c6b997d0829165a8d74fffff5bcda708fd277e8896a1f.png)
3. Give your new project a name and verify a phone number
4. Flex will run through an initialization process to get your new account configured

And that's all you need for now. Let it go through its setup, and you'll get a vanilla hosted Flex instance for us to modify.

## Prerequisites for developing a Flex Plugin

Before you can start creating Flex plugins with React, you'll need a few things in place.

* A Twilio account with a Flex environment provisioned (the previous section)
* npm version 6.0.0 installed (type `npm -v` in your terminal to check)
* A Node.js [long-term-support (LTS) version](https://nodejs.org/en/about/previous-releases) installed (type `node -v` in your terminal to check):

  * React v16 recommended for Flex UI 1.x
  * React v17 recommended for Flex UI 2.x
* [Twilio CLI](/docs/twilio-cli/quickstart) installed on your machine. We recommend installing the latest version of the Twilio CLI.

## Login to your Twilio Flex application via Twilio CLI

In order to run the CLI commands, on your Flex application run the following command:

```csharp
twilio login
```

You will be prompted for your Account SID and Auth Token, both of which you can find in the [Twilio Console Dashboard](https://www.twilio.com/console).

![Twilio account info with Account SID, Auth Token, and phone number.](https://docs-resources.prod.twilio.com/4b240657f1fd641d10d671ccfc9f93e8468248b61707486a54b9a519470f232c.png)

Once you have logged in successfully, all the subsequent CLI commands will use the Flex account you logged in with.

Learn more about using multiple accounts by visiting the [Twilio CLI General Usage Guide](/docs/twilio-cli/general-usage).

## Set up a Flex environment with Flex Plugins CLI

Once you have NPM and Node of the proper version, you're ready to develop your Flex plugin. The [Flex Plugins CLI](/docs/flex/developer/plugins/cli/install)is the easiest way to start building Flex plugins. It gives you a clean environment in which to develop your Flex plugin as well as tools to build and deploy your plugin. With the Flex Plugins CLI, you know that your Flex plugins will be modular - that is, Plugin A won't interfere with the behavior of Plugin B.

Follow the steps in [Plugins CLI documentation](/docs/flex/developer/plugins/cli/install) for installation.

## Set up a sample Flex plugin

In your terminal, run the following commands to set up a sample Flex plugin:

## Flex UI 2.x

```bash
# Now we can start with a template plugin for Flex 2.0 with the create command
twilio flex:plugins:create plugin-sample --install

# Or if you prefer a typescript project run
twilio flex:plugins:create plugin-sample --install --typescript
```

## Flex UI 1.x

```bash
# Now we can start with a template plugin for Flex 1.0 with the create command
twilio flex:plugins:create plugin-sample --install --flexui1

# Or if you prefer a typescript project run
twilio flex:plugins:create plugin-sample --install --flexui1 --typescript
```

Once you have created your plugin development environment, you can navigate into your plugin's code directory and start Flex:

```bash
cd plugin-sample
twilio flex:plugins:start
```

A Flex instance should now be running on `localhost:3000`. You might need to log in to your Flex instance by clicking on the "Login with Twilio" link and logging in with your Twilio credentials.

![Login with Twilio.](https://docs-resources.prod.twilio.com/60f7901b459f8597910694ee92a7e2ca344a279179efdb1e328d3da8775a382a.png)

> \[!WARNING]
>
> If you need to log in to Flex using SSO instead, make sure that you first [configure the appConfig.js file](/docs/flex/admin-guide/setup/sso-configuration/self-hosted-sso) to support `localhost` as one of the `redirectUrl` values.

## Build your Flex plugin

Open your favorite text editor and change the directory to the plugin folder we just built. At the moment, our plugin just adds a black bar to the top of the task list - but we're going to configure the CRM to be an instance of the Bing search engine instead.

## Flex UI 2.x

1. Navigate into the folder created for `plugin-sample` (or the name you picked)
2. Open the file `src/SamplePlugin.js`
3. Replace the code in that file with the following

   ```javascript
   import React from "react"
   import { FlexPlugin } from "@twilio/flex-plugin"

   import CustomTaskList from "./components/CustomTaskList/CustomTaskList"

   const PLUGIN_NAME = "SamplePlugin"

   export default class SamplePlugin extends FlexPlugin {
     constructor() {
       super(PLUGIN_NAME)
     }

     /**
      * This code is run when your plugin is being started
      * Use this to modify any UI components or attach to the actions framework
      *
      * @param flex { typeof import('@twilio/flex-ui') }
      */
     async init(flex, manager) {
       flex.CRMContainer.defaultProps.uriCallback = (task) => {
         return task
           ? `https://www.bing.com/search?q=${task.attributes.name}`
           : "https://www.bing.com"
       }
     }
   }
   ```
4. Save it
5. Your browser will automatically reload. Now your instance should look like the following:

   ![Twilio Flex dashboard with no active tasks and Microsoft Bing news feed.](https://docs-resources.prod.twilio.com/504992e42142fc9795fc81c145e261cae6dbef0e9ebec3533bab564f459c9947.png)
6. (Optional) Text in and see if there are any Bing results for your phone number!

   You might notice that all we changed was a couple of lines of code:

   ```javascript
   const options = { sortOrder: -1 };
   flex.AgentDesktopView.Panel1.Content.add(<CustomTaskList key="SamplePlugin-component" />, options);
   ```

   is replaced by

   ```javascript
   flex.CRMContainer.defaultProps.uriCallback = (task) => {
         return task
           ? `https://www.bing.com/search?q=${task.attributes.name}`
           : "https://www.bing.com"
   }
   ```

   This tells Flex to target the `CRMContainer` (instead of the `CutomTaskList`). Instead of adding a component to the `CustomTaskList`, we update the URI that the `CRMContainer` uses as a default prop to render its contents. In this case, we also add a bit of logic to make the container dynamic. We check to see if there's an active task. If there is an active task, we search for the task's name attribute, otherwise, we just show the `https://bing.com` landing page.

   Flex allows you to add, remove, and replace components so that you can tailor your contact center to your business needs. As you build more complex plugins, your workflow will remain similar. When you save files, your environment will reload and you can see the changes locally. To use the Twilio Paste UX library in your plugins, please see [Use Twilio Paste with a Flex Plugin](/docs/flex/developer/ui/use-paste-with-a-plugin).

   Next up, you'll build the plugin and deploy it to your hosted instance.

## Flex UI 1.x

1. Navigate into the folder created for `plugin-sample` (or the name you picked)
2. Open the file `src/SamplePlugin.js`
3. Replace the code in that file with the following:

   ```javascript
   import React from 'react';
   import { VERSION } from '@twilio/flex-ui';
   import { FlexPlugin } from 'flex-plugin';

   import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
   import reducers, { namespace } from './states';

   const PLUGIN_NAME = 'SamplePlugin';

   export default class SamplePlugin extends FlexPlugin {
     constructor() {
       super(PLUGIN_NAME);
     }

     /**
      * This code is run when your plugin is being started
      * Use this to modify any UI components or attach to the actions framework
      *
      * @param flex { typeof import('@twilio/flex-ui') }
      * @param manager { import('@twilio/flex-ui').Manager }
      */
     init(flex, manager) {
       this.registerReducers(manager);

       flex.CRMContainer.defaultProps.uriCallback = (task) => {
         return task 
           ? `https://www.bing.com/search?q=${task.attributes.name}`
           : 'https://www.bing.com';
       }
     }

     /**
      * Registers the plugin reducers
      *
      * @param manager { Flex.Manager }
      */
     registerReducers(manager) {
       if (!manager.store.addReducer) {
         // eslint: disable-next-line
         console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
         return;
       }

       manager.store.addReducer(namespace, reducers);
     }
   }

   ```
4. Save it
5. Your browser will automatically reload. Now your instance should look like the following:

   ![flex\_plugin\_bing.](https://docs-resources.prod.twilio.com/c91d032032c51336bc55b6b2c5bcd1016a5c27df505cd59505b7d0153f88bff6.png)
6. (Optional) Text in and see if there are any Bing results for your phone number!

You might notice that all we changed was a couple of lines of code:

```javascript
const options = { sortOrder: -1 };
  flex.AgentDesktopView
    .Panel1
    .Content
    .add(<CustomTaskListContainer key="demo-component" />, options);
```

is replaced by

```javascript
flex.CRMContainer.defaultProps.uriCallback = (task) => {
  return task 
    ? `https://www.bing.com/search?q=${task.attributes.name}`
    : 'https://www.bing.com';
}
```

This tells Flex to target the `CRMContainer` (instead of the `TaskList`). Instead of adding a component to the `TaskList`, we update the URI that the `CRMContainer` uses as a default prop to render its contents. In this case, we also add a bit of logic to make the container dynamic. We check to see if there's an active task. If there is an active task, we search for the task's name attribute, otherwise, we just show the [https://bing.com](https://bing.com) landing page.

Flex allows you to add, remove, and replace components so that you can tailor your contact center to your business needs. As you build more complex plugins, your workflow will remain similar. When you save files, your environment will reload and you can see the changes locally.

Next up, you'll build the plugin and deploy it to your hosted instance.

## Deploy your Flex plugin

You need to deploy your plugin so that your plugin can be enabled on your live Flex Application. The Flex Plugins CLI uses the [Functions & Assets API](/docs/serverless/api) to upload your plugin directly from your CLI.

1. In your terminal, within the `plugin-sample` directory we created, run

   ```javascript
   twilio flex:plugins:deploy --major --changelog "Adding Bing as search engine" --description "First Plugin on Flex"
   ```
2. In order to enable your plugin, run

   ```csharp
   twilio flex:plugins:release --name "First Plugin Release" --description "Enabling Plugin Sample" --plugin plugin-sample@1.0.0
   ```
3. Reload your [Flex Agent Dashboard](https://flex.twilio.com?path=/agent-desktop). You should now see the new Bing-powered CRM panel!

Refer to our [guide](/docs/flex/developer/plugins/cli) on how to deploy your plugins if you are deploying plugins to multiple accounts.

## Enable sourcemaps in development builds

By default, Flex only includes sourcemaps in production builds. Flex doesn't include sourcemaps in development builds to reduce build time and keep the bundle size smaller. However, if you want to make sourcemaps available in development to avoid warnings, you can override this setting in your plugin's webpack configuration.

Below is an example of how to override the Sass-loader sourcemap setting to `true`:

```javascript
const updateSassModuleRules = (config) => {
    // SASS - COMPATIBILITY WITH TWILIO BASE CONFIG FOR DEVELOPMENT
    const { oneOf } = config.module.rules.find((rule) => rule['oneOf']);
    if (!oneOf) return config;
    const newOneOf = oneOf.map((rule) => {
        const constainsStyleLoader = rule.use?.some((loader) => loader.includes('style-loader'));
        if (constainsStyleLoader) {
            const updatedLoaders = rule.use.map((loader) => {
                if (!loader?.options) return loader;
                return {
                    ...loader,
                    options: {
                        ...loader.options,
                        sourceMap: true,
                    },
                };
            });
            return {
                ...rule,
                use: updatedLoaders,
            };
        }
        return rule;
    });
    const updatedRules = {
        module: {
            rules: [
                {
                    oneOf: newOneOf,
                },
            ],
        },
    };
    return mergeWithRules({
        module: {
            rules: {
                oneOf: 'replace',
            },
        },
    })(config, updatedRules);
};
```

You'll then export this from the overridden webpack configuration:

```javascript
module.exports = {
    ...{other rules if any}
    updateSassModuleRules,
};
```

## Building Flex plugins with React

You now know how to build Flex Contact Center plugins using React, test them locally, then upload them to the cloud. You have the scaffolding to build whatever plugins you desire and see them reflected almost instantly in your call center instance.

Depending on your goals, we have a few paths you might want to follow next. Either explore more around plugin development with Flex and React or visit some of our other Flex Quickstarts.

We can't wait to call what you build!

### Next Steps in Flex

* [Building on Flex using newer versions of React](/docs/flex/developer/plugins/react-versions)
* Introduction to the Flex-UI Component Library
* [Using the Plugins Dashboard to manage Plugins](/docs/flex/developer/plugins/dashboard)

### Other Flex Quickstarts

* [Flex Quickstart: IVR and Agent Management](/docs/flex/admin-guide/setup/account-creation)
* [Flex Quickstart: User Management and Skill-based Routing](/docs/flex/admin-guide/tutorials/skills-assignment)
