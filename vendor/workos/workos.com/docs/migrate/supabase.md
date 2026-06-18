# Migrate from Supabase Auth

## Introduction

The AuthKit API allows you to migrate your existing user data from a variety of existing sources. In this guide, we will walk through the steps to export, and then import your users from Supabase Auth.

***

## (1) Export Supabase data

Supabase stores authentication data directly in your PostgreSQL database under the `auth` schema. This gives you full access to export user data, including password hashes, through direct database queries.

### Export users via SQL

You can export users by querying the `auth.users` table directly in the [Supabase SQL Editor](https://supabase.com/docs/guides/database/overview#the-sql-editor) or by using a database client connected to your Supabase project.

```sql title="Export users from Supabase"
SELECT
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  phone,
  phone_confirmed_at,
  raw_user_meta_data,
  created_at
FROM auth.users;
```

For a complete export that includes social login identities, join with the `auth.identities` table.

```sql title="Export users with social logins"
SELECT
  u.id,
  u.email,
  u.encrypted_password,
  u.email_confirmed_at IS NOT NULL as email_verified,
  u.raw_user_meta_data->>'full_name' as full_name,
  u.raw_user_meta_data->>'name' as name,
  i.provider,
  i.provider_id
FROM auth.users u
LEFT JOIN auth.identities i ON u.id = i.user_id;
```

You can also export this data using `pg_dump` with your Supabase connection string, which will include the entire `auth` schema.

### Export passwords

Supabase stores password hashes in the `encrypted_password` column of the `auth.users` table using the [bcrypt algorithm](https://en.wikipedia.org/wiki/Bcrypt). Unlike some other providers, Supabase gives you direct database access, so you can export password hashes without needing to contact support.

***

## (2) Import users into WorkOS

### Using the WorkOS migrations CLI

The fastest way to import users is with the CLI:

```bash
npx workos migrations import --csv supabase-users.csv
```

Or for a guided experience: `npx workos migrations wizard`

Alternatively, with the data from your Supabase export, you can use the [Create User API](https://workos.com/docs/reference/authkit/user/create) to import each user. The API is rate-limited, so for large migrations implement batching with appropriate delays. See the [rate limits documentation](https://workos.com/docs/reference/rate-limits) for more information.

Use the following mapping from Supabase fields to WorkOS API parameters:

| Supabase                           |     | WorkOS API                        |
| ---------------------------------- | --- | --------------------------------- |
| `email`                            | →   | `email`                           |
| `email_confirmed_at IS NOT NULL`   | →   | `email_verified`                  |
| `raw_user_meta_data->>'full_name'` | →   | `first_name`, `last_name` (split) |

Here's an example migration script:

```typescript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

interface SupabaseUser {
  email: string;
  email_verified: boolean;
  full_name?: string;
  // Omit this field if you are not importing passwords
  encrypted_password?: string;
}

function splitName(fullName?: string): {
  firstName?: string;
  lastName?: string;
} {
  fullName = fullName?.trim();
  if (!fullName) return {};
  const parts = fullName.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0] };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

async function migrateUsers(supabaseUsers: SupabaseUser[]) {
  for (const user of supabaseUsers) {
    try {
      const { firstName, lastName } = splitName(user.full_name);

      const workosUser = await workos.userManagement.createUser({
        email: user.email,
        emailVerified: user.email_verified,
        firstName,
        lastName,
        // Import the bcrypt password hash directly
        // Omit these fields if you are not importing passwords
        passwordHash: user.encrypted_password,
        passwordHashType: 'bcrypt',
      });

      console.log(`Migrated user: ${user.email} -> ${workosUser.id}`);
    } catch (error) {
      console.error(`Failed to migrate user ${user.email}:`, error);
    }
  }
}
```

### Import passwords

Supabase uses the bcrypt password hashing algorithm, which WorkOS supports. You can import password hashes during [user creation](https://workos.com/docs/reference/authkit/user/create) or later using the [Update User API](https://workos.com/docs/reference/authkit/user/update).

Pass the following parameters to the API:

- The `password_hash_type` set to `'bcrypt'`
- The `password_hash` set to the `encrypted_password` value from your Supabase export

Once imported, users can continue to sign in with their existing password without needing to reset it.

### Migrate social auth users

If you have users who signed in through Supabase using social auth providers like [Google](https://workos.com/docs/integrations/google-oauth) or [Microsoft](https://workos.com/docs/integrations/microsoft-oauth), those users can continue to sign in with those providers after migration.

Check out the [integrations](https://workos.com/docs/integrations) page for guidance on configuring the relevant provider's client credentials.

After your provider is configured, users can sign in with their provider credentials and will be automatically linked to a WorkOS user. WorkOS uses the **email address** from the social auth provider to determine this match.

> Some users may need to verify their email address if email verification is enabled in your environment's authentication settings.

Email verification behavior varies depending on whether the provider is known to verify email addresses. For example, users signing in using Google OAuth with a `gmail.com` email domain will not need to perform the extra verification step.

***

## (3) Special considerations

There are several differences between Supabase Auth and WorkOS that you should consider when planning your migration.

### Organizations and multi-tenancy

Supabase Auth does not have native support for organizations or multi-tenancy. Many Supabase applications implement multi-tenancy using Row Level Security (RLS) policies with a `tenant_id` column or by storing tenant information in `app_metadata`.

WorkOS provides native [Organizations](https://workos.com/docs/reference/organization) designed specifically for B2B applications. When migrating, you can:

1. Create Organizations using the [Create Organization API](https://workos.com/docs/reference/organization/create)
2. Add users to their organizations using the [Organization Membership API](https://workos.com/docs/reference/authkit/organization-membership/create)
3. Assign roles using the `roleSlug` parameter if you're using [roles and permissions](https://workos.com/docs/authkit/roles-and-permissions)

If you stored tenant IDs in Supabase's `app_metadata`, you can use those values to map users to their respective organizations:

```typescript
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

interface TenantMapping {
  supabaseTenantId: string;
  workosOrgId: string;
}

async function createMemberships(
  userIdMap: Map<string, string>,
  tenantMappings: TenantMapping[],
  supabaseUsers: Array<{
    id: string;
    app_metadata: { tenant_id?: string };
  }>,
) {
  for (const user of supabaseUsers) {
    const tenantId = user.app_metadata?.tenant_id;
    if (!tenantId) continue;

    const workosUserId = userIdMap.get(user.id);
    const orgMapping = tenantMappings.find(
      (t) => t.supabaseTenantId === tenantId,
    );

    if (!workosUserId || !orgMapping) continue;

    try {
      await workos.userManagement.createOrganizationMembership({
        userId: workosUserId,
        organizationId: orgMapping.workosOrgId,
      });
    } catch (error) {
      console.error(`Failed to create membership for user ${user.id}:`, error);
    }
  }
}
```

### Multi-Factor Authentication

Supabase Auth supports [TOTP-based MFA](https://supabase.com/docs/guides/auth/auth-mfa) using authenticator apps and [Phone MFA](https://supabase.com/docs/guides/auth/auth-mfa/phone) using SMS codes.

WorkOS supports TOTP-based MFA but does not support SMS-based second factors due to known security vulnerabilities with SMS, such as SIM swap attacks.

Users who have enrolled TOTP factors in Supabase will need to re-enroll in MFA after migration, as TOTP secrets cannot be exported from Supabase. Users who were using SMS-based MFA will need to switch to TOTP-based authentication or use [email-based Magic Auth](https://workos.com/docs/authkit/magic-auth) as an alternative.

See the [MFA guide](https://workos.com/docs/authkit/mfa) for more information on enrolling users.

### Enterprise SSO

Both Supabase Auth and WorkOS support [SAML 2.0](https://supabase.com/docs/guides/auth/enterprise-sso/auth-sso-saml) for enterprise single sign-on. If you're currently using Supabase's SSO features, WorkOS offers equivalent and expanded capabilities through [Single Sign-On](https://workos.com/docs/sso).

When migrating enterprise customers who use SSO, you'll need to coordinate with them to reconfigure their Identity Provider (IdP) to point to WorkOS instead of Supabase. WorkOS provides [comprehensive documentation](https://workos.com/docs/sso) for setting up SSO connections with various providers including Okta, Azure AD, and Google Workspace.

### Passwordless authentication

Supabase supports [Magic Links](https://supabase.com/docs/guides/auth/auth-magic-link) and [OTP-based passwordless login](https://supabase.com/docs/guides/auth/passwordless-login/auth-email-otp). WorkOS provides similar functionality through [Magic Auth](https://workos.com/docs/authkit/magic-auth), which delivers secure, one-click email-based authentication.

Additionally, WorkOS supports [Passkeys](https://workos.com/docs/authkit/passkeys) (WebAuthn) through AuthKit's hosted UI, offering:

- **Progressive enrollment**: Users with password-based accounts can be prompted to create passkeys
- **MFA integration**: Passkeys serve as both first and second factors when MFA is enabled
- **Secure authentication**: Using biometric or PIN verification on the user's device

### Handling interim new users

If your application allows users to sign up at any time, [consider the timing of your migration](https://workos.com/docs/migrate/other-services/4-handling-interim-new-users). Users who sign up after you've exported data from Supabase but before you've switched to WorkOS for authentication will be omitted from the migration.

Two main strategies to handle this:

#### (A) Disable signups during migration

Schedule an appropriate time for the migration and temporarily disable signup functionality using a feature flag. After the migration is complete and your application is using WorkOS for authentication, re-enable signups.

#### (B) Use a dual-write strategy

For applications that cannot disable signups, implement a dual-write strategy. When a new user signs up, create records in both Supabase and WorkOS using the [Create User API](https://workos.com/docs/reference/authkit/user/create). This keeps WorkOS synchronized with new users while you complete the historical migration.

Be aware that you'll need to keep user updates (email changes, password changes) synchronized between both systems until the migration is complete.

***

## Next steps

With your users imported, you can start using WorkOS to manage authentication for your application. If you haven't already, take a look at the [AuthKit Quick Start guide](https://workos.com/docs/authkit) to learn how to integrate AuthKit into your application.
