> For clean Markdown of any page, append .md to the page URL.
> For a complete documentation index, see https://developer.anduril.com/llms.txt.
> For AI client integration (Claude Code, Cursor, etc.), connect to the MCP server at https://developer.anduril.com/_mcp/server.

# Tasks overview

The [task model](/reference/rest/tasks/create-task) is a data structure for
modeling deliberate, sequential actions that an operator can execute on an asset or team of assets.

A **taskable agent** is a service, asset, group,
or human that can accept and perform tasks. For example, you might task a robot to investigate
a specific area.

The **Tasks** API manages the lifecycle and routing of tasks to
taskable agents, allowing you to create, update, monitor, and execute tasks.
Task Manager manages the distribution and persistence of tasks across Lattice.
As agents process tasks, they update the status of tasks. Task Manager maintains the latest status
of tasks across the common operating picture.

## Task model

A task is composed of the following required components:

A description of the task. Use this to provide an overview of the task objective,
and the agents assigned to execute the task.

The complete JSON definition, setting the objective and parameters for the task, as a string.

The version of the task.

The record of the integration, or operator, that initiated the task.

The record of the integration, or operator, that last updated the task.

## Task catalog

To let Lattice know your agent can complete specific tasks, add the
`TaskDefinitions` in the entity's [`TaskCatalog`](/reference/rest/entities/publish-entity#request.body.taskCatalog) component:

Sets the URL for the specific task definition that the agent can perform.
Must be prefixed with `type.googleapis.com/`:
A`VisualId` task might involve identifying or tracking visual targets.

Work with your Anduril representative to determine a list of task definitions
for your use-case

For example, the following `VisualId` task might involve identifying or tracking visual targets:

```json title="entity.json"
"taskCatalog": {
    "taskDefinitions": [
        {
            "taskSpecificationUrl": "type.googleapis.com/anduril.tasks.v2.VisualId"
        }
    ]
}
```

## Task status

The TaskManager API lets operators and agents track, and update, the lifecycle of tasks.
To configure your app to update task status, use the [`UpdateTaskStatus`](/reference/rest/tasks/update-task-status) API method and
specify the following components:

Indicates the lifecycle stage of a task as reported by the agent. The
[`taskStatus` component](/reference/rest/tasks/get-task#response.body.status). For more information,
see [Update a task](/guides/tasks/update).

Contains any errors that occurred while executing the task.

Indicates incremental progress on the Task, should be from the tasks `/v*/progress` folder.

Indicates the result of the task, should be from the tasks `/v*/result` folder.

Indicates the time when the task started executing.

Any estimate for how the Task will progress, should be from `tasks/v*/estimates` folder.

Contains a list of agents actively being utilized to execute a task.

## Task lifecycle

Tasks have a well-defined lifecycle: **create**, **update**, and
**delete**. In each stage of a task lifecycle, Lattice emits the state
change event to the environment, increasing your situational awareness:

When a task is first created, Lattice sets the task status to `STATUS_SENT`.
Agents assigned to this task can then listen for, receive, and act on the task.

As an agent makes progress towards the overall objective of a task, it
updates the status of the task in Lattice, and increments the task status version.

When the agent completes the task, it sets the task status to one of two terminal states:
`STATUS_DONE_OK` if the task was successful, or `STATUS_DONE_NOT_OK` if the task failed.
A task with either of the aforementioned terminal states cannot be updated.

## What's next?

* To learn how an agent can listen to tasks, see [Listen for tasks](/guides/tasks/listen).