# TaskRouter.js v1: Integrating TaskRouter to your browser-based applications

> \[!NOTE]
>
> The following documentation is for the CDN version of [TaskRouter JS SDK V1](https://sdk.twilio.com/js/taskrouter/releases/1.24.3/taskrouter.js) and [twilio-taskrouter-v1 on npm](https://www.npmjs.com/package/twilio-taskrouter-v1).
>
> This is a legacy SDK. It is not actively developed, and you can't use it for new development. For new integrations, use the [Twilio TaskRouter SDK v2](https://github.com/twilio/twilio-taskrouter.js) which supports both Flex and TaskRouter standalone deployments.

TaskRouter's JS library allows you to interact with the entire TaskRouter REST API by a simple JS API. TaskRouter supports the initialization of three types of objects:

* [Worker][worker-js]
* [Workspace][workspace-js]
* [TaskQueue][taskqueue-js]

Workers use a Websocket connection to TaskRouter to receive realtime notifications of Worker Reservations and Task details. Upon receiving a notification for a reservation, a Worker can accept or reject the reservation. In addition, a Worker can dequeue a given call that was enqueued using the Enqueue TwiML verb. Workers can be used to build a contact center agent desktop application, add Worker presence to your CRM system, leverage TaskRouter for internal support desk applications, and much more.

You can use Workspaces & TaskQueues to build an administrative panel of statistics and display your workers, tasks, and task queues.

Since the entire REST API is exposed with the JS SDK, any of these entities can modify their properties or their subresource properties. For example, worker can modify their current activity, attributes, and friendly name. A workspace can fetch a given task queue and update its TargetWorkers. A workspace can also fetch its statistics or for a given task queue.

Get started using TaskRouter.js with workers by working through the [TaskRouter Quickstart][taskrouter-quickstart] or [reviewing the TaskRouter JS Worker API documentation][worker-js].

[taskrouter-quickstart]: /docs/taskrouter/quickstart

[worker-js]: /docs/taskrouter/js-sdk/workspace/worker

[taskqueue-js]: /docs/taskrouter/js-sdk/workspace/taskqueue

[workspace-js]: /docs/taskrouter/js-sdk/workspace

> \[!NOTE]
>
> If you're working with the Twilio Flex, head over to [the TaskRouter.js documentation on Github](https://twilio.github.io/twilio-taskrouter.js/index.html).
