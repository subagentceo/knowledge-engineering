# Use tools in chat

Tools extend agents in Visual Studio Code with specialized functionality for accomplishing specific tasks like searching code, running commands, fetching web content, or invoking APIs. VS Code supports three types of tools: built-in tools, Model Context Protocol (MCP) tools, and extension tools.

For background on tool types and how tools work in the agent loop, see Tools concepts.

This article describes how to use tools in your chat prompts and how to manage tool invocations. To control how the agent requests approval for tool calls and how much autonomy it has, see Manage approvals and permissions.

## Enable tools for chat

Before you can use tools in chat, you need to enable them in the Chat view. You can enable or disable tools on a per-request basis by using the tools picker. You can add more tools by installing MCP servers or extensions that contribute tools.

Tip

Select only the tools that are relevant for your prompt to improve your results.

To access the tools picker:

1.  Open the Chat view and select **Agent** from the agent picker.
    
2.  Select the **Configure Tools** button in the chat input field.
    
    ![Screenshot showing the Chat view, highlighting the Configure Tools button in the chat input.](/assets/docs/chat/chat-tools/agent-mode-select-tools.png)
    
3.  Select or deselect tools to control which ones are available for the current request.
    
    Use the search box to filter the list of tools.
    

When you customize chat with prompt files or custom agents, you can specify which tools are available for a given prompt or mode. Learn more about the tool list priority order.

## Use tools in your prompts

When using agents, the agent automatically determines which tools to use from the enabled tools based on your prompt and the context of your request. The agent autonomously chooses and invokes relevant tools as needed to accomplish the task.

You can also explicitly reference tools in your prompts by typing `#` followed by the tool name. This is useful when you want to ensure a specific tool is used. Type `#` in the chat input field to see a list of available tools, including built-in tools, MCP tools from installed servers, extension tools, and tool sets.

**Examples of explicit tool references:**

*   `"What is the latest version of Node.js #web"`
*   `"How does routing work in Next.js? #web"`
*   `"Fix the issues in #problems"`
*   `"Explain the authentication flow #codebase"`

Tip

By default, tool call details are collapsed in the chat conversation. You can uncollapse them by selecting the tool summary line in chat, or change the default behavior with the chat.agent.thinking.collapsedTools Open in VS Code Open in VS Code Insiders setting (experimental).

## Edit tool parameters

You can review and edit the input parameters before a tool runs:

1.  When the tool confirmation dialog appears, select the chevron next to the tool name to expand its details.
    
2.  Edit any tool input parameters as needed.
    
3.  Select **Allow** to run the tool with the modified parameters.
    

## Group tools with tool sets

A tool set is a collection of tools that you can reference as a single entity in your prompts. Tool sets help you organize related tools and make them easier to use in a chat prompt, prompt files, and custom chat agents. Some of the built-in tools are part of predefined tool sets, such as `#edit` and `#search`.

### Create a tool set

To create a tool set:

1.  Run the **Chat: Configure Tool Sets** command from the Command Palette and select **Create new tool sets file**.
    
    Alternatively, select the ellipsis (**...**) menu in the Chat view, select **Tool Sets**, and then select **Create new tool sets file**.
    
2.  Define your tool set in the `.jsonc` file that opens.
    
    A tool set has the following structure:
    
    ```
    {
      "reader": {
        "tools": ["search/changes", "search/codebase", "read/problems", "search/usages"],
        "description": "Tools for reading and gathering context",
        "icon": "book"
      }
    }
    ```
    
    Tool set properties:
    
    *   `tools`: Array of tool names (built-in tools, MCP tools, or extension tools)
    *   `description`: Brief description displayed in the tools picker
    *   `icon`: Icon for the tool set (see Product Icon Reference)

### Use a tool set

Reference a tool set in your prompts by typing `#` followed by the tool set name:

*   `"Analyze the codebase for security issues #reader"`
*   `"Where is the DB connection string defined? #search"`

In the tools picker, tool sets are available as collapsible groups of related tools. You can select or deselect entire tool sets to quickly enable or disable multiple related tools at once.

## Run terminal commands

Of all the built-in tools, the terminal tool is one of the most frequently used. The agent uses it to run commands as part of its workflow, for example to install dependencies, run a build, or execute tests. Because terminal commands can change your environment, VS Code provides additional controls for reviewing, running, and monitoring them, building on the approval behavior described earlier.

When the agent decides to run a command, it uses the built-in terminal tool to execute it in an integrated terminal within VS Code.

In the chat conversation, the agent displays the commands it ran. You can view the output of the command inline in chat by selecting **Show Output** (`>`) next to the command. You can also view the full output in the integrated terminal by selecting **Show Terminal**.

![Screenshot showing terminal command output in chat.](/assets/docs/chat/chat-tools/terminal-command-output.png)

Use the experimental chat.tools.terminal.outputLocation Open in VS Code Open in VS Code Insiders setting to configure where terminal command output appears: inline in chat, or directly in the integrated terminal.

### Continue terminal commands in background

When the agent runs a long-running terminal command, such as starting a development server or running a build in watch mode, you can push the command to the background. This allows the agent to continue with other tasks without waiting for the command to finish.

While a command is running, a **Continue in Background** button appears next to the terminal command in the chat conversation. Select this button to move the command to the background. The command continues running, and the agent can check its output later or use the terminal for other tasks.

The agent can also specify a timeout when running terminal commands. When the timeout is reached, the agent stops waiting for the command and returns the output collected so far. Use the chat.tools.terminal.enforceTimeoutFromModel Open in VS Code Open in VS Code Insiders setting to control whether to enforce the timeout value that the agent specifies.

The agent can also choose to run commands directly in the background, without user interaction. Background terminals that you have not revealed are automatically cleaned up when their command finishes, which prevents stale terminals from accumulating over a long session. To reveal a background terminal and keep it open after the command completes, select the **Show** link in the chat tool invocation header. The terminal output remains visible in the chat conversation even after a terminal is cleaned up.

Tip

To automatically approve terminal commands or restrict file system and network access for agent commands, see Manage approvals and permissions.

## Frequently asked questions

How do I know which tools are available?

Type `#` in the chat input field to see a list of all available tools. You can also use the tools picker in chat to view and manage the list of active tools.

I'm getting an error that says "Cannot have more than 128 tools per request."

A chat request can have a maximum of 128 tools enabled at a time. If you see an error about exceeding 128 tools per request:

*   Open the tools picker in the Chat view and deselect some tools or entire MCP servers to reduce the count.
    
*   Alternatively, enable virtual tools with the github.copilot.chat.virtualTools.threshold Open in VS Code Open in VS Code Insiders setting to automatically manage large tool sets.
    

Why isn't the agent using my configured terminal shell?

The agent uses the shell you have configured as the default for the terminal, except for `cmd` (Command Prompt) on Windows and `sh` on macOS/Linux. This is because shell integration is not supported with these shells, which means the agent has very limited visibility into what's going on inside the terminal. Instead of getting direct signals for when commands are being run or have finished running, the agent needs to rely on timeouts and watching for the terminal to idle to continue. This leads to a slow and flaky experience.

You can still configure the agent to use these shells with the terminal profile settings, however this will result in an inferior experience compared to using PowerShell on Windows or `bash`/`zsh` on macOS/Linux.

*   chat.tools.terminal.terminalProfile.windows Open in VS Code Open in VS Code Insiders - Override the shell on Windows
*   chat.tools.terminal.terminalProfile.osx Open in VS Code Open in VS Code Insiders - Override the shell on macOS
*   chat.tools.terminal.terminalProfile.linux Open in VS Code Open in VS Code Insiders - Override the shell on Linux

Can I create my own tools?

Yes. You can create tools in two ways:

*   **Develop a VS Code extension** that contributes tools using the Language Model Tools API
*   **Create an MCP server** that provides tools. See the MCP developer guide

## Related resources

*   Chat tools reference
*   Agent hooks - Execute custom commands at tool lifecycle events
*   Security considerations for using AI in VS Code

7/1/2026