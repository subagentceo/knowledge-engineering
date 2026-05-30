This guide walks you through setting up role-based permissions for your Enterprise organization. This lets you control which features and connectors specific teams or groups of members can access, rather than giving everyone the same permissions.

Before you start, make sure you're familiar with:

- **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)** — how to create and manage groups

- **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)** — how custom roles and capabilities work

---

## Before you begin

You'll need Owner or Primary Owner access to your Enterprise organization.

**Check which capabilities are enabled at the org level.** Go to **Organization settings** and ensure you know which capabilities members can access currently. For settings managed by RBAC, both the org setting and role setting are required to be on for users to get access.

**Back up your member list.** Export a CSV of your current members from **[Organization settings > Members](http://claude.ai/admin-settings/members)** before making any changes. If something goes wrong during migration, this gives you a reference to restore access. See **[Manage members on Team and Enterprise plans](https://support.claude.com/en/articles/13133750-manage-members-on-team-and-enterprise-plans)**.

**Determine which teams or functions need each capability.** For example, Engineering gets Claude Code + Fast Mode and Marketing gets Cowork + Web Search. From here, define your custom roles.

**Dual-seat plans.** If your organization is on a dual-seat Enterprise plan (with Chat and Chat + Claude Code seats), custom roles don't override seat-level restrictions. A member assigned to a Chat-only seat can't access Claude Code even if their custom role grants it. The same applies in reverse: if a member's custom role doesn't grant the chat capability, they won't have chat access regardless of their seat type. Plan your role structure with seat assignments in mind.

**Note:** "Chat + Claude Code" refers to a seat type on legacy dual-seat plans. The "chat" capability in custom roles is separate—it governs chat access for any member whose role is set to "Custom roles," on any plan.

**Decide how you'll create groups.** You can create groups manually in Claude, or sync them from your identity provider (IdP) via SCIM. You can also use both methods simultaneously. If you plan to use IdP groups from Okta, Entra ID, or another provider, make sure SCIM directory sync is configured. See **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning)**.

**Add the connectors you plan to govern.** Connector permissions only cover connectors that an Owner or Primary Owner has already added under **Organization settings > Connectors** and connected with admin credentials. Review your organization-wide tool policy there as well, since role grants narrow within it and can’t widen past it. See **[Use connectors to extend Claude’s capabilities](https://support.claude.com/en/articles/11176164-)**.

---

## Planning your role structure

Before creating anything, decide which features each team or group of members should have access to. Here are three common patterns:

### Base plus additive roles

This is the recommended approach for most organizations. Create a "Standard Access" role for everyone with common features like web search, memory, and projects. Then create additive roles that grant specific capabilities — for example, a "Cowork Enabled" role that only adds Cowork. Assign all members to the base role through an "All Users" group, and add specific members to additional groups that layer on extra features.

This pattern is flexible because permissions are additive — combining a base role with additive roles composes cleanly without conflicts.

### Tier-based roles

Create distinct tiers: "Full Access" with all features, "Standard Access" with most features, and "Restricted Access" with minimal features. Each member goes into exactly one group assigned to one tier.

### Department-based roles

Create roles that map to departments: "Engineering" with chat, Cowork, Claude Code, and code execution; "Research" with chat, web search, memory, and projects; "Business" with chat, web search and projects only. Assign each department group to its corresponding role.

---

## Step 1: Audit your current settings

1. Review which features are currently enabled or disabled at the organization level in **[Organization settings > Capabilities](http://claude.ai/admin-settings/capabilities)**.

2. Go to **[Organization settings > Members](http://claude.ai/admin-settings/members)** to export or review your member list.

3. Note each member's current built-in role (User, Admin, or Owner).

4. For each team or department, decide which features they need access to.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260367415/3e1b2f57cc457a101ce2a424ec86/e3cc8982-ef39-4c19-bd4c-81c60aeef56e?expires=1780164900&signature=62bb4c636539cee39fa4867fe7b1589b6cfb26f914b3531862611afc0f5e4377&req=diIhFsp4moVeXPMW1HO4zdVuRptPBxEiPwB%2FtcRiWFol9IY%2BdKxFzykP1GD0%0Ayph5YLBVeQd%2F%2F2pKccg%3D%0A)

Remember: any feature you want to control per-group must be **enabled** at the organization level. If a feature is toggled off at the organization level, no custom role can grant access to it.

**Important:** Unlike members with the User role, members assigned to custom roles don't automatically inherit organization-enabled capabilities. Every capability a "Custom roles" member needs must be explicitly granted by a custom role assigned to one of their groups.

---

## Step 2: Create custom roles

Create your custom roles before enabling any features or migrating members. This ensures your roles are ready to enforce access the moment features turn on.

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Click “Add role.”

3. Name the role and toggle the appropriate capabilities on the **Capabilities** tab.

4. Click “Next: Configure connectors.”

5. On the **Connectors** tab, set connector permissions for the role. See **Step 3**.

6. Click “Add role.”

7. Repeat for each role in your plan.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260368574/1f06655487bef25512430e3e2899/620bea7b-f6af-4cc9-aa3a-b1d49354e227?expires=1780164900&signature=858db8f00439aa8a06e2575a6f7df2e135541cf5753129030c2d60261fb1b46d&req=diIhFsp4lYRYXfMW1HO4zZqxkwb3viC78XPTLNWu%2BxOAMSlEi0JRHvlO8Xdk%0ApKCFhjxaxh9BUADNANA%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260369769/3ee6e7460a77947e9423aa44a063/da31a64d-e091-4764-9aa3-2afe3e38b3fb?expires=1780164900&signature=9a24ec83cb6658837b27570d62ffcf82e33e24db11c5b15cf2ae5482b5df8c9e&req=diIhFsp4lIZZUPMW1HO4zaQnoT%2FBGDN2exwRl3VHNrGPOu9t21y%2FYFJf0wSq%0AiJm3tGeGSMnYvQXIVgc%3D%0A)

Changes to custom roles can take up to five minutes to propagate. Members may need to refresh their browsers to see updated access.

See **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)** for details on available capabilities.

---

## Step 3: Configure connector permissions (optional)

Set connector permissions on each role to control which connectors, and which tools on those connectors, the role can use. This step is optional. If you don’t configure it, your roles fall back to the default behavior described below. For how the permission model works end to end, see **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)**.

**Important:** When Anthropic enables connector permissions for your organization, every existing custom role is seeded with the “All connectors” grant at “Always allow.” Because “Always allow” is the most permissive grant, your organization-wide tool policy alone determines each member’s effective ceiling at enablement. Members neither gain nor lose access at enablement. Your first configuration pass narrows from that baseline.

**Note:** A newly created role defaults to “Needs approval” on every connector. The create-role flow steps through the Connectors tab so you see this default before saving. Raise a connector to “Always allow” or lower it to “Blocked” as needed.

### Locate the Connectors tab

1. Navigate to **[Organization settings > Roles](https://claude.ai/admin-settings/roles)**.

2. Open an existing role, or click “Add role” to create one.

3. Select the **Connectors** tab, next to **Capabilities**.

The default settings for new roles are permissive. When creating or modifying a role, confirm the settings on each tab to avoid granting unintended permissions.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2434604622/61b21d25972319937d52ff3a6a75/99e1b8a7-2a78-4879-a0c5-c7e3edb26e85?expires=1780164900&signature=affacf773adfca9747a3a97e966d82798b28389c40f90521909c4c1cc7e63ed7&req=diQkEs9%2BmYddW%2FMW1HO4zfUA21yOAe2gsrx59XUcCLfuooB1gdYdF%2BigE2p2%0AUF6VLqOIcKpKb4y%2Fr9o%3D%0A)

### Set connector-level permissions

The **Connectors** tab lists an **All connectors** row at the top, followed by every connector your organization has added. Each row has a dropdown with four options:

- **Always allow:** Every tool on the connector is available, and members can set their own approval to “Always allow.”

- **Needs approval:** Every tool is available, but members confirm each call.

- **Blocked:** The connector is hidden from members with this role.

- **Custom:** Set each tool on the connector individually. See “Set per-tool permissions” below.

Choosing “Always allow,” “Needs approval,” or “Blocked” applies that level to every tool on the connector. The **All connectors** row works the same way one level up: it sets a baseline for every connector at once, including any connector you add later. Use it to set a role’s default, then override individual connectors.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2434604623/02149bde5713706bbb9b78985164/c5cb4190-6225-48a0-be7d-830c12f36489?expires=1780164900&signature=b138e0d087b3a8f18899935a225ffb735484a51394dd69d46ceb0d0b6890792b&req=diQkEs9%2BmYddWvMW1HO4zeRK6d8opUkcmcqz9xkOuffK5oAgbJbHq6VaRiox%0A5BvZsIDk0BaF%2BuwA1Oc%3D%0A)

### Set per-tool permissions

Set a connector to **Custom** to reveal its tools as individual rows. Each tool has its own dropdown: “Always allow,” “Needs approval,” or “Blocked.”

Per-tool permissions let a role reach part of a connector. For example, with Jira set to **Custom**, its `search_issues` tool set to “Needs approval,” and every other Jira tool set to “Blocked,” members with the role can search Jira but nothing else. Claude only sees the tools you’ve granted, so asking it to create a ticket returns “I don’t have a tool for that” rather than an error.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2434604624/4af753c8a8f42bd0433ee8b13c46/0857940a-21cc-4e7d-9a8c-7dc4f7062163?expires=1780164900&signature=74a66b47710528e833bc4e85f1f578b616f025898b3f2385c8d21125591213e9&req=diQkEs9%2BmYddXfMW1HO4zQn33fOZ6EvZJUeRCH7vFFpQjW%2F6VcIjhZsHm8dT%0Aw02W0c2qpahfQK56RHA%3D%0A)

### Review cross-role conflicts

Because connector permissions are additive across roles, blocking a connector in one role has no effect on a member who also holds another role that grants it. Each connector row shows a warning when other roles grant the same connector at a different level. The warning names those roles and links to them, and the most permissive grant is the one that applies.

If you have unsaved edits when you open a linked role, you’re asked to discard them first.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2434604629/b8cb3f111277536777e471da0eb1/68f9cf32-5ed0-4c49-b602-f2b07d09bbb8?expires=1780164900&signature=a2d48937ad17f0394da6b0970979ff537796f67298b45b50cb2885a6c5525f0c&req=diQkEs9%2BmYddUPMW1HO4zSH9TBbGfKY5ZWnSOrT24L5Ery3uvmZgxDxsz0zb%0AqODFwHRuHkPzNG1yhBE%3D%0A)

### Verify enforcement

Verify connector permissions after you’ve migrated members to “Custom roles” (Step 6). See **Step 9: Verify and monitor**.

**Important:** If your organization uses Claude Code, enabling connector permissions also applies your organization-wide tool policy to Claude Code. This can only narrow tool access there, never widen it, and it affects all members. Review your organization-wide tool policy before enablement if Claude Code is widely deployed. Connector permissions and Claude Code Managed Settings compose by most-restrictive. See **[Claude Code settings](https://code.claude.com/docs/en/settings#settings-files)**.

---

## Step 4: Create groups and assign roles

1. Navigate to **[Organization settings > Groups](http://claude.ai/admin-settings/groups)**.

2. Click “Add group” to create a group for each team or tier in your plan.

3. Add members to the appropriate groups.

4. Assign each group to the custom roles you created in step 2.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260371973/b503c99ef71d8a89b7aff606511b/b1afd593-3b23-4fa9-8b9b-ee6beaf74fd7?expires=1780164900&signature=dc1a73eb6a0faac279d3d7a34c15271269d60515a76655cc32c782797842cb4c&req=diIhFsp5nIhYWvMW1HO4zdMu8WB3HA1jKwlCydrbfL7Dwjiodd%2F64d4UXu6l%0Aslif9w3WslMP7ylK3vE%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260372813/83ccc4784bdfc8600101bc42ec4b/6e7456ac-9887-4e04-b757-3972110fbdce?expires=1780164900&signature=b89a77c12b57faebfac1501f76e938e272490022180c0219a0886654a5a7f204&req=diIhFsp5n4leWvMW1HO4zQetnyNWYqvxczQdKdGFNsdYE89DXedf7KtsJf1i%0A1gwuwiSNuYC3QLylajM%3D%0A)

If you use SCIM directory sync, you can sync groups from your identity provider instead of creating them manually. For details on SCIM group sync, see **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260374677/5f9d8febb8ae25153a94d0b827b9/c8314b27-96c1-4743-ae8b-25e511181837?expires=1780164900&signature=d778c72afa7d297bfcea4ed4eee7bc27572c5f7f5eb770697f76e20c0375e327&req=diIhFsp5mYdYXvMW1HO4zXzl64907j%2BTKYkQn0Dd8NXzsi9coerowCafR%2BTP%0AFWFr9aoEGzms5QHI2hA%3D%0A)

**Multiple organizations under the same parent organization:** Groups are managed at the parent organization level and propagate to all child organizations. You may see members from other organizations listed in a group—this doesn't mean they have access to your organization. Custom roles assigned to a group only grant capabilities to members who are part of your specific organization.

If you request to move an organization from one parent to another (this is rare in practice), groups and roles will become undefined and you will need to re-create them.

**Important:** If your organization uses Invite only or JIT provisioning, you can only use manually created groups for RBAC. SCIM-synced groups aren't supported in these modes.

---

## Step 5: Verify group and role assignments

Before migrating members to custom roles, confirm that every member you plan to migrate is in at least one group assigned to a custom role. Members who are migrated without group or role coverage will lose access to all governed features.

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)**.

2. Use the Role and Group filters to identify members who aren't assigned to any group.

3. Alternatively, click "Export CSV" to download the full member list with role and group columns for review.

4. Add any unassigned members to the appropriate groups before continuing.

---

## Step 6: Migrate members to custom roles

For custom role capabilities to take effect, members must have their role set to “Custom roles.” Members with the User, Admin, or Owner roles get their permissions from those roles directly, not from custom roles.

**Important:** Complete this step only after you’ve created your custom roles, configured connector permissions if you’re using them, created your groups, and verified all members are assigned to groups. Members moved to custom roles before setup is complete will immediately lose access to all governed features.

Choose the migration path based on whether your organization already enabled group mappings:

### Path A: Enable group mappings (only if already in use)

Use this path only if your organization already enabled group mappings for role assignment. If you aren't already using this setting, skip to Path B.

1. Navigate to **[Organization settings > Organization and access](https://claude.ai/admin-settings/organization)**.

2. In the role mappings section, assign the IdP groups you want governed by custom roles to the "Custom roles" role.

3. Save your changes. Members in those IdP groups are migrated to "Custom roles" on the next sync.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2434934020/d154818947d8d84ebf1aec8d5462/image.png?expires=1780164900&signature=1abfd6a21890dcfb74f92c472e3aefa8cc6d105e2c6b99f035e09455f2e72f1b&req=diQkEsB9mYFdWfMW1HO4zQyCmE%2FiT0FhSnpHYy0fFQssymagFJh5QJZ1tw6V%0AIF76wLvGPKNMmPpaYlU%3D%0A)

Members in IdP groups mapped to "Custom roles" follow the permissions of the custom roles assigned to their groups in Claude. Members in IdP groups mapped to User follow the organization-level capability settings. If a member is in groups across both mappings, "Custom roles" takes precedence.

### Path B: Bulk assignment tool

Use this path if your organization hasn’t enabled group mappings.

**Warning:** If you didn’t already enable group mappings, do not enable it during RBAC setup. Enabling it without first assigning all members to mapped groups can result in members losing access to your organization.

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)**.

2. Use the Role and Group filters to select the members you want to migrate.

3. Use the bulk assignment tool in the Members table to change the selected members' role to "Custom roles."

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260377969/ba3b7ba08518f0a50e2a84f82655/bdf1aea3-2fe7-4f3c-868b-cc35ae8b7d1d?expires=1780164900&signature=ce12ad40d75ee310fb7fb6f87b325ce5e9e91e031636ae4ea6d982426ba28c0c&req=diIhFsp5mohZUPMW1HO4zYFuwIEjg82FlPaXg%2F0URIliHeFeE9mVnlIwUQZK%0A5%2Fnh8wmtSd6aprrz4iI%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260378309/abe25b6478c721a2f965b35361b7/beff124a-0a44-4f7f-97f8-391ce6e8c55b?expires=1780164900&signature=7642b4cc37adc830bc5640b47dec4adc31429935db920f680bf95ad97750ee7a&req=diIhFsp5lYJfUPMW1HO4zRgyEFjdVe3fZ8KPhClFzQk%2BrFTzGVOUoF4Zmu0G%0A33%2F1KPpc2TA8cwjs15E%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260378764/0640dfbb3f1e3ee83976a64df36e/b7021d51-24a0-4db7-949e-364e1721ad5b?expires=1780164900&signature=d9d964480f6ee2794d86f9f59a6d406af615a0cb1bfb26a1423910383749bb0c&req=diIhFsp5lYZZXfMW1HO4zbvZDB2Qs%2FztG3CUmvrYMDUFG49CeRt7UgFLoo7g%0Ajf61%2F1sY8bukarskRWk%3D%0A)

We recommend migrating a pilot group first—one team or department—and verifying their access is correct before expanding to the rest of the organization.

### Gradual rollout

Whichever path you use, we recommend migrating in stages:

1. Start with a pilot group of one team or department.

2. After migration, verify the pilot group has the correct feature access based on their group and role assignments.

3. If something isn't right, switch the affected members back to their previous role while you adjust.

4. Expand to more members once you've confirmed the setup works.

---

## Step 7: Enable features at the organization level

Only enable organization-level features after roles, groups, and member migration are complete. This ensures custom role capabilities are already in place, with no window where unauthorized members could access a feature.

For any feature you want to control per-group:

1. Navigate to the feature's settings page in **Organization settings** (for example, **[Organization settings > Cowork](http://claude.ai/admin-settings/cowork)**).

2. Enable the feature at the organization level.

Enabling a feature at the organization level doesn't mean everyone gets it—custom role permissions are already in place to control who can use it. Think of the organization-level toggle as making the feature "available for role-based assignment" rather than "on for everyone."

---

## Step 8: Apply a group spend limit (usage-based orgs only)

Navigate to the “Usage” page to assign a per-user monthly spend limit to any group.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260386576/377ac052069ff5a35b3023f50d12/dface609-9d85-4ee1-8ed3-bfe019a2bd0a?expires=1780164900&signature=0f421396c1a2c8dc4beed7febc83eb1d9cdf60764b79efb87ac2b7f5d12a7166&req=diIhFsp2m4RYX%2FMW1HO4zfvdi5eeQwKDBMkPcsY1DF4BjyHPrLcq2FnEZl%2Ba%0AY7qJK9CYb%2BYB9kN%2F4eM%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260386575/b9798bb7a2ab92024fa4d97f2ff4/7b2327e1-ab3f-41e5-8be0-77c0f35a4015?expires=1780164900&signature=4562b3a011cbec477ae78aef79bc4814b5d9c464b97b260752a1228039269934&req=diIhFsp2m4RYXPMW1HO4zW55wNGYxlU4JuVz%2B3EZKJ6x1MTduNwyRdFuVNcX%0AY9cjo010l8NqmYsB78M%3D%0A)

Note the following precedence rules:

- Individual limits always override group limits, regardless of which is higher.

- If a user belongs to multiple groups with different limits, the org can either apply the lowest or highest spend limit. Use the dropdown under “Spending defaults” to determine the precedence you want to apply.

- Org-wide limits remain the hard ceiling.

Membership changes take effect automatically—users inherit or lose limits as soon as their group membership changes. Relevant only for usage-based billing orgs.

---

## Step 9: Verify and monitor

1. **Spot-check access**: Check a few members from each group to confirm they see the right features.

2. **Test the restricted state**: Log in as (or ask) a member who should not have a feature like Cowork. They should see it greyed out with the message "Contact your admin to request access to this feature."

3. **Test the granted state**: Confirm a member who should have the feature sees it working normally.

4. **Check edge cases**: Test members in multiple groups, members with no group, and new members joining via SSO.

**If you configured connector permissions, also check:**

- **Connector menu:** blocked connectors don’t appear, and connectors with at least one granted tool do.

- **Connector settings:** blocked tools are grayed out with “This tool is not enabled for your role. Contact your administrator.” Tools capped at “Needs approval” show a personal approval menu limited to “Ask” and “Never.”

- **In a conversation:** ask Claude to use a blocked tool, and it reports it has no tool for the task. Ask it to use a “Needs approval” tool, and the approval prompt appears without an “Always allow” option.

Permission changes take up to five minutes to fully sync across the platform. Members may need to refresh their browser to see updated access.

Connector permission changes reach Claude on the member’s next message and the connector menu on their next page load, usually within a minute.

---

## Using SCIM with role-based capabilities

SCIM connects to your role-based capabilities through two mechanisms that work together.

### IdP group-to-role mapping

This controls which built-in role a member gets when they're provisioned. Map your IdP groups to “Custom roles” so that new members' access is automatically governed by custom role capabilities.

1. Navigate to **[Organization settings > Organization and access](http://claude.ai/admin-settings/organization)**.

2. In the role mappings table, map your IdP groups to “Custom roles.”

### Group sync

This pulls your IdP groups into Claude so they can be assigned to custom roles.

1. Navigate to **[Organization settings > Groups](http://claude.ai/admin-settings/groups)**

2. Click “Check for updates” in the **SCIM sync** section.

3. When prompted to sync Groups, Members, or Both, select Groups only. Syncing Members can affect provisioning and member access.

4. Your IdP groups appear as SCIM-sourced groups in the list.

5. Assign SCIM groups to custom roles just like manually created groups.

6. In your IdP, only push the groups you actually intend to use for RBAC or spend limits. Syncing all IdP groups can slow page loads in the Groups section.

**Note:** Custom role permissions only apply to members with “Custom roles” selected in **[Organization settings > Members](https://claude.ai/admin-settings/members)**. If you map an IdP group to a different role (like User) through the group-to-role mapping but assign that same SCIM group to a custom role, the custom role's permissions have no effect—the member gets their permissions from their assigned role instead. To use custom roles, make sure the IdP group is mapped to “Custom roles.”

### Ongoing management with SCIM

- To grant a member access to a feature, add them to the appropriate IdP group. On the next sync, they pick up the custom role assigned to that group.

- To revoke access, remove them from the IdP group. On the next sync, the permission is removed.

- Click “SCIM sync” in the Groups section to force an immediate sync rather than waiting for the next scheduled sync.

---

## Rollback plan

If you notice your role structure is misconfigured after migration:

1. Turn off any organization-level features that were enabled as part of the migration.

2. Change affected members back to their previous built-in role (for example, User).

3. They immediately regain the static permissions from that role, and custom role permissions stop applying.

4. Adjust roles and groups as needed, then re-migrate.

If you enabled group mappings during setup and lost admin access, follow the recovery steps in **[Set up JIT or SCIM provisioning](https://support.claude.com/en/articles/13133195-set-up-jit-or-scim-provisioning#h_74979446b3)** under "I lost Admin/Owner access after enabling group mappings."

---

## Frequently asked questions

### Do I need to enable a feature at the organization level if I only want some members to have it?

Yes. The organization-level toggle must be on for custom roles to control per-member access. If a feature is off at the organization level, no one can access it regardless of their role. Think of it as a main switch—custom roles control who gets access underneath it.

### What happens if a member set to “Custom roles” isn't in any groups?

They have no custom role permissions, so all features that require permissions are greyed out or hidden. Make sure every member set to “Custom roles” is in at least one group that's assigned to a custom role.

### What if a custom role doesn't grant chat access?

Members in that role won't see Claude's chat interface. They'll land on their settings page when they sign in. If their role grants other products like Cowork or Claude Code, those remain accessible from their settings page and from the relevant apps.

Chat is enabled by default in all custom roles, so you only need to worry about this if you intentionally toggled chat off for a role.

### Can I use both built-in and custom roles?

Yes. Members with the User, Admin, or Owner roles are unaffected by custom role permissions because they get their permissions from those roles directly. Only members set to "Custom roles" are controlled by the group-and-role system. This allows gradual migration.

### What if a member is in two groups with different roles?

Permissions are additive. If any role in a member's chain grants a feature, they have it. You can't use a role to remove a permission granted by another role.

### Can I use SCIM groups and manual groups together?

Yes. Both types can be assigned to custom roles. The difference is that SCIM group membership is managed in your identity provider, while manual group membership is managed in Claude's organization settings.

### Are Owners and Primary Owners affected by custom role permissions?

No. Owners and Primary Owners always have full access to all features.

### How does this work across parent and child organizations?

Groups and SCIM sync are managed at the parent organization level and shared across all child organizations. Role and spend limit assignments are configured independently in each child organization—changes in one child organization don't affect others. Group membership changes and SCIM resyncs propagate across all child organizations under the same parent.

### What happens to my existing custom roles when connector permissions are enabled?

Each existing role is seeded with the “All connectors” grant at “Always allow,” so members’ access doesn’t change at enablement. You narrow access from there.

### What’s the default connector permission on a new role?

“Needs approval” on every connector. The create-role flow steps through the Connectors tab so you see this before saving.

### What happens when I add a new connector after my roles exist?

A role whose “All connectors” row is set to “Always allow,” “Needs approval,” or “Blocked” covers the new connector at that level automatically. A role whose “All connectors” row is set to “Custom” treats the new connector as “Blocked” until you set it.

### I blocked a connector in a role, but a member with that role can still use it. Why?

Check whether the member holds another role that grants it, since the most permissive grant wins across roles. The conflict warning on the connector row lists those roles. Also confirm the member’s role is set to “Custom roles.”

### My organization-wide tool policy already blocks a tool. Do I need to block it in every role?

No. The organization-wide policy is the ceiling. A tool blocked there is blocked for everyone, regardless of role grants.

### Can a role grant a tool that the organization-wide policy sets to “Needs approval”?

The role can grant it, but the stricter setting wins, so members see it capped at “Needs approval.” To let members set “Always allow,” raise the organization-wide policy to “Always allow” first.

### Can I grant one tool on a connector without granting the whole connector?

Yes. Set the connector to “Custom,” set the one tool to “Always allow” or “Needs approval,” and leave the rest “Blocked.”

### Do connector permissions apply to built-in tools like web search or code execution?

No. Built-in features are governed on the Capabilities tab. The Connectors tab governs connectors your organization has added.

### How quickly do connector permission changes take effect?

They reach Claude on the member’s next message and the connector menu on their next page load. Allow about a minute for changes to propagate. Group and role membership changes propagate within about five minutes like other role changes.
