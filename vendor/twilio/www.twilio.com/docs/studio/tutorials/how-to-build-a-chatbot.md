# Build a Chatbot with Twilio Studio

Chatbots help users accomplish tasks through conversation. This tutorial shows you how to build a Flow that responds to incoming text messages and guides users through ordering a coffee.

https://www.youtube.com/watch?v=VRxirse1UfQ

## Prerequisites

Before you begin, ensure you meet the following prerequisites. You can skip to [Create your Flow](#create-your-flow) if you've already done these steps.

Complete the following steps before you begin:

* Sign up for a Twilio account. You can [create a free account](https://www.twilio.com/try-twilio) if you don't have one already.
* Purchase a Twilio phone number. For instructions, see [Phone Numbers](/docs/numbers-and-senders/phone-number-senders). The purchasing process varies by region.
* Familiarity with [Twilio Functions](/docs/serverless/functions-assets/functions).

> \[!WARNING]
>
> This demo tutorial is best suited for use with a single Twilio Phone number.
> Due to [Application-to-Person 10-digit long code (A2P 10DLC) compliance](/docs/conversations-classic/a2p-10dlc-conversations#what-is-a2p-10dlc) requirements, there are additional steps required. You must complete these steps before your purchased phone number can be used for A2P messaging over 10-digit long codes.
> Note that if you use [Twilio Messaging Services](/docs/messaging/services), you can't use the Make Outgoing Call widget in this Flow.

## Create your Flow

You'll create a Twilio Studio Flow from a Twilio starter template in this tutorial. By the end, you'll understand how to construct a chatbot with minimal building blocks in place. You can also use the **Messaging Chatbot** template to begin with most of the pieces already in place.

Follow these steps to create your Flow:

1. Log into your Twilio account and go to the [Studio Dashboard](https://www.twilio.com/console/studio/).
2. Click **Create a flow**.
3. A modal appears where you can name your Flow; this tutorial uses Barista Bot.
4. Select **Next**.
5. The modal will load several template options. Each template provides a different foundation of building blocks.
6. Select **Start from scratch** to follow along with the rest of this tutorial. You can also select **Messaging Chatbot** to start with most of the pieces already on your Canvas and connected to one another.

The following image shows the new flow setup:

![New flow setup with name 'Barista Bot' and options to cancel or proceed.](https://docs-resources.prod.twilio.com/c1253b859b3abeeab049a7a2543bd9ca5a396984a1c3731962992a57dc879b04.png)

Once the Studio Flow is created, you'll see a Canvas with a Trigger widget already in place. This widget starts your Flow when it's triggered by an event that you specify. In this case, you want to receive SMS messages from customers, so you will trigger the Flow with an incoming message. You will add more widgets throughout this tutorial by dragging them from the **Widget Library** on the right side of the Canvas.

The following image shows the Studio Flow canvas:

![Twilio Studio flow with post\_to\_slack HTTP request widget configuration.](https://docs-resources.prod.twilio.com/d5a554f534b9cffc4461382ac140d8f77368b96887261946aa78451325e4944d.png)

## Prompt the user for an order

When your bot receives a message, you will need to reply, prompting the customer for a coffee order.

### Add a Send and Wait for Reply widget

Follow these steps to add the widget:

1. Drag a **[Send & Wait for Reply widget](/docs/studio/widget-library/send-wait-reply)** onto the Canvas from the **Widget Library**.
2. Connect it to the **[Trigger (Start) widget](/docs/studio/widget-library/trigger-start)** by dragging the red dot at the bottom of **Incoming Call** Transition to the grey dot at the corner of the new **Send & Wait for Reply** widget.

You can use this **Send & Wait for Reply** widget to deliver an SMS to the user. In this case, you will ask the user what kind of coffee they want to order. You can expect the customer to reply with one of the options you specify.

### Configure the Send and Wait for Reply widget

Follow these steps to configure the widget:

1. Click the **Send & Wait for Reply** widget on the Canvas and select the widget's **Config** tab.
2. You can name the widget anything you like. This tutorial will use `order_prompt`.
3. In the widget's **Message Body**, add a friendly response that will be sent to the customer once your Flow is triggered—see the sample text below.
4. You can leave the remaining widget fields empty or set to their default values and click **Save**.

Use the following sample text for the **Message Body**:

```bash
Welcome to our automated ordering system. Please reply with one of the following: latte, cappuccino, americano, cortado, or cold brew.
```

The following image shows the configured `order_prompt` widget:

![Twilio Studio order\_prompt widget with options for latte, cappuccino, americano, cortado, or cold brew.](https://docs-resources.prod.twilio.com/8f3920a1d60d7e9f6d6b0bd9428e295c058487d1032921a57dea463f2092eb8c.png)

Your Flow is prepared to reply to an inbound message and wait for a response. Once a response is received, you will need to take action based on its content. You can use a **[Split Based On... widget](/docs/studio/widget-library/split-based-on)** to handle this next step.

## Split based on input

The **Split Based On…** widget allows you to distinguish among input (the customer's response, no response, and errors). It does this by setting a variable that you can test the input against.

### Add and configure the Split Based On... widget

Follow these steps to add and configure the widget:

1. Drag a **Split Based On** widget to the Canvas.
2. Connect the **Send & Wait for Reply** widget to the **Split Based On** widget by dragging the grey dot at the bottom of **Send & Wait for Reply** widget's **Reply** to the grey dot at the corner of the new **Split Based On** widget.
3. Click on the **Split Based On** widget and select the **Config** tab.
4. You can name the widget. This tutorial will use `split_order`.
5. To set a variable to test input against, select **`order_prompt` > inbound.Body** from the **Variable to Test** dropdown menu. This variable will contain the message body text sent by the customer.

The following image shows the configured Split Based On widget:

![Twilio Studio flow with call\_barista, announce\_connect, and connect\_to\_barista widgets.](https://docs-resources.prod.twilio.com/859b7026fa6823b64e1ac411d04067057e0fe77bfdf7b538f67ba47161fbff32.png)

### Add Transitions to handle customer input

Next, you need to declare the choices you're looking for in the customer's response: `latte`, `cappuccino`, `americano`, `cortado`, and `cold brew`.

Follow these steps to add Transitions:

1. Click the red **New** button at the bottom of the **Split Based On...** widget to reveal the widget's **Transition On...** dropdown menu. You can alternatively select the **Transitions** tab after clicking on the widget.
2. Select **Condition Matches** to create a new Transition.
3. From the widget's **Transitions** tab, find the new **Transition** that you just created. It will be under the heading **If Value Equal\_To**.
4. Select **Matches Any Of** from the first dropdown menu. You can now set the values you want to match from the customer's response — `latte`*,* `cappuccino`*,* `americano`*,* `cortado`*,* and `cold brew`.
5. **Save** the new Transition and it will appear on the widget.

Use the following values for the Variable **Matches Any Of** field:

```bash
latte, cappuccino, americano, cortado, cold brew
```

The following image shows the configured Split Order widget:

![Twilio Studio Baristabot Split Order Widget with transition configuration for coffee types.](https://docs-resources.prod.twilio.com/1ca1998c62b8c9908b1299eac9a8d1110069b9325ccd228b1e5881f50de5edd8.png)

## Triggering a Twilio Function

If the user responds with something that the bot recognizes (one of your five drinks), you should send a request to the barista system to complete the order. You can use a **[Run Function widget](/docs/studio/widget-library/run-function)** to do this.

[Twilio Functions](/docs/serverless/functions-assets/functions) is a serverless environment that allows you to write Twilio applications without managing infrastructure. Twilio Functions are perfect for event-driven applications like the Barista Bot.

### Add and configure a Run Function widget

Follow these steps to add and configure the Run Function widget:

1. Drag a **Run Function** widget onto the Canvas. This widget is available in the **Widget Library** from **Tools & Execute Code > Run Function**.
2. Click on the **Run Function** widget to configure it. You can name it anything you like — this tutorial will use `request_barista`.
3. Connect the condition you just set in your **Split Based On...** widget to your **Run Function** widget.

Before you can finish configuring your widget, you must create a Twilio Function. Once created, you will have a URL to add to your **Run Function** widget.

The following image shows the connected widgets:

![Twilio Studio flow with split\_order widget connecting to request\_barista widget for coffee types.](https://docs-resources.prod.twilio.com/fd3b38186b2886a76c374465019c1a339f4edaeccbf02ec87a2acc3089249138.png)

### Build a Twilio Function

Follow these steps to build a Twilio Function:

1. To build a Twilio Function, go to the [Twilio Functions](https://www.twilio.com/console/runtime/functions/manage) section of the [Twilio Console.](https://www.twilio.com/console/runtime/functions/manage)
2. Click **Create Service.**
3. A modal will appear where you can name your Service. The name cannot be changed after you create the Service. You can name the Service anything you like — this tutorial will use `Tutorial`.
4. Click **Next**. You will be taken to the Functions interface.
5. Click **Add +** at the top of the Function's page to add a Function to your environment.
6. Add a path for the Function. You can make the path anything you like — this tutorial uses `/barista-bot`
7. Some example code will be placed in the file editor. This editor is where you will place the code sample below.
8. With your code in place, click **Save** and select **Copy URL** from the bottom of the code editor window.
9. Select **Deploy All** to make your function live. Your Studio Flow will now be able to call the Function.

You can return to your Studio Flow.

For this tutorial, you will log the customers order with the Function using the following code sample. If you are handling a drink order, you should call another service or write to a database from your Function at this point.

Use the following code in your Function:

```javascript
exports.handler = function (context, event, callback) {
  console.log(event.drink);
  callback(null, "success");
};
```

The following image shows the Function in the Twilio Console:

![Twilio Functions console showing barista-bot function with JavaScript code for handling events.](https://docs-resources.prod.twilio.com/01b1edfee79fb7c8fec64ed3bf67558685988fa33978e67c708102fe3e5733af.png)

Make sure to save your Function and go back to the Function widget inside your Twilio Studio flow. Select the Service where you created the Function, select **ui** for the Environment, and choose the `barista-bot` Function.

You can also add a parameter to the request which is just a value that will be sent to the Function. Scroll down to the section for **Function Parameters** and create a field called `drink`. The value can then be set to the same variable we're checking in our split above: `{{widgets.order_prompt.inbound.Body}}` (where `order_prompt` matches the name of your initial prompt widget).

The following image shows the Function parameters configuration:

![Twilio Studio function parameters with 'drink' and '\{\{widgets.order\_prompt.inbound.Body}}'.](https://docs-resources.prod.twilio.com/056c23aea72c78d16ad1b2952fa164c8c6dd076bed94302023963c8ed59ef397.png)

Once the request goes out to our barista function, we're all set! Our user will get the coffee they ordered, all from a pretty simple interaction.

## Human handoff

But what if the user doesn't enter one of our five coffee choices? We still want to help them out. Sometimes the best solution is for the chatbot to hand things off to a human. If the user enters something that isn't on our list, let's offer to give them a phone call so the barista can get the order directly. We'll drag another **Send & Wait For Reply** widget onto the Canvas, and this time connect it to the No Condition Matches transition on our `split_order` widget.

The following image shows the `ask_to_call` widget:

![Twilio Studio Tutorial Baristabot ask\_to\_call widget added connected to No Condition Matches condition.](https://docs-resources.prod.twilio.com/e2f3fee462f7546ce24b6bccc01026beb729abdf74b88aa9cca092ff172ee5a6.png)

For the message prompt, we'll put "We want to make sure you get your coffee, even if we're not quite sure how you take it. We'll connect you to a barista directly—is now a good time to call?" Another **Split Based On** widget will help us handle the user's response here—if they type "Y" or "yes" we can make the call to the barista. Let's drag the widget onto the Canvas and select the `inbound.Body` Liquid variable of our latest **Send & Wait For Reply** as the variable to test, then create our conditions.

The following image shows the `split_on_call` widget:

![Twilio Studio Tutorial Baristabot split\_on\_call widget connected from ask\_to\_call widget.](https://docs-resources.prod.twilio.com/0fe458f8a437ff690de197ba845fccc60bf6966b36b1c068788966c6bbaacdae.png)

## Make an outgoing call

From here, we can drag a **[Make Outgoing Call widget](/docs/studio/widget-library/make-outgoing-call)** onto the Canvas and connect it to our 'y, yes' condition. Studio will trigger an outbound call from the Flow to the user so they can speak with a barista.

> \[!WARNING]
>
> When an incoming message triggers a Studio Flow, and the phone number is already assigned to a [Messaging Service](/docs/messaging/services), you cannot use the Make Outgoing Call widget. For more information, see the [Make Outgoing Call widget configuration requirements](/docs/studio/widget-library/make-outgoing-call#required-configuration-for-make-outgoing-call).

The following image shows the Make Outgoing Call widget:

![Twilio Studio Tutorial Baristabot Make Outgoing Call v2 widget directed towards contact.channel.address Liquid variable.](https://docs-resources.prod.twilio.com/fc473d71d01c8659e3856aeaba035cc952a1c6d693b8009ac24e1038fadb8368.png)

Once the user picks up, we'll use a **[Say/Play widget](/docs/studio/widget-library/sayplay)** to announce that we're connecting them to the barista, and then a **[Connect Call To widget](/docs/studio/widget-library/connect-call)** to connect them once the message is finished playing. Drag these widgets onto the Canvas and connect the dots.

The following image shows the Say/Play and Connect Call To widgets:

![Twilio Studio Tutorial Baristabot Connect to Barista using Say/Play widget and Connect Call To widget.](https://docs-resources.prod.twilio.com/442cbd654322d71696015ba670223f15f58516f1e20383d21706713a0627f3fe.png)

## The finished product

The final state of the Canvas is that we have our **Trigger (Start)** widget take an incoming message, connect to a **Send & Wait For Reply** widget, then to a **Split Based On** widget, with transitions to either a Twilio Function (successful order) or another **Send & Wait For Reply** (unsuccessful order). This second **Send & Wait For Reply** connects to a **Split Based On** widget, which ultimately leads to a **Make Outgoing Call** widget that calls the user from the bot, a **Say/Play** widget that announces the connection, and a **Connect Call To** widget which connects the user to the barista by voice.

The following image shows the complete Studio Flow:

![Twilio Studio flow for automated coffee ordering with steps from order prompt to barista connection.](https://docs-resources.prod.twilio.com/376685e87f3d508fea70700eb193a86ca6b6bdcf65606edeaedd2ebcf595b2f8.png)

Once you're happy with your Flow and you've published all changes, you can connect it to a Twilio Number so people can start interacting with it.

Go to the [Numbers & senders section of the Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory) and click on the number you'd like to connect to the Flow. (If you do not have any phone numbers, you can [purchase one from the Console](/docs/numbers-and-senders/phone-number-senders).)

After clicking on the number, you will see its configuration menu where you can connect the number to your Studio Flow.

To trigger a Studio Flow with an Incoming Message, scroll down to the Messaging section in the configuration menu. Under **Configure with Other Handlers**, select the dropdown option "Webhook, TwiML Bin, Function, Studio Flow, Proxy Service". Then, under **A Message Comes In**, select the dropdown option "Studio Flow". You'll see another dropdown menu appear where you can select the Studio Flow you'd like to connect to when a message comes in to this number.

![Messaging configuration with regional routing and Studio Flow selection.](https://docs-resources.prod.twilio.com/be596b31cd689ac1f172f83460ba69d0ab4bd416e5faa2f63309921377f8fbbf.png)

Choose the Flow you'd like to connect the number to, and then press **Save** to save these changes. Your Flow is now connected to your Twilio number!

Congratulations! You've made a chatbot that is smart enough to route a coffee order to a barista system, or to hand off to a human if things get tricky. What other chatbots will you build next?
