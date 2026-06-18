---
title: RTKChat
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKChat

This is the chat module, which can be used to send and receive messages from the meeting.

* [RTKChat](#module%5FRTKChat)  
   * [module.exports](#exp%5Fmodule%5FRTKChat--module.exports) ⏏  
         * [new module.exports(context, chatSocketHandler, self, participants)](#new%5Fmodule%5FRTKChat--module.exports%5Fnew)  
         * ~~[.messages](#module%5FRTKChat--module.exports+messages)~~  
         * [.telemetry](#module%5FRTKChat--module.exports+telemetry)  
         * [.pinned](#module%5FRTKChat--module.exports+pinned)  
         * [.setMaxTextLimit(limit)](#module%5FRTKChat--module.exports+setMaxTextLimit)  
         * [.sendMessageInternal(message, \[participantIds\])](#module%5FRTKChat--module.exports+sendMessageInternal)  
         * [.sendTextMessageInternal(message, \[peerIds\])](#module%5FRTKChat--module.exports+sendTextMessageInternal)  
         * [.sendImageMessageInternal(image, \[peerIds\])](#module%5FRTKChat--module.exports+sendImageMessageInternal)  
         * [.sendFileMessageInternal(file, \[peerIds\])](#module%5FRTKChat--module.exports+sendFileMessageInternal)  
         * [.updateRateLimits(num, period)](#module%5FRTKChat--module.exports+updateRateLimits)  
         * [.sendTextMessage(message, \[peerIds\])](#module%5FRTKChat--module.exports+sendTextMessage)  
         * [.sendCustomMessage(message, \[peerIds\])](#module%5FRTKChat--module.exports+sendCustomMessage)  
         * [.sendImageMessage(image, \[peerIds\])](#module%5FRTKChat--module.exports+sendImageMessage)  
         * [.sendFileMessage(file, \[peerIds\])](#module%5FRTKChat--module.exports+sendFileMessage)  
         * [.sendMessage(message, \[participantIds\])](#module%5FRTKChat--module.exports+sendMessage)  
         * [.editTextMessage(messageId, message)](#module%5FRTKChat--module.exports+editTextMessage)  
         * [.editImageMessage(messageId, image)](#module%5FRTKChat--module.exports+editImageMessage)  
         * [.editFileMessage(messageId, file)](#module%5FRTKChat--module.exports+editFileMessage)  
         * [.editMessage(messageId, message)](#module%5FRTKChat--module.exports+editMessage)  
         * [.deleteMessage(messageId)](#module%5FRTKChat--module.exports+deleteMessage)  
         * ~~[.getMessagesByUser(userId)](#module%5FRTKChat--module.exports+getMessagesByUser)~~  
         * ~~[.getMessagesByType(type)](#module%5FRTKChat--module.exports+getMessagesByType)~~  
         * [.pin(id)](#module%5FRTKChat--module.exports+pin)  
         * [.unpin(id)](#module%5FRTKChat--module.exports+unpin)  
         * [.fetchPublicMessages(options)](#module%5FRTKChat--module.exports+fetchPublicMessages)  
         * [.fetchPrivateMessages(options)](#module%5FRTKChat--module.exports+fetchPrivateMessages)  
         * [.fetchPinnedMessages(options)](#module%5FRTKChat--module.exports+fetchPinnedMessages)  
         * ~~[.getMessages(timeStamp, size, reversed, \[offset\])](#module%5FRTKChat--module.exports+getMessages)~~  
         * ~~[.searchMessages(query, \[filters\])](#module%5FRTKChat--module.exports+searchMessages)~~

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(context, chatSocketHandler, self, participants)

| Param             | Type                 |
| ----------------- | -------------------- |
| context           | Context              |
| chatSocketHandler | RTKChatSocketHandler |
| self              | Self                 |
| participants      | Participants         |

#### ~~module.exports.messages~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)  

#### module.exports.telemetry

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)  

#### module.exports.pinned

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)  
**Deprecated.**: This property is deprecated. Please use `fetchPinnedMessages()` instead. Returns an array of pinned messages.  

#### module.exports.setMaxTextLimit(limit)

Set the max character limit of a text message

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param | Type   | Description                             |
| ----- | ------ | --------------------------------------- |
| limit | number | Max character limit for a text message. |

#### module.exports.sendMessageInternal(message, \[participantIds\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param              | Type           | Description                             |
| ------------------ | -------------- | --------------------------------------- |
| message            | MessagePayload | Message payload to send.                |
| \[participantIds\] | Array.<string> | Participant ids to send the message to. |

#### module.exports.sendTextMessageInternal(message, \[peerIds\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param       | Type           | Description                      |
| ----------- | -------------- | -------------------------------- |
| message     | string         | Text message to send.            |
| \[peerIds\] | Array.<string> | Peer ids to send the message to. |

#### module.exports.sendImageMessageInternal(image, \[peerIds\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param       | Type                    | Description                      |
| ----------- | ----------------------- | -------------------------------- |
| image       | File \| ReactNativeFile | Image file to send.              |
| \[peerIds\] | Array.<string>          | Peer ids to send the message to. |

#### module.exports.sendFileMessageInternal(file, \[peerIds\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param       | Type                    | Description                      |
| ----------- | ----------------------- | -------------------------------- |
| file        | File \| ReactNativeFile | File to send.                    |
| \[peerIds\] | Array.<string>          | Peer ids to send the message to. |

#### module.exports.updateRateLimits(num, period)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param  | Type   |
| ------ | ------ |
| num    | number |
| period | number |

#### module.exports.sendTextMessage(message, \[peerIds\])

Sends a chat text message to the room.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param       | Type           | Description                                |
| ----------- | -------------- | ------------------------------------------ |
| message     | string         | The message that must be sent to the room. |
| \[peerIds\] | Array.<string> | Peer ids to send the message to.           |

#### module.exports.sendCustomMessage(message, \[peerIds\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param       | Type                 | Description                      |
| ----------- | -------------------- | -------------------------------- |
| message     | CustomMessagePayload | Custom message payload.          |
| \[peerIds\] | Array.<string>       | Peer ids to send the message to. |

#### module.exports.sendImageMessage(image, \[peerIds\])

Sends an image message to the meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param       | Type                    | Description                      |
| ----------- | ----------------------- | -------------------------------- |
| image       | File \| ReactNativeFile | The image that is to be sent.    |
| \[peerIds\] | Array.<string>          | Peer ids to send the message to. |

#### module.exports.sendFileMessage(file, \[peerIds\])

Sends a file to the meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param       | Type                    | Description                      |
| ----------- | ----------------------- | -------------------------------- |
| file        | File \| ReactNativeFile | A File object.                   |
| \[peerIds\] | Array.<string>          | Peer ids to send the message to. |

#### module.exports.sendMessage(message, \[participantIds\])

Sends a message to the meeting. This method can be used to send text, image, or file messages. The message type is determined by the key 'type' in `message`object.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param              | Type           | Description                                              |
| ------------------ | -------------- | -------------------------------------------------------- |
| message            | MessagePayload | An object including the type and content of the message. |
| \[participantIds\] | Array.<string> | An array including the userIds of the participants.      |

#### module.exports.editTextMessage(messageId, message)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param     | Type   | Description                |
| --------- | ------ | -------------------------- |
| messageId | string | Id of the message to edit. |
| message   | string | Updated text message.      |

#### module.exports.editImageMessage(messageId, image)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param     | Type                    | Description                |
| --------- | ----------------------- | -------------------------- |
| messageId | string                  | Id of the message to edit. |
| image     | File \| ReactNativeFile | Updated image file.        |

#### module.exports.editFileMessage(messageId, file)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param     | Type                    | Description                |
| --------- | ----------------------- | -------------------------- |
| messageId | string                  | Id of the message to edit. |
| file      | File \| ReactNativeFile | Updated file.              |

#### module.exports.editMessage(messageId, message)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param     | Type           | Description                |
| --------- | -------------- | -------------------------- |
| messageId | string         | Id of the message to edit. |
| message   | MessagePayload | Updated message payload.   |

#### module.exports.deleteMessage(messageId)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param     | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| messageId | string | Id of the message to delete. |

#### ~~module.exports.getMessagesByUser(userId)~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param  | Type   | Description                                    |
| ------ | ------ | ---------------------------------------------- |
| userId | string | The user id of the user that sent the message. |

#### ~~module.exports.getMessagesByType(type)~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param | Type              | Description |          |        |                                               |
| ----- | ----------------- | ----------- | -------- | ------ | --------------------------------------------- |
| type  | 'text' \| 'image' | 'file'      | 'custom' | 'poll' | 'text', 'image', 'file', 'custom', or 'poll'. |

#### module.exports.pin(id)

Pins a chat message

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| id    | string | ID of the message to be pinned |

#### module.exports.unpin(id)

Unpins a chat message

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| id    | string | ID of the message to be unpinned |

#### module.exports.fetchPublicMessages(options)

Fetches messages from the chat with pagination.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param   | Type                | Description                                                                                            |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------ |
| options | FetchMessageOptions | Configuration options for fetching messages, including timestamp, limit, and direction for pagination. |

#### module.exports.fetchPrivateMessages(options)

Fetches private messages between the current user and another participant with pagination.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param   | Type                        | Description                                                                                                                             |
| ------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| options | FetchPrivateMessagesOptions | Configuration options for fetching private messages, including private RTKChat ID (User ID of the participant) and pagination settings. |

#### module.exports.fetchPinnedMessages(options)

Fetches pinned messages with pagination.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param   | Type                | Description                                                                                    |
| ------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| options | FetchMessageOptions | Configuration options for fetching pinned messages, including timestamp, limit, and direction. |

#### ~~module.exports.getMessages(timeStamp, size, reversed, \[offset\])~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param      | Type    | Default |
| ---------- | ------- | ------- |
| timeStamp  | number  |         |
| size       | number  |         |
| reversed   | boolean |         |
| \[offset\] | number  | 0       |

#### ~~module.exports.searchMessages(query, \[filters\])~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKChat--module.exports)

| Param       | Type          |
| ----------- | ------------- |
| query       | string        |
| \[filters\] | SearchFilters |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkchat/#page","headline":"RTKChat · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkchat/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkchat/","name":"RTKChat"}}]}
```
