# Manage Flex UI users

## User roles

In Flex UI, users are represented as TaskRouter **workers**. A worker is created whenever a user logs in to Flex UI. Flex UI users can have one of the following roles:

* **Administrator**: Administrators have full access to all Flex UI pages, including Flex administration views and Flex UI features. Add a Flex UI Administrator in the [Twilio Console](/docs/flex/admin-guide/setup/console-users) or through [SSO](/docs/flex/admin-guide/setup/sso-configuration).
  Many Flex configuration and management controls are handled in the Twilio Console, such as billing, versioning, communication workflows, and routing. To change Flex configuration, add and assign the required role to the user in Console.
* **Read-only Administrator**: A [read-only admin](/docs/flex/admin-guide/setup/flex-ui-users/read-only-admin-role) can launch Flex from Twilio Console, view the configurations on the Admin dashboard (read-only), view real-time queue statistics, and view the list of agents on the Teams page. This role is only available to Support users who log in through Console.
* **Supervisor**: A supervisor monitors the interactions between agents and customers. They are responsible for managing their teams of agents and have access to the Agent Desktop, Teams, Queue Stats, and the Dialpad (if enabled).
* **Agent**: An agent handles interactions with customers in a contact center using the [Flex Agent Desktop](/docs/flex/admin-guide/core-concepts/flex-ui#agent-desktop). Agents are assigned tasks based on their capacity and activity (status). Agents have the lowest level of access in the Flex UI.

Administrators and developers created from Twilio Console also have access to Flex UI.

If you sign up for a paid Flex account, you get access to Flex Insights which lets you apply additional roles to users with `admin` and `supervisor` roles. For more details, see [Flex Insights User Roles](/docs/flex/admin-guide/setup/sso-configuration/insights-user-roles).

## View Flex UI users

From the Twilio Console, you can view your list of Flex users (workers) under **TaskRouter > "Flex Task Assignment" Workspace > View all Workers**.

![Workers list showing names, activity status, and availability.](https://docs-resources.prod.twilio.com/cb3a6f332c972f24dca41188f3236816a6f2d3d72012f8c0ed71070178e34fb4.png)

## Create Flex UI users

Flex UI users can be created via:

* **Twilio Console:**

  * Twilio Console users with the role of Owner, Administrator, or Developer can log in to Flex. When doing so, a respective worker with `admin` privileges is created for this user. The Support role can also log in to Flex from Console. When doing so, a `read-only administrator` role is automatically assigned to them.
  * Console is the preferred way to create Administrator workers for Flex. To manage Console users associated with your Flex account, see [Manage Twilio Console users](/docs/flex/admin-guide/setup/console-users).
* **SSO:**

  * Follow [the SSO integration guide](/docs/flex/admin-guide/setup/sso-configuration) to set up SSO login using your IdP. The attributes passed by your IdP when a user logs in determines the role for the created worker. Assign one of the Flex UI roles described above to each user using the SSO attributes.
  * This is the preferred way to create non-Administrator workers, such as Agents and Supervisors.
  * The Read-only Admin role is not assigned to users through SSO. Note that if you want your administrators to have access to Twilio Console, you should create them in Console and not via SSO.

## Delete Flex UI users

After a Flex Worker has been created, removing it requires two steps:

1. Remove the TaskRouter Worker from your [Flex workspace](https://www.twilio.com/console/taskrouter/workspaces).
2. To prevent it from being recreated, remove the user's access to Flex based on how their user account had been created:
   * If a user was created via the Twilio Console, [remove them from your Twilio Flex account](https://help.twilio.com/hc/en-us/articles/223135847-Adding-Removing-or-Modifying-Users-with-Your-Twilio-Project).
   * If a user was created via SSO, remove them from your SSO Identity Provider (IdP).
