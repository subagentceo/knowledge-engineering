# Turn on dual-channel recording

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

## Overview

With dual-channel recording, you can get a recording of your call with two distinct channels: a customer (caller) channel and an agent channel.

Dual-channel recording has many advantages over single-channel (mono) recordings, including:

* Each party's audio is separated into its own track, so it's easier to analyze the content of a recording using transcription and keyword analysis.
* During playback, the quality of the voice recording is better. In addition, customer and agent talks are represented by different colors in the [Flex Insights Player](/docs/flex/end-user-guide/insights/player), which makes it easier to understand the call recording.
* Call center managers and quality supervisors can focus on a single channel (just the customer or just the agent) when analyzing calls.

Learn more about the [benefits of dual-channel conference recording](https://www.twilio.com/en-us/blog/announcing-dual-channel-call-recordings-by-default).

> \[!WARNING]
>
> If you choose to record voice or video calls, you need to comply with certain laws and regulations, including those regarding obtaining consent to record (such as California's Invasion of Privacy Act and similar laws in other jurisdictions). Additional information on the legal implications of call recording can be found [in the "Legal Considerations with Recording Voice and Video Communications" Help Center article](https://help.twilio.com/hc/en-us/articles/360011522553-Legal-Considerations-with-Recording-Voice-and-Video-Communications).
>
> *Notice*: Twilio recommends that you consult with your legal counsel to make sure that you are complying with all applicable laws in connection with communications you record or store using Twilio.

You can enable dual-channel recording for Flex in the following ways:

* [Use Flex's native dual-channel recording feature](/docs/flex/developer/insights/enable-dual-channel-recordings#turn-on-dual-channel-recording-for-conference), which you can turn on in Twilio Console (recommended).
* [Install the pre-built Dual Channel Call Recording plugin](/docs/flex/developer/insights/enable-dual-channel-recordings#install-the-dual-channel-call-recording-plugin) from the Plugin Library.
* [Create a custom implementation](/docs/flex/developer/insights/enable-dual-channel-recordings#create-a-custom-implementation).

With dual-channel recording, the left channel is the customer channel, and the right channel is the agent channel. The agent channel typically includes a single contact center agent. If you listen to the recording with stereo speakers, the left speaker plays the left (customer) channel and the right speaker plays the right (agent) channel.

## Turn on dual-channel recording for Conference

We recommend you use Flex's native feature for dual-channel conference recording. When you turn on this feature, all new Conference Recordings are recorded in dual-channel format by default. The first channel of the Recording's media file contains the audio of the first Participant that joined the Conference. The second channel of the media file contains all other audio from the call.

To turn on dual-channel recording:

1. Open Twilio Console.
2. On the Flex [Voice](https://console.twilio.com/us1/develop/flex/channels/voice) page, turn on the **Call Recording** toggle.
3. On the [Voice Settings](https://console.twilio.com/us1/develop/voice/settings/general?frameUrl=%2Fconsole%2Fvoice%2Fsettings%3Fx-target-region%3Dus1) page, turn on the **Dual-channel Recording for Conference** toggle.

> \[!NOTE]
>
> To retrieve a dual-channel recording, include the `RequestedChannels=2` query parameter in your request URL. For example:
>
> `https://api.twilio.com/2010-04-01/Accounts/ACCOUNT_SID/Recordings/RECORDING_SID?RequestedChannels=2`
>
> Replace `ACCOUNT_SID` and `RECORDING_SID` with your own credentials and the recording SID you want to retrieve.

### Turn on authentication for media URLs

For the security of your recordings, consider turning on HTTP authentication on the [Recording API](/docs/voice/api/recording) endpoint. Your recording URLs are visible to any service that consumes TaskRouter events, including third-party applications installed using [Twilio Marketplace Add-ons](/docs/marketplace). Because of this, securing the endpoint is a good practice, unless your infrastructure requires this endpoint to be unsecured.

To turn on HTTP authentication:

1. In Twilio Console, open the [Voice Settings](https://console.twilio.com/us1/develop/voice/settings/general?frameUrl=%2Fconsole%2Fvoice%2Fsettings%3Fx-target-region%3Dus1) page.
2. Turn on the **Enforce HTTP Auth on Media URLs** setting.

## Install the Dual Channel Call Recording plugin

You may need to use the pre-built Dual Channel Call Recording plugin instead of the Flex's native feature if you want Flex to create a new recording when a call is transferred to another agent. The native feature records the entire Conference, including any transfers, as one recording.

To install the plugin:

1. Go to the Plugin Library page for the [Dual Channel Call Recording](https://flex.twilio.com/admin/plugins/library/JGfe055c5ec356c26dc83fac79be72dc4c) plugin.
2. Click **Install**.

### Considerations

* If you previously turned on [Call Recording](https://console.twilio.com/us1/develop/flex/channels/voice) in the Flex Voice settings, turn it off before installing the plugin. Otherwise, you might get duplicate recordings.
* If you've installed this plugin and perform a warm or cold transfer, two recordings may show. As a workaround, modify your plugin configuration to record from the customer perspective instead of the worker perspective, as shown in image below. Also, make sure you're using the latest version of the plugin.
  ![Configuration window with JSON setting channel to customer.](https://docs-resources.prod.twilio.com/0079be73279c803ce52f9719e2faef91c02cbec1abf5ac07aa8fc6a75260fe75.png)

## Create a custom implementation

If the available no-code options don't provide the solution you need, you may choose to create a custom implementation for dual-channel recording. In this case, you need to make sure your configuration can pass Flex Insights `media` metadata from Task attributes.

For Flex Insights to correctly process the dual-channel recording, you need to modify the **Send To Flex** widget and add some more info to its attributes. Flex adds the content of these attributes to the Task attributes when it creates the Task.

For complete information about required and optional configurations for this widget, see [Send to Flex Widget](/docs/studio/widget-library/send-flex).

### Modify Task attributes to include media metadata

By default, the **Attributes** field looks like this:

```json
{ 
  "type": "inbound",
  "name": "{{trigger.call.From}}"
}
```

Update the field to include a `conversations` JSON object that contains the recorded `media` metadata.

```json
{
  "type": "inbound",
  "name": "{{trigger.call.From}}",
  "conversations": {
    "media": [
      {
        "url": "https://api.twilio.com/2010-04-01/Accounts/{{widgets.CallRecording.AccountSid}}/Recordings/{{widgets.CallRecording.Sid}}",
        "type": "VoiceRecording",
        "start_time": "{{widgets.CallRecording.StartTime}}",
        "channels": ["customer", "others"]
      }
    ]
  }
}
```

The `media` object requires the following properties:

| **Key**      | **Value**                                                                                                                                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `url`        | The URL of the recording. You don't need to append the ".wav" suffix.<br /><br />Make sure you enter the correct widget name. This example uses CallRecording. <br /><br />**Note:** Variable names are case-sensitive.                                                        |
| `type`       | Static value: `"VoiceRecording"`.                                                                                                                                                                                                                                              |
| `start_time` | Flex needs to know the start time of the recording to correctly calculate segment offsets in the conversation. The start time of the recording is accessible in liquid via the `{{widgets.CallRecording.StartTime}}` key. The start time should be defined in ISO 8601 format. |
| `channels`   | The order of channels in the recording.<br /><br />Static value: `["customer", "others"]`.<br /><br />For inbound calls, the first one is the caller (customer) and the second one is the rest of the Flex conference, e.g. agent.                                             |

**Note**: Providing incorrect values in the `media` object could introduce inconsistencies to metrics like conversation talk times in Flex Insights.
