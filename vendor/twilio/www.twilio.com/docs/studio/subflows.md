# Subflows

## Studio Subflows overview

With Studio Subflows, you can break large, complex Flows into smaller Flows and link them together. Subflows let you:

* Reuse functionality across multiple branches and multiple Flows
* Transfer control of an Execution from one Flow to another

### Use cases

Common use cases for Subflows include encapsulating and reusing common functionality, organizing complex Flows into logical subsets, and passing live Executions between Flows.

Examples:

* Create a reusable logging Subflow to `POST` data back to your own systems.
* Transfer a Contact to another self-contained IVR or chatbot.
* Encapsulate the gathering and verifying of a Contact's identity.
* Pass a Contact's language preference to a Subflow to load the localized content dynamically.

### Additional benefits

Subflows also provide secondary benefits that improve workflow development:

* Reduce complexity for large Flows
* Remove the need to copy and paste widgets in multiple places
* Enable independent building and testing of new functionality
* Work with the [Flows API](/docs/studio/rest-api/v2/flow), just like a regular Studio Flow

## How it works

Subflows are regular Flows that use the Subflow trigger type to attach widgets. Widgets connected to the Subflow trigger only run when the Flow is invoked as a Subflow.

A Subflow is invoked from another Flow by the [Run Subflow widget](/docs/studio/widget-library/run-subflow). The Flow that invokes a Subflow is called the parent Flow.

Execution control passes from the parent Flow to the Subflow. When the Subflow completes, control is passed back to the parent Flow.

> \[!NOTE]
>
> A Subflow's definition is loaded as part of the parent Flow at runtime, and all the steps of the Subflow and parent Flow are run as a single Execution. This means all your Subflow debugging logs are included in the parent logs, and there are no additional per-Execution fees for using Subflows.

## Select the Subflow and Revision

To select the Subflow you wish to run, configure the Run Subflow widget to target an existing Flow where you've connected widgets to the Subflow trigger. Then, specify the Flow Revision that should be executed at runtime. You can select an explicit revision number, or select the **Latest Draft Revision**or **Latest Published Revision**, in which Studio will automatically select the correct revision at runtime.

The actual revision used at runtime is determined by the status of the parent Flow, the status of the target Subflow, and whether the Execution was started by a test user. See [Testing Subflows](/docs/studio/subflows#testing-subflows) for details of runtime revision selection.

**Note**: Multiple references to the same Subflow within a parent Flow must all target the same Flow Revision.

## Passing Variables between Flows

To enhance the programmability of Subflows, Studio can pass variables into a Subflow, and the Subflow can pass variables back to the parent Flow.

### From parent Flow to Subflow

A parent Flow can pass custom parameters into the Subflow at runtime as key/value pairs using the Run Subflow widget.

**Note**: Trigger data from the parent is automatically copied into the Subflow at runtime (for example, `{{trigger.call.CallSid}}`).

Those parameters can then be referenced at runtime inside the Subflow with the trigger object: `{{trigger.parent.parameters.foo}}`

### From Subflow back to parent Flow

Similarly, a Subflow can pass variables back to the parent Flow upon completion using the Set Variables widget within the Subflow.

Those variables can then be referenced at runtime inside the parent Flow with the Run Subflow widget namespace: `{{widgets.subflow_1.bar}}`

## Testing Subflows

Subflows can be tested from a parent Flow, or they can be tested independently of a parent Flow. To test a Subflow independently, connect its widgets to one of the other trigger types (for example, Incoming Call) and invoke the Flow using that trigger type:)

### Test users

When [testing new drafts](/docs/studio/user-guide#testing-draft-flows), only the [test users](/docs/studio/rest-api/v2/test-user) of the parent Flow are used for Subflow execution. Test users specified on a Subflow are ignored.

### Drafts

You can test drafts of a Subflow by selecting **Latest Draft Revision** in the **Run Subflow** widget. Use a test user to test the parent Flow and Studio will automatically select the latest draft of the Subflow. All other users will receive the latest published revision of the Subflow.

### Debugging logs

A Subflow executes as part of the parent Flow, so all the Subflow's Step logs are listed inline with the parent Flow's logs.

Use a **Set Variables** widget in the Subflow to expose internal context details to the parent Flow's logs for easier debugging.

## Splitting an existing Flow into a Subflow

To split out a set of widgets from an existing Flow into a Subflow, duplicate the Flow and use the new copy as the Subflow. In the newly created Subflow, delete the widgets from the original that aren't needed. Then connect the remaining widgets to the Subflow trigger.

In the parent Flow, delete the widgets that were copied to the Subflow and add a **Run Subflow** widget to connect the parent to the Subflow.

## Limitations

Subflows have the following limitations:

* A parent Flow can have up to 150 Subflow widgets, which can reference up to 50 unique Subflow definitions.
* You can define up to 2,000 total widgets, which includes the parent Flow and all linked Subflow instances. If you need to use more than 2,000 widgets in a single Flow, [contact Twilio Support](https://www.twilio.com/help/contact).
* All Run Subflow widgets referencing the same underlying Flow definition must target the same Revision.
* You can define only one level of Subflow nesting. This means that Subflows can't call other Subflows.
* Subflow Flow SIDs and Flow Revisions don't support Liquid expressions. You must define this information statically in the parent Flow at design time.
* You can reference only simple values when passing data in and out of a Subflow.
* The 1,000-step limit per Execution includes Subflow steps.
