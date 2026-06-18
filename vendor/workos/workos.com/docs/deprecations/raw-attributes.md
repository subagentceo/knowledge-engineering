# Migrate from raw_attributes

## Overview

On **April 15, 2026**, two changes take effect across Directory Sync and SSO:

1. **`raw_attributes` will stop returning data.** The field will return an empty object everywhere your integration consumes it:
   - **API responses** — when you fetch [Directory Users](https://workos.com/docs/reference/directory-sync/directory-user), [Directory Groups](https://workos.com/docs/reference/directory-sync/directory-group), or [SSO Profiles](https://workos.com/docs/reference/sso/profile)
   - **Webhooks and Events API** — on all Directory Sync user events (`dsync.user.created`, `dsync.user.updated`, `dsync.user.deleted`) and group events (`dsync.group.created`, `dsync.group.deleted`, `dsync.group.user_added`, `dsync.group.user_removed`)

2. **Top-level `job_title`, `username`, and `emails` will be removed** from [Directory User](https://workos.com/docs/reference/directory-sync/directory-user) objects. These fields will return `null` (or `[]` for `emails`).

> **Your customers do not need to make any changes.** You do not need to coordinate with your customers' IT contacts or ask them to remap anything. See the migration paths below for what you need to do.

***

## Migrating from `raw_attributes`

If your code reads from `raw_attributes` on [Directory Users](https://workos.com/docs/reference/directory-sync/directory-user) or [SSO Profiles](https://workos.com/docs/reference/sso/profile), [contact us](mailto:support@workos.com) and we will automatically set up the equivalent custom attribute mappings across all of your existing connections. You then update your code to read from `custom_attributes` instead.

You can also configure custom attribute mappings yourself from the [IdP Attributes page](https://dashboard.workos.com/environment/identity-provider-attributes) in the Dashboard. See [Custom Attributes for Directory Sync](https://workos.com/docs/directory-sync/attributes/custom-attributes/custom-attributes) or [Custom Attributes for SSO](https://workos.com/docs/sso/attributes/custom-attributes/custom-attributes) for details.

```javascript title="Before"
// Directory Sync - nested fields
const licenseTier =
  user.raw_attributes[
    'urn:ietf:params:scim:schemas:extension:enterprise:2.0:User'
  ]?.license_tier;
const employeeId = user.raw_attributes.customSchemas?.Company?.employeeId;

// SSO
const department = profile.raw_attributes.department;
```

```javascript title="After"
// Directory Sync - custom attributes
const licenseTier = user.custom_attributes.license_tier;
const employeeId = user.custom_attributes.employee_id;

// SSO
const department = profile.custom_attributes.department_name;
```

> **Using AuthKit?** If you access `raw_attributes` via the SSO Profile or Directory User API, the migration above applies to you. Additionally, you can now access IdP attributes directly in AuthKit JWTs and the Organization Membership API - no standalone API call needed. See [Custom Attributes in AuthKit](https://workos.com/docs/authkit/jwt-templates/custom-attributes).

***

## Migrating from legacy standard attributes

If your code reads `job_title`, `username`, or `emails` from the top level of Directory User objects, you can migrate without contacting us:

1. Update your code to read from `custom_attributes` with a fallback to the top-level field, then deploy.
2. Enable the equivalent [predefined attribute](https://dashboard.workos.com/environment/identity-provider-attributes) in the WorkOS Dashboard.

This order ensures no data is missed during the transition - your code handles both locations until the predefined attribute is active.

```javascript title="Before"
const jobTitle = user.job_title;
const emails = user.emails;
const username = user.username;
```

```javascript title="Step 1: Deploy with fallback"
const jobTitle = user.custom_attributes?.job_title ?? user.job_title;
const emails = user.custom_attributes?.emails ?? user.emails;
const username = user.custom_attributes?.username ?? user.username;
```

```javascript title="Step 2: After enabling predefined attributes, clean up"
const jobTitle = user.custom_attributes.job_title;
const emails = user.custom_attributes.emails;
const username = user.custom_attributes.username;
```

> If you use `emails` only to get the user's primary email address, you can use the `email` standard attribute instead, which remains on the top-level Directory User object.

***

## Example payload

```json title="Before"
{
  "id": "directory_user_xxxxx",
  "idp_id": "xyz",
  "email": "marcelina@example.com",
  "job_title": "Software Engineer",
  "username": "marcelinadavis",
  "emails": [
    { "type": "work", "value": "marcelina@example.com", "primary": true }
  ],
  "custom_attributes": {},
  "raw_attributes": {
    "name": { "givenName": "Marcelina", "familyName": "Davis" },
    "userName": "marcelinadavis",
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
      "department": "Engineering",
      "costCenter": "R&D"
    }
  }
}
```

```json title="After"
{
  "id": "directory_user_xxxxx",
  "idp_id": "xyz",
  "email": "marcelina@example.com",
  "custom_attributes": {
    "job_title": "Software Engineer",
    "username": "marcelinadavis",
    "emails": [
      { "type": "work", "value": "marcelina@example.com", "primary": true }
    ],
    "department_name": "Engineering",
    "cost_center_name": "R&D"
  }
}
```

***

## Learn more

- [Custom Attributes for Directory Sync](https://workos.com/docs/directory-sync/attributes/custom-attributes/custom-attributes)
- [Custom Attributes for SSO](https://workos.com/docs/sso/attributes/custom-attributes/custom-attributes)
- [Predefined Attributes](https://workos.com/docs/directory-sync/attributes/custom-attributes/predefined-attributes)
- [Custom Attributes in AuthKit](https://workos.com/docs/authkit/jwt-templates/custom-attributes) - [Changelog](https://workos.com/changelog/custom-attributes-in-authkit)
- [SAML Custom Attributes](https://workos.com/changelog/saml-custom-attributes)
- [OIDC Attributes](https://workos.com/changelog/oidc-attributes)
