# What are WebSockets?

A *WebSocket* is a persistent bi-directional communication channel between a client (e.g. a browser) and a backend service. In contrast with [HTTP request/response connections](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), websockets can transport any number of protocols and provide server-to-client message delivery without polling.

## More on WebSockets

WebSockets are exciting for developers because they allow for *bidirectional* real-time communication between servers and clients.

WebSockets establish [TCP-style connections](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Connection_establishment) in a browser-compatible fashion using HTTP during initial setup. Messages over websockets can be provided in any protocol, freeing the application from the sometimes unnecessary overhead of HTTP requests and responses (including headers, cookies, and other artifacts). But most critical is the ability to deliver downstream (server-to-client) messages to connected clients. In the browser, for instance, the same thing was once only possible by polling a server resource, which is a comparatively racy, high-latency, and bandwidth-intensive affair.

WebSockets are available on many platforms, including the most common browsers and mobile devices. They're often applied to solve problems of millisecond-accurate state synchronization and [publish-subscribe messaging](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern), both of which leverage Websockets' provision for downstream pushes. A challenge of operating a WebSocket-based system is the maintenance of a stateful gateway on the backend. A WebSocket is erected by making a common HTTP request to that server with an `Upgrade` header, which the server (after authenticating and authorizing the client) should confirm in its response. After this, the connection remains established between that physical client-server pair; if at some point the service needs to be redeployed or the load redistributed, its WebSocket connections needs to be re-established.

## How Twilio uses Websockets

At Twilio, we use WebSockets to connect our SDKs to our backend in several of our products:

* [Sync](/docs/sync/api) maintains and distributes a single source of state in the cloud, managed by application developers and disseminated to browsers and mobiles. WebSockets provide the downstream (server-to-client) channel necessary to keep the end-user current with the shared state of the application, and provide a very efficient transport of requests from the endpoints to the Twilio backend.
* [Conversations](https://www.twilio.com/en-us/messaging/conversations-api) provides an extensible and scalable chat backend, with purpose-built SDKs that expose chat primitives to developers. WebSockets provide the channel by which Conversations disseminates Participant state, messages, and Conversation events to the application. They also help detect the availability ("online" or "offline") of a user.
* [TaskRouter](/docs/taskrouter) automatically routes incoming work—customer phone calls, for example—to agents based on their skills and availability. The real-time state of the task as it is processed, assigned, and completed is pushed to the client over persistent WebSocket connections.
