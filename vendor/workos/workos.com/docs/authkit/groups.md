# Groups

## Introduction

Groups let you organize [organization memberships](https://workos.com/docs/authkit/users-organizations) into named collections within an organization. An organization membership represents a single user's access to an organization. A group represents a logical subset of members. A user can belong to zero or more groups.

Groups are native to WorkOS and managed by your application through the API. This is distinct from [directory groups](https://workos.com/docs/directory-sync), which are provisioned by an external identity provider through SCIM.

## Why use groups?

Groups give you a way to model users within teams, departments, or any organizational unit. For example, you might create an "Engineering" group or a "Finance" group to reflect your customer's organizational structure.

Groups unlock capabilities across the WorkOS platform:

- **[Group role assignments](https://workos.com/docs/authkit/group-role-assignments)** — assign roles to a group and have them apply to all of its members automatically.
- **[Resource-scoped access control](https://workos.com/docs/authkit/group-role-assignments)** — grant resource-scoped roles from [FGA](https://workos.com/docs/fga) to a group so all members inherit access to the same resources.

## Managing groups

Groups are managed entirely through the API. You can view the full [Group object](https://workos.com/docs/reference/groups) in the API reference.

> Groups is currently API-only. If you're interested in managing groups through the WorkOS Dashboard, we'd love to hear from you. Please reach out at [support@workos.com](mailto:support@workos.com).

### Creating and updating groups

Create a group within an organization using the [create group API](https://workos.com/docs/reference/groups/create). Each group has a name and belongs to a single organization. You can update a group's name using the [update group API](https://workos.com/docs/reference/groups/update), or remove it entirely with the [delete group API](https://workos.com/docs/reference/groups/delete).

### Adding members

Add an organization membership to a group using the [add group member API](https://workos.com/docs/reference/groups/add-member). Adding a member that already belongs to the group is a no-op, the API returns successfully without creating a duplicate.

### Listing members

Retrieve a paginated list of organization memberships in a group using the [list group members API](https://workos.com/docs/reference/groups/list-members).

### Listing groups for a member

Retrieve a paginated list of groups that an organization membership belongs to using the [list groups for organization membership API](https://workos.com/docs/reference/authkit/organization-membership/list-groups).

### Removing members

Remove an organization membership from a group using the [remove group member API](https://workos.com/docs/reference/groups/remove-member). Removing a member deletes the group membership. The organization membership and the group are unaffected.

## Cascade behavior

Group memberships are automatically cleaned up when the underlying organization membership or organization is removed:

- **Deleting an organization membership** removes group memberships for the organization membership.
- **Deleting a user** removes all of the user's organization memberships, which in turn removes all associated group memberships.
- **Deleting an organization** removes all group memberships before removing the groups themselves.

> No manual cleanup is needed. WorkOS handles cascade deletion to keep group membership data consistent.

## Events

Group lifecycle changes emit [`group.*` events](https://workos.com/docs/events/group) that can be used to trigger workflows in your application or received via [webhooks](https://workos.com/docs/events/data-syncing/webhooks). You can view these events on the [events page](https://dashboard.workos.com/environment/events) of the dashboard.
