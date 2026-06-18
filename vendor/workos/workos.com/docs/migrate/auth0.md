# Migrate from Auth0

## Introduction

The WorkOS AuthKit API allows you to migrate your existing user data from a variety of existing sources. In this guide, we will walk through the steps to export, and then import your users, organizations, and enterprise SSO connections from Auth0.

***

## (1) Exporting Auth0 user data

Auth0 allows their customers to export user data using several tools, which are outlined in [Auth0's export documentation](https://auth0.com/docs/troubleshoot/customer-support/manage-subscriptions/export-data). A combination of exports may be necessary to retrieve all of the desired user information, including passwords.

### Using the WorkOS migrations CLI

The fastest way to export Auth0 data is with the WorkOS CLI migrations tool:

```bash
npx workos migrations export-auth0 \
  --domain my-tenant.us.auth0.com \
  --client-id <M2M_CLIENT_ID> \
  --client-secret <M2M_CLIENT_SECRET> \
  --package \
  --output-dir ./migration-auth0
```

This produces a migration package with users, organizations, memberships, roles, SSO handoff files, and warnings. You will need an Auth0 Machine-to-Machine application authorized for the Management API with the following scopes:

- `read:users`
- `read:user_idp_tokens`
- `read:organizations`
- `read:organization_members`
- `read:organization_member_roles`
- `read:roles`
- `read:connections`
- `read:connections_options`

For an interactive, step-by-step experience, use the wizard:

```bash
npx workos migrations wizard
```

### Manual export

The first tool is [Auth0's "Bulk User Export" jobs](https://auth0.com/docs/manage-users/user-migration/bulk-user-exports). These export jobs can be created programmatically using the [Auth0 Management API](https://auth0.com/docs/api/management/v2/jobs/post-users-exports), or through the official [Auth0 "User Import / Export Extension"](https://auth0.com/docs/customize/extensions/user-import-export-extension).

In both cases, an Auth0 customer can request which fields they'd like exported for each user, with the final output of the process being a newline-delimited JSON file.

### Exporting passwords

If your Auth0 users currently sign-in using password-based authentication, and you'd like to import those passwords into WorkOS, then you will need to [contact Auth0 support](https://auth0.com/docs/troubleshoot/customer-support).

After opening a ticket with Auth0, it can take up to a week or more for your request to be processed. At the end you'll be given another newline-delimited JSON file, containing a subset of user data such as ID, but more importantly the password hash.

> Auth0 does not make the plaintext passwords available for export.

If you used the CLI export with `--package`, you can merge the password hashes into the migration package:

```bash
npx workos migrations merge-passwords \
  --package ./migration-auth0 \
  --passwords auth0-passwords.ndjson
```

***

## (2) Importing users into WorkOS

Once you've obtained the necessary export files, you can import your user data into WorkOS using the CLI or the API directly.

> For migrations involving more than 200,000 users or organizations, contact [support@workos.com](mailto:support@workos.com) to coordinate a managed import.

### Before you begin: disable webhook delivery

If you have [webhook endpoints](https://workos.com/docs/reference/webhooks) configured, temporarily disable delivery for the duration of the bulk import to avoid overwhelming your webhook consumers with high volumes of `user.created`, `organization.created`, and `organization_membership.created` events.

You can disable a webhook endpoint using the [Update Webhook Endpoint API](https://workos.com/docs/reference/webhooks/update):

```bash
curl -X PATCH https://api.workos.com/webhook_endpoints/{id} \
  -H "Authorization: Bearer sk_example_123456789" \
  -H "Content-Type: application/json" \
  -d '{ "status": "disabled" }'
```

Re-enable the endpoint after the import is complete by setting `status` back to `"enabled"`.

### (A) Using the WorkOS migrations CLI

If you exported a migration package in the previous step, import it in one command:

```bash
npx workos migrations import-package ./migration-auth0
```

The orchestrator imports organizations, users, memberships, roles, and TOTP factors in the correct order. Preview what the import would do with `--plan` or `--dry-run` first.

For a standalone CSV import:

```bash
npx workos migrations import --csv users.csv
```

> User creation is rate-limited. See the [rate limits documentation](https://workos.com/docs/reference/rate-limits) for details. The CLI handles batching and concurrency automatically.

### (B) Using WorkOS APIs

With the data from Auth0's "Bulk User Export" job, you can use the WorkOS [Create User API](https://workos.com/docs/reference/authkit/user/create) to import each of the users. Using the default fields from the [Auth0 export](https://auth0.com/docs/customize/extensions/user-import-export-extension#export-users), use the following mapping from Auth0 to parameters in your WorkOS Create User API calls:

| Auth0          |     | WorkOS API       |
| -------------- | --- | ---------------- |
| Email          | →   | `email`          |
| Email Verified | →   | `email_verified` |
| Given Name     | →   | `first_name`     |
| Family Name    | →   | `last_name`      |

### Importing passwords

If you also exported passwords from Auth0, you can import them during the [user creation](https://workos.com/docs/reference/authkit/user/create) process, or later using the WorkOS [Update User API](https://workos.com/docs/reference/authkit/user/update).

Auth0 uses the `bcrypt` password hashing algorithm, which is supported by WorkOS. Make sure to pass the following parameters to the WorkOS API:

- The `password_hash_type` set to `'bcrypt'`
- The `password_hash` set to the `passwordHash` field from your Auth0 export

### Migrating social auth users

If you have users who previously signed in through Auth0 using social auth providers, such as [Google](https://workos.com/docs/integrations/google-oauth) or [Microsoft](https://workos.com/docs/integrations/microsoft-oauth), those users can continue to sign in with those providers after you've migrated to WorkOS.

Check out our [integrations](https://workos.com/docs/integrations) page for guidance on configuring the relevant provider's client credentials in WorkOS.

After your provider is configured in WorkOS, users can sign in with their provider credentials and will be automatically linked to a WorkOS user. WorkOS uses the **email address** from the social auth provider to determine this match.

> Some users may need to verify their email address through WorkOS if email verification is enabled in your WorkOS environment's authentication settings.

Email verification behavior varies depending on whether the provider is known to verify email addresses. For example, users signing in using Google OAuth and a `gmail.com` email domain will not need to perform the extra verification step.

***

## (3) Organizations

Auth0 has a concept of ["Organizations"](https://auth0.com/docs/manage-users/organizations) which are analogous to [WorkOS Organizations](https://workos.com/docs/reference/organization), in that both represent a B2B customer.

### Creating Organizations

If you used the CLI with `--package`, organizations are imported automatically by `import-package`. Otherwise, you can use the [Auth0 Management API](https://auth0.com/docs/api/management/v2/organizations/get-organizations) to programmatically paginate through each Organization, then call the WorkOS [Create Organization API](https://workos.com/docs/reference/organization/create) to create matching Organizations in WorkOS.

### Adding user memberships

You can export Auth0 organization memberships using Auth0's "Bulk User Export" as described in the [Exporting Auth0 user data](https://workos.com/docs/migrate/auth0/1-exporting-auth0-user-data) step, and then use the WorkOS [Organization Membership API](https://workos.com/docs/reference/authkit/organization-membership/create) to add each user to their respective organization.

> If you plan to import Enterprise Connections (SSO), see the next section first — importing a bulk set of connections will automatically create the corresponding organizations in WorkOS.

***

## (4) Enterprise Connections (SSO)

If your Auth0 tenant has enterprise SAML or OIDC connections, you can migrate them to WorkOS. The best strategy depends on how many connections you have.

### Choosing a migration strategy

### (A) Fewer than 15 connections — Admin Portal approach

For smaller deployments, the simplest path is to recreate each connection in WorkOS and coordinate with each customer's IT team to update their Identity Provider configuration. You can use the [Admin Portal](https://workos.com/docs/admin-portal) to let customers self-service their SSO setup, reducing the coordination burden.

For each connection:

1. Create or identify the WorkOS organization matching the Auth0 organization
2. Share the [Admin Portal](https://workos.com/docs/admin-portal) link with the customer's IT team so they can update their IdP configuration to point to WorkOS
3. Watch for the `connection.activated` webhook to roll out the customer to the WorkOS connection

### (B) 15 or more connections — Transparent proxy migration

For larger deployments, coordinating with every customer's IT team is impractical. Instead, you can perform a **transparent migration** where customer IdPs continue posting to the same Auth0 callback URL while a proxy routes the traffic to WorkOS. IT admins do not need to reconfigure anything on their end.

This approach requires that you have a **custom domain configured in Auth0** (e.g., `auth0.your-domain.com`) so that you control the domain routing.

> For a detailed walkthrough of the transparent proxy migration, see the [Auth0 to WorkOS Enterprise Connections Migration Guide](https://workos.com/guide/auth0-to-workos-enterprise-connections-migration-guide).

### Requirements for transparent proxy migration

To migrate enterprise SSO connections with zero friction, the following must be true:

- You have configured a [custom domain](https://auth0.com/docs/customize/custom-domains) with Auth0 so that you control the domain routing
- Your SAML enterprise connections do not use SAML Request Signing with Auth0 tenant global key pairs
- Your SAML enterprise connections do not use SAML Response Encryption with Auth0 tenant global key pairs

### Exporting enterprise connections

The WorkOS migrations CLI can export your Auth0 enterprise connections:

```bash
npx workos migrations export-auth0 \
  --domain my-tenant.us.auth0.com \
  --client-id <M2M_CLIENT_ID> \
  --client-secret <M2M_CLIENT_SECRET> \
  --package \
  --entities sso \
  --output-dir ./migration-auth0-sso
```

This produces files with SAML and OIDC connection details, custom attribute mappings, and proxy routes. Contact [support@workos.com](mailto:support@workos.com) with the export files, and the WorkOS team will import the connections for you.

After the import, WorkOS provides a mapping between Auth0 and WorkOS connection IDs that you can use during the gradual rollout.

### Configuring the callback proxy

![Configuring the callback proxy](https://images.workoscdn.com/images/d7655dfe-1d49-4fa6-9deb-24f98359a6b2.png)

Once connections are imported into WorkOS, configure a proxy in front of your Auth0 custom domain to route IdP callback traffic to WorkOS. The proxy intercepts callbacks at your Auth0 custom domain's `/login/callback` path and redirects them to your WorkOS custom domain.

The proxy flow works as follows:

1. A user authenticates with their IdP, which posts the SAML response or OIDC callback to your Auth0 custom domain
2. The proxy redirects the callback to WorkOS
3. WorkOS attempts to find a matching connection:
   - If found, it processes the response and redirects to your application's WorkOS callback
   - If not found, it redirects back with a `fallback=auth0` query parameter, and the proxy forwards the original callback to Auth0

This fallback mechanism ensures zero downtime — connections that haven't been migrated yet continue to work through Auth0.

The proxy can be implemented using Cloudflare redirect and transform rules, a Cloudflare Worker, or any reverse proxy you control. The [workos-migrations repository](https://github.com/workos/workos-migrations/tree/main/proxy-sample-auth0) includes a reference implementation. For Cloudflare rules configuration, see the [detailed migration guide](https://workos.com/guide/auth0-to-workos-enterprise-connections-migration-guide).

> We recommend performing a proof-of-concept in a staging environment before production to de-risk breaking changes in your setup.

### Gradual rollout with Feature Flags

Once the proxy is in place, you can opt-in connections to WorkOS one at a time. [WorkOS Feature Flags](https://workos.com/docs/feature-flags) can control which organizations use WorkOS SSO versus Auth0 during the migration. Create a feature flag (e.g., `workos-sso-enabled`) and target it to specific organizations as you migrate them.

```typescript title="Route SSO based on feature flag"
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const featureFlags = workos.featureFlags.createRuntimeClient();
await featureFlags.waitUntilReady({ timeoutMs: 5000 });

function getSSOAuthorizationUrl(organizationId: string): string {
  const useWorkOS = featureFlags.isEnabled('workos-sso-enabled', {
    organizationId,
  });

  if (useWorkOS) {
    return workos.userManagement.getAuthorizationUrl({
      provider: 'authkit',
      organizationId,
      clientId: process.env.WORKOS_CLIENT_ID!,
      redirectUri: process.env.WORKOS_REDIRECT_URI!,
    });
  }

  // Fall back to Auth0 for organizations not yet migrated
  return (
    `https://${process.env.AUTH0_DOMAIN}/authorize?` +
    `client_id=${encodeURIComponent(process.env.AUTH0_CLIENT_ID!)}` +
    `&redirect_uri=${encodeURIComponent(process.env.AUTH0_REDIRECT_URI!)}` +
    `&response_type=code` +
    `&organization=${encodeURIComponent(organizationId)}`
  );
}
```

This lets you gradually migrate organizations to WorkOS SSO, verify each one works correctly, and roll back individual organizations if needed — all without code deployments.

After the migration is complete, you can turn off your Auth0 tenant entirely. You will need to maintain the custom domain in your DNS provider so that the proxy continues to route any remaining traffic.

> For a simpler integration path that doesn't require changes to your Auth0 application code, see the [Auth0 Enterprise Connection](https://workos.com/docs/integrations/auth0-enterprise-connection) integration guide.

***

## (5) Multi-Factor Auth

There are some differences between the Multi-Factor Auth (MFA) strategies offered by Auth0 and WorkOS.

Auth0 supports SMS-based second factors, however WorkOS does not due to known security issues with SMS. Users who have SMS-based second factors will need to switch to using email-based Magic Auth, or re-enroll in MFA using a TOTP-based authenticator instead.

If your Auth0 users have TOTP factors, the CLI can enroll them in WorkOS after import:

```bash
npx workos migrations enroll-totp \
  --input totp-secrets.csv \
  --totp-issuer "YourApp"
```

***

## (6) Handling interim new users

If your application allows users to sign up at any time, you should [consider the timing of your migration](https://workos.com/docs/migrate/other-services/4-handling-interim-new-users). Users who sign up after you've exported data from Auth0 but before you've switched to WorkOS for authentication will be omitted from the migration.

There are two main strategies to handle this:

### (A) Disable signups during migration

Schedule an appropriate time for the migration and temporarily disable signup functionality. This can be controlled using a feature flag in your application. After the migration is complete and your application is using WorkOS for authentication, re-enable signups.

### (B) Use a dual-write strategy

For applications that cannot disable signups, implement a "dual-write" strategy. When a new user signs up, create records in both Auth0 and WorkOS using the [Create User API](https://workos.com/docs/reference/authkit/user/create). This keeps WorkOS synchronized with new users, though you'll still need to perform the historical user migration. Be aware that you'll need to keep user updates (email changes, password changes) synchronized between both systems until the migration is complete.

***

## Next steps

After completing your migration to WorkOS, you can take advantage of additional features:

- **[Audit Logs](https://workos.com/docs/audit-logs)**: Track security-relevant events across your application
- **[Radar](https://workos.com/docs/authkit/radar)**: Protect against bots, fraud, and abuse
- **[Feature Flags](https://workos.com/docs/feature-flags)**: Control feature rollout for specific users and organizations

If you haven't already, check out the [AuthKit Quick Start guide](https://workos.com/docs/authkit) to learn how to integrate WorkOS into your application.

For questions or assistance with your migration, contact [support@workos.com](mailto:support@workos.com).
