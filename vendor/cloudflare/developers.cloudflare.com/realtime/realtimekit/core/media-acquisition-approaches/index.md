---
title: Media Acquisition Approaches
description: Acquire and manage participant audio and video tracks in RealtimeKit using different approaches.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Media Acquisition Approaches

Note

This guide assumes that you are already familiar with [initializing the RealtimeKit SDK](https://developers.cloudflare.com/realtime/realtimekit/core/).

RealtimeKit provides flexible approaches for acquiring and managing participant media (audio and video tracks). By default, the SDK handles media acquisition automatically when you initialize it. However, certain use cases require accessing media tracks before or independently of SDK initialization.

WebMobile

ReactWeb ComponentsAngular

Manual track handling is not available on this platform.

## When to use custom media acquisition

Custom media acquisition is useful when you need to:

* **Validate participants before joining**: Pass audio and video through verification services (for example, proctoring systems in EdTech assessments).
* **Pre-process media streams**: Apply filters, transformations, or quality checks before the session starts.
* **Integrate with external services**: Send media to third-party APIs for analysis or compliance checks.
* **Reuse existing tracks**: Use media tracks acquired elsewhere in your application.

Warning

Most applications do not need custom media acquisition. If you are unsure whether your use case requires this feature, use the standard SDK initialization approach. Custom media management adds complexity and requires careful handling of browser media APIs.

## Approach 1: SDK-first (recommended)

Initialize the SDK first, then access media tracks from the meeting object. This is the simplest approach and suitable for most use cases.

**When to use**: You need to access media tracks after SDK initialization for logging, analysis, or integration with other services.

TypeScript

```

import { useEffect } from 'react';

import { useRealtimeKitClient } from '@cloudflare/realtimekit-react';


export default function App() {

  const [meeting, initMeeting] = useRealtimeKitClient();


    useEffect(() => {

      initMeeting({ authToken: "<auth-token>" });

    }, []);


    useEffect(() => {

        if(meeting){

            console.log('audioTrack:: ', meeting.self.audioTrack);

            console.log('videoTrack:: ', meeting.self.videoTrack);

        }


    }, [meeting])


    return <div>Your meeting component comes here</div>;


}


```

JavaScript

```

const authToken = "<auth-token>";

const meeting = await RealtimeKitClient.init({

  authToken,

});


console.log("audioTrack:: ", meeting.self.audioTrack);

console.log("videoTrack:: ", meeting.self.videoTrack);


```

TypeScript

```

class AppComponent {

  title = "MyProject";

  @ViewChild("myid") meetingComponent: RtkMeeting;

  rtkMeeting: RealtimeKitClient;


  async ngAfterViewInit() {

    const meeting = await RealtimeKitClient.init({

      authToken: "<auth-token>",

    });


    console.log("audioTrack:: ", meeting.self.audioTrack);

    console.log("videoTrack:: ", meeting.self.videoTrack);

  }

}


```

## Approach 2: Media-first

Initialize the media handler first using `RealtimeKitClient.initMedia()`, then pass it to the SDK during initialization. The SDK reuses the acquired media tracks without requesting permissions again.

**When to use**: You need to acquire media tracks minutes in advance before joining a session. This is particularly useful for EdTech assessment platforms where you want to enable proctoring or tracking systems early without managing WebSocket connections or handling media disconnects that come with full SDK initialization.

**Benefits**:

* SDK manages media acquisition and browser compatibility.
* Participants are not prompted for permissions twice.
* Media tracks are automatically synchronized between your validation service and the SDK.
* Acquire media early without the complexity of managing SDK connection state.

TypeScript

```

import { useEffect, useState } from 'react';

import RealtimeKitClient from '@cloudflare/realtimekit';

import type { RTKSelfMedia } from '@cloudflare/realtimekit';

import { useRealtimeKitClient } from '@cloudflare/realtimekit-react';


export default function App() {

  const [meeting, initMeeting] = useRealtimeKitClient();

    const [media, setMedia] = useState<RTKSelfMedia>();

    const [readyToInitializeSDK, setReadyToInitializeSDK] = useState(false);


    useEffect(() => {

        async function initMediaWithoutSDKInitialization(){

            const mediaFromSDK = await RealtimeKitClient.initMedia({

              video : true,

              audio: true,

            });


            setMedia(mediaFromSDK);


            console.log('audioTrack', mediaFromSDK.audioTrack);

            console.log('videoTrack', mediaFromSDK.videoTrack);


            setTimeout(() => {

                // Once you are ready to initialize the SDK, set this to true

                // To mimic a real world scenario, we are setting it to true after 5 seconds

                setReadyToInitializeSDK(true);

            }, 5000);

        }

        if(!media){

            initMediaWithoutSDKInitialization();

        }

    }, [media]);


    useEffect(() => {

        if(meeting){

            return;

        }

        if(!readyToInitializeSDK){

            return;

        }

        if(!media){

            return;

        }

      initMeeting({ authToken: "<auth-token>", defaults: { mediaHandler: media } });

    }, [meeting, readyToInitializeSDK, media]);


    return <div>Your meeting component comes here</div>;

}


```

Initialize the media handler first using `RealtimeKitClient.initMedia()`, then pass it to the SDK during initialization. The SDK reuses the acquired media tracks without requesting permissions again.

**When to use**: You need to acquire media tracks minutes in advance before joining a session. This is particularly useful for EdTech assessment platforms where you want to enable proctoring or tracking systems early without managing WebSocket connections or handling media disconnects that come with full SDK initialization.

**Benefits**:

* SDK manages media acquisition and browser compatibility.
* Participants are not prompted for permissions twice.
* Media tracks are automatically synchronized between your validation service and the SDK.
* Acquire media early without the complexity of managing SDK connection state.

JavaScript

```

const mediaFromSDK = await RealtimeKitClient.initMedia({

  video: true,

  audio: true,

});


setTimeout(() => {

  const authToken = "<auth-token>";

  RealtimeKitClient.init({

    authToken,

    defaults: {

      mediaHandler: mediaFromSDK,

    },

  }).then((meeting) => {

    // next - meeting.join();

  });

}, 5000);


```

Initialize the media handler first using `RealtimeKitClient.initMedia()`, then pass it to the SDK during initialization. The SDK reuses the acquired media tracks without requesting permissions again.

**When to use**: You need to acquire media tracks minutes in advance before joining a session. This is particularly useful for EdTech assessment platforms where you want to enable proctoring or tracking systems early without managing WebSocket connections or handling media disconnects that come with full SDK initialization.

**Benefits**:

* SDK manages media acquisition and browser compatibility.
* Participants are not prompted for permissions twice.
* Media tracks are automatically synchronized between your validation service and the SDK.
* Acquire media early without the complexity of managing SDK connection state.

TypeScript

```

class AppComponent {

  title = "MyProject";

  @ViewChild("myid") meetingComponent: RtkMeeting;

  rtkMeeting: RealtimeKitClient;


  async ngAfterViewInit() {

    const mediaFromSDK = await RealtimeKitClient.initMedia({

      video: true,

      audio: true,

    });


    setTimeout(() => {

      const authToken = "<auth-token>";

      RealtimeKitClient.init({

        authToken,

        defaults: {

          mediaHandler: mediaFromSDK,

        },

      }).then((meeting) => {

        // next - meeting.join();

      });

    }, 5000);

  }

}


```

## Approach 3: Self-managed (advanced)

Acquire and manage media tracks independently using browser APIs, then pass them to the SDK when enabling audio and video.

**When to use**: You have existing media management infrastructure or need complete control over media acquisition.

**Considerations**:

* You are responsible for handling browser compatibility and API changes.
* SDK updates will not automatically fix media acquisition issues in your code.
* Requires deeper knowledge of WebRTC and browser media APIs.

Initialize the SDK with audio and video disabled, then enable them with your custom tracks:

TypeScript

```

import { useEffect } from 'react';

import { useRealtimeKitClient } from '@cloudflare/realtimekit-react';


export default function App() {

  const [meeting, initMeeting] = useRealtimeKitClient();


    useEffect(() => {

      initMeeting({ authToken: "<auth-token>" });

    }, []);


    useEffect(() => {

        async function setupMediaTracks(){

            if (meeting) {

                let audioTrack; // Put the audioTrack that you acquired from browser here

                let videoTrack; // Put the videoTrack that you acquired from browser here

                await meeting.self.enableAudio(audioTrack);

                await meeting.self.enableVideo(videoTrack);

                // await meeting.self.join();

            }

        }

        setupMediaTracks();


    }, [meeting])


    return <div>Your meeting component comes here</div>;


}


```

JavaScript

```

const authToken = "<auth-token>";

const meeting = await RealtimeKitClient.init({

  authToken,

});


let audioTrack; // Put the audioTrack that you acquired from browser here

let videoTrack; // Put the videoTrack that you acquired from browser here

await meeting.self.enableAudio(audioTrack);

await meeting.self.enableVideo(videoTrack);


```

TypeScript

```

class AppComponent {

  title = "MyProject";

  @ViewChild("myid") meetingComponent: RtkMeeting;

  rtkMeeting: RealtimeKitClient;


  async ngAfterViewInit() {

    const meeting = await RealtimeKitClient.init({

      authToken: "<auth-token>",

    });


    let audioTrack; // Put the audioTrack that you acquired from browser here

    let videoTrack; // Put the videoTrack that you acquired from browser here

    await meeting.self.enableAudio(audioTrack);

    await meeting.self.enableVideo(videoTrack);

  }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/media-acquisition-approaches/#page","headline":"Media Acquisition Approaches · Cloudflare Realtime docs","description":"Acquire and manage participant audio and video tracks in RealtimeKit using different approaches.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/media-acquisition-approaches/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/media-acquisition-approaches/","name":"Media Acquisition Approaches"}}]}
```
