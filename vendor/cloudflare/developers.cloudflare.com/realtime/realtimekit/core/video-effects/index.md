---
title: Video Effects
description: Add background blur and virtual backgrounds to video feeds in RealtimeKit meetings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Video Effects

Add video background effects and blur to participant video feeds in your RealtimeKit meetings using the Core SDK.

Note

If you are using the `rtk-meeting` component with UI Kit and prefer a higher-level abstraction, refer to [UI Kit Addons](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/addons/) instead.

WebMobile

ReactWeb ComponentsAngular

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/realtimekit-virtual-background
```

```
yarn add @cloudflare/realtimekit-virtual-background
```

```
pnpm add @cloudflare/realtimekit-virtual-background
```

```
bun add @cloudflare/realtimekit-virtual-background
```

## Usage

### 1\. Disable default per frame rendering

Disable the default per frame rendering of video middleware to improve speed and quality by letting this middleware control it on its own:

JavaScript

```

await meeting.self.setVideoMiddlewareGlobalConfig({

  disablePerFrameCanvasRendering: true,

});


```

### 2\. Initialize the transformer

Create a video background transformer object:

JavaScript

```

import RealtimeKitVideoBackgroundTransformer from "@cloudflare/realtimekit-virtual-background";


const videoBackgroundTransformer =

  await RealtimeKitVideoBackgroundTransformer.init({

    meeting,

  });


```

### 3\. Apply background effects

The `videoBackgroundTransformer` exposes two types of middlewares:

#### Static background image

Use `createStaticBackgroundVideoMiddleware` to set an image as the background:

JavaScript

```

const imageUrl = "https://images.unsplash.com/photo-1487088678257-3a541e6e3922";


meeting.self.addVideoMiddleware(

  await videoBackgroundTransformer.createStaticBackgroundVideoMiddleware(

    imageUrl,

  ),

);


```

#### Background blur

Use `createBackgroundBlurVideoMiddleware` to blur the background. Pass `blurStrength` (0-100) as a parameter (50% by default):

JavaScript

```

meeting.self.addVideoMiddleware(

  await videoBackgroundTransformer.createBackgroundBlurVideoMiddleware(50),

);


```

## Browser support

Check browser support before initializing:

JavaScript

```

if (RealtimeKitVideoBackgroundTransformer.isSupported()) {

  const videoBackgroundTransformer =

    await RealtimeKitVideoBackgroundTransformer.init({

      meeting: meeting,

    });


  meeting.self.addVideoMiddleware(

    await videoBackgroundTransformer.createStaticBackgroundVideoMiddleware(

      imageUrl,

    ),

  );

}


```

Image CORS requirements

Image URLs must allow CORS to avoid tainting the canvas. You can find CORS-enabled images on [Unsplash ↗](https://unsplash.com/) and [Imgur ↗](https://imgur.com).

## Advanced configuration

For better, sharper results, pass a custom segmentation configuration:

JavaScript

```

const videoBackgroundTransformer =

  await RealtimeKitVideoBackgroundTransformer.init({

    meeting,

    segmentationConfig: {

      model: "mlkit", // 'meet' | 'mlkit'

      backend: "wasmSimd",

      inputResolution: "256x256", // '256x144' for meet

      pipeline: "webgl2", // 'webgl2' | 'canvas2dCpu'

      // canvas2dCpu gives sharper blur, webgl2 is faster

      targetFps: 35,

    },

  });


```

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/realtimekit-virtual-background
```

```
yarn add @cloudflare/realtimekit-virtual-background
```

```
pnpm add @cloudflare/realtimekit-virtual-background
```

```
bun add @cloudflare/realtimekit-virtual-background
```

## Usage

```

import { useState, useEffect } from "react";

import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

import RealtimeKitVideoBackgroundTransformer from "@cloudflare/realtimekit-virtual-background";


function App() {

  const [meeting] = useRealtimeKitClient();

  const [videoBackgroundTransformer, setVideoBackgroundTransformer] =

    useState(null);


  useEffect(() => {

    const initializeTransformer = async () => {

      if (!meeting) return;


      // Check browser support

      if (!RealtimeKitVideoBackgroundTransformer.isSupported()) {

        console.warn("Video background not supported in this browser");

        return;

      }


      // Disable default per frame rendering

      await meeting.self.setVideoMiddlewareGlobalConfig({

        disablePerFrameCanvasRendering: true,

      });


      // Initialize transformer

      const transformer = await RealtimeKitVideoBackgroundTransformer.init({

        meeting,

      });


      setVideoBackgroundTransformer(transformer);

    };


    initializeTransformer();

  }, [meeting]);


  const applyStaticBackground = async (imageUrl) => {

    if (!videoBackgroundTransformer) return;


    meeting.self.addVideoMiddleware(

      await videoBackgroundTransformer.createStaticBackgroundVideoMiddleware(

        imageUrl,

      ),

    );

  };


  const applyBlur = async (blurStrength = 50) => {

    if (!videoBackgroundTransformer) return;


    meeting.self.addVideoMiddleware(

      await videoBackgroundTransformer.createBackgroundBlurVideoMiddleware(

        blurStrength,

      ),

    );

  };


  const removeBackground = () => {

    // Remove all video middlewares

    meeting.self.removeVideoMiddleware();

  };


  return (

    <div>

      <button

        onClick={() =>

          applyStaticBackground(

            "https://images.unsplash.com/photo-1487088678257-3a541e6e3922",

          )

        }

      >

        Apply Background

      </button>

      <button onClick={() => applyBlur(50)}>Apply Blur</button>

      <button onClick={removeBackground}>Remove Background</button>

    </div>

  );

}


```

Image CORS requirements

Image URLs must allow CORS to avoid tainting the canvas. You can find CORS-enabled images on [Unsplash ↗](https://unsplash.com/) and [Imgur ↗](https://imgur.com).

## Advanced configuration

For better, sharper results, pass a custom segmentation configuration:

```

const transformer = await RealtimeKitVideoBackgroundTransformer.init({

  meeting,

  segmentationConfig: {

    model: "mlkit", // 'meet' | 'mlkit'

    backend: "wasmSimd",

    inputResolution: "256x256", // '256x144' for meet

    pipeline: "webgl2", // 'webgl2' | 'canvas2dCpu'

    // canvas2dCpu gives sharper blur, webgl2 is faster

    targetFps: 35,

  },

});


```

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/realtimekit-virtual-background
```

```
yarn add @cloudflare/realtimekit-virtual-background
```

```
pnpm add @cloudflare/realtimekit-virtual-background
```

```
bun add @cloudflare/realtimekit-virtual-background
```

## Usage

In your component TypeScript file:

TypeScript

```

import { Component, OnInit } from "@angular/core";

import RealtimeKitClient from "@cloudflare/realtimekit";

import RealtimeKitVideoBackgroundTransformer from "@cloudflare/realtimekit-virtual-background";


@Component({

  selector: "app-meeting",

  templateUrl: "./meeting.component.html",

})

export class MeetingComponent implements OnInit {

  meeting: any;

  videoBackgroundTransformer: any;


  async ngOnInit() {

    // Initialize meeting

    this.meeting = await RealtimeKitClient.init({

      authToken: "<participant_auth_token>",

    });


    await this.meeting.join();


    // Check browser support

    if (!RealtimeKitVideoBackgroundTransformer.isSupported()) {

      console.warn("Video background not supported in this browser");

      return;

    }


    // Disable default per frame rendering

    await this.meeting.self.setVideoMiddlewareGlobalConfig({

      disablePerFrameCanvasRendering: true,

    });


    // Initialize transformer

    this.videoBackgroundTransformer =

      await RealtimeKitVideoBackgroundTransformer.init({

        meeting: this.meeting,

      });

  }


  async applyStaticBackground(imageUrl: string) {

    if (!this.videoBackgroundTransformer) return;


    this.meeting.self.addVideoMiddleware(

      await this.videoBackgroundTransformer.createStaticBackgroundVideoMiddleware(

        imageUrl,

      ),

    );

  }


  async applyBlur(blurStrength: number = 50) {

    if (!this.videoBackgroundTransformer) return;


    this.meeting.self.addVideoMiddleware(

      await this.videoBackgroundTransformer.createBackgroundBlurVideoMiddleware(

        blurStrength,

      ),

    );

  }


  removeBackground() {

    // Remove all video middlewares

    this.meeting.self.removeVideoMiddleware();

  }

}


```

In your component template:

```

<button

  (click)="applyStaticBackground('https://images.unsplash.com/photo-1487088678257-3a541e6e3922')"

>

  Apply Background

</button>

<button (click)="applyBlur(50)">Apply Blur</button>

<button (click)="removeBackground()">Remove Background</button>


```

Image CORS requirements

Image URLs must allow CORS to avoid tainting the canvas. You can find CORS-enabled images on [Unsplash ↗](https://unsplash.com/) and [Imgur ↗](https://imgur.com).

## Advanced configuration

For better, sharper results, pass a custom segmentation configuration:

TypeScript

```

this.videoBackgroundTransformer =

  await RealtimeKitVideoBackgroundTransformer.init({

    meeting: this.meeting,

    segmentationConfig: {

      model: "mlkit", // 'meet' | 'mlkit'

      backend: "wasmSimd",

      inputResolution: "256x256", // '256x144' for meet

      pipeline: "webgl2", // 'webgl2' | 'canvas2dCpu'

      // canvas2dCpu gives sharper blur, webgl2 is faster

      targetFps: 35,

    },

  });


```

## Installation

You can add the pre-packaged filters to your project by adding the following dependency to your `build.gradle` file:

```

dependencies {

    // (other dependencies)

    implementation 'com.cloudflare.realtimekit:filters:0.1.0'

}


```

## Usage

This package currently exposes `VirtualBackgroundVideoFilter` which can be used with `FilterVideoProcessor`:

Kotlin

```

// Create a virtual background filter with a custom background image.

val bgFilter = VirtualBackgroundVideoFilter(context, R.drawable.background)


// Initialize the video processor with the filter.

val processor = FilterVideoProcessor(eglBase, bgFilter)


// // Set the video processor on the meeting builder.

val meeting = RealtimeKitMeetingBuilder

  .setVideoProcessor(eglBase, processor)

  .build(activity)


```

## Advanced configuration

You can also create your own custom filters to apply effects, filters, or analytics directly to a live video stream. Our **VideoProcessor APIs** provide flexible and powerful ways to manipulate video frames.

### Types of Video Processors

We provide three types of video processors:

* **NoDropVideoProcessor**: Allows custom video processing without dropping frames.
* **ChainVideoProcessor**: Chains multiple frame processors together, useful for applying multiple effects or filters to a video stream.
* **FilterVideoProcessor**: Simpler and more efficient way to apply a single effect or filter to a video stream.

Nonetheless, you can also create your own custom video processors by implementing the `VideoProcessor` interface directly:

Kotlin

```

import realtimekit.org.webrtc.VideoFrame

import realtimekit.org.webrtc.VideoProcessor

import realtimekit.org.webrtc.VideoSink


class CustomVideoProcessor : VideoProcessor {

  override fun onCapturerStarted(started: Boolean) {}


  override fun onCapturerStopped() {}


  override fun onFrameCaptured(frame: VideoFrame?) {}


  override fun setSink(sink: VideoSink?) {}

}


```

### Usage example

Once you have created and configured your `VideoProcessor`, pass it to the `RealtimeKitMeetingBuilder` object. This will process video frames captured by the camera before they are sent to other participants or rendered locally:

Kotlin

```

// Assuming 'myCustomProcessor' is an instance of any VideoProcessor implementation

// (for example, ChainVideoProcessor, FilterVideoProcessor, and more).


val myCustomProcessor = CustomProcessor()


// Set the video processor on the meeting builder.

val meeting = RealtimeKitMeetingBuilder

  .setVideoProcessor(processor = myCustomProcessor)

  .build(activity)


// You can also pass an EglBase to the builder

// This is useful when using FilterVideoProcessor

val eglBase = EglBase.create()

val meeting = RealtimeKitMeetingBuilder

  .setVideoProcessor(eglBase = eglBase, processor = myCustomProcessor)

  .build(activity)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/video-effects/#page","headline":"Video Effects · Cloudflare Realtime docs","description":"Add background blur and virtual backgrounds to video feeds in RealtimeKit meetings.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/video-effects/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/video-effects/","name":"Video Effects"}}]}
```
