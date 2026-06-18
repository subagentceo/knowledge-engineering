# Multitasking

Multitasking extends the power of TaskRouter by allowing workers to handle parallel tasks. In a typical call center environment, agents may be handling both voice calls and messaging requests (chat, SMS, Facebook, or WhatsApp). While it's unlikely that workers need to handle more than one voice call at a time, you may want workers to be able to handle multiple tasks of different types - whether messaging, email, or any other type of chat interaction. Multitasking provides the logic for you to specify in what way you want workers to be able to work on more than one task at a time.

In a multitasking-enabled workspace, all the tasks are assigned to one of the available Task Channels (Voice, SMS, Chat, Video or Default). When creating a Task, you can specify the type of Task by providing the appropriate TaskChannel Unique Name via the API. Additionally, TaskRouter automatically assigns the appropriate TaskChannel if the Task is created from within one of the Twilio products. For example, if a Task is created from within Programmable Voice using the `<Enqueue>` verb, then `Voice` is set as the TaskChannel. If no TaskChannel is provided while creating a Task, TaskRouter assigns `Default` as its TaskChannel.

In addition to using Task Channel while creating Tasks, you also need to configure the worker's capacity to handle each of these Task Channels. For example, you may want a worker to handle a maximum of 1 `Voice` call and up to 3 `Chat` requests. This configuration can be easily done from within the Twilio Console by navigating to each worker instance, or by using the REST API. You could also temporarily make a worker unavailable to handle specific task types without setting their capacity to `0`. For example, if your Voice Queue is getting busy, you may want to make some workers unavailable to handle other Task Channels so that they can focus on handling Voice tasks.

## Frequently Asked Questions

### What are TaskChannels and how do I use them?

Task Channels are essentially types of different Tasks such as Voice, Video, etc. When creating a Task, if the Task was originating from a voice call, set "Voice" for the TaskChannel so that TaskRouter can look for Workers that are available to handle "Voice" tasks.

### What channels are available when Multitasking is enabled?

Today we create the following channels by default:

* Voice
* SMS
* Chat
* Video
* Default: Even though this channel is available by default, we recommend avoiding it for new configurations. Using "Default" makes it harder for Twilio Support, as well as your own developers and admins, to immediately know the channel type.

### How can I create a custom channel?

You can [create Task Channels via the REST API](/docs/taskrouter/api/task-channel). Note the following limitations on the Task Channel unique name:

* Property identifiers can only be alphanumeric (and `_` and `$`)
* Property identifiers cannot start with a number
* Property identifiers cannot contain variables.\
  For example, you can use `task_channel.<task_channel_name>_1` or `task_channel.<task_channel_name>``$` but `task_channel.1<task_channel_name>` and `task_channel.<task_channel_name> name` will result in an error.

### Why does the Worker not change activity when using Multitasking?

TaskRouter cannot assign any Tasks to workers unless a worker is in an available activity and since a worker needs to be able to work on multiple tasks when Multitasking is enabled, it's important to keep the worker Idle. However, TaskRouter will keep track of the available capacity and will not assign more tasks than are allowed for a worker.

### What happens if I put my worker to Busy when MultiTasking?

This is a perfectly acceptable use case and it will immediately stop TaskRouter from assigning any new Tasks. If a worker wants to temporarily not receive any Tasks, move the worker to an unavailable activity such as "Busy" so that TaskRouter stops assigning Tasks. However, the worker can continue to work on existing Tasks and complete them.

### How does TaskRouter know when a channel capacity becomes available?

When a worker accepts a reservation and the Task is assigned to the worker, the available capacity for the worker is decremented by 1. Once the existing Task is moved to `complete` assignment status, TaskRouter automatically increments the available capacity by 1. You can move a Task to complete status by using either the [REST API](/docs/taskrouter/api) or using the [completetask()](/docs/taskrouter/js-sdk-v1/workspace/worker) function in taskrouter JS SDK.

### Can I get break down of Tasks by Task Channels?

This is currently not supported, but we expect to make it available soon.

### What kind of statistics are provided when using Multitasking?

You can continue to expose the existing statistics and we will provide more Task Channel specific statistics soon. If you have a request for some specific statistics and metrics please [contact support](https://www.twilio.com/help/contact).

### Can I disable Multitasking?

If your Twilio project was created prior to December 19, 2019, you may be able to disable/re-enable Multitasking. Multitasking is a workspace level setting, and you can enable/disable by navigating to Workspace/Settings in Console or REST API. Once you enable Multitasking and made all the changes, if for any reason you need to disable Multitasking, simply change it from the Console. All the Capacity you've configured for the workers will remain when you enable Multitasking again.

## Advanced Use Cases

This section is dedicated to different uses cases and how you can implement them using Multitasking.

> \[!NOTE]
>
> Please keep in mind that, in a Multitasking Workspace, workers must always remain in an available activity, such as `Idle`, so that TaskRouter can assign tasks based on their available capacity for the appropriate Task Channel. In addition, TaskRouter does not automatically change the worker's activity state when they are reserved with a Task and later accepted the task.

At this point based on the worker's availability, configured capacity and type of Task in TaskQueues, TaskRouter will create reservations for appropriate Tasks for each of the workers. If workers are configured to handle Tasks of multiple different types TaskRouter will continue to create reservations for workers for each channel type that is not at maximum capacity, even if they are busy with one channel. For example, if a worker is currently handling a Voice task and a new Chat Task arrives, TaskRouter will create a reservation for the worker if the worker still has available capacity for Chat TaskChannel.

In reality, you may want to block workers from handling any more Tasks if they are busy with Voice Task. To address this use case TaskRouter provides the following pre-defined attributes that you can use to write an appropriate [Target Worker Expression](/docs/taskrouter/workflow-configuration#more-complex-routing-example-with-target-worker-expressions) in a Workflow.

### worker.channel.\<Task Channel>.configured\_capacity

This attribute returns the current configured capacity of a worker for an appropriate channel. For example, if a worker's Chat capacity is configured to 3 and Voice capacity is configured to 1 then, `worker.channel.chat.configured_capacity` returns 3 and `worker.channel.voice.configured_capacity` returns 1.

### worker.channel.\<Task Channel>.assigned\_tasks

This attribute returns the total number of tasks that are assigned (only the reservations which are in `accepted` state) to a specific channel for the worker. For example, if the worker is currently handling 2 Chat Tasks and 0 Voice Tasks then, `worker.channel.chat.assigned_tasks` returns 2 while `worker.channel.voice.assigned_tasks` returns 0.

### worker.channel.\<Task Channel>.available\_capacity\_percentage

This attribute returns the appropriate channel's current available capacity between 0 and 100 for a worker, where 0 means the worker is capped out handling Tasks for the channel and 100 means the worker is fully available to handle Tasks for the channel. For example, if a worker is configured to handle 1 voice Task and three Chat Tasks and has one Voice reservation state that is `pending`, `accepted`, or `wrapping`, but not assigned to any other Tasks, then `worker.channel.voice.available_capacity_percentage` returns 0 while `worker.channel.chat.available_capacity_percentage` returns 100.

To summarize,

```text
worker.channel.chat.available_capacity_percentage = Math.floor((1 - (worker.channel.chat.[reservations]/worker.channel.chat.configured_capacity))\*100 )
```

Let's review how these attributes can be used to handle the following use cases,

### Preventing a Worker from receiving Chat Tasks if on a Voice Task

In this scenario, we want to filter out workers from receiving Chat Tasks if they are currently assigned to Voice Task. To do that we will write the following [Target Worker Expression](/docs/taskrouter/workflow-configuration#more-complex-routing-example-with-target-worker-expressions),

```text
worker.channel.voice.available_capacity_percentage == 100
```

Alternatively, we could also write the following expression which does the same thing as the above expression,

```text
worker.channel.voice.assigned_tasks == 0
```

### Allowing Workers to receive Voice Tasks if they are handling up to one Chat Task

In this scenario, we want to make workers available to receive Voice Tasks as long as they are handling one or fewer Chat Tasks. To do this we will write the following [Target Worker Expression](/docs/taskrouter/workflow-configuration#more-complex-routing-example-with-target-worker-expressions),

```text
worker.channel.chat.assigned_tasks <= 1
```

This expression will only route Voice Tasks to Workers who are on one or fewer Chat Tasks.

### Allowing Workers to receive Tasks only if they are 50% busy on another channel

In this scenario, we want to make a worker available to handle SMS Tasks if they are only 50% busy with Chat Task. To do this we will write the following [Target Worker Expression](/docs/taskrouter/workflow-configuration#more-complex-routing-example-with-target-worker-expressions),

```text
worker.channel.chat.available_capacity_percentage <= 50
```

This expression will only route SMS Tasks to Workers who are only 50% busy handling Chat Tasks.

**Example:** If the worker is configured to handle 4 Chat Tasks and is currently assigned to 2 `Chat` Tasks, the `worker.channel.chat.available_capacity_percentage is 50` and thus makes worker available to receive Tasks from other channels. However, if the worker is configured to handle 3 `Chat` Tasks is currently assigned to 2`Chat` Tasks, the `worker.channel.chat.available_capacity_percentage is 66` and thus makes worker unavailable to receive Tasks from other channels.

These are just a few use cases that demonstrate how you can use these predefined attributes in your workflow in making appropriate routing decisions for your use case.

You can check out the following FAQ and visit our [REST Docs][REST API] for more information.

[REST API]: /docs/taskrouter/api

### Allow workers to manually grab tasks as well as be automatically assigned Tasks

One commonly asked use case for TaskRouter is "how do I allow workers to manually pick Tasks from a TaskQueue while also automatically receiving Tasks pushed from TaskRouter". Let's imagine your use case is to route chat tasks to workers. You may want to automatically assign chats to workers, but also expose the full queue in their dashboard and allow them the discretion to manually pull more tasks off the queue. Let's discuss how to do this using Multitasking,

1. Set a Worker Attribute called sid and set its value to the SID of the worker returned by Twilio (this will be automatically available in the future without manually setting).
2. Display all the pending tasks in Chat Queue by using the List Tasks API and filter by Chat Queue and the task assignment status.
3. When a worker selects a Task to work, add two new attributes to the Task. Set manual with the value of 1, and worker\_sid to the SID of the worker.
4. Create a workflow that looks like the following,

```json
{
  "task_routing": {
    "filters": [
      {
        "filter_friendly_name": "Manually grabbed by Workers",
        "expression": "manual == 1 AND channel == \"chat\"",
        "targets": [
          {
            "queue": "WQ9e9572cbd73269f7c1f6c99645f14611",
            "expression": "task.worker_sid = worker.sid",
            "priority": "1000"
          }
        ]
      },
      {
        "filter_friendly_name": "All other chats",
        "expression": "channel == \"chat\"",
        "targets": [
          {
            "queue": "WQ9e9572cbd73269f7c1f6c99645f14611",
            "expression": "worker.channel.chat.available_capacity_percentage < 75",
            "priority": "50"
          }
        ]
      }
    ]
  }
}

```

![Task Router UI showing chat channel query with routing steps and worker matching conditions.](https://docs-resources.prod.twilio.com/36764c0884778a1f0fca0c01c4106dbdf55bb070471df79ea564fa08f55333ec.png)

This workflow assigns a high priority to manually selected tasks and then applies Target Workers Expression to look for worker where the `task.worker_sid` matches the sid of the worker. Any other task would be added to the queue with lower priority and are routed by TaskRouter based on the worker capacity.

The other piece is to control what capacity your workers have for handling automatically assigned tasks, and to ensure they still have free capacity to handle manually assigned tasks. You'll notice that in this Target Worker Expression TaskRouter only creates reservation if the available capacity for the worker is \< 75 (percent). This is important to keep some capacity reserved for worker so that they can manually grab Tasks. This is also the place where you can control what percent of Tasks are automatically reserved by TaskRouter Vs what is worker allowed to manually grab. For example, if the total configured capacity for a worker to handle Chat requests is 4 and you want assign up to 3 tasks by TaskRouter but allow worker to grab 1 task manually, then your Target Worker Expression will look like, **worker.channel.chat.available\_capacity\_percentage \< 75**. However if you want the worker to be able to manually grab up to two tasks, and only be automatically assigned two, then the Target Workers Expression looks like, **worker.channel.chat.available\_capacity\_percentage \< 50**.
