# How to Implement Click-to-Dial

While Flex offers its own [Dialpad](/docs/flex/admin-guide/setup/voice/dialpad) to allow you to insert touch-tone numbers and place calls from Flex, you may want users to be able to click a phone number in a system outside of Flex that launches a phone call using Flex.

You can implement this functionality using Flex's native outbound dialing capabilities. Read on to learn how to implement click-to-dial.

## The Outbound Call Action

The `StartOutboundCall` Action allows you to define your own logic to trigger outbound calls, and will be key to implementing click-to-dial functionality. `StartOutboundCall` requires a destination phone number — we have to call somebody, after all — but it also includes additional parameters for defining details like custom Task attributes and the caller ID that should make the call.

> \[!WARNING]
>
> Ensure a reservation has been created before updating the attributes of a [StartOutboundCall task](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/ui-actions/Actions/#StartOutboundCall).

## Making a call from a CRM embedded in Flex

You've embedded your CRM by developing a React component. You want agents to be able to click on a phone number in the CRM Plugin to start an outbound call in Flex.

![Agent clicks to trigger plugin code, calls Flex, and makes a call to customer.](https://docs-resources.prod.twilio.com/494587332adc1766e63254cb975e6933f68ae6bd27181bff6ca05fe4c82c7f82.png)

### The Outbound Call Action \[#the-outbound-call-action-2]

In your Flex Plugin code, you might write a function like this:

```javascript
function clickToDial(destinationNumber) {
  Flex.Actions.invokeAction("StartOutboundCall", {
    destination: destinationNumber
  });
}
```

Your `destinationNumber` can either be an E.164 phone number or a SIP URI in this format: `sip:<sip_uri>`. Once you've defined how you want to invoke `StartOutboundCall`, you can set this function as the `onClick` attribute for any number, button, or other clickable element in your UI. For example, in your Plugin code, you might have a `CustomerNumber` component that takes the click-to-dial function:

```javascript
<CustomerNumber
  number={props.customerNumber}
  onClick={(e) => clickToDial(props.customerNumber, e)}
/>
```

When an agent clicks on the rendered `CustomerNumber` component, `clickToDial` will fire with the customer number, and Flex will invoke the `StartOutboundCall` action and initiate the call for you.

### Customize the Outbound Call Action

We can also use the Actions Framework to extend `StartOutboundCall`. For example, we might want to use a specific caller ID (from number) depending on the agent that is placing the call. Using `replaceAction` we can modify this for our custom click-to-dial button, as well as the Flex Dialpad component's call button:

```javascript
async init(flex, manager) {
  flex.Actions.replaceAction("StartOutboundCall", (payload, original) => {
    var newPayload = payload;
    newPayload.callerId = manager.workerClient.attributes.phone_number;
    original(newPayload);
  });
}
```

Now that we have replaced `StartOutboundCall`, all calls will be made with the caller ID specified by the `phone_number` attribute on the agent's TaskRouter worker.

## Making a call when Flex is embedded in your CRM

In this case, you've embedded Flex in your CRM. Agents should be able to click on a phone number in the CRM to launch Flex and make a call.

![Agent clicks CRM number, posts message to plugin, invokes Flex action to call customer.](https://docs-resources.prod.twilio.com/2bbf04c1fce31eb62286c7218027ffde03b54c2fdf75667c22216868b314b016.png)

### The postMessage() function

By default, most browsers can use the [Window.postMessage() function](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to communicate between iframe elements. You can utilize the `postMessage()` to help Flex understand that something was clicked in your CRM and establish an outbound call. The flow might look like this:

1. An agent clicks a UI element to start a call.
2. This click event triggers a `postMessage()` call that communicates with Flex through an iframe:

```javascript
// Store the Flex iframe element in a variable
const flexIframe = document.getElementById('flex').contentWindow;

function sendMessage(e) {
  // Prevent any default browser behavior.
  e.preventDefault();

  // Send a message to the iframe with the phone number
  flexIframe.postMessage(document.getElementById('phoneNumber').value, *);
}
```

> \[!WARNING]
>
> Note that this code sample uses `*` (a wildcard) as the `targetOrigin`, meaning that any malicious site could read the contents of your message. Always use a specific URL in production to keep your data safe!

3. Flex receives the message, along with the associated message payload:

```javascript
// Flex in an iFrame
if (window.self !== window.top) {
  // Define a function for what to do when a message from postMessage() comes in
  function receiveMessage(event) {
    // Invoke the Flex Outbound Call Action
    flex.Actions.invokeAction("StartOutboundCall", {destination: event.data});
  }

  // Add an event listener to associate the postMessage() data with the receiveMessage logic
  window.addEventListener("message", receiveMessage, false);
}
```

4. Flex initiates the outbound call.

## Common integrations

Some CRM tools offer their own APIs for enabling click-to-dial that you can integrate with Flex. For example, Salesforce's OpenCTI API, for example, offers a series of functions for enabling outbound dialing.

| **Software** | **Click-To-Dial Platform** |
| ------------ | -------------------------- |
| Salesforce   | OpenCTI                    |
| Zendesk      | ZAF                        |

This list will continue to be updated as we learn about other software's click-to-dial platforms.

## Next steps

Now that you've got some ideas for how to implement click-to-dial, you may be curious about the details of building with Flex. Why not...

* [Start building a click to call plugin](/docs/flex/quickstart/getting-started-plugin).
* [Learn more about the outbound dialer](/docs/flex/admin-guide/setup/voice/dialpad).
* Learn about other actions available in the Actions Framework.
