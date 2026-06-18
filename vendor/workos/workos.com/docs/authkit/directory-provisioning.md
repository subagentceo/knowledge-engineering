# Directory Provisioning

> Please reach out to [support@workos.com](mailto:support@workos.com) or via your team's WorkOS Slack channel if you would like Directory Provisioning enabled.

## Introduction

Directory provisioning gives IT contacts full control over user and membership management, eliminating the need for manually adding or removing members. Users from a directory are pre-provisioned and managed by their [Identity Provider](https://workos.com/docs/glossary/idp).

## Initial configuration

A [Directory Sync](https://workos.com/docs/directory-sync) integration will need to be configured for every organization that wants to source users and memberships via directory provisioning. Directories can be set up via the [WorkOS Dashboard](https://dashboard.workos.com/) with [Setup Links](https://workos.com/docs/admin-portal/a-setup-link-from-workos-dashboard). You can also [integrate the Admin Portal with your app](https://workos.com/docs/admin-portal/b-integrate-with-your-app) to generate links to configure directories.

### Supported directory providers

Directory provisioning is supported for all SCIM directory providers, Google Workspace, and SFTP.

## Provision users from a directory

Users provisioned through a directory with an email domain matching a verified organization domain will be automatically added as members of the organization, without needing an invitation.

Other users are created with `pending` memberships and receive an email [invitation](https://workos.com/docs/authkit/invitations) to join the organization. Pending members cannot sign in until the invitation is accepted, at which point they become active organization members.

> [Invitation emails](https://workos.com/docs/authkit/custom-emails/disabling-default-emails) can be disabled if you prefer to manage invitations with a custom approach.

## Manage users from a directory

In addition to provisioning new users, any updates to existing users and de-provisioning events will be reflected in AuthKit.

Users with email addresses matching one of the organization's verified domains are fully managed by the directory. Updates to their attributes from the directory will override changes made through SSO, the API, or manually in the dashboard.

> If multiple organizations with directory provisioning contain the same verified domain, the user's name will always reflect the most recent directory update.

Other users, with email domains not verified by the organization, will not be fully managed by the directory, so updates made via SSO, API, or manually in the dashboard will persist.

When a user is de-provisioned in the directory, the [status](https://workos.com/docs/reference/authkit/organization-membership) of their corresponding organization membership will be set to `inactive`. While the user will no longer be able to sign in to the organization, the membership and user are not automatically deleted.

If a user is re-provisioned in the directory, their organization membership will be reactivated with its previous role and its [status](https://workos.com/docs/reference/authkit/organization-membership) will be set to `active`.

## Custom attributes

When using directory provisioning, [custom attributes](https://workos.com/docs/directory-sync/attributes) configured on directory users are available on the corresponding organization membership. This allows you to access IdP-sourced attributes like department, job title, and cost center directly from the [membership object](https://workos.com/docs/reference/authkit/organization-membership) or in [JWT templates](https://workos.com/docs/authkit/jwt-templates).

When a directory user's attributes are updated, the changes are automatically reflected on the linked organization membership's `custom_attributes`.

> If the membership is also linked to an [SSO Profile](https://workos.com/docs/reference/sso/profile), the directory user's custom attributes take precedence.

## Directory provisioning actions

Below is a list of directory provisioning and deprovisioning actions and the corresponding changes triggered in AuthKit. If you're using standalone Directory Sync, refer to the [standalone Directory Sync documentation](https://workos.com/docs/directory-sync/api-overview/directory).

Actions depend on the user's email domain:

- A user is domain-managed when their email domain matches one of the [organization's verified domains](https://workos.com/docs/reference/domain-verification). These users are fully managed by the directory.
- A user is a domain guest when their email domain does not match one of the [organization's verified domains](https://workos.com/docs/reference/domain-verification). Changes only impact the linked organization membership.

| Directory Action                                     | Changes triggered in WorkOS                                                                                                                                                                                                                                                                                    | Event(s) Emitted                                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Directory user provisioned                           | [User](https://workos.com/docs/reference/authkit/user) and [organization membership](https://workos.com/docs/reference/authkit/organization-membership) objects created. Domain-managed users are created with an active status, while domain guest users are invited to the organization with a pending status.                                             | [user.created](https://workos.com/docs/events/user), [organization\_membership.created](https://workos.com/docs/events/organization-membership) |
| Directory user info updated                          | For domain-managed users, any updates to the user's name will be reflected on the [user](https://workos.com/docs/reference/authkit/user) object. Otherwise, the user object will not be modified. User email address is always immutable. The user's organization membership role will be re-synced to match the IdP role assignment. | [user.updated](https://workos.com/docs/events/user), [organization\_membership.updated](https://workos.com/docs/events/organization-membership) |
| Directory user with active membership deprovisioned  | Organization membership deactivated and all sessions for the user are revoked. Their role is reset to the default role.                                                                                                                                                                                        | [organization\_membership.updated](https://workos.com/docs/events/organization-membership)                               |
| Directory user with pending membership deprovisioned | Organization membership deleted.                                                                                                                                                                                                                                                                               | [organization\_membership.deleted](https://workos.com/docs/events/organization-membership)                               |
| Directory user reactivated                           | Organization membership reactivated.                                                                                                                                                                                                                                                                           | [organization\_membership.updated](https://workos.com/docs/events/organization-membership)                               |

***

## Frequently asked questions

### I am using directory provisioning, but some directory users aren't being provisioned in AuthKit. Why would a directory user not be provisioned in AuthKit?

Directory users need to have a primary email address to be provisioned in AuthKit. If the directory user is missing a primary email, they won't be provisioned. Additionally, if the primary email of a directory user is shared by another directory user, only one will be provisioned in AuthKit, as emails are unique to AuthKit users.

### If a user's email is changed in the directory, will this change be reflected on the user's email in WorkOS?

The email address on the [User object](https://workos.com/docs/reference/authkit/user) is immutable, but the email on the underlying [directory user](https://workos.com/docs/reference/directory-sync/directory-user) object will be modified.

### Why is there a distinction between domain-managed users and domain guest users?

For domain-managed users, the organization has proven they own the email domain through [domain verification](https://workos.com/docs/authkit/domain-verification), and therefore have full control over the user's account and email. This allows the directory to manage all aspects of the [user object](https://workos.com/docs/reference/authkit/user).

For domain guests, the organization has not proven ownership of the user's email domain. As a result, the organization only has the ability to manage data within the scope of the organization itself, represented by the [organization membership object](https://workos.com/docs/reference/authkit/organization-membership).

### Why aren't organization memberships deactivated when a directory is deleted?

User deprovisioning and directory deletion have different behaviors because they serve different use cases. Deactivating all users is typically an off-boarding task that affects the entire organization, not just the directory. By leaving memberships active when a directory is deleted, customers can switch directory providers without the disruption of deactivating all memberships.
