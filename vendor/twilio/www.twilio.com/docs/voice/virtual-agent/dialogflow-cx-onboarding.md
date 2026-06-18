# Dialogflow CX Onboarding Guide

Twilio's Dialogflow CX Connector provides native telephony integration with Google Dialogflow CX.
With this integration, Twilio offers rich conversational AI experiences to customer applications.
A common use case for this would be enterprises with medium to large sized contact centers.

This guide explains the integration process between your Twilio application and your Google Dialogflow CX virtual agent.

> \[!NOTE]
>
> Google is rebranding *Dialogflow CX* as *Conversational Agents*. Until that rebranding concludes, this guide continues to use Dialogflow or Dialogflow CX. Consider these equivalent terms.

## Prerequisites

Before starting the integration, complete these prerequisites.

### Set up your Google Dialogflow CX agent

To start using Dialogflow CX in Google Cloud, consult Google's [Dialogflow CX setup documentation][].

[Dialogflow CX setup documentation]: https://cloud.google.com/dialogflow/cx/docs/quick/setup

### Grant Twilio permission to access your Dialogflow CX agent

Before setting up one-click integration, Google Cloud requires you to grant access to Twilio's service account.
To run your Dialogflow agent, grant Twilio's production service account permission to use Google Cloud.

1. Log in to your [Google Cloud console][].
2. Select the Google Project in which you want to set up your Dialogflow CX Agent.\
   To find the project, use the dropdown menu to the right of the Google Cloud logo.
3. Verify that you have turned on the [Resource Manager API][].\
   If you need to turn on this API, confirm that you selected your desired project, click **Next**, then click **Enable**.
4. Verify that your Google Cloud administrator has granted you the `resourcemanager.projects.setIamPolicy` permission for your project.
5. Click the menu button at the top left of the page.
6. Navigate to [**IAM & Admin** > **IAM**][google-iam] from the left navigation.
7. Click the **Allow** tab, then click the **View by Principals** tab.
8. Click **+Grant Access**.
9. In the **New Principals** box, add `virtualagent-ccai-prod@dialogflow-prod-env.iam.gserviceaccount.com`.
10. Under **Assign roles**, click the **Role** combo box and search for `Dialogflow API Reader`.
11. Click **Dialogflow API Reader**.
12. Click **+ Add another role**.
13. Click the second **Role** combo box and search for `Dialogflow API Client`.
14. Click **Dialogflow API Client**.
15. Click **Save**.

When successful, a box appears stating **Policy updated**.

[Google Cloud console]: https://console.cloud.google.com

[Resource Manager API]: https://console.cloud.google.com/flows/enableapi?apiid=cloudresourcemanager.googleapis.com

[google-iam]: https://console.cloud.google.com/iam-admin/iam

### Log in to the Twilio Console

Before performing the one-click integration with Google Dialogflow, verify that you have logged into the Twilio Console with the appropriate account.

1. Choose which account or sub-account to integrate with your Dialogflow CX agent.
2. Log in to [Twilio Console][] (or the [legacy Console][legacy-twilio-console]) with that account.

[Twilio Console]: https://1console.twilio.com/go?to=/account/__account__/us1/voice/settings/dialogflow

[legacy-twilio-console]: https://console.twilio.com/us1/develop/voice/settings/dialogflow

## Connect Twilio to your Dialogflow CX Agent with the one-click integration

Once you have completed the prerequisite steps, you are ready to use the one-click integration to connect your Twilio Dialogflow CX Connector to your desired Dialogflow CX agent.

### Configure Dialogflow CX for integration

1. Log in to your [Google Dialogflow CX cloud console][].
2. Choose your project from the **Select Project** modal.
3. Click **Enable API** if prompted. This may take a few seconds.
4. [Create or choose an agent][].
   * Consider choosing a [pre-built agent][].
   * Choose your agent's location with care.
5. Click the **Manage** tab on the left toolbar.
6. Scroll to **Integrations** then click **Integrations**.
7. Scroll to **One-click telephony**.
   ![Dialogflow Phone Gateway with one-click telephony options including Twilio, Avaya, Voximplant, and AudioCodes.](https://docs-resources.prod.twilio.com/9de2e1855d26cfca7f38308d096c02c056d4f82c29ef7aa55e48f3a63fe80dd4.png)
8. Click **Connect** under **Twilio**.
   A pop-up modal appears.
9. Type the name of your integration in the **Create a new integration** box.
10. Select the **Environment** and **Language** for your Dialogflow CX agent.\
    To choose your environment and language, build your own agent. Dialogflow CX pre-built agents use English only.
11. Click **Add**.
    This starts the integration process and launches the Twilio Console.

If any of these steps return an error, [consult Google's troubleshooting guide][].

[Google Dialogflow CX cloud console]: https://dialogflow.cloud.google.com/cx/projects/

[Create or choose an agent]: https://cloud.google.com/dialogflow/cx/docs/concept/agent

[pre-built agent]: https://cloud.google.com/dialogflow/cx/docs/concept/playbook/prebuilt

[consult Google's troubleshooting guide]: https://cloud.google.com/dialogflow/cx/docs/concept/integration/twilio

### Configure Twilio for integration

> \[!WARNING]
>
> Make sure you have [granted Twilio access to Google Dialogflow CX](#grant-twilio-permission-to-access-your-dialogflow-cx-agent).
> If you haven't, the Twilio console redirects you back to Google with an authentication error.

After you complete the Google Cloud Console steps, the Twilio Console opens to finish the Dialogflow integration. The **Dialogflow CX one-click integration** page displays with some pre-populated values.

1. To complete the **Connector Configuration** form, provide the following values:

   | Field name                         | Purpose                                                                                                                                                                                                                                                                                                                            | Suggestion for this tutorial                                   |
   | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
   | **Connector Friendly Name**        | Unique name of the Connector. Use this name to identify the connector in Twilio Studio or using TwiML.                                                                                                                                                                                                                             | `Dialogflow_CX_Test1`                                          |
   | **Status Callback URL** (optional) | Endpoint URL where Twilio should send requests on call status, intents triggered, sentiment scores, agent-caller text, etc.                                                                                                                                                                                                        | [Twilio Functions]                                             |
   | **Welcome Intent Friendly Name**   | Name of the Dialogflow CX agent welcome intent to trigger when connecting the caller to the agent.                                                                                                                                                                                                                                 | System generated [default welcome intent][] called **WELCOME** |
   | **Bot Voice**                      | Text-To-Speech voice the bot uses for audio responses. Twilio supports all of Google's [list of voices][], but this dropdown only includes a subset. To use an unlisted language, use the [Twilio `<VirtualAgent>` widget][].                                                                                                      | `Default`                                                      |
   | **Sentiment Analysis**             | When toggled **On**, Dialogflow performs sentiment analysis on the end user input and [status callbacks][status-callbacks] relay sentiment scores. Sentiment analysis availability depends on the language support in Dialogflow CX. Consult Google documentation for their [list of languages that support sentiment analysis][]. | **On**                                                         |
2. Click **Next**.
   The **Review and Confirm** page displays.
3. Review the Connector configuration.

   1. If the displayed configuration needs changes, click **Previous** to update the connector setting.
   2. If the displayed configuration appears correct, click **Confirm Configuration Details**.

   ![Dialogflow CX integration confirmation with connector details like name, URL, and language.](https://docs-resources.prod.twilio.com/f6b2c1965f4ffe48baa5bdad6be6f0dcf2fb362c319ee1c06051ca3c0eba8e85.png)
4. The **Agree and Connect to DialogFlow** pop-up modal appears.
   To connect your Twilio Connector to your Dialogflow CX agent, you need to give your consent.
   * To abandon the setup, click the **X** at the top right corner of the modal pop-up or close your browser tab.
   * To finish the integration setup, click **Agree and connect to Google**.
     ![Consent dialog for connecting Twilio to Dialogflow CX with project ID and agent details.](https://docs-resources.prod.twilio.com/0b5016f10d540d981e5dca2a4dcd6df869cd95f9efb783a27d520be5776f2354.png)

This completes your Dialogflow CX integration.
The Google Cloud console displays with the completed integration listed in the **Twilio Integration** modal.

To create another integration, click **Add**.

To find this integration in the Twilio Console, go to **Marketplace** > **[Installed][dialogflow-cx-add-on]**.

[Twilio Functions]: /docs/serverless/functions-assets/functions

[status-callbacks]: #support-all-transition-states-in-status-callbacks

[list of voices]: https://cloud.google.com/text-to-speech/docs/voices

[default welcome intent]: https://cloud.google.com/dialogflow/cx/docs/concept/intent#welcome

[list of languages that support sentiment analysis]: https://cloud.google.com/dialogflow/cx/docs/reference/language

[dialogflow-cx-add-on]: https://1console.twilio.com/go?to=/account/__account__/us1/add-ons/installed/catalog

[Twilio `<VirtualAgent>` widget]: /docs/voice/twiml/connect/virtualagent/virtualagent-dialogflow-cx#example-5-customize-the-tts-voice-and-language

## Develop your application with the Dialogflow CX agent integration

With the Dialogflow CX integration with Twilio complete, you can send a Twilio call to your Dialogflow CX agent in two ways: using the [Twilio Studio Connect Virtual Agent Widget](#connect-virtual-agent-widget-and-twilio-studio), or [TwiML \<VirtualAgent> noun](#virtualagent-twiml-noun).

### Connect Virtual Agent Widget and Twilio Studio

When you complete the integration, Twilio creates a new Studio Flow with a [Connect Virtual Agent Widget][connect-va-widget] in it.

[connect-va-widget]: /docs/studio/widget-library/connect-virtual-agent

![Connect Virtual Agent widget with Dialogflow CX Test1, options: Completed, Live Agent Handoff, Hangup, Failed, Paused.](https://docs-resources.prod.twilio.com/ca6fd21ed9c798466a5481da94f893bbd62d6c7e53186ca27fc516f9988a81b9.png)

You can find this new Flow in your Studio Flows dashboard in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/studio/flows) or the [legacy Console](https://console.twilio.com/us1/develop/studio/flows). It has the name that you provided for the **Connector Friendly Name** field when configuring the Connector.

The **Connect Virtual Agent** widget includes the settings you provided during the Connector setup. You can customize the Widget further. This could include passing additional parameters from Twilio to the Dialogflow agent.

To learn more about the available parameters, consult the [Connect Virtual Agent Widget][connect-va-widget] documentation.

To control what happens before and after the Twilio call, add other Widgets to the Studio Flow.

**For example**: If a call with Dialogflow CX agent ends with a [Live Agent Handoff transition](/docs/studio/widget-library/connect-virtual-agent#connect-virtual-agent-transitions), you might add a [Connect Call To Widget](/docs/studio/widget-library/connect-call). This connects the caller to a live agent's phone.

#### Configure a Twilio number to connect to your Virtual Agent Studio Flow

Once you're happy with your Flow and you've published all changes, you can connect it to a Twilio Number so people can start interacting with it.

## Twilio Console

1. Open [Twilio Console](https://1console.twilio.com/) and go to [**Phone Numbers** > **Manage** > **Active numbers**](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory). Select the number you'd like to connect to the Flow. If you don't have a phone number yet, [buy one](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/number-requests) from the Console.
2. On the phone number's details page, find **Voice Configuration**.
3. For **A call comes in**, select **Studio Flow**.
4. Select the Studio Flow you want to connect to this number.
5. Select **Save** to save your changes.

## Legacy Console

1. Open the [Active Numbers section of the legacy Console](https://console.twilio.com/us1/develop/phone-numbers/manage/active) and select the number you'd like to connect to the Flow. If you don't have any phone numbers, [purchase one from the Console](https://help.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console).
2. On the phone number's configuration page, scroll to the **Voice & Fax** section.
3. For **Configure With**, select **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service**.
4. For **A Call Comes In**, select **Studio Flow**.
5. Select the Studio Flow you want to connect to this number.
6. Select **Save** to save your changes.

Your Flow is connected to your Twilio number.

### \<VirtualAgent> TwiML noun

You can also integrate your Dialogflow CX agent using the TwiML \<VirtualAgent> noun.

> \[!NOTE]
>
> New to using TwiML? Consult the [TwiML overview](/docs/voice/twiml) and learn how it handles Twilio Voice calls.

To generate TwiML, use one of [Twilio's SDKs](/docs/libraries).

> \[!NOTE]
>
> Connect a Programmable Voice call to a Dialogflow CX agent
>
> ```js
> const VoiceResponse = require('twilio').twiml.VoiceResponse;
>
> const response = new VoiceResponse();
> const connect = response.connect({
>   action: 'https://myactionurl.com/twiml',
> });
> connect.virtualAgent({
>   connectorName: 'project',
>   statusCallback: 'https://mycallbackurl.com',
> });
>
> console.log(response.toString());
> ```
>
> ```py
> from twilio.twiml.voice_response import Connect, VoiceResponse, VirtualAgent
>
> response = VoiceResponse()
> connect = Connect(action='https://myactionurl.com/twiml')
> connect.virtual_agent(
>     connector_name='project', status_callback='https://mycallbackurl.com'
> )
> response.append(connect)
>
> print(response)
> ```
>
> ```cs
> using System;
> using Twilio.TwiML;
> using Twilio.TwiML.Voice;
>
>
> class Example
> {
>     static void Main()
>     {
>         var response = new VoiceResponse();
>         var connect = new Connect(action: new Uri("https://myactionurl.com/twiml"));
>         connect.VirtualAgent(connectorName: "project", statusCallback: "https://mycallbackurl.com");
>         response.Append(connect);
>
>         Console.WriteLine(response.ToString());
>     }
> }
> ```
>
> ```java
> import com.twilio.twiml.voice.Connect;
> import com.twilio.twiml.VoiceResponse;
> import com.twilio.twiml.voice.VirtualAgent;
> import com.twilio.twiml.TwiMLException;
>
>
> public class Example {
>     public static void main(String[] args) {
>         VirtualAgent virtualagent = new VirtualAgent.Builder()
>             .connectorName("project")
>             .statusCallback("https://mycallbackurl.com").build();
>         Connect connect = new Connect.Builder()
>             .action("https://myactionurl.com/twiml").virtualAgent(virtualagent)
>             .build();
>         VoiceResponse response = new VoiceResponse.Builder().connect(connect)
>             .build();
>
>         try {
>             System.out.println(response.toXml());
>         } catch (TwiMLException e) {
>             e.printStackTrace();
>         }
>     }
> }
> ```
>
> ```php
> <?php
> require_once './vendor/autoload.php';
> use Twilio\TwiML\VoiceResponse;
>
> $response = new VoiceResponse();
> $connect = $response->connect(['action' => 'https://myactionurl.com/twiml']);
> $connect->virtualagent(['connectorName' => 'project', 'statusCallback' => 'https://mycallbackurl.com']);
>
> echo $response;
> ```
>
> ```rb
> require 'twilio-ruby'
>
> response = Twilio::TwiML::VoiceResponse.new
> response.connect(action: 'https://myactionurl.com/twiml') do |connect|
>     connect.virtual_agent(connector_name: 'project', status_callback: 'https://mycallbackurl.com')
> end
>
> puts response
> ```
>
> ```xml
> <?xml version="1.0" encoding="UTF-8"?>
> <Response>
>   <Connect action="https://myactionurl.com/twiml" >
>     <VirtualAgent connectorName="project" statusCallback="https://mycallbackurl.com"/>
>   </Connect>
> </Response>
> ```

To learn how to use this TwiML noun, consult the [\<VirtualAgent> documentation](/docs/voice/twiml/connect/virtualagent/virtualagent-dialogflow-cx).

## Support for Dialogflow CX features

### Generative AI features

By default, Dialogflow CX integration includes the following GenAI features. These features leverage GenAI to build workflows, provide answers, create LLMs using your data, and respond in native languages. Twilio supports these features at [an additional cost][voice-pricing]. You incur this cost only after you configure one or more of these features for your agent.

#### Generative playbooks

Reduce agent creation time with these playbooks. You need only provide natural language instructions and structured data to an LLM. It then generates agent behavior and responses for you. These differ from flows which use LLMs to figure out intent. Flows grant you more control over the agent's behavior and answers.

To learn more, consult Google's documentation on [Generative playbooks][generative-playbooks].

#### Generative fallback

Have GenAI respond when Twilio doesn't recognize a caller's answers or intent. If a caller has a question that doesn't match any training phrases, Twilio can create a response using Dialogflow CX.

To learn more, consult Google's documentation on [Generative fallback][generative-fallback].

#### Generators

Create responses and agent behavior runtime through the combination of Google LLMs and your prompts. By querying an LLM using a Generator, your agent can create a response in real time.

To learn more, consult Google's documentation on [Generators][generators].

#### Data store agents

Configure retrieval-augmented generation (RAG) of your own data. As part of a [Generative Playbook](#generative-playbooks), you can link to an LLM of your own data. Any queries then use that data to craft a response.

To learn more, consult Google's documentation on [Data store agents][data-store-agents].

#### Language-specific data generation

Use the training data and intents of your default language to generate training phrases in another language.

To learn more, consult Google's documentation on [generating language-specific data][language-specific-data].

[voice-pricing]: /voice/pricing

[generative-playbooks]: https://cloud.google.com/dialogflow/cx/docs/concept/playbook?hl=en

[generative-fallback]: https://cloud.google.com/dialogflow/cx/docs/concept/generative-fallback?hl=en

[generators]: https://cloud.google.com/dialogflow/cx/docs/concept/generators?hl=en

[data-store-agents]: https://cloud.google.com/dialogflow/cx/docs/concept/data-store/settings?hl=en

[language-specific-data]: https://cloud.google.com/dialogflow/cx/docs/concept/agent-multilingual#ai-generate-data

### Native welcome intent

When you configure the Dialogflow CX Connector within Twilio, you can specify a welcome intent. When Twilio connects a call to your Dialogflow CX agent, this triggers the welcome intent. **For example:** the agent could say "Hello" to the caller before they start speaking.

You can use and customize the [Dialogflow CX agent's default welcome intent](https://cloud.google.com/dialogflow/cx/docs/concept/intent). Edit this default welcome intent within Dialogflow.

### Custom agent parameters

You can pass custom parameters to the Dialogflow CX agent either within the [Connect Virtual Agent Studio Widget][] or from the [\<VirtualAgent> TwiML noun][VirtualAgent TwiML noun]. You can also [configure parameters][] in your agent's setting in the Google Cloud console.

[Connect Virtual Agent Studio Widget]: /docs/studio/widget-library/connect-virtual-agent#optional-configuration-for-connect-virtual-agent

[VirtualAgent TwiML noun]: /docs/voice/twiml/connect/virtualagent/virtualagent-dialogflow-cx#custom-parameters

[configure parameters]: https://cloud.google.com/dialogflow/cx/docs/concept/parameter

### Pause and resume a conversation session

You can pause and resume a Dialogflow CX [session][dialogflow-session]. While keeping the session context intact, Dialogflow and Twilio can pass the call back and forth. When Twilio passes the call to Dialogflow, the caller won't need to repeat themselves or start over.

You can use pause and resume a session either within the [Connect Virtual Agent Studio Widget][connect-va-transitions] or from the [\<VirtualAgent> TwiML noun][twiml-va-pause]. A session can be paused and resumed anytime within its 30 minute time-to-live (TTL) window.

### End the conversation with the virtual agent

#### In Dialogflow CX console

To tell the virtual agent to end the conversation after it responds with a particular response, set the transition target for an intent to **End**. To learn more, consult [Google's docs][dcx-handler].

#### In Twilio Studio

When an intent matches the "end of the conversation" intent, the virtual agent ends the conversation. The Connect Virtual Agent Studio Widget moves the call into the [**Completed** transition state][transition-completed].

#### In a TwiML document

When an intent matches the "end of the conversation" intent, the virtual agent ends the conversation. Twilio creates a request to your action URL. Before sending the request, it sets the [VirtualAgentStatus][dcx-virtualagentstatus] field in the request to `completed`. To execute the next TwiML in your application, use either the `action` parameter or the next TwiML step `<Connect>` verb.

[dialogflow-session]: https://cloud.google.com/dialogflow/cx/docs/concept/session

[connect-va-transitions]: /docs/studio/widget-library/connect-virtual-agent#connect-virtual-agent-transitions

[twiml-va-pause]: /docs/voice/twiml/connect/virtualagent/virtualagent-dialogflow-cx#pause-and-resume-a-conversation-session

[dcx-handler]: https://cloud.google.com/dialogflow/cx/docs/concept/handler#symbolic

[transition-completed]: /docs/studio/widget-library/connect-virtual-agent#connect-virtual-agent-transitions

[dcx-virtualagentstatus]: /docs/voice/twiml/connect/virtualagent/virtualagent-dialogflow-cx#virtualagentstatus

### Support all transition states in status callbacks

If you configure status callback, Twilio can pass one or more parameters at any [virtual agent transition state][]. Status callbacks can pass parameters in requests to your application URL. These parameters include, but aren't limited to, the following:

* call status
* intents triggered
* sentiment scores
* agent-caller text

With support for all transition states, you can write custom code against the parameter values for your own contact center application.

[virtual agent transition state]: /docs/studio/widget-library/connect-virtual-agent#connect-virtual-agent-transitions

### Support all transition states in action callbacks

Twilio can pass multiple parameters at any [virtual agent transition state][]. Status callbacks can pass the following parameters in requests to your application URL.

* last intent triggered
* last sentiment score at last matched intent

With support for all transition states, you can write custom code against the parameter values for your own contact center application.

### Custom prompt voice support

Twilio supports creating prompts and responses using your own voice talent. Record and upload the samples to Google Cloud. Using your own voice talent comes at [an additional cost][voice-pricing].

* To learn how to create your own agent voice, consult Google's documentation on [User-supplied training audio data](https://cloud.google.com/text-to-speech/custom-voice/docs#user-supplied_training_audio_data).
* To learn how to integrate your agent voice, consult [this example in the VirtualAgent guide](/docs/voice/twiml/connect/virtualagent/virtualagent-dialogflow-cx#example-5-customize-the-tts-voice-and-language)

### Barge-In

You can turn on barge-in within Dialogflow CX agents. This allows callers to interrupt the virtual agent at any time. For example: You turned on "barge-in". A caller starts speaking in the middle of the agent's response. Dialogflow stops sending audio to the caller and processes the caller's next input.

To learn how to turn on the barge-in feature, consult [Google's docs](https://cloud.google.com/dialogflow/cx/docs/concept/agent#settings-speech).

### DTMF Support

An end user can also press numbers on their keypad. This sends dual-tone multi-frequency (DTMF) signaling through their telephone keypad. You can [configure DTMF](https://cloud.google.com/dialogflow/cx/docs/concept/parameter#dtmf) for a parameter in your Google Dialogflow CX console. Once turned on, your customer can use their telephone keypad to provide parameter values for an agent using a telephony [integration](https://cloud.google.com/dialogflow/cx/docs/concept/integration).

## Feedback

We appreciate hearing from you! Contact your Twilio Account Manager or [our Sales Team][sales-team]. We're looking for feedback on the following features:

* Developer experience
* Level of configurability
* Status callbacks
* Ease of transferring control of the call back to Twilio (to execute the next TwiML)
* Regional implications
* Applicable use cases

[sales-team]: https://www.twilio.com/en-us/help/sales
