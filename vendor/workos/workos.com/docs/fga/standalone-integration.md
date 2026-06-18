# Standalone Integration

## Introduction

FGA works with any authentication system. While [AuthKit](https://workos.com/docs/fga/authkit-integration) provides built-in user management, you can integrate FGA standalone by managing users, organizations, and organization memberships through the API.

Use standalone integration when you have an existing authentication system, are migrating from another identity provider, or need programmatic control over user provisioning.

***

## Core concepts

FGA authorization is built on three entities:

**Users** represent individuals in your application. Each has a unique ID, email, and profile information.

**Organizations** represent your customers or tenants. They serve as the root of your resource hierarchy.

**Organization memberships** connect users to organizations and assign an organization-scoped role. Every membership must have at least one role—this determines baseline permissions within the organization.

The organization membership role is always scoped to the organization itself, not to specific resources. For resource-level access control, use [role assignments](https://workos.com/docs/fga/assignments) on individual resources.

If you want to grant access exclusively through resource-scoped roles, configure the default organization-scoped role to have no permissions. Users will start with no access and only gain permissions through explicit resource role assignments.

> **Note:** Organization-scoped roles can be either environment-level roles (which apply across all organizations) or [custom roles](https://workos.com/docs/rbac/custom-roles) (which are defined per-organization). Both types can serve as the membership role.

***

## Creating organizations

Organizations are the tenants in your application. Create one for each customer:

The `external_id` maps to your internal customer identifier—typically the primary key from your database.

| Parameter     | Description                                     |
| ------------- | ----------------------------------------------- |
| `name`        | Display name for the organization (required)    |
| `external_id` | Your internal identifier for this customer      |
| `domain_data` | Email domains associated with this organization |
| `metadata`    | Custom key-value pairs for your application     |

***

## Creating users

Create users in WorkOS to establish their identity for authorization:

| Parameter        | Description                                |
| ---------------- | ------------------------------------------ |
| `email`          | User's email address (required)            |
| `first_name`     | User's first name                          |
| `last_name`      | User's last name                           |
| `email_verified` | Set to `true` if you've verified the email |
| `external_id`    | Your internal user identifier              |
| `password`       | Password for email/password authentication |
| `password_hash`  | Pre-hashed password for migrations         |
| `metadata`       | Custom key-value pairs                     |

***

## Creating organization memberships

Organization memberships connect users to organizations and assign their organization-scoped role:

The `role_slug` determines the user's organization-scoped permissions. If omitted, the user receives the default role configured in your environment. This role applies to the organization as a whole—for resource-specific access, use [role assignments](https://workos.com/docs/fga/assignments).

If you've enabled [multiple roles](https://workos.com/docs/authkit/roles-and-permissions/multiple-roles), assign several roles at once with `role_slugs`:

```javascript
const membership = await workos.userManagement.createOrganizationMembership({
  userId: 'user_01HXYZ',
  organizationId: 'org_01HXYZ',
  roleSlugs: ['admin', 'billing'],
});
```

***

## Using FGA with standalone users

Once you've created users and memberships, FGA works as documented in other guides. The organization membership ID is the subject for all authorization operations.

### Creating resources

Register resources as your application entities are created:

### Assigning resource roles

Grant users roles on specific resources:

### Checking permissions

Check whether a user can perform an action on a resource:

***

## User lifecycle

Sync WorkOS records as users move through your application's lifecycle. Use the `external_id` field to map your internal IDs to WorkOS entities.

### When a user signs up

Create the WorkOS user and organization membership when a user signs up in your application:

### When organization-scoped roles change

Update the organization membership when a user's role changes:

### When resource access changes

Create or remove role assignments when a user's access to specific resources changes:

### When a user is removed

Delete the organization membership or user when they leave:

```javascript
// Remove from one organization
await workos.userManagement.deleteOrganizationMembership('om_01HXYZ');

// Or delete the user entirely (removes all memberships)
await workos.userManagement.deleteUser('user_01HXYZ');
```

***

## Managing entities

For complete API documentation on managing users, organizations, and memberships, see the API reference:

- [Users](https://workos.com/docs/reference/authkit/user) – create, update, list, and delete users
- [Organizations](https://workos.com/docs/reference/organization) – create, update, list, and delete organizations
- [Organization Memberships](https://workos.com/docs/reference/authkit/organization-membership) – create, update, deactivate, and delete memberships

***

## Viewing users in the dashboard

Users created via API appear in the WorkOS Dashboard. Navigate to **Users** to see all users in your environment, or **Organizations** to view members of a specific organization.

![Dashboard showing users](https://images.workoscdn.com/images/54fa6e6c-4c6f-4959-9301-344aeb4eeac8.png?auto=format\&fit=clip\&q=80)

View a user's resource-scoped role assignments by navigating to their organization membership.

![FGA role assignments](https://images.workoscdn.com/images/c9a27787-a97c-4e8b-ac86-05cba25374ae.png?auto=format\&fit=clip\&q=50)

***

## Migrating from another system

To migrate from another identity provider, export your users and import them into WorkOS using the APIs described above. You can import password hashes so users keep their existing credentials, and use a dual-write strategy to handle new signups during migration.

See the [migration guides](https://workos.com/docs/migrate/other-services) for detailed steps, including provider-specific guides for [Auth0](https://workos.com/docs/migrate/auth0), [Firebase](https://workos.com/docs/migrate/firebase), [Clerk](https://workos.com/docs/migrate/clerk), and [others](https://workos.com/docs/migrate).
