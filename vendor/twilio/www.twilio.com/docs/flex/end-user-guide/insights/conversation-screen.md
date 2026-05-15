# Conversation Screen

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

The primary focus of contact centers is conversations between your agents and your customers. To that end, Flex Insights allows you to drill down from dashboards and reports to individual conversations.

## Segments

[Conversations that have multiple segments](/docs/flex/end-user-guide/insights/conversation-structure) show a list of segments in the top right corner. The segments are listed in the order in which they happened and show talk time. You can click on individual segments to listen to them.

![Segments with times 02:18 and 04:26 highlighted.](https://docs-resources.prod.twilio.com/414be69eb860678f4e13192edde0a2e9f82ac43f40a8838bd2668fb2a7743bc1.png)

## Player

You can play call segments of a conversation in a rich visual player that highlights agent speaking, customer speaking, silences, and cross-talks.

![Audio waveform with call details for Molly Robins in Gold Sales.](https://docs-resources.prod.twilio.com/229dbb8b873e84963b9868c49549e0e7f69dc87cb325b0189661439744ecdef3.png)

You may also speed up and slow down playback and share the current playhead position in [Player](/docs/flex/end-user-guide/insights/player).

> \[!NOTE]
>
> Waveform (blue, green, red, and orange bars) is not available in the [Conversation Screen](/docs/flex/end-user-guide/insights/conversation-screen) for recordings that are stored externally. This means users will not see when an agent or customer is speaking while playing back recordings.

## Chat Transcript

If a conversation is a chat you can view chat transcript in a pane on the conversation screen. Any conversation handled via [Twilio Conversations](/en-us/messaging/conversations-api) has a transcript available. Open the chat transcript using the context menu in any of the panes in the conversation screen.

![Chat transcript showing a conversation between a customer and support about linking chat and call tasks.](https://docs-resources.prod.twilio.com/e9cac9c94694755d7a958e7d9679ea5958c9b83b42865cca8da8e6656c5170c9.png)

**Chat transcripts are available for chat conversations that happened 15 Nov 2019 or later.**

## Comment

You can attach comments to conversations at any time. Each comment allows a free text and a category. Categories enable you to quickly mark conversations as Good, Neutral, Poor, Good for Training, and others.

![Comment section with category dropdown and text input field.](https://docs-resources.prod.twilio.com/63d6d2f8dce2c095373791679bf89acaf82357853c3f3bcb13206629755bb444.png)

Comments are visible in the Agent Feedback pane, and you can report on them in Flex Insights.

## Assess

You may assess conversations at any time when viewing a conversation. You can answer the questions with one of the available answers, which may have an attached score. You may then report on top of that score in Flex Insights.

![Assessment form with compliance and script evaluation options.](https://docs-resources.prod.twilio.com/481262d7b8a1464ba465ce1b16bcd0a701c8337e51e80a6b00c0d32f20b9e9ad.png)

Check how to make Assessments in Flex Insights in [this article](/docs/flex/end-user-guide/insights/conversation-assessments).

## Conversation Info

The Conversation Screen shows basic information about the currently chosen segment.

![Call with Molly Robins in Gold Sales, duration 4:15.](https://docs-resources.prod.twilio.com/a2e9ad53f516bb65f921fec934a4612a8059e5a6a074e70bf03f50e6250c7f3b.png)

From left to right:

* **Agent Name** - The name of the agent who handled the current segment. This may be different for other segments in the conversation.
* **Handling Team** - The agent's team (when handling the segment).
* **Customer** - The name or phone number of the customer.
* **Reflection Score** - If the agents have rated themselves in this segment, this is the average score of that rating.
* **Recording Duration** - The total duration of this recording.

## Agent Feedback

The Agent Feedback section shows all feedback received by the agent handling the conversation. The feedback is sorted from most recent to oldest. To view the conversation to which a feedback item is attached, just click on the feedback item.

![Agent feedback card showing neutral and training comments.](https://docs-resources.prod.twilio.com/ad104d365a7bf283e100e7f751174e0dd8cf7849c88ea5bad0c04531a5873489.png)

## Access to Conversation Screen from Analytics Portal

> \[!WARNING]
>
> These preferences are only available for Flex UI 1.25 or newer.

If you user Flex Insights on [Analytics Portal](https://analytics.ytica.com/) outside of Flex you can setup the domain on which your Flex runs. This enables users to drill down from Analytics Portal to your Flex instance.

For all new accounts the drill down leads to hosted Flex. In case you run self hosted Flex you should change the setup so your users land in Flex running on your domain.

For accounts created before this feature was introduced the drill down leads to a standalone application outside of Flex. We recommend to change the setup to either hosted or self hosted Flex.

To change the domain of your Flex instance follow these steps:

* Login to your Flex. You need to have **admin** role.
* On the admin screen click **Viewing Conversations**
* Choose whether you have hosted or self hosted Flex
* For self hosted Flex provide domain on which your Flex instance is running
* Click **Save**

It can take up to 10 minutes for your changes in setup to be applied.

![Conversation viewing settings with options for hosted or self-hosted Flex and legacy screen.](https://docs-resources.prod.twilio.com/1ab59e71efa8fb86176c983643b93c918ff845010599237d1ff351da07eb7ed4.png)

You have the following options:

* **Hosted Flex.** Redirects all drill downs to conversations to hosted Flex instance. This option is default for accounts created after introduction of this feature.
* **Self hosted Flex.** Redirects all drill downs to conversations to a Flex instance of your choice. You have to provide the Flex instance domain in the **Production Flex URL** field (for example myflex.mycomany.com).
* **View conversations on legacy conversation screen.** Redirects all drilldowns to conversation to legacy conversation screen. The legacy conversation screen runs outside of Flex as a standalone application. The legacy conversation screen is deprecated and will not benefit from new features introduced to Flex. The option to use the legacy conversation screen is not available for newly created accounts.

In case you have multiple versions of Flex UI running for the same account (for example production and staging) use the domain of Flex you want majority of your users to go to.
