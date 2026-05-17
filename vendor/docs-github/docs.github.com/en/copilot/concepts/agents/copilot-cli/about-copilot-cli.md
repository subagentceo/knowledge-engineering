# About GitHub Copilot CLI

Find out about using Copilot from the command line.

## Introduction

The command-line interface (CLI) for GitHub Copilot allows you to use Copilot directly from your terminal. You can use it to answer questions, write and debug code, and interact with GitHub.com. For example, you can ask Copilot to make some changes to a project and create a pull request.

GitHub Copilot CLI gives you quick access to a powerful AI agent, without having to leave your terminal. It can help you complete tasks more quickly by working on your behalf, and you can work iteratively with GitHub Copilot CLI to build the code you need.

## Supported operating systems

* Linux
* macOS
* Windows from within Powershell and [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/about)

For installation instructions, see [Installing GitHub Copilot CLI](/en/copilot/how-tos/set-up/install-copilot-cli).

## Modes of use

GitHub Copilot CLI has two user interfaces: interactive and programmatic.

### Interactive interface

To start an interactive session, enter `copilot`. Within an interactive session, you can have a conversation with Copilot. You can prompt Copilot to perform one or more tasks, and you can give it feedback and steer the direction of the work.

![Screenshot of the Welcome message in the interactive interface of Copilot.](/assets/images/help/copilot/copilot-cli-welcome.png)

The interactive interface has two modes. In addition to the default ask/execute mode there is also a **plan mode** in which Copilot will build a structured implementation plan for a task you want to complete.

Press <kbd>Shift</kbd>+<kbd>Tab</kbd> to cycle between modes. In plan mode, Copilot analyzes your request, asks clarifying questions to understand scope and requirements, and builds a plan before writing any code. This helps you catch misunderstandings before any code is written, and stay in control of complex, multi-step tasks.

### Programmatic interface

You can also pass the CLI a single prompt directly on the command line. The CLI completes the task and then exits.

To use the CLI programmatically, include the `-p` or `--prompt` command-line option in your command. To allow Copilot to modify and execute files you should also use one of the approval options described later in this article—see [Allowing tools to be used without manual approval](#allowing-tools-to-be-used-without-manual-approval) ). For example:

```bash copy
copilot -p "Show me this week's commits and summarize them" --allow-tool='shell(git)'
```

Alternatively, you can use a script to output command-line options and pipe this to `copilot`. For example:

```bash copy
./script-outputting-options.sh | copilot
```

> \[!CAUTION]
> If you use an automatic approval option such as `--allow-all-tools`, Copilot has the same access as you do to files on your computer, and can run any shell commands that you can run, without getting your prior approval. See [Security considerations](#security-considerations), later in this article.

## Use cases for GitHub Copilot CLI

The following sections provide examples of tasks you can complete with GitHub Copilot CLI.

### Local tasks

* From within a project directory you can ask Copilot to make a change to the code in the project. For example:

  `Change the background-color of H1 headings to dark blue`

  Copilot finds the CSS file where H1 headings are defined and changes the color value.

* Ask Copilot to tell you about changes to a file:

  `Show me the last 5 changes made to the CHANGELOG.md file. Who changed the file, when, and give a brief summary of the changes they made`

* Use Copilot to help you improve the code, or documentation, in your project.

  * `Suggest improvements to content.js`

  * `Rewrite the readme in this project to make it more accessible to newcomers`

* Use Copilot to help you perform Git operations.

  * `Commit the changes to this repo`

  * `Revert the last commit, leaving the changes unstaged`

* Ask Copilot to create an application from scratch—for example, as a proof of concept.

  `Use the create-next-app kit and tailwind CSS to create a next.js app. The app should be a dashboard built with data from the GitHub API. It should track this project's build success rate, average build duration, number of failed builds, and automated test pass rate. After creating the app, give me easy to follow instructions on how to build, run, and view the app in my browser.`

* Ask Copilot to explain why a change it made is not working as expected, or tell Copilot to fix a problem with the last change it made. For example:

  `You said: "The application is now running on http://localhost:3002 and is fully functional!" but when I browse to that URL I get "This site can't be reached"`

### Tasks involving GitHub.com

* Fetch and display details about your work from GitHub.com.

  * `List my open PRs`

    This lists your open pull requests from any repository on GitHub. For more specific results, include the repository name in your prompt:

  * `List all open issues assigned to me in OWNER/REPO`

* Ask Copilot to work on an issue:

  `I've been assigned this issue: https://github.com/octo-org/octo-repo/issues/1234. Start working on this for me in a suitably named branch.`

* Ask Copilot to make file changes and raise a pull request on GitHub.com.

  * `In the root of this repo, add a Node script called user-info.js that outputs information about the user who ran the script. Create a pull request to add this file to the repo on GitHub.`

  * `Create a PR that updates the README at https://github.com/octo-org/octo-repo, changing the subheading "How to run" to "Example usage"`

  Copilot creates a pull request on GitHub.com, on your behalf. You are marked as the pull request author.

* Ask Copilot to create an issue for you on GitHub.com.

  ``Raise an improvement issue in octo-org/octo-repo. In src/someapp/somefile.py the `file = open('data.txt', 'r')` block opens a file but never closes it.``

* Ask Copilot to check the code changes in a pull request.

  `Check the changes made in PR https://github.com/octo-org/octo-repo/pull/57575. Report any serious errors you find in these changes.`

  Copilot responds in the CLI with a summary of any problems it finds.

* Manage pull requests from GitHub Copilot CLI.

  * `Merge all of the open PRs that I've created in octo-org/octo-repo`

  * `Close PR #11 on octo-org/octo-repo`

* Find specific types of issues.

  `Use the GitHub MCP server to find good first issues for a new team member to work on from octo-org/octo-repo`

  > \[!NOTE]
  > If you know that a specific MCP server can achieve a particular task, then specifying it in your prompt can help Copilot to deliver the results you want.

* Find specific GitHub Actions workflows.

  `List any Actions workflows in this repo that add comments to PRs`

* Create a GitHub Actions workflow.

  `Branch off from main and create a GitHub Actions workflow that will run on pull requests, or can be run manually. The workflow should run eslint to check for problems in the changes made in the PR. If warnings or errors are found these should be shown as messages in the diff view of the PR. I want to prevent code with errors from being merged into main so, if any errors are found, the workflow should cause the PR check to fail. Push the new branch and create a pull request.`

## Steering the conversation

You can interact with Copilot while it's thinking to steer the conversation:

* **Enqueue additional messages**: Send follow-up messages to steer the conversation in a different direction, or queue additional instructions for Copilot to process after it finishes its current response. This makes conversations feel more natural and keeps you in control.
* **Inline feedback on rejection**: When you reject a tool permission request, you can give Copilot inline feedback about the rejection so it can adapt its approach without stopping entirely. This makes the conversation flow more naturally when you want to guide Copilot away from certain actions.

## Automatic context management

GitHub Copilot CLI automatically manages your conversation context:

* **Auto-compaction**: When your conversation approaches 95% of the token limit, Copilot automatically compresses your history in the background without interrupting your workflow. This enables virtually infinite sessions.
* **Manual control**: Use `/compact` to manually compress context anytime. Press <kbd>Escape</kbd> to cancel if you change your mind.
* **Visualize usage**: The `/context` command shows a detailed token usage breakdown so you can understand how your context window is being used.

## Customizing GitHub Copilot CLI

You can customize GitHub Copilot CLI in a number of ways:

* **Custom instructions**: Custom instructions allow you to give Copilot additional context on your project and how to build, test and validate its changes. All custom instruction files now combine instead of using priority-based fallbacks. For more information, see [Adding custom instructions for GitHub Copilot CLI](/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions).
* **Model Context Protocol (MCP) servers**: MCP servers allow you to give Copilot access to different data sources and tools. For more information, see [Using GitHub Copilot CLI](/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#add-an-mcp-server).
* **Custom agents**: Custom agents allow you to create different specialized versions of Copilot for different tasks. For example, you could customize Copilot to be an expert frontend engineer following your team's guidelines. GitHub Copilot CLI includes specialized custom agents that it automatically delegates common tasks to. For more information, see [Using GitHub Copilot CLI](/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-agents).
* **Hooks**: Hooks allow you to execute custom shell commands at key points during agent execution, enabling you to add validation, logging, security scanning, or workflow automation. See [About hooks for GitHub Copilot](/en/copilot/concepts/agents/hooks).
* **Skills**: Skills allow you to enhance the ability of Copilot to perform specialized tasks with instructions, scripts, and resources. For more information, see [About agent skills](/en/copilot/concepts/agents/about-agent-skills).
* **Copilot Memory**: Copilot Memory allows Copilot to build a persistent understanding of your repository by storing "memories", which are pieces of information about coding conventions, patterns, and preferences that Copilot deduces as it works. This reduces the need to repeatedly explain context in your prompts and makes future sessions more productive. For more information, see [About GitHub Copilot Memory](/en/copilot/concepts/agents/copilot-memory).

## Security considerations

When you use Copilot CLI, Copilot can perform tasks on your behalf, such as executing or modifying files, or running shell commands.

You should therefore always keep security considerations in mind when using Copilot CLI, just as you would when working directly with files yourself, or running commands directly in your terminal. You should always review suggested commands carefully when Copilot CLI requests your approval.

### Trusted directories

Trusted directories control where Copilot CLI can read, modify, and execute files.

You should only launch Copilot CLI from directories that you trust. You should not use Copilot CLI in directories that may contain executable files you can't be sure you trust. Similarly, if you launch the CLI from a directory that contains sensitive or confidential data, or files that you don't want to be changed, you could inadvertently expose those files to risk. Typically, you should not launch Copilot CLI from your home directory.

Scoping of permissions is heuristic and GitHub does not guarantee that all files outside trusted directories will be protected. See [Risk mitigation](#risk-mitigation).

When you start a GitHub Copilot CLI session, you'll be asked to confirm that you trust the files in, and below, the directory from which you launched the CLI. See [Configuring GitHub Copilot CLI](/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli#setting-trusted-directories).

### Allowed tools

The first time that Copilot needs to use a tool that could be used to modify or execute a file—for example, `touch`, `chmod`, `node`, or `sed`—it will ask you whether you want to allow it to use that tool.

Typically, you can choose from three options:

```text
1. Yes
2. Yes, and approve TOOL for the rest of the running session
3. No, and tell Copilot what to do differently (Esc)
```

**Option 1** allows Copilot to run this particular command, this time only. The next time it needs to use this tool, it will ask you again.

**Option 2** allows Copilot to use this tool again, without asking you for permission, for the duration of the currently running session. It will ask for your approval again in new sessions, or if you resume the current session in the future. If you choose this option, you are allowing Copilot to use this tool in any way it thinks is appropriate. For example, if Copilot asks you to allow it to run the command `rm ./this-file.txt`, and you choose option 2, then Copilot can run any `rm` command (for example, `rm -rf ./*`) during the current run of this session, without asking for your approval.

**Option 3** cancels the proposed command and allows you to tell Copilot to try a different approach.

#### Allowing tools to be used without manual approval

There are three command-line options that you can use, in either interactive or programmatic sessions, to determine tools that Copilot can use without asking for your approval:

* **`--allow-all-tools`**

  Allows Copilot to use any tool without asking for your approval.

  For example, you can use this option with a programmatic invocation of the CLI to allow Copilot to run any command. For example:

  ```shell
  copilot -p "Revert the last commit" --allow-all-tools
  ```

* **`--deny-tool`**

  Prevents Copilot from using a specific tool.

  This option takes precedence over the `--allow-all-tools` and `--allow-tool` options.

* **`--allow-tool`**

  Allows Copilot to use a specific tool without asking for your approval.

#### Using the approval options

The `--deny-tool` and `--allow-tool` options require one of the following arguments:

* `'shell(COMMAND)'`

  For example, `copilot --deny-tool='shell(rm)'` prevents Copilot from using any `rm` command.

  For `git` and `gh` commands, you can specify a particular first-level subcommand to allow or deny. For example:

  ```shell
  copilot --deny-tool='shell(git push)'
  ```

  The tool specification is optional. For example, `copilot --allow-tool='shell'` allows Copilot to use any shell command without individual approval.

* `'write'`

  This argument allows or denies tools—other than shell commands—permission to modify files.

  For example, `copilot --allow-tool='write'` allows Copilot to edit files without your individual approval.

* `'MCP_SERVER_NAME'`

  This argument allows or denies tools from the specified MCP server, where `MCP_SERVER_NAME` is the name of an MCP server that you have configured. Tools from the server are specified in parentheses, using the tool name that is registered with the MCP server. Using the server name without specifying a tool allows or denies all tools from that server.

  For example, `copilot --deny-tool='My-MCP-Server(tool_name)'` prevents Copilot from using the tool called `tool_name` from the MCP server called `My-MCP-Server`.

  You can find an MCP server's name by entering `/mcp` in the CLI's interactive interface, then selecting the server from the list that's displayed.

#### Combining approval options

You can use a combination of approval options to determine exactly which tools Copilot can use without asking for your approval.

For example, to prevent Copilot from using the `rm` and `git push` commands, but automatically allow all other tools, use:

```shell
copilot --allow-all-tools --deny-tool='shell(rm)' --deny-tool='shell(git push)'
```

To prevent Copilot from using the tool `tool_name` from the MCP server named `My-MCP-Server`, but allow all other tools from that server to be used without individual approval, use:

```shell
copilot --allow-tool='My-MCP-Server' --deny-tool='My-MCP-Server(tool_name)'
```

#### Security implications of automatic tool approval

It's important to be aware of the security implications of using the approval command-line options. These options allow Copilot to execute commands needed to complete your request, without giving you the opportunity to review and approve those commands before they are run. While this streamlines workflows, and allows headless operation of the CLI, it increases the risk of unintended actions being taken that might result in data loss or corruption, or other security issues.

You can control which tools Copilot CLI can use by responding to approval prompts when Copilot attempts to use a tool, by specifying permissions with command-line flags, or (in an interactive session) by using slash commands (such as `/allow-all` and `/yolo`. See [Configuring GitHub Copilot CLI](/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli#setting-allowed-tools).

### Risk mitigation

You can mitigate the risks associated with using the automatic approval options by running Copilot CLI in a restricted environment—such as a virtual machine, container, or dedicated system—with tightly controlled permissions and network access. This confines any potential damage that could occur when allowing Copilot to execute commands that you have not reviewed and verified.

### Known MCP server policy limitations

Copilot CLI can't currently support the following organization-level MCP server policies:

* **MCP servers in Copilot**, which controls whether MCP servers can be used at all by Copilot.
* **MCP Registry URL**, which controls which MCP registry Copilot will allow MCP servers to be used from.

For more information about these policies, see [MCP server usage in your company](/en/copilot/concepts/mcp-management#mcp-policy-settings).

## Model usage

The default model used by GitHub Copilot CLI is Claude Sonnet 4.5. GitHub reserves the right to change this model.

You can change the model used by GitHub Copilot CLI by using the `/model` slash command or the `--model` command-line option. Enter this command, then select a model from the list.

Each time you submit a prompt to Copilot in Copilot CLI's interactive interface, and each time you use Copilot CLI programmatically, your monthly quota of Copilot premium requests is reduced by one, multiplied by the multiplier shown in parentheses in the model list. For example, `Claude Sonnet 4.5 (1x)` indicates that with this model each time you submit a prompt your quota of premium requests is reduced by one. For information about premium requests, see [Requests in GitHub Copilot](/en/copilot/concepts/billing/copilot-requests).

### Using your own model provider

You can configure Copilot CLI to use your own model provider instead of GitHub-hosted models. This lets you connect to an OpenAI-compatible endpoint, Azure OpenAI, or Anthropic, including locally running models such as Ollama. You configure your model provider using environment variables.

| Environment variable        | Description                                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `COPILOT_PROVIDER_BASE_URL` | The base URL of your model provider's API endpoint.                                                                                                     |
| `COPILOT_PROVIDER_TYPE`     | The provider type: `openai` (default), `azure`, or `anthropic`. The `openai` type works with any OpenAI-compatible endpoint, including Ollama and vLLM. |
| `COPILOT_PROVIDER_API_KEY`  | Your API key for authenticating with the provider. Not required for providers that don't use authentication, such as a local Ollama instance.           |
| `COPILOT_MODEL`             | The model to use (required when using a custom provider). You can also set this with the `--model` command-line option.                                 |

Models used with Copilot CLI must support **tool calling** (function calling) and **streaming**. If the model does not support these capabilities, Copilot CLI will return an error. For best results, the model should have a context window of at least 128k tokens.

For details on how to configure your model provider, run `copilot help providers` in your terminal.

## Use Copilot CLI via ACP

ACP (the Agent Client Protocol) is an open standard for interacting with AI agents. It allows you to use Copilot CLI as an agent in any third-party tools, IDEs, or automation systems that support this protocol.

For more information, see [Copilot CLI ACP server](/en/copilot/reference/copilot-cli-reference/acp-server).

## Feedback

If you have any feedback about GitHub Copilot CLI, please let us know by using the `/feedback` slash command in an interactive session and choosing one of the options. You can complete a private feedback survey, submit a bug report, or suggest a new feature.

## Further reading

* [Installing GitHub Copilot CLI](/en/copilot/how-tos/set-up/install-copilot-cli)
* [Using GitHub Copilot CLI](/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
* [Responsible use of GitHub Copilot CLI](/en/enterprise-cloud@latest/copilot/responsible-use/copilot-cli)