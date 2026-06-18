---
title: Generate Credentials
description: Create TURN keys and generate short-lived credentials for Cloudflare Realtime TURN clients.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Generate Credentials

Cloudflare will issue TURN keys, but these keys cannot be used as credentials with `turn.cloudflare.com`. To use TURN, you need to create credentials with a expiring TTL value.

## Create a TURN key

To create a TURN credential, you first need to create a TURN key using [Dashboard ↗](https://dash.cloudflare.com/?to=/:account/calls), or the [API](https://developers.cloudflare.com/api/resources/calls/subresources/turn/methods/create/).

You should keep your TURN key on the server side (don't share it with the browser/app). A TURN key is a long-term secret that allows you to generate unlimited, shorter lived TURN credentials for TURN clients.

With a TURN key you can:

* Generate TURN credentials that expire
* Revoke previously issued TURN credentials

## Create credentials

You should generate short-lived credentials for each TURN user. In order to create credentials, you should have a back-end service that uses your TURN Token ID and API token to generate credentials. It will make an API call like this:

Terminal window

```

curl https://rtc.live.cloudflare.com/v1/turn/keys/$TURN_KEY_ID/credentials/generate-ice-servers \

--header "Authorization: Bearer $TURN_KEY_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{"ttl": 86400}'


```

The **201 (Created)** response below can then be passed on to your front-end application:

```

{

  "iceServers": [

    {

      "urls": [

        "stun:stun.cloudflare.com:3478",

        "stun:stun.cloudflare.com:53"

      ]

    },

    {

      "urls": [

        "turn:turn.cloudflare.com:3478?transport=udp",

        "turn:turn.cloudflare.com:53?transport=udp",

        "turn:turn.cloudflare.com:3478?transport=tcp",

        "turn:turn.cloudflare.com:80?transport=tcp",

        "turns:turn.cloudflare.com:5349?transport=tcp",

        "turns:turn.cloudflare.com:443?transport=tcp"

      ],

      "username": "bc91b63e2b5d759f8eb9f3b58062439e0a0e15893d76317d833265ad08d6631099ce7c7087caabb31ad3e1c386424e3e",

      "credential": "ebd71f1d3edbc2b0edae3cd5a6d82284aeb5c3b8fdaa9b8e3bf9cec683e0d45fe9f5b44e5145db3300f06c250a15b4a0"

    }

  ]

}


```

Note

The list of returned URLs contains URLs with the primary and alternate ports. The alternate port 53 is known to be blocked by web browsers, and the TURN URL will time out if used in browsers. If you are using trickle ICE, this will not cause issues. Without trickle ICE you might want to filter out the URL with port 53 to avoid waiting for a timeout.

Use `iceServers` as follows when instantiating the `RTCPeerConnection`:

JavaScript

```

const myPeerConnection = new RTCPeerConnection({

  iceServers: [

    {

      urls: [

        "stun:stun.cloudflare.com:3478",

        "stun:stun.cloudflare.com:53"

      ]

    },

    {

      urls: [

        "turn:turn.cloudflare.com:3478?transport=udp",

        "turn:turn.cloudflare.com:53?transport=udp",

        "turn:turn.cloudflare.com:3478?transport=tcp",

        "turn:turn.cloudflare.com:80?transport=tcp",

        "turns:turn.cloudflare.com:5349?transport=tcp",

        "turns:turn.cloudflare.com:443?transport=tcp"

      ],

      "username": "bc91b63e2b5d759f8eb9f3b58062439e0a0e15893d76317d833265ad08d6631099ce7c7087caabb31ad3e1c386424e3e",

      "credential": "ebd71f1d3edbc2b0edae3cd5a6d82284aeb5c3b8fdaa9b8e3bf9cec683e0d45fe9f5b44e5145db3300f06c250a15b4a0"

    },

  ],

});


```

The `ttl` value can be adjusted to expire the short lived key in a certain amount of time. This value should be larger than the time you'd expect the users to use the TURN service. For example, if you're using TURN for a video conferencing app, the value should be set to the longest video call you'd expect to happen in the app.

When using short-lived TURN credentials with WebRTC, credentials can be refreshed during a WebRTC session using the `RTCPeerConnection` [setConfiguration() ↗](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setConfiguration) API.

## Revoke credentials

Short lived credentials can also be revoked before their TTL expires with a API call like this:

Terminal window

```

curl --request POST \

https://rtc.live.cloudflare.com/v1/turn/keys/$TURN_KEY_ID/credentials/$USERNAME/revoke \

--header "Authorization: Bearer $TURN_KEY_API_TOKEN"


```

A **204 (No Content)** response is returned if the credential is successfully revoked.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/turn/generate-credentials/#page","headline":"Generate Credentials · Cloudflare Realtime docs","description":"Create TURN keys and generate short-lived credentials for Cloudflare Realtime TURN clients.","url":"https://developers.cloudflare.com/realtime/turn/generate-credentials/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/turn/","name":"TURN Service"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/turn/generate-credentials/","name":"Generate Credentials"}}]}
```
