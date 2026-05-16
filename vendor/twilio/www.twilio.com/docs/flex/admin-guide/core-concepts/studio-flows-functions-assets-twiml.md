# Core concepts: Studio Flows, Functions, Assets, TwiML

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0. If you are on Flex UI 1.x, please refer to [Chat and Messaging](/docs/flex/admin-guide/core-concepts/chat-and-messaging) pages.

## Overview

Twilio Studio is a powerful visual editor for building, editing, and managing communication workflows. The [**Studio Canvas**](/docs/studio/user-guide) is the visual flow editor and is accessible [through the Console](https://console.twilio.com/us1/develop/studio/overview?frameUrl=%2Fconsole%2Fstudio%2Fdashboard%3Fx-target-region%3Dus1).

You can use Studio to build a wide variety from workflows, including order notifications, conversational IVRs, survey tools, and SMS-enabled chatbots.

## Studio Flows

By default, Studio Flows serve as the entry point for all calls and messages in Flex. Out of the box, Flex includes three Studio Flows: Voice IVR, Messaging Flow, and WebChat Flow. These Flows use the [Send To Flex widget](/docs/studio/widget-library/send-flex) to send inbound communication to a [TaskRouter Workflow](/docs/taskrouter/api/workflow). An example of the Send to Flex widget is shown in the following screenshot.

![Flow diagram showing a trigger leading to 'send\_conversation\_to\_flex' with configuration options on the right.](https://docs-resources.prod.twilio.com/115f2fb515e6908fb4a26122fcdabd689ce069fff485e84b9e4df4deaf5c9357.png)

For examples of how to modify Flex Studio Flows, see [Using Twilio Studio with Flex](https://help.twilio.com/hc/en-us/articles/360012257693-Using-Twilio-Studio-with-Flex).

### Widgets

You create a Studio Flow using **widgets**, which are the basic building blocks of functionality specific to the communication channel being used. A Flow begins with the Trigger widget, and from there, you can drag and drop widgets to build the exact flow needed for your contact center use case.

Common widgets include **Say/Play** (for saying or playing a message on a voice call), and **Send & Wait for Reply** (for sending a text-based message and waiting for a user response). For a complete list of Studio widgets, see the [Widget Library](/docs/studio/widget-library).

Studio can connect to [Twilio Functions](/docs/serverless/functions-assets/functions) or make HTTP Requests to 3rd party services for additional functionality.

When an end user interacts with a Studio Flow, it creates an [**Execution**](/docs/studio/rest-api/execution) that takes the user through each widget until completion. An Execution typically represents a single phone call or a chatbot conversation. As a Studio flow executes, its state and associated data are saved in the [Execution Context](/docs/studio/rest-api/v2/execution-context). The data in the Execution Context can be accessed within a Studio Flow as variables using the [Liquid Template Language](/docs/studio/user-guide/liquid-template-language).

#### Send to Flex

The **Send To Flex** widget transfers a call, message, or conversation to Flex. To learn more, refer to [Configure pre-agent workflow with Studio](/docs/flex/admin-guide/setup/configure-pre-agent-workflow-with-studio).

## Functions and Assets

**Twilio Functions** is a serverless development environment that lets you build event-driven and scalable Twilio applications. Functions are small units of server-side code written in Node.js that run directly on the Twilio platform. They natively integrate with Studio so you can extend your Studio Flows and Flex plugins with custom functionality.

Functions replace your need to find hosting or run a server to serve TwiML or any other HTTP-based responses. You no longer have to worry about maintaining or scaling your web infrastructure to support your application. To learn more, see [Getting Started with Serverless and Twilio Functions](/docs/serverless/functions-assets/functions#get-started-with-serverless-and-twilio-functions).

**Assets** provide the ability to upload and serve text and media files on the Twilio server. You can access these files using Functions to build custom communication applications. To learn about the different types of Assets you can host, see [How Assets Work](/docs/serverless/functions-assets/assets#how-assets-work).

## TwiML

TwiML (the Twilio Markup Language) is a set of instructions you can use to tell Twilio what to do when you receive an incoming call or SMS.

### How TwiML works

When someone makes a call or sends a message to one of your Twilio numbers, Twilio looks up the URL associated with that phone number and sends it a request. Twilio then reads the TwiML instructions returned by that endpoint to determine what to do — whether it's recording the call, playing a message for the caller, or prompting the caller to press digits on their keypad.

At its core, TwiML is an XML document with special tags defined by Twilio to help you build your Programmable Voice or Messaging application. TwiML verbs are the underlying output of Studio that tell Twilio systems what actions to take on a given call or message. Because of this, most elements in a TwiML document are TwiML verbs. Verb names are case-sensitive, as are their attribute names.

### TwiML for Voice

TwiML for Voice instructions define how inbound and outbound calls are handled on your Twilio phone number. While Twilio executes just one TwiML document to the caller at a time, you can link many TwiML documents together as a flow to build a complex IVR application.

You can use different combinations of TwiML verbs to create all kinds of interactive voice and messaging applications for Flex. Voice verbs commonly used with Flex include [\<Say>](/docs/voice/twiml/say), [\<Gather>](/docs/voice/twiml/gather), [\<Pay>](/docs/voice/twiml/pay), [\<Play>](/docs/voice/twiml/play), [\<Record>](/docs/voice/twiml/record), [\<Enqueue>](/docs/voice/twiml/enqueue), [\<Dial>](/docs/voice/twiml/dial), [\<Connect>](/docs/voice/twiml/connect), [\<Stream>](/docs/voice/twiml/stream).

To learn more about how TwiML works with Voice, the different elements, and the TwiML interpreter, see [TwiML™ for Programmable Voice](/docs/voice/twiml).

### TwiML for SMS

TwiML for SMS instructions define how inbound messages are handled on your Twilio phone number. When Twilio receives a message for one of your Twilio numbers or channels, it makes a synchronous HTTP request to the message URL configured for that number or channel and expects to receive TwiML in response. Twilio sends additional parameters when there are media (like images) associated with the message. The two TwiML for Messaging verbs are [\<Message>](/docs/messaging/twiml/message) and [\<Redirect>](/docs/messaging/twiml/redirect).

To learn more about how TwiML works with SMS and the TwiML interpreter, see [TwiML™ for Programmable SMS](/docs/messaging/twiml).
