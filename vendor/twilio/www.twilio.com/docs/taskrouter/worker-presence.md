# Skipping based on Worker availability

## Overview

By default, when a Task is processing through a Workflow, a Task waits in a routing step until it's matched to a Worker or until a timeout moves it to the next routing step. If there are initially no matching Workers, you may want to skip to the next routing step immediately. To do this, use the Skip Timeout expression:

```javascript
skip_if: workers.available == 0
```

## Options

The following special variables can be used to evaluate against the Activity of Workers. These variables are scoped to the Workers in the TaskQueue associated with the currently processing routing step.

| Value               | Meaning                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| workers.available   | The number of workers in queue that are in an `Available` activity state                                                 |
| workers.unavailable | The number of workers in queue that are in an `Unavailable` activity state                                               |
| workers.WAxx        | The number of workers in queue that are in the activity state corresponding to WAxx, where WAxx is a valid `ActivitySid` |

Skip Timeout is evaluated only if a Task can't be assigned to a Worker immediately. Additionally, Skip Timeout is successful only if the expression evaluates to `true`. Therefore, TaskRouter skips a routing step in a Workflow when both of these conditions are met:

* No Reservations are immediately created when a Task enters the routing step
* The Skip Timeout expression evaluates to `true`

> \[!NOTE]
>
> If a Task skips a filter, it's evaluated as if the Task didn't match the filter expression. This is important when considering your `default_filter` behavior because, even though a Task may match one of the filter expressions, Tasks that skip a named filter still qualify for the `default_filter`.
>
> To learn more about the behavior of the default filter, see the [Workflow Overview](/docs/taskrouter/workflow-configuration).

## Skipping based on capacity

The variables mentioned above only relate to the Activity of Workers. In a multitasking Workspace, Tasks are only assigned to Workers if they:

* Match the rules of the routing step (for example, they're part of the selected TaskQueue and match the Workers expression)
* Are in an `Available` Activity
* Have capacity on the Task's channel

The expression `1==1` is useful here. Because `1==1` always evaluates to true, you can use it to skip the routing step if no Workers are available that match the above criteria.

## Syntax

Example Skip Timeout expressions:

* `1==1`
* `workers.available == 0`
* `workers.WAxx < 2`
* `workers.WAxx < 2 OR workers.WAyy < 2`

Skip Timeout expressions must evaluate to `true` or `false`, support equality and comparison, and can be compounded with AND/OR logical operators.

```json
{
   "task_routing":{
      "filters":[
         {
            "filter_friendly_name":"Sales filter",
            "expression":"type == 'Sales'",
            "targets":[
               {
                  "queue":"WQ3935a4f744a241c1356c09310c2398e6",
                  "expression":"task.subSection == worker.specializedSubField",
                  "order_by":"worker.english_level ASC",
                  "priority":"1",
                  "skip_if": "workers.available == 0"
               },
               {
                  "priority":"1",
                  "queue":"WQ787b271950e0f7687ec432221e672ffa"
               }
            ]
         }
      ]
   }
}
```
