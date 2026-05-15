# Stripe Projects CLI

Add third-party services to your app, sync credentials to your project, and manage upgrades.

For more details, see the [Stripe CLI reference](https://docs.stripe.com/cli.md).

A Stripe project represents a single app or codebase, and groups together a provider account’s services and resources.

- **Provider account**: The account with your provider, such as Vercel, Supabase, Clerk, or PostHog.
- **Service**: The provider’s product offerings, such as a database, authorization, or analytics.
- **Resource**: An instance of the service for your account, and the associated credentials and environment variables. For example, `test-db-1`, `auth`, or `test-analytics-1`.

You can use a project to:

- Associate an existing provider account or create a new one
- Provision resources, such as databases, authorization instances, and analytics projects
- Store credentials in the vault and sync them to your environment (`.env`) as environment variables
- Manage upgrades and rotate credentials

After you associate a provider account with your Stripe account, it remains authorized until you explicitly remove the association. You can reuse a provider account for new projects in the same Stripe account. If you want to use a different Stripe account, you must associate the provider account again.

You can initialize a project in a new directory or an existing codebase. If you use an existing codebase and add services, new credentials and environment variables are merged into your existing environment (`.env`) and project configuration.

## Before you begin

- A Stripe account
- The [Stripe CLI](https://docs.stripe.com/stripe-cli/install.md) installed and up to date
- The Projects plugin installed:

```bash
stripe plugin install projects
```

If you need to upgrade the `projects` plugin, run:

```bash
stripe plugin upgrade projects
```

If your current Stripe CLI version doesn’t support the Projects plugin, [upgrade the Stripe CLI](https://docs.stripe.com/stripe-cli/upgrade.md).

### Use a coding agent 

You can install the Stripe Projects agent skill and ask the coding agent to provision services directly without an existing project. From an empty directory, describe the services you want and the agent installs the required CLIs, initializes the project, and configures everything automatically.

```bash
npx skills add https://docs.stripe.com 
provision a database, hosting, and analytics
```

You can also ask a coding agent to install the Stripe CLI, and Projects plugin:

```bash
Install the Stripe CLI, install the `projects` plugin, verify `stripe projects --help` works.
```

## How credentials work 

Stripe Projects fetches credentials from each provider on your behalf, encrypts them in `.projects/vault/vault.json`, and stores them in the Stripe [Secret Store](https://docs.stripe.com/stripe-apps/store-secrets.md):

- **Local files**: `.projects/vault/vault.json` stores an encrypted copy of your credentials. Your `.env` is plaintext for local development. The CLI creates both files with `600` permissions, so only you can read them on your machine. Don’t commit either file to version control—`stripe projects init` adds them to `.gitignore` automatically.
- **On removal**: Running `stripe projects remove <service>` deprovisions the resource and removes it from your project state. The CLI doesn’t delete any credentials previously written to `.env` or `.projects/vault/`. Remove those manually, or run `stripe projects env --pull` to overwrite them with the current credential set.

To use your credentials in a production hosting environment, see [Set up production environment variables](https://docs.stripe.com/projects.md#production-env).

## Quickstart 

This example attaches hosting, a database, authentication, and analytics to a project, then syncs credentials into your local environment.

```bash
# Create a project
stripe projects init

# Associate a provider account or add a service
stripe projects link vercel
# or
stripe projects add vercel/project

# Add more services
stripe projects add clerk/auth
stripe projects add posthog/analytics
```

Stripe Projects stores credentials in the vault, and syncs the environment variables to your local environment (`.env`) automatically:

```bash
VERCEL_PROJECT_ID=...
SUPABASE_DATABASE_URL=...
CLERK_SECRET_KEY=...
POSTHOG_PROJECT_API_KEY=...
```

## Create a project 

Run `init` in the directory you want to use for your project:

```bash
stripe projects init [name]
```

This initializes a Stripe project for that directory. If you omit the name, Stripe Projects uses the folder name.

Stripe Projects writes the project state under `.projects/`, which tracks the associated provider accounts, provisioned resources, and local project configuration. You can see the tools your project uses in `.projects/state.json`. The `.projects/state.local.json` file in your private repo contains the resource IDs that your team needs to share the same project state.

### File reference 

| File or folder     | Purpose                                                                                                                                     | Commit to version control?               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `state.json`       | Shared project state for the services, resources, and configuration your team uses.                                                         | Yes                                      |
| `state.local.json` | Your local overrides and machine-specific settings. Stores associations between your project resources and your personal provider accounts. | Yes1                                     |
| `.projects/vault/` | Encrypted credential cache written by the CLI after provisioning or `env --pull`.                                                           | No, added to `.gitignore` automatically2 |
| `.projects/cache/` | CLI metadata cache used for performance.                                                                                                    | No, added to `.gitignore` automatically  |
| `.env`             | Plaintext credentials for local development, written by `env --pull`.                                                                       | No, added to `.gitignore` automatically  |

1 Despite the `.local` naming convention, you still commit `state.local.json`. It stores the associations between your project resources and your personal provider accounts. Your teammates need this file to link their own accounts correctly with `stripe projects link`. If you exclude it from version control, your teammates receive an error when they try to link.

2 This is a local credential cache, not a shared secrets distribution system. Each teammate runs `stripe projects env --pull` on their own machine to fetch their own credentials from the Stripe Secret Store.

## Use a coding agent 

When you initialize a project, Stripe Projects writes coding agent skills into the local project directory. These skills provide context and actions for your agent to work with your project through the Stripe Projects workflow.

You can then ask your agent to complete tasks, such as:

- “Link my existing Neon account and provision a database.”
- “Add Turso auth and PostHog on the free tier.”
- “Set up the services this repo needs and explain what changed.”

Your agent uses the same Stripe Projects CLI commands. This means you can provision, upgrade, configure, and sync credentials using the same deterministic, auditable path as using the CLI directly.

To avoid browser pop-ups during provisioning and credential exchange, we recommend the following flow:

- Sign in to your Stripe account.
- Associate your existing provider account (or create a new one) with `stripe projects link`.
- Add a payment method with `stripe projects billing add`.
- Start the agent session.

## Check project status 

After you’ve added services or connected providers, run `status` to review your project:

```bash
stripe projects status
```

This shows your project name, Stripe account, associated provider accounts, provisioned resources, current tiers, and health status.

## Integrate projects into your workflow 

You can use Stripe Projects for new apps, existing codebases, and active setups.

### Start a new project 

If you have a new app, you can create a project, associate provider accounts or create new ones, and provision resources, such as a database, authorization, and analytics.

### Add services to an existing codebase 

You can initialize Stripe Projects in an existing application directory. If you use an existing directory and add services, new credentials and environment variables are merged into your existing environment (`.env`) and project configuration. This is useful when an app already has hosting but requires services, such as a database, authentication, analytics, feature flags, or other managed infrastructure.

### Manage an existing setup 

When you associate the provider accounts you already use with your Stripe account, the project is represented in a single location. This also allows you to associate existing resources and add relevant environment variables.

## Browse the service catalog 

Use `catalog` to list all available providers, their service categories, plan tiers, add-ons, and pricing:

```bash
stripe projects catalog
stripe projects catalog <provider>
stripe projects catalog <category>
```

Use `search` to explore all available provider services related to a keyword:

```bash
stripe projects search <keyword>
```

## Manage a service 

### Add a service 

Add a provider’s service to your project:

```bash
stripe projects add <provider>/<service>
```

When you add a service, this action associates an existing provider account with your Stripe account or creates one, before adding the service.

Adding a service provisions a resource in your provider account. Use the `add` command to provision a database, auth instance, analytics project, feature flags, or other managed infrastructure for your app.

### Associate a provider with the link command 

Associate a provider account or create an account without provisioning a resource. This is helpful in agent-driven workflows, when you want to establish a connection with the provider before provisioning resources.

```bash
stripe projects link <provider>
```

### Remove a service 

Remove a service from your provider account and local project:

```bash
stripe projects remove <provider>/<service>
#or
stripe projects remove <resource_name>
```

### Rotate a credential 

Rotate credentials for a specific service:

```bash
stripe projects rotate <provider>/<service>
#or
stripe projects rotate <resource_name>
```

### Upgrade a service tier 

You can upgrade the service tier when a service needs more capacity, features, or limits than the current tier provides.

```bash
stripe projects upgrade <provider> | <provider>/<service> | <resource_name>
```

Before upgrading, review the current tier for each service in the status or your provider dashboard.

You only need to add your payment method to Stripe once. When you select a paid plan in the CLI, Stripe tokenizes your payment credentials into a [Shared Payment Token](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md) and grants the provider a payment credential for that upgrade. The provider charges using that token. Your underlying payment credentials aren’t shared.

> See [which countries support paid services](https://docs.stripe.com/projects/paid-tier-countries.md).

### Open a provider dashboard 

Open a provider’s dashboard in your default browser:

```bash
stripe projects open <provider>
```

## Manage environment variables 

Stripe Projects stores credentials in the vault, and syncs environment variables to your local environment (`.env`) automatically when you add or change services.

### List variables 

Display all project environment variables. Values aren’t revealed in the output:

```bash
stripe projects env
```

Environment variables also sync automatically after resource provisioning.

### Sync variables 

Update your local `.env` files and replenish your credentials vault. It also updates automatically after resource provisioning.

```bash
stripe projects env --pull
```

### When to run env --pull 

`env --pull` runs automatically after you provision a service, rotate credentials, or upgrade a resource. You don’t need to run it manually in those cases.

Run `env --pull` manually when:

- You’re setting up the project on a new machine or after cloning the repo.
- A teammate provisioned or rotated a resource and you need to pick up the updated credentials.
- Your `.env` was deleted or corrupted and you need to restore it.
- You want to verify that your local credentials match the current project state.

```bash
stripe projects env --pull
```

### Set up production environment variables 

`stripe projects env --pull` writes credentials to a local `.env` file for local development. It doesn’t write environment variables to your production host.

To use the same credentials in production, add them to your host’s environment variable settings. Stripe Projects doesn’t automate this step.

> Often providers have their own CLI tools that can read from a `.env` file. Check your provider’s documentation for the recommended import workflow.

### Manage multiple environments 

Stripe Projects doesn’t support named environments (development, staging, production) within a single project. Create a separate project for each environment instead (for example, development, staging, and production). Each project has its own independent state and credentials.

```bash
# Staging environment
stripe projects init my-app-staging

# Production environment
stripe projects init my-app-production
```

## Manage billing 

Payment methods are associated with your Stripe account.

### View the payment method 

Display your payment method on file:

```bash
stripe projects billing show
```

### Add or update a payment method 

Add a payment method or replace an existing one:

```bash
stripe projects billing add
```

## Generate LLM context 

Display and write a local file that combines your project context with all provider-supplied LLM context files:

```bash
stripe projects llm-context
```

## Available providers 

These providers co-designed the integration protocol with Stripe. The protocol standardizes provisioning, plan selection, upgrades, and credential handoff.

| Provider     | Primary categories                                          |
| ------------ | ----------------------------------------------------------- |
| AgentMail    | Email                                                       |
| Algolia      | Search                                                      |
| Amplitude    | Analytics, feature flags                                    |
| Auth0        | Auth                                                        |
| Browserbase  | Browser, AI                                                 |
| Chroma       | Database, AI                                                |
| Clerk        | Authentication                                              |
| Cloudflare   | Hosting, database, storage, domains, cache, queues, browser |
| Daytona      | Sandboxes, hosting                                          |
| Elevenlabs   | AI                                                          |
| Firecrawl    | Search                                                      |
| Fly.io       | Hosting, database                                           |
| GitLab       | CI/CD, observability, storage                               |
| Hugging Face | AI, hosting, storage                                        |
| Inngest      | Queue                                                       |
| Mixpanel     | Analytics                                                   |
| Neon         | Database, authentication                                    |
| Netlify      | Hosting                                                     |
| OpenRouter   | AI                                                          |
| PlanetScale  | Database                                                    |
| PostHog      | Analytics, feature flags                                    |
| Privy        | Payments, authentication                                    |
| Railway      | Hosting, database, storage, cache                           |
| Render       | Hosting, database                                           |
| Runloop      | Sandboxes, AI                                               |
| Sentry       | Observability                                               |
| Squarespace  | Domains                                                     |
| Supabase     | Database, authentication, storage                           |
| Turso        | Database                                                    |
| Twilio       | Communications                                              |
| Upstash      | Cache, search, database                                     |
| Vercel       | Hosting                                                     |
| WorkOS       | Auth                                                        |

Run `stripe projects catalog` at any time to view the most current list of providers and available service tiers. Or view the directory at [projects.dev/providers](https://projects.dev/providers).

> #### Request a provider
> 
> Contact [provider-request@stripe.com](mailto:provider-request@stripe.com) if you’re interested in becoming a provider on the Stripe Projects network or want to request a specific provider.

## Use non-interactive environments 

Every command supports flags for non-interactive environments such as CI/CD pipelines, scripts, and agents.

### Global flags 

| Flag               | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `-v, --version`    | Show current plugin version.                                                                        |
| `--json`           | Return output as structured JSON instead of formatted text.                                         |
| `--no-interactive` | Disable interactive prompts and confirmation dialogs. Commands fail when required input is missing. |
| `--auto-confirm`   | Accept confirmation prompts automatically, for example when you remove a service.                   |
| `--quiet`          | Suppress non-essential output and only return final results or errors.                              |
| `--accept-tos`     | Accept provider ToS without prompting.                                                              |
| `--stream`         | Enable streaming output animations.                                                                 |
| `--debug`          | Enable debug logging for Stripe API requests.                                                       |

## Command reference 

| Command                                   | Description                                                      |
| ----------------------------------------- | ---------------------------------------------------------------- |
| `add <provider>/<service>`                | Add a service to your project.                                   |
| `billing add`                             | Add or replace a payment method.                                 |
| `billing show`                            | View the current payment method.                                 |
| `catalog`                                 | List available providers, categories, and services.              |
| `downgrade <service_reference> [service]` | Downgrade to a lower tier or free plan if supported by provider. |
| `env [--pull]`                            | List or sync project environment variables.                      |
| `init <name>`                             | Create a project and sign in or register.                        |
| `link <provider>`                         | Connect a provider to your project.                              |
| `llm-context`                             | Generate a combined LLM context file.                            |
| `open <provider>`                         | Open a provider’s dashboard in the browser.                      |
| `remove <service_reference>`              | Remove a service from your project.                              |
| `rotate <service_reference>`              | Rotate credentials for a service.                                |
| `search`                                  | List available provider services based on a keyword.             |
| `services list`                           | Shows all services in a project.                                 |
| `status`                                  | View project name, services, tiers, and health.                  |
| `switch-account`                          | Switch to a different Stripe account.                            |
| `unlink <provider>`                       | Disconnect a provider from your project.                         |
| `update <service_reference> [service]`    | Update a resource within the same provider.                      |
| `upgrade <service_reference> [service]`   | Change the tier of a service.                                    |
