# AI Installer & CLI

## Introduction

The WorkOS CLI is a comprehensive tool for integrating and managing WorkOS from the terminal. Its headline feature is the **AI Installer** — run one command and it handles framework detection, SDK installation, route creation, environment setup, and build validation. Beyond the installer, the CLI also manages resources, provisions environments, and equips your coding agents with WorkOS knowledge.

#### npx

#### Global install

***

## AI Installer

Run one command, the CLI handles the rest. Your app goes from zero auth to full AuthKit integration in about two minutes.

```bash
$ npx workos@latest install

◆  Detected Next.js 15.3.1 (App Router)
│
◇  Opening browser for WorkOS authentication...
│  Authenticated as nick@example.com
│
◇  Configuring your WorkOS dashboard...
│  ✓ Redirect URI set to http://localhost:3000/callback
│  ✓ Homepage URL set to http://localhost:3000
│
◇  Installing @workos-inc/authkit-nextjs...
│  ✓ Package installed
│
◇  Analyzing project structure...
│  ✓ Created /app/callback/route.ts
│  ✓ Created proxy.ts
│  ✓ Updated /app/layout.tsx with AuthKitProvider
│  ✓ Created .env.local
│
◇  Validating integration...
│  ✓ Build completed successfully
│
◆  AuthKit is ready. Run `npm run dev` to get started.
```

> **Prefer to configure things yourself?** Follow one of our [framework-specific guides](https://workos.com/docs/authkit/landing/or-install-using-your-preferred-stack) instead.

### What the installer handles

The installer takes care of everything you would normally do manually:

1. **Detects your framework** — Identifies your framework and version from your project's dependencies and file structure
2. **Authenticates your account** — Opens your browser for secure WorkOS sign-in
3. **Configures your dashboard** — Sets redirect URIs, CORS origins, and homepage URL automatically
4. **Installs the right SDK** — Adds the correct AuthKit package for your framework
5. **Analyzes your project** — Reads your project structure to understand routing, existing middleware, and configuration
6. **Creates routes and middleware** — Writes OAuth callback routes, auth middleware/proxy, and provider wrappers
7. **Sets up environment variables** — Writes API keys and configuration to `.env.local`
8. **Validates the integration** — Runs your build to verify everything compiles without errors

The installer understands framework-specific nuances — like Next.js App Router vs Pages Router, Vite vs Create React App, and React Router nuances — and generates the appropriate code for your setup. If you have existing middleware or configuration, it composes with it rather than replacing it.

### Supported frameworks

| Framework               | SDK                                  |
| ----------------------- | ------------------------------------ |
| **Next.js**             | `@workos-inc/authkit-nextjs`         |
| **React**               | `@workos-inc/authkit-react`          |
| **React Router**        | `@workos-inc/authkit-react-router`   |
| **TanStack Start**      | `@workos-inc/authkit-tanstack-start` |
| **SvelteKit**           | `@workos-inc/authkit-sveltekit`      |
| **Node.js / Express**   | `@workos-inc/node`                   |
| **Vanilla JS**          | `workos`                             |
| **Python / Django**     | `workos` (pip)                       |
| **Ruby / Rails**        | `workos` (gem)                       |
| **Go**                  | `github.com/workos/workos-go`        |
| **PHP**                 | `workos/workos-php`                  |
| **PHP / Laravel**       | `workos/workos-php-laravel`          |
| **.NET / ASP.NET Core** | `WorkOS.net`                         |
| **Kotlin**              | `com.workos:workos-kotlin`           |
| **Elixir / Phoenix**    | `workos` (hex)                       |

### How the installer works

The CLI uses an AI agent with restricted permissions to integrate AuthKit into your project:

1. **Local analysis** — The agent reads your project files locally to detect frameworks and understand your project structure.
2. **Restricted execution** — The agent can only run a limited set of commands: package installation, builds, type-checking, and formatting. It cannot run arbitrary shell commands.
3. **File modifications** — The agent creates and edits files in your project to set up the AuthKit integration. Use `git diff` after installation to review every change.
4. **Dashboard configuration** — The CLI configures your WorkOS dashboard settings (redirect URIs, CORS) using your authenticated session.

### Install options

| Flag                   | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| `--integration <name>` | Skip auto-detection and specify your framework manually               |
| `--redirect-uri <uri>` | Custom OAuth callback URI (default: `http://localhost:3000/callback`) |
| `--no-validate`        | Skip post-install build validation                                    |
| `--debug`              | Verbose logging for troubleshooting                                   |

***

## Coding agent skills

Install WorkOS knowledge directly into your AI coding agent so it understands AuthKit when helping you write code. Skills give agents context about WorkOS APIs, SDKs, and integration patterns — so they produce correct integration code without you having to explain WorkOS concepts.

```bash
$ workos skills install

Installing skills...

✓ Installed 2 skill(s):

  workos-authkit → Claude Code
  workos-authkit → Cursor

Done!
```

Supported agents:

| Agent           | Skills directory         |
| --------------- | ------------------------ |
| **Claude Code** | `~/.claude/skills`       |
| **Codex**       | `~/.codex/skills`        |
| **Cursor**      | `~/.cursor/skills`       |
| **Goose**       | `~/.config/goose/skills` |

Use `workos skills list` to see available and installed skills, and `workos skills uninstall` to remove them.

***

## Manage resources

The CLI provides full CRUD operations for WorkOS resources directly from the terminal — organizations, users, roles, permissions, connections, directories, webhooks, vault secrets, feature flags, and more.

```bash
$ workos org create "Acme Corp" acme.com

Created organization
{
  "id": "org_01J...",
  "name": "Acme Corp",
  "domains": ["acme.com"]
}
```

```bash
$ workos role list

Slug       Name       Type         Permissions  Created
─────────────────────────────────────────────────────────
admin      Admin      environment  8            3/16/2026
viewer     Viewer     environment  2            3/16/2026
```

All resource commands support `--json` for scripting and CI pipelines. In non-TTY environments (pipes, CI runners, coding agents), JSON output is enabled automatically.

***

## Workflow commands

Compound commands that compose multiple API calls for common tasks.

### Declarative provisioning with `seed`

Define your permissions, roles, organizations, and config in a YAML file and provision them in one command. The CLI tracks state so you can tear everything down cleanly with `--clean`.

```yaml title="workos-seed.yaml"
permissions:
  - name: 'Read Users'
    slug: 'read-users'
  - name: 'Write Users'
    slug: 'write-users'
roles:
  - name: 'Admin'
    slug: 'admin'
    permissions: ['read-users', 'write-users']
  - name: 'Viewer'
    slug: 'viewer'
    permissions: ['read-users']
organizations:
  - name: 'Acme Corp'
    domains: ['acme.com']
config:
  redirect_uris: ['http://localhost:3000/callback']
  cors_origins: ['http://localhost:3000']
  homepage_url: 'http://localhost:3000'
```

```bash
$ workos seed

  Created permission: read-users
  Created permission: write-users
  Created role: admin
  Set permissions on admin: read-users, write-users
  Created role: viewer
  Set permissions on viewer: read-users
  Created org: Acme Corp (org_01J...)

Seed complete.
State saved to .workos-seed-state.json
```

### Other workflow commands

| Command                           | Description                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `workos setup-org <name>`         | Create an org with optional domain verification, roles, and Admin Portal link            |
| `workos onboard-user <email>`     | Send an invitation with optional role assignment — use `--wait` to poll until acceptance |
| `workos debug-sso <connectionId>` | Inspect SSO connection state and recent auth event history                               |
| `workos debug-sync <directoryId>` | Inspect directory sync state, user/group counts, and detect stalls                       |

***

## Environments

Manage multiple WorkOS environments, switch between them, and authenticate — all from the terminal.

```bash
$ workos auth login

Starting authentication...
Open this URL in your browser:
  https://dashboard.workos.com/...

Waiting for authentication...
Authentication successful!
Logged in as nick@example.com
```

```bash
$ workos env list

   Name              Type
────────────────────────────────
 ▸ production       Production
   staging          Sandbox
   local            Sandbox
```

Use `workos env switch` to change environments and `workos env add` to configure new ones. Run `workos doctor` to diagnose integration issues in the current project — it checks your SDK version, environment configuration, connectivity, dashboard settings, and auth patterns.

***

## Prerequisites

- Node.js 20+
- A [WorkOS account](https://dashboard.workos.com)
- A project using one of the [supported frameworks](#supported-frameworks) (for the AI installer)

***

## Troubleshooting

### The installer didn't detect my framework

Use the `--integration` flag to specify your framework manually:

```bash
npx workos@latest install --integration nextjs
```

### Build validation failed

Run the installer with `--debug` for detailed output. Make sure your project builds cleanly before running the installer — pre-existing build errors will cause validation to fail.

```bash
npx workos@latest install --debug
```

### I want to see what changed

After the installer completes, use `git diff` to review all the files it created or modified:

```bash
git diff
```

### Something else went wrong

Run `workos doctor` to diagnose common issues. If the problem persists, [open an issue on GitHub](https://github.com/workos/cli/issues) with the output from `--debug` mode.

***

## What's next

- [Sessions](https://workos.com/docs/authkit/sessions) — Understand session management
- [Branding](https://workos.com/docs/authkit/branding) — Customize the AuthKit UI
- [Example Apps](https://workos.com/docs/authkit/example-apps) — View complete working examples
- [Quick Start](https://workos.com/docs/authkit) — Manual integration guide for full control
