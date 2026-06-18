# Messenger Apps Lifecycle

Check out the video below for a technical overview of how the request-response cycles work within Messenger apps, and then read on for a written breakdown with links for more information:

iframe
## An overview of the different request flows

## Configure flow

This flow allows teammates to configure an app prior to sending it to a user. This flow can occur multiple times as a teammate interacts with your app. On each request, you have the opportunity to respond and update the canvas that is displayed to the teammate. This allows more complicated, multi-stage configuration steps.

[**Learn more about the configure flow →**](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/request-flows#configure-flow)

## Initialize flow

This flow is about initializing the app in order to render how it first displays to an end user.

[**Learn more about the initialize flow →**](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/request-flows#initialize-flow)

## Submit flow

This flow is triggered any time a user interacts with your app and specifies the resulting action is to submit. This flow can occur multiple times as a user interacts with your app. On each request/response loop you have the opportunity to respond and update the canvas that's displayed to the user.

[**Learn more about the submit flow →**](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/request-flows#submit-flow)

## Sheets flow

This flow provides access to Sheets, a full-bleed takeover of the Messenger window. Sheets are populated with iframes. There are two actions which are relevant if you're using **sheets**:

1. The open-sheet action you use to open a sheet
2. The submit-sheet action which is used when closing a sheet


[**Learn more about the sheets flow →**](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger/sheets-flow)

## What happens during an individual request flow?

While each individual flow is different, they do share a common pattern. Once you get used to the pattern you'll start to see your app as a tennis match between users or teammates triggering actions in your app and your backend service handling those requests and responding with the JSON to update the UI of your app appropriately.

You can see the general format of an individual flow, and whether they occur on the Intercom side or on your side, in the diagram below:

1. **Interaction**
A flow begins with an interaction. This can either be a teammate adding your app to the Messenger/Message/Conversation, or an end-user interacting with your app.
2. **Notification**
Following an interaction, Intercom will send an HTTP `POST` request to your web service with the data you'll need in order to respond. [Examples of what we include in these requests can be found here.](/docs/references/preview/canvas-kit/requestobjects/admin)
3. **Consume**
You'll need to consume the HTTP request and get the data you need to enable you to decide how to respond. This is where any backend processing you might need to do would occur.
4. **Respond**
Armed with the data from the interaction step, you can decide how to respond. All responses should be valid JSON. [Examples of what you can send in response can be found here.](/docs/references/preview/canvas-kit/responseobjects/canvas)


![m4 key concepts](/assets/97c1211-m4_key_concepts.3d4ba846aea6055b722fba2b09b10d93d33f5cf8631657c10848c1d2e084b20c.71a4f21c.png)

Request Signing
Unless otherwise specified, **each request from Canvas Kit is signed by Intercom via an X-Body-Signature header**. We do this so that you can check that each request is actually sent by Intercom by decoding the signature.

The value of this `X-Body-Signature` header is computed by creating a signature using the body of the JSON request and your app's OAuth `client_secret` value, which you can find on the Basic Info page of your app. It is a hexadecimal (64-byte) value that is computed using the HMAC-SHA256 algorithm as defined in RFC2104. The `X-Body-Signature` header value is the signature value.

For example, `X-Body-Signature: 21ff2e149e0fdcac6f947740f6177f6434bda9219a7900921523730054c9214ae4`.

## What order do the request flows happen in?

Each request happens at a different time within the app's lifecycle, and will be sent to the URL that you must setup and then specify on Canvas Kit page on Developer Hub. Below is an overview of how teammates and end users can interact with the app through each flow and a description of each can be seen below.

![Flows Fitting](/assets/cb746c6-flows_fitting.0a11852e7bb0bffe2a55f3ad346d18d8c38c2795a386e52cc320f39ab666d47d.71a4f21c.png)

User data and your app
As a developer building on top of the Intercom Platform, it's important to know that Intercom customers (and their end users) can put whatever data they want into Intercom at any stage of the flow and **that data will not be checked for authenticity or veracity**.