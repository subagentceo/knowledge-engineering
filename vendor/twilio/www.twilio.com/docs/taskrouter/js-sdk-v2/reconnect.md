# TaskRouter.js v2: Reconnect Logic

The `EventBridgeSignaling` class in TaskRouter SDK v2 handles WebSocket communication between a Twilio TaskRouter Worker object and the backend servers. It includes robust logic for reconnecting after disconnection, which is especially useful in scenarios like flaky or dropped internet connections.

TaskRouter events, such as task assignment and acceptance, or activity changes, are communicated via this WebSocket connection. These events aren't guaranteed to be delivered. In other words, if the internet connection drops, some events might be lost. However, the TaskRouter SDK v2 includes logic to detect disconnections and automatically attempts to reestablish the connection as quickly as possible. Once the connection is reestablished, the latest state (for example, pending tasks) is fetched from the backend, allowing the user interface to refresh with up-to-date data.

## Disconnect detection

### Heartbeat monitoring

* A heartbeat is set up on the WebSocket connection.
* The heartbeat expects a signal (message) from Twilio server every 15 seconds.
* If no message is received within 30 seconds, it considers the connection lost.
* The `onsleep` handler of the heartbeat does the following:
  * Emits a `disconnected` event ('Connection lost').
  * Removes all event handlers from the WebSocket.
  * Explicitly closes the WebSocket.
  * Immediately calls `_reconnectWebSocket()` to initiate reconnection.

### WebSocket `onclose` handler

If the WebSocket closes due to network changes or other reasons, the `onclose` handler does the following:

* Emits a `disconnected` event with a reason.
* Clears heartbeat behavior.
* If the `reconnect` flag is `true`, calls `_reconnectWebSocket()`.

## Reconnection logic

TaskRouter SDK v2 handles reconnection automatically, so in most cases, developers don't need to implement any custom logic to manage disconnects or reconnects manually. The `_reconnectWebSocket()` method performs these steps:

* Marks `_isReconnecting = true` to avoid overlapping reconnections.
* Removes all event handlers from the old WebSocket.
* Clears the heartbeat's behavior.
* Uses a backoff algorithm (`generateBackOffInterval(numberOfAttempts)`) to avoid overwhelming reconnection attempts.
  * Starts with 800-millisecond delay and uses exponential backoff with jitter up to 30 seconds.
* After the timeout, checks if the `reconnect` flag is still `true` and then:
  * Increments `numberOfAttempts`.
  * Calls `createWebSocket()` to establish a new connection.

## Token expiry

The token should be refreshed externally and passed to the `EventBridgeSignaling` class using the `updateToken` method. If a new token isn't provided before the current one expires, the WebSocket connection will be closed. The token's expiry is handled using `setTokenExpirationEvent()`:

* Emits a `tokenExpired` event when the token is near expiry with a buffer of 5 seconds.
* Sets the `reconnect` flag to false to prevent reconnection with an expired token.

## Manual disconnect

If SDK users prefer to handle disconnections themselves, they can manually call `disconnect()`. In this case, the SDK won't attempt to reconnect automatically. To reestablish the connection, the user must create a new instance of the Worker.

Calling `disconnect()` does the following:

* Sets the `reconnect` flag to `false`.
* Removes WebSocket event handlers.
* Closes the WebSocket.
* Emits a `disconnected` event ('SDK Disconnect').

## Example flaky connection recovery flow

1. Network connection drops.
2. Heartbeat misses multiple beats, triggering the `onsleep` handler.
3. The SDK emits `disconnected` event, closes the WebSocket, and calls `_reconnectWebSocket()`.
4. A backoff timer runs and tries to reconnect.
5. If the token is still valid, it reconnects and emits the `connected` event.

## Event listeners

When the WebSocket connection is reestablished, the reservation and task objects are automatically fetched from the server again. As a result, any old event listeners attached to the previous objects will no longer receive events.

In other words, after the Worker object has reconnected and it's in the `ready` state, new listeners should be created for the reservations and tasks that were fetched during the reconnection.

## Reservation timeouts

When a Worker disconnects and the reservation times out, a new reservation is created for the next available Worker.
