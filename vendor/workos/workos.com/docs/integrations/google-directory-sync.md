# Google Directory Sync

## Introduction

This guide outlines how to synchronize your application's Google Workspace directories.

***

## (1) Select environment

Login to your WorkOS dashboard and ensure you have the desired environment selected.

![Select the desired WorkOS environment from the navigation.](https://images.workoscdn.com/images/8f30c9d7-8569-4cb2-8fbe-1d8fc46be717.png?auto=format\&fit=clip\&q=50)

## (2) Send an admin invite link

Select "Organizations" in the navigation.

Select the organization that'd like to enable a Google Directory Sync connection.

On the Organization page, under "Invite an admin to set up this organization," select "Invite Admin."

![Select "Invite Admin" from the organization page.](https://images.workoscdn.com/images/f879b479-24e6-4c86-acb8-8abb05f2a2ff.png?auto=format\&fit=clip\&q=50)

Select "Directory Sync" and any other features you'd like the organization to be able to onboard.

![Select "Directory Sync" and any other features you'd like the organization to be able to onboard.](https://images.workoscdn.com/images/2ff61c68-3709-4b35-ac0d-f2b5b6333d9b.png?auto=format\&fit=clip\&q=50)

Enter the email addresses of the IT contacts, or copy the setup link and send it to the IT contacts.

![Enter the email addresses of the IT contacts, or copy the setup link.](https://images.workoscdn.com/images/a3414089-79a1-4137-8687-3e803a6f364a.png?auto=format\&fit=clip\&q=50)

***

## (3) Authenticate with admin credentials

Have the organization choose Google as a provider and follow the Google prompts to authenticate with admin credentials.

![A screenshot showing the requested permissions in the Google modal.](https://images.workoscdn.com/images/1809508c-e153-47f7-a9b7-5b243ff95c7c.png?auto=format\&fit=clip\&q=50)

***

## (4) Select which groups to sync to Your Application

The IT contacts can then select to filter which groups and memberships are synced to the directory. If groups are being filtered, then only users with a membership within one of the synced groups will be synced.

![A screenshot showing the setup screen with how to filter groups to sync.](https://images.workoscdn.com/images/43942f32-e228-4745-89a6-fa6ff3e6f4dc.png?auto=format\&fit=clip\&q=50)

***

## (5) Sync users and groups to Your Application

Changes will appear live in the Directory Sync portal under the "Users" tab:

![A screenshot showing users in the "Users" tab of the WorkOS Dashboard.](https://images.workoscdn.com/images/268ff490-71bd-4aa4-9f7d-c01f3548b198.png?auto=format\&fit=clip\&q=50)

A detailed guide to integrate the WorkOS API with your application can be found [here](https://workos.com/docs/directory-sync)

## Frequently asked questions

### Can you selectively sync users and groups from Google Workspace?

Yes, you can select to sync certain groups during setup within the Admin Portal as seen in [Step 4](https://workos.com/docs/integrations/google-directory-sync/4-select-which-groups-to-sync-to-your-application).

### When do users get removed from a directory?

There are 2 ways a user can be deleted from a Google Workspace directory.

1. The user is removed or archived on Google and no longer returned by their API.
2. When the directory is [filtering specific groups](https://workos.com/docs/integrations/google-directory-sync/4-select-which-groups-to-sync-to-your-application), if a user is removed from all groups that are being filtered in, the user is removed from the directory as well.

### How often do Google Workspace directories perform a sync?

Google Workspace directories are synced approximately every 30 minutes starting from the time of the initial sync

### Does Google Directory Sync support nested groups?

Yes, nested groups (groups within groups) are supported in Google Directory Sync. This feature is currently available in a restricted preview. Contact [WorkOS support](mailto:support@workos.com) for additional details.

### What is the `idp_id` for directory groups from Google Workspace?

Google Workspace provides a unique identifier for each group, which is persisted as the `idp_id` for [directory groups](https://workos.com/docs/reference/directory-sync/directory-group) in WorkOS.
