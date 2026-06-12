> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Setup & context > auth
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The `neonctl auth` command authenticates the Neon CLI to a Neon account by launching a browser OAuth flow that saves credentials to `~/.config/neonctl/credentials.json`. Use this command when setting up the CLI for the first time or when not using an API key. Vercel-Managed Integration users must authenticate via API key (`--api-key` or `NEON_API_KEY`) instead. The CLI resolves authentication in priority order: `--api-key` flag, then `NEON_API_KEY` env var, then the credentials file, then triggers browser auth if none are found.

# Neon CLI command: auth

Authenticate to Neon via browser or API key and manage credentials

The `auth` command authenticates you to Neon. `neonctl login` is an alias for `neonctl auth`.

## Usage

```bash
neonctl auth [options]
```

The command launches a browser window where you authorize the Neon CLI to access your Neon account. Your credentials are then saved locally to `credentials.json`:

```text filename="Output"
/home/<home>/.config/neonctl/credentials.json
```

**Note:** If you use Neon through the [Vercel-Managed Integration](https://neon.com/docs/guides/vercel-managed-integration), authenticate with a Neon API key instead (see below). The `neonctl auth` command requires an account registered through Neon rather than Vercel.

Instead of running `neonctl auth`, you can provide an API key with the global `--api-key` option or the `NEON_API_KEY` environment variable. See [Global options](https://neon.com/docs/cli#global-options).

**Info:**

The Neon CLI resolves authentication in this order:

- The `--api-key` option, if provided.
- The `NEON_API_KEY` environment variable, if set.
- The `credentials.json` file created by `neonctl auth`.
- If none are found, the CLI starts the `neonctl auth` web authentication flow.

## Options

Takes only the [global options](https://neon.com/docs/cli#global-options).

---

## Related docs (Setup & context)

- [init](https://neon.com/docs/cli/init)
- [bootstrap](https://neon.com/docs/cli/bootstrap)
- [link](https://neon.com/docs/cli/link)
- [checkout](https://neon.com/docs/cli/checkout)
- [env](https://neon.com/docs/cli/env)
- [set-context](https://neon.com/docs/cli/set-context)
- [me](https://neon.com/docs/cli/me)
- [completion](https://neon.com/docs/cli/completion)
