# Adding Virtual Backgrounds

## Virtual background support on the web

Twilio Video supports background blur and replacement on the web using the optional Video Processors JavaScript library. The Video Processors library is a collection of video processing tools that can be used with the [Twilio Video JavaScript SDK](/docs/video/javascript) to apply transformations and filters, such as background blurring and virtual backgrounds, to a `VideoTrack`. You can also use the tools to create your own transformations or filters.

### Video Processors live demo

See a live demo with blurred backgrounds and virtual backgrounds in the browser using the Video Processors tools [here](https://twilio.github.io/twilio-video-processors.js/examples/virtualbackground/).

### Run the demo application

View the [Video Processors demo application](https://github.com/twilio/twilio-video-processors.js/tree/master/examples) and run the example application locally.

### Video Processors changelog

The recent changes to the library are documented [here](https://github.com/twilio/twilio-video-processors.js/blob/master/CHANGELOG.md)

### Prerequisites

* [Twilio Video JavaScript SDK](https://github.com/twilio/twilio-video.js) (v2.29+)
* [Node.js](https://nodejs.org/) (v18+)
* NPM (v10+, comes installed with newer Node versions)

### Add the Library

You can install the Video Processors library using [Node Package Manager](https://www.npmjs.com/) (npm):

```bash
npm install @twilio/video-processors --save
```

Using this method, you can import `twilio-video-processors` like so:

```javascript
import * as VideoProcessors from '@twilio/video-processors';
```

#### Using the `<script>` tag

After installing with npm, you can also copy `twilio-video-processors.js` from the `dist/build` folder and include it directly in your web app using a `<script>` tag:

```xml
<script src="https://my-server-path/twilio-video-processors.js"></script>
```

Using this method, `twilio-video-processors.js` will set a browser global:

```javascript
const VideoProcessor = Twilio.VideoProcessors;
```

Add the video processor to the Video track.

```javascript
videoTrack.addProcessor(VideoProcessor, {
  inputFrameBufferType: 'videoframe',
  outputFrameBufferContextType: 'bitmaprenderer'
});
```

#### Use of web workers

Video frame processing is handled by web workers on all major browsers preventing the main thread from blocking. Support for cross-domain worker hosting is now available. Below is an example of a cross-domain configuration:

```javascript
import { GaussianBlurBackgroundProcessor } from '@twilio/video-processors';

/* Application is running at https://example.com/app */

const processor = new GaussianBlurBackgroundProcessor({
  assetsPath: "https://example.net/path/to/assets"
});
```

Note that this requires the `Access-Control-Allow-Origin` headers to properly point to your application domain.

### API documentation

View the latest Video Processors JavaScript library documentation [here](https://twilio.github.io/twilio-video-processors.js/index.html).

Documentation for version 2.x Video Processors JavaScript library is available [here](https://twilio.github.io/twilio-video-processors.js/versions/2.2.0/).

### Supported browsers

The following table lists the browsers and operating systems supported by the Video Processors JavaScript library.

|             | **Chrome** | **Firefox** | **Safari** | **Edge (Chromium)** |
| ----------- | ---------- | ----------- | ---------- | ------------------- |
| **Android** | ✓          | ✓           | -          | -                   |
| **iOS**     | ✓          | -           | ✓          | -                   |
| **Linux**   | ✓          | ✓           | -          | -                   |
| **MacOS**   | ✓          | ✓           | ✓          | ✓                   |
| **Windows** | ✓          | ✓           | -          | ✓                   |

### Hardware requirements

The Video Processors library is CPU intensive as it processes each video frame individually. The library uses Web Assembly and will offload some video processing to the GPU; however, there is a minimum hardware requirement to ensure that the device isn't overpowered and has resources to support the ongoing video call.

The following is the minimum hardware specification:

* CPU: Intel i5-7200
* GPU: Intel HD Graphics 620
* RAM: 8GB
* OS: Windows 10 Pro

Example: HP ProBook 450 G4

## Virtual background support in mobile applications

You can use virtual backgrounds for the Video Android SDK or Video iOS SDK by using the optional plugin libraries. The plugins support both background replacement and background blurring. The plugin applies a segmentation filter to the incoming video frames from the camera to either blur or replace the background. The plugin preserves pixels associated with the head, face, and shoulders.

In this guide, you'll learn how to use virtual backgrounds with the Video Android SDK and Video iOS SDK. Note that the virtual background functionality is provided as-is and the accuracy of the background segmentation can be impacted by lighting conditions.

### Virtual background on Android

The virtual background functionality for Android is available in the `VirtualBackgroundProcessor` plugin library. This includes both `VirtualBackgroundVideoFrameProcessor` and `BlurBackgroundVideoFrameProcessor` background image filters.

The following code snippet shows how to apply a virtual background frame processor to a `VideoCapturer` instance to modify the incoming frames from the camera.

```java
VideoCapturer capturer = Camera2Capturer(context, "myCameraId", new BlurBackgroundVideoFrameProcessor(context, 15), null);
localVideoTrack = LocalVideoTrack.create(this, true, capturer, "myAudioTrackName");
```

**Note**: When using the `VirtualBackgroundProcessor` plugins, you should include the following code in your `proguard-rules.pro` file:

```java
 -keep class com.google.mlkit.common.** { *; }
 -keep class com.google.mlkit.vision.** { *; }
```

### Virtual background on iOS

The virtual background functionality for iOS is available in the `TwilioVirtualBackgroundProcessors` plugin library. With this library, you can extend the `TVIBackgroundProcessor` delegate to implement a background processor or you can use the `TVIDefaultBackgroundProcessor` API to perform background processing. To use the `TVIDefaultBackgroundProcessor`, pass a `TVIDefaultBackgroundProcessor` instance when creating a `TVICameraSource` object.

**Note**: `TVIDefaultBackgroundProcessor` is only supported on *iOS 17* or later. Loading this library in apps with a lower deployment target will result in unexpected behavior.

`TVICameraSource` has an initializer API that accepts an instance of `TVIDefaultBackgroundProcessor` or a custom implementation of `TVIBackgroundProcessor` protocol.

```swift
- (nullable instancetype)initWithOptions:(nonnull TVICameraSourceOptions *)options
                                delegate:(nullable id<TVICameraSourceDelegate>)delegate
             backgroundProcessorDelegate:(nonnull id<TVIBackgroundProcessor>)backgroundProcessorDelegate
```

The following example shows how to use the API:

```swift
    var camera: CameraSource?
    var backgroundProcessor: DefaultBackgroundProcessor?
    var backgroundImage: UIImage?
    
    backgroundProcessor = DefaultBackgroundProcessor(backgroundImage: image)
    // Initialize CameraSource with the background processor
    camera = CameraSource(options: options, delegate: self, backgroundProcessorDelegate: backgroundProcessor!)
```

You can pause and resume virtual background processing by toggling the `pauseProcessing` property of `TVIDefaultBackgroundProcessor`.

```swift
    self.backgroundProcessor?.pauseProcessing = true
```

You can set the `backgroundImage` or `blurFilterRadius` property values while the virtual background processor is active. Note that these two properties are mutually exclusive. For example:

* If you set an image for `backgroundImage`, the value of `blurFilterRadius` will be set to `0.0`.
* If you set `blurFilterRadius`, the `backgroundImage` value will be set to `nil`.
* If you set `backgroundImage` to `nil` and `blurFilterRadius` to `0.0`, the video frame will be delivered to the video sink unprocessed.

The `TwilioVirtualBackgroundProcessors` plugin library is available in both static and dynamic framework formats. You must use the same framework type (either static or dynamic) for both the Twilio Video iOS SDK and the `TwilioVirtualBackgroundProcessors` plugin library. Using different framework types can cause build and runtime problems.
