---
title: Session management (HTTP)
description: Manage browser sessions and tabs using HTTP endpoints, including creating sessions, listing targets, and opening the Chrome DevTools UI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Session management (HTTP)

Use the HTTP API to manage browser sessions and tabs without using WebSocket connections. This is useful for session lifecycle operations like creating sessions, listing tabs, and cleaning up resources.

Before you begin, [create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.

The [API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/) documents all session management endpoints under `/devtools`.

## Step 1: Acquire a browser session

Create a new browser session using the `POST /devtools/browser` endpoint. The session will remain active for the specified keep-alive time (in this example, 10 minutes).

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/browser-rendering/devtools/browser?keep_alive=600000" \

  --request POST \

  --header "Authorization: Bearer {api_token}"


```

```

{

  "sessionId": "1909cef7-23e8-4394-bc31-27404bf4348f",

  "webSocketDebuggerUrl": "wss://api.cloudflare.com/client/v4/accounts/{account_id}/browser-rendering/devtools/browser/1909cef7-23e8-4394-bc31-27404bf4348f"

}


```

Save the `sessionId` from the response. You will use it in subsequent requests.

## Step 2: Create a tab with a specific URL

Open a new tab in your browser session and navigate to a specific URL using the `PUT /devtools/browser/{session_id}/json/new` endpoint.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/browser-rendering/devtools/browser/SESSION_ID/json/new?url=https%3A%2F%2Fexample.com" \

  --request PUT \

  --header "Authorization: Bearer {api_token}"


```

```

{

  "id": "8E598E996530FB09E46A22B8B7754F7F",

  "type": "page",

  "url": "https://example.com",

  "title": "Example Domain",

  "description": "",

  "devtoolsFrontendUrl": "https://live.browser.run/ui/view?wss=live.browser.run/api/devtools/browser/1909cef7-23e8-4394-bc31-27404bf4348f/page/8E598E996530FB09E46A22B8B7754F7F?jwt=...",

  "webSocketDebuggerUrl": "wss://live.browser.run/api/devtools/browser/1909cef7-23e8-4394-bc31-27404bf4348f/page/8E598E996530FB09E46A22B8B7754F7F?jwt=..."

}


```

## Step 3: List all targets

List all targets (tabs) in your session to verify the tab was created and get the `devtoolsFrontendUrl`.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/browser-rendering/devtools/browser/SESSION_ID/json/list" \

  --request GET \

  --header "Authorization: Bearer {api_token}"


```

```

[

  {

    "id": "8E598E996530FB09E46A22B8B7754F7F",

    "type": "page",

    "url": "https://example.com",

    "title": "Example Domain",

    "description": "",

    "devtoolsFrontendUrl": "https://live.browser.run/ui/view?wss=live.browser.run/api/devtools/browser/1909cef7-23e8-4394-bc31-27404bf4348f/page/8E598E996530FB09E46A22B8B7754F7F?jwt=...",

    "webSocketDebuggerUrl": "wss://live.browser.run/api/devtools/browser/1909cef7-23e8-4394-bc31-27404bf4348f/page/8E598E996530FB09E46A22B8B7754F7F?jwt=..."

  }

]


```

## Step 4: Open the DevTools UI

Copy the `devtoolsFrontendUrl` from the response and open it in Chrome. This URL provides direct access to the Chrome DevTools UI connected to your remote browser session.

URL validity

The `devtoolsFrontendUrl` is valid for five minutes from when it was generated. If you do not open the URL within this timeframe, it will expire and you will need to list the targets again to get a fresh URL. Once the DevTools connection is established, it remains active as long as the browser session is alive.

Once opened, the DevTools UI will load and you can:

* Inspect the DOM and CSS
* Debug JavaScript with breakpoints
* Monitor network requests
* View console messages
* Execute JavaScript in the console
* Navigate to different URLs

## Step 5: Clean up

When you are done, close the browser session to release resources.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/browser-rendering/devtools/browser/SESSION_ID" \

  --request DELETE \

  --header "Authorization: Bearer {api_token}"


```

```

{

  "status": "closing"

}


```

## Troubleshooting

If you have questions or encounter an error, see the [Browser Run FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-run/faq/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/cdp/session-management/#page","headline":"Session management (HTTP) · Cloudflare Browser Run docs","description":"Manage browser sessions and tabs using HTTP endpoints, including creating sessions, listing targets, and opening the Chrome DevTools UI.","url":"https://developers.cloudflare.com/browser-run/cdp/session-management/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/cdp/","name":"Chrome DevTools Protocol (CDP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/cdp/session-management/","name":"Session management (HTTP)"}}]}
```
