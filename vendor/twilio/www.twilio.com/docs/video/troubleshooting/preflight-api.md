# Preflight API

The Twilio Video JavaScript [Preflight API](https://sdk.twilio.com/js/video/releases/2.34.0/docs/PreflightTest.html) provides functions for testing connectivity to the Twilio Cloud. The API can identify signaling and media connectivity issues and provide a report at the end of the test. You can use the Preflight API in your Twilio Video applications to detect issues before a Participant joins a Video Room or as part of a troubleshooting page.

To check connectivity, the Preflight API creates two peer connections from the local user to Twilio's Signaling and TURN servers. It publishes synthetic audio and video tracks from one of those connections and ensures that the other connection receives the media on those tracks. After successfully verifying connectivity, it generates a report with information about the connection.

> \[!NOTE]
>
> The Preflight API doesn't test user bandwidth limitations. If you want to test client bandwidth limitations, use the `testMediaConnectionBitrate` method from the [RTC Diagnostics SDK](https://github.com/twilio/rtc-diagnostics).

## Access the Preflight API

The Preflight API is included with the Twilio Video JavaScript SDK in versions 2.16.0 and above. Versions 2.16.0 through 2.19.1 of the JavaScript SDK contain a beta version of the Preflight API. Version 2.20.0 and above of the JavaScript SDK contain the generally available Preflight API, which is no longer in beta.

You can include the JavaScript SDK in your application either by installing it with [Node Package Manager](https://www.npmjs.com/) (npm) or using the Twilio CDN.

See the [supported browsers](/docs/video/javascript#supported-browsers).

### NPM

Install the Video JavaScript SDK using npm:

```bash
npm install --save twilio-video
```

Then, you can start using the Preflight API in your application (note that the Preflight API is under the name `runPreflight`):

```javascript
const { runPreflight } = require('twilio-video');
```

#### Script tag

You can also copy `twilio-video.min.js` from the `twilio-video/dist` folder after npm installing it and include it directly in your web app using a `<script>` tag.

```html
<script src="https://my-server-path/twilio-video.min.js"></script>
```

Using this method, you can access the PreflightTest API like so:

```javascript
const runPreflight = Twilio.Video.runPreflight;
```

### CDN

You can also include the JavaScript SDK in your application from Twilio's CDN:

```html
<script src="https://sdk.twilio.com/js/video/releases/2.34.0/twilio-video.min.js"></script>
```

> \[!NOTE]
>
> You should make sure you're using the latest Twilio Video JavaScript SDK release. To find the CDN link for the most recent JavaScript SDK release, visit the [JavaScript SDK latest release documentation](https://sdk.twilio.com/js/video/latest/docs/).

Using the CDN, the JavaScript SDK will set a browser global that you can use to reference the Preflight API:

```javascript
const runPreflight = Twilio.Video.runPreflight;
```

## Use the Preflight API

### Example

The following example shows how to use the Preflight API to start a diagnostic connectivity test and handle events during the test.

```javascript
// import the Preflight API, which is called `runPreflight`,
// from the Twilio Video JavaScript SDK
const { runPreflight } = require('twilio-video');

// if you are using the Video JavaScript SDK via the Twilio CDN or
// a script tag, you would reference the Preflight API this way:
// const runPreflight = Twilio.Video.runPreflight;

// this assumes you have a function called getAccessToken
// to retrieve an Access Token from your server
const token = getAccessToken();

// run a preflight test, passing in an Access Token with
// a VideoGrant
const preflightTest = runPreflight(token);

// handle preflight test events

// while the test is in progress, the progress event fires
// whenever a particular PreflightProgress step completes
preflightTest.on('progress', (progress) => {
  console.log('preflight progress:', progress);
});

// if the test failed, the failed event fires and returns the error
// along with the partial test results it was able to collect
preflightTest.on('failed', (error, report) => {
  console.error('preflight error:', error);
  console.log('Received partial report:', report);
});

// if the test completed without error, the completed event fires
// and returns the preflight test report
preflightTest.on('completed', (report) => {
  console.log("Test completed in " + report.testTiming.duration + " milliseconds.");
  console.log(" It took " + report.networkTiming.connect?.duration + " milliseconds to connect");
  console.log(" It took " + report.networkTiming.media?.duration + " milliseconds to receive media");
});
```

### Start the diagnostic test

To run a diagnostic test with the Preflight API, call the [runPreflight() method](https://sdk.twilio.com/js/video/releases/2.34.0/docs/module-twilio-video.html#.runPreflight) and pass in an Access Token with a VideoGrant. This allows you to set up test connections to Twilio's servers.

When you run the test, you can pass in other [PreflightOptions](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#PreflightOptions). The options include setting your [preferred signaling `region` within the Twilio cloud](/docs/video/tutorials/video-regions-and-global-low-latency#regions-and-gll) (default: `all`) and the amount of time, `duration`, to run the test (default: `10000` ms, or 10 seconds).

#### Access Token

The Access Token you pass to the `runPreflight` must contain a [VideoGrant](/docs/iam/access-tokens#create-an-access-token-for-video).

Because the Preflight API is connecting to a test Video Room that the Preflight API sets up, any value you pass in for the `room` and `identity` fields in the VideoGrant will be ignored during the preflight test. The Access Token you use does require an `identity` field, but this identity can be any value for the purpose of the test.

### Listen for preflight test events

After you start running the preflight test with the `runPreflight` method, the test can generate three types of events. The code example above demonstrates how to listen for each event type.

* `progress`: The test is in progress and a [PreflightProgress step](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#PreflightProgress) in the test completed. This event passes the specific PreflightProgress step that completed.
* `failed`: The test failed with an error. This event passes back the error and any partially generated test results.
* `completed`: The test completed successfully and you can review the results. This event passes back the completed test report.

### Use PreflightProgress steps to track connectivity

While the Preflight Test is in progress, it will emit ProgressEvents indicating it completed specific connectivity checks. You can use these events to track the test progress and provide additional feedback to end users about their connections.

| **Name**                | **Description**                                                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| mediaAcquired           | Successfully generated synthetic tracks                                                                                                  |
| connected               | Successfully connected to Twilio's server and obtained TURN credentials                                                                  |
| mediaSubscribed         | The test connection successfully subscribed to media tracks                                                                              |
| mediaStarted            | Media flow was detected                                                                                                                  |
| dtlsConnected           | Established DTLS connection. This event will be not be emitted on Safari browsers.                                                       |
| peerConnectionConnected | Established a [PeerConnection](https://webrtc.org/getting-started/peer-connections). This event will not be emitted on Firefox browsers. |
| iceConnected            | Established an ICE connection                                                                                                            |

### Review the completed test report

The `completed` event will pass back a report containing the results from the successful test. The report will contain the following fields:

| Name                          | Description                                                                                                                                                                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| testTiming                    | Time measurements for when the test started and ended (in Epoch time) and how long the test lasted in ms.                                                                                                                                                              |
| networkTiming                 | [Networking timing measurements](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#NetworkTiming) captured during the test.                                                                                                                             |
| iceCandidateStats             | An array containing the gathered ICE clients for STUN/TURN. Learn more about [STUN, TURN, and ICE here](/docs/stun-turn/faq#faq-what-is-nat).                                                                                                                          |
| selectedIceCandidatePairStats | Information about the ICE candidates that were used for the connection, such as the IP address, port, and protocol used.                                                                                                                                               |
| progressEvents                | A list of the [ProgressEvents](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#ProgressEvent) that occurred during the test.                                                                                                                          |
| stats                         | [RTC-related statistics](https://sdk.twilio.com/js/video/releases/2.34.0/docs/global.html#PreflightReportStats) captured during the test. Contains information about the average, minimum, and maximum jitter, round trip time (rtt), and packet loss during the test. |

### Stop an in-progress test

You can stop an in-progress test with the `stop()` method. This will stop the test and emit a `failed` event along with partial test results that completed up to the point that the test stopped.

## Video Diagnostics Application

Twilio offers an open-source [Video Diagnostics Application](https://github.com/twilio/twilio-video-diagnostics-react-app) that is built using the Preflight API and the [RTC Diagnostics SDK](https://github.com/twilio/rtc-diagnostics). You can deploy and explore this application to see the different functionality of these diagnostic APIs in action. The application tests participants' device and software setup, connectivity with the Twilio Cloud, and network performance. It provides users feedback about their network quality and device setup, and also includes recommendations for improving their video call quality.
