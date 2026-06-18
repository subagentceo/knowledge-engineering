# Flex Insights User Roles

## User Provisioning and Role Assignment in Flex Insights via Okta

Teams can get even more self-service capabilities out of SSO Identity Providers (i.e., Okta) by leveraging them to provision user access to Flex Insights. Adding these capabilities involves defining Insights user roles for a given user.

> \[!NOTE]
>
> Flex Insights cannot be accessed by users with the `agent` role. In order to make the Flex Insights icon visible, either the `supervisor` or the `admin` role is required. You can [learn more about the Flex Roles in the SSO Configuration docs](/docs/flex/admin-guide/setup/sso-configuration).

Flex Insights roles only define the level of application permissions within Insights. You can combine Insights roles with other Flex user roles, and you can select multiple Flex Insights roles for a single user (e.g., `[supervisor, wfo.quality_manager, wfo.team_leader]`.)

> \[!WARNING]
>
> The default Insights role for these users is `wfo.full_access`.

Here's an example of how a user role of `wfo.team_leader` can be assigned to a user with the Flex role of `supervisor` in Okta.

* In Okta, navigate to **Directory > Profile Editor > Your App Name > Attributes**. Make sure you have been granted the following attributes, which are required for Flex Insights user provisioning: `email`, `full_name`, and `roles`.

  ![Attribute statements table with columns for name, format, and value.](https://docs-resources.prod.twilio.com/061e6c86205b7a5012ceb2f699c2d46df63b924ddb6244333ab280d93ffaa3bb.png)
* Navigate to **Applications > Your App Name > General > SAML Settings > Attributes Statements**. Ensure there is an attribute `roles` that inherits `appuser.roles` value:

  ![Form to add attribute with fields for data type, display name, variable name, and attribute length.](https://docs-resources.prod.twilio.com/5135d7d7d40d0bedd9a8dda276e3341eaab6fe38cb45c6cdd467e6dfe873a198.png)
* Navigate to **Applications > Select Your Application > Assignments > Assign > Assign to People > Select User > Insert user role** in the **Assign Applications** window:

  ![Assign Applications form with fields for User Name, WFO Team name, Avatar URL, WFO Phone, and Roles.](https://docs-resources.prod.twilio.com/e304caaef1453fe64ddf6d6dd7a77770220284f8f06d63e07ac8c77381c454d8.png)

Once a user is assigned their role in Okta, they should be able to access Insights via Flex.

The Flex Login URL is `https://flex.twilio.com/your-app-1234`, where `your-app-1234` is your Runtime Domain.

Once a user has logged into Flex and accessed Flex Insights, this will also be reflected in the **Worker attributes** area in the Twilio Console, i.e., **Task Router > Workspace > Worker > Properties > Worker Attributes**:

![User profile showing email john.doe@twilio.com, activity offline, and roles supervisor, team leader.](https://docs-resources.prod.twilio.com/b6cf45b7bb143aa856b0b678ec7b7cfdbac94a0e6f4facbf2d5fed5e57b52484.png)

In some cases, such as when you are managing big teams, it can be useful to define user group roles for Flex Insights:

![Edit Group Assignment form with fields for WFO Team name and Roles.](https://docs-resources.prod.twilio.com/8ddec2039c8bd7690d6ccbdfa33e5aff54e316236df6d9c1f4bd9d0bf6a86afc.png)

## Understanding Flex Insights Roles

User permissions are defined by their roles in Insights:

| **Role/Feature**              | **Play Calls** | **Export Calls** | **Assess Calls** | **Create/Edit Questionnaires** | **Analytical Dashboards** |
| ----------------------------- | -------------- | ---------------- | ---------------- | ------------------------------ | ------------------------- |
| `wfo.full_access`             | ✓              | ✓                | ✓                | ✓                              | Editor                    |
| `wfo.team_leader`             | ✓              |                  | ✓                |                                | Explorer                  |
| `wfo.data_analyst`            | ✓              | ✓                | ✓ View Only      |                                | Editor                    |
| `wfo.data_auditor`            | ✓              | ✓                |                  |                                | Editor                    |
| `wfo.quality_manager`         | ✓              | ✓                | ✓                |                                | Viewer                    |
| `wfo.quality_process_manager` |                |                  |                  | ✓                              |                           |
| `wfo.dashboard_viewer`        | ✓              |                  |                  |                                | Viewer                    |

### Analytical Dashboard Roles

#### Viewer

Viewers can view default dashboards and reports, and view custom dashboards created by users with editing privileges. They can consume existing insights but cannot create their own content.

Viewers can do the following in the Flex UI or the [Analytics portal](https://analytics.ytica.com/):

* Navigate through dashboards and tabs.
* Export and print dashboards\* and reports.
* View dashboards and all of their contents (reports, widgets, and embedded web content) through an external application.
* Hover over dashboard reports for additional information.
* Use predefined dashboard filters.
* Use predefined drill paths in dashboard reports.
* Drill-down from dashboards up to individual conversations.
* Create saved views\*.
* Schedule emails with dashboard PDF exports\*.
* Access KPI dashboards and add alerts to KPIs.

#### Explorer

Explorers can do everything that Viewers can, but they also gain access to the **Analyze** tab.

Explorers can do the following in the Flex UI or the [Analytics portal](https://analytics.ytica.com/):

* Edit existing KPI dashboards\* and create new KPI dashboards.
* Access the **Analyze** tab.
* Edit existing insights and create new insights in the **Analyze** tab.

#### Editor

Editor is a role that is intended for data analysts who manage metrics and create reports for other people in their company. Editors can do everything that Viewers and Explorers can, plus the following:

* Edit existing dashboards and create new dashboards\*.
* Edit existing reports and create new reports\*.
* View data model, data sets, and project elements (facts, attributes, metrics, and variables)\*.
* Edit project attributes (for example, add drill paths), edit project metrics, and create custom metrics by aggregating project facts\*.
* Schedule the sending of dashboards and reports to other users\*.

\* In the [Analytics portal](https://analytics.ytica.com/) only.
