# Adding agent skills for GitHub Copilot

You can modify Copilot's behavior and abilities when it works on particular tasks.

> \[!NOTE]
> Agent skills work with Copilot cloud agent, Copilot code review, the GitHub Copilot CLI, the GitHub Copilot app, and agent mode in Visual Studio Code.

Agent skills are folders of instructions, scripts, and resources that Copilot can load when relevant to improve its performance in specialized tasks. For more information, see [About agent skills](/en/copilot/concepts/agents/about-agent-skills).

## Creating and adding a skill

To create an agent skill, you write a `SKILL.md` file and, optionally, other resources, such as supplementary Markdown files, or scripts, which you reference in the `SKILL.md` instructions.

1. If you haven't already done so, create a `skills` directory in one of the following locations. This is where you will locate your skill, and any others you may want to create in the future.

   For **project skills**, specific to a single repository, create a `.github/skills`, `.claude/skills`, or `.agents/skills` directory in your repository.

   For **personal skills**, shared across projects, create a `~/.copilot/skills` or `~/.agents/skills` directory in your local home directory.

2. Within the `skills` directory, create a subdirectory for your new skill. Each skill should have its own directory (for example, `.github/skills/webapp-testing`).

   Skill subdirectory names should be lowercase and use hyphens for spaces.

3. In your skill subdirectory, create a `SKILL.md` file containing your skill's instructions.

   > \[!IMPORTANT]
   > Skill files must be named `SKILL.md`.

   `SKILL.md` files are Markdown files with YAML frontmatter. In their simplest form, they include:

   * YAML frontmatter
     * **name** (required): A unique identifier for the skill. This must be lowercase, using hyphens for spaces. Typically, this matches the name of the skill's directory.
     * **description** (required): A description of what the skill does, and when Copilot should use it.
     * **license** (optional): A description of the license that applies to this skill.
   * A Markdown body, with the instructions, examples and guidelines for Copilot to follow.

4. Optionally, add scripts, examples or other resources to your skill's directory.

   For more information, see "[Enabling a skill to run a script](#enabling-a-skill-to-run-a-script)."

### Example `SKILL.md` file

For a **project skill**, this file would be located in a `.github/skills/github-actions-failure-debugging` directory of your repository.

For a **personal skill**, this file would be located in a `~/.copilot/skills/github-actions-failure-debugging` directory.

```markdown copy
---
name: github-actions-failure-debugging
description: Guide for debugging failing GitHub Actions workflows. Use this when asked to debug failing GitHub Actions workflows.
---

To debug failing GitHub Actions workflows in a pull request, follow this process, using tools provided from the GitHub MCP Server:

1. Use the `list_workflow_runs` tool to look up recent workflow runs for the pull request and their status
2. Use the `summarize_job_log_failures` tool to get an AI summary of the logs for failed jobs, to understand what went wrong without filling your context windows with thousands of lines of logs
3. If you still need more information, use the `get_job_logs` or `get_workflow_run_logs` tool to get the full, detailed failure logs
4. Try to reproduce the failure yourself in your own environment.
5. Fix the failing build. If you were able to reproduce the failure yourself, make sure it is fixed before committing your changes.
```

### Enabling a skill to run a script

When a skill is invoked, Copilot automatically discovers all of the files in the skill's directory and makes them available alongside the skill's instructions. This means you can include scripts or other resources in the skill directory and reference them in your `SKILL.md` instructions.

To create a skill that runs a script:

1. **Add the script to your skill's directory.** For example, a skill for converting SVG images to PNG might have the following structure.

   ```text
   .github/skills/image-convert/
   ├── SKILL.md
   └── convert-svg-to-png.sh
   ```

2. **Optionally pre-approve the tools the skill needs.** In your `SKILL.md` frontmatter, you can use the `allowed-tools` field to list the tools Copilot may use without asking for confirmation each time. If a tool is not listed in the `allowed-tools` field, Copilot will prompt you for permission before using it.

   ```markdown
   ---
   name: image-convert
   description: Converts SVG images to PNG format. Use when asked to convert SVG files.
   allowed-tools: shell
   ---
   ```

   > \[!WARNING]
   > Only pre-approve the `shell` or `bash` tools if you have reviewed this skill and any referenced scripts, and you fully trust their source. Pre-approving `shell` or `bash` removes the confirmation step for running terminal commands and can allow attacker-controlled skills or prompt injections to execute arbitrary commands in your environment. When in doubt, omit `shell` and `bash` from `allowed-tools` so that Copilot must ask for your explicit confirmation before running terminal commands.

3. **Write instructions that tell Copilot how to use the script.** In the Markdown body of `SKILL.md`, describe when and how to run the script.

   ```markdown
   When asked to convert an SVG to PNG, run the `convert-svg-to-png.sh` script
   from this skill's base directory, passing the input SVG file path as the
   first argument.
   ```

## Adding a skill that someone else has created

In addition to creating your own skills, you can also add skills that other people have created.

> \[!TIP]
> You can also use `gh skill` in GitHub CLI to search for, install, update, and publish agent skills. For more information, see [Adding agent skills for GitHub Copilot](/en/copilot/how-tos/use-copilot-agents/cloud-agent/add-skills#managing-skills-with-github-cli).

1. Download a skill directory (that is, a directory containing a SKILL.md file and, optionally, other files and subdirectories).

   For example, download a skill from the Awesome GitHub Copilot repository: <https://awesome-copilot.github.com/skills/>.

2. If you downloaded a `.zip` file, unzip this.

3. Move the skill directory to the required location:

   * For **project skills**, specific to a single repository: `.github/skills`, `.claude/skills`, or `.agents/skills` in your repository.

   * For **personal skills**, shared across projects: `~/.copilot/skills` or `~/.agents/skills` in your local home directory.

## Managing skills with GitHub CLI

> \[!NOTE]
> `gh skill` is in public preview and subject to change. To use it, update GitHub CLI to version 2.90.0 or later.

You can use the `gh skill` command in GitHub CLI to discover, install, update, and publish agent skills from GitHub repositories.

For the full list of `gh skill` subcommands, run `gh skill --help` or see the [`gh skill`](https://cli.github.com/manual/gh_skill) section of the GitHub CLI manual.

### Installing skills

You can search for skills, preview them, and install them from GitHub repositories.

> \[!WARNING]
> Skills are not verified by GitHub and may contain prompt injections, hidden instructions, or malicious scripts. Always inspect the content of a skill before installation using `gh skill preview`.

1. Search for skills by topic:

   ```shell
   gh skill search TOPIC
   ```

2. Preview a skill to inspect its contents before installing. This renders the skill's `SKILL.md` and file tree in your terminal without installing anything:

   ```shell
   gh skill preview OWNER/REPOSITORY SKILL
   ```

3. Install a skill. You can run `gh skill install` with no arguments for a fully interactive flow, or specify a repository to browse its skills interactively:

   ```shell
   gh skill install OWNER/REPOSITORY
   ```

   To install a specific skill directly:

   ```shell
   gh skill install OWNER/REPOSITORY SKILL
   ```

   For example, to install a skill from the [`github/awesome-copilot`](https://github.com/github/awesome-copilot) repository:

   ```shell copy
   gh skill install github/awesome-copilot documentation-writer
   ```

   You can install a specific version using `@TAG` or `@SHA`:

   ```shell copy
   gh skill install github/awesome-copilot documentation-writer@v1.2.0
   ```

   To lock a skill to a specific version (or commit SHA) so it is skipped during updates, use `--pin`:

   ```shell copy
   gh skill install github/awesome-copilot documentation-writer --pin v1.2.0
   ```

   > \[!NOTE]
   > The `@VERSION` syntax and `--pin` flag are mutually exclusive. Use one or the other, not both.

   To install a skill for a specific agent host, use the `--agent` flag. To control the install scope, use `--scope`:

   ```shell copy
   gh skill install github/awesome-copilot documentation-writer --agent claude-code --scope user
   ```

Skills are automatically installed to the correct directory for your agent host. By default, skills are installed for Copilot at project scope.

### Updating skills

When you install a skill with `gh skill`, provenance metadata is written into the skill's `SKILL.md` frontmatter, including the source repository, ref, and tree SHA. The `gh skill update` command uses this metadata to check for upstream changes.

To check for updates interactively:

```shell
gh skill update
```

To update a specific skill:

```shell
gh skill update SKILL
```

To update all installed skills without prompting:

```shell
gh skill update --all
```

Pinned skills are skipped during updates. To update a pinned skill, reinstall it with a new `--pin` value.

### Publishing skills

If you maintain a skills repository, you can validate and publish your skills using GitHub CLI.

To validate your skills against the [Agent Skills specification](https://agentskills.io/specification) and check remote settings like tag protection, secret scanning, and code scanning, without publishing, use `--dry-run`:

```shell
gh skill publish --dry-run
```

To auto-fix metadata issues in your skill files, use `--fix`. This does not publish your skills:

```shell
gh skill publish --fix
```

To validate and publish your skills:

```shell
gh skill publish
```

## How Copilot uses agent skills

When performing tasks, Copilot will decide when to use your skills based on your prompt and the skill's description.

When Copilot chooses to use a skill, the `SKILL.md` file will be injected in the agent's context, giving the agent access to your instructions. It can then follow those instructions and use any scripts or examples you may have included in the skill's directory.

For Copilot code review on GitHub, keep the following in mind:

* If you want to ensure that Copilot code review will read and use a skill, use a review-focused skill directory name such as `code-review`.
* Existing skills within the `.github/skills` directory can also be used by Copilot code review automatically when they are relevant to the review.

## Skills versus custom instructions

You can use both skills and custom instructions to teach Copilot how to work in your repository and how to perform specific tasks.

We recommend using **custom instructions** for simple instructions relevant to almost every task (for example information about your repository's coding standards), and **skills** for more detailed instructions that Copilot should only access when relevant.

To learn more about repository custom instructions, see [Adding repository custom instructions for GitHub Copilot](/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions).