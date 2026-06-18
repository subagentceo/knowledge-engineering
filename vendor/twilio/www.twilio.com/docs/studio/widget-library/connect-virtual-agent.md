# Connect Virtual Agent widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

The Connect Virtual Agent widget allows you to connect a Twilio Voice call or an incoming Conversation to a [Google Dialogflow CX agent](https://cloud.google.com/dialogflow/cx/docs/concept/agent).

![Connect Virtual Agent widget with options: Completed, Live Agent Handoff, Hangup, Failed.](https://docs-resources.prod.twilio.com/3944cd16baa651d30e88168fe46f2e0c7e72e0bf0befd139de30ae647308a9a2.png)

You can leverage a native integration between Twilio Voice and Dialogflow CX to provide callers with conversational AI experiences. The integration also allows for operations such as live agent handoff and customer barge-in.

Twilio provides the telephony aspect of the conversational IVR experience and Dialogflow CX enables agent configuration, including setting intents, sentiment analysis, speech models, and agent responses.

## Set up the integration between Twilio and Dialogflow CX

To use the Connect Virtual Agent widget, you must connect your Dialogflow CX agent to Twilio in the Google Dialogflow CX cloud console. [Review the prerequisites and steps for the integration in the Dialogflow CX Onboarding Guide.](/docs/voice/virtual-agent/dialogflow-cx-onboarding)

After you complete the integration, Twilio will automatically create a new Studio Flow containing a Connect Virtual Agent widget that is connected to your Dialogflow CX agent.

## Start or resume a session

As you're setting up your virtual agent, you can choose to:

* Start a new session
* Resume a paused session

### Start a new session

If you start a new session, you'll need to add the **Virtual agent connector**. Enter the connector's name exactly as it appears in the [Twilio Marketplace Add-on listings](/docs/marketplace/listings#add-ons).

### Resume a paused session

> \[!NOTE]
>
> To pause a session, you must configure a custom payload in your virtual agent. Visit [Pause a session](/docs/voice/twiml/connect/virtualagent/virtualagent-dialogflow-cx#pause-a-session) to learn more. Pausing and resuming sessions is only supported in Voice.

If you resume a paused session, you'll need to select how to identify the previous session. Choose from the following options:

* **Select a previous widget**: This allows you to select a previously used widget to resume a session from. Use the dropdown to select the widget where the session you want to resume was paused. Based on your selection, Studio identifies the virtual agent connector and `EndUserID` needed to resume the session.
* **Manual entry**: This allows you to manually enter the **Virtual agent connector** and `EndUserID` from a previously paused session.

If you'd like to start from a specific event, select **Resume session at a specific point**. When unchecked, the session resumes from the same point it was paused. Learn more about how to [resume a session](/docs/voice/twiml/connect/virtualagent/virtualagent-dialogflow-cx#resume-a-session) and configure `resumeEventName`.

## Required Configuration for Connect Virtual Agent widget

The Connect Virtual Agent widget requires the connector name for the Google Dialogflow CX instance. You can find the Connector Name in the [Dialogflow CX Connector in the Twilio Console](https://www.twilio.com/console/add-ons/XB1f158cacea38a5621ecf00f2196994a4) after you have completed the One-click telephony integration in the step above.

| Name           | Description                                                          | Default |
| -------------- | -------------------------------------------------------------------- | ------- |
| Connector Name | The unique name configured in your Dialogflow CX connector instance. | empty   |
| Channel        | The channel you want to use for your widget: Voice or Conversations  | Voice   |

> \[!CAUTION]
>
> Editing the Connector Name within the Connect Virtual Agent Studio widget alone **will break** the integration between Dialogflow and your Twilio project. If you need to update the Connector Name, you must edit it in the [Dialogflow CX Connector](https://www.twilio.com/console/voice/stream-connectors) **and** the Studio widget.

## Optional Configuration for Connect Virtual Agent

The Connect Virtual Agent widget also accepts a number of configuration options that you can use to configure agent interactions and analysis.

| Name                   | Description                                                                                                                                                                                     | Default | Supported Products   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------- |
| Status Callback URL    | URL to send status callback events from Twilio                                                                                                                                                  | empty   | Voice only           |
| Status Callback Method | The HTTP method to use when requesting the Status Callback URL. Accepted values are `GET` or `POST`.                                                                                            | `POST`  | Voice only           |
| Parameters             | Key-value pairs used to send custom session parameters to your virtual agent to drive personalization and/or parameterize your agent's response                                                 | empty   | Voice, Conversations |
| Configurations         | Key-value pairs used to override underlying connector properties (e.g. `language`, `sentimentAnalysis`, `voiceName`, `welcomeIntent`, etc.) and/or modify your virtual agent's default behavior | empty   | Voice only           |

## Connect Virtual Agent Transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio transitions, [see this guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name               | Description                                                                                                                                            | Supported Products   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| Completed          | The Dialogflow CX agent ended the connection because an intent matched the "end of the conversation" intent indicating the call completed successfully | Voice, Conversations |
| Live Agent Handoff | The Dialogflow CX agent returned a live agent handoff response indicating the call needs to be escalated to a human agent                              | Voice, Conversations |
| Paused             | The Dialogflow CX agent session was paused with the intention of the session being resumed later                                                       | Voice only           |
| Hangup             | The caller hung up during the Dialogflow CX agent interaction                                                                                          | Voice only           |
| Timeout            | The conversation timed out because the Virtual Agent had to wait too long for a reply from a customer                                                  | Conversations only   |
| Failed             | An error occurred during VirtualAgent processing                                                                                                       | Voice, Conversations |

## Connect Virtual Agent Variables

When the Connect Virtual Agent widget executes, it will have stored the following variables for use throughout your Studio Flow (where `MY_WIDGET_NAME` is the name of your actual widget). For more information on working with variables in Studio, [see this guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

| Name                     | Liquid Template Language                                |
| ------------------------ | ------------------------------------------------------- |
| VirtualAgentProvider     | \{\{widgets.MY\_WIDGET\_NAME.VirtualAgentProvider}}     |
| VirtualAgentStatus       | \{\{widgets.MY\_WIDGET\_NAME.VirtualAgentStatus}}       |
| VirtualAgentProviderData | \{\{widgets.MY\_WIDGET\_NAME.VirtualAgentProviderData}} |
| VirtualAgentError        | \{\{widgets.MY\_WIDGET\_NAME.VirtualAgentError}}        |
| VirtualAgentErrorCode    | \{\{widgets.MY\_WIDGET\_NAME.VirtualAgentErrorCode}}    |

`VirtualAgentError` and `VirtualAgentErrorCode` will be present if status is failed (if the widget ends through the Failed transition). `VirtualAgentProviderError` may also be provided if `VirtualAgentErrorCode` is [32601](/docs/api/errors/32601).

### VirtualAgentProviderData

For Google Dialogflow CX agent, the VirtualAgentProviderData JSON object may contain the following information. Note that this variable might be empty if the widget exited through the Failed transition.

| JSON key                     | Description                                                                                         |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| ConversationId               | ConversationId: Unique identifier for this conversation provided by Google                          |
| EndUserId                    | Unique identifier for the end user participant provided by Google                                   |
| AgentHandoffParameters       | Parameters included from the Dialogflow CX Agent if the Live Agent Handoff Transition was triggered |
| PauseParameters (Voice only) | Parameters included from the Dialogflow CX Agent if a Pause Transition was triggered                |

## Connect to Conversations

To connect a virtual agent to Conversations, you can use any current agents you have configured or [set up a new one](/docs/voice/virtual-agent/dialogflow-cx-onboarding).

To get started, set the Channel field to conversations, select the Connector instance, and connect the Incoming Conversation Trigger to the widget.

![Connect Virtual Agent widget configuration with trigger options and transitions.](https://docs-resources.prod.twilio.com/5c713ae8c28d2c30fff6764640398f147f96817e1645864ee8ee5dfb38b5110a.png)

**Note**: You can use the same Connector instance for both Voice and Conversations, but you need a separate widget for each.

For a more detailed guide on how to set up the integration in Conversations, see the [Connect to Dialogflow guide](/docs/conversations-classic/connect-to-dialogflow) in the Conversations API docs.

### Conversations Transitions

For Conversations, the widget supports Completed, Timeout, Failed, and Live Agent Handoff, but does support the Hangup and Paused transitions.
The Timeout configuration specifies how long the agent should wait for a reply from an unresponsive customer before transitioning to the "Timeout" transition.

### Conversations Features

Parameters (up to 10) and Sentiment Analysis are supported for Conversations.

The following features available in the connector for Voice are not supported for Conversations:

* Status Callbacks
* Pausing and Resuming Sessions
* Configurations
* Default Welcome Intent
