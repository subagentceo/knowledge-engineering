# Pre-call Testing and Diagnostics

Twilio provides the following tools for understanding clients' connections and diagnosing any potential problems before, during, or after a Video call.

## Video Diagnostics Application

The [Twilio Video Diagnostics Application](https://github.com/twilio/twilio-video-diagnostics-react-app) is an open-source ReactJS application that tests participants' device and software setup, connectivity with the Twilio Cloud, and network performance. It uses Twilio's [RTC Diagnostics SDK](/docs/video/troubleshooting/pre-call-testing-and-diagnostics#rtc-diagnostics-sdk) and [Preflight API](/docs/video/troubleshooting/pre-call-testing-and-diagnostics#preflight-api) to provide end-users feedback about their network quality and device setup and also includes recommendations for improving their video call quality.

![Video Diagnostics app setup with start button and troubleshooting guidance.](https://docs-resources.prod.twilio.com/a4adb0a0261f839d19ed05dd8b0d80fdb318bd076bb2f42edbb29923f187cae4.gif)

Learn more about the Video Diagnostics App in the GitHub [README](https://github.com/twilio/twilio-video-diagnostics-react-app#readme).

The [RTC Diagnostics SDK](/docs/video/troubleshooting/pre-call-testing-and-diagnostics#rtc-diagnostics-sdk) and [Preflight API](/docs/video/troubleshooting/pre-call-testing-and-diagnostics#preflight-api) can also be used independently in your application to test your participants' device setup and network connectivity.

## RTC Diagnostics SDK

Twilio's [RTC Diagnostics SDK](https://github.com/twilio/rtc-diagnostics) for JavaScript applications provides functions to test a participant's input and output devices, including microphones, speakers, and cameras, as well as functionality to confirm that a participant meets the network bandwidth requirements required to make a voice call or conduct a video call.

This is a general WebRTC SDK and does not rely on Twilio infrastructure. You can incorporate it into your applications for pre-call testing or troubleshooting user issues during a call.

## Preflight API

The [Preflight API,](/docs/video/troubleshooting/preflight-api) available in versions 2.16.0 and above of the Twilio Video JavaScript SDK, provides functions for testing connectivity to the Twilio Cloud. The API can identify signaling and media connectivity issues and provide a report at the end of the test.
