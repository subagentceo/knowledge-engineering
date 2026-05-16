# Getting Started with TaskRouter

[TaskRouter](/docs/taskrouter) is an attributes-based routing system for your Flex contact center. TaskRouter uses [Tasks](/docs/taskrouter/api/task) to represent a unit of work that needs to be completed across your configured communication channels and provides a set of tools to allow you to intelligently route a task to the agent best suited to handle it.

![TaskRouter lifecycle: lead to call, message, chat, then routed to escalation, support, or sales.](https://docs-resources.prod.twilio.com/76ffc2f15921d859a7683ab102bf4600cb725a6768020fc7c33a5fa10b0bdf68.gif)

TaskRouter includes a variety of objects, including [Workflows](/docs/taskrouter/api/workflow), which are human readable definitions of your routing logic, and [Task Queues](/docs/taskrouter/api/task-queue), which represent key segments of agents. All of these moving parts come together to offer you customizability and scalability for your routing rules.

## How Flex Uses Tasks

Flex uses Tasks to power many parts of your contact center, including:

**Upleveling Agent Experience with Task Attributes**\
You can [dynamically expose task data in the Flex UI](/docs/flex/developer/ui/add-component-context). This helps to ensure that your agents have context for the work they're doing, and even allows you to change the look, feel and features of the Flex UI depending on the current Task.

**Task Channels**\
By default, TaskRouter understands that you'll create tasks for sms and voice. You can also [define custom channels](/docs/taskrouter/api/task-channel), like WhatsApp, Facebook Messenger, or Web Chat. You can route tasks based on their channels, and render the channel to the Agent in the Flex UI.

**Analytics**\
As TaskRouter works, it generates a stream of valuable events and statistics about agent activity, task volume, and more. Flex can consume this Task data as the basis for workforce management in your contact center with [Flex Insights](/docs/flex/end-user-guide/insights).

## Key Differences

TaskRouter for Flex differs from a vanilla TaskRouter implementation in the following ways:

**Allows One Workspace**\
You're limited to one workspace when using Flex. For majority contact centers, a single workspace is all you need, but you can work with your Twilio team to understand if this might be a limitation for you.

**Uses the v2 SDK**\
Flex currently uses the [v2 Flex SDK](https://github.com/twilio/twilio-taskrouter.js) in order to support features like transfers. The v2 SDK is currently [documented on Github](https://twilio.github.io/twilio-taskrouter.js/index.html).

## Diving In

Now that you know a little bit about TaskRouter, why not try:

* Getting started with the [TaskRouter API Documentation](/docs/taskrouter)
* Try your hand at [tackling a TaskRouter quickstart](/docs/taskrouter/quickstart)
