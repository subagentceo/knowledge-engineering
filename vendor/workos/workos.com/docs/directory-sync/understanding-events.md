# Understanding the Events Lifecycle

## Introduction

Directory Sync events represent actions performed within directory providers. For example, an action could mean an IT contact assigning a user to your app or modifying a user group assigned to your app. These actions form the basis of user lifecycle management (ULM).

WorkOS provides information about these actions through a set of structured events. This reference guide will cover the events Directory Sync produces and what they mean. To learn about how to handle these events on your side, see the [data syncing guide](https://workos.com/docs/events/data-syncing).

***

## Directory events

### `dsync.activated`

This event occurs when you or your customer have successfully created a connection between WorkOS and your customer's directory provider.

- | Lifecycle

- | Payload

  #### Sample event object

`dsync.activated` is triggered if you manually create the directory connection in the [Developer Dashboard](https://dashboard.workos.com/), or your customer sets the connection up using the [Admin Portal](https://workos.com/docs/admin-portal).

The directory ID identifies a connection with the directory of a particular customer. Your app should save it and associate the directory ID with the corresponding organization ID.

### `dsync.deleted`

This event occurs when a Directory Sync connection is deleted in WorkOS, thus tearing down the link between your customer's directory provider and your app.

- | Lifecycle

- | Payload

  #### Sample event object

A connection can be deleted through the [Admin Portal](https://workos.com/docs/admin-portal), [Developer Dashboard](https://dashboard.workos.com), or [WorkOS API](https://workos.com/docs/reference/directory-sync/directory/delete). At this point your app should remove the association between the corresponding organization and its directory, as it no longer exists. Directories, users, and groups are typically deleted if your app offboards a customer altogether.

When receiving a `dsync.deleted` event, you can ignore the connection's `state` attribute, since it indicates the state before the deletion occurs. When a directory is deleted in WorkOS, a sole `dsync.deleted` event is sent.

When a `dsync.deleted` event is received, it indicates that the users and groups in that directory have been deleted in WorkOS. You can process the `dsync.deleted` event accordingly in your application, removing the organization's groups and its users from your application or marking them as deleted. `dsync.user.deleted` and `dsync.group.deleted` events will not be sent for the deleted directory.

***

## Directory user events

### `dsync.user.created`

This event occurs when an IT contact creates a user using their directory provider. It is standard to create and provision the user in your app when you receive this event.

- | Lifecycle

- | Payload

  #### Sample event object

You can add this user to your users table in your app and associate them with the directory ID and organization ID. You can begin to engage with the user at this point, e.g., send the user a "Getting Started" email.

During the initial sync of any directory, you will receive a `dsync.user.created` event for each existing user in the directory.

### `dsync.user.updated`

This event occurs when users' attributes change. These attributes may be [standard attributes](https://workos.com/docs/directory-sync/attributes/standard-attributes), [auto-mapped attributes](https://workos.com/docs/directory-sync/attributes/predefined-attributes), or [custom-mapped attributes](https://workos.com/docs/directory-sync/attributes/custom-attributes).

- | Lifecycle

- | Payload

  #### Sample event object

The payload for `dsync.user.updated` event shows changes between directory group snapshots in the `previous_attributes` property.

The changes in the object are shallow differences for root properties and `custom_attributes`. If the current snapshot has a new attribute that did not exist previously, then the value for the attribute will be indicated as `null`.

### `dsync.user.deleted`

This event occurs when a user is hard-deleted from a directory. Typically, you would remove the user from your app in this case.

- | Lifecycle

- | Payload

  #### Sample event object

When users are removed from a directory, most providers will use a form of soft user deletion. In these cases, rather than receiving a `dsync.user.deleted` event, you will receive a `dsync.user.updated` event with the user's `state` marked as `inactive`.

> After Oct. 19, 2023, all new environments will delete Directory Users that get moved to the "inactive" state. If you would like to retain these users, please reach out to support. You can find [more details here](https://workos.com/docs/directory-sync/handle-inactive-users).

***

## Directory group events

### `dsync.group.created`

This event occurs when creating a directory group in the directory provider. WorkOS also sends this event when a directory connection is established.

- | Lifecycle

- | Payload

  #### Sample event object

When WorkOS ingests this event, it first processes the users in the group. So, in most cases, you would receive `dsync.user.created`, then `dsync.group.created`, and finally, `dsync.group.user_added`.

For more information on best practices for out-of-sequence events, see the [data syncing guide](https://workos.com/docs/events/data-syncing).

### `dsync.group.updated`

This event is sent when an attribute of a directory group has changed.

- | Lifecycle

- | Payload

  #### Sample event object

The payload for `dsync.group.updated` events shows changes between directory group snapshots in the `previous_attributes` property.

The changes in the object are shallow differences for root properties and `custom_attributes`. If the current snapshot has a new attribute that did not exist previously, then the value for the attribute will be indicated as `null`.

### `dsync.group.deleted`

This event occurs when deleting a directory group in the directory provider.

When a `dsync.group.deleted` event is received, it indicates that the members in that group have been deleted in WorkOS. You can process the `dsync.group.deleted` event accordingly in your application, removing the group's members from your application or marking them as deleted. `dsync.group.user_removed` events will not be sent for the members in the deleted group.

- | Lifecycle

- | Payload

  #### Sample event object

If your app relies on groups to sync users or map roles, you should remove access for the users who belonged to the deleted group.

### `dsync.group.user_added`

This event occurs when adding a directory user to a directory group.

- | Lifecycle

- | Payload

  #### Sample event object

If you map roles using groups, you should assign the group's role to the newly added user.

### `dsync.group.user_removed`

This event occurs when removing a directory user from a directory group.

- | Lifecycle

- | Payload

  #### Sample event object

If you map roles using groups, you should remove the group's role from the user who belonged to the group.

***

## Data reconciliation techniques

### With the WorkOS state API

The WorkOS API allows for data reconciliation for your app. You can use the WorkOS API to pull the latest data to reconcile any data discrepancies between WorkOS and your app.

A standard method apps use for data reconciliation is to set up a cron job that pulls from the WorkOS API on a consistent interval, e.g., every 1 to 6 hours, depending on your app's user provisioning volume.

> **Known issue:** Keeping track of WorkOS updated timestamps is of limited use right now because group membership changes for users do not alter the WorkOS `updated_at` timestamp. We're actively working on this issue.

The general approach for performing a full sync of Directory Sync objects goes as follows:

1. Traverse all directory groups and update all local objects.
2. Traverse all directory users and update all local objects.
3. Extract group membership information from each user. Compare with local membership state. Add and remove memberships accordingly.
4. Compare the list of local users to all users seen in WorkOS traversal. Deactivate any users that exist locally but not on WorkOS.
5. Compare the list of local groups to all groups seen on WorkOS traversal. Deactivate any groups that exist locally but not on WorkOS.

### With the events API

You can also reconcile directory data using the events API. See our [data syncing guide](https://workos.com/docs/events/data-syncing/data-reconciliation) to learn more.
