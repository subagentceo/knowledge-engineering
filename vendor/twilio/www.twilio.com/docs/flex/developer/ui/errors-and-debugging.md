# Error Handling and Debugging

The Flex UI provides the FlexError class, the FlexError event, and the Error Reporting UI to make it easier to notice and report issues. Read on to learn more about these tools and how they affect your development process.

## The FlexError Class

The FlexError class is an extension of normal JavaScript Error class, with added context. This class includes more info on errors to help pinpoint problems and consolidate the Flex UI API. For the full reference of the class, visit our API documentation.

You'll see FlexErrors in two main contexts:

### FlexError in an Action Invocation

If a [Flex Action](/docs/flex/developer/ui/use-ui-actions) called by your Plugin fails, it throws a FlexError in its promise rejection. Depending on the error, the FlexError can wrap another error, like an error thrown by the backend.

```csharp
try {
    await Flex.Actions.invokeAction("SomeAction", payload)
} catch(e){
    // e is FlexError
}
```

### Listening to the flexError event

Whenever the Flex UI creates an error in its code, whether it throws it further or not, its creation is reported by `flexError` event. You can subscribe to that event for your own reporting purposes. The event is strictly informative. The user's actions in the event handler will not have any bearing on how the Flex UI deals with the error itself.

```csharp
manager.events.addListener("flexError", (error) => {
    // do your own handling/reporting
});
```

## Get error reports and logs

> \[!WARNING]
>
> Client-side logs or errors are allowed to contain PII ([Personally Identifiable Information](/docs/glossary/what-is-personally-identifiable-information-pii)) because they are transient and are not saved beyond a user session. By exporting them, however, PII is also exported and saved to the file. Please take proper precautions to protect your customers' data when saving and sharing this file.

Error reports and logs mentioned in the [Error UI End User Docs](/docs/flex/end-user-guide/troubleshooting) can also be retrieved programmatically. `Flex.Monitor.getLogs` returns the current logs and `Flex.Monitor.getError` returns all recorded errors in an array. You can use these methods to implement special reporting or report handling.

```javascript
import { Monitor } from "@twilio/flex-ui";

Monitor.getErrors(); // returns { errors: [Monitor.FlexErrorJSON] }
Monitor.getLogs(); // returns { logs: 'string' }

```

For the full reference of Monitor API, check out our API documentation.

### Flex UI Degraded mode and Client Manager

Starting from [Flex UI v 1.31](/docs/flex/release-notes/ui-release-notes#v-1310) Flex UI will be able to initialize and function in [Degraded mode](/docs/flex/end-user-guide/troubleshooting#flex-ui-degraded-mode). You can find the list of components that Flex UI relies on and can startup in degraded mode in our [API reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/overview/ClientManagerHelpers/).

Flex UI also now exposes `ClientManager` APIs that can be used to simulate one or more sdks running in a degraded state.

These APIs can be used for testing the behavior of Flex UI and Flex plugins to make sure any custom logic is handled for specific degraded Client scenarios.

To test specific Client degradations, the `forceDegraded` method can be used to degrade the required Client(s). Since the Client Manager degrades a client during its initialization, the `forceDegraded` method can only be used before the start of the Flex manager initialization.

To reset the force degraded clients, users can reload the page after removing the `forceDegraded` method call. For more detailed description of the new API's, check out our [Flex UI API Reference for ClientManager](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/overview/ClientManagerHelpers/).

## Next Steps

* Experiment with the [Actions Framework](/docs/flex/developer/ui/use-ui-actions) to practice error handling
* Develop a new [Flex Plugin](/docs/flex/quickstart/getting-started-plugin) and listen for the flexError event
* Set up an [integration with the Twilio Debugger](/docs/flex/end-user-guide/debugger)
