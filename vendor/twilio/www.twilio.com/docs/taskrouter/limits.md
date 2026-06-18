# TaskRouter resource limits

## Overview

Twilio TaskRouter has **default** limits on resources and endpoints. If you encounter these limits, [please reach out to our support team](https://help.twilio.com). We're happy to help and evaluate whether we can increase some of those limits for you.

To view the default limits as well as your account-specific limits, log into the Twilio Console and navigate to your TaskRouter Workspace's Limits page.

## Why TaskRouter has limits

Limits are generally put in place as a defensive measure for services. Even highly scalable systems and shared services need to be protected from excessive use, intended and unintended, to maintain stability and availability of the service. For the system to perform well, clients must also be designed with rate limiting in mind to reduce the chances of cascading failure. Rate limiting on both the client side and the server side is crucial for maximizing throughput and minimizing end-to-end latency across distributed systems.

## REST API best practices

To ensure Flex and TaskRouter perform well with your custom solution, it's important that you build using [REST API best practices](/docs/usage/rest-api-best-practices) like [retries with exponential backoff](/docs/usage/rest-api-best-practices#retry-with-exponential-backoff) to properly handle the [API response Error 429 "Too Many Requests"](https://help.twilio.com/hc/en-us/articles/360044308153-Twilio-API-response-Error-429-Too-Many-Requests-).

When using TaskRouter Statistics endpoints, we recommended leveraging caching from your backend application to ensure each endpoint can support your scaling needs. In scenarios where these endpoints are used from a client application, we recommend implementing a sync layer, e.g., via [Twilio Sync](/docs/sync/api), to help synchronize each endpoint's state across all clients, in order to ensure each endpoint can scale with your user growth.

You can also engage the Twilio Professional Services team to help you build on the TaskRouter platform and design the best solution for your organization.

## Resource configuration limits

Unlike rate and resource limits, the resource configuration limits are non-changeable limits.

> \[!NOTE]
>
> The limits on JSON attributes include whitespace. You save a few bytes by using a JSON minifier and creating/updating the Resource through the REST API.

| Configuration                             | Description                                                                                                                              | Limit                     |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Worker Attributes                         | The maximum size of the JSON string used for defining Worker attributes.                                                                 | 4096 characters           |
| Task Attributes                           | The maximum size of the JSON string used for defining Task attributes.                                                                   | 4096 characters           |
| Workflow Configuration                    | The maximum size of the JSON string used to define a Workflow.                                                                           | 1038576 bytes (1MB)       |
| Task Timeout (Pending and Reserved Tasks) | The maximum amount of time a Task can exist in a pending or reserved state before timing out (task.timeout) and being cancelled.         | 1209600 seconds (2 weeks) |
| Task Timeout (Assigned Tasks)             | The maximum amount of time a Task can stay assigned to a Worker before being deleted by the system (task.system-deleted).                | 86400 seconds (24 hours)  |
| Max Reservation Timeout                   |                                                                                                                                          | 86400 seconds (24 hours)  |
| Max Reserved Workers                      | The maximum number of Workers that can simultaneously be offered a reservation for a Task in a TaskQueue with Multi-Reservation enabled. | 50                        |

## Other limits

| **Name**                                    | **Description**                                                                                                                                                                                                                                            | **Limit**      |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Max Assignment Count                        | Number of times a Task can move from status `pending` to `reserved` before being cancelled. In a multi-reservation setup, the simultaneous reservation of multiple workers equates to only a single Task state change from status `pending` to `reserved`. | 1,000          |
| Worker Statistics Endpoint Cap              | Worker Statistics REST API endpoints are not accessible by default if you have over these many Workers in your Workspace.                                                                                                                                  | 100            |
| Waiting Voice Calls per TaskRouter Workflow | Every TaskRouter workflow that handles voice calls has a [Programmable Voice queue](/docs/voice/api/queue-resource) under the hood. This refers to the default size of that queue.                                                                         | 100 (max 5000) |

### Update the waiting voice calls per TaskRouter Workflow limit with Twilio CLI

The limit for the number of waiting voice calls is set on a per-workflow basis and can be updated through our [REST API](/docs/voice/api/queue-resource) or by using Twilio CLI and the steps below.

#### Step 1: Find your TaskRouter Workflow SID

Find the workflow sid for the TaskRouter workflow that you are running into queue limit issues with, either through console or by running the following cli command.

List all TaskRouter Workflows.

```bash
twilio api:taskrouter:v1:workspaces:workflows:list --workspace-sid WSxxx
```

#### Step 2: Find the Queue that matches your TaskRouter Workflow

Find the queue sid that matches your queue by running the following cli command. The `friendlyName` for the queue you are looking for will be the workflow sid you grabbed in step 1.

List all Programmable Voice Queues.

```bash
twilio api:core:queues:list --properties "sid,friendlyName,maxSize"
```

#### Step 3: Update the maxSize of your Queue

Update the max size of the queue using the following cli command. The `max-size` property can be an integer between 0 and 5000.

Update the Max Size of a Programmable Voice Queue.

```bash
twilio api:core:queues:update --sid QUxxx --max-size 500 --properties "sid,friendlyName,maxSize"
```
