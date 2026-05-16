This guide walks you through setting up role-based permissions for your Enterprise organization. This lets you control which features specific teams or groups of members can access, rather than giving everyone the same permissions.

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

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260367415/3e1b2f57cc457a101ce2a424ec86/e3cc8982-ef39-4c19-bd4c-81c60aeef56e?expires=1778914800&amp;signature=fc2bc105f0296c6c7141a191262391d3ca7bb3a1b6514faa4cfad02bbcffe715&amp;req=diIhFsp4moVeXPMW1HO4zdVuSZNHABEjPwB%2FtcRiWFoTBiIUgRb3XdGAW7Lq%0A5831SH6JgbvcrgBPepg%3D%0A)

Remember: any feature you want to control per-group must be **enabled** at the organization level. If a feature is toggled off at the organization level, no custom role can grant access to it.

**Important:** Unlike members with the User role, members assigned to Custom roles don't automatically inherit organization-enabled capabilities. Every capability a Custom roles member needs must be explicitly granted by a custom role assigned to one of their groups.

---

## Step 2: Create custom roles

Create your custom roles before enabling any features or migrating members. This ensures your roles are ready to enforce access the moment features turn on.

1. Navigate to **[Organization settings > Custom roles](https://claude.ai/admin-settings/roles)**.

2. Click “Add  role.”

3. Name the role and toggle the appropriate capabilities.

4. Click “Add role.”

5. Repeat for each role in your plan.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260368574/1f06655487bef25512430e3e2899/620bea7b-f6af-4cc9-aa3a-b1d49354e227?expires=1778914800&amp;signature=f81a4c7310ce08c58334dba40c0edf66c0110f65f9df62dcee49cce6ba77ccc8&amp;req=diIhFsp4lYRYXfMW1HO4zZqxnA7%2FuSC68XPTLNWu%2BxNoV7nEuIe6I%2BOpQTQZ%0ATBlwoO005JCrLl50%2FyE%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260369769/3ee6e7460a77947e9423aa44a063/da31a64d-e091-4764-9aa3-2afe3e38b3fb?expires=1778914800&amp;signature=2852cb0a78f8188ac8a65c37af7929a8990a82836414f35c710bb396c832ecee&amp;req=diIhFsp4lIZZUPMW1HO4zaQnrjfJHzN3exwRl3VHNrH5fSM5B5kQPPSZ9rKC%0A9nbZIgJSJFJaHR%2BCFKQ%3D%0A)

Changes to custom roles can take up to five minutes to propagate. Members may need to refresh their browsers to see updated access.

See **[Manage custom roles on Enterprise plans](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)** for details on available capabilities.

---

## Step 3: Create groups and assign roles

1. Navigate to **[Organization settings > Groups](http://claude.ai/admin-settings/groups)**.

2. Click “Add group” to create a group for each team or tier in your plan.

3. Add members to the appropriate groups.

4. Assign each group to the custom roles you created in step 2.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260371973/b503c99ef71d8a89b7aff606511b/b1afd593-3b23-4fa9-8b9b-ee6beaf74fd7?expires=1778914800&amp;signature=a623ca068077a873346a07ce26768893cab2e83bec4d915da025705ebe9e81c7&amp;req=diIhFsp5nIhYWvMW1HO4zdMu%2Fmh%2FGw1iKwlCydrbfL5d4svFH5gs8iDKggXX%0AStkW0Su5KTpCwuyIFWY%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260372813/83ccc4784bdfc8600101bc42ec4b/6e7456ac-9887-4e04-b757-3972110fbdce?expires=1778914800&amp;signature=c5dc2e528eee07143d6841c30af0d226ac6e97054841d4706bdb0a6d99669997&amp;req=diIhFsp5n4leWvMW1HO4zQetkCteZavwczQdKdGFNscyvdrMtFzyvTIrFkUv%0AS0cfCvbpHwGpTbTd7Do%3D%0A)

If you use SCIM directory sync, you can sync groups from your identity provider instead of creating them manually. For details on SCIM group sync, see **[Manage groups and group spend limits on Enterprise plans](https://support.claude.com/en/articles/13799932-manage-groups-and-group-spend-limits-on-enterprise-plans)**.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260374677/5f9d8febb8ae25153a94d0b827b9/c8314b27-96c1-4743-ae8b-25e511181837?expires=1778914800&amp;signature=e01213bbf407eadb8628bc62dd85204688ecef00fc3308238f28615abbcfe2aa&amp;req=diIhFsp5mYdYXvMW1HO4zXzl5Id86T%2BSKYkQn0Dd8NWdi7JeNxhvd4YSUDSm%0Asdy9QmpT3%2F136vIpUVM%3D%0A)

**Multiple organizations under the same parent organization:** Groups are managed at the parent organization level and propagate to all child organizations. You may see members from other organizations listed in a group—this doesn't mean they have access to your organization. Custom roles assigned to a group only grant capabilities to members who are part of your specific organization.

If you request to move an organization from one parent to another (this is rare in practice), groups and roles will become undefined and you will need to re-create them.

**Important:** If your organization uses Invite only or JIT provisioning, you can only use manually created groups for RBAC. SCIM-synced groups aren't supported in these modes.

---

## Step 4: Verify group and role assignments

Before migrating members to Custom roles, confirm that every member you plan to migrate is in at least one group assigned to a custom role. Members who are migrated without group or role coverage will lose access to all governed features.

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)**.

2. Use the Role and Group filters to identify members who aren't assigned to any group.

3. Alternatively, click "Export CSV" to download the full member list with role and group columns for review.

4. Add any unassigned members to the appropriate groups before continuing.

---

## Step 5: Migrate members to Custom roles

For custom role capabilities to take effect, members must have their role set to “Custom roles.” Members with the User, Admin, or Owner roles get their permissions from those roles directly, not from custom roles.

**Important:** Complete this step only after you've created your custom roles, created your groups, and verified all members are assigned to groups (steps 2–4). Members moved to Custom roles before setup is complete will immediately lose access to all governed features.

Choose the migration path based on whether your organization already enabled group mappings:

### Path A: Enable group mappings (only if already in use)

Use this path only if your organization already enabled group mappings for role assignment. If you aren't already using this setting, skip to Path B.

1. Navigate to Organization settings > Organization and access.

2. In the role mappings section, assign the IdP groups you want governed by custom roles to the Custom roles role.

3. Save your changes. Members in those IdP groups are migrated to Custom roles on the next sync.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260376016/fd78a72c759c52f2490b503c592e/1784efed-2dcb-42dc-bbfb-a969ef04d5b5?expires=1778914800&amp;signature=21149080832c65bca4f55e5e00a0bdb5769695cea8af550ebf0bb0606932a0ae&amp;req=diIhFsp5m4FeX%2FMW1HO4zezarUsN0eBDgD4R5ew4AJVieA8t2%2FxFoHuWmYjU%0ALVUJPqLsajXamHD6mD0%3D%0A)

Members in IdP groups mapped to Custom roles follow the permissions of the custom roles assigned to their groups in Claude. Members in IdP groups mapped to User follow the organization-level capability settings. If a member is in groups across both mappings, Custom roles takes precedence.

### Path B: Bulk assignment tool

Use this path if your organization hasn’t enabled group mappings.

**Warning:** If you didn’t already enable group mappings, do not enable it during RBAC setup. Enabling it without first assigning all members to mapped groups can result in members losing access to your organization.

1. Navigate to **[Organization settings > Members](http://claude.ai/admin-settings/members)**.

2. Use the Role and Group filters to select the members you want to migrate.

3. Use the bulk assignment tool in the Members table to change the selected members' role to Custom roles.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260377969/ba3b7ba08518f0a50e2a84f82655/bdf1aea3-2fe7-4f3c-868b-cc35ae8b7d1d?expires=1778914800&amp;signature=d506d4da92a4529daa8ba6d5b9d2a3d4f6c9a4bd6bfd3284f00a76f4e5e60456&amp;req=diIhFsp5mohZUPMW1HO4zYFuz4krhM2ElPaXg%2F0URIkrt%2BWgpd6RcQIfo4rf%0AUDYj%2Bjj%2Bj9fbf4Odf3U%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260378309/abe25b6478c721a2f965b35361b7/beff124a-0a44-4f7f-97f8-391ce6e8c55b?expires=1778914800&amp;signature=e1c7082fde91de08d718750d8b4114740e55ae2451a8def8177af7f9a50c9c65&amp;req=diIhFsp5lYJfUPMW1HO4zRgyH1DVUu3eZ8KPhClFzQnn4eATXtvdcSeBPkyM%0AwbjxRX4TWKWljTn4MkE%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260378764/0640dfbb3f1e3ee83976a64df36e/b7021d51-24a0-4db7-949e-364e1721ad5b?expires=1778914800&amp;signature=eec65edc848f1b615ea5a3923dcb93705ea6eb1a2d2f406265adfa46f02d63c4&amp;req=diIhFsp5lYZZXfMW1HO4zbvZAxWYtPzsG3CUmvrYMDXLSSVcVLTQ9dOq2jYz%0AaX8uE8uZqfgkco8O6tw%3D%0A)

We recommend migrating a pilot group first—one team or department—and verifying their access is correct before expanding to the rest of the organization.

### Gradual rollout

Whichever path you use, we recommend migrating in stages:

1. Start with a pilot group of one team or department.

2. After migration, verify the pilot group has the correct feature access based on their group and role assignments.

3. If something isn't right, switch the affected members back to their previous role while you adjust.

4. Expand to more members once you've confirmed the setup works.

---

## Step 6: Enable features at the organization level

Only enable organization-level features after roles, groups, and member migration are complete. This ensures custom role capabilities are already in place, with no window where unauthorized members could access a feature.

For any feature you want to control per-group:

1. Navigate to the feature's settings page in **Organization settings** (for example, **[Organization settings > Cowork](http://claude.ai/admin-settings/cowork)**).

2. Enable the feature at the organization level.

Enabling a feature at the organization level doesn't mean everyone gets it—custom role permissions are already in place to control who can use it. Think of the organization-level toggle as making the feature "available for role-based assignment" rather than "on for everyone."

---

## Step 7: Apply a group spend limit (usage-based orgs only)

Navigate to the “Usage” page to assign a per-user monthly spend limit to any group.

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260386576/377ac052069ff5a35b3023f50d12/dface609-9d85-4ee1-8ed3-bfe019a2bd0a?expires=1778914800&amp;signature=8abdc276323e89dc6faf257ad39799872929e530e535973a178b8517ca06bb84&amp;req=diIhFsp2m4RYX%2FMW1HO4zfvdhJ%2BWRAKCBMkPcsY1DF4adNsSalSvlfCR7MdT%0AbyqnY2KoTU2ObrH5eko%3D%0A)

![](https://downloads.intercomcdn.com/i/o/lupk8zyo/2260386575/b9798bb7a2ab92024fa4d97f2ff4/7b2327e1-ab3f-41e5-8be0-77c0f35a4015?expires=1778914800&amp;signature=d249f45659112253e479403f9a225c021e828a7dcd7a32c27123d097c740ddf2&amp;req=diIhFsp2m4RYXPMW1HO4zW55z9mQwVU5JuVz%2B3EZKJ5pQtHN5Lo17CcOfymb%0AzpL0Vf87npCIekwRBi0%3D%0A)

Note the following precedence rules:

- Individual limits always override group limits, regardless of which is higher.

- If a user belongs to multiple groups with different limits, the org can either apply the lowest or highest spend limit. Use the dropdown under “Spending defaults” to determine the precedence you want to apply.

- Org-wide limits remain the hard ceiling.

Membership changes take effect automatically—users inherit or lose limits as soon as their group membership changes. Relevant only for usage-based billing orgs.

---

## Step 8: Verify and monitor

1. **Spot-check access**: Check a few members from each group to confirm they see the right features.

2. **Test the restricted state**: Log in as (or ask) a member who should not have a feature like Cowork. They should see it greyed out with the message "Contact your admin to request access to this feature."

3. **Test the granted state**: Confirm a member who should have the feature sees it working normally.

4. **Check edge cases**: Test members in multiple groups, members with no group, and new members joining via SSO.

Permission changes take up to five minutes to fully sync across the platform. Members may need to refresh their browser to see updated access.

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

Yes. Members with the User, Admin, or Owner roles are unaffected by custom role permissions because they get their permissions from those roles directly. Only members set to Custom roles are controlled by the group-and-role system. This allows gradual migration.

### What if a member is in two groups with different roles?

Permissions are additive. If any role in a member's chain grants a feature, they have it. You can't use a role to remove a permission granted by another role.

### Can I use SCIM groups and manual groups together?

Yes. Both types can be assigned to custom roles. The difference is that SCIM group membership is managed in your identity provider, while manual group membership is managed in Claude's organization settings.

### Are Owners and Primary Owners affected by custom role permissions?

No. Owners and Primary Owners always have full access to all features.

### How does this work across parent and child organizations?

Groups and SCIM sync are managed at the parent organization level and shared across all child organizations. Role and spend limit assignments are configured independently in each child organization—changes in one child organization don't affect others. Group membership changes and SCIM resyncs propagate across all child organizations under the same parent.