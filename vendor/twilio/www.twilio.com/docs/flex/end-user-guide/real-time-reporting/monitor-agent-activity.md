# Monitor agent activity

> \[!IMPORTANT]
>
> Teams in Flex is currently available as a limited public beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by an SLA.

The Teams view provides a real-time view of contact center agents' activity. With this information, supervisors can monitor individual tasks for training and problem-solving in the contact center. This tool helps supervisors ensure that agents' interactions with customers meet quality standards.

## What can you do in Teams view?

* View details about each agent:
  * Activity status
  * Time spent on the status
  * Individual task information
  * Email
  * Assigned skills
  * Teams an agent belongs to
* Allow supervisors to monitor agents on their teams
* Filter by team
* Listen to live calls
* View live messaging conversations

The Teams view is visible for users with `supervisor` or `admin` role. It can display a maximum of 200 agents to supervisors and admins.

Teams view (beta) allows supervisors to only monitor agents on their teams. Admins can turn on the beta view from Console. To learn more about turning on this feature, see [Teams in Flex](/docs/flex/admin-guide/setup/teams#turn-on-teams-view-beta).

The supervisor can use the Teams View filter to filter agents by teams. The teams owned by the supervisor appear under the **Teams** tab in the Teams View filter. For more details, see [Advanced Team View Filters](/docs/flex/end-user-guide/team-view-filters).

### Considerations

* When configuring Teams view, make sure to set your [Teams view filters](/docs/flex/end-user-guide/team-view-filters) so that the list of agents is less than 200.
* The TaskQueue list may not include all TaskQueues if the TaskQueue hasn't been used for 30 days or more. Reset the expiration on your TaskQueue by routing an inbound task to the Queue. Each additional task and any transfers will reset the expiration time to 30 days.
* If an admin changes or updates a team owner in Console, make sure to refresh Flex UI to reflect the updated teams on Flex UI Teams page.
* Once you add a user to a team or move them to another team, the user needs to complete an activity in Flex UI for their name to appear on the Flex UI Teams page. For example, a user can update their availability status or process an incoming or outgoing request.
* If a supervisor doesn't own any teams, they can still see all users on the Teams page, but they won't see a user's team in the Team column. The supervisor won't be authorized to monitor agent calls or chats or update agents' activity status or skills.

> \[!WARNING]
>
> The Teams page uses the worker attribute `team_sid`. If you have any custom implementations in Flex, do not use the same `team_sid` worker attribute.

## Call monitoring

Call monitoring allows supervisors and admins to listen to any call in real-time. To listen to a live call:

1. Click the voice call task in the Agents list.
2. Click the Call Monitoring button. A persistent bar ([LiveCommsBar](https://assets.flex.twilio.com/docs/releases/flex-ui/2.6.1/programmable-components/components/LiveCommsBar/)) indicating active call monitoring appears, and audio from the call starts playing.

To stop call monitoring, click **Call Monitoring** again or use the Stop Monitoring action in the LiveCommsBar.

## Chat monitoring

Chat monitoring allows supervisors and admins to view messages in any active conversation. The conversations will update in real-time as your agents continue their chats.

To start monitoring a conversation, click the messaging task.

Supervisors are only able to view messages. Sending messages isn't active when monitoring a messaging task.

## Teams view programmability

The Teams view provides various ways for programmatic customization. The following customizations are only available for the **Filters** tab. Programmatic customizations aren't available for the **Teams** tab.

* [Customize WorkersDataTable by adding new columns](/docs/flex/developer/ui/v1/components#add-columns-to-workersdatatable)
* [Define custom filters](/docs/flex/developer/ui/v1/components#customizing-filters)
* [Add / Remove / Replace Teams View components](/docs/flex/developer/ui/work-with-components-and-props)
* [Tap into Teams View actions](/docs/flex/developer/ui/v1/actions)
