# AI features in VS Code cheat sheet

Visual Studio Code provides AI-powered autonomous agents, inline suggestions, chat, and smart actions. Agents plan, implement, and verify changes across multiple files and run in parallel, locally, in the background, or in the cloud. Choose from multiple AI models, connect to external tools with MCP, and customize agents for your team's workflows. This cheat sheet gives you a quick overview of all features.

Tip

If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the Copilot Free plan and get a monthly allowance of inline suggestions and AI credits.

## Essential keyboard shortcuts

*   ⌃⌘I (Windows, Linux Ctrl+Alt+I) - Open the Chat view
*   ⌘I (Windows, Linux Ctrl+I) - Enter voice chat prompt in Chat view
*   ⌘N (Windows, Linux Ctrl+N) - Start a new chat session in Chat view
*   ⇧⌘I (Windows Ctrl+Shift+I, Linux Ctrl+Shift+Alt+I) - Switch to using agents in Chat view
*   ⌘I (Windows, Linux Ctrl+I) - Start inline chat in the editor or terminal
*   ⌘I (Windows, Linux Ctrl+I) (hold) - Start inline voice chat
*   Tab - Accept inline suggestion or navigate to the next edit suggestion
*   Escape - Dismiss inline suggestion

## Access AI in VS Code

*   Start a chat conversation using natural language
    
    *   Chat view (⌃⌘I (Windows, Linux Ctrl+Alt+I)): keep an ongoing chat conversation in the Secondary Side Bar
    *   Inline chat in the editor or terminal (⌘I (Windows, Linux Ctrl+I)): ask questions while you're in the flow
    *   Quick Chat (⇧⌥⌘L (Windows, Linux Ctrl+Shift+Alt+L)): ask quick questions without leaving your current task
*   AI in the editor
    
    *   Inline suggestions: get suggestions as you type, press Tab to accept a suggestion
    *   Edit context menu actions: access common AI actions like explaining or fixing code, generating tests, or reviewing a text selection
    *   Code actions: get editor code actions (lightbulb) to fix linting and compiler errors
*   Task-specific smart actions across VS Code
    
    *   Generate commit messages and pull request titles and descriptions
    *   Fix testing errors
    *   Semantic file search suggestions

## Chat experience in VS Code

Start a natural language chat conversation to get help with coding tasks. For example, ask to explain a block of code or a programming concept, refactor a piece of code, or implement a new feature. Get more information about using chat.

Action

Description

⌃⌘I (Windows, Linux Ctrl+Alt+I)

Open the Chat view in the Secondary Side Bar.

⌘I (Windows, Linux Ctrl+I)

Start inline chat to open chat in the editor or terminal.

⇧⌥⌘L (Windows, Linux Ctrl+Shift+Alt+L)

Open Quick Chat without interrupting your workflow.

⌘N (Windows, Linux Ctrl+N)

Start a new chat session in the Chat view.

Toggle between different agents in the Chat view.

⌥⌘. (Windows, Linux Ctrl+Alt+.)

Show the model picker to select a different AI model for chat.

Context window control

Visual indicator in the chat input box showing context window usage. Hover for total token count and a breakdown by category.

`Add Context...`

Attach different types of context to your chat prompt.

`/`-command

Use slash commands for common tasks or invoke a reusable chat prompt.

`#`-mention

Reference common tools or chat variables to provide context within your prompt.

Edit ()

Edit a previous chat prompt and revert changes.

History ()

Access your history of chat sessions.

Queue or steer

Send a follow-up message while a request is running. Choose to queue the message, steer the current request, or stop and send immediately.

Voice ()

Enter a chat prompt by using speech (voice chat). The chat response is read out aloud.

KaTeX

Render mathematical equations in chat responses. Enable with chat.math.enabled Open in VS Code Open in VS Code Insiders . Right-click on a math expression to copy the source expression.

Mermaid

Render Mermaid diagrams in chat responses. Enable with mermaid-chat.enabled Open in VS Code Open in VS Code Insiders . Right-click on a diagram to copy the source code.

> **Tips**
> 
> *   Use `#`-mentions to add more context to your chat prompt.
> *   Be specific, keep it simple, and ask follow-up questions to get the best results.
> *   Choose a built-in agent or custom agent that fits your specific task.

## Add context to your prompt

Get more relevant responses by providing context to your chat prompt. Choose from different context types, such as files, symbols, editor selections, source control commits, test failures, and more.

Action

Description

**Add Context**

Open a Quick Pick to select relevant context for your chat prompt. Choose from different context types, such as workspace files, symbols, current editor selection, terminal selection, and more.

Drag & drop files

Drag & drop a file from the Explorer or Search view, or drag an editor tab onto the Chat view.

Drag & drop folders

Drag & drop a folder onto the Chat view to attach the files within it.

Drag & drop problem

Drag & drop an item from the Problems panel.

`#<file|folder|symbol>`

Type `#`, followed by a file, folder, or symbol name, to add it as chat context.

`#`-mention

Type `#`, followed by a chat tool to add a specific context type or tool.

## Chat tools

Use tools in chat to accomplish specialized tasks while processing a user request. Examples of such tasks are listing the files in a directory, editing a file in your workspace, running a terminal command, getting the output from the terminal, and more.

VS Code provides built-in tools, and you can extend chat with tools from MCP servers and extensions. Learn more about types of tools.

The following table lists the VS Code built-in tools:

Chat variable/Tool

Description

`#agent` (tool set)

Delegate tasks to other agents.

`#agent/runSubagent`

Run a task in an isolated subagent context. Helps to improve the context management of the main agent thread.

`#browser` (tool set)

Interact with pages in the integrated browser: navigate, read page content, take screenshots, click, type, hover, drag, and handle dialogs. Enable with workbench.browser.enableChatTools Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG.

`#edit` (tool set)

Enable modifications in the workspace.

`#edit/createDirectory`

Create a new directory in the workspace.

`#edit/createFile`

Create a new file in the workspace.

`#edit/editFiles`

Apply edits to files in the workspace.

`#edit/editNotebook`

Make edits to a notebook.

`#execute` (tool set)

Execute code and applications on your machine.

`#execute/createAndRunTask`

Create and run a new task in the workspace.

`#execute/getTerminalOutput`

Get the output from running a terminal command in the workspace.

`#execute/runInTerminal`

Run a shell command in the integrated terminal.

`#execute/runNotebookCell`

Run a notebook cell.

`#execute/testFailure`

Get unit test failure information. Useful when running and diagnosing tests.

`#githubRepo`

Semantic search a GitHub repository for relevant source code snippets. Specify a repository using `owner/repo`.

`#githubTextSearch`

Text search a GitHub repository or organization for files containing specific keywords or code patterns.

`#newWorkspace`

Create a new workspace.

`#read` (tool set)

Read files in your workspace.

`#read/getNotebookSummary`

Get the list of notebook cells and their details.

`#read/problems`

Add workspace issues and problems from the **Problems** panel as context. Useful while fixing code or debugging.

`#read/readFile`

Read the content of a file in the workspace.

`#read/readNotebookCellOutput`

Read the output from a notebook cell execution.

`#read/terminalLastCommand`

Get the last run terminal command and its output.

`#read/terminalSelection`

Get the current terminal selection.

`#search` (tool set)

Enable searching for files in the current workspace.

`#search/changes`

List of source control changes.

`#search/codebase`

Perform a code search in the current workspace to automatically find relevant context for the chat prompt.

`#search/fileSearch`

Search for files in the workspace by using glob patterns and returns their path.

`#search/listDirectory`

List files in a directory in the workspace.

`#search/textSearch`

Find text in files.

`#search/usages`

Combination of "Find All References", "Find Implementation", and "Go to Definition".

`#selection`

Get the current editor selection (only available when text is selected).

`#todos`

Track implementation and progress of a chat request with a todo list.

`#vscode/askQuestions`

Enables the agent to ask clarifying questions using the interactive questions carousel.

`#vscode/extensions`

Search for and ask about VS Code extensions. For example, "how to get started with Python #extensions?"

`#vscode/getProjectSetupInfo`

Provide instructions and configuration for scaffolding different types of projects.

`#vscode/installExtension`

Install a VS Code extension.

`#vscode/runCommand`

Run a VS Code command. For example, "Enable zen mode #runCommand."

`#vscode/VSCodeAPI`

Ask about VS Code functionality and extension development.

`#web` (tool set)

Access web content.

`#web/fetch`

Fetch the content from a given web page. For example, "Summarize #web/fetch code.visualstudio.com/updates."

## Slash commands

Slash commands are shortcuts to specific functionality within the chat. You can use them to quickly perform actions, like fixing issues, generating tests, or explaining code.

Slash command

Description

`/doc`

Generate code documentation comments from editor inline chat.

`/explain`

Explain a code block, file, or programming concept.

`/fix`

Ask to fix a code block or resolve compiler or linting errors.

`/tests`

Generate tests for all or only the selected methods and functions in the editor.

`/setupTests`

Get help setting up a testing framework for your code. Get recommendation for a relevant testing framework, steps to set up and configure it, and suggestions for VS Code testing extensions.

`/clear`

Start a new chat session in the Chat view.

`/compact`

Compact the conversation context by summarizing it. Useful when a conversation grows too long for the model's context window.

`/fork`

Fork the current chat session into a new independent session that inherits the full conversation history. Learn more about forking chat sessions.

`/debug`

Show the Chat Debug view to inspect the chat logs for troubleshooting.

`/troubleshoot`

Ask the AI to analyze the agent debug logs for the current chat session. Optionally, include `#session` to select and diagnose a previous chat session. For example, `/troubleshoot how many tokens did I use?` or `/troubleshoot list all paths you tried to load customizations in #session`. Requires github.copilot.chat.agentDebugLog.enabled Open in VS Code Open in VS Code Insiders .

`/new`

Scaffold a new VS Code workspace or file. Use natural language to describe the type of project/file you need, and preview the scaffolded content before creating it.

`/newNotebook`

Scaffold a new Jupyter notebook based on your requirements. Use natural language to describe what the notebook should contain.

`/init`

Generate or update workspace instructions (`copilot-instructions.md` or `AGENTS.md`) based on your project structure and coding patterns.

`/plan`

Create a detailed implementation plan for a complex coding task. Research requirements, ask clarifying questions, and generate a structured plan with steps, verification, and decisions.

`/search`

Generate a search query for the Search view. Use natural language to describe what you want to search for.

`/startDebugging`

Generate a `launch.json` debug configuration file and start a debugging session from the Chat view.

`/agents`

Configure your custom agents.

`/hooks`

Configure your hooks.

`/instructions`

Configure your custom instructions.

`/prompts`

Configure your reusable prompt files.

`/skills`

Configure your agent skills.

`/create-prompt`

Generate a prompt file with AI assistance in Agent mode.

`/create-instruction`

Generate an instructions file with AI assistance in Agent mode.

`/create-skill`

Generate an agent skill with AI assistance in Agent mode.

`/create-agent`

Generate a custom agent with AI assistance in Agent mode.

`/create-hook`

Generate a hook configuration with AI assistance in Agent mode.

`/yolo`  
`/autoApprove`

Enable global auto-approval of all tool calls ( chat.tools.global.autoApprove Open in VS Code Open in VS Code Insiders This setting is managed at the organization level. Contact your administrator to change it.ORG). Shows a warning dialog the first time.

`/disableYolo`  
`/disableAutoApprove`

Disable global auto-approval of all tool calls.

`/<skill name>`

Run an agent skill in chat. For example, if you have a skill file named `webapp-testing.md`, you can run it by typing `/webapp-testing`.

`/<prompt name>`

Run a reusable prompt in chat.

## Chat participants

Use chat participants to handle domain-specific requests in chat. Chat participants are prefixed with `@` and can be used to ask questions about specific topics. VS Code provides built-in chat participants, such as `@github`, `@terminal`, and `@vscode`, and extensions can provide additional participants.

Chat participant

Description

`@github`

Use the `@github` participant to ask questions about GitHub repositories, issues, pull requests, and more. Get more information about the available GitHub skills.  
Example: `@github What are all of the open PRs assigned to me?`, `@github Show me the recent merged PRs from @dancing-mona`

`@terminal`

Use the `@terminal` participant to ask questions about the integrated terminal or shell commands.  
Example: `@terminal list the 5 largest files in this workspace`

`@vscode`

Use the `@vscode` participant to ask questions about VS Code features, settings, and the VS Code extension APIs.  
Example: `@vscode how to enable word wrapping?`

## Use agents

When using agents, you can use natural language to specify a high-level task, and let AI autonomously reason about the request, plan the work needed, and apply the changes to your codebase. Agents use a combination of code editing and tool invocation to accomplish the task you specified. As it processes your request, it monitors the outcome of edits and tools, and iterates to resolve any issues that arise.

Action

Description

⇧⌘I (Windows Ctrl+Shift+I, Linux Ctrl+Shift+Alt+I)

Switch to using agents in the Chat view

Tools ()

Configure which tools are available when using agents. Select from built-in tools, MCP servers, and extension-provided tools.

Permission levels

Choose a permission level for the current session: **Default Approvals**, **Bypass Approvals**, or **Autopilot**. Controls how tool approvals are handled.

Auto-approve tools

Enable auto-approval of all tools when using agents ( chat.tools.autoApprove Open in VS Code Open in VS Code Insiders ).

Auto-approve terminal commands

Enable auto-approval of terminal commands when using agents ( chat.tools.terminal.autoApprove Open in VS Code Open in VS Code Insiders ).

MCP

Configure MCP servers to extend agent capabilities and tools.

Third-party agents

Use agents from external providers like Claude Agent (Preview) and OpenAI Codex with your Copilot subscription.

Claude Agent _(Preview)_

Start a Claude Agent session powered by Anthropic's Claude Agent SDK. Use `/agents`, `/hooks`, and `/memory` slash commands for advanced workflows.

> **Tips**
> 
> *   Add extra tools when using agents to extend its capabilities.
> *   Configure custom agents to define how the agent should operate, for example to implement a read-only planning mode.
> *   Define custom instructions to guide agents on how to generate and structure code.
> *   Try third-party agents like Claude Code or OpenAI Codex for alternative agentic coding experiences.

## Planning

Use the plan agent in VS Code chat to create detailed implementation plans before starting complex coding tasks. Hand off the approved plan to an implementation agent to start coding.

Action

Description

Plan agent

Select the **Plan** agent from the agents dropdown or use the `/plan` slash command to create a detailed implementation plan for complex coding tasks.

Todo list

View a todo list to track progress on complex tasks. Enable this with the `setting(chat.tools.todos.showWidget` setting.

Memory

Agents save and recall persistent notes across conversations. Use the **Chat: Show Memory Files** command to view stored memories.

## Customize your chat experience

Customize your chat experience to generate responses that match your coding style, tools, and developer workflow. There are several ways to customize your chat experience in VS Code:

*   Custom instructions: Define common guidelines or rules for tasks like generating code, performing code reviews, or generating commit messages. Custom instructions describe the conditions in which the AI should operate (_how_ a task should be done).
    
*   Reusable prompt files: Define reusable prompts for common tasks like generating code or performing a code review. Prompt files are standalone prompts that you can run directly in chat. They describe the task to be performed (_what_ should be done).
    
*   Custom agents: Define how chat operates, which tools it can use, and how it interacts with the codebase. Each chat prompt is run within the boundaries of the agent, without having to configure tools and instructions for every request.
    

Use the Agent Customizations editor (Preview) to discover, create, and manage all your customizations in one place. Select **Configure Chat** (gear icon) in the Chat view, or run **Chat: Open Customizations** from the Command Palette.

> **Tips**
> 
> *   Define language-specific instructions to get more accurate generated code for each language.
> *   Store your instructions in your workspace to easily share them with your team.
> *   Define reusable prompt files for common tasks to save time and help team members get started quickly.

## Editor AI features

As you're coding in the editor, you can use AI to generate inline suggestions as you're typing. Invoke Inline Chat to ask questions and get help while staying in the flow of coding. For example, ask the AI to generate unit tests for a function or method. Get more information about inline suggestions and Inline Chat.

Action

Description

Inline suggestions

Start typing in the editor and get inline suggestions that match your coding style and take your existing code into account.

Code comments

Provide an inline suggestions prompt by writing instructions in a code comment.  
Example: `# write a calculator class with methods for add, subtract, and multiply. Use static methods.`

⌘I (Windows, Linux Ctrl+I)

Start editor inline chat to send a chat request directly from the editor. Use natural language and reference chat variables and slash commands to provide context.

F2

Get AI-powered suggestions when renaming symbols in your code.

Context menu actions

Use the editor context menu to access common AI actions, such as explaining code, generating tests, reviewing code, and more. Right-click in the editor to open the context menu and select **Generate Code**.

Code Actions (lightbulb)

Select the Code Action (lightbulb) in the editor for fixing linting or compiler errors in your code.

> **Tips**
> 
> *   Use meaningful method or function names to get better inline suggestions quicker.
> *   Select a code block to scope your Inline Chat prompt or attach relevant context by attaching files or symbols.
> *   Use the editor context menu options to access common AI-powered actions directly from the editor.

## Source control and issues

Use AI to analyze the changes in your commits and pull requests and provide suggestions for commit messages and pull request descriptions.

Action

Description

`#changes`

Add the current source control changes as context in your chat prompt.

Commit as context

Add a commit from the source control history as context in your chat prompt.

Commit message

Generate a commit message for the current changes in a source control commit.

Merge conflicts (Experimental)

Get help resolving Git merge conflicts with AI.

Pull request description

Generate a pull request title and description that correspond with the changes in your pull request.

`@github`

Use the `@github` participant in chat to ask about issues, pull requests, and more across your repositories. Get more information about the available GitHub skills.  
Example: `@github What are all of the open PRs assigned to me?`, `@github Show me the recent merged pr's from @dancing-mona`

## Review code (experimental)

Use AI to do a quick review pass of a code block or perform a review of uncommitted changes in your workspace. Review feedback shows up as comments in the editor, where you can apply the suggestions.

Action

Description

**Review Selection** _(Preview)_

Select a block of code, and select **Generate Code** > **Review** from the editor context menu for a quick review pass.

**Code Review**

Select the **Code Review** button in the Source Control view for a deeper review of all uncommitted changes.

## Search and settings

Get semantically relevant search results in the Search view or help with searching for settings in the Settings editor.

Action

Description

Settings search

Include semantic search results in the Settings editor ( workbench.settings.showAISearchToggle Open in VS Code Open in VS Code Insiders ).

Semantic search _(Preview)_

Include semantic search results in the Search view ( search.searchView.semanticSearchBehavior Open in VS Code Open in VS Code Insiders ).

## Generate tests

VS Code can generate tests for functions and methods in your codebase by using slash commands in chat. Slash commands are a shorthand notation for common tasks that you can use in chat prompts. Type `/` followed by the command name to use a slash command.

Action

Description

`/tests`

Generate tests for all or only the selected methods and functions in the editor. The generated tests are appended in an existing tests file or a new tests file is created.

`/setupTests`

Get help setting up a testing framework for your code. Get recommendation for a relevant testing framework, steps to set up and configure it, and suggestions for VS Code testing extensions.

`/fixTestFailure`

Ask the AI for suggestions on how to fix failing tests.

Test coverage _(Experimental)_

Generate tests for functions and methods that are not yet covered by tests. Get more information.

> **Tips**
> 
> *   Provide details about the testing frameworks or libraries to use.

## Debug and fix problems

Use AI to help fix coding problems and to get help with configuring and starting debugging sessions in VS Code.

Action

Description

`/fix`

Ask the AI for suggestions on how to fix a block of code or how to resolve any compiler or linting errors in your code. For example, to help fix unresolved Node.js package names.

`/fixTestFailure`

Ask the AI for suggestions on how to fix failing tests.

`/startDebugging` _(Experimental)_

Generate a `launch.json` debug configuration file and start a debugging session from the Chat view.

`copilot-debug` command

Terminal command to help you debug your programs. Prefix a run command to start a debugging session for it (for example, `copilot-debug python foo.py`).

> **Tips**
> 
> *   Provide additional information about the type of fix you need, such as optimizing the memory consumption or performance.
> *   Watch for AI Code Actions in the editor that indicate suggestions for fixing problems in your code.

## Scaffold a new project

AI can help you create a new project by generating a scaffold of the project structure, or generate a notebook based on your requirements.

Action

Description

Agent

Use agents and use a natural language prompt to create a new project or file. For example, `Create a svelte web application to track my tasks`.

`/new`

Use the `/new` command in the Chat view to scaffold a new project or a new file. Use natural language to describe the type of project/file you need, and preview the scaffolded content before creating it.  
Example: `/new Express app using typescript and svelte`

`/newNotebook`

Use the `/newNotebook` command in the Chat view to generate a new Jupyter notebook based on your requirements. Use natural language to describe what the notebook should contain.  
Example: `/newNotebook get census data and preview key insights with Seaborn`.

## Terminal

Get help about shell commands and how to resolve errors when running commands in the terminal.

Action

Description

⌘I (Windows, Linux Ctrl+I)

Start terminal inline chat to use natural language for asking about shell commands and the terminal.  
Example: `how many cores on this machine?`

`@terminal`

Use the `@terminal` participant in the Chat view to ask questions about the integrated terminal or shell commands.  
Example: `@terminal list the 5 largest files in this workspace`

`@terminal /explain`

Use the `/explain` command in the Chat view to explain something from the terminal.  
Example: `@terminal /explain top shell command`

## Python and notebook support

You can use chat to help you with Python programming tasks in the Native Python REPL and in Jupyter notebooks.

Action

Description

Generate  
⌘I (Windows, Linux Ctrl+I)

Start Inline Chat in a notebook to generate a codeblock or Markdown block.

`#`

Attach variables from the Jupyter kernel in your chat prompt to get more relevant responses.

Native REPL + ⌘I (Windows, Linux Ctrl+I)

Start Inline Chat in the Native Python REPL and run the generated commands.

⌃⌘I (Windows, Linux Ctrl+Alt+I)

Open the **Chat view** and use agents to make notebook edits.

`/newNotebook`

Use the `/newNotebook` command in the Chat view to generate a new Jupyter notebook based on your requirements. Use natural language to describe what the notebook should contain.  
Example: `/newNotebook get census data and preview key insights with Seaborn`.

## Next steps

*   Tutorial: Get started with AI features in VS Code

7/1/2026