# Cookies and the Web Storage API in Webchat 3.x.x

Flex Webchat 3.x.x persists some client-side data to create a better user experience. This can cause some issues when your customers have the Web Storage API disabled. This page discusses cookies, local storage, and session storage, and how Flex Webchat uses each one.

## Overview

Flex Webchat uses each storage strategy in the following ways:

### Cookies

Flex Webchat does not use cookies. If your users block the browser from using cookies, this should not cause any issues.

### Local storage

Used to persist chat after page reload and for error logging. Disabling local storage will cause a degraded experience, especially on page reloads, but Webchat should still function.

### Session storage

Required for the proper functioning of Webchat (e.g., opening and maintaining the WebSocket). Disabling session storage prevents Webchat from functioning.

## Definitions

| **Storage Type** | **Definition**                                                                                                                                                                           | **Max Size**                                                 | **Expiration**                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Cookies          | Stores data that has to be sent back to the server with subsequent XHR requests                                                                                                          | 4KB                                                          | Expires at a chosen expiration date, or when the session ends in the case of a session cookie |
| Local Storage    | Stores data in the browser across sessions. Opening two tabs with the same URL will share local storage. Data is never sent to the backend                                               | Up to 5 MB of data in the browser in key/value pairs         | Data never expires but can be cleared by the user                                             |
| Session Storage  | Temporarily stores data in the browser. Data does not persist across sessions (i.e., two tabs with the same URL will have different session storage.) Data is never sent to the backend. | Stores up to 10 MB of data in the browser in key/value pairs | Data expires when the session ends, e.g., if the browser tab is closed                        |

## Information stored in local storage

* twilio-flex-cf
* loglevel:twilio-flex-webchat-ui
* loglevel

## Information stored in session storage in Webchat

* \<id>::map::\<id>.channels
* \<id>::map::\<id>.info
* \<id>::document::\<id>.channel
* \<id>::map::\<id>.roster
* \<id>::list::\<id>.messages
