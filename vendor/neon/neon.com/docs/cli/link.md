> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Setup & context > link
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: Covers the usage of the `link` command in the Neon CLI to bind the current directory to a Neon project, including interactive, non-interactive, and agent-oriented workflows.

# Neon CLI command: link

Link a directory to a Neon project and write a `.neon` context file

The `link` command binds the current directory to a Neon project. It picks (or creates) an organization and project, resolves the project's default branch, and writes a `.neon` file with `orgId`, `projectId`, and `branchId`. Subsequent commands run in this directory (or any subdirectory) automatically pick up that context.

Requires neonctl 2.22.2 or later. Check your version with `neonctl --version`.

**Tip: Prefer link over set-context**

For most workflows, use `neonctl link` instead of manually running `neonctl set-context --project-id ...`. The `link` command guides you through organization and project selection and ensures the context file is complete.

## Usage

```bash
neonctl link [options]
```

## Options

| Option                    | Description                                                                                                                                                                                                                                                   | Type    | Default | Required |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | :------: |
| `--org-id`                | Organization ID to link to                                                                                                                                                                                                                                    | string  | —       |    No    |
| `--project-id`            | Existing project ID to link to                                                                                                                                                                                                                                | string  | —       |    No    |
| `--project-name`          | Name for a new project to create and link to                                                                                                                                                                                                                  | string  | —       |    No    |
| `--region-id`             | Region ID for a new project (e.g. aws-us-east-2). Required with --project-name.                                                                                                                                                                               | string  | —       |    No    |
| `--branch`, `--branch-id` | Branch name or ID to pin in the context (resolved to its ID before writing). Without it, link only resolves the org and project — pin a branch with `neonctl checkout <branch>` (link never guesses a default).                                               | string  | —       |    No    |
| `--params`                | JSON object with link parameters, e.g. '\{"orgId":"...","projectId":"..."}' or '\{"orgId":"...","projectName":"...","regionId":"..."}'. Flags take precedence over fields in --params.                                                                        | string  | —       |    No    |
| `--agent`                 | Emit a JSON state-machine response designed for AI agents instead of prompting. The output is a single JSON object with a discriminated `status` field describing the next step.                                                                              | boolean | `false` |    No    |
| `--yes`, `-y`             | Skip the "already linked" confirmation in interactive mode and re-link anyway.                                                                                                                                                                                | boolean | `false` |    No    |
| `--clear`                 | Remove the org/project/branch context (writes an empty context file) instead of linking.                                                                                                                                                                      | boolean | `false` |    No    |
| `--checks`                | Verify the org/project/branch exist (and resolve the org from the project) before writing. On by default; use --no-checks to write the context offline with no API calls — it then requires --org-id and --project-id (--branch optional) and skips env pull. | boolean | `true`  |    No    |
| `--env-pull`              | Pull the linked branch's Neon env vars (DATABASE\_URL, ...) into a local .env after linking. On by default; use --no-env-pull to skip, for example when injecting env at runtime with `neon-env run` (from `@neondatabase/env`) or `neonctl dev`.             | boolean | `true`  |    No    |

By default, linking pulls the linked branch's environment variables (such as `DATABASE_URL`) into a local `.env` file. Use `--no-env-pull` to skip this step, for example when you inject environment variables at runtime instead.

## Interactive mode (default)

Run `neonctl link` with no flags for guided prompts:

```bash
neonctl link
```

```text filename="Output"
? Which organization would you like to link? ' Personal Org (org-abc123)
? Which project would you like to link? ' + Create new project
? Name for the new project: ' my-app
? Which region should the new project run in? ' AWS US East (Ohio) (aws-us-east-2)
Created project polished-snowflake-12345678 ("my-app") in aws-us-east-2.
Linked .neon:
  orgId:     org-abc123
  projectId: polished-snowflake-12345678
  branchId:  br-steep-math-aiu3vve7
```

## Non-interactive mode

Use flags or a `--params` JSON blob for scripts and CI:

```bash
# Link to an existing project
neonctl link --org-id org-abc123 --project-id polished-snowflake-12345678

# Create a new project and link
neonctl link --org-id org-abc123 --project-name my-app --region-id aws-us-east-2

# Same payload, one JSON blob
neonctl link --params '{"orgId":"org-abc123","projectName":"my-app","regionId":"aws-us-east-2"}'
```

Flags take precedence over fields in `--params`.

## Agent mode

Use `--agent` for a JSON state machine designed for AI coding assistants. Each invocation returns a single JSON object with a `status` discriminator describing the next step, the available options, and the exact follow-up command to run.

```bash
neonctl link --agent
```

Example response when an organization must be selected:

```json
{
  "status": "needs_org",
  "instruction": "Ask the user which of these 2 organizations they want to link the current directory to. After they pick one, re-run the next_command_template with the chosen --org-id value.",
  "options": [
    { "id": "org-abc123", "name": "Personal Org" },
    { "id": "org-team", "name": "Team Org" }
  ],
  "next_command_template": "neonctl link --agent --org-id <org_id>"
}
```

When linking completes, the response includes `status: "linked"` with the context file path and project details.

Any unexpected failure in `--agent` mode is reported as JSON to stdout with exit code 1:

```json
{
  "status": "error",
  "code": "CLIENT_ERROR",
  "message": "user has no access to projects"
}
```

## The `.neon` context file

`link` is a thin wrapper around [`set-context`](https://neon.com/docs/cli/set-context): both write to the same `.neon` file, so anything `link` can write, `set-context` can write too. `link` writes the file into the current working directory by default. If an existing `.neon` is found in any parent directory, that file is reused, so commands run from a subdirectory of a linked project still pick up the project's context. To pin the location explicitly, pass the global `--context-file <path>` option. See [Using a named context file](https://neon.com/docs/cli/set-context#using-a-named-context-file).

Example `.neon` file:

```json
{
  "orgId": "org-abc123",
  "projectId": "polished-snowflake-12345678",
  "branchId": "br-steep-math-aiu3vve7"
}
```

The first time a `.neon` file is created, the CLI adds `.neon` to `.gitignore` in that folder so local project settings are not committed by accident. If you want to commit `.neon` and share context with your team, remove the entry from `.gitignore`. The CLI doesn't re-add it when updating an existing file.

**Note:** Neon does not save confidential information to the context file (for example, auth tokens). You can safely commit this file to your repository or share it with others.

## Organization-scoped API keys

Organization-scoped API keys (those created at the organization level rather than the user level) cannot list user organizations or call the regions endpoint. `link` handles this transparently:

- If the API key is org-scoped and at least one project already exists in the org, the CLI auto-detects the `org_id` from the first project.
- If the API key is org-scoped and no projects exist yet, `--agent` returns a `needs_org` response with `options: []` and an instruction to find the org ID in the Neon Console. Interactive mode prints an error pointing to `--org-id`.
- When the regions endpoint is not allowed, `link` falls back to a built-in static region list.

---

## Related docs (Setup & context)

- [auth](https://neon.com/docs/cli/auth)
- [init](https://neon.com/docs/cli/init)
- [bootstrap](https://neon.com/docs/cli/bootstrap)
- [checkout](https://neon.com/docs/cli/checkout)
- [env](https://neon.com/docs/cli/env)
- [set-context](https://neon.com/docs/cli/set-context)
- [me](https://neon.com/docs/cli/me)
- [completion](https://neon.com/docs/cli/completion)
