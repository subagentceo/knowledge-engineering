# Optimize AI credit usage in VS Code

Each GitHub Copilot plan includes a monthly allowance of AI credits. Different actions consume credits at different rates, based on the model and the number of tokens processed. This guide covers practical ways to get the most out of your AI credits in Visual Studio Code.

## Choose efficient models

More capable models cost more per token, while lighter models extend your usage further. Match the model to the complexity of the task:

*   Use **lighter models** for quick edits, boilerplate generation, and straightforward questions.
*   Use **reasoning models** for complex refactoring, architectural decisions, and multi-step debugging.
*   Use **auto model selection** to let VS Code route each request to an efficient model that balances quality and cost.
*   Use custom agents with a preferred model to route specific subtasks to specialized, cost-effective models. When you invoke a custom agent as a subagent, it uses its own configured model instead of the chat session's model.

The model picker in chat shows cost details in the hover menu, including cost per token type and a generic cost tier label (Low, Medium, High). Use this information to make informed choices.

For more information, see choosing and configuring language models and best practices for model selection.

## Plan before you implement

Jumping straight into code generation can lead to wasted effort if the approach is wrong. It also requires a model with enough reasoning capability throughout the process, which can consume more credits. Instead, separate the planning and implementation phases. This allows you to use a reasoning model for planning, and then switch to a faster, more efficient model for implementation once the plan is solidified.

1.  Use the Plan agent to research the task and create a structured implementation plan.
2.  Review and refine the plan before the agent writes any code.
3.  Hand off the approved plan to an implementation agent using a faster model to execute the plan.

This workflow ensures the agent understands the requirements before it starts generating code, reducing back-and-forth and rework.

For more information, see plan first, then implement.

## Use thinking effort defaults

Thinking effort controls how much reasoning a model applies to each request. Higher effort levels produce more thinking tokens, which increases both latency and credit consumption. VS Code sets default effort levels based on evaluations and has adaptive reasoning enabled, where the model dynamically decides how much to think based on the complexity of each request.

For most tasks, the defaults are sufficient. Only increase thinking effort for genuinely complex problems like architectural planning or multi-step debugging.

For more information, see configure thinking effort.

## Start new chats for new tasks

As a conversation grows, it accumulates context from previous messages, tool outputs, and file contents. When you switch to an unrelated task in the same session, the model still processes all that irrelevant history, which consumes tokens without improving results.

Start a new chat session (⌘N (Windows, Linux Ctrl+N)) when you change topics. This gives the model a clean context window focused on the current task.

## Leverage forking

When you want to explore an alternative approach or ask a side question, fork the conversation instead of re-prompting from scratch. Forking creates a new session that inherits the existing conversation history, so you don't need to re-establish context.

*   Type `/fork` in the chat input to fork the entire session up to the current message.
*   Hover over a previous message and select **Fork Conversation** to fork from a specific checkpoint.

## Disable unneeded tools and MCP servers

Every tool call produces output that consumes space in the context window and contributes to credit consumption. Disable tools you don't need for the current task to prevent unnecessary calls.

*   Use the **Configure Tools** button in the chat input field to enable or disable individual tools or entire MCP servers for the current request.
*   In custom agents, specify only the tools the agent needs via the `tools` property. This prevents the agent from calling tools that aren't relevant to its workflow.

For more information, see Use tools in chat.

## Exclude files from Copilot context

Large generated files, build outputs, or irrelevant directories can increase token usage without adding value. Exclude these files to keep agent context focused:

*   Use a `.gitignore` file to exclude files from the workspace index and from agent text search and grep.
*   Use the files.exclude Open in VS Code Open in VS Code Insiders setting to hide files from VS Code entirely, which also excludes them from the index and agent search tools.
*   Use the search.exclude Open in VS Code Open in VS Code Insiders setting to exclude files from agent text search and grep while keeping them visible in the Explorer, for example log files you want to open manually but not include in search results.

Search match snippets count toward the context window even when the agent doesn't open the matched file. Excluding noisy paths reduces irrelevant tokens in search results.

For more information and example configurations, see improve agent search with exclusion settings.

## Manage context with compaction

When a conversation grows long, use `/compact` to summarize older parts of the conversation and reclaim context window space. You can optionally add instructions to guide the summary, for example `/compact focus on the API design decisions`.

For more information, see context compaction.

## Monitor your usage

You can monitor your AI credit usage in VS Code for a specific chat request, the cumulative usage for a session, and your overall monthly consumption. This helps you understand which requests are more expensive, spot expensive conversations, and manage your usage over time.

To view the cost for a single request, hover over the chat response to see the credit consumption for that turn. This helps you understand which requests are more expensive and adjust your prompts or model selection accordingly.

To view the cumulative cost and token breakdown for the entire session, hover over or select the context window control in the chat input. The session info popover shows the total cost in credits and the cumulative context window token usage for the whole session, complementing the per-turn credit consumption already shown for individual requests.

![Screenshot of VS Code Chat view, showing the context window usage control in the chat input box.](/assets/docs/chat/copilot-chat/chat-context-window-control.png)

To view your overall monthly consumption, open the Copilot status dashboard from the VS Code Status Bar. The dashboard shows the percentage of your monthly allowance you have used for AI credits (and inline suggestions for the Copilot Free plan).

![Screenshot of the Copilot status dashboard, showing the percentage of monthly AI credits used and a link to view usage details on GitHub.](/assets/docs/agents/optimize-usage-guide/copilot-status-dashboard.png)

Visit the GitHub Copilot documentation for more information about monitoring usage and entitlements.

You can also run the `/chronicle:cost-tips` command in any chat session to get personalized recommendations for optimizing your AI credit usage based on your recent activity. Learn more about session insights and the chronicle command.

## Inspect token usage and caching

Use the Agent Debug Logs to understand what is consuming credits in a session:

*   The **Summary view** shows aggregate token usage for the session, including total tool calls and overall duration.
*   The **Cache Explorer view** shows prompt cache hit rates and how many input tokens were reused. Prompt caching lets model providers reuse the prefix of a request that matches a previous one, which reduces latency and token costs.

Reviewing these logs helps you identify sessions or workflows that consume more tokens than expected, so you can adjust your approach.

## Related content

*   AI credits and model costs
*   Choose and configure language models
*   Best practices for GitHub Copilot
*   GitHub Copilot plans
*   Usage-based billing

7/1/2026