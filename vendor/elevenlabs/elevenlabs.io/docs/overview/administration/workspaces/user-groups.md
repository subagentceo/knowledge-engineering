> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# User groups

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/b3352775553098f965b4c3a92526bf71c6afb836ce32b6eccac2947b80d0fd01/assets/images/product-guides/workspaces/manage-group.png" alt="Group Management" />

## Overview

&#x20;Only Workspace admins can create, edit, and delete user groups.&#x20;

User groups allow you to manage permissions for multiple users at once.

## Creating a user group

You can create a user group from **Workspace settings**. You can then [share resources](/docs/overview/administration/workspaces/sharing-resources) with the group directly.
If access to a user group is lost, access to resources shared with that group is also lost.

## Multiple groups

User groups cannot be nested, but you can add users to multiple groups. If a user is part of multiple groups, they will have the union of all the permissions of the groups they are part of.

For example, you can create a voice and grant the **Sales** and **Marketing** groups viewer and editor roles on the voice, respectively.
If a user is part of both groups, they will have editor permissions on the voice. Losing access to the **Marketing** group will downgrade the user's permissions to viewer.

## Disabling platform features

Permissions for groups can be revoked for specific product features, such as Professional Voice Cloning or Sound Effects.
To do this, you first have to remove the relevant permissions from the **Everyone** group. Afterwards, enable the permissions for each group that should have access.