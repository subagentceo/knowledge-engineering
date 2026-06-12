> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Org & network > ip-allow
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The Neon CLI `ip-allow` command controls project-level IP allowlists with subcommands `list`, `add`, `remove`, and `reset`, supporting individual IP addresses, IP ranges, and CIDR notation. Use this page when you need to restrict database access to specific IPs from the command line, rather than through the Neon console. The `add` subcommand accepts a `--protected-only` flag to scope the allowlist to protected branches only.

# Neon CLI command: ip-allow

Manage the IP allowlist: list, add, remove, and reset allowed IPs

The `ip-allow` command lists, adds, removes, and resets the IP allowlist for your Neon project. An allowlist can contain individual IP addresses, IP ranges, or [CIDR notation](https://neon.com/docs/reference/glossary#cidr-notation). For information about Neon's IP Allow feature, see [Configure IP Allow](https://neon.com/docs/manage/projects#configure-ip-allow).

Subcommands: [list](https://neon.com/docs/cli/ip-allow#list), [add](https://neon.com/docs/cli/ip-allow#add), [remove](https://neon.com/docs/cli/ip-allow#remove), [reset](https://neon.com/docs/cli/ip-allow#reset)

The `--project-id` option is required only if your Neon account has more than one project and no project is set in your [context file](https://neon.com/docs/cli/set-context).

## neonctl ip-allow list

Lists the addresses in the IP allowlist.

```bash
neonctl ip-allow list [options]
```

| Option         | Description | Type   | Default | Required |
| -------------- | ----------- | ------ | ------- | :------: |
| `--project-id` | Project ID  | string | —       |    No    |

List the IP allowlist:

```bash
neonctl ip-allow list --project-id cold-grass-40154007
```

List the IP allowlist with the `--output` format set to `json`:

```bash
neonctl ip-allow list --project-id cold-grass-40154007 --output json
```

## neonctl ip-allow add

Adds IP addresses to the IP allowlist for your Neon project.

```bash
neonctl ip-allow add [ips...]
```

| Option             | Description                                                   | Type    | Default | Required |
| ------------------ | ------------------------------------------------------------- | ------- | ------- | :------: |
| `--protected-only` | If true, the list will be applied only to protected branches. | boolean | —       |    No    |
| `--project-id`     | Project ID                                                    | string  | —       |    No    |

Use `--protected-only` to apply the allowlist to [protected branches](https://neon.com/docs/guides/protected-branches) only. Use `--protected-only false` to remove this setting.

```bash
neonctl ip-allow add 192.0.2.3 --project-id cold-grass-40154007
```

## neonctl ip-allow remove

Removes IP addresses from the IP allowlist for your project.

```bash
neonctl ip-allow remove [ips...]
```

| Option         | Description | Type   | Default | Required |
| -------------- | ----------- | ------ | ------- | :------: |
| `--project-id` | Project ID  | string | —       |    No    |

```bash
neonctl ip-allow remove 192.0.2.3 --project-id cold-grass-40154007
```

## neonctl ip-allow reset

Resets the allowlist to the IP addresses you specify. If you specify no addresses, the currently defined IP addresses are removed.

```bash
neonctl ip-allow reset [ips...]
```

| Option         | Description | Type   | Default | Required |
| -------------- | ----------- | ------ | ------- | :------: |
| `--project-id` | Project ID  | string | —       |    No    |

```bash
neonctl ip-allow reset 192.0.2.1 --project-id cold-grass-40154007
```

---

## Related docs (Org & network)

- [orgs](https://neon.com/docs/cli/orgs)
- [vpc](https://neon.com/docs/cli/vpc)
