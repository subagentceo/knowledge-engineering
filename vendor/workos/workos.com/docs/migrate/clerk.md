# Migrate from Clerk

## Introduction

The WorkOS AuthKit API allows you to migrate your existing user data from a variety of existing sources. In this guide, we will walk through the steps to export, and then import your users from Clerk.

***

## (1) Export Clerk user data

Clerk allows for exporting user data [directly from their API](https://clerk.com/docs/deployments/exporting-users) using their Backend SDK.

### Export passwords

If your Clerk users currently sign in using password-based authentication, and you'd like to import those passwords into WorkOS, then you'll need to use the [Clerk backend API](https://clerk.com/changelog/2024-10-23-export-users) to export them with your user data as a CSV file.

> Clerk does not make the plaintext passwords available for export.

***

## (2) Import users into WorkOS

Once you've obtained the necessary export files, you have two options for importing your user data into WorkOS.

### (A) Using the WorkOS migrations CLI

The fastest way to import users into WorkOS is with the CLI:

```bash
npx workos migrations import --csv clerk-users.csv
```

For a guided, interactive experience:

```bash
npx workos migrations wizard
```

If you'd rather write your own code, the same process can be completed using the public WorkOS APIs, as described below.

### (B) Using WorkOS APIs

Using the data either from the Clerk API or from a JSON file received from their support team, you can use the WorkOS API to [create users](https://workos.com/docs/reference/authkit/user/create) during the import. Keep in mind that user creation is rate-limited. You can view the docs on the [rate limits](https://workos.com/docs/reference/rate-limits) for more information.

Using the default fields from the [Clerk export](https://clerk.com/docs/deployments/exporting-users), use the following mapping from Clerk to parameters in your WorkOS Create User API calls:

| Clerk             |     | WorkOS API   |
| ----------------- | --- | ------------ |
| `email_addresses` | →   | `email`      |
| `first_name`      | →   | `first_name` |
| `last_name`       | →   | `last_name`  |

### Handle users with multiple email addresses

In the case of a user with multiple email addresses, Clerk separates them with a pipe symbol:

```json
"email_addresses": "john@example.com|john.doe@example.com",
```

Unfortunately there's no way to know which email is the primary one from the export alone. Clerk does expose this information by retrieving the [User object from their API](https://clerk.com/docs/references/javascript/user/user#properties).

### Import passwords

If you also exported passwords from Clerk, you can import them during the [user creation](https://workos.com/docs/reference/authkit/user/create) process, or later using the WorkOS [Update User API](https://workos.com/docs/reference/authkit/user/update).

Clerk uses the `bcrypt` password hashing algorithm, which is supported by WorkOS. Make sure to pass the following parameters to the WorkOS API:

- The `password_hash_type` set to `'bcrypt'`
- The `password_hash` set to the `password_digest` field from your Clerk export

### Migrate social auth users

If you have users who previously signed in through Clerk using social auth providers, such as [Google](https://workos.com/docs/integrations/google-oauth) or [Microsoft](https://workos.com/docs/integrations/microsoft-oauth), those users can continue to sign in with those providers after you've migrated to WorkOS.

Check out our [integrations](https://workos.com/docs/integrations) page for guidance on configuring the relevant provider's client credentials in WorkOS.

After your provider is configured in WorkOS, users can sign in with their provider credentials and will be automatically linked to a WorkOS user. WorkOS uses the **email address** from the social auth provider to determine this match.

***

## (3) Create organizations

Clerk's [organizations](https://clerk.com/docs/organizations/overview) are analogous to WorkOS [organizations](https://workos.com/docs/reference/organization) – both represent a B2B customer.

### Creating Organizations

If you'd like to export your Clerk organizations, you can use the [Clerk Backend SDK](https://clerk.com/docs/references/backend/organization/get-organization-list) to programmatically paginate through each organization. You can then use the WorkOS API to [create matching organizations](https://workos.com/docs/reference/organization/create).

### Adding user memberships

You can export Clerk organization memberships using Clerk's [Backend SDK](https://clerk.com/docs/references/backend/organization/get-organization-membership-list), and then use the WorkOS [Organization Membership API](https://workos.com/docs/reference/authkit/organization-membership/create) to add each user to their respective organization.

***

## (4) Multi-Factor Auth

There are some differences between the MFA strategies offered by Clerk and WorkOS.

Clerk supports SMS-based second factors, however WorkOS does not due to known security issues with SMS. Users who have SMS-based second factors will need to switch to using email-based Magic Auth, or re-enroll in MFA using a TOTP-based authenticator instead. See the [MFA guide](https://workos.com/docs/authkit/mfa) for more information on enrolling users.

***

## Next steps

After the import, you can now start using WorkOS to manage your users. If you haven't, take a look at our [Quick Start guide](https://workos.com/docs/authkit) to learn how to integrate WorkOS AuthKit into your application.
