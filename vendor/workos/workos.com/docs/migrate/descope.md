# Migrate from Descope

## Introduction

The AuthKit API allows you to migrate your existing user data from a variety of existing sources. In this guide, we will walk through the steps to export, and then import your users from Descope.

***

## (1) Export Descope data

Descope allows you to export user data through their [Management API](https://docs.descope.com/api/management/users) or directly from the Descope console.

You can export user data programmatically using the [Search Users endpoint](https://docs.descope.com/management/user-management/user-exporting). The `searchAll()` function in the Descope Backend SDKs retrieves a comprehensive list of users. Submitting an empty request payload will return all users:

```bash
curl -X POST https://api.descope.com/v1/mgmt/user/search \
  -H 'Authorization: Bearer <ProjectId>:<ManagementKey>' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

Alternatively, you can export users directly from the [Descope console](https://docs.descope.com/management/user-management/user-exporting) by selecting users on the users page and clicking the "Export CSV" button.

### Exporting passwords

If your Descope users currently sign in using password-based authentication, and you'd like to import those passwords, you'll need to [contact Descope support](https://docs.descope.com/management/user-management/user-exporting).

Descope does not make hashed passwords available through their Backend APIs. After opening a support ticket, Descope can generate a CSV file containing your users' data including password hashes and facilitate a secure data transfer.

Descope supports multiple password hashing algorithms including bcrypt, argon2, pbkdf2, and others. When you receive the password export from Descope support, make note of which hashing algorithm was used, as you'll need this information when importing.

***

## (2) Import users into WorkOS

Once you've obtained the necessary export data from Descope, you can import your users into WorkOS.

### Using the WorkOS migrations CLI

The fastest way to import users is with the CLI:

```bash
npx workos migrations import --csv descope-users.csv
```

Or for a guided experience: `npx workos migrations wizard`

### Using WorkOS APIs

With the data from Descope's user export, you can use the [Create User API](https://workos.com/docs/reference/authkit/user/create) to import each user. The API is rate-limited, so for large migrations, you may want to implement batching with appropriate delays. You can view the [rate limits](https://workos.com/docs/reference/rate-limits) documentation for more information.

Using the fields from the Descope export, use the following mapping from Descope to parameters in your Create User API calls:

| Descope         |     | WorkOS API       |
| --------------- | --- | ---------------- |
| `email`         | →   | `email`          |
| `givenName`     | →   | `first_name`     |
| `familyName`    | →   | `last_name`      |
| `verifiedEmail` | →   | `email_verified` |

Here's an example migration script:

### Import passwords

If you also exported passwords from Descope support, you can import them during the [user creation](https://workos.com/docs/reference/authkit/user/create) process, or later using the [Update User API](https://workos.com/docs/reference/authkit/user/update).

WorkOS supports the following password hashing algorithms that Descope uses:

- `bcrypt`
- `argon2`
- `pbkdf2`

When importing passwords, pass the following parameters to the WorkOS API based on the hash format Descope provided:

- The `password_hash_type` set to the appropriate algorithm (e.g., `'bcrypt'`, `'argon2'`, or `'pbkdf2'`)
- The `password_hash` set to the password hash value from your Descope export

For `argon2` and `pbkdf2` passwords, WorkOS expects the PHC string format. Refer to the [other services migration guide](https://workos.com/docs/migrate/other-services/2-importing-users-into-workos/importing-passwords) for detailed formatting requirements for these hash types.

- | Without passwords

  ```typescript
  import { WorkOS } from '@workos-inc/node';

  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  async function migrateUsers(descopeUsers) {
    for (const user of descopeUsers) {
      try {
        // In the JavaScript SDK, the property names are camelCase
        const workosUser = await workos.userManagement.createUser({
          email: user.email,
          emailVerified: user.verifiedEmail,
          firstName: user.givenName,
          lastName: user.familyName,
        });

        console.log(`Migrated user: ${user.email} -> ${workosUser.id}`);
      } catch (error) {
        console.error(`Failed to migrate user ${user.email}:`, error);
      }
    }
  }
  ```

- | With passwords

  ```typescript
  import { WorkOS } from '@workos-inc/node';

  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  async function migrateUsersWithPasswords(descopeUsers) {
    for (const user of descopeUsers) {
      try {
        const workosUser = await workos.userManagement.createUser({
          email: user.email,
          emailVerified: user.verifiedEmail,
          firstName: user.givenName,
          lastName: user.familyName,
          // Include password hash if available from Descope export
          passwordHash: user.passwordHash,
          passwordHashType: user.passwordHashType, // 'bcrypt', 'argon2', or 'pbkdf2'
        });

        console.log(
          `Migrated user with password: ${user.email} -> ${workosUser.id}`,
        );
      } catch (error) {
        console.error(`Failed to migrate user ${user.email}:`, error);
      }
    }
  }
  ```

### Migrate social auth users

If you have users who previously signed in through Descope using social auth providers, such as [Google](https://workos.com/docs/integrations/google-oauth) or [Microsoft](https://workos.com/docs/integrations/microsoft-oauth), those users can continue to sign in with those providers after you've migrated.

Check out the [integrations](https://workos.com/docs/integrations) page for guidance on configuring the relevant provider's client credentials.

After your provider is configured, users can sign in with their provider credentials and will be automatically linked to a WorkOS user. WorkOS uses the **email address** from the social auth provider to determine this match.

> Some users may need to verify their email address through WorkOS if email verification is enabled in your environment's authentication settings.

Email verification behavior varies depending on whether the provider is known to verify email addresses. For example, users signing in using Google OAuth and a `gmail.com` email domain will not need to perform the extra verification step.

***

## (3) Organizations

Descope has a concept of ["Tenants"](https://docs.descope.com/b2b) which are analogous to [WorkOS Organizations](https://workos.com/docs/reference/organization), in that both represent a B2B customer or organization within your application.

### Creating Organizations

If you'd like to export your Descope tenants, you can use the [Descope Management API](https://docs.descope.com/management/tenant-management/sdks) to programmatically retrieve each tenant. You can then call the [Create Organization API](https://workos.com/docs/reference/organization/create) to create matching Organizations in WorkOS.

When creating Organizations in WorkOS, you can map the following fields from Descope tenants:

| Descope Tenant |     | WorkOS Organization |
| -------------- | --- | ------------------- |
| `name`         | →   | `name`              |
| `id`           | →   | `external_id`       |

Storing the Descope tenant ID as the `external_id` in WorkOS can help you maintain a reference between the two systems during migration.

Here's an example migration script:

```typescript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

async function migrateOrganizations(descopeTenants) {
  const orgIdMap = new Map();

  for (const tenant of descopeTenants) {
    try {
      const workosOrg = await workos.organizations.createOrganization({
        name: tenant.name,
        // Store the Descope tenant ID for reference
        externalId: tenant.id,
      });

      console.log(`Migrated organization: ${tenant.name} -> ${workosOrg.id}`);

      // Store this mapping for migrating user memberships later
      orgIdMap.set(tenant.id, workosOrg.id);
    } catch (error) {
      console.error(`Failed to migrate organization ${tenant.name}:`, error);
    }
  }

  return orgIdMap;
}
```

### Adding user memberships

Once you've created Organizations in WorkOS, you can add users to their respective organizations using the [Organization Membership API](https://workos.com/docs/reference/authkit/organization-membership/create).

In Descope, users can be associated with tenants, and this information is available when you export users via the Search Users API. Use this tenant association data to create the corresponding organization memberships in WorkOS.

RBAC capabilities are available through [roles and permissions](https://workos.com/docs/authkit/roles-and-permissions). When migrating, identify your roles defined in Descope, then create equivalent roles in [the dashboard](https://dashboard.workos.com/environment/authorization), and assign roles during migration by specifying the `roleSlug` parameter when creating organization memberships.

```typescript
async function migrateMemberships(descopeUserTenants, orgIdMap, userIdMap) {
  for (const userTenant of descopeUserTenants) {
    const orgId = orgIdMap.get(userTenant.tenantId);
    const userId = userIdMap.get(userTenant.userId);

    if (!orgId || !userId) {
      console.error(`Missing mapping for user-tenant relationship`);
      continue;
    }

    try {
      await workos.userManagement.createOrganizationMembership({
        userId: userId,
        organizationId: orgId,
        // Map Descope roles to WorkOS roles as needed
        roleSlug: userTenant.roleNames?.[0] || 'member',
      });

      console.log(`Migrated membership: ${userId} -> ${orgId}`);
    } catch (error) {
      console.error(`Failed to migrate membership:`, error);
    }
  }
}
```

***

## (4) Special considerations

There are some differences between the authentication strategies offered by Descope and WorkOS that you should be aware of when planning your migration.

### Multi-Factor Auth

Descope supports SMS-based one-time passwords (OTP) for authentication and multi-factor auth. However, WorkOS does not support SMS-based second factors due to known security issues with SMS.

Users who have SMS-based authentication or second factors will need to switch to using [email-based Magic Auth](https://workos.com/docs/authkit/magic-auth), or re-enroll in MFA using a [TOTP-based authenticator](https://workos.com/docs/authkit/mfa) instead.

### Passkeys and advanced authentication

Descope supports [passkeys](https://docs.descope.com/auth-methods/passkeys) (WebAuthn) for passwordless authentication. [Passkey authentication](https://workos.com/docs/authkit/passkeys) is also available through AuthKit's hosted UI, using the WebAuthn standard. Passkeys offer:

- **Progressive enrollment**: Users with password-based accounts can be prompted to create passkeys
- **MFA integration**: Passkeys serve as both first and second factors when MFA is enabled
- **Secure authentication**: Using biometric or PIN verification on the user's device

Note that passkey authentication is currently available through the hosted UI. You'll need to configure a custom domain for your AuthKit environment before enabling passkeys in production.

Descope also offers other authentication methods like Magic Links and Enchanted Links. [Magic Auth](https://workos.com/docs/authkit/magic-auth) delivers a similar passwordless email-based authentication experience.

### Enterprise SSO and SCIM

Both Descope and WorkOS provide robust enterprise authentication features. If you're currently using Descope's [SSO](https://docs.descope.com/auth-methods/sso) or [SCIM provisioning](https://docs.descope.com/b2b/scim) features, WorkOS offers equivalent capabilities:

- [Single Sign-On (SSO)](https://workos.com/docs/sso) - Support for SAML and OIDC providers
- [Directory Sync](https://workos.com/docs/directory-sync) - SCIM-based user provisioning from identity providers

When migrating enterprise customers who use SSO, you'll need to coordinate with them to reconfigure their Identity Provider (IdP) to point to WorkOS instead of Descope. WorkOS provides [comprehensive documentation](https://workos.com/docs/sso) for setting up SSO connections with various providers.

### Account linking behavior

Descope has account linking capabilities that automatically link social accounts with matching verified email addresses. WorkOS also supports automatic account linking based on email addresses. When migrating users who have multiple linked accounts in Descope (e.g., password + Google OAuth), you should:

1. Import the user once with their primary email
2. Configure the relevant social providers
3. When users sign in with their social provider, they will automatically be linked with the accounts based on email match

### Handling interim new users

If your application allows users to sign up at any time, you should [consider the timing of your migration](https://workos.com/docs/migrate/other-services/4-handling-interim-new-users). Users who sign up after you've exported data from Descope but before you've switched to WorkOS for authentication will be omitted from the migration.

There are two main strategies to handle this:

#### (A) Disable signups during migration

Schedule an appropriate time for the migration and temporarily disable signup functionality. This can be controlled using a feature flag in your application. After the migration is complete and your application is using WorkOS for authentication, re-enable signups.

#### (B) Use a dual-write strategy

For applications that cannot disable signups, implement a "dual-write" strategy. When a new user signs up, create records in both your Descope project and WorkOS using the [Create User API](https://workos.com/docs/reference/authkit/user/create). This keeps WorkOS synchronized with new users, though you'll still need to perform the historical user migration. Be aware that you'll need to keep user updates (email changes, password changes) synchronized between both systems until the migration is complete.

***

## Next steps

With your users now imported, you can start using WorkOS to manage authentication for your application. If you haven't already, take a look at the [AuthKit Quick Start guide](https://workos.com/docs/authkit) to learn how to integrate AuthKit into your application.
