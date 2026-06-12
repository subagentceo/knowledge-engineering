> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Billing groups

Billing groups are only available to workspace admins and allow you to set limits for specific
groups of users and service accounts within your workspace.

## Overview

Billing groups let workspace admins set both credit usage quotas and professional voice clone (PVC) caps for specific groups of users and service accounts.
This feature helps organizations control costs and manage consumption by allocating specific quotas to different teams or departments.

Credit usage limits and PVC limits are separate controls and can be managed independently.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/94471dc9c9c7f01268df811d5837f6a76fe401a8fefc215ccf9035b3d6c5d71e/assets/images/product-guides/administration/create-group.webp" alt="Create billing group interface" />

With billing groups, you can:

* **Set group limits** – Define **Credit Quotas** and **Professional Voice Clone (PVC) Caps** for specific groups of users and service accounts.
* **Control costs** – Prevent overspending by limiting usage for specific teams.
* **Track consumption** – Monitor usage patterns and limits across different groups in your workspace.
* **Manage access** – Enforce group-level limits when either credit usage or PVC count reaches the configured cap.

## How it works

Billing groups apply group-level limits to a subset of users and service accounts within your workspace. Once configured, all usage by members of a billing group counts toward that group's allocated limit.

Each user or service account can only be in one billing group at a time.

### Credit usage limit

The credit usage limit tracks group consumption during the billing cycle. All usage by members of the group counts toward the group's configured quota.

This limit resets at the start of each subscription cycle, aligned with your workspace billing cycle.

### PVC limit

The PVC limit caps the number of professional voice clones owned by members of the group.

PVC limits do not reset each billing cycle.

## Create and manage billing groups

Workspace admins can create and manage billing groups from **Workspace settings > Groups**.

### Create a new billing group

#### Create a new group

Click on **Create New Group** and enter a name for the group.

### Set group limits

Enter the group's **Credit Usage** and **PVC count** limits. These limits apply independently and can be updated at any time. You can also choose to track credit usage for the group without setting a limit.

### Add members

Select users and service accounts from your workspace to add to the billing group. Remember that each user and service account can only be in one billing group at a time.

### Adjust limits

Workspace admins can modify group limits at any time from **Workspace settings > Groups**. Changes take effect immediately.

When a billing group reaches its **credit usage** limit:

1. All requests made by any member of the group are rejected.
2. Users receive an error indicating the group has exceeded its quota.
3. The restriction remains in place until the next subscription cycle reset.
4. Other billing groups and unassigned users are not affected.
5. Workspace admins can update the usage limit for the group from **Workspace settings > Groups > Manage Usage Limit**.

When a billing group reaches its **PVCs** limit:

1. Members cannot create new professional voice clones.
2. Existing professional voice clones remain available.
3. New PVC creation remains blocked until a workspace admin increases the cap or the group's active PVC count decreases.
4. Other billing groups and unassigned users are not affected.

### Track usage

Workspace admins can monitor and adjust billing group limits from **Workspace settings > Groups**. Click the dollar button to view current usage for each group, and to update the group's limits.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/9aeadadd05234b03a56cc767fb9a53fffc8ef84ceff814161da8baa99d6ba1bb/assets/images/product-guides/administration/view-usage.webp" alt="View usage across billing groups" />

Individual users can view their own usage details from their account **Settings > Usage & Credit Ceilings**.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/e37f90d763fa71cf5b76724f42213eee23ef45cebd8e97d12f35bf1791c5edc8/assets/images/product-guides/administration/personal-usage.webp" alt="View personal usage in account settings" />

### Manage billing group members

Workspace admins can manage groups for individual workspace members from **Workspace settings > Members**. Click the dollar button to view which group the member is part of. If they are not part of a billing group, this button will appear yellow - click it to allocate the user to an existing billing group.

You can also add or remove members from a billing group from **Workspace settings > Groups > Manage Group**.

When a user or service account is added to a billing group, their credit usage from that point forward starts counting toward that group's limit. Previous credit usage is not retroactively applied to the billing group. When removed, their future usage will count toward the workspace's overall quota or another billing group if reassigned.

For PVC limits, member-owned professional voice clones count toward the group's **PVC count** once the member allocation applies. When a member is removed, their future usage will count no longer count towards the billing group's quota.

Once a billing group reaches its credit usage limit, all members are blocked from making requests
until the next billing cycle unless the limit is increased by a workspace admin.