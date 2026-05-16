Custom roles are available for Enterprise plan organizations. Owners and Primary Owners can manage custom roles in **[Organization settings > Custom roles](https://claude.ai/admin-settings/roles)**.

## What are custom roles?

Custom roles let you define exactly which features your members can access. Each custom role contains a set of permissions that grant or restrict access to specific capabilities like chat, Claude Cowork, Claude Code, web search, and more.

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

| **Capability** | **Description** |
| --- | --- |
| Chat | Access to chat on web, desktop, and mobile apps. |
| Code execution and file creation | Ability to run code and create files in conversations. |
| Memory | Ability to use memory across conversations. |
| Web search | Ability to use web search in conversations. |
| Public projects | Ability to share projects with everyone in your organization. |
| Create skills | Ability to create or upload custom skills. |
| Share skills with team members | Ability to share skills with specific people in your organization. |
| Share skills with the full organization | Ability to share skills with everyone in your organization at once. |
| Claude Code | Access to Claude Code. |
| Fast mode | Access to faster model options for Claude Code. |
| Claude Security | Find and fix security vulnerabilities in your code with Claude. |
| Claude Design | Access to Claude Design to generate design artifacts. |
| Claude Cowork | Access to Claude Cowork. |
| Claude for Chrome | Access to Claude for Chrome, the browser extension that lets Claude browse and act on web pages on the user's behalf. |

**Note:** Chat is enabled by default for all custom roles, including ones created before this capability was added. If you want to restrict chat for a specific role, toggle it off when editing the role.

---

## Create a custom role

1. Navigate to **[Organization settings > Custom roles](https://claude.ai/admin-settings/roles)**.

2. Click “+ Add role”

3. Enter a name for the role (for example, "Developer," "Standard Access," or "Restricted").

4. Select the groups you want to assign to the role.

5. Toggle each capability on or off to define what this role grants.

6. Click “Add role.”

## Edit a custom role

1. Navigate to **[Organization settings > Custom roles](https://claude.ai/admin-settings/roles)**.

2. Click the role you want to edit.

3. Update the name and groups, or toggle capabilities as needed.

4. Click “Edit role” to save your changes.

Changes take effect within one minute. All members in groups assigned to this role are affected.

## Delete a custom role

Click the menu button on any custom role and select “Delete role.” Deleting a role removes its permissions from all groups it was assigned to. Members in those groups lose the permissions the role granted, unless another role in their chain also grants them.

---

## Assign groups to custom roles

Custom roles are assigned to groups, not directly to individual members. To assign a group to a role:

1. Navigate to **[Organization settings > Custom roles](https://claude.ai/admin-settings/roles)**.

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

## What members see when access is restricted

| **Reason** | **What the member sees** |
| --- | --- |
| Feature is disabled at the organization level | The feature appears greyed out or hidden, with the message "This feature is disabled for your organization." |
| Member's roles don't grant the feature | The feature appears greyed out or hidden, with the message "Contact your admin to request access to this feature." |
| Member's roles don't grant any product access | The member lands on their settings page when they sign in, with no products available to use. |