# Migrate from Firebase

## Introduction

The WorkOS AuthKit API allows you to migrate your existing user data from a variety of existing sources. In this guide, we'll walk through the steps to export your users from Firebase, and then import them into WorkOS.

## (1) Exporting Firebase user data

Firebase customers can export their user data using either the [Firebase CLI](https://firebase.google.com/docs/cli/auth#auth-export) or the [Firebase API](https://firebase.google.com/docs/reference). In this guide we'll be using the Firebase CLI, use the following command to retrieve a dump of all users in JSON or CSV format.

```bash title="Exporting users with the Firebase CLI"
firebase auth:export --project=<your_firebase_project_id> --format=json users.json
```

## (2) Importing users into WorkOS

After obtaining your user data from Firebase, it's time to import it into WorkOS.

### Using the WorkOS migrations CLI

The fastest way to import users is with the CLI:

```bash
npx workos migrations import --csv firebase-users.csv
```

Or for a guided experience: `npx workos migrations wizard`

Alternatively, use the WorkOS [Create User API](https://workos.com/docs/reference/authkit/user/create) to create a corresponding record in WorkOS for each exported user. Use the following mapping from the Firebase format to parameters in your WorkOS Create User API calls:

| Firebase        |     | WorkOS API       |
| --------------- | --- | ---------------- |
| `email`         | →   | `email`          |
| `emailVerified` | →   | `email_verified` |
| `displayName`   | →   | `first_name`     |
| `displayName`   | →   | `last_name`      |

### Importing passwords

If your users sign in to your Firebase application using passwords, you can choose to also import those password hashes. Firebase uses a [forked version of `scrypt`](https://firebaseopensource.com/projects/firebase/scrypt/) which can be directly imported during the [user creation](https://workos.com/docs/reference/authkit/user/create) process into WorkOS, or later using the [Update User API](https://workos.com/docs/reference/authkit/user/update).

First, retrieve your Firebase project's password hash parameters from the Firebase console following the [export documentation](https://firebase.google.com/docs/cli/auth#password_hash_parameters). These parameters are the `base64_signer_key`, `base64_salt_separator`, `rounds`, and `mem_cost`.

Next, retrieve the password salts and hashes for each of your individual Firebase users by running the [Firebase CLI `auth:export` command](https://firebase.google.com/docs/cli/auth#auth-export). Your Firebase users that have a password set will have a `passwordHash` and `salt` field present which will be imported into WorkOS.

Finally, you will need to format these parameters into a [PHC-compatible](https://github.com/P-H-C/phc-string-format/blob/5f1e4ec633845d43776849f503f8ce8314b5290c/phc-sf-spec.md) password hash following this Firebase to PHC hash parameter mapping:

| Firebase value          |     | PHC hash parameter |
| ----------------------- | --- | ------------------ |
| `base64_signer_key`     | →   | `sk`               |
| `base64_salt_separator` | →   | `ss`               |
| `rounds`                | →   | `r`                |
| `mem_cost`              | →   | `m`                |

The hash, salt, along with `sk` and `ss` parameters, should be [B64 encoded](https://github.com/P-H-C/phc-string-format/blob/5f1e4ec633845d43776849f503f8ce8314b5290c/phc-sf-spec.md#b64), which means trimming the `=` characters that represent base64 padding. Using a PHC-formatting library, like [`@phc/format`](https://www.npmjs.com/package/@phc/format) for Node, should handle this for you.

#### Import Firebase password hash

## Other authentication methods

Firebase authentication methods vary depending on your specific usage, and corresponding connections can be easily configured in WorkOS. This allows users to continue signing in with the same authentication methods, matching the previous sign in experience.

### Social Auth Providers

If your users "Sign in with Google" or similar, you can configure WorkOS to continue using those sign in methods. Migrating these connections involves providing the same client credentials (i.e. Client ID and Client Secret) to WorkOS as configured in Firebase.

For more details on supported connections, see the provider-specific integration guides, such as for [Microsoft](https://workos.com/docs/integrations/microsoft-oauth) and [Google](https://workos.com/docs/integrations/google-oauth).

Reach out to [support@workos.com](mailto:support@workos.com) if there are additional Social Auth providers you would like to see supported.

### Email Link

If your users sign in using [Email Link](https://firebase.google.com/docs/auth/web/email-link-auth), sometimes called "passwordless", you can achieve the same experience by adding WorkOS [Magic Auth](https://workos.com/docs/reference/authkit/magic-auth) to your application.

### OIDC and SAML

Enterprise authentication often uses standard protocols such as [OpenID Connect (OIDC)](https://firebase.google.com/docs/auth/web/openid-connect) or [SAML](https://firebase.google.com/docs/auth/web/saml) between your service and identity provider.

The same identity providers can be configured in WorkOS, preserving the sign in process familiar to your users. For specific instructions, see the guides on setting up [OIDC](https://workos.com/docs/integrations/oidc) and [SAML](https://workos.com/docs/integrations/saml) connections with WorkOS.
