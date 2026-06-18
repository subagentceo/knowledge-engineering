# Migrate from Better Auth

## Introduction

You can migrate your existing user data from a variety of sources into WorkOS using the AuthKit API. This guide will walk you through the steps to export your data from Better Auth, and import into WorkOS.

***

## (1) Export Better Auth data

Better Auth stores user data directly in your database, which means you have full control over exporting your data. Unlike hosted authentication services, Better Auth does not provide a built-in export tool, but you can access your data directly through your database.

### Accessing your database

Better Auth uses [multiple database tables](https://www.better-auth.com/docs/concepts/database) to store authentication data. The main tables you'll need to export are:

- **user**: Contains core user information (`id`, `name`, `email`, `emailVerified`, `image`, timestamps)
- **account**: Stores provider-specific authentication data, including password hashes for credential-based accounts
- **organization**: Available when using the [organization plugin](https://www.better-auth.com/docs/plugins/organization)
- **member**: Mapping of users (and their roles) to organizations

You can export this data using your database's native export tools, your ORM (for example, Prisma), or direct SQL queries.

### Exporting user data

To export users, query the `user` table directly.

```sql
SELECT * FROM user;
```

You can export this data to JSON, CSV, or any format that works for your migration script.

### Exporting passwords

Better Auth stores password hashes in the `account` table with `providerId` set to `'credential'`. The passwords are hashed using [scrypt by default](https://www.better-auth.com/docs/authentication/email-password), though Better Auth supports custom hashing functions.

To export password hashes, query the `account` table:

```sql
SELECT userId, password
FROM account
WHERE providerId = 'credential';
```

If you're using a custom password hashing algorithm in Better Auth, make note of the algorithm for the import step. The default is `scrypt`, which is supported by WorkOS.

***

## (2) Import users into WorkOS

Once you've exported your user data from Better Auth, you can import it into WorkOS.

### Using the WorkOS migrations CLI

The fastest way to import users is with the CLI:

```bash
npx workos migrations import --csv better-auth-users.csv
```

Or for a guided experience: `npx workos migrations wizard`

### Using WorkOS APIs

With the data from your Better Auth database, you can use the [Create User API](https://workos.com/docs/reference/authkit/user/create) to import each user. The API is rate-limited, so for large migrations, you may want to implement batching with appropriate delays. You can view the [rate limits](https://workos.com/docs/reference/rate-limits) documentation for more information.

Using the Better Auth user table schema, use the following mapping to Create User API parameters:

| Better Auth     |     | WorkOS           |
| --------------- | --- | ---------------- |
| `email`         | →   | `email`          |
| `emailVerified` | →   | `email_verified` |
| `name`          | →   | `first_name`     |
| `name`          | →   | `last_name`      |
| `image`         | →   | (not supported)  |

> Better Auth stores a single `name` field, while WorkOS has separate `first_name` and `last_name` fields. You'll need to parse the name field or use it entirely for `first_name`.

Here's an example migration script:

```typescript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

async function migrateUsers(betterAuthUsers) {
  for (const user of betterAuthUsers) {
    // Parse name into first and last name if possible
    const [firstName, ...lastNameParts] = user.name.split(' ');
    const lastName = lastNameParts.join(' ') || undefined;

    try {
      // In the JavaScript SDK, the property names are camelCase
      const workosUser = await workos.userManagement.createUser({
        email: user.email,
        emailVerified: user.emailVerified,
        firstName: firstName,
        lastName: lastName,
      });

      console.log(`Migrated user: ${user.email} -> ${workosUser.id}`);
    } catch (error) {
      console.error(`Failed to migrate user ${user.email}:`, error);
    }
  }
}
```

### Importing passwords

If you exported password hashes from Better Auth, you can import them during the [user creation](https://workos.com/docs/reference/authkit/user/create) process, or later using the [Update User API](https://workos.com/docs/reference/authkit/user/update).

Better Auth uses `scrypt` as the default password hashing algorithm, which is supported by WorkOS. Make sure to pass the following parameters:

- The `password_hash_type` set to `'scrypt'`
- The `password_hash` set to the password hash value from your Better Auth `account` table

The password hash should be in PHC string format. If Better Auth is storing raw scrypt hashes, you'll need to convert them to PHC format. See the [other services migration guide](https://workos.com/docs/migrate/other-services/2-importing-users-into-workos/importing-passwords) for detailed information about PHC format parameters for scrypt.

If you configured Better Auth to use a different password hashing algorithm, such as bcrypt, argon2, or pbkdf2, WorkOS supports these as well. Refer to the [password hash types](https://workos.com/docs/migrate/other-services/2-importing-users-into-workos/importing-passwords) documentation for format requirements.

### Migrating social auth users

If you have users who previously signed in through Better Auth using social auth providers, such as [Google](https://workos.com/docs/integrations/google-oauth) or [Microsoft](https://workos.com/docs/integrations/microsoft-oauth), those users can continue to sign in with those providers after you've migrated.

Better Auth stores social auth accounts in the `account` table with different `providerId` values (e.g., `'google'`, `'github'`, `'microsoft'`). These accounts are linked to users via the `userId` field.

Check out our [integrations](https://workos.com/docs/integrations) page for guidance on configuring the relevant provider's client credentials. After your provider is configured, users can sign in with their provider credentials and will be automatically linked to a user. The **email address** from the social auth provider is used to determine this match.

> Some users may need to verify their email address through WorkOS if email verification is enabled in your environment's authentication settings.

Email verification behavior varies depending on whether the provider is known to verify email addresses. For example, users signing in using Google OAuth and a `gmail.com` email domain will not need to perform the extra verification step.

***

## (3) Organizations

Better Auth has an [organization plugin](https://www.better-auth.com/docs/plugins/organization) that allows you to manage organization members and teams. If you're using this plugin, you can migrate your organizations to WorkOS, which has native support for [Organizations](https://workos.com/docs/reference/organization) as a core B2B feature.

### Creating Organizations

Better Auth stores organizations in an `organization` table with fields like `id`, `name`, `slug`, `logo`, and `metadata`. To migrate these, you'll need to:

1. Export organizations from your Better Auth database:

```sql
SELECT * FROM organization;
```

2. Create matching organizations using the [Create Organization API](https://workos.com/docs/reference/organization/create):

```typescript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

async function migrateOrganizations(betterAuthOrgs) {
  for (const org of betterAuthOrgs) {
    try {
      const workosOrg = await workos.organizations.createOrganization({
        name: org.name,
        // You may want to store the Better Auth slug in organization metadata
        metadata: {
          betterAuthSlug: org.slug,
        },
      });

      console.log(`Migrated organization: ${org.name} -> ${workosOrg.id}`);

      // Store this mapping for migrating user memberships later
      orgIdMap.set(org.id, workosOrg.id);
    } catch (error) {
      console.error(`Failed to migrate organization ${org.name}:`, error);
    }
  }
}
```

### Adding organization memberships

Better Auth stores organization memberships in a `member` table that links users (and their roles) to organizations.

```sql
SELECT * FROM member;
```

Then use the [Organization Membership API](https://workos.com/docs/reference/authkit/organization-membership/create) to add each user to their respective organization.

WorkOS offers RBAC capabilities through [roles and permissions](https://workos.com/docs/authkit/roles-and-permissions). When migrating, identify your roles defined in Better Auth, then create equivalent roles in the WorkOS Dashboard, and assign roles during migration by specifying the `roleSlug` parameter when creating organization memberships. If your Better Auth implementation uses complex RBAC policies with custom resources and actions, you may need to simplify to standard roles or implement custom authorization in your application logic.

```typescript
async function migrateMemberships(betterAuthMemberships, orgIdMap, userIdMap) {
  for (const membership of betterAuthMemberships) {
    const orgId = orgIdMap.get(membership.organizationId);
    const userId = userIdMap.get(membership.userId);

    if (!orgId || !userId) {
      console.error(`Missing mapping for membership: ${membership.id}`);
      continue;
    }

    try {
      await workos.userManagement.createOrganizationMembership({
        userId: userId,
        organizationId: orgId,
        // Better Auth uses custom role strings; map these to WorkOS roles as needed
        roleSlug: getRole(membership.role),
      });

      console.log(`Migrated membership: ${membership.userId} -> ${orgId}`);
    } catch (error) {
      console.error(`Failed to migrate membership:`, error);
    }
  }
}
```

### Migrating teams

If you're using the teams feature within Better Auth (an optional hierarchical level within organizations), note that there is not a directly corresponding "teams" concept. However, you have several options:

1. **Convert to organizations**: Create separate organizations for each Better Auth team
2. **Use organization metadata**: Store team information in organization metadata
3. **Use RBAC roles**: Represent team membership through custom roles in [role-based access control](https://workos.com/docs/rbac/quick-start)

For most B2B applications, flattening teams into separate organizations provides the cleanest migration path and takes full advantage of enterprise features like SSO and Directory Sync, which operate at the organization level.

***

## (4) Special considerations

There are several differences between Better Auth and WorkOS that you should be aware of during migration.

### Multi-Factor Authentication

Better Auth offers a [Two-Factor Authentication plugin](https://www.better-auth.com/docs/plugins/2fa) that supports TOTP-based authenticators. If your Better Auth users have enrolled in 2FA, they will need to re-enroll in MFA after migrating, as MFA secrets cannot be migrated for security reasons. See the [MFA guide](https://workos.com/docs/authkit/mfa) for information on enrolling users in MFA.

> WorkOS does not support SMS-based factors due to known security vulnerabilities with SMS.

### Account linking behavior

Better Auth has sophisticated [account linking capabilities](https://www.better-auth.com/docs/concepts/users-accounts#account-linking) that automatically link social accounts with matching verified email addresses. WorkOS also supports automatic account linking based on email addresses. When migrating users who have multiple linked accounts in Better Auth (e.g., password + Google OAuth), you should:

1. Import the user once with their primary email
2. Configure the relevant social providers
3. When users sign in with their social provider, they will automatically be linked with the accounts based on email match

### Handling interim new users

If your application allows users to sign up at any time, you should [consider the timing of your migration](https://workos.com/docs/migrate/other-services/4-handling-interim-new-users). Users who sign up after you've exported data from Better Auth but before you've switched to WorkOS for authentication will be omitted from the migration.

There are two main strategies to handle this:

#### (A) Disable signups during migration

Schedule an appropriate time for the migration and temporarily disable signup functionality. This can be controlled using a feature flag in your application. After the migration is complete and your application is using WorkOS for authentication, re-enable signups.

#### (B) Use a dual-write strategy

For applications that cannot disable signups, implement a "dual-write" strategy. When a new user signs up, create records in both your Better Auth database and WorkOS using the [Create User API](https://workos.com/docs/reference/authkit/user/create). This keeps WorkOS synchronized with new users, though you'll still need to perform the historical user migration. Be aware that you'll need to keep user updates (email changes, password changes) synchronized between both systems until the migration is complete.

### Database-specific considerations

Since Better Auth stores data in your own database, you have flexibility in how you structure the migration:

- You can keep Better Auth tables in your database during a transition period
- Consider implementing a gradual rollout where some users authenticate via WorkOS while others continue using Better Auth
- Database schema is extensible, so custom fields will need to be handled separately (consider using [user metadata](https://workos.com/docs/authkit/metadata) for custom data)

***

## Next steps

With your users and organizations now imported, you can start using WorkOS to manage authentication for your application. If you haven't already, take a look at our [Quick Start guide](https://workos.com/docs/authkit) to learn how to integrate AuthKit into your application.

These enterprise-ready features go beyond basic authentication:

- **[Single Sign-On](https://workos.com/docs/sso)**: Enable SAML and OIDC SSO for enterprise customers
- **[Directory Sync](https://workos.com/docs/directory-sync)**: Automatically provision and deprovision users from identity providers
- **[Admin Portal](https://workos.com/docs/admin-portal)**: Allow your customers to self-serve SSO and Directory Sync configuration
- **[Audit Logs](https://workos.com/docs/audit-logs)**: Track security-relevant events in your application

If you have questions about your migration or need assistance, reach out to [support@workos.com](mailto:support@workos.com).
