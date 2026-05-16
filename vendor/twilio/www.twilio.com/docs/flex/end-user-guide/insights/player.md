# Play Calls

> \[!WARNING]
>
> For Customers building HIPAA-compliant workflows with Insights Player, Twilio disables the visual waveform feature (blue, green, red, orange bars) on the screen player. This means users will not see when an agent or customer is speaking while playing back recordings. To learn more about building for HIPAA compliance, please visit the latest requirements [here](https://docs-resources.prod.twilio.com/documents/architecting-for-HIPAA.pdf).

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Listening to individual calls is often a crucial part of identifying root causes behind KPIs, their changes, and long-term trends. The Insights Player helps you get a quick overview of a call, so you do not have to listen to the full length of the call.

![Call assessment dashboard showing customer experience ratings and comments for Molly Robins.](https://docs-resources.prod.twilio.com/47a23149016d5f306e7334ef737cc0229c3d21c30740c08cd725c9e705a79b51.png)

## Overlay Player

Starting with Flex UI 1.16 on drill down Player is shown as an overlay directly in Flex. The overlay Player supports playback of calls as well as viewing transcripts and custom media attached to conversations. You can still open the [Conversation Screen](/docs/flex/end-user-guide/insights/conversation-screen) from the overlay Player.

![Twilio Flex dashboard showing handling time metrics and chat transcript.](https://docs-resources.prod.twilio.com/158fc25fff64a29a4b206d1209d5c63629b6beddc044c1dfd2a93797d9ce790f.png)

## Timeline

The height of the waveform indicates how loud the speaker is speaking. In the timeline above, you can see the following items:

* **Green Waveform**: the customer is speaking
* **Blue Waveform**: the agent is speaking
* **Red Highlight**: customer and agent are talking over each other (cross-talk)
* **Orange Highlight**: a long silence

Clicking anywhere on the timeline starts playback from the selected time. The timestamps below the waveform to help you navigate within the call.

## Multiple Segments

The Insights Player shows all segments of a conversation.

When a conversation is more complex, and more agents are involved in handling a customer, each additional agent reservation is indicated in the timeline.

Agents who accepted a reservation are marked with a black plus '+' sign. Agents who completed their reservations are marked with a red minus '-' sign. Moving cursor over the symbol will show who joined or left the conversation.

![Timeline of conversation with transfers and participant changes.](https://docs-resources.prod.twilio.com/bc7708e4efd153e6606b8c64e8f61750b72378f2259a4b7bd96a5c78fbaaeee5.png)

Currently, the active segment is highlighted in the player. Inactive segments are greyed out. You can play both active and inactive segments. All comments and assessments saved in the player are attached to the highlighted active segment. The agent handling the segment shown on the left is the left bottom corner including the team they were at in.

![Timeline showing inactive and active segments with colored markers and timestamps.](https://docs-resources.prod.twilio.com/ac47b7fd44ada3e44fd2870117ed1d95296580885c941cbf4e153bae8b10def9.png)

You can switch the active segment with the buttons in the top right corner. The buttons for switching the segments are shown only for conversations with two or more segments and show time individual agents spent handling the conversation. Switching to a different segment will highlight a different part of the conversation. All subsequent comments and assessments will be attached to the chosen segment.

## Jump to calls

You may jump from Dashboards and Reports to the Player by clicking on individual segments in the table reports. The Player will open in a new window.

![Table showing call segments with details like date, time, queue, agent, talk time, and customer metrics.](https://docs-resources.prod.twilio.com/db23a0dd9ced5286a8284f4f6824179f9e48375f268155a90c9893b0c541648c.png)

## Share the current position in a call

You can share a link to a specific call by copying the link to the call from the browser address bar. Flex Insights will require login for everybody who uses the link to play a call.\
You can also get a link pointing to your current position in the call:

1. Click the player menu behind the audio waveform.
2. Click **Copy Link**.
3. Now you have a link on your clipboard, which you can paste into an email, chat message, or document to share with your colleagues.

![Audio player menu with speed options and share link.](https://docs-resources.prod.twilio.com/b5e87406976445d64cb3f9e2d4a0b235cfed03488b069970bfd3c207ce9f1ed4.png)

## Control the playback speed

With the speed controls available under the player menu button on the right side of the Player, you can choose from four different playback speeds adjusted for convenient listening:

* **Slow** — Roughly half the rate of Normal.
* **Normal** — The original speed as recorded.
* **Fast** — Roughly 50% faster than Normal.
* **Very Fast** — Almost 2x faster than Normal.

Using the *Slow* speed, you can focus more on details in the customer channel, whereas *Fast* and *Very Fast* speeds allow you to speed up the listening process.

The default speed is *Normal*, and it is set every time you open or reload the Player.
