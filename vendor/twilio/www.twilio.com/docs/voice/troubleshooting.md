# Troubleshooting Voice Calls

## Debugging Tools

Twilio offers several tools for investigating the interaction between Twilio and your application. If a call fails to go through, or your voice call behaves unexpectedly, the Debugger and Request Inspector should be your first stops for debugging.

### Logs

Found in your Twilio console, the [Logs](https://www.twilio.com/console/dev-tools/debugger) contain detailed log of activities within your application, from error logs to specific logs around the APIs you use. These logs can help you dive deeper and understand which Twilio resources were impacted (and by whom).

To get to the debugger, open the console navigation and toggle to the **Monitor** tab and select **Logs** to access your error logs:

![Monitor tab selected with Error logs expanded showing error details and graph.](https://docs-resources.prod.twilio.com/723a65908f3d4a964ab8ca488eb3424fe3fdf2b272204f9572d1276ef433024e.png)

Once in the error logs, you can dig into detailed logs, such as these HTTP retrieval failures, to understand the root cause of your problem.

![Graph showing error events on 07/07 and 07/12 with HTTP retrieval failures listed below.](https://docs-resources.prod.twilio.com/ead3da0230fc685cd942be7ff578c4df1a120be28588aeba5ac81abdd2b2b895.png)

### Alert Triggers

You can [set your own Alert triggers](https://www.twilio.com/console/dev-tools/triggers/alert) via the console. These will notify you via webhook or email when an error occurs on your account.

### Product-specific logs

The Twilio Console logs also provide you with information regarding the requests Twilio makes to your application and the responses Twilio receives. You will be able to access logs for any Twilio product you work with. Twilio keeps these logs for 90 days.

* Log into your Twilio account
* Access your call logs by navigating the **Monitor** tab, expanding **Logs**, and clicking on the product you need to examine, like Calls or Messaging logs.

![Select 'Logs' under 'Monitor' and click 'Messaging' in Twilio Console.](https://docs-resources.prod.twilio.com/27b87f7ed9a15fe64b549f37cd4e74e4d6d79c38a18cc1ce1758ea0a4c29f550.png)

![Programmable Messaging Logs with search fields for Message SID, date, time, and status; shows a canceled message entry.](https://docs-resources.prod.twilio.com/d1ecf96775bef2e1dda467d9782728ee39eeb7b48ba22365e99837e2e1867e66.png)

* Once you're in your voice logs, find the message where the problem occurred. Click the hyperlinked date to dig down into the details for this message.

![Twilio message details showing message SID, direction, cost, and body text 'Hello'.](https://docs-resources.prod.twilio.com/249ac069a5ba83b4530fe4f97afdd03f6a61975067035bf8e480cb73f399e32d.png)

Now we can inspect the request!

If any HTTP requests were logged for the event you're investigating, you will find the **Request Inspector** at the bottom of the page, where you can see all of the data, response headers, and any errors that may have been returned.

![Messaging request inspector showing GET request with error code 21401 and message 'Invalid phonenumber.'.](https://docs-resources.prod.twilio.com/d967e3552dc1174a61646a0ed8b6fdd730927644857c6e8467e5dc7a388aa518.jpg)

In the above screenshot, Twilio made a request to demo.twilio.com but failed to send the message to the end user due to an invalid phone number.

### Error Codes

All Twilio-generated error codes are documented [here](/docs/api/errors). Find your error code and dig into causes and possible solutions.

## Some Common Issues

### "An application error has occurred" on your call

An 'application error' means that the code Twilio is trying to fetch at the URL specified on your servers is either unavailable or has errors in it. You can check the URL for a given phone number via your [console](https://www.twilio.com/console/phone-numbers) or within your application's instructions for handling a call.

![Voice and fax settings with URL configured for incoming calls via webhook.](https://docs-resources.prod.twilio.com/b99b0e8d1408a31ad6512dd90d4707b43afbfec31f9e8ef6b819fab80e2469d5.png)

If you see this error, check your Twilio account's [debugger logs](https://www.twilio.com/console/dev-tools/debugger) for more details.

*Note: Your server must be publicly accessible for Twilio to reach it.* If you're building and testing locally, we recommend you use [ngrok](https://ngrok.com/) for testing your webhooks. You can [follow this guide](https://www.twilio.com/blog/test-your-webhooks-locally-with-ngrok.html) to learn how to use ngrok with Twilio.

### How to Stop Receiving Calls

If you don't want to receive any phone calls with your Twilio phone number, you must remove the Voice Request URL from your [Twilio phone number](https://1console.twilio.com/go?to=/account/account/__account__/us1/senders-hub/list/phone-numbers/inventory) and leave that field blank. Without a Voice Request URL, this phone number is considered 'out of service' for inbound calls. You will not be charged for any incoming calls, nor will these calls be received and logged in your account.

To reject phone calls coming from specific phone numbers, use the [\<Reject>](/docs/voice/twiml/reject) verb. As long as `<Reject>` is the first verb in your response to the call, Twilio will not answer the call. If any other TwiML verbs are used before `<Reject>`, your application will receive the call and your account will be billed.

### Issues with \<Gather>

There is no test which can be done to definitively determine the origin of a problem with [\<Gather>](/docs/voice/twiml/gather). The best approach to take is to do everything possible to isolate the issue. Try the following:

1. Use several different phones from different carriers. If the issue occurs reliably, but only on phones from a particular carrier, you might want to contact that carrier directly to report the issue. If the problem occurs reliably on multiple telephones from multiple service providers, [contact Twilio support](https://www.twilio.com/user/account/support/ticket/create).
2. If the issue happens only intermittently, it may be due to environmental factors or the style of use from a particular user. Try to see if there is a particular user, phone or location that experiences this issue more often.
3. Check how your application handles `<Gather>`. `<Gather>` may receive all of the inputs from your user, but your application may not properly handle the request at the URL specified in `<Gather action="">`. Be sure to check that `action=""` points to the correct location, and that your specified location can accept requests made with the method you are using.

For more help implementing \<Gather>, see [this guide](/docs/voice/tutorials/how-to-gather-user-input-via-keypad).

### International Issues

Twilio supports calling worldwide, but international permissions must be explicitly enabled. You can enable international permissions [here](https://www.twilio.com/console/voice/settings/geo-permissions).

If your account is not yet set up for international dialing, you should [request access](https://www.twilio.com/console/voice/settings/geo-permissions/request). After your account has been granted access, revisit the [Global Permissions page](https://www.twilio.com/console/voice/settings/geo-permissions) and enable any country you wish to call.

### Recording Resource Exceptions

The Recording API may occasionally throw an exception along the lines of:

```xml
Twilio\Exceptions\RestException: [HTTP 400] Unable to create record: Requested resource is not eligible for recording (uncaught exception) at /path/to/your/twilio/code.file
```

The call resource could be ineligible for recording for a number of reasons, but it typically means that you're trying to record a call that has already been completed (for example, both parties hung up) or a call that never established (for example, a failed call, or a call in which the caller hung up before media started flowing.)

You can get more detailed information about the phone call [by using the REST API](/docs/voice/api/call-resource#fetch-a-call-resource) or through your call logs in Twilio Console. In Twilio Console, go to **Monitor** > **Logs** > **Voice** > **[Calls](https://1console.twilio.com/go?to=/account/__account__/us1/logs/voice/calls)**. You can also find the logs in the [legacy Console](https://www.twilio.com/console/voice/calls/logs).

## Other Tools and Add-Ons

### Twilio Status

You can always check the real-time status of Twilio systems via the [Twilio status page](https://status.twilio.com/). If anything is wrong on our end, you'll see it there.

### Voice Insights and Add-Ons

If you're looking for additional insights into your voice calls, you may want to consider [Voice Insights](https://www.twilio.com/en-us/voice/insights), which gives you use real-time data about call quality, carrier analytics, and [WebRTC](/docs/glossary/what-is-webrtc) performance to proactively assist customers and minimize support time.

## Contact Support

If you're still having trouble with your Twilio Voice calls, you can reach out to our [support team](https://help.twilio.com/) for help.
