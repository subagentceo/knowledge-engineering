> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Config as code > dev
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The Neon CLI `neonctl dev` command runs Neon Functions locally with a dev server and hot reload. Pass --source to serve a single function entry module (optionally with --port for an explicit port), or omit --source to serve every function declared in neon.ts, each on its own dev server.

# Neon CLI command: dev

Run Neon Functions locally with a dev server

**Coming Soon: Private Preview**

This feature is in private preview: it's not ready for production use, and it may be briefly unavailable as we deploy updates. To get access, [sign up here](https://neon.com/blog/were-building-backends#access).

The `dev` command runs [Neon Functions](https://neon.com/docs/compute/functions/overview) locally with a dev server and hot reload. Serve one function from its entry module, or every function declared in your `neon.ts` policy.

## Usage

```bash
neonctl dev [--source <path>] [options]
```

## Options

| Option     | Description                                                                                                                                                | Type   | Default | Required |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | :------: |
| `--source` | Path to a single function entry module. Omit to serve every function declared in neon.ts.                                                                  | string | —       |    No    |
| `--port`   | Port to listen on (single-function mode only, with --source). Fails if taken. Without it (and without a PORT env var) a free port is chosen automatically. | number | —       |    No    |

## Examples

Serve one function on a free port with hot reload:

```bash
neonctl dev --source ./functions/hello.ts
```

Serve every function declared in `neon.ts` (one dev server each):

```bash
neonctl dev
```

Serve one function on an explicit port (fails if the port is taken):

```bash
neonctl dev --source ./functions/hello.ts --port 3000
```

---

## Related docs (Config as code)

- [config](https://neon.com/docs/cli/config)
