# Noise Cancellation

You can remove hundreds of unwanted types of background noises from a video room using the Krisp Audio Plugin for Twilio Video to power noise cancellation powered by artificial intelligence (AI). Twilio has partnered with Krisp Technologies Inc., a leading company that provides noise reduction technology, in order to provide Twilio customers a high-quality audio experience. This feature is available for all customers using Twilio Video Rooms. There is a Krisp plugin for Twilio Video available for [JavaScript](https://www.npmjs.com/package/@twilio/krisp-audio-plugin), [iOS](https://github.com/twilio/twilio-audio-processors-ios), and [Android](https://central.sonatype.com/artifact/com.twilio/video-audio-processors).

## How Twilio AI Noise Cancellation Works

Using tens of thousands of hours of audio recordings, Krisp.ai has created a sophisticated Deep Neural Network that can differentiate between background sounds and the human voice. It's with this technology that we created the Krisp Audio Plugin for Twilio Video, a lightweight audio processor that can run inside your client application and create crystal clear audio.

The plugin needs to be loaded alongside the Twilio SDK and runs as part of the audio pipeline between the microphone and audio encoder in a preprocessing step. During this step, the AI-based noise cancellation algorithm removes unwanted sounds like barking dogs, construction noises, honking horns, and coffee shop chatter.

After the preprocessing step, the audio is encoded and delivered to the end user. Note that all of these steps happen on your device, with almost no latency, and no media sent to a server.

## Noise Cancellation for the web

### Requirements and considerations

Twilio Video Noise Cancellation requires you to host and serve the Krisp audio plugin for Twilio as part of your web application. It also requires browser support of the WebAudio API (specifically [Worklet.addModule](https://developer.mozilla.org/en-US/docs/Web/API/Worklet/addModule)). The table below lists the minimum browser version across major browsers:

|                        | **Is Supported?**                               | **Version** |
| ---------------------- | ----------------------------------------------- | ----------- |
| **Desktop**            |                                                 |             |
| Chrome                 | Supported                                       | 66          |
| Edge                   | Supported                                       | 79          |
| FireFox                | Supported                                       | 76          |
| Safari                 | Not supported (see [Limitations](#limitations)) | -           |
| **Mobile**             |                                                 |             |
| Chrome on Android      | Supported                                       | 66          |
| iOS (Safari or Chrome) | Not supported (see [Limitations](#limitations)) | -           |

If you try to use Krisp noise cancellation on a browser that is not supported, the SDK will return a non-Krisp enabled track to the application and your audio will follow the standard audio pipeline. In this case, you will get audioTrack with `audioTrack.noiseCancellation` set to null.

#### Additional considerations

* Noise cancellation will increase CPU load on a device, as all the preprocessing happens on the device.
* You can only run one audio track through the audio plugin pipeline per Participant.
* When acquiring an audio track with Krisp noise cancellation enabled, we recommend that you disable browser's in-built noise cancellation by specifying noiseSuppression: false as one of the constraints. However, one caveat is if you disable Krisp noise cancellation at runtime, you would not get browser's noise cancellation.

### Steps to use Noise Cancellation

#### Step 1: Install the plugin

The plugin is [available on NPM](https://www.npmjs.com/package/@twilio/krisp-audio-plugin).

You can install it with

```bash
npm install @twilio/krisp-audio-plugin
```

Once you install the plugin, you need to host the contents of `./node_modules/@twilio/krisp-audio-plugin/dist/` from your web server. We recommend that you add the plugin version number to the hosted path to ensure that the browser does not use stale version when it's updated.

#### Step 2 Configure your application

If your application is using the `default-src self` content security policy directive, then you should add another directive `unsafe-eval`, which is required for the Krisp Audio Plugin to load successfully. In your application code, you will need to specify that you want to use Krisp in `noiseCancellationOptions` when you create the local audio track. You also need to specify the path where your application server is hosting Krisp files from step 1 above.

```javascript
const { connect, createLocalAudioTrack } = require('twilio-video');

// Create a LocalAudioTrack with Krisp noise cancellation enabled.
const localAudioTrack = await createLocalAudioTrack({
  noiseCancellationOptions: {
    sdkAssetsPath: 'path/to/hosted/krisp/audio/plugin/dist',
    vendor: 'krisp'
  }
});

if (!localAudioTrack.noiseCancellation) {
  // If the Krisp audio plugin fails to load, then a warning message will be logged
  // in the browser console, and the "noiseCancellation" property will be set to null.
  // You can still use the LocalAudioTrack to join a Room. However, it will use the
  // browser's noise suppression instead of the Krisp noise cancellation. Make sure
  // the "sdkAssetsPath" provided in "noiseCancellationOptions" points to the correct
  // hosted path of the plugin assets.
} else {
  // Join a Room with the LocalAudioTrack.
  const room = await connect('token', {
    name: 'my-cool-room',
    tracks: [localAudioTrack]
  });
}

/**
 * Enable/disable noise cancellation.
 * @param {boolean} enable - whether noise cancellation should be enabled
 */
function setNoiseCancellation(enable) {
  const { noiseCancellation } = localAudioTrack;
  if (noiseCancellation) {
    if (enable) {
      // If enabled, then the LocalAudioTrack will use the Krisp noise
      // cancellation instead of the browser's noise suppression.
      noiseCancellation.enable();
    } else {
      // If disabled, then the LocalAudioTrack will use the browser's
      // noise suppression instead of the Krisp noise cancellation.
      noiseCancellation.disable();
    }
  }
}
```

### Limitations and known issues \[#limitations]

* Safari is not a supported browser due to API unreliability on version 15.x. This will be reevaluated in future versions.
* Chrome on iOS is not supported and can unsuccessfully fail at returning a non-Krisp enabled track on certain iOS versions. We recommend to not apply Krisp noise suppression on iOS at this time.

## Noise Cancellation for iOS

Noise cancellation for iOS is available using an audio device called `NoiseCancellationProcessor`, which is provided in the [TwilioAudioProcessors SDK](https://github.com/twilio/twilio-audio-processors-ios).

This feature requires Twilio Video iOS SDK version 5.4 or higher.

The following code sample demonstrates how to enable the Twilio Video `NoiseCancellationProcessor` on iOS.

```swift

// import the SDK
import TwilioAudioProcessors

// initialize the audio device to use Krisp
TwilioVideoSDK.audioDevice = NoiseCancellationProcessor()

// disable noise cancellation while using Krisp audio device
guard let krispAudioDevice = TwilioVideoSDK.audioDevice as? NoiseCancellationProcessor else {
  fatalError("Current audio device is not of type NoiseCancellationProcessor")
}
krispAudioDevice.pauseProcessing = true

```

## Noise Cancellation for Android

Noise cancellation for Android is available using a custom audio device called `NoiseCancellationAudioDevice`, which uses the Twilio Video Android SDK's AudioDevice framework. You can find the package on [Maven Central](https://central.sonatype.com/artifact/com.twilio/video-audio-processors) and access its documentation [here](https://sdk.twilio.com/android/video-noisecancellation/latest/docs).

This feature requires Twilio Video Android SDK version 7.5.1 or higher.

The following code sample demonstrates how to enable the Twilio Video `NoiseCancellationAudioDevice` on Android.

```java
// import the NoiseCancellationAudioDevice plugin
import com.twilio.video.NoiseCancellationAudioDevice

// initialize the audio device to use Krisp
Video.setAudioDevice(NoiseCancellationAudioDevice(getApplicationContext())); /* use either application context or activity context 'this' */

```

The following code can be used to disable the noise cancellation audio processing.

```java
audioDevice = Video.getAudioDevice();
if (!audioDevice instanceof NoiseCancellationAudioDevice) {
    throw new RuntimeException("Current audio device is not of type NoiseCancellationAudioDevice");
}

// disable noise cancellation while using Krisp audio device
audioDevice.setPausedProcessing(true);

```
