# Developer Guide to Troubleshooting the Flex UI

Your development team can only respond to the errors you know about. When your users encounter an issue when using Flex, it's important to log those errors in a way that provides visibility and a path to resolve the issue. With the Flex UI and Twilio Console debugging tools, you can build systems and processes that ensure that key issues get escalated appropriately.

Consider using a combination of the following strategies in order to monitor and maintain your Flex application.

## Debugging from within the Flex UI

You can retrieve error reports and logs directly in the Flex UI. This strategy is most useful for retroactive debugging: agents and admins see issues in the UI and are able to get access to logs as they see errors.

Errors get exposed from:

* Flex Initialization
* Warning/Error Notifications
* The Debugger UI

Each of these errors alerts users that something is going wrong. The Debugger UI can then be used to download error reports.

Read more in the [Troubleshooting and Debugging End User Guide](/docs/flex/end-user-guide/troubleshooting).

## Send error reports to your own issue reporting system

The `FlexError` object and the `Monitor` methods allow you to integrate Flex UI debugging into your existing issue reporting workflows. These methods allow you to proactively address Flex errors with maximum context.

Read more in [the Errors and Debugging Developer Documentation](/docs/flex/developer/ui/errors-and-debugging).

## Send errors to the Twilio Console Debugger

Another option is to send error reports directly to the Twilio Console Debugger. This service aggregates all additional errors or warnings that may be triggered from the Twilio communications APIs. By debugging to the console you can:

* Send errors out of the UI and into a centralized location
* Receive email notifications when alerts repeatedly appear
* Passthrough errors to other services using [the debugging events webhook](/docs/usage/troubleshooting/debugging-event-webhooks)

Error reports in the Twilio Debugger don't have a full timeline and log. However, these alerts are useful to capture and identify issues automatically without relying on user-submitted reports.

Read more about how to [set up an integration with the Twilio Console Debugger](/docs/flex/end-user-guide/debugger).

## Send error data directly to Twilio

Starting from [@twilio/flex-ui@1.26.0](/docs/flex/release-notes/ui-release-notes), end user error data is sent to Twilio by default. This helps us continuously improve the quality of the application and allows our customer support and product development teams to more effectively support you in your development.

By default, data in error events does not contain nor is treated as **Personally Identifiable Information (PII)**. However, the Flex UI will also catch and report on errors thrown by plugins. As a result, you should take extra precaution when developing your customizations. Ensure that your errors do not contain directly identifying information (aka personally identifiable information or PII) like a **person's name, home address, email or phone number, etc**.

If, however, your error reports may contain sensitive data or you do not wish to share this data with Twilio, you can turn off error reporting by [submitting a ticket](https://help.twilio.com/) to Twilio support.

## Next Steps

* Get [an overview of the Flex UI](/docs/flex/developer/ui)
* Expose custom errors via the Flex Notification Framework
* Build your [first Flex Plugin](/docs/flex/quickstart/getting-started-plugin)
