> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Functions, storage & data > neon-auth
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The Neon CLI `neonctl neon-auth` command manages Neon Auth on a database branch from the terminal. Use `enable`, `status`, and `disable` to provision, inspect, or remove Neon Auth, and the `oauth-provider` subcommands to add, update, or delete Google, GitHub, and Vercel OAuth providers. The `domain` subcommands manage trusted redirect domains, including `allow-localhost` settings for local development. The `config` subcommands cover email and password authentication, the email provider, the organization plugin, and webhooks, while `plugins` and `user` let you inspect plugin configurations and manage auth users.

# Neon CLI command: neon-auth

Manage Neon Auth from the CLI

The `neon-auth` command manages [Neon Auth](https://neon.com/docs/auth/overview) on a database branch from the terminal. You can enable or disable Neon Auth, configure OAuth providers, trusted domains, email settings, and webhooks, and manage auth users.

Requires neonctl 2.23.0 or later. Check your version with `neonctl --version`.

Subcommands: [enable](https://neon.com/docs/cli/neon-auth#enable), [status](https://neon.com/docs/cli/neon-auth#status), [disable](https://neon.com/docs/cli/neon-auth#disable), [oauth-provider](https://neon.com/docs/cli/neon-auth#oauth-provider), [domain](https://neon.com/docs/cli/neon-auth#domain), [config](https://neon.com/docs/cli/neon-auth#config), [plugins](https://neon.com/docs/cli/neon-auth#plugins), [user](https://neon.com/docs/cli/neon-auth#user)

If `--project-id` or `--branch` are omitted, the CLI resolves them from your [context file](https://neon.com/docs/cli/set-context), auto-selects when there is only one option, and prompts otherwise.

## Enable and status

### neonctl neon-auth enable

Provisions Neon Auth on the current branch.

```bash
neonctl neon-auth enable [options]
```

| Option            | Description                        | Type   | Default | Required |
| ----------------- | ---------------------------------- | ------ | ------- | :------: |
| `--database-name` | Database name to use for auth data | string | —       |    No    |
| `--project-id`    | Project ID                         | string | —       |    No    |
| `--branch`        | Branch ID or name                  | string | —       |    No    |

```bash
neonctl neon-auth enable
```

### neonctl neon-auth status

Shows whether Neon Auth is configured on the branch and displays the current connection details.

```bash
neonctl neon-auth status [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth status
```

### neonctl neon-auth disable

Removes Neon Auth from the branch.

```bash
neonctl neon-auth disable [options]
```

| Option          | Description                                                        | Type    | Default | Required |
| --------------- | ------------------------------------------------------------------ | ------- | ------- | :------: |
| `--delete-data` | Permanently delete all Neon Auth data and schema from the database | boolean | `false` |    No    |
| `--project-id`  | Project ID                                                         | string  | —       |    No    |
| `--branch`      | Branch ID or name                                                  | string  | —       |    No    |

**Important:** The `--delete-data` option permanently deletes all Neon Auth data and schema from the database. This can't be undone.

Remove Neon Auth from the branch and delete its data:

```bash
neonctl neon-auth disable --delete-data
```

## OAuth providers

The `oauth-provider` subcommands manage the OAuth providers (`google`, `github`, and `vercel`) for the branch.

Subcommands: [list](https://neon.com/docs/cli/neon-auth#oauth-provider-list), [add](https://neon.com/docs/cli/neon-auth#oauth-provider-add), [update](https://neon.com/docs/cli/neon-auth#oauth-provider-update), [delete](https://neon.com/docs/cli/neon-auth#oauth-provider-delete)

### neonctl neon-auth oauth-provider list

Lists the OAuth providers configured for the branch.

```bash
neonctl neon-auth oauth-provider list [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth oauth-provider list
```

### neonctl neon-auth oauth-provider add

Adds an OAuth provider.

```bash
neonctl neon-auth oauth-provider add [options]
```

| Option                  | Description                                                                      | Type   | Default | Required |
| ----------------------- | -------------------------------------------------------------------------------- | ------ | ------- | :------: |
| `--provider-id`         | OAuth provider ID. Supported values: google, github, vercel                      | string | —       |    Yes   |
| `--oauth-client-id`     | OAuth client ID from your provider app. Omit to use Neon's shared OAuth app.     | string | —       |    No    |
| `--oauth-client-secret` | OAuth client secret from your provider app. Omit to use Neon's shared OAuth app. | string | —       |    No    |
| `--project-id`          | Project ID                                                                       | string | —       |    No    |
| `--branch`              | Branch ID or name                                                                | string | —       |    No    |

Add the Google OAuth provider with your own credentials:

```bash
neonctl neon-auth oauth-provider add --provider-id google --oauth-client-id <client-id> --oauth-client-secret <client-secret>
```

### neonctl neon-auth oauth-provider update

Updates the credentials for an existing OAuth provider.

```bash
neonctl neon-auth oauth-provider update [options]
```

| Option                  | Description                                                                      | Type   | Default | Required |
| ----------------------- | -------------------------------------------------------------------------------- | ------ | ------- | :------: |
| `--provider-id`         | OAuth provider ID. Supported values: google, github, vercel                      | string | —       |    Yes   |
| `--oauth-client-id`     | OAuth client ID from your provider app. Omit to use Neon's shared OAuth app.     | string | —       |    No    |
| `--oauth-client-secret` | OAuth client secret from your provider app. Omit to use Neon's shared OAuth app. | string | —       |    No    |
| `--project-id`          | Project ID                                                                       | string | —       |    No    |
| `--branch`              | Branch ID or name                                                                | string | —       |    No    |

```bash
neonctl neon-auth oauth-provider update --provider-id github --oauth-client-id <client-id> --oauth-client-secret <client-secret>
```

### neonctl neon-auth oauth-provider delete

Deletes an OAuth provider from the branch.

```bash
neonctl neon-auth oauth-provider delete [options]
```

| Option          | Description                                                 | Type   | Default | Required |
| --------------- | ----------------------------------------------------------- | ------ | ------- | :------: |
| `--provider-id` | OAuth provider ID. Supported values: google, github, vercel | string | —       |    Yes   |
| `--project-id`  | Project ID                                                  | string | —       |    No    |
| `--branch`      | Branch ID or name                                           | string | —       |    No    |

```bash
neonctl neon-auth oauth-provider delete --provider-id vercel
```

## Domains

The `domain` subcommands manage the trusted domains that Neon Auth accepts as redirect URIs for the branch.

Subcommands: [list](https://neon.com/docs/cli/neon-auth#domain-list), [add](https://neon.com/docs/cli/neon-auth#domain-add), [delete](https://neon.com/docs/cli/neon-auth#domain-delete), [allow-localhost](https://neon.com/docs/cli/neon-auth#domain-allow-localhost)

### neonctl neon-auth domain list

Lists the trusted domains configured for the branch.

```bash
neonctl neon-auth domain list [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth domain list
```

### neonctl neon-auth domain add

Adds a trusted domain.

```bash
neonctl neon-auth domain add <domain> [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth domain add example.com
```

### neonctl neon-auth domain delete

Deletes a trusted domain.

```bash
neonctl neon-auth domain delete <domain> [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth domain delete example.com
```

### neonctl neon-auth domain allow-localhost

Manages localhost connection settings for the branch.

Subcommands: [get](https://neon.com/docs/cli/neon-auth#domain-allow-localhost-get), [enable](https://neon.com/docs/cli/neon-auth#domain-allow-localhost-enable), [disable](https://neon.com/docs/cli/neon-auth#domain-allow-localhost-disable)

### neonctl neon-auth domain allow-localhost get

Gets the current localhost connection setting.

```bash
neonctl neon-auth domain allow-localhost get [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth domain allow-localhost get
```

### neonctl neon-auth domain allow-localhost enable

Allows localhost connections for local development.

```bash
neonctl neon-auth domain allow-localhost enable [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth domain allow-localhost enable
```

### neonctl neon-auth domain allow-localhost disable

Restricts localhost connections.

```bash
neonctl neon-auth domain allow-localhost disable [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth domain allow-localhost disable
```

## Configuration

The `config` subcommands configure auth features for the branch: email and password authentication, the email provider, the organization plugin, and webhooks.

Subcommands: [email-password](https://neon.com/docs/cli/neon-auth#config-email-password), [email-provider](https://neon.com/docs/cli/neon-auth#config-email-provider), [organization](https://neon.com/docs/cli/neon-auth#config-organization), [webhook](https://neon.com/docs/cli/neon-auth#config-webhook)

### neonctl neon-auth config email-password

Manages email and password authentication settings.

Subcommands: [get](https://neon.com/docs/cli/neon-auth#config-email-password-get), [update](https://neon.com/docs/cli/neon-auth#config-email-password-update)

### neonctl neon-auth config email-password get

Gets the current email and password configuration.

```bash
neonctl neon-auth config email-password get [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth config email-password get
```

### neonctl neon-auth config email-password update

Updates the email and password configuration.

```bash
neonctl neon-auth config email-password update [options]
```

| Option                                 | Description                                         | Type    | Default | Required |
| -------------------------------------- | --------------------------------------------------- | ------- | ------- | :------: |
| `--enabled`                            | Enable email and password authentication            | boolean | —       |    No    |
| `--email-verification-method`          | Email verification method                           | string  | —       |    No    |
| `--require-email-verification`         | Require email verification before users can sign in | boolean | —       |    No    |
| `--auto-sign-in-after-verification`    | Auto sign in users after verifying their email      | boolean | —       |    No    |
| `--send-verification-email-on-sign-up` | Send verification email on sign up                  | boolean | —       |    No    |
| `--send-verification-email-on-sign-in` | Send verification email on sign in                  | boolean | —       |    No    |
| `--disable-sign-up`                    | Disable new user sign ups                           | boolean | —       |    No    |
| `--project-id`                         | Project ID                                          | string  | —       |    No    |
| `--branch`                             | Branch ID or name                                   | string  | —       |    No    |

```bash
neonctl neon-auth config email-password update --enabled --require-email-verification
```

### neonctl neon-auth config email-provider

Manages the email provider configuration.

Subcommands: [get](https://neon.com/docs/cli/neon-auth#config-email-provider-get), [update](https://neon.com/docs/cli/neon-auth#config-email-provider-update), [test](https://neon.com/docs/cli/neon-auth#config-email-provider-test)

### neonctl neon-auth config email-provider get

Gets the current email provider configuration.

```bash
neonctl neon-auth config email-provider get [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth config email-provider get
```

### neonctl neon-auth config email-provider update

Updates the email provider configuration.

```bash
neonctl neon-auth config email-provider update [options]
```

| Option           | Description                                               | Type   | Default | Required |
| ---------------- | --------------------------------------------------------- | ------ | ------- | :------: |
| `--type`         | Email provider type Possible values: `standard`, `shared` | string | —       |    Yes   |
| `--host`         | SMTP host (required for standard)                         | string | —       |    No    |
| `--port`         | SMTP port (required for standard)                         | number | —       |    No    |
| `--username`     | SMTP username (required for standard)                     | string | —       |    No    |
| `--password`     | SMTP password (required for standard)                     | string | —       |    No    |
| `--sender-email` | Sender email address                                      | string | —       |    No    |
| `--sender-name`  | Sender display name                                       | string | —       |    No    |
| `--project-id`   | Project ID                                                | string | —       |    No    |
| `--branch`       | Branch ID or name                                         | string | —       |    No    |

Configure the `standard` email provider type with your own SMTP server:

```bash
neonctl neon-auth config email-provider update --type standard --host smtp.example.com --port 587 --username example_username --password AbC123dEf --sender-email noreply@example.com --sender-name "Example App"
```

### neonctl neon-auth config email-provider test

Sends a test email so you can verify your SMTP configuration.

```bash
neonctl neon-auth config email-provider test [options]
```

| Option              | Description                         | Type   | Default | Required |
| ------------------- | ----------------------------------- | ------ | ------- | :------: |
| `--recipient-email` | Email address to send test email to | string | —       |    Yes   |
| `--host`            | SMTP host                           | string | —       |    Yes   |
| `--port`            | SMTP port                           | number | —       |    Yes   |
| `--username`        | SMTP username                       | string | —       |    Yes   |
| `--password`        | SMTP password                       | string | —       |    Yes   |
| `--sender-email`    | Sender email address                | string | —       |    Yes   |
| `--sender-name`     | Sender display name                 | string | —       |    Yes   |
| `--project-id`      | Project ID                          | string | —       |    No    |
| `--branch`          | Branch ID or name                   | string | —       |    No    |

```bash
neonctl neon-auth config email-provider test --recipient-email user@example.com --host smtp.example.com --port 587 --username example_username --password AbC123dEf --sender-email noreply@example.com --sender-name "Example App"
```

### neonctl neon-auth config organization

Manages organization plugin settings.

Subcommands: [get](https://neon.com/docs/cli/neon-auth#config-organization-get), [update](https://neon.com/docs/cli/neon-auth#config-organization-update)

### neonctl neon-auth config organization get

Gets the current organization plugin configuration.

```bash
neonctl neon-auth config organization get [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth config organization get
```

### neonctl neon-auth config organization update

Updates the organization plugin configuration.

```bash
neonctl neon-auth config organization update [options]
```

| Option           | Description                                                             | Type    | Default | Required |
| ---------------- | ----------------------------------------------------------------------- | ------- | ------- | :------: |
| `--enabled`      | Enable the organization plugin                                          | boolean | —       |    No    |
| `--limit`        | Maximum number of organizations a user can create                       | number  | —       |    No    |
| `--creator-role` | Role assigned to organization creator Possible values: `admin`, `owner` | string  | —       |    No    |
| `--project-id`   | Project ID                                                              | string  | —       |    No    |
| `--branch`       | Branch ID or name                                                       | string  | —       |    No    |

```bash
neonctl neon-auth config organization update --enabled --limit 5 --creator-role owner
```

### neonctl neon-auth config webhook

Manages webhook configuration.

Subcommands: [get](https://neon.com/docs/cli/neon-auth#config-webhook-get), [update](https://neon.com/docs/cli/neon-auth#config-webhook-update)

### neonctl neon-auth config webhook get

Gets the current webhook configuration.

```bash
neonctl neon-auth config webhook get [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth config webhook get
```

### neonctl neon-auth config webhook update

Updates the webhook configuration.

```bash
neonctl neon-auth config webhook update [options]
```

| Option             | Description                                                                                           | Type    | Default | Required |
| ------------------ | ----------------------------------------------------------------------------------------------------- | ------- | ------- | :------: |
| `--enabled`        | Enable webhooks                                                                                       | boolean | —       |    Yes   |
| `--url`            | Webhook endpoint URL                                                                                  | string  | —       |    No    |
| `--enabled-events` | Events to enable Possible values: `user.before_create`, `user.created`, `send.otp`, `send.magic_link` | string  | —       |    No    |
| `--timeout`        | Webhook timeout in seconds (1-10)                                                                     | number  | —       |    No    |
| `--project-id`     | Project ID                                                                                            | string  | —       |    No    |
| `--branch`         | Branch ID or name                                                                                     | string  | —       |    No    |

```bash
neonctl neon-auth config webhook update --enabled --url https://example.com/webhooks/neon-auth --enabled-events user.created --timeout 5
```

## Plugins

The `plugins` subcommands show the Neon Auth plugin configurations for the branch.

Subcommands: [list](https://neon.com/docs/cli/neon-auth#plugins-list), [get](https://neon.com/docs/cli/neon-auth#plugins-get)

### neonctl neon-auth plugins list

Lists all plugin configurations.

```bash
neonctl neon-auth plugins list [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth plugins list
```

### neonctl neon-auth plugins get

Gets a specific plugin configuration.

```bash
neonctl neon-auth plugins get <plugin-name> [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth plugins get organization
```

## Users

The `user` subcommands manage Neon Auth users on the branch.

Subcommands: [create](https://neon.com/docs/cli/neon-auth#user-create), [delete](https://neon.com/docs/cli/neon-auth#user-delete), [set-role](https://neon.com/docs/cli/neon-auth#user-set-role)

### neonctl neon-auth user create

Creates an auth user.

```bash
neonctl neon-auth user create [options]
```

| Option         | Description                                           | Type   | Default | Required |
| -------------- | ----------------------------------------------------- | ------ | ------- | :------: |
| `--email`      | User email address                                    | string | —       |    Yes   |
| `--name`       | User display name (defaults to email if not provided) | string | —       |    No    |
| `--project-id` | Project ID                                            | string | —       |    No    |
| `--branch`     | Branch ID or name                                     | string | —       |    No    |

```bash
neonctl neon-auth user create --email alex@example.com --name "Alex Lopez"
```

### neonctl neon-auth user delete

Deletes an auth user.

```bash
neonctl neon-auth user delete <user-id> [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth user delete <user-id>
```

### neonctl neon-auth user set-role

Sets roles for an auth user.

```bash
neonctl neon-auth user set-role <user-id> [options]
```

| Option         | Description       | Type   | Default | Required |
| -------------- | ----------------- | ------ | ------- | :------: |
| `--roles`      | Roles to assign   | string | —       |    Yes   |
| `--project-id` | Project ID        | string | —       |    No    |
| `--branch`     | Branch ID or name | string | —       |    No    |

```bash
neonctl neon-auth user set-role <user-id> --roles admin
```

---

## Related docs (Functions, storage & data)

- [functions](https://neon.com/docs/cli/functions)
- [bucket](https://neon.com/docs/cli/bucket)
- [data-api](https://neon.com/docs/cli/data-api)
