# Studio Troubleshooting

If you encounter issues with your Flow, Studio provides logs with step-by-step summaries of ongoing or past [Executions](/docs/studio/rest-api/v2/execution). It also provides a revision history that you can use to undo changes made to a Flow. This guide explains how to use these tools to troubleshoot problems in your Flow and quickly find the source of an issue.

## Logs

For every execution of a Flow, Studio creates a log that tracks the widgets that run during the execution. Logs provide all the information necessary to reveal the problems that occurred during a Flow's Execution.

To view the logs, go to the **Logs** tab of the Studio Flows canvas. If you're using the **classic** canvas, you can find the logs in the Flow management menu.

All Executions that run on the Flow are listed in the logs. You can filter Executions based on if they are active or fall within a specific time range. Click **X** to clear any toggled filters.

Executions are described based on the following four characteristics that you can use to identify the Execution that encountered a problem:

* The contact address of the user that initiated the Execution
* The trigger type that caused the Execution
* The date the Execution started
* The date the Execution was last modified

Click the Execution SID link under the Contact column to select and display a summary of the entire Execution. This includes identification information, the current Execution status, and a breakdown of all widgets that have been run.

Each Step or widget that was run is listed in chronological order by the time it was run. There are six attributes that describe a Step:

* **Date** — the date the Step was run
* **Widget Name** — the widget's name in the Flow
* **Widget Class** — the type of widget that was run
* **Event** — the result of running the widget
* **Source Flow** — the Flow that executed the Step
* **Transitioned To** — the widget that was run next

You can reveal details about the Step such as failure information by selecting the right-arrow button under the Date column. **Debugging Information** displays details on errors that were encountered and decisions that were made based on conditions within the Studio Flow upon execution. This includes error codes encountered when running [Make HTTP Request](/docs/studio/widget-library/http-request) and [Run Function](/docs/studio/widget-library/run-function) widgets. It also includes values being compared for the [Split Based On… widget](/docs/studio/widget-library/split-based-on).

**Widget & Flow Properties** shows the JSON representation of the Flow's attributes along with all widget information stored for that Execution. Each widget that was run will have its details stored inside of the JSON object. This is where all input — including variables — will be found and should be used for more fine-grained troubleshooting if the debugging information does not contain sufficient details.

If you would like to view all Flow data rather than details at a specific Step, select the **Flow Data** option.

The full JSON representation of the Flow up to the current point will be displayed, allowing you to analyze all widgets and the information they have stored.

The log for the Execution reveals all problems the Flow encountered when running and should be used frequently when troubleshooting issues.

## Revisions

Modifications to a Flow may cause problems that were not present in a past version of the Flow that you published. While the logs for each Flow Execution provide all details about issues encountered, using the Revisions tool allows you to troubleshoot more quickly by stepping through previous changes and finding a widget modification or addition that caused the issue.

Revisions are all versions of a Flow that have existed in the past. Each change that has been made to a Flow — from widget additions and deletions to moving a widget on the canvas — will count as another revision that can be reverted to. When building a Flow and encountering issues, you may revert to previous revisions to quickly determine which Flow modification caused an issue.

To view all versions of a Flow, use the Flow management menu located to the left of the Studio canvas and select **Revision History**.

All revisions for the Flow will be listed — identified by the numeric representation, the change made that created the revision, the date the revision was created, and the user who caused the revision to be created.

To revert to a specific revision, select the **Revert to this Revision** button. Additionally, a revision can be previewed without reverting to it by selecting the numeric representation of the revision found under the Revision column.

Learn about [Studio limits](/docs/studio/user-guide/studio-faq) and [common problems when using Studio](https://help.twilio.com/hc/en-us/articles/115016032048-Troubleshooting-Issues-with-Twilio-Studio).
