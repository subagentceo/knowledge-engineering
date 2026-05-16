# Google Dialogflow CX integration in Flex for virtual agents

> \[!IMPORTANT]
>
> This feature is currently available as a Public Beta product and information contained in this document is subject to change. This means that some of the features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!NOTE]
>
> Virtual Agent for the Conversations channel is not a HIPAA Eligible Service and should not be used in Conversation or Flex workflows that are subject to HIPAA.

This guide outlines the native integration of Google Dialogflow CX with Flex. It uses the Twilio one-click integration for Google Dialogflow CX. With this integration, you can:

* Hand off Virtual Agent calls and conversations to agents in Flex.
* View call transcripts and message history between Virtual Agents and customers.
* Pass relevant information from the Virtual Agent to Flex for routing.

The supported Conversations channels are SMS, Webchat 3.x.x, WhatsApp, and Facebook Messenger.

## Prerequisites

* For the Voice channel, an active Flex account with [Flex UI 2.2.0](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx#v-220) or later. For supported Conversations channels, an active Twilio account with [Flex UI 2.5.0](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx#v-250) or later.
* For the Voice channel, [Native Dialpad configured on your Flex application](/docs/flex/admin-guide/setup/voice/dialpad/enable).
* Completion of the [Dialogflow CX Onboarding guide](/docs/voice/virtual-agent/dialogflow-cx-onboarding). To ensure that the Virtual Agent transcripts are captured accurately, enable interaction logging in the **Logging Settings** of the Google Dialogflow CX Console.

  ![Enable interaction logging under Google Dialogflow CX agent settings with cloud logging option.](https://docs-resources.prod.twilio.com/47b439c438f99fb639634fc15f5b3f8a79614a56ef890aa3adc2d651a4069a9e.png)

> \[!WARNING]
>
> This feature is only available for [Google Dialogflow CX](https://cloud.google.com/dialogflow/cx/docs/concept/fulfillment#handoff) and would not work as expected for [Dialogflow ES](https://cloud.google.com/dialogflow/es/docs).

## Enable this feature

If you would like to use the Voice channel or Conversations channels with the Connect Virtual Agent widget for Flex, [contact our support team](https://help.twilio.com) for help enabling this Beta feature.

## Connect Virtual Agent widget

Once the Dialogflow CX integration is complete, you can access the [Connect Virtual Agent widget](/docs/studio/widget-library/connect-virtual-agent-flex) in Twilio Studio.

This widget connects Twilio Flex with Google's Dialogflow Virtual Agent. For an overview of transition events available for the Connect Virtual Agent widget, see [Connect Virtual Agent for Flex (Public Beta)](/docs/studio/widget-library/connect-virtual-agent-flex).

> \[!WARNING]
>
> Please do not include Sensitive Data (PII and PHI) as part of the Virtual Agent to ensure appropriate handling of the data in our systems.

## Integrate with Flex

For agents in Flex to handle calls or conversations from the Virtual Agent, the **Connect Virtual Agent** widget needs to link to the **Send to Flex** widget using the **Live Agent Handoff** transition.

Follow these steps to integrate Flex with Google Dialogflow CX:

### Step 1: In the Google Dialogflow Console, set up live agent handoff fulfillment

From the Google Dialogflow Console, ensure that the live agent handoff fulfillment is triggered by the Virtual Agent from the required flows to initiate the transition within Twilio Studio. This is the first step to ensure seamless routing of an ongoing call or conversation to an agent in Flex. For more details, check out Google's [live agent handoff docs](https://cloud.google.com/dialogflow/cx/docs/concept/fulfillment#handoff).

> \[!NOTE]
>
> In the Live agent handoff fulfillment section of the Google Dialogflow Console, it's not mandatory to enter a JSON object to ensure that the call is routed to Flex. In a later [section](#sending-data-from-google-dialogflow-cx-to-flex), we'll look at how we share additional data from the virtual agent to Flex.

### Step 2: In Twilio Studio, connect Google Dialogflow CX with the Live Agent Handoff transition

If the Virtual Agent is not able to fulfill the call or answer the conversation, Dialogflow CX allows you to escalate it to a live human agent.

If Google's Dialogflow CX Virtual Agent returns a live agent handoff response, it indicates that the call or conversation needs to be escalated to a human agent:

* If you are using Twilio Studio's Connect Virtual Agent widget, the [Live Agent Handoff transition state](/docs/studio/widget-library/connect-virtual-agent-flex#connect-virtual-agent-transitions) is triggered.
* If you are using TwiML, the VirtualAgentStatus field in the request to your action URL is set to `live-agent-handoff`.

> \[!WARNING]
>
> If you are using the \<Virtual Agent> TwiML noun for integrating with Flex instead of the Studio-based configurations, the Transcripts on the Flex UI would not be available.

### Step 3: In Twilio Studio, associate the Connect Virtual Agent widget with the Send to Flex widget

Next, associate the **Live Agent Handoff** transition on the **Connect Virtual Agent** widget with the **Send to Flex** widget.

In the **Send To Flex** widget config, you need to select the appropriate workflow on the appropriate **Task** **Channel** to route conversations. For Voice, select **Voice** as the **Task** **Channel** to route calls. For Conversations channels, select your messaging channel, such as Webchat or SMS, as the **Task** **Channel** to route incoming messages.

In the **Attributes** field, specify an attribute to send to Flex. For example, you could use the VirtualAgentProviderData from the **Connect Virtual Agent** widget as follows:

`{"escalation_type": "{{widgets.<connect_virtual_agent_widget-name>.VirtualAgentProviderData}}" }`

This ensures that the transition for **Live Agent Handoff** is used to create a task and route it to an appropriate agent in Flex.

![Flowchart showing connection from Virtual Agent to Flex with channels and connectors.](https://docs-resources.prod.twilio.com/9be0e18d4abd9776e192793d43654ab16258f78b9c5b54c20cfea1842e20b906.png)

### Step 4: In Twilio Console, configure a Conversations address or Voice phone number

If you're using a Voice channel, see the [Dialogflow CX Onboarding Guide](/docs/voice/virtual-agent/dialogflow-cx-onboarding#configure-a-twilio-number-to-connect-to-your-virtual-agent-studio-flow) to connect your phone number to the Studio flow that you created.

If you're using a Conversations channel, you need to connect your Conversations channel to the relevant Studio flow:

1. In [Twilio Console](https://console.twilio.com/), from the **Develop** sidebar, select **Flex** > **Channel management** > [**Messaging**](https://console.twilio.com/us1/develop/flex/channels/messaging/conversations).
2. From the **Conversations Addresses** tab, select your address type from the **Filter by Address type** list. If you need to add a new Conversations address, see [Overview of Address Management](/docs/flex/admin-guide/setup/conversations/overview-of-address-management) to configure a new address.
3. Click the pencil icon next to the address to edit it.
4. Under **Flex integration,** from the **Studio Flow** list, select the Studio flow that you created earlier when integrating with Dialogflow CX.
5. Click **Update Address**.

## Availability of transcripts and message history

Once you complete the setup steps, Virtual Agent calls or conversations that are escalated to Flex also include call transcripts or message history. With this information, the agent is better equipped to help the customer, and the agent won't need to request information that's already been provided.

The call transcript or message history is only available for the portion of the call or conversation where the Dialogflow CX Virtual Agent is interacting with the customer. The transcript messages show both the Virtual Agent's responses and the customer's responses.

![Twilio Flex UI showing a virtual agent chat transcript and customer details.](https://docs-resources.prod.twilio.com/317e8e52b838bebfb78e6b25c1ff2f4d774d5f881de0b8aa9338d5116be70aef.png)

## Sending data from Google Dialogflow CX to Flex

To send additional information from Dialogflow CX Virtual Agent during the Live Agent handoff process, you can use the optional data section of the Dialogflow Live agent handoff fulfillment.

The data shared at the fulfillment step is available as part of the **VirtualAgentProviderData** variable of the Connect Virtual Agent widget. Refer to [Connect Virtual Agent widget](/docs/studio/widget-library/connect-virtual-agent-flex) for details on the other variables you can use. You can use these variables to populate the task attributes in the **Send to Flex** widget. They can be useful to route the incoming task accordingly or route to different workflows from Studio itself.

The above options allow for a lot of flexibility in terms of intelligent call and conversation routing that leverages the context provided by the Dialogflow CX Virtual Agent.
