# Conversation Segment Kinds

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

While a `Segment` represents granular data and is primarily associated with customer conversations, we also use segments to represent other call center events and activities. You can distinguish between these using the attribute `Kind` in your Insights reporting.

Using `Kind`, you can filter the segments to analyze the following:

| **Kind**                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent Status                   | A segment that represents an agent's activity state in a given time period. These segments are not related to conversations.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Agent Status in Progress       | A segment that represents an agent's activity state that is in progress. More precisely the agent status in which the agent was at the time of the last load of data into Historical Reporting. Kind of segments in progress change to Agent Status value once the agent transitions to another activity and new data load happens after that.                                                                                                                                                                                                                               |
| Conversation                   | A segment representing a portion of a conversation between a customer and an agent. A conversation can consist of several segments of this kind.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Conversation in Progress       | A segment representing a portion of a conversation between a customer and an agent that is in progress. More precisely an agent was in talk phase or wrap up phase at the time of the last load of data into Historical Reporting. Kind of segments in progress change to Conversation value once the agent completes the wrap up phase and new data load happens after that.                                                                                                                                                                                                |
| Missed Conversation            | A segment representing an unsuccessful attempt to connect a customer to an agent that ended because of a routing timeout (i.e., the agent didn't pick up the phone within an expected time interval), task cancellation or caller hang-up (abandoned). On the TaskRouter level, this is a reservation that an agent missed due to a timeout or because the reservation was canceled before the agent accepted it. There may be multiple missed conversation segments for a single conversation, as each agent who missed a reservation is represented by a separate segment. |
| Queue                          | A segment representing a customer or agent waiting in a queue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Rejected Conversation          | A segment representing a reservation that was explicitly rejected by an agent or agent went offline while the reservation was offered. There may be multiple rejected conversation segments for a single conversation, as each agent who rejected a reservation is represented by a separate segment.                                                                                                                                                                                                                                                                        |
| Corrupted Conversation Segment | A segment representing a portion of a conversation between a customer and an agent. Flex Insights was unable to determine all the metrics because some events related to the conversation are missing. These segments might appear in case there is an incident or unexpected behavior in Flex. Flex Insights provides visibility into these segments for transparency.                                                                                                                                                                                                      |

Below you can find more details about each kind of segment, what to use them for, and with which metrics and attributes.

> \[!WARNING]
>
> Programmatically modifying the value of Kind in a conversation segment may cause Flex not to be able to play back the segment. Use a custom conversation attribute instead, as described in [Enhance your Conversation Data](/docs/flex/developer/insights/enhance-integration#enhance-your-conversation-data).

## Agent Status

Segments of this kind can be used to count and measure the time agents spent in the various defined activities.

An `Agent Status` segment is virtual - there is no Task associated with it because we're creating artificial segments to allow you to mix activity-based metrics with conversation-based ones. At the same time, it's important to remember that agent status activities are not tied to agent phone activities (unless you explicitly set it in your implementation). This means an agent status can be "Available" while they are on the call.

We gather activity values from `WorkerActivityUpdate` events. Agent status segments in Flex Insights do not overlap - rather, the end of one status indicates the beginning of the next.

Here's the list of built-in metrics and attributes you can use to build custom reports for agent activity analysis:

### Activity Time

The time (in seconds) that an agent spent on this activity.

```bash
SELECT Activity Time WHERE Kind = Agent Status
```

### Time in Seconds

The activity start time expressed in seconds.

```bash
SELECT Time in Seconds
```

### Activity Attributes

You can segment activity-based metrics by the following attributes: `Activity`, `Agent`, `Date`, `Time`, and `Segment.` Make sure you also include the `Kind` attribute filtered for the value "Agent Status".

A sample activity report:

| **Segment** | **Date**   | **Time** | **Agent**   | **Activity**  | **Activity Time** |
| ----------- | ---------- | -------- | ----------- | ------------- | ----------------- |
| 1           | 05/09/2019 | 0:19     | Danny Richt | Planned Break | 0:15:55           |
| 2           | 05/09/2019 | 0:35     | Danny Richt | Busy          | 1:32              |
| 3           | 05/09/2019 | 0:36     | Danny Richt | Available     | 2h 33:34          |
| 4           | 05/09/2019 | 3:10     | Danny Richt | Lunch         | 9:12              |
| 5           | 05/09/2019 | 4:07     | Danny Richt | Available     | 1h 29:21          |

## Agent Status in Progress

Agent Status in Progress is a segment that represents an activity agent was in during the last load of data into Flex Insights Historical Reporting. Agent Status in progress give more insight into what agent was doing recently and enable better reporting on intraday agent adherence. When an agent switches their agent status and new data are loaded into Flex Insights Historical Reporting the Kind attribute is set to Agent Status and Activity Time is set.

Agent Status in Progress segments are not shown in any reports by default. Built-in reports filter their content by Kind attribute which exclude Agent Status in Progress. You can build custom reports that contain both finished activities together with activities in progress. Or you can build reports dedicated to activities in progress.

Agent Status in Progress segments do not have Activity Time set to any value. Empty Activity Time will influence also metrics that depend on it. The exact behavior depends on definition of the metrics.

## Conversation

Conversation segments are the segments you'll use most often for analyzing conversations.

These segments contain a number of metrics, as they are populated from Task attributes in TaskRouter. Here are the basic ones:

### Queue Time

The amount of time a customer spent in a queue before this segment.

```bash
SELECT Queue Time
```

### Ring Time

The time (in seconds) that a customer or an agent spent hearing ringtones before reaching the other party.

```bash
SELECT Ring Time 
```

### Talk Time

The time a customer spent speaking with an agent. This includes all periods of silence and can be thought of as the time between answering the phone and hanging up.

```bash
SELECT Talk Time 
```

### Wrap Up Time

The time an agent spent wrapping up work following a conversation with a customer.

```bash
SELECT Wrap Up Time
```

### Time in Seconds \[#time-in-seconds-2]

The segment start time expressed in seconds.

```bash
SELECT Time in Seconds
```

### Conversation Attributes

You can segment conversation metrics by many attributes. Some of the most frequently used are: `Queue`, `Agent`, `Customer`, `Date`, `Time`, `Segment` and `Conversation`.

Make sure you also include the `Kind` attribute filtered for the value "Conversation".

| **Conversation** | **Segment** | **Queue** | **Date**   | **Time in Seconds** | **Agent**    | **Queue Time** | **Ring Time** | **Talk Time** | **Wrap Up Time** |
| ---------------- | ----------- | --------- | ---------- | ------------------- | ------------ | -------------- | ------------- | ------------- | ---------------- |
| 1                | 1           | Level 1   | 05/10/2019 | 6h 42:15            | John Doe     | 00:08          | 00:07         | 00:34         | 00:57            |
| 1                | 2           | Level 2   | 05/10/2019 | 6h 42:59            | Alba Perez   | 00:09          | 00:09         | 02:40         | 08:00            |
| 1                | 3           | Level 3   | 05/10/2019 | 6h 45:45            | Dwayne Right | 00:07          | 00:06         | 02:51         | 12:27            |

## Conversation in Progress

Conversation in Progress is segment that represents a segment on which an agent started working (accepted their reservation) but has not finished it (including wrap up) before the last load into Flex Insights Historical Reporting. Conversations in progress give more insight into longer conversations that are currently in progress. After an agent completes the segment and new data is loaded into Flex Insights Historical Reporting the Kind attribute is set to Conversation and all expected attributes and metrics become available.

Conversations in Progress are not shown in any reports by default. Built-in reports filter their content by Kind attribute which exclude Conversation in Progress. You can build custom reports that contain both finished Conversation segments together with Conversation in Progress segments. Or you can build reports dedicated to Conversation in Progress. In a multitasking environment there might be multiple conversations in progress for a single agent.

Conversations in Progress segments do not have Talk Time and Wrap Up Time metrics set to any value. Empty Talk Time and Wrap Up Time will also influence metrics that depend on them. The exact behavior depends on the definition of the metrics.

## Missed Conversation

Missed Conversation segments are typically analyzed on the agent level to track individual performance.

If agents are expected to answer calls within a specified time limit, it can be useful to monitor agent performance using these records.

### Missed Segments

The distinct count of missed segments by an agent.

```bash
SELECT COUNT(Segment) WHERE Kind = Missed Conversation
```

### Ring Time \[#ring-time-2]

The time in seconds an agent spent hearing a ringtone before the call timed out.

```bash
SELECT Ring Time
```

### Missed Conversation Attributes

You can segment metrics related to missed conversations by the following attributes: `Agent`, `Queue`, `Date`, `Time` and `Segment`.

Make sure you also include the `Kind` attribute filtered for the value "Missed Conversation".

| **Segment** | **Kind**            | **Agent** | **Queue** | **Date**   | **Time** | **Missed Segments** | **Ring Time** |
| ----------- | ------------------- | --------- | --------- | ---------- | -------- | ------------------- | ------------- |
| 1           | Missed Conversation | John Doe  | Support   | 04/03/2019 | 11:56    | 1                   | 20            |
| 2           | Missed Conversation | John Doe  | Support   | 03/28/2019 | 12:34    | 1                   | 20            |
| 3           | Missed Conversation | John Doe  | Support   | 04/02/2019 | 14:48    | 1                   | 20            |
| 4           | Missed Conversation | John Doe  | Support   | 04/02/2019 | 14:49    | 1                   | 20            |

## Queue

Queue segments show the portion of the call when a customer entered a queue and any time spent waiting in the queue before being connected with an agent.

For each queue entered by the customer, a new Queue segment is created in Flex Insights. This can come in especially handy when your customer flows from one queue to another before connecting with an agent.

Using Queue segments is also convenient if you'd like to analyze the volume of calls from the timestamp when a call entered the queue, rather than when it was answered.

The following metrics are relevant for Queue segments:

### Queue Time \[#queue-time-2]

The time a customer spent in a given queue.

```bash
SELECT Queue Time
```

### Time in Seconds \[#time-in-seconds-3]

The segment start time expressed in seconds.

```bash
SELECT Time in Seconds
```

### Queue Attributes

You can segment queue metrics by the following attributes: `Queue`, `Date`, `Time`, `Segment` and `Conversation`.

Make sure you also include the `Kind` attribute filtered for the value "Queue".

| **Conversation** | **Segment** | **Kind** | **Queue** | **Date**   | **Queue Time** | **Time in Seconds** |
| ---------------- | ----------- | -------- | --------- | ---------- | -------------- | ------------------- |
| 1234             | 1           | Queue    | Level 1   | 05/10/2019 | 00:07          | 6h 42:08            |
| 1234             | 2           | Queue    | Level 2   | 05/10/2019 | 03:31          | 6h 42:50            |
| 1234             | 3           | Queue    | Level 3   | 05/10/2019 | 00:09          | 6h 45:39            |

## Rejected Conversation

Rejected Conversation segments are typically analyzed on the agent level to track individual performance.

Because agents are not expected to reject calls, it can be useful to monitor agent performance using these records.

### Rejected Segments

The distinct count of segments rejected by an agent.

```bash
SELECT COUNT(Segment) WHERE Kind = Rejected Conversation
```

### Ring Time \[#ring-time-3]

The time in seconds the agents spent hearing a ring tone before rejecting the call.

```bash
SELECT Ring Time
```

### Rejected Conversation Attributes

You can segment metrics related to rejected calls by the following attributes: `Agent`, `Date`, `Time` and `Segment.`

Make sure you also include the `Kind` attribute filtered for the value "Rejected Conversation".

| **Segment** | **Kind**              | **Agent** | **Queue** | **Date**   | **Time** | **Rejected Segments** | **Ring Time** |
| ----------- | --------------------- | --------- | --------- | ---------- | -------- | --------------------- | ------------- |
| 1           | Rejected Conversation | John Doe  | Support   | 04/03/2019 | 13:06    | 1                     | 2             |
| 2           | Rejected Conversation | John Doe  | Support   | 03/28/2019 | 15:02    | 1                     | 4             |

## Task Lifecycle of a single Conversation

Flex Insights provides data on important events that happen within the life of each Task.

By breaking a conversation into segments of different kinds, you can present the path of a customer contact.

| **Segment** | **Kind**            | **Queue** | **Agent**  | **Abandoned** | **Time in Seconds** | **Ring Time** | **Talk Time** | **Queue Time** |
| ----------- | ------------------- | --------- | ---------- | ------------- | ------------------- | ------------- | ------------- | -------------- |
| 1           | Queue               | Level 1   |            | No            | 7h 21:33            |               |               | 01:12          |
| 2           | Conversation        | Level 1   | John Doe   | No            | 7h 22:44            | 00:04         | 02:17         | 01:12          |
| 3           | Queue               | Level 2   |            | Yes           | 7h 25:01            |               |               | 00:03          |
| 4           | Missed Conversation | Level 2   | Alba Perez |               | 7h 25:02            | 00:02         | 00:00         |                |
| 5           | Conversation        | Level 2   |            | Yes           | 7h 25:04            |               |               | 00:03          |

Here's how you can read this type of Flex Insights report:

07:21:33 - Customer entered the "Level 1" queue and waited for 1:12 (72 seconds).

07:22:44 - Customer connected with an agent, John Doe, from the Level 1 queue. They talked for 02:17 (137 seconds) and then the customer was transferred to the "Level 2" queue.

07:25:01 - Customer entered the "Level 2" queue.

07:25:02 - Agent Alba Perez' phone rang for 2 seconds without a connection to the customer.

07:25:04 - Customer abandoned the call after 3 seconds of waiting in the "Level 2" queue.

## Corrupted Conversation Segment

Corrupted Conversation Segment represents a portion of a conversation between a customer and an agent. Flex Insights was unable to determine all the metrics because some events related to the conversation are missing. These segments might appear in case there is an incident or unexpected behavior in Flex. Flex Insights provides visibility into these segments for transparency.

These segments are not reported by default. As Flex Insights could not confidently calculate some of the key metrics including them in reports could lead to skewing aggregate metrics. You can build custom reports focused on these segments.
