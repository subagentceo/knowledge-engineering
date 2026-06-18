---
title: Deploy your video call app
description: Deploy the completed video call application.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy your video call app

* [ Watch this episode ](#tab-panel-9057)
* [ Series overview ](#tab-panel-9058)

We are almost done with the project, and in this final episode, we add the finishing touches, such as learning how to handle call disconnections, wiring up essential media controls like muting/unmuting and video toggling, and integrating a TURN server to ensure reliable connections even behind firewalls. By the end of this video, your app will be fully functional and ready for deployment.

**Related content**

For additional resources on learning Durable Objects with Cloudflare, refer to the following resources:

* [Veet Github repository code ↗](https://github.com/megaconfidence/veet)
* [Cloudflare Durable Objects documentation](https://developers.cloudflare.com/durable-objects/)
* [Cloudflare TURN service documentation](https://developers.cloudflare.com/realtime/turn/)
* [CLI command for creating new Workers and Pages projects](https://developers.cloudflare.com/pages/get-started/c3/)
* [Hopscotch.io for local WebSocket testing ↗](https://hoppscotch.io/)
* [Sign up for a Cloudflare account ↗](https://dash.cloudflare.com/sign-up)

[ Watch Episode 1: Introduction to the series ](https://developers.cloudflare.com/learning-paths/durable-objects-course/series/introduction-to-series-1/) We present an overview of the series, discuss its underlying architecture, and access resources to set up the project locally. 

[ Watch Episode 2: What are Durable Objects? ](https://developers.cloudflare.com/learning-paths/durable-objects-course/series/what-are-durable-objects-2/) We show how Durable Objects work and start building a video call app together. 

[ Watch Episode 3: Create a serverless websocket 'backend' ](https://developers.cloudflare.com/learning-paths/durable-objects-course/series/serverless-websocket-backend-3/) We create a WebSocket backend using serverless technology, making the process simpler than ever before. 

[ Watch Episode 4: Real-time messaging with WebSockets ](https://developers.cloudflare.com/learning-paths/durable-objects-course/series/real-time-messaging-with-websockets-4/) We learn how to route and broadcast incoming messages from WebSocket connections and implement error handling such as closed WebSocket connections. 

[ Watch Episode 5: Build the app frontend and UI ](https://developers.cloudflare.com/learning-paths/durable-objects-course/series/build-the-app-frontend-5/) We configure the frontend starter code, connect to Durable Objects using a call room ID, and display a local video preview. 

[ Watch Episode 6: Make and answer WebRTC calls ](https://developers.cloudflare.com/learning-paths/durable-objects-course/series/make-answer-webrtc-calls-6/) We expand the frontend functionality by adding functionality for making and answering WebRTC video calls. 

[ Watch Episode 7: Deploy your video call app ](https://developers.cloudflare.com/learning-paths/durable-objects-course/series/deploy-your-video-call-app-7/) In this final episode, we configure the remaining functionalities. By the end, your app will be fully functional and ready for deployment. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/durable-objects-course/series/deploy-your-video-call-app-7/#page","headline":"Deploy your video call app · Cloudflare Learning Paths","description":"Deploy the completed video call application.","url":"https://developers.cloudflare.com/learning-paths/durable-objects-course/series/deploy-your-video-call-app-7/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/durable-objects-course/series/","name":"Overview"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/durable-objects-course/series/deploy-your-video-call-app-7/","name":"Deploy your video call app"}}]}
```
