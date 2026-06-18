# Workflows Overview

A [Workflow](/docs/taskrouter/api/workflow) defines the rules for distributing Tasks to Workers. A Workflow's configuration matches Tasks into Task Queues, assigns each Task's priority, and configures time-based rules for escalating the Task. A Workflow can model skills-based routing to multi-skilled workers, prioritized routing, and other common task routing models.

Whenever a new Task is added to the Workflow it will be evaluated against the Workflow's configuration. Workflow configurations are described using JSON. You can think of a Workflow configuration like a case statement: The Task will be routed based on the first expression matched.

This page provides an overview of the basic concepts within Workflows. For more advanced uses, see the dedicated pages within this section of the documentation.

## Workflow Configuration Document Structure

Workflow configuration JSON documents have the following structure:

```json
{
  "task_routing":{
    "filters":[
      {
        "filter_friendly_name": "<friendly name>",
        "expression": "<condition>",
        "targets":[
          {
            "queue": "<task queue sid>",
            "priority": "<priority>",
            "timeout": "<duration>",
            "expression": "<condition>"
          },
          ...
        ]
      },
      ...
    ],
    "default_filter":{
      "queue": "<default task queue sid>"
    }
  }
}
```

At the top level, there is the key "filters" that references an array of filter objects and a "default\_filter" key which provides a catch-all route for Tasks that do not match any of the specified filters.

Each filter object in the "filters" array is comprised of the following keys:

* "filter\_friendly\_name" - an optional human-friendly description of the filter
* "expression" - a [SQL-like conditional](/docs/taskrouter/expression-syntax) used to determine if a Task matches the filter
* "targets" - an array of target objects that define how the Task is routed to a TaskQueue

Each target object in the "targets" array is comprised of the following keys:

* "queue" - the sid of the TaskQueue you want to place this Task into
* "priority" - The priority of this Task in the TaskQueue. Tasks with a higher priority are assigned before older tasks with a lower priority.
* "timeout" - The number of seconds you want the Task to remain in this TaskQueue. Must be a positive integer.
* "expression" - a [SQL-like conditional](/docs/taskrouter/expression-syntax) used for additional control to route Tasks. See Target Worker Expressions below.

"default\_filter" also points at a target object, but in this case, there is no "timeout" attribute.

## Evaluation

For a high-level overview of Workflow evaluation, see [Workflows and Assignment](/docs/taskrouter/lifecycle-task-workflows-and-assignment).

Tasks are evaluated against the filter conditions from the top of the document to the bottom, just like a [switch statement](https://en.wikipedia.org/wiki/Switch_statement) in many programming languages. If a Task matches multiple filters, only the first matching filter is evaluated. So, make sure to define your filters from more specific to more general.

Like switch statements, you should always include a `default_filter`. This filter will catch any tasks that do not match a defined case.

Once a Task has matched a filter, the target objects are applied. Targets are also applied top to bottom. If a target has a "timeout", then upon that timeout being reached, the Task will be updated to the next target object. The next target object can specify a different priority, so that a long waiting Task can be bumped ahead in line. It can also specify a different queue so that the waiting Task can be moved to a different TaskQueue. If a target expires and there are no further targets, the Task is considered timed out and will be canceled.

As a convenience, subsequent targets inherit details from Task and previous targets:

* The first target within a filter requires a queue. All subsequent targets within the filter will inherit the queue if not redefined.
* If a target defines a priority, it will update the priority of the Task. If no priority is defined, the Task's existing priority will be used.
* Expressions and timeouts only apply if defined on a target.

A Workflow "completes" once the Task has been matched with a Worker and the Reservation is accepted. Until an accepted Reservation is generated, the Task will continue to flow throughout the Workflow. Timeouts control the flow from one target to the next, or from one filter to the next matching filter (if existing).

* If a filter contains multiple targets, a subsequent target will **only** be reached if a timeout is applied to the previous target. A [Skip Timeout](/docs/taskrouter/worker-presence) expression can also be used to reach a subsequent target.
* If a timeout is applied on a target and there are no subsequent targets or filters, or the Task doesn't match a subsequent filter, then the Task will fall out of the Workflow and be canceled.
* Note that the `default_filter` does not count as a subsequent filter for the purposes of a timeout. The default filter is **only** used when the Task skips or fails to match all other filters.

> \[!WARNING]
>
> Using Filter Expressions and Target Worker Expressions, you can target individual Workers. You should not use directly identifying information (aka personally identifiable information or PII) like a person's name, home address, email or phone number, etc., because the systems that will process these Workflows assume there is no directly identifying information within the Workflows.
>
> Instead, you should use a GUID or other pseudonymized identifier for Worker identity. You can read more about how we process your data in our [privacy policy](/en-us/legal/privacy).

## Examples

Below are a series of incrementally more complex Workflow Configuration Documents.

For these examples, assume we have three existing TaskQueues configured in our Workspace:

* Sales (WQaaa) - contains workers who can take sales leads.
* Support (WQbbb) - contains workers who can take support request tickets.
* Everyone (WQccc) - contains all workers.

### Simple Default example

The simplest workflow configuration document defines a default\_filter that points at a TaskQueue. This workflow will behave like a simple FIFO queue, with all Tasks being assigned to the Everyone TaskQueue with the same priority, causing them to be assigned in the order they're added.

```json
{
  "task_routing": {
    "default_filter": { 
      "queue": "WQccc"
    }
  }
}
```

### Simple Task Escalation Example

This example describes Task escalation. In this case, we want to make sure Tasks that have been waiting for more than five minutes get bumped up in priority. We do this by specifying a set of targets with timeouts.

```json
{
  "task_routing":{
    "filters": [
      {
        "filter_friendly_name": "Prioritizing Filter",
        "expression": "1==1",
        "targets": [
          {
            "queue": "WQccc",
            "priority": 1, 
            "timeout": 300
          }, 
          {
            "priority": 10
          }
        ]
      }
    ], 
    "default_filter": {
      "queue": "WQccc"
    }
  }
}
```

Because we've set our filter's expression to an expression that will always evaluate true ("1==1"), it will match any Task. Matched Tasks will first be placed in the Everyone TaskQueue with a low priority of 1, but with a timeout of 5 minutes (300 seconds). If the Task is not assigned within 300 seconds, the next target is applied, updating the Task to have a priority of 10, putting it ahead of any Tasks with a lower priority (but still behind older Tasks with a priority of 10). Because the second Task did not have a "timeout" stated, the Task is not re-targeted again.

Although the first filter will match every Task (because 1 will always be equal to 1), it's always good practice to include a `default_filter`!

### Complex Routing Example

In this example, the Workflow includes a second Task Attribute: `customer_value`. When a support Task is specified, the Task can be tagged as a "gold", "silver", or "bronze" customer\_value. We have changed our expressions to be more complex, sorting not only on "type" but also on "customer\_value".

If the customer is "gold", we want to prioritize these tickets above other tickets placed in the Support TaskQueue. We also don't want gold customers to wait on hold too long, so we specify that if they're waiting more than five minutes, then move the Task to the Everyone TaskQueue with a higher priority of 10. This means the gold Task will now be available to all workers, not just Support workers, and it will move in front of "lead" Tasks which only have a priority of 1.

```json
{
  "task_routing":{
    "filters":[
      {
        "filter_friendly_name":"Bronze and Silver Tickets",
        "expression":"type == 'ticket' AND customer_value IN ['Silver', 'Bronze']",
        "targets":[
          {
            "queue":"WQbbb"
          }
        ]
      },
      {
        "filter_friendly_name":"Gold Tickets",
        "expression":"type == 'ticket' AND customer_value == 'Gold'",
        "targets":[
          {
            "queue":"WQbbb",
            "priority":"10",
            "timeout": 300
          },
          {
            "queue":"WQccc"
          }
        ]
      },
      {
        "filter_friendly_name":"Leads",
        "expression":"type == 'lead'",
        "targets":[
          {
            "queue":"WQaaa",
            "priority": 1
          }
        ]
      }
    ],
    "default_filter":{
      "queue":"WQccc"
    }
  }
}
```

> \[!NOTE]
>
> This workflow is more complex, but the rules of the `default_filter` stay consistent. If the Task matches any of the filter expressions, it will not go into the `default_filter`, even if it times out. Entering the `default_filter` specifically means that a Task doesn't match any of the defined filter expressions.

### Multiple Filter Example

In this example, we want to sort Tasks into two separate queues, based on an attribute that is being set on the Task. In this case, we expect each Task to have a "type" attribute. If that type is "lead", the Task is a sales lead and we want it to go to workers in the "Sales" TaskQueue with a priority of 10. If the type is "ticket", it's a support request. We want that Task to go to the "Support" TaskQueue with a priority of 10.

If for some reason, a Task is created with no type attribute or one that is not matching one of our filters, we have a "default\_filter" that places unmatched Tasks in the Everyone TaskQueue at the default priority of 0, meaning they will eventually get assigned to any available worker, but behind the properly sorted tickets.

```json
{
  "task_routing":{
    "filters": [
      {
        "filter_friendly_name": "Sales Lead Filter",
        "expression": "type=='lead'",
        "targets": [
          {
            "queue": "WQaaa",
            "priority": 10
          }
        ]
      },
      {
        "filter_friendly_name": "Support Ticket Filter",
        "expression": "type=='ticket'",
        "targets": [
          {
            "queue": "WQbbb",
            "priority": 10
          }
        ]
      }
    ],
    "default_filter": {
      "queue": "WQccc"
    }
  }
}
```

If a Task has the attributes `{"type": "ticket"}`, the first rule's expression will resolve to false, but the second rule's expression will match causing its target Task Queue to be used.

### Complex Routing Example \[#complex-routing-example-2]

In this example, we introduce a second attribute to some of our Tasks: the "customer\_value" attribute. When a support Task is specified, the Task can be tagged as a "gold", "silver", or "bronze" customer\_value. We have changed our expressions to be more complex, sorting not only on "type" but also on "customer\_value". If the customer is "gold", we want to prioritize these tickets above other tickets placed in the Support TaskQueue. We also don't want gold customers to wait on hold too long, so we specify that if they're waiting more than five minutes, then move the Task to the Everyone TaskQueue with a higher priority of 10. This means the gold Task will now be available to all workers, not just Support workers, and it will move in front of "lead" Tasks which only have a priority of 1.

```json
{
  "task_routing":{
    "filters":[
      {
        "filter_friendly_name":"Bronze and Silver Tickets",
        "expression":"type == 'ticket' AND customer_value IN ['Silver', 'Bronze']",
        "targets":[
          {
            "queue":"WQbbb"
          }
        ]
      },
      {
        "filter_friendly_name":"Gold Tickets",
        "expression":"type == 'ticket' AND customer_value == 'Gold'",
        "targets":[
          {
            "queue":"WQbbb",
            "priority":"10",
            "timeout": 300
          },
          {
            "queue":"WQccc"
          }
        ]
      },
      {
        "filter_friendly_name":"Leads",
        "expression":"type == 'lead'",
        "targets":[
          {
            "queue":"WQaaa",
            "priority": 1
          }
        ]
      }
    ],
    "default_filter":{
      "queue":"WQccc"
    }
  }
}
```

### More Complex Routing Example With Target Worker Expressions

In this example, we introduce target worker expressions, which are useful if you need to match a Task with workers that are only a subset of all workers within a queue. Our example below contains the "expression" field within one of the "targets". Unlike the TaskQueue and Filter expressions, these expressions can evaluate on properties of workers and Tasks. As a result, all attributes should be prefixed with "worker." or "task." in order to identify the appropriate attributes.

In this example, gold tickets are routed with a requested agent's name, represented by the "task.requested\_agent" property. To route the Task to a particular agent, we use a Target Worker Expression to evaluate the Task's attribute against a matching attribute on workers within our queue.

```json
{
  "task_routing":{
    "filters":[
      {
        "filter_friendly_name":"Bronze and Silver Tickets",
        "expression":"type == 'ticket' AND customer_value IN ['Silver', 'Bronze']",
        "targets":[
          {
            "queue":"WQbbb"
          }
        ]
      },
      {
        "filter_friendly_name":"Gold Tickets",
        "expression":"type == 'ticket' AND customer_value == 'Gold'",
        "targets":[
          {
            "queue":"WQbbb",
            "priority":"10",
            "timeout": 300,
            "expression":"task.requested_agent==worker.agent_id"
          },
          {
            "queue":"WQccc"
          }
        ]
      },
      {
        "filter_friendly_name":"Leads",
        "expression":"type == 'lead'",
        "targets":[
          {
            "queue":"WQaaa",
            "priority": 1
          }
        ]
      }
    ],
    "default_filter":{
      "queue":"WQccc"
    }
  }
}
```

Alternatively, we may want Tasks to match workers in the target TaskQueue who can speak the same language as a customer on an incoming Task. Using Target Worker Expressions we can use one queue for multiple conditions and still match the appropriate subset of workers.

```json
{
  "task_routing":{
    "filters":[
      {
        "filter_friendly_name":"Bronze and Silver Tickets",
        "expression":"type == 'ticket' AND customer_value IN ['Silver', 'Bronze']",
        "targets":[
          {
            "queue":"WQbbb"
          }
        ]
      },
      {
        "filter_friendly_name":"Gold Tickets",
        "expression":"type == 'ticket' AND customer_value == 'Gold'",
        "targets":[
          {
            "queue":"WQbbb",
            "priority":"10",
            "timeout": 300,
            "expression":"task.required_language IN worker.spoken_languages"
          },
          {
            "queue":"WQccc"
          }
        ]
      },
      {
        "filter_friendly_name":"Leads",
        "expression":"type == 'lead'",
        "targets":[
          {
            "queue":"WQaaa",
            "priority": 1
          }
        ]
      }
    ],
    "default_filter":{
      "queue":"WQccc"
    }
  }
}
```
