# Teams in Flex (Public Beta)

> \[!IMPORTANT]
>
> Teams in Flex is currently available as a limited public beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by an SLA.

## Overview

With Teams in Flex, you can create a hierarchical structure that groups Flex users together for easier user management, reporting, and oversight. In Console, you can organize teams across three levels: teams, groups of teams, and a group hierarchy.

From the Teams page in Flex UI, Supervisors can quickly see which team their agents are on, view and interact with the agents on their teams, and filter their view by the teams they manage.

This document contains information about creating a team hierarchy in Console and outlines how supervisors can use the Teams page in Flex UI.

## About hierarchy, groups, and teams

Team hierarchy in Flex allows you to add teams to a **Group of teams** and then place those groups inside a broader **Hierarchy of groups**. This enables your organization to structure teams in a way that mirrors operations and provides greater visibility.

![There are three levels of hierarchy.](https://docs-resources.prod.twilio.com/ad4c68253fff3aa1c53807d84e461dfe350a1089f45eec82b57b629f79691bcc.png)

* **Hierarchy of groups**: For example, a business unit or top-level organization, such as regional divisions like North America or Asia-Pacific. Hierarchies can only contain groups. Only team owners can belong to hierarchies.
* **Group of teams**: For example, a department, such as Sales or Customer Success. Groups can only contain teams. Only team owners can belong to groups.
* **Team**: An immediate group of Flex users working together. Teams consist of members and owners.

## Positions and roles

### Team member

Team members are typically agents who report to the same supervisors and are grouped by a reporting structure. Supervisors and admins can also be members, but you can only be a member of one team at a time.

Initially, all Flex users are automatically members of a system-generated team called **Default**. Admins can assign members to any team, which removes them from their current team.

### Owner

Team owners are typically supervisors. As a team owner, you can view your team members, modify member skills and status, and join your team members' calls or conversations with call and chat monitoring. Owners can't see or manage members outside of their teams.

Hierarchy and group levels can only have team owners, and can't have members assigned to them directly.

#### Supervisor

Supervisors who aren't team owners can view all agents on the Flex UI Teams page. However, they can't update agent skills, availability, capacity (via plugin), or monitor call or chat transactions.

#### Admin

By default, admins have full visibility and access to all members and owners in the account.

### Team rules and limits

* Members can belong to one team at a time. This helps with reporting.
* Owners can be an owner of multiple teams.
* Owners can also be a member of a team.

Flex Teams have the following size limits:

* 500 members per team
* 500 owners per team
* 200 teams per account
* 100 groups per account
* 99 teams per group
* 25 hierarchy groups per account

#### Default team

The default team doesn't have a size limit. All Flex users are automatically a part of the default team. The default team is a system-generated team that you can't edit or delete.

### Prerequisites

* Flex UI 2.10.0 or above

## Create teams, groups, and hierarchies

### Step 1: Create a team

1. From Twilio Console, go to **Flex** > **Users and access** > **Teams**.
2. Click **Create**.
3. Enter a **Team name**.
4. Optionally, add a **Team description**. Descriptions can be helpful if your organization has multiple admins in an account, and you need to keep track of each team's intention.
5. Click **Create**. The **Edit** side panel opens for the team you just created.

### Step 2: Add users to a team and assign team positions

1. From the **Edit** side panel, go to **Add team members**.
2. To find a specific user, search by email address. You can filter by current team, if you need to find a user on a specific team.
3. Click **Add** to add a user as a member.
4. Under **Set owners**, search or filter for the users you want to make owners of the team.
5. Click **Add** to add users as owners of the team. If you need to remove an owner you just added, click **Add** again.
6. Click **Done**.

**Note**: The following steps 3-5 are optional and are only needed if you're setting up higher-level hierarchies. This is especially helpful in larger organizations where you need a clear structure to oversee multiple teams and groups efficiently.

### Step 3: Create a top-level hierarchy group (optional)

1. From the Console Team page, click **Create**.
2. Select the desired level of hierarchy above the team.
3. To start with the highest level, select **Hierarchy of groups**.
4. Enter a **Group name**.
5. Optionally, add a **Group description**.
6. Click **Create**.The **Edit** side panel opens for the group you just created.
7. Under **Set owners**, add owners to the hierarchy group.
8. Click **Done**.

You can see the top-level hierarchy group you created in the Teams list.

### Step 4: Create a group and add it to a hierarchy (optional)

1. From the Console Team page, click **Create**.
2. Select **Group of teams**.
3. Enter a **Group name** and add an optional **Group description**.
4. Click **Add to** and select a parent hierarchy to add the group to.
5. Click **Create**.
6. From **Set owners**, add owners.
7. Click **Done**.
8. Repeat the process as necessary to add your groups to their parent hierarchy group.

### Step 5: Add teams to a group (optional)

1. From the Console Team page, click **Ungrouped teams**.
2. Select **Actions** > **Edit team**.
3. Expand **Team details**.
4. Under **Add to**, select the parent group to add the team to.
5. Click **Done**.
6. Repeat the process as necessary to add your teams to their parent group.

## Configure user attributes for automated team assignment

You can use SAML attributes to manage which team a user joins as well as which teams supervisors can monitor. Automating team assignments in Flex grants users immediate access to their primary team's resources and functionalities when they log in. It also streamlines administrative workflows by reducing the manual effort typically required to manage team memberships and ownership.

To learn more about how to set up your Flex SSO integration to support SAML attribute mapping of teams, see [How to configure user SAML attributes for automated team assignment](/docs/flex/admin-guide/setup/sso-configuration#user-saml-attributes-for-automated-team-assignment-public-beta).

## Turn on Teams view (beta)

Once your teams are configured, turn on **Enable Teams view for Flex application users**.

If you don't turn on the Teams view (beta), you'll see the previous version of the Teams page in Flex UI, and any teams you created in Console won't show in Flex UI.

* You can switch back and forth between old and new views at any time by toggling.
* If you have already customized the Teams page in Flex UI to add filters or columns using plugins or UI programmability, you can still turn on the new view without affecting your customizations.
* Turning on the new view also turns on scoped permissions for the supervisor. If you turn off the view, permissions are revoked and supervisors can modify the skills and status of all agents.

## Teams page in Flex UI

On the Teams page, supervisors can filter by teams they are owners of. A **Teams** column is also available, so you can see which team an agent belongs to. The Teams page displays up to 200 agents.

![Teams page in Flex UI.](https://docs-resources.prod.twilio.com/7db9cc773f23297d89926374e2b0c01598722b950c4868c93d3947e9eab946cd.png)

If you change or update a team owner in Console, make sure the supervisor refreshes their Flex UI to reflect the updated teams on the Flex UI Teams page.

## Considerations

* Once you add a user to a team or move them to another team, the user needs to complete an activity in Flex UI for their name to appear on the Flex UI Teams page. For example, a user can update their availability status or process an incoming or outgoing request.
* If a supervisor doesn't own any teams, they can still see all users on the Flex UI Teams page, but they won't see a user's team in the **Teams** column. The supervisor won't be authorized to monitor agent calls or chats or update agents' activity status or skills.
* In Console, deleted workers continue to appear in assigned Teams.

## Scoped permissions for supervisors

When a supervisor uses the Flex UI or [Worker Update API](/docs/taskrouter/api/worker) to modify the skills or status of a worker, the backend permissions checks to see if the worker is a member of the supervisor's team. These permissions ensure that supervisors don't have access to all user data, and limits supervisors to modifying their team members.

Scoped permissions for supervisors are only enabled when the new Teams view is turned on for the account. Turning off the view reverts scoped permissions to allow supervisors to modify the skills and status of all agents.

Scoped permissions don't apply to Flex admins. Admins can update any worker.

## Related documentation

* [Monitor Agent Activity](/docs/flex/end-user-guide/real-time-reporting/monitor-agent-activity)
* [Advanced Team View Filters](/docs/flex/end-user-guide/team-view-filters)
* [Flex Teams API](/docs/flex/developer/user-management/flex-teams-api)
