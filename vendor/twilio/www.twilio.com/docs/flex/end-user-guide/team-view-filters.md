# Advanced Team view filters

> \[!IMPORTANT]
>
> Teams in Flex is currently available as a limited public beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by an SLA.

In a contact center, supervisors sometimes need to focus on a specific agent or a subset of agents. With Team view filters, you can define filtering and search logic in order to view targeted, customized segments of your contact center workforce.

Team view filters gives you the ability to:

* Search for any agent by their full name or friendly name
* Filter agents by their activity state
* Filter by team
* Add custom filters programmatically

## Access Team view filters

1. Click the glasses icon, or the Supervisor Dashboard.
2. Click the filter icon in the top right corner of the Supervisor dashboard.

> \[!NOTE]
>
> If more than 200 agents match a search criteria, you will see 200 matches along with a message that you've reached the search limit. Refine your search or filter criteria to narrow down your results.
>
> Additionally, filters are disabled if there is a search criteria specified. Clear search criteria to start filtering.

## Search for an agent

1. Type in the agent's name (or part of their name) in the search box in the top left corner of the Supervisor dashboard
2. Click search or hit Enter

Searching for an agent disables all previously applied filters and your search is performed on all the agents in your contact center.

## Clear search

Click **Clear search result** or remove your search criteria to perform an empty search. If you had any filters applied before searching, clearing the filters will restore those filters as well.

## Use filters

Out of the box, you can filter by agents' activity state from the **Filters** tab and by team from the **Teams** tab. You can [create custom filters programmatically](/docs/flex/developer/ui/team-view-filters) to filter on any agent property that's meaningful to you.

If you have a specified search criteria, filters aren't active. Clear your search to start filtering.

### Use the Filters tab

From the **Filters** tab, you can filter agents by their activity state: offline, available, unavailable, and break.

To filter by an activity state, choose one or several activity states and click **Apply**. For example, select **Available** to view a list of all agents who are online and able to accept a task. Note that **Apply** includes the selections in both the **Filters** tab and **Teams** tab.

![Filters tab on Teams page.](https://docs-resources.prod.twilio.com/a809bb574943877c8d13ff286edf014a3336c2d18bb8709dd70ecdb60000c787.png)

### Use the Teams tab

To filter by team, open the **Teams** tab and click **Apply**. You can filter up to 3 teams. Note that **Apply** includes the selections in both the Filters tab and Teams tab.

Currently, if a supervisor doesn't own any teams, the supervisor can see up to 200 agents across the Flex account but can't monitor agents or update agent status or skills.

![Filter how you see agents on the Teams page.](https://docs-resources.prod.twilio.com/0db8bfe1639fb9999510e62c60619260995164a78a4950ecc35b4571e11c9b89.png)

## Remove filters

To clear your filters, click **Remove filters**. This only removes filters for the specific tab you're on.

If you select **Remove filters** on the Teams tab, supervisors can see up to 200 agents across all teams that they own, depending on the filter settings in the Filters tab.
