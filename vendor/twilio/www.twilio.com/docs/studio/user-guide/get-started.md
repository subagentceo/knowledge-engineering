# Get Started with Twilio Studio

Twilio Studio is a visual tool for building communications applications with little or no code. This guide describes the core concepts and mechanics you need to start building with Studio. Once you feel comfortable with these mechanics, you can start building out more complex flows that combine multiple widgets and transitions.

## Glossary

Here are some of the key Studio terms to help you as you get started:

| Term       | Definition                                                                                                                                                                                          | Example                                                                                                                                                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flow       | A Flow is an individual workflow that you create. They can handle one or more use cases.                                                                                                            | You can create a flow to handle inbound Voice calls by playing a prerecorded message.                                                                                                                                                                               |
| Widget     | Widgets are items that you can drag onto the flow canvas. They represent pieces of logic, and can connect to each other through transitions.                                                        | Use the Send Message widget to send an outbound SMS to a user in your flow.                                                                                                                                                                                         |
| Transition | Transitions define how a flow advances from one widget to the next based on specific conditions.                                                                                                    | After you place an outbound call with the Outgoing Call widget, you could create a transition to the Say/Play widget to play a message to the connected caller.                                                                                                     |
| Step       | A Step is the runtime processing of a widget, starting when that widget is entered. Variables get set at the end of a Step.                                                                         | If you're prompting a user for a text input, when they receive the inbound SMS prompt, they are actively in a Step until they exit the widget (send a response or timeout). If the prompt is intended to set a variable, this happens at the end of the Step.       |
| Execution  | An execution represents a specific person's progress through a flow. An execution is active while the user is in the flow, and it is considered ended when they stop or are kicked out of the flow. | When you call the Twilio number connected to a flow, an execution is created to represent your call to that number and your path through the flow. The owner of the flow can see this execution, as well as the executions of other users who run through the flow. |

## Build with Twilio Studio

### Create a flow

The first step to use Studio is to create a flow, which represents the workflow that you want to build for your project.

To create a new flow:

1. Log in to your Twilio account in the Twilio Console.
2. Navigate to the Studio dashboard.
3. Click **Create new Flow**.
4. Name your flow, then click **Next**.
5. Select a template:
   * Select the **Start from scratch** option to create an empty flow.
   * Select a predefined template (for example, a chatbot or [Interactive Voice Response (IVR)](/docs/glossary/what-is-ivr) template) to use as a starting point. You can customize these templates for your use case.
6. Once you've selected your template, click **Next**.

When you've created the flow, you'll see the flow's canvas. Here, you can build out the rest of the logic for the project.

> \[!NOTE]
>
> If you're using the *legacy* Twilio Console, you can use one of two versions of the canvas: Classic and New. The new canvas is in public beta, click **Try the new Studio canvas** to switch to it. The new canvas has the same functionality as the classic canvas with a new look.

### Create a Subflow

You can create Subflows, which let you break down large, complex flows into smaller flows and link them together. Common use cases include reusing common functionality, organizing complex flows into logical subsets, and passing live executions between flows. For example:

* Create a reusable logging Subflow to `POST` data back to your own systems.
* Transfer a Contact to another self-contained IVR or chatbot.
* Encapsulate the gathering and verifying of a Contact's identity.
* Pass a Contact's language preference to a Subflow to dynamically load the localized content.

[Visit the Subflow docs](/docs/studio/subflows) to learn more about how to use Subflows, work with variables, limitations, and more.

### Navigate the canvas

The canvas is where you build your flow.

Complex flows can crowd the canvas, so it's important to be able to control the area of focus. You can use the mouse to click and drag to reposition the canvas. To change the zoom level, select the **+** and **-** icons. If you're using a trackpad, pinch and squeeze to zoom. You can also click **+** and **-** on your keyboard to zoom in and out.

### Work with widgets

Widgets are the building blocks of a Studio flow. They handle incoming actions and respond by performing tasks. These tasks include sending a message, making a phone call, routing the user to another part of the flow, and capturing information.

Every new canvas has a **Trigger** widget, which you use to indicate how the flow starts. You can add other widgets onto the canvas to build the rest of your project's logic.

#### Trigger widget

There are four ways to trigger a flow's start:

* Incoming Message
* Incoming Call
* REST API
* Subflow

You can start your flow with any number of these triggers. For example, you can design your flow to provide information to users who both text and call in. Your flow could be triggered by an Incoming Call and an Incoming Message. The flow could respond to an Incoming Message with a [Send Message widget](/docs/studio/widget-library/send-message) that sends an SMS to the user. It alternatively could respond to an Incoming Call with a [Say/Play widget](/docs/studio/widget-library/sayplay) that dictating the message back to the caller.

You can design your flow to respond to any number of the possible triggers.

#### Widget library and configuration panel

The widget library contains widgets that you can drag and drop onto the canvas. You can click and drag the widget around the canvas to reposition it. Use the search bar to find the widget you want to use.

Click on a widget to open its configuration panel. The configuration panel is where you set up the widget's settings and define transitions to other widgets. You can also open the configuration panel by clicking the **Edit** icon on the widget.

If you're using the *classic* canvas in the *legacy* console, the widget library and settings panel appear in the same space. To return to the widget library, click any empty space on the canvas. You can also click the single back arrow on the configuration panel to get back to the widget library.

#### Edit a widget

To edit a widget, click on the widget to open its configuration panel.

Widget names are generated automatically when you drop them onto the canvas, but they can be renamed. Widget names must meet the following requirements. They:

* Must be unique. You cannot use the same name for two widgets in a single flow.
* Must start with a letter.
* Cannot include spaces or periods. Use the underscore character ("\_") to separate words.

The widget type is shown in parentheses under the name so you can tell what the widget does.

> \[!CAUTION]
>
> Don't include personally identifiable information (PII) such as a person's name, home address, email address, or phone number, in flow or widget names. The systems that process these attributes assume the data isn't directly identifying. For more details on how Twilio processes your data, refer to our [privacy policy](/en-us/legal/privacy).

Some widgets have required configuration settings. Required fields are marked with a red asterisk (\*) in the configuration panel and are listed in the widget's documentation. Note that you can't save the flow if any required configuration is missing or invalid.

To save your edits to the widget, click **Save** or click back onto the canvas. The widget is saved when you click away from it.

#### Duplicate widgets

To copy a widget, go to **⋮** > **Duplicate widget**. You can also use standard keyboard shortcuts.

* On mac OS: press **Cmd + C** to copy, then **Cmd + V** to paste.
* On Windows or Linux: press **Ctrl + C** to copy, then **Ctrl + V** to paste.

If you're using the *classic* canvas, you can copy a widget in its configuration panel by clicking the copy button. You can also use keyboard shortcuts.

### Delete widgets

To delete a widget, go to **⋮** > **Delete widget**.

If you're using the *classic* canvas, click the **X** button in the widget. You can also click the **Delete** icon in the widget's configuration panel.

### Define widget transitions

A transition defines how a flow moves from one widget to the next based on events and specified conditions. Each transition connects one widget to another widget.

Widgets can have multiple different transition conditions. For example, the [Send Message widget](/docs/studio/widget-library/send-message) contains a transition condition for when the message is sent, and another one for if the message fails to send. You can define separate workflows for each one of these conditions. For example, if the message fails to send, you might want to retry it. If the message does send, you might want to move to a different widget.

You can create a transition in one of two ways.

#### Option 1: Draw the transition between two widgets

You can draw a transition between two widgets in the canvas.

1. Click, hold, and drag from the bottom of the first widget in the transition.
2. Drag your cursor onto widget you'd like to connect to. As you drag the cursor, you'll see a line following the arrow.
3. Drop the line on the top of the widget you want to connect to.

A line connecting the two widgets indicates that there is now a transition between them. Click the line to edit the transition conditions.

#### Option 2: Define transitions from the widget configuration panel

1. Click the widget to open the widget's configuration panel.
2. Go to the **Transitions** tab.
3. Select the widget you'd like the flow to transition to.

As you make changes, the canvas updates showing lines and arrows that represent your transitions.

#### Remove a transition

You can, similarly, remove a transition in two ways.

#### Option 1: Remove the transition from the canvas

You can remove a transition by clicking the transition and pressing the **Delete** key on your keyboard.

In the *classic* canvas, click the gray dot at the top the second widget in the transition. Then, drag and drop the line on the empty canvas.

#### Option 2: Remove the transition from the widget configuration panel

1. Click the widget that starts the transition you want to remove to open its configuration panel.
2. Select the **Transitions** tab.
3. click **Disconnect** under the transition you would like to remove.

### Publish flows and view the revision history

Changes you make on the canvas are saved automatically, but aren't live until you click **Publish**. This lets you update a flow while you develop it without affecting current users. When you're ready for the changes to go live, click **Publish**.

Studio also tracks revision history. In the **Revision History** menu, you can:

* View a list of every change made to your flow.
* Compare the differences between versions.
* Revert to a previous revision.

To open the revision history, click the **Revision History** menu or, in classic view, hover the pointer over the revision history menu.

### Configure a Twilio phone number to connect to a Studio flow

After you finish configuring your Flow and publish all changes, connect it to a Twilio phone number so users can interact with it. You can connect Flows that are triggered by incoming messages or incoming calls.

## Twilio Console

1. Go to **Products & Services** > **Numbers & Senders** > **Phone Numbers** and select the phone number that you want to connect to the Flow.
   * If you don't have a phone number, you can [buy one in the Console](/docs/numbers-and-senders/add-numbers-and-senders#add-and-configure-numbers-and-senders-from-the-numbers-and-senders-page). If you are using
2. In the **Configuration Details** tab, choose the appropriate trigger:

   * **Incoming calls**
     1. Go to the **Voice and emergency calling** tab.
     2. Click **Edit details** and configure the settings.
     3. Select the **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service** method to configure the phone number.
     4. Select **Use Studio Flow** as thee method for handling incoming calls.
     5. Select the Flow that you want to handle incoming calls.
   * **Incoming messages**
     1. Go to the **Messaging** tab.
     2. Click **Edit details** and configure the settings.
     3. Select the **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service** method to configure the phone number.
     4. Select **Use Studio Flow** as the method for handling incoming messages.
     5. Select the Flow that you want to handle incoming messages.
3. Click **Save**.

Your Flow is now connected to your Twilio phone number.

## Legacy Twilio Console

1. In the [Active Numbers section of the Twilio Console](https://www.twilio.com/console/phone-numbers/incoming), select the phone number that you want to connect to the Flow.
   * If you don't have a phone number, you can [buy one in the Console](https://help.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console).
2. In the phone number's configuration menu, choose the appropriate trigger:

* **Incoming calls**
  1. Scroll to the **Voice & Fax** section.
  2. For **Configure With**, choose **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service**.
  3. For **A Call Comes In**, choose **Studio Flow**.
  4. In the new drop-down list, select the Flow that you want to handle incoming calls.
* **Incoming messages**
  1. Scroll to the **Messaging** section.
  2. For **Configure with Other Handlers**, choose **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service**.
  3. For **A Message Comes In**, choose **Studio Flow**.
  4. In the new drop-down list, select the Flow that you want to handle incoming messages.

3. Click **Save**.

Your Flow is now connected to your Twilio phone number.

> \[!NOTE]
>
> A Twilio phone number can route inbound messages and calls to only one Studio Flow (one-to-one), but a single Studio Flow can process messages and calls from multiple phone numbers (one-to-many).

You can also use the flow's **Webhook URL** with Twilio resources that accept a callback URL, including Messaging Services, Short Codes, and Channels. Depending on the product, you configure this URL in the Twilio Console, with APIs, or both. The documentation for each product specifies how to connect a Studio flow when that option is available.

To find your flow's Webhook URL, go to the **Details** tab of the flow. If you're using the classic view, the Webhook URL is in the **Trigger** widget's configuration panel.

### Use variables in your Studio flow

As your flow executes, Twilio saves the execution state in the flow context. You can access any data in the flow context from your widgets, either in configuration fields or in text areas.

#### Context variables

There are four types of data stored in the context:

* **Flow**: Data intrinsic to the flow, such as the phone number associated with it.
* **Trigger**: Data set when a flow starts, such as the initial incoming message, phone call, or REST API call.
* **Widgets**: Data that each widget sets and adds to the context as it executes, such as the digits a user presses or the body of an incoming or outgoing message.
* **Contact**: Data about the current contact engaging with the flow, such as their phone number.

You can also store additional variables in the flow's context with the [Set Variables widget](/docs/studio/widget-library/set-variables).

> \[!WARNING]
>
> Variables can only be updated within the **[Set Variables widget](/docs/studio/widget-library/set-variables)**. When modifying a variable, create a new variable in the Set Variables widget and update the original variable using [Liquid filters](/docs/studio/user-guide/liquid-template-language#standard-filters).

#### Liquid template language

Studio uses the [Liquid template language](/docs/studio/user-guide/liquid-template-language) to insert variables into widgets. You can use Liquid to reference the various context variables available in a Studio flow. Liquid supports both output tags and logic tags.

To insert a variable in a widget, type two opening curly braces (`{{`). Studio then displays a list of available context variables. Scroll through the list or type the variable name to filter the options.

You can also add logic to widgets with Liquid, such as `if/else` statements and `for` loops. The following example checks whether the flow contains a variable for the contact's first name. If the variable exists, it greets the contact by name; otherwise, it uses a generic greeting.

```liquid
{% if flow.data.first_name %}
  Hello {{flow.data.first_name}}
{% else %}
  Hello friend
{% endif %}
```

Liquid is a powerful templating language. For the full list of tags and actions, see the [Liquid Template Language documentation](/docs/studio/user-guide/liquid-template-language).

> \[!WARNING]
>
> Variable names only show dropdown options or autocomplete when you're writing output tags (`{{...}}`). Variable names won't autocomplete inside logic tags (`{% ... %}`).

> \[!NOTE]
>
> Liquid template variables can render strings up to 16 KB.

## Troubleshooting Twilio Studio flows

To learn more about debugging your flow, view the [Studio troubleshooting guide](/docs/studio/user-guide/studio-troubleshooting).

### Logs

Twilio Studio provides logs for each Studio flow execution. These logs contain useful information about the steps that a flow runs and can help you debug flows that aren't functioning as you intended.

You can view the Logs for a Studio flow in the Logs tab.

### Common issues

* Executions can become stuck for inbound calls. Review [best practices to avoid stuck executions](https://help.twilio.com/hc/en-us/articles/360019383714).
* Infinite loops are possible. Studio has a built-in step limit, so an execution ends after 1,000 Steps. Take care when creating loops over a set of widgets. If you think you're in a loop, you can [end an execution using the Studio Logs](https://help.twilio.com/hc/en-us/articles/115016032048-Troubleshooting-Issues-with-Twilio-Studio#stuck-execution).
* You can define a maximum of 2,000 total widgets, which includes the parent flow and all linked Subflow instances. Contact Twilio Support to use more than 2,000 widgets in a single flow.
* Studio stops executing a flow if the same widget runs10 times in a row.
* If you can't find your flow in the dropdown when attaching it to a phone number, learn [how to connect the flow manually](/docs/studio/user-guide/studio-faq#how-can-i-assign-my-studio-flow-to-a-twilio-phone-number-if-my-flow-is-not-showing-up-in-the-dropdown).
* Review [other common issues and troubleshooting tips](https://help.twilio.com/hc/en-us/articles/115016032048-Troubleshooting-Issues-with-Twilio-Studio).

## Next steps

Once you're comfortable navigating a Studio flow and the Studio canvas, use the following resources to continue building:

* Tutorials
  * [Build a chatbot](/docs/studio/tutorials/how-to-build-a-chatbot)
  * [Conduct a survey](/docs/studio/tutorials/how-to-conduct-a-survey)
  * [Send appointment reminders](/docs/studio/tutorials/how-to-send-appointment-reminders)
  * [Build an Interactive Voice Response (IVR) menu](/docs/studio/tutorials/how-to-build-an-ivr)
  * [Build an SMS autoresponder](/docs/studio/tutorials/how-to-set-up-auto-responder)
  * [Forward calls](/docs/studio/tutorials/how-to-forward-calls)
  * [Post messages to Slack](/docs/studio/tutorials/how-to-post-sms-to-slack)
  * [Route inbound leads to the correct sales representative](/docs/studio/tutorials/how-to-route-leads)
* [See a list of all Studio widgets](/docs/studio/widget-library)
* Learn more about the [Liquid template language](/docs/studio/user-guide/liquid-template-language)
