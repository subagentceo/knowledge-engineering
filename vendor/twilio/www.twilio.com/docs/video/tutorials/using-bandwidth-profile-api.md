# Using the Network Bandwidth Profile API

## Overview

The Network Bandwidth Profile API makes it possible to specify how the downlink bandwidth of a Room Participant should be distributed among its subscribed tracks. Using this API developers can assign higher bandwidth to higher priority tracks, protect audio quality and keep the consumed network and battery resources under control.

**Note**: The Network Bandwidth Profile API requires [VP8 Simulcast](/docs/video/tutorials/working-with-vp8-simulcast) to function optimally. If the majority of your Video Rooms only have two Participants then you don't need to use the Network Bandwidth Profile API.

## What is the Network Bandwidth Profile API

Twilio Rooms use a Media Server that is based on the SFU (Selective Forwarding Unit) architecture, where Participants commonly publish up to two video tracks (e.g. webcam and/or screen share) but may subscribe to many. The number of subscribed tracks typically grows in proportion to N-1 where N is the total number of Participants in the room. When scalable video codecs (such as VP8 Simulcast) are used, each track can be forwarded using multiple qualities. Hence, the Media Server needs to decide which quality is assigned to each track. In other words, it needs to determine how the available downlink bandwidth is allocated among those tracks. This requires addressing the following problems:

* To guarantee that the network does not get overloaded, which may happen if all tracks are subscribed with their maximum quality.
* To guarantee that videos rendered using larger UI areas are allocated more bandwidth than thumbnail videos.
* To avoid mobile devices consuming more bandwidth or battery than what is required for each specific use-case.
* To limit the number of displayed video tracks to what is appropriate for every use-case.
* To preserve audio quality in case of severe congestion.

![The Network Bandwidth Profile API allows developers to control how a participant's downlink bandwidth is split among tracks.](https://docs-resources.prod.twilio.com/f684aecb9083206f99c275e9bc600f3c77371ef182041ebb275f689ee426a6a8.png)

The Network Bandwidth Profile API has been created to address these issues. The following sections explain how to use it.

## Network Bandwidth Profiles default behavior \[#bw-profiles-default-behavior]

By default Bandwidth Profiling is disabled. This means that if you are not interested in Network Bandwidth Profiles or if you don't use the Network Bandwidth Profile API you should not experience any changes in your application behavior. For activating Bandwidth Profiling in a Participant, you just need to specify a `bandwidthProfile` at connect time. Once Network Bandwidth Profiles is enabled for a Participant, it cannot be disabled.

## Specifying a Network Bandwidth Profile \[#specifying-a-bw-profile]

A Network Bandwidth Profile specifies how a Participant's downlink bandwidth is consumed. Notice that it is per-Participant meaning that different Participants may have different Network Bandwidth Profiles. This also means that Bandwidth Profiling can be activated on some Participants and be inactive on others in the same Room. Developers can specify Network Bandwidth Profiles as a connect option.

**JavaScript SDK (v2.0.0+)**

```js
//Specifying a Network Bandwidth Profile at connect time
const { connect } = require('twilio-video');

const room = await connect(token,{
  name: "my-new-room",
  bandwidthProfile: {
    video: {
      mode: 'collaboration'
    }
  }
});
```

**Android SDK (v5.8.0+)**

```java
Room room = Video.connect(context, new ConnectOptions.Builder(accessToken)
                .bandwidthProfile(new BandwidthProfileOptions(new VideoBandwidthProfileOptions.Builder()
                        // Subscription mode: COLLABORATION, GRID, PRESENTATION
                        .mode(BandwidthProfileMode.COLLABORATION)
                        .build()))
                .build(),
        roomListener);
```

**iOS SDK (v3.4.0+)**

```swift
let videoOptions = VideoBandwidthProfileOptions { builder in
    
    // Maximum bandwidth (bps) to be allocated to subscribed RemoteVideoTracks
    builder.maxSubscriptionBitrate = 1500000

    // Subscription mode: collaboration, grid, presentation
    builder.mode = .presentation

}
let bandwidthProfileOptions = BandwidthProfileOptions(videoOptions: videoOptions)

// Use bandwidth profile to build the connectOptions
let connectOptions = ConnectOptions(token: accessToken) { builder in
    builder.bandwidthProfileOptions = bandwidthProfileOptions
}

// Connect to a Room with connectOptions
room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
```

The following table summarizes the meaning of the different `bandwidthProfile` parameters:

| **Parameter (`bandwidthProfile.video`)** | **Meaning**                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`mode`**                               | Specifies the algorithm that controls the bandwidth allocation. Possible values are: `grid`, `collaboration` and `presentation`. Defaults to `grid`. More information [here](#understanding-mode).                                                                                                                                                                                                                                                                     |
| **`trackSwitchOffMode`**                | Specifies whether video tracks should be switched off in case of network congestion. Possible values are `predicted` - video tracks are switched off when Twilio *predicts* network congestion, `detected` - video tracks are switched off when Twilio actually *detects* network congestion, and `disabled` - video tracks are never switched off due to network congestion. Default value is `predicted`. More information [here](#understanding-trackSwitchOffMode) |
| **`maxSubscriptionBitrate`**             | Specifies the maximum downlink video bitrate this Participant may consume in *bps*. For mobile devices it defaults to `2,400,000`, for desktop browsers it defaults to `4,000,000` in Rooms. More information [here](#understanding-maxsubscriptionbitrate).                                                                                                                                                                                                           |
| **`clientTrackSwitchOffControl`**        | Specifies how video track switch off from the client is managed. Possible values are: `auto` and `manual`. Find more information about clientTrackSwitchOffControl [here](#understanding-clientTrackSwitchOffControl).                                                                                                                                                                                                                                                 |
| **`contentPreferencesMode`**             | Specifies how the content preferences for the RemoteVideoTrack will be defined. Possible values are: `auto` and `manual`. Find more information about contentPreferencesMode [here](#understanding-contentPreferencesMode).                                                                                                                                                                                                                                            |
| **`dominantSpeakerPriority`**            | **Deprecated - use `contentPreferencesMode` instead.** Specifies the minimum priority that will be assigned to the video tracks published by the dominant speaker. Possible values are `high`, `standard` and `low`. It defaults to `standard`. More information [here](#understanding-dominantspeakerpriority).                                                                                                                                                       |
| **`maxTracks`**                          | **Deprecated - use `clientTrackSwitchOffControl` instead.** Specifies the maximum number of visible video tracks. Track filtering is based on priority (first) and N-Loudest (second) policy. By default it is `0` (i.e. unlimited). Find more information [here](#understanding-maxtracks).                                                                                                                                                                           |
| **`renderDimensions`**                   | **Deprecated - use `contentPreferencesMode` instead.** Specifies the desired UI display dimensions used to render video tracks. Dimensions are specified per-priority in pixels. Defaults are:-HD (1280x720) for `high`.-VGA (640x480) for `standard`.-QCIF (176x144) for `low`.More information [here](#understanding-renderdimensions).                                                                                                                              |

## Understanding `mode` \[#understanding-mode]

The main objective of the Network Bandwidth Profile API is to split the available downlink bandwidth among a Participant's subscribed video tracks. This is performed by an algorithm that determines how much bandwidth is allocated to each track as a function of the track priority and of the specified Network Bandwidth Profile. The `mode` parameter controls the behavior of the algorithm. Currently, `mode` can take the following values: `grid` (default), `collaboration` and `presentation`.

### Using `grid` mode \[#grid-mode]

Grid mode should be used in use-cases where all subscribed video tracks are equally important. When this mode is used, the available bandwidth is split uniformly among all the tracks independently on their priorities. This makes `grid` mode useful for UIs displaying all video tracks in a matrix, so that none of them is enhanced over the rest.

When a participant is configured to use `grid` mode, the available downlink bandwidth is split uniformly among all the received tracks, which are treated as equals independently of their priority.

![Grid mode is useful when video tracks are displayed in a matrix so that none is enhanced over the others.](https://docs-resources.prod.twilio.com/0c74f3c64a7dc87ffd8ddcd41752d9ff262d35ffef8930ecdb4abf83ef74b933.gif)

The following rules of thumb may help you understand how `grid` mode works:

* If bandwidth is large enough, all video tracks will be assigned their maximum bandwidth. This maximum depends on the render dimensions and more specifically, is proportional to the display area (i.e. `width` x `height`).
* If bandwidth decreases, the available amount will be split equally among all the tracks. Hence, all tracks drop their bandwidth by the same fraction at the same time.
* If bandwidth decreases further video tracks will start switching-off.

### Using `collaboration` mode \[#collaboration-mode]

Collaboration mode is for applications where some video tracks are more important than others but we still want to keep the rest of the video tracks visible. For example, in video calls having the typical UI layout where the dominant speaker is rendered in the central area and the rest of participants are rendered as thumbnails in a bottom row.

When a participant is configured to use collaboration mode, the available bandwidth is split in proportion to the render area assigned to each track. Hence, more relevant tracks are going to be allocated higher bandwidth.

![Collaboration mode is recommended for video calls where higher priority tracks are shown with more relevance in the UI.](https://docs-resources.prod.twilio.com/65930313cb0ecfee3b6b80ed22ec0bb282205565b9d70b5de8000330d346f5fd.gif)

The following information may help you understand how `collaboration` mode works:

* If bandwidth is large enough, all video tracks will be assigned their maximum bandwidth. This maximum depends on the render dimensions and more specifically, is proportional to the display area (i.e. `width` x `height`).
* If bandwidth decreases, the available amount will be split among tracks in proportion to the render dimensions so that tracks having double area will be assigned double bandwidth.
* If bandwidth decreases even further, the allocated amount will go down in that proportion while trying to keep all tracks visible. If bandwidth continues decreasing, at some point all tracks will get to their minimum and switch-offs will start.

### Using `presentation` mode \[#presentation-mode]

Presentation mode is for use-cases where some video tracks are critical for the end-user experience and must be preserved at any cost. For example, in webinars where a speaker shares some kind of presentation to an audience of viewers. In this case, viewers webcams should rather be switched-off if the webinar screen share quality is at risk.

When a participant is configured to use presentation mode, higher priority tracks will be assigned all the bandwidth they require so that only when all the tracks of a given priority are at their maximum the lower priority ones will be allocated. As happens with `collaboration`, this mode requires most participants to publish tracks (and specifically the highest priority track) with a scalable video codec such as VP8 Simulcast.

If bandwidth is large enough, both `collaboration` and `presentation` behave equivalently and assign the maximum bandwidth to each track in proportion to its `renderDimensions`. However, when it's not possible to allocate all that bandwidth, both modes diverge. In that case, `presentation` has the objective of keeping the screenshare video track quality (the ones with the largest render dimensions), while `collaboration` is designed for keeping higher quality only if the continuity of the rest of tracks is not compromised.

![In presentation mode, if bandwidth drops, the algorithm keeps the  track, even turning off lower ones.](https://docs-resources.prod.twilio.com/df625d058bff442e86afa924009cc3ea3e421c8d4025e1ff5d532796f0ad573e.gif)

The following may help you understand how `presentation` mode works:

* If bandwidth is large enough, all video tracks will be assigned their maximum bandwidth. This maximum depends on the render dimensions and more specifically, is proportional to the display area (i.e.`width`x`height`).
* If bandwidth decreases, the screenshare video track will remain its maximum while lower priority tracks will decrease, even if that decrease causes them to switch-off.
* If bandwidth decreases even further, lower priority tracks will be switched-off before decreasing screenshare tracks bandwidth. Only when all lower priority tracks are switched-off the screenshare track may decrease their allocation.

## Understanding `trackSwitchOffMode` \[#understanding-trackSwitchOffMode]

When a Participant's downlink bandwidth is insufficient, resulting congestion and packet loss may cause significant degradation to both audio and video quality. To avoid congestion, the Network Bandwidth Profile API algorithms monitor and estimate the available downlink bandwidth and decrease video tracks quality accordingly. However, any real-time video track has a minimum limit under which bandwidth cannot be further reduced. In the Twilio Video engine this limit is about *30Kbps* for VP8 and H.264 and at approximately *60Kbps* for VP8 Simulcast. Hence, if bandwidth keeps degrading, at some point all video tracks will reach that limit. Beyond that point, congestion will be severe enough that the application becomes unusable. To deal with this, we have introduced the `trackSwitchOffMode` parameter. `trackSwitchOffMode` allows developers to control whether less relevant video tracks should be switched off in case of congestion so that higher priority ones are protected.

**Using `trackSwitchOffMode: predicted`**

Twilio algorithms constantly estimate the available bandwidth. When `predicted` is used, lower priority video tracks will be switched-off as soon as such estimation indicates there may be congestion. Hence, `predicted` will act before congestion happens. Thanks to it, when `predicted` is used, a downlink bandwidth drop will typically not affect subscribed audio quality or higher priority video quality. However, the drawback is that the `predicted` bandwidth estimation algorithm is aggressive towards protecting higher priority tracks. This causes track switch-offs at the earliest signs of congestion. In summary: `predicted` offers maximum protection of audio and higher priority video tracks at the cost of having more lower priority video track switch-offs. By default `trackSwitchOffMode` is `predicted`.

**Using `trackSwitchOffMode: detected`**

When `detected` is used, track switch-offs will only happen after congestion actually happens. Thanks to this, `detected` will avoid any unnecessary switch-offs. However, as congestion is detected through packet loss, a downlink bandwidth drop when using this mode will typically cause choppy audio and frozen video during a few seconds. We only recommend to use `detected` if video continuity is very important for your use-case.

**Using `trackSwitchOffMode: disabled`**

When `disabled` is used, congestion will not cause any track switch-offs. Hence, in the case of severe bandwidth drop, congestion will grow and, with it, relevant packet loss will appear causing audio to be unintelligible and video to remain frozen. In general, our recommendation is not to use this mode unless you have a very good reason to do it.

![Twilio bandwidth allocation algorithms may completely switch-off the less relevant video tracks.](https://docs-resources.prod.twilio.com/c0402401187675d0e07878d6f055b102727417e6dcb59fbe4cfa366328caf720.png)

### Track Switch-offs \[#track-switch-offs]

**What track switching-off means**

When a video track is switched-off for a Participant, Twilio's Media Server removes all the track downlink traffic. This means that, for that specific Participant, the track will consume zero bandwidth. For managing track switch-offs in your application, you may find useful the following information:

* Track switch-offs are always subscriber side. In other words, only the remote tracks received at a Participant can be switched-off.
* Track switch-offs happen "per-Participant". This means that a track may be off for a given Participant (e.g. one having poor bandwidth) but on for others.
* Switched-off tracks will appear as frozen video in the UI (i.e. will show the last received frame). Hence, a switched-off track will not be rendered as a black video.

**How Track switch-offs work**

The algorithms that control track switch-off enforce the following rules:

* Audio tracks are never switched-off.
* The Network Bandwidth Profile mode influences the switch-off behavior. Check the `mode` documentation below for further details.
* Tracks with higher priority will always be switched off last. Hence, for example, if a track with priority `high` is switched off, then it is guaranteed that all tracks with priority `standard` or `low` have been switched off previously.
* Among tracks with the same priority, the track being associated to the participant with higher speaking activity will be switched off last. Hence, for example, if two `standard` tracks are candidates to be switched off, the one associated to the participant who speaks less will be preferred.

### Track Switch-ons \[#track-switch-ons]

After a track has been switched-off, it may eventually be switched on again. Track switch-on happens based on the following principles:

* As with the switch-off process, track switch-ons happen "per-Participant".
* To avoid oscillations, the off-to-on switching process has hysteresis. This means that it's not enough for the available bandwidth to recover, but that recovery must sustain during a reasonable time period (typically around 20 seconds) to have the track back to on.
* When multiple tracks are off, the track with highest priority will be switched on first.

### Programming with Video Track Switch-offs/ons \[#programming-with-video-track-switch-offs]

Each time a track is switched off/on for a Participant the Twilio Media Server sends a notification. Developers can subscribe to those events that are published at the `RemoteVideoTrack` object, as the following code snippets illustrate:

**JavaScript SDK (v2.0.0+)**

```js
remoteTrackPublication.on('subscribed', remoteTrack => {
  remoteTrack.on('switchedOff', () => {
    //You may update your UI accordingly
    // You can also determine whether a particular RemoteTrack is switched off.
    assert.equal(remoteTrack.isSwitchedOff, true);
    console.log(`The RemoteTrack ${remoteTrack.name} was switched off`);
  });

  remoteTrack.on('switchedOn', () => {
    //You may update your UI accordingly
    // You can also determine whether a particular RemoteTrack is switched off.
    assert.equal(remoteTrack.isSwitchedOff, false);
    console.log(`The RemoteTrack ${remoteTrack.name} was switched on`);
  });
});
```

**Android SDK (v5.8.0+)**

```java
RemoteParticipant.Listener remoteParticipantListener = new RemoteParticipant.Listener() {
    @Override
    public void onVideoTrackSwitchedOff(
        @NonNull RemoteParticipant remoteParticipant,
        @NonNull RemoteVideoTrack remoteVideoTrack) {}

    @Override
    public void onVideoTrackSwitchedOn(
        @NonNull RemoteParticipant remoteParticipant,
        @NonNull RemoteVideoTrack remoteVideoTrack) {}
}
```

**iOS SDK (v3.4.0+)**

```swift
extension ViewController : RemoteParticipantDelegate {
    func remoteParticipantSwitchedOnVideoTrack(participant: RemoteParticipant,
                                               track: RemoteVideoTrack) {}

    func remoteParticipantSwitchedOffVideoTrack(participant: RemoteParticipant,
                                                track: RemoteVideoTrack) {}
}

```

### Understanding `maxSubscriptionBitrate` \[#understanding-maxsubscriptionbitrate]

Sometimes developers want to limit the total downlink bandwidth consumed by their applications. There may be many reasons for this:

* To minimize the battery consumption on mobile devices.
* To save costs.
* To reserve higher qualities to premium users.
* etc.

![MaxSubscriptionBandwidth lets developers limit total downlink bandwidth, useful for controlling network or battery usage.](https://docs-resources.prod.twilio.com/f1af8b8f0ffd7690597c9cf67c66900f69aafd6f8204f7350eafe27a7af71814.png)

When `maxSubscriptionBitrate` is set in a Participant, that Participant video downlink will never consume more than the specified value expressed in *bps*. However note that it may consume less as far as the actual available network bandwidth is below.

By default, the maximum downlink bandwidth is capped to *4Mbps* in Rooms. Hence, values of `maxSubscriptionBitrate` over those limits will have no effect. Default value is:

* `maxSubscriptionBitrate: 0` (meaning "no limit"), in desktop browsers. Hence, desktop browsers default to the above mentioned caps.
* `maxSubscriptionBitrate: 2,400,000` in mobile SDKs.

It is important to remark that the use of `maxSubscriptionBitrate` for setting a bandwidth constraint may generate switch-off in your video tracks. For example, if you work in `presentation` mode with a `high` priority video track with default `renderDimensions` and set `maxSubscriptionBitrate` to say *500,000*, then you will be probably experiencing permanent track switch-offs for all the tracks except the main one.

### Understanding `clientTrackSwitchOffControl` \[#understanding-clientTrackSwitchOffControl]

There are many types of multi-party applications where the video of all participants is not rendered on screen at the same time. If a participant's video is not on screen then there is an opportunity to save CPU and bandwidth by switching off the incoming video track. When the participant needs to be displayed on screen again, the video track can be easily switched on again. Depending on developer preference this video track switch on or off can be performed automatically by the SDK or via explicit manual control.

**Using `clientTrackSwitchOffControl: 'auto'`**

With this setting the client SDK will automatically switch on or off a RemoteVideoTrack depending on the visibility of the view/document, video attachment or application lifecycle. This automatic switch on/off of the RemoteVideoTrack is managed by the SDK. This is the default setting.

**Using `clientTrackSwitchOffControl: 'manual'`**

Use this setting if the client application requires the ability to explicitly switch on or off a RemoteVideoTrack based on a desired behavior. In general switching off RemoteVideoTracks that are not currently being rendered will result in the best video quality for the tracks that are being rendered.

**JavaScript SDK (v2.14.0+)**

```js
const room = await connect(token, {
  bandwidthProfile: {
    video: {
      clientTrackSwitchOffControl: 'manual'
    }
  }
});
```

```js
// Explicitly switch off a track
remoteTrack.switchOff();
```

**Android SDK (v6.4.0+)**

```java
BandwidthProfileOptions bandwidthProfileOptions = new BandwidthProfileOptions(
        new VideoBandwidthProfileOptions.
                Builder().
                // Use "manual" for explicit track switch on/off
                .clientTrackSwitchOffControl(ClientTrackSwitchOffControl.MANUAL)
                .build());
ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
        .bandwidthProfile(bandwidthProfileOptions)
        .build();

Video.connect(context, connectOptions, roomListener);
```

```java
// the application can now request that specific RemoteVideoTracks be switched off or on, e.g.
RemoteVideoTrack.switchOn();
```

**iOS SDK (v4.5.0+)**

```swift
let connectOptions = ConnectOptions(token: accessToken) { (builder) in
  builder.bandwidthProfileOptions = BandwidthProfileOptions(
    videoOptions: VideoBandwidthProfileOptions { builder in
      builder.clientTrackSwitchOffControl = .manual
    }
  )
}

let room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
```

```swift
// The application can now request that specific RemoteVideoTracks be switched off or on, e.g.
remoteVideoTrack.switchOff()
```

### Understanding `contentPreferencesMode` \[#understanding-contentPreferencesMode]

In general it is best for the Twilio Media Server to deliver the video resolution to the client that closely matches the current render dimensions for the corresponding video element or view in the UI. This ensures the most efficient use of both CPU resources on the client and the downstream bandwidth. This in turn delivers the best end user experience. Depending on developer preference this alignment of video track resolution with actual render dimensions can be performed automatically by the SDK or via explicit manual control.

**Using `contentPreferencesMode: 'auto'`**

With this setting the client SDK will automatically detect and communicate the render dimensions of each video element to the Twilio Media Server. As the UI changes and the render dimensions of each video element or view are changed, the SDK automatically detects this and the resolution of the RemoteVideoTracks are dynamically adjusted. This is the default setting.

**Using `contentPreferencesMode: 'manual'`**

Use this setting if the client application wants to explicitly communicate the preferred render dimensions for each RemoteVideoTrack and adjust them dynamically.

**JavaScript SDK (v2.14.0+)**

```js
const room = await connect(token, {
  bandwidthProfile: {
    video: {
      contentPreferencesMode: 'manual'
    }
  }
});
```

```js
// Indicate that the remoteTrack should be delivered at a maxiumum of 320x240 resolution
remoteTrack.setContentPreferences({
    renderDimensions: { width: 320, height: 240 }
});
```

**Android SDK (v6.4.0+)**

```java
BandwidthProfileOptions bandwidthProfileOptions = new BandwidthProfileOptions(
        new VideoBandwidthProfileOptions.
                Builder().
                // Use "manual" for explicit content preferences (renderDimensions)
                .videoContentPreferencesMode(VideoContentPreferencesMode.MANUAL)
                .build());
ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
        .bandwidthProfile(bandwidthProfileOptions)
        .build();

Video.connect(context, connectOptions, roomListener);
```

```java
// Indicate that the remoteTrack should be delivered at a maxiumum of 320x240 resolution
remoteVideoTrack.setContentPreferences(new VideoContentPreferences(new VideoDimensions(320, 240)));
```

**iOS SDK (v4.5.0+)**

```swift
let connectOptions = ConnectOptions(token: accessToken) { (builder) in
  builder.bandwidthProfileOptions = BandwidthProfileOptions(
    videoOptions: VideoBandwidthProfileOptions { builder in
      builder.contentPreferencesMode = .manual
    }
  )
}

let room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
```

```swift
// Request that the remoteTrack be delivered at 320x240 resolution
remoteVideoTrack.setContentPreferences(VideoContentPreferences { builder in
  builder.renderDimensions = VideoDimensions(width: 320, height: 240)
})

```

### Understanding `maxTracks` \[#understanding-maxtracks]

**Deprecated - use `clientTrackSwitchOffControl` instead**

Note: setting both `maxTracks` and `clientTrackSwitchOffControl` is not allowed and will raise an exception.

When setting `maxTracks` to N, Twilio guarantees that at any given time no more than N video tracks will be on. Hence, Twilio keeps only the N most relevant tracks for you based on the following:

* Higher priority tracks are preferred.
* Within a priority, tracks having higher speaking activity are preferred. This is sometimes called an *N-Loudest* policy. Note that N-Loudest (i.e the N participants with higher speaking activity at a given time) is not the same than the other policy called *Last-N* (i.e. the last N dominant speakers). Twilio Network Bandwidth Profiles do not support Last-N for `maxTracks`.

Note that all the lower priority video tracks beyond the specified `maxTracks` will be switched off. Hence, given that priorities may change dynamically, your application will receive track switch-off/on [notifications](#programming-with-video-track-switch-offs) to indicate which tracks are visible at any given time.

Note also that `maxTracks` related switch-offs are not due to congestion and are not affected by the `trackSwitchOffMode` parameter. Therefore, even if you set `trackSwitchOffMode: disabled`, you may still have track switch-offs if a Participant subscribes to more than `maxTracks` video tracks.

Just for illustration, if you have a videoconferencing application with:

* A screen share track with priority `high`.
* 40 webcam tracks with priority `standard`.
* You now set `maxTracks: 5`.

Then, the algorithm will only allow the following 5 tracks to be on:

* The screen share track.
* The 4 webcam tracks corresponding to the 4-loudest participants (i.e. the 4 participants with the highest speaking activity at that time).

Remark also that `maxTracks: 0` should be read as "unlimited" meaning that Twilio will try to send all the subscribed tracks to the Participant. Note also that, by default, `maxTracks: 0`.

While `maxTracks` is "unlimited" by default, the recommended maximum value is 16.

This recommendation is highly dependent on the bitrate associated with each subscribed video track. For optimal results with two or more visible tracks you should ensure
that you specify a low [track priority](/docs/video/tutorials/using-track-priority-api) for nearly all video tracks and that your [renderDimensions](/docs/video/tutorials/using-bandwidth-profile-api#understanding-renderdimensions) for the low priority tracks are no more than 60p to 180p per track.

### Understanding `renderDimensions` \[#understanding-renderdimensions]

**Deprecated - use `contentPreferencesMode` instead**

Note: Setting both `renderDimensions` and `contentPreferencesMode` in the bandwidth profile is not allowed and will raise an exception.

Video bandwidth depends on resolution. For example, if a track is to be rendered in FullHD (1920x1080) it may make sense to reserve *4Mbps* for it. However, for a thumbnail with CIF (352x240) size that amount would not be justified.

Using `renderDimensions` developers can specify the display size, in pixels, they plan to use to render video tracks on a Participant's UI. Thanks to this, Twilio can determine what's the maximum bandwidth that should be allocated to each video track. This means that, even if the available bandwidth is in excess, our algorithms will never allocate more than what is needed to render the track with he appropriate specified size. This has multiple positive side effects:

* Network resources are preserved and used only when it makes sense.
* Bandwidth is only allocated to tracks that really needed.
* Battery life is enhanced.

In the Network Bandwidth Profile API, `renderDimensions` are specified per priority:

`high`: Specifies the render `width` and `height` (in pixels) of high priority tracks. Defaults to HD resolution:

```js
high: {
  width: 1280,
  height: 720
}
```

`standard`: Specifies the render `width` and `height` (in pixels) of standard priority tracks. Defaults to VGA resolution:

```js
standard: {
  width: 640,
  height: 480
}
```

`low`: Specifies the render `width` and `heigh` (in pixels) of low priority tracks. Defaults to QCIF resolution:

```js
low: {
  width: 176,
  heigh: 144
}
```

It is important to remark that, from the practical perspective, our algorithms use `renderDimensions` to compute the maximum video Track bandwidth. This has multiple implications you should be aware of:

* The `renderDimensions` must be understood as a hint to the desired actual rendering dimensions of video Tracks. That means that `renderDimensions` don't need to be exact. In other words, you don't need to invest much of your developing time figuring out how to update your `renderDimensions` every time the display size changes. You must concentrate instead on providing approximate hints that keep the actual proportions of your UI. That means that if a video track A is to be rendered with double size than video track B, then A's priority should have double `renderDimensions` than B's.
* The `renderDimensions` don't need to match with the actual video track dimensions. The video track dimensions will depend on aspects such as your capture constraints and the status of the network. Remember that `renderDimensions` are just a hint that you provide to help the bandwidth allocation algorithms and not a specification on actual video width and height.
* The Network Bandwidth Profile API implicitly assumes that all video tracks within a given priority are to be rendered using the same size. Experience shows that in most common use-cases this assumption is true. However, if you have a use-case where you really need different dimensions our recommendation is to set `renderDimensions` so that the resulting area (`width` x `height`) is the average of all the render areas of the tracks on that priority.

## Video Codecs and the Network Bandwidth Profile API \[#video-codecs-and-the-bw-profile]

As stated above, `collaboration` and `presentation` modes are only recommended when scalable video codecs such as VP8 Simulcast are used. Using them together with plain VP8 and H.264 will sometimes generate undesired behaviors caused by the interdependencies that appear among the different track subscribers. This may lead to problems like the following:

* The subscribed bitrate of a non-scalable track may be significantly under the available bandwidth of that subscriber, even if the publisher has a high speed network. For example, you may have a publisher and a subscriber connected to a GB cable network but have them communicating low quality video at *50Kbps* due to a third Participant connecting from a deficient network.
* When Participants publish multiple non-scalable video tracks, the bandwidth allocation for all of them will drop to the one of the lowest priority track. This may generate priority inversions in the allocation. For example, if a Participant is publishing a VP8 webcam with priority `low` and a VP8 screen-share with priority `high`, from the perspective of the bandwidth allocation, the screen-share will behave as having priority `low`. Notice that switch-offs will still preserve priority other though.

### Understanding `dominantSpeakerPriority` \[#understanding-dominantspeakerpriority]

> \[!WARNING]
>
> `dominantSpeakerPriority` is deprecated. Use `contentPreferencesMode` instead and render the dominant speaker in the largest video tile.

The Dominant Speaker refers to the Participant having highest audio activity at a given time. You can activate dominant speaker detection following [Twilio's official documentation](/docs/video/detecting-dominant-speaker). This feature is useful when you want to enhance the dominant speaker in your UI: for example, by rendering her video in the central area and with larger size. To do this appropriately, the Network Bandwidth Profile API should be used to set a higher priority to the dominant speaker video tracks. However, as the dominant speaker changes dynamically, it may be hard to figure out what are the tracks that should be prioritized at any time. To solve this problem the Network Bandwidth Profile API exposes the `dominantSpeakerPriority` parameter. Using it, developers can set the minimum priority that should be automatically assigned to the dominant speaker video tracks.

To understand how `dominantSpeakerPriority` works imagine a Room with dominant speaker detection activated where a Network Bandwidth Profile is defined with `dominantSpeakerPriority: 'high'`. Imagine that in that Room all video tracks are set to their default priority (i.e. `standard`). In that case, when Participant Alice becomes dominant speaker, automatically all Alice's video tracks will become `high` priority. If later Bob becomes dominant speaker, automatically Alice's video tracks will go back to `standard`, as she isn't dominant any longer, and Bob's video tracks will be upgraded to `high`.

![Dominant speaker priority makes it possible to change dynamically the priority of the dominant speaker's video tracks.](https://docs-resources.prod.twilio.com/4f14b6be693fe8507e292fa7a6c2e2c60a4183c0efc1b8b943f9533a66333664.gif)

As the rest of parameters in the Network Bandwidth Profile API, `dominantSpeakerPriority` works per-Participant. This means that the priority upgrades only happen on the subscriptions of the specific participant where that Network Bandwidth Profile has been defined. This also means that the dominant speaker is relative to those subscriptions. Let's illustrate that with an example. Imagine the following Room:

* Participant Alice subscribes to Bob's and Carl's tracks
* Participant Bob subscribes to all the Room tracks.
* Participant Carl subscribes only to Bob's and to Dave's tracks.
* Participant Dave subscribes only to Alice's tracks.

Imagine also that, at a given time, the speaking activity of the Participants goes in this order:

* Alice (with highest speaking activity), Dave, Bob and Carl (with lowest speaking activity).

As the dominant speaker is the Participant with highest speaking activity among all subscriptions, then the following will hold for that specific instant:

* For Alice: the dominant speaker is Bob.
* For Bob: the dominant speaker is Alice.
* For Carl: the dominant speaker is Dave.
* For Dave: the dominant speaker is Alice.

In addition, please notice the following:

* This property indicates the minimum priority of the dominant speaker video tracks. In other words, `dominantSpeakerPriority` can only upgrade the priority of the dominant speaker but never downgrade it. For example, if a developer sets `dominantSpeakerPriority: 'standard'` and the dominant speaker has a video track published with priority `high`, that video track will stay as `high`.
* By default Network Bandwidth Profiles have `dominantSpeakerPriority: 'standard'`.
* If dominant speaker detection has not been activated using the [Dominant Speaker Detection API](/docs/video/detecting-dominant-speaker), then setting `dominantSpeakerPriority` **will have no effect**.

## SDK Compatibility \[#sdk-compatibility]

| **Twilio Video SDK** | **Network Bandwidth Profile API Support** |
| -------------------- | ----------------------------------------- |
| JavaScript           | 2.0.0+                                    |
| Android              | 5.8.0+                                    |
| iOS                  | 3.4.0+                                    |
