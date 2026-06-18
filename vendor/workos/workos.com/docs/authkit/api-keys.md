# API Keys

## Introduction

API keys provide a secure way for your application's users to authenticate with your API. With the [API Keys Widget](https://workos.com/docs/widgets/api-keys), your customers can create and revoke [organization](https://workos.com/docs/authkit/users-organizations/organizations)-scoped and user-scoped API keys with a simple component. The WorkOS API and SDKs provide functions for your API code to validate keys.

API keys are one of two ways WorkOS enables you to issue credentials to your customers that they use to programmatically access your application. The other is [M2M applications](https://workos.com/docs/authkit/connect/m2m). The [API Keys vs M2M Applications guide](https://workos.com/blog/api-keys-vs-m2m-applications) can help you decide which is best for your use case.

## Configuring API keys

Before your users can manage API keys, you need to configure your WorkOS environment.

### Setting up role permissions

To enable organization-scoped API key management for your users, ensure at least one role includes the `widgets:api-keys:manage` permission. To enable user-scoped API key management, use `widgets:user-api-keys:manage-self` for a user's own API keys or `widgets:user-api-keys:manage-all` for API keys across the organization.

You can [assign permissions to roles](https://workos.com/docs/authkit/roles-and-permissions/configure-roles-and-permissions/assign-permissions-to-roles) in the WorkOS Dashboard under *Authorization*.

### Configuring available permissions

You can control which permissions your users can assign to API keys by configuring API key permissions in your environment.

For example, you might create permissions like:

- `posts:read` - Read access to posts
- `posts:write` - Write access to posts
- `users:read` - Read access to user data

By configuring only `posts:read` and `posts:write` as available API key permissions, your users can create API keys with granular access controls, such as read-only keys that only have the `posts:read` permission.

You can configure API key permissions in the WorkOS Dashboard under *Authorization > Configuration > Organization API key permissions*. User-scoped API keys can only use permissions that are enabled for user API keys.

## API key management in your application

### Using the API Keys Widget

The easiest way to enable API key management for your users is through the [API Keys Widget](https://workos.com/docs/widgets/api-keys). This widget provides a complete interface for creating, viewing, and revoking API keys.

Use the default `scope="organization"` mode when users should manage API keys owned by their organization. Use `scope="user"` when users should manage API keys owned by individual users.

The widget allows your users to:

- Create new API keys with custom names
- Select specific permissions for each key
- View existing API keys (with obfuscated values for security)
- Revoke API keys when they're no longer needed

The widget interacts with the WorkOS API and renders the user interface in your app, so your customers get full control over their API keys in just a few lines of code.

### Managing API keys via the API

You can also manage API keys programmatically using the WorkOS API. This is useful for building custom API key management interfaces or automating key lifecycle operations.

- [List API keys](https://workos.com/docs/reference/authkit/api-keys/list-for-organization) for an organization
- [Create an API key](https://workos.com/docs/reference/authkit/api-keys/create-for-organization) for an organization
- [List API keys](https://workos.com/docs/reference/authkit/api-keys/list-for-user) for a user
- [Create an API key](https://workos.com/docs/reference/authkit/api-keys/create-for-user) for a user
- [Delete an API key](https://workos.com/docs/reference/authkit/api-keys/delete)

The full API key value is only returned in the create response. Store it securely when the key is created; subsequent list, validate, and object responses only include an obfuscated value.

API key ownership is available on the `owner` field. Organization-owned keys have `owner.type: "organization"` and an organization ID in `owner.id`. User-owned keys have `owner.type: "user"`, a user ID in `owner.id`, and the organization the key can access in `owner.organization_id`.

User-owned API keys are tied to the user's organization membership. If that membership is deleted, any user-owned API keys for that membership are revoked.

## Validating API keys

Once API keys have been created, your application needs to validate these keys when they're used to authenticate API requests. When an API request includes an API key (typically in the `Authorization` header), your application should validate it with WorkOS to ensure it's legitimate and retrieve the associated permissions.

The [validate API key endpoint](https://workos.com/docs/reference/authkit/api-keys/validate) returns the complete [API key object](https://workos.com/docs/reference/authkit/api-keys), including:

- The organization or user that owns the key
- The permissions assigned to the key
- Usage metadata like creation and last-used timestamps

This information allows your application to not only authenticate the request but also authorize it based on the specific permissions granted to that API key.

#### Next.js

#### Express

#### Flask

## Viewing API keys in the WorkOS Dashboard

You can view your customers' API keys through the WorkOS Dashboard or via the API.

To view organization-owned API keys:

1. Navigate to the **Organizations** section in your WorkOS Dashboard
2. Click on the organization you want to view
3. Select the **API Keys** tab

To view user-owned API keys:

1. Navigate to the **Users** section in your WorkOS Dashboard
2. Click on the user you want to view
3. Select the **API keys** tab

From these views, you can see API key details including names, obfuscated key values, creation dates, and last usage information. User-owned API keys also show the organization each key can access.

You can also [list organization-owned API keys](https://workos.com/docs/reference/authkit/api-keys/list-for-organization) and [list user-owned API keys](https://workos.com/docs/reference/authkit/api-keys/list-for-user) via the API.

## Auditing API key usage

API key lifecycle changes are tracked via the [`api_key.created`](https://workos.com/docs/events/api-key), [`api_key.updated`](https://workos.com/docs/events/api-key), and [`api_key.revoked`](https://workos.com/docs/events/api-key) events. You can view these events in the [events page](https://dashboard.workos.com/environment/events) or listen for them in your application via the [events API](https://workos.com/docs/events).
