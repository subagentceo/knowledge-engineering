# Queue Ordering

## LIFO vs. FIFO

A TaskQueue's **default** ordering is **FIFO - First In, First Out**. This is best used for most scenarios common within a Contact Center, such as handling incoming voice calls, emails, etc.

**LIFO - Last In, First Out** - is the **alternative** ordering option for TaskQueues; it is useful where routing most recent tasks first is required. Unlike FIFO ordering, LIFO ordering does not consider the Task priority when ordering Tasks.

For example, a real estate company may generate leads on their website and have agents call back those leads. A lead is hottest at the moment it's created, and 'cools down' quickly, equating to an increasingly lower chance to convert that lead. It is therefore highly desirable to connect the first free agent to the hottest (newest) lead in the system, since that has the highest likelihood of conversion. To do this you should use the LIFO routing setting, rather than using ever-increasing priorities on top of a FIFO queue.

LIFO is a TaskQueue level setting, enabled by passing `TaskOrder=LIFO` while creating a TaskQueue or updating an existing TaskQueue. If no `TaskOrder` is passed, the setting defaults to FIFO. If your Workspace has Workers shared between LIFO and FIFO TaskQueues, then you can use a workspace level setting `PrioritizeQueueOrder` to decide whether to prioritize LIFO or FIFO. Simply pass `PrioritizeQueueOrder=LIFO` or `PrioritizeQueueOrder=FIFO` while creating a new workspace or updating an existing workspace.

Let's imagine the Tasks from the following FIFO and LIFO TaskQueues are routed to same group of agents, then let's examine how the `PrioritizeQueueOrder` setting works. We'll represent tasks as the task furthest on the right is the next to be assigned to the agent.

In a FIFO Queue, if you have 5 tasks from F1 as the oldest to F5 as the newest, they will be routed:

`Inbound Tasks -> F5, F4, F3, F2, F1 -> Agent`

In a LIFO Queue, if you have 5 tasks from L1 as the oldest to L5 as the newest, they will be routed:

`Inbound Tasks -> L1, L2, L3, L4, L5 -> Agent`

If your Agent is part of both TaskQueues, then the preference by which they consume tasks from a FIFO Queue vs a LIFO Queue depends on the PrioritizeQueueOrder setting. For example, if we combine the two examples above, and set `PrioritizeQueueOrder` to `FIFO` then the Tasks are routed in the following order,

`Inbound Tasks -> L1, L2, L3, L4, L5, F5, F4, F3, F2, F1 -> Agent`

Compared to if `PrioritizeQueueOrder` is set to `LIFO`

`Inbound Tasks -> F5, F4, F3, F2, F1, L1, L2, L3, L4, L5 -> Agent`

There are many possible use cases that can be satisfied using LIFO, or combining LIFO and FIFO Queues. If you find you need additional functionality on top of LIFO and FIFO, we want to hear from you. Please [contact support](https://www.twilio.com/help/contact) and tell us about it.

## Adjust task sorting with virtual start time

Whether you choose FIFO or LIFO, the system-generated task creation date is used by default to help calculate the order in which tasks are sorted. When two tasks have identical priority values, the task creation date is used as a tiebreaker to determine which to list first.

For example, imagine the following set of tasks, all created on the same day:

| **Task name** | **Priority** | **Task creation date**   |
| ------------- | ------------ | ------------------------ |
| Task A        | 50           | 10:00am October 10, 2023 |
| Task B        | 75           | 10:01am October 10, 2023 |
| Task C        | 20           | 10:03am October 10, 2023 |
| Task D        | 50           | 10:03am October 10, 2023 |

By default, Flex sorts these tasks as follows:

1. Task B: Highest priority
2. Task A: Tied with Task D on priority, but with an earlier creation time
3. Task D
4. Task C: Lowest priority

In some scenarios, the task creation date doesn't reflect the actual date and time that the customer interaction originally began:

* A task times out and a new task is created with the same priority.
* A customer begins a conversation in one channel and switches to a different channel, such as when a customer opens a chat conversation and then switches to a voice call.

In these scenarios, the new task is sorted based on its creation date, without taking into account the date and time that the original task was created.

To continue the example above, imagine that Task D was created because an earlier task, Task Z, timed out. Task Z was created at 9:00am. However, because Task Z's creation date doesn't carry over to Task D, Task D is still sorted below Task A because Task A has an earlier creation date.

Optionally, you can specify a "virtual start time" that's used in place of the system-generated task creation date to determine where the task is sorted in the list. The virtual start time is a time and date field that you set. If you don't enter a virtual start time for a task, the virtual start time defaults to the task creation time.

Let's add virtual start time to the example:

| **Task name** | **Priority** | **Task creation date**   | **Virtual start time**   |
| ------------- | ------------ | ------------------------ | ------------------------ |
| Task A        | 50           | 10:00am October 10, 2023 | 10:00am October 10, 2023 |
| Task B        | 75           | 10:01am October 10, 2023 | 9:30am October 10, 2023  |
| Task C        | 20           | 10:03am October 10, 2023 | 10:03am October 10, 2023 |
| Task D        | 50           | 10:03am October 10, 2023 | 9:00am October 10, 2023  |

With virtual start time taken into account, Flex sorts these tasks differently:

1. Task B: Highest priority
2. Task D: Tied with Task A on priority, but with an earlier virtual start time
3. Task A
4. Task C: Lowest priority

Right now, virtual start time is available only in the API. For more information, see `virtualStartTime` on the [Task Resource](/docs/taskrouter/api/task) page.

## Queue ordering vs agent ordering

Queue ordering is about ordering of tasks waiting within a given queue. That ordering can be FIFO or LIFO. FIFO task queues are additionally sorted by `task.priority`.

Once a task gets to the front of a queue, then the ordering of which worker is selected to handle the task is a separate concept - the [order\_by expression](/docs/taskrouter/order-workers).
