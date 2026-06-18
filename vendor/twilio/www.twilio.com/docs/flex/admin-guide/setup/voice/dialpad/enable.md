# Enable the Flex Dialpad

The Flex Dialpad allows agents to place outbound calls within the Flex UI.

> \[!WARNING]
>
> Flex Dialpad doesn't support agent-to-agent direct calls or external transfers yet. If you need these functions, we recommend you continue to use the experimental Legacy Dialpad. [Information about which Dialpad to use can be found here.](/docs/flex/admin-guide/setup/voice/dialpad-limitations#flex-vs-legacy-dialpad)

## Turn on the Flex Dialpad in Twilio Console

First, ensure that you are using v1.18.0 or higher of Flex UI. You can check your Flex UI version on the [**Flex UI versions**](https://console.twilio.com/us1/develop/flex/settings/ui-versions) page.

* In Twilio Console, navigate to the [Flex Voice Settings page](https://console.twilio.com/us1/develop/flex/channels/voice)
* Check **Enabled** under **Enable Dialpad**
* Add the default Dialpad configuration for outbound calls:
  * **Task queue**: The default queue to use when categorizing outbound calls. The agent placing an outbound call must be part of this queue. The outbound call won't be placed in the queue, but the assigned task queue will be used in reporting about outbound calls. This default can be overridden at the time of an outbound call.
  * **TaskRouter workflow**: The [TaskRouter workflow](/docs/taskrouter/api/workflow) you want to use for outbound calls. The workflow will be used to determine Task Reservation Timeout and Assignment Callback URL. Routing rules will be ignored, and the task will be assigned to the agent using the Dialpad.
  * **Country**: The default country code for your Dialpad. This default can be overridden at the time of an outbound call.
* Click **Save** at the bottom of the page

Next, [learn how to place outbound calls with the Flex Dialpad after you've enabled it.](/docs/flex/end-user-guide/dialpad-use)

## Self-hosted Flex: Upgrade the Flex UI Node module

If you're using self-hosted Flex, you'll also need to upgrade the [Flex UI](/docs/flex/developer/ui) to v1.18.0 to render the Flex Dialpad in your contact center. To use the outbound dialing capabilities in Flex, you'll need **NPM install permissions** for your Flex codebase.

### Update your Flex UI Node module

1. In your Flex Project, run the following command to install the most recent version of the Flex UI.

```bash
npm install @twilio/flex-ui@1.18.0
```

## Next steps

Your Flex UI should now have natively supported outbound dialing! Now you can [modify your settings](/docs/flex/admin-guide/setup/voice/dialpad), learn about the known [limitations of the dialer](/docs/flex/admin-guide/setup/voice/dialpad-limitations), or [start using your updated Flex UI](/docs/flex/end-user-guide/dialpad-use).
