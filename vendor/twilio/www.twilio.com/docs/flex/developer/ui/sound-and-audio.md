# Sounds and audio in Flex

## Overview

There are many reasons you might want to play a sound in Flex UI. You can use the following Flex APIs to define custom sounds based on your needs:

* Use the [SoundManager API](#soundmanager-api) to customize the Flex ringtone that plays for inbound tasks. Specifically, this API lets you play custom sounds for inbound tasks on different task channels.
* Use the [AudioPlayerManager API](#audioplayermanager-api) to create other custom sounds. For example, you can use this API to configure sound to indicate that participants have joined or left a conference.

## SoundManager API

Flex provides a default ringtone that plays the same sound for inbound tasks on all task channels. If you don't need to differentiate your sounds by channel, you can enable the default ringtone by [turning on the **Play ringtone for inbound tasks in Flex** setting in Console](/docs/flex/admin-guide/setup/default-ringtone).

To play custom notification sounds in Flex, you can use the SoundManager API to do the following:

* **Configure sounds by channel**: Set sounds for different communication channels like voice, chat, SMS, WhatsApp, and others. The sounds you configure apply to incoming tasks with a pending status. For each channel, you can customize:
  * Whether to play a custom URL or use the default ringtone.
  * Whether the sound repeats or only plays once.
* **Use the default sound across channels**: Call the SoundManager API without parameters to apply the default configuration where incoming tasks with a pending status play a default ringtone on all the channels you use. This provides the same behavior as the inbound task notification setting in Flex Console.

To call the SoundManager API, you must create a [custom plugin](/docs/flex/developer/ui-and-plugins#flex-plugins) to execute your configuration at runtime.

**Note**: The SoundManager API takes precedence over the inbound task notification setting in Console. If you call the SoundManager API, Flex uses the configuration you pass, even if the Console setting is turned off.

You can call the SoundManager API using the `SoundManager.configure()` method with the definition for the task channel. See the following code samples as an example. For the list of available properties, see the [Flex UI API reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/).

### Configure sounds by task channel

The following shows the `SoundConfig` definition, which defines the configuration for a specified task channel or channels.

```javascript
type SoundConfig = {  
  taskChannelName?: string;  // The task channel for which the sound settings will be applied. (Optional)  
  reservationSounds: ReservationSound[];  // A list of reservation sounds for different statuses.  
};
```

The `reservationSounds` parameter contains these fields.

| Field                         | Description                                                                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| reservationStatus \[required] | You must set this to `ReservationStatuses.Pending`. The SoundManager API currently only supports sounds for tasks with a pending status. |
| url \[optional]               | The URL of the custom sound file. If you don't provide a URL, Flex plays the default ringtone.                                           |
| repeatable \[optional]        | A Boolean value that indicates whether the sound repeats or only plays once. Defaults to `true`.                                         |

```javascript {title="Example configuration for the voice and chat channels"}
SoundManager.configure([
  {
    taskChannelName: "call",  // Configuring sound for the 'Call' task channel
    reservationSounds: [
      { 
        reservationStatus: ReservationStatuses.Pending,  
        url: "https://example.com/call-accepted.mp3",    // URL of the custom sound file
        repeatable: false                                // Sound will play only once
      }
    ]
  },
  {
    taskChannelName: "chat",  // Configuring sound for the 'Chat' task channel
    reservationSounds: [
      { 
        reservationStatus: ReservationStatuses.Pending,  
        url: "https://example.com/chat-accepted.mp3",      // URL of the custom sound file
        repeatable: false                                 // Sound will play only once
      }
    ]
  }
]);
```

## AudioPlayerManager API

To play custom sounds that aren't associated with an inbound task, use the AudioPlayerManager API. This API supports playing, stopping, and muting sounds.

Sounds are either repeatable or non-repeatable:

* **Repeatable media** play in a loop, like a phone ringing that doesn't stop. The only way to stop repeatable media is to manually call the stop method.
* **Non-repeatable media** play once, like a beep or bleep. Non-repeatable media automatically stop after being played once.

The media to play is defined as follows:

```javascript
export interface MediaData {
    url: string;
    repeatable: boolean;
}
```

To play media, you must specify the URL where the media file is located and declare whether or not the sound is repeatable:

```javascript
const mediaId = Flex.AudioPlayerManager.play(
{
    url: "sound-url",
    repeatable: true
},
(error: Flex.AudioPlayerError) => {
    // handle error
}
);

```

### Handling errors

If there is an error while playing the media, a notification appears with the error. Some possible errors include:

| **Error**      | **Message**                                                                                                                                                                                 | **Cause**                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `NotAllowed`   | Can't play sound because permissions for playback of media weren't given or were denied. To find out more about how to fix this error, see the [Troubleshooting](#troubleshooting) section. | The user hasn't interacted with the site and the browser doesn't allow sound to play.                                 |
| `InvalidMedia` | Can't play sound. Provided media isn't valid.                                                                                                                                               | The provided media isn't valid; this could be an incorrect file type, an incorrect URL path, or a corrupted file.     |
| `Other`        | Error playing media.                                                                                                                                                                        | Other exceptions. This could depend on browser implementation details, media player implementation, or other factors. |

### Stop media playback

To stop media playback, use the `mediaId` returned from the `play` method (described above):

`Flex.AudioPlayerManager.stop(mediaId);`

### Mute media

To mute or unmute sounds, use the following method:

`Flex.AudioPlayerManager.toggleSound(true/false);`

Mute or unmute won't stop media that's playing. The audio still plays but the volume is set to zero.

### Repeatable and non-repeatable media

Repeatable and non-repeatable media can play at the same time, but there can only be one repeatable and one non-repeatable media playing at a given time. This configuration means that only two media can play at once: one repeatable and one non-repeatable media.

If the media is repeatable, calls to `Flex.AudioPlayerManager.play` enqueue the media and play them one after another. You can stop a repeatable media that isn't playing (but is enqueued) to remove it from the queue. Stopping a repeatable media that's playing stops the sound and plays the next media in the queue (if the queue isn't empty).

If the media is non-repeatable, it plays only if no other non-repeatable media is already playing. Non-repeatable media are **not** enqueued. You can stop a non-repeatable media that's playing to stop the sound.

For example, to play a sound when a chat message comes in:

```javascript
Flex.Manager.getInstance().chatClient.on("messageAdded", () => {
    const mediaId = Flex.AudioPlayerManager.play({
        url: "sound-url",
        repeatable: true
    });
})
```

## Troubleshooting

### Browsers may block sound and media autoplay

Browsers, especially [Google Chrome](https://developer.chrome.com/blog/autoplay/), have strict policies that limit when sound or media can play automatically. Media may not play if:

* The tab was refreshed and has not received any user input.
* Flex automatically reopened in a separate window or tab and hasn't received user input.
* The tab was opened a long time ago.
* There are multiple tabs playing sounds at the same time.

### Sounds play with interaction

For sounds to play, the agent must first interact with Flex UI, such as clicking anywhere on the page. If a sound is triggered before the agent interacts with the site, it will start playing automatically after the first interaction.

### How queued media play

* Repeatable media: The first triggered media will play. After it finishes, the next in the queue will play.
* Non-repeatable media: The first triggered media that hasn't been stopped will play.

### Sample scenarios for repeatable medias

![Sequence diagram showing media play and stop actions between Customer and AudioPlayerManager before and after user interaction.](https://docs-resources.prod.twilio.com/8878727a3c9bf94a7297003965fb642603e4e67480ce89de00bf2f1f870275a8.png)

![Sequence diagram showing media playback interactions between customer and AudioPlayerManager.](https://docs-resources.prod.twilio.com/9c1472aedb2d49449671b2678392b3f3362b7bbefcd108b79eaef8dadf8ea3cd.png)

### Sample scenario for non-repeatable medias

![Sequence diagram showing non-repeatable media interactions between Customer and AudioPlayerManager.](https://docs-resources.prod.twilio.com/cd9f38ab79bd4afc7df70e6b7f9271d9173eebe0dd93710f17520f70f0935956.png)

### Workarounds

#### Chrome

* **Allow the hostname**: Add the hostname at `chrome://settings/content/sound` to allow it to play sound. **Note**: This doesn't require enterprise policies.
* **Change enterprise policies**: Add the hostname to the [list of allowed hostnames](https://dev.chromium.org/administrators/policy-list-3#AutoplayWhitelist). Note: This requires enterprise policies.

#### Firefox

**Allow hostname**: Add the hostname in the [audio settings list](https://support.mozilla.org/en-US/kb/block-autoplay) `about:preferences#privacy` and allow it to always play sound.

#### Safari

**[Allow autoplay sound for hostname](https://support.apple.com/guide/safari/stop-autoplay-videos-ibrw29c6ecf8/mac)**: In the Safari app, choose **Safari** > **Settings for *This\_Website***. Under **Auto-Play**, select **Allow All Auto-Play**.
