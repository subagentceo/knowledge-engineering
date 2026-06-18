# Send Appointment Reminders with Twilio Studio

Appointment reminders are a breeze with Twilio Studio! Let's look at how to build a Flow that hooks into your application via REST API and sends a reminder SMS with a confirmation message.

https://www.youtube.com/watch?v=vl0FbbZBADQ

## Create Your Flow

We'll start with a fresh Twilio Studio Flow. Log into your Twilio account and navigate to the [Studio Dashboard](https://www.twilio.com/console/studio/), then tap the **+** icon to create a new Flow. You can name your Flow anything you like — this guide will use `Appointment Reminder`. Click on the **Next** button.

![Appointment Reminder Flow.](https://docs-resources.prod.twilio.com/537df839d21cbfd2237306eaa080465fff5a8d09f66637086e64d421698b55ce.png)

You'll notice that the Studio Canvas comes with a widget already in place. The **[Trigger (Start) widget](/docs/studio/widget-library/trigger-start)** starts the Flow when the trigger you specify is fired. In this case, the REST API trigger will be used to start the Flow's Execution. See the [REST API section of the Studio User Guide](/docs/studio) to learn how to make these calls.

![Twilio Studio Tutorial Appointment Reminders arrow pointing to REST API trigger within the Trigger (Start) widget.](https://docs-resources.prod.twilio.com/d5ba4463ac2fae508886663de27fb6956599ae4f8ca69c2461b228fed0960303.png)

## Send & Wait For Reply

Start by adding a **[Send & Wait For Reply widget](/docs/studio/widget-library/send-wait-reply)** to the Canvas and connecting it to the REST API trigger by dragging the red dot to the grey dot in the corner of the new widget. You can use this widget to send an SMS to the user and wait for a response message. In this case, you will use a value (time) that was passed in using the REST API trigger. You can reference values passed in from a REST API trigger using the Liquid variable `{{flow.data.<valueName>}}`.

Under the **MESSAGE BODY** field of the widget, input "Your appointment is coming up on `{{flow.data.appointment_time}}`. Please reply 1 to confirm and 2 to cancel." Studio supports the [Liquid template language](https://shopify.github.io/liquid/), which is a fancy way of saying "a way to help you load dynamic content throughout your Flow." You are telling Studio that you would like it to dynamically interpret the text between the two curly braces based on something. In this case, the `appointment_time` value that was passed in from your REST API request will be dynamically interpreted.

![Twilio Studio Appointment Reminders with confirm\_appt widget configured, linked to REST API trigger.](https://docs-resources.prod.twilio.com/f5709a12ee332d9a71272ed13077d4f81421c49b7270cb72646acab3e9827231.png)

## Split Based on Reply

Assume the user replies to the text message to confirm or cancel their appointment. You need to add some logic that will help us know which choice the user would like to make. Use the **[Split Based On… widget](/docs/studio/widget-library/split-based-on)** to help handle that. Drag it onto the Canvas and connect it to the dangling Reply dot from your Send & Wait For Reply widget.

![Use Split Based On... widget on Canvas to evaluate responses to Send & Wait For Reply widget.](https://docs-resources.prod.twilio.com/1cabe04d68cdadd519b15c919a3229f3ad2664126284ef5b63756fd020a58a56.png)

First, you'll need to configure the variable the Split Based On... widget will evaluate. In this case, you are concerned with the user's reply, so select `confirm_appt` and then `inbound.Body` from the dropdown in the configuration panel (yours may have a different name if your Send & Wait For Reply widget is not called `confirm_appt`). This variable represents the incoming response message sent by the user.

![Twilio Studio Tutorial Appointment Reminders Split Based On Confirmation Configuration.](https://docs-resources.prod.twilio.com/d0357824f96853a47224a6171973887aa1ee7508beaa1ebe2154e057bf12d170.png)

## Set Transition Conditions

Next, you'll need to declare the choices you're looking for in those text replies — the digits 1 and 2. Click the red **New** button at the bottom of the Split widget to reveal the Transition On… dropdown menu. Select **Condition Matches** to create a new condition.

![Twilio Studio Tutorial Appointment Reminders Split Based On Confirmation Add Condition.](https://docs-resources.prod.twilio.com/2264563f480b3f29eb1acbcdbba9d7b45fb14378e7fcd7d02d94fd7701c4e5a3.png)

In the right sidebar, find the new condition that you just created, and select Equal To from the dropdown. Set the value to 1 to confirm the appointment. Save the new condition and it will appear on the widget as a transition. Rename the condition to 1.

![Twilio Studio Tutorial Appointment Reminders Split Based On Confirmation Set 1 Condition.](https://docs-resources.prod.twilio.com/b070fd762743719f0681e8aee973dcd34dd2c2bcdc484c5e370512f03ea32af0.png)

Next, you'll need a condition for if the user has pressed 2 to cancel the appointment. Just as with the first condition, click **New** on the Split Based On... widget and select **Condition Matches**. Then set the value equal to 2 in the sidebar, click **Save**, and rename to 2. Your Split Based On... widget should now have the transitions `No Condition Matches`, `1`, and `2` dangling from the bottom.

![Twilio Studio Tutorial Appointment Reminders Split Based On Confirmation All Transitions.](https://docs-resources.prod.twilio.com/f67a2946a18dbb621a0e147d6eaeea24144d2a6a03fc28293d68f8d77181b063.png)

## Make an HTTP Request

Next, you are going to want to handle the appointment confirmation by making a request back to your servers. You can do this by dragging an **[Make HTTP Request widget](/docs/studio/widget-library/http-request)** onto the Canvas and filling in the required **Request Method** and **Request URL** fields in the right sidebar. In this example, `http://example.com` will be used but you'll want to set the **Request URL** to the appropriate endpoint for your application. If you'd like to send a request body or parameters, you may set those in the configuration for the Make HTTP Request widget as well.

![Twilio Studio Tutorial Appointment Reminders Confirm HTTP Request widget on Canvas.](https://docs-resources.prod.twilio.com/c92d47ee6d964e25a6f62d91588c4d2a4ea510bcff967c199e7f4cc992bd6b11.png)

When the request successfully completes, you want to text the user with a thank you. Drag a **[Send Message widget](/docs/studio/widget-library/send-message)** onto the Canvas and populate the **Message Body** field with your note for the user.

![Twilio Studio Tutorial Appointment Reminders Thank You Send Message widget.](https://docs-resources.prod.twilio.com/6a8a7b2ae2e73c9afa866a48846c597a5168c827ef19f70b6d4a98da51f5d83d.png)

## Cancellation Path

Now it's time to do the same steps over again, but this time for the cancellation. Drag a Make HTTP Request widget onto the Canvas and hook it to the dangling 2 from the Split Based On... widget, make a request to your cancellation endpoint, and send an acknowledgment message to the user.

![Twilio Studio Tutorial Appointment Reminders full widget layout shown after connecting both respective HTTP widgets.](https://docs-resources.prod.twilio.com/9d5e233cd741b4f38d1bb757cbf532d24455369d5ffb898a9b3a96b5d7f4f11f.png)

## No Match Condition

But what if the user enters text besides 1 or 2 (the confirmation and cancellation conditions)? We can take advantage of the built-in `No Condition Matches` condition and prompt the user with the reminder again. Drag a Send Message widget onto the Canvas and connect it to the No Condition Matches dot, then enter the error message of your choosing. You can then re-prompt the user with the original appointment reminder by dragging the `Sent` dot on the Send Message widget to the original Send & Wait For Reply widget.

![Twilio Studio Tutorial Appointment Reminders No Condition Send Message redirects back to the Send & Wait For Reply widget.](https://docs-resources.prod.twilio.com/a085058e24e12c031cec8350cf1ad123e4cf7662805453b23e035a1903ed6d6d.png)

## The Finished Product

The final state of the Canvas is that a Trigger (Start) widget takes a REST API request, prompts the user to confirm or cancel with a Send & Wait For Reply widget, routes responses through a Split Based On… widget, uses HTTP Request widgets to `POST` cancellations and confirmations back to your own endpoint, and uses Send Message widgets to acknowledge the user's response.

![Twilio Studio Tutorial Appointment Reminders Entire Flow on the Canvas.](https://docs-resources.prod.twilio.com/b108bca5552e6f7e618d5e876e158487065292d8b64e4f84264f509a1382b3d8.png)

Time to test it out! You can make a request from your API to Studio and kick off this appointment reminder flow, then text back to confirm or cancel. You can use the following `curl` command to trigger this flow:

```shell
curl -X POST "https://studio.twilio.com/v1/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Executions" -d "To=${MY_PHONE_NUMBER}" -d "From=${FROM_NUMBER}" -d "Parameters={\"appointment_time\": \"Tuesday at 6PM\"}" -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

For more information about parameters, and other example of `curl` requests, see the [REST API section of the Studio User Guide](/docs/studio). Get ready to have your calendar perfectly synced with your clients!
