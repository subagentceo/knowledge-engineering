# Known Agent Routing

Your customer, Charlie, called in yesterday and spoke with an agent, Ricky. She had a good experience with Ricky, and said so yesterday. Today, Charlie is calling back in to follow up.

In many contact centers, Charlie might end up speaking to a new agent. This means she spends time discussing her issue once again, and telling the new agent about her call with Ricky. With Known Agent Routing, however, you can provide Ricky's Worker SID and attempt to match Charlie with Ricky again. Both Charlie and Ricky are able to pick up where they left off, and get her issue solved.

Use cases where Known Agent Routing can be used include 'last agent routing' or 'preferred agent routing', and the feature can also be leveraged to support extension dialing use cases. All of these use cases have in common that the agent who should be targeted first is already known.

> \[!NOTE]
>
> Known Agent Routing offers significant performance improvements over the general evaluation logic in those use cases. To prevent latencies e.g. during times when there is a spike in Task volume, we recommend that you always utilize Known Agent Routing when implementing such use cases, and update your existing Workflows to leverage Known Agent Routing as well.

## Writing Workflows with Known Agent Routing

You can choose one of two fields to designate an agent as [the target of the Workflow](/docs/taskrouter/lifecycle-task-workflows-and-assignment).

To identify the known agent based on Worker SID:

```json
 "known_worker_sid": "task.agent_sid"
```

To identify the known agent based on Worker friendly name:

```json
 "known_worker_friendly_name": "task.agent_friendly_name"
```

You can use the `known_worker_sid` OR the `known_worker_friendly_name` as a key. The value should be an attribute in the Task attributes that references the appropriate agent information.

For example, the preceding snippets might use the following process:

1. The agent's SID is added to the Task as a new attribute during Task Creation.
2. The Task is evaluated against the Workflow.
3. The Workflow references the Task attribute to populate the `known_worker_sid` in the Workflow Target. This pattern is also used for the Worker friendly name, which is required when `known_worker_friendly_name` is used in the Workflow Target instead.
4. Finally, the Workflow will try to target the Worker whose SID matches the Task's agent SID or the agent's friendly name (depending on your chosen key).

[Events](/docs/taskrouter/api/event) created using Known Agent routing will contain a `known_worker_sid`, which you can use to infer that Taskrouter used Known Agent Routing for handling a given Task.

### Example Workflow

```json
{
  "filters": [
    {
      "filter_friendly_name": "sample workflow filter",
      "expression": "category == 'some_category'",
      "targets": [
        {
          "queue": "WQ00000000000000000000000000000001",
          "priority": "100",
          "timeout": "10",
          "known_worker_sid": "task.agent_sid",
          "expression": "worker.activity_name in ['Generally Available', 'High Value Tasks']"
        },
        {
          "queue": "WQ00000000000000000000000000000002",
          "priority": "20",
          "expression": "worker.activity_name in ['Generally Available']"
        }
      ]
    }
  ]
}
```

## Creating a fallback when the Worker isn't available

In the best-case scenario, the agent will be in the Task Queue and will be available. But if either of these conditions isn't true, you can use additional Workflow Target fields - like timeout, priority, and expression - to ensure that your customer is helped in a timely manner. TaskRouter will evaluate the general worker expression in addition to the Known Agent Routing field, but the use of a general worker expression or workflow fields is optional.

Note that if the known agent is not part of the specified TaskQueue OR the inherited TaskQueue in the Workflow Target, you will receive a debugger error ([Error 40152 - Invalid Queue for Known Worker](/docs/api/errors/40152)).

## Updating and Editing Known Agent Routing Workflows

![Workflow configuration showing task queue, worker SID, and timeout settings.](https://docs-resources.prod.twilio.com/651633d8271531587b2af8f421d5ad71b2ae92a8857c4e2560b46f3ee9c8b21a.png)

**Example JSON**

```json
 {
  "task_routing": {
    "filters": [
      {
        "filter_friendly_name": "Attempt 1",
        "expression": "1==1",
        "targets": [
          {
            "queue": "WQf4b9e3942acb4b62fdda09e84971e98e",
            "timeout": 10,
            "known_worker_sid": "task.agent_sid"
          },
          {
            "queue": "WQf4b9e3942acb4b62fdda09e84971e98e"
          }
        ]
      }
    ],
    "default_filter": {
      "queue": "WQf4b9e3942acb4b62fdda09e84971e98e"
    }
  }
}

```

You can specify known worker logic in the Twilio Console. The field is optional, and can either be `known_worker_sid` or `known_worker_friendly_name`, but not both. When `known_worker_sid` or `known_worker_friendly_name` is selected, you can enter a string that corresponds to a field on the task as your value (e.g., `task.agent_sid` or `task.agent_friendly_name`). If the chosen worker key holds an incorrect value, TaskRouter will emit a debugger error message.

For those tasks without an actual known worker reference, you can use the `null` value assigned to the Known Worker field on the task to avoid debugger log messages:

```json
{
  "agent_sid": null
}

```

> \[!WARNING]
>
> Do not wrap the known worker `null` value in quotation marks.

A task that flows through a known worker filter target will, even if the known worker key is null or incorrect, stay in that target until any of the following conditions is satisfied:

* Timeout of the target is met
* `skip_if` condition is met
* The Task's TTL is reached and the Task is cancelled

For more information, see [Lifecycle of a Task: Workflows and Assignment](/docs/taskrouter/lifecycle-task-workflows-and-assignment).

## Next Steps

* Learn more about [TaskRouter Expressions](/docs/taskrouter/expression-syntax)
* Review the basics of [configuring TaskRouter workflows](/docs/taskrouter/workflow-configuration)
* [Create a workflow programmatically](/docs/taskrouter/api/workflow) using the TaskRouter API
