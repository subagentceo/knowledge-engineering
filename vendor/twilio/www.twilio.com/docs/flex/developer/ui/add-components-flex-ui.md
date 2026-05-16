# Add Components to Flex UI

In this guide, we'll add a custom component to the `TaskInfoPanel` that features a to-do list for the Agent. This component will appear at the bottom of the info panel, and will render some HTML.

![Twilio Flex TaskInfoPanel showing SMS task details, customer context, and to-do list.](https://docs-resources.prod.twilio.com/f0985daac28d6238f0f17a857a3eb13f9ee8f6177fb6337ff6d5a100b7527043.png)

## Prerequisites

In order to complete this activity, you'll need a local Flex Plugin development environment setup ([start here](/docs/flex/quickstart/getting-started-plugin)).

## Development Environment

Start your local development environment by running `twilio flex:plugins:start` inside your Flex Plugin's directory. An instance of Flex should now be open and initialized in your browser at `localhost`.

## Creating a Task for Development

Since we'll be modifying the content within the Task Information Panel (`TaskInfoPanel`), let's start by creating a Task to view our ongoing development. Each Flex installation is setup with a phone number to develop with. To create a test task, do the following:

1. Find your Flex provisioned phone number in the [phone numbers](https://www.twilio.com/console/phone-numbers/incoming) page of the Twilio Console.
2. Text or call the phone number.
3. Open your Flex instance and accept the new task.
4. In the Task Panel, open the Task's Info tab.

This is where we'll be working to add the Todo List.

The default Flex `TaskInfoPanel` is populated with information about the Task, such as type, priority, and customer context.

We're going to add a little bit of additional information for our Agent in the form of a brief to-do list. For now, this will just be static HTML, and it will be the same for every Task.

## Creating the component

Let's start with the HTML we'd like to render in the info panel. We'll include a line break and a horizontal rule for visual consistency with the existing info panel components, and then add a heading and a brief unordered list filled with items for our Agent.

```xml
<div>
    <br />
    <hr />
    <p>TO DO</p>
    <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
      <li>Answer the task</li>
      <li>Locate the customer's record in the CRM</li>
      <li>Find relevant account details</li>
      <li>Resolve the customer's support issue</li>
      <li>Complete the task</li>
    </ul>
</div>
```

Organization of your components is up to you. For this example, we're going to create this component in a new file in *src* called *MyCustomTaskInfoPanelItem.js*. Open this file in your editor and add the following component code:

```javascript
import React from 'react';

const MyCustomTaskInfoPanelItem = () => (
  <div>
    <br />
    <hr />
    <p>TO DO</p>
    <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
      <li>Answer the task</li>
      <li>Locate the customer's record in the CRM</li>
      <li>Find relevant account details</li>
      <li>Resolve the customer's support issue</li>
      <li>Complete the task</li>
    </ul>
  </div>
);

export default MyCustomTaskInfoPanelItem;
```

You'll see the HTML from above, wrapped in a `render()` method in the class component **MyCustomTaskInfoPanelItem** (New to React components? Learn more [here](https://reactjs.org/docs/components-and-props.html)!).

## Adding the component to the canvas

Now that we have a component, it's time to bring it into the canvas. First, we need to import the component. Open your main plugin file (example: *TodoPlugin.js*) and add the following line:

```javascript
import MyCustomTaskInfoPanelItem from "./MyCustomTaskInfoPanelItem";
```

Next, let's use the `add()` method to add our component to the canvas. The area of the canvas we're concerned with is the [TaskInfoPanel](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/TaskInfoPanel/). Add the following line to your app's `init()` method:

```javascript
flex.TaskInfoPanel.Content.add(<MyCustomTaskInfoPanelItem key="to-do-list"/>);
```

Here, we're following the schema of `Component.Content.add/replace(<MyComponent />, {options})`, where **Flex.TaskInfoPanel** is the base component and we are using the **add()** method to insert our new **MyCustomTaskInfoPanelItem** component, with a key of "to-do-list" and no additional configuration options.

If you're starting with the default plugin and have not changed anything else yet, your TodoPlugin.js will look like this:

```javascript
import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import { MyCustomTaskInfoPanelItem } from './MyCustomTaskInfoPanelItem';

const PLUGIN_NAME = 'TodoPlugin';

export default class TodoPlugin extends FlexPlugin {
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
    flex.TaskInfoPanel.Content.add(<MyCustomTaskInfoPanelItem key="to-do-list"/>);
  }
}
```

Save the file, and switch to your instance of Flex UI. To see the to-do list, click on the **Info** tab.

## What next?

Congratulations, you've created your first component and added it to Flex UI! Here are some ideas of where to go next:

* Make this component more dynamic with [props](/docs/flex/developer/ui/work-with-components-and-props) (the Task object is a good place to start). To explore component props, go to the [Flex UI API Reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/).
* Reconfigure the canvas by using the [replace() method](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/DynamicContentStore/#replace-child-options-cleanupfunction) to swap in your custom components.
* Try creating a custom component that uses a third-party API.
