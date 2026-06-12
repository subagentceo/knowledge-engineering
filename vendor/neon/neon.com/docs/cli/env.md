> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Setup & context > env
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The Neon CLI `neonctl env pull` command writes a branch's Neon environment variables to a local .env file. By default it targets an existing .env file, otherwise .env.local, and only Neon-managed variables are rewritten; other lines in the file are preserved. Use --file to target a specific file and --branch to pull from a specific branch.

# Neon CLI command: env

Manage a branch's Neon environment variables locally

The `env` command manages a branch's Neon environment variables locally. [`neonctl link`](https://neon.com/docs/cli/link) and [`neonctl checkout`](https://neon.com/docs/cli/checkout) pull env variables automatically by default.

Subcommands: [pull](https://neon.com/docs/cli/env#pull)

## neonctl env pull

Writes the branch's Neon environment variables to a local `.env` file.

```bash
neonctl env pull [options]
```

| Option         | Description                                                                                                                                | Type   | Default | Required |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ------- | :------: |
| `--file`       | Target .env file to write. Defaults to an existing .env, otherwise .env.local. Only Neon variables are updated; other lines are preserved. | string | —       |    No    |
| `--project-id` | Project ID                                                                                                                                 | string | —       |    No    |
| `--branch`     | Branch ID or name                                                                                                                          | string | —       |    No    |

Write the linked branch's Neon variables into `.env.local` (or `.env` if present):

```bash
neonctl env pull
```

Pull a specific branch into a specific file:

```bash
neonctl env pull --branch preview --file .env.preview
```

---

## Related docs (Setup & context)

- [auth](https://neon.com/docs/cli/auth)
- [init](https://neon.com/docs/cli/init)
- [bootstrap](https://neon.com/docs/cli/bootstrap)
- [link](https://neon.com/docs/cli/link)
- [checkout](https://neon.com/docs/cli/checkout)
- [set-context](https://neon.com/docs/cli/set-context)
- [me](https://neon.com/docs/cli/me)
- [completion](https://neon.com/docs/cli/completion)
