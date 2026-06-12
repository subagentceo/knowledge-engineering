> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Setup & context > bootstrap
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: Covers the usage of the `bootstrap` command in the Neon CLI to scaffold a new application from a Neon starter template, including the interactive template picker, the `--default` quick start, post-scaffold setup steps (dependency install, git init, project linking), and the `--agent` JSON output mode for AI agents.

# Neon CLI command: bootstrap

Scaffold a new project from a Neon starter template

The `bootstrap` command scaffolds a new application from a Neon starter template. By default it runs interactively: it prompts you to pick a template, scaffolds it into the target directory, then offers the usual setup steps (install dependencies, initialize git, link the directory to a Neon project). Requires neonctl 2.25.0 or later; check your version with `neonctl --version`.

## Usage

```bash
neonctl bootstrap [directory] [options]
```

The directory argument is optional. Use `.` to scaffold into the current directory, or leave it out and bootstrap prompts you for one. The target directory must be empty unless you pass `--force`.

## Options

| Option                               | Description                                                                                                                                                                                    | Type    | Default | Required |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | :------: |
| `--template`                         | Template to use (skips the interactive picker). Run with --list-templates to see available templates.                                                                                          | string  | —       |    No    |
| `--list-templates`, `--list`, `--ls` | List available templates and exit.                                                                                                                                                             | boolean | `false` |    No    |
| `--force`                            | Scaffold into the target directory even if it is not empty (colliding files are overwritten).                                                                                                  | boolean | `false` |    No    |
| `--agent`                            | Emit a JSON state-machine response designed for AI agents instead of prompting. The output is a single JSON object with a discriminated `status` field describing the next step.               | boolean | `false` |    No    |
| `--default`, `-y`                    | Quick start: scaffold the default template (or --template) and run the usual setup (install dependencies, git init) without prompting. Linking is left to you since it needs a project choice. | boolean | `false` |    No    |
| `--install`                          | Install dependencies after scaffolding. In interactive mode this is offered as a prompt; use --no-install to skip without being asked.                                                         | boolean | `true`  |    No    |
| `--git`                              | Initialize a git repository after scaffolding. In interactive mode this is offered as a prompt; use --no-git to skip without being asked.                                                      | boolean | `true`  |    No    |
| `--link`                             | Run `neon link` in the scaffolded directory after installing. In interactive mode this is offered as a prompt; use --no-link to skip without being asked.                                      | boolean | `true`  |    No    |

Run with `--list-templates` to see the available templates, and pass one with `--template` to skip the interactive picker.

The post-scaffold steps (`--install`, `--git`, `--link`) all default to on. In interactive mode, bootstrap asks about each one; use the negated form (`--no-install`, `--no-git`, `--no-link`) to skip a step without being asked. With `--link`, bootstrap runs [`neon link`](https://neon.com/docs/cli/link) in the scaffolded directory after installing.

Use `--default` (alias `-y`) for a quick start: it scaffolds the default template (or the one you pass with `--template`) and runs dependency install and git init without prompting. Linking is left to you, since it needs a project choice.

## Examples

Create `./my-app` from an interactively chosen template:

```bash
neonctl bootstrap my-app
```

Scaffold a specific template into the current directory:

```bash
neonctl bootstrap . --template hono
```

Quick start: scaffold the default template and run setup without prompting:

```bash
neonctl bootstrap my-app --default
```

## Agent mode

Pass `--agent` to skip the prompts and emit a JSON state-machine response designed for AI agents. The output is a single JSON object with a discriminated `status` field describing the next step.

```bash
neonctl bootstrap my-app --template hono --agent
```

---

## Related docs (Setup & context)

- [auth](https://neon.com/docs/cli/auth)
- [init](https://neon.com/docs/cli/init)
- [link](https://neon.com/docs/cli/link)
- [checkout](https://neon.com/docs/cli/checkout)
- [env](https://neon.com/docs/cli/env)
- [set-context](https://neon.com/docs/cli/set-context)
- [me](https://neon.com/docs/cli/me)
- [completion](https://neon.com/docs/cli/completion)
