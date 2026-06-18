# Reporting

This section covers common reporting requirements for a contact center.

There are two types of common reporting interfaces:

* [Real time dashboards](/docs/taskrouter/contact-center-blueprint/dashboards): Primarily visual graphs
* Historical reports: Primarily text-based tables, as described in this document

Twilio has a set of partners who can provide out of the box dashboards end reports, or you can build these yourself using the data and tools Twilio makes available.

For each recommended graph or table, this document lists how you would derive this from the TaskRouter event stream, OR how you would get it from the TaskRouter statistics APIs. You would typically use one mechanism or the other, dependent on what technology you are using for building this.

The following reports are typically used by call center operational staff doing quality management and planning. In a small call center that may be the same person as the supervisor, but in larger call centers it is typically different people.

It is useful to be able to pull these reports on demand through a web interface, but many operational staff will want them emailed to multiple email addresses as a PDF (or formatted email) on a defined recurring schedule.

All these reports are typically tabular by default, unless otherwise specified.

In most cases these reports cover tasks of multiple channel types. It is beneficial to be able to either break out each report by both cumulative tasks and broken down by channel type (voice, sms, etc) - or to allow the viewer to specify which view they want.

## Agent Summary report

The Agent Summary report enables the user to view a summary of agent activity across standard key performance indicators. This report should be a table sorted by Agent

The report includes:

* Agent name (or number if no name)
* Queue name
* Min task handle time
* Mean task handle time
* Max task handle time
* Mean alerting time
* Total tasks offered
* Total tasks answered

| Agent name | Avg. Task handle time | Min. task handle time | Max Task handle time | Avg. idle time | Avg wrap up | Tasks offered | Tasks answered | Outbound tasks | Avg outbound time |
| ---------- | --------------------- | --------------------- | -------------------- | -------------- | ----------- | ------------- | -------------- | -------------- | ----------------- |
| Jane Doe   | 0:02:22               | 0:00:31               | 0:05:55              | 0:05:24        | 0:00:25     | 95            | 94             | 3              | 0:03:33           |
| John Doe   | 0:03:33               | 0:00:45               | 0:04:45              | 0:07:24        | 0:00:23     | 80            | 80             | 2              | 0:01:45           |

## Task Detail by Agent report

The Task Detail by Agent report displays call records for each agent. This report is generated in date and time order by line for the defined period.

The report includes:

* Task date
* Task time
* Task direction (Inbound, Outbound, Internal)
* From
* To
* Task duration
* Task Channel

For example, you'll see the following table for each agent:

| Date    | Time    | Direction | Channel | Source       | Destination         | Duration | Task Acceptance Time |
| ------- | ------- | --------- | ------- | ------------ | ------------------- | -------- | -------------------- |
| 4/23/13 | 8:01:00 | Inbound   | Voice   | 214-555-1212 | Sales Call Center   | 0:03:40  | 7                    |
| 4/23/13 | 8:05:00 | Inbound   | SMS     | 972-222-1551 | Returns Call Center | 0:02:11  | 5                    |
| 4/23/13 | 8:10:05 | Outbound  | Voice   | 817-214-5252 | 817-214-5200        | 0:03:22  | 3                    |
| 4/23/13 | 8:15:15 | Inbound   | Voice   | Unknown      | 817-214-5252        | 0:05:15  | 4                    |

## Task Duration report

The Task Duration report should display a summary of task duration for each task duration range for the defined period.

* For example, define a set of duration ranges along the following lines: \<1, 1-2, 2-5, 5-10, 10-20, 20-30, 30-60 and >60min
* For each range the following statistics should be calculated and displayed in the table:
  * total number of tasks
  * percentage of total tasks
  * total duration of tasks

## Task Log report

The Task Log reports should provide a chronological list of every task created in the system, and list what happened

The report displays the date task created, time task accepted, time task completed, agent (worker) handled, from, to, duration.

## Daily Traffic report

The Daily Traffic report displays a graph of Tasks to analyze busy times. This report is generated in order by date.

The report includes:

* Date
* Morning Task count
* Morning average Task duration
* Afternoon Task count
* Afternoon average Task duration
* Peak hour
* Peak hour Task count

## Hourly Usage report

The Hourly Usage report displays a distribution of tasks across hours of the day for the time period selected. This report displays the time (in hours) and the number of tasks for that hour. This report is generated in ascending order by time.

## Tasks by Day report

The Tasks by Day report enables the user to view the number of tasks that were handled and/or abandoned, by day. This report is grouped by Date.

## Tasks by Queue report

The Tasks by Queue report enables the user to view the number of tasks that were routed through each TaskQueue during the defined period of time. This report is sorted by queue.

## Agent Activity State Summary report

The Agent Activity State Summary report enables the user to view a summarization of the length of time and percentages that agents have spent in different activity states (offline, available, break, etc).

## Agent Status Detail report

The Agent Status Detail report enables the user to view a detailed listing of agent status by agent by date. Each time and status is detailed with the duration the agent spent with that status active. This report is grouped by agent.

## Task Abandoned report

This report is a summary of all tasks abandoned (`task.canceled`) for a given period (hourly, daily, weekly).

## Inbound Statistics report

This reports lists total number of tasks by ingress point into the contact center. It is most commonly used for voice channel, showing for each company number the total number of inbound calls per number.

## Short Task Summary by Agent report

This report lists all calls that were answered by an agent that was connected for less than five seconds. This report is sorted by agent and includes total short calls for a given period (Hourly, Daily, Weekly)

## Frequent Customer Summary report

The Frequent Customer Summary report enables the user to view a list of the top 50 customers (task originators) that have repeated tasks.

The purpose of this report is to identify customers with recurring issues or those who are overusing support.

## Reports not available from Twilio Data alone

### Task Disposition Code Summary report

* Twilio does not currently have a method to associate disposition codes to tasks, and so this should currently be done in a separate database
* This report lists a summary of all calls associated with each disposition code.
