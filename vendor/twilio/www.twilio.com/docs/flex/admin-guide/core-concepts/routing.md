# Core concepts: Routing

## Overview

Twilio Flex uses [TaskRouter](/docs/flex/developer/routing) to distribute calls, messaging sessions, and other types of work to agents in your contact center. It uses Tasks to represent calls, messages or other communications, and to capture all the necessary information for routing them. For every call or message that needs to be handled by a human agent (meaning that the communication moves past the pre-agent stages like an IVR), the TaskRouter API creates a Task. TaskRouter then routes that Task to a suitable agent (also known as a "TaskRouter Worker").

One customer communication is usually captured by a single Task. Each agent can handle multiple Tasks at a time (for example, they can chat with multiple customers at once).

## How TaskRouter Works

![TaskRouter workflow showing business event, application task addition, workflow evaluation, task queue, and worker assignment.](https://docs-resources.prod.twilio.com/57be9b4308a0e7bbc0a8ecb93d899cabcb74b57fc39e2c2f4f521ff299b34a02.png)

A TaskRouter [Workspace](/docs/taskrouter/api/workspace) is composed of many entities that work together to enable a [Task](/docs/taskrouter/api/task) to match a [Worker](/docs/taskrouter/api/worker), someone who can take action on the pending Task. This is accomplished through a few steps:

* Creating a Task and passing it through a [Workflow](/docs/taskrouter/api/workflow)
* Evaluating a Task's attributes to identify how it should route
* Routing the Task into a [TaskQueue](/docs/taskrouter/api/task-queue) composed of Workers
* Finding the subset of Workers with matching attributes for the Task
* Pairing the Task with a Worker through a [Reservation](/docs/taskrouter/api/reservations)
* Completing the Reservation once the work represented by the Task is done

Each TaskRouter step emits [Events](/docs/taskrouter/api/event) which log all activity within the Workspace. You can use these events for reporting, or have your applications subscribe to them and trigger new actions.

## Workspaces

A **[Workspace](/docs/taskrouter/api/workspace)** is the container for all other TaskRouter entities (Tasks, Workers, TaskQueues, Workflows, and Activities). Flex supports a single TaskRouter Workspace per Flex account. By default, this Workspace is called "Flex Task Assignment".

## Workers

**[Workers](/docs/taskrouter/api/worker)** represent the agents in your contact center who can receive and perform Tasks. The default maximum number of Workers that you can create within the Flex Workspace is 15,000. Read more about Workers in the [Core concepts introduction](/docs/flex/admin-guide/core-concepts/introduction#users-and-roles-in-flex).

## Tasks

A **[Task](/docs/taskrouter/api/workflow)** represents a unit of work waiting for a Worker to perform it. Typically, Tasks represent communications with an end-customer. For example, a phone call or a web chat conversation. A Task progresses through a series of [states](/docs/taskrouter/lifecycle-task-state), starting with `pending`, until successfully ending with `completed`. TaskRouter's primary job with a `pending` Task is to find an available Worker to handle it.

Each Task carries with it all the information about the engagement — from the caller's number in a voice call to their data entered during an IVR interaction. This information can then be surfaced to the agent who accepts the Task, giving them enough context to help the customer. Task assignment is handled by [the Workflows within a TaskRouter Workspace](/docs/taskrouter/lifecycle-task-workflows-and-assignment).

## Workflows

A **[Workflow](/docs/taskrouter/api/workflow)** defines the rules for routing Tasks to Workers. A Workflow configuration defines the mechanism for routing Tasks to Queues and Workers, assigning priorities, and escalating when needed. Your Workflow can implement skills-based routing for multi-skilled Workers, prioritized routing, or other common routing models.

Whenever a new Task is added to the Workflow, it's evaluated against the Workflow configuration. Workflow configuration is defined as JSON and works like a case statement: the Task is routed based on the first matching TaskRouter Expression.

## Task Queues

**[Task Queues](/docs/taskrouter/api/task-queue)** allow you to categorize Tasks and describe which Workers are eligible to handle them. As your Workflow processes a Task, it passes through one or more Task Queues until the Task is assigned and accepted by an eligible Worker.

## Skills

**Skills** refer to abilities that you assign to Workers and apply to your contact center Task Queues and Workflows. Skills serve as Worker labels and help you sort your contact center users. When [adding skills through the UI](https://console.twilio.com/us1/develop/flex/users-and-access/skills), Flex displays the resulting expressions, which you can apply as filters on Queues and Workflows. You assign skills to agents using the [Teams View in Flex](https://flex.twilio.com/teams/). When a pending Task comes in, TaskRouter [executes your Workflow configuration](/docs/taskrouter/lifecycle-task-workflows-and-assignment) to find a suitable Worker.

## Reservations

TaskRouter creates a [Reservation](/docs/taskrouter/api/reservations) whenever a Task is reserved for a Worker. Flex notifies agents of incoming voice and messaging Tasks, and they have the option to accept or reject each Task.

## Activities

[Activities](/docs/taskrouter/api/activity) describe the current status of a Worker, which determines whether they are available to receive Task assignments. Workers are always set to a single Activity. Flex ships with default TaskRouter Activities ("Available", "Unavailable", "Break", "Offline"). You can add, remove or change friendly names of Activities in the [TaskRouter section](https://console.twilio.com/us1/develop/taskrouter/overview) of the Twilio Console.

The **Availability** property of an Activity determines whether a Worker in this Activity is ready to accept new Tasks.

Every TaskRouter Workspace needs to include a few Activities that required for TaskRouter operation. To learn more about the **TimeoutActivity** and the **DefaultActivity**, see [Activity Resource](/docs/taskrouter/api/activity) . In addition, the **LogoutActivity** is the only unbilled Activity on Active User Hour pricing. By default, all of these are set to the **Offline** Activity.

You can create additional Activities using [Twilio Console](https://console.twilio.com/us1/develop/taskrouter/workspaces) or the [REST API](/docs/taskrouter/api/activity#create-an-activity-resource).

## Task Channels

Your Flex contact center can have different types of Tasks, which are separated by **Task Channels**. Task Channels help TaskRouter identify available Workers who can handle the Task. The default Task Channels created for a Flex account are "default", "voice", "chat", "sms" and "video".

## Worker Capacities and Multitasking

All Flex Workspaces are **multitasking**, i.e., they allow Workers to handle multiple Tasks in parallel. In a typical contact center environment, agents may be handling both voice calls and messaging requests. While agents can handle just one voice call at a time, you may want them to handle multiple messaging Tasks simultaneously. Multitasking allows you to specify the rules for how Workers can handle multiple Tasks at a time.

Worker **capacity** for a certain Task Channel defines how many Tasks can be assigned to that Worker at any given time. For example, if John's capacity for the `sms` Task Channel is 2, it means that TaskRouter can assign up to 2 SMS-based messaging sessions to John. Further sessions can be assigned once any of the previous ones are completed. You can learn more about Capacity and multitasking in the [Worker Channel resource](/docs/taskrouter/api/worker-channel) and the [Multitasking page](/docs/taskrouter/multitasking).

## Ordering strategies

### Task ordering

You can configure each Task Queue to have one of these Task orders:

* **"First In, First Out" (FIFO)** (default): Tasks are ordered in descending order of priority (highest priority first) and then by ascending order of time (oldest first). This means the highest priority Task is picked up first, and if there are multiple Tasks of the same priority, the oldest one gets picked up before the others.
* **"Last In, First Out" (LIFO)**: Tasks are ordered in descending order of time (newest first) and made available for assignment. Priority is ignored.

If you have a mix of FIFO and LIFO Task Queues in the Workspace, set the **Order Priority** setting to specify whether to prioritize FIFO or LIFO Task Queues. For example, if Workspace order priority is set to FIFO, and an agent is part of both FIFO and LIFO Task Queues, that agent will be assigned Tasks from the FIFO Task Queues first.

### Worker assignment ordering

Round-robin assignment is the default worker ordering strategy in Flex TaskRouter Workspaces. This type of ordering means that available Workers receive Tasks proportionally and in circular order, without other factors being evaluated.

Channel-optimized routing is a Task Channel setting that isolates Worker assignment for one Task Channel from other Task Channels. When enabled for a Task Channel on a round-robin assignment Workspace, a separate round-robin circle takes effect for that specific Task Channel. This means that an incoming Voice call goes to the agent who hasn't received a Voice call for the longest time). Currently, you can enable Channel-optimized routing for a Task Channel only using the [REST API](/docs/taskrouter/api/task-channel).

Activity-based routing is an evaluation pattern that allows you to include or exclude agents based on the Activity that they are in. To learn more about use cases and relevant TaskRouter expressions, see [Activity-based Routing](/docs/taskrouter/activity-based-routing).

## Additional resources

* To learn more about TaskRouter's capabilities and get started with TaskRouter development, see [How TaskRouter Works](/docs/taskrouter/how-taskrouter-works).
