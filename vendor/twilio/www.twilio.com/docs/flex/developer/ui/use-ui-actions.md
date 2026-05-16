# Use UI Actions

The Flex UI is constantly emitting event data that describes how the user is interacting with the Flex UI. As you write Plugins, the Actions Framework allows you to harness these events and define your own logic to describe how you want the Flex UI, CRM Data, or any other data, to change. You can register events before or after an action fires, or even replace the behavior of an Action.

Learn more about UI actions in our [API documentation](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/ui-actions/Actions/).

## Register and Invoke an Action

```javascript
Actions.registerAction(name: string, action: ActionFunction, payloadUpdate?: PayloadUpdateFunction)
```

Registers a named action and provides the code that should be run when invoking it. The *payloadUpdate* method is optional, and used for triggering a callback to modify the payload given to action invocation.

```javascript
Actions.invokeAction(name: string)
```

Invokes a named action. Returns a Promise.

```javascript
Actions.addListener(name: string, action: ActionFunction)
```

Implements a custom function to be triggered either Before or After a specific Action.

## Add and Remove Event Listeners

You can add and remove event listeners.

**Events supported:**

*before\[eventName]* (for example `"beforeAcceptTask"`)\
Called when a named action is triggered, but before the action body is run. You can abort the action that is provided with event body.

*after\[eventName]*\
Called after the action has stopped executing.

Note, the `afterLogout` event is not supported. Once the Worker has logged out, they will be returned to the Flex login screen.

## Replace an Action

```javascript
Actions.replaceAction(name: string, action: ReplacedActionFunction)
```

Replaces the default implementation of a named action and provides an alternative implementation. The replaced action will be called with the same parameters as the original implementation, so you can add additional logic, then invoke the original action in your replacement function.

## Common use cases and examples

### Add an Action after a Task is accepted

Raises a JavaScript alert after an Agent has clicked to accept any Task.

```javascript
flex.Actions.addListener(
  "afterAcceptTask",
  (payload) => alert("Triggered after event AcceptTask")
);
```

### Ask for confirmation before accepting a Task

Generates a prompt before Task Acceptance; prevent that Action from running with an abort command if the user doesn't confirm.

```javascript
flex.Actions.addListener(
  "beforeAcceptTask",
  (payload, abortFunction) => {
    alert("Triggered before event AcceptTask");
    if (!window.confirm("Are you sure you want to accept the task?")) {
      abortFunction();
  }
});
```

### Detect a running call on Flex UI 2.0

Listens for an incoming call within the Flex UI and logs a message to the web console.

```javascript
Actions.addListener("beforeAcceptTask", (payload) => {
    if (payload.task.taskChannelUniqueName === 'voice') {
        console.log("Call detected");
    }
});
```

### Customize an existing Action

Replaces the original Action for `AcceptTask`. Injects custom logic to alert about the replacement, but executes the original Action.

```javascript
flex.Actions.replaceAction("AcceptTask", (payload, original) => {
  return new Promise((resolve, reject) => {
    alert("I have replaced this Action");
    resolve();
  }).then(() => original(payload));
});

```

### Register a custom Action

Registers a custom Action called `MyAction`, which makes an HTTP request. We then add a listener to the action `CompleteTask` which then invokes this custom Action. For example this could be used to update your CRM system.

```javascript
flex.Actions.registerAction("MyAction", (payload) => {
  return 
    fetch("https://my.server.backend.com/test")
      .then(response => {
        alert("Triggered MyAction with response " + JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
});


flex.Actions.addListener("afterCompleteTask", (payload) => {
  return flex.Actions.invokeAction("MyAction");
});
```

### Send a message after a Task is completed

Sends a post-conversation message once the task is in a wrap-up state. Could be used to send a survey, or notify a user that the agent closed the session.

```javascript
flex.Actions.replaceAction("WrapupTask", (payload, original) => {
  // Only alter chat tasks:
  if(payload.task.taskChannelUniqueName !== "chat") {
    original(payload);
  } else {
    return new Promise((resolve, reject) => {
      // Send the message:
      flex.Actions.invokeAction("SendMessage", {
        body: 'Thanks for chatting. Your session is now closed.',
        conversationSid: payload.task.attributes.conversationSid
      }).then((response) => {
        // Wait until the message is sent to wrap-up the task:
        resolve(original(payload));
      });
    });
  }
}); 
```

### Send a rich content message

Sends a rich content message using a content template.

| Name                | Description                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `conversationSid`   | The SID of the conversation to send the message in.                                                          |
| `contentSid`        | The content template SID to send.                                                                            |
| `contentVariables`  | Optional array of name/value pairs for variables. If you don't pass any values, the default values are used. |
| `messageAttributes` | Optional parameter for setting message attributes.                                                           |

#### Example

```javascript
Actions.invokeAction("SendRichContentMessage", { 
     conversationSid: "unique_conversation_sid", 
     contentSid: "unique_content_template_sid" 
});

// with variables
Actions.invokeAction("SendRichContentMessage", {
     conversationSid: "unique_conversation_sid",
     contentSid: "unique_content_template_sid",
     contentVariables: [{ name: "variable_name", value: "variable_value" }]
);

```
