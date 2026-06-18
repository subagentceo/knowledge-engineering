# Migrate from other services

## Introduction

The WorkOS AuthKit API allows you to migrate your existing user data from a variety of sources. In this guide, we'll walk through the steps to export, and then import users from your own data store.

## (1) Exporting data

While moving authentication related metadata to WorkOS, most applications will continue to store certain user information in their data store. This common subset of data will usually be the following:

| Field               | Description                                                                                                                    | Status   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- |
| Email               | The user's email address. Used for various authentication and verification purposes.                                           | Required |
| First Name          | The user's first, or given name.                                                                                               | Optional |
| Last Name           | The user's last, or family name.                                                                                               | Optional |
| Verification Status | The user's email verification status if they have gone through a verification flow. Assumed as "not verified" unless supplied. | Optional |
| Password            | The user's password hash, if they use password-based authentication.                                                           | Optional |

While preparing the migration, you'll want to ensure this information is programmatically available for use in the import step, this can mean:

- Exporting the relevant data to a file such as JSON or CSV.
- Allowing the data to be queried from the data store directly.

After the data is accessible, we can configure the import.

***

## (2) Importing Users into WorkOS

Now that the User data is available, we can import it into WorkOS.

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

### Using the WorkOS migrations CLI

The WorkOS CLI includes a migrations tool that can import users from a CSV file:

```bash
npx workos migrations import --csv users.csv
```

For a guided, interactive experience:

```bash
npx workos migrations wizard
```

The CLI handles batching and rate limiting automatically.

### Creating users

For each of your users, you can call the WorkOS [Create User API](https://workos.com/docs/reference/authkit/user/create). This will create a matching [User object](https://workos.com/docs/reference/authkit/user) within WorkOS.

A successful response will include a new WorkOS user ID, most apps will want to persist this WorkOS user ID alongside the application-local user object.

```json
{
  "object": "user",
  /* highlight-start */
  "id": "user_01E4ZCR3C56J083X43JQXF3JK5",
  /* highlight-end */
  "email": "marcelina.davis@gmail.com",
  "firstName": "Marcelina",
  "lastName": "Davis",
  "emailVerified": true,
  "createdAt": "2021-06-25T19:07:33.155Z",
  "updatedAt": "2021-06-25T19:07:33.155Z"
}
```

> **Email addresses are unique** to each WorkOS environment. If you have a subset of users already in WorkOS, you may need to handle constraint violation errors.

There are now several options on how to proceed, depending on your application's needs:

### Importing passwords

If your users currently use password-based authentication, you can import existing password hashes during the [users creation](https://workos.com/docs/reference/authkit/user/create) process, or later using the WorkOS [Update User API](https://workos.com/docs/reference/authkit/user/update).

WorkOS currently supports the following password hashing algorithms:

- `bcrypt`
- `scrypt`
- `firebase-scrypt`
- `ssha`
- `pbkdf2`
- `argon2`

For `scrypt` and `pbkdf2` passwords, use the PHC string format.
The hash and salt should be B64 encoded: trim the `=` characters that represent Base64 padding. Using a PHC-formatting library, like
Node's [`@phc/format`](https://www.npmjs.com/package/@phc/format), should handle this for you.

The following table shows how to map the `scrypt` and `pbkdf2` parameters to the PHC parameters.

#### scrypt

| `Scrypt` value    |     | PHC hash parameter |
| ----------------- | --- | ------------------ |
| `key length`      | →   | `kl`               |
| `cost`            | →   | `n`                |
| `rounds`          | →   | `r`                |
| `parallelization` | →   | `p`                |

A valid `scrypt` PHC formatted string looks like this:

```txt
$scrypt$v=1$n=16384,r=8,p=1,kl=64$Swhqd4iUYTtWfbCYIPeuMw$q7pfdBQMJujd5FX/qX+ozM2O6aNqP+mo1ZnHGH15XM2vlhroQfPA037UpbdfpH4H66OrSPjsUhfkAMuNoBiQvw
```

#### pbkdf2

| `pbkdf2` value |     | PHC hash parameter |
| -------------- | --- | ------------------ |
| `digest`       | →   | `d`                |
| `iterations`   | →   | `i`                |

For `pbkdf2` allowed values for digest are `sha256` or `sha512`. The value for iterations is dependent on digest. For `sha256` there is a minimum of 600,000 iterations and a max of 1,000,000. For `sha512` there is a minimum of 210,000 and a max of 1,000,000.

A valid `pbkdf2` PHC formatted string looks like this:

```txt
$pbkdf2$i=600000,d=sha256$T2ptRFh6MXhDQVh2SWZuUGdpQXBUTg$xXiyTisD7390NijyCv5ICMhFW4eDuMlzypRoLGLyIvA
```

#### argon2

| `argon2` value |     | PHC hash parameter |
| -------------- | --- | ------------------ |
| `variant`      | →   | algorithm id       |
| `version`      | →   | `v`                |
| `memory`       | →   | `m`                |
| `time`         | →   | `t`                |
| `parallelism`  | →   | `p`                |

The variant should be `argon2id`, but older supported variants include `argon2d` and `argon2i`. The version must be `19`. The following memory, time (iterations), and parallelism settings are based on [OWASP recommendations](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id). Memory is specified in KiB with a minimum of 4,096 KiB (4 MiB) and maximum of 262,144 KiB (256 MiB). For time, there is a minimum of 1 iteration and a maximum of 5 iterations, except for `argon2i` which has a minimum of 3 iterations. Parallelism ranges from 1 to 8 threads. If your requirements fall outside of these guidelines, please [contact support](mailto:support@workos.com).

A valid `argon2` PHC formatted string looks like this:

```txt
$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$RdescudvJCsgt3ub+b+dWRWJTmaaJObG
```

For `firebase-scrypt` passwords, refer to the [Firebase Migration guide](https://workos.com/docs/migrate/firebase) for an example of how to format the `password_hash`.

For `ssha` passwords, use the following algorithm:

1. Generate a `salt`: random bytes
2. Hash the user's password and the `salt` using the SHA1 algorithm
3. Base64 encode the hash followed by the salt
4. Prepend the string with `{SSHA}`

A high-level representation is: `{SSHA}base64(sha1(password + salt) + salt)`.

Once imported, users can continue to sign-in with their existing password, **without** having to go through a password reset flow.

### Triggering password resets

If you are unable to export passwords from your existing data store, whether for security reasons or other limitations, you can programmatically trigger a password reset flow using the WorkOS [Password Reset API](https://workos.com/docs/reference/authkit/password-reset).

This process can be initiated at any time, and doesn't need to happen during the user import process.

Some applications may want to remove password-based authentication when switching to WorkOS, in favor of another method like Magic Auth. If this is the case for your application, you can skip dealing with passwords entirely.

### Migrating social auth users

If you have users who previously signed in using social auth providers, such as [Google](https://workos.com/docs/integrations/google-oauth) or [Microsoft](https://workos.com/docs/integrations/microsoft-oauth), those users can continue to sign in with those providers after you've migrated to WorkOS.

Check out our [integrations](https://workos.com/docs/integrations) page for guidance on configuring the relevant provider's client credentials in WorkOS.

After your provider is configured in WorkOS, users can sign in with their provider credentials and will be automatically linked to a WorkOS user. WorkOS uses the **email address** from the social auth provider to determine this match.

> Some users may need to verify their email address through WorkOS if email verification is enabled in your WorkOS environment's authentication settings.

Email verification behavior varies depending on whether the provider is known to verify email addresses. For example, users signing in using Google OAuth and a `gmail.com` email domain will not need to perform the extra verification step.

***

## (3) Enterprise Connections (SSO)

If your application uses enterprise SAML or OIDC connections for SSO, you can migrate them to WorkOS. The best strategy depends on how many connections you have and whether you control the existing SSO infrastructure.

### Choosing a migration strategy

### (A) Fewer than 15 connections — Admin Portal approach

For smaller deployments, the simplest path is to recreate each connection in WorkOS and coordinate with each customer's IT team to update their Identity Provider configuration. You can use the [Admin Portal](https://workos.com/docs/admin-portal) to let customers self-service their SSO setup, reducing the coordination burden.

For each connection:

1. Create or identify the WorkOS organization matching the existing organization
2. Share the [Admin Portal](https://workos.com/docs/admin-portal) link with the customer's IT team so they can update their IdP configuration to point to WorkOS
3. Watch for the `connection.activated` webhook to roll out the customer to the WorkOS connection

### (B) 15 or more connections — Transparent migration

For larger deployments, coordinating with every customer's IT team is impractical. Instead, you can perform a **transparent migration** so that IT admins do not need to reconfigure anything on their end. The approach depends on whether you are migrating from an external identity service or from a homegrown SSO implementation.

#### Route 1: Migrating from an external service (proxy approach)

If you are migrating from an external identity provider (such as Auth0, or another third-party service), you can place a proxy in front of the service's custom domain to route IdP callback traffic to WorkOS.

This approach requires that you have a **custom domain** configured with your current provider (e.g., `auth.your-domain.com`) so that you control the domain routing.

##### Requirements

- You have a custom domain configured with your current identity provider
- Your SAML enterprise connections do not use SAML Request Signing with the provider's tenant global key pairs
- Your SAML enterprise connections do not use SAML Response Encryption with the provider's tenant global key pairs

##### Configuring the callback proxy

Once connections are imported into WorkOS, configure a proxy in front of your custom domain to route IdP callback traffic to WorkOS. The proxy intercepts callbacks at your custom domain's callback path and redirects them to your WorkOS custom domain.

The proxy flow works as follows:

1. A user authenticates with their IdP, which posts the SAML response or OIDC callback to your custom domain
2. The proxy redirects the callback to WorkOS
3. WorkOS attempts to find a matching connection:
   - If found, it processes the response and redirects to your application's WorkOS callback
   - If not found, it redirects back with a `fallback` query parameter, and the proxy forwards the original callback to your existing provider

This fallback mechanism ensures zero downtime — connections that haven't been migrated yet continue to work through your existing provider.

The proxy can be implemented using Cloudflare redirect and transform rules, a Cloudflare Worker, or any reverse proxy you control. Contact [support@workos.com](mailto:support@workos.com) for a reference implementation and import assistance.

> We recommend performing a proof-of-concept in a staging environment before production to de-risk breaking changes in your setup.

#### Route 2: Migrating from a homegrown solution (callback modification)

If your application has its own SSO implementation where you directly handle IdP callbacks, you already control the callback endpoints. Instead of a proxy, you can modify your existing callback handlers to forward IdP responses to WorkOS using a feature flag mechanism.

##### Preparing connection data

The WorkOS migrations CLI can generate CSV templates for your connection data. There are separate templates for SAML and OIDC connections:

```bash
npx workos migrations export-template saml_connections --output saml_connections.csv
npx workos migrations export-template oidc_connections --output oidc_connections.csv
```

Or, using the interactive wizard:

```bash
npx workos migrations wizard
```

Select **Custom CSV** → **Generate a blank CSV template** → **SAML Connections** or **OIDC Connections**.

###### SAML connections CSV

| Column                   | Required | Description                                                         |
| ------------------------ | -------- | ------------------------------------------------------------------- |
| `organizationName`       | Yes      | Name of the organization                                            |
| `organizationId`         | Yes      | Your existing organization identifier                               |
| `organizationExternalId` | No       | External identifier for the organization                            |
| `domains`                | No       | Semicolon-separated list of domains (e.g., `acme.com;app.acme.com`) |
| `idpEntityId`            | No       | Identity Provider Entity ID                                         |
| `idpUrl`                 | No       | Identity Provider SSO URL                                           |
| `x509Cert`               | No       | IdP X.509 signing certificate                                       |
| `idpMetadataUrl`         | No       | IdP metadata URL                                                    |
| `customEntityId`         | No       | Custom SP Entity ID                                                 |
| `customAcsUrl`           | No       | Custom Assertion Consumer Service URL                               |
| `idpIdAttribute`         | No       | Attribute used for user identification (e.g., `email`)              |
| `emailAttribute`         | No       | SAML attribute for user email                                       |
| `firstNameAttribute`     | No       | SAML attribute for user first name                                  |
| `lastNameAttribute`      | No       | SAML attribute for user last name                                   |
| `nameAttribute`          | No       | SAML attribute for user full name                                   |
| `idpInitiatedEnabled`    | No       | Whether IdP-initiated SSO is enabled                                |
| `requestSigningKey`      | No       | Key used for signing SAML requests                                  |
| `assertionEncryptionKey` | No       | Key used for encrypting SAML assertions                             |
| `nameIdEncryptionKey`    | No       | Key used for encrypting SAML NameID                                 |
| `importedId`             | No       | Original connection ID from your previous provider                  |

###### OIDC connections CSV

| Column                   | Required | Description                                                         |
| ------------------------ | -------- | ------------------------------------------------------------------- |
| `organizationName`       | Yes      | Name of the organization                                            |
| `organizationId`         | Yes      | Your existing organization identifier                               |
| `organizationExternalId` | No       | External identifier for the organization                            |
| `domains`                | No       | Semicolon-separated list of domains (e.g., `acme.com;app.acme.com`) |
| `clientId`               | No       | OIDC client ID                                                      |
| `clientSecret`           | No       | OIDC client secret                                                  |
| `discoveryEndpoint`      | No       | OpenID Connect discovery URL                                        |
| `customRedirectUri`      | No       | Custom redirect URI                                                 |
| `importedId`             | No       | Original connection ID from your previous provider                  |

Fill in the appropriate template with your existing connection configurations and send it to [support@workos.com](mailto:support@workos.com) for import.

##### How it works

1. Export your connection configurations using the CSV template above and send to [support@workos.com](mailto:support@workos.com) for import into WorkOS
2. Modify your existing callback endpoint to check a [WorkOS Feature Flag](https://workos.com/docs/feature-flags) before processing the IdP response
3. For organizations flagged for WorkOS, forward the IdP response (SAMLResponse or authorization code) to WorkOS for processing
4. For organizations not yet migrated, continue processing through your existing flow

This gives you per-organization control over the migration without requiring IdP reconfiguration.

```typescript title="Callback modification with WorkOS Feature Flags"
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const featureFlags = workos.featureFlags.createRuntimeClient();
await featureFlags.waitUntilReady({ timeoutMs: 5000 });

async function handleSSOCallback(req: Request): Promise<Response> {
  const organizationId = extractOrganizationFromCallback(req);

  const useWorkOS = featureFlags.isEnabled('workos-sso-enabled', {
    organizationId,
  });

  if (useWorkOS) {
    // Forward the IdP response to WorkOS for processing
    const { user } = await workos.userManagement.authenticateWithCode({
      code: req.query.code,
      clientId: process.env.WORKOS_CLIENT_ID!,
    });
    return handleWorkOSUser(user);
  }

  // Continue with existing SSO flow for non-migrated organizations
  return handleExistingSSOCallback(req);
}
```

### Gradual rollout with Feature Flags

Regardless of which route you use, the authorization URL piece works the same way. You can use [WorkOS Feature Flags](https://workos.com/docs/feature-flags) to control which organizations use WorkOS SSO versus your existing provider during the migration. Create a feature flag (e.g., `workos-sso-enabled`) and target it to specific organizations as you migrate them.

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

  // Fall back to existing SSO provider for organizations not yet migrated
  return getExistingSSOAuthorizationUrl(organizationId);
}
```

This lets you gradually migrate organizations to WorkOS SSO, verify each one works correctly, and roll back individual organizations if needed — all without code deployments.

***

## (4) Handling interim new users

Many applications allow users to sign up at any time. If your app offers this feature, then you should consider the timing of your migration. If any users sign up after you've completed importing users into WorkOS, but before you've switched to WorkOS for authentication, then those users will have been omitted from the migration process.

There are two main strategies to handle this:

### (A) Disable signups during migration

The simplest solution is to schedule an appropriate time for the migration and disable signup while in progress. This may be done using temporary code added to your application and controlled by a feature flagging system.

After the migration is complete, your application should be updated to perform authentication using WorkOS, and the signup flag block disabled. This helps to ensure the export/import process captures all active users.

### (B) Use a dual-write strategy

For applications that want to avoid disabling signups, a "dual-write" strategy can be used.

![Diagram demonstrating the dual-write process.](https://images.workoscdn.com/images/656fbbac-adb1-4f99-b416-056d80e408ac.png?auto=format\&fit=clip\&q=80)\[border=false]

When a new user signs-up, in addition to creating a user record in the existing user store, the application should also create a matching record in WorkOS using the [Create User API](https://workos.com/docs/reference/authkit/user/create). As time passes, WorkOS will stay consistent with future new users, but a migration will still need to be performed for the historical set of users.

You will need to perform the same export and import process into WorkOS, but keeping in mind that some users will already exist in WorkOS as a result from the "dual-write".

While this minimizes forms of downtime for your application, there are other complications. For example, if a user updates their email or authentication method, you will need to perform the same update in WorkOS, at least until the migration process is complete.

### Which to choose?

Your timeline for completing the migration, along with your user's tolerances for disruption, will affect which strategy makes more sense for your application.

Disabling signups, or even sign-in entirely, and doing a "big-bang" migration by moving all users at the same time, could be reasonable for a smaller application. However, larger applications that are on the critical path for their customers may need a more careful path in order to provide consistent access.

## Wrapping-up

User management migration complexity can vary, so it is important to consider how existing application constraints will transfer to WorkOS. If you have any questions, reach out to [support@workos.com](mailto:support@workos.com) or via your team's WorkOS Slack channel for more help planning your migration.
