# Notifications

Notifications display brief information that is surfaced from the bottom right of VS Code.

![Example of a notification](/assets/api/ux-guidelines/examples/notification.png)

You can send three types of notifications:

*   Information
*   Warning
*   Error

It's important to limit the number of notifications sent in order to respect the user's attention. To help guide your decision on whether or not you should show a notification, please follow our notification decision tree:

![Show a multi-step quick pick if multi step user input is immediately needed. If user input is immediately needed but it is not multi-step show a modal dialog. If you need to show progress that is low priority show the progress in the status bar. If the interaction is triggered by the user find the right moment to show the notification and only then show it. If you need to show multiple notifications try to combine them into one. If the user does not really need to be notified consider to not show anything and relax.](/assets/api/ux-guidelines/examples/notification-decision-tree.png)

## Notification examples

![Information notification](/assets/api/ux-guidelines/examples/notification-info.png)

_This notification appears after the user runs an **Update version** command. Notice that there are no additional actions and is purely informational._

![Warning notification](/assets/api/ux-guidelines/examples/notification-warning.png)

_This example highlights an issue with a feature that requires user input and shows actions to resolve the issue._

![Error notification](/assets/api/ux-guidelines/examples/notification-error.png)

_This example shows a failure notification with an action to resolve the issue._

**✔️ Do**

*   Respect the user's attention by only sending notifications when absolutely necessary
*   Add a **Do not show again** option for every notification
*   Show one notification at a time

**❌ Don't**

*   Send repeated notifications
*   Use for promotion
*   Ask for feedback on the first install
*   Show actions if there aren't any

## Progress notification

When needing to display progress for an indeterminate timeframe (for example, setting up an environment), you can use the progress notification. This type of global progress notification should be used as a last resort as progress is best kept within context (within a view or editor).

**✔️ Do**

*   Show a link to see more details (like logs)
*   Show information as setup progresses (initializing, building, etc.)
*   Provide an action to cancel the operation (if applicable)
*   Add timers for timed out scenarios

**❌ Don't**

*   Leave a notification running in progress

![Progress notification](/assets/api/ux-guidelines/examples/notification-progress.png)

_This example uses the progress notification to show the setup involved for a remote connection, while also providing a link to the output logs (**details**)._

## Modal dialog

When you need immediate user input for an action, you can opt to show a modal dialog. This UI element should be used with caution because a modal dialog blocks user interactions outside the dialog, until it's dismissed.

![Modal dialog](/assets/api/ux-guidelines/examples/save-ai-generated-changes-dialog.png)

_This dialog appears after moving a JavaScript/TypeScript file, asking to update import statements in other files._

**✔️ Do**

*   Only use modal dialogs if you need immediate user interaction
*   Where appropriate, provide an action to avoid repeated user confirmation (_Always_/_Never_ action)
*   Consider using a checkbox to remember the user's choice

**❌ Don't**

*   Use modal dialogs to confirm multiple steps
*   Use modal dialogs for showing messages that don't require an action from the user
*   Show a modal dialog for actions that are not explicitly initiated by the user

## Links

*   Hello World extension sample
*   Notifications extension sample

7/1/2026