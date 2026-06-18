# Migrate from Stytch

## Introduction

The WorkOS API allows you to migrate your existing user data from a variety of existing sources. In this guide, we will walk through the steps to export and import your B2B users, organizations, and enterprise configurations from Stytch.

***

## (1) Export data from Stytch

Stytch allows customers to export organization and member data using their API endpoints. You can [export most data programmatically](https://stytch.com/docs/b2b/guides/migrations/exporting-from-stytch), though password hashes and complete SSO/SCIM connection configurations require contacting Stytch support.

### Exporting organizations and members

Use the [Stytch Search Organizations API](https://stytch.com/docs/b2b/api/search-organizations) to retrieve all organizations in your Stytch project, then use the [Stytch Search Members API](https://stytch.com/docs/b2b/api/search-members) to export members for each organization. Both endpoints support pagination for projects with more than 1000 records and have a rate limit of 100 requests per minute.

> The following exports B2B Users. To export Consumer Users, consult [this utility from Stytch](https://github.com/stytchauth/stytch-node-export-users).

```typescript title="Export organizations and members from Stytch"
import { B2BClient } from 'stytch';
import { writeFile } from 'fs/promises';

const client = new B2BClient({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
});

async function exportOrganizations() {
  const allOrganizations: any[] = [];
  let cursor = '';

  do {
    const response = await client.organizations.search({
      cursor,
      limit: 1000,
    });

    allOrganizations.push(...response.organizations);
    cursor = response.results_metadata.next_cursor;
  } while (cursor);

  return allOrganizations;
}

async function exportMembers(organizationIds: string[]) {
  const allMembers: any[] = [];
  let cursor = '';

  do {
    const response = await client.organizations.members.search({
      organization_ids: organizationIds,
      cursor,
      limit: 1000,
    });

    allMembers.push(...response.members);
    cursor = response.results_metadata.next_cursor;
  } while (cursor);

  return allMembers;
}

(async () => {
  const organizations = await exportOrganizations();
  const organizationIds = organizations.map((org) => org.organization_id);
  console.log(`Found ${organizations.length} organizations`);
  const members = await exportMembers(organizationIds);
  console.log(`Found ${members.length} members`);

  // Export all data to a JSON file
  await writeFile(
    'stytch-b2b-export.json',
    JSON.stringify({ organizations, members }, null, 2),
  );
})();
```

The Organization object includes `organization_id`, `organization_name`, `email_allowed_domains`, `sso_active_connections`, and `scim_active_connection` fields. The Member object includes `member_id`, `email_address`, `name`, `status`, `oauth_registrations`, `sso_registrations`, and `roles` fields.

### Exporting passwords

If your Stytch members sign in using password-based authentication, you will need to [contact Stytch support](mailto:support@stytch.com) to export password hashes. After opening a request, they will provide an export of your hashed password data. The timeline for this process can vary.

Stytch uses the `scrypt` password hashing algorithm for password storage. When you export passwords through Stytch support, verify the hash format they provide, as WorkOS supports multiple algorithms including `scrypt`, `bcrypt`, and `argon2`.

***

## (2) Import data into WorkOS

Once you've obtained the necessary export data from Stytch, you can import it into WorkOS.

### Using the WorkOS migrations CLI

The fastest way to import users is with the CLI:

```bash
npx workos migrations import --csv stytch-users.csv
```

Or for a guided experience: `npx workos migrations wizard`

Alternatively, use the WorkOS API directly. We recommend importing organizations first, then users with their organization memberships.

### Creating organizations

Use the [Create Organization API](https://workos.com/docs/reference/organization/create) to import each Stytch organization. Map `organization_name` to `name` and `email_allowed_domains` to `domainData` (with appropriate `state` values).

```typescript title="Import organizations into WorkOS"
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

async function importOrganization(stytchOrg: any) {
  const domainData =
    stytchOrg.email_allowed_domains?.map((domain: string) => ({
      domain,
      state: 'pending', // or 'verified' if domains are pre-verified
    })) || [];

  const org = await workos.organizations.createOrganization({
    name: stytchOrg.organization_name,
    domainData,
  });

  return org;
}

// Import all organizations
const orgIdMapping = new Map();
for (const stytchOrg of stytchOrganizations) {
  try {
    const workosOrg = await importOrganization(stytchOrg);
    orgIdMapping.set(stytchOrg.organization_id, workosOrg.id);
  } catch (error: any) {
    console.error(`[FAILED] ${stytchOrg.organization_name}`, error.message);
  }
}
```

### Creating users and memberships

Use the [Create User API](https://workos.com/docs/reference/authkit/user/create) to import each Stytch member, then use the [Organization Membership API](https://workos.com/docs/reference/authkit/organization-membership/create) to link users to their organizations. You should filter members by status—typically only importing `active` members and potentially re-inviting `invited` or `pending` members.

```typescript title="Import users and create memberships"
async function importUser(stytchMember: any) {
  // Parse name into first and last name
  const nameParts = stytchMember.name?.split(' ') || [];
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const user = await workos.userManagement.createUser({
    email: stytchMember.email_address,
    emailVerified: stytchMember.email_address_verified,
    firstName,
    lastName,
  });

  return user;
}

async function createMembership(
  workosUserId: string,
  workosOrgId: string,
  roleSlug: string = 'member',
) {
  return await workos.userManagement.createOrganizationMembership({
    userId: workosUserId,
    organizationId: workosOrgId,
    roleSlug,
  });
}

const userIdMapping = new Map();
for (const stytchMember of stytchMembers) {
  try {
    const workosUser = await importUser(stytchMember);
    userIdMapping.set(stytchMember.member_id, workosUser.id);

    const workosOrgId = orgIdMapping.get(stytchMember.organization_id);
    if (workosOrgId) {
      await createMembership(workosUser.id, workosOrgId);
    } else {
      console.warn(`No WorkOS org found for ${stytchMember.email_address}`);
    }
  } catch (error: any) {
    console.error(`[FAILED] ${stytchMember.email_address}`, error.message);
  }
}
```

> User creation is rate-limited. See the [rate limits documentation](https://workos.com/docs/reference/rate-limits) for details. Consider implementing retry logic and batching for large imports, or reach out to [support@workos.com](mailto:support@workos.com) to process large datasets in the background.

### Importing passwords

If you exported password hashes from Stytch, you can import them during user creation or later using the [Update User API](https://workos.com/docs/reference/authkit/user/update). Pass the `passwordHashType` parameter (e.g., `'scrypt'`, `'bcrypt'`) and the `passwordHash` value from your Stytch export. Once imported, users can sign in with their existing passwords without performing a password reset.

```typescript title="Import user with password hash"
const user = await workos.userManagement.createUser({
  email: stytchMember.email_address,
  emailVerified: stytchMember.email_address_verified,
  firstName,
  lastName,
  passwordHash: stytchPasswordHash, // From Stytch support export
  passwordHashType: 'scrypt', // Verify the actual format with Stytch support
});
```

***

## (3) SSO connections

Enterprise SSO connections cannot be exported from Stytch, but you can manually reconfigure connections. You have two options: configure each connection through the dashboard, or use the [Admin Portal](https://workos.com/docs/admin-portal) to let customers self-service their SSO setup. The Admin Portal approach is recommended for larger migrations, as it reduces manual work and provides a familiar self-service experience for IT contacts.

To manually configure a SAML connection, create the organization (if not already created), then set up a new SAML connection in the dashboard.

```typescript title="Create SSO connection programmatically"
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

// Generate Admin Portal link for customer to self-configure SSO
const { link } = await workos.portal.generateLink({
  organization: 'org_12345',
  intent: 'sso',
  returnUrl: 'https://yourapp.com/admin',
});

// Send this link to the customer's IT contact
console.log('Admin Portal link:', link);
```

The OIDC process is similar: create the organization, configure a new OIDC connection, obtain the callback URL, and work with the customer's IT team to update their OIDC application configuration. See the [OIDC integration guide](https://workos.com/docs/integrations/oidc) for detailed instructions. For provider-specific guidance, consult the integration guides for [Okta SAML](https://workos.com/docs/integrations/okta-saml), [Microsoft Entra ID SAML](https://workos.com/docs/integrations/entra-id-saml), [Google Workspace SAML](https://workos.com/docs/integrations/google-saml), or [Generic SAML](https://workos.com/docs/integrations/saml).

***

## (4) Directory Sync

Like SSO connections, SCIM directory sync connections must be reconfigured. [Directory Sync](https://workos.com/docs/directory-sync) provides real-time user and group provisioning, automatic deprovisioning, custom attribute mapping, and support for 20+ identity providers including [Okta SCIM](https://workos.com/docs/integrations/okta-scim), [Microsoft Entra ID SCIM](https://workos.com/docs/integrations/entra-id-scim), [Google Workspace Directory](https://workos.com/docs/integrations/google-saml), and [Custom SCIM v2.0](https://workos.com/docs/integrations/scim) providers.

For each Stytch SCIM connection, create a corresponding Directory Sync connection in the dashboard or using the [Admin Portal](https://workos.com/docs/admin-portal) for self-service setup.

```typescript title="Generate Admin Portal link for Directory Sync"
const { link } = await workos.portal.generateLink({
  organization: 'org_12345',
  intent: 'dsync',
  returnUrl: 'https://yourapp.com/admin',
});
```

WorkOS sends webhooks for directory sync events like `dsync.user.created`, `dsync.user.updated`, `dsync.user.deleted`, and `dsync.group.updated`. Configure webhooks in the dashboard to receive these events and keep your application in sync with directory changes.

```typescript title="Handle directory sync events"
app.post('/webhooks/workos', async (req, res) => {
  const event = req.body;

  switch (event.event) {
    case 'dsync.user.created':
      await createUserFromDirectory(event.data);
      break;
    case 'dsync.user.deleted':
      await deactivateUser(event.data.id);
      break;
    case 'dsync.group.updated':
      await syncGroupMemberships(event.data);
      break;
  }

  res.status(200).send();
});
```

See the [Directory Sync guide](https://workos.com/docs/directory-sync) for complete implementation details.

***

## (5) Authentication and access control

Stytch B2B supports several authentication methods and access control features that have equivalent capabilities in AuthKit, though some migration adjustments are necessary.

### Authentication methods

Both Stytch and WorkOS support traditional email and password authentication. After importing your users with their password hashes, users can sign in immediately with their existing credentials. Enable password authentication in the dashboard under the *Authentication* tab and configure password strength requirements as needed.

Stytch's magic link authentication can be replaced with [Magic Auth](https://workos.com/docs/authkit/magic-auth). While Stytch sends clickable magic links via email, Magic Auth sends a six-digit one-time code that users enter manually. Magic Auth codes expire after 10 minutes and are automatically validated by AuthKit. Stytch's email OTP authentication is functionally identical to Magic Auth, so no application logic changes are needed.

If your Stytch users sign in through OAuth providers like Google, Microsoft, or GitHub, they can continue using the same providers. After configuring OAuth providers in the dashboard, users can sign in with their social credentials and will be automatically linked to their user account based on email address matching.

In the dashboard:

1. Navigate to Authentication > OAuth providers
2. Select the provider (Google, Microsoft, GitHub, etc.)
3. Add OAuth client credentials (Client ID and Secret)
4. Copy the redirect URI and add to your OAuth app configuration

Users authenticate through AuthKit, which handles the OAuth flow.

```typescript title="Configure OAuth providers"
const { user } = await workos.userManagement.authenticateWithCode({
  code: authorizationCode,
  clientId: process.env.WORKOS_CLIENT_ID,
});
```

Check the [integrations page](https://workos.com/docs/integrations) for the complete list of supported OAuth providers, including [Google OAuth](https://workos.com/docs/integrations/google-oauth), [Microsoft OAuth](https://workos.com/docs/integrations/microsoft-oauth), and [GitHub OAuth](https://workos.com/docs/integrations/github-oauth).

### Multi-factor authentication

Both Stytch and WorkOS support TOTP authenticators like Google Authenticator, Authy, and 1Password. WorkOS supports importing existing TOTP secrets during migration through the [developer-provided TOTP secrets](https://workos.com/changelog/developer-provided-totp-secrets) feature, which allows users to keep their existing authenticator app configurations without re-enrollment.

However, [Stytch cannot export TOTP secrets](https://stytch.com/docs/guides/migrations/migrating-user-data-statically#adding-totp-or-biometrics-for-mfa). Users who have TOTP MFA enrolled in Stytch will need to re-enroll their authenticator apps with WorkOS during their next sign-in. Enable MFA in the dashboard under the *Authentication* tab and configure whether MFA is optional or required. Communicate this change to your users before migration so they're prepared to scan a new QR code or enter a new secret key.

While Stytch supports SMS-based MFA, WorkOS does not due to known security vulnerabilities with SMS (SIM swapping, interception, etc.). Users who currently have SMS-based MFA will need to switch to TOTP authenticators, email-based Magic Auth, or modern biometric [Passkeys](https://workos.com/docs/authkit/passkeys). See the [MFA guide](https://workos.com/docs/authkit/mfa) for enrollment flows and implementation details.

### Roles and sessions

Stytch B2B provides RBAC with custom resources, roles, and actions. WorkOS offers similar capabilities through [roles and permissions](https://workos.com/docs/authkit/roles-and-permissions). When migrating, identify your roles defined in Stytch, create equivalent roles in the dashboard, and assign roles during migration by specifying the `roleSlug` parameter when creating organization memberships. If your Stytch implementation uses complex RBAC policies with custom resources and actions, you may need to simplify to standard roles or implement custom authorization in your application logic.

```typescript title="Assign roles during migration"
const roleMapping = {
  stytch_admin: 'admin',
  stytch_member: 'member',
  custom_role_123: 'manager',
};

await workos.userManagement.createOrganizationMembership({
  userId: workosUserId,
  organizationId: workosOrgId,
  roleSlug: roleMapping[stytchMember.roles[0].role_id] || 'member',
});
```

JWT-based session tokens are used for authentication state. Your application will need to handle these session tokens. Use [an SDK](https://workos.com/docs/sdks) to verify, extract user context (user ID, organization ID, role), and implement token refresh logic if using long-lived sessions.

```typescript title="Handle WorkOS sessions"
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

const { user, organizationId, role } =
  await workos.userManagement.authenticateWithCode({
    code: authorizationCode,
    clientId: process.env.WORKOS_CLIENT_ID,
  });

// Store session in your application
req.session.userId = user.id;
req.session.organizationId = organizationId;
req.session.role = role;
```

See the [AuthKit guide](https://workos.com/docs/authkit) for complete session management implementation.

***

## Next steps

Be sure to understand how to [handle interim new users](https://workos.com/docs/migrate/other-services/4-handling-interim-new-users) for managing users who sign up during your migration process.

After completing your migration to WorkOS, you can take advantage of additional features:

- **[Audit Logs](https://workos.com/docs/audit-logs)**: Track security-relevant events across your application
- **[Radar](https://workos.com/docs/authkit/radar)**: Protect against bots, fraud, and abuse
- **[Vault](https://workos.com/docs/vault)**: Encrypt, store, and control access to sensitive data

If you haven't already, check out the [AuthKit Quick Start guide](https://workos.com/docs/authkit) to learn how to integrate WorkOS into your application.

For questions or assistance with your migration, contact [support@workos.com](mailto:support@workos.com).
