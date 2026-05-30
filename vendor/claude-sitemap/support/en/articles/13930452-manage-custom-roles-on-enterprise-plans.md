Custom roles are available for Enterprise plan organizations. Owners and Primary Owners can manage custom roles in **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

## What are custom roles?

Custom roles let you define which features your members can access. Each custom role contains a set of permissions that grant or restrict access to specific capabilities like chat, Claude Cowork, Claude Code, and web search, plus the connectors your organization has added, such as Slack or Google Drive.

Custom roles work alongside groups. The typical workflow is: create custom roles, assign them to groups, and then set members' roles to “Custom roles” so their access is governed entirely by the custom roles assigned to their groups.

**Note:** Custom roles only affect members whose role is set to “Custom roles.” Members with the User, Admin, or Owner roles get their permissions from those roles directly, not from custom roles.

---

## How feature access works

Feature access is determined by a four-level precedence chain, where the most restrictive level wins:

1. **Platform-level overrides**: Some features may be force-enabled or force-disabled for your organization by Anthropic as part of your contract. These can't be changed in organization settings.

2. **Organization-level setting**: An Owner or Primary Owner can toggle a feature on or off for the entire organization. If a feature is disabled at the organization level, no custom role can grant access to it.

3. **Custom role permissions**: If the feature is enabled at the organization level, the member's custom roles determine whether they can access it. If any of the member's custom roles grant the feature, they have it.

4. **User-level setting**: If the feature is granted at the role level, it's available unless the member has disabled it in their own settings.

The key takeaway: the organization-level toggle is a main switch. Custom roles are the per-member switches underneath it. A feature must be enabled at the organization level before custom roles can control who gets access.

---

## Available capabilities

Each custom role can grant or restrict access to the following capabilities:

| **Capability**                          | **Description**                                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Chat                                    | Access to chat on web, desktop, and mobile apps.                                                                      |
| Code execution and file creation        | Ability to run code and create files in conversations.                                                                |
| Memory                                  | Ability to use memory across conversations.                                                                           |
| Web search                              | Ability to use web search in conversations.                                                                           |
| Public projects                         | Ability to share projects with everyone in your organization.                                                         |
| Create skills                           | Ability to create or upload custom skills.                                                                            |
| Share skills with team members          | Ability to share skills with specific people in your organization.                                                    |
| Share skills with the full organization | Ability to share skills with everyone in your organization at once.                                                   |
| Claude Code                             | Access to Claude Code.                                                                                                |
| Fast mode                               | Access to faster model options for Claude Code.                                                                       |
| Claude Security                         | Find and fix security vulnerabilities in your code with Claude.                                                       |
| Claude Design                           | Access to Claude Design to generate design artifacts.                                                                 |
| Claude Cowork                           | Access to Claude Cowork.                                                                                              |
| Claude for Chrome                       | Access to Claude for Chrome, the browser extension that lets Claude browse and act on web pages on the user's behalf. |

**Note:** Chat is enabled by default for all custom roles, including ones created before this capability was added. If you want to restrict chat for a specific role, toggle it off when editing the role.

Custom roles also govern access to connectors, which are configured on a separate **Connectors** tab in the role editor. See **[Connector permissions](#h_979e558d00)** below.

---

## Create a custom role

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click “+ Add role.”

3. Enter a name for the role (for example, “Developer,” “Standard Access,” or “Restricted”).

4. Select the groups you want to assign to the role.

5. Toggle each capability on or off to define what this role grants.

6. Click “Next: Configure connectors.”

7. Configure connectors. You can choose Always allowed, Ask, and Blocked for all connectors, or customize per connector or connector tool.

8. Click “Add role.”

## Edit a custom role

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click the role you want to edit.

3. Update the name and groups, or toggle capabilities as needed.

4. Click “Edit role” to save your changes.

Changes take effect within one minute. All members in groups assigned to this role are affected.

## Delete a custom role

Click the menu button on any custom role and select “Delete role.” Deleting a role removes its permissions from all groups it was assigned to. Members in those groups lose the permissions the role granted, unless another role in their chain also grants them.

---

## Assign groups to custom roles

Custom roles are assigned to groups, not directly to individual members. To assign a group to a role:

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click the role you want to assign.

3. In the groups selector, select one or more groups.

4. Click "Save."

You can also assign custom roles when creating or editing a group in **[Organization settings > Groups](http://claude.ai/admin-settings/groups)**. See **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.

---

## How permissions combine across multiple roles

If a member belongs to multiple groups with different custom roles, their permissions are **additive**—they get the union of all permissions from all roles in their chain. If any role grants a feature, the member has access to it.

This means you can't use one role to remove a permission granted by another role. This is by design — it enables a layered approach where a base role covers common features and additional roles layer on specific capabilities.

**Example:** A member is in two groups. The "All Users" group is assigned a "Standard Access" role with web search and memory. The "Engineering" group is assigned a "Developer" role with Cowork and Claude Code. The member gets all four: web search, memory, Cowork, and Claude Code.

---

## Connector permissions

Custom roles also control which connectors, and which tools on those connectors, a role can use. Where capabilities cover Claude’s built-in features, connector permissions cover the apps and services you’ve connected to your organization, such as Slack, Google Drive, or Jira. You set them on the **Connectors** tab of the role editor, next to the **Capabilities** tab.

**Note:** Connector permissions apply only to members whose role is set to “Custom roles.” Members with the User, Admin, or Owner roles see every connector enabled for your organization, subject to your organization-wide tool policies per connector. Owners and Admins always see every connector so they can configure it, regardless of any role’s connector permissions.

### Permission levels

On the **Connectors** tab, you set all connectors, each connector, or each tool on a connector, to one of three levels:

- **Always allow:** Every tool on the connector is available, and members can set their own approval to “Always allow” to skip the per-call confirmation.

- **Needs approval:** Every tool is available, but members confirm each call. The “Always allow” option is removed from their personal approval menu for these tools.

- **Blocked:** The connector or tool is hidden. Claude can’t see it or call it.

A connector can also be set to **Custom**, which lets you set each of its tools individually. For the full setup, see **[Set up role-based permissions on Enterprise plans](https://support.claude.com/en/articles/13930458-)**.

### How connector access is determined

A connector or tool passes through several layers before a member can use it, evaluated in this order:

1. **Role grant.** Each connector or tool on a role is set to “Always allow,” “Needs approval,” or “Blocked.”

2. **Across the member’s roles.** If a member’s groups give them more than one role, the most permissive grant for each tool applies. Connector permissions are additive across roles, the same as capabilities.

3. **Organization-wide tool policy.** The per-tool policy you set under **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)** per connector is the ceiling. For each tool, Claude compares the member’s role grant to this policy and applies the stricter of the two. Role grants narrow access within the policy; they can’t widen past it. Learn more about setting tool access in **[Use connectors to extend Claude’s capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)**.

4. **The member’s own setting.** The result of the steps above is the member’s effective ceiling. It limits the options in their personal per-tool approval menu (“Always allow,” “Ask,” or “Never”). A ceiling of “Needs approval” removes “Always allow.” A ceiling of “Blocked” grays the tool out.

For members using Claude Code, one more layer applies: Managed Settings policies and connector permissions compose by most-restrictive. A tool is callable without a prompt only when both allow it. For more information, see **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.

This table shows how the organization-wide tool policy and a member’s role grant combine:

| **Organization-wide tool policy** | **Highest role grant across the member’s roles** | **Effective ceiling** | **Member’s personal options** |
| --------------------------------- | ------------------------------------------------ | --------------------- | ----------------------------- |
| Always allow                      | Always allow                                     | Always allow          | Always allow, Ask, Never      |
| Always allow                      | Needs approval                                   | Needs approval        | Ask, Never                    |
| Always allow                      | Blocked                                          | Blocked               | Tool grayed out               |
| Needs approval                    | Always allow                                     | Needs approval        | Ask, Never                    |
| Needs approval                    | Blocked                                          | Blocked               | Tool grayed out               |
| Blocked                           | Any                                              | Blocked               | Tool grayed out               |

### Where connector permissions apply

Connector permissions are enforced on Anthropic’s servers, so they apply across every Claude surface that routes connector traffic through Anthropic:

| **Surface**                       | **Coverage**                                                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude on web and desktop         | Full enforcement. Blocked connectors are hidden, blocked tools are grayed out, and the personal approval menu is limited to what the ceiling allows.                                                          |
| Claude Mobile (iOS and Android)   | Enforced. Blocked tools are stripped from Claude’s view and calls to them are rejected. A blocked tool may still look active in mobile connector settings until interface updates ship, but it can’t be used. |
| Claude Cowork (cloud and desktop) | Same as web.                                                                                                                                                                                                  |
| Claude Code                       | Enforced. Blocked tools are rejected and appear as disabled. See **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.                                                         |

Connector permissions govern connectors your organization has added under **[Organization settings > Connectors](https://claude.ai/admin-settings/connectors)**. They don’t govern connectors a member runs locally on their own machine, and they don’t govern Claude Cowork when it’s deployed on a third-party platform. For third-party Cowork deployments, use MDM instead. See **[Cowork on 3P: MCP, plugins, skills, and hooks](https://claude.com/docs/cowork/3p/extensions).**

### What members see when a connector is restricted

| **Restriction**                          | **What the member sees**                                                                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A connector is blocked for their role    | The connector doesn’t appear in their connector menu.                                                                                                                 |
| A tool is blocked on a visible connector | The tool is grayed out in their connector settings, with the message “This tool is not enabled for your role. Contact your administrator.”                            |
| A tool is capped at “Needs approval”     | The tool works, but the personal approval menu offers only “Ask” and “Never,” and Claude asks before each call.                                                       |
| Connector permissions can’t load briefly | A banner reports that connectors couldn’t load, with a retry. No blocked tool ever reaches the connected service. Access fails toward denying, never toward granting. |

Members can’t tell which layer restricted a tool. The message is the same whether the limit comes from the organization-wide tool policy, a role grant, or both. To find the source, compare the organization-wide policy with the member’s role grants.

---

## What members see when access is restricted

When a capability is restricted, here’s what members see. For connector and tool restrictions, see **Connector permissions** above.

| **Reason**                                    | **What the member sees**                                                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Feature is disabled at the organization level | The feature appears greyed out or hidden, with the message "This feature is disabled for your organization."       |
| Member's roles don't grant the feature        | The feature appears greyed out or hidden, with the message "Contact your admin to request access to this feature." |
| Member's roles don't grant any product access | The member lands on their settings page when they sign in, with no products available to use.                      |
