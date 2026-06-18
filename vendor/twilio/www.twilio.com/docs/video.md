# Twilio Video

## Twilio Video

Add high-quality audio and video call functionality to your web, iOS, and Android applications. Customize and scale with Twilio Video APIs, SDKs, and helper tools.

Let's build something amazing.

[Get started now](#quickstarts)

## Tutorial

```js !sample
Twilio.Video
  .createLocalVideoTrack()
  .then(track => {
    const container = document.getElementById('container');
    container.appendChild(track.attach());
});
```

1. Twilio handles Room management, authentication, and signaling for Video Rooms
2. Use Twilio's SDKs to add video, audio, and data tracks to your web or mobile application
3. Customize your entire video experience using Twilio's flexible APIs

Tutorial code output: "Add video to your application!"

## Quickstarts

Build a basic video app with our quickstart guides, and then customize it to fit your needs.

* [Javascript SDK Quickstart](/docs/video/javascript-getting-started)
* [Android SDK Quickstart](/docs/video/android-getting-started)
* [iOS SDK Quickstart](/docs/video/ios-getting-started)

## Learn more

Ready to bring your idea to production? We've got the resources you need.

Choose the documentation that works for you. Dig deep into Twilio Video components, explore the APIs, and check out specific use cases where companies deploy Twilio Video in production applications.

### Video fundamentals

* [Twilio Video Overview](/docs/video/overview)
* [Understanding Video Rooms](/docs/video/tutorials/understanding-video-rooms)
* [Understanding Recordings and Compositions](/docs/video/tutorials/understanding-video-recordings-and-compositions)

### What others are building

* [Video posts on the Twilio Blog](https://www.twilio.com/en-us/blog/developers?products=video\&page=1)
* [Customer stories](https://customers.twilio.com/en-us?products=video\&page=1)

### API and SDK references

* [API reference](/docs/video/api)
* [JavaScript SDK](/docs/video/javascript)
* [Android SDK](/docs/video/android)
* [iOS SDK](/docs/video/ios)

## Advanced capabilities and tools

Grow your app and explore the advanced features and tools Twilio Video provides.

Try our full-featured reference apps that include capabilities like screen sharing, dominant speaker detection, and network quality detection. Learn about advanced features and tools to help you manage Twilio Video in production applications.

### Guides

* [Share a participant's screen](/docs/video/tutorials/screen-share)
* [Dominant Speaker Detection](/docs/video/detecting-dominant-speaker)
* [Using the DataTrack API](/docs/video/tutorials/datatrack-api)
* [Build telemedicine virtual visits](/docs/video/solutions-blueprint-telemedicine-virtual-visits)

### Full-featured reference apps

* [React app repo](https://github.com/twilio/twilio-video-app-react)
* [Android app repo](https://github.com/twilio/twilio-video-app-android)
* [iOS app repo](https://github.com/twilio/twilio-video-app-ios)

### Insights and troubleshooting

* [Video Insights](/docs/video/troubleshooting/insights)
* [Video Log Analyzer API](/docs/video/troubleshooting/video-log-analyzer-api)
* [Pre-call Testing and Diagnostics](/docs/video/troubleshooting/pre-call-testing-and-diagnostics)
* [JavaScript Room Monitor](/docs/video/troubleshooting/javascript-room-monitor)

## Related Products

Twilio offers other tools to enhance your Video applications such as adding in-application chat and synchronizing your application's state across devices.

### Conversations

Build conversational, cross-channel messaging

[Product Docs](/docs/conversations-classic)

### Sync

Synchronize state across web and mobile applications

[Product Docs](/docs/sync)
