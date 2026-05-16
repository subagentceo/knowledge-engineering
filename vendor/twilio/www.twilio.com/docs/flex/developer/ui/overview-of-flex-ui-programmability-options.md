# Overview of Flex UI programmability options

## Manager

The Flex Manager is the access point for controlling your Flex instance and all of the underlying Twilio products used for communications and assigning tasks. This means that within your Flex project, you can access the TaskRouter or Chat client directly through the Flex manager.

Aside from Flex itself, Manager also gives you access to the [Conversations](/docs/conversations-classic/initializing-conversations-sdk-clients#the-javascript-client), [Sync](/docs/sync), [Voice](/docs/voice/sdks/javascript), and [TaskRouter](/docs/taskrouter) SDKs.

### How to obtain the Manager instance

You can access the manager as follows:

In the init method of your plugin:

```javascript
init(flex, manager) {
  // use manager here
}
```

In your app, by calling the `getInstance` method:

```javascript
Flex.Manager.getInstance()
```

By calling the `create` method when initializing Flex:

```javascript
return Flex
  .provideLoginInfo(configuration, "#container")
  .then(() => Flex.Manager.create(configuration))
  .then(manager => {
    // use manager here
  })
  .catch(error => handleError(error));
```

You can check out the [sample project](https://github.com/twilio/flex-ui-sample/tree/flex-v2) on how to initialize Flex.

For the detailed description of Manager visit our [Flex UI API docs](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/overview/Manager).

## Configuration

Flex UI's configuration allows you to control the way the overall app loads, as well as the behavior of individual [Flex Components](/docs/flex/developer/ui/work-with-components-and-props).

Flex Components can be modified in two ways:

* With `componentProps` in the Configuration Object
* With the `defaultProps` API

### Using `componentProps` in the Configuration Object

The following is an example of using `componentProps` in the Configuration Object:

```javascript
var appConfig = {

  componentProps: {
    CRMContainer: {
      uriCallback: (task) => task
        ? `https://www.bing.com/search?q=${task.attributes.name}`
        : "http://bing.com"
    }
  },
};
```

### React defaultProps API

You may also configure default properties for components within a Plugin by using the React `defaultprops` API programmatically:

`componentProps: { [Component Name]: { [Prop Name]: [PropValue] } }`

For example:

```javascript
flex.CRMContainer
  .defaultProps
  .uriCallback = (task) => task
    ? `https://www.bing.com/search?q=${task.attributes.name}`
    : "http://bing.com/";

flex.MainHeader
  .defaultProps
  .logoUrl = "https://static0.twilio.com/marketing/bundles/archetype.alpha/img/logo-wordmark--red.svg";
```

Go to Flex UI API docs for the full description of [Configuration object](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/overview/Config) and [Component props](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/AgentDesktopView).

Learn how to modify configuration for *flex.twilio.com* using API in our [documentation](/docs/flex/developer/config).

## Overriding language strings

You can override any string by editing the `strings` object on the [Flex Manager](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/overview/Manager) instance:

```javascript
flex.Manager.getInstance().strings.TaskLineCallAssigned = "I am a content string!";
```

![Twilio Flex task list showing three tasks with call and message icons.](https://docs-resources.prod.twilio.com/82d6cfcc9c81047579840722bbe95728b20c4b81e32a56f8e1e497b42223736d.png)

For the full list of UI strings, see [Flex UI API docs.](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/advanced/Strings)

### Templating support with Mustache-style syntax

Flex uses [Handlebars](https://handlebarsjs.com/guide/expressions.html) for templating and supports Mustache-style syntax and expressions within content strings, ie. embedding value placeholders between double braces. Here's an example:

```javascript
manager.strings.TaskInfoPanelContent = `
<h1>TASK CONTEXT</h1>
<h2>Task type</h2>
<p>1{{task.attributes.title}}</p>
<p>2{{task.title}}</p>
<h2>Task created on</h2>
<p>{{task.dateCreated}}</p>
<h2>Task priority</h2>
<p>{{task.priority}}</p>
<h2>Task queue</h2>
<p>{{task.taskQueueName}}</p>
<hr />
<h1>CUSTOMER CONTEXT</h1>
<h2>Customer name / phone number</h2>
<p>{{task.attributes.name}}</p>
`;
```

Within the context of each component and string, additional dynamic content is available: for example, by accessing [Task properties or attributes](/docs/flex/admin-guide/core-concepts/routing#tasks).

### Accessing Task context: Properties and attributes

Within the context of each component and string, additional dynamic content is available: for example, by accessing [Task properties or attributes](/docs/flex/admin-guide/core-concepts/routing#tasks).

Here's an example of the use in a template of a couple of the properties and attributes listed above:

```javascript
manager.strings.TaskExtraInfo = "My task {{task.attributes.name}} was created on {{task.dateCreated}}";
```

### Helper functions

Helper functions provide you with a way to customize text with dynamic information. Here is an example of the use of a helper function to enable dynamic updates:

```javascript
manager.strings.TaskExtraInfo = "Time since last update: {{helper.durationSinceUpdate}}";
```

You can find all available helper functions in [Flex UI API docs.](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/advanced/helpers/TaskHelper)

## Theming Flex UI

Flex UI theming interface closely maps to the [Twilio Paste](https://paste.twilio.design/) design system. This structure is based on the concept of [design tokens](https://paste.twilio.design/tokens/), a set of variables that you can modify. This structure promotes both consistency, customization and [web accessibility](/docs/flex/developer/ui/web-accessibility).

**Theme config**

Theme configuration is done with config key called `config.theme` with the following structure:

```javascript
interface ThemeConfigProps {
   isLight?: boolean; // Represents if light or dark theme
   tokens?: Tokens; // Paste tokens
   componentThemeOverrides?: Object; // Object containing styles of the component which is to be overridden.
}
```

**Component theming**

For components which receive the theme as props, `props.theme.tokens` can be used.

**Custom tokens**

Use custom tokens to pass your own custom tokens to theme using the example below.

```javascript
  appconfig = {
    theme: {
      tokens: {
        custom: {
          myCustomToken: "#ccc"
        }
      }
    }
  }
```

**Paste tokens**

Similarly, you can override default design tokens when using Twilio Paste for your plugin.

```javascript
appConfig = {
   theme: {
       tokens: {
           backgroundColors: {
                 colorBackgroundPrimaryStrongest: "tomato",
           },
       },
   },
};
```

**ThemeProvider**

An API `Flex.setProviders()` can be used to load providers on the root level once and don't have to worry about wrapping again as the context will correctly set. Now to use Paste in Flex plugins, developers will not need to wrap Paste `ThemeProvider` over all its components. Explore the API in our [Flex UI API docs](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/theming/ThemeProvider).

When using Paste, developers need to pass the `CustomizationProvider` from Paste to Flex using `Flex.setProviders` API as below. By doing this, we'll wrap Flex with the passed Provider and developers don't have to worry about fetching the right theme and passing it on.

```javascript
import { CustomizationProvider } from "@twilio-paste/core/customization";
 
Flex.setProviders({
   PasteThemeProvider: CustomizationProvider
});
 
Flex.AgentDesktopView.Panel1.Content.add(
   <PasteButton key="A" variant="primary">
       Paste Button
   </PasteButton>
);
 
Flex.AgentDesktopView.Panel1.Content.add(
   <PasteButton key="B" variant="primary">
       Paste Button
   </PasteButton>
);
```

`Flex.setProviders()` also allows developers to pass their own **custom provider** which is needed to be set on the root level. They can do it as below:

```javascript
Flex.setProviders({
   CustomProvider: (RootComponent) => (props) => {
       return (
           <Context.Provider value={{ test: "123" }}>
               <RootComponent {...props} />
           </Context.Provider>
       );
   }
});
 
Flex.AgentDesktopView.Panel1.Content.add(
   <Context.Consumer>
       {(value) => {
           <div>{value.foo}</div> // Will print 123
       }}
   </Context.Consumer>
);
```

The below example shows how to use a **custom provider** for styling **Material UI** components. Ensure this is done before [declaring any components](/docs/flex/developer/ui/add-components-flex-ui).

```javascript
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

Flex.setProviders({
      CustomProvider: (RootComponent) => (props) => {
          return (
            <StylesProvider generateClassName={createGenerateClassName({
              productionPrefix: 'pluginXYZ',
              seed: 'pluginXYZ',
            })}>
                  <RootComponent {...props} />
              </StylesProvider>
          );
      }
});

```

### Using Twilio Paste

Not every component you build needs to start from scratch. Existing React component libraries can help you use components that have already been built with browser compatibility, responsive screen sizes, and accessibility in mind. Internally, `flex-ui` leverages [Twilio Paste](https://paste.twilio.design/) for many of its components. You can similarly use Paste to create components that start with a similar style to Flex's existing layout.

Paste is already a dependency of `flex-ui` but if you choose to include it explicitly, ensure the plugin doesn't have multiple versions of Paste in its dependency tree.

## UI components

Flex UI is a library of programmable or dynamic components that expose a `Content` property and allows you to add, replace and remove any component and its children. Each immediate child of a component has a key (required for the `add` and `replace` methods) and a set of properties that will be inherited by its children. To see the full list of components, find a component's `key` or explore component props, go to [Flex UI API docs](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/AgentDesktopView).

To learn more how to work with components and props, see our [developer guide](/docs/flex/developer/ui/work-with-components-and-props).

## UI actions and Flex events

The Flex UI is constantly emitting event data that describes how the user is interacting with the Flex UI. As you write plugins, the Actions Framework allows you to harness these events and define your own logic to describe how you want the Flex UI, CRM Data, or any other data, to change. You can register events before or after an action fires, or even replace the behavior of an Action.

Learn how to use the Actions Framework in our [developer documentation](/docs/flex/developer/ui/use-ui-actions).

## In-app and browser notifications

Flex UI provides a client-side API to manage notifications in Flex UI.

A notification is an alert that tells the user what state change or error has occurred to a component or page when they are no longer viewing that component or page

Users can be notified in Flex using a Notification Bar or Browser notifications or both.

### What are notification framework capabilities?

* Register custom notifications including browser notifications
* Customize standard notifications
* Turn off standard UI notifications
* Override standard notifications per Task Channel definition
* Customize how standard UI notifications are displayed
* Register your custom UI notifications and specify how to render them

To learn how to work with notifications, see our [developer guide](/docs/flex/developer/ui/work-with-notifications).

The [full reference for the Notification Manager](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/nsa/NotificationManager) and [a list of standard notifications](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/nsa/Notifications) are available in Flex API docs.

## State management

Flex UI 2.0 includes the Redux Toolkit and some new APIs for managing your internal state. These tools provide some guardrails for your state management, helping you set up boilerplate code with better defaults.

**We recommend using single Redux store, either let Flex UI create its own store or pass a custom store using [Manager.create() API](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/overview/Manager#create-config-store-promise-manager)**

### useFlexSelector

A wrapper around [Redux's `useSelector` method](https://react-redux.js.org/api/hooks#useselector). It exposes the same API but adds some Flex validations to ensure Flex's internal state is usable. This selector is specific for working with Flex state itself. Outside of accessing Flex state, we recommend using the default `useSelector`.

```javascript
import { useFlexSelector } from "@twilio/flex-ui";

const MyComponent = (props) => {
    const viewState = useFlexSelector(state => state.flex.view);
    return (
        viewState.isSideNavOpen &&
        <div>My Custom Code</div>
    )
}
```

The selector takes the current view state for the custom component. The selector guarantees that the state being selected is safe to read and can be used in the application without side effects. This couldn't be guaranteed with `useSelector`.

### useFlexDispatch

A wrapper around [Redux's `useDispatch` method](https://react-redux.js.org/api/hooks#usedispatch). It prevents dispatches from causing side effects to Flex's state, ensuring your changes work as expected. Use this hook for interacting with Flex's state. You can use the native `useDispatch` method outside of Flex's state.

```javascript
import { useFlexDispatch, useFlexSelector } from "@twilio/flex-ui";

const MyComponent = (props) => {
   const viewState = useFlexSelector(state => state.flex.view);
   const dispatch = useFlexDispatch();
   return (
       viewState.isSideNavOpen &&
       <button onClick={() => dispatch({type: "close_side_bar"})}>My Custom Code</button>
   )
}
```

To learn more, visit our [Redux developer guide](/docs/flex/developer/ui/redux).

### Task Channel definitions

Flex is a multichannel contact center. We support a number of channels out-of-the-box, and are constantly adding more. We support the following native channels:

* Voice
* SMS with MMS support
* WebChat with Media Attachments
* WhatsApp

With the Task Channel Definition API you can also add custom channels and override the behavior of existing ones.

Learn more about working with Task Channel Definitions in [the developer guide.](/docs/flex/developer/ui/v1/task-channel-definitions)

## insightsClient

The `insightsClient` provide access to the Twilio Sync SDK. For Flex accounts, this gives access to workers and tasks data through the use of two classes:

* [LiveQuery](https://media.twiliocdn.com/sdk/js/sync/releases/0.12.2/docs/LiveQuery.html) class: to query Flex data and receives pushed updates whenever new (or updated) records would match the given expression
* [InstantQuery](https://media.twiliocdn.com/sdk/js/sync/releases/0.12.2/docs/InstantQuery.html) class: to get a static snapshot of Flex data

Both classes needs two arguments:

* Index name: data set the query is executed against. Currently supported index names for Flex are: `tr-task`, `tr-worker`, `tr-reservation`, `tr-queue`.
* Query: this is the query used to filter the data from the index. The syntax for the query is documented [here](/docs/sync/live-query). The query can be an empty string: in this case the whole data set is returned (e.g. all workers.)

### LiveQuery example

In this example, the insightsClient is used to query the workers with `activity_name` set to `Available` and subscribe to changes. That means that every time a worker change its status to `Available`, an event `itemUpdated` is fired. If a worker changes its status from `Available` to any other status, the `itemRemoved` event is fired.

```javascript
Flex.Manager.insightsClient
  .liveQuery('tr-worker', 'data.activity_name == "Available"')
  .then(function (args) {
    console.log(
      'Subscribed to live data updates for worker in "Available" activity'
    );
    args.on('itemRemoved', function (args) {
      console.log('Worker ' + args.key + ' is no longer "Available"');
    });
    args.on('itemUpdated', function (args) {
      console.log('Worker ' + args.key + ' is now "Available"');
    });
  })
  .catch(function (err) {
    console.log('Error when subscribing to live updates', err);
  });

```

### InstantQuery example

In this example, the insightsClient is used to query the workers with specific skills inside its `attributes`. This returns an array of workers that can be used to provide static data.

```javascript
manager.insightsClient.instantQuery('tr-worker').then((q) => {
  q.on('searchResult', (items) => {
    // Do something with the results
  });
  q.search('data.attributes.languages contains "english"');
});
```
