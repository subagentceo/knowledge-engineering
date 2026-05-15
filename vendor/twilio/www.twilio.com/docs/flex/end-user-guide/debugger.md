# Debugger Integration with Flex

## Overview

You can use the [Debugger](https://www.twilio.com/console/debugger) to troubleshoot uncaught exceptions and errors in Flex UI and Plugins. You can access the Debugger in Twilio Console to view a detailed log of activity within your application. Using this log can help you better understand how Flex UI errors impacted your Twilio resources.

With the integration, you can access the following:

* Uncaught exceptions from Flex UI
* `console.error` messages

## Turn on Debugger integration

Debugger integration is turned on by default. To turn it off or back on, use the **Debugger Integration** setting on the [**Opt-in features**](https://console.twilio.com/us1/develop/flex/settings/features) page in Twilio Console.

## Write logs to the Debugger

With the Debugger Integration turned on, Flex automatically logs any uncaught JavaScript exceptions. These include details about an exception, the logged-in user, and the version of Flex UI running when the exception occurred.

You can trigger custom debugger notifications through `console.error` statements included in your code.

```javascript
console.error('Unable to connect to MyCRM: %s', myCRMUrl);
```

> \[!WARNING]
>
> We don't currently support additional levels of logging, like `debug`, `log`, `info`, and `warn`.

## Access error logs

To view the error logs:

From Twilio Console, go to **Monitor** > **Logs** > **Errors** > **Error logs**.

Within the error logs, you can view errors and warnings.

![Twilio error logs with graph showing events on 11/24 and 11/30, listing errors related to TaskRouter.](https://docs-resources.prod.twilio.com/0171bda633a03bef43975a28a7f9fa79d0b11e5223e33b2b04ac91c5b7050cc8.png)

Click a debug event for a more detailed view of the event.

![Uncaught Flex JavaScript Exception with details including version 1.14.1 and connection error to MyCRM.](https://docs-resources.prod.twilio.com/0d57208276bb9b79640bc59c07607f29b21cc1c15ec5804f54fba6b6b5c8a3b2.png)

In addition to the `user` information contained within the notification, the Resource Sid represents the TaskRouter Worker for that user.

## What's next?

Learn more about customizing the settings in the Debugger and other ways to debug your Flex applications:

* [Configure webhooks for real-time error notifications](/docs/usage/troubleshooting/debugging-event-webhooks)
* [Debug your Flex Plugin locally using VS Code](/docs/flex/developer/plugins/debugging-with-vscode)
