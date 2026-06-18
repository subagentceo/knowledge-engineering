# TaskRouter: REST API Reference

TaskRouter's REST API enables you to interact with TaskRouter resources from your server-side applications.

## Base URL

All TaskRouter URLs referenced in the documentation have the following base: `https://taskrouter.twilio.com`.

All Twilio REST APIs are served over `HTTPS`. To ensure data privacy, unencrypted `HTTP` isn't supported.

## Subresources

The TaskRouter REST API exposes the following subresources. You can read about these resources and some common TaskRouter development tasks below:

* **[Workspaces](/docs/taskrouter/api/workspace)** are containers for your TaskRouter objects. All of your Tasks, Workers, Workflows and Queues are contained within a Workspace. Each account can have multiple Workspaces.
* **[Workers](/docs/taskrouter/api/worker)** are entities that process tasks, like agents in a call center, or the support staff on a support team.
* **[Activities](/docs/taskrouter/api/activity)** describe what Workers are doing and whether they are ready to accept a new task assignment. TaskRouter provides a set of default Activities, but you can customize the list if you need more granular reporting.
* **[Task Channels](/docs/taskrouter/api/task-channel)** provide a mechanism to separate tasks of different types. Workers can be specified to have different concurrent capacity for tasks of each type.
* **[Task Queues](/docs/taskrouter/api/task-queue)** distribute tasks to workers, and collect statistics about task distribution. You can manage Queues through the Task Queues resource.
* **[Workflows](/docs/taskrouter/api/workflow)** route tasks to the appropriate queues, and set rules for each task's prioritization and escalation. Learn how to create, update, and configure Workflows through the Workflow resource.
* **[Tasks](/docs/taskrouter/api/task)** are the individual pieces of work managed by the system. You add, remove, and update Tasks in TaskRouter through the Task resource.
* **[Statistics](/docs/taskrouter/api/taskqueue-statistics)** give you realtime and historical information about the performance of workers and taskqueues in your TaskRouter environment.
* **[Events](/docs/taskrouter/api/event)** provide a feed of activity about changes taking place in a given Workspace.

## REST API best practices

We recommend following [REST API best practices](/docs/usage/rest-api-best-practices), such as [retries with exponential backoff](/docs/usage/rest-api-best-practices#retry-with-exponential-backoff), to handle [API response error 429: "Too Many Requests"](https://help.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests-) during traffic spikes or unexpected usage.

When API rate limits are calculated, they are averaged over 10 seconds. This calculation method means that our REST APIs can handle rate spikes as long as the average number of requests over 10 seconds remains within the per-second rate limit.

We recommend using restricted API keys as a security best practice. Restricted API keys enable you to decide which TaskRouter API resources an API Key can access, as well as which actions the API key is allowed to take on those API resources. For more information, see [Restricted API keys](/docs/iam/api-keys/restricted-api-keys).
